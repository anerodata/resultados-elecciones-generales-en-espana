import VotesVisTd from './VotesVisTd.js'
class VotesVisTdParty extends VotesVisTd {
  constructor (config) {
    super(config.value)
    this.color = config.color
  }

  getTdNode () {
    const textNode = document.createTextNode(this.value)
    const partyContent = super.getTdContent(textNode)
    partyContent.style.fontWeight = 'bold'
    partyContent.style.color = `${this.color}`
    return partyContent
  }
}
export default VotesVisTdParty
