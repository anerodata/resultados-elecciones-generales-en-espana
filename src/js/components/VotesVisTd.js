import tooltipEventSubscriber from './tooltipEventSubscriber.js'

const bindEvents = new WeakMap()

class VoteVisTd {
  constructor (value, className, row, getTooltipContent) {
    this.value = value
    this.className = className
    this.row = row
    this.getTooltipContent = getTooltipContent
    bindEvents.set(this, (tdContent) => {
      tdContent.addEventListener('mouseenter', (evt) => {
        tooltipEventSubscriber.publish('tdMouseEnter', {
          htmlContent: this.getTooltipContent(this.row),
          title: this.title,
          color: this.color,
          x: evt.pageX,
          y: evt.pageY
        })
      })
      tdContent.addEventListener('mousemove', (evt) => {
        tooltipEventSubscriber.publish('tdMouseMove', {
          x: evt.pageX,
          y: evt.pageY
        })
      })
      tdContent.addEventListener('mouseleave', () => {
        tooltipEventSubscriber.publish('tdMouseLeave')
      })
    })
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

  setTooltipEvents (tdContent) {
    if (this.getTooltipContent) {
      bindEvents.get(this)(tdContent)
    }
  }
}
export default VoteVisTd
