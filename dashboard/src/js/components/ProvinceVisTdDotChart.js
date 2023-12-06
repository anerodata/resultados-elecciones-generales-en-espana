import * as d3 from 'd3'
let height = 0
const setupCustomBase = new WeakMap()
const setupVis = new WeakMap()
const calcCoordinates = new WeakMap()
function CalcFactors () {
  this.iX = 0
  this.iY = 0
  this.bStart = true
  this.nBlockX = 0
  this.nBlockY = 0
  this.countTen = 0
  this.countHund = 0
}

class ProvinceVisTdDotChart {
  constructor (config) {
    this.value = config.value
    this.color = config.color
    this.width = config.chartDimensions.chartWidth
    this.widthSq = config.chartDimensions.widthSq
    this.sep = config.chartDimensions.sep
    setupCustomBase.set(this, () => {
      const calcFactors = new CalcFactors()
      const customBase = document.createElement('custom')
      let coordinates = {}
      const calcCoordinates = (calcFactors, i, value) => {
        if (!calcFactors.bStart) {
          calcFactors.countTen += 1
          calcFactors.countHund += 1
          // nuevo renglon dentro del cuadro
          if (calcFactors.countTen === 10 && calcFactors.countHund < 100) {
            calcFactors.countTen = 0
            calcFactors.iX = calcFactors.nBlockX
            calcFactors.iY += this.sep + 1
          } else if (calcFactors.countHund === 100) {
            calcFactors.countHund = 0
            calcFactors.countTen = 0
            // nuevo renglon en otro cuadro debajo
            if (calcFactors.nBlockX + ((this.sep * 12) + 10) * 2 > this.width) {
              calcFactors.nBlockX = 0
              calcFactors.iX = 0
              calcFactors.nBlockY += this.sep * 12 + 10
              calcFactors.iY = calcFactors.nBlockY
              /// /nuevo renglon en otro cuadro a continuacion
            } else {
              calcFactors.nBlockX += this.sep * 12 + 10
              calcFactors.iX = calcFactors.nBlockX
              calcFactors.iY = calcFactors.nBlockY
            }
          } else {
            // nuevo punto a continuacion del anterior
            calcFactors.iX += this.sep + 1
          }
        }
        // comienzo
        calcFactors.bStart = false
        return { x: calcFactors.iX, y: calcFactors.iY, nBlockY: calcFactors.nBlockY }
      }
      for (let i = 0; i < this.value; i++) {
        const customSquare = document.createElement('custom')
        customBase.appendChild(customSquare)
        customSquare.classList.add('square')
        customSquare.setAttribute('width', `${this.widthSq}`) // .width = `${this.widthSq}px`
        customSquare.setAttribute('height', `${this.widthSq}`) // .height = `${this.widthSq}px`
        coordinates = calcCoordinates(calcFactors, i, this.value)
        customSquare.setAttribute('x', coordinates.x)
        customSquare.setAttribute('y', coordinates.y)
        customSquare.setAttribute('fillStyle', this.color)
      }
      height = coordinates.nBlockY + this.widthSq + this.sep * 12 + 10 + 3
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
