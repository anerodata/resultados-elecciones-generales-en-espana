import VotesVisTd from './VotesVisTd.js'

const setupVisualizationEvent = new WeakMap()

class VotesVisTdText extends VotesVisTd {
  constructor (value, color, tooltipValue, tooltipEventSubscriber) {
    super({ value, className: 'party', color })
    this.tooltipValue = tooltipValue
    this.tooltipEventSubscriber = tooltipEventSubscriber

    setupVisualizationEvent.set(this, (visualization) => {
      visualization.addEventListener('mouseenter', (evt) => {
        this.tooltipEventSubscriber.publish('tdTextMouseEnter', {
          value: this.tooltipValue,
          color: this.color,
          x: evt.pageX,
          y: evt.pageY
        })
      })
      visualization.addEventListener('mousemove', (evt) => {
        this.tooltipEventSubscriber.publish('tdTextMouseMove', {
          x: evt.pageX,
          y: evt.pageY
        })
      })
      visualization.addEventListener('mouseleave', () => {
        this.tooltipEventSubscriber.publish('tdMouseLeave')
      })
    })
  }

  getTdNode () {
    const textNode = document.createTextNode(this.value)
    const tdContent = super.getTdContent(textNode)
    tdContent.style.fontWeight = 'bold'
    tdContent.style.color = `${this.color}`
    if (this.tooltipEventSubscriber) {
      setupVisualizationEvent.get(this)(tdContent)
    }
    return tdContent
  }
}
export default VotesVisTdText
