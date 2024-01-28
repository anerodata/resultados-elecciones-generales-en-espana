import { defaultColor } from '../constants.js'
import tooltipEventSubscriber from './tooltipEventSubscriber.js'

const bindEvents = new WeakMap()

class VoteVisTd {
  constructor ({ valueKey, row, color, getTooltipContent, className }) {
    this.value = row[valueKey]
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
    const tdContent = document.createElement('div')
    tdContent.classList.add(this.className)
    tdContent.appendChild(contentNode)
    if (this.getTooltipContent) {
      bindEvents.get(this)(tdContent)
    }
    return tdContent
  }

  getTdNode () {
    const contentNode = document.createTextNode(this.value)
    const tdContent = this.getTdContent(contentNode)
    return tdContent
  }
}
export default VoteVisTd
