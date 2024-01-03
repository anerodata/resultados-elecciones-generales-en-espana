class VoteVisTd {
  constructor (value) {
    this.value = value
  }

  getTdContent (contentNode) {
    const container = document.createElement('div')
    container.appendChild(contentNode)
    return container
  }

  getTdNode () {
    const contentNode = document.createTextNode(this.value)
    const content = this.getTdContent(contentNode)
    return content
  }
}
export default VoteVisTd
