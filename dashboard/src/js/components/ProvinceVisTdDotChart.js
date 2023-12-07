import ProvinceVisTdDotChartPositionBuilder from './ProvinceVisTdDotChartPositionBuilder.js'
let height = 0
const setupCustomBase = new WeakMap()
const setupVis = new WeakMap()
const calcCoordinates = new WeakMap()
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
    calcCoordinates.set(this, () => {
    })
    setupVis.set(this, (customBase) => {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', this.width)
      canvas.setAttribute('height', height)
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, this.width, height)
      const elements = customBase.querySelectorAll('.square')
      elements.forEach(function (el) {
        context.fillStyle = el.getAttribute('fillStyle')
        context.fillRect(
          el.getAttribute('x'),
          el.getAttribute('y'),
          el.getAttribute('width'),
          el.getAttribute('height')
        )
      })
      const canvasContainer = document.createElement('div')
      canvasContainer.appendChild(canvas)
      canvasContainer.style.height = `${height}px`
      return canvasContainer
    })
  }

  getTdNode () {
    const customBase = setupCustomBase.get(this)()
    const vis = setupVis.get(this)(customBase)
    return vis
  }
}
export default ProvinceVisTdDotChart
