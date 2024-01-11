class Tooltip {
  constructor (id) {
    this.tooltipContainer = document.getElementById(id)
  }

  setTooltipXPositionLeft (x) {
    this.tooltipContainer.style.right = window.innerWidth - x + 'px'
    this.tooltipContainer.style.left = ''
  }

  setTooltipXPositionRight (x) {
    this.tooltipContainer.style.left = x + 'px'
    this.tooltipContainer.style.right = ''
  }

  setTooltipYPosition (y) {
    this.tooltipContainer.style.top = y - 30 + 'px'
  }

  setTooltipContent (htmlContent) {
    this.tooltipContainer.innerHTML = htmlContent
  }

  showTooltipWithColor (color) {
    this.tooltipContainer.classList.remove('displayNone')
    this.tooltipContainer.style.color = color
    this.tooltipContainer.style.fontWeight = 'bold'
  }

  hideTooltip () {
    this.tooltipContainer.classList.add('displayNone')
  }
}
export default Tooltip
