import { provinces } from './constants.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './components/ProvinceDataBuilder.js'
import provinceTable from './components/ProvinceVisTable.js'

function votesProvincesTable (idDivMain, idTable, multiple) {
  const provinceSelect = new ProvinceSelect('select')
  provinceSelect.setup()
  init()
  window.onresize = function () {
    init()
  }
  function init () {
    const provinceDataBuilder = new ProvinceDataBuilder(provinces[0].code)
    const provinceDataset = provinceDataBuilder.setup()
    provinceTable(provinces[0].name, provinceDataset, idDivMain, idTable)
    setEventSelect()
  }
  function setEventSelect () {
    document.getElementById('select').onchange = function () {
      const selectedProvince = provinces.find(d => d.code === this.value)
      const provinceDataBuilder = new ProvinceDataBuilder(selectedProvince.code)
      const provinceDataset = provinceDataBuilder.setup()
      console.log(provinceDataset)
      provinceTable(selectedProvince.name, provinceDataset, idDivMain, idTable)
    }
  }
}
export default votesProvincesTable
