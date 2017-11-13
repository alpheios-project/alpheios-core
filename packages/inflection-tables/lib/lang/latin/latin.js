/*
 * Latin language data module
 */
import * as Models from 'alpheios-data-models'
import * as Lib from '../../lib.js'
import nounSuffixesCSV from './data/noun/suffixes.csv'
import nounFootnotesCSV from './data/noun/footnotes.csv'
import adjectiveSuffixesCSV from './data/adjective/suffixes.csv'
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv'
import verbSuffixesCSV from './data/verb/suffixes.csv'
import verbFootnotesCSV from './data/verb/footnotes.csv'
import papaparse from 'papaparse'

let languageModel = new Models.LatinLanguageModel()
let types = Models.Feature.types
// A language of this module
const language = Lib.languages.latin
// Create a language data set that will keep all language-related information
let dataSet = new Lib.LanguageDataset(language)

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv'
languageModel.features[types.declension].addImporter(importerName)
    .map('1st 2nd',
  [ languageModel.features[types.declension][Models.Constants.ORD_1ST],
    languageModel.features[types.declension][Models.Constants.ORD_2ND]
  ])
languageModel.features[types.gender].addImporter(importerName)
    .map('masculine feminine',
  [ languageModel.features[types.gender][Models.Constants.GEND_MASCULINE],
    languageModel.features[types.gender][Models.Constants.GEND_FEMININE]
  ])
languageModel.features[types.tense].addImporter(importerName)
    .map('future_perfect', languageModel.features[types.tense][Models.Constants.TENSE_FUTURE_PERFECT])
const footnotes = new Models.FeatureType(types.footnote, [], language)

// endregion Definition of grammatical features

// For noun and adjectives
dataSet.addSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-'

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0]
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null
    }

    let features = [partOfSpeech,
      languageModel.features[types.number].getFromImporter('csv', data[i][1]),
      languageModel.features[types.grmCase].getFromImporter('csv', data[i][2]),
      languageModel.features[types.declension].getFromImporter('csv', data[i][3]),
      languageModel.features[types.gender].getFromImporter('csv', data[i][4]),
      languageModel.features[types.type].getFromImporter('csv', data[i][5])]
    if (data[i][6]) {
            // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][6].split(' ').map(function (index) {
        return footnotes.get(index)
      })
      features.push(...indexes)
    }
    this.addSuffix(suffix, features)
  }
}

// For verbs
dataSet.addVerbSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-'

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0]
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null
    }

    let features = [partOfSpeech,
      languageModel.features[types.conjugation].getFromImporter('csv', data[i][1]),
      languageModel.features[types.voice].getFromImporter('csv', data[i][2]),
      languageModel.features[types.mood].getFromImporter('csv', data[i][3]),
      languageModel.features[types.tense].getFromImporter('csv', data[i][4]),
      languageModel.features[types.number].getFromImporter('csv', data[i][5]),
      languageModel.features[types.person].getFromImporter('csv', data[i][6])]

    let grammartype = data[i][7]
        // Type information can be empty if no ending is provided
    if (grammartype) {
      features.push(languageModel.features[types.type].getFromImporter('csv', grammartype))
    }
        // Footnotes
    if (data[i][8]) {
            // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][8].split(' ').map(function (index) {
        return footnotes.get(index)
      })
      features.push(...indexes)
    }
    this.addSuffix(suffix, features)
  }
}

dataSet.addFootnotes = function (partOfSpeech, data) {
    // First row are headers
  for (let i = 1; i < data.length; i++) {
    this.addFootnote(partOfSpeech, data[i][0], data[i][1])
  }
}

dataSet.loadData = function () {
    // Nouns
  let partOfSpeech = languageModel.features[types.part][Models.Constants.POFS_NOUN]
  let suffixes = papaparse.parse(nounSuffixesCSV, {})
  this.addSuffixes(partOfSpeech, suffixes.data)
  let footnotes = papaparse.parse(nounFootnotesCSV, {})
  this.addFootnotes(partOfSpeech, footnotes.data)

    // Adjectives
  partOfSpeech = languageModel.features[types.part][Models.Constants.POFS_ADJECTIVE]
  suffixes = papaparse.parse(adjectiveSuffixesCSV, {})
  this.addSuffixes(partOfSpeech, suffixes.data)
  footnotes = papaparse.parse(adjectiveFootnotesCSV, {})
  this.addFootnotes(partOfSpeech, footnotes.data)

    // Verbs
  partOfSpeech = languageModel.features[types.part][Models.Constants.POFS_VERB]
  suffixes = papaparse.parse(verbSuffixesCSV, {})
  this.addVerbSuffixes(partOfSpeech, suffixes.data)
  footnotes = papaparse.parse(verbFootnotesCSV, {})
  this.addFootnotes(partOfSpeech, footnotes.data)
}

/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - an array of inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - a suffix to be matched with inflections.
 * @returns {Suffix | null} if a match is found, returns a suffix object modified with some
 * additional information about a match. if no matches found, returns null.
 */
dataSet.matcher = function (inflections, suffix) {
  'use strict'
    // All of those features must match between an inflection and an ending
  let obligatoryMatches = [types.part]

    // Any of those features must match between an inflection and an ending
  let optionalMatches = [types.grmCase, types.declension, types.gender, types.number]
  let bestMatchData = null // information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     a fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
  for (let inflection of inflections) {
    let matchData = new Lib.MatchData() // Create a match profile

    if (inflection.suffix === suffix.value) {
      matchData.suffixMatch = true
    }

        // Check obligatory matches
    for (let feature of obligatoryMatches) {
      let featureMatch = suffix.featureMatch(feature, inflection[feature])
            // matchFound = matchFound && featureMatch;

      if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
        break
      }
            // Inflection's value of this feature is matching the one of the suffix
      matchData.matchedFeatures.push(feature)
    }

    if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
      break
    }

        // Check optional matches now
    for (let feature of optionalMatches) {
      let matchedValue = suffix.featureMatch(feature, inflection[feature])
      if (matchedValue) {
        matchData.matchedFeatures.push(feature)
      }
    }

    if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
            // This is a full match
      matchData.fullMatch = true

            // There can be only one full match, no need to search any further
      suffix.match = matchData
      return suffix
    }
    bestMatchData = this.bestMatch(bestMatchData, matchData)
  }
  if (bestMatchData) {
        // There is some match found
    suffix.match = bestMatchData
    return suffix
  }
  return null
}

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet.bestMatch = function (matchA, matchB) {
    // If one of the arguments is not set, return the other one
  if (!matchA && matchB) {
    return matchB
  }

  if (!matchB && matchA) {
    return matchA
  }

    // Suffix match has a priority
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
export {language, languageModel, dataSet}
