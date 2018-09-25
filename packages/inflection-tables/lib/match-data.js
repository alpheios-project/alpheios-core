/**
 * Detailed information about a match type.
 */
export default class MatchData {
  constructor () {
    this.suffixMatch = false // Whether two suffixes are the same.
    this.formMatch = false // Whether two forms of the word are the same
    this.fullMatch = false // Whether two suffixes and all grammatical features, including part of speech, are the same.
    this.morphologyMatch = false // Whether all morphological features are the same
    this.matchedFeatures = [] // How many features matches each other.
  }

  static readObject (jsonObject) {
    let matchData = new MatchData()
    matchData.suffixMatch = jsonObject.suffixMatch
    matchData.fullMatch = jsonObject.fullMatch
    for (let feature of jsonObject.matchedFeatures) {
      matchData.matchedFeatures.push(feature)
    }
    return matchData
  }

  toString () {
    return `MatchData: suffixMatch: ${this.suffixMatch}, formMatch: ${this.formMatch}, fullMatch: ${this.fullMatch}, morphologyMatch: ${this.morphologyMatch},` +
      ` matchedFeatures: [${this.matchedFeatures}]`
  }
}
