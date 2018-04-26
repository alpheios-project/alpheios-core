/**
 * stores a scope of lemma translations from python service
 * Contains a primary Lemma object
 */
class Translation {
  /**
   * Initializes a Translation object.
   * @param {Lemma} lemma - A lemma object.
   * @param [] meanings - A set of definitions.

   */
  constructor (lemma, meanings = '') {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }
    this.lemma = lemma
    this.meanings = meanings
  }

  static readTranslationFromJSONList (lemma, translationsList) {
    if (!translationsList || !Array.isArray(translationsList)) {
      throw new Error('Recieved not proper translation list', translationsList)
    }
    let curTranslations = translationsList.find(function (element) { return element.in === lemma.word })
    return new Translation(lemma, curTranslations.translations.join(', '))
  }

  static loadTranslations (lemma, translationsList) {
    lemma.addTranslation(this.readTranslationFromJSONList(lemma, translationsList))
  }
}
export default Translation
