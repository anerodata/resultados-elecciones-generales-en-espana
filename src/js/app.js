import BuilderParliamentData from './data-handling/BuilderParliamentData.js'
import BuilderSelProvVotesData from './data-handling/BuilderSelProvVotesData.js'
import VotesVisTable from './components/VotesVisTable.js'
import Select from './components/Select.js'
import { provinces } from './constants.js'

let provinceSelect = {}
let votesData = {}
let elections = {}

function app () {
  elections = {
    past: {
      fileName: '201911',
      date: '2019-11-10'
    },
    current: {
      fileName: '201904',
      date: '2019-04-28'
    }
  }
  updateApp(elections.past.fileName, elections.current.fileName, '28')
}

async function updateApp (currentCSVName, previousCSVName, selectedProvId) {
  try {
    const builderParlData = new BuilderParliamentData(previousCSVName, currentCSVName)
    const parliamentData = await builderParlData.getParliamentData()
    votesData = parliamentData.votes
    setupProvinceSelect(selectedProvId)
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
        value: elections.past.date,
        type: 'chart'
      },
      {
        name: 'votesNum',
        value: elections.current.date,
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
  provinceSelect = new Select({ id: 'select', value: selectedProvId, data: provinces })
  provinceSelect.setupSelect()
  provinceSelect.onChange(function (selectedProvinceObj) {
    setupProvinceTable(selectedProvinceObj.code)
  })
}

window.onresize = function () {
  const selectedProvId = provinceSelect.value
  setupProvinceTable(selectedProvId)
}

export default app
