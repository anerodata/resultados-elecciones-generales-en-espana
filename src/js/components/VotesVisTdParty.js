import VotesVisTd from './VotesVisTd.js'
class VotesVisTdParty extends VotesVisTd {
  constructor (value, color) {
    super(value)
    this.color = color
  }

  getTdNode () {
    const textNode = document.createTextNode(this.value)
    const tdContent = super.getTdContent(textNode)
    tdContent.style.fontWeight = 'bold'
    tdContent.style.color = `${this.color}`
    return tdContent
  }
}
export default VotesVisTdParty
