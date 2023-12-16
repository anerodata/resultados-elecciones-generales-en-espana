import ModelVotesData from './ModelVotesData.js'
const multiple = 100
const votesData = []

const storeVotes = new WeakMap()
const getPartiesCurrentVotes = new WeakMap()
const getInitials = new WeakMap()
const getPastVotes = new WeakMap()
const checkIfPartyIsInPastVotesArr = new WeakMap()

class BuilderSelProvVotesData {
  constructor (votesDataProv) {
    this.votesDataProv = votesDataProv

    storeVotes.set(this, () => {
      const partiesVotes = getPartiesCurrentVotes.get(this)()
      for (const key in partiesVotes) {
        const initials = getInitials.get(this)(key)
        getPastVotes.get(this)(initials)
      }
    })
    getPartiesCurrentVotes.set(this, () => {
      const arrOfArrs = Object
        .entries(this.votesDataProv.current)
        .filter(([key]) => key.includes('_'))
      return Object.fromEntries(arrOfArrs)
    })
    getInitials.set(this, (partyName) => {
      return partyName.split('_')[1]
    })
    getPastVotes.set(this, (partyName) => {
      const isPartyInPastVotesArr = checkIfPartyIsInPastVotesArr.get(this)(partyName)
      // Otro camino: mirar en el array de colores y sacar el indice
    })
    checkIfPartyIsInPastVotesArr.set(this, (partyName) => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        if (getInitials.get(this)(key) === partyName) {
          console.log(key, partyName)
        }
      }
    })
  }

  getVotesData () {
    storeVotes.get(this)()
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
