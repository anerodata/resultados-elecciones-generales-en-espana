import { partiesStore } from '../constants.js'
import ModelVotesData from './ModelVotesData.js'

const multiple = 100
const votesData = new WeakMap()

const storeVotes = new WeakMap()
const getPartiesCurrentVotes = new WeakMap()
const getInitials = new WeakMap()
const getPastVotesFromIPastVotesArr = new WeakMap()
const getExpandedPartyInfo = new WeakMap()
const getPartyMetaInfo = new WeakMap()

class BuilderSelProvVotesData {
  constructor (votesDataProv) {
    this.votesDataProv = votesDataProv
    votesData.set(this, () => [])

    storeVotes.set(this, () => {
      const partiesVotes = getPartiesCurrentVotes.get(this)()
      for (const fullPartyName in partiesVotes) {
        const expandedPartyInfo = getExpandedPartyInfo.get(this)(fullPartyName)
        const partyData = new ModelVotesData({
          votesNum: partiesVotes[fullPartyName],
          ...expandedPartyInfo
        })
        const privateVotesData = votesData.get(this)()
        privateVotesData.push(partyData)
        votesData.set(this, () => privateVotesData)
      }
    })
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
    storeVotes.get(this)()
    return votesData.get(this)()
    return [
      {
        nombre: 'Unidas Podemos',
        color: 'red',
        // Entre 100
        votesNum: Math.round(1100000 / multiple),
        votesPreviousNum: Math.round(30000 / multiple),
        par_meta_id: 37,
        dif: 20.480999999999998
      },
      {
        nombre: 'PP',
        color: '#C6A15B',
        votesNum: Math.round(100000 / multiple),
        votesPreviousNum: Math.round(240304 / multiple),
        par_meta_id: 38,
        dif: 9.972000000000005
      },
      {
        nombre: 'PSOE',
        color: '#C6A15B',
        votesNum: Math.round(26381 / multiple),
        votesPreviousNum: Math.round(39595 / multiple),
        par_meta_id: 40,
        dif: -13.213999999999999
      },
      {
        nombre: 'EH Bildu',
        color: '#C6A15B',
        votesNum: Math.round(15858 / multiple),
        votesPreviousNum: Math.round(24687 / multiple),
        par_meta_id: 15,
        dif: -8.829
      },
      {
        nombre: 'Cs',
        color: '#C6A15B',
        votesNum: Math.round(8372 / multiple),
        votesPreviousNum: Math.round(7039 / multiple),
        par_meta_id: 10,
        dif: 1.3330000000000002
      },
      {
        nombre: 'Vox',
        color: '#C6A15B',
        votesNum: Math.round(0.306 / multiple),
        votesPreviousNum: Math.round(5.587 / multiple),
        par_meta_id: 52,
        dif: -5.281
      }
    ]
  }
}
export default BuilderSelProvVotesData
