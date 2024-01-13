import BuilderParliamentData from './data-handling/BuilderParliamentData.js'
import BuilderSelProvVotesData from './data-handling/BuilderSelProvVotesData.js'
import VotesVisTable from './components/VotesVisTable.js'
import Select from './components/Select.js'
import { provinces, elections } from './constants.js'

let provinceSelect = {}
let electionsSelect = {}
let votesData = {}
let selectedDatasets = {}

function app () {
  setupProvinceSelect('28')
  setupElectionsSelect()
  selectedDatasets = getSelectedDatasets(elections[0])
  updateTable()
}

function setupProvinceSelect (selectedProvId) {
  provinceSelect = new Select({
    id: 'select',
    value: selectedProvId,
    keyValue: 'code',
    keyName: 'name',
    data: provinces
  })
  provinceSelect.setupSelect()
  provinceSelect.onChange(function (selectedProvinceObj) {
    setupProvinceTable(selectedProvinceObj.code)
  })
}

function setupElectionsSelect () {
  electionsSelect = new Select({
    id: 'select-elections',
    keyValue: 'fileNames',
    keyName: 'currentDate',
    data: elections
  })
  electionsSelect.setupSelect()
  electionsSelect.onChange(function (selectedValue) {
    selectedDatasets = getSelectedDatasets(selectedValue)
    updateTable()
  })
}

function getSelectedDatasets (elections) {
  const electionValues = elections.fileNames.split('-')
  return {
    past: {
      fileName: electionValues[1],
      date: elections.pastDate
    },
    current: {
      fileName: electionValues[0],
      date: elections.currentDate
    }
  }
}

async function updateTable () {
  try {
    const builderParlData = new BuilderParliamentData(selectedDatasets.past.fileName, selectedDatasets.current.fileName)
    const parliamentData = await builderParlData.getParliamentData()
    votesData = parliamentData.votes
    setupProvinceTable(provinceSelect.value)
  } catch (err) {
    console.log(err)
  }
}

function setupProvinceTable (selectedProvId) {
  const idDivMain = 'main'
  const idTable = 'provinces-table'
  const votesDataProv = filterVotesDataByProv(selectedProvId)
  const selProvVotesDataBuilder = new BuilderSelProvVotesData(votesDataProv)
  const selProvVotesData = selProvVotesDataBuilder.getVotesData()
  const selProvVotesDataFiltered = selProvVotesData.filter(d => d.votesNum > 0)
  const votesVisTable = new VotesVisTable({
    dataset: selProvVotesDataFiltered,
    idDivMain,
    idTable,
    votesPerDot: 100,
    headData: [
      {
        name: 'initials',
        value: votesDataProv.current['Nombre de Provincia'],
        type: 'party'
      },
      {
        name: 'votesPreviousNum',
        value: selectedDatasets.past.date,
        type: 'chart'
      },
      {
        name: 'votesNum',
        value: selectedDatasets.current.date,
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

function filterVotesDataByProv (provinceCode) {
  const votesDataProv = {}
  for (const time in votesData) {
    const filteredDataByProv = votesData[time].find(d => d['Código de Provincia'] === provinceCode)
    votesDataProv[time] = filteredDataByProv
  }
  return votesDataProv
}

window.onresize = function () {
  const selectedProvId = provinceSelect.value
  setupProvinceTable(selectedProvId)
}

export default app
