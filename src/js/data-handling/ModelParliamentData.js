class ModelParliamentData {
  constructor ({ previousVotes, previousDeputies, currentVotes, currentDeputies }) {
    this.data = {
      votes: {
        previous: previousVotes,
        current: currentVotes
      },
      deputies: {
        previous: previousDeputies,
        current: currentDeputies
      }
    }
  }
}
export default ModelParliamentData
