import Papa from 'papaparse'
import getParliamentVotesData from './getParliamentVotesData.js'

const parseCSVtoJSON = new WeakMap()
const getVotesAndDeputiesData = new WeakMap()
const sortDataByVotesAndDeputies = new WeakMap()
const strVotesToReplace = '_votos'
const strDeputiesToReplace = '_diputados'

const formatVotesKey = (key) => key.replace(strVotesToReplace, '')
const formatDeputiesKey = (key) => key.replace(strDeputiesToReplace, '')

class ParliamentCSVFetcher {
  constructor (proccessId) {
    this.proccessId = proccessId

    parseCSVtoJSON.set(this, (csvString) => {
      const parsedCSV = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true
      })
      return parsedCSV.data
    })

    getVotesAndDeputiesData.set(this, (data) => {
      const parliamentVotesAndDeputies = { votes: [], deputies: [] }
      data.forEach(row => {
        const sortedData = sortDataByVotesAndDeputies.get(this)(row)
        parliamentVotesAndDeputies.votes.push(sortedData.votes)
        parliamentVotesAndDeputies.deputies.push(sortedData.deputies)
      })
      return parliamentVotesAndDeputies
    })

    sortDataByVotesAndDeputies.set(this, (row) => {
      const sortedData = { votes: {}, deputies: {} }
      for (const key in row) {
        if (key.includes(strVotesToReplace)) {
          sortedData.votes[formatVotesKey(key)] = row[key]
          continue
        }
        if (key.includes(strDeputiesToReplace)) {
          sortedData.deputies[formatDeputiesKey(key)] = row[key]
          continue
        }
        sortedData.votes[key] = row[key]
        sortedData.deputies[key] = row[key]
      }
      return sortedData
    })
  }

  async getParliamentJSON () {
    try {
      const parliamentDataCSV = await getParliamentVotesData(this.proccessId)
      const parliamentDataJSON = parseCSVtoJSON.get(this)(parliamentDataCSV)
      const parliamentVotesAndDeputies = getVotesAndDeputiesData.get(this)(parliamentDataJSON)
      return parliamentVotesAndDeputies
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
export default ParliamentCSVFetcher
