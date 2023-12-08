let xDot
let yDot
let xBlock
let yBlock
let countRow
let countBlock
const blockSeparator = 10
const getDotCoord = new WeakMap()
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

    getDotCoord.set(this, () => {
      return { xDot, yDot }
    })

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
    })

    isDotInNewBlock.set(this, () => {
      return countBlock === 100
    })

    restartCountBlock.set(this, () => {
      countBlock = 0
    })

    setupDotPosInNewBlock.set(this, () => {
      if (isDotInNewBlockBehindCurrent.get(this)()) {
        setupDotPosInNewBlockBehindCurrent.get(this)()
        return
      }
      setupDotPosInNewBlockNextToCurrent.get(this)()
    })

    isDotInNewBlockBehindCurrent.set(this, () => {
      return xBlock + ((this.dotWidth * 12) + 10) * 2 > this.width
    })

    setupDotPosInNewBlockBehindCurrent.set(this, () => {
      xBlock = 0
      yBlock += getBlockSize.get(this)()
      xDot = 0
      yDot = yBlock
    })

    setupDotPosInNewBlockNextToCurrent.set(this, () => {
      xBlock += getBlockSize.get(this)()
      xDot = xBlock
      yDot = yBlock
    })

    getBlockSize.set(this, () => {
      return this.dotWidth * 12 + blockSeparator
    })

    setupDotPosNextToCurrent.set(this, () => {
      xDot += this.dotWidth + 1
    })
  }

  setCurrentPosition (squareIndex) {
    if (squareIndex === 0) {
      return
    }
    addOneToCountRowBlock.get(this)()
    if (isDotInNewRow.get(this)()) {
      restartCountRow.get(this)()
      setupDotPosInNewRow.get(this)()
      return
    }
    if (isDotInNewBlock.get(this)()) {
      restartCountRow.get(this)()
      restartCountBlock.get(this)()
      setupDotPosInNewBlock.get(this)()
      return
    }
    setupDotPosNextToCurrent.get(this)()
  }

  getCurrentPosition () {
    return { xDot, yDot }
  }

  getChartHeight () {
    return yBlock + getBlockSize.get(this)()
  }

}
export default ProvinceVisTdDotChartPositionData
