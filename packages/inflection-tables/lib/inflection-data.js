import * as Models from 'alpheios-data-models'
import Suffix from './suffix'
import Footnote from './footnote'

/**
 * A return value for inflection queries
 */
export default class InflectionData {
  constructor (homonym) {
    this.homonym = homonym
    this.languageID = homonym.languageID
    this[Models.Feature.types.part] = [] // What parts of speech are represented by this object.
  }

  static readObject (jsonObject) {
    // let homonym = Models.Homonym.readObject(jsonObject.homonym)

    let lexicalData = new InflectionData()
    lexicalData[Models.Feature.types.part] = jsonObject[Models.Feature.types.part]

    for (let part of lexicalData[Models.Feature.types.part]) {
      let partData = jsonObject[part]
      lexicalData[part] = {}

      if (partData.suffixes) {
        lexicalData[part].suffixes = []
        for (let suffix of partData.suffixes) {
          lexicalData[part].suffixes.push(Suffix.readObject(suffix))
        }
      }

      if (partData.footnotes) {
        lexicalData[part].footnotes = []
        for (let footnote of partData.footnotes) {
          lexicalData[part].footnotes.push(Footnote.readObject(footnote))
        }
      }
    }

    return lexicalData
  }
}
