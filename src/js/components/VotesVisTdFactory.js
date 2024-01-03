import VotesVisTdParty from './VotesVisTdParty.js'
import VotesVisTdVariation from './VotesVisTdVariation.js'
import VotesVisDotChart from './VotesVisTdDotChart.js'
import tooltipEventSubscriber from './tooltipEventSubscriber.js'
class VotesVisTdFactory {
  createTd (options) {
    const { tdType, ...tdProps } = options
    switch (tdType) {
      case 'party':
        return new VotesVisTdParty(
          tdProps.value,
          tdProps.color
        )
      case 'variation':
        return new VotesVisTdVariation(
          tdProps.value,
          tooltipEventSubscriber
        )
      case 'chart':
        return new VotesVisDotChart(
          tdProps.value,
          tdProps.color,
          tdProps.width,
          tooltipEventSubscriber
        )
    }
    throw new Error(`Unknown tdType: ${tdType}`)
  }
}
export default VotesVisTdFactory
