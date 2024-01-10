import { partiesStore } from '../constants.js'
import ModelVotesData from './ModelVotesData.js'

const getPartiesCurrentVotes = new WeakMap()
const getInitials = new WeakMap()
const getPastVotesFromPastVotesArr = new WeakMap()
const getPastVotesFromMetaInfo = new WeakMap()
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
      expandedPartyInfo.partyName = partyName
      expandedPartyInfo.initials = partyInitials
      const partyMetaInfo = getPartyMetaInfo.get(this)(partyInitials)
      if (partyMetaInfo !== undefined) {
        expandedPartyInfo.defaultName = partyMetaInfo.defaultName
        expandedPartyInfo.color = partyMetaInfo.color
      }
      let pastVotes = getPastVotesFromPastVotesArr.get(this)(partyInitials)
      if (pastVotes === undefined && partyMetaInfo !== undefined) {
        pastVotes = getPastVotesFromMetaInfo.get(this)(partyMetaInfo.initials)
      }
      expandedPartyInfo.votesPreviousNum = pastVotes
      return expandedPartyInfo
    })
    getPorcentualDiff.set(this, (oldNum, newNum) => {
      if (oldNum === undefined) {
        return 100
      }
      const calc = (newNum - oldNum) / oldNum * 100
      return calc
    })
    getPartyMetaInfo.set(this, (partyInitials) => {
      for (const i in partiesStore) {
        if (partiesStore[i].initials.indexOf(partyInitials) > -1) {
          return partiesStore[i]
        }
      }
    })
    getPastVotesFromPastVotesArr.set(this, (partyInitials) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        if (getInitials.get(this)(key) === partyInitials) {
          return previousVotes[key]
        }
      }
    })
    getPastVotesFromMetaInfo.set(this, (partyInitials) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        const initial = partyInitials.find(initial => initial === getInitials.get(this)(key))
        if (initial !== undefined) {
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
