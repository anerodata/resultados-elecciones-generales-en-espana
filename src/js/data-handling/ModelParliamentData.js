class ModelParliamentData {
  constructor (previousData, currentData) {
    this.data = {
      votes: {
        previous: previousData.votes,
        current: currentData.votes
      },
      deputies: {
        previous: previousData.deputies,
        current: currentData.deputies
      }
    }
  }
}
export default ModelParliamentData
