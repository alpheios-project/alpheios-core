import { ResourceProvider, Definition, Lexeme, Constants, Feature, Inflection, Homonym } from 'alpheios-data-models'

class TransformAdapter {
  constructor (engineSet, config) {
    this.engineSet = engineSet
    this.config = config
  }

  extractData (source, nameParam) {
    let schema = {
      'providerUri': [ 'RDF', 'Annotation', 'creator', 'Agent', 'about' ],
      'providerRights': [ 'RDF', 'Annotation', 'rights', '$' ],
      'inflections': [ 'rest', 'entry', 'infl' ],
      'dictData': [ 'rest', 'entry', 'dict' ]
    }
    let res

    if (schema[nameParam]) {
      res = source
      for (let pathPart of schema[nameParam]) {
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

  collectHdwdArray (data, term, direction) {
    let hdwd = []

    if (data && !Array.isArray(data) && !data.hdwd && term) {
      hdwd.push(term.prefix ? term.prefix.$ : '')
      hdwd.push(term.stem ? term.stem.$ : '')
      hdwd.push(term.suff ? term.suff.$ : '')

      if (direction === Constants.LANG_DIR_RTL) {
        hdwd.reverse()
      }
    }

    return hdwd
  }

  defineLanguage (data, term) {
    let lemmaData = Array.isArray(data) ? data[0] : data
    if (!lemmaData.hdwd && term) {
      lemmaData.hdwd = {}
      lemmaData.hdwd.lang = term.lang
    }
    return lemmaData.hdwd ? lemmaData.hdwd.lang : lemmaData.lang
  }

  transformData (jsonObj, targetWord) {
    let lexemes = []
    let annotationBody = this.checkToBeArray(jsonObj.RDF.Annotation.Body)

    let providerUri = this.extractData(jsonObj, 'providerUri')
    let providerRights = this.extractData(jsonObj, 'providerRights')

    let provider = new ResourceProvider(providerUri, providerRights)

    for (let lexeme of annotationBody) {
      let inflectionsJSON = this.checkToBeArray(this.extractData(lexeme, 'inflections'))
      let inflectionsJSONTerm = inflectionsJSON.length > 0 ? inflectionsJSON[0].term : undefined

      let dictData = this.extractData(lexeme, 'dictData')

      let lemmaElements = this.checkToBeArray(dictData, inflectionsJSONTerm ? [ inflectionsJSONTerm ] : [])
      let language = this.defineLanguage(dictData, inflectionsJSONTerm)
      if (!language) {
        console.log(`No language found`)
        continue
      }

      // Get importer based on the language
      let mappingData = this.engineSet.getEngineByCodeFromLangCode(language)
      if (!mappingData) {
        console.log(`No mapping data found for ${language}`)
        continue
      }

      let reconstructHdwd = this.collectHdwdArray(dictData, inflectionsJSONTerm, mappingData.model.direction)
      if (reconstructHdwd.length > 0) {
        lemmaElements[0].hdwd.$ = reconstructHdwd.join('')
      }

      let lemmas = []
      let lexemeSet = []

      for (let entry of lemmaElements.entries()) {
        let index = entry[0]
        let elem = entry[1]

        let lemmaText = elem.hdwd ? elem.hdwd.$ : undefined
        if (!lemmaText) {
          console.log('No lemma or language found')
          continue
        }
        let lemma = mappingData.parseLemma(lemmaText, language)
        lemmas.push(lemma)

        let features = this.config.featuresArray
        for (let feature of features) {
          mappingData.mapFeature(lemma, elem, ...feature, this.config.allowUnknownValues)
        }

        let shortdefs = []
        let meanings = lexeme.rest.entry.mean
        if (!Array.isArray(meanings)) {
          meanings = [meanings]
        }
        meanings = meanings.filter((m) => m)

        // if we have multiple dictionary elements, take the meaning with the matching index
        if (lemmaElements.length > 1) {
          if (meanings && meanings[index]) {
            let meaning = meanings[index]
            // TODO: convert a source-specific language code to ISO 639-3 if don't match
            let lang = meaning.lang ? meaning.lang : 'eng'
            shortdefs.push(ResourceProvider.getProxy(provider,
              new Definition(meaning.$, lang, 'text/plain', lemmas[index].word)))
          }
        } else {
          // Changed to prevent some weird "Array Iterator.prototype.next called on incompatible receiver [object Unknown]" error
          let sDefs = meanings.map(meaning => {
            let lang = meaning.lang ? meaning.lang : 'eng'
            return ResourceProvider.getProxy(provider,
              new Definition(meaning.$, lang, 'text/plain', lemma.word))
          })
          shortdefs.push(...sDefs)
        }
        let lexmodel = new Lexeme(lemma, [])

        lexmodel.meaning.appendShortDefs(shortdefs)
        lexemeSet.push(ResourceProvider.getProxy(provider, lexmodel))
      }

      if (lemmas.length === 0) {
        continue
      }

      let inflections = []
      for (let inflectionJSON of inflectionsJSON) {
        let stem = inflectionJSON.term.stem ? inflectionJSON.term.stem.$ : null
        let suffix = inflectionJSON.term.suff ? inflectionJSON.term.suff.$ : null
        let prefix = inflectionJSON.term.pref ? inflectionJSON.term.pref.$ : null
        let xmpl = inflectionJSON.xmpl ? inflectionJSON.xmpl.$ : null
        let inflection = new Inflection(stem, mappingData.model.languageID, suffix, prefix, xmpl)
        if (targetWord) {
          inflection.addFeature(new Feature(Feature.types.fullForm, targetWord, mappingData.model.languageID))
        }
        // Parse whatever grammatical features we're interested in and are provided
        for (let f of this.config.featuresArrayAll) {
          try {
            mappingData.mapFeature(inflection, inflectionJSON, ...f, this.config.allowUnknownValues)
            mappingData.overrideInflectionFeatureIfRequired(f[1], inflection, lemmas)
          } catch (e) {
            console.log(`Unable to map ${f[0]}`, e)
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
        for (let lemma of lemmas) {
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
      let aggregated = mappingData.aggregateLexemes(lexemeSet, inflections)
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
