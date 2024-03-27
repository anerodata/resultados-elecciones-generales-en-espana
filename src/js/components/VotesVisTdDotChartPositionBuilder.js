let xDot
let yDot
const widthDot = new WeakMap()
let xBlock
let yBlock
let countRow
let countBlock
const dotSeparator = new WeakMap()
const blockSeparator = new WeakMap()

const isFirstDotOfChart = new WeakMap()
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
const setDotPosDownCurrent = new WeakMap()
class VotesVisTdDotChartPositionData {
  constructor (width, dotWidth, dotsNum) {
    this.width = width
    this.dotWidth = dotWidth
    this.dotsNum = dotsNum

    dotSeparator.set(this, () => 1)
    blockSeparator.set(this, () => dotWidth / 10 * 10)
    xDot = 0
    yDot = 0
    xBlock = 0
    yBlock = 0
    countRow = 0
    countBlock = 0

    isFirstDotOfChart.set(this, (dotIndex) => {
      return dotIndex === 1 || this.dotsNum === 1
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

    setDotPosInNewRow.set(this, () => {
      yDot = yBlock
      xDot += this.dotWidth + dotSeparator.get(this)()
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
      return this.dotWidth * 10 + dotSeparator.get(this)() * 10 + blockSeparator.get(this)()
    })

    setDotPosDownCurrent.set(this, () => {
      yDot += this.dotWidth + dotSeparator.get(this)()
    })
  }

  setCurrentPosition (dotIndex) {
    this.setDotWidth(dotIndex)
    if (isFirstDotOfChart.get(this)(dotIndex)) {
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
    setDotPosDownCurrent.get(this)()
  }

  setDotWidth (dotIndex) {
    widthDot.set(this, () => {
      if (dotIndex % 1 === 0) {
        return this.dotWidth
      }
      return dotIndex * this.dotWidth
    })
  }

  getCurrentPosition () {
    return { x: xDot, y: yDot, width: widthDot.get(this)() }
  }

  getChartHeight () {
    return yBlock + getBlockSide.get(this)()
  }
}
export default VotesVisTdDotChartPositionData
