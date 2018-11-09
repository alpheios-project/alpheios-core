import { LanguageModelFactory as LMF, Definition, ResourceProvider } from 'alpheios-data-models'
import papaparse from 'papaparse'

import BaseAdapter from '@/base-adapter'
import DefaultConfig from '@/lexicons/config.json'
import LexiconsConfigData from '@/lexicons/config-data'

class AlpheiosLexiconsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = new LexiconsConfigData(config, DefaultConfig)
    this.options = { timeout: this.config.timeout ? this.config.timeout : 0 }
    this.data = null
  }

  async fetchShortDefs (lemma, options = {}) {
    let res = await this.fetchDefinitions(lemma, options, 'short')
    return res
  }

  async fetchFullDefs (lemma, options = {}) {
    let res = await this.fetchDefinitions(lemma, options, 'full')
    return res
  }

  async fetchDefinitions (lemma, options, lookupFunction) {
    console.info('************* fetchDefinitions')
    Object.assign(this.options, options)
    if (!this.options.allow || this.options.allow.length === 0) {
      console.error('There are no allowed urls in the options')
      return
    }

    let urlKeys = this.getRequests(lemma.languageID).filter(url => this.options.allow.includes(url))

    for (let urlKey of urlKeys) {
      let url = this.config[urlKey].urls[lookupFunction]
      let unparsed = await this.fetch(url, { type: 'xml', timeout: this.options.timeout })
      if (lookupFunction === 'short') {
        await this.updateShortDefs(unparsed, lemma, this.config[urlKey])
      }
    }
  }

  async updateShortDefs (unparsed, lemma, config) {
    console.info('************************updateShortDefs')
    let parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
    this.data = this.fillMap(parsed.data)
    // console.info('************************this.data', this.data)
    let model = LMF.getLanguageModel(lemma.languageID)
    let deftexts = this.lookupInDataIndex(this.data, lemma, model)
    console.info('***************************deftexts', deftexts)

    if (deftexts) {
      for (let d of deftexts) {
        let def = new Definition(d, config.langs.target, 'text/plain', lemma.word)
        await ResourceProvider.getProxy(this.provider, def)
      }
    }
    console.info('**************lemma', lemma)
  }

  getRequests (languageID) {
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    return Object.keys(this.config).filter(url => this.config[url].langs && this.config[url].langs.source === languageCode)
  }

  /**
   * fills the data map with the rows from the parsed file
   * we need a method to do this because there may be homonyms in
   * the files
   * @param {string[]} rows
   * @return {Map} the filled map
   */
  fillMap (rows) {
    let data = new Map()
    for (let row of rows) {
      if (data.has(row[0])) {
        data.get(row[0]).push(row[1])
      } else {
        data.set(row[0], [ row[1] ])
      }
    }
    return data
  }

  /**
   * Lookup a Lemma object in an Alpheios v1 data index
   * @param {Map} data the data inddex
   * @param {Lemma} lemma the lemma to lookupInDataIndex
   * @param {LanguageModel} model a language model for language specific methods
   * @return {string} the index entry as a text string
   */
  lookupInDataIndex (data, lemma, model) {
    // legacy behavior from Alpheios lemma data file indices
    // first look to see if we explicitly have an instance of this lemma
    // with capitalization retained
    let found

    let alternatives = []
    let altEncodings = []
    for (let l of [lemma.word, ...lemma.principalParts]) {
      alternatives.push(l)
      for (let a of model.alternateWordEncodings(l)) {
        // we gather altEncodings separately because they should
        // be tried last after the lemma and principalParts in their
        // original form
        altEncodings.push(a)
      }
      let nosense = l.replace(/_?\d+$/, '')
      if (l !== nosense) {
        alternatives.push(nosense)
      }
    }
    alternatives = [...alternatives, ...altEncodings]

    for (let lookup of alternatives) {
      found = data.get(lookup.toLocaleLowerCase())
      if (found && found.length === 1 && found[0] === '@') {
        found = data.get(`@${lookup}`)
      }
      if (found) {
        break
      }
    }
    return found
  }
}

export default AlpheiosLexiconsAdapter
