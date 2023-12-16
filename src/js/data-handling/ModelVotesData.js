const votesPerDot = 100
class ModelVotesData {
  constructor ({ partyName, initials, defaultName, votesNum, votesPreviousNum, color, diff }) {
    this.nombre = partyName
    this.initials = initials || partyName
    this.defaultName = defaultName || partyName
    this.votesNum = votesNum ? Number(votesNum / votesPerDot) : undefined
    this.votesPreviousNum = votesPreviousNum ? Number(votesPreviousNum / votesPerDot) : undefined
    this.color = color || 'grey'
    this.diff = Number(diff) || 0
  }
}
export default ModelVotesData
