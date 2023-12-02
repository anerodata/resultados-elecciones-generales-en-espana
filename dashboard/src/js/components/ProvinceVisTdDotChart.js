import * as d3 from 'd3'
let height = 0
const setupCustomBase = new WeakMap()
const setupVis = new WeakMap()

class ProvinceVisTdDotChart {
  constructor (config) {
    this.value = config.value
    this.color = config.color
    this.width = config.chartDimensions.chartWidth
    this.widthSq = config.chartDimensions.widthSq
    this.sep = config.chartDimensions.sep
    setupCustomBase.set(this, () => {
      let customBase = document.createElement('custom')
      customBase = d3.select(customBase)
      let iX = 0
      let iY = 0
      let bStart = true

      let nBlockX = 0
      let nBlockY = 0

      let countTen = 0
      let countHund = 0

      for (let i = 0; i < this.value; i++) {
        customBase.append('custom')
          .attr('class', 'square')
          .attr('width', this.widthSq)
          .attr('height', this.widthSq)
          .attr('x', () => {
            if (!bStart) {
              countTen += 1
              countHund += 1
              // nuevo renglon dentro del cuadro
              if (countTen === 10 && countHund < 100) {
                countTen = 0
                iX = nBlockX
                iY += this.sep + 1
              } else if (countHund === 100) {
                countHund = 0
                countTen = 0
                // nuevo renglon en otro cuadro debajo
                if (nBlockX + ((this.sep * 12) + 10) * 2 > this.width) {
                  nBlockX = 0
                  iX = 0
                  nBlockY += this.sep * 12 + 10
                  iY = nBlockY
                  /// /nuevo renglon en otro cuadro a continuacion
                } else {
                  nBlockX += this.sep * 12 + 10
                  iX = nBlockX
                  iY = nBlockY
                }
              } else {
                // nuevo punto a continuacion del anterior
                iX += this.sep + 1
              }
            }
            // comienzo
            bStart = false
            return iX
          })
          .attr('y', function () {
            return iY
          })
          .attr('fillStyle', this.color)
      }
      height = nBlockY + this.widthSq + this.sep * 12 + 10 + 3
      return customBase
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
      console.log(height)
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
