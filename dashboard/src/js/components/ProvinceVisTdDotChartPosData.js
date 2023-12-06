let iX
let iY
let bStart
let nBlockX
let nBlockY
let countRow
let countBlock
const addOneToCountRowBlock = new WeakMap()
const dotIsInNewRow = new WeakMap()
const initNewRow = new WeakMap()
const dotIsInNewBlock = new WeakMap()
const restartCountRowBlock = new WeakMap()
class ProvinceVisTdDotChartPosData {
  constructor (width, sep) {
    this.width = width
    this.sep = sep
    iX = 0
    iY = 0
    bStart = true
    nBlockX = 0
    nBlockY = 0
    countRow = 0
    countBlock = 0
    addOneToCountRowBlock.set(this, () => {
      countRow += 1
      countBlock += 1
    })
    dotIsInNewRow.set(this, () => {
      return countRow === 10 && countBlock < 100
    })
    initNewRow.set(this, () => {
      countRow = 0
      iX = nBlockX
      iY += this.sep + 1
    })
    dotIsInNewBlock.set(this, () => {
      return countBlock === 100
    })
    restartCountRowBlock.set(this, () => {
      countBlock = 0
      countRow = 0
    })
  }

  getPosition () {
    if (bStart) {
      bStart = false
      return { iX, iY, nBlockX, nBlockY }
    }
    if (!bStart) {
      addOneToCountRowBlock.get(this)()
    }
    if (dotIsInNewRow.get(this)()) {
      initNewRow.get(this)()
    } else if (dotIsInNewBlock.get(this)()) {
      restartCountRowBlock.get(this)()
      // nuevo renglon en otro cuadro debajo
      if (nBlockX + ((this.sep * 12) + 10) * 2 > this.width) {
        nBlockX = 0
        iX = 0
        nBlockY += this.sep * 12 + 10
        iY = nBlockY
        /// /nuevo renglon en otro cuadro a continuacion
      } else {
        nBlockX += this.sep * 12 + 10
        iX = nBlockX
        iY = nBlockY
      }
    } else {
      // nuevo punto a continuacion del anterior
      iX += this.sep + 1
    }
    // comienzo
    return { iX, iY, nBlockX, nBlockY }
  }

  getChartHeight () {
    return nBlockY + this.sep * 10 + 10
  }
}
export default ProvinceVisTdDotChartPosData
