import ProvinceVisTdFactory from './ProvinceVisTdFactory.js'
import { createNodeWithText } from './utils.js'

const getChartDimensions = new WeakMap()
const getChartWidth = new WeakMap()
const setupTable = new WeakMap()
const setupTableHead = new WeakMap()
const setupTableBody = new WeakMap()
const setupTableTr = new WeakMap()
const setupTableTd = new WeakMap()
const provinceVisTdFactory = new ProvinceVisTdFactory()

class ProvinceVisTable {
  constructor ({ nombre, dataset, idDivMain, idTable, headData }) {
    this.maxTableWidth = 480
    this.noVizRowsWidth = 120
    this.divMain = document.getElementById(idDivMain)
    this.tableContainer = document.getElementById(idTable)
    this.provinceName = nombre
    this.dataset = dataset
    this.idTable = idTable
    this.headData = headData
    this.chartDimensions = {}

    setupTable.set(this, () => {
      this.chartDimensions = getChartDimensions.get(this)()
      const table = document.createElement('table')
      const tHead = setupTableHead.get(this)()
      const tableBody = setupTableBody.get(this)()
      table.appendChild(tHead)
      table.appendChild(tableBody)
      this.tableContainer.textContent = ''
      this.tableContainer.appendChild(table)
    })

    getChartDimensions.set(this, () => {
      const chartDimensions = { chartWidth: getChartWidth.get(this)(), dotWidth: 3 }
      if (this.divMain.clientWidth < 880) {
        chartDimensions.dotWidth = 2
        chartDimensions.sep = 2
      }
      return chartDimensions
    })

    getChartWidth.set(this, () => {
      return this.divMain.clientWidth > this.maxTableWidth
        ? this.divMain.clientWidth / 2 - this.noVizRowsWidth
        : this.maxTableWidth / 2 - this.noVizRowsWidth
    })

    setupTableHead.set(this, () => {
      const tHead = document.createElement('thead')
      const tRH = document.createElement('tr')
      tHead.appendChild(tRH)
      this.headData.forEach(headField => {
        const tD = createNodeWithText('th', headField.value)
        tRH.appendChild(tD)
      })
      return tHead
    })

    setupTableBody.set(this, () => {
      const tBody = document.createElement('tbody')
      dataset.forEach(row => {
        const tR = setupTableTr.get(this)(row)
        tBody.appendChild(tR)
      })
      return tBody
    })

    setupTableTr.set(this, (row) => {
      const tR = document.createElement('tr')
      headData.forEach(headField => {
        const tD = setupTableTd.get(this)(row, headField)
        tR.appendChild(tD)
      })
      return tR
    })

    setupTableTd.set(this, (row, headField) => {
      const tD = document.createElement('td')
      const tDContent = provinceVisTdFactory.createTd({
        tdType: headField.type,
        value: row[headField.name],
        color: row.color,
        chartDimensions: this.chartDimensions
      })
      tD.appendChild(tDContent.getTdNode())
      return tD
    })
  }

  setup () {
    setupTable.get(this)()
  }
}
export default ProvinceVisTable
