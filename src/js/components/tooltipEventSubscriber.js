import Tooltip from './Tooltip.js'

const tooltipEventSubscriber = (function () {
  const types = {}
  const hasOwnProperty = types.hasOwnProperty
  return {
    subscribe: (type, handler) => {
      if (!hasOwnProperty.call(types, type)) {
        types[type] = []
      }
      const index = types[type].push(handler) - 1
      return {
        remove: () => {
          delete types[type][index]
        }
      }
    },
    publish: (type, data) => {
      if (!hasOwnProperty.call(types, type)) {
        return
      }
      types[type].forEach(handler => {
        handler(data === undefined ? {} : data)
      })
    }
  }
})()

const tooltip = new Tooltip('tooltip')

const setTooltipPosition = (x, y) => {
  setTooltipXPosition(x)
  tooltip.setTooltipYPosition(y)
}

const setTooltipXPosition = x => {
  if (tooltipIsInLeftPartOfWindow(x)) {
    tooltip.setTooltipXPositionRight(x)
    return
  }
  tooltip.setTooltipXPositionLeft(x)
}

const tooltipIsInLeftPartOfWindow = x => {
  const windowHalfWidth = window.innerWidth / 2
  return x < windowHalfWidth
}

tooltipEventSubscriber.subscribe('tdMouseEnter', data => {
  tooltip.setTooltipContent(data.htmlContent)
  tooltip.showTooltipWithColor(data.color)
  setTooltipPosition(data.x, data.y)
})

tooltipEventSubscriber.subscribe('tdMouseMove', data => {
  setTooltipPosition(data.x, data.y)
})

tooltipEventSubscriber.subscribe('tdMouseLeave', () => {
  tooltip.hideTooltip()
})
export default tooltipEventSubscriber
