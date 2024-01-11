import Tooltip from './Tooltip.js'
import { getCipherInSpanishFormat } from '../utils.js'
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
const setTooltipPosition = (x, y) => {
  tooltip.setTooltipXPositionLeft(x)
  tooltip.setTooltipYPosition(y)
}
tooltipEventSubscriber.subscribe('tdDotChartMouseEnter', data => {
  const cipher = getCipherInSpanishFormat(data.value)
  const htmlContent = `${cipher} <span style="font-weight:normal;">votantes</span>`
  tooltip.setTooltipContent(htmlContent)
  tooltip.showTooltipWithColor(data.color)
  setTooltipPosition(data.x, data.y)
})
tooltipEventSubscriber.subscribe('tdDotChartMouseMove', data => {
  setTooltipPosition(data.x, data.y)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseEnter', data => {
  const roundedValue = Math.round(data.value * 10) / 10
  const cipher = getCipherInSpanishFormat(roundedValue)
  const cipherSign = data.value > 0 ? '+' : ''
  const htmlContent = `${cipherSign + cipher} %`
  tooltip.setTooltipContent(htmlContent)
  tooltip.showTooltipWithColor(data.color)
  setTooltipPosition(data.x, data.y)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseMove', data => {
  setTooltipPosition(data.x, data.y)
})
tooltipEventSubscriber.subscribe('tdMouseLeave', () => {
  tooltip.hideTooltip()
})
export default tooltipEventSubscriber
