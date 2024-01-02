import { provinces } from './constants.js'
import BuilderParliamentData from './data-handling/BuilderParliamentData.js'
import BuilderSelProvVotesData from './data-handling/BuilderSelProvVotesData.js'
import VotesVisTable from './components/VotesVisTable.js'
import ProvinceSelect from './components/ProvincesSelect.js'

let provinceSelect = {}
let votesData = {}

async function updateApp (currentCSVName, previousCSVName, selectedProvId) {
  try {
    const builderParlData = new BuilderParliamentData(previousCSVName, currentCSVName)
    const parliamentData = await builderParlData.getParliamentData()
    votesData = parliamentData.votes
    setupProvinceSelect()
    setupProvinceTable(provinceSelect.value)
  } catch (err) {
    console.log(err)
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

function setupProvinceTable (selectedProvId) {
  const idDivMain = 'main'
  const idTable = 'provinces-table'
  const votesDataProv = filterVotesDataByProv(selectedProvId)
  const selProvVotesDataBuilder = new BuilderSelProvVotesData(votesDataProv)
  const selProvVotesData = selProvVotesDataBuilder.getVotesData()
  console.log(selProvVotesData)
  const votesVisTable = new VotesVisTable({
    dataset: selProvVotesData,
    idDivMain,
    idTable,
    headData: [
      {
        name: 'initials',
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
        name: 'diff',
        value: 'Variación',
        type: 'variation'
      }
    ]
  })
  votesVisTable.setupTable()
}

function setupProvinceSelect () {
  provinceSelect = new ProvinceSelect('select')
  provinceSelect.setupSelect()
  provinceSelect.onChange(function (selectedProvId) {
    setupProvinceTable(selectedProvId)
  })
}

window.onresize = function () {
  const selectedProvId = provinceSelect.value
  console.log(provinceSelect)
  setupProvinceTable(selectedProvId)
}

export default updateApp
