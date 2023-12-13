import { provinces } from './constants.js'
import ParliamentCSVFetcher from './fetch/ParliamentCSVFetcher.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './data-handling/ProvinceDataBuilder.js'
import ProvinceVisTable from './components/ProvinceVisTable.js'
const presSelectedProvinceId = '28'
async function setupApp () {
  try {
    const parliamentVotesAndDeputies = await getParliamentData('201911', '201904')
    console.log(parliamentVotesAndDeputies)
  } catch (err) {
    console.log(err)
  } finally {
    setupProvinceSelect()
    setupProvinceTable(provinces[0].code)
  }
}
async function getParliamentData (proccessId, csvFileName) {
  try {
    const parliamentCSVFetcherPrevious = new ParliamentCSVFetcher(proccessId)
    const parliamentCSVFetcherCurrent = new ParliamentCSVFetcher(csvFileName)
    return {
      previous: await parliamentCSVFetcherPrevious.getParliamentJSON(),
      current: await parliamentCSVFetcherCurrent.getParliamentJSON()
    }
  } catch (err) {
    throw new Error(err.message)
  }
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
