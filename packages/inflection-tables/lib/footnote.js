import * as Models from 'alpheios-data-models'

export default class Footnote {
  constructor (index, text, partOfSpeech) {
    this.index = index
    this.text = text
    this[Models.GrmFeature.types.part] = partOfSpeech
  }

  static readObject (jsonObject) {
    this.index = jsonObject.index
    this.text = jsonObject.text
    this[Models.GrmFeature.types.part] = jsonObject[Models.GrmFeature.types.part]
    return new Footnote(jsonObject.index, jsonObject.text, jsonObject[Models.GrmFeature.types.part])
  }
}
