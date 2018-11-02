import { ResourceProvider, Definition, Lexeme, Constants, Feature, Inflection, Homonym } from 'alpheios-data-models'

class TransformAdapter {
  constructor (engineSet, config) {
    this.engineSet = engineSet
    this.config = config
  }

  transformData (jsonObj, targetWord) {
    let lexemes = []
    let annotationBody = jsonObj.RDF.Annotation.Body
    if (!Array.isArray(annotationBody)) {
      /*
      If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
      Let's convert it to an array so we can work with it in the same way no matter what format it is.
      */
      if (annotationBody) {
        annotationBody = [annotationBody]
      } else {
        annotationBody = []
      }
    }
    let providerUri = jsonObj.RDF.Annotation.creator.Agent.about
    let providerRights = ''
    if (jsonObj.RDF.Annotation.rights) {
      providerRights = jsonObj.RDF.Annotation.rights.$
    }
    let provider = new ResourceProvider(providerUri, providerRights)
    for (let lexeme of annotationBody) {
      let inflectionsJSON = lexeme.rest.entry.infl
      if (!inflectionsJSON) {
        inflectionsJSON = []
      } else if (!Array.isArray(inflectionsJSON)) {
        // If only one inflection returned, it is a single object, not an array of objects.
        // Convert it to an array for uniformity.
        inflectionsJSON = [inflectionsJSON]
      }
      let lemmaElements
      let features = [
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
      let reconstructHdwd = []
      if (lexeme.rest.entry.dict) {
        if (Array.isArray(lexeme.rest.entry.dict)) {
          lemmaElements = lexeme.rest.entry.dict
        } else {
          if (!lexeme.rest.entry.dict.hdwd && inflectionsJSON[0].term) {
            lexeme.rest.entry.dict.hdwd = {}
            lexeme.rest.entry.dict.hdwd.lang = inflectionsJSON[0].term.lang
            reconstructHdwd.push(inflectionsJSON[0].term.prefix ? inflectionsJSON[0].term.prefix.$ : '')
            reconstructHdwd.push(inflectionsJSON[0].term.stem ? inflectionsJSON[0].term.stem.$ : '')
            reconstructHdwd.push(inflectionsJSON[0].term.suff ? inflectionsJSON[0].term.suff.$ : '')
          }
          lemmaElements = [lexeme.rest.entry.dict]
        }
      } else if (inflectionsJSON.length > 0 && inflectionsJSON[0].term) {
        lemmaElements = [ inflectionsJSON[0].term ]
      }
      // in rare cases (e.g. conditum in Whitakers) multiple dict entries
      // exist - always use the lemma and language from the first
      let language = lemmaElements[0].hdwd ? lemmaElements[0].hdwd.lang : lemmaElements[0].lang
      // Get importer based on the language
      let mappingData = this.getEngineLanguageMap(language)
      if (!mappingData) {
        console.log(`No mapping data found for ${language}`)
        continue
      }
      if (reconstructHdwd.length > 0) {
        if (mappingData.model.direction === Constants.LANG_DIR_RTL) {
          reconstructHdwd.reverse()
        }
        lexeme.rest.entry.dict.hdwd.$ = reconstructHdwd.join('')
      }
      let lemmas = []
      let lexemeSet = []
      for (let entry of lemmaElements.entries()) {
        let shortdefs = []
        let index = entry[0]
        let elem = entry[1]
        let lemmaText
        if (elem.hdwd) {
          lemmaText = elem.hdwd.$
        }
        if (!lemmaText || !language) {
          console.log('No lemma or language found')
          continue
        }
        let lemma = mappingData.parseLemma(lemmaText, language)
        lemmas.push(lemma)
        for (let feature of features) {
          mappingData.mapFeature(lemma, elem, ...feature, this.config.allowUnknownValues)
        }
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
        for (let f of [
          ['pofs', 'part'],
          ['case', 'grmCase'],
          ['decl', 'declension'],
          ['num', 'number'],
          ['gend', 'gender'],
          ['conj', 'conjugation'],
          ['tense', 'tense'],
          ['voice', 'voice'],
          ['mood', 'mood'],
          ['pers', 'person'],
          ['comp', 'comparison'],
          ['stemtype', 'stemtype'],
          ['derivtype', 'derivtype'],
          ['dial', 'dialect'],
          ['morph', 'morph']
        ]) {
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

  transformDataBackup (annotation, targetWord) {
    let lexemes = []
    let provider = this.getProviderFromAnnotation(annotation)
    let annotationBody = this.checkAndConvertToArray(annotation.Body)

    let features = this.config.featuresArray

    for (let lexeme of annotationBody) {
      console.info('*********************lexeme.rest', annotationBody, lexeme, lexeme.rest)
      let shortdefs = []
      let inflectionsJSON = this.checkAndConvertToArray(lexeme.rest.entry.infl)
      let lemmaElements = this.getLemmasFromEntryDict(lexeme.rest.entry.dict, inflectionsJSON)

      let meanings = this.checkAndConvertToArray(lexeme.rest.entry.mean).filter((m) => m)

      let languageCode = lemmaElements[0].hdwd ? lemmaElements[0].hdwd.lang : lemmaElements[0].lang

      let mappingData = this.engineSet.getEngineByCodeFromLangCode(languageCode)
      if (!mappingData) {
        console.log(`No mapping data found for ${languageCode}`)
        continue
      }

      this.updateReconstructHdwdFromDict(lexeme.rest.entry.dict, inflectionsJSON)

      let lemmas = []
      let lexemeSet = []

      for (const [index, elem] of lemmaElements.entries()) {
        let lemmaText = elem.hdwd ? elem.hdwd.$ : undefined

        if (!lemmaText || !languageCode) {
          console.log('No lemma or language found')
          continue
        }

        let lemma = mappingData.parseLemma(lemmaText, languageCode)
        lemmas.push(lemma)

        for (let feature of features) {
          mappingData.mapFeature(lemma, elem, ...feature, this.config.allowUnknownValues)
        }

        if (lemmaElements.length > 1) {
          if (meanings && meanings[index]) {
            shortdefs.push(this.getDefinitionFromProvider(provider, meanings[index], lemmas[index].word))
          }
        } else {
          let sDefs = meanings.map(meaning => this.getDefinitionFromProvider(provider, meaning, lemma.word))
          shortdefs.push(...sDefs)
        }

        let lexmodel = new Lexeme(lemma, [])
        lexmodel.meaning.appendShortDefs(shortdefs)
        lexemeSet.push(ResourceProvider.getProxy(provider, lexmodel))
      }

      if (lemmas.length === 0) {
        continue
      }

      let inflections = this.getInflections(inflectionsJSON, mappingData, lemmas, targetWord)
      let aggregated = mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }

    if (lexemes.length > 0) {
      return new Homonym(lexemes, targetWord)
    } else {
      return undefined
    }
  }

  getDefinitionFromProvider (provider, meaning, word) {
    let lang = meaning.lang ? meaning.lang : 'eng'
    return ResourceProvider.getProxy(provider, new Definition(meaning.$, lang, 'text/plain', word))
  }

  getProviderFromAnnotation (annotation) {
    let providerUri = annotation.creator.Agent.about

    let providerRights = annotation.rights ? annotation.rights.$ : ''
    return new ResourceProvider(providerUri, providerRights)
  }

  checkAndConvertToArray (value) {
    if (Array.isArrayvalue) {
      return value
    }
    if (value) {
      return [value]
    }
    return []
  }

  getLemmasFromEntryDict (entryDict, inflectionsJSON) {
    if (entryDict) {
      return this.checkAndConvertToArray(entryDict)
    } else if (inflectionsJSON.length > 0 && inflectionsJSON[0].term) {
      return [ inflectionsJSON[0].term ]
    } else {
      return undefined
    }
  }

  updateReconstructHdwdFromDict (entryDict, inflectionsJSON, mappingData) {
    let reconstructHdwd = []
    if (entryDict && !Array.isArray(entryDict) && !entryDict.hdwd && inflectionsJSON[0].term) {
      entryDict.hdwd = {}
      entryDict.hdwd.lang = inflectionsJSON[0].term.lang
      reconstructHdwd.push(inflectionsJSON[0].term.prefix ? inflectionsJSON[0].term.prefix.$ : '')
      reconstructHdwd.push(inflectionsJSON[0].term.stem ? inflectionsJSON[0].term.stem.$ : '')
      reconstructHdwd.push(inflectionsJSON[0].term.suff ? inflectionsJSON[0].term.suff.$ : '')
    }
    if (reconstructHdwd.length > 0) {
      if (mappingData.model.direction === Constants.LANG_DIR_RTL) {
        reconstructHdwd.reverse()
      }
      entryDict.hdwd.$ = reconstructHdwd.join('')
    }
  }

  getInflections (inflectionsJSON, mappingData, lemmas, targetWord) {
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

    return inflections
  }
}

export default TransformAdapter
