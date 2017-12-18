import ExtendedLanguageData from './extended-language-data'

export default class ExtendedGreekData extends ExtendedLanguageData {
  constructor () {
    super()
    this._type = ExtendedLanguageData.types().EXTENDED_GREEK_DATA // For deserialization
    this.primary = false
  }

  static readObject (jsonObject) {
    let data = new ExtendedGreekData()
    data.primary = jsonObject.primary
    return data
  }

  merge (extendedGreekData) {
    if (this.primary !== extendedGreekData.primary) {
      console.log('Mismatch', this.primary, extendedGreekData.primary)
    }
    let merged = new ExtendedGreekData()
    merged.primary = this.primary
    return merged
  }
}
