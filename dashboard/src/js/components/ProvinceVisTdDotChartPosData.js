let xDot
let yDot
let xBlock
let yBlock
let countRow
let countBlock
const addOneToCountRowBlock = new WeakMap()

const isDotInNewRow = new WeakMap()
const restartCountRow = new WeakMap()
const initDotInNewRow = new WeakMap()

const isDotInNewBlock = new WeakMap()
const restartCountRowBlock = new WeakMap()
const initDotInNewBlock = new WeakMap()
const isDotInNewBlockBehindCurrent = new WeakMap()
const initDotInNewBlockBehindCurrent = new WeakMap()
const initDotInNewBlockNextToCurrent = new WeakMap()
const initDotNextToCurrent = new WeakMap()
class ProvinceVisTdDotChartPosData {
  constructor (width, dotWidth) {
    this.width = width
    this.dotWidth = dotWidth
    xDot = 0
    yDot = 0
    xBlock = 0
    yBlock = 0
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
    initDotInNewRow.set(this, () => {
      xDot = xBlock
      yDot += this.dotWidth + 1
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
        return { xDot, yDot, xBlock, yBlock }
      }
      initDotInNewBlockNextToCurrent.get(this)()
      return { xDot, yDot, xBlock, yBlock }
    })
    isDotInNewBlockBehindCurrent.set(this, () => {
      return xBlock + ((this.dotWidth * 12) + 10) * 2 > this.width
    })
    initDotInNewBlockBehindCurrent.set(this, () => {
      xBlock = 0
      xDot = 0
      yBlock += this.dotWidth * 12 + 10
      yDot = yBlock
    })
    initDotInNewBlockNextToCurrent.set(this, () => {
      xBlock += this.dotWidth * 12 + 10
      xDot = xBlock
      yDot = yBlock
    })
    initDotNextToCurrent.set(this, () => {
      xDot += this.dotWidth + 1
    })
  }

  getPosition (squareIndex) {
    if (squareIndex === 0) {
      return { xDot, yDot }
    }
    addOneToCountRowBlock.get(this)()
    if (isDotInNewRow.get(this)()) {
      restartCountRow.get(this)()
      initDotInNewRow.get(this)()
      return { xDot, yDot }
    }
    if (isDotInNewBlock.get(this)()) {
      restartCountRowBlock.get(this)()
      const coord = initDotInNewBlock.get(this)()
      return coord
    }
    initDotNextToCurrent.get(this)()
    return { xDot, yDot }
  }

  getChartHeight () {
    return yBlock + this.dotWidth * 12 + 10
  }
}
export default ProvinceVisTdDotChartPosData
