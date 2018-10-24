import { LanguageModelFactory as LMF, ResourceProvider, Definition, Lexeme, Constants, Feature, Inflection, Homonym } from 'alpheios-data-models'

import BaseAdapter from '@/base-adapter'

import DefaultConfig from '@/tufts/config.json'
import EnginesSet from '@/tufts/engine/engines-set'
import ConfigData from '@/tufts/config-data'

class AlpheiosTuftsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = new ConfigData(config, DefaultConfig)
    this.engineSet = new EnginesSet(this.config.engine)
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(languageID, word)
    let jsonObj = await this.fetch(url)

    if (jsonObj) {
      let homonym = this.transform(jsonObj, word)
      if (homonym && homonym.lexemes) {
        homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))
      }
      return homonym
    } else {
      // No data found for this word
      return undefined
    }
  }

  prepareRequestUrl (languageID, word) {
    let engine = this.engineSet.getEngineByCode(languageID)
    let langCode = LMF.getLanguageCodeFromId(languageID)
    if (engine) {
      let code = engine.engine
      return this.config.url.replace('r_WORD', word).replace('r_ENGINE', code).replace('r_LANG', langCode).replace('r_CLIENT', this.config.clientId)
    } else {
      return null
    }
  }

  transform (jsonObj, targetWord) {
    let lexemes = []
    let annotationBody = this.checkAndConvertToArray(jsonObj.RDF.Annotation.Body)
    let providerUri = jsonObj.RDF.Annotation.creator.Agent.about

    let providerRights = this.getAnnotationProviderRights(jsonObj.RDF.Annotation)
    let provider = new ResourceProvider(providerUri, providerRights)

    for (let lexeme of annotationBody) {
      let inflectionsJSON = this.checkAndConvertToArray(lexeme.rest.entry.infl)

      let features = this.config.featuresArray
      let [lemmaElements, reconstructHdwd] = this.getLemmaData(lexeme.rest.entry.dict, inflectionsJSON)
      let language = lemmaElements[0].hdwd ? lemmaElements[0].hdwd.lang : lemmaElements[0].lang

      let languageID = LMF.getLanguageIdFromCode(language)
      let mappingData = this.engineSet.getEngineByCode(languageID)
      if (!mappingData) {
        console.log(`No mapping data found for ${language}`)
        continue
      }

      if (reconstructHdwd.length > 0) {
        lexeme.rest.entry.dict.hdwd.$ = this.updateDictHdwd(reconstructHdwd, mappingData)
      }

      let [lemmas, lexemeSet] = this.getShortDefs(lemmaElements, language, features, mappingData, lexeme, provider)

      if (lemmas.length === 0) {
        continue
      }

      let inflections = this.getInflections(inflectionsJSON, mappingData, targetWord, lemmas)

      let aggregated = mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }

    if (lexemes.length > 0) {
      return new Homonym(lexemes, targetWord)
    } else {
      return undefined
    }
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

  getAnnotationProviderRights (annotation) {
    if (annotation.rights) {
      return annotation.rights.$
    }
    return ''
  }

  getLemmaData (entryDict, inflectionsJSON) {
    let lemmaElements
    let reconstructHdwd = []

    if (entryDict) {
      if (Array.isArray(entryDict)) {
        lemmaElements = entryDict
      } else {
        if (!entryDict.hdwd && inflectionsJSON[0].term) {
          entryDict.hdwd = {}
          entryDict.hdwd.lang = inflectionsJSON[0].term.lang
          reconstructHdwd.push(inflectionsJSON[0].term.prefix ? inflectionsJSON[0].term.prefix.$ : '')
          reconstructHdwd.push(inflectionsJSON[0].term.stem ? inflectionsJSON[0].term.stem.$ : '')
          reconstructHdwd.push(inflectionsJSON[0].term.suff ? inflectionsJSON[0].term.suff.$ : '')
        }
        lemmaElements = [entryDict]
      }
    } else if (inflectionsJSON.length > 0 && inflectionsJSON[0].term) {
      lemmaElements = [ inflectionsJSON[0].term ]
    }

    return [lemmaElements, reconstructHdwd]
  }

  updateDictHdwd (reconstructHdwd, mappingData) {
    if (mappingData.model.direction === Constants.LANG_DIR_RTL) {
      reconstructHdwd.reverse()
    }
    return reconstructHdwd.join('')
  }

  getShortDefs (lemmaElements, language, features, mappingData, lexeme, provider) {
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
      let meanings = this.checkAndConvertToArray(lexeme.rest.entry.mean)
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

    return [lemmas, lexemeSet]
  }

  getInflections (inflectionsJSON, mappingData, targetWord, lemmas) {
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

export default AlpheiosTuftsAdapter
