import Papa from 'papaparse'
import getParlamentVotesData from './../fetch/getParlamentVotesData.js'
class ParliamentDataFetcher {
  constructor (proccessId) {
    this.proccessId = proccessId
  }

  async getParliamentData () {
    try {
      const parliamentDataCSV = await getParlamentVotesData()
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
export default ParliamentDataFetcher
