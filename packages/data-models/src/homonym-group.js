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
    if (!targetWord) {
      throw new Error(HomonymGroup.errors.NO_TARGET_WORD)
    }
    const lexemes = this._homonyms.map(homonym => homonym.lexemes).flat()
    return new Homonym(lexemes, targetWord)
  }
}

HomonymGroup.errors = {
  NO_TARGET_WORD: 'Target word is not provided'
}
