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
tooltipEventSubscriber.subscribe('tdDotChartMouseMove', data => {
  console.log(data)
})
tooltipEventSubscriber.subscribe('tdDotChartMouseEnter', data => {
  console.log(data)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseMove', data => {
  console.log(data)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseEnter', data => {
  console.log(data)
})
export default tooltipEventSubscriber
