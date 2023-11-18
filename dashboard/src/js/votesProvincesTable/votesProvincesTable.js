import { provinces, colors } from './utils/constants.js'
import provinceTable from './provinceTable/provinceTable.js'
import { votesPerProvinceBefore, votesPerProvinceNow } from './../mockup-data.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './components/ProvinceDataBuilder.js'
function votesProvincesTable (idDivMain, idTable, multiple) {
  const provinceSelect = new ProvinceSelect('select')
  provinceSelect.setup()
  init()
  window.onresize = function () {
    init()
  }
  function init () {
    const provinceDataBuilder = new ProvinceDataBuilder(provinces[0].code)
    const dataset = provinceDataBuilder.setup()
    provinceTable(provinces[0].name, dataset, idDivMain, idTable)
    setEventSelect()
  }
  function setEventSelect () {
    document.getElementById('select').onchange = function () {
      const selectedProvince = provinces.find(d => d.code === this.value)
      const provinceDataBuilder = new ProvinceDataBuilder(selectedProvince.code)
      const dataset = provinceDataBuilder.setup()
      console.log(dataset)
      provinceTable(selectedProvince.name, dataset, idDivMain, idTable)
    }
  }
}
export default votesProvincesTable
