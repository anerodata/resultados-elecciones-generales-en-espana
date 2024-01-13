import BuilderParliamentData from './data-handling/BuilderParliamentData.js'
import BuilderSelProvVotesData from './data-handling/BuilderSelProvVotesData.js'
import VotesVisTable from './components/VotesVisTable.js'
import Select from './components/Select.js'
import { provinces, elections } from './constants.js'

let provinceSelect = {}
let votesData = {}
let ele = {}

function app () {
  ele = {
    past: {
      fileName: '201911',
      date: '2019-11-10'
    },
    current: {
      fileName: '201904',
      date: '2019-04-28'
    }
  }
  setupProvinceSelect('28')
  setupElectionsSelect()
  updateApp(ele.past.fileName, ele.current.fileName)
}

async function updateApp (currentCSVName, previousCSVName) {
  try {
    const builderParlData = new BuilderParliamentData(previousCSVName, currentCSVName)
    const parliamentData = await builderParlData.getParliamentData()
    votesData = parliamentData.votes
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
        value: ele.past.date,
        type: 'chart'
      },
      {
        name: 'votesNum',
        value: ele.current.date,
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
  const electionsSelect = new Select({
    id: 'select-elections',
    keyValue: 'fileNames',
    keyName: 'date',
    data: elections
  })
  electionsSelect.setupSelect()
}

window.onresize = function () {
  const selectedProvId = provinceSelect.value
  setupProvinceTable(selectedProvId)
}

export default app
