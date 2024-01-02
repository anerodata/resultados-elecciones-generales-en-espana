import { partiesStore } from '../constants.js'
import ModelVotesData from './ModelVotesData.js'

const getPartiesCurrentVotes = new WeakMap()
const getInitials = new WeakMap()
const getPastVotesFromIPastVotesArr = new WeakMap()
const getExpandedPartyInfo = new WeakMap()
const getPartyMetaInfo = new WeakMap()
const getPorcentualDiff = new WeakMap()

class BuilderSelProvVotesData {
  constructor (votesDataProv) {
    this.votesDataProv = votesDataProv

    getPartiesCurrentVotes.set(this, () => {
      const arrOfArrs = Object
        .entries(this.votesDataProv.current)
        .filter(([key]) => key.includes('_'))
      return Object.fromEntries(arrOfArrs)
    })
    getExpandedPartyInfo.set(this, (fullPartyName) => {
      const expandedPartyInfo = {}
      const fullPartyNameSplitted = fullPartyName.split('_')
      const partyInitials = fullPartyNameSplitted[1]
      const partyName = fullPartyNameSplitted[0]
      const partyMetaInfo = getPartyMetaInfo.get(this)(partyInitials)
      const pastVotes = getPastVotesFromIPastVotesArr.get(this)(partyInitials)
      expandedPartyInfo.partyName = partyName
      expandedPartyInfo.initials = partyInitials
      expandedPartyInfo.votesPreviousNum = pastVotes
      // if (pastVotes === undefined || partyMetaInfo !== null) {
      //   console.log(pastVotes, fullPartyName)
      // }
      if (partyMetaInfo !== null) {
        expandedPartyInfo.defaultName = partyMetaInfo.defaultName
        expandedPartyInfo.color = partyMetaInfo.color
      }
      return expandedPartyInfo
    })
    getPorcentualDiff.set(this, (oldNum, newNum) => {
      if (oldNum === undefined) {
        return 100
      }
      return (newNum - oldNum) / oldNum * 100
    })
    getPartyMetaInfo.set(this, (partyInitials) => {
      for (const i in partiesStore) {
        if (partiesStore[i].initials.indexOf(partyInitials) > -1) {
          return partiesStore[i]
        }
      }
      return null
    })
    getPastVotesFromIPastVotesArr.set(this, (partyInitials) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        if (getInitials.get(this)(key) === partyInitials) {
          return previousVotes[key]
        }
      }
    })
    getInitials.set(this, (fullPartyName) => {
      return fullPartyName.split('_')[1]
    })
  }

  getVotesData () {
    const partiesVotes = getPartiesCurrentVotes.get(this)()
    const votesData = []
    for (const fullPartyName in partiesVotes) {
      const expandedPartyInfo = getExpandedPartyInfo.get(this)(fullPartyName)
      const porcentualDiff = getPorcentualDiff.get(this)(expandedPartyInfo.votesPreviousNum, partiesVotes[fullPartyName])
      const partyData = new ModelVotesData({
        votesNum: partiesVotes[fullPartyName],
        diff: porcentualDiff,
        ...expandedPartyInfo
      })
      votesData.push(partyData)
    }
    return votesData
  }
}
export default BuilderSelProvVotesData
