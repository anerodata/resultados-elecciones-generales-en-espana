const isTooltipInLeftPartOfWindow = new WeakMap()
const setTooltipXPositionLeft = new WeakMap()
const setTooltipXPositionRight = new WeakMap()

class Tooltip {
  constructor (id) {
    this.tooltipContainer = document.getElementById(id)
    this.padBetCursorAndTooltip = 10

    setTooltipXPositionLeft.set(this, x => {
      this.tooltipContainer.style.right = `${window.innerWidth - x + this.padBetCursorAndTooltip}px`
      this.tooltipContainer.style.left = ''
    })

    setTooltipXPositionRight.set(this, x => {
      this.tooltipContainer.style.left = `${x + this.padBetCursorAndTooltip}px`
      this.tooltipContainer.style.right = ''
    })

    isTooltipInLeftPartOfWindow.set(this, x => {
      const windowHalfWidth = window.innerWidth / 2
      return x < windowHalfWidth
    })
  }

  setTooltipXPosition (x) {
    if (isTooltipInLeftPartOfWindow.get(this)(x)) {
      setTooltipXPositionRight.get(this)(x)
      return
    }
    setTooltipXPositionLeft.get(this)(x)
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
