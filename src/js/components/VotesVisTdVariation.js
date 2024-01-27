import VotesVisTd from './VotesVisTd.js'
import up from '../../assets/img/up.png'
import down from '../../assets/img/down.png'
import equal from '../../assets/img/equal.png'

const getDiffSymbolColor = (value) => {
  if (value > 0) {
    return '#4DFFC7'
  } else if (value < 0) {
    return '#FF4D7A'
  } else {
    return 'black'
  }
}
const setupImg = new WeakMap()
const getDiffSymbolSrc = new WeakMap()

class VotesVisTdVariation extends VotesVisTd {
  constructor ({ value, getTooltipContent, row }) {
    super({
      value,
      className: 'variation',
      row,
      getTooltipContent,
      color: getDiffSymbolColor(value)
    })
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
  }

  getTdNode () {
    const imgNode = setupImg.get(this)()
    const tdContent = super.getTdContent(imgNode)
    super.setTooltipEvents(tdContent)
    return tdContent
  }
}
export default VotesVisTdVariation
