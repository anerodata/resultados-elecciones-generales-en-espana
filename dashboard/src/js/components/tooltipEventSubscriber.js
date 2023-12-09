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
tooltipEventSubscriber.subscribe('tdDotChartMouseMove', data => {
  tooltip.setTooltipPosition(data.x, data.y)
})
tooltipEventSubscriber.subscribe('tdDotChartMouseEnter', data => {
  const htmlContent = data.value + '<span style="font-weight:normal;"> votantes</span>'
  tooltip.showTooltip(data.color)
  tooltip.setTooltipContent(htmlContent)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseMove', data => {
  console.log(data)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseEnter', data => {
})
tooltipEventSubscriber.subscribe('tdMouseLeave', () => {
  tooltip.hideTooltip()
})
export default tooltipEventSubscriber
