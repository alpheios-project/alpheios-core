import { LanguageModelFactory as LMF } from 'alpheios-data-models'
import BaseAdapter from '@/base-adapter'
import DefaultConfig from '@/lexicons/config.json'
import ConfigData from '@/config-data'

class AlpheiosLexiconsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = new ConfigData(config, DefaultConfig)
    this.config.timeout = this.config.timeout ? this.config.timeout : 0
  }

  async fetchShortDefs (lemma, options = {}) {
    let res = await this.fetchDefinitions(lemma, options, 'lookupShortDef')
    return res
  }

  async fetchFullDefs (lemma, options = {}) {
    let res = await this.fetchDefinitions(lemma, options, 'lookupFullDef')
    return res
  }

  async fetchDefinitions (lemma, options, lookupFunction) {
    Object.assign(this.config, options)
    // let requests = []
    // let adapters = this.getLexiconAdapters(lemma.languageID)
    let languageCode = LMF.getLanguageCodeFromId(lemma.languageID)
    this.lexicons = this.config.getLexiconsByLangCode(languageCode)
    // let lexiconsList = this.getLexicons(languageCode)
    console.info('*************lexicons', this.lexicons)
  }
}

export default AlpheiosLexiconsAdapter
