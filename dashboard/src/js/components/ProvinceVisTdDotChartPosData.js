let iX
let iY
let nBlockX
let nBlockY
let countRow
let countBlock
const addOneToCountRowBlock = new WeakMap()
const isDotInNewRow = new WeakMap()
const restartCountRow = new WeakMap()
const initRowInNewBlock = new WeakMap()
const isDotInNewBlock = new WeakMap()
const restartCountRowBlock = new WeakMap()
const initDotInNewBlock = new WeakMap()
const isDotInNewBlockBehindCurrent = new WeakMap()
const initDotInNewBlockBehindCurrent = new WeakMap()
const initDotInNewBlockNextToCurrent = new WeakMap()
const initDotNextToCurrent = new WeakMap()
class ProvinceVisTdDotChartPosData {
  constructor (width, sep) {
    this.width = width
    this.sep = sep
    iX = 0
    iY = 0
    nBlockX = 0
    nBlockY = 0
    countRow = 0
    countBlock = 0
    addOneToCountRowBlock.set(this, () => {
      countRow += 1
      countBlock += 1
    })
    isDotInNewRow.set(this, () => {
      return countRow === 10 && countBlock < 100
    })
    restartCountRow.set(this, () => {
      countRow = 0
    })
    initRowInNewBlock.set(this, () => {
      iX = nBlockX
      iY += this.sep + 1
    })
    isDotInNewBlock.set(this, () => {
      return countBlock === 100
    })
    restartCountRowBlock.set(this, () => {
      countBlock = 0
      countRow = 0
    })
    initDotInNewBlock.set(this, () => {
      if (isDotInNewBlockBehindCurrent.get(this)()) {
        initDotInNewBlockBehindCurrent.get(this)()
        return { iX, iY, nBlockX, nBlockY }
      }
      initDotInNewBlockNextToCurrent.get(this)()
      return { iX, iY, nBlockX, nBlockY }
    })
    isDotInNewBlockBehindCurrent.set(this, () => {
      return nBlockX + ((this.sep * 12) + 10) * 2 > this.width
    })
    initDotInNewBlockBehindCurrent.set(this, () => {
      nBlockX = 0
      iX = 0
      nBlockY += this.sep * 12 + 10
      iY = nBlockY
    })
    initDotInNewBlockNextToCurrent.set(this, () => {
      nBlockX += this.sep * 12 + 10
      iX = nBlockX
      iY = nBlockY
    })
    initDotNextToCurrent.set(this, () => {
      iX += this.sep + 1
    })
  }

  getPosition (squareIndex) {
    if (squareIndex === 0) {
      return { iX, iY, nBlockX, nBlockY }
    }
    addOneToCountRowBlock.get(this)()
    if (isDotInNewRow.get(this)()) {
      restartCountRow.get(this)()
      initRowInNewBlock.get(this)()
      return { iX, iY, nBlockX, nBlockY }
    }
    if (isDotInNewBlock.get(this)()) {
      restartCountRowBlock.get(this)()
      const coord = initDotInNewBlock.get(this)()
      return coord
    }
    initDotNextToCurrent.get(this)()
    return { iX, iY, nBlockX, nBlockY }
  }

  getChartHeight () {
    return nBlockY + this.sep * 10 + 10
  }
}
export default ProvinceVisTdDotChartPosData
