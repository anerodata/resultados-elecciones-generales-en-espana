import * as d3 from 'd3'
class ProvinceVisTdDotChart {
  constructor (config) {
    this.value = config.value
    this.color = config.color
    this.chartDimensions = config.chartDimensions
  }

  getTdNode () {
    console.log(this)
    const span = document.createElement('span')
    const textNode = document.createTextNode(this.value)
    span.appendChild(textNode)
    return span
  }
}
export default ProvinceVisTdDotChart
