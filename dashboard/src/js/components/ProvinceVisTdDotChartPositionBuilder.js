let xDot
let yDot
let xBlock
let yBlock
let countRow
let countBlock
const squareSeparator = new WeakMap()
const blockSeparator = new WeakMap()

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
const getBlockSide = new WeakMap()
const setDotPosNextToCurrent = new WeakMap()
class ProvinceVisTdDotChartPositionData {
  constructor (width, dotWidth) {
    this.width = width
    this.dotWidth = dotWidth
    squareSeparator.set(this, () => dotWidth < 3 ? 1 : dotWidth / 3)
    blockSeparator.set(this, () => dotWidth < 3 ? 10 : dotWidth / 3 * 10)
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
      yDot += this.dotWidth + squareSeparator.get(this)()
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
      return xBlock + getBlockSide.get(this)() * 2 > this.width
    })

    setDotPosInNewBlockBehindCurrent.set(this, () => {
      xBlock = 0
      yBlock += getBlockSide.get(this)()
      xDot = 0
      yDot = yBlock
    })

    setDotPosInNewBlockNextToCurrent.set(this, () => {
      xBlock += getBlockSide.get(this)()
      xDot = xBlock
      yDot = yBlock
    })

    getBlockSide.set(this, () => {
      return this.dotWidth * 12 + blockSeparator.get(this)()
    })

    setDotPosNextToCurrent.set(this, () => {
      xDot += this.dotWidth + squareSeparator.get(this)()
    })
  }

  setCurrentPosition (squareIndex) {
    if (squareIndex === 0) return
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
    return { x: xDot, y: yDot }
  }

  getChartHeight () {
    return yBlock + getBlockSide.get(this)()
  }
}
export default ProvinceVisTdDotChartPositionData
