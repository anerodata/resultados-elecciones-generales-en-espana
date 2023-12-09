import up from '../../assets/img/up.png'
import down from '../../assets/img/down.png'
import equal from '../../assets/img/equal.png'
const setupImg = new WeakMap()
const setupVisualizationEvent = new WeakMap()
function getDiffSymbolSrc (diff) {
  if (diff > 0) {
    return up
  } else if (diff < 0) {
    return down
  } else {
    return equal
  }
}
function getDiffSymbolColor (diff) {
  if (diff > 0) {
    return '#4DFFC7'
  } else if (diff < 0) {
    return '#FF4D7A'
  } else {
    return 'black'
  }
}
class ProvinceVisTdVariation {
  constructor ({ value, tooltipEventSubscriber }) {
    this.value = value
    this.tooltipEventSubscriber = tooltipEventSubscriber
    setupImg.set(this, () => {
      const imgNode = document.createElement('img')
      imgNode.src = getDiffSymbolSrc(this.value)
      imgNode.classList.add('imgVar')
      imgNode.setAttribute('data-num', this.value)
      imgNode.setAttribute('data-color', getDiffSymbolColor(this.value))
      return imgNode
    })
    setupVisualizationEvent.set(this, (imgNode) => {
      imgNode.addEventListener('mouseenter', () => {
        this.tooltipEventSubscriber.publish('tdVariationSubscriberMouseEnter', {
          value: this.value
        })
      })
      imgNode.addEventListener('mousemove', (evt) => {
        this.tooltipEventSubscriber.publish('tdVariationSubscriberMouseMove', {
          x: evt.pageX,
          y: evt.pageY
        })
      })
    })
  }

  getTdNode () {
    const imgNode = setupImg.get(this)()
    setupVisualizationEvent.get(this)(imgNode)
    return imgNode
  }
}
export default ProvinceVisTdVariation
