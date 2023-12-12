import { provinces } from './constants.js'
import ParliamentCSVFetcher from './fetch/ParliamentCSVFetcher.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './components/ProvinceDataBuilder.js'
import ProvinceVisTable from './components/ProvinceVisTable.js'

async function setupApp () {
  const parliamentCSVFetcher = new ParliamentCSVFetcher()
  const parliamentJSON = await parliamentCSVFetcher.getParliamentJSON()
  console.log(parliamentJSON)
  setupSelect()
  setupProvinceTable(provinces[0].code)
}

function setupSelect () {
  const provinceSelect = new ProvinceSelect('select')
  provinceSelect.setup()
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

export default setupApp
