import Tooltip from './Tooltip.js'
const tooltipEventSubscriber = (function () {
  const types = {}
  const hOP = types.hasOwnProperty
  return {
    subscribe: (type, handler) => {
      if (!hOP.call(types, type)) {
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
      if (!hOP.call(types, type)) {
        return
      }
      types[type].forEach(handler => {
        handler(data === undefined ? {} : data)
      })
    }
  }
})()
const tooltip = new Tooltip('tooltip')
tooltipEventSubscriber.subscribe('tdDotChartMouseEnter', data => {
  const htmlContent = `${data.value} <span style="font-weight:normal;">votantes</span>`
  tooltip.setTooltipContent(htmlContent)
  tooltip.showTooltip(data.color)
})
tooltipEventSubscriber.subscribe('tdDotChartMouseMove', data => {
  tooltip.setTooltipXPositionRight(data.x)
  tooltip.setTooltipYPosition(data.y)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseEnter', data => {
  const value = data.value > 0 ? '+' + data.value : data.value
  const htmlContent = `${value} %`
  tooltip.setTooltipContent(htmlContent)
  tooltip.showTooltip(data.color)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseMove', data => {
  tooltip.setTooltipXPositionLeft(data.x)
  tooltip.setTooltipYPosition(data.y)
})
tooltipEventSubscriber.subscribe('tdMouseLeave', () => {
  tooltip.hideTooltip()
})
export default tooltipEventSubscriber