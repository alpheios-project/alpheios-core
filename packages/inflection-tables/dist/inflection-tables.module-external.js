import { Constants, Feature, FeatureType, LatinLanguageModel } from 'alpheios-data-models';

/**
 * Detailed information about a match type.
 */
class MatchData {
  constructor () {
    this.suffixMatch = false; // Whether two suffixes are the same.
    this.fullMatch = false; // Whether two suffixes and all grammatical features, including part of speech, are the same.
    this.matchedFeatures = []; // How many features matches each other.
  }

  static readObject (jsonObject) {
    let matchData = new MatchData();
    matchData.suffixMatch = jsonObject.suffixMatch;
    matchData.fullMatch = jsonObject.fullMatch;
    for (let feature of jsonObject.matchedFeatures) {
      matchData.matchedFeatures.push(feature);
    }
    return matchData
  }
}

class ExtendedLanguageData {
  constructor () {
    this._type = undefined; // This is a base class
  }

  static types () {
    return {
      EXTENDED_GREEK_DATA: 'ExtendedGreekData'
    }
  }

  /* static readObject (jsonObject) {
    if (!jsonObject._type) {
      throw new Error('Extended language data has no type information. Unable to deserialize.')
    } else if (jsonObject._type === ExtendedLanguageData.types().EXTENDED_GREEK_DATA) {
      return ExtendedGreekData.readObject(jsonObject)
    } else {
      throw new Error(`Unsupported extended language data of type "${jsonObject._type}".`)
    }
  } */
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
    this.value = suffixValue;
    this.features = {};
    this.featureGroups = {};

    /*
    Extended language data stores additional suffix information that is specific for a particular language.
    It uses the following schema:
    {string} language(key): {object} extended language data. This object is specific for each language
    and is defined in a language model.
     */
    this.extendedLangData = {};
    this.match = undefined;
  }

  static readObject (jsonObject) {
    let suffix = new Suffix(jsonObject.value);

    if (jsonObject.features) {
      for (let key in jsonObject.features) {
        if (jsonObject.features.hasOwnProperty(key)) {
          suffix.features[key] = jsonObject.features[key];
        }
      }
    }

    if (jsonObject.featureGroups) {
      for (let key in jsonObject.featureGroups) {
        if (jsonObject.featureGroups.hasOwnProperty(key)) {
          suffix.featureGroups[key] = [];
          for (let value of jsonObject.featureGroups[key]) {
            suffix.featureGroups[key].push(value);
          }
        }
      }
    }

    if (jsonObject[Feature.types.footnote]) {
      suffix[Feature.types.footnote] = [];
      for (let footnote of jsonObject[Feature.types.footnote]) {
        suffix[Feature.types.footnote].push(footnote);
      }
    }

    if (jsonObject.match) {
      suffix.match = MatchData.readObject(jsonObject.match);
    }

    for (const lang in jsonObject.extendedLangData) {
      if (jsonObject.extendedLangData.hasOwnProperty(lang)) {
        suffix.extendedLangData[lang] = ExtendedLanguageData.readObject(jsonObject.extendedLangData[lang]);
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
    let clone = new Suffix(this.value);
    for (const key in this.features) {
      if (this.features.hasOwnProperty(key)) {
        clone.features[key] = this.features[key];
      }
    }
    for (const key in this.featureGroups) {
      if (this.featureGroups.hasOwnProperty(key)) {
        clone.featureGroups[key] = this.featureGroups[key];
      }
    }

    if (this.hasOwnProperty(Feature.types.footnote)) {
      clone[Feature.types.footnote] = this[Feature.types.footnote];
    }

    for (const lang in this.extendedLangData) {
      if (this.extendedLangData.hasOwnProperty(lang)) {
        clone.extendedLangData[lang] = this.extendedLangData[lang];
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
    let features = Object.keys(suffixes[0].featureGroups);

    let commonGroups = features.filter(feature => {
      let result = true;
      for (let i = 1; i < suffixes.length; i++) {
        result = result && suffixes[i].features.hasOwnProperty(feature);
      }
      return result
    });
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
    let commonGroups = Suffix.getCommonGroups([this, suffix]);
    if (commonGroups.length < 1) {
      // If elements do not have common groups in Suffix.featureGroups then they are not in the same group
      return false
    }

    let commonValues = {};
    commonGroups.forEach((feature) => { commonValues[feature] = new Set([this.features[feature]]); });

    let result = true;
    result = result && this.value === suffix.value;
    // If suffixes does not match don't check any further
    if (!result) {
      return false
    }

    // Check all features to be a match, except those that are possible group values
    for (let feature of Object.keys(this.features)) {
      if (commonGroups.indexOf(feature) >= 0) {
        commonValues[feature].add(suffix.features[feature]);

        // Do not compare common groups
        continue
      }
      result = result && this.features[feature] === suffix.features[feature];
      // If feature mismatch discovered, do not check any further
      if (!result) {
        return false
      }
    }

    commonGroups.forEach(feature => {
      result = result && commonValues[feature].size === 2;
    });

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
    let copy = this.clone();
    let values = [];
    featureValues.forEach(element => values.push(element.value));
    copy.features[featureType] = featureValues[0].value;
    copy.featureGroups[featureType] = values;
    let suffixItems = [copy];
    for (let i = 1; i < featureValues.length; i++) {
      copy = this.clone();
      copy.features[featureType] = featureValues[i].value;
      copy.featureGroups[featureType] = values;
      suffixItems.push(copy);
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
    let matchFound = false;
    let matchIdx;

    do {
      matchFound = false;

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
            matchIdx = j;
            matchFound = true;
            mergeFunction(suffixes[i], suffixes[j]);
          }
        }
      }

      if (matchFound) {
        suffixes.splice(matchIdx, 1);
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
    let commonGroups = Suffix.getCommonGroups([suffixA, suffixB]);
    for (let type of commonGroups) {
      // Combine values using a comma separator. Can do anything else if we need to.
      suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
    }
    return suffixA
  };
}

class Footnote {
  constructor (index, text, partOfSpeech) {
    this.index = index;
    this.text = text;
    this[Feature.types.part] = partOfSpeech;
  }

  static readObject (jsonObject) {
    this.index = jsonObject.index;
    this.text = jsonObject.text;
    this[Feature.types.part] = jsonObject[Feature.types.part];
    return new Footnote(jsonObject.index, jsonObject.text, jsonObject[Feature.types.part])
  }
}

/**
 * A return value for inflection queries
 */
class InflectionData {
  constructor (language) {
    // this.homonym = homonym
    this.language = language;
    this[Feature.types.part] = []; // What parts of speech are represented by this object.
  }

  static readObject (jsonObject) {
    // let homonym = Models.Homonym.readObject(jsonObject.homonym)

    let lexicalData = new InflectionData();
    lexicalData[Feature.types.part] = jsonObject[Feature.types.part];

    for (let part of lexicalData[Feature.types.part]) {
      let partData = jsonObject[part];
      lexicalData[part] = {};

      if (partData.suffixes) {
        lexicalData[part].suffixes = [];
        for (let suffix of partData.suffixes) {
          lexicalData[part].suffixes.push(Suffix.readObject(suffix));
        }
      }

      if (partData.footnotes) {
        lexicalData[part].footnotes = [];
        for (let footnote of partData.footnotes) {
          lexicalData[part].footnotes.push(Footnote.readObject(footnote));
        }
      }
    }

    return lexicalData
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
    this.supportedLanguages = [];

    if (languageData) {
      for (let dataset of languageData) {
        this[dataset.language] = dataset;
        this.supportedLanguages.push(dataset.language);
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
        this[language].loadData();
      } catch (e) {
        console.log(e);
      }
    }
    return this
  }

  /**
   * Finds matching suffixes for a homonym.
   * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
   * @return {InflectionData} A return value of an inflection query.
   */
  getSuffixes (homonym) {
    let language = homonym.language;
    if (this.supportedLanguages.includes(language)) {
      return this[homonym.language].getSuffixes(homonym)
    } else {
      // throw new Error(`"${language}" language data is missing. Unable to get suffix data.`)
      return new InflectionData(homonym)
    }
  }
}

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
};

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
    this.language = language;
    this.suffixes = []; // An array of suffixes.
    this.footnotes = []; // Footnotes
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
    let suffixItem = new Suffix(suffixValue);
    suffixItem.extendedLangData = extendedLangData;

    // Build all possible combinations of features
    let multiValueFeatures = [];

    // Go through all features provided
    for (let feature of featureValue) {
      // If this is a footnote. Footnotes should go in a flat array
      // because we don't need to split by them
      if (feature.type === Feature.types.footnote) {
        suffixItem[Feature.types.footnote] = suffixItem[Feature.types.footnote] || [];
        suffixItem[Feature.types.footnote].push(feature.value);
        continue
      }

      // If this ending has several grammatical feature values then they will be in an array
      if (Array.isArray(feature)) {
        if (feature.length > 0) {
          if (feature[0]) {
            let type = feature[0].type;
            // Store all multi-value features to create a separate copy of a a Suffix object for each of them
            multiValueFeatures.push({type: type, features: feature});
          } else {
            console.log(feature);
          }
        } else {
          // Array is empty
          throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
        }
      } else {
        suffixItem.features[feature.type] = feature.value;
      }
    }

    // Create a copy of an Suffix object for each multi-value item
    if (multiValueFeatures.length > 0) {
      for (let featureGroup of multiValueFeatures) {
        let endingItems = suffixItem.split(featureGroup.type, featureGroup.features);
        this.suffixes = this.suffixes.concat(endingItems);
      }
    } else {
      this.suffixes.push(suffixItem);
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

    let footnote = new Footnote(index, text, partOfSpeech.value);
    footnote.index = index;

    this.footnotes.push(footnote);
  };

  getSuffixes (homonym) {
    // Add support for languages
    let result = new InflectionData(homonym.language);
    let inflections = {};

    // Find partial matches first, and then full among them

    // TODO: do we ever need lemmas?
    for (let lexema of homonym.lexemes) {
      for (let inflection of lexema.inflections) {
        // Group inflections by a part of speech
        let partOfSpeech = inflection[Feature.types.part];
        if (!partOfSpeech) {
          throw new Error('Part of speech data is missing in an inflection.')
        }

        if (!inflections.hasOwnProperty(partOfSpeech)) {
          inflections[partOfSpeech] = [];
        }
        inflections[partOfSpeech].push(inflection);
      }
    }

    // Scan for matches for all parts of speech separately
    for (const partOfSpeech in inflections) {
      if (inflections.hasOwnProperty(partOfSpeech)) {
        let inflectionsGroup = inflections[partOfSpeech];

        result[Feature.types.part].push(partOfSpeech);
        result[partOfSpeech] = {};
        result[partOfSpeech].suffixes = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup), []);
        result[partOfSpeech].footnotes = [];

        // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set();
        // Scan all selected suffixes to build a unique set of footnote indexes
        for (let suffix of result[partOfSpeech].suffixes) {
          if (suffix.hasOwnProperty(Feature.types.footnote)) {
            // Footnote indexes are stored in an array
            for (let index of suffix[Feature.types.footnote]) {
              footnotesIndex.add(index);
            }
          }
        }
        // Add footnote indexes and their texts to a result
        for (let index of footnotesIndex) {
          let footnote = this.footnotes.find(footnoteElement =>
            footnoteElement.index === index && footnoteElement[Feature.types.part] === partOfSpeech
          );
          result[partOfSpeech].footnotes.push({index: index, text: footnote.text});
        }
        // Sort footnotes according to their index numbers
        result[partOfSpeech].footnotes.sort((a, b) => parseInt(a.index) - parseInt(b.index));
      }
    }

    return result
  }

  reducer (inflections, accumulator, suffix) {
    let result = this.matcher(inflections, suffix);
    if (result) {
      accumulator.push(result);
    }
    return accumulator
  }
}

var nounSuffixesCSV = "Ending,Number,Case,Declension,Gender,Type,Footnote\r\na,singular,nominative,1st,feminine,regular,\r\nē,singular,nominative,1st,feminine,irregular,\r\nēs,singular,nominative,1st,feminine,irregular,\r\nā,singular,nominative,1st,feminine,irregular,7\r\nus,singular,nominative,2nd,masculine feminine,regular,\r\ner,singular,nominative,2nd,masculine feminine,regular,\r\nir,singular,nominative,2nd,masculine feminine,regular,\r\n-,singular,nominative,2nd,masculine feminine,irregular,\r\nos,singular,nominative,2nd,masculine feminine,irregular,1\r\nōs,singular,nominative,2nd,masculine feminine,irregular,\r\nō,singular,nominative,2nd,masculine feminine,irregular,7\r\num,singular,nominative,2nd,neuter,regular,\r\nus,singular,nominative,2nd,neuter,irregular,10\r\non,singular,nominative,2nd,neuter,irregular,7\r\n-,singular,nominative,3rd,masculine feminine,regular,\r\nos,singular,nominative,3rd,masculine feminine,irregular,\r\nōn,singular,nominative,3rd,masculine feminine,irregular,7\r\n-,singular,nominative,3rd,neuter,regular,\r\nus,singular,nominative,4th,masculine feminine,regular,\r\nū,singular,nominative,4th,neuter,regular,\r\nēs,singular,nominative,5th,feminine,regular,\r\nae,singular,genitive,1st,feminine,regular,\r\nāī,singular,genitive,1st,feminine,irregular,1\r\nās,singular,genitive,1st,feminine,irregular,2\r\nēs,singular,genitive,1st,feminine,irregular,7\r\nī,singular,genitive,2nd,masculine feminine,regular,\r\nō,singular,genitive,2nd,masculine feminine,irregular,7\r\nī,singular,genitive,2nd,neuter,regular,\r\nis,singular,genitive,3rd,masculine feminine,regular,\r\nis,singular,genitive,3rd,neuter,regular,\r\nūs,singular,genitive,4th,masculine feminine,regular,\r\nuis,singular,genitive,4th,masculine feminine,irregular,1\r\nuos,singular,genitive,4th,masculine feminine,irregular,1\r\nī,singular,genitive,4th,masculine feminine,irregular,15\r\nūs,singular,genitive,4th,neuter,regular,\r\nēī,singular,genitive,5th,feminine,regular,\r\neī,singular,genitive,5th,feminine,regular,\r\nī,singular,genitive,5th,feminine,irregular,\r\nē,singular,genitive,5th,feminine,irregular,\r\nēs,singular,genitive,5th,feminine,irregular,6\r\nae,singular,dative,1st,feminine,regular,\r\nāī,singular,dative,1st,feminine,irregular,1\r\nō,singular,dative,2nd,masculine feminine,regular,\r\nō,singular,dative,2nd,neuter,regular,\r\nī,singular,dative,3rd,masculine feminine,regular,\r\ne,singular,dative,3rd,masculine feminine,irregular,17\r\nī,singular,dative,3rd,neuter,regular,\r\nūī,singular,dative,4th,masculine feminine,regular,\r\nū,singular,dative,4th,masculine feminine,regular,\r\nū,singular,dative,4th,neuter,regular,\r\nēī,singular,dative,5th,feminine,regular,\r\neī,singular,dative,5th,feminine,regular,\r\nī,singular,dative,5th,feminine,irregular,\r\nē,singular,dative,5th,feminine,irregular,6\r\nam,singular,accusative,1st,feminine,regular,\r\nēn,singular,accusative,1st,feminine,irregular,\r\nān,singular,accusative,1st,feminine,irregular,7\r\num,singular,accusative,2nd,masculine feminine,regular,\r\nom,singular,accusative,2nd,masculine feminine,irregular,1\r\nōn,singular,accusative,2nd,masculine feminine,irregular,7\r\num,singular,accusative,2nd,neuter,regular,\r\nus,singular,accusative,2nd,neuter,irregular,10\r\non,singular,accusative,2nd,neuter,irregular,7\r\nem,singular,accusative,3rd,masculine feminine,regular,\r\nim,singular,accusative,3rd,masculine feminine,irregular,11\r\na,singular,accusative,3rd,masculine feminine,irregular,7\r\n-,singular,accusative,3rd,neuter,regular,\r\num,singular,accusative,4th,masculine feminine,regular,\r\nū,singular,accusative,4th,neuter,regular,\r\nem,singular,accusative,5th,feminine,regular,\r\nā,singular,ablative,1st,feminine,regular,\r\nād,singular,ablative,1st,feminine,irregular,5\r\nē,singular,ablative,1st,feminine,irregular,7\r\nō,singular,ablative,2nd,masculine feminine,regular,\r\nōd,singular,ablative,2nd,masculine feminine,irregular,1\r\nō,singular,ablative,2nd,neuter,regular,\r\ne,singular,ablative,3rd,masculine feminine,regular,\r\nī,singular,ablative,3rd,masculine feminine,irregular,11\r\ne,singular,ablative,3rd,neuter,regular,\r\nī,singular,ablative,3rd,neuter,irregular,11\r\nū,singular,ablative,4th,masculine feminine,regular,\r\nūd,singular,ablative,4th,masculine feminine,irregular,1\r\nū,singular,ablative,4th,neuter,regular,\r\nē,singular,ablative,5th,feminine,regular,\r\nae,singular,locative,1st,feminine,regular,\r\nō,singular,locative,2nd,masculine feminine,regular,\r\nō,singular,locative,2nd,neuter,regular,\r\ne,singular,locative,3rd,masculine feminine,regular,\r\nī,singular,locative,3rd,masculine feminine,regular,\r\nī,singular,locative,3rd,neuter,regular,\r\nū,singular,locative,4th,masculine feminine,regular,\r\nū,singular,locative,4th,neuter,regular,\r\nē,singular,locative,5th,feminine,regular,\r\na,singular,vocative,1st,feminine,regular,\r\nē,singular,vocative,1st,feminine,irregular,\r\nā,singular,vocative,1st,feminine,irregular,7\r\ne,singular,vocative,2nd,masculine feminine,regular,\r\ner,singular,vocative,2nd,masculine feminine,regular,\r\nir,singular,vocative,2nd,masculine feminine,regular,\r\n-,singular,vocative,2nd,masculine feminine,irregular,\r\nī,singular,vocative,2nd,masculine feminine,irregular,8\r\nōs,singular,vocative,2nd,masculine feminine,irregular,\r\ne,singular,vocative,2nd,masculine feminine,irregular,7\r\num,singular,vocative,2nd,neuter,regular,\r\non,singular,vocative,2nd,neuter,irregular,7\r\n-,singular,vocative,3rd,masculine feminine,regular,\r\n-,singular,vocative,3rd,neuter,regular,\r\nus,singular,vocative,4th,masculine feminine,regular,\r\nū,singular,vocative,4th,neuter,regular,\r\nēs,singular,vocative,5th,feminine,regular,\r\nae,plural,nominative,1st,feminine,regular,\r\nī,plural,nominative,2nd,masculine feminine,regular,\r\noe,plural,nominative,2nd,masculine feminine,irregular,7 9\r\na,plural,nominative,2nd,neuter,regular,\r\nēs,plural,nominative,3rd,masculine feminine,regular,\r\nes,plural,nominative,3rd,masculine feminine,irregular,7\r\na,plural,nominative,3rd,neuter,regular,\r\nia,plural,nominative,3rd,neuter,irregular,11\r\nūs,plural,nominative,4th,masculine feminine,regular,\r\nua,plural,nominative,4th,neuter,regular,\r\nēs,plural,nominative,5th,feminine,regular,\r\nārum,plural,genitive,1st,feminine,regular,\r\num,plural,genitive,1st,feminine,irregular,3\r\nōrum,plural,genitive,2nd,masculine feminine,regular,\r\num,plural,genitive,2nd,masculine feminine,irregular,\r\nom,plural,genitive,2nd,masculine feminine,irregular,8\r\nōrum,plural,genitive,2nd,neuter,regular,\r\num,plural,genitive,2nd,neuter,irregular,\r\num,plural,genitive,3rd,masculine feminine,regular,\r\nium,plural,genitive,3rd,masculine feminine,irregular,11\r\nōn,plural,genitive,3rd,masculine feminine,irregular,7\r\num,plural,genitive,3rd,neuter,regular,\r\nium,plural,genitive,3rd,neuter,irregular,11\r\nuum,plural,genitive,4th,masculine feminine,regular,\r\num,plural,genitive,4th,masculine feminine,irregular,16\r\nuom,plural,genitive,4th,masculine feminine,irregular,1\r\nuum,plural,genitive,4th,neuter,regular,\r\nērum,plural,genitive,5th,feminine,regular,\r\nīs,plural,dative,1st,feminine,regular,\r\nābus,plural,dative,1st,feminine,irregular,4\r\neis,plural,dative,1st,feminine,irregular,6\r\nīs,plural,dative,2nd,masculine feminine,regular,\r\nīs,plural,dative,2nd,neuter,regular,\r\nibus,plural,dative,3rd,masculine feminine,regular,\r\nibus,plural,dative,3rd,neuter,regular,\r\nibus,plural,dative,4th,masculine feminine,regular,\r\nubus,plural,dative,4th,masculine feminine,irregular,14\r\nibus,plural,dative,4th,neuter,regular,\r\nēbus,plural,dative,5th,feminine,regular,\r\nās,plural,accusative,1st,feminine,regular,\r\nōs,plural,accusative,2nd,masculine feminine,regular,\r\na,plural,accusative,2nd,neuter,regular,\r\nēs,plural,accusative,3rd,masculine feminine,regular,\r\nīs,plural,accusative,3rd,masculine feminine,irregular,11\r\nas,plural,accusative,3rd,masculine feminine,irregular,7\r\na,plural,accusative,3rd,neuter,regular,\r\nia,plural,accusative,3rd,neuter,irregular,11\r\nūs,plural,accusative,4th,masculine feminine,regular,\r\nua,plural,accusative,4th,neuter,regular,\r\nēs,plural,accusative,5th,feminine,regular,\r\nīs,plural,ablative,1st,feminine,regular,\r\nābus,plural,ablative,1st,feminine,irregular,4\r\neis,plural,ablative,1st,feminine,irregular,6\r\nīs,plural,ablative,2nd,masculine feminine,regular,\r\nīs,plural,ablative,2nd,neuter,regular,\r\nibus,plural,ablative,3rd,masculine feminine,regular,\r\nibus,plural,ablative,3rd,neuter,regular,\r\nibus,plural,ablative,4th,masculine feminine,regular,\r\nubus,plural,ablative,4th,masculine feminine,irregular,14\r\nibus,plural,ablative,4th,neuter,regular,\r\nēbus,plural,ablative,5th,feminine,regular,\r\nīs,plural,locative,1st,feminine,regular,\r\nīs,plural,locative,2nd,masculine feminine,regular,\r\nīs,plural,locative,2nd,neuter,regular,\r\nibus,plural,locative,3rd,masculine feminine,regular,\r\nibus,plural,locative,3rd,neuter,regular,\r\nibus,plural,locative,4th,masculine feminine,regular,\r\nibus,plural,locative,4th,neuter,regular,\r\nēbus,plural,locative,5th,feminine,regular,\r\nae,plural,vocative,1st,feminine,regular,\r\nī,plural,vocative,2nd,masculine feminine,regular,\r\na,plural,vocative,2nd,neuter,regular,\r\nēs,plural,vocative,3rd,masculine feminine,regular,\r\na,plural,vocative,3rd,neuter,regular,\r\nia,plural,vocative,3rd,neuter,irregular,11\r\nūs,plural,vocative,4th,masculine feminine,regular,\r\nua,plural,vocative,4th,neuter,regular,\r\nēs,plural,vocative,5th,feminine,regular,";

var nounFootnotesCSV = "Index,Text\r\n1,archaic (final s and m of os and om may be omitted in inscriptions)\r\n2,only in familiās\r\n3,especially in Greek patronymics and compounds in -gena and -cola.\r\n4,always in deābus and filiābus; rarely with other words to distinguish the female\r\n5,archaic\r\n6,rare\r\n7,\"may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.\"\r\n8,proper names in ius and filius and genius\r\n9,poetic\r\n10,\"only pelagus, vīrus, and sometimes vulgus\"\r\n11,may occur with i-stems\r\n12,several nouns (most commonly domus) show forms of both second and fourth declensions\r\n13,\"some nouns also have forms from the first declension (eg materia, saevitia) or the third declension (eg requiēs, satiēs, plēbēs, famēs)\"\r\n14,\"Always in partus and tribus, usually in artus and lacus, sometimes in other words, eg portus and specus\"\r\n15,Often in names of plants and trees and in nouns ending in -tus\r\n16,When pronounced as one syllable\r\n17,early\r\n18,dies and meridies are masculine";

var adjectiveSuffixesCSV = "Ending,Number,Case,Declension,Gender,Type,Footnote\r\na,singular,nominative,1st 2nd,feminine,regular,\r\nus,singular,nominative,1st 2nd,masculine,regular,\r\num,singular,nominative,1st 2nd,neuter,regular,\r\nis,singular,nominative,3rd,feminine,regular,\r\n-,singular,nominative,3rd,feminine,irregular,6\r\n-,singular,nominative,3rd,masculine,regular,\r\nis,singular,nominative,3rd,masculine,irregular,5\r\ne,singular,nominative,3rd,neuter,regular,\r\n-,singular,nominative,3rd,neuter,irregular,6\r\nae,singular,genitive,1st 2nd,feminine,regular,\r\nīus,singular,genitive,1st 2nd,feminine,irregular,3\r\nī,singular,genitive,1st 2nd,masculine,regular,\r\nīus,singular,genitive,1st 2nd,masculine,irregular,3\r\nī,singular,genitive,1st 2nd,neuter,regular,\r\nīus,singular,genitive,1st 2nd,neuter,irregular,3\r\nis,singular,genitive,3rd,feminine,regular,\r\nis,singular,genitive,3rd,masculine,regular,\r\nis,singular,genitive,3rd,neuter,regular,\r\nae,singular,dative,1st 2nd,feminine,regular,\r\nī,singular,dative,1st 2nd,feminine,irregular,3\r\nō,singular,dative,1st 2nd,masculine,regular,\r\nī,singular,dative,1st 2nd,masculine,irregular,3\r\nō,singular,dative,1st 2nd,neuter,regular,\r\nī,singular,dative,1st 2nd,neuter,irregular,3\r\nī,singular,dative,3rd,feminine,regular,\r\nī,singular,dative,3rd,masculine,regular,\r\nī,singular,dative,3rd,neuter,regular,\r\nam,singular,accusative,1st 2nd,feminine,regular,\r\num,singular,accusative,1st 2nd,masculine,regular,\r\num,singular,accusative,1st 2nd,neuter,regular,\r\nem,singular,accusative,3rd,feminine,regular,\r\nem,singular,accusative,3rd,masculine,regular,\r\ne,singular,accusative,3rd,neuter,regular,\r\n-,singular,accusative,3rd,neuter,irregular,6\r\nā,singular,ablative,1st 2nd,feminine,regular,\r\nō,singular,ablative,1st 2nd,feminine,irregular,4\r\nō,singular,ablative,1st 2nd,masculine,regular,\r\nō,singular,ablative,1st 2nd,neuter,regular,\r\nī,singular,ablative,3rd,feminine,regular,\r\ne,singular,ablative,3rd,feminine,irregular,7\r\nī,singular,ablative,3rd,masculine,regular,\r\ne,singular,ablative,3rd,masculine,irregular,7\r\nī,singular,ablative,3rd,neuter,regular,\r\nae,singular,locative,1st 2nd,feminine,regular,\r\nī,singular,locative,1st 2nd,masculine,regular,\r\nī,singular,locative,1st 2nd,neuter,regular,\r\nī,singular,locative,3rd,feminine,regular,\r\ne,singular,locative,3rd,feminine,irregular,7\r\nī,singular,locative,3rd,masculine,regular,\r\nī,singular,locative,3rd,neuter,regular,\r\na,singular,vocative,1st 2nd,feminine,regular,\r\ne,singular,vocative,1st 2nd,masculine,regular,\r\nī,singular,vocative,1st 2nd,masculine,irregular,\r\num,singular,vocative,1st 2nd,neuter,regular,\r\nis,singular,vocative,3rd,feminine,regular,\r\n-,singular,vocative,3rd,masculine,regular,\r\ne,singular,vocative,3rd,neuter,regular,\r\n-,singular,vocative,3rd,neuter,irregular,6\r\nae,plural,nominative,1st 2nd,feminine,regular,\r\nī,plural,nominative,1st 2nd,masculine,regular,\r\na,plural,nominative,1st 2nd,neuter,regular,\r\nēs,plural,nominative,3rd,feminine,regular,\r\nēs,plural,nominative,3rd,masculine,regular,\r\nia,plural,nominative,3rd,neuter,regular,\r\nārum,plural,genitive,1st 2nd,feminine,regular,\r\nōrum,plural,genitive,1st 2nd,masculine,regular,\r\nōrum,plural,genitive,1st 2nd,neuter,regular,\r\nium,plural,genitive,3rd,feminine,regular,\r\num,plural,genitive,3rd,feminine,irregular,8\r\nium,plural,genitive,3rd,masculine,regular,\r\num,plural,genitive,3rd,masculine,irregular,8\r\nium,plural,genitive,3rd,neuter,regular,\r\num,plural,genitive,3rd,neuter,irregular,8\r\nīs,plural,dative,1st 2nd,feminine,regular,\r\nīs,plural,dative,1st 2nd,masculine,regular,\r\nīs,plural,dative,1st 2nd,neuter,regular,\r\nibus,plural,dative,3rd,feminine,regular,\r\nibus,plural,dative,3rd,masculine,regular,\r\nibus,plural,dative,3rd,neuter,regular,\r\nās,plural,accusative,1st 2nd,feminine,regular,\r\nōs,plural,accusative,1st 2nd,masculine,regular,\r\na,plural,accusative,1st 2nd,neuter,regular,\r\nīs,plural,accusative,3rd,feminine,regular,\r\nēs,plural,accusative,3rd,feminine,irregular,9\r\nīs,plural,accusative,3rd,masculine,regular,\r\nēs,plural,accusative,3rd,masculine,irregular,9\r\nia,plural,accusative,3rd,neuter,regular,\r\nīs,plural,ablative,1st 2nd,feminine,regular,\r\nīs,plural,ablative,1st 2nd,masculine,regular,\r\nīs,plural,ablative,1st 2nd,neuter,regular,\r\nibus,plural,ablative,3rd,feminine,regular,\r\nibus,plural,ablative,3rd,masculine,regular,\r\nibus,plural,ablative,3rd,neuter,regular,\r\nīs,plural,locative,1st 2nd,feminine,regular,\r\nīs,plural,locative,1st 2nd,masculine,regular,\r\nīs,plural,locative,1st 2nd,neuter,regular,\r\nibus,plural,locative,3rd,feminine,regular,\r\nibus,plural,locative,3rd,masculine,regular,\r\nibus,plural,locative,3rd,neuter,regular,\r\nae,plural,vocative,1st 2nd,feminine,regular,\r\nī,plural,vocative,1st 2nd,masculine,regular,\r\na,plural,vocative,1st 2nd,neuter,regular,\r\nēs,plural,vocative,3rd,feminine,regular,\r\nēs,plural,vocative,3rd,masculine,regular,\r\nia,plural,vocative,3rd,neuter,regular,";

var adjectiveFootnotesCSV = "Index,Text\r\n1,\"Adjectives agree with the noun they modify in gender, number and case.\"\r\n2,Adjectives are inflected according to either\r\n3,\"Only nullus, sōlus, alius (alia, aliud), tōtus, ūllus, ūnus, alter, neuter (neutra,\r\n            neutrum) and uter (utra, utrum).\"\r\n4,In a few adjectives of Greek origin.\r\n5,\"The \"\"two-ending\"\" adjectives use \"\"-is\"\", for both masculine and feminine nominative\r\n            singular.\"\r\n6,\"The \"\"one-ending\"\" adjectives use the same consonant ending for all three genders in the\r\n            nominative singular and the neuter accusative and vocative singular.\"\r\n7,\"An ablative singular in \"\"e\"\" is common in one-ending adjectives, but is usually confined to\r\n            poetry in three and two-ending adjectives.\"\r\n8,\"In comparatives, poetry and some one-ending adjectives.\"\r\n9,Chiefly in comparatives.";

var verbSuffixesCSV = "Ending,Conjugation,Voice,Mood,Tense,Number,Person,Type,Footnote\r\nō,1st,active,indicative,present,singular,1st,regular,\r\nās,1st,active,indicative,present,singular,2nd,regular,\r\nat,1st,active,indicative,present,singular,3rd,regular,\r\nāmus,1st,active,indicative,present,plural,1st,regular,\r\nātis,1st,active,indicative,present,plural,2nd,regular,\r\nant,1st,active,indicative,present,plural,3rd,regular,\r\nem,1st,active,subjunctive,present,singular,1st,regular,\r\nēs,1st,active,subjunctive,present,singular,2nd,regular,\r\net,1st,active,subjunctive,present,singular,3rd,regular,\r\nēmus,1st,active,subjunctive,present,plural,1st,regular,\r\nētis,1st,active,subjunctive,present,plural,2nd,regular,\r\nent,1st,active,subjunctive,present,plural,3rd,regular,\r\neō,2nd,active,indicative,present,singular,1st,regular,\r\nēs,2nd,active,indicative,present,singular,2nd,regular,\r\nēt,2nd,active,indicative,present,singular,3rd,regular,\r\nēmus,2nd,active,indicative,present,plural,1st,regular,\r\nētis,2nd,active,indicative,present,plural,2nd,regular,\r\nent,2nd,active,indicative,present,plural,3rd,regular,\r\neam,2nd,active,subjunctive,present,singular,1st,regular,\r\neās,2nd,active,subjunctive,present,singular,2nd,regular,\r\neat,2nd,active,subjunctive,present,singular,3rd,regular,\r\neāmus,2nd,active,subjunctive,present,plural,1st,regular,\r\neātis,2nd,active,subjunctive,present,plural,2nd,regular,\r\neant,2nd,active,subjunctive,present,plural,3rd,regular,\r\nō,3rd,active,indicative,present,singular,1st,regular,\r\nis,3rd,active,indicative,present,singular,2nd,regular,\r\nit,3rd,active,indicative,present,singular,3rd,regular,\r\nimus,3rd,active,indicative,present,plural,1st,regular,\r\nitis,3rd,active,indicative,present,plural,2nd,regular,\r\nunt,3rd,active,indicative,present,plural,3rd,regular,\r\nam,3rd,active,subjunctive,present,singular,1st,regular,\r\nās,3rd,active,subjunctive,present,singular,2nd,regular,\r\nat,3rd,active,subjunctive,present,singular,3rd,regular,\r\nāmus,3rd,active,subjunctive,present,plural,1st,regular,\r\nātis,3rd,active,subjunctive,present,plural,2nd,regular,\r\nant,3rd,active,subjunctive,present,plural,3rd,regular,\r\niō,4th,active,indicative,present,singular,1st,regular,\r\nīs,4th,active,indicative,present,singular,2nd,regular,\r\nit,4th,active,indicative,present,singular,3rd,regular,\r\nīmus,4th,active,indicative,present,plural,1st,regular,\r\nītis,4th,active,indicative,present,plural,2nd,regular,\r\niunt,4th,active,indicative,present,plural,3rd,regular,\r\niam,4th,active,subjunctive,present,singular,1st,regular,\r\niās,4th,active,subjunctive,present,singular,2nd,regular,\r\niat,4th,active,subjunctive,present,singular,3rd,regular,\r\niāmus,4th,active,subjunctive,present,plural,1st,regular,\r\niāatis,4th,active,subjunctive,present,plural,2nd,regular,\r\niant,4th,active,subjunctive,present,plural,3rd,regular,\r\nābam,1st,active,indicative,imperfect,singular,1st,regular,\r\nābas,1st,active,indicative,imperfect,singular,2nd,regular,\r\nābat,1st,active,indicative,imperfect,singular,3rd,regular,\r\nābāmus,1st,active,indicative,imperfect,plural,1st,regular,\r\nābātis,1st,active,indicative,imperfect,plural,2nd,regular,\r\nābant,1st,active,indicative,imperfect,plural,3rd,regular,\r\nārem,1st,active,subjunctive,imperfect,singular,1st,regular,\r\nārēs,1st,active,subjunctive,imperfect,singular,2nd,regular,\r\nāret,1st,active,subjunctive,imperfect,singular,3rd,regular,\r\nārēmus,1st,active,subjunctive,imperfect,plural,1st,regular,\r\nārētis,1st,active,subjunctive,imperfect,plural,2nd,regular,\r\nārent,1st,active,subjunctive,imperfect,plural,3rd,regular,\r\nēbam,2nd,active,indicative,imperfect,singular,1st,regular,\r\nēbās,2nd,active,indicative,imperfect,singular,2nd,regular,\r\nēbat,2nd,active,indicative,imperfect,singular,3rd,regular,\r\nēbāmus,2nd,active,indicative,imperfect,plural,1st,regular,\r\nēbātis,2nd,active,indicative,imperfect,plural,2nd,regular,\r\nēbant,2nd,active,indicative,imperfect,plural,3rd,regular,\r\nērem,2nd,active,subjunctive,imperfect,singular,1st,regular,\r\nērēs,2nd,active,subjunctive,imperfect,singular,2nd,regular,\r\nēret,2nd,active,subjunctive,imperfect,singular,3rd,regular,\r\nērēmus,2nd,active,subjunctive,imperfect,plural,1st,regular,\r\nērētis,2nd,active,subjunctive,imperfect,plural,2nd,regular,\r\nērēnt,2nd,active,subjunctive,imperfect,plural,3rd,regular,\r\nēbas,3rd,active,indicative,imperfect,singular,1st,regular,\r\nēbāt,3rd,active,indicative,imperfect,singular,2nd,regular,\r\nēbat,3rd,active,indicative,imperfect,singular,3rd,regular,\r\nēbāmus,3rd,active,indicative,imperfect,plural,1st,regular,\r\nēbātis,3rd,active,indicative,imperfect,plural,2nd,regular,\r\nēbant,3rd,active,indicative,imperfect,plural,3rd,regular,\r\nerem,3rd,active,subjunctive,imperfect,singular,1st,regular,\r\nerēs,3rd,active,subjunctive,imperfect,singular,2nd,regular,\r\neret,3rd,active,subjunctive,imperfect,singular,3rd,regular,\r\nerēmus,3rd,active,subjunctive,imperfect,plural,1st,regular,\r\nerētis,3rd,active,subjunctive,imperfect,plural,2nd,regular,\r\nerent,3rd,active,subjunctive,imperfect,plural,3rd,regular,\r\niēbam,4th,active,indicative,imperfect,singular,1st,regular,\r\nībam,4th,active,indicative,imperfect,singular,1st,irregular,2\r\niēbas,4th,active,indicative,imperfect,singular,2nd,regular,\r\nības,4th,active,indicative,imperfect,singular,2nd,irregular,\r\niēbat,4th,active,indicative,imperfect,singular,3rd,regular,\r\nībat,4th,active,indicative,imperfect,singular,3rd,irregular,\r\niēbāmus,4th,active,indicative,imperfect,plural,1st,regular,\r\nībāmus,4th,active,indicative,imperfect,plural,1st,irregular,\r\niēbātis,4th,active,indicative,imperfect,plural,2nd,regular,\r\nībātis,4th,active,indicative,imperfect,plural,2nd,irregular,\r\niēbant,4th,active,indicative,imperfect,plural,3rd,regular,\r\nībant,4th,active,indicative,imperfect,plural,3rd,irregular,\r\nīrem,4th,active,subjunctive,imperfect,singular,1st,regular,\r\nīrēs,4th,active,subjunctive,imperfect,singular,2nd,regular,\r\nīret,4th,active,subjunctive,imperfect,singular,3rd,regular,\r\nīrēmus,4th,active,subjunctive,imperfect,plural,1st,regular,\r\nīrētis,4th,active,subjunctive,imperfect,plural,2nd,regular,\r\nīrēnt,4th,active,subjunctive,imperfect,plural,3rd,regular,\r\nābo,1st,active,indicative,future,singular,1st,regular,\r\nābis,1st,active,indicative,future,singular,2nd,regular,\r\nābit,1st,active,indicative,future,singular,3rd,regular,\r\nābimus,1st,active,indicative,future,plural,1st,regular,\r\nābitis,1st,active,indicative,future,plural,2nd,regular,\r\nābunt,1st,active,indicative,future,plural,3rd,regular,\r\n,1st,active,subjunctive,future,singular,1st,,\r\n,1st,active,subjunctive,future,singular,2nd,,\r\n,1st,active,subjunctive,future,singular,3rd,,\r\n,1st,active,subjunctive,future,plural,1st,,\r\n,1st,active,subjunctive,future,plural,2nd,,\r\n,1st,active,subjunctive,future,plural,3rd,,\r\nēbō,2nd,active,indicative,future,singular,1st,regular,\r\nēbis,2nd,active,indicative,future,singular,2nd,regular,\r\nēbit,2nd,active,indicative,future,singular,3rd,regular,\r\nēbimus,2nd,active,indicative,future,plural,1st,regular,\r\nēbitis,2nd,active,indicative,future,plural,2nd,regular,\r\nēbunt,2nd,active,indicative,future,plural,3rd,regular,\r\n,2nd,active,subjunctive,future,singular,1st,regular,\r\n,2nd,active,subjunctive,future,singular,2nd,,\r\n,2nd,active,subjunctive,future,singular,3rd,,\r\n,2nd,active,subjunctive,future,plural,1st,,\r\n,2nd,active,subjunctive,future,plural,2nd,,\r\n,2nd,active,subjunctive,future,plural,3rd,,\r\nam,3rd,active,indicative,future,singular,1st,regular,\r\nēs,3rd,active,indicative,future,singular,2nd,regular,\r\net,3rd,active,indicative,future,singular,3rd,regular,\r\nēmus,3rd,active,indicative,future,plural,1st,regular,\r\nētis,3rd,active,indicative,future,plural,2nd,regular,\r\nent,3rd,active,indicative,future,plural,3rd,regular,\r\n,3rd,active,subjunctive,future,singular,1st,,\r\n,3rd,active,subjunctive,future,singular,2nd,,\r\n,3rd,active,subjunctive,future,singular,3rd,,\r\n,3rd,active,subjunctive,future,plural,1st,,\r\n,3rd,active,subjunctive,future,plural,2nd,,\r\n,3rd,active,subjunctive,future,plural,3rd,,\r\niam,4th,active,indicative,future,singular,1st,regular,\r\nībō,4th,active,indicative,future,singular,1st,irregular,2\r\niēs,4th,active,indicative,future,singular,2nd,regular,\r\nībis,4th,active,indicative,future,singular,2nd,irregular,\r\niet,4th,active,indicative,future,singular,3rd,regular,\r\nībit,4th,active,indicative,future,singular,3rd,irregular,\r\niēmus,4th,active,indicative,future,plural,1st,regular,\r\nībimus,4th,active,indicative,future,plural,1st,irregular,\r\niētis,4th,active,indicative,future,plural,2nd,regular,\r\nībitis,4th,active,indicative,future,plural,2nd,irregular,\r\nient,4th,active,indicative,future,plural,3rd,regular,\r\nībunt,4th,active,indicative,future,plural,3rd,irregular,\r\n,4th,active,subjunctive,future,singular,1st,,\r\n,4th,active,subjunctive,future,singular,2nd,,\r\n,4th,active,subjunctive,future,singular,3rd,,\r\n,4th,active,subjunctive,future,plural,1st,,\r\n,4th,active,subjunctive,future,plural,2nd,,\r\n,4th,active,subjunctive,future,plural,3rd,,\r\nāvī,1st,active,indicative,perfect,singular,1st,regular,\r\nāvistī,1st,active,indicative,perfect,singular,2nd,regular,\r\nāvit,1st,active,indicative,perfect,singular,3rd,regular,\r\nāvimus,1st,active,indicative,perfect,plural,1st,regular,\r\nāvistis,1st,active,indicative,perfect,plural,2nd,regular,\r\nāvērunt,1st,active,indicative,perfect,plural,3rd,regular,\r\nāvēre,1st,active,indicative,perfect,plural,3rd,irregular,6\r\nāverim,1st,active,subjunctive,perfect,singular,1st,regular,\r\nāveris,1st,active,subjunctive,perfect,singular,2nd,regular,\r\nāverit,1st,active,subjunctive,perfect,singular,3rd,regular,\r\nāverimus,1st,active,subjunctive,perfect,plural,1st,regular,\r\nāveritis,1st,active,subjunctive,perfect,plural,2nd,regular,\r\nāverint,1st,active,subjunctive,perfect,plural,3rd,regular,\r\nvī,2nd,active,indicative,perfect,singular,1st,regular,\r\nvistī,2nd,active,indicative,perfect,singular,2nd,regular,\r\nvit,2nd,active,indicative,perfect,singular,3rd,regular,\r\nvimus,2nd,active,indicative,perfect,plural,1st,regular,\r\nvistis,2nd,active,indicative,perfect,plural,2nd,regular,\r\nvērunt,2nd,active,indicative,perfect,plural,3rd,regular,\r\nvēre,2nd,active,indicative,perfect,plural,3rd,irregular,6\r\nverim,2nd,active,subjunctive,perfect,singular,1st,regular,\r\nveris,2nd,active,subjunctive,perfect,singular,2nd,regular,\r\nverit,2nd,active,subjunctive,perfect,singular,3rd,regular,\r\nverimus,2nd,active,subjunctive,perfect,plural,1st,regular,\r\nveritis,2nd,active,subjunctive,perfect,plural,2nd,regular,\r\nverint,2nd,active,subjunctive,perfect,plural,3rd,regular,\r\nī,3rd,active,indicative,perfect,singular,1st,regular,\r\nistī,3rd,active,indicative,perfect,singular,2nd,regular,\r\nit,3rd,active,indicative,perfect,singular,3rd,regular,\r\nimus,3rd,active,indicative,perfect,plural,1st,regular,\r\nistis,3rd,active,indicative,perfect,plural,2nd,regular,\r\nērunt,3rd,active,indicative,perfect,plural,3rd,regular,\r\nēre,3rd,active,indicative,perfect,plural,3rd,irregular,6\r\nerim,3rd,active,subjunctive,perfect,singular,1st,regular,\r\neris,3rd,active,subjunctive,perfect,singular,2nd,regular,\r\nerit,3rd,active,subjunctive,perfect,singular,3rd,regular,\r\nerimus,3rd,active,subjunctive,perfect,plural,1st,regular,\r\neritis,3rd,active,subjunctive,perfect,plural,2nd,regular,\r\nerint,3rd,active,subjunctive,perfect,plural,3rd,regular,\r\nīvi,4th,active,indicative,perfect,singular,1st,regular,\r\nīvistī,4th,active,indicative,perfect,singular,2nd,regular,\r\nīvit,4th,active,indicative,perfect,singular,3rd,regular,\r\nīvimus,4th,active,indicative,perfect,plural,1st,regular,\r\nīvistis,4th,active,indicative,perfect,plural,2nd,regular,\r\nīvērunt,4th,active,indicative,perfect,plural,3rd,regular,\r\nīvēre,4th,active,indicative,perfect,plural,3rd,irregular,6\r\nīverim,4th,active,subjunctive,perfect,singular,1st,regular,\r\niveris,4th,active,subjunctive,perfect,singular,2nd,regular,\r\nīverit,4th,active,subjunctive,perfect,singular,3rd,regular,\r\nīverimus,4th,active,subjunctive,perfect,plural,1st,regular,\r\nīveritis,4th,active,subjunctive,perfect,plural,2nd,regular,\r\nīverint,4th,active,subjunctive,perfect,plural,3rd,regular,\r\nāveram,1st,active,indicative,pluperfect,singular,1st,regular,\r\nāverās,1st,active,indicative,pluperfect,singular,2nd,regular,\r\nāverat,1st,active,indicative,pluperfect,singular,3rd,regular,\r\nāverāmus,1st,active,indicative,pluperfect,plural,1st,regular,\r\nāverātis,1st,active,indicative,pluperfect,plural,2nd,regular,\r\nāverant,1st,active,indicative,pluperfect,plural,3rd,regular,\r\nāvissem,1st,active,subjunctive,pluperfect,singular,1st,regular,\r\nāvissēs,1st,active,subjunctive,pluperfect,singular,2nd,regular,\r\nāvisset,1st,active,subjunctive,pluperfect,singular,3rd,regular,\r\nāvissēm,1st,active,subjunctive,pluperfect,plural,1st,regular,\r\nāvissēs,1st,active,subjunctive,pluperfect,plural,2nd,regular,\r\nāvisset,1st,active,subjunctive,pluperfect,plural,3rd,regular,\r\nveram,2nd,active,indicative,pluperfect,singular,1st,regular,\r\nverās,2nd,active,indicative,pluperfect,singular,2nd,regular,\r\nverat,2nd,active,indicative,pluperfect,singular,3rd,regular,\r\nverāmus,2nd,active,indicative,pluperfect,plural,1st,regular,\r\nverātis,2nd,active,indicative,pluperfect,plural,2nd,regular,\r\nverant,2nd,active,indicative,pluperfect,plural,3rd,regular,\r\nvissem,2nd,active,subjunctive,pluperfect,singular,1st,regular,\r\nvissēs,2nd,active,subjunctive,pluperfect,singular,2nd,regular,\r\nvisset,2nd,active,subjunctive,pluperfect,singular,3rd,regular,\r\nvissēmus,2nd,active,subjunctive,pluperfect,plural,1st,regular,\r\nvissētis,2nd,active,subjunctive,pluperfect,plural,2nd,regular,\r\nvissent,2nd,active,subjunctive,pluperfect,plural,3rd,regular,\r\neram,3rd,active,indicative,pluperfect,singular,1st,regular,\r\nerās,3rd,active,indicative,pluperfect,singular,2nd,regular,\r\nerat,3rd,active,indicative,pluperfect,singular,3rd,regular,\r\nerāmus,3rd,active,indicative,pluperfect,plural,1st,regular,\r\nerātis,3rd,active,indicative,pluperfect,plural,2nd,regular,\r\nerant,3rd,active,indicative,pluperfect,plural,3rd,regular,\r\nissem,3rd,active,subjunctive,pluperfect,singular,1st,regular,\r\nissēs,3rd,active,subjunctive,pluperfect,singular,2nd,regular,\r\nisset,3rd,active,subjunctive,pluperfect,singular,3rd,regular,\r\nissēmus,3rd,active,subjunctive,pluperfect,plural,1st,regular,\r\nissētis,3rd,active,subjunctive,pluperfect,plural,2nd,regular,\r\nissent,3rd,active,subjunctive,pluperfect,plural,3rd,regular,\r\nīveram,4th,active,indicative,pluperfect,singular,1st,regular,\r\nīverās,4th,active,indicative,pluperfect,singular,2nd,regular,\r\nīverat,4th,active,indicative,pluperfect,singular,3rd,regular,\r\nīverāmus,4th,active,indicative,pluperfect,plural,1st,regular,\r\nīverātis,4th,active,indicative,pluperfect,plural,2nd,regular,\r\nīverant,4th,active,indicative,pluperfect,plural,3rd,regular,\r\nīvissem,4th,active,subjunctive,pluperfect,singular,1st,regular,\r\nīvissēs,4th,active,subjunctive,pluperfect,singular,2nd,regular,\r\nīvisset,4th,active,subjunctive,pluperfect,singular,3rd,regular,\r\nīvissēmus,4th,active,subjunctive,pluperfect,plural,1st,regular,\r\nīvissētis,4th,active,subjunctive,pluperfect,plural,2nd,regular,\r\nīvissent,4th,active,subjunctive,pluperfect,plural,3rd,regular,\r\nāverō,1st,active,indicative,future_perfect,singular,1st,regular,\r\nāveris,1st,active,indicative,future_perfect,singular,2nd,regular,\r\nāverit,1st,active,indicative,future_perfect,singular,3rd,regular,\r\nāverimus,1st,active,indicative,future_perfect,plural,1st,regular,\r\nāveritis,1st,active,indicative,future_perfect,plural,2nd,regular,\r\nāverint,1st,active,indicative,future_perfect,plural,3rd,regular,\r\n,1st,active,subjunctive,future_perfect,singular,1st,,\r\n,1st,active,subjunctive,future_perfect,singular,2nd,,\r\n,1st,active,subjunctive,future_perfect,singular,3rd,,\r\n,1st,active,subjunctive,future_perfect,plural,1st,,\r\n,1st,active,subjunctive,future_perfect,plural,2nd,,\r\n,1st,active,subjunctive,future_perfect,plural,3rd,,\r\nverō,2nd,active,indicative,future_perfect,singular,1st,regular,\r\nvēris,2nd,active,indicative,future_perfect,singular,2nd,regular,\r\nvērit,2nd,active,indicative,future_perfect,singular,3rd,regular,\r\nvērimus,2nd,active,indicative,future_perfect,plural,1st,regular,\r\nvēritis,2nd,active,indicative,future_perfect,plural,2nd,regular,\r\nvērint,2nd,active,indicative,future_perfect,plural,3rd,regular,\r\n,2nd,active,subjunctive,future_perfect,singular,1st,,\r\n,2nd,active,subjunctive,future_perfect,singular,2nd,,\r\n,2nd,active,subjunctive,future_perfect,singular,3rd,,\r\n,2nd,active,subjunctive,future_perfect,plural,1st,,\r\n,2nd,active,subjunctive,future_perfect,plural,2nd,,\r\n,2nd,active,subjunctive,future_perfect,plural,3rd,,\r\nerō,3rd,active,indicative,future_perfect,singular,1st,regular,\r\neris,3rd,active,indicative,future_perfect,singular,2nd,regular,\r\nerit,3rd,active,indicative,future_perfect,singular,3rd,regular,\r\nerimus,3rd,active,indicative,future_perfect,plural,1st,regular,\r\neritis,3rd,active,indicative,future_perfect,plural,2nd,regular,\r\nerint,3rd,active,indicative,future_perfect,plural,3rd,regular,\r\n,3rd,active,subjunctive,future_perfect,singular,1st,,\r\n,3rd,active,subjunctive,future_perfect,singular,2nd,,\r\n,3rd,active,subjunctive,future_perfect,singular,3rd,,\r\n,3rd,active,subjunctive,future_perfect,plural,1st,,\r\n,3rd,active,subjunctive,future_perfect,plural,2nd,,\r\n,3rd,active,subjunctive,future_perfect,plural,3rd,,\r\nīverō,4th,active,indicative,future_perfect,singular,1st,regular,\r\nīveris,4th,active,indicative,future_perfect,singular,2nd,regular,\r\nīverit,4th,active,indicative,future_perfect,singular,3rd,regular,\r\nīverimus,4th,active,indicative,future_perfect,plural,1st,regular,\r\nīveritis,4th,active,indicative,future_perfect,plural,2nd,regular,\r\nīverint,4th,active,indicative,future_perfect,plural,3rd,regular,\r\n,4th,active,subjunctive,future_perfect,singular,1st,,\r\n,4th,active,subjunctive,future_perfect,singular,2nd,,\r\n,4th,active,subjunctive,future_perfect,singular,3rd,,\r\n,4th,active,subjunctive,future_perfect,plural,1st,,\r\n,4th,active,subjunctive,future_perfect,plural,2nd,,\r\n,4th,active,subjunctive,future_perfect,plural,3rd,,\r\nor,1st,passive,indicative,present,singular,1st,regular,\r\nāris,1st,passive,indicative,present,singular,2nd,regular,\r\nāre,1st,passive,indicative,present,singular,2nd,irregular,5\r\nātur,1st,passive,indicative,present,singular,3rd,regular,\r\nāmur,1st,passive,indicative,present,plural,1st,regular,\r\nāminiī,1st,passive,indicative,present,plural,2nd,regular,\r\nantur,1st,passive,indicative,present,plural,3rd,regular,\r\ner,1st,passive,subjunctive,present,singular,1st,regular,\r\nēris,1st,passive,subjunctive,present,singular,2nd,regular,\r\nēre,1st,passive,subjunctive,present,singular,2nd,regular,\r\nētur,1st,passive,subjunctive,present,singular,3rd,regular,\r\nēmur,1st,passive,subjunctive,present,plural,1st,regular,\r\nēminī,1st,passive,subjunctive,present,plural,2nd,regular,\r\nentur,1st,passive,subjunctive,present,plural,3rd,regular,\r\neor,2nd,passive,indicative,present,singular,1st,regular,\r\nēris,2nd,passive,indicative,present,singular,2nd,regular,\r\nēre,2nd,passive,indicative,present,singular,2nd,regular,\r\nētur,2nd,passive,indicative,present,singular,3rd,regular,\r\nēmur,2nd,passive,indicative,present,plural,1st,regular,\r\nēmini,2nd,passive,indicative,present,plural,2nd,regular,\r\nentur,2nd,passive,indicative,present,plural,3rd,regular,\r\near,2nd,passive,subjunctive,present,singular,1st,regular,\r\neāris,2nd,passive,subjunctive,present,singular,2nd,regular,\r\neāre,2nd,passive,subjunctive,present,singular,2nd,regular,\r\neātur,2nd,passive,subjunctive,present,singular,3rd,regular,\r\neāmur,2nd,passive,subjunctive,present,plural,1st,regular,\r\neāminī,2nd,passive,subjunctive,present,plural,2nd,regular,\r\neantur,2nd,passive,subjunctive,present,plural,3rd,regular,\r\nor,3rd,passive,indicative,present,singular,1st,regular,\r\neris,3rd,passive,indicative,present,singular,2nd,regular,\r\nere,3rd,passive,indicative,present,singular,2nd,regular,\r\nitur,3rd,passive,indicative,present,singular,3rd,regular,\r\nimur,3rd,passive,indicative,present,plural,1st,regular,\r\niminī,3rd,passive,indicative,present,plural,2nd,regular,\r\nuntur,3rd,passive,indicative,present,plural,3rd,regular,\r\nar,3rd,passive,subjunctive,present,singular,1st,regular,\r\nāris,3rd,passive,subjunctive,present,singular,2nd,regular,\r\nāre,3rd,passive,subjunctive,present,singular,2nd,regular,\r\nātur,3rd,passive,subjunctive,present,singular,3rd,regular,\r\nāmur,3rd,passive,subjunctive,present,plural,1st,regular,\r\nāminī,3rd,passive,subjunctive,present,plural,2nd,regular,\r\nantur,3rd,passive,subjunctive,present,plural,3rd,regular,\r\nior,4th,passive,indicative,present,singular,1st,regular,\r\nīris,4th,passive,indicative,present,singular,2nd,regular,\r\nīre,4th,passive,indicative,present,singular,2nd,regular,\r\nītur,4th,passive,indicative,present,singular,3rd,regular,\r\nīmur,4th,passive,indicative,present,plural,1st,regular,\r\nīminī,4th,passive,indicative,present,plural,2nd,regular,\r\niuntur,4th,passive,indicative,present,plural,3rd,regular,\r\niar,4th,passive,subjunctive,present,singular,1st,regular,\r\niāris,4th,passive,subjunctive,present,singular,2nd,regular,\r\niāre,4th,passive,subjunctive,present,singular,2nd,regular,\r\niātur,4th,passive,subjunctive,present,singular,3rd,regular,\r\niāmur,4th,passive,subjunctive,present,plural,1st,regular,\r\niāminī,4th,passive,subjunctive,present,plural,2nd,regular,\r\niantur,4th,passive,subjunctive,present,plural,3rd,regular,\r\nābar,1st,passive,indicative,imperfect,singular,1st,regular,\r\nābāaris,1st,passive,indicative,imperfect,singular,2nd,regular,\r\nābāre,1st,passive,indicative,imperfect,singular,2nd,regular,\r\nābātur,1st,passive,indicative,imperfect,singular,3rd,regular,\r\nābāmur,1st,passive,indicative,imperfect,plural,1st,regular,\r\nābāminī,1st,passive,indicative,imperfect,plural,2nd,regular,\r\nābantur,1st,passive,indicative,imperfect,plural,3rd,regular,\r\nārer,1st,passive,subjunctive,imperfect,singular,1st,regular,\r\nārēris,1st,passive,subjunctive,imperfect,singular,2nd,regular,\r\nārēre,1st,passive,subjunctive,imperfect,singular,2nd,regular,\r\nārētur,1st,passive,subjunctive,imperfect,singular,3rd,regular,\r\nārēmur,1st,passive,subjunctive,imperfect,plural,1st,regular,\r\nārēminī,1st,passive,subjunctive,imperfect,plural,2nd,regular,\r\nārentur,1st,passive,subjunctive,imperfect,plural,3rd,regular,\r\nēbar,2nd,passive,indicative,imperfect,singular,1st,regular,\r\nēbāris,2nd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbāre,2nd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbātur,2nd,passive,indicative,imperfect,singular,3rd,regular,\r\nēbāmur,2nd,passive,indicative,imperfect,plural,1st,regular,\r\nēbāmini,2nd,passive,indicative,imperfect,plural,2nd,regular,\r\nēbantur,2nd,passive,indicative,imperfect,plural,3rd,regular,\r\nērer,2nd,passive,subjunctive,imperfect,singular,1st,regular,\r\nērēris,2nd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nērēre,2nd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nērētur,2nd,passive,subjunctive,imperfect,singular,3rd,regular,\r\nērēmur,2nd,passive,subjunctive,imperfect,plural,1st,regular,\r\nērēminī,2nd,passive,subjunctive,imperfect,plural,2nd,regular,\r\nērentur,2nd,passive,subjunctive,imperfect,plural,3rd,regular,\r\nēbar,3rd,passive,indicative,imperfect,singular,1st,regular,\r\nēbāris,3rd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbāre,3rd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbatur,3rd,passive,indicative,imperfect,singular,3rd,regular,\r\nēbāmur,3rd,passive,indicative,imperfect,plural,1st,regular,\r\nēbāminī,3rd,passive,indicative,imperfect,plural,2nd,regular,\r\nēbantur,3rd,passive,indicative,imperfect,plural,3rd,regular,\r\nerer,3rd,passive,subjunctive,imperfect,singular,1st,regular,\r\nerēris,3rd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nerēre,3rd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nerētur,3rd,passive,subjunctive,imperfect,singular,3rd,regular,\r\nerēmur,3rd,passive,subjunctive,imperfect,plural,1st,regular,\r\nerēminī,3rd,passive,subjunctive,imperfect,plural,2nd,regular,\r\nerentur,3rd,passive,subjunctive,imperfect,plural,3rd,regular,\r\niēbar,4th,passive,indicative,imperfect,singular,1st,regular,\r\niēbāris,4th,passive,indicative,imperfect,singular,2nd,regular,\r\niēbāre,4th,passive,indicative,imperfect,singular,2nd,regular,\r\niēbātur,4th,passive,indicative,imperfect,singular,3rd,regular,\r\niēbāmur,4th,passive,indicative,imperfect,plural,1st,regular,\r\niēbāminī,4th,passive,indicative,imperfect,plural,2nd,regular,\r\niēbantur,4th,passive,indicative,imperfect,plural,3rd,regular,\r\nīrer,4th,passive,subjunctive,imperfect,singular,1st,regular,\r\nīrēris,4th,passive,subjunctive,imperfect,singular,2nd,regular,\r\nīrēre,4th,passive,subjunctive,imperfect,singular,2nd,regular,\r\nīrētur,4th,passive,subjunctive,imperfect,singular,3rd,regular,\r\nīrēmur,4th,passive,subjunctive,imperfect,plural,1st,regular,\r\nīrēminī,4th,passive,subjunctive,imperfect,plural,2nd,regular,\r\nīrentur,4th,passive,subjunctive,imperfect,plural,3rd,regular,\r\nābor,1st,passive,indicative,future,singular,1st,regular,\r\nāberis,1st,passive,indicative,future,singular,2nd,regular,\r\nābere,1st,passive,indicative,future,singular,2nd,irregular,\r\nābitur,1st,passive,indicative,future,singular,3rd,regular,\r\nābimur,1st,passive,indicative,future,plural,1st,regular,\r\nābiminī,1st,passive,indicative,future,plural,2nd,regular,\r\nābuntur,1st,passive,indicative,future,plural,3rd,regular,\r\n,1st,passive,subjunctive,future,singular,1st,,\r\n,1st,passive,subjunctive,future,singular,2nd,,\r\n,1st,passive,subjunctive,future,singular,3rd,,\r\n,1st,passive,subjunctive,future,plural,1st,,\r\n,1st,passive,subjunctive,future,plural,2nd,,\r\n,1st,passive,subjunctive,future,plural,3rd,,\r\nēbor,2nd,passive,indicative,future,singular,1st,regular,\r\nēberis,2nd,passive,indicative,future,singular,2nd,regular,\r\nēbere,2nd,passive,indicative,future,singular,2nd,regular,\r\nēbitur,2nd,passive,indicative,future,singular,3rd,regular,\r\nēbimur,2nd,passive,indicative,future,plural,1st,regular,\r\nēbiminī,2nd,passive,indicative,future,plural,2nd,regular,\r\nēbuntur,2nd,passive,indicative,future,plural,3rd,regular,\r\n,2nd,passive,subjunctive,future,singular,1st,,\r\n,2nd,passive,subjunctive,future,singular,2nd,,\r\n,2nd,passive,subjunctive,future,singular,3rd,,\r\n,2nd,passive,subjunctive,future,plural,1st,,\r\n,2nd,passive,subjunctive,future,plural,2nd,,\r\n,2nd,passive,subjunctive,future,plural,3rd,,\r\nar,3rd,passive,indicative,future,singular,1st,regular,\r\nēris,3rd,passive,indicative,future,singular,2nd,regular,\r\nēre,3rd,passive,indicative,future,singular,2nd,irregular,\r\nētur,3rd,passive,indicative,future,singular,3rd,regular,\r\nēmur,3rd,passive,indicative,future,plural,1st,regular,\r\nēminī,3rd,passive,indicative,future,plural,2nd,regular,\r\nentur,3rd,passive,indicative,future,plural,3rd,regular,\r\n,3rd,passive,subjunctive,future,singular,1st,,\r\n,3rd,passive,subjunctive,future,singular,2nd,,\r\n,3rd,passive,subjunctive,future,singular,3rd,,\r\n,3rd,passive,subjunctive,future,plural,1st,,\r\n,3rd,passive,subjunctive,future,plural,2nd,,\r\n,3rd,passive,subjunctive,future,plural,3rd,,\r\niar,4th,passive,indicative,future,singular,1st,regular,\r\niēris,4th,passive,indicative,future,singular,2nd,regular,\r\nīēre,4th,passive,indicative,future,singular,2nd,irregular,\r\niētur,4th,passive,indicative,future,singular,3rd,regular,\r\niēmur,4th,passive,indicative,future,plural,1st,regular,\r\niēminī,4th,passive,indicative,future,plural,2nd,regular,\r\nientur,4th,passive,indicative,future,plural,3rd,regular,\r\n,4th,passive,subjunctive,future,singular,1st,,\r\n,4th,passive,subjunctive,future,singular,2nd,,\r\n,4th,passive,subjunctive,future,singular,3rd,,\r\n,4th,passive,subjunctive,future,plural,1st,,\r\n,4th,passive,subjunctive,future,plural,2nd,,\r\n,4th,passive,subjunctive,future,plural,3rd,,\r\nātus sum,1st,passive,indicative,perfect,singular,1st,regular,\r\nātus fui,1st,passive,indicative,perfect,singular,1st,regular,\r\nātus es,1st,passive,indicative,perfect,singular,2nd,regular,\r\nātus fuisti,1st,passive,indicative,perfect,singular,2nd,regular,\r\nātus est,1st,passive,indicative,perfect,singular,3rd,regular,\r\nātus fuit,1st,passive,indicative,perfect,singular,3rd,regular,\r\nāti sumus,1st,passive,indicative,perfect,plural,1st,regular,\r\nāti fuimus,1st,passive,indicative,perfect,plural,1st,irregular,\r\nāti estis,1st,passive,indicative,perfect,plural,2nd,regular,\r\nāti fuistis,1st,passive,indicative,perfect,plural,2nd,irregular,\r\nāti sunt,1st,passive,indicative,perfect,plural,3rd,regular,\r\nāti fuerunt,1st,passive,indicative,perfect,plural,3rd,irregular,\r\nātus sim,1st,passive,subjunctive,perfect,singular,1st,regular,\r\nātus fuerim,1st,passive,subjunctive,perfect,singular,1st,irregular,\r\nātus sis,1st,passive,subjunctive,perfect,singular,2nd,regular,\r\nātus fueris,1st,passive,subjunctive,perfect,singular,2nd,irregular,\r\nātus sit,1st,passive,subjunctive,perfect,singular,3rd,regular,\r\nātus fuerit,1st,passive,subjunctive,perfect,singular,3rd,regular,\r\nāti sīmus,1st,passive,subjunctive,perfect,plural,1st,regular,\r\nāti fuerimus,1st,passive,subjunctive,perfect,plural,1st,irregular,\r\nāti sītis,1st,passive,subjunctive,perfect,plural,2nd,regular,\r\nāti fueritis,1st,passive,subjunctive,perfect,plural,2nd,irregular,\r\nāti sint,1st,passive,subjunctive,perfect,plural,3rd,regular,\r\nāti fuerint,1st,passive,subjunctive,perfect,plural,3rd,irregular,\r\nitus sum,2nd,passive,indicative,perfect,singular,1st,regular,\r\nitus es,2nd,passive,indicative,perfect,singular,2nd,regular,\r\nitus est,2nd,passive,indicative,perfect,singular,3rd,regular,\r\nitī sumus,2nd,passive,indicative,perfect,plural,1st,regular,\r\nitī estis,2nd,passive,indicative,perfect,plural,2nd,regular,\r\nitī sunt,2nd,passive,indicative,perfect,plural,3rd,regular,\r\nitus sim,2nd,passive,subjunctive,perfect,singular,1st,regular,\r\nitus sīs,2nd,passive,subjunctive,perfect,singular,2nd,regular,\r\nitus sit,2nd,passive,subjunctive,perfect,singular,3rd,regular,\r\nitī sīmus,2nd,passive,subjunctive,perfect,plural,1st,regular,\r\nitī sītis,2nd,passive,subjunctive,perfect,plural,2nd,regular,\r\nitī sint,2nd,passive,subjunctive,perfect,plural,3rd,regular,\r\nus sum,3rd,passive,indicative,perfect,singular,1st,regular,\r\nus es,3rd,passive,indicative,perfect,singular,2nd,regular,\r\nus est,3rd,passive,indicative,perfect,singular,3rd,regular,\r\nī sumus,3rd,passive,indicative,perfect,plural,1st,regular,\r\nī estis,3rd,passive,indicative,perfect,plural,2nd,regular,\r\nī sunt,3rd,passive,indicative,perfect,plural,3rd,regular,\r\nus sim,3rd,passive,subjunctive,perfect,singular,1st,regular,\r\nus sīs,3rd,passive,subjunctive,perfect,singular,2nd,regular,\r\nus sit,3rd,passive,subjunctive,perfect,singular,3rd,regular,\r\nus sīmus,3rd,passive,subjunctive,perfect,plural,1st,regular,\r\nus sītis,3rd,passive,subjunctive,perfect,plural,2nd,regular,\r\nus sint,3rd,passive,subjunctive,perfect,plural,3rd,regular,\r\nītus sum,4th,passive,indicative,perfect,singular,1st,regular,\r\nītus es,4th,passive,indicative,perfect,singular,2nd,regular,\r\nītus est,4th,passive,indicative,perfect,singular,3rd,regular,\r\nītī sumus,4th,passive,indicative,perfect,plural,1st,regular,\r\nīti estis,4th,passive,indicative,perfect,plural,2nd,regular,\r\nīti sunt,4th,passive,indicative,perfect,plural,3rd,regular,\r\nītus sim,4th,passive,subjunctive,perfect,singular,1st,regular,\r\nītus sīs,4th,passive,subjunctive,perfect,singular,2nd,regular,\r\nītus sit,4th,passive,subjunctive,perfect,singular,3rd,regular,\r\nītī sīmus,4th,passive,subjunctive,perfect,plural,1st,regular,\r\nīti sītis,4th,passive,subjunctive,perfect,plural,2nd,regular,\r\nīti sint,4th,passive,subjunctive,perfect,plural,3rd,regular,\r\nātus eram,1st,passive,indicative,pluperfect,singular,1st,regular,\r\nātus fueram,1st,passive,indicative,pluperfect,singular,1st,irregular,\r\nātus eras,1st,passive,indicative,pluperfect,singular,2nd,regular,\r\nātus fueras,1st,passive,indicative,pluperfect,singular,2nd,irregular,\r\nātus erat,1st,passive,indicative,pluperfect,singular,3rd,regular,\r\nātus fuerat,1st,passive,indicative,pluperfect,singular,3rd,irregular,\r\nātī erāmus,1st,passive,indicative,pluperfect,plural,1st,regular,\r\nātī fueramus,1st,passive,indicative,pluperfect,plural,1st,irregular,\r\nātī erātis,1st,passive,indicative,pluperfect,plural,2nd,regular,\r\nātī fueratis,1st,passive,indicative,pluperfect,plural,2nd,irregular,\r\nātī erant,1st,passive,indicative,pluperfect,plural,3rd,regular,\r\nātī fuerant,1st,passive,indicative,pluperfect,plural,3rd,irregular,\r\nātus essem,1st,passive,subjunctive,pluperfect,singular,1st,regular,\r\nātus fuissem,1st,passive,subjunctive,pluperfect,singular,1st,irregular,\r\nātus esses,1st,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nātus fuissēs,1st,passive,subjunctive,pluperfect,singular,2nd,irregular,\r\nātus esset,1st,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nātus fuisset,1st,passive,subjunctive,pluperfect,singular,3rd,irregular,\r\nāti essēmus,1st,passive,subjunctive,pluperfect,plural,1st,regular,\r\nāti fuissēmus,1st,passive,subjunctive,pluperfect,plural,1st,irregular,\r\nāti essētis,1st,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nāti fuissētis,1st,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nāti essent,1st,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nāti fuissent,1st,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nitus eram,2nd,passive,indicative,pluperfect,singular,1st,regular,\r\nitus erās,2nd,passive,indicative,pluperfect,singular,2nd,regular,\r\nitus erat,2nd,passive,indicative,pluperfect,singular,3rd,regular,\r\nitī erāmus,2nd,passive,indicative,pluperfect,plural,1st,regular,\r\nitī erātis,2nd,passive,indicative,pluperfect,plural,2nd,regular,\r\nitī erant,2nd,passive,indicative,pluperfect,plural,3rd,regular,\r\nitus essem,2nd,passive,subjunctive,pluperfect,singular,1st,regular,\r\nitus essēs,2nd,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nitus esset,2nd,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nitī essēmus,2nd,passive,subjunctive,pluperfect,plural,1st,regular,\r\nīti essētis,2nd,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nīti essent,2nd,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nus eram,3rd,passive,indicative,pluperfect,singular,1st,regular,\r\nus erās,3rd,passive,indicative,pluperfect,singular,2nd,regular,\r\nus erat,3rd,passive,indicative,pluperfect,singular,3rd,regular,\r\nī erāmus,3rd,passive,indicative,pluperfect,plural,1st,regular,\r\nī erātis,3rd,passive,indicative,pluperfect,plural,2nd,regular,\r\nī erant,3rd,passive,indicative,pluperfect,plural,3rd,regular,\r\nus essem,3rd,passive,subjunctive,pluperfect,singular,1st,regular,\r\nus essēs,3rd,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nus esset,3rd,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nī essēmus,3rd,passive,subjunctive,pluperfect,plural,1st,regular,\r\nī essētis,3rd,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nī essent,3rd,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nītus eram,4th,passive,indicative,pluperfect,singular,1st,regular,\r\nītus erās,4th,passive,indicative,pluperfect,singular,2nd,regular,\r\nītus erat,4th,passive,indicative,pluperfect,singular,3rd,regular,\r\nītī erāmus,4th,passive,indicative,pluperfect,plural,1st,regular,\r\nīti erātis,4th,passive,indicative,pluperfect,plural,2nd,regular,\r\nītī erant,4th,passive,indicative,pluperfect,plural,3rd,regular,\r\nītus essem,4th,passive,subjunctive,pluperfect,singular,1st,regular,\r\nītus essēs,4th,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nītus esset,4th,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nītī essēmus,4th,passive,subjunctive,pluperfect,plural,1st,regular,\r\nīti essētis,4th,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nīti essent,4th,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nātus erō,1st,passive,indicative,future_perfect,singular,1st,regular,\r\nātus eris,1st,passive,indicative,future_perfect,singular,2nd,regular,\r\nātus erit,1st,passive,indicative,future_perfect,singular,3rd,regular,\r\nāti erimus,1st,passive,indicative,future_perfect,plural,1st,regular,\r\nāti eritis,1st,passive,indicative,future_perfect,plural,2nd,regular,\r\nāti erunt,1st,passive,indicative,future_perfect,plural,3rd,regular,\r\n,1st,passive,subjunctive,future_perfect,singular,1st,,\r\n,1st,passive,subjunctive,future_perfect,singular,2nd,,\r\n,1st,passive,subjunctive,future_perfect,singular,3rd,,\r\n,1st,passive,subjunctive,future_perfect,plural,1st,,\r\n,1st,passive,subjunctive,future_perfect,plural,2nd,,\r\n,1st,passive,subjunctive,future_perfect,plural,3rd,,\r\nitus erō,2nd,passive,indicative,future_perfect,singular,1st,regular,\r\nitus eris,2nd,passive,indicative,future_perfect,singular,2nd,regular,\r\nitus erit,2nd,passive,indicative,future_perfect,singular,3rd,regular,\r\nitī erimus,2nd,passive,indicative,future_perfect,plural,1st,regular,\r\nitī eritis,2nd,passive,indicative,future_perfect,plural,2nd,regular,\r\nitī erunt,2nd,passive,indicative,future_perfect,plural,3rd,regular,\r\n,2nd,passive,subjunctive,future_perfect,singular,1st,,\r\n,2nd,passive,subjunctive,future_perfect,singular,2nd,,\r\n,2nd,passive,subjunctive,future_perfect,singular,3rd,,\r\n,2nd,passive,subjunctive,future_perfect,plural,1st,,\r\n,2nd,passive,subjunctive,future_perfect,plural,2nd,,\r\n,2nd,passive,subjunctive,future_perfect,plural,3rd,,\r\nus erō,3rd,passive,indicative,future_perfect,singular,1st,regular,\r\nus eris,3rd,passive,indicative,future_perfect,singular,2nd,regular,\r\nus erit,3rd,passive,indicative,future_perfect,singular,3rd,regular,\r\nī erimus,3rd,passive,indicative,future_perfect,plural,1st,regular,\r\nī eritis,3rd,passive,indicative,future_perfect,plural,2nd,regular,\r\nī erunt,3rd,passive,indicative,future_perfect,plural,3rd,regular,\r\n,3rd,passive,subjunctive,future_perfect,singular,1st,,\r\n,3rd,passive,subjunctive,future_perfect,singular,2nd,,\r\n,3rd,passive,subjunctive,future_perfect,singular,3rd,,\r\n,3rd,passive,subjunctive,future_perfect,plural,1st,,\r\n,3rd,passive,subjunctive,future_perfect,plural,2nd,,\r\n,3rd,passive,subjunctive,future_perfect,plural,3rd,,\r\nītus erō,4th,passive,indicative,future_perfect,singular,1st,regular,\r\nītus eris,4th,passive,indicative,future_perfect,singular,2nd,regular,\r\nītus erit,4th,passive,indicative,future_perfect,singular,3rd,regular,\r\nītī erimus,4th,passive,indicative,future_perfect,plural,1st,regular,\r\nītī eritis,4th,passive,indicative,future_perfect,plural,2nd,regular,\r\nītī erunt,4th,passive,indicative,future_perfect,plural,3rd,regular,\r\n,4th,passive,subjunctive,future_perfect,singular,1st,,\r\n,4th,passive,subjunctive,future_perfect,singular,2nd,,\r\n,4th,passive,subjunctive,future_perfect,singular,3rd,,\r\n,4th,passive,subjunctive,future_perfect,plural,1st,,\r\n,4th,passive,subjunctive,future_perfect,plural,2nd,,\r\n,4th,passive,subjunctive,future_perfect,plural,3rd,,";

var verbFootnotesCSV = "Index,Text\r\n2,Chiefly in poetry.\r\n3,\"In tenses based on the perfect stem (the perfect, pluperfect and future perfect of the Active voice) a v between two vowels is often lost with contraction of the two vowels, thus āvī to ā, ēvī to ē, ōvi to ō. Perfects in īvī often omit the v but rarely contract the vowels, except before ss or st, and sometimes in the third person. In addition to the use of v or u, the Active perfect stem can also be formed in a number of other ways, such as the addition of s to the root (eg carpsi), reduplication of the root (eg cecidi from cado), and simple lengthening of the vowel (eg vidī from video or legī from lego).\"\r\n4,\"Dic, duc, fac, and fer lack a final vowel in the imperative in classical Latin. The singular imperative of the verb sciō is always scītō, and the plural is usually scītōte.\"\r\n5,Common in epic poetry.\r\n6,Present in early Latin but chiefly confined to popular use until Livy and later writers.\r\n7,The verb fīō is a 4th conjugation verb that is irregular in only two forms: the present infinitive fierī and the imperfect subjunctive fierem.";

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var papaparse = createCommonjsModule(function (module, exports) {
/*!
	Papa Parse
	v4.3.6
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	if (typeof undefined === 'function' && undefined.amd)
	{
		// AMD. Register as an anonymous module.
		undefined([], factory);
	}
	else {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
}(this, function()
{
	'use strict';

	var global = (function () {
		// alternative method, similar to `Function('return this')()`
		// but without using `eval` (which is disabled when
		// using Content Security Policy).

		if (typeof self !== 'undefined') { return self; }
		if (typeof window !== 'undefined') { return window; }
		if (typeof global !== 'undefined') { return global; }

		// When running tests none of the above have been defined
		return {};
	})();


	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = '\ufeff';
	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;
	Papa.ReadableStreamStreamer = ReadableStreamStreamer;

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
								&& $(this).attr('type').toLowerCase() === 'file'
								&& global.FileReader;

				if (!supported || !this.files || this.files.length === 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length === 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action === 'abort')
						{
							error('AbortError', f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned === 'skip')
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		};
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function () {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};
		var dynamicTyping = _config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			_config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		_config.dynamicTyping = dynamicTyping;

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
		{
			streamer = new ReadableStreamStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		var _output = '';
		var _fields = [];

		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  _input.data[0] instanceof Array
									? _input.fields
									: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length === 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;

			if (typeof _config.quoteChar === 'string')
				_quoteChar = _config.quoteChar;

			if (typeof _config.header === 'boolean')
				_writeHeader = _config.header;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader && _writeHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			str = str.toString().replace(quoteCharRegex, _quoteChar+_quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) === ' '
							|| str.charAt(str.length - 1) === ' ';

			return needsQuotes ? _quoteChar + str + _quoteChar : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._paused = false;
		this._finished = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = '';

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

			if (this._handle.paused() || this._handle.aborted())
				return;

			var lastIndex = results.meta.cursor;

			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk))
			{
				this._config.chunk(results, this._handle);
				if (this._paused)
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
				this._config.complete(this._completeResults, this._input);

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();

			if (this._config.withCredentials)
			{
				xhr.withCredentials = this._config.withCredentials;
			}

			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open('GET', this._input, !IS_WORKER);
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders)
			{
				var headers = this._config.downloadRequestHeaders;

				for (var headerName in headers)
				{
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader('Range', 'bytes='+this._start+'-'+end);
				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status === 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		};

		this._chunkLoaded = function()
		{
			if (xhr.readyState != 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		};

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		};

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader('Content-Range');
			if (contentRange === null) { // no content range, then finish!
					return -1;
					}
			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		};

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		};

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		};

		this._chunkError = function()
		{
			this._sendError(reader.error);
		};

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var string;
		var remaining;
		this.stream = function(s)
		{
			string = s;
			remaining = s;
			return this._nextChunk();
		};
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		};
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;


	function ReadableStreamStreamer(config)
	{
		config = config || {};

		ChunkStreamer.call(this, config);

		var queue = [];
		var parseOnData = true;

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		};

		this._nextChunk = function()
		{
			if (queue.length)
			{
				this.parseChunk(queue.shift());
			}
			else
			{
				parseOnData = true;
			}
		};

		this._streamData = bindFunction(function(chunk)
		{
			try
			{
				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

				if (parseOnData)
				{
					parseOnData = false;
					this.parseChunk(queue.shift());
				}
			}
			catch (error)
			{
				this._streamError(error);
			}
		}, this);

		this._streamError = bindFunction(function(error)
		{
			this._streamCleanUp();
			this._sendError(error.message);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			this._finished = true;
			this._streamData('');
		}, this);

		this._streamCleanUp = bindFunction(function()
		{
			this._input.removeListener('data', this._streamData);
			this._input.removeListener('end', this._streamEnd);
			this._input.removeListener('error', this._streamError);
		}, this);
	}
	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;	// Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length === 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}
			else if(isFunction(_config.delimiter))
			{
				_config.delimiter = _config.delimiter(input);
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input);
		};

		this.aborted = function ()
		{
			return _aborted;
		};

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = '';
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \''+Papa.DefaultDelimiter+'\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length === 1 && _results.data[i][0] === '')
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length === 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
					_fields.push(_results.data[i][j]);
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else
					return tryParseFloat(value);
			}
			return value;
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				for (var j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					value = parseDynamic(field, value);

					if (field === '__parsed_extra')
					{
						row[field] = row[field] || [];
						row[field].push(value);
					}
					else
						row[field] = value;
				}

				_results.data[i] = row;

				if (_config.header)
				{
					if (j > _fields.length)
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
						emptyLinesCount++;
						continue
					}
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= (preview.data.length - emptyLinesCount);

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			}
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024*1024);	// max length 1 MB

			var r = input.split('\r');

			var n = input.split('\n');

			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

			if (r.length === 1 || nAppearsFirst)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] === '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function tryParseFloat(val)
		{
			var isNumber = FLOAT.test(val);
			return isNumber ? parseFloat(val) : val;
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;
		var quoteChar = config.quoteChar || '"';

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ',';

		// Comment character must be valid
		if (comments === delim)
			throw 'Comment character same as delimiter';
		else if (comments === true)
			comments = '#';
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline != '\n' && newline != '\r' && newline != '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw 'Input must be a string';

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = isFunction(step);

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					var row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) === comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);
			var quoteCharRegex = new RegExp(quoteChar+quoteChar, 'g');

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					var quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						var quoteSearch = input.indexOf(quoteChar, quoteSearch+1);

						//No other quotes are found - no other delimiters
						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: 'Quotes',
									code: 'MissingQuotes',
									message: 'Quoted field unterminated',
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						// Closing quote at EOF
						if (quoteSearch === inputLen-1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						if (input[quoteSearch+1] === quoteChar)
						{
							quoteSearch++;
							continue;
						}

						// Closing quote followed by delimiter
						if (input[quoteSearch+1] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						// Closing quote followed by newline
						if (input.substr(quoteSearch+1, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}

							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}


						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
						errors.push({
							type: 'Quotes',
							code: 'InvalidQuotes',
							message: 'Trailing quote on quoted field is malformed',
							row: data.length,	// row has yet to be inserted
							index: cursor
						});

						quoteSearch++;
						continue;

					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline === -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [], errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw 'Not implemented.';
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}

	return Papa;
}));
});

/*
 * Latin language data module
 */
let languageModel = new LatinLanguageModel();
let types = Feature.types;
// A language of this module
const language = languages.latin;
// Create a language data set that will keep all language-related information
let dataSet = new LanguageDataset(language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
languageModel.features[types.declension].addImporter(importerName)
    .map('1st 2nd',
  [ languageModel.features[types.declension][Constants.ORD_1ST],
    languageModel.features[types.declension][Constants.ORD_2ND]
  ]);
languageModel.features[types.gender].addImporter(importerName)
    .map('masculine feminine',
  [ languageModel.features[types.gender][Constants.GEND_MASCULINE],
    languageModel.features[types.gender][Constants.GEND_FEMININE]
  ]);
languageModel.features[types.tense].addImporter(importerName)
    .map('future_perfect', languageModel.features[types.tense][Constants.TENSE_FUTURE_PERFECT]);
const footnotes = new FeatureType(types.footnote, [], language);

// endregion Definition of grammatical features

// For noun and adjectives
dataSet.addSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech,
      languageModel.features[types.number].getFromImporter('csv', data[i][1]),
      languageModel.features[types.grmCase].getFromImporter('csv', data[i][2]),
      languageModel.features[types.declension].getFromImporter('csv', data[i][3]),
      languageModel.features[types.gender].getFromImporter('csv', data[i][4]),
      languageModel.features[types.type].getFromImporter('csv', data[i][5])];
    if (data[i][6]) {
            // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][6].split(' ').map(function (index) {
        return footnotes.get(index)
      });
      features.push(...indexes);
    }
    this.addSuffix(suffix, features);
  }
};

// For verbs
dataSet.addVerbSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech,
      languageModel.features[types.conjugation].getFromImporter('csv', data[i][1]),
      languageModel.features[types.voice].getFromImporter('csv', data[i][2]),
      languageModel.features[types.mood].getFromImporter('csv', data[i][3]),
      languageModel.features[types.tense].getFromImporter('csv', data[i][4]),
      languageModel.features[types.number].getFromImporter('csv', data[i][5]),
      languageModel.features[types.person].getFromImporter('csv', data[i][6])];

    let grammartype = data[i][7];
        // Type information can be empty if no ending is provided
    if (grammartype) {
      features.push(languageModel.features[types.type].getFromImporter('csv', grammartype));
    }
        // Footnotes
    if (data[i][8]) {
            // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][8].split(' ').map(function (index) {
        return footnotes.get(index)
      });
      features.push(...indexes);
    }
    this.addSuffix(suffix, features);
  }
};

dataSet.addFootnotes = function (partOfSpeech, data) {
    // First row are headers
  for (let i = 1; i < data.length; i++) {
    this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
  }
};

dataSet.loadData = function () {
    // Nouns
  let partOfSpeech = languageModel.features[types.part][Constants.POFS_NOUN];
  let suffixes = papaparse.parse(nounSuffixesCSV, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  let footnotes = papaparse.parse(nounFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

    // Adjectives
  partOfSpeech = languageModel.features[types.part][Constants.POFS_ADJECTIVE];
  suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

    // Verbs
  partOfSpeech = languageModel.features[types.part][Constants.POFS_VERB];
  suffixes = papaparse.parse(verbSuffixesCSV, {});
  this.addVerbSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(verbFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);
};

/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - an array of inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - a suffix to be matched with inflections.
 * @returns {Suffix | null} if a match is found, returns a suffix object modified with some
 * additional information about a match. if no matches found, returns null.
 */
dataSet.matcher = function (inflections, suffix) {
  'use strict';
    // All of those features must match between an inflection and an ending
  let obligatoryMatches = [types.part];

    // Any of those features must match between an inflection and an ending
  let optionalMatches = [types.grmCase, types.declension, types.gender, types.number];
  let bestMatchData = null; // information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     a fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
  for (let inflection of inflections) {
    let matchData = new MatchData(); // Create a match profile

    if (inflection.suffix === suffix.value) {
      matchData.suffixMatch = true;
    }

        // Check obligatory matches
    for (let feature of obligatoryMatches) {
      let featureMatch = suffix.featureMatch(feature, inflection[feature]);
            // matchFound = matchFound && featureMatch;

      if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
        break
      }
            // Inflection's value of this feature is matching the one of the suffix
      matchData.matchedFeatures.push(feature);
    }

    if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
      break
    }

        // Check optional matches now
    for (let feature of optionalMatches) {
      let matchedValue = suffix.featureMatch(feature, inflection[feature]);
      if (matchedValue) {
        matchData.matchedFeatures.push(feature);
      }
    }

    if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
            // This is a full match
      matchData.fullMatch = true;

            // There can be only one full match, no need to search any further
      suffix.match = matchData;
      return suffix
    }
    bestMatchData = this.bestMatch(bestMatchData, matchData);
  }
  if (bestMatchData) {
        // There is some match found
    suffix.match = bestMatchData;
    return suffix
  }
  return null
};

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
};

class ExtendedGreekData extends ExtendedLanguageData {
  constructor () {
    super();
    this._type = ExtendedLanguageData.types().EXTENDED_GREEK_DATA; // For deserialization
    this.primary = false;
  }

  static readObject (jsonObject) {
    let data = new ExtendedGreekData();
    data.primary = jsonObject.primary;
    return data
  }

  merge (extendedGreekData) {
    if (this.primary !== extendedGreekData.primary) {
      console.log('Mismatch', this.primary, extendedGreekData.primary);
    }
    let merged = new ExtendedGreekData();
    merged.primary = this.primary;
    return merged
  }
}

var nounSuffixesCSV$1 = "Ending,Number,Case,Declension,Gender,Type,Primary,Footnote\r\nα,dual,accusative,1st,feminine,regular,primary,\r\nά,dual,accusative,1st,feminine,regular,,\r\nᾶ,dual,accusative,1st,feminine,regular,,2\r\nαιν,dual,dative,1st,feminine,regular,primary,\r\nαῖν,dual,dative,1st,feminine,regular,,\r\nαιιν,dual,dative,1st,feminine,irregular,,\r\nαιν,dual,genitive,1st,feminine,regular,primary,\r\nαῖν,dual,genitive,1st,feminine,regular,,\r\nαιιν,dual,genitive,1st,feminine,irregular,,\r\nα,dual,nominative,1st,feminine,regular,primary,\r\nά,dual,nominative,1st,feminine,regular,,\r\nᾶ,dual,nominative,1st,feminine,regular,,2\r\nα,dual,vocative,1st,feminine,regular,primary,\r\nά,dual,vocative,1st,feminine,regular,,\r\nᾶ,dual,vocative,1st,feminine,regular,,2\r\nα,dual,accusative,1st,masculine,regular,primary,\r\nά,dual,accusative,1st,masculine,regular,,\r\nᾶ,dual,accusative,1st,masculine,regular,,2\r\nαιν,dual,dative,1st,masculine,regular,primary,\r\nαῖν,dual,dative,1st,masculine,regular,,\r\nαιιν,dual,dative,1st,masculine,irregular,,\r\nαιν,dual,genitive,1st,masculine,regular,primary,\r\nαῖν,dual,genitive,1st,masculine,regular,,\r\nαιιν,dual,genitive,1st,masculine,irregular,,\r\nα,dual,nominative,1st,masculine,regular,primary,\r\nά,dual,nominative,1st,masculine,regular,,\r\nᾶ,dual,nominative,1st,masculine,regular,,2\r\nα,dual,vocative,1st,masculine,regular,primary,\r\nά,dual,vocative,1st,masculine,regular,,\r\nᾶ,dual,vocative,1st,masculine,regular,,2\r\nας,plural,accusative,1st,feminine,regular,primary,\r\nάς,plural,accusative,1st,feminine,regular,,\r\nᾶς,plural,accusative,1st,feminine,regular,,2\r\nανς,plural,accusative,1st,feminine,irregular,,\r\nαις,plural,accusative,1st,feminine,irregular,,\r\nαις,plural,dative,1st,feminine,regular,primary,\r\nαῖς,plural,dative,1st,feminine,regular,,\r\nῃσι,plural,dative,1st,feminine,irregular,,44\r\nῃσιν,plural,dative,1st,feminine,irregular,,4 44\r\nῃς,plural,dative,1st,feminine,irregular,,44\r\nαισι,plural,dative,1st,feminine,irregular,,44\r\nαισιν,plural,dative,1st,feminine,irregular,,4 44\r\nῶν,plural,genitive,1st,feminine,regular,primary,\r\nάων,plural,genitive,1st,feminine,irregular,,\r\nέων,plural,genitive,1st,feminine,irregular,,\r\nήων,plural,genitive,1st,feminine,irregular,,\r\nᾶν,plural,genitive,1st,feminine,irregular,,\r\nαι,plural,nominative,1st,feminine,regular,primary,\r\nαί,plural,nominative,1st,feminine,regular,,\r\nαῖ,plural,nominative,1st,feminine,regular,,2\r\nαι,plural,vocative,1st,feminine,regular,primary,\r\nαί,plural,vocative,1st,feminine,regular,,\r\nαῖ,plural,vocative,1st,feminine,regular,,2\r\nας,plural,accusative,1st,masculine,regular,primary,\r\nάς,plural,accusative,1st,masculine,regular,,\r\nᾶς,plural,accusative,1st,masculine,regular,,3\r\nανς,plural,accusative,1st,masculine,irregular,,\r\nαις,plural,accusative,1st,masculine,irregular,,\r\nαις,plural,dative,1st,masculine,regular,primary,\r\nαῖς,plural,dative,1st,masculine,regular,,\r\nῃσι,plural,dative,1st,masculine,irregular,,44\r\nῃσιν,plural,dative,1st,masculine,irregular,,4 44\r\nῃς,plural,dative,1st,masculine,irregular,,44\r\nαισι,plural,dative,1st,masculine,irregular,,44\r\nαισιν,plural,dative,1st,masculine,irregular,,4 44\r\nῶν,plural,genitive,1st,masculine,regular,primary,\r\nάων,plural,genitive,1st,masculine,irregular,,\r\nέων,plural,genitive,1st,masculine,irregular,,\r\nήων,plural,genitive,1st,masculine,irregular,,\r\nᾶν,plural,genitive,1st,masculine,irregular,,\r\nαι,plural,nominative,1st,masculine,regular,primary,\r\nαί,plural,nominative,1st,masculine,regular,,\r\nαῖ,plural,nominative,1st,masculine,regular,,3\r\nαι,plural,vocative,1st,masculine,regular,primary,\r\nαί,plural,vocative,1st,masculine,regular,,\r\nαῖ,plural,vocative,1st,masculine,regular,,3\r\nαν,singular,accusative,1st,feminine,regular,primary,\r\nην,singular,accusative,1st,feminine,regular,primary,\r\nήν,singular,accusative,1st,feminine,regular,,\r\nᾶν,singular,accusative,1st,feminine,regular,,2\r\nῆν,singular,accusative,1st,feminine,regular,,2\r\nάν,singular,accusative,1st,feminine,irregular,,63\r\nᾳ,singular,dative,1st,feminine,regular,primary,\r\nῃ,singular,dative,1st,feminine,regular,primary,\r\nῇ,singular,dative,1st,feminine,regular,,2\r\nᾷ,singular,dative,1st,feminine,regular,,2\r\nηφι,singular,dative,1st,feminine,irregular,,45\r\nηφιν,singular,dative,1st,feminine,irregular,,4 45\r\nῆφι,singular,dative,1st,feminine,irregular,,45\r\nῆφιv,singular,dative,1st,feminine,irregular,,4 45\r\nας,singular,genitive,1st,feminine,regular,primary,\r\nης,singular,genitive,1st,feminine,regular,primary,\r\nῆs,singular,genitive,1st,feminine,regular,,\r\nᾶs,singular,genitive,1st,feminine,regular,,2\r\nηφι,singular,genitive,1st,feminine,irregular,,45\r\nηφιν,singular,genitive,1st,feminine,irregular,,4 45\r\nῆφι,singular,genitive,1st,feminine,irregular,,45\r\nῆφιv,singular,genitive,1st,feminine,irregular,,4 45\r\nα,singular,nominative,1st,feminine,regular,primary,\r\nη,singular,nominative,1st,feminine,regular,primary,1\r\nή,singular,nominative,1st,feminine,regular,,\r\nᾶ,singular,nominative,1st,feminine,regular,,2\r\nῆ,singular,nominative,1st,feminine,regular,,2\r\nά,singular,nominative,1st,feminine,irregular,,63\r\nα,singular,vocative,1st,feminine,regular,primary,\r\nη,singular,vocative,1st,feminine,regular,primary,\r\nή,singular,vocative,1st,feminine,regular,,\r\nᾶ,singular,vocative,1st,feminine,regular,,2\r\nῆ,singular,vocative,1st,feminine,regular,,2\r\nά,singular,vocative,1st,feminine,irregular,,63\r\nαν,singular,accusative,1st,masculine,regular,primary,\r\nην,singular,accusative,1st,masculine,regular,primary,3\r\nήν,singular,accusative,1st,masculine,regular,,\r\nᾶν,singular,accusative,1st,masculine,regular,,3\r\nῆν,singular,accusative,1st,masculine,regular,,3\r\nεα,singular,accusative,1st,masculine,irregular,,\r\nᾳ,singular,dative,1st,masculine,regular,primary,\r\nῃ,singular,dative,1st,masculine,regular,primary,\r\nῇ,singular,dative,1st,masculine,regular,,\r\nᾷ,singular,dative,1st,masculine,regular,,3\r\nῆ,singular,dative,1st,masculine,regular,,3\r\nηφι,singular,dative,1st,masculine,irregular,,45\r\nηφιν,singular,dative,1st,masculine,irregular,,4 45\r\nῆφι,singular,dative,1st,masculine,irregular,,45\r\nῆφιv,singular,dative,1st,masculine,irregular,,4 45\r\nου,singular,genitive,1st,masculine,regular,primary,\r\nοῦ,singular,genitive,1st,masculine,regular,,\r\nαο,singular,genitive,1st,masculine,irregular,,\r\nεω,singular,genitive,1st,masculine,irregular,,\r\nηφι,singular,genitive,1st,masculine,irregular,,45\r\nηφιν,singular,genitive,1st,masculine,irregular,,4 45\r\nῆφι,singular,genitive,1st,masculine,irregular,,45\r\nῆφιv,singular,genitive,1st,masculine,irregular,,4 45\r\nω,singular,genitive,1st,masculine,irregular,,\r\nα,singular,genitive,1st,masculine,irregular,,\r\nας,singular,nominative,1st,masculine,regular,primary,\r\nης,singular,nominative,1st,masculine,regular,primary,\r\nής,singular,nominative,1st,masculine,regular,,\r\nᾶs,singular,nominative,1st,masculine,regular,,3\r\nῆs,singular,nominative,1st,masculine,regular,,3\r\nα,singular,vocative,1st,masculine,regular,primary,\r\nη,singular,vocative,1st,masculine,regular,primary,\r\nά,singular,vocative,1st,masculine,regular,,\r\nᾶ,singular,vocative,1st,masculine,regular,,3\r\nῆ,singular,vocative,1st,masculine,regular,,3\r\nω,dual,accusative,2nd,masculine feminine,regular,primary,\r\nώ,dual,accusative,2nd,masculine feminine,regular,,5\r\nοιν,dual,dative,2nd,masculine feminine,regular,primary,\r\nοῖν,dual,dative,2nd,masculine feminine,regular,,5\r\nοιιν,dual,dative,2nd,masculine feminine,irregular,,\r\nῴν,dual,dative,2nd,masculine feminine,irregular,,7\r\nοιν,dual,genitive,2nd,masculine feminine,regular,primary,\r\nοῖν,dual,genitive,2nd,masculine feminine,regular,,5\r\nοιιν,dual,genitive,2nd,masculine feminine,irregular,,\r\nῴν,dual,genitive,2nd,masculine feminine,irregular,,7\r\nω,dual,nominative,2nd,masculine feminine,regular,primary,60\r\nώ,dual,nominative,2nd,masculine feminine,regular,,60\r\nω,dual,vocative,2nd,masculine feminine,regular,primary,\r\nώ,dual,vocative,2nd,masculine feminine,regular,,5\r\nω,dual,accusative,2nd,neuter,regular,primary,\r\nώ,dual,accusative,2nd,neuter,regular,,6\r\nοιν,dual,dative,2nd,neuter,regular,primary,\r\nοῖν,dual,dative,2nd,neuter,regular,,6\r\nοιιν,dual,dative,2nd,neuter,irregular,,\r\nοιν,dual,genitive,2nd,neuter,regular,primary,\r\nοῖν,dual,genitive,2nd,neuter,regular,,6\r\nοιιν,dual,genitive,2nd,neuter,irregular,,\r\nω,dual,nominative,2nd,neuter,regular,primary,\r\nώ,dual,nominative,2nd,neuter,regular,,6\r\nω,dual,vocative,2nd,neuter,regular,primary,\r\nώ,dual,vocative,2nd,neuter,regular,,6\r\nους,plural,accusative,2nd,masculine feminine,regular,primary,\r\nούς,plural,accusative,2nd,masculine feminine,regular,,41\r\nοῦς,plural,accusative,2nd,masculine feminine,regular,,5\r\nονς,plural,accusative,2nd,masculine feminine,irregular,,\r\nος,plural,accusative,2nd,masculine feminine,irregular,,\r\nως,plural,accusative,2nd,masculine feminine,irregular,,\r\nοις,plural,accusative,2nd,masculine feminine,irregular,,\r\nώς,plural,accusative,2nd,masculine feminine,irregular,,7\r\nοις,plural,dative,2nd,masculine feminine,regular,primary,\r\nοῖς,plural,dative,2nd,masculine feminine,regular,,5\r\nοισι,plural,dative,2nd,masculine feminine,irregular,,\r\nοισιν,plural,dative,2nd,masculine feminine,irregular,,4\r\nῴς,plural,dative,2nd,masculine feminine,irregular,,7\r\nόφι,plural,dative,2nd,masculine feminine,irregular,,45\r\nόφιv,plural,dative,2nd,masculine feminine,irregular,,4 45\r\nων,plural,genitive,2nd,masculine feminine,regular,primary,\r\nῶν,plural,genitive,2nd,masculine feminine,regular,,5\r\nών,plural,genitive,2nd,masculine feminine,irregular,,7\r\nόφι,plural,genitive,2nd,masculine feminine,irregular,,45\r\nόφιv,plural,genitive,2nd,masculine feminine,irregular,,4 45\r\nοι,plural,nominative,2nd,masculine feminine,regular,primary,\r\nοί,plural,nominative,2nd,masculine feminine,regular,,41\r\nοῖ,plural,nominative,2nd,masculine feminine,regular,,5\r\nῴ,plural,nominative,2nd,masculine feminine,irregular,,7\r\nοι,plural,vocative,2nd,masculine feminine,regular,primary,\r\nοί,plural,vocative,2nd,masculine feminine,regular,,41\r\nοῖ,plural,vocative,2nd,masculine feminine,regular,,5\r\nα,plural,accusative,2nd,neuter,regular,primary,\r\nᾶ,plural,accusative,2nd,neuter,regular,,6\r\nοις,plural,dative,2nd,neuter,regular,primary,\r\nοῖς,plural,dative,2nd,neuter,regular,,6\r\nοισι,plural,dative,2nd,neuter,irregular,,\r\nοισιν,plural,dative,2nd,neuter,irregular,,4\r\nόφι,plural,dative,2nd,neuter,irregular,,45\r\nόφιv,plural,dative,2nd,neuter,irregular,,4 45\r\nων,plural,genitive,2nd,neuter,regular,primary,\r\nῶν,plural,genitive,2nd,neuter,regular,,6\r\nόφι,plural,genitive,2nd,neuter,irregular,,45\r\nόφιv,plural,genitive,2nd,neuter,irregular,,4 45\r\nα,plural,nominative,2nd,neuter,regular,primary,\r\nᾶ,plural,nominative,2nd,neuter,regular,,6\r\nα,plural,vocative,2nd,neuter,regular,primary,\r\nᾶ,plural,vocative,2nd,neuter,regular,,6\r\nον,singular,accusative,2nd,masculine feminine,regular,primary,\r\nόν,singular,accusative,2nd,masculine feminine,regular,primary,41\r\nουν,singular,accusative,2nd,masculine feminine,regular,,5\r\nοῦν,singular,accusative,2nd,masculine feminine,regular,,5\r\nω,singular,accusative,2nd,masculine feminine,irregular,,7 5\r\nωv,singular,accusative,2nd,masculine feminine,irregular,,7 59\r\nώ,singular,accusative,2nd,masculine feminine,irregular,,7 42 59\r\nών,singular,accusative,2nd,masculine feminine,irregular,,7 59\r\nῳ,singular,dative,2nd,masculine feminine,regular,primary,\r\nῷ,singular,dative,2nd,masculine feminine,regular,,5\r\nῴ,singular,dative,2nd,masculine feminine,irregular,,7\r\nόφι,singular,dative,2nd,masculine feminine,irregular,,45\r\nόφιv,singular,dative,2nd,masculine feminine,irregular,,4 45\r\nου,singular,genitive,2nd,masculine feminine,regular,primary,\r\nοῦ,singular,genitive,2nd,masculine feminine,regular,,5\r\nοιο,singular,genitive,2nd,masculine feminine,irregular,,\r\nοο,singular,genitive,2nd,masculine feminine,irregular,,\r\nω,singular,genitive,2nd,masculine feminine,irregular,,\r\nώ,singular,genitive,2nd,masculine feminine,irregular,,7\r\nόφι,singular,genitive,2nd,masculine feminine,irregular,,45\r\nόφιv,singular,genitive,2nd,masculine feminine,irregular,,4 45\r\nος,singular,nominative,2nd,masculine feminine,regular,primary,\r\nους,singular,nominative,2nd,masculine feminine,regular,,5\r\noῦς,singular,nominative,2nd,masculine feminine,regular,,5\r\nός,singular,nominative,2nd,masculine feminine,regular,,\r\nώς,singular,nominative,2nd,masculine feminine,irregular,,7 42\r\nως,singular,nominative,2nd,masculine feminine,irregular,,\r\nε,singular,vocative,2nd,masculine feminine,regular,primary,\r\nέ,singular,vocative,2nd,masculine feminine,regular,,\r\nοu,singular,vocative,2nd,masculine feminine,regular,,5\r\nοῦ,singular,vocative,2nd,masculine feminine,regular,,42\r\nός,singular,vocative,2nd,masculine feminine,irregular,,57\r\nον,singular,accusative,2nd,neuter,regular,primary,\r\nοῦν,singular,accusative,2nd,neuter,regular,,6\r\nῳ,singular,dative,2nd,neuter,regular,primary,\r\nῷ,singular,dative,2nd,neuter,regular,,6\r\nόφι,singular,dative,2nd,neuter,irregular,,45\r\nόφιv,singular,dative,2nd,neuter,irregular,,4 45\r\nου,singular,genitive,2nd,neuter,regular,primary,\r\nοῦ,singular,genitive,2nd,neuter,regular,,6\r\nοο,singular,genitive,2nd,neuter,irregular,,\r\nοιο,singular,genitive,2nd,neuter,irregular,,\r\nω,singular,genitive,2nd,neuter,irregular,,\r\nόφι,singular,genitive,2nd,neuter,irregular,,45\r\nόφιv,singular,genitive,2nd,neuter,irregular,,4 45\r\nον,singular,nominative,2nd,neuter,regular,primary,\r\nοῦν,singular,nominative,2nd,neuter,regular,,6\r\nον,singular,vocative,2nd,neuter,regular,primary,\r\nοῦν,singular,vocative,2nd,neuter,regular,,6\r\nε,dual,accusative,3rd,masculine feminine,regular,primary,\r\nει,dual,accusative,3rd,masculine feminine,regular,,\r\nῆ,dual,accusative,3rd,masculine feminine,regular,,18\r\nω,dual,accusative,3rd,masculine feminine,irregular,,32\r\nῖ,dual,accusative,3rd,masculine feminine,irregular,,33\r\nεε,dual,accusative,3rd,masculine feminine,irregular,,16 55 61\r\nοιν,dual,dative,3rd,masculine feminine,regular,primary,\r\nοῖν,dual,dative,3rd,masculine feminine,regular,,\r\nοιιν,dual,dative,3rd,masculine feminine,irregular,,54\r\nσι,dual,dative,3rd,masculine feminine,irregular,,33 37\r\nεσσι,dual,dative,3rd,masculine feminine,irregular,,33\r\nεσι,dual,dative,3rd,masculine feminine,irregular,,33\r\nέοιν,dual,dative,3rd,masculine feminine,irregular,,16 61\r\nῳν,dual,dative,3rd,masculine feminine,irregular,,49\r\nοιν,dual,genitive,3rd,masculine feminine,regular,primary,\r\nοῖν,dual,genitive,3rd,masculine feminine,regular,,\r\nοιιν,dual,genitive,3rd,masculine feminine,irregular,,54\r\nέοιν,dual,genitive,3rd,masculine feminine,irregular,,16 61\r\nῳν,dual,genitive,3rd,masculine feminine,irregular,,49\r\nε,dual,nominative,3rd,masculine feminine,regular,primary,\r\nει,dual,nominative,3rd,masculine feminine,regular,,\r\nῆ,dual,nominative,3rd,masculine feminine,regular,,18\r\nω,dual,nominative,3rd,masculine feminine,irregular,,32\r\nῖ,dual,nominative,3rd,masculine feminine,irregular,,33\r\nεε,dual,nominative,3rd,masculine feminine,irregular,,16 55 61\r\nε,dual,vocative,3rd,masculine feminine,regular,primary,\r\nει,dual,vocative,3rd,masculine feminine,regular,,\r\nῆ,dual,vocative,3rd,masculine feminine,regular,,18\r\nω,dual,vocative,3rd,masculine feminine,irregular,,32\r\nῖ,dual,vocative,3rd,masculine feminine,irregular,,33\r\nεε,dual,vocative,3rd,masculine feminine,irregular,,16 55 61\r\nε,dual,accusative,3rd,neuter,regular,primary,\r\nει,dual,accusative,3rd,neuter,regular,,\r\nα,dual,accusative,3rd,neuter,regular,,\r\nεε,dual,accusative,3rd,neuter,irregular,,16 61\r\nαε,dual,accusative,3rd,neuter,irregular,,16 61\r\nοιν,dual,dative,3rd,neuter,regular,primary,\r\nῷν,dual,dative,3rd,neuter,regular,,\r\nοις,dual,dative,3rd,neuter,irregular,,33 38\r\nοισι,dual,dative,3rd,neuter,irregular,,33 38\r\nοισι(ν),dual,dative,3rd,neuter,irregular,,4 33 38\r\nοιιν,dual,dative,3rd,neuter,irregular,,\r\nέοιν,dual,dative,3rd,neuter,irregular,,16 61\r\nάοιν,dual,dative,3rd,neuter,irregular,,16 61\r\nοιν,dual,genitive,3rd,neuter,regular,primary,\r\nῷν,dual,genitive,3rd,neuter,regular,,\r\nων,dual,genitive,3rd,neuter,irregular,,33 38\r\nοιιν,dual,genitive,3rd,neuter,irregular,,\r\nέοιν,dual,genitive,3rd,neuter,irregular,,16 61\r\nάοιν,dual,genitive,3rd,neuter,irregular,,16 61\r\nε,dual,nominative,3rd,neuter,regular,primary,\r\nει,dual,nominative,3rd,neuter,regular,,\r\nα,dual,nominative,3rd,neuter,regular,,\r\nεε,dual,nominative,3rd,neuter,irregular,,16 61\r\nαε,dual,nominative,3rd,neuter,irregular,,16 61\r\nε,dual,vocative,3rd,neuter,regular,primary,\r\nει,dual,vocative,3rd,neuter,regular,,\r\nα,dual,vocative,3rd,neuter,regular,,\r\nεε,dual,vocative,3rd,neuter,irregular,,16 61\r\nαε,dual,vocative,3rd,neuter,irregular,,16 61\r\nας,plural,accusative,3rd,masculine feminine,regular,primary,\r\nεις,plural,accusative,3rd,masculine feminine,regular,,17 41\r\nες,plural,accusative,3rd,masculine feminine,regular,,\r\nς,plural,accusative,3rd,masculine feminine,regular,,\r\nῦς,plural,accusative,3rd,masculine feminine,regular,,17 18 48\r\nως,plural,accusative,3rd,masculine feminine,regular,,30\r\nῆς,plural,accusative,3rd,masculine feminine,irregular,,56\r\nέας,plural,accusative,3rd,masculine feminine,irregular,,\r\nέος,plural,accusative,3rd,masculine feminine,irregular,,\r\nῆος,plural,accusative,3rd,masculine feminine,irregular,,\r\nῆες,plural,accusative,3rd,masculine feminine,irregular,,\r\nῆας,plural,accusative,3rd,masculine feminine,irregular,,\r\nους,plural,accusative,3rd,masculine feminine,irregular,,32\r\nούς,plural,accusative,3rd,masculine feminine,irregular,,32\r\nεῖς,plural,accusative,3rd,masculine feminine,irregular,,31 41\r\nεες,plural,accusative,3rd,masculine feminine,irregular,,55 61\r\nις,plural,accusative,3rd,masculine feminine,irregular,,\r\nινς,plural,accusative,3rd,masculine feminine,irregular,,\r\nῶς,plural,accusative,3rd,masculine feminine,irregular,,48\r\nσι,plural,dative,3rd,masculine feminine,regular,primary,\r\nσιν,plural,dative,3rd,masculine feminine,regular,primary,4\r\nσί,plural,dative,3rd,masculine feminine,regular,,41\r\nσίν,plural,dative,3rd,masculine feminine,regular,,4 41\r\nεσι,plural,dative,3rd,masculine feminine,regular,,41\r\nεσιν,plural,dative,3rd,masculine feminine,regular,,4 41\r\nέσι,plural,dative,3rd,masculine feminine,regular,,\r\nέσιν,plural,dative,3rd,masculine feminine,regular,,4\r\nψι,plural,dative,3rd,masculine feminine,regular,,\r\nψιν,plural,dative,3rd,masculine feminine,regular,,4\r\nψί,plural,dative,3rd,masculine feminine,regular,,\r\nψίν,plural,dative,3rd,masculine feminine,regular,,4\r\nξι,plural,dative,3rd,masculine feminine,regular,,\r\nξιν,plural,dative,3rd,masculine feminine,regular,,4\r\nξί,plural,dative,3rd,masculine feminine,regular,,\r\nξίν,plural,dative,3rd,masculine feminine,regular,,4\r\nφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nηφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nηφιv,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nῆφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nῆφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nόφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nόφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nαις,plural,dative,3rd,masculine feminine,irregular,,33 41\r\nοῖσι,plural,dative,3rd,masculine feminine,irregular,,33\r\nοῖσιv,plural,dative,3rd,masculine feminine,irregular,,4 33\r\nεσσι,plural,dative,3rd,masculine feminine,irregular,,16 61\r\nεσσιv,plural,dative,3rd,masculine feminine,irregular,,4 16 61\r\nυσσι,plural,dative,3rd,masculine feminine,irregular,,54\r\nυσσιv,plural,dative,3rd,masculine feminine,irregular,,4 54\r\nσσί,plural,dative,3rd,masculine feminine,irregular,,54\r\nσσίv,plural,dative,3rd,masculine feminine,irregular,,4 54\r\nων,plural,genitive,3rd,masculine feminine,regular,primary,\r\nῶν,plural,genitive,3rd,masculine feminine,regular,,\r\n-,plural,genitive,3rd,masculine feminine,irregular,,41\r\nφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nηφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nηφιv,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nῆφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nῆφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nόφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nόφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nέων,plural,genitive,3rd,masculine feminine,irregular,,16 61\r\nες,plural,nominative,3rd,masculine feminine,regular,primary,\r\nως,plural,nominative,3rd,masculine feminine,regular,,30\r\nεις,plural,nominative,3rd,masculine feminine,regular,,17\r\nεῖς,plural,nominative,3rd,masculine feminine,regular,,18\r\nοί,plural,nominative,3rd,masculine feminine,irregular,,32\r\nαί,plural,nominative,3rd,masculine feminine,irregular,,33\r\nῆς,plural,nominative,3rd,masculine feminine,irregular,,18\r\nῄς,plural,nominative,3rd,masculine feminine,irregular,,31 41\r\nεες,plural,nominative,3rd,masculine feminine,irregular,,16 55 61\r\nοι,plural,nominative,3rd,masculine feminine,irregular,,33\r\nες,plural,vocative,3rd,masculine feminine,regular,primary,\r\nεις,plural,vocative,3rd,masculine feminine,regular,,17\r\nεῖς,plural,vocative,3rd,masculine feminine,regular,,18\r\nῆς,plural,vocative,3rd,masculine feminine,regular,,18\r\nως,plural,vocative,3rd,masculine feminine,regular,,30\r\nεες,plural,vocative,3rd,masculine feminine,irregular,,16 55 61\r\nα,plural,accusative,3rd,neuter,regular,primary,\r\nη,plural,accusative,3rd,neuter,regular,,\r\nς,plural,accusative,3rd,neuter,regular,,\r\nά,plural,accusative,3rd,neuter,irregular,,33\r\nαα,plural,accusative,3rd,neuter,irregular,,16 61\r\nεα,plural,accusative,3rd,neuter,irregular,,16 61\r\nσι,plural,dative,3rd,neuter,regular,primary,\r\nσιν,plural,dative,3rd,neuter,regular,primary,4\r\nσί,plural,dative,3rd,neuter,regular,,\r\nσίv,plural,dative,3rd,neuter,regular,,4\r\nασι,plural,dative,3rd,neuter,regular,,\r\nασιν,plural,dative,3rd,neuter,regular,,4\r\nεσι,plural,dative,3rd,neuter,regular,,\r\nεσιν,plural,dative,3rd,neuter,regular,,4\r\nέσι,plural,dative,3rd,neuter,regular,,\r\nέσιv,plural,dative,3rd,neuter,regular,,4\r\nεσσι,plural,dative,3rd,neuter,irregular,,54\r\nεσσιν,plural,dative,3rd,neuter,irregular,,4 54\r\nσσί,plural,dative,3rd,neuter,irregular,,54\r\nσσίv,plural,dative,3rd,neuter,irregular,,4 54\r\nασσι,plural,dative,3rd,neuter,irregular,,54\r\nασσιν,plural,dative,3rd,neuter,irregular,,4 54\r\nφι,plural,dative,3rd,neuter,irregular,,45\r\nφιν,plural,dative,3rd,neuter,irregular,,4 45\r\nηφι,plural,dative,3rd,neuter,irregular,,45\r\nηφιv,plural,dative,3rd,neuter,irregular,,4 45\r\nῆφι,plural,dative,3rd,neuter,irregular,,45\r\nῆφιν,plural,dative,3rd,neuter,irregular,,4 45\r\nόφι,plural,dative,3rd,neuter,irregular,,45\r\nόφιν,plural,dative,3rd,neuter,irregular,,4 45\r\nων,plural,genitive,3rd,neuter,regular,primary,\r\nῶν,plural,genitive,3rd,neuter,regular,primary,\r\nφι,plural,genitive,3rd,neuter,irregular,,\r\nφιν,plural,genitive,3rd,neuter,irregular,,4 45\r\nηφι,plural,genitive,3rd,neuter,irregular,,45\r\nηφιv,plural,genitive,3rd,neuter,irregular,,4 45\r\nῆφι,plural,genitive,3rd,neuter,irregular,,45\r\nῆφιν,plural,genitive,3rd,neuter,irregular,,4 45\r\nόφι,plural,genitive,3rd,neuter,irregular,,45\r\nόφιν,plural,genitive,3rd,neuter,irregular,,4 45\r\nέων,plural,genitive,3rd,neuter,irregular,,16 61\r\nάων,plural,genitive,3rd,neuter,irregular,,16 61\r\nα,plural,nominative,3rd,neuter,regular,primary,\r\nη,plural,nominative,3rd,neuter,regular,,\r\nες,plural,nominative,3rd,neuter,regular,,\r\nά,plural,nominative,3rd,neuter,irregular,,33\r\nεα,plural,nominative,3rd,neuter,irregular,,16 61\r\nαα,plural,nominative,3rd,neuter,irregular,,16 61\r\nα,plural,vocative,3rd,neuter,regular,primary,\r\nη,plural,vocative,3rd,neuter,regular,,\r\nες,plural,vocative,3rd,neuter,regular,,\r\nαα,plural,vocative,3rd,neuter,irregular,,16 61\r\nεα,plural,vocative,3rd,neuter,irregular,,16 61\r\nα,singular,accusative,3rd,masculine feminine,regular,primary,\r\nη,singular,accusative,3rd,masculine feminine,regular,,16\r\nν,singular,accusative,3rd,masculine feminine,regular,,\r\nιν,singular,accusative,3rd,masculine feminine,regular,,41\r\nῦν,singular,accusative,3rd,masculine feminine,regular,,18\r\nῶ,singular,accusative,3rd,masculine feminine,regular,,23\r\nυν,singular,accusative,3rd,masculine feminine,regular,,\r\nῦν,singular,accusative,3rd,masculine feminine,regular,,17\r\nύν,singular,accusative,3rd,masculine feminine,regular,,17\r\nέα,singular,accusative,3rd,masculine feminine,regular,,20\r\nην,singular,accusative,3rd,masculine feminine,regular,,24\r\nώ,singular,accusative,3rd,masculine feminine,regular,,19 41\r\nω,singular,accusative,3rd,masculine feminine,regular,,23\r\nεῖν,singular,accusative,3rd,masculine feminine,irregular,,31 41\r\nων,singular,accusative,3rd,masculine feminine,irregular,,33 41 49\r\nαν,singular,accusative,3rd,masculine feminine,irregular,,33 41\r\nον,singular,accusative,3rd,masculine feminine,irregular,,39\r\nῖς,singular,accusative,3rd,masculine feminine,irregular,,33\r\nεα,singular,accusative,3rd,masculine feminine,irregular,,61\r\nι,singular,dative,3rd,masculine feminine,regular,primary,\r\nί,singular,dative,3rd,masculine feminine,regular,,\r\nϊ,singular,dative,3rd,masculine feminine,regular,,17\r\nΐ,singular,dative,3rd,masculine feminine,regular,,40\r\nει,singular,dative,3rd,masculine feminine,regular,,16 17\r\nεῖ,singular,dative,3rd,masculine feminine,regular,,18\r\nαι,singular,dative,3rd,masculine feminine,regular,,\r\noῖ,singular,dative,3rd,masculine feminine,regular,,28 41\r\nῖ,singular,dative,3rd,masculine feminine,irregular,,33 46\r\nῆι,singular,dative,3rd,masculine feminine,irregular,,18\r\nᾳ,singular,dative,3rd,masculine feminine,irregular,,25\r\nῳ,singular,dative,3rd,masculine feminine,irregular,,33 34\r\nῷ,singular,dative,3rd,masculine feminine,irregular,,33\r\nιί,singular,dative,3rd,masculine feminine,irregular,,62\r\nυί,singular,dative,3rd,masculine feminine,irregular,,62\r\nέϊ,singular,dative,3rd,masculine feminine,irregular,,18 61\r\nος,singular,genitive,3rd,masculine feminine,regular,primary,\r\nός,singular,genitive,3rd,masculine feminine,regular,,\r\nους,singular,genitive,3rd,masculine feminine,regular,,16\r\nοῦς,singular,genitive,3rd,masculine feminine,regular,,19 46\r\nως,singular,genitive,3rd,masculine feminine,regular,,17 18\r\nώς,singular,genitive,3rd,masculine feminine,regular,,17 18 41\r\nῶς,singular,genitive,3rd,masculine feminine,regular,,47\r\nεως,singular,genitive,3rd,masculine feminine,regular,,17\r\nέως,singular,genitive,3rd,masculine feminine,regular,,\r\nεώς,singular,genitive,3rd,masculine feminine,regular,,\r\nέους,singular,genitive,3rd,masculine feminine,regular,,20\r\nω,singular,genitive,3rd,masculine feminine,irregular,,\r\nεος,singular,genitive,3rd,masculine feminine,irregular,,61\r\nΰς,singular,genitive,3rd,masculine feminine,irregular,,41 48\r\nῦς,singular,genitive,3rd,masculine feminine,irregular,,48\r\nνος,singular,genitive,3rd,masculine feminine,irregular,,22\r\nοῦ,singular,genitive,3rd,masculine feminine,irregular,,33\r\nηος,singular,genitive,3rd,masculine feminine,irregular,,55\r\nιός,singular,genitive,3rd,masculine feminine,irregular,,62\r\nuός,singular,genitive,3rd,masculine feminine,irregular,,62\r\nς,singular,nominative,3rd,masculine feminine,regular,primary,\r\n-,singular,nominative,3rd,masculine feminine,regular,primary,\r\nηρ,singular,nominative,3rd,masculine feminine,regular,,41\r\nις,singular,nominative,3rd,masculine feminine,regular,,\r\nϊς,singular,nominative,3rd,masculine feminine,regular,,\r\nώ,singular,nominative,3rd,masculine feminine,regular,,41\r\nψ,singular,nominative,3rd,masculine feminine,regular,,\r\nξ,singular,nominative,3rd,masculine feminine,regular,,\r\nρ,singular,nominative,3rd,masculine feminine,regular,,\r\nήρ,singular,nominative,3rd,masculine feminine,regular,,\r\nήν,singular,nominative,3rd,masculine feminine,regular,,50\r\nν,singular,nominative,3rd,masculine feminine,regular,,\r\nωρ,singular,nominative,3rd,masculine feminine,regular,,\r\nων,singular,nominative,3rd,masculine feminine,regular,,\r\nών,singular,nominative,3rd,masculine feminine,regular,,\r\nης,singular,nominative,3rd,masculine feminine,regular,,\r\nῆς,singular,nominative,3rd,masculine feminine,regular,,\r\nυς,singular,nominative,3rd,masculine feminine,regular,,\r\nῦς,singular,nominative,3rd,masculine feminine,regular,,\r\nεῦς,singular,nominative,3rd,masculine feminine,regular,,\r\nύς,singular,nominative,3rd,masculine feminine,regular,,\r\nής,singular,nominative,3rd,masculine feminine,regular,,33\r\nας,singular,nominative,3rd,masculine feminine,irregular,,\r\nῴ,singular,nominative,3rd,masculine feminine,irregular,,29 41\r\nώς,singular,nominative,3rd,masculine feminine,irregular,,27 41\r\nϋς,singular,nominative,3rd,masculine feminine,irregular,,41\r\nῄς,singular,nominative,3rd,masculine feminine,irregular,,31 41\r\nῖς,singular,nominative,3rd,masculine feminine,irregular,,\r\nεῖς,singular,nominative,3rd,masculine feminine,irregular,,31 41\r\nῶς,singular,nominative,3rd,masculine feminine,irregular,,48\r\nος,singular,nominative,3rd,masculine feminine,irregular,,33\r\n-,singular,vocative,3rd,masculine feminine,regular,primary,52\r\nς,singular,vocative,3rd,masculine feminine,regular,,30\r\nι,singular,vocative,3rd,masculine feminine,regular,,41\r\nῦ,singular,vocative,3rd,masculine feminine,regular,,15 17 18\r\nοῖ,singular,vocative,3rd,masculine feminine,regular,,19 41\r\nψ,singular,vocative,3rd,masculine feminine,regular,,\r\nξ,singular,vocative,3rd,masculine feminine,regular,,\r\nν,singular,vocative,3rd,masculine feminine,regular,,\r\nρ,singular,vocative,3rd,masculine feminine,regular,,\r\nων,singular,vocative,3rd,masculine feminine,regular,,50\r\nών,singular,vocative,3rd,masculine feminine,regular,,\r\nήν,singular,vocative,3rd,masculine feminine,regular,,\r\nερ,singular,vocative,3rd,masculine feminine,regular,,\r\nες,singular,vocative,3rd,masculine feminine,regular,,\r\nί,singular,vocative,3rd,masculine feminine,regular,,\r\nως,singular,vocative,3rd,masculine feminine,regular,,\r\nἶ,singular,vocative,3rd,masculine feminine,regular,,\r\nούς,singular,vocative,3rd,masculine feminine,regular,,51\r\nύ,singular,vocative,3rd,masculine feminine,regular,,15\r\nυ,singular,vocative,3rd,masculine feminine,regular,,51\r\nεις,singular,vocative,3rd,masculine feminine,regular,,20\r\nαν,singular,vocative,3rd,masculine feminine,regular,,\r\nώς,singular,vocative,3rd,masculine feminine,irregular,,27 41 46\r\nον,singular,vocative,3rd,masculine feminine,irregular,,\r\nυς,singular,vocative,3rd,masculine feminine,irregular,,33\r\nα,singular,accusative,3rd,neuter,regular,primary,15\r\n-,singular,accusative,3rd,neuter,regular,,33\r\nος,singular,accusative,3rd,neuter,regular,,\r\nας,singular,accusative,3rd,neuter,regular,,\r\nαρ,singular,accusative,3rd,neuter,regular,,21\r\nυ,singular,accusative,3rd,neuter,regular,,\r\nι,singular,dative,3rd,neuter,regular,primary,\r\nει,singular,dative,3rd,neuter,regular,,16\r\nαι,singular,dative,3rd,neuter,regular,,16 21\r\nϊ,singular,dative,3rd,neuter,irregular,,17\r\nᾳ,singular,dative,3rd,neuter,irregular,,25 33\r\nυϊ,singular,dative,3rd,neuter,irregular,,17\r\nαϊ,singular,dative,3rd,neuter,irregular,,21 61\r\nος,singular,genitive,3rd,neuter,regular,primary,\r\nους,singular,genitive,3rd,neuter,regular,,16\r\nως,singular,genitive,3rd,neuter,regular,,16\r\nεως,singular,genitive,3rd,neuter,regular,,17\r\nυς,singular,genitive,3rd,neuter,irregular,,26\r\nου,singular,genitive,3rd,neuter,irregular,,33\r\nαος,singular,genitive,3rd,neuter,irregular,,21 61\r\nα,singular,nominative,3rd,neuter,regular,primary,\r\n-,singular,nominative,3rd,neuter,regular,,33\r\nος,singular,nominative,3rd,neuter,regular,,\r\nαρ,singular,nominative,3rd,neuter,regular,,\r\nας,singular,nominative,3rd,neuter,regular,,16 21\r\nυ,singular,nominative,3rd,neuter,regular,,\r\nον,singular,nominative,3rd,neuter,irregular,,33\r\nα,singular,vocative,3rd,neuter,regular,primary,15\r\n-,singular,vocative,3rd,neuter,regular,,\r\nος,singular,vocative,3rd,neuter,regular,,\r\nας,singular,vocative,3rd,neuter,regular,,\r\nαρ,singular,vocative,3rd,neuter,regular,,21\r\nυ,singular,vocative,3rd,neuter,regular,,";

var nounFootnotesCSV$1 = "Index,Text\r\n1,See  for Rules of variance within regular endings\r\n2,See  for Table of α- and ε- stem feminine 1st declension contracts\r\n3,See  for Table of α- and ε- stem masculine 1st declension contracts\r\n4,\"Previous, with (ν)\"\r\n5,See  for Table of o- and ε- stem masculine  2nd declension contracts\r\n6,See  for Table of o- and ε- stem neuter 2nd declension contracts\r\n7,(Attic) contracts of o-stems preceded by a long vowel\r\n15,\"This is not actually an “ending,” but the last letter of the “pure stem”. See\"\r\n16,\"See  &  for Table of Sigma (ες,ας,ος) stem contracts\"\r\n17,See  for Table of  ι and υ - stem contracts\r\n18,\"See  for Table of  ευ,αυ,and ου - stem contracts\"\r\n19,See  for stems in οι feminine 3rd declension contracts\r\n20,See  for Table of 3rd declension contracts of stems in -εσ- preceded by ε\r\n21,See  for Table of stems in τ and ατ neuter 3rd declension contracts\r\n22,\"On stem ending in ν, ν doubled in gen. Sing Aeolic (e.g. μῆνς,μῆννος...)\"\r\n23,Also in inscriptions and expressions of swearing\r\n24,(Borrowed from 1st decl) Sometimes in proper names whose nominative ends in -ης\r\n25,From -ας-stems (properly αι)\r\n26,(ε)υς instead of (ε)ος or ους (gen) for (3rd decl) words whose nominative ends in -ος\r\n27,In 3rd decl. Only in the words αἰδώς (Attic) and ἠώς (Homer and Ionic)\r\n28,Contraction of a stem in οι  and an ι-ending\r\n29,Stronger form of Ionic contractions of οι-stems (in the nominative)\r\n30,See  for Table of ω - stem contracts (masculine only)\r\n31,Nominative plural contraction of  -ειδ+ες  after dropping the δ (used for accusative too). See .a\r\n32,\"Plurals & duals occur rarely (and w/ 2nd decl endings) for 3rd decl οι-stem nouns. See .D.a,b,c\"\r\n33,See  for description and examples of Irreg. Decl involving 3rd decl endings\r\n34,(Homer)  for Attic  (ῳτ)ι\r\n35,(Homer) for Cretan ινς\r\n36,Also an irregular ending for other stem(s)\r\n37,In inscriptions\r\n38,\"Plural endings for otherwise dual noun,οσσε (eyes)\"\r\n39,\"“Poetical” (acc for ἔρως). See ,11\"\r\n40,\"Poetic for χρωτι,dat. of ὁ χρως\"\r\n41,No Masculine of this Form\r\n42,No Feminine of this Form\r\n44,See  D.9 and #215 regarding dialectic alternate forms of the Dative Plural\r\n45,\"Surviving in Homer (See ) Not truly genitive or dative, but instrumental/locative/ablative, associated with the remaining oblique cases (genitive & dative) only after being lost as cases themselves in Greek\"\r\n46,See Smyth # 266 for only surviving ος-stem in Attic (fem. singular of αἰδως)\r\n47,See  for Substantives in -εύς preceded by a vowel.\r\n48,\"See Smyth,  #275 D.1,2,3\"\r\n49,\"See , List of Principal Irregular Substantives\"\r\n50,\"See  for Table of stems in a Liquid (λ,ρ) or a Nasal (ν), and Note #259D for variants including Κρονίων...\"\r\n51,\"See  for Table of stems in a Dental (τ,δ,θ) or a Nasal (ν), and its notes including Ν.κόρυς (Voc. Κόρυ) & ὀδούς\"\r\n52,See  for general rule re 3rd Declension Masc/Fem Singular Vocative\r\n54,See  D\r\n55,See\r\n56,\"See  for other forms of endings for contracts of ευ,αυ,and ου - stems\"\r\n57,Nominative form used as Vocative. See\r\n58,\"See ,b\"\r\n59,\"See ,d\"\r\n60,This (Feminine or Masculine) Form only Masculine when derived from ε- or ο- contraction\r\n61,See Smyth Note 264 D.1 regarding Homer's use of Open Forms\r\n62,See Smyth Note 269 for alternate i-stem and u-stem endings\r\n63,See  D.2\r\n64,See  D.1";

/*
 * Latin language data module
 */
/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */
// A language of this module
const language$1 = languages.greek;
// Create a language data set that will keep all language-related information
let dataSet$1 = new LanguageDataset(language$1);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName$1 = 'csv';
const parts = new FeatureType(Feature.types.part, ['noun', 'adjective', 'verb'], language$1);
const numbers = new FeatureType(Feature.types.number, ['singular', 'dual', 'plural'], language$1);
numbers.addImporter(importerName$1)
    .map('singular', numbers.singular)
    .map('dual', numbers.dual)
    .map('plural', numbers.plural);
const cases = new FeatureType(Feature.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'vocative'], language$1);
cases.addImporter(importerName$1)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('vocative', cases.vocative);
const declensions = new FeatureType(Feature.types.declension, ['first', 'second', 'third'], language$1);
declensions.addImporter(importerName$1)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('3rd', declensions.third);
const genders = new FeatureType(Feature.types.gender, ['masculine', 'feminine', 'neuter'], language$1);
genders.addImporter(importerName$1)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types$1 = new FeatureType(Feature.types.type, ['regular', 'irregular'], language$1);
types$1.addImporter(importerName$1)
    .map('regular', types$1.regular)
    .map('irregular', types$1.irregular);
/*
const conjugations = new Models.FeatureType(Lib.types.conjugation, ['first', 'second', 'third', 'fourth']);
conjugations.addImporter(importerName)
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);
const tenses = new Models.FeatureType(Lib.types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect']);
tenses.addImporter(importerName)
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);
const voices = new Models.FeatureType(Lib.types.voice, ['passive', 'active'],language);
voices.addImporter(importerName)
    .map('passive', voices.passive)
    .map('active', voices.active);
const moods = new Models.FeatureType(Lib.types.mood, ['indicative', 'subjunctive']);
moods.addImporter(importerName)
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);
const persons = new Models.FeatureType(Lib.types.person, ['first', 'second', 'third']);
persons.addImporter(importerName)
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third); */
const footnotes$1 = new FeatureType(Feature.types.footnote, [], {});

// endregion Definition of grammatical features

// For noun and adjectives
dataSet$1.addSuffixes = function (partOfSpeech, data) {
  // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let dataItem = data[i];
    let suffixValue = dataItem[0];
    // Handle special suffix values
    if (suffixValue === noSuffixValue) {
      suffixValue = null;
    }

    let primary = false;
    let features = [partOfSpeech,
      numbers.importer.csv.get(dataItem[1]),
      cases.importer.csv.get(dataItem[2]),
      declensions.importer.csv.get(dataItem[3]),
      genders.importer.csv.get(dataItem[4]),
      types$1.importer.csv.get(dataItem[5])];
    if (dataItem[6] === 'primary') {
      primary = true;
    }
    if (dataItem[7]) {
      // There can be multiple footnote indexes separated by spaces
      let indexes = dataItem[7].split(' ').map(function (index) {
        return footnotes$1.get(index)
      });
      features.push(...indexes);
    }
    let extendedGreekData = new ExtendedGreekData();
    extendedGreekData.primary = primary;
    let extendedLangData = {
      [languages.greek]: extendedGreekData
    };
    this.addSuffix(suffixValue, features, extendedLangData);
  }
};

// For verbs
dataSet$1.addVerbSuffixes = function (partOfSpeech, data) {
  // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
    // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech
      /*
      conjugations.importer.csv.get(data[i][1]),
      voices.importer.csv.get(data[i][2]),
      moods.importer.csv.get(data[i][3]),
      tenses.importer.csv.get(data[i][4]),
      numbers.importer.csv.get(data[i][5]),
      persons.importer.csv.get(data[i][6]) */
    ];

    let grammarType = data[i][7];
    // Type information can be empty if no ending is provided
    if (grammarType) {
      features.push(types$1.importer.csv.get(grammarType));
    }
    // Footnotes
    if (data[i][8]) {
      // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][8].split(' ').map(function (index) {
        return footnotes$1.get(index)
      });
      features.push(...indexes);
    }
    this.addSuffix(suffix, features);
  }
};

dataSet$1.addFootnotes = function (partOfSpeech, data) {
  // First row are headers
  for (let i = 1; i < data.length; i++) {
    this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
  }
};

dataSet$1.loadData = function () {
  // Nouns
  let partOfSpeech = parts.noun;
  let suffixes = papaparse.parse(nounSuffixesCSV$1, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  let footnotes = papaparse.parse(nounFootnotesCSV$1, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

  // Adjectives
  /* partOfSpeech = parts.adjective;
  suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data); */

  // Verbs
  /* partOfSpeech = parts.verb;
  suffixes = papaparse.parse(verbSuffixesCSV, {});
  this.addVerbSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(verbFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data); */
};

/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - A suffix to be matched with inflections.
 * @returns {Suffix | null} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns null.
 */
dataSet$1.matcher = function (inflections, suffix) {
  'use strict';
    // All of those features must match between an inflection and an ending
  let obligatoryMatches = [Feature.types.part];

    // Any of those features must match between an inflection and an ending
  let optionalMatches = [Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number];
  let bestMatchData = null; // Information about the best match we would be able to find

  /*
   There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
   But there could be multiple partial matches. So we should try to find the best match possible and return it.
   A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
   */
  for (let inflection of inflections) {
    let matchData = new MatchData(); // Create a match profile

    if (inflection.suffix === suffix.value) {
      matchData.suffixMatch = true;
    }

    // Check obligatory matches
    for (let feature of obligatoryMatches) {
      let featureMatch = suffix.featureMatch(feature, inflection[feature]);
      // matchFound = matchFound && featureMatch;

      if (!featureMatch) {
        // If an obligatory match is not found, there is no reason to check other items
        break
      }
      // Inflection's value of this feature is matching the one of the suffix
      matchData.matchedFeatures.push(feature);
    }

    if (matchData.matchedFeatures.length < obligatoryMatches.length) {
      // Not all obligatory matches are found, this is not a match
      break
    }

    // Check optional matches now
    for (let feature of optionalMatches) {
      let matchedValue = suffix.featureMatch(feature, inflection[feature]);
      if (matchedValue) {
        matchData.matchedFeatures.push(feature);
      }
    }

    if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
      // This is a full match
      matchData.fullMatch = true;

      // There can be only one full match, no need to search any further
      suffix.match = matchData;
      return suffix
    }
    bestMatchData = this.bestMatch(bestMatchData, matchData);
  }
  if (bestMatchData) {
    // There is some match found
    suffix.match = bestMatchData;
    return suffix
  }
  return null
};

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet$1.bestMatch = function (matchA, matchB) {
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
};

export { InflectionData, LanguageData, dataSet as LatinDataSet, dataSet$1 as GreekDataSet };
