import { Feature } from 'alpheios-data-models'

export default class Footnote {
  constructor (index, text, partOfSpeech) {
    this.index = index
    this.text = text
    this[Feature.types.part] = partOfSpeech
  }

  static readObject (jsonObject) {
    this.index = jsonObject.index
    this.text = jsonObject.text
    this[Feature.types.part] = jsonObject[Feature.types.part]
    return new Footnote(jsonObject.index, jsonObject.text, jsonObject[Feature.types.part])
  }
}
