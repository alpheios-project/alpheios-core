import { ResourceProvider, Definition, Lexeme, Constants, Feature, Inflection, Homonym } from 'alpheios-data-models'

class TransformAdapter {
  constructor (adapter) {
    this.engineSet = adapter.engineSet
    this.config = adapter.config
    this.adapter = adapter
  }

  /**
   * This method extract parameter by defined path
   * @param {Object} source - json object to retrieve data from
   * @param {String} nameParam - parameter name that should be retrieved
   * @return {String|Object} - extracted data
  */
  extractData (source, nameParam) {
    const schema = {
      providerUri: ['RDF', 'Annotation', 'creator', 'Agent', 'about'],
      providerRights: ['RDF', 'Annotation', 'rights', '$'],
      inflections: ['rest', 'entry', 'infl'],
      dictData: ['rest', 'entry', 'dict']
    }
    let res

    if (schema[nameParam]) {
      res = source
      for (const pathPart of schema[nameParam]) {
        if (res[pathPart]) {
          res = res[pathPart]
        } else {
          res = undefined
          break
        }
      }
    }
    return res
  }

  /**
   * This method checks if data is array, if not - converts to array
   * @param {?} data - value that should be checked
   * @param {?} defaultData - default value, if data is null
   * @return {Array}
  */
  checkToBeArray (data, defaultData = []) {
    let resData = data
    if (!Array.isArray(data)) {
      if (data) {
        resData = [data]
      } else {
        resData = defaultData
      }
    }
    return resData
  }

  /**
   * This method creates hdwd from source json object
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * @param {Symbol} direction - define the word direction
   * @return {Array} - array with parts for hdwr
  */
  collectHdwdArray (data, term, direction) {
    let hdwd = [] // eslint-disable-line prefer-const

    if (data && !Array.isArray(data) && (!data.hdwd || !data.hdwd.$) && term) {
      hdwd.push(term.prefix ? term.prefix.$ : '')
      hdwd.push(term.stem ? term.stem.$ : '')
      hdwd.push(term.suff ? term.suff.$ : '')

      if (direction === Constants.LANG_DIR_RTL) {
        hdwd.reverse()
      }
    }

    return hdwd
  }

  /**
   * This method defines language from dictData nd inflections data
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * @return {String}  - language code
  */
  defineLanguage (data, term) {
    let lemmaData = Array.isArray(data) ? data[0] : data // eslint-disable-line prefer-const
    if (!lemmaData.hdwd && term) {
      lemmaData.hdwd = {}
      lemmaData.hdwd.lang = term.lang
    }
    return lemmaData.hdwd ? lemmaData.hdwd.lang : lemmaData.lang
  }

  /**
   * This method defines language from dictData nd inflections data
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * Returned values:
   *     - {Homonym}
   *     - {undefined}
  */
  transformData (jsonObj, targetWord) {
    let lexemes = [] // eslint-disable-line prefer-const
    const annotationBody = this.checkToBeArray(jsonObj.RDF.Annotation.Body)

    const providerUri = this.extractData(jsonObj, 'providerUri')
    const providerRights = this.extractData(jsonObj, 'providerRights')

    const provider = new ResourceProvider(providerUri, providerRights)

    for (const lexeme of annotationBody) {
      const inflectionsJSON = this.checkToBeArray(this.extractData(lexeme, 'inflections'))
      const inflectionsJSONTerm = inflectionsJSON.length > 0 ? inflectionsJSON[0].term : undefined

      const dictData = this.extractData(lexeme, 'dictData')

      const lemmaElements = this.checkToBeArray(dictData, inflectionsJSONTerm ? [inflectionsJSONTerm] : [])
      const language = this.defineLanguage(lemmaElements, inflectionsJSONTerm)
      if (!language) {
        this.adapter.addError(this.adapter.l10n.messages.MORPH_TRANSFORM_NO_LANGUAGE)
        continue
      }

      // Get importer based on the language
      const mappingData = this.engineSet.getEngineByCodeFromLangCode(language)
      if (!mappingData) {
        this.adapter.addError(this.adapter.l10n.messages.MORPH_TRANSFORM_NO_MAPPING_DATA.get(language))
        continue
      }

      const reconstructHdwd = this.collectHdwdArray(dictData, inflectionsJSONTerm, mappingData.model.direction)
      if (reconstructHdwd.length > 0) {
        lemmaElements[0].hdwd.$ = reconstructHdwd.join('')
      }

      let lemmas = [] // eslint-disable-line prefer-const
      let lexemeSet = [] // eslint-disable-line prefer-const

      for (const entry of lemmaElements.entries()) {
        const index = entry[0]
        const elem = entry[1]

        const lemmaText = elem.hdwd ? elem.hdwd.$ : undefined
        if (!lemmaText) {
          this.adapter.addError(this.adapter.l10n.messages.MORPH_TRANSFORM_NO_LEMMA)
          continue
        }
        const lemma = mappingData.parseLemma(lemmaText, language)
        lemmas.push(lemma)

        const features = this.config.featuresArray
        for (const feature of features) {
          mappingData.mapFeature(lemma, elem, ...feature, this.config.allowUnknownValues)
        }

        let shortdefs = [] // eslint-disable-line prefer-const
        let meanings = lexeme.rest.entry.mean
        if (!Array.isArray(meanings)) {
          meanings = [meanings]
        }
        meanings = meanings.filter((m) => m)

        // if we have multiple dictionary elements, take the meaning with the matching index
        if (lemmaElements.length > 1) {
          if (meanings && meanings[index]) {
            const meaning = meanings[index]
            // TODO: convert a source-specific language code to ISO 639-3 if don't match
            const lang = meaning.lang ? meaning.lang : 'eng'
            shortdefs.push(ResourceProvider.getProxy(provider,
              new Definition(meaning.$, lang, 'text/plain', lemmas[index].word)))
          }
        } else {
          // Changed to prevent some weird "Array Iterator.prototype.next called on incompatible receiver [object Unknown]" error
          const sDefs = meanings.map(meaning => {
            const lang = meaning.lang ? meaning.lang : 'eng'
            return ResourceProvider.getProxy(provider,
              new Definition(meaning.$, lang, 'text/plain', lemma.word))
          })
          shortdefs.push(...sDefs)
        }
        let lexmodel = new Lexeme(lemma, []) // eslint-disable-line prefer-const

        lexmodel.meaning.appendShortDefs(shortdefs)
        lexemeSet.push(ResourceProvider.getProxy(provider, lexmodel))
      }

      if (lemmas.length === 0) {
        continue
      }

      const inflections = []
      for (const inflectionJSON of inflectionsJSON) {
        const stem = inflectionJSON.term.stem ? inflectionJSON.term.stem.$ : null
        const suffix = inflectionJSON.term.suff ? inflectionJSON.term.suff.$ : null
        const prefix = inflectionJSON.term.pref ? inflectionJSON.term.pref.$ : null
        const xmpl = inflectionJSON.xmpl ? inflectionJSON.xmpl.$ : null
        let inflection
        try {
          inflection = new Inflection(stem, mappingData.model.languageID, suffix, prefix, xmpl)
        } catch (e) {
          this.adapter.addError(this.adapter.l10n.messages.MORPH_TRANSFORM_INFLECTION_ERROR.get(e.message))
          continue
        }
        if (targetWord) {
          inflection.addFeature(new Feature(Feature.types.fullForm, targetWord, mappingData.model.languageID))
        }
        // Parse whatever grammatical features we're interested in and are provided
        for (const f of this.config.featuresArrayAll) {
          try {
            mappingData.mapFeature(inflection, inflectionJSON, ...f, this.config.allowUnknownValues)
            mappingData.overrideInflectionFeatureIfRequired(f[1], inflection, lemmas)
          } catch (e) {
            // quietly continue
          }
        }
        // we only use the inflection if it tells us something the dictionary details do not
        if (inflection[Feature.types.grmCase] ||
          inflection[Feature.types.tense] ||
          inflection[Feature.types.mood] ||
          inflection[Feature.types.voice] ||
          inflection[Feature.types.person] ||
          inflection[Feature.types.comparison] ||
          inflection[Feature.types.stemtype] ||
          inflection[Feature.types.derivtype] ||
          inflection[Feature.types.dialect] ||
          inflection[Feature.types.morph] ||
          inflection[Feature.types.example]) {
          inflections.push(inflection)
        }
        // inflection can provide lemma decl, pofs, conj
        for (const lemma of lemmas) {
          if (!lemma.features[Feature.types.part]) {
            mappingData.mapFeature(lemma, inflectionJSON, 'pofs', 'part', this.config.allowUnknownValues)
          }
          // only take declension from inflection if lemma has no part of speech or its the same as the inflection
          if (!lemma.features[Feature.types.declension] &&
            (!lemma.features[Feature.types.part] || lemma.features[Feature.types.part].isEqual(inflection[Feature.types.part]))) {
            mappingData.mapFeature(lemma, inflectionJSON, 'decl', 'declension', this.config.allowUnknownValues)
          }
          // only take conjugation from inflection if lemma has a part of speech and its the same as the inflection
          if (!lemma.features[Feature.types.conjugation] &&
            (!lemma.features[Feature.types.part] || lemma.features[Feature.types.part].isEqual(inflection[Feature.types.part]))) {
            mappingData.mapFeature(lemma, inflectionJSON, 'conj', 'conjugation', this.config.allowUnknownValues)
          }
        }
      }
      const aggregated = mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }
    if (lexemes.length > 0) {
      return new Homonym(lexemes, targetWord)
    } else {
      return undefined
    }
  }
}

export default TransformAdapter
