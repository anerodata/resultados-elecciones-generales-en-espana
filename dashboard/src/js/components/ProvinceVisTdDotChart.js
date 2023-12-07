import * as d3 from 'd3'
import ProvinceVisTdDotChartPosData from './ProvinceVisTdDotChartPosData.js'
let height = 0
const setupCustomBase = new WeakMap()
const setupVis = new WeakMap()
const calcCoordinates = new WeakMap()
class ProvinceVisTdDotChart {
  constructor (config) {
    this.value = config.value
    this.color = config.color
    this.width = config.chartDimensions.chartWidth
    this.widthSq = config.chartDimensions.widthSq
    this.sep = config.chartDimensions.sep
    setupCustomBase.set(this, () => {
      const posData = new ProvinceVisTdDotChartPosData(this.width, this.sep)
      const customBase = document.createElement('custom')
      let currentCoord = {}
      for (let i = 0; i < this.value; i++) {
        const customSquare = document.createElement('custom')
        customBase.appendChild(customSquare)
        customSquare.classList.add('square')
        customSquare.setAttribute('width', `${this.widthSq}`) // .width = `${this.widthSq}px`
        customSquare.setAttribute('height', `${this.widthSq}`) // .height = `${this.widthSq}px`
        currentCoord = posData.getPosition(i)
        customSquare.setAttribute('x', currentCoord.iX)
        customSquare.setAttribute('y', currentCoord.iY)
        customSquare.setAttribute('fillStyle', this.color)
      }
      height = posData.getChartHeight()
      console.log(height)
      return customBase
    })
    calcCoordinates.set(this, () => {
    })
    setupVis.set(this, (customBase) => {
      let canvas = document.createElement('canvas')
      canvas = d3.select(canvas)
        .attr('width', this.width)
        .attr('height', height)

      const context = canvas.node().getContext('2d')
      context.clearRect(0, 0, this.width, height)
      const elements = customBase.selectAll('custom.square')
      elements.each(function () {
        const node = d3.select(this)
        context.fillStyle = node.attr('fillStyle')
        context.fillRect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'))
      })
      const canvasContainer = document.createElement('div')
      canvasContainer.appendChild(canvas.node())
      canvasContainer.style.height = `${height}px`
      return canvasContainer
    })
  }

  getTdNode () {
    const customBase = setupCustomBase.get(this)()
    const vis = setupVis.get(this)(d3.select(customBase))
    return vis
  }
}
export default ProvinceVisTdDotChart
