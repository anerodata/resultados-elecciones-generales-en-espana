import { provinces } from './constants.js'
import ParliamentDataFetcher from './components/ParliamentDataFetcher.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './components/ProvinceDataBuilder.js'
import ProvinceVisTable from './components/ProvinceVisTable.js'

async function app () {
  const parliamentDataFetcher = new ParliamentDataFetcher()
  const parliamentData = await parliamentDataFetcher.getParliamentData()
  console.log(parliamentData)
  setupSelect()
  setupProvinceTable(provinces[0].code)
}

window.onresize = function () {
  setupProvinceTable(provinces[0].code)
}

function setupSelect () {
  const provinceSelect = new ProvinceSelect('select')
  provinceSelect.setup()
  document.getElementById('select').onchange = function () {
    const selectedProvince = provinces.find(d => d.code === this.value)
    setupProvinceTable(selectedProvince.code)
  }
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

export default app
