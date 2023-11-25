function handleMouseMove (event) {
  // https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
  let eventDoc, doc, body
  event = event || window.event
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document
    doc = eventDoc.documentElement
    body = eventDoc.body

    event.pageX = event.clientX +
      ((doc && doc.scrollLeft) || ((body && body.scrollLeft) || 0)) -
      ((doc && doc.clientLeft) || ((body && body.clientLeft) || 0))
    event.pageY = event.clientY +
      ((doc && doc.scrollTop) || ((body && body.scrollTop) || 0)) -
      ((doc && doc.clientTop) || ((body && body.clientTop) || 0))
  }
}
class ProvinceVisTooltip {
  constructor (id) {
    this.tooltipNode = document.querySelector(`#${id}`)
  }

  setEventTooltip (hoverNode) {
    hoverNode.onmousemove = function (e) {
      handleMouseMove()
      const x = event.pageX
      const y = event.pageY
      this.tooltipNode.classList.remove('displayNone')
      this.tooltipNode.style.top = y - 30 + 'px'
      const color = this.getAttribute('data-color')
      const votes = this.getAttribute('data-num')
      this.tooltipNode.style.color = color
      this.tooltipNode.style.fontWeight = 'bold'
      let textVar = ''
      if (this.classList.contains('canvas_abst')) {
        textVar = 'personas'
      } else {
        textVar = 'votantes'
      }
      this.tooltipNode.innerHTML = Math.round(votes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' <span style="font-weight:normal;">' + textVar + '</span>'
      this.tooltipNode.style.left = x + 'px'
    }
    hoverNode.onmouseout = function () {
      this.tooltipNode.classList.add('displayNone')
    }
    //     for (let i = 0; i < document.getElementsByClassName('imgVar').length; i++) {
    //       document.getElementsByClassName('imgVar')[i].onmousemove = function (e) {
    //         handleMouseMove()
    //         const x = event.pageX
    //         const y = event.pageY
    //         divTooltip.classList.remove('displayNone')
    //         divTooltip.style.top = y - 30 + 'px'
    //         const color = this.getAttribute('data-color')
    //         const votes = this.getAttribute('data-num')
    //         divTooltip.style.color = color
    //         divTooltip.style.fontWeight = 'bold'
    //         divTooltip.innerHTML = Math.round(votes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' <span style="font-weight:normal;">electores</span>'
    //         divTooltip.style.left = x - divTooltip.clientWidth + 5 + 'px'
    //       }
    //   }
    //   document.getElementsByClassName('imgVar')[i].onmouseout = function () {
    //     divTooltip.classList.add('displayNone')
    //   }
  }
}
export default ProvinceVisTooltip
