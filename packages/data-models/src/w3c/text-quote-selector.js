/**
 * Implements a W3C Text Quote Selector (https://www.w3.org/TR/annotation-model/#h-text-quote-selector)
 */
import uuidv4 from 'uuid/v4'

export default class TextQuoteSelector {
  constructor (languageCode, normalizedText, prefix = null, suffix = null, source = null) {
    this.languageCode = languageCode
    this.normalizedText = normalizedText
    this.contextForward = 6
    this.contextBackward = 6
    this.text = this.normalizedText
    this.prefix = prefix
    this.suffix = suffix
    this.source = source
    this.ID = uuidv4()
  }

  get contextHTML () {
    let templateWord = `<span class="alpheios_worditem_incontext_add">${this.text}</span>`
    let checkPrefix = this.prefix.replace(this.text, templateWord)
    let checkSuffix = this.suffix.replace(this.text, templateWord)

    let fullText = `${checkPrefix} <span class="alpheios_worditem_incontext">${this.text}</span> ${checkSuffix}`
    return fullText
  }

  createContext (selection, textSelector) {
    this.prefix = selection.anchorNode.data.substr(0, textSelector.start).trim().replace(/\n/g, '')
    this.suffix = selection.anchorNode.data.substr(textSelector.end).trim().replace(/\n/g, '')
    this.text = textSelector.text
    this.source = window.location.href
    this.languageCode = textSelector.languageCode
  }

  static readObject (jsonObject) {
    let tq = new TextQuoteSelector(jsonObject.languageCode, jsonObject.target.selector.exact)
    tq.prefix = jsonObject.target.selector.prefix
    tq.suffix = jsonObject.target.selector.suffix
    tq.text = jsonObject.targetWord
    tq.source = jsonObject.target.source
    return tq
  }

  isEqual (otherTqs) {
    let checkContextThis = `${this.prefix}${this.text}${this.suffix}`
    checkContextThis = checkContextThis.trim()

    let checkContextOther = `${otherTqs.prefix}${otherTqs.text}${otherTqs.suffix}`
    checkContextOther = checkContextOther.trim()

    return this.text === otherTqs.text &&
      this.source === otherTqs.source &&
      this.languageCode === otherTqs.languageCode &&
      checkContextThis === checkContextOther
  }
}
