import ProvinceVisTdParty from './ProvinceVisTdParty.js'
import ProvinceVisTdVariation from './ProvinceVisTdVariation.js'
import ProvinceVisDotChart from './ProvinceVisTdDotChart.js'
import tooltipEventSubscriber from './tooltipEventSubscriber.js'
class ProvinceVisTdFactory {
  constructor () {
    this.createTd = (options) => {
      const { tdType, ...tdProps } = options
      switch (tdType) {
        case 'party':
          return new ProvinceVisTdParty({
            value: tdProps.value,
            color: tdProps.color
          })
        case 'variation':
          return new ProvinceVisTdVariation({
            value: tdProps.value,
            tooltipEventSubscriber
          })
        case 'chart':
          return new ProvinceVisDotChart({
            value: tdProps.value,
            color: tdProps.color,
            chartDimensions: tdProps.chartDimensions,
            tooltipEventSubscriber
          })
      }
    }
  }
}
export default ProvinceVisTdFactory
