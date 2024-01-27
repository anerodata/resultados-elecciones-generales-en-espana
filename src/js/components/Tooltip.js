class Tooltip {
  constructor (id) {
    this.tooltipContainer = document.getElementById(id)
    this.padBetCursorAndTooltip = 10
  }

  setTooltipXPositionLeft (x) {
    this.tooltipContainer.style.right = `${window.innerWidth - x + this.padBetCursorAndTooltip}px`
    this.tooltipContainer.style.left = ''
  }

  setTooltipXPositionRight (x) {
    this.tooltipContainer.style.left = `${x + this.padBetCursorAndTooltip}px`
    this.tooltipContainer.style.right = ''
  }

  setTooltipYPosition (y) {
    const tooltipHeight = this.tooltipContainer.offsetHeight
    this.tooltipContainer.style.top = `${y - tooltipHeight + this.padBetCursorAndTooltip}px`
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
