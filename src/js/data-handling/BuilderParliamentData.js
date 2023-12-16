import ParliamentCSVFetcher from '../fetch/ParliamentCSVFetcher.js'
import ModelParliamentData from './ModelParliamentData.js'
class BuilderParliamentData {
  constructor (previousCSVName, currentCSVName) {
    this.previousCSVName = previousCSVName
    this.currentCSVName = currentCSVName
  }

  async getParliamentData () {
    try {
      const parliamentCSVFetcherPrevious = new ParliamentCSVFetcher(this.previousCSVName)
      const parliamentCSVFetcherCurrent = new ParliamentCSVFetcher(this.currentCSVName)
      const previousParlData = await parliamentCSVFetcherPrevious.getParliamentJSON()
      const currentParlData = await parliamentCSVFetcherCurrent.getParliamentJSON()
      const modelParlData = new ModelParliamentData({
        previousVotes: previousParlData.votes,
        previousDeputies: previousParlData.deputies,
        currentVotes: currentParlData.votes,
        currentDeputies: currentParlData.deputies
      })
      return modelParlData.data
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
export default BuilderParliamentData
