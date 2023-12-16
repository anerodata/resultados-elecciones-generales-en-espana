class VotesVisTdParty {
  constructor (config) {
    this.value = config.value.length > 5 ? config.value.slice(0, 5) + '.' : config.value
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
export default VotesVisTdParty
