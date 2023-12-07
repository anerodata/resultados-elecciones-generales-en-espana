import ProvinceVisTdDotChartPositionBuilder from './ProvinceVisTdDotChartPositionBuilder.js'
let height = 0
const setupCustomBase = new WeakMap()
const setupVisualization = new WeakMap()
const setupCanvas = new WeakMap()
const setupContext = new WeakMap()
const setupContextAttr = new WeakMap()
const setupCanvasContainer = new WeakMap()
class ProvinceVisTdDotChart {
  constructor (config) {
    this.value = config.value
    this.color = config.color
    this.width = config.chartDimensions.chartWidth
    this.dotWidth = config.chartDimensions.dotWidth
    this.posData = new ProvinceVisTdDotChartPositionBuilder(this.width, this.dotWidth)
    setupCustomBase.set(this, () => {
      const customBase = document.createElement('custom')
      for (let i = 0; i < this.value; i++) {
        const customDot = document.createElement('custom')
        const currentCoord = this.posData.getPosition(i)
        customDot.setAttribute('x', currentCoord.xDot)
        customDot.setAttribute('y', currentCoord.yDot)
        customDot.setAttribute('width', `${this.dotWidth}`)
        customDot.setAttribute('height', `${this.dotWidth}`)
        customDot.setAttribute('fillStyle', this.color)
        customDot.classList.add('square')
        customBase.appendChild(customDot)
      }
      height = this.posData.getChartHeight()
      return customBase
    })
    setupVisualization.set(this, (customBase) => {
      const canvas = setupCanvas.get(this)()
      const context = setupContext.get(this)(canvas)
      const dots = customBase.querySelectorAll('.square')
      dots.forEach((dot) => {
        setupContextAttr.get(this)(context, dot)
      })
      const canvasContainer = setupCanvasContainer.get(this)()
      canvasContainer.appendChild(canvas)
      return canvasContainer
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
      context.fillRect(
        el.getAttribute('x'),
        el.getAttribute('y'),
        el.getAttribute('width'),
        el.getAttribute('height')
      )
    })
    setupCanvasContainer.set(this, () => {
      const canvasContainer = document.createElement('div')
      canvasContainer.style.height = `${height}px`
      return canvasContainer
    })
  }

  getTdNode () {
    const customBase = setupCustomBase.get(this)()
    const visualization = setupVisualization.get(this)(customBase)
    return visualization
  }
}
export default ProvinceVisTdDotChart
