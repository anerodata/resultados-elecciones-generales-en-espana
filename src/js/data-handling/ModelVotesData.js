class ModelVotesData {
  constructor ({ partyName, initials, defaultName, votesNum, votesPreviousNum, color, diff }) {
    this.nombre = partyName
    this.initials = initials || partyName
    this.defaultName = defaultName || partyName
    this.color = color || 'grey'
    this.diff = diff || 0
    this.votesNum = Number(votesNum)
    this.votesPreviousNum = Number(votesPreviousNum)
  }
}
export default ModelVotesData
