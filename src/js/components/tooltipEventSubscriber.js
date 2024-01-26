import Tooltip from './Tooltip.js'
import { getCipherInSpanishFormat } from '../utils.js'
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
  tooltip.setTooltipXPositionLeft(x)
  tooltip.setTooltipYPosition(y)
}
tooltipEventSubscriber.subscribe('tdMouseEnter', data => {
  // const cipher = getCipherInSpanishFormat(data.value)
  // const htmlContent = `<h3>${data.title}</h3> ${cipher} <span style="font-weight:normal;">votantes</span>`
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
