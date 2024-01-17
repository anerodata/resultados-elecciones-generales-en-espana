import VotesVisTdFactory from './VotesVisTdFactory.js'
import { createNodeWithText, getCipherInSpanishFormat } from '../utils.js'

const getTableHead = new WeakMap()
const getTableBody = new WeakMap()
const getTableTr = new WeakMap()
const getTableTd = new WeakMap()
const getTdContentNoChart = new WeakMap()
const getTdContentChart = new WeakMap()

const feedNoChartTd = new WeakMap()
const feedChartTd = new WeakMap()
const provinceVisTdFactory = new VotesVisTdFactory()

const setTableParagraph = new WeakMap()
const getCipherTableParagraph = new WeakMap()

class VotesVisTable {
  constructor ({ nombre, dataset, idDivMain, idTable, headData, votesPerDot }) {
    this.maxTableWidth = 480
    this.noVizRowsWidth = 112
    this.divMain = document.getElementById(idDivMain)
    this.tableContainer = document.getElementById(idTable)
    this.provinceName = nombre
    this.dataset = dataset
    this.idTable = idTable
    this.headData = headData
    this.votesPerDot = votesPerDot

    getTableHead.set(this, () => {
      const tHead = document.createElement('thead')
      const tRH = document.createElement('tr')
      tHead.appendChild(tRH)
      this.headData.forEach(headField => {
        const tD = createNodeWithText('th', headField.value)
        tRH.appendChild(tD)
      })
      return tHead
    })

    getTableBody.set(this, () => {
      const tBody = document.createElement('tbody')
      dataset.forEach(() => {
        const tR = getTableTr.get(this)()
        tBody.appendChild(tR)
      })
      return tBody
    })

    getTableTr.set(this, () => {
      const tR = document.createElement('tr')
      headData.forEach(headField => {
        const tD = getTableTd.get(this)(headField)
        tR.appendChild(tD)
      })
      return tR
    })

    getTableTd.set(this, (headField) => {
      const tD = document.createElement('td')
      tD.classList.add(`vis-table_cell--${headField.type}`)
      tD.setAttribute('data-cell-type', headField.type)
      return tD
    })

    feedNoChartTd.set(this, (trs) => {
      trs.forEach((tr, i) => {
        const tdsNotVis = tr.querySelectorAll('td:not(.vis-table_cell--chart)')
        const headNoChart = this.headData.filter(headField => headField.type !== 'chart')
        tdsNotVis.forEach((td, j) => {
          const tdContent = getTdContentNoChart.get(this)(this.dataset[i], headNoChart[j])
          td.appendChild(tdContent)
        })
      })
    })

    getTdContentNoChart.set(this, (row, headField) => {
      const tDContent = provinceVisTdFactory.createTd({
        tdType: headField.type,
        value: row[headField.name],
        color: row.color
      })
      return tDContent.getTdNode()
    })

    feedChartTd.set(this, (trs) => {
      trs.forEach((tr, i) => {
        const tdsNotVis = tr.querySelectorAll('td.vis-table_cell--chart')
        const headChart = this.headData.filter(headField => headField.type === 'chart')
        tdsNotVis.forEach((td, j) => {
          const tdContent = getTdContentChart.get(this)(this.dataset[i], headChart[j], td.clientWidth)
          td.appendChild(tdContent)
        })
      })
    })

    getTdContentChart.set(this, (row, headField, tdWidth) => {
      if (row[headField.name] > 0) {
        const tDContent = provinceVisTdFactory.createTd({
          tdType: headField.type,
          value: row[headField.name],
          color: row.color,
          width: tdWidth,
          votesPerDot: this.votesPerDot
        })
        return tDContent.getTdNode()
      }
      const tDContent = provinceVisTdFactory.createTd({
        tdType: 'party',
        value: row[headField.name],
        color: row.color,
        width: tdWidth,
        votesPerDot: this.votesPerDot
      })
      return tDContent.getTdNode()
    })
    setTableParagraph.set(this, () => {
      const firstElement = this.tableContainer.firstElementChild
      const cipher = getCipherTableParagraph.get(this)()
      const text = `Cada punto representa ${this.votesPerDot} electores y cada cuadrado grande, ${cipher} electores.`
      const pElement = createNodeWithText('p', text)
      this.tableContainer.insertBefore(pElement, firstElement)
    })
    getCipherTableParagraph.set(this, () => {
      const votesPerSquare = this.votesPerDot * 100
      return getCipherInSpanishFormat(votesPerSquare)
    })
  }

  setupTable () {
    this.dataset = this.dataset.sort((a, b) => b.votesNum - a.votesNum)
    const table = document.createElement('table')
    const tHead = getTableHead.get(this)()
    const tableBody = getTableBody.get(this)()
    table.appendChild(tHead)
    table.appendChild(tableBody)
    this.tableContainer.textContent = ''
    this.tableContainer.appendChild(table)
    const trs = tableBody.querySelectorAll('tr')
    feedNoChartTd.get(this)(trs)
    feedChartTd.get(this)(trs)
    setTableParagraph.get(this)()
  }
}
export default VotesVisTable
