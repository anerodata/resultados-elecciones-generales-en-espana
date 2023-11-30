class ProvinceVisTdParty {
  constructor (config) {
    this.value = config.value
    this.color = config.color
  }

  getTdNode () {
    const partySpan = document.createElement('span')
    const textNode = document.createTextNode(this.value)
    partySpan.appendChild(textNode)
    partySpan.style.fontWeight = 'bold'
    partySpan.style.color = `${this.color}`
    return partySpan
  }
}
export default ProvinceVisTdParty
