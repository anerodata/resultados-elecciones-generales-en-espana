import { partiesStore } from '../constants.js'
import ModelVotesData from './ModelVotesData.js'

const getPartiesCurrentVotes = new WeakMap()
const getInitials = new WeakMap()
const getPastVotesFromPastVotesArr = new WeakMap()
const getPastVotesFromMetaInfo = new WeakMap()
const getExpandedPartyInfo = new WeakMap()
const getPartyNameAndInitials = new WeakMap()
const getPartyMetaInfo = new WeakMap()
const getPartyPastVotes = new WeakMap()
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
      const expandedInfo = {}
      const nameAndInitials = getPartyNameAndInitials.get(this)(fullPartyName)
      expandedInfo.partyName = nameAndInitials.partyName
      expandedInfo.initials = nameAndInitials.initials
      const extraInfo = getPartyMetaInfo.get(this)(nameAndInitials.initials)
      expandedInfo.defaultName = extraInfo.defaultName
      expandedInfo.color = extraInfo.color
      const partyPastVotes = getPartyPastVotes.get(this)(nameAndInitials.initials, extraInfo.initials)
      expandedInfo.votesPreviousNum = partyPastVotes
      return expandedInfo
    })
    getPartyNameAndInitials.set(this, (fullPartyName) => {
      const fullPartyNameSplitted = fullPartyName.split('_')
      return { partyName: fullPartyNameSplitted[0], initials: fullPartyNameSplitted[1] }
    })
    getPartyMetaInfo.set(this, (partyInitials) => {
      let extraInfo = {}
      for (const i in partiesStore) {
        if (partiesStore[i].initials.indexOf(partyInitials) > -1) {
          extraInfo = partiesStore[i]
        }
      }
      return extraInfo
    })
    getPartyPastVotes.set(this, (partyInitials, partyExtraInfoInitials) => {
      let pastVotes = getPastVotesFromPastVotesArr.get(this)(partyInitials)
      if (pastVotes === undefined && partyExtraInfoInitials !== undefined) {
        pastVotes = getPastVotesFromMetaInfo.get(this)(partyExtraInfoInitials)
      }
      return pastVotes
    })
    getPastVotesFromPastVotesArr.set(this, (partyInitials) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        if (getInitials.get(this)(key) === partyInitials) {
          return previousVotes[key]
        }
      }
      return undefined
    })
    getPastVotesFromMetaInfo.set(this, (partyInitials) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        const initial = partyInitials.find(initial => initial === getInitials.get(this)(key))
        if (initial !== undefined) {
          return previousVotes[key]
        }
      }
      return undefined
    })
    getInitials.set(this, (fullPartyName) => {
      return fullPartyName.split('_')[1]
    })
    getPorcentualDiff.set(this, (oldNum, newNum) => {
      if (oldNum === undefined) {
        return 100
      }
      const calc = (newNum - oldNum) / oldNum * 100
      return calc
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
