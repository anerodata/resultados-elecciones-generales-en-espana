import { provinces } from './constants.js'
import ParliamentCSVFetcher from './fetch/ParliamentCSVFetcher.js'
import ModelParliamentData from './data-handling/ModelParliamentData.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import VotesDataBuilder from './data-handling/VotesDataBuilder.js'
import VotesVisTable from './components/VotesVisTable.js'

let parliamentVotes = {}
let parliamentVotesSelectedProv = {}

async function updateApp (currentCSVName, previousCSVName, selectedProvId) {
  try {
    const parliamentData = await getParliamentData(currentCSVName, previousCSVName)
    parliamentVotes = parliamentData.votes
    parliamentVotesSelectedProv = filterVotesByProvince(selectedProvId)
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
    const previousData = await parliamentCSVFetcherPrevious.getParliamentJSON()
    const currentData = await parliamentCSVFetcherCurrent.getParliamentJSON()
    const modelParliamentData = new ModelParliamentData(previousData, currentData)
    return modelParliamentData.data
  } catch (err) {
    throw new Error(err.message)
  }
}

function filterVotesByProvince (provinceCode) {
  const parliamentVotesSelectedProv = {}
  for (const time in parliamentVotes) {
    const filteredDataByProv = parliamentVotes[time].find(d => d['Código de Provincia'] === provinceCode)
    parliamentVotesSelectedProv[time] = filteredDataByProv
  }
  return parliamentVotesSelectedProv
}

function setupProvinceTable (provinceCode) {
  console.log(provinceCode, parliamentVotesSelectedProv)
  const idDivMain = 'main'
  const idTable = 'provinces-table'
  const votesDataBuilder = new VotesDataBuilder(provinceCode, parliamentVotesSelectedProv)
  const votesData = votesDataBuilder.getProvinceData()
  const votesVisTable = new VotesVisTable({
    dataset: votesData,
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
  votesVisTable.setupTable()
}

function setupProvinceSelect () {
  const provinceSelect = new ProvinceSelect('select')
  provinceSelect.setupSelect()
  provinceSelect.onChange(function (value) {
    parliamentVotesSelectedProv = filterVotesByProvince(value)
    setupProvinceTable(value)
  })
}

window.onresize = function () {
  setupProvinceTable(provinces[0].code)
}

export default updateApp
