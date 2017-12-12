import * as Models from 'alpheios-data-models'
/**
 * Shared data structures and functions
 */

const languages = {
  type: 'language',
  latin: 'lat',
  greek: 'grc',
  isAllowed (language) {
    if (language === this.type) {
      return false
    } else {
      return Object.values(this).includes(language)
    }
  }
}

/**
 * Stores inflection language data
 */
class LanguageDataset {
    /**
     * Initializes a LanguageDataset.
     * @param {string} language - A language of a data set, from an allowed languages list (see 'languages' object).
     */
  constructor (language) {
    if (!language) {
            // Language is not supported
      throw new Error('Language data cannot be empty.')
    }

    if (!languages.isAllowed(language)) {
            // Language is not supported
      throw new Error('Language "' + language + '" is not supported.')
    }
    this.language = language
    this.suffixes = [] // An array of suffixes.
    this.footnotes = [] // Footnotes
  };

    /**
     * Each grammatical feature can be either a single or an array of Feature objects. The latter is the case when
     * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
     * 'feminine' genders
     *
     * @param {string | null} suffixValue - A text of a suffix. It is either a string or null if there is no suffix.
     * @param {Feature[]} featureValue
     * @return {Suffix} A newly added suffix value (can be used to add more data to the suffix).
     */
  addSuffix (suffixValue, featureValue, extendedLangData) {
        // TODO: implement run-time error checking
    let suffixItem = new Suffix(suffixValue)
    suffixItem.extendedLangData = extendedLangData

        // Build all possible combinations of features
    let multiValueFeatures = []

        // Go through all features provided
    for (let feature of featureValue) {
            // If this is a footnote. Footnotes should go in a flat array
            // because we don't need to split by them
      if (feature.type === Models.Feature.types.footnote) {
        suffixItem[Models.Feature.types.footnote] = suffixItem[Models.Feature.types.footnote] || []
        suffixItem[Models.Feature.types.footnote].push(feature.value)
        continue
      }

            // If this ending has several grammatical feature values then they will be in an array
      if (Array.isArray(feature)) {
        if (feature.length > 0) {
          if (feature[0]) {
            let type = feature[0].type
                    // Store all multi-value features to create a separate copy of a a Suffix object for each of them
            multiValueFeatures.push({type: type, features: feature})
          } else {
            console.log(feature)
          }
        } else {
                    // Array is empty
          throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
        }
      } else {
        suffixItem.features[feature.type] = feature.value
      }
    }

        // Create a copy of an Suffix object for each multi-value item
    if (multiValueFeatures.length > 0) {
      for (let featureGroup of multiValueFeatures) {
        let endingItems = suffixItem.split(featureGroup.type, featureGroup.features)
        this.suffixes = this.suffixes.concat(endingItems)
      }
    } else {
      this.suffixes.push(suffixItem)
    }
  };

    /**
     * Stores a footnote item.
     * @param {Feature} partOfSpeech - A part of speech this footnote belongs to
     * @param {number} index - A footnote's index.
     * @param {string} text - A footnote's text.
     */
  addFootnote (partOfSpeech, index, text) {
    if (!index) {
      throw new Error('Footnote index data should not be empty.')
    }

    if (!text) {
      throw new Error('Footnote text data should not be empty.')
    }

    let footnote = new Footnote(index, text, partOfSpeech.value)
    footnote.index = index

    this.footnotes.push(footnote)
  };

  getSuffixes (homonym) {
        // Add support for languages
    let result = new LexicalData(homonym)
    let inflections = {}

        // Find partial matches first, and then full among them

        // TODO: do we ever need lemmas?
    for (let lexema of homonym.lexemes) {
      for (let inflection of lexema.inflections) {
                // Group inflections by a part of speech
        let partOfSpeech = inflection[Models.Feature.types.part]
        if (!partOfSpeech) {
          throw new Error('Part of speech data is missing in an inflection.')
        }

        if (!inflections.hasOwnProperty(partOfSpeech)) {
          inflections[partOfSpeech] = []
        }
        inflections[partOfSpeech].push(inflection)
      }
    }

        // Scan for matches for all parts of speech separately
    for (const partOfSpeech in inflections) {
      if (inflections.hasOwnProperty(partOfSpeech)) {
        let inflectionsGroup = inflections[partOfSpeech]

        result[Models.Feature.types.part].push(partOfSpeech)
        result[partOfSpeech] = {}
        result[partOfSpeech].suffixes = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup), [])
        result[partOfSpeech].footnotes = []

                // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set()
                // Scan all selected suffixes to build a unique set of footnote indexes
        for (let suffix of result[partOfSpeech].suffixes) {
          if (suffix.hasOwnProperty(Models.Feature.types.footnote)) {
                        // Footnote indexes are stored in an array
            for (let index of suffix[Models.Feature.types.footnote]) {
              footnotesIndex.add(index)
            }
          }
        }
                // Add footnote indexes and their texts to a result
        for (let index of footnotesIndex) {
          let footnote = this.footnotes.find(footnoteElement =>
                        footnoteElement.index === index && footnoteElement[Models.Feature.types.part] === partOfSpeech
                    )
          result[partOfSpeech].footnotes.push({index: index, text: footnote.text})
        }
                // Sort footnotes according to their index numbers
        result[partOfSpeech].footnotes.sort((a, b) => parseInt(a.index) - parseInt(b.index))
      }
    }

    return result
  }

  reducer (inflections, accumulator, suffix) {
    let result = this.matcher(inflections, suffix)
    if (result) {
      accumulator.push(result)
    }
    return accumulator
  }
}

/**
 * Stores one or several language datasets, one for each language
 */
class LanguageData {
    /**
     * Combines several language datasets for different languages. Allows to abstract away language data.
     * This function is chainable.
     * @param {LanguageDataset[]} languageData - Language datasets of different languages.
     * @return {LanguageData} Self instance for chaining.
     */
  constructor (languageData) {
    this.supportedLanguages = []

    if (languageData) {
      for (let dataset of languageData) {
        this[dataset.language] = dataset
        this.supportedLanguages.push(dataset.language)
      }
    }
    return this
  }

    /**
     * Loads data for all data sets.
     * This function is chainable.
     * @return {LanguageData} Self instance for chaining.
     */
  loadData () {
    for (let language of this.supportedLanguages) {
      try {
        this[language].loadData()
      } catch (e) {
        console.log(e)
      }
    }
    return this
  }

    /**
     * Finds matching suffixes for a homonym.
     * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
     * @return {LexicalData} A return value of an inflection query.
     */
  getSuffixes (homonym) {
    let language = homonym.language
    if (this.supportedLanguages.includes(language)) {
      return this[homonym.language].getSuffixes(homonym)
    } else {
      // throw new Error(`"${language}" language data is missing. Unable to get suffix data.`)
      return new LexicalData(homonym)
    }
  }
}

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
class Suffix {
    /**
     * Initializes a Suffix object.
     * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
     */
  constructor (suffixValue) {
    if (suffixValue === undefined) {
      throw new Error('Suffix should not be empty.')
    }
    this.value = suffixValue
    this.features = {}
    this.featureGroups = {}

        /*
        Extended language data stores additional suffix information that is specific for a particular language.
        It uses the following schema:
        {string} language(key): {object} extended language data. This object is specific for each language
        and is defined in a language model.
         */
    this.extendedLangData = {}
    this.match = undefined
  }

  static readObject (jsonObject) {
    let suffix = new Suffix(jsonObject.value)

    if (jsonObject.features) {
      for (let key in jsonObject.features) {
        if (jsonObject.features.hasOwnProperty(key)) {
          suffix.features[key] = jsonObject.features[key]
        }
      }
    }

    if (jsonObject.featureGroups) {
      for (let key in jsonObject.featureGroups) {
        if (jsonObject.featureGroups.hasOwnProperty(key)) {
          suffix.featureGroups[key] = []
          for (let value of jsonObject.featureGroups[key]) {
            suffix.featureGroups[key].push(value)
          }
        }
      }
    }

    if (jsonObject[Models.Feature.types.footnote]) {
      suffix[Models.Feature.types.footnote] = []
      for (let footnote of jsonObject[Models.Feature.types.footnote]) {
        suffix[Models.Feature.types.footnote].push(footnote)
      }
    }

    if (jsonObject.match) {
      suffix.match = MatchData.readObject(jsonObject.match)
    }

    for (const lang in jsonObject.extendedLangData) {
      if (jsonObject.extendedLangData.hasOwnProperty(lang)) {
        suffix.extendedLangData[lang] = ExtendedLanguageData.readObject(jsonObject.extendedLangData[lang])
      }
    }
    return suffix
  }

    /**
     * Returns a copy of itself. Used in splitting suffixes with multi-value features.
     * @returns {Suffix}
     */
  clone () {
        // TODO: do all-feature two-level cloning
    let clone = new Suffix(this.value)
    for (const key in this.features) {
      if (this.features.hasOwnProperty(key)) {
        clone.features[key] = this.features[key]
      }
    }
    for (const key in this.featureGroups) {
      if (this.featureGroups.hasOwnProperty(key)) {
        clone.featureGroups[key] = this.featureGroups[key]
      }
    }

    if (this.hasOwnProperty(Models.Feature.types.footnote)) {
      clone[Models.Feature.types.footnote] = this[Models.Feature.types.footnote]
    }

    for (const lang in this.extendedLangData) {
      if (this.extendedLangData.hasOwnProperty(lang)) {
        clone.extendedLangData[lang] = this.extendedLangData[lang]
      }
    }
    return clone
  };

    /**
     * Checks if suffix has a feature that is a match to the one provided.
     * @param {string} featureType - Sets a type of a feature we need to match with the ones stored inside the suffix
     * @param {string[]} featureValues - A list of feature values we need to match with the ones stored inside the suffix
     * @returns {string | undefined} - If provided feature is a match, returns a first feature that matched.
     * If no match found, return undefined.
     */
  featureMatch (featureType, featureValues) {
    if (this.features.hasOwnProperty(featureType)) {
      for (let value of featureValues) {
        if (value === this.features[featureType]) {
          return value
        }
      }
    }
    return undefined
  }

    /**
     * Find feature groups in Suffix.featureGroups that are the same between suffixes provided
     * @param suffixes
     */
  static getCommonGroups (suffixes) {
    let features = Object.keys(suffixes[0].featureGroups)

    let commonGroups = features.filter(feature => {
      let result = true
      for (let i = 1; i < suffixes.length; i++) {
        result = result && suffixes[i].features.hasOwnProperty(feature)
      }
      return result
    })
    return commonGroups
  }

    /**
     * Finds out if an suffix is in the same group with some other suffix. The other suffix is provided as a function argument.
     * Two suffixes are considered to be in the same group if they are:
     * a. Have at least one common group in featureGroups;
     * b. Have the same suffix
     * c. Have values of all features the same except for those that belong to a common group(s)
     * d. Values of the common group features must be complementary. Here is an example:
     * Let's say a 'gender' group can have values such as 'masculine' and 'feminine'. Then suffixes will be combined
     * only if gender value of one suffix is 'masculine' and the other value is 'feminine'. If both suffixes have the same
     * either 'masculine' or 'feminine' value, they sill not be combined as are not being complementary.
     * @param {Suffix} suffix - An other suffix that we compare this suffix with.
     * @returns {boolean} - True if both suffixes are in the same group, false otherwise.
     */
  isInSameGroupWith (suffix) {
    let commonGroups = Suffix.getCommonGroups([this, suffix])
    if (commonGroups.length < 1) {
            // If elements do not have common groups in Suffix.featureGroups then they are not in the same group
      return false
    }

    let commonValues = {}
    commonGroups.forEach((feature) => { commonValues[feature] = new Set([this.features[feature]]) })

    let result = true
    result = result && this.value === suffix.value
        // If suffixes does not match don't check any further
    if (!result) {
      return false
    }

        // Check all features to be a match, except those that are possible group values
    for (let feature of Object.keys(this.features)) {
      if (commonGroups.indexOf(feature) >= 0) {
        commonValues[feature].add(suffix.features[feature])

                // Do not compare common groups
        continue
      }
      result = result && this.features[feature] === suffix.features[feature]
            // If feature mismatch discovered, do not check any further
      if (!result) {
        return false
      }
    }

    commonGroups.forEach(feature => {
      result = result && commonValues[feature].size === 2
    })

    return result
  }

    /**
     * Splits a suffix that has multiple values of one or more grammatical features into an array of Suffix objects
     * with each Suffix object having only a single value of those grammatical features. Initial multiple values
     * are stored in a featureGroups[featureType] property as an array of values.
     * @param {string} featureType - A type of a feature
     * @param {Feature[]} featureValues - Multiple grammatical feature values.
     * @returns {Suffix[]} - An array of suffixes.
     */
  split (featureType, featureValues) {
    let copy = this.clone()
    let values = []
    featureValues.forEach(element => values.push(element.value))
    copy.features[featureType] = featureValues[0].value
    copy.featureGroups[featureType] = values
    let suffixItems = [copy]
    for (let i = 1; i < featureValues.length; i++) {
      copy = this.clone()
      copy.features[featureType] = featureValues[i].value
      copy.featureGroups[featureType] = values
      suffixItems.push(copy)
    }
    return suffixItems
  };

    /**
     * Combines suffixes that are in the same group together. Suffixes to be combined must have their values listed
     * in an array stored as featureGroups[featureType] property.
     * @param {Suffix[]} suffixes - An array of suffixes to be combined.
     * @param {function} mergeFunction - A function that will merge two suffixes. By default it uses Suffix.merge,
     * but provides a way to supply a presentation specific functions. Please see Suffix.merge for more
     * information on function format.
     * @returns {Suffix[]} An array of suffixes with some items possibly combined together.
     */
  static combine (suffixes, mergeFunction = Suffix.merge) {
    let matchFound = false
    let matchIdx

    do {
      matchFound = false

            /*
            Go through an array of suffixes end compare each suffix with each other (two-way compare) one time. \
            If items are in the same group, merge two suffixes, break out of a loop,
            and remove one matching suffix (the second one) from an array.
            Then repeat on a modified array until no further matches found.
             */
      for (let i = 0; i < suffixes.length; i++) {
        if (matchFound) {
          continue
        }
        for (let j = i + 1; j < suffixes.length; j++) {
          if (suffixes[i].isInSameGroupWith(suffixes[j])) {
            matchIdx = j
            matchFound = true
            mergeFunction(suffixes[i], suffixes[j])
          }
        }
      }

      if (matchFound) {
        suffixes.splice(matchIdx, 1)
      }
    }
    while (matchFound)
    return suffixes
  }

    /**
     * This function provide a logic of to merge data of two suffix object that were previously split together.
     * @param {Suffix} suffixA - A first of two suffixes to merge (to be returned).
     * @param {Suffix} suffixB - A second ending to merge (to be discarded).
     * @returns {Suffix} A modified value of ending A.
     */
  static merge (suffixA, suffixB) {
    let commonGroups = Suffix.getCommonGroups([suffixA, suffixB])
    for (let type of commonGroups) {
            // Combine values using a comma separator. Can do anything else if we need to.
      suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type]
    }
    return suffixA
  };
}

class Footnote {
  constructor (index, text, partOfSpeech) {
    this.index = index
    this.text = text
    this[Models.Feature.types.part] = partOfSpeech
  }

  static readObject (jsonObject) {
    this.index = jsonObject.index
    this.text = jsonObject.text
    this[Models.Feature.types.part] = jsonObject[Models.Feature.types.part]
    return new Footnote(jsonObject.index, jsonObject.text, jsonObject[Models.Feature.types.part])
  }
}

/**
 * Detailed information about a match type.
 */
class MatchData {
  constructor () {
    this.suffixMatch = false // Whether two suffixes are the same.
    this.fullMatch = false // Whether two suffixes and all grammatical features, including part of speech, are the same.
    this.matchedFeatures = [] // How many features matches each other.
  }

  static readObject (jsonObject) {
    let matchData = new MatchData()
    matchData.suffixMatch = jsonObject.suffixMatch
    matchData.fullMatch = jsonObject.fullMatch
    for (let feature of jsonObject.matchedFeatures) {
      matchData.matchedFeatures.push(feature)
    }
    return matchData
  }
}

class ExtendedLanguageData {
  constructor () {
    this._type = undefined // This is a base class
  }

  static types () {
    return {
      EXTENDED_GREEK_DATA: 'ExtendedGreekData'
    }
  }

  static readObject (jsonObject) {
    if (!jsonObject._type) {
      throw new Error('Extended language data has no type information. Unable to deserialize.')
    } else if (jsonObject._type === ExtendedLanguageData.types().EXTENDED_GREEK_DATA) {
      return ExtendedGreekData.readObject(jsonObject)
    } else {
      throw new Error(`Unsupported extended language data of type "${jsonObject._type}".`)
    }
  }
}

class ExtendedGreekData extends ExtendedLanguageData {
  constructor () {
    super()
    this._type = ExtendedLanguageData.types().EXTENDED_GREEK_DATA // For deserialization
    this.primary = false
  }

  static readObject (jsonObject) {
    let data = new ExtendedGreekData()
    data.primary = jsonObject.primary
    return data
  }

  merge (extendedGreekData) {
    if (this.primary !== extendedGreekData.primary) {
      console.log('Mismatch', this.primary, extendedGreekData.primary)
    }
    let merged = new ExtendedGreekData()
    merged.primary = this.primary
    return merged
  }
}

class SelectedWord {
  constructor (language, word) {
    this.language = language
    this.word = word
  }

  static readObjects (jsonObject) {
    return new SelectedWord(jsonObject.language, jsonObject.word)
  }
}

/**
 * A return value for inflection queries
 */
class LexicalData {
  constructor (homonym) {
    this.homonym = homonym
    this[Models.Feature.types.part] = [] // What parts of speech are represented by this object.
  }

  static readObject (jsonObject) {
    let homonym = Models.Homonym.readObject(jsonObject.homonym)

    let lexicalData = new LexicalData(homonym)
    lexicalData[Models.Feature.types.part] = jsonObject[Models.Feature.types.part]

    for (let part of lexicalData[Models.Feature.types.part]) {
      let partData = jsonObject[part]
      lexicalData[part] = {}

      if (partData.suffixes) {
        lexicalData[part].suffixes = []
        for (let suffix of partData.suffixes) {
          lexicalData[part].suffixes.push(Suffix.readObject(suffix))
        }
      }

      if (partData.footnotes) {
        lexicalData[part].footnotes = []
        for (let footnote of partData.footnotes) {
          lexicalData[part].footnotes.push(Footnote.readObject(footnote))
        }
      }
    }

    return lexicalData
  }

  get word () {
    return this.homonym.targetWord
  }

  set word (word) {
    this.homonym.targetWord = word
  }

  get language () {
    return this.homonym.language
  }
}

/**
 * Load text data form an external fil with an asynchronous XHR request.
 * @param {string} filePath - A path to a file we need to load.
 * @returns {Promise} - A promise that will be resolved with either
 * file content (a string) in case of success of with a status message
 * in case of failure.
 */
let loadData = function loadData (filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new window.XMLHttpRequest()
    xhr.open('GET', filePath)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}

export {languages, LanguageDataset, LanguageData, Suffix, Footnote, MatchData, ExtendedLanguageData, ExtendedGreekData, LexicalData, loadData, SelectedWord}
