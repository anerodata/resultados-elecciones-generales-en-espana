import { defaultColor } from '../constants.js'
import tooltipEventSubscriber from './tooltipEventSubscriber.js'

const bindEvents = new WeakMap()

class VoteVisTd {
  constructor ({ value, row, color, getTooltipContent, className }) {
    this.value = value
    this.className = className
    this.row = row
    this.getTooltipContent = getTooltipContent
    this.color = color || defaultColor

    bindEvents.set(this, (tdContent) => {
      tdContent.addEventListener('mouseenter', (evt) => {
        tooltipEventSubscriber.publish('tdMouseEnter', {
          htmlContent: this.getTooltipContent(this.row),
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
    if (this.getTooltipContent) {
      bindEvents.get(this)(container)
    }
    return container
  }

  getTdNode () {
    const contentNode = document.createTextNode(this.value)
    const content = this.getTdContent(contentNode)
    return content
  }
}
export default VoteVisTd
