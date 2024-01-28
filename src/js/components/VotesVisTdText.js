import VotesVisTd from './VotesVisTd.js'

class VotesVisTdText extends VotesVisTd {
  constructor ({ value, row, color, getTooltipContent, className }) {
    super({ value, row, color, getTooltipContent, className })
  }

  getTdNode () {
    const textNode = document.createTextNode(this.value)
    const tdContent = super.getTdContent(textNode)
    tdContent.style.fontWeight = 'bold'
    tdContent.style.color = `${this.color}`
    return tdContent
  }
}
export default VotesVisTdText
