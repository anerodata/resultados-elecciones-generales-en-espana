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
const setDotPosInNewRow = new WeakMap()

const isDotInNewBlock = new WeakMap()
const restartCountBlock = new WeakMap()
const setDotPosInNewBlock = new WeakMap()
const isDotInNewBlockBehindCurrent = new WeakMap()
const setDotPosInNewBlockBehindCurrent = new WeakMap()
const setDotPosInNewBlockNextToCurrent = new WeakMap()
const getBlockSize = new WeakMap()
const setDotPosNextToCurrent = new WeakMap()
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

    setDotPosInNewRow.set(this, () => {
      xDot = xBlock
      yDot += this.dotWidth + 1
    })

    isDotInNewBlock.set(this, () => {
      return countBlock === 100
    })

    restartCountBlock.set(this, () => {
      countBlock = 0
    })

    setDotPosInNewBlock.set(this, () => {
      if (isDotInNewBlockBehindCurrent.get(this)()) {
        setDotPosInNewBlockBehindCurrent.get(this)()
        return
      }
      setDotPosInNewBlockNextToCurrent.get(this)()
    })

    isDotInNewBlockBehindCurrent.set(this, () => {
      return xBlock + getBlockSize.get(this)() * 2 > this.width
    })

    setDotPosInNewBlockBehindCurrent.set(this, () => {
      xBlock = 0
      yBlock += getBlockSize.get(this)()
      xDot = 0
      yDot = yBlock
    })

    setDotPosInNewBlockNextToCurrent.set(this, () => {
      xBlock += getBlockSize.get(this)()
      xDot = xBlock
      yDot = yBlock
    })

    getBlockSize.set(this, () => {
      return this.dotWidth * 12 + blockSeparator
    })

    setDotPosNextToCurrent.set(this, () => {
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
      setDotPosInNewRow.get(this)()
      return
    }
    if (isDotInNewBlock.get(this)()) {
      restartCountRow.get(this)()
      restartCountBlock.get(this)()
      setDotPosInNewBlock.get(this)()
      return
    }
    setDotPosNextToCurrent.get(this)()
  }

  getCurrentPosition () {
    return { xDot, yDot }
  }

  getChartHeight () {
    return yBlock + getBlockSize.get(this)()
  }
}
export default ProvinceVisTdDotChartPositionData
