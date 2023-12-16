class ModelVotesData {
  constructor ({ partyName, votesNum, votesPreviousNum, color, diff }) {
    this.nombre = partyName
    this.votesNum = votesNum
    this.votesPreviousNum = votesPreviousNum
    this.color = color
    this.diff = diff
  }
}
export default ModelVotesData
