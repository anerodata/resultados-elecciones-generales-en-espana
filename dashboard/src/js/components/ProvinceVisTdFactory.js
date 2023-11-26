import ProvinceVisTdParty from './ProvinceVisTdParty.js'
import ProvinceVisTdVariation from './ProvinceVisTdVariation.js'
import ProvinceVisDotChart from './ProvinceVisDotChart.js'
class TdFactory {
  constructor () {
    this.TdDefaultClass = ProvinceVisDotChart
  }

  createTd (options) {
    const { tdType, ...rest } = options
    switch (tdType) {
      case 'party':
        return new ProvinceVisDotChart(rest)
      case 'variation':
        return new TdVariation(rest)
      default:
        return new this.TdDefaultClass(rest)
    }
  }
}
export default TdFactory
