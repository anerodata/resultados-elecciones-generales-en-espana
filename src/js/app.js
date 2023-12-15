import { provinces } from './constants.js'
import ParliamentCSVFetcher from './fetch/ParliamentCSVFetcher.js'
import ModelParliamentData from './data-handling/ModelParliamentData.js'
import ProvinceSelect from './components/ProvincesSelect.js'
import VotesDataBuilder from './data-handling/VotesDataBuilder.js'
import VotesVisTable from './components/VotesVisTable.js'

let votesData = {}
let votesDataProv = {}

async function updateApp (currentCSVName, previousCSVName, selectedProvId) {
  try {
    const parliamentData = await getParliamentData(currentCSVName, previousCSVName)
    votesData = parliamentData.votes
    votesDataProv = filterVotesDataByProv(selectedProvId)
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
    const previousParlData = await parliamentCSVFetcherPrevious.getParliamentJSON()
    const currentParlData = await parliamentCSVFetcherCurrent.getParliamentJSON()
    const modelParlData = new ModelParliamentData(previousParlData, currentParlData)
    return modelParlData.data
  } catch (err) {
    throw new Error(err.message)
  }
}

function filterVotesDataByProv(provinceCode) {
  const votesDataProv = {}
  for (const time in votesData) {
    const filteredDataByProv = votesData[time].find(d => d['Código de Provincia'] === provinceCode)
    votesDataProv[time] = filteredDataByProv
  }
  return votesDataProv
}

function setupProvinceTable (provinceCode) {
  const idDivMain = 'main'
  const idTable = 'provinces-table'
  const votesDataBuilder = new VotesDataBuilder(votesDataProv)
  const votesData = votesDataBuilder.getVotesData()
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
    votesDataProv = filterVotesDataByProv(value)
    setupProvinceTable(value)
  })
}

window.onresize = function () {
  setupProvinceTable(provinces[0].code)
}

export default updateApp
