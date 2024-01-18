import ParliamentCSVFetcher from '../fetch/ParliamentCSVFetcher.js'
import ModelParliamentData from './ModelParliamentData.js'
const getProccessData = new WeakMap()
const getModelParlData = new WeakMap()
class BuilderParliamentData {
  constructor (previousCSVName, currentCSVName) {
    this.previousCSVName = previousCSVName
    this.currentCSVName = currentCSVName

    getProccessData.set(this, (csvName) => {
      if (csvName !== undefined) {
        const parliamentCSVFetcher = new ParliamentCSVFetcher(csvName)
        return parliamentCSVFetcher.getParliamentJSON()
      }
      return {}
    })
    getModelParlData.set(this, (previousParlData, currentParlData) => {
      if (Object.keys(previousParlData).length > 0) {
        return new ModelParliamentData({
          previousVotes: previousParlData.votes,
          previousDeputies: previousParlData.deputies,
          currentVotes: currentParlData.votes,
          currentDeputies: currentParlData.deputies
        })
      }
      return new ModelParliamentData({
        previousVotes: [],
        previousDeputies: [],
        currentVotes: currentParlData.votes,
        currentDeputies: currentParlData.deputies
      })
    })
  }

  async getParliamentData () {
    try {
      const previousParlData = await getProccessData.get(this)(this.previousCSVName)
      const currentParlData = await getProccessData.get(this)(this.currentCSVName)
      const modelParlData = getModelParlData.get(this)(previousParlData, currentParlData)
      return modelParlData.data
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
export default BuilderParliamentData
