import VotesVisTdText from './VotesVisTdText.js'
import VotesVisTdVariation from './VotesVisTdVariation.js'
import VotesVisDotChart from './VotesVisTdDotChart.js'

class VotesVisTdFactory {
  createTd (options) {
    const { tdType, ...tdProps } = options
    switch (tdType) {
      case 'text':
        return new VotesVisTdText(tdProps, tdType)
      case 'variation':
        return new VotesVisTdVariation(tdProps, tdType)
      case 'chart':
        return new VotesVisDotChart(tdProps, tdType)
    }
    throw new Error(`Unknown tdType: ${tdType}`)
  }
}
export default VotesVisTdFactory
