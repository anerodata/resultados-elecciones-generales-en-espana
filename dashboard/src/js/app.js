import { provinces } from './constants.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './components/ProvinceDataBuilder.js'
import provinceTable from './components/ProvinceVisTable.js'

const idDivMain = 'main'
const idTable = 'provinces-table'
const provinceSelect = new ProvinceSelect('select')

function app () {
  window.onresize = function () {
    init()
  }
  init()
}

function init () {
  provinceSelect.setup()
  setupProvinceTable(provinces[0].code)
  setEventSelect()
}

function setEventSelect () {
  document.getElementById('select').onchange = function () {
    const selectedProvince = provinces.find(d => d.code === this.value)
    setupProvinceTable(selectedProvince.code)
  }
}

function setupProvinceTable (provinceCode) {
  console.log(provinceCode)
  const provinceDataBuilder = new ProvinceDataBuilder(provinceCode)
  const provinceDataset = provinceDataBuilder.setup()
  provinceTable(provinces[0].name, provinceDataset, idDivMain, idTable)
}

export default app
