class ProvinceVisTdDotChart {
  constructor (config) {
    this.value = config.value
    this.color = config.color
  }

  getTdNode () {
    const span = document.createElement('span')
    const textNode = document.createTextNode(this.value)
    span.appendChild(textNode)
    return span
  }
}
export default ProvinceVisTdDotChart
