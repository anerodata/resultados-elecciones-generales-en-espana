import Papa from 'papaparse'
import getParliamentVotesData from './getParliamentVotesData.js'
class ParliamentCSVFetcher {
  constructor (proccessId) {
    this.proccessId = proccessId
  }

  async getParliamentJSON () {
    try {
      const parliamentDataCSV = await getParliamentVotesData()
      return this.parseCSVtoJSON(parliamentDataCSV)
    } catch (err) {
      console.log(err)
    }
  }

  parseCSVtoJSON (csvString) {
    return Papa.parse(csvString, {
      header: true
    })
  }
}
export default ParliamentCSVFetcher