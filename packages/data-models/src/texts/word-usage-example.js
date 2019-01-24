import TextQuoteSelector from '../w3c/text-quote-selector.js'

export default class WordUsageExample extends TextQuoteSelector {
  constructor (language, targetWord, prefix, suffix, source, cit) {
    super(language, targetWord)
    this.prefix = prefix
    this.suffix = suffix
    this.source = source
    this.cit = cit
  }
  createContext () {
    return null // not implemented in the current child-class
  }

  /**
  * Creates a full text of example prefix + word + suffix
  * @returns {String}
  */
  get htmlExample () {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`
  }

  /**
  * Creates a full description - author + textWork + cit number
  * @param {String} lang - language for getting text
  * @returns {String}
  */
  fullCit (lang) {
    let res = ''
    if (this.author) {
      res = this.author.title(lang)
      if (this.textWork) {
        res = res + ' ' + this.textWork.title(lang)
      } else {
        if (this.cit && this.cit.split('.') && this.cit.split('.').length >= 2) {
          res = res + ' ' + this.cit.split('.')[1] + '.'
        }
      }

      if (this.cit && this.cit.split('.') && this.cit.split('.').length >= 3) {
        res = res + ' ' + this.cit.split('.')[2]
      }
    } else {
      res = this.cit
    }
    return res
  }
}
