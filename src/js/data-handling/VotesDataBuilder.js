import ModelPartyData from './ModelPartyData.js'
const multiple = 100
const votesData = []

const storeCurrentVotes = new WeakMap()
const storePreviousVotes = new WeakMap()

class VotesDataBuilder {
  constructor (votesDataProv) {
    this.votesDataProv = votesDataProv

    storeCurrentVotes.set(this, () => {
      const currentVotes = this.votesDataProv.current
      for (const key in currentVotes) {
        const partyData = new ModelPartyData(key, currentVotes[key])
        console.log(partyData)
        console.log(key, currentVotes[key])
      }
    })

    storePreviousVotes.set(this, () => {
      const previousVotes = this.votesDataProv.previous
      for (const key in previousVotes) {
        console.log(key, previousVotes[key])
      }
    })
    console.log(this.votesDataProv)
  }

  getVotesData () {
    storeCurrentVotes.get(this)()
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
export default VotesDataBuilder
