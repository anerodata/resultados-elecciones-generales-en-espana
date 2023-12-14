import { provinces } from './constants.js'
import ParliamentCSVFetcher from './fetch/ParliamentCSVFetcher.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import ProvinceDataBuilder from './data-handling/ProvinceDataBuilder.js'
import ProvinceVisTable from './components/ProvinceVisTable.js'

const parliamentVotes = {}
let parliamentVotesByProv = {}
const parliamentDeputies = {}

async function updateApp (currentCSVName, previousCSVName, selectedProvId) {
  try {
    const parliamentData = await getParliamentData(currentCSVName, previousCSVName)
    separateParliamentData(parliamentData)
    parliamentVotesByProv = filterVotesByProvince(selectedProvId)
    setupProvinceTable(selectedProvId)
  } catch (err) {
    console.log(err)
  } finally {
    setupProvinceSelect()
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

function separateParliamentData (parliamentData) {
  parliamentVotes.current = parliamentData.current.votes
  parliamentVotes.previous = parliamentData.previous.votes
  parliamentDeputies.current = parliamentData.current.deputies
  parliamentDeputies.previous = parliamentData.previous.deputies
}

function filterVotesByProvince (provinceCode) {
  const parliamentVotesByProv = {}
  for (const time in parliamentVotes) {
    const filteredDataByProv = parliamentVotes[time].find(d => d['Código de Provincia'] === provinceCode)
    parliamentVotesByProv[time] = filteredDataByProv
  }
  return parliamentVotesByProv
}

function setupProvinceTable (provinceCode) {
  console.log(provinceCode, parliamentVotesByProv)
  const idDivMain = 'main'
  const idTable = 'provinces-table'
  const provinceDataBuilder = new ProvinceDataBuilder(provinceCode, parliamentVotes)
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

function setupProvinceSelect () {
  const provinceSelect = new ProvinceSelect('select')
  provinceSelect.setupSelect()
  provinceSelect.onChange(function (value) {
    parliamentVotesByProv = filterVotesByProvince(value)
    setupProvinceTable(value)
  })
}

window.onresize = function () {
  setupProvinceTable(provinces[0].code)
}

export default updateApp
