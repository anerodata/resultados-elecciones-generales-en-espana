class VotesDataBuilder {
  constructor (provinceData) {
    this.provinceData = provinceData
    this.multiple = 100
  }

  getVotesData () {
    return [
      {
        nombre: 'Unidas Podemos',
        color: 'red',
        // Entre 100
        votesNum: Math.round(1100000 / this.multiple),
        votesPreviousNum: Math.round(30000 / this.multiple),
        par_meta_id: 37,
        dif: 20.480999999999998
      },
      {
        nombre: 'PP',
        color: '#C6A15B',
        votesNum: Math.round(100000 / this.multiple),
        votesPreviousNum: Math.round(240304 / this.multiple),
        par_meta_id: 38,
        dif: 9.972000000000005
      },
      {
        nombre: 'PSOE',
        color: '#C6A15B',
        votesNum: Math.round(26381 / this.multiple),
        votesPreviousNum: Math.round(39595 / this.multiple),
        par_meta_id: 40,
        dif: -13.213999999999999
      },
      {
        nombre: 'EH Bildu',
        color: '#C6A15B',
        votesNum: Math.round(15858 / this.multiple),
        votesPreviousNum: Math.round(24687 / this.multiple),
        par_meta_id: 15,
        dif: -8.829
      },
      {
        nombre: 'Cs',
        color: '#C6A15B',
        votesNum: Math.round(8372 / this.multiple),
        votesPreviousNum: Math.round(7039 / this.multiple),
        par_meta_id: 10,
        dif: 1.3330000000000002
      },
      {
        nombre: 'Vox',
        color: '#C6A15B',
        votesNum: Math.round(0.306 / this.multiple),
        votesPreviousNum: Math.round(5.587 / this.multiple),
        par_meta_id: 52,
        dif: -5.281
      }
    ]
  }
}
export default VotesDataBuilder
