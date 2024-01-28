import VotesVisTdText from './VotesVisTdText.js'
import VotesVisTdVariation from './VotesVisTdVariation.js'
import VotesVisDotChart from './VotesVisTdDotChart.js'

class VotesVisTdFactory {
  createTd (options) {
    const { tdType, ...tdProps } = options
    switch (tdType) {
      case 'text':
        return new VotesVisTdText(options)
      case 'variation':
        return new VotesVisTdVariation(options)
      case 'chart':
        return new VotesVisDotChart(options)
    }
    throw new Error(`Unknown tdType: ${options.tdType}`)
  }
}
export default VotesVisTdFactory
