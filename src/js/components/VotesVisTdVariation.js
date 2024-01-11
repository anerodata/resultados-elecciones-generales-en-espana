import VotesVisTd from './VotesVisTd.js'
import up from '../../assets/img/up.png'
import down from '../../assets/img/down.png'
import equal from '../../assets/img/equal.png'

const setupImg = new WeakMap()
const getDiffSymbolSrc = new WeakMap()
const getDiffSymbolColor = new WeakMap()
const setupVisualizationEvent = new WeakMap()
class VotesVisTdVariation extends VotesVisTd {
  constructor (value, tooltipEventSubscriber) {
    super(value)
    this.tooltipEventSubscriber = tooltipEventSubscriber
    setupImg.set(this, () => {
      const imgNode = document.createElement('img')
      imgNode.src = getDiffSymbolSrc.get(this)()
      imgNode.classList.add('imgVar')
      imgNode.setAttribute('data-num', this.value)
      return imgNode
    })
    getDiffSymbolSrc.set(this, () => {
      if (this.value > 0) {
        return up
      } else if (this.value < 0) {
        return down
      } else {
        return equal
      }
    })
    getDiffSymbolColor.set(this, () => {
      if (this.value > 0) {
        return '#4DFFC7'
      } else if (this.value < 0) {
        return '#FF4D7A'
      } else {
        return 'black'
      }
    })
    setupVisualizationEvent.set(this, (imgNode) => {
      imgNode.addEventListener('mouseenter', (evt) => {
        this.tooltipEventSubscriber.publish('tdVariationSubscriberMouseEnter', {
          value: this.value,
          color: getDiffSymbolColor.get(this)(),
          x: evt.pageX,
          y: evt.pageY
        })
      })
      imgNode.addEventListener('mousemove', (evt) => {
        this.tooltipEventSubscriber.publish('tdVariationSubscriberMouseMove', {
          x: evt.pageX,
          y: evt.pageY
        })
      })
      imgNode.addEventListener('mouseleave', () => {
        this.tooltipEventSubscriber.publish('tdMouseLeave')
      })
    })
  }

  getTdNode () {
    const imgNode = setupImg.get(this)()
    const tdContent = super.getTdContent(imgNode)
    setupVisualizationEvent.get(this)(tdContent)
    return tdContent
  }
}
export default VotesVisTdVariation
