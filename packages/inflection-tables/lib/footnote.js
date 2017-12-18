import * as Models from 'alpheios-data-models'

export default class Footnote {
  constructor (index, text, partOfSpeech) {
    this.index = index
    this.text = text
    this[Models.Feature.types.part] = partOfSpeech
  }

  static readObject (jsonObject) {
    this.index = jsonObject.index
    this.text = jsonObject.text
    this[Models.Feature.types.part] = jsonObject[Models.Feature.types.part]
    return new Footnote(jsonObject.index, jsonObject.text, jsonObject[Models.Feature.types.part])
  }
}
