class ProvinceVisTdVariation {
  constructor (config) {
    this.value = config.value
  }

  getTdNode () {
    const span = document.createElement('span')
    const textNode = document.createTextNode(this.value)
    span.appendChild(textNode)
    return span
  }
}
export default ProvinceVisTdVariation
