class ModelTable {
  constructor ({ selProvVotesData, idDivMain, idTable, nombreProv, currentDate }) {
    this.data = {
      dataset: selProvVotesData,
      idDivMain,
      idTable,
      votesPerDot: 100,
      headData: [
        {
          name: 'initials',
          value: nombreProv,
          type: 'party'
        },
        {
          name: 'votesNum',
          value: currentDate,
          type: 'chart'
        },
        {
          name: 'diff',
          value: 'Variación',
          type: 'variation'
        }
      ]
    }
  }

  setPreviousVotesColumn (pastDate) {
    this.data.headData.push({
      name: 'votesPreviousNum',
      value: `Elecciones anteriores (${pastDate})`,
      type: 'chart'
    })
  }
}
export default ModelTable
