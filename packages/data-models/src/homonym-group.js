import Homonym from './homonym.js'

export default class HomonymGroup {
  constructor (homonyms = []) {
    this._homonyms = homonyms
  }

  get homonyms () {
    return this._homonyms
  }

  get hasHomonyms () {
    return this._homonyms.length > 0
  }

  toHomonym (targetWord) {
    const lexemes = this._homonyms.map(homonym => homonym.lexemes).flatten()
    return new Homonym(lexemes, targetWord)
  }
}
