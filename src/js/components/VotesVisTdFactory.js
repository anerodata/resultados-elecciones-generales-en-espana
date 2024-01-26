import VotesVisTdText from './VotesVisTdText.js'
import VotesVisTdVariation from './VotesVisTdVariation.js'
import VotesVisDotChart from './VotesVisTdDotChart.js'
import tooltipEventSubscriber from './tooltipEventSubscriber.js'
class VotesVisTdFactory {
  createTd (options) {
    const { tdType, ...tdProps } = options
    switch (tdType) {
      case 'party':
        return new VotesVisTdText(
          tdProps.value,
          tdProps.color,
          tdProps.tooltipValue,
          tooltipEventSubscriber
        )
      case 'variation':
        return new VotesVisTdVariation(
          tdProps.value,
          tdProps.getTooltipContent,
          tdProps.row
        )
      case 'chart':
        return new VotesVisDotChart(
          tdProps.value,
          tdProps.title,
          tdProps.color,
          tdProps.width,
          tdProps.votesPerDot,
          tdProps.getTooltipContent,
          tdProps.row
        )
    }
    throw new Error(`Unknown tdType: ${tdType}`)
  }
}
export default VotesVisTdFactory
