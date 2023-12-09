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
  const divTooltip = document.getElementById('tooltip')
  divTooltip.style.top = data.y - 30 + 'px'
  divTooltip.style.left = data.x + 'px'
})
tooltipEventSubscriber.subscribe('tdDotChartMouseEnter', data => {
  const divTooltip = document.getElementById('tooltip')
  divTooltip.classList.remove('displayNone')
  divTooltip.style.color = data.color
  divTooltip.style.fontWeight = 'bold'
  const textVar = 'votantes'
  divTooltip.innerHTML = Math.round(data.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' <span style="font-weight:normal;">' + textVar + '</span>'
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseMove', data => {
  console.log(data)
})
tooltipEventSubscriber.subscribe('tdVariationSubscriberMouseEnter', data => {
  console.log(data)
})
tooltipEventSubscriber.subscribe('tdMouseOut', () => {
  const divTooltip = document.getElementById('tooltip')
  divTooltip.classList.add('displayNone')
})
export default tooltipEventSubscriber
