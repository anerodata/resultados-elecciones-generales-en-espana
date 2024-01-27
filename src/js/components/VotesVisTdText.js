import VotesVisTd from './VotesVisTd.js'

class VotesVisTdText extends VotesVisTd {
  constructor (value, color, getTooltipContent, row) {
    super({ value, className: 'party', color, getTooltipContent, row })
  }

  getTdNode () {
    const textNode = document.createTextNode(this.value)
    const tdContent = super.getTdContent(textNode)
    tdContent.style.fontWeight = 'bold'
    tdContent.style.color = `${this.color}`
    super.setTooltipEvents(tdContent)
    return tdContent
  }
}
export default VotesVisTdText
