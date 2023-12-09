class Tooltip {
  constructor (id) {
    this.tooltipContainer = document.getElementById(id)
  }

  setTooltipPosition (x, y) {
    this.tooltipContainer.style.left = x + 'px'
    this.tooltipContainer.style.top = y - 30 + 'px'
  }

  showTooltip (color) {
    this.tooltipContainer.classList.remove('displayNone')
    this.tooltipContainer.style.color = color
    this.tooltipContainer.style.fontWeight = 'bold'
  }

  setTooltipContent (htmlContent) {
    this.tooltipContainer.innerHTML = htmlContent
  }

  hideTooltip () {
    this.tooltipContainer.classList.add('displayNone')
  }
}
export default Tooltip
