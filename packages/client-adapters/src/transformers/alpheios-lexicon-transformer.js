import { ResourceProvider, Lexeme, Constants, Feature, Inflection, Homonym } from 'alpheios-data-models'

/**
 Transforms morphological output adhering to the Alpheios lexicon
 schema to an Alpheios Homonym data model object
*/

const featuresArray = [
  ['pofs', 'part'],
  ['case', 'grmCase'],
  ['gend', 'gender'],
  ['decl', 'declension'],
  ['conj', 'conjugation'],
  ['area', 'area'],
  ['age', 'age'],
  ['geo', 'geo'],
  ['freq', 'frequency'],
  ['note', 'note'],
  ['pron', 'pronunciation'],
  ['kind', 'kind'],
  ['src', 'source']
]

const featuresArrayAll = [
  ['pofs', 'part'],
  ['case', 'grmCase'],
  ['gend', 'gender'],
  ['decl', 'declension'],
  ['conj', 'conjugation'],
  ['num', 'number'],
  ['tense', 'tense'],
  ['voice', 'voice'],
  ['mood', 'mood'],
  ['pers', 'person'],
  ['comp', 'comparison'],
  ['stemtype', 'stemtype'],
  ['derivtype', 'derivtype'],
  ['dial', 'dialect'],
  ['morph', 'morph']
]

const attributeBasedFeatures = [
  ['paradigm', 'cat']
]

class AlpheiosLexiconTransformer {
  constructor (adapter, mappingData) {
    this.adapter = adapter
    this.mappingData = mappingData
    this.allowUnknownValues = true
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

      const reconstructHdwd = this.collectHdwdArray(dictData, inflectionsJSONTerm, this.mappingData.model.direction)
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
        const lemma = this.mappingData.parseLemma(lemmaText, language)
        lemmas.push(lemma)

        const features = featuresArray
        for (const feature of features) {
          this.mappingData.mapFeature(lemma, elem, ...feature, this.allowUnknownValues)
        }

        let shortdefs = [] // eslint-disable-line prefer-const
        let meanings = lexeme.rest.entry.mean
        if (!Array.isArray(meanings)) {
          meanings = [meanings]
        }
        meanings = meanings.filter((m) => m)

        // if we have multiple dictionary elements, take the meaning with the matching index
        if (lemmaElements.length > 1) {
          if (meanings && meanings[index] && meanings[index].$) {
            const meaning = meanings[index]
            shortdefs.push(ResourceProvider.getProxy(provider,
              this.mappingData.parseMeaning(meaning, lemmas[index].word)))
          }
        } else {
          // Changed to prevent some weird "Array Iterator.prototype.next called on incompatible receiver [object Unknown]" error
          const sDefs = meanings.filter((m) => m.$).map(meaning => {
            return ResourceProvider.getProxy(provider,
              this.mappingData.parseMeaning(meaning, lemma.word))
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
        const stem = inflectionJSON.term && inflectionJSON.term.stem ? inflectionJSON.term.stem.$ : null
        const form = inflectionJSON.term && inflectionJSON.term.form ? inflectionJSON.term.form.$ : null
        const suffix = inflectionJSON.term && inflectionJSON.term.suff ? inflectionJSON.term.suff.$ : null
        const prefix = inflectionJSON.term && inflectionJSON.term.pref ? inflectionJSON.term.pref.$ : null
        const xmpl = inflectionJSON.xmpl ? inflectionJSON.xmpl.$ : null
        const inflWord = stem || form
        let inflection
        try {
          inflection = new Inflection(inflWord, this.mappingData.model.languageID, suffix, prefix, xmpl)
        } catch (e) {
          this.adapter.addError(this.adapter.l10n.messages.MORPH_TRANSFORM_INFLECTION_ERROR.get(e.message))
          continue
        }
        if (targetWord) {
          inflection.addFeature(new Feature(Feature.types.fullForm, targetWord, this.mappingData.model.languageID))
        }
        // Parse whatever grammatical features we're interested in and are provided
        for (const f of featuresArrayAll) {
          try {
            this.mappingData.mapFeature(inflection, inflectionJSON, ...f, this.allowUnknownValues)
            this.mappingData.overrideInflectionFeatureIfRequired(Feature.types[f[1]], inflection, lemmas)
          } catch (e) {
            // quietly continue
          }
        }

        // Parse attribute based features
        for (const f of attributeBasedFeatures) {
          try {
            this.mappingData.mapFeatureByAttribute(inflection, inflectionJSON, ...f, this.allowUnknownValues)
            this.mappingData.overrideInflectionFeatureIfRequired(Feature.types[f[1]], inflection, lemmas)
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
          inflection[Feature.types.stemtype] || /** greek - morpheus **/
          inflection[Feature.types.derivtype] || /** greek - morpheus **/
          inflection[Feature.types.dialect] || /** greek **/
          inflection[Feature.types.morph] || /** arabic - aramorph **/
          inflection[Feature.types.kaylo] || /** syriac - sedra **/
          inflection[Feature.types.state] || /** syriac - sedra **/
          inflection[Feature.types.example]) {
          inflections.push(inflection)
        }
        // inflection can provide lemma decl, pofs, conj
        for (const lemma of lemmas) {
          if (!lemma.features[Feature.types.part]) {
            this.mappingData.mapFeature(lemma, inflectionJSON, 'pofs', 'part', this.allowUnknownValues)
          }
          // only take declension from inflection if lemma has no part of speech or its the same as the inflection
          if (!lemma.features[Feature.types.declension] &&
            (!lemma.features[Feature.types.part] || lemma.features[Feature.types.part].isEqual(inflection[Feature.types.part]))) {
            this.mappingData.mapFeature(lemma, inflectionJSON, 'decl', 'declension', this.allowUnknownValues)
          }
          // only take conjugation from inflection if lemma has a part of speech and its the same as the inflection
          if (!lemma.features[Feature.types.conjugation] &&
            (!lemma.features[Feature.types.part] || lemma.features[Feature.types.part].isEqual(inflection[Feature.types.part]))) {
            this.mappingData.mapFeature(lemma, inflectionJSON, 'conj', 'conjugation', this.allowUnknownValues)
          }
        }
      }
      const aggregated = this.mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }
    if (lexemes.length > 0) {
      return new Homonym(lexemes, targetWord)
    } else {
      return undefined
    }
  }
}

export default AlpheiosLexiconTransformer
