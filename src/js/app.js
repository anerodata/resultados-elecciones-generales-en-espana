import { provinces } from './constants.js'
import ParliamentCSVFetcher from './fetch/ParliamentCSVFetcher.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './data-handling/ProvinceDataBuilder.js'
import ProvinceVisTable from './components/ProvinceVisTable.js'

async function setupApp () {
  const parliamentCSVFetcher = new ParliamentCSVFetcher()
  const parliamentJSON = await parliamentCSVFetcher.getParliamentJSON()
  console.log(parliamentJSON)
  setupProvinceSelect()
  setupProvinceTable(provinces[0].code)
}

function setupProvinceSelect () {
  const provinceSelect = new ProvinceSelect('select')
  provinceSelect.setupSelect()
  provinceSelect.onChange = function (value) {
    const selectedProvince = provinces.find(d => d.code === value)
    setupProvinceTable(selectedProvince.code)
  }
}

window.onresize = function () {
  setupProvinceTable(provinces[0].code)
}

function setupProvinceTable (provinceCode) {
  const idDivMain = 'main'
  const idTable = 'provinces-table'
  const provinceDataBuilder = new ProvinceDataBuilder(provinceCode)
  const provinceData = provinceDataBuilder.getProvinceData()
  const provinceVisTable = new ProvinceVisTable({
    dataset: provinceData,
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
  provinceVisTable.setupTable()
}

export default setupApp
