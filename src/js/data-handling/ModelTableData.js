import { getDateInSpanishFormat, getCipherInSpanishFormat } from '../utils.js'

class ModelTableData {
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
          value: getDateInSpanishFormat(currentDate),
          type: 'chart',
          getTooltipContent: (row) => {
            return `<h3>${row.nombre}</h3> ${getCipherInSpanishFormat(row.votesNum)} votos`
          }
        },
        {
          name: 'diff',
          value: 'Variación',
          type: 'variation',
          getTooltipContent: (row) => {
            const roundedValue = Math.round(row.diff * 10) / 10
            const cipher = getCipherInSpanishFormat(roundedValue)
            const cipherPlusSign = row.diff > 0 ? '+' : ''
            return `${cipherPlusSign + cipher} %`
          }
        }
      ]
    }
  }

  setPreviousVotesColumn (pastDate) {
    this.data.headData.splice(1, 0, {
      name: 'votesPreviousNum',
      value: `Elecciones anteriores (${getDateInSpanishFormat(pastDate)})`,
      type: 'chart',
      getTooltipContent: (row) => {
        return `<h3>${row.nombre}</h3> ${getCipherInSpanishFormat(row.votesPreviousNum)} votos`
      }
    })
  }
}
export default ModelTableData
