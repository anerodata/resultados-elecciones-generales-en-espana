import BuilderParliamentData from './data-handling/BuilderParliamentData.js'
import BuilderSelProvVotesData from './data-handling/BuilderSelProvVotesData.js'
import VotesVisTable from './components/VotesVisTable.js'
import Select from './components/Select.js'
import { provinces, elections } from './constants.js'
import { getDateInSpanishFormat, getCipherInSpanishFormat } from './utils.js'

const defaultSelectedElections = elections[0]
let selectedDatasets = getSelectedDatasets(defaultSelectedElections)
const electionsSelect = getElectionsSelect(defaultSelectedElections.fileNames)
const defaultProvinceValue = '28'
const provinceSelect = getProvinceSelect(defaultProvinceValue)

let parliamentData
let votesData

async function app () {
  parliamentData = await getParliamentData()
  votesData = parliamentData.votes
  setupProvinceSelect(defaultProvinceValue)
  setupElectionsSelect()
  setupProvinceTable(provinceSelect.value.code)
}

function getProvinceSelect (selectedProvId) {
  return new Select({
    id: 'select',
    value: selectedProvId,
    keyValue: 'code',
    keyName: 'name',
    data: provinces
  })
}

function setupProvinceSelect () {
  provinceSelect.setupSelect()
  provinceSelect.onChange(function () {
    setupProvinceTable(provinceSelect.value.code)
  })
}

function getElectionsSelect (defaultValue) {
  return new Select({
    id: 'select-elections',
    value: defaultValue,
    keyValue: 'fileNames',
    keyName: 'currentDateFormatted',
    data: formatDateElections()
  })
}

function formatDateElections () {
  const electionsFormatted = elections
  electionsFormatted.forEach(election => {
    election.currentDateFormatted = getDateInSpanishFormat(election.currentDate)
    election.pastDateFormatted = getDateInSpanishFormat(election.pastDate)
  })
  return electionsFormatted
}

function setupElectionsSelect () {
  electionsSelect.setupSelect()
  electionsSelect.onChange(async function () {
    selectedDatasets = getSelectedDatasets(electionsSelect.value)
    parliamentData = await getParliamentData()
    votesData = parliamentData.votes
    setupProvinceTable(provinceSelect.value.code)
  })
}

function getSelectedDatasets (elections) {
  const electionValues = elections.fileNames.split('-')
  const selectedDatasets = {
    past: {
      fileName: electionValues[1],
      date: elections.pastDate
    },
    current: {
      fileName: electionValues[0],
      date: elections.currentDate
    }
  }
  return selectedDatasets
}

async function getParliamentData () {
  try {
    const builderParlData = new BuilderParliamentData(selectedDatasets.past.fileName, selectedDatasets.current.fileName)
    return await builderParlData.getParliamentData()
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
  let obj = {
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
        value: `Elecciones anteriores (${getDateInSpanishFormat(selectedDatasets.past.date)})`,
        type: 'chart',
        getTooltipContent: (row) => {
          return `<h3>${row.nombre}</h3> ${getCipherInSpanishFormat(row.votesPreviousNum)} votos`
        }
      },
      {
        name: 'votesNum',
        value: getDateInSpanishFormat(selectedDatasets.current.date),
        type: 'chart',
        getTooltipContent: (row) => {
          return `<h3>${row.nombre}</h3> ${getCipherInSpanishFormat(row.votesNum)} votos`
        }
      },
      {
        name: 'diff',
        value: 'Variación',
        type: 'variation',
        getTooltipContent: (row) => {
          const roundedValue = Math.round(row.diff * 10) / 10
          const cipher = getCipherInSpanishFormat(roundedValue)
          const cipherPlusSign = row.diff > 0 ? '+' : ''
          return `${cipherPlusSign + cipher} %`
        }
      }
    ]
  }
  if (!selectedDatasets.past.fileName) {
    obj = {
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
          name: 'votesNum',
          value: getDateInSpanishFormat(selectedDatasets.current.date),
          type: 'chart'
        },
        {
          name: 'diff',
          value: 'Variación',
          type: 'variation'
        }
      ]
    }
  }
  console.log(selectedDatasets)
  const votesVisTable = new VotesVisTable(obj)
  votesVisTable.setupTable()
}

function filterVotesDataByProv (provinceCode) {
  const votesDataProv = {}
  for (const time in votesData) {
    const filteredDataByProv = votesData[time].find(d => d['Código de Provincia'] === provinceCode)
    votesDataProv[time] = filteredDataByProv || {}
  }
  return votesDataProv
}

window.onresize = function () {
  const selectedProvId = provinceSelect.value.code
  setupProvinceTable(selectedProvId)
}

export default app
