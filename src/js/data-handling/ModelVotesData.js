import { defaultColor } from '../constants.js'
class ModelVotesData {
  constructor ({ partyName, initials, defaultName, votesNum, votesPreviousNum, color, diff }) {
    this.nombre = partyName
    this.initials = initials || partyName
    this.defaultName = defaultName || partyName
    this.color = color || defaultColor
    this.diff = diff || 0
    this.votesNum = votesNum
    this.votesPreviousNum = votesPreviousNum
  }
}
export default ModelVotesData
