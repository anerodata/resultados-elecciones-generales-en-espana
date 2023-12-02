import up from '../../assets/img/up.png'
import down from '../../assets/img/down.png'
import equal from '../../assets/img/equal.png'
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
  constructor (value) {
    this.value = value
  }

  getTdNode () {
    const imgNode = document.createElement('img')
    imgNode.src = getDiffSymbolSrc(this.value)
    imgNode.classList.add('imgVar')
    imgNode.setAttribute('data-num', this.value)
    imgNode.setAttribute('data-color', getDiffSymbolColor(this.value))
    return imgNode
  }
}
export default ProvinceVisTdVariation
