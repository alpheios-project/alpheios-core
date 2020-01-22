import { Feature, LanguageModelFactory as LMF } from 'alpheios-data-models'
import Morpheme from './morpheme.js'
import Suffix from './suffix.js'
import Form from './form.js'

import Footnote from './footnote.js'
import InflectionSet from './inflection-set.js'
import InflectionData from './inflection-data.js'
import MatchData from './match-data.js'

/**
 * Stores inflection language data
 */
export default class LanguageDataset {
  /**
   * Initializes a LanguageDataset.
   * @param {symbol} languageID - A language ID of a data set.
   */
  constructor (languageID) {
    if (!languageID) {
      // Language is not supported
      throw new Error('Language ID cannot be empty.')
    }

    this.languageID = languageID
    this.dataLoaded = false
    this.model = LMF.getLanguageModel(languageID)
    this.pos = new Map()
    this.footnotes = [] // Footnotes
  }

  /**
   * Checks weather a language dataset has data on a certain word (stored in inflection.word) or not.
   * @param {Inflection} inflection - An inflection that needs to be checked.
   * @return {boolean} True if word is supported, false otherwise
   */
  isImplemented (inflection) {
    return true
  }

  /**
   * Each grammatical feature can be either a single or an array of Feature objects. The latter is the case when
   * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
   * 'feminine' genders.
   *
   * @param {string} partOfSpeech - A part of speech this inflection belongs to.
   * @param {Function} ClassType - either Suffix, Form, or Paradigm
   * @param {string | null} itemValue - A text of an item. It is either a string or null if there is no suffix.
   * @param {Feature[]} features - An array of Feature objects.
   * @param {Footnote[]} footnotes - Footnotes in an array.
   * @param {ExtendedLanguageData} extendedLangData
   */
  addInflectionData (partOfSpeech, ClassType, itemValue, features, footnotes = [], extendedLangData = undefined) {
    let item = new ClassType(itemValue) // eslint-disable-line prefer-const
    item.extendedLangData = extendedLangData

    // Go through all features provided
    for (const feature of features) {
      /*
      Footnotes are special because they are stored as both single or multi-value feature and
      as an array of Footnote objects into a `footnote` prop (so they can be iterated over during table construction)
       */
      if (feature.type === Feature.types.footnote) {
        item[Feature.types.footnote] = item[Feature.types.footnote] || []
        item[Feature.types.footnote].push(...feature.values)
        item.footnotes = footnotes
      } else {
        item.features[feature.type] = feature
      }
    }

    if (!this.pos.has(partOfSpeech)) {
      this.pos.set(partOfSpeech, new InflectionSet(partOfSpeech, this.languageID))
    }

    this.pos.get(partOfSpeech).addInflectionItem(item)
  }

  /**
   * Stores a footnote item.
   * @param {string} partOfSpeech - A part of speech this footnote belongs to
   * @param {Function} classType - A class constructor of either a Suffix or a Form
   * @param {number} index - A footnote's index.
   * @param {string} text - A footnote's text.
   * @return {Footnote} A footnote object that was added to the language dataset.
   */
  addFootnote (partOfSpeech, classType, index, text) {
    if (!index) {
      throw new Error('Footnote index data should not be empty.')
    }

    if (!text) {
      throw new Error('Footnote text data should not be empty.')
    }

    const footnote = new Footnote(index, text, partOfSpeech)

    // this.footnotes.push(footnote)

    if (!this.pos.has(partOfSpeech)) {
      this.pos.set(partOfSpeech, new InflectionSet(partOfSpeech, this.languageID))
    }
    this.pos.get(partOfSpeech).addFootnote(classType, index, footnote)
    return footnote
  }

  /**
   * Checks for obligatory matches between an inflection and an item.
   * @param {Inflection} inflection - An inflection object.
   * @param {Morpheme} item - An inflection data item: a Suffix, a Form, or a Paradigm.
   * @param {Morpheme.comparisonTypes} comparisonType - What matching algorithm to use (exact or partial).
   * @return {Object} A results in the following format:
   *   {Feature[]} matchedItems - Features that matched (if any)
   *   {boolean} matchResult - True if all obligatory matches are fulfilled, false otherwise.
   */
  static getObligatoryMatches (inflection, item, comparisonType = Morpheme.comparisonTypes.EXACT) {
    return this.checkMatches(inflection.constraints.obligatoryMatches, inflection, item, comparisonType)
  }

  /**
   * Checks for optional matches between an inflection and an item.
   * @param {Inflection} inflection - An inflection object.
   * @param {Morpheme} item - An inflection data item: a Suffix, a Form, or a Paradigm.
   * @param {Morpheme.comparisonTypes} comparisonType - What matching algorithm to use (exact or partial).
   * @return {Object} A results in the following format:
   *   {Feature[]} matchedItems - Features that matched (if any)
   *   {boolean} matchResult - True if all obligatory matches are fulfilled, false otherwise.
   */
  static getOptionalMatches (inflection, item, comparisonType = Morpheme.comparisonTypes.EXACT) {
    return this.checkMatches(inflection.constraints.optionalMatches, inflection, item, comparisonType)
  }

  static getMorphologyMatches (inflection, item, comparisonType = Morpheme.comparisonTypes.EXACT) {
    return this.checkMatches(inflection.constraints.morphologyMatches, inflection, item, comparisonType)
  }

  /**
   * Checks if values of features from `featureList` are the same between an inflection
   * and a morpheme. If item does not have a feature from `featureList`, such feature
   * will be still counted as a match. It is required to produce a full match in cases
   * when a morpheme has incomplete feature data.
   * @param {string[]} featureList - A list of feature names that should be checked for matching values.
   * @param {Inflection} inflection - An inflection object.
   * @param {Suffix|Form|Paradigm|Morpheme} item - A morpheme object.
   * @param {Morpheme.comparisonTypes} comparisonType - What matching algorithm to use (exact or partial).
   * @return {{fullMatch: boolean, matchedItems: string[]}} Match results object:
   * fullMatch: true if all features form a list are the same between an inflection and an item.
   * matchItems: a list of feature names that are the same between an inflection and an item.
   */
  static checkMatches (featureList, inflection, item, comparisonType = Morpheme.comparisonTypes.EXACT) {
    let fullMatchQty = featureList.length
    const matches = featureList.reduce((acc, f) => {
      if (inflection.hasOwnProperty(f) && item.features.hasOwnProperty(f) && item.featureMatch(inflection[f], comparisonType)) { // eslint-disable-line no-prototype-builtins
        acc.push(f)
      } else if (!inflection.hasOwnProperty(f) || !item.features.hasOwnProperty(f)) { // eslint-disable-line no-prototype-builtins
        /*
        If either inflection or item does not have a certain feature,
        this feature is excluded from a comparison
         */
        fullMatchQty--
      }
      return acc
    }, [])

    // we can't consider it a match if there were NO common features
    // so we have to test to make sure there is at least one matching feature
    // required and found
    const result = (matches.length > 0 && matches.length === fullMatchQty)
    return { fullMatch: result, matchedItems: matches }
  }

  setBaseInflectionData (inflection, lemma) {
    inflection.lemma = lemma
    inflection.addFeature(new Feature(Feature.types.word, lemma.word, lemma.languageID))
    inflection.constraints = this.model.getInflectionConstraints(inflection)

    inflection.constraints.implemented = this.isImplemented(inflection)
    if (inflection.constraints.implemented) {
      inflection.constraints.obligatoryMatches = this.constructor.getObligatoryMatchList(inflection)
      inflection.constraints.optionalMatches = this.constructor.getOptionalMatchList(inflection)
      inflection.constraints.morphologyMatches = this.constructor.getMorphologyMatchList(inflection)
    }
  }

  setPronounInflectionData (partOfSpeech, inflection) {
    if (inflection.constraints.pronounClassRequired) {
      /*
      A `class` grammatical feature is an obligatory match for Greek pronouns. Class, however, is not present in
      the Inflection object at the time we receive it from a morphological analyzer because a morphological analyzer
      does not provide such data. To fix this, for pronouns we need to figure out what the `class` feature value is
      by finding an exact pronoun form match in inflection data and obtaining a corresponding `class` value.
      The value found will then be attached to an Inflection object.
       */
      // Get a class this inflection belongs to
      const grmClasses = this.model.getPronounClasses(this.pos.get(partOfSpeech).types.get(Form).items, inflection.getForm())
      if (!grmClasses) {
        console.warn(`Cannot determine a grammar class for a ${inflection.form} pronoun.
              Table construction will probably fail`)
      } else {
        // One or more values found
        inflection.addFeature(grmClasses)
      }
    }
  }

  setIrregularInflectionData (inflection) {
    // Check if this is an irregular word after a `word` feature is added
    inflection.constraints.irregular = this.isIrregular(inflection)
    if (inflection.constraints.irregular) {
      // Irregular words are always full form based
      inflection.constraints.fullFormBased = true
      // inflection.constraints.suffixBased = false // Turn this on to not show regular tables for irregular verbs
    }
  }

  /**
   * Sets inflection grammar properties based on inflection data
   * @param {Inflection} inflection - An inflection data object
   * @param {Lemma} lemma
   * @return {Inflection} A modified inflection data object
   */
  setInflectionData (inflection, lemma) {
    /*
     Sets possible constraints by language model. It uses part of speech matching mostly.
     However, language model cannot always determine those constraints reliably.
     In that case it will return a list of all possible constraints and we would need
     to verify with ones hold and which ones not. For example, verbs in Latin
     can be both suffix based and full form based. A language model will return both
     suffixBased and fullFormBased flags set to true and we will need to determine
     which one of those makes sense for each particular verb.
     */

    let partOfSpeech = inflection[Feature.types.part]
    if (!partOfSpeech) {
      throw new Error('Part of speech data is missing in an inflection')
    }

    if (!partOfSpeech.isSingle) {
      throw new Error('Part of speech data should have only one value')
    }
    partOfSpeech = inflection[Feature.types.part].value

    if (!this.pos.get(partOfSpeech)) {
      // There is no source data for this part of speech
      console.warn(`There is no source data for the following part of speech: ${partOfSpeech}`)
      return inflection
    }

    this.setBaseInflectionData(inflection, lemma)
    this.setPronounInflectionData(partOfSpeech, inflection)
    this.setIrregularInflectionData(inflection)

    if (inflection.constraints.implemented && !inflection.constraints.paradigmBased) {
      // Set match features data
      /*
      Check if inflection if full form based if `fullFormBased` flag is set
      (i.e. inflection model knows it can be full form based)
      or if no other flags are set (we don't know what type of inflection it is and want to check all to figure out).
       */

      if (inflection.constraints.fullFormBased || !inflection.constraints.suffixBased) {
        /*
          If we don't know what inflection is based upon, let's assume
          this inflection is full form based and let's try to find matching forms.
          For this, we need set a `fullFormBased` flag on inflection temporarily
          and clear it if no matching forms are found (because it cannot be based on full forms then).
          This flag is required for matcher to compare full forms, not suffixes.
          */
        inflection.constraints.fullFormBased = true
        // TODO: This is done for almost every word and it does scan across many items. Need to optimize
        const hasMatchingForms = this.hasMatchingForms(partOfSpeech, inflection)
        if (hasMatchingForms) {
          // inflection.constraints.suffixBased = false // Enable this to not show regular tables for form-based words
        } else {
          // This cannot be a full form based inflection
          inflection.constraints.fullFormBased = false
        }
      }

      /*
        If we did not figure out what type of inflection it is,
        then it is probably suffix based as this type is more prevalent
        */
      if (!inflection.constraints.fullFormBased && !inflection.constraints.paradigmBased) {
        // If it is not full form based, then probably it is suffix base
        inflection.constraints.suffixBased = true
      }
    }
    return inflection
  }

  /**
   * Build a map of inflections keyed by part of speech.
   * Lexemes in homonym are sorted by a morph adapter, and we will rely on that sort order.
   * An order of part of speech keys determines an order of parts of speech in the output.
   * An order of inflections within a part of speech will be determined by an order of
   * inflection table views within a ViewSet object.
   * @deprecated Will be removed when will have no usages
   * @param {Homonym} homonym - A homonym containing lexemes with inflections
   * @return {Map<{string}, {Inflection[]}>} Maps on array of inflections to a part of speech
   */
  groupInflections (homonym) {
    let inflections = new Map() // eslint-disable-line prefer-const
    for (const lexeme of homonym.lexemes) {
      for (let inflection of lexeme.inflections) {
        // Inflections are grouped by part of speech
        inflection = this.setInflectionData(inflection, lexeme.lemma)
        const pofsValue = inflection[Feature.types.part].value
        if (!inflections.has(pofsValue)) { inflections.set(pofsValue, []) }
        inflections.get(pofsValue).push(inflection)
      }
    }
    return inflections
  }

  /**
   * In order to use morphemes with Vue.js, each morpheme in a table has to be unique.
   * However, a if morpheme has a feature with multiple values, that same morpheme will be
   * included into multiple inflection table cells.
   * To avoid that, we need to replace a single morpheme with multiple values of a feature by
   * multiple morphemes each having features with single value only.
   * @param {Suffix[]|Form[]|Paradigm[]} morphemes - An array of morpheme that might have features with multiple values
   * @return {Suffix[]|Form[]|Paradigm[]} An array of morphemes where all features have single values
   */
  static splitMultiValMorphems (morphemes) {
    let result = [] // eslint-disable-line prefer-const
    for (const morpheme of morphemes) {
      let multivalFeatures = [] // eslint-disable-line prefer-const
      for (const featureName of Object.keys(morpheme.features)) {
        if (morpheme.features[featureName].isMultiple) {
          multivalFeatures.push(morpheme.features[featureName])
        }
      }

      if (multivalFeatures.length > 0) {
        result.push(...morpheme.split(multivalFeatures))
      } else {
        result.push(morpheme)
      }
    }
    return result
  }

  /**
   * Creates an inflection set filled with inflection data.
   * @param {string} pofsValue - A part of speech of the inflection set.
   * @param {Inflection[]} inflections - An array of inflections.
   * @param {Object} options - Matcher options, see `matcher()` for more details.
   * @return {InflectionSet} Constructed inflection set.
   */
  createInflectionSet (pofsValue, inflections, options) {
    let inflectionSet = new InflectionSet(pofsValue, this.languageID) // eslint-disable-line prefer-const

    inflectionSet.inflections = inflections.filter(i => i.constraints.implemented === true)
    inflectionSet.isImplemented = inflectionSet.inflections.length > 0

    if (inflectionSet.isImplemented) {
      const sourceSet = this.pos.get(pofsValue)
      if (!sourceSet) {
        // There is no source data for this part of speech
        console.warn(`There is no source data for the following part of speech: ${pofsValue}`)
        return inflectionSet
      }

      /*
        There might be cases when we don't know beforehand if an inflection is form based.
        In this case, if `fullFormBased` constraint not set, we'll try to find matching forms within a source data.
        If any found, `fullFormBased` constraint will be set to true.
      */

      // If at least one inflection in a group has a constraint, we'll search for data based on that criteria
      const suffixBased = inflections.some(i => i.constraints.suffixBased)
      const formBased = inflections.some(i => i.constraints.fullFormBased)

      // Check for suffix matches
      if (suffixBased) {
        if (sourceSet.types.has(Suffix)) {
          const items = sourceSet.types.get(Suffix).items.reduce(this.reducerGen(inflectionSet.inflections, options), [])
          if (items.length > 0) {
            inflectionSet.addInflectionItems(items)
          }
        }
      }

      // If there is at least on full form based inflection, search for full form items
      if (formBased) {
        // Match against form based inflection only
        const formInflections = inflectionSet.inflections.filter(i => i.constraints.fullFormBased)
        const items = sourceSet.types.get(Form).items.reduce(this.reducerGen(formInflections, options), [])
        if (items.length > 0) {
          inflectionSet.addInflectionItems(items)
        }
      }

      this.createInflectionSetFootnote(inflectionSet, sourceSet)
    }

    return inflectionSet
  }

  createInflectionSetFootnote (inflectionSet, sourceSet) {
    // Add footnotes
    if (inflectionSet.hasTypes) {
      const finalSourceSet = sourceSet
      for (const inflectionType of inflectionSet.inflectionTypes) {
        const footnotesSource = finalSourceSet.types.get(inflectionType).footnotesMap
        const footnotesInUse = inflectionSet.types.get(inflectionType).footnotesInUse
        for (const footnote of footnotesSource.values()) {
          if (footnotesInUse.includes(footnote.index)) {
            inflectionSet.addFootnote(inflectionType, footnote.index, footnote)
          }
        }
      }
    }
  }

  /**
   * @deprecated Will be removed when will have no usages
   * @param homonym
   * @return {InflectionData}
   */
  getInflectionData (homonym) {
    // Add support for languages
    let result = new InflectionData(homonym) // eslint-disable-line prefer-const
    const inflections = this.groupInflections(homonym)

    // Scan for matches for all parts of speech separately
    for (const [pofsValue, inflectionsGroup] of inflections.entries()) {
      const inflectionSet = this.createInflectionSet(pofsValue, inflectionsGroup)
      result.addInflectionSet(inflectionSet)
    }
    return result
  }

  hasMatchingForms (partOfSpeech, inflection) {
    if (this.pos.has(partOfSpeech)) {
      const inflectionSet = this.pos.get(partOfSpeech)

      if (inflectionSet.types.has(Form)) {
        return inflectionSet.types.get(Form).items.find(item => this.matcher([inflection], item, { findMatches: false })) !== undefined
      }
    }
    return false
  }

  reducerGen (inflections, options) {
    const instance = this
    function reducerFn (accumulator, item) {
      const result = instance['matcher'](inflections, item, options)
      if (result) {
        accumulator.push(result)
      }
      return accumulator
    }
    return reducerFn.bind(this)
  }

  /**
   * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
   * @param {Inflection[]} inflections - an array of inflection objects to be matched against a suffix.
   * @param {Suffix} item - a suffix to be matched with inflections.
   * @param {Object} options - An options object that may contain the following properties:
   *        findMatches - whether to find form, suffix, and morphology matches. Default: true
   *        findMorphologyMatches - whether to find morphology matches. If set, overrides values set by `findMatches`
   * @returns {Suffix | null} if a match is found, returns a suffix object modified with some
   * additional information about a match. if no matches found, returns null.
   */
  matcher (inflections, item, options = {}) {
    if (!options.hasOwnProperty('findMatches')) { // eslint-disable-line no-prototype-builtins
      options.findMatches = true // Default value
    }
    if (!options.hasOwnProperty('findMorphologyMatches')) { // eslint-disable-line no-prototype-builtins
      // If not specified explicitly, will be controlled by `findMatches` value
      options.findMorphologyMatches = options.findMatches // Default value
    }
    // Any of those features must match between an inflection and an ending
    let bestMatchData = null // information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     a fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */

    for (const inflection of inflections) {
      // Create a match profile
      let matchData = new MatchData() // eslint-disable-line prefer-const
      if (options.findMatches) {
        matchData.suffixMatch = inflection.smartWordCompare(item.value, item.constructor.name, { fuzzySuffix: true })
      }

      // Check for obligatory matches
      const obligatoryMatches = this.constructor.getObligatoryMatches(inflection, item, Morpheme.comparisonTypes.PARTIAL)
      if (obligatoryMatches.fullMatch) {
        matchData.matchedFeatures.push(...obligatoryMatches.matchedItems)
      } else {
        // If obligatory features do not match, there is no reason to check other items
        break
      }

      /*
      Check for optional matches. Use `All_VALUES` matching algorithm
      as multiple values in inflection and morpheme can go in different order.
       */
      const optionalMatches = this.constructor.getOptionalMatches(inflection, item, Morpheme.comparisonTypes.PARTIAL)
      matchData.matchedFeatures.push(...optionalMatches.matchedItems)

      if (options.findMorphologyMatches) {
        const morphologyMatches = this.constructor.getMorphologyMatches(inflection, item, Morpheme.comparisonTypes.PARTIAL)
        matchData.morphologyMatch = morphologyMatches.fullMatch
      } else {
        matchData.morphologyMatch = false
      }

      if (matchData.suffixMatch && obligatoryMatches.fullMatch && optionalMatches.fullMatch) {
        // This is a full match
        matchData.fullMatch = true

        // There can be only one full match, no need to search any further
        if (options.findMatches) {
          item.match = matchData
        }

        return item
      }
      bestMatchData = this.bestMatch(bestMatchData, matchData)
    }

    if (bestMatchData) {
      // There is some match found
      if (options.findMatches) {
        item.match = bestMatchData
      }
      return item
    }
    return null
  }

  /**
   * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
   * @param {MatchData} matchA
   * @param {MatchData} matchB
   * @returns {MatchData} A best of two matches
   */
  bestMatch (matchA, matchB) {
    // If one of the arguments is not set, return the other one
    if (!matchA && matchB) {
      return matchB
    }

    if (!matchB && matchA) {
      return matchA
    }

    // item match has a priority
    if (matchA.suffixMatch !== matchB.suffixMatch) {
      if (matchA.suffixMatch > matchB.suffixMatch) {
        return matchA
      } else {
        return matchB
      }
    }

    // If same on suffix matche, compare by how many features matched
    if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
      // Arbitrarily return matchA if matches are the same
      return matchA
    } else {
      return matchB
    }
  }

  /**
   * Checks whether a word in an inflection is irregular or not.
   * @param {Inflection} inflection - Inflection to be checked.
   * @return {boolean} - True if the word is irregular, false otherwise.
   */
  isIrregular (inflection) {
    return false
  }
}
