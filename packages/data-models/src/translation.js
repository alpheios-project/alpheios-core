import ResourceProvider from './resource_provider.js'
/**
 * stores a scope of lemma translations from python service
 * Contains a primary Lemma object
 */
class Translation {
  /**
   * Initializes a Translation object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param languageCode
   * @param translations
   */
  constructor (lemma, languageCode, translations = []) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }
    this.lemmaWord = lemma.word
    this.languageCode = languageCode
    this.glosses = translations
  }

  static readTranslationFromJSONList (lemma, languageCode, translationsList, provider) {
    if (!translationsList || !Array.isArray(translationsList)) {
      throw new Error('Recieved not proper translation list', translationsList)
    }
    const curTranslations = translationsList.find(function (element) { return element.in === lemma.word })
    const translation = new Translation(lemma, languageCode, curTranslations.translations)
    if (provider) {
      return ResourceProvider.getProxy(provider, translation)
    } else {
      return translation
    }
  }

  static loadTranslations (lemma, languageCode, translationsList, provider) {
    lemma.addTranslation(this.readTranslationFromJSONList(lemma, languageCode, translationsList, provider))
  }

  convertToJSONObject () {
    // eslint-disable-next-line prefer-const
    let result = {
      languageCode: this.languageCode,
      translations: this.glosses
    }

    if (this.provider) {
      result.provider = this.provider.convertToJSONObject()
    }
    return result
  }

  static readObject (jsonObject, lemma) {
    const translation = new Translation(lemma, jsonObject.languageCode, jsonObject.translations)
    if (jsonObject.provider) {
      const provider = ResourceProvider.readObject(jsonObject.provider)
      return ResourceProvider.getProxy(provider, translation)
    } else {
      return translation
    }
  }
}
export default Translation
