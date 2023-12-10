import { provinces } from './constants.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './components/ProvinceDataBuilder.js'
import ProvinceVisTable from './components/ProvinceVisTable.js'

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
  const provinceDataBuilder = new ProvinceDataBuilder(provinceCode)
  const provinceDataset = provinceDataBuilder.setup()
  const provinceVisTable = new ProvinceVisTable({
    dataset: provinceDataset,
    idDivMain,
    idTable,
    headData: [
      {
        name: 'nombre',
        value: provinces[0].name,
        type: 'party'
      },
      {
        name: 'votesPreviousNum',
        value: '28-A',
        type: 'chart'
      },
      {
        name: 'votesNum',
        value: '10-N',
        type: 'chart'
      },
      {
        name: 'dif',
        value: 'Variación',
        type: 'variation'
      }
    ]
  })
  provinceVisTable.setup()
}

export default app
