let xDot
let yDot
let xBlock
let yBlock
let countRow
let countBlock
const blockSeparator = 10
const addOneToCountRowBlock = new WeakMap()

const isDotInNewRow = new WeakMap()
const restartCountRow = new WeakMap()
const initDotInNewRow = new WeakMap()

const isDotInNewBlock = new WeakMap()
const restartCountBlock = new WeakMap()
const initDotInNewBlock = new WeakMap()
const isDotInNewBlockBehindCurrent = new WeakMap()
const initDotInNewBlockBehindCurrent = new WeakMap()
const initDotInNewBlockNextToCurrent = new WeakMap()
const getBlockSize = new WeakMap()
const initDotNextToCurrent = new WeakMap()
class ProvinceVisTdDotChartPositionData {
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

    restartCountBlock.set(this, () => {
      countBlock = 0
    })

    initDotInNewBlock.set(this, () => {
      if (isDotInNewBlockBehindCurrent.get(this)()) {
        initDotInNewBlockBehindCurrent.get(this)()
        return { xDot, yDot }
      }
      initDotInNewBlockNextToCurrent.get(this)()
      return { xDot, yDot }
    })

    isDotInNewBlockBehindCurrent.set(this, () => {
      return xBlock + ((this.dotWidth * 12) + 10) * 2 > this.width
    })

    initDotInNewBlockBehindCurrent.set(this, () => {
      xBlock = 0
      yBlock += getBlockSize.get(this)()
      xDot = 0
      yDot = yBlock
    })

    initDotInNewBlockNextToCurrent.set(this, () => {
      xBlock += getBlockSize.get(this)()
      xDot = xBlock
      yDot = yBlock
    })

    getBlockSize.set(this, () => {
      return this.dotWidth * 12 + blockSeparator
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
      restartCountRow.get(this)()
      restartCountBlock.get(this)()
      const coord = initDotInNewBlock.get(this)()
      return coord
    }
    initDotNextToCurrent.get(this)()
    return { xDot, yDot }
  }

  getChartHeight () {
    return yBlock + getBlockSize.get(this)()
  }
}
export default ProvinceVisTdDotChartPositionData
