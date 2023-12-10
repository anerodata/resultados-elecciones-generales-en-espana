import up from '../../assets/img/up.png'
import down from '../../assets/img/down.png'
import equal from '../../assets/img/equal.png'
const setupImg = new WeakMap()
const setupContainerNode = new WeakMap()
const getDiffSymbolSrc = new WeakMap()
const getDiffSymbolColor = new WeakMap()
const setupVisualizationEvent = new WeakMap()
class ProvinceVisTdVariation {
  constructor ({ value, tooltipEventSubscriber }) {
    this.value = value
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
    setupContainerNode.set(this, (imgNode) => {
      const containerNode = document.createElement('div')
      containerNode.appendChild(imgNode)
      return containerNode
    })
    setupVisualizationEvent.set(this, (imgNode) => {
      imgNode.addEventListener('mouseenter', () => {
        this.tooltipEventSubscriber.publish('tdVariationSubscriberMouseEnter', {
          value: this.value,
          color: getDiffSymbolColor.get(this)()
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
    const containerNode = setupContainerNode.get(this)(imgNode)
    setupVisualizationEvent.get(this)(containerNode)
    return containerNode
  }
}
export default ProvinceVisTdVariation
