import VotesVisTdFactory from './VotesVisTdFactory.js'
import { createNodeWithText } from '../utils.js'

const getChartDimensions = new WeakMap()
const getChartWidth = new WeakMap()
const getTableHead = new WeakMap()
const getTableBody = new WeakMap()
const getTableTr = new WeakMap()
const getTableTd = new WeakMap()
const feedTableTd = new WeakMap()
const feedNoChartTd = new WeakMap()
const provinceVisTdFactory = new VotesVisTdFactory()

class VotesVisTable {
  constructor ({ nombre, dataset, idDivMain, idTable, headData }) {
    this.maxTableWidth = 480
    this.noVizRowsWidth = 112
    this.divMain = document.getElementById(idDivMain)
    this.tableContainer = document.getElementById(idTable)
    this.provinceName = nombre
    this.dataset = dataset
    this.idTable = idTable
    this.headData = headData
    this.chartDimensions = {}

    getChartDimensions.set(this, () => {
      const chartDimensions = { chartWidth: getChartWidth.get(this)(), dotWidth: 3 }
      if (this.divMain.clientWidth < 880) {
        chartDimensions.dotWidth = 2
        chartDimensions.sep = 2
      }
      return chartDimensions
    })

    getChartWidth.set(this, () => {
      return this.divMain.clientWidth / 2 - this.noVizRowsWidth
    })

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
          const tdContent = feedTableTd.get(this)(this.dataset[i], headNoChart[j])
          td.appendChild(tdContent)
        })
      })
    })

    feedTableTd.set(this, (row, headField) => {
      const tDContent = provinceVisTdFactory.createTd({
        tdType: headField.type,
        value: row[headField.name],
        color: row.color,
        chartDimensions: this.chartDimensions
      })
      return tDContent.getTdNode()
    })
  }

  setupTable () {
    this.chartDimensions = getChartDimensions.get(this)()
    const table = document.createElement('table')
    const tHead = getTableHead.get(this)()
    const tableBody = getTableBody.get(this)()
    const trs = tableBody.querySelectorAll('tr')
    feedNoChartTd.get(this)(trs)
    table.appendChild(tHead)
    table.appendChild(tableBody)
    this.tableContainer.textContent = ''
    this.tableContainer.appendChild(table)
  }
}
export default VotesVisTable
