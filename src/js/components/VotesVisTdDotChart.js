import VotesVisTd from './VotesVisTd.js'
import VotesVisTdDotChartPositionBuilder from './VotesVisTdDotChartPositionBuilder.js'

let height = 0
const setupCustomBase = new WeakMap()
const getCustomDotElement = new WeakMap()
const setCurrentPosition = new WeakMap()
const setupVisualization = new WeakMap()
const setupCanvas = new WeakMap()
const setupContext = new WeakMap()
const setupContextAttr = new WeakMap()

class VotesVisTdDotChart extends VotesVisTd {
  constructor ({ valueKey, row, color, getTooltipContent, tdType, width, votesPerDot, dotWidth }) {
    super({ valueKey, row, color, getTooltipContent, tdType })
    this.dotsNum = Math.ceil(this.value / votesPerDot)
    this.dotsNumDecimalPart = (this.value / votesPerDot) % 1
    this.width = width
    this.dotWidth = dotWidth
    this.posData = new VotesVisTdDotChartPositionBuilder(width, this.dotWidth)

    setupCustomBase.set(this, () => {
      const customBase = document.createElement('custom')
      for (let i = 0; i < this.dotsNum; i++) {
        const customDot = getCustomDotElement.get(this)(i)
        customBase.appendChild(customDot)
      }
      height = this.posData.getChartHeight()
      return customBase
    })

    getCustomDotElement.set(this, (i) => {
      setCurrentPosition.get(this)(i)
      const customDot = document.createElement('custom')
      const currentCoord = this.posData.getCurrentPosition(i)
      customDot.setAttribute('x', currentCoord.x)
      customDot.setAttribute('y', currentCoord.y)
      customDot.setAttribute('width', `${currentCoord.width}`)
      customDot.setAttribute('height', `${this.dotWidth}`)
      customDot.setAttribute('fillStyle', this.color)
      customDot.setAttribute('opacity', 0.8)
      customDot.classList.add('square')
      return customDot
    })

    setCurrentPosition.set(this, (i) => {
      if (i === this.dotsNum - 1) {
        this.posData.setCurrentPosition(this.dotsNumDecimalPart)
        return
      }
      this.posData.setCurrentPosition(i)
    })

    setupVisualization.set(this, (customBase) => {
      const canvas = setupCanvas.get(this)()
      const context = setupContext.get(this)(canvas)
      const dots = customBase.querySelectorAll('.square')
      dots.forEach((dot) => {
        setupContextAttr.get(this)(context, dot)
      })
      return canvas
    })

    setupCanvas.set(this, () => {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', this.width)
      canvas.setAttribute('height', height)
      return canvas
    })

    setupContext.set(this, (canvas) => {
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, this.width, height)
      return context
    })

    setupContextAttr.set(this, (context, el) => {
      context.fillStyle = el.getAttribute('fillStyle')
      context.globalAlpha = el.getAttribute('opacity')
      context.fillRect(
        el.getAttribute('x'),
        el.getAttribute('y'),
        el.getAttribute('width'),
        el.getAttribute('height')
      )
    })
  }

  getTdNode () {
    const customBase = setupCustomBase.get(this)()
    const visualization = setupVisualization.get(this)(customBase)
    const tdContent = super.getTdContent(visualization)
    tdContent.style.height = `${height}px`
    return tdContent
  }
}
export default VotesVisTdDotChart
