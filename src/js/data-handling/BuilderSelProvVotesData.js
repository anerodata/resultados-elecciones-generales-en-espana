import { partiesStore } from '../constants.js'
import ModelVotesData from './ModelVotesData.js'

const getPartiesCurrentVotes = new WeakMap()
const isKeyInChart = new WeakMap()
const isKeyInChartTotalCenso = new WeakMap()
const isKeyInChartTotalVotantes = new WeakMap()
const getPastVotesFromPastVotesArr = new WeakMap()
const getPastVotesFromMetaInfo = new WeakMap()
const getExpandedPartyInfo = new WeakMap()
const getPartyNameAndInitials = new WeakMap()
const getPartyMetaInfo = new WeakMap()
const getPartyPastVotes = new WeakMap()
const getPorcentualDiff = new WeakMap()
const getAbstData = new WeakMap()

class BuilderSelProvVotesData {
  constructor (votesDataProv) {
    this.votesDataProv = votesDataProv

    getPartiesCurrentVotes.set(this, () => {
      const partiesCurrentVotes = Object
        .entries(this.votesDataProv.current)
        .filter(([key]) => isKeyInChart.get(this)(key))
      return Object.fromEntries(partiesCurrentVotes)
    })
    isKeyInChart.set(this, (key) => {
      return key.includes('_') ||
        key === 'Votos en blanco' ||
        key === 'Votos nulos' ||
        isKeyInChartTotalCenso.get(this)(key) ||
        isKeyInChartTotalVotantes.get(this)(key)
    })
    isKeyInChartTotalCenso.set(this, (key) => {
      return key === 'Total censo electoral'
    })
    isKeyInChartTotalVotantes.set(this, (key) => {
      return key === 'Total votantes'
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
      const partyName = fullPartyNameSplitted[0]
      let initials = fullPartyNameSplitted[1]
      if (initials === undefined) {
        initials = partyName
      }
      return { partyName, initials }
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
      if (pastVotes === 0 && partyExtraInfoInitials !== undefined) {
        pastVotes = getPastVotesFromMetaInfo.get(this)(partyExtraInfoInitials)
      }
      return pastVotes
    })
    getPastVotesFromPastVotesArr.set(this, (partyInitials) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        const previousPartyNameAndInitials = getPartyNameAndInitials.get(this)(key)
        if (previousPartyNameAndInitials.initials === partyInitials) {
          return previousVotes[key]
        }
      }
      return 0
    })
    getPastVotesFromMetaInfo.set(this, (partyInitials) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        const previousPartyNameAndInitials = getPartyNameAndInitials.get(this)(key)
        const initial = partyInitials.find(initial =>
          initial === previousPartyNameAndInitials.initials
        )
        if (initial !== undefined) {
          return previousVotes[key]
        }
      }
      return 0
    })
    getPorcentualDiff.set(this, (oldNum, newNum) => {
      if (oldNum === undefined) {
        return 100
      }
      const calc = (newNum - oldNum) / oldNum * 100
      return calc
    })
    getAbstData.set(this, (totalVotantes, totalCenso) => {
      console.log(totalVotantes, totalCenso)
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
    const totalVotantes = votesData.filter(row => isKeyInChartTotalVotantes.get(this)(row.nombre))
    const totalCenso = votesData.filter(row => isKeyInChartTotalCenso.get(this)(row.nombre))
    getAbstData.get(this)(totalVotantes, totalCenso)
    return votesData
  }
}
export default BuilderSelProvVotesData
