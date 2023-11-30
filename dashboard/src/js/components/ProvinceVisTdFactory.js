import ProvinceVisTdParty from './ProvinceVisTdParty.js'
import ProvinceVisTdVariation from './ProvinceVisTdVariation.js'
import ProvinceVisDotChart from './ProvinceVisTdDotChart.js'
class ProvinceVisTdFactory {
  constructor () {
    this.TdDefaultClass = ProvinceVisDotChart
  }

  createTd (options) {
    const { tdType, ...rest } = options
    switch (tdType) {
      case 'party':
        return new ProvinceVisTdParty(rest)
      case 'variation':
        return new ProvinceVisTdVariation(rest)
      default:
        return new this.TdDefaultClass(rest)
    }
  }
}
export default ProvinceVisTdFactory
