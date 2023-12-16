import { provinces } from './constants.js'
import BuilderParliamentData from './data-handling/BuilderParliamentData.js'
import BuilderSelProvVotesData from './data-handling/BuilderSelProvVotesData.js'
import VotesVisTable from './components/VotesVisTable.js'
import ProvinceSelect from './components/ProvincesSelect.js'

let votesData = {}
let votesDataProv = {}

async function updateApp (currentCSVName, previousCSVName, selectedProvId) {
  try {
    const builderParlData = new BuilderParliamentData(previousCSVName, currentCSVName)
    const parliamentData = await builderParlData.getParliamentData()
    votesData = parliamentData.votes
    votesDataProv = filterVotesDataByProv(selectedProvId)
    setupProvinceTable(selectedProvId)
  } catch (err) {
    console.log(err)
  } finally {
    setupProvinceSelect()
  }
}

function filterVotesDataByProv (provinceCode) {
  const votesDataProv = {}
  for (const time in votesData) {
    const filteredDataByProv = votesData[time].find(d => d['Código de Provincia'] === provinceCode)
    votesDataProv[time] = filteredDataByProv
  }
  return votesDataProv
}

function setupProvinceTable () {
  const idDivMain = 'main'
  const idTable = 'provinces-table'
  const selProvVotesDataBuilder = new BuilderSelProvVotesData(votesDataProv)
  const selProvVotesData = selProvVotesDataBuilder.getVotesData()
  const votesVisTable = new VotesVisTable({
    dataset: selProvVotesData,
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
