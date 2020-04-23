import Homonym from './homonym.js'
import TextQuoteSelector from './w3c/text-quote-selector.js'

export default class WordItem {
  /**
   * @class
   * @param data
   * {String} targetWord
   * {String} languageCode
   * {Boolean} important
   * {Boolean} currentSession
   * {TextQuoteSelector[]} context
   * {Homonym} homonym
   */
  constructor (data = { targetWord: null, languageCode: null, important: false, currentSession: true, context: [], homonym: {}, createdDT: null, updatedDT: null, frequency: null }) {
    // TODO handling of version
    this.version = 1
    this.targetWord = data.targetWord
    this.languageCode = data.languageCode
    if (!this.targetWord || !this.languageCode) {
      throw new Error('Unable to construct a worditem without at least a targetWord and a languageCode')
    }
    this.important = data.important === undefined ? false : data.important
    this.currentSession = data.currentSession === undefined ? true : data.currentSession
    this.context = data.context || []
    this.homonym = data.homonym || {}

    this.createdDT = data.createdDT
    this.updatedDT = data.updatedDT
    this.frequency = data.frequency
  }

  /**
   * Construct a WordItem from JSON
   *
   * @param jsonObject
   */
  static readObject (jsonObject) {
    let homonym = {}
    let context = []
    if (jsonObject.homonym) {
      homonym = WordItem.readHomonym(jsonObject)
    }
    if (jsonObject.context) {
      context = WordItem.readContext(jsonObject)
    }
    const worditem = new WordItem({
      targetWord: jsonObject.targetWord,
      languageCode: jsonObject.languageCode,
      important: jsonObject.important,
      currentSession: jsonObject.currentSession,
      context: context,
      homonym: homonym
    })
    return worditem
  }

  /**
   * Construct the homonym portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readHomonym (jsonObject) {
    return Homonym.readObject(jsonObject.homonym)
  }

  get hasTextQuoteSelectors () {
    return this.context.length > 0
  }

  /**
   * Construct the context portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readContext (jsonObject) {
    let tqs = [] // eslint-disable-line prefer-const
    for (const jsonObj of jsonObject) {
      const tq = TextQuoteSelector.readObject(jsonObj)
      tqs.push(tq)
    }
    return tqs
  }

  /**
   * add one or more context selectors
   *
   * @param {TextQuoteSelector[]} selectors
   */
  addContext (selectors) {
    for (const s of selectors) {
      const found = this.context.filter(tqs => tqs.isEqual(s))
      if (found.length === 0) {
        this.context.push(s)
      }
    }
  }

  /**
   * getter for the lemmas in this WordItem
   */
  get lemmasList () {
    if (this.homonym && this.homonym.lexemes) {
      return this.homonym.lexemes.map(lexeme => lexeme.lemma.word).filter((value, index, self) => {
        return self.indexOf(value) === index
      }).join(', ')
    }
    return ''
  }

  /**
   * updates empty properties of this wordItem with those of the supplied worditem if also non-empty
   *
   * @param prevWordItem
   */
  merge (prevWordItem) {
    const checkProps = ['homonym', 'important', 'currentSession']
    for (const prop of checkProps) {
      if (this._emptyProp(prop) && !prevWordItem._emptyProp(prop)) {
        this[prop] = prevWordItem[prop]
      }
    }
  }

  /**
   * private method to detect an empty property
   *
   * @param propName
   */
  _emptyProp (propName) {
    return !this[propName] || (typeof this[propName] === 'object' && Object.keys(this[propName]).length === 0)
  }

  get formattedContext () {
    let res = {} // eslint-disable-line prefer-const
    for (const tq of this.context) {
      if (!res[tq.source]) {
        res[tq.source] = []
      }
      res[tq.source].push(tq)
    }
    return res
  }
}
