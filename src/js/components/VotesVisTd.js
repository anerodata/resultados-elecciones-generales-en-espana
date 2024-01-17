class VoteVisTd {
  constructor (value, className) {
    this.value = value
    this.className = className
  }

  getTdContent (contentNode) {
    const container = document.createElement('div')
    container.classList.add(this.className)
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
