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
const setupDotPosInNewRow = new WeakMap()

const isDotInNewBlock = new WeakMap()
const restartCountBlock = new WeakMap()
const setupDotPosInNewBlock = new WeakMap()
const isDotInNewBlockBehindCurrent = new WeakMap()
const setupDotPosInNewBlockBehindCurrent = new WeakMap()
const setupDotPosInNewBlockNextToCurrent = new WeakMap()
const getBlockSize = new WeakMap()
const setupDotPosNextToCurrent = new WeakMap()
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

    setupDotPosInNewRow.set(this, () => {
      xDot = xBlock
      yDot += this.dotWidth + 1
      return { xDot, yDot }
    })

    isDotInNewBlock.set(this, () => {
      return countBlock === 100
    })

    restartCountBlock.set(this, () => {
      countBlock = 0
    })

    setupDotPosInNewBlock.set(this, () => {
      if (isDotInNewBlockBehindCurrent.get(this)()) {
        const coord = setupDotPosInNewBlockBehindCurrent.get(this)()
        return coord
      }
      const coord = setupDotPosInNewBlockNextToCurrent.get(this)()
      return coord
    })

    isDotInNewBlockBehindCurrent.set(this, () => {
      return xBlock + ((this.dotWidth * 12) + 10) * 2 > this.width
    })

    setupDotPosInNewBlockBehindCurrent.set(this, () => {
      xBlock = 0
      yBlock += getBlockSize.get(this)()
      xDot = 0
      yDot = yBlock
      return { xDot, yDot }
    })

    setupDotPosInNewBlockNextToCurrent.set(this, () => {
      xBlock += getBlockSize.get(this)()
      xDot = xBlock
      yDot = yBlock
      return { xDot, yDot }
    })

    getBlockSize.set(this, () => {
      return this.dotWidth * 12 + blockSeparator
    })

    setupDotPosNextToCurrent.set(this, () => {
      xDot += this.dotWidth + 1
      return { xDot, yDot }
    })
  }

  getPosition (squareIndex) {
    if (squareIndex === 0) {
      return { xDot, yDot }
    }
    addOneToCountRowBlock.get(this)()
    if (isDotInNewRow.get(this)()) {
      restartCountRow.get(this)()
      const coord = setupDotPosInNewRow.get(this)()
      return coord
    }
    if (isDotInNewBlock.get(this)()) {
      restartCountRow.get(this)()
      restartCountBlock.get(this)()
      const coord = setupDotPosInNewBlock.get(this)()
      return coord
    }
    const coord = setupDotPosNextToCurrent.get(this)()
    return coord
  }

  getChartHeight () {
    return yBlock + getBlockSize.get(this)()
  }
}
export default ProvinceVisTdDotChartPositionData
