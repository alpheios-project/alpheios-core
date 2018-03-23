import { Feature, GrmFeature, LanguageModelFactory as LMF } from 'alpheios-data-models'
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
   * Each grammatical feature can be either a single or an array of GrmFeature objects. The latter is the case when
   * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
   * 'feminine' genders.
   *
   * @param {string} partOfSpeech - A part of speech this inflection belongs to.
   * @param {Function} ClassType - either Suffix, Form, or Paradigm
   * @param {string | null} itemValue - A text of an item. It is either a string or null if there is no suffix.
   * @param {Feature[]} features.
   * @param {ExtendedLanguageData} extendedLangData
   */
  addInflection (partOfSpeech, ClassType, itemValue, features, extendedLangData = undefined) {
    let item = new ClassType(itemValue)
    item.extendedLangData = extendedLangData

    // Build all possible combinations of features
    let multiValueFeatures = []

    // Go through all features provided
    for (let feature of features) {
      // If this is a footnote. Footnotes should go in a flat array
      // because we don't need to split by them
      if (feature.type === GrmFeature.types.footnote) {
        item[GrmFeature.types.footnote] = item[GrmFeature.types.footnote] || []
        item[GrmFeature.types.footnote].push(feature.value)
        continue
      }

      // If this ending has several grammatical feature values then they will be in an array
      if (Array.isArray(feature)) {
        if (feature.length > 0) {
          if (feature[0]) {
            let type = feature[0].type
            // Store all multi-value features to create a separate copy of a a Suffix object for each of them
            multiValueFeatures.push({type: type, features: feature})
          }
        } else {
          // Array is empty
          throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
        }
      } else {
        item.features[feature.type] = feature.value
      }
    }

    let items = []
    // Create a copy of an Suffix object for each multi-value item
    if (multiValueFeatures.length > 0) {
      for (let featureGroup of multiValueFeatures) {
        let endingItems = item.split(featureGroup.type, featureGroup.features)
        items.push(...endingItems)
      }
    } else {
      items.push(item)
    }

    if (!this.pos.has(partOfSpeech)) {
      this.pos.set(partOfSpeech, new InflectionSet(partOfSpeech))
    }
    this.pos.get(partOfSpeech).addInflectionItems(items)
  }

  addParadigms (partOfSpeech, paradigms) {
    if (!this.pos.has(partOfSpeech.value)) {
      this.pos.set(partOfSpeech.value, new InflectionSet(partOfSpeech.value))
    }
    this.pos.get(partOfSpeech.value).addInflectionItems(paradigms)
  }

  /**
   * Stores a footnote item.
   * @param {string} partOfSpeech - A part of speech this footnote belongs to
   * @param {Function} classType - A class constructor of either a Suffix or a Form
   * @param {number} index - A footnote's index.
   * @param {string} text - A footnote's text.
   */
  addFootnote (partOfSpeech, classType, index, text) {
    if (!index) {
      throw new Error('Footnote index data should not be empty.')
    }

    if (!text) {
      throw new Error('Footnote text data should not be empty.')
    }

    let footnote = new Footnote(index, text, partOfSpeech)

    // this.footnotes.push(footnote)

    if (!this.pos.has(partOfSpeech)) {
      this.pos.set(partOfSpeech, new InflectionSet(partOfSpeech))
    }
    this.pos.get(partOfSpeech).addFootnote(classType, index, footnote)
  }

  /**
   * Checks for obligatory matches between an inflection and an item.
   * @param {Inflection} inflection - An inflection object.
   * @param {Morpheme} item - An inflection data item: a Suffix, a Form, or a Paradigm
   * @return {Object} A results in the following format:
   *   {Feature[]} matchedItems - Features that matched (if any)
   *   {boolean} matchResult - True if all obligatory matches are fulfilled, false otherwise.
   */
  getObligatoryMatches (inflection, item) {
    return this.constructor.checkMatches(this.constructor.getObligatoryMatchList(inflection), inflection, item)
  }

  static checkMatches (matchList, inflection, item) {
    let matches = []
    for (const feature of matchList) {
      let match = item.featureMatch(inflection[feature])
      if (match) {
        matches.push(Feature.types.fullForm)
      }
    }
    let result = (matches.length === matchList.length)
    return { fullMatch: result, matchedItems: matches }
  }

  /**
   * Should be redefined in child classes
   * @return {Array}
   */
  getOptionalMatches (inflection) {
    return []
  }

  /**
   * Sets inflection grammar properties based on inflection data
   * @param {Inflection} inflection - An inflection data object
   * @return {Inflection} A modified inflection data object
   */
  setInflectionConstraints (inflection) {
    // inflection.constraints.obligatoryMatches = this.getObligatoryMatches(inflection)
    inflection.constraints.optionalMatches = this.getOptionalMatches(inflection)
    return inflection
  }

  getInflectionData (homonym) {
    // Add support for languages
    let result = new InflectionData(homonym)
    let inflections = {}

    for (let lexeme of homonym.lexemes) {
      for (let inflection of lexeme.inflections) {
        let partOfSpeech = inflection[GrmFeature.types.part]
        if (!partOfSpeech) {
          throw new Error('Part of speech data is missing in an inflection')
        }
        /* if (!Array.isArray(partOfSpeech)) {
          throw new Error('Part of speech data should be in an array format')
        }
        if (partOfSpeech.length === 0 && partOfSpeech.length > 1) {
          throw new Error('Part of speech data should be an array with exactly one element')
        }
        partOfSpeech = partOfSpeech[0].value */
        if (!partOfSpeech.isSingle) {
          throw new Error('Part of speech data should have only one value')
        }
        partOfSpeech = partOfSpeech.value

        if (inflection.constraints.pronounClassRequired) {
          /*
          A `class` grammatical feature is an obligatory match for Greek pronouns. Class, however, is not present in
          the Inflection object at the time we receive it from a morphological analyzer because a morphological analyzer
          does not provide such data. To fix this, for pronouns we need to figure out what the `class` feature value is
          by finding an exact pronoun form match in inflection data and obtaining a corresponding `class` value.
          The value found will then be attached to an Inflection object.
           */
          // Get a class this inflection belongs to
          let grmClasses = this.model.getPronounClasses(this.pos.get(partOfSpeech).types.get(Form).items, inflection.form)
          if (!grmClasses) {
            console.warn(`Cannot determine a grammar class for a ${inflection.form} pronoun. 
              Table construction will probably fail`)
          } else {
            // One or more values found
            inflection[GrmFeature.types.grmClass] = grmClasses
          }
        }

        // add the lemma to the inflection
        inflection[Feature.types.word] = new Feature(Feature.types.word, lexeme.lemma.word, lexeme.lemma.languageID)

        // Group inflections by a part of speech
        if (!inflections.hasOwnProperty(partOfSpeech)) {
          inflections[partOfSpeech] = []
        }
        inflections[partOfSpeech].push(inflection)
      }
    }

    // Scan for matches for all parts of speech separately
    for (const partOfSpeech in inflections) {
      let inflectionSet = new InflectionSet(partOfSpeech)
      if (inflections.hasOwnProperty(partOfSpeech)) {
        let inflectionsGroup = inflections[partOfSpeech]
        let sourceSet = this.pos.get(partOfSpeech)
        if (!sourceSet) {
          // There is no source data for this part of speech
          console.warn(`There is no source data for the following part of speech: ${partOfSpeech}`)
          continue
        }

        let paradigms = []
        let paradigmIDs = []
        let paradigmBased = false

        /*
        There might be cases when we don't know beforehand if an inflection is form based.
        In this case, if `fullFormBased` constraint not set, we'll try to find matching forms within a source data.
        If any found, `fullFormBased` constraint will be set to true.
         */
        for (let inflection of inflectionsGroup) {
          let matchingParadigms = sourceSet.getMatchingParadigms(inflection)
          if (matchingParadigms.length > 0) {
            // Make sure all paradigms are unique
            for (const paradigm of matchingParadigms) {
              if (!paradigmIDs.includes(paradigm.id)) {
                paradigms.push(paradigm)
                paradigmIDs.push(paradigm.id)
              }
            }
            inflection.constraints.paradigmBased = true
            paradigmBased = true
          }

          if (!inflection.constraints.suffixBased && !paradigmBased) {
            inflection.constraints.fullFormBased = this.hasMatchingForms(partOfSpeech, inflection)
          }

          if (!inflection.constraints.fullFormBased && !paradigmBased) {
            // If it is not full form based, then probably it is suffix base
            inflection.constraints.suffixBased = true
          }
        }
        if (paradigmBased) {
          inflectionSet.addInflectionItems(paradigms)
        }

        // If at least one inflection in a group has a constraint, we'll search for data based on that criteria
        let suffixBased = (inflectionsGroup.find(i => i.constraints.suffixBased) !== undefined)
        let formBased = (inflectionsGroup.find(i => i.constraints.fullFormBased) !== undefined)

        // Check for suffix matches
        if (suffixBased) {
          if (sourceSet.types.has(Suffix)) {
            let items = sourceSet.types.get(Suffix).items.reduce(this['reducer'].bind(this, inflectionsGroup), [])
            if (items.length > 0) {
              inflectionSet.addInflectionItems(items)
            }
          }
        }

        // If there is at least on full form based inflection, search for full form items
        if (formBased) {
          let items = sourceSet.types.get(Form).items.reduce(this['reducer'].bind(this, inflectionsGroup), [])
          if (items.length > 0) {
            inflectionSet.addInflectionItems(items)
          }
        }

        if (inflectionSet.hasTypes) {
          for (const inflectionType of inflectionSet.inflectionTypes) {
            let footnotesSource = sourceSet.types.get(inflectionType).footnotesMap
            const footnotesInUse = inflectionSet.types.get(inflectionType).footnotesInUse
            for (let footnote of footnotesSource.values()) {
              if (footnotesInUse.includes(footnote.index)) {
                inflectionSet.addFootnote(inflectionType, footnote.index, footnote)
              }
            }
          }
          result.addInflectionSet(inflectionSet)
        }
      }
    }

    return result
  }

  hasMatchingForms (partOfSpeech, inflection) {
    if (this.pos.has(partOfSpeech)) {
      let inflectionSet = this.pos.get(partOfSpeech)
      if (inflectionSet.types.has(Form)) {
        return inflectionSet.types.get(Form).items.find(item => this.matcher([inflection], item)) !== undefined
      }
    }
    return false
  }

  reducer (inflections, accumulator, item) {
    let result = this.matcher(inflections, item)
    if (result) {
      accumulator.push(result)
    }
    return accumulator
  }

  /**
   * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
   * @param {Inflection[]} inflections - an array of inflection objects to be matched against a suffix.
   * @param {Suffix} item - a suffix to be matched with inflections.
   * @returns {Suffix | null} if a match is found, returns a suffix object modified with some
   * additional information about a match. if no matches found, returns null.
   */
  matcher (inflections, item) {
    // I'm not sure if we ever want to restrict what we consider optional matches
    // so this is just a placeholder for now
    let matchOptional = true

    // Any of those features must match between an inflection and an ending
    let bestMatchData = null // information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     a fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
      let matchData = new MatchData() // Create a match profile
      let optionalMatches = matchOptional ? inflection.constraints.optionalMatches : []
      matchData.suffixMatch = inflection.compareWithWord(item.value)

      // Check for obligatory matches
      /* for (let featureName of inflection.constraints.obligatoryMatches) {
        if (inflection.hasOwnProperty(featureName) && item.featureMatch(featureName, inflection[featureName])) {
          // Add a matched feature name to a list of matched features
          matchData.matchedFeatures.push(featureName)
        } else {
          // If an obligatory match is not found, there is no reason to check other items
          break
        }
      } */

      let obligatoryMatches = this.getObligatoryMatches(inflection, item)
      if (obligatoryMatches.fullMatch) {
        matchData.matchedFeatures.push(...obligatoryMatches.matchedItems)
      } else {
        // If obligatory features do not match, there is no reason to check other items
        break
      }

      // Check optional matches now
      for (let feature of optionalMatches) {
        let matchedValue = item.featureMatch(feature, inflection[feature])
        if (matchedValue) {
          matchData.matchedFeatures.push(feature)
        }
      }

      if (matchData.suffixMatch && (matchData.matchedFeatures.length === inflection.constraints.obligatoryMatches.length + optionalMatches.length)) {
        // This is a full match
        matchData.fullMatch = true

        // There can be only one full match, no need to search any further
        item.match = matchData
        return item
      }
      bestMatchData = this.bestMatch(bestMatchData, matchData)
    }
    if (bestMatchData) {
      // There is some match found
      item.match = bestMatchData
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
}
