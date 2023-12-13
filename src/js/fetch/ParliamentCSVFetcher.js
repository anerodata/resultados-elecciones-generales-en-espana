import Papa from 'papaparse'
import getParliamentVotesData from './getParliamentVotesData.js'
const parseCSVtoJSON = new WeakMap()
class ParliamentCSVFetcher {
  constructor (proccessId) {
    this.proccessId = proccessId

    parseCSVtoJSON.set(this, (csvString) => {
      return Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true
      })
    })
  }

  async getParliamentJSON () {
    try {
      const parliamentDataCSV = await getParliamentVotesData(this.proccessId)
      return parseCSVtoJSON.get(this)(parliamentDataCSV)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
export default ParliamentCSVFetcher
