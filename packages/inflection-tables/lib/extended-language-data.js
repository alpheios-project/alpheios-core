export default class ExtendedLanguageData {
  constructor () {
    this._type = undefined // This is a base class
  }

  static types () {
    return {
      EXTENDED_GREEK_DATA: 'ExtendedGreekData'
    }
  }

  /* static readObject (jsonObject) {
    if (!jsonObject._type) {
      throw new Error('Extended language data has no type information. Unable to deserialize.')
    } else if (jsonObject._type === ExtendedLanguageData.types().EXTENDED_GREEK_DATA) {
      return ExtendedGreekData.readObject(jsonObject)
    } else {
      throw new Error(`Unsupported extended language data of type "${jsonObject._type}".`)
    }
  } */
}
