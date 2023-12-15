import VotesVisTdParty from './VotesVisTdParty.js'
import VotesVisTdVariation from './VotesVisTdVariation.js'
import VotesVisDotChart from './VotesVisTdDotChart.js'
import tooltipEventSubscriber from './tooltipEventSubscriber.js'
class VotesVisTdFactory {
  createTd (options) {
    const { tdType, ...tdProps } = options
    switch (tdType) {
      case 'party':
        return new VotesVisTdParty({
          value: tdProps.value,
          color: tdProps.color
        })
      case 'variation':
        return new VotesVisTdVariation({
          value: tdProps.value,
          tooltipEventSubscriber
        })
      case 'chart':
        return new VotesVisDotChart({
          value: tdProps.value,
          color: tdProps.color,
          chartDimensions: tdProps.chartDimensions,
          tooltipEventSubscriber
        })
    }
    throw new Error(`Unknown tdType: ${tdType}`)
  }
}
export default VotesVisTdFactory
