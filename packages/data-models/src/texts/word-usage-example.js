import TextQuoteSelector from '../w3c/text-quote-selector.js'
import LanguageModelFactory from '../language_model_factory.js'

export default class WordUsageExample extends TextQuoteSelector {
  constructor (language, targetWord, prefix, suffix, source, cit) {
    super(language, targetWord)
    this.prefix = prefix
    this.suffix = suffix
    this.source = source
    this.cit = cit
    this.author = null
    this.textWork = null
    this.passage = null
  }

  createContext () {
    return null // not implemented in the current child-class
  }

  /**
   * Creates a full text of example prefix + word + suffix
   *
   * @returns {string}
   */
  get htmlExample () {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`
  }

  /**
   * Creates a full description - author + textWork + cit number
   *
   * @param {string} lang - language for getting text
   * @returns {string}
   */
  fullCit (lang) {
    if (!this.author && !this.textWork && !this.passage) {
      return this.cit
    }
    let finalFullCit = ''
    if (!lang) {
      finalFullCit = this.formattedAuthor + ' ' + this.formattedTextWork + ' ' + this.formattedPassage
    } else {
      finalFullCit = this.author ? this.author.title(lang) : '.'
      finalFullCit = finalFullCit + ' ' + (this.textWork ? this.textWork.title(lang) : '.')
      finalFullCit = finalFullCit + ' ' + this.formattedPassage
    }

    return finalFullCit.trim()
  }

  get formattedAuthor () {
    return this.author ? this.author.title() : ''
  }

  get formattedTextWork () {
    return this.textWork ? this.textWork.title() : ''
  }

  get formattedPassage () {
    return this.passage
  }

  authorForSort (lang) {
    if (this.author) {
      return this.author.title(lang).toUpperCase()
    } else {
      return this.fullCit(lang).toUpperCase()
    }
  }

  textWorkForSort (lang) {
    if (this.textWork) {
      return this.textWork.title(lang).toUpperCase()
    } else {
      return this.fullCit(lang).toUpperCase()
    }
  }

  get prefixForSort () {
    const model = LanguageModelFactory.getLanguageModelFromCode(this.languageCode)
    const clearPrefix = this.prefix.replace(new RegExp('[' + model.getPunctuation() + ' ]', 'g'), ' ').toUpperCase().split(' ').filter(item => item.length > 0)
    return clearPrefix[clearPrefix.length - 1]
  }

  get suffixForSort () {
    const model = LanguageModelFactory.getLanguageModelFromCode(this.languageCode)
    return this.suffix.replace(new RegExp('[' + model.getPunctuation() + ' ]', 'g'), '').toUpperCase()
  }
}
