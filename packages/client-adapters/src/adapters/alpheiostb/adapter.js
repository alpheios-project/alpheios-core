import { LanguageModelFactory as LMF, LatinLanguageModel, GreekLanguageModel, ResourceProvider, Lexeme, Lemma, Feature, Inflection, Homonym } from 'alpheios-data-models'
import BaseAdapter from '@/adapters/base-adapter'

import DefaultConfig from '@/adapters/alpheiostb/config.json'
import xmlToJSON from 'xmltojson'

class AlpheiosTreebankAdapter extends BaseAdapter {
  /**
   * Treebank adapter uploads config data and fills model property
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.models = { lat: LatinLanguageModel, grc: GreekLanguageModel }
  }

  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} wordref - a word reference for getting homonym from Treebank
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym (languageID, wordref) {
    const server = this.prepareRequest(wordref)
    if (!server.url) {
      this.addError(this.l10n.messages.MORPH_TREEBANK_NO_URL.get(wordref))
      return
    }
    try {
      const res = await this.fetch(server.url, { type: 'xml' })

      if (res.constructor.name === 'AdapterError') {
        return
      }

      if (res) {
        const langCode = LMF.getLanguageCodeFromId(languageID)

        const jsonObj = xmlToJSON.parseString(res)
        jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]._attr = { lang: { _value: langCode } }

        const homonym = this.transform(jsonObj, jsonObj.words[0].word[0].form[0]._text, server.config)
        return homonym
      } else {
        this.addError(this.l10n.messages['MORPH_TREEBANK_NO_ANSWER_FOR_WORD'].get(wordref))
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_TREEBANK_UNKNOWN_ERROR'].get(error.mesage))
    }
  }

  /**
   * This method prepares the request from the config
   * @param {String} wordref - a word reference for getting homonym
   * @return {String} - constructed url for getting data from Treebank
  */
  prepareRequest (wordref) {
    const [text, fragment] = wordref.split(/#/)
    let requestServer = {} // eslint-disable-line prefer-const
    if (text && fragment) {
      for (const serverConfig of this.config.servers) {
        if (serverConfig.isDefault || serverConfig.texts.includes(text)) {
          requestServer.config = serverConfig
          requestServer.url = serverConfig.url.replace('r_TEXT', text)
          requestServer.url = requestServer.url.replace('r_WORD', fragment).replace('r_CLIENT', serverConfig.clientId)
          break
        }
      }
    }
    return requestServer
  }

  /**
   * This method transform data from adapter to Homonym
   * @param {Object} jsonObj - data from adapter
   * @param {String} targetWord - word
   * @param {String} config - server config
   * @return {Homonym}
  */
  transform (jsonObj, targetWord, config) {
    'use strict'
    const providerUri = config.providerUri
    const providerRights = config.providerRights
    const provider = new ResourceProvider(providerUri, providerRights)

    const hdwd = jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]
    let lemmaText = hdwd._text
    // the Alpheios v1 treebank data kept trailing digits on the lemmas
    // these won't match morphology service lemmas which have them stripped
    lemmaText = lemmaText.replace(/\d+$/, '')

    const model = this.models[hdwd._attr.lang._value]
    let lemma = new Lemma(lemmaText, model.languageCode) // eslint-disable-line prefer-const
    const lexmodel = new Lexeme(lemma, [])
    let inflection = new Inflection(lemmaText, model.languageID, null, null, null) // eslint-disable-line prefer-const
    const infl = jsonObj.words[0].word[0].entry[0].infl[0]
    inflection.addFeature(new Feature(Feature.types.fullForm, targetWord, model.languageID))

    const features = config.featuresArray
    for (const feature of features) {
      const localName = feature[0]
      const featureType = feature[1]
      const addToLemma = feature[2]
      if (infl[localName]) {
        const obj = model.typeFeature(Feature.types[featureType]).createFeatures(infl[localName][0]._text, 1)
        inflection.addFeature(obj)
        if (addToLemma) {
          lemma.addFeature(obj)
        }
      }
    }
    lexmodel.inflections = [inflection]
    return new Homonym([ResourceProvider.getProxy(provider, lexmodel)], targetWord)
  }
}

export default AlpheiosTreebankAdapter
