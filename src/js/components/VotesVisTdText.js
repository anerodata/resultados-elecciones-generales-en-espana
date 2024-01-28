import VotesVisTd from './VotesVisTd.js'

class VotesVisTdText extends VotesVisTd {
  constructor ({ valueKey, row, color, getTooltipContent, tdType }) {
    super({ valueKey, row, color, getTooltipContent, tdType })
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
