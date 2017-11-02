/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Feature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FeatureList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FeatureType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Importer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return languages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return types; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Homonym; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return Lexeme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return Lemma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return Inflection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return LanguageDataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return LanguageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return Suffix; });
/* unused harmony export Footnote */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return MatchData; });
/* unused harmony export ExtendedLanguageData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExtendedGreekData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return SelectedWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return WordData; });
/* unused harmony export loadData */
/**
 * Shared data structures and functions
 */



// Should have no spaces in values in order to be used in HTML templates
const types = {
    word: 'word',
    part: 'part of speech', // Part of speech
    number: 'number',
    grmCase: 'case',
    declension: 'declension',
    gender: 'gender',
    type: 'type',
    conjugation: 'conjugation',
    tense: 'tense',
    voice: 'voice',
    mood: 'mood',
    person: 'person',
    frequency: 'frequency', // How frequent this word is
    meaning: 'meaning', // Meaning of a word
    source: 'source', // Source of word definition
    footnote: 'footnote', // A footnote for a word's ending
    isAllowed(value) {
        return Object.values(this).includes(value);
    }
};

const languages = {
    type: 'language',
    latin: 'latin',
    greek: 'greek',
    isAllowed(language) {
        if (language === this.type) {
            return false;
        }
        else {
            return Object.values(this).includes(language);
        }
    }
};

/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature {

    /**
     * Initializes a Feature object
     * @param {string | string[]} value - A single feature value or, if this feature could have multiple
     * values, an array of values.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string} language - A language of a feature, allowed values are specified in 'languages' object.
     */
    constructor (value, type, language) {
        if (!types.isAllowed(type)) {
            throw new Error('Features of "' + type + '" type are not supported.');
        }
        if (!languages.isAllowed(language)) {
            throw new Error('Language "' + language + '" is not supported.');
        }
        if (!value) {
            throw new Error('Feature should have a non-empty value.');
        }
        this.value = value;
        this.type = type;
        this.language = language;
    };

    isEqual(feature) {
        if (Array.isArray(feature.value)) {
            if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
                return false;
            }
            let equal = this.type===feature.type && this.language===feature.language;
            equal = equal && this.value.every(function(element, index) {
                return element === feature.value[index];
            });
            return equal;
        }
        else {
            return this.value===feature.value && this.type===feature.type && this.language===feature.language;   
        }
    }
}

/**
 * Definition class for a (grammatical) feature. Stores type information and (optionally) all possible values of the feature.
 * It serves as a feature generator. If list of possible values is provided, it can generate a Feature object
 * each time a property that corresponds to a feature value is accessed. If no list of possible values provided,
 * a Feature object can be generated with get(value) method.
 *
 * An order of values determines a default sort and grouping order. If two values should have the same order,
 * they should be grouped within an array: value1, [value2, value3], value4. Here 'value2' and 'value3' have
 * the same priority for sorting and grouping.
 */
class FeatureType {
    // TODO: value checking
    /**
     * Creates and initializes a Feature Type object.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string[] | string[][]} values - A list of allowed values for this feature type.
     * If an empty array is provided, there will be no
     * allowed values as well as no ordering (can be used for items that do not need or have a simple order,
     * such as footnotes).
     * @param {string} language - A language of a feature, allowed values are specified in 'languages' object.
     */
    constructor(type, values, language) {
        if (!types.isAllowed(type)) {
            throw new Error('Features of "' + type + '" type are not supported.');
        }
        if (!languages.isAllowed(language)) {
            throw new Error('Language "' + language + '" is not supported.');
        }
        if (!values || !Array.isArray(values)) {
            throw new Error('Values should be an array (or an empty array) of values.');
        }

        this.type = type;
        this.language = language;

        /*
         This is a sort order index for a grammatical feature values. It is determined by the order of values in
         a 'values' array.
         */
        this._orderIndex = [];
        this._orderLookup = {};

        for (const [index, value] of values.entries()) {
            this._orderIndex.push(value);
            if (Array.isArray(value)) {
                for (let element of value) {
                    this[element] = new Feature(element, this.type, this.language);
                    this._orderLookup[element] = index;
                }
            }
            else {
                this[value] = new Feature(value, this.type, this.language);
                this._orderLookup[value] = index;
            }
        }
    };

    /**
     * Return a Feature with an arbitrary value. This value would not be necessarily present among FeatureType values.
     * This can be especially useful for features that do not set: a list of predefined values, such as footnotes.
     * @param value
     * @returns {Feature}
     */
    get(value) {
        if (value) {
            return new Feature(value, this.type, this.language);
        }
        else {
            throw new Error('A non-empty value should be provided.');
        }

    }

    /**
     * Creates and returns a new importer with a specific name. If an importer with this name already exists,
     * an existing Importer object will be returned.
     * @param {string} name - A name of an importer object
     * @returns {Importer} A new or existing Importer object that matches a name provided
     */
    addImporter(name) {
        if (!name) {
            throw new Error('Importer should have a non-empty name.');
        }
        this.importer = this.importer || {};
        this.importer[name] = this.importer[name] || new Importer();
        return this.importer[name];
    }

    /**
     * Return copies of all feature values as Feature objects in a sorted array, according to feature type's sort order.
     * For a similar function that returns strings instead of Feature objects see orderedValues().
     * @returns {Feature[] | Feature[][]} Array of feature values sorted according to orderIndex.
     * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
     * an array of Feature objects will be returned instead of a single Feature object, as for single feature values.
     */
    get orderedFeatures() {
        return this.orderedValues.map((value) => new Feature(value, this.type, this.language));
    }

    /**
     * Return all feature values as strings in a sorted array, according to feature type's sort order.
     * This is a main method that specifies a sort order of the feature type. orderedFeatures() relies
     * on this method in providing a sorted array of feature values. If you want to create
     * a custom sort order for a particular feature type that will depend on some options that are not type-related,
     * create a wrapper around this function providing it with options arguments so it will be able to decide
     * in what order those features will be based on those arguments.
     * For a similar function that returns Feature objects instead of strings see orderedValues().
     * @returns {string[]} Array of feature values sorted according to orderIndex.
     * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
     * an array of strings will be returned instead of a single strings, as for single feature values.
     */
    get orderedValues() {
        return this._orderIndex;
    }

    /**
     * Returns a lookup table for type values as:
     *  {value1: order1, value2: order2}, where order is a sort order of an item. If two items have the same sort order,
     *  their order value will be the same.
     * @returns {object}
     */
    get orderLookup() {
        return this._orderLookup;
    }

    /**
     * Sets an order of grammatical feature values for a grammatical feature. Used mostly for sorting, filtering,
     * and displaying.
     *
     * @param {Feature[] | Feature[][]} values - a list of grammatical features that specify their order for
     * sorting and filtering. Some features can be grouped as [[genders.masculine, genders.feminine], LibLatin.genders.neuter].
     * It means that genders.masculine and genders.feminine belong to the same group. They will have the same index
     * and will be stored inside an _orderIndex as an array. genders.masculine and genders.feminine will be grouped together
     * during filtering and will be in the same bin during sorting.
     *
     */
    set order(values) {
        if (!values || (Array.isArray(values) && values.length === 0)) {
            throw new Error("A non-empty list of values should be provided.");
        }

        // If a single value is provided, convert it into an array
        if (!Array.isArray(values)) {
            values = [values];
        }

        for (let value of values) {
            if (Array.isArray(value)) {
                for (let element of value) {
                    if (!this.hasOwnProperty(element.value)) {
                        throw new Error('Trying to order an element with "' + element.value + '" value that is not stored in a "' + this.type + '" type.');
                    }
                    
                    if (element.type !== this.type) {
                        throw new Error('Trying to order an element with type "' + element.type + '" that is different from "' + this.type + '".')
                    }

                    if (element.language !== this.language) {
                        throw new Error('Trying to order an element with language "' + element.language + '" that is different from "' + this.language + '".')
                    }
                }
            }
            else {
                if (!this.hasOwnProperty(value.value)) {
                    throw new Error('Trying to order an element with "' + value.value + '" value that is not stored in a "' + this.type + '" type.');
                }

                if (value.type !== this.type) {
                    throw new Error('Trying to order an element with type "' + value.type + '" that is different from "' + this.type + '".')
                }

                if (value.language !== this.language) {
                    throw new Error('Trying to order an element with language "' + value.language + '" that is different from "' + this.language + '".')
                }
            }
        }

        // Erase whatever sort order was set previously
        this._orderLookup = {};
        this._orderIndex = [];

        // Define a new sort order
        for (const [index, element] of values.entries()) {

            if (Array.isArray(element)) {
                // If it is an array, all values should have the same order
                let elements = [];
                for (const subElement of element) {
                    this._orderLookup[subElement.value] = index;
                    elements.push(subElement.value);
                }
                this._orderIndex[index] = elements;
            }
            else {
                // If is a single value
                this._orderLookup[element.value] = index;
                this._orderIndex[index] = element.value;
            }
        }
    }
}


/**
 * A list of grammatical features that characterizes a language unit. Has some additional service methods,
 * compared with standard storage objects.
 */
class FeatureList {

    /**
     * Initializes a feature list.
     * @param {FeatureType[]} features - Features that build the list (optional, can be set later).
     */
    constructor(features = []) {
        this._features = [];
        this._types = {};
        this.add(features);
    }

    add(features) {
        if (!features || !Array.isArray(features)) {
            throw new Error('Features must be defined and must come in an array.');
        }

        for (let feature of features) {
            this._features.push(feature);
            this._types[feature.type] = feature;
        }
    }


    /**
     * Returns an array of grouping features.
     * @returns {FeatureType[]} - An array of grouping features.
     */
    get items() {
        return this._features;
    }

    forEach(callback) {
        this._features.forEach(callback);
    }

    /**
     * Returns a feature of a particular type. If such feature does not exist in a list, returns undefined.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
     */
    ofType(type) {
        if (this.hasType(type)) {
            return this._types[type];
        }
    }

    /**
     * Checks whether a feature list has a feature of a specific type.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {boolean} Whether a feature list has a feature of a particular type.
     */
    hasType(type) {
        return this._types.hasOwnProperty(type);
    }
}


/**
 * This is a hash table that maps values to be imported from an external file or service to library standard values.
 */
class Importer {
    constructor() {
        this.hash = {};
        return this;
    }

    /**
     * Sets mapping between external imported value and one or more library standard values. If an importedValue
     * is already in a hash table, old libraryValue will be overwritten with the new one.
     * @param {string} importedValue - External value
     * @param {Object | Object[] | string | string[]} libraryValue - Library standard value
     */
    map(importedValue, libraryValue) {
        if (!importedValue) {
            throw new Error('Imported value should not be empty.')
        }

        if (!libraryValue) {
            throw new Error('Library value should not be empty.')
        }

        this.hash[importedValue] = libraryValue;
        return this;
    }

    /**
     * Checks if value is in a map.
     * @param {string} importedValue - A value to test.
     * @returns {boolean} - Tru if value is in a map, false otherwise.
     */
    has(importedValue) {
        return this.hash.hasOwnProperty(importedValue);
    }

    /**
     * Returns one or more library standard values that match an external value
     * @param {string} importedValue - External value
     * @returns {Object | string} One or more of library standard values
     */
    get(importedValue) {
        if (this.has(importedValue)) {
            return this.hash[importedValue];
        }
        else {
            throw new Error('A value "' + importedValue + '" is not found in the importer.');
        }
    }
}

/*
 Hierarchical structure of return value of a morphological analyzer:

 Homonym (a group of words that are written the same way, https://en.wikipedia.org/wiki/Homonym)
    Lexeme 1 (a unit of lexical meaning, https://en.wikipedia.org/wiki/Lexeme)
        Have a lemma and one or more inflections
        Lemma (also called a headword, a canonical form of a group of words https://en.wikipedia.org/wiki/Lemma_(morphology) )
        Inflection 1
            Stem
            Suffix (also called ending)
        Inflection 2
            Stem
            Suffix
    Lexeme 2
        Lemma
        Inflection 1
            Stem
            Suffix
 */

/**
 * Represents an inflection of a word
 */
class Inflection {

    /**
     * Initializes an Inflection object.
     * @param {string} stem - A stem of a word.
     * @param {string} language - A word's language.
     */
    constructor(stem, language) {

        if (!stem) {
            throw new Error('Stem should not be empty.');
        }

        if (!language) {
            throw new Error('Langauge should not be empty.');
        }

        if (!languages.isAllowed(language)) {
            throw new Error('Language "' + language + '" is not supported.');
        }

        this.stem = stem;
        this.language = language;

        // Suffix may not be present in every word. If missing, it will set to null.
        this.suffix = null;
    }

    static readObject(jsonObject) {
        let inflection = new Inflection(jsonObject.stem, jsonObject.language);
        if (jsonObject.suffix) {
            inflection.suffix = jsonObject.suffix;
        }
        return inflection;
    }

    /**
     * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
     * an array of Feature objects will be provided.
     * Values are taken from features and stored in a 'feature.type' property as an array of values.
     * @param {Feature | Feature[]} data
     */
    set feature(data) {
        if (!data) {
            throw new Error('Inflection feature data cannot be empty.');
        }

        if (!Array.isArray(data)) {
            data = [data];
        }

        let type = data[0].type;
        this[type] = [];
        for (let element of data) {
            if (!(element instanceof Feature)) {
                throw new Error('Inflection feature data must be a Feature object.');
            }

            if (element.language !== this.language) {
                throw new Error('Language "' + element.language + '" of a feature does not match a language "'
                + this.language + '" of an Inflection object.');
            }

            this[type].push(element.value);
        }
    }
}

/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
    /**
     * Initializes a Lemma object.
     * @param {string} word - A word.
     * @param {string} language - A language of a word.
     */
    constructor(word, language) {

        if (!word) {
            throw new Error('Word should not be empty.');
        }

        if (!language) {
            throw new Error('Langauge should not be empty.');
        }

        if (!languages.isAllowed(language)) {
            throw new Error('Language "' + language + '" is not supported.');
        }

        this.word = word;
        this.language = language;
    }

    static readObject(jsonObject) {
        return new Lemma(jsonObject.word, jsonObject.language);
    }
}

/**
 * A basic unit of lexical meaning. Contains a Lemma object and one or more Inflection objects.
 */
class Lexeme {
    /**
     * Initializes a Lexeme object.
     * @param {Lemma} lemma - A lemma object.
     * @param {Inflection[]} inflections - An array of inflections.
     */
    constructor(lemma, inflections) {
        if (!lemma) {
            throw new Error('Lemma should not be empty.');
        }

        if (!(lemma instanceof Lemma)) {
            throw new Error('Lemma should be of Lemma object type.');
        }

        if (!inflections) {
            throw new Error('Inflections data should not be empty.');
        }

        if (!Array.isArray(inflections)) {
            throw new Error('Inflection data should be provided in an array.');
        }

        for (let inflection of inflections) {
            if (!(inflection instanceof Inflection)) {
                throw new Error('All inflection data should be of Inflection object type.');
            }
        }

        this.lemma = lemma;
        this.inflections = inflections;
    }

    static readObject(jsonObject) {
        let lemma = Lemma.readObject(jsonObject.lemma);
        let inflections = [];
        for (let inflection of jsonObject.inflections) {
            inflections.push(Inflection.readObject(inflection));
        }
        return new Lexeme(lemma, inflections);
    }
}

/**
 * A group of similar words. Contains one or more Lexeme objects.
 */
class Homonym {
    /**
     * Initializes a Homonym object.
     * @param {Lexeme[]} lexemes - An array of Lexeme objects.
     */
    constructor (lexemes) {
        if (!lexemes) {
            throw new Error('Lexemes data should not be empty.');
        }

        if (!Array.isArray(lexemes)) {
            throw new Error('Lexeme data should be provided in an array.');
        }

        for (let lexeme of lexemes) {
            if (!(lexeme instanceof Lexeme)) {
                throw new Error('All lexeme data should be of Lexeme object type.');
            }
        }
        
        this.lexemes = lexemes;
        this.targetWord = undefined;
    }

    static readObject(jsonObject) {
        let lexemes = [];
        if (jsonObject.lexemes) {
            for (let lexeme of jsonObject.lexemes) {
                lexemes.push(Lexeme.readObject(lexeme));
            }
        }
        let homonym = new Homonym(lexemes);
        if (jsonObject.targetWord) {
            homonym.targetWord = jsonObject.targetWord;
        }
        return homonym;
    }

    /**
     * Returns language of a homonym.
     * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
     * and inflections within the same homonym will have the same language, and we can determine a language
     * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
     * @returns {string} A language code, as defined in the `languages` object.
     */
    get language() {
        if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.language) {
            return this.lexemes[0].lemma.language;
        }
        else {
            throw new Error('Homonym has not been initialized properly. Unable to obtain language information.');
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
    constructor(language) {
        if (!language) {
            // Language is not supported
            throw new Error('Language data cannot be empty.');
        }

        if (!languages.isAllowed(language)) {
            // Language is not supported
            throw new Error('Language "' + language + '" is not supported.');
        }
        this.language = language;
        this.features = {}; // Grammatical feature types (definitions) within supported by a specific language.
        this.suffixes = []; // An array of suffixes.
        this.footnotes = []; // Footnotes
    };

    /**
     * Creates and initializes a new FeatureType objects. It is stored in the 'features' object of this dataset.
     * This method is chainable.
     * @param {string} type - A type of a feature, from an allowed types list (see 'types' object).
     * @param {string[] | string[][]} allowedValues - Allowed values fo this type. A sequence of items defines default.
     * sorting and grouping order. See FeatureType constrictor for more details.
     * @returns {FeatureType} A newly created FeatureType.
     */
    defineFeatureType(type, allowedValues) {
        this.features[type] = new FeatureType(type, allowedValues, this.language);
        return this.features[type];
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
    addSuffix(suffixValue, featureValue, extendedLangData) {
        // TODO: implement run-time error checking
        let suffixItem = new Suffix(suffixValue);
        suffixItem.extendedLangData = extendedLangData;

        // Build all possible combinations of features
        let multiValueFeatures = [];


        // Go through all features provided
        for (let feature of featureValue) {

            // If this is a footnote. Footnotes should go in a flat array
            // because we don't need to split by them
            if (feature.type === types.footnote) {
                suffixItem[types.footnote] = suffixItem[types.footnote] || [];
                suffixItem[types.footnote].push(feature.value);
                continue;
            }

            // If this ending has several grammatical feature values then they will be in an array
            if (Array.isArray(feature)) {

                if (feature.length > 0) {
                    let type = feature[0].type;
                    // Store all multi-value features to create a separate copy of a a Suffix object for each of them
                    multiValueFeatures.push({type: type, features: feature});
                }
                else {
                    // Array is empty
                    throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
                }
            }
            else {
                suffixItem.features[feature.type] = feature.value;
            }
        }

        // Create a copy of an Suffix object for each multi-value item
        if (multiValueFeatures.length > 0) {
            for (let featureGroup of multiValueFeatures) {
                let endingItems = suffixItem.split(featureGroup.type, featureGroup.features);
                this.suffixes = this.suffixes.concat(endingItems);
            }
        }
        else {
            this.suffixes.push(suffixItem);
        }
    };

    /**
     * Stores a footnote item.
     * @param {Feature} partOfSpeech - A part of speech this footnote belongs to
     * @param {number} index - A footnote's index.
     * @param {string} text - A footnote's text.
     */
    addFootnote(partOfSpeech, index, text) {

        if (!index) {
            throw new Error('Footnote index data should not be empty.');
        }

        if (!text) {
            throw new Error('Footnote text data should not be empty.');
        }

        let footnote = new Footnote(index, text, partOfSpeech.value);
        footnote.index = index;

        this.footnotes.push(footnote);
    };

    getSuffixes(homonym) {

        // Add support for languages
        let result = new WordData(homonym);
        let inflections = {};

        // Find partial matches first, and then full among them

        // TODO: do we ever need lemmas?
        for (let lexema of homonym.lexemes) {
            for (let inflection of lexema.inflections) {
                // Group inflections by a part of speech
                let partOfSpeech = inflection[types.part];
                if (!partOfSpeech) {
                    throw new Error("Part of speech data is missing in an inflection.");
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

                result[types.part].push(partOfSpeech);
                result[partOfSpeech] = {};
                result[partOfSpeech].suffixes = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup), []);
                result[partOfSpeech].footnotes = [];

                // Create a set so all footnote indexes be unique
                let footnotesIndex = new Set();
                // Scan all selected suffixes to build a unique set of footnote indexes
                for (let suffix of result[partOfSpeech].suffixes) {
                    if (suffix.hasOwnProperty(types.footnote)) {
                        // Footnote indexes are stored in an array
                        for (let index of suffix[types.footnote]) {
                            footnotesIndex.add(index);
                        }
                    }
                }
                // Add footnote indexes and their texts to a result
                for (let index of footnotesIndex) {
                    let footnote = this.footnotes.find(footnoteElement =>
                        footnoteElement.index === index && footnoteElement[types.part] === partOfSpeech
                    );
                    result[partOfSpeech].footnotes.push({index: index, text: footnote.text});
                }
                // Sort footnotes according to their index numbers
                result[partOfSpeech].footnotes.sort( (a, b) => parseInt(a.index) - parseInt(b.index) );
            }
        }

        return result;
    }

    reducer(inflections, accumulator, suffix) {
        let result = this.matcher(inflections, suffix);
        if (result) {
            accumulator.push(result);
        }
        return accumulator;
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
    constructor(languageData) {
        this.supportedLanguages = [];

        if (languageData) {
            for (let dataset of languageData) {
                this[dataset.language] = dataset;
                this.supportedLanguages.push(dataset.language);
            }
        }
        return this;
    }

    /**
     * Loads data for all data sets.
     * This function is chainable.
     * @return {LanguageData} Self instance for chaining.
     */
    loadData() {
        for (let language of this.supportedLanguages) {
            this[language].loadData();
        }
        return this;
    }

    /**
     * Finds matching suffixes for a homonym.
     * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
     * @return {WordData} A return value of an inflection query.
     */
    getSuffixes(homonym) {
        let language = homonym.language;
        if (this.supportedLanguages.includes(language)) {
            return this[homonym.language].getSuffixes(homonym);
        }
        else {
            throw new Error(`"${language}" language data is missing. Unable to get suffix data.`);
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
    constructor(suffixValue) {

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

    static readObject(jsonObject) {
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

        if (jsonObject[types.footnote]) {
            suffix[types.footnote] = [];
            for (let footnote of jsonObject[types.footnote]) {
                suffix[types.footnote].push(footnote);
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
        return suffix;
    }

    /**
     * Returns a copy of itself. Used in splitting suffixes with multi-value features.
     * @returns {Suffix}
     */
    clone() {

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

        if (this.hasOwnProperty(types.footnote)) {
            clone[types.footnote] = this[types.footnote];
        }

        for (const lang in this.extendedLangData) {
            if (this.extendedLangData.hasOwnProperty(lang)) {
                clone.extendedLangData[lang] = this.extendedLangData[lang];
            }
        }
        return clone;
    };

    /**
     * Checks if suffix has a feature that is a match to the one provided.
     * @param {string} featureType - Sets a type of a feature we need to match with the ones stored inside the suffix
     * @param {string[]} featureValues - A list of feature values we need to match with the ones stored inside the suffix
     * @returns {string | undefined} - If provided feature is a match, returns a first feature that matched.
     * If no match found, return undefined.
     */
    featureMatch(featureType, featureValues) {
        if (this.features.hasOwnProperty(featureType)) {
            for (let value of featureValues) {
                if (value === this.features[featureType]) {
                    return value;
                }
            }
        }
        return undefined;
    }

    /**
     * Find feature groups in Suffix.featureGroups that are the same between suffixes provided
     * @param suffixes
     */
    static getCommonGroups(suffixes) {

        let features = Object.keys(suffixes[0].featureGroups);

        let commonGroups = features.filter( feature => {
            let result = true;
            for (let i=1; i<suffixes.length; i++) {
                result = result && suffixes[i].features.hasOwnProperty(feature);
            }
            return result;
        });
        return commonGroups;
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
    isInSameGroupWith(suffix) {

        let commonGroups = Suffix.getCommonGroups([this, suffix]);
        if (commonGroups.length < 1) {
            // If elements do not have common groups in Suffix.featureGroups then they are not in the same group
            return false;
        }

        let commonValues = {};
        commonGroups.forEach(feature => commonValues[feature] = new Set([this.features[feature]]));

        let result = true;
        result = result && this.value === suffix.value;
        // If suffixes does not match don't check any further
        if (!result) {
            return false;
        }

        // Check all features to be a match, except those that are possible group values
        for (let feature of Object.keys(this.features)) {
            if (commonGroups.indexOf(feature)>=0) {
                commonValues[feature].add(suffix.features[feature]);

                // Do not compare common groups
                continue;
            }
            result = result && this.features[feature] === suffix.features[feature];
            // If feature mismatch discovered, do not check any further
            if (!result) {
                return false;
            }
        }

        commonGroups.forEach(feature => {
            result = result && commonValues[feature].size === 2
        });

        return result;
    }

    /**
     * Splits a suffix that has multiple values of one or more grammatical features into an array of Suffix objects
     * with each Suffix object having only a single value of those grammatical features. Initial multiple values
     * are stored in a featureGroups[featureType] property as an array of values.
     * @param {string} featureType - A type of a feature
     * @param {Feature[]} featureValues - Multiple grammatical feature values.
     * @returns {Suffix[]} - An array of suffixes.
     */
    split(featureType, featureValues) {

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
        return suffixItems;
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
    static combine(suffixes, mergeFunction = Suffix.merge) {

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
            for (let i=0; i<suffixes.length; i++) {
                if (matchFound) {
                    continue;
                }
                for (let j=i+1; j < suffixes.length; j++) {
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
        while (matchFound);
        return suffixes;
    }

    /**
     * This function provide a logic of to merge data of two suffix object that were previously split together.
     * @param {Suffix} suffixA - A first of two suffixes to merge (to be returned).
     * @param {Suffix} suffixB - A second ending to merge (to be discarded).
     * @returns {Suffix} A modified value of ending A.
     */
    static merge(suffixA, suffixB) {
        let commonGroups = Suffix.getCommonGroups([suffixA, suffixB]);
        for (let type of commonGroups) {
            // Combine values using a comma separator. Can do anything else if we need to.
            suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
        }
        return suffixA;
    };
}


class Footnote {
    constructor(index, text, partOfSpeech) {
        this.index = index;
        this.text = text;
        this[types.part] = partOfSpeech;
    }

    static readObject(jsonObject) {
        this.index = jsonObject.index;
        this.text = jsonObject.text;
        this[types.part] = jsonObject[types.part];
        return new Footnote(jsonObject.index, jsonObject.text, jsonObject[types.part]);
    }
}

/**
 * Detailed information about a match type.
 */
class MatchData {
    constructor() {
        this.suffixMatch = false; // Whether two suffixes are the same.
        this.fullMatch = false; // Whether two suffixes and all grammatical features, including part of speech, are the same.
        this.matchedFeatures = []; // How many features matches each other.
    }

    static readObject(jsonObject) {
        let matchData = new MatchData();
        matchData.suffixMatch = jsonObject.suffixMatch;
        matchData.fullMatch = jsonObject.fullMatch;
        for (let feature of jsonObject.matchedFeatures) {
            matchData.matchedFeatures.push(feature);
        }
        return matchData;
    }
}


class ExtendedLanguageData {
    constructor() {
        this._type = undefined; // This is a base class
    }

    static types() {
        return {
            EXTENDED_GREEK_DATA: "ExtendedGreekData"
        }
    }

    static readObject(jsonObject) {
        if (!jsonObject._type) {
            throw new Error('Extended language data has no type information. Unable to deserialize.');
        }
        else if(jsonObject._type === ExtendedLanguageData.types().EXTENDED_GREEK_DATA) {
            return ExtendedGreekData.readObject(jsonObject);
        }
        else {
            throw new Error(`Unsupported extended language data of type "${jsonObject._type}".`);
        }
    }
}

class ExtendedGreekData extends ExtendedLanguageData {
    constructor() {
        super();
        this._type = ExtendedLanguageData.types().EXTENDED_GREEK_DATA; // For deserialization
        this.primary = false;
    }

    static readObject(jsonObject) {
        let data = new ExtendedGreekData();
        data.primary = jsonObject.primary;
        return data;
    }

    merge(extendedGreekData) {
        if (this.primary !== extendedGreekData.primary) {
            console.log('Mismatch', this.primary, extendedGreekData.primary);
        }
        let merged = new ExtendedGreekData();
        merged.primary = this.primary;
        return merged;
    }
}


class SelectedWord {
    constructor(language, word) {
        this.language = language;
        this.word = word;
    }

    static readObjects(jsonObject) {
        return new SelectedWord(jsonObject.language, jsonObject.word);
    }
}

/**
 * A return value for inflection queries
 */
class WordData {
    constructor(homonym) {
        this.homonym = homonym;
        this.definition = undefined;
        this[types.part] = []; // What parts of speech are represented by this object.
    }

    static readObject(jsonObject) {
        let homonym = Homonym.readObject(jsonObject.homonym);

        let wordData = new WordData(homonym);
        wordData.definition = jsonObject.definition;
        wordData[types.part] = jsonObject[types.part];

        for (let part of wordData[types.part]) {
            let partData = jsonObject[part];
            wordData[part] = {};

            if (partData.suffixes) {
                wordData[part].suffixes = [];
                for (let suffix of partData.suffixes) {
                    wordData[part].suffixes.push(Suffix.readObject(suffix));
                }
            }

            if (partData.footnotes) {
                wordData[part].footnotes = [];
                for (let footnote of partData.footnotes) {
                    wordData[part].footnotes.push(Footnote.readObject(footnote));
                }
            }
        }

        return wordData;
    }

    get word() {
        return this.homonym.targetWord;
    }

    set word(word) {
        this.homonym.targetWord = word;
    }

    get language() {
        return this.homonym.language;
    }
}

/**
 * Load text data form an external fil with an asynchronous XHR request.
 * @param {string} filePath - A path to a file we need to load.
 * @returns {Promise} - A promise that will be resolved with either
 * file content (a string) in case of success of with a status message
 * in case of failure.
 */
let loadData = function loadData(filePath) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", filePath);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export language */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return numbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cases; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return declensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return genders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return types; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return conjugations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return tenses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return voices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return moods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return persons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return dataSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_adjective_suffixes_csv__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_adjective_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__data_adjective_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_adjective_footnotes_csv__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_adjective_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__data_adjective_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_verb_suffixes_csv__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_verb_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__data_verb_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_verb_footnotes_csv__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_verb_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__data_verb_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_papaparse__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_papaparse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_papaparse__);
/*
 * Latin language data module
 */










// A language of this module
const language = __WEBPACK_IMPORTED_MODULE_0__lib_js__["p" /* languages */].latin;
// Create a language data set that will keep all language-related information
let dataSet = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["i" /* LanguageDataset */](language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
const parts = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].part, ['noun', 'adjective', 'verb']);
const numbers = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].number, ['singular', 'plural']);
numbers.addImporter(importerName)
    .map('singular', numbers.singular)
    .map('plural', numbers.plural);
const cases = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative']);
cases.addImporter(importerName)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('ablative', cases.ablative)
    .map('locative', cases.locative)
    .map('vocative', cases.vocative);
const declensions = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].declension, ['first', 'second', 'third', 'fourth', 'fifth']);
declensions.addImporter(importerName)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('1st 2nd', [declensions.first, declensions.second])
    .map('3rd', declensions.third)
    .map('4th', declensions.fourth)
    .map('5th', declensions.fifth);
const genders = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].gender, ['masculine', 'feminine', 'neuter']);
genders.addImporter(importerName)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].type, ['regular', 'irregular']);
types.addImporter(importerName)
    .map('regular', types.regular)
    .map('irregular', types.irregular);
const conjugations = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].conjugation, ['first', 'second', 'third', 'fourth']);
conjugations.addImporter(importerName)
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);
const tenses = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect']);
tenses.addImporter(importerName)
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);
const voices = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].voice, ['passive', 'active']);
voices.addImporter(importerName)
    .map('passive', voices.passive)
    .map('active', voices.active);
const moods = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].mood, ['indicative', 'subjunctive']);
moods.addImporter(importerName)
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);
const persons = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].person, ['first', 'second', 'third']);
persons.addImporter(importerName)
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third);
const footnotes = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].footnote, []);

// endregion Definition of grammatical features

// For noun and adjectives
dataSet.addSuffixes = function(partOfSpeech, data) {
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
            numbers.importer.csv.get(data[i][1]),
            cases.importer.csv.get(data[i][2]),
            declensions.importer.csv.get(data[i][3]),
            genders.importer.csv.get(data[i][4]),
            types.importer.csv.get(data[i][5])];
        if (data[i][6]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = data[i][6].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, features);
    }
};

// For verbs
dataSet.addVerbSuffixes = function(partOfSpeech, data) {
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
            conjugations.importer.csv.get(data[i][1]),
            voices.importer.csv.get(data[i][2]),
            moods.importer.csv.get(data[i][3]),
            tenses.importer.csv.get(data[i][4]),
            numbers.importer.csv.get(data[i][5]),
            persons.importer.csv.get(data[i][6])];

        let grammarType = data[i][7];
        // Type information can be empty if no ending is provided
        if (grammarType) {
            features.push(types.importer.csv.get(grammarType));
        }
        // Footnotes
        if (data[i][8]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = data[i][8].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, features);
    }
};

dataSet.addFootnotes = function(partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
    }
};

dataSet.loadData = function() {
    // Nouns
    let partOfSpeech = parts.noun;
    let suffixes = __WEBPACK_IMPORTED_MODULE_7_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv___default.a, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    let footnotes = __WEBPACK_IMPORTED_MODULE_7_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv___default.a, {});
    this.addFootnotes(partOfSpeech, footnotes.data);

    // Adjectives
    partOfSpeech = parts.adjective;
    suffixes = __WEBPACK_IMPORTED_MODULE_7_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_3__data_adjective_suffixes_csv___default.a, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    footnotes = __WEBPACK_IMPORTED_MODULE_7_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_4__data_adjective_footnotes_csv___default.a, {});
    this.addFootnotes(partOfSpeech, footnotes.data);

    // Verbs
    partOfSpeech = parts.verb;
    suffixes = __WEBPACK_IMPORTED_MODULE_7_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_5__data_verb_suffixes_csv___default.a, {});
    this.addVerbSuffixes(partOfSpeech, suffixes.data);
    footnotes = __WEBPACK_IMPORTED_MODULE_7_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_6__data_verb_footnotes_csv___default.a, {});
    this.addFootnotes(partOfSpeech, footnotes.data);
};


/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - A suffix to be matched with inflections.
 * @returns {Suffix | null} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns null.
 */
dataSet.matcher = function(inflections, suffix) {
    "use strict";
    // All of those features must match between an inflection and an ending
    let obligatoryMatches = [__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].grmCase, __WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].declension, __WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].gender, __WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].number];
    let bestMatchData = null; // Information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
        let matchData = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["l" /* MatchData */](); // Create a match profile

        if (inflection.suffix === suffix.value) {
           matchData.suffixMatch = true;
        }

        // Check obligatory matches
        for (let feature of  obligatoryMatches) {
            let featureMatch = suffix.featureMatch(feature, inflection[feature]);
            //matchFound = matchFound && featureMatch;

            if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
                break;
            }
            // Inflection's value of this feature is matching the one of the suffix
            matchData.matchedFeatures.push(feature);
        }

        if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
            break;
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
            return suffix;
        }
        bestMatchData = this.bestMatch(bestMatchData, matchData);
    }
    if (bestMatchData) {
        // There is some match found
        suffix.match = bestMatchData;
        return suffix;
    }
    return null;
};

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet.bestMatch = function(matchA, matchB) {
    // If one of the arguments is not set, return the other one
    if (!matchA && matchB) {
        return matchB;
    }

    if (!matchB && matchA) {
        return matchA;
    }

    // Suffix match has a priority
    if (matchA.suffixMatch !== matchB.suffixMatch) {
        if (matchA.suffixMatch > matchB.suffixMatch) {
            return matchA;
        }
        else {
            return matchB;
        }
    }

    // If same on suffix matche, compare by how many features matched
    if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
        // Arbitrarily return matchA if matches are the same
        return matchA;
    }
    else {
        return matchB;
    }
};



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export language */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return numbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cases; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return declensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return genders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return types; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dataSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_papaparse__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_papaparse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_papaparse__);
/*
 * Latin language data module
 */




/*import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv';*/


// A language of this module
const language = __WEBPACK_IMPORTED_MODULE_0__lib_js__["p" /* languages */].greek;
// Create a language data set that will keep all language-related information
let dataSet = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["i" /* LanguageDataset */](language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
const parts = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].part, ['noun', 'adjective', 'verb']);
const numbers = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].number, ['singular', 'dual', 'plural']);
numbers.addImporter(importerName)
    .map('singular', numbers.singular)
    .map('dual', numbers.dual)
    .map('plural', numbers.plural);
const cases = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'vocative']);
cases.addImporter(importerName)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('vocative', cases.vocative);
const declensions = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].declension, ['first', 'second', 'third']);
declensions.addImporter(importerName)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('3rd', declensions.third);
const genders = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].gender, ['masculine', 'feminine', 'neuter']);
genders.addImporter(importerName)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].type, ['regular', 'irregular']);
types.addImporter(importerName)
    .map('regular', types.regular)
    .map('irregular', types.irregular);
/*const conjugations = dataSet.defineFeatureType(Lib.types.conjugation, ['first', 'second', 'third', 'fourth']);
conjugations.addImporter(importerName)
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);
const tenses = dataSet.defineFeatureType(Lib.types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect']);
tenses.addImporter(importerName)
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);
const voices = dataSet.defineFeatureType(Lib.types.voice, ['passive', 'active']);
voices.addImporter(importerName)
    .map('passive', voices.passive)
    .map('active', voices.active);
const moods = dataSet.defineFeatureType(Lib.types.mood, ['indicative', 'subjunctive']);
moods.addImporter(importerName)
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);
const persons = dataSet.defineFeatureType(Lib.types.person, ['first', 'second', 'third']);
persons.addImporter(importerName)
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third);*/
const footnotes = dataSet.defineFeatureType(__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].footnote, []);

// endregion Definition of grammatical features

// For noun and adjectives
dataSet.addSuffixes = function(partOfSpeech, data) {
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
            types.importer.csv.get(dataItem[5])];
        if (dataItem[6] === 'primary') {
            primary = true;
        }
        if (dataItem[7]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = dataItem[7].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        let extendedGreekData = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["a" /* ExtendedGreekData */]();
        extendedGreekData.primary = primary;
        let extendedLangData = {
            [__WEBPACK_IMPORTED_MODULE_0__lib_js__["p" /* languages */].greek]: extendedGreekData
        };
        this.addSuffix(suffixValue, features, extendedLangData);
    }
};

// For verbs
dataSet.addVerbSuffixes = function(partOfSpeech, data) {
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
            conjugations.importer.csv.get(data[i][1]),
            voices.importer.csv.get(data[i][2]),
            moods.importer.csv.get(data[i][3]),
            tenses.importer.csv.get(data[i][4]),
            numbers.importer.csv.get(data[i][5]),
            persons.importer.csv.get(data[i][6])];

        let grammarType = data[i][7];
        // Type information can be empty if no ending is provided
        if (grammarType) {
            features.push(types.importer.csv.get(grammarType));
        }
        // Footnotes
        if (data[i][8]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = data[i][8].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, features);
    }
};

dataSet.addFootnotes = function(partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
    }
};

dataSet.loadData = function() {
    // Nouns
    let partOfSpeech = parts.noun;
    let suffixes = __WEBPACK_IMPORTED_MODULE_3_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_1__data_noun_suffixes_csv___default.a, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    let footnotes = __WEBPACK_IMPORTED_MODULE_3_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_2__data_noun_footnotes_csv___default.a, {});
    this.addFootnotes(partOfSpeech, footnotes.data);

    // Adjectives
    /*partOfSpeech = parts.adjective;
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
    this.addFootnotes(partOfSpeech, footnotes.data);*/

    // Verbs
    /*partOfSpeech = parts.verb;
    suffixes = papaparse.parse(verbSuffixesCSV, {});
    this.addVerbSuffixes(partOfSpeech, suffixes.data);
    footnotes = papaparse.parse(verbFootnotesCSV, {});
    this.addFootnotes(partOfSpeech, footnotes.data);*/
};


/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - A suffix to be matched with inflections.
 * @returns {Suffix | null} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns null.
 */
dataSet.matcher = function(inflections, suffix) {
    "use strict";
    // All of those features must match between an inflection and an ending
    let obligatoryMatches = [__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [__WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].grmCase, __WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].declension, __WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].gender, __WEBPACK_IMPORTED_MODULE_0__lib_js__["q" /* types */].number];
    let bestMatchData = null; // Information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
        let matchData = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["l" /* MatchData */](); // Create a match profile

        if (inflection.suffix === suffix.value) {
            matchData.suffixMatch = true;
        }

        // Check obligatory matches
        for (let feature of  obligatoryMatches) {
            let featureMatch = suffix.featureMatch(feature, inflection[feature]);
            //matchFound = matchFound && featureMatch;

            if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
                break;
            }
            // Inflection's value of this feature is matching the one of the suffix
            matchData.matchedFeatures.push(feature);
        }

        if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
            break;
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
            return suffix;
        }
        bestMatchData = this.bestMatch(bestMatchData, matchData);
    }
    if (bestMatchData) {
        // There is some match found
        suffix.match = bestMatchData;
        return suffix;
    }
    return null;
};

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet.bestMatch = function(matchA, matchB) {
    // If one of the arguments is not set, return the other one
    if (!matchA && matchB) {
        return matchB;
    }

    if (!matchB && matchA) {
        return matchA;
    }

    // Suffix match has a priority
    if (matchA.suffixMatch !== matchB.suffixMatch) {
        if (matchA.suffixMatch > matchB.suffixMatch) {
            return matchA;
        }
        else {
            return matchB;
        }
    }

    // If same on suffix matche, compare by how many features matched
    if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
        // Arbitrarily return matchA if matches are the same
        return matchA;
    }
    else {
        return matchB;
    }
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Cell */
/* unused harmony export RowTitleCell */
/* unused harmony export HeaderCell */
/* unused harmony export Column */
/* unused harmony export Row */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupFeatureType; });
/* unused harmony export GroupFeatureList */
/* unused harmony export WideView */
/* unused harmony export NarrowView */
/* unused harmony export NarrowViewGroup */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Table; });
/* unused harmony export Footnotes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return View; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_styles__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__ = __webpack_require__(1);





class Cell {
    /**
     * Creates a cell for an inflection table.
     * @param {Suffix[]} suffixes - A list of suffixes that belongs to this cell.
     * @param {Feature[]} features - A list of features this cell corresponds to.
     */
    constructor(suffixes, features) {
        this.suffixes = suffixes;
        if (!this.suffixes) {
            this.suffixes = [];
        }
        this.features = features;
        this.empty = (this.suffixes.length === 0);
        this.suffixMatches = !!this.suffixes.find(element => {
            if (element.match && element.match.suffixMatch) {
                return element.match.suffixMatch;
            }
        });

        this.column = undefined; // A column this cell belongs to
        this.row = undefined; // A row this cell belongs to

        this._index = undefined;

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        let element = document.createElement('div');
        element.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].cell);
        for (let [index, suffix] of this.suffixes.entries()) {
            // Render each suffix
            let suffixElement = document.createElement('a');
            suffixElement.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].suffix);
            if (suffix.match && suffix.match.suffixMatch) {
                suffixElement.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].suffixMatch);
            }
            if (suffix.match && suffix.match.fullMatch) {
                suffixElement.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].suffixFullFeatureMatch);
            }
            let suffixValue = suffix.value? suffix.value: '-';
            if (suffix.footnote && suffix.footnote.length) {
                suffixValue += '[' + suffix.footnote + ']';
            }
            suffixElement.innerHTML = suffixValue;
            element.appendChild(suffixElement);
            if (index < this.suffixes.length - 1) {
                element.appendChild(document.createTextNode(',\u00A0'));
            }
        }
        this.wNode = element;
        this.nNode = element.cloneNode(true);
    }

    /**
     * Returns an HTML element for a wide view.
     * @returns {HTMLElement}
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an HTML element for a narrow view.
     * @returns {HTMLElement}
     */
    get nvNode() {
        return this.nNode;
    }

    /**
     * Sets a unique index of the cell that can be used for cell identification via 'data-index' attribute.
     * @param {number} index - A unique cell index.
     */
    set index(index) {
        this._index = index;
        this.wNode.dataset.index = this._index;
        this.nNode.dataset.index = this._index;
    }

    /**
     * A proxy for adding an event listener for both wide and narrow view HTML elements.
     * @param {string} type - Listener type.
     * @param {EventListener} listener - Event listener function.
     */
    addEventListener(type, listener) {
        this.wNode.addEventListener(type, listener);
        this.nNode.addEventListener(type, listener);
    }

    /**
     * Hides an element.
     */
    hide() {
        if (!this.wNode.classList.contains(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden)) {
            this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
            this.nNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
        }
    }

    /**
     * Shows a previously hidden element.
     */
    show() {
        if (this.wNode.classList.contains(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden)) {
            this.wNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
            this.nNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
        }
    }

    /**
     * Highlights a cell with color.
     */
    highlight() {
        if (!this.wNode.classList.contains(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight)) {
            this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
            this.nNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
        }
    }

    /**
     * Removes highlighting from a previously highlighted cell.
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight)) {
            this.wNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
            this.nNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
        }
    }

    /**
     * Highlights a row and a column this cell belongs to.
     */
    highlightRowAndColumn() {
        if (!this.column) {
            throw new Error('Column is undefined.');
        }
        if (!this.row) {
            throw new Error('Row is undefined.');
        }
        this.column.highlight();
        this.row.highlight();
    }

    /**
     * Removes highlighting form a previously highlighted row and column.
     */
    clearRowAndColumnHighlighting() {
        if (!this.column) {
            throw new Error('Column is undefined.');
        }
        if (!this.row) {
            throw new Error('Row is undefined.');
        }
        this.column.clearHighlighting();
        this.row.clearHighlighting();
    }
}

/**
 * A cell that specifies a title for a row in an inflection table.
 */
class RowTitleCell {

    /**
     * Initializes a row title cell.
     * @param {string} title - A text that will be shown within the cell.
     * @param {GroupFeatureType} groupingFeature - A grouping feature that specifies a row for which a title cell
     * is created.
     * @param {number} nvGroupQty - A number of narrow view groups. Because each group will be shown separately
     * and will have its own title cells, we need to create a copy of a title cell for each such group.
     */
    constructor(title, groupingFeature, nvGroupQty) {
        this.parent = undefined;
        this.title = title;
        this.feature = groupingFeature;
        this.nvGroupQty = nvGroupQty;

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        // Generate HTML representation for a wide view node
        this.wNode = document.createElement('div');
        this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].cell);
        if (this.feature.formsColumn) {
            this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].header);
        }
        if (this.feature.hasFullWidthRowTitle) {
            // This cell is taking an entire row
            this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].fullWidth);
        }
        if (this.feature.formsColumn && this.feature.groupFeatureList.titleColumnsQuantity > 1) {
            this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].widthPrefix + this.feature.groupFeatureList.titleColumnsQuantity);
        }
        this.wNode.innerHTML = this.title;

        // Copy HTML representation to all narrow view nodes (each narrow view group has its own node)
        this.nNodes = []; // Narrow nodes, one for each group
        for (let i = 0; i < this.nvGroupQty; i++) {
            this.nNodes.push(this.wNode.cloneNode(true));
        }
    }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an array HTML element for narrow view groups
     * @returns {HTMLElement[]} Array of HTML elements for narrow view group's cells.
     */
    getNvNode(index) {
        return this.nNodes[index];
    }

    /**
     * Generates an empty cell placeholder of a certain width. Useful for situation when empty title cells need to be
     * inserted into a table structure (i.e. when title cells occupy multiple columns.
     * @param {number} width - A number of columns placeholder cell will occupy.
     * @returns {HTMLElement} HTML element of a placeholder cell.
     */
    static placeholder(width = 1) {
        let placeholder = document.createElement('div');
        placeholder.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].cell, __WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].widthPrefix + width);
        return placeholder;
    }

    /**
     * Some table layouts require multiple title cells to be shown for a row. These could be, for example, a title
     * cell for a parent category that will follow a title cell for a category that defines a row. In such situation a
     * title cell will have a parent, which will represent a parent cell object.
     * This function returns an array of title cells for a row, starting from the topmost parent and moving down
     * tot the current title cell.
     * @returns {RowTitleCell[]} An array of title row cells representing a title cell hierarchy list.
     */
    get hierarchyList() {
        let parentCells = [];
        if (this.parent) {
            parentCells = this.parent.hierarchyList;
        }
        return parentCells.concat(this);
    }

    /**
     * Highlights this row title cell
     */
    highlight() {
        this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
        }
    }

    /**
     * Removes highlighting from this row title cell
     */
    clearHighlighting() {
        this.wNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
        }
    }
}

/**
 * A cell in a header row, a column title cell.
 */
class HeaderCell {
    /**
     * Initializes a header cell.
     * @param {string} title - A title text that will be shown in the header cell.
     * @param {GroupFeatureType} groupingFeature - A feature that defines one or several columns this header forms.
     * @param {number} [span=1] - How many columns in a table this header cell forms.
     */
    constructor(title, groupingFeature, span = 1) {
        this.feature = groupingFeature;
        this.title = title;
        this.span = span;

        this.parent = undefined;
        this.children = [];
        this.columns = [];

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        let element = document.createElement('div');
        element.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].cell, __WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].header, __WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].widthPrefix + this.span);
        element.innerHTML = this.title;
        this.wNode = element;
        this.nNode = element.cloneNode(true);
    }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an HTML element for a narrow view
     * @returns {HTMLElement} HTML element for a narrow view's cell.
     */
    get nvNode() {
        return this.nNode;
    }

    /**
     * Registers a column that's being formed by this header cell. Adds column to itself and to its parent(s).
     * @param {Column} column - A column that is formed by this header cell.
     */
    addColumn(column) {
        this.columns = this.columns.concat([column]);

        if (this.parent) {
            this.parent.addColumn(column);
        }
    }

    /**
     * Temporary changes a width of a header cell. This happens when one or several columns
     * that this header forms are hidden or shown.
     * @param value
     */
    changeSpan(value) {
        let currentWidthClass = __WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].widthPrefix + this.span;
        this.span += value;
        let newWidthClass = __WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].widthPrefix + this.span;
        this.wNode.classList.replace(currentWidthClass, newWidthClass);
        this.nNode.classList.replace(currentWidthClass, newWidthClass);
    }

    /**
     * This function will notify all parents and children of a title column that some columns under this headers cell
     * changed their state (i.e. were hidden or shown). This way parents and children will be able to update their
     * states accordingly.
     */
    columnStateChange() {
        let visibleColumns = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                visibleColumns++;
            }
        }
        if (this.span !== visibleColumns) {
            // Number of visible columns has been changed
            let change = visibleColumns - this.span;
            this.changeSpan(change);

            // Notify parents and children
            if (this.children.length) {
                for (let child of this.children) {
                    child.columnStateChange();
                }
            }
            if (this.parent) {
                this.parent.columnStateChange();
            }
        }
    }

    /**
     * Highlights a header cell, its parent and children
     */
    highlight() {
        if (!this.wNode.classList.contains(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight)) {
            this.wNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
            this.nNode.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);

            if (this.parent) {
                this.parent.highlight();
            }
        }
    }

    /**
     * Removes highlighting from a header cell, its parent and children
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight)) {
            this.wNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);
            this.nNode.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].highlight);

            if (this.parent) {
                this.parent.clearHighlighting();
            }
        }
    }
}

/**
 * Represent a column of cells in an inflection table.
 */
class Column {

    /**
     * Initializes column with a provided set of cells.
     * @param {Cell} cells - Cells that are within this column.
     */
    constructor(cells) {
        this.cells = cells;
        if (!cells) {
            this.cells = [];
        }
        this._headerCell = undefined;
        this.hidden = false;
        this.empty = this.cells.every(cell => cell.empty);
        this.suffixMatches = !!this.cells.find(cell => cell.suffixMatches);
        
        for (let cell of this.cells) {
            cell.column = this;
        }
    }

    /**
     * Assigns a header cell to the column.
     * @param {HeaderCell} headerCell - A header cell of this column.
     */
    set headerCell(headerCell) {
        this._headerCell = headerCell;
        headerCell.addColumn(this);
    }

    /**
     * Returns a number of cells within this column.
     * @returns {Number} A number of cells this column contains.
     */
    get length() {
        return this.cells.length;
    }

    /**
     * Hides the column. Notifies a header about a state change.
     */
    hide() {
        if (!this.hidden) {
            this.hidden = true;

            for (let cell of this.cells) {
                cell.hide();
            }
            if (this._headerCell) {
                this._headerCell.columnStateChange();
            }
        }
    }

    /**
     * Shows the column. Notifies a header about a state change.
     */
    show() {
        if (this.hidden) {
            this.hidden = false;

            for (let cell of this.cells) {
                cell.show();
            }
            if (this._headerCell) {
                this._headerCell.columnStateChange();
            }
        }
    }

    /**
     * Highlights a column and its header.
     */
    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        if (this._headerCell) {
            this._headerCell.highlight();
        }
    }

    /**
     * Removes highlighting from a column and its header.
     */
    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        if (this._headerCell) {
            this._headerCell.clearHighlighting();
        }
    }
}

/**
 * Represents a row of cells
 */
class Row {

    /**
     * Populates row with cells
     * @param {Cell[]} cells - Cells that belong to this row
     */
    constructor(cells) {
        this.cells = cells;
        if (!cells) {
            this.cells = [];
        }
        this.titleCell = undefined;

        for (let cell of this.cells) {
            cell.row = this;
        }
    }

    /**
     * Adds a cell to the row.
     * This is a chainable function.
     * @param {Cell} cell - A cell to be added to the row
     */
    add(cell) {
        cell.row = this;
        this.cells.push(cell);
        return this;
    }

    /**
     * Returns a number of cells in a row
     * @returns {Number} A number of cells in a row
     */
    get length() {
        return this.cells.length;
    }

    /**
     * Returns a portion of a cells array starting from `from` item and up to, but not including, `upto` element.
     * It does not create new copies of cells to populate a newly created array; this array contains references to
     * the same cells that original Row refers to. It also does not update row reference within Cell objects.
     *
     * This function presents a way to create another structure of existing table's cells.
     * It can be useful for views that have a different structure (i.e. narrow view).
     * @param {number} from
     * @param {number} upto
     */
    slice(from, upto) {
        let slice = new Row();
        if (from < 0 && from > this.cells.length) {
            throw new Error ('"from" parameter is out of range.');
        }
        if (upto < 0 && upto > this.cells.length) {
            throw new Error ('"upto" parameter is out of range.');
        }
        for (let index = from; index < upto; index++) {
            slice.cells.push(this.cells[index]);
        }
        slice.titleCell = this.titleCell;
        return slice;
    }

    /**
     * Highlights all cells in a row, and a title cells
     */
    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        if (this.titleCell) {
            this.titleCell.highlight();
        }
    }

    /**
     * Removes highlighting from all cells in a row, and from a title cell
     */
    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        if (this.titleCell) {
            this.titleCell.clearHighlighting();
        }
    }
}

/**
 * This is a wrapper around a FeatureType object. When a Table object creates a
 * hierarchical tree of suffixes, it uses grammatical features as tree nodes.
 * GroupFeatureType extends a Feature object so that it'll be able to store additional information
 * that is required for that.
 */
class GroupFeatureType extends __WEBPACK_IMPORTED_MODULE_0__lib_lib__["d" /* FeatureType */] {

    /**
     * GroupFeatureType extends FeatureType to serve as a grouping feature (i.e. a feature that forms
     * either a column or a row in an inflection table). For that, it adds some additional functionality,
     * such as custom feature orders that will allow to combine suffixes from several grammatical features
     * (i.e. masculine and feminine) into a one column of a table.
     * @param {FeatureType} featureType - A feature that defines a type of this item.
     * @param {string} titleMessageID - A message ID of a title, used to get a formatted title from a
     * language-specific message bundle.
     * @param {Feature[]} order - A custom sort order for this feature that redefines
     * a default one stored in FeatureType object (optional).
     * Use this parameter to redefine a deafult sort order for a type.
     */
    constructor(featureType, titleMessageID, order = featureType.orderedFeatures) {
        super(featureType.type, GroupFeatureType.featuresToValues(order), featureType.language);

        this.groupTitle = titleMessageID;
        this._groupType = undefined;

        this.groupFeatureList = undefined;


        // Properties below are required to store information during tree creation
        this.subgroups = []; // Each value of the feature
        this.cells = []; // All cells within this group and below
        this.parent = undefined;
        this.header = undefined;

        this._formsColumn = false;
        this._formsRow = false;
        this.hasColumnRowTitle = false; // Whether this feature has a title of a suffix row in the left-side column.
        this.hasFullWidthRowTitle = false; // Whether this feature has a title of suffix rows that spans the whole table width.
    }

    /**
     * Converts a list of Feature objects into a list of strings that represent their values. Keeps tha original
     * array structure intact (work with up two two array levels).
     * @param {Feature[] | Feature[][]} features - An array of feature objects.
     * @return {string[] | strings[][]} A matching array of strings with feature values.
     */
    static featuresToValues(features) {
        return features.map( (feature) => {
            if (Array.isArray(feature)) {
                return feature.map( (feature) => feature.value );
            }
            else {
                return feature.value;
            }
        });
    }

    /**
     * This is a wrapper around orderedFeatures() that allows to set a custom feature order for particular columns.
     * @returns {Feature[] | Feature[][]} A sorted array of feature values.
     */
    getOrderedFeatures(ancestorFeatures) {
        return this.getOrderedValues(ancestorFeatures).map((value) => new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["b" /* Feature */](value, this.type, this.language));
    }

    /**
     * This is a wrapper around orderedValues() that allows to set a custom feature order for particular columns.
     * By default it returns features in the same order that is defined in a base FeatureType class.
     * Redefine it to provide a custom grouping and sort order.
     * @returns {string[] | string[][]} A sorted array of feature values.
     */
    getOrderedValues(ancestorFeatures) {
        return this._orderIndex;
    }

    /**
     * Whether this feature forms a columns group.
     * @returns {boolean} True if this feature forms a column.
     */
    get formsColumn() {
        return this._formsColumn;
    }

    /**
     * Sets that this feature would form a column.
     * @param {boolean} value
     */
    set formsColumn(value) {
        this._formsColumn = value;
        this._formsRow = !value; // Can't do both
    }

    /**
     * Whether this feature forms a row group.
     * @returns {boolean} True if this feature forms a row.
     */
    get formsRow() {
        return this._formsRow;
    }

    /**
     * Sets that this feature would form a row.
     * @param {boolean} value
     */
    set formsRow(value) {
        this._formsRow = value;
        this._formsColumn = !value; // Can't do both
    }

    /**
     * How many groups this feature would form.
     * @returns {Number} A number of groupes formed by this feature.
     */
    get size() {
        return this.orderedValues.length;
    }

    /**
     * Checks if two grouping features are of the same type.
     * @param {GroupFeatureType} groupingFeature - A grouping feature to compare with the current one.
     * @returns {boolean} True if grouping features are of the same type.
     */
    isSameType(groupingFeature) {
        return this.type === groupingFeature.type;
    }

    /**
     * Creates a title cell for a feature from the current group.
     * @param {string} title - A text that will be shown within a cell.
     * @param {number} nvGroupQty - A number of narrow view groups.
     * @returns {RowTitleCell} A created RowTitleCell object.
     */
    createTitleCell(title, nvGroupQty) {
        return new RowTitleCell(title, this, nvGroupQty);
    }
}


/**
 * Holds a list of all grouping features of a table.
 */
class GroupFeatureList extends __WEBPACK_IMPORTED_MODULE_0__lib_lib__["c" /* FeatureList */] {

    /**
     * Initializes object with an array of grouping feature objects.
     * @param {GroupFeatureType[]} features - An array of features that form a table.
     * An order of features defines in what order a table tree would be built.
     */
    constructor(features) {
        super(features);
        this._columnFeatures = []; // Features that group cells into columns
        this._rowFeatures = []; // Features that group cells into rows

        this.forEach((feature) => feature.groupFeatureList = this);
    }

    /**
     * Return a list of all grouping features that form columns.
     * @returns {GroupFeatureType[]} - An array of grouping features.
     */
    get columnFeatures() {
        return this._columnFeatures;
    }

    /**
     * Defines what features form columns. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form columns and what order
     * these columns would follow.
     */
    set columns(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.formsColumn = true;
            this._columnFeatures.push(matchingFeature);
        }
    }

    /**
     * Returns a first column feature item.
     * @returns {GroupFeatureType} A fist column feature.
     */
    get firstColumnFeature() {
        if (this._columnFeatures && this._columnFeatures.length) {
            return this._columnFeatures[0];
        }
    }

    /**
     * Returns a last column feature item.
     * @returns {GroupFeatureType} A last column feature.
     */
    get lastColumnFeature() {
        if (this._columnFeatures && this._columnFeatures.length) {
            return this._columnFeatures[this._columnFeatures.length - 1];
        }
    }

    /**
     * Return a list of all grouping features that form rows.
     * @returns {GroupFeatureType[]} - An array of grouping rows.
     */
    get rowFeatures() {
        return this._rowFeatures;
    }

    /**
     * Defines what features form rows. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form rows and what order
     * these rows would follow.
     */
    set rows(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.formsRow = true;
            this._rowFeatures.push(matchingFeature);
        }
        return this;
    }

    /**
     * Returns a first row feature item.
     * @returns {GroupFeatureType} A fist row feature.
     */
    get firstRowFeature() {
        if (this._rowFeatures && this._rowFeatures.length) {
            return this._rowFeatures[0];
        }
    }

    /**
     * Returns a last row feature item.
     * @returns {GroupFeatureType} A last row feature.
     */
    get lastRowFeature() {
        if (this._rowFeatures && this._rowFeatures.length) {
            return this._rowFeatures[this._rowFeatures.length - 1];
        }
    }

    /**
     * Defines what are the titles of suffix cell rows within a table body.
     * The number of such items defines how many left-side title columns this table would have (default is one).
     * Full width titles (see below) does not need to be specified here.
     * @param {Feature | GroupingFeature} features - What suffix row titles this table would have.
     */
    set columnRowTitles(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.hasColumnRowTitle = true;
        }
    }

    /**
     * In inflection tables, titles of features are usually located in left-side columns. However, some titles that
     * group several rows together may span the whole table width. This setters defines
     * what those features are.
     * @param {Feature | GroupingFeature} features - What feature titles would take a whole row
     */
    set fullWidthRowTitles(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.hasFullWidthRowTitle = true;
        }
    }

    /**
     * Returns a quantity of grouping features.
     * @returns {number} - A number of grouping features.
     */
    get length() {
        return this._features.length;
    }

    /**
     * Calculate a number of title columns.
     * @returns {number} A number of title columns.
     */
    get titleColumnsQuantity() {
        let quantity = 0;
        for (let feature of this._features) {
            if (feature.hasColumnRowTitle) {
                quantity++;
            }
        }
        return quantity;
    }
}

/**
 * Stores group data during feature tree construction.
 */
class NodeGroup {

    /**
     * Creates feature group data structures.
     */
    constructor() {
        this.subgroups = []; // Each value of the feature
        this.cells = []; // All cells within this group and below
        this.parent = undefined;
        this.header = undefined;

        this.groupFeatureType = undefined; // Defines a feature type that forms a tree level this node is in.
        this.ancestorFeatures = undefined; // Defines feature values of this node's parents.
    }
}

/**
 * A representation of a table that is shown on wide screens (desktops).
 */
class WideView {

    /**
     * Initializes a wide view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
    constructor(columns, rows, headers, titleColumnQty) {
        this.columns = columns;
        this.rows = rows;
        this.headers = headers;
        this.titleColumnQty = titleColumnQty;
        this.nodes = document.createElement('div');
        this.nodes.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].inflectionTable, __WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].wideView);
    }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
    get visibleColumnQty() {
        let qty = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                qty++;
            }
        }
        return qty;
    }

    /**
     * Renders an HTML representation of a wide table view.
     * @returns {HTMLElement} A rendered HTML Element.
     */
    render() {
        // Remove any previously inserted nodes
        this.nodes.innerHTML = '';

        for (let row of this.headers) {
            this.nodes.appendChild(row.titleCell.wvNode);
            for (let cell of row.cells) {
                this.nodes.appendChild(cell.wvNode);
            }
        }

        for (let row of this.rows) {
            let titleCells = row.titleCell.hierarchyList;
            if (titleCells.length < this.titleColumnQty) {
                this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length));
            }
            for (let titleCell of titleCells) {
                this.nodes.appendChild(titleCell.wvNode);
            }

            for (let cell of row.cells) {
                this.nodes.appendChild(cell.wvNode);
            }
        }
        this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', '
            + __WEBPACK_IMPORTED_MODULE_1__styles_styles__["e" /* wideView */].column.width + __WEBPACK_IMPORTED_MODULE_1__styles_styles__["e" /* wideView */].column.unit + ')';

        return this.nodes;
    }
}

/**
 * A representation of a table that is shown on narrow screens (mobile devices).
 */
class NarrowView {

    /**
     * Initializes a narrow view.
     * @param {number} groupQty - A number of visible groups (sub tables) within a narrow view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
    constructor(groupQty, columns, rows, headers, titleColumnQty) {
        this.columns = columns;
        this.rows = rows;
        this.headers = headers;
        this.titleColumnQty = titleColumnQty;
        this.groups = [];
        this.groupQty = groupQty;
        this.groupSize = 0;
        if (groupQty) {
            this.groupSize = this.columns.length / groupQty;
        }

        this.nodes = document.createElement('div');
        this.nodes.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].narrowViewsContainer);

        for (let [index, headerCell] of this.headers[0].cells.entries()) {
            this.createGroup(index, headerCell);
        }
    }

    /**
     * Creates a group within a table.
     * @returns {NarrowViewGroup} A newly created group.
     */
    createGroup(index, headerCell) {
        let group = new NarrowViewGroup(index, this.headers, this.rows, this.titleColumnQty);
        this.nodes.appendChild(group.nodes);
        this.groups.push(group);
    }

    /**
     * Generates an HTML representation of a view.
     * @returns {HTMLElement} - HTML representation of a view.
     */
    render() {
        for (let group of this.groups) {
            group.render()
        }
        return this.nodes;
    }
}

/**
 * Represents a group within a narrow view. A narrow view is split into separate sub tables
 * by values of a first grammatical feature that forms columns. Then each sub table would contain
 * a suffixes that belong to that grammatical feature value only. Each sub table becomes a
 * separated object and can be reflown on devices with narrow screens.
 */
class NarrowViewGroup {
    // TODO: Review constructor parameters

    /**
     * Initializes a narrow view group. Please note that column, rows, and headers are those of a whole table,
     * not of this particular group. NarrowViewGroup constructor will use this data to build
     * the corresponding objects of the group itself.
     * @param {number} index - An index of this group within a groups array, starting from zero.
     * @param {Row[]} headers - Table headers.
     * @param {Row[]} rows - Table rows.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
    constructor(index, headers, rows, titleColumnQty) {
        this.index = index;
        this.columns = headers[0].cells[index].columns;
        this.groupSize = this.columns.length;
        let columnsStartIndex = this.columns[0].index;
        let columnsEndIndex = this.columns[this.columns.length - 1].index;

        this.rows = [];
        for (let row of rows) {
            this.rows.push(row.slice(columnsStartIndex, columnsEndIndex + 1));
        }
        this.headers = [];
        /**
         * Since we group by the first column feature, there will be a single feature in a first header row,
         * its children in the second row, children of its children in a third row and so on.
         */
        for (let [headerIndex, headerRow] of headers.entries()) {
            let row = new Row();
            row.titleCell = headerRow.titleCell;
            if (headerIndex === 0) {
                row.cells.push(headerRow.cells[index]);
            }
            else {
                for (let headerCell of this.headers[headerIndex - 1].cells) {
                    row.cells = row.cells.concat(headerCell.children);
                }
            }
            this.headers.push(row);
        }
        this.titleColumnQty = titleColumnQty;

        this.nodes = document.createElement('div');
        this.nodes.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].inflectionTable, __WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].narrowView);
    }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
    get visibleColumnQty() {
        let qty = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                qty++;
            }
        }
        return qty;
    }

    /**
     * Renders an HTML representation of a narrow view group.
     */
    render() {
        this.nodes.innerHTML = '';

        if (this.visibleColumnQty) {
            // This group is visible
            for (let headerRow of this.headers) {
                this.nodes.appendChild(headerRow.titleCell.getNvNode(this.index));
                for (let headerCell of headerRow.cells) {
                    this.nodes.appendChild(headerCell.nvNode);
                }
            }

            for (let row of this.rows) {
                let titleCells = row.titleCell.hierarchyList;
                if (titleCells.length < this.titleColumnQty) {
                    this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length));
                }
                for (let titleCell of titleCells) {
                    this.nodes.appendChild(titleCell.getNvNode(this.index));
                }

                for (let cell of row.cells) {
                    this.nodes.appendChild(cell.nvNode);
                }
            }
            this.nodes.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
            this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', '
                + __WEBPACK_IMPORTED_MODULE_1__styles_styles__["c" /* narrowView */].column.width + __WEBPACK_IMPORTED_MODULE_1__styles_styles__["c" /* narrowView */].column.unit + ')';
            this.nodes.style.width = (this.visibleColumnQty + this.titleColumnQty) * __WEBPACK_IMPORTED_MODULE_1__styles_styles__["c" /* narrowView */].column.width
                + __WEBPACK_IMPORTED_MODULE_1__styles_styles__["c" /* narrowView */].column.unit;
        }
        else {
            // This group is hidden
            this.nodes.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
        }
    }
}

/**
 * Represents an inflection table.
 */
class Table {

    /**
     * Initializes an inflection table.
     * @param {GroupFeatureType[]} features - An array of grouping features. An order of elements in this array
     */
    constructor(features) {
        this.features = new GroupFeatureList(features);
        this.emptyColumnsHidden = false;
        this.cells = []; // Will be populated by groupByFeature()

        /*
        This is a special filter function that, if defined will do additional filtering of suffixes within a cell.
         */
        this.suffixCellFilter = undefined;
    }

    /**
     * Creates a table tree and other data structures (columns, rows, headers).
     * This function is chainabe.
     * @param {Suffix[]} suffixes - An array of suffixes to build table from.
     * @returns {Table} Reference to self for chaining.
     */
    construct(suffixes) {
        this.suffixes = suffixes;
        this.tree = this.groupByFeature(suffixes);
        this.headers = this.constructHeaders();
        this.columns = this.constructColumns();
        this.rows = this.constructRows();
        this.emptyColumnsHidden = false;
        return this;
    }

    /**
     * Builds wide and narrow views of the table.
     * This function is chainabe.
     * @returns {Table} Reference to self for chaining.
     */
    constructViews() {
        this.wideView = new WideView(this.columns, this.rows, this.headers, this.titleColumnQty);
        this.narrowView = new NarrowView(
            this.features.firstColumnFeature.size, this.columns, this.rows, this.headers, this.titleColumnQty);
        return this;
    }

    /**
     * Returns a number of columns with suffix cells in a table.
     * @returns {number} A number of columns with suffix cells in a table.
     */
    get suffixColumnQty() {
        if (!this.columns) {
            throw new Error('Columns are not populated yet.');
        }
        return this.columns.length;
    }

    /**
     * Returns a number of columns with row titles in a table.
     * @returns {number} A number of columns with row titles.
     */
    get titleColumnQty() {
        if (!this.features) {
            throw new Error('Features are not defined.');
        }
        return this.features.titleColumnsQuantity;
    }

    /**
     * Returns a number of rows with suffix cells in a table.
     * @returns {number} A number of rows with suffix cells.
     */
    get suffixRowQty() {
        if (!this.columns) {
            throw new Error('Columns are not populated yet.');
        }
        return this.columns[0].length;
    }

    /**
     * Returns true if an ending grammatical feature defined by featureType has a value that is listed in a featureValues array.
     * This function is for use with Array.prototype.filter().
     * @param {string} featureType - a grammatical feature type we need to filter on.
     * @param {string | string[]} featureValues - a list of possible values of a type specified by featureType that
     * this ending should have.
     * @param {Suffix} suffix - an ending we need to filter out.
     * @returns {boolean} True if suffix has a value of a grammatical feature specified.
     */
    static filter(featureType, featureValues, suffix) {
        "use strict";

        // If not an array, convert it to array for uniformity
        if (!Array.isArray(featureValues)) {
            featureValues = [featureValues];
        }
        for (const value of featureValues) {
            if (suffix.features[featureType] === value) {
                return true;
            }
        }

        return false;
    };

    /**
     * Groups all suffixes into a tree according to their grammatical features. There are several levels in this tree.
     * Each level corresponds to a one grouping feature. The order of items in GroupingFeatures List object
     * defines an order of those levels.
     * Nodes on each level are values of a grammatical feature that forms this level. An order of those values
     * is determined by the order of values within a GroupFeatureType object of each feature.
     * This is a recursive function.
     * @param {Suffix[]} suffixes - Suffixes to be grouped.
     * @param {Feature[]} ancestorFeatures - A list of feature values on levels above the current.
     * @param {number} currentLevel - At what level in a tree we are now. Used to stop recursion.
     * @returns {NodeGroup} A top level group of suffixes that contain subgroups all way down to the last group.
     */
    groupByFeature(suffixes, ancestorFeatures = [], currentLevel = 0) {
        let group = new NodeGroup();
        group.groupFeatureType = this.features.items[currentLevel];
        group.ancestorFeatures = ancestorFeatures.slice();

        // Iterate over each value of the feature
        for (const featureValue of group.groupFeatureType.getOrderedFeatures(ancestorFeatures)) {
            if (ancestorFeatures.length>0 && ancestorFeatures[ancestorFeatures.length-1].type === group.groupFeatureType.type) {
                // Remove previously inserted feature of the same type
                ancestorFeatures.pop();
            }
            ancestorFeatures.push(featureValue);

            // Suffixes that are selected for current combination of feature values
            let selectedSuffixes = suffixes.filter(Table.filter.bind(this, group.groupFeatureType.type, featureValue.value));

            if (currentLevel < this.features.length - 1) {
                // Divide to further groups
                let subGroup = this.groupByFeature(selectedSuffixes, ancestorFeatures, currentLevel + 1);
                group.subgroups.push(subGroup);
                group.cells = group.cells.concat(subGroup.cells);
            }
            else {
                // This is the last level. This represent a cell with suffixes
                // Split result has a list of suffixes in a table cell. We need to combine items with same endings.
                if (selectedSuffixes.length > 0) {
                    if (this.suffixCellFilter) {
                        selectedSuffixes = selectedSuffixes.filter(this.suffixCellFilter);
                    }

                    selectedSuffixes = __WEBPACK_IMPORTED_MODULE_0__lib_lib__["n" /* Suffix */].combine(selectedSuffixes);
                }

                let cell = new Cell(selectedSuffixes, ancestorFeatures.slice());
                group.subgroups.push(cell);
                group.cells.push(cell);
                this.cells.push(cell);
                cell.index = this.cells.length - 1;
            }
        }
        ancestorFeatures.pop();
        return group;
    }

    /**
     * Create columns out of a suffixes organized into a tree.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Column[]} columns - An array of columns to be constructed.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} An array of columns of suffix cells.
     */
    constructColumns(tree = this.tree, columns = [], currentLevel = 0) {
        let currentFeature = this.features.items[currentLevel];

        let groups = [];
        for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate until it is the last row feature
            if (!currentFeature.isSameType(this.features.lastRowFeature)) {
                let currentResult = this.constructColumns(cellGroup, columns, currentLevel + 1);
                if (currentFeature.formsRow) {
                    // TODO: Avoid creating extra cells


                    let group = {
                        titleText: featureValue,
                        groups: currentResult,
                        titleCell: currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size)
                    };
                    group.groups[0].titleCell.parent = group.titleCell;
                    groups.push(group);
                }
                else if (currentFeature.isSameType(this.features.lastColumnFeature)) {
                    let column = new Column(cellGroup.cells);
                    column.groups = currentResult;
                    column.header = featureValue;
                    column.index = columns.length;
                    columns.push(column);
                    column.headerCell = this.headers[this.headers.length-1].cells[columns.length - 1];
                }
            }
            else {
                // Last level
                cellGroup.titleCell = currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size);
                let group = {
                    titleText: featureValue,
                    cell: cellGroup,
                    titleCell: cellGroup.titleCell
                };
                groups.push(group);
            }
        }
        if (currentFeature.formsRow) {
            return groups;
        }
        return columns;
    }

    /**
     * Creates an array of header cell rows.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Row[]} headers - An array of rows with header cells.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} A two-dimensional array of header cell rows.
     */
    constructHeaders(tree = this.tree, headers = [], currentLevel = 0) {
        let currentFeature = this.features.columnFeatures[currentLevel];

        let cells = [];
        for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate over all column features (features that form columns)
            if (currentLevel < this.features.columnFeatures.length - 1) {
                let subCells = this.constructHeaders(cellGroup, headers, currentLevel + 1);

                let columnSpan = 0;
                for (let cell of subCells) {
                    columnSpan += cell.span;
                }

                let headerCell = new HeaderCell(featureValue, currentFeature, columnSpan);
                headerCell.children = subCells;
                for (let cell of subCells) {
                    cell.parent = headerCell;
                }

                if (!headers[currentLevel]) {
                    headers[currentLevel] = new Row();
                }
                headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);

                headers[currentLevel].add(headerCell);
                cells.push(headerCell);
            }
            else {
                // Last level
                let headerCell = new HeaderCell(featureValue, currentFeature);

                if (!headers[currentLevel]) {
                    headers[currentLevel] = new Row();
                }

                headers[currentLevel].add(headerCell);
                headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);
                cells.push(headerCell);
            }
        }
        if (currentLevel === 0) {
            return headers;
        }
        else {
            return cells;
        }
    }

    /**
     * Creates an array of rows by parsing an array of columns.
     * @returns {Row[]} An array of rows.
     */
    constructRows() {
        let rows = [];
        for (let rowIndex = 0; rowIndex < this.suffixRowQty; rowIndex++) {
            rows[rowIndex] = new Row();
            rows[rowIndex].titleCell = this.columns[0].cells[rowIndex].titleCell;
            for (let columnIndex = 0; columnIndex < this.suffixColumnQty; columnIndex++) {
                rows[rowIndex].add(this.columns[columnIndex].cells[rowIndex]);
            }
        }
        return rows;
    }

    /**
     * Adds event listeners to each cell object.
     */
    addEventListeners() {
        for (let cell of this.cells) {
            cell.addEventListener('mouseenter', this.highlightRowAndColumn.bind(this));
            cell.addEventListener('mouseleave', this.clearRowAndColumnHighlighting.bind(this));
        }
    }

    /**
     * Highlights a row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
    highlightRowAndColumn(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].highlightRowAndColumn();
    }

    /**
     * Removes highlighting from row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
    clearRowAndColumnHighlighting(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].clearRowAndColumnHighlighting();
    }

    /**
     * Hides empty columns in a table.
     */
    hideEmptyColumns() {
        for (let column of this.columns) {
            if (column.empty) {
                column.hide();
            }
        }
        this.emptyColumnsHidden = true;
    }

    /**
     * Show all empty columns that were previously hidden.
     */
    showEmptyColumns() {
        for (let column of this.columns) {
            if (column.hidden) {
                column.show();
            }
        }
        this.emptyColumnsHidden = false;
    }

    /**
     * Hide groups that have no suffix matches.
     */
    hideNoSuffixGroups() {
        for (let headerCell of this.headers[0].cells) {
            let matches = !!headerCell.columns.find(column => column.suffixMatches);
            if (!matches) {
                for (let column of headerCell.columns) {
                    column.hide();
                }
            }
        }
        this.suffixMatchesHidden = true;
    }

    /**
     * Show groups that have no suffix matches.
     */
    showNoSuffixGroups() {
        for (let column of this.columns) {
            column.show();
        }
        if (this.emptyColumnsHidden) {
            this.hideEmptyColumns();
        }
        this.suffixMatchesHidden = false;
    }
}

/**
 * Represents a list of footnotes.
 */
class Footnotes {

    /**
     * Initialises a Footnotes object.
     * @param {Footnote[]} footnotes - An array of footnote objects.
     */
    constructor(footnotes) {
        this.footnotes = footnotes;

        this.nodes = document.createElement('dl');
        this.nodes.id = __WEBPACK_IMPORTED_MODULE_1__styles_styles__["b" /* footnotes */].id;
        this.nodes.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].footnotesContainer);
        for (let footnote of footnotes) {
            let index = document.createElement('dt');
            index.innerHTML = footnote.index;
            this.nodes.appendChild(index);
            let text = document.createElement('dd');
            text.innerHTML = footnote.text;
            this.nodes.appendChild(text);
        }
    }

    /**
     * Returns an HTML representation of a Footnotes object.
     * @returns {HTMLElement} An HTML representation of a Footnotes object.
     */
    get html() {
        return this.nodes;
    }
}


/**
 * Represents a single view.
 */
class View {

    /**
     * Initializes a View object with options. There is at least one view per part of speech,
     * but there could be several views for the same part of speech that show different table representation of a view.
     * @param {Object} viewOptions
     */
    constructor() {

        //this.options = viewOptions;
        this.pageHeader = {};

        // An HTML element where this view is rendered
        this.container = undefined;

        // Must be implemented in a descendant
        this.id = 'baseView';
        this.name = 'base view';
        this.title = 'Base View';
        this.language = undefined;
        this.partOfSpeech = undefined;
    }

    /**
     * Converts a WordData, returned from inflection tables library, into an HTML representation of an inflection table
     * and inserts that HTML into a `container` HTML element. `messages` provides a translation for view's texts.
     * @param {HTMLElement} container - An HTML element where this view will be inserted.
     * @param {WordData} wordData - A result set from inflection tables library.
     * @param {MessageBundle} messages - A message bundle with message translations.
     */
    render(container, wordData, messages) {
        "use strict";

        this.messages = messages;
        this.container = container;
        this.wordData = wordData;
        let selection = wordData[this.partOfSpeech];

        this.footnotes = new Footnotes(selection.footnotes);

        //this.table = new Table(selection.suffixes, this.groupingFeatures, messages);
        //this.table = new Table();
        //this.setTableData();
        this.table.messages = messages;
        this.table.construct(selection.suffixes).constructViews();
        this.display();
    }

    /**
     * Renders a view's HTML representation and inserts it into `container` HTML element.
     */
    display() {
        // Clear the container
        this.container.innerHTML = '';

        let word = document.createElement('h2');
        word.innerHTML = this.wordData.homonym.targetWord;
        this.container.appendChild(word);

        let title = document.createElement('h3');
        title.innerHTML = this.title;
        this.container.appendChild(title);

        this.pageHeader = { nodes: document.createElement('div') };
        this.pageHeader.nodes.innerHTML = __WEBPACK_IMPORTED_MODULE_1__styles_styles__["d" /* pageHeader */].html;
        this.pageHeader.hideEmptyColumnsBtn = this.pageHeader.nodes.querySelector(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["d" /* pageHeader */].hideEmptyColumnsBtnSel);
        this.pageHeader.showEmptyColumnsBtn = this.pageHeader.nodes.querySelector(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["d" /* pageHeader */].showEmptyColumnsBtnSel);
        this.pageHeader.hideNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["d" /* pageHeader */].hideNoSuffixGroupsBtnSel);
        this.pageHeader.showNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["d" /* pageHeader */].showNoSuffixGroupsBtnSel);
        this.container.appendChild(this.pageHeader.nodes);


        // Insert a wide view
        this.container.appendChild(this.table.wideView.render());
        // Insert narrow views
        this.container.appendChild(this.table.narrowView.render());

        this.table.addEventListeners();

        this.container.appendChild(this.footnotes.html);

        this.pageHeader.hideEmptyColumnsBtn.addEventListener('click', this.hideEmptyColumns.bind(this));
        this.pageHeader.showEmptyColumnsBtn.addEventListener('click', this.showEmptyColumns.bind(this));

        this.pageHeader.hideNoSuffixGroupsBtn.addEventListener('click', this.hideNoSuffixGroups.bind(this));
        this.pageHeader.showNoSuffixGroupsBtn.addEventListener('click', this.showNoSuffixGroups.bind(this));
    }


    /**
     * Hides all empty columns of the view.
     */
    hideEmptyColumns() {
        this.table.hideEmptyColumns();
        this.display();
        this.pageHeader.hideEmptyColumnsBtn.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
        this.pageHeader.showEmptyColumnsBtn.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
    }

    /**
     * Displays all previously hidden columns.
     */
    showEmptyColumns() {
        this.table.showEmptyColumns();
        this.display();
        this.pageHeader.showEmptyColumnsBtn.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
        this.pageHeader.hideEmptyColumnsBtn.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
    }

    /**
     * Hides groups (formed by first column feature) that have no suffix matches.
     */
    hideNoSuffixGroups() {
        this.table.hideNoSuffixGroups();
        this.display();
        this.pageHeader.hideNoSuffixGroupsBtn.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
        this.pageHeader.showNoSuffixGroupsBtn.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
    }

    /**
     * Displays previously hidden groups with no suffix matches.
     */
    showNoSuffixGroups() {
        this.table.showNoSuffixGroups();
        this.display();
        this.pageHeader.hideNoSuffixGroupsBtn.classList.add(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
        this.pageHeader.showNoSuffixGroupsBtn.classList.remove(__WEBPACK_IMPORTED_MODULE_1__styles_styles__["a" /* classNames */].hidden);
    }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/*
Objects of a morphology analyzer's library
 */



/**
 * Holds all information required to transform from morphological analyzer's grammatical feature values to the
 * library standards. There is one ImportData object per language.
 */
class ImportData {
    /**
     * Creates an InmportData object for the language provided.
     * @param {string} language - A language of the import data.
     */
    constructor(language) {
        "use strict";
        this.language = language;
    }

    /**
     * Adds a grammatical feature whose values to be mapped.
     * @param {string} featureName - A name of a grammatical feature (i.e. declension, number, etc.)
     * @return {Object} An object that represent a newly created grammatical feature.
     */
    addFeature(featureName) {
        this[featureName] = {};
        let language = this.language;

        this[featureName].add = function add(providerValue, alpheiosValue) {
            "use strict";
            this[providerValue] = alpheiosValue;
            return this;
        };

        this[featureName].get = function get(providerValue) {
            "use strict";
            if (!this.importer.has(providerValue)) {
                throw new Error("Skipping an unknown value '"
                    + providerValue + "' of a grammatical feature '" + featureName + "' of " + language + " language.");
            }
            else {
                return this.importer.get(providerValue);
            }

        };

        this[featureName].importer = new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["f" /* Importer */]();

        return this[featureName];
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Papa Parse
	v4.3.6
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	if (true)
	{
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module === 'object' && typeof exports !== 'undefined')
	{
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
	else
	{
		// Browser globals (root is window)
		root.Papa = factory();
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
		}
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
		}

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
		}

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		}

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
		}

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
		}

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		}

		this._chunkError = function()
		{
			this._sendError(reader.error);
		}

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
		}
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		}
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
		}

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
		}

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
						emptyLinesCount++
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


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MessagingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return WordDataRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WordDataResponse; });
/* unused harmony export StatusRequest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return StatusResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivateRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DeactivateRequest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid_v1__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid_v1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uuid_v1__);





class Message {
    constructor(message) {
        this.requestType = undefined;
        this.type = Message.types.GENERIC_MESSAGE;
        this.status = undefined;
        this.ID = __WEBPACK_IMPORTED_MODULE_1_uuid_v1___default()();
        this.body = message;
    }

    static get types() {
        return {
            GENERIC_MESSAGE: 'GenericMessage',
            WORD_DATA_REQUEST: 'WordDataRequest',
            WORD_DATA_RESPONSE: 'WordDataResponse',
            STATUS_REQUEST: 'StatusRequest',
            STATUS_RESPONSE: 'StatusResponse',
            ACTIVATE_REQUEST: 'ActivateRequest',
            DEACTIVATE_REQUEST: 'DeactivateRequest',
        };
    }

    static get requestTypes() {
        return {
            REQUEST: 'Request',
            RESPONSE: 'Response'
        }
    }

    static get statuses() {
        return {
            DATA_FOUND: 'DataFound', // Requested word's data has been found
            NO_DATA_FOUND: 'NoDataFound', // Requested word's data has not been found,
            ACTIVE: 'Active', // Content script is loaded and active
            DEACTIVATED: 'Deactivated' // Content script has been loaded, but is deactivated
        };
    }
 }

 class RequestMessage extends Message {
    constructor() {
        super();
        this.requestType = Message.requestTypes.REQUEST;
    }
 }

class ResponseMessage extends Message {
    constructor(request) {
        super();
        this.requestType = Message.requestTypes.RESPONSE;
        this.requestID = request.ID; // ID of the request to match request and response
    }
}

 class RequestInfo {
    constructor() {
        this.resolve = undefined;
        this.reject = undefined;
        // Promise sets reject and resolve
        this.promise = new Promise(this.executor.bind(this));
    }

    executor(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
 }

 class MessagingService {
    constructor() {
        this.map = new Map();
    }

    registerRequest(message, timeout = undefined) {
        let requestInfo = new RequestInfo(message);
        this.map.set(message.ID, requestInfo);
        if (timeout) {
            requestInfo.timeoutID = window.setTimeout((messageID) => {
                let requestInfo = this.map.get(messageID);
                requestInfo.reject('Timeout expired'); // Reject a promise
                this.map.delete(messageID); // Remove from map
                console.log(`Map length is ${this.map.size}`);
            }, timeout, message.ID);
        }
        console.log(`Map length is ${this.map.size}`);
        return requestInfo.promise;
    }

    sendRequestToTab(tabID, message, timeout) {
        browser.tabs.sendMessage(tabID, message);
        return this.registerRequest(message, timeout);
    }

     sendRequestToBg(message) {
         browser.runtime.sendMessage(message);
         return this.registerRequest(message);
     }

     sendResponseToTab(tabID, message) {
         browser.tabs.sendMessage(tabID, message);
     }

     sendResponseToBg(message) {
         browser.runtime.sendMessage(message);
     }

     handleResponse(responseMessage) {
        if (responseMessage.requestType && responseMessage.requestType === Message.requestTypes.RESPONSE) {
            if (responseMessage.requestID && this.map.has(responseMessage.requestID)) {
                let requestInfo = this.map.get(responseMessage.requestID);
                window.clearTimeout(requestInfo.timeoutID); // Clear a timeout
                requestInfo.resolve(responseMessage); // Resolve with a response message
                this.map.delete(responseMessage.requestID); // Remove request from a map
                console.log(`Map length is ${this.map.size}`);
            }
        }
     }
 }


class WordDataRequest extends RequestMessage {
    constructor(language, word) {
        super();
        this.type = Message.types.WORD_DATA_REQUEST;
        this.body = new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["m" /* SelectedWord */](language, word);
    }
}


class WordDataResponse extends ResponseMessage {
    constructor(wordData, status, request) {
        super(request);
        this.type = Message.types.WORD_DATA_RESPONSE;
        this.status = status;
        this.body = wordData;
    }
}

class StatusRequest extends RequestMessage {
    constructor() {
        super();
        this.requestType = Message.requestTypes.REQUEST;
        this.type = Message.types.STATUS_REQUEST;
    }
}

class StatusResponse extends ResponseMessage {
    constructor(status, request) {
        super(request);
        this.status = status;
        this.type = Message.types.STATUS_RESPONSE;
    }
}

class ActivateRequest extends RequestMessage {
    constructor() {
        super();
        this.type = Message.types.ACTIVATE_REQUEST;
    }
}

class DeactivateRequest extends RequestMessage {
    constructor() {
        super();
        this.type = Message.types.DEACTIVATE_REQUEST;
    }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports.extend = extend;
var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
        i, len, source, key;

    for (i = 0, len = sources.length; i < len; i += 1) {
        source = sources[i];
        if (!source) { continue; }

        for (key in source) {
            if (hop.call(source, key)) {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}
exports.hop = hop;

//# sourceMappingURL=utils.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__analyzer_tufts_adapter__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_message__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_content_process__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_lang_latin_latin__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_lang_greek_greek__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





// Import language data



var alpheiosTestData = {
    definition: "\n                <h4>Some Dummy word data</h4>\n                <p>\n                    Nunc maximus ex id tincidunt pretium. Nunc vel dignissim magna, ut hendrerit lectus. Proin aliquet purus at\n                    ullamcorper dignissim. Sed mollis maximus dui. Morbi viverra, metus in fermentum lobortis, arcu est vehicula nibh, a\n                    efficitur orci libero eu eros. Nam vulputate risus sed odio fermentum, quis pharetra nibh tincidunt. Mauris eu\n                    posuere nunc, tincidunt accumsan metus. Nullam quis enim laoreet, euismod lacus ut, maximus ipsum. Donec vitae\n                    sapien non sem eleifend posuere sed vel mauris.\n                </p>\n                <p>\n                    Sed non orci convallis, iaculis ipsum quis, luctus orci. In et auctor metus. Vestibulum venenatis turpis nibh, vitae\n                    ornare urna fringilla eu. Nam efficitur blandit metus. Nullam in quam et sapien iaculis accumsan nec ut neque.\n                    Aenean aliquam urna quis egestas tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames\n                    ac turpis egestas. Praesent sit amet tellus dignissim, tristique ante luctus, gravida lectus.\n                </p>\n            "
};

var ContentData = function ContentData(tabID, status) {
    _classCallCheck(this, ContentData);

    this.tabID = tabID;
    this.status = status;
};

var BackgroundProcess = function () {
    function BackgroundProcess() {
        _classCallCheck(this, BackgroundProcess);

        this.settings = BackgroundProcess.defaults;
        this.settings.browserSupport = !(typeof browser === "undefined");

        this.maAdapter = new __WEBPACK_IMPORTED_MODULE_1__analyzer_tufts_adapter__["a" /* default */](); // Morphological analyzer adapter
        this.maAdapter.fetch = this.maAdapter.fetchTestData; // Switch adapter to a test mode

        this.tabs = new Map(); // A list of tabs that have content script loaded

        this.messagingService = new __WEBPACK_IMPORTED_MODULE_2__lib_message__["d" /* MessagingService */]();
    }

    _createClass(BackgroundProcess, [{
        key: "initialize",
        value: function initialize() {
            console.log('initialize');

            this.langData = new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["h" /* LanguageData */]([__WEBPACK_IMPORTED_MODULE_4__lib_lang_latin_latin__["c" /* dataSet */], __WEBPACK_IMPORTED_MODULE_5__lib_lang_greek_greek__["b" /* dataSet */]]).loadData();

            browser.runtime.onMessage.addListener(this.messageListener.bind(this));

            BackgroundProcess.createMenuItem();

            browser.contextMenus.onClicked.addListener(this.menuListener.bind(this));
            browser.browserAction.onClicked.addListener(this.browserActionListener.bind(this));
        }
    }, {
        key: "isContentLoaded",
        value: function isContentLoaded(tabID) {
            return this.tabs.has(tabID);
        }
    }, {
        key: "isContentActive",
        value: function isContentActive(tabID) {
            return this.isContentLoaded(tabID) && this.tabs.get(tabID).status === __WEBPACK_IMPORTED_MODULE_3__content_content_process__["a" /* Process */].statuses.ACTIVE;
        }
    }, {
        key: "activateContent",
        value: function activateContent(tabID) {
            if (!this.isContentLoaded(tabID)) {
                // This tab has no content loaded
                this.loadContent(tabID);
            } else {
                if (!this.isContentActive(tabID)) {
                    this.sendRequestToTab(tabID, new __WEBPACK_IMPORTED_MODULE_2__lib_message__["a" /* ActivateRequest */](), 1000);
                }
            }
        }
    }, {
        key: "deactivateContent",
        value: function deactivateContent(tabID) {
            if (this.isContentActive(tabID)) {
                this.sendRequestToTab(tabID, new __WEBPACK_IMPORTED_MODULE_2__lib_message__["b" /* DeactivateRequest */](), 1000);
            }
        }
    }, {
        key: "loadPolyfill",
        value: function loadPolyfill(tabID) {
            if (!this.settings.browserSupport) {
                console.log('Loading WebExtension polyfill into a content tab');
                return browser.tabs.executeScript(tabID, {
                    file: this.settings.browserPolyfillName
                });
            } else {
                return Promise.resolve();
            }
        }
    }, {
        key: "loadContentScript",
        value: function loadContentScript(tabID) {
            console.log('Loading content script into a content tab');
            return browser.tabs.executeScript(tabID, {
                file: this.settings.contentScriptFileName
            });
        }
    }, {
        key: "loadContentCSS",
        value: function loadContentCSS(tabID) {
            console.log('Loading CSS into a content tab');
            return browser.tabs.insertCSS(tabID, {
                file: this.settings.contentCSSFileName
            });
        }
    }, {
        key: "loadContent",
        value: function loadContent(tabID) {
            var _this = this;

            var polyfillScript = this.loadPolyfill(tabID);
            var contentScript = this.loadContentScript(tabID);
            var contentCSS = this.loadContentCSS(tabID);
            Promise.all([polyfillScript, contentScript, contentCSS]).then(function () {
                console.log('Content script(s) has been loaded successfully or already present');
                _this.tabs.set(tabID, new ContentData(tabID, __WEBPACK_IMPORTED_MODULE_3__content_content_process__["a" /* Process */].statuses.ACTIVE));
                BackgroundProcess.defaults.contentScriptLoaded = true;
            }, function (error) {
                throw new Error('Content script loading failed', error);
            });
        }
    }, {
        key: "sendRequestToTab",
        value: function sendRequestToTab(tabID, request, timeout) {
            var _this2 = this;

            this.messagingService.sendRequestToTab(tabID, request, timeout).then(function (message) {
                console.log("\"" + request.type + "\" request to tab completed successfully", message);
                _this2.tabs.get(tabID).status = message.status;
            }, function (error) {
                console.log("\"" + request.type + "\" request to tab failed, error: " + error);
            });
        }
    }, {
        key: "messageListener",
        value: async function messageListener(message, sender) {
            console.log("Message from the content script: ", message);

            if (message.requestType === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].requestTypes.RESPONSE) {
                this.messagingService.handleResponse(message);
            }

            if (message.type === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].types.WORD_DATA_REQUEST) {
                var selectedWord = __WEBPACK_IMPORTED_MODULE_0__lib_lib__["m" /* SelectedWord */].readObjects(message.body);
                console.log("Request for a \"" + selectedWord.word + "\" word");

                try {
                    var homonym = await this.maAdapter.getHomonym(selectedWord.language, selectedWord.word);
                    var wordData = undefined;
                    var status = __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].statuses.NO_DATA_FOUND;
                    if (homonym) {
                        // If word data is found, get matching suffixes from an inflection library
                        wordData = this.langData.getSuffixes(homonym);
                        wordData.definition = encodeURIComponent(alpheiosTestData.definition);
                        status = __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].statuses.DATA_FOUND;
                        console.log(wordData);
                    }
                    await BackgroundProcess.sendMessageToActiveTab(new __WEBPACK_IMPORTED_MODULE_2__lib_message__["g" /* WordDataResponse */](wordData, status, message));
                } catch (error) {
                    console.error("An error occurred during a retrieval of word data: " + error.message);
                }
            }
            // Should not send any response as it is not supported by webextensions polyfill and will probably be deprecated
            return false;
        }
    }, {
        key: "menuListener",
        value: async function menuListener(info, tab) {
            if (info.menuItemId === this.settings.activateMenuItemId) {
                this.activateContent(tab.id);
            } else if (info.menuItemId === this.settings.deactivateMenuItemId) {
                this.deactivateContent(tab.id);
            }
        }
    }, {
        key: "browserActionListener",
        value: async function browserActionListener(tab) {
            this.activateContent(tab.id);
        }
    }], [{
        key: "getActiveTab",
        value: function getActiveTab() {
            return browser.tabs.query({
                active: true
            });
            // return new Promise((resolve, reject) => reject('Rejected message'));
        }
    }, {
        key: "sendMessageToActiveTab",
        value: async function sendMessageToActiveTab(message) {
            var tabs = await BackgroundProcess.getActiveTab();
            BackgroundProcess.sendMessageToTab(tabs[0].id, message);
        }
    }, {
        key: "sendMessageToTab",
        value: async function sendMessageToTab(tabID, message) {
            browser.tabs.sendMessage(tabID, message);
            console.log("Sent a message to a tab with id \"" + tabID + "\"");
        }
    }, {
        key: "createMenuItem",
        value: function createMenuItem() {
            browser.contextMenus.create({
                id: BackgroundProcess.defaults.activateMenuItemId,
                title: BackgroundProcess.defaults.activateMenuItemText
            });
            browser.contextMenus.create({
                id: BackgroundProcess.defaults.deactivateMenuItemId,
                title: BackgroundProcess.defaults.deactivateMenuItemText
            });
        }
    }, {
        key: "defaults",
        get: function get() {
            return {
                activateMenuItemId: 'activate-alpheios-content',
                activateMenuItemText: 'Activate',
                deactivateMenuItemId: 'deactivate-alpheios-content',
                deactivateMenuItemText: 'Deactivate',
                contentCSSFileName: 'styles/style.css',
                contentScriptFileName: 'content.js',
                browserPolyfillName: 'support/webextension-polyfill/browser-polyfill.js',
                contentScriptLoaded: false
            };
        }
    }]);

    return BackgroundProcess;
}();

var backgroundProcess = new BackgroundProcess();
/*
BackgroundProcess constructor performs a `browser` global object support detection. Because of that,
webextension-polyfill, that emulates a `browser` object, should be loaded after BackgroundProcess constructor.
 */
window.browser = __webpack_require__(52);
backgroundProcess.initialize();
console.log("Support of global \"browser\" object: " + backgroundProcess.settings.browserSupport);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lang_latin__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lang_greek__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tests_data_test_data__ = __webpack_require__(20);





class TuftsAdapter {
    constructor() {
        // Register importers
        this[__WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].latin] = __WEBPACK_IMPORTED_MODULE_1__lang_latin__["a" /* default */];
        this[__WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].greek] = __WEBPACK_IMPORTED_MODULE_2__lang_greek__["a" /* default */];
        this.langMap = new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["f" /* Importer */]().map('lat', __WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].latin).map('grc', __WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].greek);
        return this;
    }

    // Not implemented yet
    async fetch(lang, word) {
    }

    /**
     * Returns an emulated morphological analyzer's output in a JSON format.
     * This function is async to match fetch().
     * @param lang - A language code of a word requested (not needed; used to match a fetch() signature).
     * @param word - A word whose data needs to be retrieved.
     * @return {Promise.<void> | undefined} - A promise resolved with a parsed JSON object representing a word info,
     * undefined if word data is not found, or a promise rejected with an error message.
     */
    async fetchTestData(lang, word) {
        if (!this.testWordData) {
            this.testWordData = new __WEBPACK_IMPORTED_MODULE_3__tests_data_test_data__["a" /* WordTestData */]();
        }
        let json = this.testWordData.get(word);
        if (json) {
            return JSON.parse(this.testWordData.get(word));
        }
        else {
            // No data is found for this word
            return undefined
        }
    }

    /**
     * A function that maps a morphological service's specific data types and values into an inflection library standard.
     * @param {object} jsonObj - A JSON data from a Morphological Analyzer.
     * @returns {Homonym} A library standard Homonym object.
     */
    transform (jsonObj) {
        "use strict";
        let lexemes = [];
        let annotationBody = jsonObj.RDF.Annotation.Body;
        if (!Array.isArray(annotationBody)) {
            /*
            If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
            Let's convert it to an array so we can work with it in the same way no matter what format it is.
             */
            annotationBody = [annotationBody];
        }
        for (let lexeme of annotationBody) {
            // Get importer based on the language
            let language = this.langMap.get(lexeme.rest.entry.dict.hdwd.lang);
            let lemma = new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["j" /* Lemma */](lexeme.rest.entry.dict.hdwd.$, language);

            let inflections = [];
            let inflectionsJSON = lexeme.rest.entry.infl;
            if (!Array.isArray(inflectionsJSON)) {
                // If only one inflection returned, it is a single object, not an array of objects. Convert it to an array for uniformity.
                inflectionsJSON = [inflectionsJSON];
            }
            for (let inflectionJSON of inflectionsJSON) {
                let inflection = new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["g" /* Inflection */](inflectionJSON.term.stem.$, language);
                if (inflectionJSON.term.suff) {
                    // Set suffix if provided by a morphological analyzer
                    inflection.suffix = inflectionJSON.term.suff.$;
                }

                // Parse whatever grammatical features we're interested in
                if (inflectionJSON.pofs) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].part].get(inflectionJSON.pofs.$);
                }

                if (inflectionJSON.case) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].grmCase].get(inflectionJSON.case.$);
                }

                if (inflectionJSON.decl) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].declension].get(inflectionJSON.decl.$);
                }

                if (inflectionJSON.num) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].number].get(inflectionJSON.num.$);
                }

                if (inflectionJSON.gend) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].gender].get(inflectionJSON.gend.$);
                }

                if (inflectionJSON.conj) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].conjugation].get(inflectionJSON.conj.$);
                }

                if (inflectionJSON.tense) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].tense].get(inflectionJSON.tense.$);
                }

                if (inflectionJSON.voice) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].voice].get(inflectionJSON.voice.$);
                }

                if (inflectionJSON.mood) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].mood].get(inflectionJSON.mood.$);
                }

                if (inflectionJSON.pers) {
                    inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].person].get(inflectionJSON.pers.$);
                }

                inflections.push(inflection);
            }
            lexemes.push(new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["k" /* Lexeme */](lemma, inflections));
        }
        return new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["e" /* Homonym */](lexemes);
    }

    async getHomonym(lang, word) {
        let jsonObj = await this.fetch(lang, word);
        if (jsonObj) {
            let homonym = this.transform(jsonObj);
            homonym.targetWord = word;
            return homonym;
        }
        else {
            // No data found for this word
            return undefined;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TuftsAdapter);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_lib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__ = __webpack_require__(1);




let data = new __WEBPACK_IMPORTED_MODULE_1__lib_lib__["a" /* ImportData */](__WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].latin);

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].part).importer
    .map('noun', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["h" /* parts */].noun)
    .map('adjective', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["h" /* parts */].adjective)
    .map('verb', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["h" /* parts */].verb);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].grmCase).importer
    .map('nominative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["a" /* cases */].nominative)
    .map('genitive', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["a" /* cases */].genitive)
    .map('dative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["a" /* cases */].dative)
    .map('accusative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["a" /* cases */].accusative)
    .map('ablative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["a" /* cases */].ablative)
    .map('locative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["a" /* cases */].locative)
    .map('vocative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["a" /* cases */].vocative);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].declension).importer
    .map('1st', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["d" /* declensions */].first)
    .map('2nd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["d" /* declensions */].second)
    .map('3rd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["d" /* declensions */].third)
    .map('4th', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["d" /* declensions */].fourth)
    .map('5th', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["d" /* declensions */].fifth);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].number).importer
    .map('singular', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["g" /* numbers */].singular)
    .map('plural', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["g" /* numbers */].plural);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].gender).importer
    .map('masculine', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["e" /* genders */].masculine)
    .map('feminine', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["e" /* genders */].feminine)
    .map('neuter', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["e" /* genders */].neuter)
    .map('common', [__WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["e" /* genders */].masculine, __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["e" /* genders */].feminine]);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].conjugation).importer
    .map('1st', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["b" /* conjugations */].first)
    .map('2nd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["b" /* conjugations */].second)
    .map('3rd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["b" /* conjugations */].third)
    .map('4th', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["b" /* conjugations */].fourth);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].tense).importer
    .map('present', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["j" /* tenses */].present)
    .map('imperfect', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["j" /* tenses */].imperfect)
    .map('future', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["j" /* tenses */].future)
    .map('perfect', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["j" /* tenses */].perfect)
    .map('pluperfect', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["j" /* tenses */].pluperfect)
    .map('future_perfect', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["j" /* tenses */]['future perfect']);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].voice).importer
    .map('active', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["l" /* voices */].active)
    .map('passive', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["l" /* voices */].passive);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].mood).importer
    .map('indicative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["f" /* moods */].indicative)
    .map('subjunctive', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["f" /* moods */].subjunctive);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].person).importer
    .map('1st', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["i" /* persons */].first)
    .map('2nd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["i" /* persons */].second)
    .map('3rd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_latin_latin__["i" /* persons */].third);

/* harmony default export */ __webpack_exports__["a"] = (data);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "Ending,Number,Case,Declension,Gender,Type,Footnote\r\na,singular,nominative,1st,feminine,regular,\r\nē,singular,nominative,1st,feminine,irregular,\r\nēs,singular,nominative,1st,feminine,irregular,\r\nā,singular,nominative,1st,feminine,irregular,7\r\nus,singular,nominative,2nd,masculine feminine,regular,\r\ner,singular,nominative,2nd,masculine feminine,regular,\r\nir,singular,nominative,2nd,masculine feminine,regular,\r\n-,singular,nominative,2nd,masculine feminine,irregular,\r\nos,singular,nominative,2nd,masculine feminine,irregular,1\r\nōs,singular,nominative,2nd,masculine feminine,irregular,\r\nō,singular,nominative,2nd,masculine feminine,irregular,7\r\num,singular,nominative,2nd,neuter,regular,\r\nus,singular,nominative,2nd,neuter,irregular,10\r\non,singular,nominative,2nd,neuter,irregular,7\r\n-,singular,nominative,3rd,masculine feminine,regular,\r\nos,singular,nominative,3rd,masculine feminine,irregular,\r\nōn,singular,nominative,3rd,masculine feminine,irregular,7\r\n-,singular,nominative,3rd,neuter,regular,\r\nus,singular,nominative,4th,masculine feminine,regular,\r\nū,singular,nominative,4th,neuter,regular,\r\nēs,singular,nominative,5th,feminine,regular,\r\nae,singular,genitive,1st,feminine,regular,\r\nāī,singular,genitive,1st,feminine,irregular,1\r\nās,singular,genitive,1st,feminine,irregular,2\r\nēs,singular,genitive,1st,feminine,irregular,7\r\nī,singular,genitive,2nd,masculine feminine,regular,\r\nō,singular,genitive,2nd,masculine feminine,irregular,7\r\nī,singular,genitive,2nd,neuter,regular,\r\nis,singular,genitive,3rd,masculine feminine,regular,\r\nis,singular,genitive,3rd,neuter,regular,\r\nūs,singular,genitive,4th,masculine feminine,regular,\r\nuis,singular,genitive,4th,masculine feminine,irregular,1\r\nuos,singular,genitive,4th,masculine feminine,irregular,1\r\nī,singular,genitive,4th,masculine feminine,irregular,15\r\nūs,singular,genitive,4th,neuter,regular,\r\nēī,singular,genitive,5th,feminine,regular,\r\neī,singular,genitive,5th,feminine,regular,\r\nī,singular,genitive,5th,feminine,irregular,\r\nē,singular,genitive,5th,feminine,irregular,\r\nēs,singular,genitive,5th,feminine,irregular,6\r\nae,singular,dative,1st,feminine,regular,\r\nāī,singular,dative,1st,feminine,irregular,1\r\nō,singular,dative,2nd,masculine feminine,regular,\r\nō,singular,dative,2nd,neuter,regular,\r\nī,singular,dative,3rd,masculine feminine,regular,\r\ne,singular,dative,3rd,masculine feminine,irregular,17\r\nī,singular,dative,3rd,neuter,regular,\r\nūī,singular,dative,4th,masculine feminine,regular,\r\nū,singular,dative,4th,masculine feminine,regular,\r\nū,singular,dative,4th,neuter,regular,\r\nēī,singular,dative,5th,feminine,regular,\r\neī,singular,dative,5th,feminine,regular,\r\nī,singular,dative,5th,feminine,irregular,\r\nē,singular,dative,5th,feminine,irregular,6\r\nam,singular,accusative,1st,feminine,regular,\r\nēn,singular,accusative,1st,feminine,irregular,\r\nān,singular,accusative,1st,feminine,irregular,7\r\num,singular,accusative,2nd,masculine feminine,regular,\r\nom,singular,accusative,2nd,masculine feminine,irregular,1\r\nōn,singular,accusative,2nd,masculine feminine,irregular,7\r\num,singular,accusative,2nd,neuter,regular,\r\nus,singular,accusative,2nd,neuter,irregular,10\r\non,singular,accusative,2nd,neuter,irregular,7\r\nem,singular,accusative,3rd,masculine feminine,regular,\r\nim,singular,accusative,3rd,masculine feminine,irregular,11\r\na,singular,accusative,3rd,masculine feminine,irregular,7\r\n-,singular,accusative,3rd,neuter,regular,\r\num,singular,accusative,4th,masculine feminine,regular,\r\nū,singular,accusative,4th,neuter,regular,\r\nem,singular,accusative,5th,feminine,regular,\r\nā,singular,ablative,1st,feminine,regular,\r\nād,singular,ablative,1st,feminine,irregular,5\r\nē,singular,ablative,1st,feminine,irregular,7\r\nō,singular,ablative,2nd,masculine feminine,regular,\r\nōd,singular,ablative,2nd,masculine feminine,irregular,1\r\nō,singular,ablative,2nd,neuter,regular,\r\ne,singular,ablative,3rd,masculine feminine,regular,\r\nī,singular,ablative,3rd,masculine feminine,irregular,11\r\ne,singular,ablative,3rd,neuter,regular,\r\nī,singular,ablative,3rd,neuter,irregular,11\r\nū,singular,ablative,4th,masculine feminine,regular,\r\nūd,singular,ablative,4th,masculine feminine,irregular,1\r\nū,singular,ablative,4th,neuter,regular,\r\nē,singular,ablative,5th,feminine,regular,\r\nae,singular,locative,1st,feminine,regular,\r\nō,singular,locative,2nd,masculine feminine,regular,\r\nō,singular,locative,2nd,neuter,regular,\r\ne,singular,locative,3rd,masculine feminine,regular,\r\nī,singular,locative,3rd,masculine feminine,regular,\r\nī,singular,locative,3rd,neuter,regular,\r\nū,singular,locative,4th,masculine feminine,regular,\r\nū,singular,locative,4th,neuter,regular,\r\nē,singular,locative,5th,feminine,regular,\r\na,singular,vocative,1st,feminine,regular,\r\nē,singular,vocative,1st,feminine,irregular,\r\nā,singular,vocative,1st,feminine,irregular,7\r\ne,singular,vocative,2nd,masculine feminine,regular,\r\ner,singular,vocative,2nd,masculine feminine,regular,\r\nir,singular,vocative,2nd,masculine feminine,regular,\r\n-,singular,vocative,2nd,masculine feminine,irregular,\r\nī,singular,vocative,2nd,masculine feminine,irregular,8\r\nōs,singular,vocative,2nd,masculine feminine,irregular,\r\ne,singular,vocative,2nd,masculine feminine,irregular,7\r\num,singular,vocative,2nd,neuter,regular,\r\non,singular,vocative,2nd,neuter,irregular,7\r\n-,singular,vocative,3rd,masculine feminine,regular,\r\n-,singular,vocative,3rd,neuter,regular,\r\nus,singular,vocative,4th,masculine feminine,regular,\r\nū,singular,vocative,4th,neuter,regular,\r\nēs,singular,vocative,5th,feminine,regular,\r\nae,plural,nominative,1st,feminine,regular,\r\nī,plural,nominative,2nd,masculine feminine,regular,\r\noe,plural,nominative,2nd,masculine feminine,irregular,7 9\r\na,plural,nominative,2nd,neuter,regular,\r\nēs,plural,nominative,3rd,masculine feminine,regular,\r\nes,plural,nominative,3rd,masculine feminine,irregular,7\r\na,plural,nominative,3rd,neuter,regular,\r\nia,plural,nominative,3rd,neuter,irregular,11\r\nūs,plural,nominative,4th,masculine feminine,regular,\r\nua,plural,nominative,4th,neuter,regular,\r\nēs,plural,nominative,5th,feminine,regular,\r\nārum,plural,genitive,1st,feminine,regular,\r\num,plural,genitive,1st,feminine,irregular,3\r\nōrum,plural,genitive,2nd,masculine feminine,regular,\r\num,plural,genitive,2nd,masculine feminine,irregular,\r\nom,plural,genitive,2nd,masculine feminine,irregular,8\r\nōrum,plural,genitive,2nd,neuter,regular,\r\num,plural,genitive,2nd,neuter,irregular,\r\num,plural,genitive,3rd,masculine feminine,regular,\r\nium,plural,genitive,3rd,masculine feminine,irregular,11\r\nōn,plural,genitive,3rd,masculine feminine,irregular,7\r\num,plural,genitive,3rd,neuter,regular,\r\nium,plural,genitive,3rd,neuter,irregular,11\r\nuum,plural,genitive,4th,masculine feminine,regular,\r\num,plural,genitive,4th,masculine feminine,irregular,16\r\nuom,plural,genitive,4th,masculine feminine,irregular,1\r\nuum,plural,genitive,4th,neuter,regular,\r\nērum,plural,genitive,5th,feminine,regular,\r\nīs,plural,dative,1st,feminine,regular,\r\nābus,plural,dative,1st,feminine,irregular,4\r\neis,plural,dative,1st,feminine,irregular,6\r\nīs,plural,dative,2nd,masculine feminine,regular,\r\nīs,plural,dative,2nd,neuter,regular,\r\nibus,plural,dative,3rd,masculine feminine,regular,\r\nibus,plural,dative,3rd,neuter,regular,\r\nibus,plural,dative,4th,masculine feminine,regular,\r\nubus,plural,dative,4th,masculine feminine,irregular,14\r\nibus,plural,dative,4th,neuter,regular,\r\nēbus,plural,dative,5th,feminine,regular,\r\nās,plural,accusative,1st,feminine,regular,\r\nōs,plural,accusative,2nd,masculine feminine,regular,\r\na,plural,accusative,2nd,neuter,regular,\r\nēs,plural,accusative,3rd,masculine feminine,regular,\r\nīs,plural,accusative,3rd,masculine feminine,irregular,11\r\nas,plural,accusative,3rd,masculine feminine,irregular,7\r\na,plural,accusative,3rd,neuter,regular,\r\nia,plural,accusative,3rd,neuter,irregular,11\r\nūs,plural,accusative,4th,masculine feminine,regular,\r\nua,plural,accusative,4th,neuter,regular,\r\nēs,plural,accusative,5th,feminine,regular,\r\nīs,plural,ablative,1st,feminine,regular,\r\nābus,plural,ablative,1st,feminine,irregular,4\r\neis,plural,ablative,1st,feminine,irregular,6\r\nīs,plural,ablative,2nd,masculine feminine,regular,\r\nīs,plural,ablative,2nd,neuter,regular,\r\nibus,plural,ablative,3rd,masculine feminine,regular,\r\nibus,plural,ablative,3rd,neuter,regular,\r\nibus,plural,ablative,4th,masculine feminine,regular,\r\nubus,plural,ablative,4th,masculine feminine,irregular,14\r\nibus,plural,ablative,4th,neuter,regular,\r\nēbus,plural,ablative,5th,feminine,regular,\r\nīs,plural,locative,1st,feminine,regular,\r\nīs,plural,locative,2nd,masculine feminine,regular,\r\nīs,plural,locative,2nd,neuter,regular,\r\nibus,plural,locative,3rd,masculine feminine,regular,\r\nibus,plural,locative,3rd,neuter,regular,\r\nibus,plural,locative,4th,masculine feminine,regular,\r\nibus,plural,locative,4th,neuter,regular,\r\nēbus,plural,locative,5th,feminine,regular,\r\nae,plural,vocative,1st,feminine,regular,\r\nī,plural,vocative,2nd,masculine feminine,regular,\r\na,plural,vocative,2nd,neuter,regular,\r\nēs,plural,vocative,3rd,masculine feminine,regular,\r\na,plural,vocative,3rd,neuter,regular,\r\nia,plural,vocative,3rd,neuter,irregular,11\r\nūs,plural,vocative,4th,masculine feminine,regular,\r\nua,plural,vocative,4th,neuter,regular,\r\nēs,plural,vocative,5th,feminine,regular,"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "Index,Text\r\n1,archaic (final s and m of os and om may be omitted in inscriptions)\r\n2,only in familiās\r\n3,especially in Greek patronymics and compounds in -gena and -cola.\r\n4,always in deābus and filiābus; rarely with other words to distinguish the female\r\n5,archaic\r\n6,rare\r\n7,\"may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.\"\r\n8,proper names in ius and filius and genius\r\n9,poetic\r\n10,\"only pelagus, vīrus, and sometimes vulgus\"\r\n11,may occur with i-stems\r\n12,several nouns (most commonly domus) show forms of both second and fourth declensions\r\n13,\"some nouns also have forms from the first declension (eg materia, saevitia) or the third declension (eg requiēs, satiēs, plēbēs, famēs)\"\r\n14,\"Always in partus and tribus, usually in artus and lacus, sometimes in other words, eg portus and specus\"\r\n15,Often in names of plants and trees and in nouns ending in -tus\r\n16,When pronounced as one syllable\r\n17,early\r\n18,dies and meridies are masculine"

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "Ending,Number,Case,Declension,Gender,Type,Footnote\r\na,singular,nominative,1st 2nd,feminine,regular,\r\nus,singular,nominative,1st 2nd,masculine,regular,\r\num,singular,nominative,1st 2nd,neuter,regular,\r\nis,singular,nominative,3rd,feminine,regular,\r\n-,singular,nominative,3rd,feminine,irregular,6\r\n-,singular,nominative,3rd,masculine,regular,\r\nis,singular,nominative,3rd,masculine,irregular,5\r\ne,singular,nominative,3rd,neuter,regular,\r\n-,singular,nominative,3rd,neuter,irregular,6\r\nae,singular,genitive,1st 2nd,feminine,regular,\r\nīus,singular,genitive,1st 2nd,feminine,irregular,3\r\nī,singular,genitive,1st 2nd,masculine,regular,\r\nīus,singular,genitive,1st 2nd,masculine,irregular,3\r\nī,singular,genitive,1st 2nd,neuter,regular,\r\nīus,singular,genitive,1st 2nd,neuter,irregular,3\r\nis,singular,genitive,3rd,feminine,regular,\r\nis,singular,genitive,3rd,masculine,regular,\r\nis,singular,genitive,3rd,neuter,regular,\r\nae,singular,dative,1st 2nd,feminine,regular,\r\nī,singular,dative,1st 2nd,feminine,irregular,3\r\nō,singular,dative,1st 2nd,masculine,regular,\r\nī,singular,dative,1st 2nd,masculine,irregular,3\r\nō,singular,dative,1st 2nd,neuter,regular,\r\nī,singular,dative,1st 2nd,neuter,irregular,3\r\nī,singular,dative,3rd,feminine,regular,\r\nī,singular,dative,3rd,masculine,regular,\r\nī,singular,dative,3rd,neuter,regular,\r\nam,singular,accusative,1st 2nd,feminine,regular,\r\num,singular,accusative,1st 2nd,masculine,regular,\r\num,singular,accusative,1st 2nd,neuter,regular,\r\nem,singular,accusative,3rd,feminine,regular,\r\nem,singular,accusative,3rd,masculine,regular,\r\ne,singular,accusative,3rd,neuter,regular,\r\n-,singular,accusative,3rd,neuter,irregular,6\r\nā,singular,ablative,1st 2nd,feminine,regular,\r\nō,singular,ablative,1st 2nd,feminine,irregular,4\r\nō,singular,ablative,1st 2nd,masculine,regular,\r\nō,singular,ablative,1st 2nd,neuter,regular,\r\nī,singular,ablative,3rd,feminine,regular,\r\ne,singular,ablative,3rd,feminine,irregular,7\r\nī,singular,ablative,3rd,masculine,regular,\r\ne,singular,ablative,3rd,masculine,irregular,7\r\nī,singular,ablative,3rd,neuter,regular,\r\nae,singular,locative,1st 2nd,feminine,regular,\r\nī,singular,locative,1st 2nd,masculine,regular,\r\nī,singular,locative,1st 2nd,neuter,regular,\r\nī,singular,locative,3rd,feminine,regular,\r\ne,singular,locative,3rd,feminine,irregular,7\r\nī,singular,locative,3rd,masculine,regular,\r\nī,singular,locative,3rd,neuter,regular,\r\na,singular,vocative,1st 2nd,feminine,regular,\r\ne,singular,vocative,1st 2nd,masculine,regular,\r\nī,singular,vocative,1st 2nd,masculine,irregular,\r\num,singular,vocative,1st 2nd,neuter,regular,\r\nis,singular,vocative,3rd,feminine,regular,\r\n-,singular,vocative,3rd,masculine,regular,\r\ne,singular,vocative,3rd,neuter,regular,\r\n-,singular,vocative,3rd,neuter,irregular,6\r\nae,plural,nominative,1st 2nd,feminine,regular,\r\nī,plural,nominative,1st 2nd,masculine,regular,\r\na,plural,nominative,1st 2nd,neuter,regular,\r\nēs,plural,nominative,3rd,feminine,regular,\r\nēs,plural,nominative,3rd,masculine,regular,\r\nia,plural,nominative,3rd,neuter,regular,\r\nārum,plural,genitive,1st 2nd,feminine,regular,\r\nōrum,plural,genitive,1st 2nd,masculine,regular,\r\nōrum,plural,genitive,1st 2nd,neuter,regular,\r\nium,plural,genitive,3rd,feminine,regular,\r\num,plural,genitive,3rd,feminine,irregular,8\r\nium,plural,genitive,3rd,masculine,regular,\r\num,plural,genitive,3rd,masculine,irregular,8\r\nium,plural,genitive,3rd,neuter,regular,\r\num,plural,genitive,3rd,neuter,irregular,8\r\nīs,plural,dative,1st 2nd,feminine,regular,\r\nīs,plural,dative,1st 2nd,masculine,regular,\r\nīs,plural,dative,1st 2nd,neuter,regular,\r\nibus,plural,dative,3rd,feminine,regular,\r\nibus,plural,dative,3rd,masculine,regular,\r\nibus,plural,dative,3rd,neuter,regular,\r\nās,plural,accusative,1st 2nd,feminine,regular,\r\nōs,plural,accusative,1st 2nd,masculine,regular,\r\na,plural,accusative,1st 2nd,neuter,regular,\r\nīs,plural,accusative,3rd,feminine,regular,\r\nēs,plural,accusative,3rd,feminine,irregular,9\r\nīs,plural,accusative,3rd,masculine,regular,\r\nēs,plural,accusative,3rd,masculine,irregular,9\r\nia,plural,accusative,3rd,neuter,regular,\r\nīs,plural,ablative,1st 2nd,feminine,regular,\r\nīs,plural,ablative,1st 2nd,masculine,regular,\r\nīs,plural,ablative,1st 2nd,neuter,regular,\r\nibus,plural,ablative,3rd,feminine,regular,\r\nibus,plural,ablative,3rd,masculine,regular,\r\nibus,plural,ablative,3rd,neuter,regular,\r\nīs,plural,locative,1st 2nd,feminine,regular,\r\nīs,plural,locative,1st 2nd,masculine,regular,\r\nīs,plural,locative,1st 2nd,neuter,regular,\r\nibus,plural,locative,3rd,feminine,regular,\r\nibus,plural,locative,3rd,masculine,regular,\r\nibus,plural,locative,3rd,neuter,regular,\r\nae,plural,vocative,1st 2nd,feminine,regular,\r\nī,plural,vocative,1st 2nd,masculine,regular,\r\na,plural,vocative,1st 2nd,neuter,regular,\r\nēs,plural,vocative,3rd,feminine,regular,\r\nēs,plural,vocative,3rd,masculine,regular,\r\nia,plural,vocative,3rd,neuter,regular,"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "Index,Text\r\n1,\"Adjectives agree with the noun they modify in gender, number and case.\"\r\n2,Adjectives are inflected according to either\r\n3,\"Only nullus, sōlus, alius (alia, aliud), tōtus, ūllus, ūnus, alter, neuter (neutra,\r\n            neutrum) and uter (utra, utrum).\"\r\n4,In a few adjectives of Greek origin.\r\n5,\"The \"\"two-ending\"\" adjectives use \"\"-is\"\", for both masculine and feminine nominative\r\n            singular.\"\r\n6,\"The \"\"one-ending\"\" adjectives use the same consonant ending for all three genders in the\r\n            nominative singular and the neuter accusative and vocative singular.\"\r\n7,\"An ablative singular in \"\"e\"\" is common in one-ending adjectives, but is usually confined to\r\n            poetry in three and two-ending adjectives.\"\r\n8,\"In comparatives, poetry and some one-ending adjectives.\"\r\n9,Chiefly in comparatives."

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "Ending,Conjugation,Voice,Mood,Tense,Number,Person,Type,Footnote\r\nō,1st,active,indicative,present,singular,1st,regular,\r\nās,1st,active,indicative,present,singular,2nd,regular,\r\nat,1st,active,indicative,present,singular,3rd,regular,\r\nāmus,1st,active,indicative,present,plural,1st,regular,\r\nātis,1st,active,indicative,present,plural,2nd,regular,\r\nant,1st,active,indicative,present,plural,3rd,regular,\r\nem,1st,active,subjunctive,present,singular,1st,regular,\r\nēs,1st,active,subjunctive,present,singular,2nd,regular,\r\net,1st,active,subjunctive,present,singular,3rd,regular,\r\nēmus,1st,active,subjunctive,present,plural,1st,regular,\r\nētis,1st,active,subjunctive,present,plural,2nd,regular,\r\nent,1st,active,subjunctive,present,plural,3rd,regular,\r\neō,2nd,active,indicative,present,singular,1st,regular,\r\nēs,2nd,active,indicative,present,singular,2nd,regular,\r\nēt,2nd,active,indicative,present,singular,3rd,regular,\r\nēmus,2nd,active,indicative,present,plural,1st,regular,\r\nētis,2nd,active,indicative,present,plural,2nd,regular,\r\nent,2nd,active,indicative,present,plural,3rd,regular,\r\neam,2nd,active,subjunctive,present,singular,1st,regular,\r\neās,2nd,active,subjunctive,present,singular,2nd,regular,\r\neat,2nd,active,subjunctive,present,singular,3rd,regular,\r\neāmus,2nd,active,subjunctive,present,plural,1st,regular,\r\neātis,2nd,active,subjunctive,present,plural,2nd,regular,\r\neant,2nd,active,subjunctive,present,plural,3rd,regular,\r\nō,3rd,active,indicative,present,singular,1st,regular,\r\nis,3rd,active,indicative,present,singular,2nd,regular,\r\nit,3rd,active,indicative,present,singular,3rd,regular,\r\nimus,3rd,active,indicative,present,plural,1st,regular,\r\nitis,3rd,active,indicative,present,plural,2nd,regular,\r\nunt,3rd,active,indicative,present,plural,3rd,regular,\r\nam,3rd,active,subjunctive,present,singular,1st,regular,\r\nās,3rd,active,subjunctive,present,singular,2nd,regular,\r\nat,3rd,active,subjunctive,present,singular,3rd,regular,\r\nāmus,3rd,active,subjunctive,present,plural,1st,regular,\r\nātis,3rd,active,subjunctive,present,plural,2nd,regular,\r\nant,3rd,active,subjunctive,present,plural,3rd,regular,\r\niō,4th,active,indicative,present,singular,1st,regular,\r\nīs,4th,active,indicative,present,singular,2nd,regular,\r\nit,4th,active,indicative,present,singular,3rd,regular,\r\nīmus,4th,active,indicative,present,plural,1st,regular,\r\nītis,4th,active,indicative,present,plural,2nd,regular,\r\niunt,4th,active,indicative,present,plural,3rd,regular,\r\niam,4th,active,subjunctive,present,singular,1st,regular,\r\niās,4th,active,subjunctive,present,singular,2nd,regular,\r\niat,4th,active,subjunctive,present,singular,3rd,regular,\r\niāmus,4th,active,subjunctive,present,plural,1st,regular,\r\niāatis,4th,active,subjunctive,present,plural,2nd,regular,\r\niant,4th,active,subjunctive,present,plural,3rd,regular,\r\nābam,1st,active,indicative,imperfect,singular,1st,regular,\r\nābas,1st,active,indicative,imperfect,singular,2nd,regular,\r\nābat,1st,active,indicative,imperfect,singular,3rd,regular,\r\nābāmus,1st,active,indicative,imperfect,plural,1st,regular,\r\nābātis,1st,active,indicative,imperfect,plural,2nd,regular,\r\nābant,1st,active,indicative,imperfect,plural,3rd,regular,\r\nārem,1st,active,subjunctive,imperfect,singular,1st,regular,\r\nārēs,1st,active,subjunctive,imperfect,singular,2nd,regular,\r\nāret,1st,active,subjunctive,imperfect,singular,3rd,regular,\r\nārēmus,1st,active,subjunctive,imperfect,plural,1st,regular,\r\nārētis,1st,active,subjunctive,imperfect,plural,2nd,regular,\r\nārent,1st,active,subjunctive,imperfect,plural,3rd,regular,\r\nēbam,2nd,active,indicative,imperfect,singular,1st,regular,\r\nēbās,2nd,active,indicative,imperfect,singular,2nd,regular,\r\nēbat,2nd,active,indicative,imperfect,singular,3rd,regular,\r\nēbāmus,2nd,active,indicative,imperfect,plural,1st,regular,\r\nēbātis,2nd,active,indicative,imperfect,plural,2nd,regular,\r\nēbant,2nd,active,indicative,imperfect,plural,3rd,regular,\r\nērem,2nd,active,subjunctive,imperfect,singular,1st,regular,\r\nērēs,2nd,active,subjunctive,imperfect,singular,2nd,regular,\r\nēret,2nd,active,subjunctive,imperfect,singular,3rd,regular,\r\nērēmus,2nd,active,subjunctive,imperfect,plural,1st,regular,\r\nērētis,2nd,active,subjunctive,imperfect,plural,2nd,regular,\r\nērēnt,2nd,active,subjunctive,imperfect,plural,3rd,regular,\r\nēbas,3rd,active,indicative,imperfect,singular,1st,regular,\r\nēbāt,3rd,active,indicative,imperfect,singular,2nd,regular,\r\nēbat,3rd,active,indicative,imperfect,singular,3rd,regular,\r\nēbāmus,3rd,active,indicative,imperfect,plural,1st,regular,\r\nēbātis,3rd,active,indicative,imperfect,plural,2nd,regular,\r\nēbant,3rd,active,indicative,imperfect,plural,3rd,regular,\r\nerem,3rd,active,subjunctive,imperfect,singular,1st,regular,\r\nerēs,3rd,active,subjunctive,imperfect,singular,2nd,regular,\r\neret,3rd,active,subjunctive,imperfect,singular,3rd,regular,\r\nerēmus,3rd,active,subjunctive,imperfect,plural,1st,regular,\r\nerētis,3rd,active,subjunctive,imperfect,plural,2nd,regular,\r\nerent,3rd,active,subjunctive,imperfect,plural,3rd,regular,\r\niēbam,4th,active,indicative,imperfect,singular,1st,regular,\r\nībam,4th,active,indicative,imperfect,singular,1st,irregular,2\r\niēbas,4th,active,indicative,imperfect,singular,2nd,regular,\r\nības,4th,active,indicative,imperfect,singular,2nd,irregular,\r\niēbat,4th,active,indicative,imperfect,singular,3rd,regular,\r\nībat,4th,active,indicative,imperfect,singular,3rd,irregular,\r\niēbāmus,4th,active,indicative,imperfect,plural,1st,regular,\r\nībāmus,4th,active,indicative,imperfect,plural,1st,irregular,\r\niēbātis,4th,active,indicative,imperfect,plural,2nd,regular,\r\nībātis,4th,active,indicative,imperfect,plural,2nd,irregular,\r\niēbant,4th,active,indicative,imperfect,plural,3rd,regular,\r\nībant,4th,active,indicative,imperfect,plural,3rd,irregular,\r\nīrem,4th,active,subjunctive,imperfect,singular,1st,regular,\r\nīrēs,4th,active,subjunctive,imperfect,singular,2nd,regular,\r\nīret,4th,active,subjunctive,imperfect,singular,3rd,regular,\r\nīrēmus,4th,active,subjunctive,imperfect,plural,1st,regular,\r\nīrētis,4th,active,subjunctive,imperfect,plural,2nd,regular,\r\nīrēnt,4th,active,subjunctive,imperfect,plural,3rd,regular,\r\nābo,1st,active,indicative,future,singular,1st,regular,\r\nābis,1st,active,indicative,future,singular,2nd,regular,\r\nābit,1st,active,indicative,future,singular,3rd,regular,\r\nābimus,1st,active,indicative,future,plural,1st,regular,\r\nābitis,1st,active,indicative,future,plural,2nd,regular,\r\nābunt,1st,active,indicative,future,plural,3rd,regular,\r\n,1st,active,subjunctive,future,singular,1st,,\r\n,1st,active,subjunctive,future,singular,2nd,,\r\n,1st,active,subjunctive,future,singular,3rd,,\r\n,1st,active,subjunctive,future,plural,1st,,\r\n,1st,active,subjunctive,future,plural,2nd,,\r\n,1st,active,subjunctive,future,plural,3rd,,\r\nēbō,2nd,active,indicative,future,singular,1st,regular,\r\nēbis,2nd,active,indicative,future,singular,2nd,regular,\r\nēbit,2nd,active,indicative,future,singular,3rd,regular,\r\nēbimus,2nd,active,indicative,future,plural,1st,regular,\r\nēbitis,2nd,active,indicative,future,plural,2nd,regular,\r\nēbunt,2nd,active,indicative,future,plural,3rd,regular,\r\n,2nd,active,subjunctive,future,singular,1st,regular,\r\n,2nd,active,subjunctive,future,singular,2nd,,\r\n,2nd,active,subjunctive,future,singular,3rd,,\r\n,2nd,active,subjunctive,future,plural,1st,,\r\n,2nd,active,subjunctive,future,plural,2nd,,\r\n,2nd,active,subjunctive,future,plural,3rd,,\r\nam,3rd,active,indicative,future,singular,1st,regular,\r\nēs,3rd,active,indicative,future,singular,2nd,regular,\r\net,3rd,active,indicative,future,singular,3rd,regular,\r\nēmus,3rd,active,indicative,future,plural,1st,regular,\r\nētis,3rd,active,indicative,future,plural,2nd,regular,\r\nent,3rd,active,indicative,future,plural,3rd,regular,\r\n,3rd,active,subjunctive,future,singular,1st,,\r\n,3rd,active,subjunctive,future,singular,2nd,,\r\n,3rd,active,subjunctive,future,singular,3rd,,\r\n,3rd,active,subjunctive,future,plural,1st,,\r\n,3rd,active,subjunctive,future,plural,2nd,,\r\n,3rd,active,subjunctive,future,plural,3rd,,\r\niam,4th,active,indicative,future,singular,1st,regular,\r\nībō,4th,active,indicative,future,singular,1st,irregular,2\r\niēs,4th,active,indicative,future,singular,2nd,regular,\r\nībis,4th,active,indicative,future,singular,2nd,irregular,\r\niet,4th,active,indicative,future,singular,3rd,regular,\r\nībit,4th,active,indicative,future,singular,3rd,irregular,\r\niēmus,4th,active,indicative,future,plural,1st,regular,\r\nībimus,4th,active,indicative,future,plural,1st,irregular,\r\niētis,4th,active,indicative,future,plural,2nd,regular,\r\nībitis,4th,active,indicative,future,plural,2nd,irregular,\r\nient,4th,active,indicative,future,plural,3rd,regular,\r\nībunt,4th,active,indicative,future,plural,3rd,irregular,\r\n,4th,active,subjunctive,future,singular,1st,,\r\n,4th,active,subjunctive,future,singular,2nd,,\r\n,4th,active,subjunctive,future,singular,3rd,,\r\n,4th,active,subjunctive,future,plural,1st,,\r\n,4th,active,subjunctive,future,plural,2nd,,\r\n,4th,active,subjunctive,future,plural,3rd,,\r\nāvī,1st,active,indicative,perfect,singular,1st,regular,\r\nāvistī,1st,active,indicative,perfect,singular,2nd,regular,\r\nāvit,1st,active,indicative,perfect,singular,3rd,regular,\r\nāvimus,1st,active,indicative,perfect,plural,1st,regular,\r\nāvistis,1st,active,indicative,perfect,plural,2nd,regular,\r\nāvērunt,1st,active,indicative,perfect,plural,3rd,regular,\r\nāvēre,1st,active,indicative,perfect,plural,3rd,irregular,6\r\nāverim,1st,active,subjunctive,perfect,singular,1st,regular,\r\nāveris,1st,active,subjunctive,perfect,singular,2nd,regular,\r\nāverit,1st,active,subjunctive,perfect,singular,3rd,regular,\r\nāverimus,1st,active,subjunctive,perfect,plural,1st,regular,\r\nāveritis,1st,active,subjunctive,perfect,plural,2nd,regular,\r\nāverint,1st,active,subjunctive,perfect,plural,3rd,regular,\r\nvī,2nd,active,indicative,perfect,singular,1st,regular,\r\nvistī,2nd,active,indicative,perfect,singular,2nd,regular,\r\nvit,2nd,active,indicative,perfect,singular,3rd,regular,\r\nvimus,2nd,active,indicative,perfect,plural,1st,regular,\r\nvistis,2nd,active,indicative,perfect,plural,2nd,regular,\r\nvērunt,2nd,active,indicative,perfect,plural,3rd,regular,\r\nvēre,2nd,active,indicative,perfect,plural,3rd,irregular,6\r\nverim,2nd,active,subjunctive,perfect,singular,1st,regular,\r\nveris,2nd,active,subjunctive,perfect,singular,2nd,regular,\r\nverit,2nd,active,subjunctive,perfect,singular,3rd,regular,\r\nverimus,2nd,active,subjunctive,perfect,plural,1st,regular,\r\nveritis,2nd,active,subjunctive,perfect,plural,2nd,regular,\r\nverint,2nd,active,subjunctive,perfect,plural,3rd,regular,\r\nī,3rd,active,indicative,perfect,singular,1st,regular,\r\nistī,3rd,active,indicative,perfect,singular,2nd,regular,\r\nit,3rd,active,indicative,perfect,singular,3rd,regular,\r\nimus,3rd,active,indicative,perfect,plural,1st,regular,\r\nistis,3rd,active,indicative,perfect,plural,2nd,regular,\r\nērunt,3rd,active,indicative,perfect,plural,3rd,regular,\r\nēre,3rd,active,indicative,perfect,plural,3rd,irregular,6\r\nerim,3rd,active,subjunctive,perfect,singular,1st,regular,\r\neris,3rd,active,subjunctive,perfect,singular,2nd,regular,\r\nerit,3rd,active,subjunctive,perfect,singular,3rd,regular,\r\nerimus,3rd,active,subjunctive,perfect,plural,1st,regular,\r\neritis,3rd,active,subjunctive,perfect,plural,2nd,regular,\r\nerint,3rd,active,subjunctive,perfect,plural,3rd,regular,\r\nīvi,4th,active,indicative,perfect,singular,1st,regular,\r\nīvistī,4th,active,indicative,perfect,singular,2nd,regular,\r\nīvit,4th,active,indicative,perfect,singular,3rd,regular,\r\nīvimus,4th,active,indicative,perfect,plural,1st,regular,\r\nīvistis,4th,active,indicative,perfect,plural,2nd,regular,\r\nīvērunt,4th,active,indicative,perfect,plural,3rd,regular,\r\nīvēre,4th,active,indicative,perfect,plural,3rd,irregular,6\r\nīverim,4th,active,subjunctive,perfect,singular,1st,regular,\r\niveris,4th,active,subjunctive,perfect,singular,2nd,regular,\r\nīverit,4th,active,subjunctive,perfect,singular,3rd,regular,\r\nīverimus,4th,active,subjunctive,perfect,plural,1st,regular,\r\nīveritis,4th,active,subjunctive,perfect,plural,2nd,regular,\r\nīverint,4th,active,subjunctive,perfect,plural,3rd,regular,\r\nāveram,1st,active,indicative,pluperfect,singular,1st,regular,\r\nāverās,1st,active,indicative,pluperfect,singular,2nd,regular,\r\nāverat,1st,active,indicative,pluperfect,singular,3rd,regular,\r\nāverāmus,1st,active,indicative,pluperfect,plural,1st,regular,\r\nāverātis,1st,active,indicative,pluperfect,plural,2nd,regular,\r\nāverant,1st,active,indicative,pluperfect,plural,3rd,regular,\r\nāvissem,1st,active,subjunctive,pluperfect,singular,1st,regular,\r\nāvissēs,1st,active,subjunctive,pluperfect,singular,2nd,regular,\r\nāvisset,1st,active,subjunctive,pluperfect,singular,3rd,regular,\r\nāvissēm,1st,active,subjunctive,pluperfect,plural,1st,regular,\r\nāvissēs,1st,active,subjunctive,pluperfect,plural,2nd,regular,\r\nāvisset,1st,active,subjunctive,pluperfect,plural,3rd,regular,\r\nveram,2nd,active,indicative,pluperfect,singular,1st,regular,\r\nverās,2nd,active,indicative,pluperfect,singular,2nd,regular,\r\nverat,2nd,active,indicative,pluperfect,singular,3rd,regular,\r\nverāmus,2nd,active,indicative,pluperfect,plural,1st,regular,\r\nverātis,2nd,active,indicative,pluperfect,plural,2nd,regular,\r\nverant,2nd,active,indicative,pluperfect,plural,3rd,regular,\r\nvissem,2nd,active,subjunctive,pluperfect,singular,1st,regular,\r\nvissēs,2nd,active,subjunctive,pluperfect,singular,2nd,regular,\r\nvisset,2nd,active,subjunctive,pluperfect,singular,3rd,regular,\r\nvissēmus,2nd,active,subjunctive,pluperfect,plural,1st,regular,\r\nvissētis,2nd,active,subjunctive,pluperfect,plural,2nd,regular,\r\nvissent,2nd,active,subjunctive,pluperfect,plural,3rd,regular,\r\neram,3rd,active,indicative,pluperfect,singular,1st,regular,\r\nerās,3rd,active,indicative,pluperfect,singular,2nd,regular,\r\nerat,3rd,active,indicative,pluperfect,singular,3rd,regular,\r\nerāmus,3rd,active,indicative,pluperfect,plural,1st,regular,\r\nerātis,3rd,active,indicative,pluperfect,plural,2nd,regular,\r\nerant,3rd,active,indicative,pluperfect,plural,3rd,regular,\r\nissem,3rd,active,subjunctive,pluperfect,singular,1st,regular,\r\nissēs,3rd,active,subjunctive,pluperfect,singular,2nd,regular,\r\nisset,3rd,active,subjunctive,pluperfect,singular,3rd,regular,\r\nissēmus,3rd,active,subjunctive,pluperfect,plural,1st,regular,\r\nissētis,3rd,active,subjunctive,pluperfect,plural,2nd,regular,\r\nissent,3rd,active,subjunctive,pluperfect,plural,3rd,regular,\r\nīveram,4th,active,indicative,pluperfect,singular,1st,regular,\r\nīverās,4th,active,indicative,pluperfect,singular,2nd,regular,\r\nīverat,4th,active,indicative,pluperfect,singular,3rd,regular,\r\nīverāmus,4th,active,indicative,pluperfect,plural,1st,regular,\r\nīverātis,4th,active,indicative,pluperfect,plural,2nd,regular,\r\nīverant,4th,active,indicative,pluperfect,plural,3rd,regular,\r\nīvissem,4th,active,subjunctive,pluperfect,singular,1st,regular,\r\nīvissēs,4th,active,subjunctive,pluperfect,singular,2nd,regular,\r\nīvisset,4th,active,subjunctive,pluperfect,singular,3rd,regular,\r\nīvissēmus,4th,active,subjunctive,pluperfect,plural,1st,regular,\r\nīvissētis,4th,active,subjunctive,pluperfect,plural,2nd,regular,\r\nīvissent,4th,active,subjunctive,pluperfect,plural,3rd,regular,\r\nāverō,1st,active,indicative,future_perfect,singular,1st,regular,\r\nāveris,1st,active,indicative,future_perfect,singular,2nd,regular,\r\nāverit,1st,active,indicative,future_perfect,singular,3rd,regular,\r\nāverimus,1st,active,indicative,future_perfect,plural,1st,regular,\r\nāveritis,1st,active,indicative,future_perfect,plural,2nd,regular,\r\nāverint,1st,active,indicative,future_perfect,plural,3rd,regular,\r\n,1st,active,subjunctive,future_perfect,singular,1st,,\r\n,1st,active,subjunctive,future_perfect,singular,2nd,,\r\n,1st,active,subjunctive,future_perfect,singular,3rd,,\r\n,1st,active,subjunctive,future_perfect,plural,1st,,\r\n,1st,active,subjunctive,future_perfect,plural,2nd,,\r\n,1st,active,subjunctive,future_perfect,plural,3rd,,\r\nverō,2nd,active,indicative,future_perfect,singular,1st,regular,\r\nvēris,2nd,active,indicative,future_perfect,singular,2nd,regular,\r\nvērit,2nd,active,indicative,future_perfect,singular,3rd,regular,\r\nvērimus,2nd,active,indicative,future_perfect,plural,1st,regular,\r\nvēritis,2nd,active,indicative,future_perfect,plural,2nd,regular,\r\nvērint,2nd,active,indicative,future_perfect,plural,3rd,regular,\r\n,2nd,active,subjunctive,future_perfect,singular,1st,,\r\n,2nd,active,subjunctive,future_perfect,singular,2nd,,\r\n,2nd,active,subjunctive,future_perfect,singular,3rd,,\r\n,2nd,active,subjunctive,future_perfect,plural,1st,,\r\n,2nd,active,subjunctive,future_perfect,plural,2nd,,\r\n,2nd,active,subjunctive,future_perfect,plural,3rd,,\r\nerō,3rd,active,indicative,future_perfect,singular,1st,regular,\r\neris,3rd,active,indicative,future_perfect,singular,2nd,regular,\r\nerit,3rd,active,indicative,future_perfect,singular,3rd,regular,\r\nerimus,3rd,active,indicative,future_perfect,plural,1st,regular,\r\neritis,3rd,active,indicative,future_perfect,plural,2nd,regular,\r\nerint,3rd,active,indicative,future_perfect,plural,3rd,regular,\r\n,3rd,active,subjunctive,future_perfect,singular,1st,,\r\n,3rd,active,subjunctive,future_perfect,singular,2nd,,\r\n,3rd,active,subjunctive,future_perfect,singular,3rd,,\r\n,3rd,active,subjunctive,future_perfect,plural,1st,,\r\n,3rd,active,subjunctive,future_perfect,plural,2nd,,\r\n,3rd,active,subjunctive,future_perfect,plural,3rd,,\r\nīverō,4th,active,indicative,future_perfect,singular,1st,regular,\r\nīveris,4th,active,indicative,future_perfect,singular,2nd,regular,\r\nīverit,4th,active,indicative,future_perfect,singular,3rd,regular,\r\nīverimus,4th,active,indicative,future_perfect,plural,1st,regular,\r\nīveritis,4th,active,indicative,future_perfect,plural,2nd,regular,\r\nīverint,4th,active,indicative,future_perfect,plural,3rd,regular,\r\n,4th,active,subjunctive,future_perfect,singular,1st,,\r\n,4th,active,subjunctive,future_perfect,singular,2nd,,\r\n,4th,active,subjunctive,future_perfect,singular,3rd,,\r\n,4th,active,subjunctive,future_perfect,plural,1st,,\r\n,4th,active,subjunctive,future_perfect,plural,2nd,,\r\n,4th,active,subjunctive,future_perfect,plural,3rd,,\r\nor,1st,passive,indicative,present,singular,1st,regular,\r\nāris,1st,passive,indicative,present,singular,2nd,regular,\r\nāre,1st,passive,indicative,present,singular,2nd,irregular,5\r\nātur,1st,passive,indicative,present,singular,3rd,regular,\r\nāmur,1st,passive,indicative,present,plural,1st,regular,\r\nāminiī,1st,passive,indicative,present,plural,2nd,regular,\r\nantur,1st,passive,indicative,present,plural,3rd,regular,\r\ner,1st,passive,subjunctive,present,singular,1st,regular,\r\nēris,1st,passive,subjunctive,present,singular,2nd,regular,\r\nēre,1st,passive,subjunctive,present,singular,2nd,regular,\r\nētur,1st,passive,subjunctive,present,singular,3rd,regular,\r\nēmur,1st,passive,subjunctive,present,plural,1st,regular,\r\nēminī,1st,passive,subjunctive,present,plural,2nd,regular,\r\nentur,1st,passive,subjunctive,present,plural,3rd,regular,\r\neor,2nd,passive,indicative,present,singular,1st,regular,\r\nēris,2nd,passive,indicative,present,singular,2nd,regular,\r\nēre,2nd,passive,indicative,present,singular,2nd,regular,\r\nētur,2nd,passive,indicative,present,singular,3rd,regular,\r\nēmur,2nd,passive,indicative,present,plural,1st,regular,\r\nēmini,2nd,passive,indicative,present,plural,2nd,regular,\r\nentur,2nd,passive,indicative,present,plural,3rd,regular,\r\near,2nd,passive,subjunctive,present,singular,1st,regular,\r\neāris,2nd,passive,subjunctive,present,singular,2nd,regular,\r\neāre,2nd,passive,subjunctive,present,singular,2nd,regular,\r\neātur,2nd,passive,subjunctive,present,singular,3rd,regular,\r\neāmur,2nd,passive,subjunctive,present,plural,1st,regular,\r\neāminī,2nd,passive,subjunctive,present,plural,2nd,regular,\r\neantur,2nd,passive,subjunctive,present,plural,3rd,regular,\r\nor,3rd,passive,indicative,present,singular,1st,regular,\r\neris,3rd,passive,indicative,present,singular,2nd,regular,\r\nere,3rd,passive,indicative,present,singular,2nd,regular,\r\nitur,3rd,passive,indicative,present,singular,3rd,regular,\r\nimur,3rd,passive,indicative,present,plural,1st,regular,\r\niminī,3rd,passive,indicative,present,plural,2nd,regular,\r\nuntur,3rd,passive,indicative,present,plural,3rd,regular,\r\nar,3rd,passive,subjunctive,present,singular,1st,regular,\r\nāris,3rd,passive,subjunctive,present,singular,2nd,regular,\r\nāre,3rd,passive,subjunctive,present,singular,2nd,regular,\r\nātur,3rd,passive,subjunctive,present,singular,3rd,regular,\r\nāmur,3rd,passive,subjunctive,present,plural,1st,regular,\r\nāminī,3rd,passive,subjunctive,present,plural,2nd,regular,\r\nantur,3rd,passive,subjunctive,present,plural,3rd,regular,\r\nior,4th,passive,indicative,present,singular,1st,regular,\r\nīris,4th,passive,indicative,present,singular,2nd,regular,\r\nīre,4th,passive,indicative,present,singular,2nd,regular,\r\nītur,4th,passive,indicative,present,singular,3rd,regular,\r\nīmur,4th,passive,indicative,present,plural,1st,regular,\r\nīminī,4th,passive,indicative,present,plural,2nd,regular,\r\niuntur,4th,passive,indicative,present,plural,3rd,regular,\r\niar,4th,passive,subjunctive,present,singular,1st,regular,\r\niāris,4th,passive,subjunctive,present,singular,2nd,regular,\r\niāre,4th,passive,subjunctive,present,singular,2nd,regular,\r\niātur,4th,passive,subjunctive,present,singular,3rd,regular,\r\niāmur,4th,passive,subjunctive,present,plural,1st,regular,\r\niāminī,4th,passive,subjunctive,present,plural,2nd,regular,\r\niantur,4th,passive,subjunctive,present,plural,3rd,regular,\r\nābar,1st,passive,indicative,imperfect,singular,1st,regular,\r\nābāaris,1st,passive,indicative,imperfect,singular,2nd,regular,\r\nābāre,1st,passive,indicative,imperfect,singular,2nd,regular,\r\nābātur,1st,passive,indicative,imperfect,singular,3rd,regular,\r\nābāmur,1st,passive,indicative,imperfect,plural,1st,regular,\r\nābāminī,1st,passive,indicative,imperfect,plural,2nd,regular,\r\nābantur,1st,passive,indicative,imperfect,plural,3rd,regular,\r\nārer,1st,passive,subjunctive,imperfect,singular,1st,regular,\r\nārēris,1st,passive,subjunctive,imperfect,singular,2nd,regular,\r\nārēre,1st,passive,subjunctive,imperfect,singular,2nd,regular,\r\nārētur,1st,passive,subjunctive,imperfect,singular,3rd,regular,\r\nārēmur,1st,passive,subjunctive,imperfect,plural,1st,regular,\r\nārēminī,1st,passive,subjunctive,imperfect,plural,2nd,regular,\r\nārentur,1st,passive,subjunctive,imperfect,plural,3rd,regular,\r\nēbar,2nd,passive,indicative,imperfect,singular,1st,regular,\r\nēbāris,2nd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbāre,2nd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbātur,2nd,passive,indicative,imperfect,singular,3rd,regular,\r\nēbāmur,2nd,passive,indicative,imperfect,plural,1st,regular,\r\nēbāmini,2nd,passive,indicative,imperfect,plural,2nd,regular,\r\nēbantur,2nd,passive,indicative,imperfect,plural,3rd,regular,\r\nērer,2nd,passive,subjunctive,imperfect,singular,1st,regular,\r\nērēris,2nd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nērēre,2nd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nērētur,2nd,passive,subjunctive,imperfect,singular,3rd,regular,\r\nērēmur,2nd,passive,subjunctive,imperfect,plural,1st,regular,\r\nērēminī,2nd,passive,subjunctive,imperfect,plural,2nd,regular,\r\nērentur,2nd,passive,subjunctive,imperfect,plural,3rd,regular,\r\nēbar,3rd,passive,indicative,imperfect,singular,1st,regular,\r\nēbāris,3rd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbāre,3rd,passive,indicative,imperfect,singular,2nd,regular,\r\nēbatur,3rd,passive,indicative,imperfect,singular,3rd,regular,\r\nēbāmur,3rd,passive,indicative,imperfect,plural,1st,regular,\r\nēbāminī,3rd,passive,indicative,imperfect,plural,2nd,regular,\r\nēbantur,3rd,passive,indicative,imperfect,plural,3rd,regular,\r\nerer,3rd,passive,subjunctive,imperfect,singular,1st,regular,\r\nerēris,3rd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nerēre,3rd,passive,subjunctive,imperfect,singular,2nd,regular,\r\nerētur,3rd,passive,subjunctive,imperfect,singular,3rd,regular,\r\nerēmur,3rd,passive,subjunctive,imperfect,plural,1st,regular,\r\nerēminī,3rd,passive,subjunctive,imperfect,plural,2nd,regular,\r\nerentur,3rd,passive,subjunctive,imperfect,plural,3rd,regular,\r\niēbar,4th,passive,indicative,imperfect,singular,1st,regular,\r\niēbāris,4th,passive,indicative,imperfect,singular,2nd,regular,\r\niēbāre,4th,passive,indicative,imperfect,singular,2nd,regular,\r\niēbātur,4th,passive,indicative,imperfect,singular,3rd,regular,\r\niēbāmur,4th,passive,indicative,imperfect,plural,1st,regular,\r\niēbāminī,4th,passive,indicative,imperfect,plural,2nd,regular,\r\niēbantur,4th,passive,indicative,imperfect,plural,3rd,regular,\r\nīrer,4th,passive,subjunctive,imperfect,singular,1st,regular,\r\nīrēris,4th,passive,subjunctive,imperfect,singular,2nd,regular,\r\nīrēre,4th,passive,subjunctive,imperfect,singular,2nd,regular,\r\nīrētur,4th,passive,subjunctive,imperfect,singular,3rd,regular,\r\nīrēmur,4th,passive,subjunctive,imperfect,plural,1st,regular,\r\nīrēminī,4th,passive,subjunctive,imperfect,plural,2nd,regular,\r\nīrentur,4th,passive,subjunctive,imperfect,plural,3rd,regular,\r\nābor,1st,passive,indicative,future,singular,1st,regular,\r\nāberis,1st,passive,indicative,future,singular,2nd,regular,\r\nābere,1st,passive,indicative,future,singular,2nd,irregular,\r\nābitur,1st,passive,indicative,future,singular,3rd,regular,\r\nābimur,1st,passive,indicative,future,plural,1st,regular,\r\nābiminī,1st,passive,indicative,future,plural,2nd,regular,\r\nābuntur,1st,passive,indicative,future,plural,3rd,regular,\r\n,1st,passive,subjunctive,future,singular,1st,,\r\n,1st,passive,subjunctive,future,singular,2nd,,\r\n,1st,passive,subjunctive,future,singular,3rd,,\r\n,1st,passive,subjunctive,future,plural,1st,,\r\n,1st,passive,subjunctive,future,plural,2nd,,\r\n,1st,passive,subjunctive,future,plural,3rd,,\r\nēbor,2nd,passive,indicative,future,singular,1st,regular,\r\nēberis,2nd,passive,indicative,future,singular,2nd,regular,\r\nēbere,2nd,passive,indicative,future,singular,2nd,regular,\r\nēbitur,2nd,passive,indicative,future,singular,3rd,regular,\r\nēbimur,2nd,passive,indicative,future,plural,1st,regular,\r\nēbiminī,2nd,passive,indicative,future,plural,2nd,regular,\r\nēbuntur,2nd,passive,indicative,future,plural,3rd,regular,\r\n,2nd,passive,subjunctive,future,singular,1st,,\r\n,2nd,passive,subjunctive,future,singular,2nd,,\r\n,2nd,passive,subjunctive,future,singular,3rd,,\r\n,2nd,passive,subjunctive,future,plural,1st,,\r\n,2nd,passive,subjunctive,future,plural,2nd,,\r\n,2nd,passive,subjunctive,future,plural,3rd,,\r\nar,3rd,passive,indicative,future,singular,1st,regular,\r\nēris,3rd,passive,indicative,future,singular,2nd,regular,\r\nēre,3rd,passive,indicative,future,singular,2nd,irregular,\r\nētur,3rd,passive,indicative,future,singular,3rd,regular,\r\nēmur,3rd,passive,indicative,future,plural,1st,regular,\r\nēminī,3rd,passive,indicative,future,plural,2nd,regular,\r\nentur,3rd,passive,indicative,future,plural,3rd,regular,\r\n,3rd,passive,subjunctive,future,singular,1st,,\r\n,3rd,passive,subjunctive,future,singular,2nd,,\r\n,3rd,passive,subjunctive,future,singular,3rd,,\r\n,3rd,passive,subjunctive,future,plural,1st,,\r\n,3rd,passive,subjunctive,future,plural,2nd,,\r\n,3rd,passive,subjunctive,future,plural,3rd,,\r\niar,4th,passive,indicative,future,singular,1st,regular,\r\niēris,4th,passive,indicative,future,singular,2nd,regular,\r\nīēre,4th,passive,indicative,future,singular,2nd,irregular,\r\niētur,4th,passive,indicative,future,singular,3rd,regular,\r\niēmur,4th,passive,indicative,future,plural,1st,regular,\r\niēminī,4th,passive,indicative,future,plural,2nd,regular,\r\nientur,4th,passive,indicative,future,plural,3rd,regular,\r\n,4th,passive,subjunctive,future,singular,1st,,\r\n,4th,passive,subjunctive,future,singular,2nd,,\r\n,4th,passive,subjunctive,future,singular,3rd,,\r\n,4th,passive,subjunctive,future,plural,1st,,\r\n,4th,passive,subjunctive,future,plural,2nd,,\r\n,4th,passive,subjunctive,future,plural,3rd,,\r\nātus sum,1st,passive,indicative,perfect,singular,1st,regular,\r\nātus fui,1st,passive,indicative,perfect,singular,1st,regular,\r\nātus es,1st,passive,indicative,perfect,singular,2nd,regular,\r\nātus fuisti,1st,passive,indicative,perfect,singular,2nd,regular,\r\nātus est,1st,passive,indicative,perfect,singular,3rd,regular,\r\nātus fuit,1st,passive,indicative,perfect,singular,3rd,regular,\r\nāti sumus,1st,passive,indicative,perfect,plural,1st,regular,\r\nāti fuimus,1st,passive,indicative,perfect,plural,1st,irregular,\r\nāti estis,1st,passive,indicative,perfect,plural,2nd,regular,\r\nāti fuistis,1st,passive,indicative,perfect,plural,2nd,irregular,\r\nāti sunt,1st,passive,indicative,perfect,plural,3rd,regular,\r\nāti fuerunt,1st,passive,indicative,perfect,plural,3rd,irregular,\r\nātus sim,1st,passive,subjunctive,perfect,singular,1st,regular,\r\nātus fuerim,1st,passive,subjunctive,perfect,singular,1st,irregular,\r\nātus sis,1st,passive,subjunctive,perfect,singular,2nd,regular,\r\nātus fueris,1st,passive,subjunctive,perfect,singular,2nd,irregular,\r\nātus sit,1st,passive,subjunctive,perfect,singular,3rd,regular,\r\nātus fuerit,1st,passive,subjunctive,perfect,singular,3rd,regular,\r\nāti sīmus,1st,passive,subjunctive,perfect,plural,1st,regular,\r\nāti fuerimus,1st,passive,subjunctive,perfect,plural,1st,irregular,\r\nāti sītis,1st,passive,subjunctive,perfect,plural,2nd,regular,\r\nāti fueritis,1st,passive,subjunctive,perfect,plural,2nd,irregular,\r\nāti sint,1st,passive,subjunctive,perfect,plural,3rd,regular,\r\nāti fuerint,1st,passive,subjunctive,perfect,plural,3rd,irregular,\r\nitus sum,2nd,passive,indicative,perfect,singular,1st,regular,\r\nitus es,2nd,passive,indicative,perfect,singular,2nd,regular,\r\nitus est,2nd,passive,indicative,perfect,singular,3rd,regular,\r\nitī sumus,2nd,passive,indicative,perfect,plural,1st,regular,\r\nitī estis,2nd,passive,indicative,perfect,plural,2nd,regular,\r\nitī sunt,2nd,passive,indicative,perfect,plural,3rd,regular,\r\nitus sim,2nd,passive,subjunctive,perfect,singular,1st,regular,\r\nitus sīs,2nd,passive,subjunctive,perfect,singular,2nd,regular,\r\nitus sit,2nd,passive,subjunctive,perfect,singular,3rd,regular,\r\nitī sīmus,2nd,passive,subjunctive,perfect,plural,1st,regular,\r\nitī sītis,2nd,passive,subjunctive,perfect,plural,2nd,regular,\r\nitī sint,2nd,passive,subjunctive,perfect,plural,3rd,regular,\r\nus sum,3rd,passive,indicative,perfect,singular,1st,regular,\r\nus es,3rd,passive,indicative,perfect,singular,2nd,regular,\r\nus est,3rd,passive,indicative,perfect,singular,3rd,regular,\r\nī sumus,3rd,passive,indicative,perfect,plural,1st,regular,\r\nī estis,3rd,passive,indicative,perfect,plural,2nd,regular,\r\nī sunt,3rd,passive,indicative,perfect,plural,3rd,regular,\r\nus sim,3rd,passive,subjunctive,perfect,singular,1st,regular,\r\nus sīs,3rd,passive,subjunctive,perfect,singular,2nd,regular,\r\nus sit,3rd,passive,subjunctive,perfect,singular,3rd,regular,\r\nus sīmus,3rd,passive,subjunctive,perfect,plural,1st,regular,\r\nus sītis,3rd,passive,subjunctive,perfect,plural,2nd,regular,\r\nus sint,3rd,passive,subjunctive,perfect,plural,3rd,regular,\r\nītus sum,4th,passive,indicative,perfect,singular,1st,regular,\r\nītus es,4th,passive,indicative,perfect,singular,2nd,regular,\r\nītus est,4th,passive,indicative,perfect,singular,3rd,regular,\r\nītī sumus,4th,passive,indicative,perfect,plural,1st,regular,\r\nīti estis,4th,passive,indicative,perfect,plural,2nd,regular,\r\nīti sunt,4th,passive,indicative,perfect,plural,3rd,regular,\r\nītus sim,4th,passive,subjunctive,perfect,singular,1st,regular,\r\nītus sīs,4th,passive,subjunctive,perfect,singular,2nd,regular,\r\nītus sit,4th,passive,subjunctive,perfect,singular,3rd,regular,\r\nītī sīmus,4th,passive,subjunctive,perfect,plural,1st,regular,\r\nīti sītis,4th,passive,subjunctive,perfect,plural,2nd,regular,\r\nīti sint,4th,passive,subjunctive,perfect,plural,3rd,regular,\r\nātus eram,1st,passive,indicative,pluperfect,singular,1st,regular,\r\nātus fueram,1st,passive,indicative,pluperfect,singular,1st,irregular,\r\nātus eras,1st,passive,indicative,pluperfect,singular,2nd,regular,\r\nātus fueras,1st,passive,indicative,pluperfect,singular,2nd,irregular,\r\nātus erat,1st,passive,indicative,pluperfect,singular,3rd,regular,\r\nātus fuerat,1st,passive,indicative,pluperfect,singular,3rd,irregular,\r\nātī erāmus,1st,passive,indicative,pluperfect,plural,1st,regular,\r\nātī fueramus,1st,passive,indicative,pluperfect,plural,1st,irregular,\r\nātī erātis,1st,passive,indicative,pluperfect,plural,2nd,regular,\r\nātī fueratis,1st,passive,indicative,pluperfect,plural,2nd,irregular,\r\nātī erant,1st,passive,indicative,pluperfect,plural,3rd,regular,\r\nātī fuerant,1st,passive,indicative,pluperfect,plural,3rd,irregular,\r\nātus essem,1st,passive,subjunctive,pluperfect,singular,1st,regular,\r\nātus fuissem,1st,passive,subjunctive,pluperfect,singular,1st,irregular,\r\nātus esses,1st,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nātus fuissēs,1st,passive,subjunctive,pluperfect,singular,2nd,irregular,\r\nātus esset,1st,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nātus fuisset,1st,passive,subjunctive,pluperfect,singular,3rd,irregular,\r\nāti essēmus,1st,passive,subjunctive,pluperfect,plural,1st,regular,\r\nāti fuissēmus,1st,passive,subjunctive,pluperfect,plural,1st,irregular,\r\nāti essētis,1st,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nāti fuissētis,1st,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nāti essent,1st,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nāti fuissent,1st,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nitus eram,2nd,passive,indicative,pluperfect,singular,1st,regular,\r\nitus erās,2nd,passive,indicative,pluperfect,singular,2nd,regular,\r\nitus erat,2nd,passive,indicative,pluperfect,singular,3rd,regular,\r\nitī erāmus,2nd,passive,indicative,pluperfect,plural,1st,regular,\r\nitī erātis,2nd,passive,indicative,pluperfect,plural,2nd,regular,\r\nitī erant,2nd,passive,indicative,pluperfect,plural,3rd,regular,\r\nitus essem,2nd,passive,subjunctive,pluperfect,singular,1st,regular,\r\nitus essēs,2nd,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nitus esset,2nd,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nitī essēmus,2nd,passive,subjunctive,pluperfect,plural,1st,regular,\r\nīti essētis,2nd,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nīti essent,2nd,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nus eram,3rd,passive,indicative,pluperfect,singular,1st,regular,\r\nus erās,3rd,passive,indicative,pluperfect,singular,2nd,regular,\r\nus erat,3rd,passive,indicative,pluperfect,singular,3rd,regular,\r\nī erāmus,3rd,passive,indicative,pluperfect,plural,1st,regular,\r\nī erātis,3rd,passive,indicative,pluperfect,plural,2nd,regular,\r\nī erant,3rd,passive,indicative,pluperfect,plural,3rd,regular,\r\nus essem,3rd,passive,subjunctive,pluperfect,singular,1st,regular,\r\nus essēs,3rd,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nus esset,3rd,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nī essēmus,3rd,passive,subjunctive,pluperfect,plural,1st,regular,\r\nī essētis,3rd,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nī essent,3rd,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nītus eram,4th,passive,indicative,pluperfect,singular,1st,regular,\r\nītus erās,4th,passive,indicative,pluperfect,singular,2nd,regular,\r\nītus erat,4th,passive,indicative,pluperfect,singular,3rd,regular,\r\nītī erāmus,4th,passive,indicative,pluperfect,plural,1st,regular,\r\nīti erātis,4th,passive,indicative,pluperfect,plural,2nd,regular,\r\nītī erant,4th,passive,indicative,pluperfect,plural,3rd,regular,\r\nītus essem,4th,passive,subjunctive,pluperfect,singular,1st,regular,\r\nītus essēs,4th,passive,subjunctive,pluperfect,singular,2nd,regular,\r\nītus esset,4th,passive,subjunctive,pluperfect,singular,3rd,regular,\r\nītī essēmus,4th,passive,subjunctive,pluperfect,plural,1st,regular,\r\nīti essētis,4th,passive,subjunctive,pluperfect,plural,2nd,regular,\r\nīti essent,4th,passive,subjunctive,pluperfect,plural,3rd,regular,\r\nātus erō,1st,passive,indicative,future_perfect,singular,1st,regular,\r\nātus eris,1st,passive,indicative,future_perfect,singular,2nd,regular,\r\nātus erit,1st,passive,indicative,future_perfect,singular,3rd,regular,\r\nāti erimus,1st,passive,indicative,future_perfect,plural,1st,regular,\r\nāti eritis,1st,passive,indicative,future_perfect,plural,2nd,regular,\r\nāti erunt,1st,passive,indicative,future_perfect,plural,3rd,regular,\r\n,1st,passive,subjunctive,future_perfect,singular,1st,,\r\n,1st,passive,subjunctive,future_perfect,singular,2nd,,\r\n,1st,passive,subjunctive,future_perfect,singular,3rd,,\r\n,1st,passive,subjunctive,future_perfect,plural,1st,,\r\n,1st,passive,subjunctive,future_perfect,plural,2nd,,\r\n,1st,passive,subjunctive,future_perfect,plural,3rd,,\r\nitus erō,2nd,passive,indicative,future_perfect,singular,1st,regular,\r\nitus eris,2nd,passive,indicative,future_perfect,singular,2nd,regular,\r\nitus erit,2nd,passive,indicative,future_perfect,singular,3rd,regular,\r\nitī erimus,2nd,passive,indicative,future_perfect,plural,1st,regular,\r\nitī eritis,2nd,passive,indicative,future_perfect,plural,2nd,regular,\r\nitī erunt,2nd,passive,indicative,future_perfect,plural,3rd,regular,\r\n,2nd,passive,subjunctive,future_perfect,singular,1st,,\r\n,2nd,passive,subjunctive,future_perfect,singular,2nd,,\r\n,2nd,passive,subjunctive,future_perfect,singular,3rd,,\r\n,2nd,passive,subjunctive,future_perfect,plural,1st,,\r\n,2nd,passive,subjunctive,future_perfect,plural,2nd,,\r\n,2nd,passive,subjunctive,future_perfect,plural,3rd,,\r\nus erō,3rd,passive,indicative,future_perfect,singular,1st,regular,\r\nus eris,3rd,passive,indicative,future_perfect,singular,2nd,regular,\r\nus erit,3rd,passive,indicative,future_perfect,singular,3rd,regular,\r\nī erimus,3rd,passive,indicative,future_perfect,plural,1st,regular,\r\nī eritis,3rd,passive,indicative,future_perfect,plural,2nd,regular,\r\nī erunt,3rd,passive,indicative,future_perfect,plural,3rd,regular,\r\n,3rd,passive,subjunctive,future_perfect,singular,1st,,\r\n,3rd,passive,subjunctive,future_perfect,singular,2nd,,\r\n,3rd,passive,subjunctive,future_perfect,singular,3rd,,\r\n,3rd,passive,subjunctive,future_perfect,plural,1st,,\r\n,3rd,passive,subjunctive,future_perfect,plural,2nd,,\r\n,3rd,passive,subjunctive,future_perfect,plural,3rd,,\r\nītus erō,4th,passive,indicative,future_perfect,singular,1st,regular,\r\nītus eris,4th,passive,indicative,future_perfect,singular,2nd,regular,\r\nītus erit,4th,passive,indicative,future_perfect,singular,3rd,regular,\r\nītī erimus,4th,passive,indicative,future_perfect,plural,1st,regular,\r\nītī eritis,4th,passive,indicative,future_perfect,plural,2nd,regular,\r\nītī erunt,4th,passive,indicative,future_perfect,plural,3rd,regular,\r\n,4th,passive,subjunctive,future_perfect,singular,1st,,\r\n,4th,passive,subjunctive,future_perfect,singular,2nd,,\r\n,4th,passive,subjunctive,future_perfect,singular,3rd,,\r\n,4th,passive,subjunctive,future_perfect,plural,1st,,\r\n,4th,passive,subjunctive,future_perfect,plural,2nd,,\r\n,4th,passive,subjunctive,future_perfect,plural,3rd,,"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "Index,Text\r\n2,Chiefly in poetry.\r\n3,\"In tenses based on the perfect stem (the perfect, pluperfect and future perfect of the Active voice) a v between two vowels is often lost with contraction of the two vowels, thus āvī to ā, ēvī to ē, ōvi to ō. Perfects in īvī often omit the v but rarely contract the vowels, except before ss or st, and sometimes in the third person. In addition to the use of v or u, the Active perfect stem can also be formed in a number of other ways, such as the addition of s to the root (eg carpsi), reduplication of the root (eg cecidi from cado), and simple lengthening of the vowel (eg vidī from video or legī from lego).\"\r\n4,\"Dic, duc, fac, and fer lack a final vowel in the imperative in classical Latin. The singular imperative of the verb sciō is always scītō, and the plural is usually scītōte.\"\r\n5,Common in epic poetry.\r\n6,Present in early Latin but chiefly confined to popular use until Livy and later writers.\r\n7,The verb fīō is a 4th conjugation verb that is irregular in only two forms: the present infinitive fierī and the imperfect subjunctive fierem."

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_lib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__ = __webpack_require__(2);




let data = new __WEBPACK_IMPORTED_MODULE_1__lib_lib__["a" /* ImportData */](__WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].greek);

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].part).importer
    .map('noun', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["f" /* parts */].noun);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].grmCase).importer
    .map('nominative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["a" /* cases */].nominative)
    .map('genitive', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["a" /* cases */].genitive)
    .map('dative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["a" /* cases */].dative)
    .map('accusative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["a" /* cases */].accusative)
    .map('vocative', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["a" /* cases */].vocative);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].declension).importer
    .map('1st', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["c" /* declensions */].first)
    .map('2nd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["c" /* declensions */].second)
    .map('3rd', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["c" /* declensions */].third);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].number).importer
    .map('singular', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["e" /* numbers */].singular)
    .map('dual', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["e" /* numbers */].dual)
    .map('plural', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["e" /* numbers */].plural);

data.addFeature(__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].gender).importer
    .map('masculine', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["d" /* genders */].masculine)
    .map('feminine', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["d" /* genders */].feminine)
    .map('neuter', __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["d" /* genders */].neuter)
    .map('masculine feminine', [__WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["d" /* genders */].masculine, __WEBPACK_IMPORTED_MODULE_2__lib_lang_greek_greek__["d" /* genders */].feminine]);

/* harmony default export */ __webpack_exports__["a"] = (data);


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "Ending,Number,Case,Declension,Gender,Type,Primary,Footnote\r\nα,dual,accusative,1st,feminine,regular,primary,\r\nά,dual,accusative,1st,feminine,regular,,\r\nᾶ,dual,accusative,1st,feminine,regular,,2\r\nαιν,dual,dative,1st,feminine,regular,primary,\r\nαῖν,dual,dative,1st,feminine,regular,,\r\nαιιν,dual,dative,1st,feminine,irregular,,\r\nαιν,dual,genitive,1st,feminine,regular,primary,\r\nαῖν,dual,genitive,1st,feminine,regular,,\r\nαιιν,dual,genitive,1st,feminine,irregular,,\r\nα,dual,nominative,1st,feminine,regular,primary,\r\nά,dual,nominative,1st,feminine,regular,,\r\nᾶ,dual,nominative,1st,feminine,regular,,2\r\nα,dual,vocative,1st,feminine,regular,primary,\r\nά,dual,vocative,1st,feminine,regular,,\r\nᾶ,dual,vocative,1st,feminine,regular,,2\r\nα,dual,accusative,1st,masculine,regular,primary,\r\nά,dual,accusative,1st,masculine,regular,,\r\nᾶ,dual,accusative,1st,masculine,regular,,2\r\nαιν,dual,dative,1st,masculine,regular,primary,\r\nαῖν,dual,dative,1st,masculine,regular,,\r\nαιιν,dual,dative,1st,masculine,irregular,,\r\nαιν,dual,genitive,1st,masculine,regular,primary,\r\nαῖν,dual,genitive,1st,masculine,regular,,\r\nαιιν,dual,genitive,1st,masculine,irregular,,\r\nα,dual,nominative,1st,masculine,regular,primary,\r\nά,dual,nominative,1st,masculine,regular,,\r\nᾶ,dual,nominative,1st,masculine,regular,,2\r\nα,dual,vocative,1st,masculine,regular,primary,\r\nά,dual,vocative,1st,masculine,regular,,\r\nᾶ,dual,vocative,1st,masculine,regular,,2\r\nας,plural,accusative,1st,feminine,regular,primary,\r\nάς,plural,accusative,1st,feminine,regular,,\r\nᾶς,plural,accusative,1st,feminine,regular,,2\r\nανς,plural,accusative,1st,feminine,irregular,,\r\nαις,plural,accusative,1st,feminine,irregular,,\r\nαις,plural,dative,1st,feminine,regular,primary,\r\nαῖς,plural,dative,1st,feminine,regular,,\r\nῃσι,plural,dative,1st,feminine,irregular,,44\r\nῃσιν,plural,dative,1st,feminine,irregular,,4 44\r\nῃς,plural,dative,1st,feminine,irregular,,44\r\nαισι,plural,dative,1st,feminine,irregular,,44\r\nαισιν,plural,dative,1st,feminine,irregular,,4 44\r\nῶν,plural,genitive,1st,feminine,regular,primary,\r\nάων,plural,genitive,1st,feminine,irregular,,\r\nέων,plural,genitive,1st,feminine,irregular,,\r\nήων,plural,genitive,1st,feminine,irregular,,\r\nᾶν,plural,genitive,1st,feminine,irregular,,\r\nαι,plural,nominative,1st,feminine,regular,primary,\r\nαί,plural,nominative,1st,feminine,regular,,\r\nαῖ,plural,nominative,1st,feminine,regular,,2\r\nαι,plural,vocative,1st,feminine,regular,primary,\r\nαί,plural,vocative,1st,feminine,regular,,\r\nαῖ,plural,vocative,1st,feminine,regular,,2\r\nας,plural,accusative,1st,masculine,regular,primary,\r\nάς,plural,accusative,1st,masculine,regular,,\r\nᾶς,plural,accusative,1st,masculine,regular,,3\r\nανς,plural,accusative,1st,masculine,irregular,,\r\nαις,plural,accusative,1st,masculine,irregular,,\r\nαις,plural,dative,1st,masculine,regular,primary,\r\nαῖς,plural,dative,1st,masculine,regular,,\r\nῃσι,plural,dative,1st,masculine,irregular,,44\r\nῃσιν,plural,dative,1st,masculine,irregular,,4 44\r\nῃς,plural,dative,1st,masculine,irregular,,44\r\nαισι,plural,dative,1st,masculine,irregular,,44\r\nαισιν,plural,dative,1st,masculine,irregular,,4 44\r\nῶν,plural,genitive,1st,masculine,regular,primary,\r\nάων,plural,genitive,1st,masculine,irregular,,\r\nέων,plural,genitive,1st,masculine,irregular,,\r\nήων,plural,genitive,1st,masculine,irregular,,\r\nᾶν,plural,genitive,1st,masculine,irregular,,\r\nαι,plural,nominative,1st,masculine,regular,primary,\r\nαί,plural,nominative,1st,masculine,regular,,\r\nαῖ,plural,nominative,1st,masculine,regular,,3\r\nαι,plural,vocative,1st,masculine,regular,primary,\r\nαί,plural,vocative,1st,masculine,regular,,\r\nαῖ,plural,vocative,1st,masculine,regular,,3\r\nαν,singular,accusative,1st,feminine,regular,primary,\r\nην,singular,accusative,1st,feminine,regular,primary,\r\nήν,singular,accusative,1st,feminine,regular,,\r\nᾶν,singular,accusative,1st,feminine,regular,,2\r\nῆν,singular,accusative,1st,feminine,regular,,2\r\nάν,singular,accusative,1st,feminine,irregular,,63\r\nᾳ,singular,dative,1st,feminine,regular,primary,\r\nῃ,singular,dative,1st,feminine,regular,primary,\r\nῇ,singular,dative,1st,feminine,regular,,2\r\nᾷ,singular,dative,1st,feminine,regular,,2\r\nηφι,singular,dative,1st,feminine,irregular,,45\r\nηφιν,singular,dative,1st,feminine,irregular,,4 45\r\nῆφι,singular,dative,1st,feminine,irregular,,45\r\nῆφιv,singular,dative,1st,feminine,irregular,,4 45\r\nας,singular,genitive,1st,feminine,regular,primary,\r\nης,singular,genitive,1st,feminine,regular,primary,\r\nῆs,singular,genitive,1st,feminine,regular,,\r\nᾶs,singular,genitive,1st,feminine,regular,,2\r\nηφι,singular,genitive,1st,feminine,irregular,,45\r\nηφιν,singular,genitive,1st,feminine,irregular,,4 45\r\nῆφι,singular,genitive,1st,feminine,irregular,,45\r\nῆφιv,singular,genitive,1st,feminine,irregular,,4 45\r\nα,singular,nominative,1st,feminine,regular,primary,\r\nη,singular,nominative,1st,feminine,regular,primary,1\r\nή,singular,nominative,1st,feminine,regular,,\r\nᾶ,singular,nominative,1st,feminine,regular,,2\r\nῆ,singular,nominative,1st,feminine,regular,,2\r\nά,singular,nominative,1st,feminine,irregular,,63\r\nα,singular,vocative,1st,feminine,regular,primary,\r\nη,singular,vocative,1st,feminine,regular,primary,\r\nή,singular,vocative,1st,feminine,regular,,\r\nᾶ,singular,vocative,1st,feminine,regular,,2\r\nῆ,singular,vocative,1st,feminine,regular,,2\r\nά,singular,vocative,1st,feminine,irregular,,63\r\nαν,singular,accusative,1st,masculine,regular,primary,\r\nην,singular,accusative,1st,masculine,regular,primary,3\r\nήν,singular,accusative,1st,masculine,regular,,\r\nᾶν,singular,accusative,1st,masculine,regular,,3\r\nῆν,singular,accusative,1st,masculine,regular,,3\r\nεα,singular,accusative,1st,masculine,irregular,,\r\nᾳ,singular,dative,1st,masculine,regular,primary,\r\nῃ,singular,dative,1st,masculine,regular,primary,\r\nῇ,singular,dative,1st,masculine,regular,,\r\nᾷ,singular,dative,1st,masculine,regular,,3\r\nῆ,singular,dative,1st,masculine,regular,,3\r\nηφι,singular,dative,1st,masculine,irregular,,45\r\nηφιν,singular,dative,1st,masculine,irregular,,4 45\r\nῆφι,singular,dative,1st,masculine,irregular,,45\r\nῆφιv,singular,dative,1st,masculine,irregular,,4 45\r\nου,singular,genitive,1st,masculine,regular,primary,\r\nοῦ,singular,genitive,1st,masculine,regular,,\r\nαο,singular,genitive,1st,masculine,irregular,,\r\nεω,singular,genitive,1st,masculine,irregular,,\r\nηφι,singular,genitive,1st,masculine,irregular,,45\r\nηφιν,singular,genitive,1st,masculine,irregular,,4 45\r\nῆφι,singular,genitive,1st,masculine,irregular,,45\r\nῆφιv,singular,genitive,1st,masculine,irregular,,4 45\r\nω,singular,genitive,1st,masculine,irregular,,\r\nα,singular,genitive,1st,masculine,irregular,,\r\nας,singular,nominative,1st,masculine,regular,primary,\r\nης,singular,nominative,1st,masculine,regular,primary,\r\nής,singular,nominative,1st,masculine,regular,,\r\nᾶs,singular,nominative,1st,masculine,regular,,3\r\nῆs,singular,nominative,1st,masculine,regular,,3\r\nα,singular,vocative,1st,masculine,regular,primary,\r\nη,singular,vocative,1st,masculine,regular,primary,\r\nά,singular,vocative,1st,masculine,regular,,\r\nᾶ,singular,vocative,1st,masculine,regular,,3\r\nῆ,singular,vocative,1st,masculine,regular,,3\r\nω,dual,accusative,2nd,masculine feminine,regular,primary,\r\nώ,dual,accusative,2nd,masculine feminine,regular,,5\r\nοιν,dual,dative,2nd,masculine feminine,regular,primary,\r\nοῖν,dual,dative,2nd,masculine feminine,regular,,5\r\nοιιν,dual,dative,2nd,masculine feminine,irregular,,\r\nῴν,dual,dative,2nd,masculine feminine,irregular,,7\r\nοιν,dual,genitive,2nd,masculine feminine,regular,primary,\r\nοῖν,dual,genitive,2nd,masculine feminine,regular,,5\r\nοιιν,dual,genitive,2nd,masculine feminine,irregular,,\r\nῴν,dual,genitive,2nd,masculine feminine,irregular,,7\r\nω,dual,nominative,2nd,masculine feminine,regular,primary,60\r\nώ,dual,nominative,2nd,masculine feminine,regular,,60\r\nω,dual,vocative,2nd,masculine feminine,regular,primary,\r\nώ,dual,vocative,2nd,masculine feminine,regular,,5\r\nω,dual,accusative,2nd,neuter,regular,primary,\r\nώ,dual,accusative,2nd,neuter,regular,,6\r\nοιν,dual,dative,2nd,neuter,regular,primary,\r\nοῖν,dual,dative,2nd,neuter,regular,,6\r\nοιιν,dual,dative,2nd,neuter,irregular,,\r\nοιν,dual,genitive,2nd,neuter,regular,primary,\r\nοῖν,dual,genitive,2nd,neuter,regular,,6\r\nοιιν,dual,genitive,2nd,neuter,irregular,,\r\nω,dual,nominative,2nd,neuter,regular,primary,\r\nώ,dual,nominative,2nd,neuter,regular,,6\r\nω,dual,vocative,2nd,neuter,regular,primary,\r\nώ,dual,vocative,2nd,neuter,regular,,6\r\nους,plural,accusative,2nd,masculine feminine,regular,primary,\r\nούς,plural,accusative,2nd,masculine feminine,regular,,41\r\nοῦς,plural,accusative,2nd,masculine feminine,regular,,5\r\nονς,plural,accusative,2nd,masculine feminine,irregular,,\r\nος,plural,accusative,2nd,masculine feminine,irregular,,\r\nως,plural,accusative,2nd,masculine feminine,irregular,,\r\nοις,plural,accusative,2nd,masculine feminine,irregular,,\r\nώς,plural,accusative,2nd,masculine feminine,irregular,,7\r\nοις,plural,dative,2nd,masculine feminine,regular,primary,\r\nοῖς,plural,dative,2nd,masculine feminine,regular,,5\r\nοισι,plural,dative,2nd,masculine feminine,irregular,,\r\nοισιν,plural,dative,2nd,masculine feminine,irregular,,4\r\nῴς,plural,dative,2nd,masculine feminine,irregular,,7\r\nόφι,plural,dative,2nd,masculine feminine,irregular,,45\r\nόφιv,plural,dative,2nd,masculine feminine,irregular,,4 45\r\nων,plural,genitive,2nd,masculine feminine,regular,primary,\r\nῶν,plural,genitive,2nd,masculine feminine,regular,,5\r\nών,plural,genitive,2nd,masculine feminine,irregular,,7\r\nόφι,plural,genitive,2nd,masculine feminine,irregular,,45\r\nόφιv,plural,genitive,2nd,masculine feminine,irregular,,4 45\r\nοι,plural,nominative,2nd,masculine feminine,regular,primary,\r\nοί,plural,nominative,2nd,masculine feminine,regular,,41\r\nοῖ,plural,nominative,2nd,masculine feminine,regular,,5\r\nῴ,plural,nominative,2nd,masculine feminine,irregular,,7\r\nοι,plural,vocative,2nd,masculine feminine,regular,primary,\r\nοί,plural,vocative,2nd,masculine feminine,regular,,41\r\nοῖ,plural,vocative,2nd,masculine feminine,regular,,5\r\nα,plural,accusative,2nd,neuter,regular,primary,\r\nᾶ,plural,accusative,2nd,neuter,regular,,6\r\nοις,plural,dative,2nd,neuter,regular,primary,\r\nοῖς,plural,dative,2nd,neuter,regular,,6\r\nοισι,plural,dative,2nd,neuter,irregular,,\r\nοισιν,plural,dative,2nd,neuter,irregular,,4\r\nόφι,plural,dative,2nd,neuter,irregular,,45\r\nόφιv,plural,dative,2nd,neuter,irregular,,4 45\r\nων,plural,genitive,2nd,neuter,regular,primary,\r\nῶν,plural,genitive,2nd,neuter,regular,,6\r\nόφι,plural,genitive,2nd,neuter,irregular,,45\r\nόφιv,plural,genitive,2nd,neuter,irregular,,4 45\r\nα,plural,nominative,2nd,neuter,regular,primary,\r\nᾶ,plural,nominative,2nd,neuter,regular,,6\r\nα,plural,vocative,2nd,neuter,regular,primary,\r\nᾶ,plural,vocative,2nd,neuter,regular,,6\r\nον,singular,accusative,2nd,masculine feminine,regular,primary,\r\nόν,singular,accusative,2nd,masculine feminine,regular,primary,41\r\nουν,singular,accusative,2nd,masculine feminine,regular,,5\r\nοῦν,singular,accusative,2nd,masculine feminine,regular,,5\r\nω,singular,accusative,2nd,masculine feminine,irregular,,7 5\r\nωv,singular,accusative,2nd,masculine feminine,irregular,,7 59\r\nώ,singular,accusative,2nd,masculine feminine,irregular,,7 42 59\r\nών,singular,accusative,2nd,masculine feminine,irregular,,7 59\r\nῳ,singular,dative,2nd,masculine feminine,regular,primary,\r\nῷ,singular,dative,2nd,masculine feminine,regular,,5\r\nῴ,singular,dative,2nd,masculine feminine,irregular,,7\r\nόφι,singular,dative,2nd,masculine feminine,irregular,,45\r\nόφιv,singular,dative,2nd,masculine feminine,irregular,,4 45\r\nου,singular,genitive,2nd,masculine feminine,regular,primary,\r\nοῦ,singular,genitive,2nd,masculine feminine,regular,,5\r\nοιο,singular,genitive,2nd,masculine feminine,irregular,,\r\nοο,singular,genitive,2nd,masculine feminine,irregular,,\r\nω,singular,genitive,2nd,masculine feminine,irregular,,\r\nώ,singular,genitive,2nd,masculine feminine,irregular,,7\r\nόφι,singular,genitive,2nd,masculine feminine,irregular,,45\r\nόφιv,singular,genitive,2nd,masculine feminine,irregular,,4 45\r\nος,singular,nominative,2nd,masculine feminine,regular,primary,\r\nους,singular,nominative,2nd,masculine feminine,regular,,5\r\noῦς,singular,nominative,2nd,masculine feminine,regular,,5\r\nός,singular,nominative,2nd,masculine feminine,regular,,\r\nώς,singular,nominative,2nd,masculine feminine,irregular,,7 42\r\nως,singular,nominative,2nd,masculine feminine,irregular,,\r\nε,singular,vocative,2nd,masculine feminine,regular,primary,\r\nέ,singular,vocative,2nd,masculine feminine,regular,,\r\nοu,singular,vocative,2nd,masculine feminine,regular,,5\r\nοῦ,singular,vocative,2nd,masculine feminine,regular,,42\r\nός,singular,vocative,2nd,masculine feminine,irregular,,57\r\nον,singular,accusative,2nd,neuter,regular,primary,\r\nοῦν,singular,accusative,2nd,neuter,regular,,6\r\nῳ,singular,dative,2nd,neuter,regular,primary,\r\nῷ,singular,dative,2nd,neuter,regular,,6\r\nόφι,singular,dative,2nd,neuter,irregular,,45\r\nόφιv,singular,dative,2nd,neuter,irregular,,4 45\r\nου,singular,genitive,2nd,neuter,regular,primary,\r\nοῦ,singular,genitive,2nd,neuter,regular,,6\r\nοο,singular,genitive,2nd,neuter,irregular,,\r\nοιο,singular,genitive,2nd,neuter,irregular,,\r\nω,singular,genitive,2nd,neuter,irregular,,\r\nόφι,singular,genitive,2nd,neuter,irregular,,45\r\nόφιv,singular,genitive,2nd,neuter,irregular,,4 45\r\nον,singular,nominative,2nd,neuter,regular,primary,\r\nοῦν,singular,nominative,2nd,neuter,regular,,6\r\nον,singular,vocative,2nd,neuter,regular,primary,\r\nοῦν,singular,vocative,2nd,neuter,regular,,6\r\nε,dual,accusative,3rd,masculine feminine,regular,primary,\r\nει,dual,accusative,3rd,masculine feminine,regular,,\r\nῆ,dual,accusative,3rd,masculine feminine,regular,,18\r\nω,dual,accusative,3rd,masculine feminine,irregular,,32\r\nῖ,dual,accusative,3rd,masculine feminine,irregular,,33\r\nεε,dual,accusative,3rd,masculine feminine,irregular,,16 55 61\r\nοιν,dual,dative,3rd,masculine feminine,regular,primary,\r\nοῖν,dual,dative,3rd,masculine feminine,regular,,\r\nοιιν,dual,dative,3rd,masculine feminine,irregular,,54\r\nσι,dual,dative,3rd,masculine feminine,irregular,,33 37\r\nεσσι,dual,dative,3rd,masculine feminine,irregular,,33\r\nεσι,dual,dative,3rd,masculine feminine,irregular,,33\r\nέοιν,dual,dative,3rd,masculine feminine,irregular,,16 61\r\nῳν,dual,dative,3rd,masculine feminine,irregular,,49\r\nοιν,dual,genitive,3rd,masculine feminine,regular,primary,\r\nοῖν,dual,genitive,3rd,masculine feminine,regular,,\r\nοιιν,dual,genitive,3rd,masculine feminine,irregular,,54\r\nέοιν,dual,genitive,3rd,masculine feminine,irregular,,16 61\r\nῳν,dual,genitive,3rd,masculine feminine,irregular,,49\r\nε,dual,nominative,3rd,masculine feminine,regular,primary,\r\nει,dual,nominative,3rd,masculine feminine,regular,,\r\nῆ,dual,nominative,3rd,masculine feminine,regular,,18\r\nω,dual,nominative,3rd,masculine feminine,irregular,,32\r\nῖ,dual,nominative,3rd,masculine feminine,irregular,,33\r\nεε,dual,nominative,3rd,masculine feminine,irregular,,16 55 61\r\nε,dual,vocative,3rd,masculine feminine,regular,primary,\r\nει,dual,vocative,3rd,masculine feminine,regular,,\r\nῆ,dual,vocative,3rd,masculine feminine,regular,,18\r\nω,dual,vocative,3rd,masculine feminine,irregular,,32\r\nῖ,dual,vocative,3rd,masculine feminine,irregular,,33\r\nεε,dual,vocative,3rd,masculine feminine,irregular,,16 55 61\r\nε,dual,accusative,3rd,neuter,regular,primary,\r\nει,dual,accusative,3rd,neuter,regular,,\r\nα,dual,accusative,3rd,neuter,regular,,\r\nεε,dual,accusative,3rd,neuter,irregular,,16 61\r\nαε,dual,accusative,3rd,neuter,irregular,,16 61\r\nοιν,dual,dative,3rd,neuter,regular,primary,\r\nῷν,dual,dative,3rd,neuter,regular,,\r\nοις,dual,dative,3rd,neuter,irregular,,33 38\r\nοισι,dual,dative,3rd,neuter,irregular,,33 38\r\nοισι(ν),dual,dative,3rd,neuter,irregular,,4 33 38\r\nοιιν,dual,dative,3rd,neuter,irregular,,\r\nέοιν,dual,dative,3rd,neuter,irregular,,16 61\r\nάοιν,dual,dative,3rd,neuter,irregular,,16 61\r\nοιν,dual,genitive,3rd,neuter,regular,primary,\r\nῷν,dual,genitive,3rd,neuter,regular,,\r\nων,dual,genitive,3rd,neuter,irregular,,33 38\r\nοιιν,dual,genitive,3rd,neuter,irregular,,\r\nέοιν,dual,genitive,3rd,neuter,irregular,,16 61\r\nάοιν,dual,genitive,3rd,neuter,irregular,,16 61\r\nε,dual,nominative,3rd,neuter,regular,primary,\r\nει,dual,nominative,3rd,neuter,regular,,\r\nα,dual,nominative,3rd,neuter,regular,,\r\nεε,dual,nominative,3rd,neuter,irregular,,16 61\r\nαε,dual,nominative,3rd,neuter,irregular,,16 61\r\nε,dual,vocative,3rd,neuter,regular,primary,\r\nει,dual,vocative,3rd,neuter,regular,,\r\nα,dual,vocative,3rd,neuter,regular,,\r\nεε,dual,vocative,3rd,neuter,irregular,,16 61\r\nαε,dual,vocative,3rd,neuter,irregular,,16 61\r\nας,plural,accusative,3rd,masculine feminine,regular,primary,\r\nεις,plural,accusative,3rd,masculine feminine,regular,,17 41\r\nες,plural,accusative,3rd,masculine feminine,regular,,\r\nς,plural,accusative,3rd,masculine feminine,regular,,\r\nῦς,plural,accusative,3rd,masculine feminine,regular,,17 18 48\r\nως,plural,accusative,3rd,masculine feminine,regular,,30\r\nῆς,plural,accusative,3rd,masculine feminine,irregular,,56\r\nέας,plural,accusative,3rd,masculine feminine,irregular,,\r\nέος,plural,accusative,3rd,masculine feminine,irregular,,\r\nῆος,plural,accusative,3rd,masculine feminine,irregular,,\r\nῆες,plural,accusative,3rd,masculine feminine,irregular,,\r\nῆας,plural,accusative,3rd,masculine feminine,irregular,,\r\nους,plural,accusative,3rd,masculine feminine,irregular,,32\r\nούς,plural,accusative,3rd,masculine feminine,irregular,,32\r\nεῖς,plural,accusative,3rd,masculine feminine,irregular,,31 41\r\nεες,plural,accusative,3rd,masculine feminine,irregular,,55 61\r\nις,plural,accusative,3rd,masculine feminine,irregular,,\r\nινς,plural,accusative,3rd,masculine feminine,irregular,,\r\nῶς,plural,accusative,3rd,masculine feminine,irregular,,48\r\nσι,plural,dative,3rd,masculine feminine,regular,primary,\r\nσιν,plural,dative,3rd,masculine feminine,regular,primary,4\r\nσί,plural,dative,3rd,masculine feminine,regular,,41\r\nσίν,plural,dative,3rd,masculine feminine,regular,,4 41\r\nεσι,plural,dative,3rd,masculine feminine,regular,,41\r\nεσιν,plural,dative,3rd,masculine feminine,regular,,4 41\r\nέσι,plural,dative,3rd,masculine feminine,regular,,\r\nέσιν,plural,dative,3rd,masculine feminine,regular,,4\r\nψι,plural,dative,3rd,masculine feminine,regular,,\r\nψιν,plural,dative,3rd,masculine feminine,regular,,4\r\nψί,plural,dative,3rd,masculine feminine,regular,,\r\nψίν,plural,dative,3rd,masculine feminine,regular,,4\r\nξι,plural,dative,3rd,masculine feminine,regular,,\r\nξιν,plural,dative,3rd,masculine feminine,regular,,4\r\nξί,plural,dative,3rd,masculine feminine,regular,,\r\nξίν,plural,dative,3rd,masculine feminine,regular,,4\r\nφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nηφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nηφιv,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nῆφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nῆφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nόφι,plural,dative,3rd,masculine feminine,irregular,,45\r\nόφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\r\nαις,plural,dative,3rd,masculine feminine,irregular,,33 41\r\nοῖσι,plural,dative,3rd,masculine feminine,irregular,,33\r\nοῖσιv,plural,dative,3rd,masculine feminine,irregular,,4 33\r\nεσσι,plural,dative,3rd,masculine feminine,irregular,,16 61\r\nεσσιv,plural,dative,3rd,masculine feminine,irregular,,4 16 61\r\nυσσι,plural,dative,3rd,masculine feminine,irregular,,54\r\nυσσιv,plural,dative,3rd,masculine feminine,irregular,,4 54\r\nσσί,plural,dative,3rd,masculine feminine,irregular,,54\r\nσσίv,plural,dative,3rd,masculine feminine,irregular,,4 54\r\nων,plural,genitive,3rd,masculine feminine,regular,primary,\r\nῶν,plural,genitive,3rd,masculine feminine,regular,,\r\n-,plural,genitive,3rd,masculine feminine,irregular,,41\r\nφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nηφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nηφιv,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nῆφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nῆφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nόφι,plural,genitive,3rd,masculine feminine,irregular,,45\r\nόφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\r\nέων,plural,genitive,3rd,masculine feminine,irregular,,16 61\r\nες,plural,nominative,3rd,masculine feminine,regular,primary,\r\nως,plural,nominative,3rd,masculine feminine,regular,,30\r\nεις,plural,nominative,3rd,masculine feminine,regular,,17\r\nεῖς,plural,nominative,3rd,masculine feminine,regular,,18\r\nοί,plural,nominative,3rd,masculine feminine,irregular,,32\r\nαί,plural,nominative,3rd,masculine feminine,irregular,,33\r\nῆς,plural,nominative,3rd,masculine feminine,irregular,,18\r\nῄς,plural,nominative,3rd,masculine feminine,irregular,,31 41\r\nεες,plural,nominative,3rd,masculine feminine,irregular,,16 55 61\r\nοι,plural,nominative,3rd,masculine feminine,irregular,,33\r\nες,plural,vocative,3rd,masculine feminine,regular,primary,\r\nεις,plural,vocative,3rd,masculine feminine,regular,,17\r\nεῖς,plural,vocative,3rd,masculine feminine,regular,,18\r\nῆς,plural,vocative,3rd,masculine feminine,regular,,18\r\nως,plural,vocative,3rd,masculine feminine,regular,,30\r\nεες,plural,vocative,3rd,masculine feminine,irregular,,16 55 61\r\nα,plural,accusative,3rd,neuter,regular,primary,\r\nη,plural,accusative,3rd,neuter,regular,,\r\nς,plural,accusative,3rd,neuter,regular,,\r\nά,plural,accusative,3rd,neuter,irregular,,33\r\nαα,plural,accusative,3rd,neuter,irregular,,16 61\r\nεα,plural,accusative,3rd,neuter,irregular,,16 61\r\nσι,plural,dative,3rd,neuter,regular,primary,\r\nσιν,plural,dative,3rd,neuter,regular,primary,4\r\nσί,plural,dative,3rd,neuter,regular,,\r\nσίv,plural,dative,3rd,neuter,regular,,4\r\nασι,plural,dative,3rd,neuter,regular,,\r\nασιν,plural,dative,3rd,neuter,regular,,4\r\nεσι,plural,dative,3rd,neuter,regular,,\r\nεσιν,plural,dative,3rd,neuter,regular,,4\r\nέσι,plural,dative,3rd,neuter,regular,,\r\nέσιv,plural,dative,3rd,neuter,regular,,4\r\nεσσι,plural,dative,3rd,neuter,irregular,,54\r\nεσσιν,plural,dative,3rd,neuter,irregular,,4 54\r\nσσί,plural,dative,3rd,neuter,irregular,,54\r\nσσίv,plural,dative,3rd,neuter,irregular,,4 54\r\nασσι,plural,dative,3rd,neuter,irregular,,54\r\nασσιν,plural,dative,3rd,neuter,irregular,,4 54\r\nφι,plural,dative,3rd,neuter,irregular,,45\r\nφιν,plural,dative,3rd,neuter,irregular,,4 45\r\nηφι,plural,dative,3rd,neuter,irregular,,45\r\nηφιv,plural,dative,3rd,neuter,irregular,,4 45\r\nῆφι,plural,dative,3rd,neuter,irregular,,45\r\nῆφιν,plural,dative,3rd,neuter,irregular,,4 45\r\nόφι,plural,dative,3rd,neuter,irregular,,45\r\nόφιν,plural,dative,3rd,neuter,irregular,,4 45\r\nων,plural,genitive,3rd,neuter,regular,primary,\r\nῶν,plural,genitive,3rd,neuter,regular,primary,\r\nφι,plural,genitive,3rd,neuter,irregular,,\r\nφιν,plural,genitive,3rd,neuter,irregular,,4 45\r\nηφι,plural,genitive,3rd,neuter,irregular,,45\r\nηφιv,plural,genitive,3rd,neuter,irregular,,4 45\r\nῆφι,plural,genitive,3rd,neuter,irregular,,45\r\nῆφιν,plural,genitive,3rd,neuter,irregular,,4 45\r\nόφι,plural,genitive,3rd,neuter,irregular,,45\r\nόφιν,plural,genitive,3rd,neuter,irregular,,4 45\r\nέων,plural,genitive,3rd,neuter,irregular,,16 61\r\nάων,plural,genitive,3rd,neuter,irregular,,16 61\r\nα,plural,nominative,3rd,neuter,regular,primary,\r\nη,plural,nominative,3rd,neuter,regular,,\r\nες,plural,nominative,3rd,neuter,regular,,\r\nά,plural,nominative,3rd,neuter,irregular,,33\r\nεα,plural,nominative,3rd,neuter,irregular,,16 61\r\nαα,plural,nominative,3rd,neuter,irregular,,16 61\r\nα,plural,vocative,3rd,neuter,regular,primary,\r\nη,plural,vocative,3rd,neuter,regular,,\r\nες,plural,vocative,3rd,neuter,regular,,\r\nαα,plural,vocative,3rd,neuter,irregular,,16 61\r\nεα,plural,vocative,3rd,neuter,irregular,,16 61\r\nα,singular,accusative,3rd,masculine feminine,regular,primary,\r\nη,singular,accusative,3rd,masculine feminine,regular,,16\r\nν,singular,accusative,3rd,masculine feminine,regular,,\r\nιν,singular,accusative,3rd,masculine feminine,regular,,41\r\nῦν,singular,accusative,3rd,masculine feminine,regular,,18\r\nῶ,singular,accusative,3rd,masculine feminine,regular,,23\r\nυν,singular,accusative,3rd,masculine feminine,regular,,\r\nῦν,singular,accusative,3rd,masculine feminine,regular,,17\r\nύν,singular,accusative,3rd,masculine feminine,regular,,17\r\nέα,singular,accusative,3rd,masculine feminine,regular,,20\r\nην,singular,accusative,3rd,masculine feminine,regular,,24\r\nώ,singular,accusative,3rd,masculine feminine,regular,,19 41\r\nω,singular,accusative,3rd,masculine feminine,regular,,23\r\nεῖν,singular,accusative,3rd,masculine feminine,irregular,,31 41\r\nων,singular,accusative,3rd,masculine feminine,irregular,,33 41 49\r\nαν,singular,accusative,3rd,masculine feminine,irregular,,33 41\r\nον,singular,accusative,3rd,masculine feminine,irregular,,39\r\nῖς,singular,accusative,3rd,masculine feminine,irregular,,33\r\nεα,singular,accusative,3rd,masculine feminine,irregular,,61\r\nι,singular,dative,3rd,masculine feminine,regular,primary,\r\nί,singular,dative,3rd,masculine feminine,regular,,\r\nϊ,singular,dative,3rd,masculine feminine,regular,,17\r\nΐ,singular,dative,3rd,masculine feminine,regular,,40\r\nει,singular,dative,3rd,masculine feminine,regular,,16 17\r\nεῖ,singular,dative,3rd,masculine feminine,regular,,18\r\nαι,singular,dative,3rd,masculine feminine,regular,,\r\noῖ,singular,dative,3rd,masculine feminine,regular,,28 41\r\nῖ,singular,dative,3rd,masculine feminine,irregular,,33 46\r\nῆι,singular,dative,3rd,masculine feminine,irregular,,18\r\nᾳ,singular,dative,3rd,masculine feminine,irregular,,25\r\nῳ,singular,dative,3rd,masculine feminine,irregular,,33 34\r\nῷ,singular,dative,3rd,masculine feminine,irregular,,33\r\nιί,singular,dative,3rd,masculine feminine,irregular,,62\r\nυί,singular,dative,3rd,masculine feminine,irregular,,62\r\nέϊ,singular,dative,3rd,masculine feminine,irregular,,18 61\r\nος,singular,genitive,3rd,masculine feminine,regular,primary,\r\nός,singular,genitive,3rd,masculine feminine,regular,,\r\nους,singular,genitive,3rd,masculine feminine,regular,,16\r\nοῦς,singular,genitive,3rd,masculine feminine,regular,,19 46\r\nως,singular,genitive,3rd,masculine feminine,regular,,17 18\r\nώς,singular,genitive,3rd,masculine feminine,regular,,17 18 41\r\nῶς,singular,genitive,3rd,masculine feminine,regular,,47\r\nεως,singular,genitive,3rd,masculine feminine,regular,,17\r\nέως,singular,genitive,3rd,masculine feminine,regular,,\r\nεώς,singular,genitive,3rd,masculine feminine,regular,,\r\nέους,singular,genitive,3rd,masculine feminine,regular,,20\r\nω,singular,genitive,3rd,masculine feminine,irregular,,\r\nεος,singular,genitive,3rd,masculine feminine,irregular,,61\r\nΰς,singular,genitive,3rd,masculine feminine,irregular,,41 48\r\nῦς,singular,genitive,3rd,masculine feminine,irregular,,48\r\nνος,singular,genitive,3rd,masculine feminine,irregular,,22\r\nοῦ,singular,genitive,3rd,masculine feminine,irregular,,33\r\nηος,singular,genitive,3rd,masculine feminine,irregular,,55\r\nιός,singular,genitive,3rd,masculine feminine,irregular,,62\r\nuός,singular,genitive,3rd,masculine feminine,irregular,,62\r\nς,singular,nominative,3rd,masculine feminine,regular,primary,\r\n-,singular,nominative,3rd,masculine feminine,regular,primary,\r\nηρ,singular,nominative,3rd,masculine feminine,regular,,41\r\nις,singular,nominative,3rd,masculine feminine,regular,,\r\nϊς,singular,nominative,3rd,masculine feminine,regular,,\r\nώ,singular,nominative,3rd,masculine feminine,regular,,41\r\nψ,singular,nominative,3rd,masculine feminine,regular,,\r\nξ,singular,nominative,3rd,masculine feminine,regular,,\r\nρ,singular,nominative,3rd,masculine feminine,regular,,\r\nήρ,singular,nominative,3rd,masculine feminine,regular,,\r\nήν,singular,nominative,3rd,masculine feminine,regular,,50\r\nν,singular,nominative,3rd,masculine feminine,regular,,\r\nωρ,singular,nominative,3rd,masculine feminine,regular,,\r\nων,singular,nominative,3rd,masculine feminine,regular,,\r\nών,singular,nominative,3rd,masculine feminine,regular,,\r\nης,singular,nominative,3rd,masculine feminine,regular,,\r\nῆς,singular,nominative,3rd,masculine feminine,regular,,\r\nυς,singular,nominative,3rd,masculine feminine,regular,,\r\nῦς,singular,nominative,3rd,masculine feminine,regular,,\r\nεῦς,singular,nominative,3rd,masculine feminine,regular,,\r\nύς,singular,nominative,3rd,masculine feminine,regular,,\r\nής,singular,nominative,3rd,masculine feminine,regular,,33\r\nας,singular,nominative,3rd,masculine feminine,irregular,,\r\nῴ,singular,nominative,3rd,masculine feminine,irregular,,29 41\r\nώς,singular,nominative,3rd,masculine feminine,irregular,,27 41\r\nϋς,singular,nominative,3rd,masculine feminine,irregular,,41\r\nῄς,singular,nominative,3rd,masculine feminine,irregular,,31 41\r\nῖς,singular,nominative,3rd,masculine feminine,irregular,,\r\nεῖς,singular,nominative,3rd,masculine feminine,irregular,,31 41\r\nῶς,singular,nominative,3rd,masculine feminine,irregular,,48\r\nος,singular,nominative,3rd,masculine feminine,irregular,,33\r\n-,singular,vocative,3rd,masculine feminine,regular,primary,52\r\nς,singular,vocative,3rd,masculine feminine,regular,,30\r\nι,singular,vocative,3rd,masculine feminine,regular,,41\r\nῦ,singular,vocative,3rd,masculine feminine,regular,,15 17 18\r\nοῖ,singular,vocative,3rd,masculine feminine,regular,,19 41\r\nψ,singular,vocative,3rd,masculine feminine,regular,,\r\nξ,singular,vocative,3rd,masculine feminine,regular,,\r\nν,singular,vocative,3rd,masculine feminine,regular,,\r\nρ,singular,vocative,3rd,masculine feminine,regular,,\r\nων,singular,vocative,3rd,masculine feminine,regular,,50\r\nών,singular,vocative,3rd,masculine feminine,regular,,\r\nήν,singular,vocative,3rd,masculine feminine,regular,,\r\nερ,singular,vocative,3rd,masculine feminine,regular,,\r\nες,singular,vocative,3rd,masculine feminine,regular,,\r\nί,singular,vocative,3rd,masculine feminine,regular,,\r\nως,singular,vocative,3rd,masculine feminine,regular,,\r\nἶ,singular,vocative,3rd,masculine feminine,regular,,\r\nούς,singular,vocative,3rd,masculine feminine,regular,,51\r\nύ,singular,vocative,3rd,masculine feminine,regular,,15\r\nυ,singular,vocative,3rd,masculine feminine,regular,,51\r\nεις,singular,vocative,3rd,masculine feminine,regular,,20\r\nαν,singular,vocative,3rd,masculine feminine,regular,,\r\nώς,singular,vocative,3rd,masculine feminine,irregular,,27 41 46\r\nον,singular,vocative,3rd,masculine feminine,irregular,,\r\nυς,singular,vocative,3rd,masculine feminine,irregular,,33\r\nα,singular,accusative,3rd,neuter,regular,primary,15\r\n-,singular,accusative,3rd,neuter,regular,,33\r\nος,singular,accusative,3rd,neuter,regular,,\r\nας,singular,accusative,3rd,neuter,regular,,\r\nαρ,singular,accusative,3rd,neuter,regular,,21\r\nυ,singular,accusative,3rd,neuter,regular,,\r\nι,singular,dative,3rd,neuter,regular,primary,\r\nει,singular,dative,3rd,neuter,regular,,16\r\nαι,singular,dative,3rd,neuter,regular,,16 21\r\nϊ,singular,dative,3rd,neuter,irregular,,17\r\nᾳ,singular,dative,3rd,neuter,irregular,,25 33\r\nυϊ,singular,dative,3rd,neuter,irregular,,17\r\nαϊ,singular,dative,3rd,neuter,irregular,,21 61\r\nος,singular,genitive,3rd,neuter,regular,primary,\r\nους,singular,genitive,3rd,neuter,regular,,16\r\nως,singular,genitive,3rd,neuter,regular,,16\r\nεως,singular,genitive,3rd,neuter,regular,,17\r\nυς,singular,genitive,3rd,neuter,irregular,,26\r\nου,singular,genitive,3rd,neuter,irregular,,33\r\nαος,singular,genitive,3rd,neuter,irregular,,21 61\r\nα,singular,nominative,3rd,neuter,regular,primary,\r\n-,singular,nominative,3rd,neuter,regular,,33\r\nος,singular,nominative,3rd,neuter,regular,,\r\nαρ,singular,nominative,3rd,neuter,regular,,\r\nας,singular,nominative,3rd,neuter,regular,,16 21\r\nυ,singular,nominative,3rd,neuter,regular,,\r\nον,singular,nominative,3rd,neuter,irregular,,33\r\nα,singular,vocative,3rd,neuter,regular,primary,15\r\n-,singular,vocative,3rd,neuter,regular,,\r\nος,singular,vocative,3rd,neuter,regular,,\r\nας,singular,vocative,3rd,neuter,regular,,\r\nαρ,singular,vocative,3rd,neuter,regular,,21\r\nυ,singular,vocative,3rd,neuter,regular,,"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "Index,Text\r\n1,See  for Rules of variance within regular endings\r\n2,See  for Table of α- and ε- stem feminine 1st declension contracts\r\n3,See  for Table of α- and ε- stem masculine 1st declension contracts\r\n4,\"Previous, with (ν)\"\r\n5,See  for Table of o- and ε- stem masculine  2nd declension contracts\r\n6,See  for Table of o- and ε- stem neuter 2nd declension contracts\r\n7,(Attic) contracts of o-stems preceded by a long vowel\r\n15,\"This is not actually an “ending,” but the last letter of the “pure stem”. See\"\r\n16,\"See  &  for Table of Sigma (ες,ας,ος) stem contracts\"\r\n17,See  for Table of  ι and υ - stem contracts\r\n18,\"See  for Table of  ευ,αυ,and ου - stem contracts\"\r\n19,See  for stems in οι feminine 3rd declension contracts\r\n20,See  for Table of 3rd declension contracts of stems in -εσ- preceded by ε\r\n21,See  for Table of stems in τ and ατ neuter 3rd declension contracts\r\n22,\"On stem ending in ν, ν doubled in gen. Sing Aeolic (e.g. μῆνς,μῆννος...)\"\r\n23,Also in inscriptions and expressions of swearing\r\n24,(Borrowed from 1st decl) Sometimes in proper names whose nominative ends in -ης\r\n25,From -ας-stems (properly αι)\r\n26,(ε)υς instead of (ε)ος or ους (gen) for (3rd decl) words whose nominative ends in -ος\r\n27,In 3rd decl. Only in the words αἰδώς (Attic) and ἠώς (Homer and Ionic)\r\n28,Contraction of a stem in οι  and an ι-ending\r\n29,Stronger form of Ionic contractions of οι-stems (in the nominative)\r\n30,See  for Table of ω - stem contracts (masculine only)\r\n31,Nominative plural contraction of  -ειδ+ες  after dropping the δ (used for accusative too). See .a\r\n32,\"Plurals & duals occur rarely (and w/ 2nd decl endings) for 3rd decl οι-stem nouns. See .D.a,b,c\"\r\n33,See  for description and examples of Irreg. Decl involving 3rd decl endings\r\n34,(Homer)  for Attic  (ῳτ)ι\r\n35,(Homer) for Cretan ινς\r\n36,Also an irregular ending for other stem(s)\r\n37,In inscriptions\r\n38,\"Plural endings for otherwise dual noun,οσσε (eyes)\"\r\n39,\"“Poetical” (acc for ἔρως). See ,11\"\r\n40,\"Poetic for χρωτι,dat. of ὁ χρως\"\r\n41,No Masculine of this Form\r\n42,No Feminine of this Form\r\n44,See  D.9 and #215 regarding dialectic alternate forms of the Dative Plural\r\n45,\"Surviving in Homer (See ) Not truly genitive or dative, but instrumental/locative/ablative, associated with the remaining oblique cases (genitive & dative) only after being lost as cases themselves in Greek\"\r\n46,See Smyth # 266 for only surviving ος-stem in Attic (fem. singular of αἰδως)\r\n47,See  for Substantives in -εύς preceded by a vowel.\r\n48,\"See Smyth,  #275 D.1,2,3\"\r\n49,\"See , List of Principal Irregular Substantives\"\r\n50,\"See  for Table of stems in a Liquid (λ,ρ) or a Nasal (ν), and Note #259D for variants including Κρονίων...\"\r\n51,\"See  for Table of stems in a Dental (τ,δ,θ) or a Nasal (ν), and its notes including Ν.κόρυς (Voc. Κόρυ) & ὀδούς\"\r\n52,See  for general rule re 3rd Declension Masc/Fem Singular Vocative\r\n54,See  D\r\n55,See\r\n56,\"See  for other forms of endings for contracts of ευ,αυ,and ου - stems\"\r\n57,Nominative form used as Vocative. See\r\n58,\"See ,b\"\r\n59,\"See ,d\"\r\n60,This (Feminine or Masculine) Form only Masculine when derived from ε- or ο- contraction\r\n61,See Smyth Note 264 D.1 regarding Homer's use of Open Forms\r\n62,See Smyth Note 269 for alternate i-stem and u-stem endings\r\n63,See  D.2\r\n64,See  D.1"

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordTestData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json__);






class WordTestData {
    constructor() {
        this._words = {
            'cupidinibus': __WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json___default.a,
            'mare': __WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json___default.a,
            'cepit': __WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json___default.a,
            'φιλόσοφος': __WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json___default.a
        }
    }

    get(word) {
        if (this._words.hasOwnProperty(word)) {
            return this._words[word];
        }
        return undefined;
    }
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "{\r\n  \"RDF\": {\r\n    \"Annotation\": {\r\n      \"about\": \"urn:TuftsMorphologyService:cupidinibus:whitakerLat\",\r\n      \"creator\": {\r\n        \"Agent\": {\r\n          \"about\": \"net.alpheios:tools:wordsxml.v1\"\r\n        }\r\n      },\r\n      \"created\": {\r\n        \"$\": \"2017-08-10T23:15:29.185581\"\r\n      },\r\n      \"hasTarget\": {\r\n        \"Description\": {\r\n          \"about\": \"urn:word:cupidinibus\"\r\n        }\r\n      },\r\n      \"title\": {},\r\n      \"hasBody\": [\r\n        {\r\n          \"resource\": \"urn:uuid:idm140578094883136\"\r\n        },\r\n        {\r\n          \"resource\": \"urn:uuid:idm140578158026160\"\r\n        }\r\n      ],\r\n      \"Body\": [\r\n        {\r\n          \"about\": \"urn:uuid:idm140578094883136\",\r\n          \"type\": {\r\n            \"resource\": \"cnt:ContentAsXML\"\r\n          },\r\n          \"rest\": {\r\n            \"entry\": {\r\n              \"infl\": [\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"cupidin\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"ibus\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"var\": {\r\n                    \"$\": \"1st\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 2,\r\n                    \"$\": \"locative\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"plural\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"masculine\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"cupidin\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"ibus\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"var\": {\r\n                    \"$\": \"1st\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"dative\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"plural\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"masculine\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"cupidin\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"ibus\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"var\": {\r\n                    \"$\": \"1st\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"ablative\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"plural\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"masculine\"\r\n                  }\r\n                }\r\n              ],\r\n              \"dict\": {\r\n                \"hdwd\": {\r\n                  \"lang\": \"lat\",\r\n                  \"$\": \"Cupido, Cupidinis\"\r\n                },\r\n                \"pofs\": {\r\n                  \"order\": 5,\r\n                  \"$\": \"noun\"\r\n                },\r\n                \"decl\": {\r\n                  \"$\": \"3rd\"\r\n                },\r\n                \"gend\": {\r\n                  \"$\": \"masculine\"\r\n                },\r\n                \"area\": {\r\n                  \"$\": \"religion\"\r\n                },\r\n                \"freq\": {\r\n                  \"order\": 4,\r\n                  \"$\": \"common\"\r\n                },\r\n                \"src\": {\r\n                  \"$\": \"Ox.Lat.Dict.\"\r\n                }\r\n              },\r\n              \"mean\": {\r\n                \"$\": \"Cupid, son of Venus; personification of carnal desire;\"\r\n              }\r\n            }\r\n          }\r\n        },\r\n        {\r\n          \"about\": \"urn:uuid:idm140578158026160\",\r\n          \"type\": {\r\n            \"resource\": \"cnt:ContentAsXML\"\r\n          },\r\n          \"rest\": {\r\n            \"entry\": {\r\n              \"infl\": [\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"cupidin\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"ibus\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"var\": {\r\n                    \"$\": \"1st\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 2,\r\n                    \"$\": \"locative\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"plural\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"common\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"cupidin\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"ibus\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"var\": {\r\n                    \"$\": \"1st\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"dative\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"plural\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"common\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"cupidin\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"ibus\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 5,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"var\": {\r\n                    \"$\": \"1st\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"ablative\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"plural\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"common\"\r\n                  }\r\n                }\r\n              ],\r\n              \"dict\": {\r\n                \"hdwd\": {\r\n                  \"lang\": \"lat\",\r\n                  \"$\": \"cupido, cupidinis\"\r\n                },\r\n                \"pofs\": {\r\n                  \"order\": 5,\r\n                  \"$\": \"noun\"\r\n                },\r\n                \"decl\": {\r\n                  \"$\": \"3rd\"\r\n                },\r\n                \"gend\": {\r\n                  \"$\": \"common\"\r\n                },\r\n                \"freq\": {\r\n                  \"order\": 5,\r\n                  \"$\": \"frequent\"\r\n                },\r\n                \"src\": {\r\n                  \"$\": \"Ox.Lat.Dict.\"\r\n                }\r\n              },\r\n              \"mean\": {\r\n                \"$\": \"desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;\"\r\n              }\r\n            }\r\n          }\r\n        }\r\n      ]\r\n    }\r\n  }\r\n}\r\n"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "{\r\n  \"RDF\": {\r\n    \"Annotation\": {\r\n      \"about\": \"urn:TuftsMorphologyService:mare:morpheuslat\",\r\n      \"creator\": {\r\n        \"Agent\": {\r\n          \"about\": \"org.perseus:tools:morpheus.v1\"\r\n        }\r\n      },\r\n      \"created\": {\r\n        \"$\": \"2017-09-08T06:59:48.639180\"\r\n      },\r\n      \"hasTarget\": {\r\n        \"Description\": {\r\n          \"about\": \"urn:word:mare\"\r\n        }\r\n      },\r\n      \"title\": {},\r\n      \"hasBody\": [\r\n        {\r\n          \"resource\": \"urn:uuid:idm140446402389888\"\r\n        },\r\n        {\r\n          \"resource\": \"urn:uuid:idm140446402332400\"\r\n        },\r\n        {\r\n          \"resource\": \"urn:uuid:idm140446402303648\"\r\n        }\r\n      ],\r\n      \"Body\": [\r\n        {\r\n          \"about\": \"urn:uuid:idm140446402389888\",\r\n          \"type\": {\r\n            \"resource\": \"cnt:ContentAsXML\"\r\n          },\r\n          \"rest\": {\r\n            \"entry\": {\r\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34070.1\",\r\n              \"dict\": {\r\n                \"hdwd\": {\r\n                  \"lang\": \"lat\",\r\n                  \"$\": \"mare\"\r\n                },\r\n                \"pofs\": {\r\n                  \"order\": 3,\r\n                  \"$\": \"noun\"\r\n                },\r\n                \"decl\": {\r\n                  \"$\": \"3rd\"\r\n                },\r\n                \"gend\": {\r\n                  \"$\": \"neuter\"\r\n                }\r\n              },\r\n              \"infl\": [\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"mar\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"e\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"ablative\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"neuter\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"singular\"\r\n                  },\r\n                  \"stemtype\": {\r\n                    \"$\": \"is_is\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"mar\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"e\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 7,\r\n                    \"$\": \"nominative\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"neuter\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"singular\"\r\n                  },\r\n                  \"stemtype\": {\r\n                    \"$\": \"is_is\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"mar\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"e\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 1,\r\n                    \"$\": \"vocative\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"neuter\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"singular\"\r\n                  },\r\n                  \"stemtype\": {\r\n                    \"$\": \"is_is\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"mar\"\r\n                    },\r\n                    \"suff\": {\r\n                      \"$\": \"e\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"noun\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 4,\r\n                    \"$\": \"accusative\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"neuter\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"singular\"\r\n                  },\r\n                  \"stemtype\": {\r\n                    \"$\": \"is_is\"\r\n                  }\r\n                }\r\n              ]\r\n            }\r\n          }\r\n        },\r\n        {\r\n          \"about\": \"urn:uuid:idm140446402332400\",\r\n          \"type\": {\r\n            \"resource\": \"cnt:ContentAsXML\"\r\n          },\r\n          \"rest\": {\r\n            \"entry\": {\r\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34118.1\",\r\n              \"dict\": {\r\n                \"hdwd\": {\r\n                  \"lang\": \"lat\",\r\n                  \"$\": \"marum\"\r\n                },\r\n                \"pofs\": {\r\n                  \"order\": 3,\r\n                  \"$\": \"noun\"\r\n                },\r\n                \"decl\": {\r\n                  \"$\": \"2nd\"\r\n                },\r\n                \"gend\": {\r\n                  \"$\": \"neuter\"\r\n                }\r\n              },\r\n              \"infl\": {\r\n                \"term\": {\r\n                  \"lang\": \"lat\",\r\n                  \"stem\": {\r\n                    \"$\": \"mar\"\r\n                  },\r\n                  \"suff\": {\r\n                    \"$\": \"e\"\r\n                  }\r\n                },\r\n                \"pofs\": {\r\n                  \"order\": 3,\r\n                  \"$\": \"noun\"\r\n                },\r\n                \"decl\": {\r\n                  \"$\": \"2nd\"\r\n                },\r\n                \"case\": {\r\n                  \"order\": 1,\r\n                  \"$\": \"vocative\"\r\n                },\r\n                \"gend\": {\r\n                  \"$\": \"neuter\"\r\n                },\r\n                \"num\": {\r\n                  \"$\": \"singular\"\r\n                },\r\n                \"stemtype\": {\r\n                  \"$\": \"us_i\"\r\n                }\r\n              }\r\n            }\r\n          }\r\n        },\r\n        {\r\n          \"about\": \"urn:uuid:idm140446402303648\",\r\n          \"type\": {\r\n            \"resource\": \"cnt:ContentAsXML\"\r\n          },\r\n          \"rest\": {\r\n            \"entry\": {\r\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34119.1\",\r\n              \"dict\": {\r\n                \"hdwd\": {\r\n                  \"lang\": \"lat\",\r\n                  \"$\": \"mas\"\r\n                },\r\n                \"pofs\": {\r\n                  \"order\": 2,\r\n                  \"$\": \"adjective\"\r\n                },\r\n                \"decl\": {\r\n                  \"$\": \"3rd\"\r\n                }\r\n              },\r\n              \"infl\": [\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"mare\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 2,\r\n                    \"$\": \"adjective\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"ablative\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"masculine\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"singular\"\r\n                  },\r\n                  \"stemtype\": {\r\n                    \"$\": \"irreg_adj3\"\r\n                  },\r\n                  \"morph\": {\r\n                    \"$\": \"indeclform\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"mare\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 2,\r\n                    \"$\": \"adjective\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"ablative\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"feminine\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"singular\"\r\n                  },\r\n                  \"stemtype\": {\r\n                    \"$\": \"irreg_adj3\"\r\n                  },\r\n                  \"morph\": {\r\n                    \"$\": \"indeclform\"\r\n                  }\r\n                },\r\n                {\r\n                  \"term\": {\r\n                    \"lang\": \"lat\",\r\n                    \"stem\": {\r\n                      \"$\": \"mare\"\r\n                    }\r\n                  },\r\n                  \"pofs\": {\r\n                    \"order\": 2,\r\n                    \"$\": \"adjective\"\r\n                  },\r\n                  \"decl\": {\r\n                    \"$\": \"3rd\"\r\n                  },\r\n                  \"case\": {\r\n                    \"order\": 3,\r\n                    \"$\": \"ablative\"\r\n                  },\r\n                  \"gend\": {\r\n                    \"$\": \"neuter\"\r\n                  },\r\n                  \"num\": {\r\n                    \"$\": \"singular\"\r\n                  },\r\n                  \"stemtype\": {\r\n                    \"$\": \"irreg_adj3\"\r\n                  },\r\n                  \"morph\": {\r\n                    \"$\": \"indeclform\"\r\n                  }\r\n                }\r\n              ]\r\n            }\r\n          }\r\n        }\r\n      ]\r\n    }\r\n  }\r\n}"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "{\r\n  \"RDF\": {\r\n    \"Annotation\": {\r\n      \"about\": \"urn:TuftsMorphologyService:cepit:whitakerLat\",\r\n      \"creator\": {\r\n        \"Agent\": {\r\n          \"about\": \"net.alpheios:tools:wordsxml.v1\"\r\n        }\r\n      },\r\n      \"created\": {\r\n        \"$\": \"2017-08-10T23:16:53.672068\"\r\n      },\r\n      \"hasTarget\": {\r\n        \"Description\": {\r\n          \"about\": \"urn:word:cepit\"\r\n        }\r\n      },\r\n      \"title\": {},\r\n      \"hasBody\": {\r\n        \"resource\": \"urn:uuid:idm140578133848416\"\r\n      },\r\n      \"Body\": {\r\n        \"about\": \"urn:uuid:idm140578133848416\",\r\n        \"type\": {\r\n          \"resource\": \"cnt:ContentAsXML\"\r\n        },\r\n        \"rest\": {\r\n          \"entry\": {\r\n            \"infl\": {\r\n              \"term\": {\r\n                \"lang\": \"lat\",\r\n                \"stem\": {\r\n                  \"$\": \"cep\"\r\n                },\r\n                \"suff\": {\r\n                  \"$\": \"it\"\r\n                }\r\n              },\r\n              \"pofs\": {\r\n                \"order\": 3,\r\n                \"$\": \"verb\"\r\n              },\r\n              \"conj\": {\r\n                \"$\": \"3rd\"\r\n              },\r\n              \"var\": {\r\n                \"$\": \"1st\"\r\n              },\r\n              \"tense\": {\r\n                \"$\": \"perfect\"\r\n              },\r\n              \"voice\": {\r\n                \"$\": \"active\"\r\n              },\r\n              \"mood\": {\r\n                \"$\": \"indicative\"\r\n              },\r\n              \"pers\": {\r\n                \"$\": \"3rd\"\r\n              },\r\n              \"num\": {\r\n                \"$\": \"singular\"\r\n              }\r\n            },\r\n            \"dict\": {\r\n              \"hdwd\": {\r\n                \"lang\": \"lat\",\r\n                \"$\": \"capio, capere, cepi, captus\"\r\n              },\r\n              \"pofs\": {\r\n                \"order\": 3,\r\n                \"$\": \"verb\"\r\n              },\r\n              \"conj\": {\r\n                \"$\": \"3rd\"\r\n              },\r\n              \"kind\": {\r\n                \"$\": \"transitive\"\r\n              },\r\n              \"freq\": {\r\n                \"order\": 6,\r\n                \"$\": \"very frequent\"\r\n              },\r\n              \"src\": {\r\n                \"$\": \"Ox.Lat.Dict.\"\r\n              }\r\n            },\r\n            \"mean\": {\r\n              \"$\": \"take hold, seize; grasp; take bribe; arrest/capture; put on; occupy; captivate;\"\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "{\r\n  \"RDF\": {\r\n    \"Annotation\": {\r\n      \"about\": \"urn:TuftsMorphologyService:φιλόσοφος:morpheuslat\",\r\n      \"creator\": {\r\n        \"Agent\": {\r\n          \"about\": \"org.perseus:tools:morpheus.v1\"\r\n        }\r\n      },\r\n      \"created\": {\r\n        \"$\": \"2017-10-15T14:06:40.522369\"\r\n      },\r\n      \"hasTarget\": {\r\n        \"Description\": {\r\n          \"about\": \"urn:word:φιλόσοφος\"\r\n        }\r\n      },\r\n      \"title\": {},\r\n      \"hasBody\": {\r\n        \"resource\": \"urn:uuid:idm140446394225264\"\r\n      },\r\n      \"Body\": {\r\n        \"about\": \"urn:uuid:idm140446394225264\",\r\n        \"type\": {\r\n          \"resource\": \"cnt:ContentAsXML\"\r\n        },\r\n        \"rest\": {\r\n          \"entry\": {\r\n            \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:grclexent.lex78378.1\",\r\n            \"dict\": {\r\n              \"hdwd\": {\r\n                \"lang\": \"grc\",\r\n                \"$\": \"φιλόσοφος\"\r\n              },\r\n              \"pofs\": {\r\n                \"order\": 3,\r\n                \"$\": \"noun\"\r\n              },\r\n              \"decl\": {\r\n                \"$\": \"2nd\"\r\n              },\r\n              \"gend\": {\r\n                \"$\": \"masculine\"\r\n              }\r\n            },\r\n            \"infl\": {\r\n              \"term\": {\r\n                \"lang\": \"grc\",\r\n                \"stem\": {\r\n                  \"$\": \"φιλοσοφ\"\r\n                },\r\n                \"suff\": {\r\n                  \"$\": \"ος\"\r\n                }\r\n              },\r\n              \"pofs\": {\r\n                \"order\": 3,\r\n                \"$\": \"noun\"\r\n              },\r\n              \"decl\": {\r\n                \"$\": \"2nd\"\r\n              },\r\n              \"case\": {\r\n                \"order\": 7,\r\n                \"$\": \"nominative\"\r\n              },\r\n              \"gend\": {\r\n                \"$\": \"masculine\"\r\n              },\r\n              \"num\": {\r\n                \"$\": \"singular\"\r\n              },\r\n              \"stemtype\": {\r\n                \"$\": \"os_ou\"\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}"

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(26);
var bytesToUuid = __webpack_require__(28);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Process; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presenter_presenter__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_message__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__panel__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_options__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__templates_symbols_htmlf__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__templates_symbols_htmlf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__templates_symbols_htmlf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__templates_page_controls_htmlf__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__templates_page_controls_htmlf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__templates_page_controls_htmlf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__templates_panel_htmlf__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__templates_panel_htmlf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__templates_panel_htmlf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__templates_options_htmlf__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__templates_options_htmlf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__templates_options_htmlf__);











class Process {
    constructor() {
        this.status = Process.statuses.PENDING;
        this.settings = Process.settingValues;
        this.options = new __WEBPACK_IMPORTED_MODULE_4__lib_options__["a" /* default */]();

        this.messagingService = new __WEBPACK_IMPORTED_MODULE_2__lib_message__["d" /* MessagingService */]();
    }

    static get settingValues() {
        return {
            hiddenClassName: "hidden",
            pageControlSel: "#alpheios-panel-toggle"
        }
    }

    static get statuses() {
        return {
            PENDING: 'Pending', // Content script has not been fully initialized yet
            ACTIVE: 'Active', // Content script is loaded and active
            DEACTIVATED: 'Deactivated' // Content script has been loaded, but is deactivated
        };
    }

    /**
     * Loads any asynchronous data that there might be.
     * @return {Promise}
     */
    async loadData() {
        return this.options.loadStoredData();
    }

    get isActive() {
        return this.status === Process.statuses.ACTIVE;
    }

    deactivate() {
        console.log('Content has been deactivated.');
        this.panel.close();
        this.pageControl.classList.add(this.settings.hiddenClassName);
        this.status = Process.statuses.DEACTIVATED;
    }

    reactivate() {
        console.log('Content has been reactivated.');
        this.pageControl.classList.remove(this.settings.hiddenClassName);
        this.status = Process.statuses.ACTIVE;
    }

    render() {
        // Inject HTML code of a plugin. Should go in reverse order.
        document.body.classList.add('alpheios');
        Process.loadPanel();
        Process.loadPageControls();
        Process.loadSymbols();

        this.panel = new __WEBPACK_IMPORTED_MODULE_3__panel__["a" /* default */](this.options);
        this.panelToggleBtn = document.querySelector('#alpheios-panel-toggle');
        this.renderOptions();

        this.pageControl = document.querySelector(this.settings.pageControlSel);

        // Add a message listener
        browser.runtime.onMessage.addListener(this.messageListener.bind(this));
        this.panelToggleBtn.addEventListener('click', this.togglePanel.bind(this));
        document.body.addEventListener('dblclick', Process.getSelectedText);
    }

    static loadSymbols() {
        Process.loadHTMLFragment(__WEBPACK_IMPORTED_MODULE_5__templates_symbols_htmlf___default.a);
    }

    static loadPageControls() {
        Process.loadHTMLFragment(__WEBPACK_IMPORTED_MODULE_6__templates_page_controls_htmlf___default.a);
    }

    static loadPanel() {
        Process.loadHTMLFragment(__WEBPACK_IMPORTED_MODULE_7__templates_panel_htmlf___default.a);
    }

    static loadHTMLFragment(html) {
        let container = document.createElement('div');
        container.innerHTML = html;
        document.body.insertBefore(container.firstChild, document.body.firstChild);
    }

    static requestWordData(language, word) {
        browser.runtime.sendMessage(new __WEBPACK_IMPORTED_MODULE_2__lib_message__["f" /* WordDataRequest */](language, word));
    }

    messageListener(message, sender) {
        console.log('Message from the browser: ', message);
        console.log('Sender is:', sender);
        if (!message.type) {
            console.warn('Message type not provided. Discarding unknown message.');
        }
        else if(message.type === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].types.ACTIVATE_REQUEST) {
            // Send a status response
            console.log(`Activate request received. Sending a response back.`);
            if (!this.isActive) {
                this.reactivate();
            }
            this.messagingService.sendResponseToBg(new __WEBPACK_IMPORTED_MODULE_2__lib_message__["e" /* StatusResponse */](this.status, message));
        }
        else if(message.type === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].types.DEACTIVATE_REQUEST) {
            // Send a status response
            console.log(`Deactivate request received. Sending a response back.`);
            if (this.isActive) {
                this.deactivate();
            }
            this.messagingService.sendResponseToBg(new __WEBPACK_IMPORTED_MODULE_2__lib_message__["e" /* StatusResponse */](this.status, message));
        }
        else if(message.type === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].types.STATUS_REQUEST) {
            // Send a status response
            console.log(`Status request received. Sending a response back.`);
            this.messagingService.sendResponseToBg(new __WEBPACK_IMPORTED_MODULE_2__lib_message__["e" /* StatusResponse */](this.status, message));
        }
        else if(message.type === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].types.WORD_DATA_RESPONSE) {
            console.log('Message body is:', message.body);

            if (message.status === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].statuses.DATA_FOUND) {
                let wordData = __WEBPACK_IMPORTED_MODULE_0__lib_lib__["o" /* WordData */].readObject(message.body);
                console.log("Word data is: ", wordData);
                this.panel.clear();
                this.updateDefinition(wordData);
                this.updateInflectionTable(wordData);
                this.panel.open();
            }
            else if (message.status === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].statuses.NO_DATA_FOUND) {
                this.panel.clear();
                this.panel.definitionContainer.innerHTML = '<p>Sorry, the word you requested was not found.</p>';
                this.panel.open().changeActiveTabTo(this.panel.tabs[0]);
            }
        }
        else if(message.type === __WEBPACK_IMPORTED_MODULE_2__lib_message__["c" /* Message */].types.STATUS_REQUEST) {
            browser.runtime.sendMessage(new __WEBPACK_IMPORTED_MODULE_2__lib_message__["f" /* WordDataRequest */](language, word));
        }
        else {
            console.warn(`Unsupported message type "${message.type}". Discarding this message.`);
        }

        // Should not send any response as it is not supported by webextensions polyfill and will probably be deprecated
        return false;
    }

    togglePanel() {
        this.panel.toggle();
    }

    updateDefinition(wordData) {
        this.panel.definitionContainer.innerHTML = decodeURIComponent(wordData.definition);
    }

    updateInflectionTable(wordData) {
        this.presenter = new __WEBPACK_IMPORTED_MODULE_1__presenter_presenter__["a" /* default */](this.panel.inflTableContainer, this.panel.viewSelectorContainer,
            this.panel.localeSwitcherContainer, wordData, this.options.items.locale.currentValue).render();
    }

    renderOptions() {
        this.panel.optionsPage = __WEBPACK_IMPORTED_MODULE_8__templates_options_htmlf___default.a;
        let localeSelector = this.panel.optionsPage.querySelector('#alpheios-locale-selector-list');
        for (let locale of this.options.items.locale.values) {
            let option = document.createElement("option");
            option.value = locale.value;
            option.text = locale.text;
            if (locale.value === this.options.items.locale.currentValue) {
                option.setAttribute('selected','selected');
            }
            localeSelector.appendChild(option);
        }
        localeSelector.addEventListener('change', this.optionChangeListener.bind(this, 'locale'));
    }

    optionChangeListener(option, event) {
        this.options.update(option, event.target.value);
        if (option === 'locale' && this.presenter) {
            this.presenter.setLocale(event.target.value);
        }
    }

    static getSelectedText() {
        let selectedWord = document.getSelection().toString().trim();
        Process.requestWordData('unknown', selectedWord);
    }
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__l10n_l10n_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_view__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_latin__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_greek__ = __webpack_require__(45);
/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */







class Presenter {
    constructor(viewContainer, viewSelectorContainer, localeSelectorContainer, wordData, locale = 'en-US') {

        this.viewContainer = viewContainer;
        this.viewSelectorContainer = viewSelectorContainer;
        this.localeSelectorContainer = localeSelectorContainer;
        this.wordData = wordData;

        // All views registered by the Presenter
        this.views = [];
        this.viewIndex = {};

        for (let view of __WEBPACK_IMPORTED_MODULE_3__views_latin__["a" /* default */]) {
            this.addView(view);
        }
        for (let view of __WEBPACK_IMPORTED_MODULE_4__views_greek__["a" /* default */]) {
            this.addView(view);
        }

        // Views available for parts of speech that are present in a Result Set
        this.availableViews = this.getViews(this.wordData);

        this.defaultView = this.availableViews[0];
        this.activeView = undefined;

        this.locale = locale; // This is a default locale
        this.l10n = new __WEBPACK_IMPORTED_MODULE_1__l10n_l10n_js__["a" /* L10n */](__WEBPACK_IMPORTED_MODULE_1__l10n_l10n_js__["b" /* messages */]);

        return this;
    }

    addView(view) {
       //let view =  new View.View(viewOptions);
       this.views.push(view);
       this.viewIndex[view.id] = view;
    }

    setLocale(locale) {
        this.locale = locale;
        this.activeView.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale));
    }

    render() {
        // Show a default view
        if (this.defaultView) {
            this.defaultView.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale));
            this.activeView = this.defaultView;

            this.appendViewSelector(this.viewSelectorContainer);
            //this.appendLocaleSelector(this.localeSelectorContainer);
        }
        return this;
    }

    appendViewSelector(targetContainer) {
        targetContainer.innerHTML = '';
        if (this.availableViews.length > 1) {
            let id = 'view-selector-list';
            let viewLabel = document.createElement('label');
            viewLabel.setAttribute('for', id);
            viewLabel.innerHTML = "View:&nbsp;";
            let viewList = document.createElement('select');
            viewList.classList.add('alpheios-ui-form-control');
            for (const view of this.availableViews) {
                let option = document.createElement("option");
                option.value = view.id;
                option.text = view.name;
                viewList.appendChild(option);
            }
            viewList.addEventListener('change', this.viewSelectorEventListener.bind(this));
            targetContainer.appendChild(viewLabel);
            targetContainer.appendChild(viewList);
        }
        return this;
    }

    viewSelectorEventListener(event) {
        let viewID = event.target.value;
        let view = this.viewIndex[viewID];
        view.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale));
        this.activeView = view;
    }

    appendLocaleSelector(targetContainer) {
        let id = 'locale-selector-list';
        targetContainer.innerHTML = ''; // Erase whatever was there
        let localeLabel = document.createElement('label');
        localeLabel.setAttribute('for', id);
        localeLabel.innerHTML = "Locale:&nbsp;";
        let localeList = document.createElement('select');
        localeList.classList.add('alpheios-ui-form-control');
        localeList.id = id;
        for (let locale of this.l10n.locales) {
            let option = document.createElement("option");
            option.value = locale;
            option.text = locale;
            localeList.appendChild(option);
        }
        localeList.addEventListener('change', this.localeSelectorEventListener.bind(this));
        targetContainer.appendChild(localeLabel);
        targetContainer.appendChild(localeList);
        return this;
    }

    localeSelectorEventListener() {
        let locale = event.target.value;
        this.setLocale(locale);
    }

    getViews(wordData) {
        // First view in a returned array will be a default one
        let views = [];
        for (let view of this.views) {
            if (wordData.language === view.language && wordData[__WEBPACK_IMPORTED_MODULE_0__lib_lib__["q" /* types */].part].includes(view.partOfSpeech)) {
                views.push(view);
            }
        }
        return views;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Presenter);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MessageBundle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return L10n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return messages; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale_en_us_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__locale_en_gb_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl_messageformat__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl_messageformat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_intl_messageformat__);





/**
 * Combines messages with the same locale code.
 */
class MessageBundle {

    /**
     * Creates a message bundle (a list of messages) for a locale.
     * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
     * @param {Object} messages - Messages for a locale in an object. Object keys are message IDss, strings that
     * are used to reference a message, and key values are message texts in a string format.
     */
    constructor(locale, messages) {
        if (!locale) {
            throw new Error('Locale data is missing');
        }
        if (!messages) {
            throw new Error('Messages data is missing');
        }

        this._locale = locale;

        for (let messageID in messages) {
            if (messages.hasOwnProperty(messageID)) {
                this[messageID] = new __WEBPACK_IMPORTED_MODULE_2_intl_messageformat___default.a(messages[messageID], this._locale);
            }
        }
    }

    /**
     * Returns a (formatted) message for a message ID provided.
     * @param messageID - An ID of a message.
     * @param options - Options that can be used for message formatting.
     * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
     */
    get(messageID, options = undefined) {
        if (this[messageID]) {
            return this[messageID].format(options);
        }
        else {
            // If message with the ID provided is not in translation data, generate a warning.
            return `Not in translation data: "${messageID}"`;
        }
    }

    /**
     * Returns a locale of a current message bundle.
     * @return {string} A locale of this message bundle.
     */
    get locale() {
        return this._locale;
    }
}

/**
 * Combines several message bundle for different locales.
 */
class L10n {

    /**
     * Creates an object. If an array of message bundle data is provided, initializes an object with this data.
     * This function is chainable.
     * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
     * @returns {L10n} Returns a reference to self for chaining.
     */
    constructor(messageData) {
        this._locales = {};
        this._localeList = [];

        if (messageData) {
            this.addLocaleData(messageData);
        }
        return this;
    }

    /**
     * Adds one or several message bundles.
     * This function is chainable.
     * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
     * @return {L10n} - Returns self for chaining.
     */
    addLocaleData(messageData) {
        for (let messageBundle of messageData) {
            this._localeList.push(messageBundle.locale);
            this._locales[messageBundle.locale] = messageBundle;
        }
        return this;
    }

    /**
     * Returns a message bundle for a locale.
     * @param {string} locale - A locale code for a message bundle. IETF language tag format is recommended.
     * @returns {MessageBundle} A message bundle for a locale.
     */
    messages(locale) {
        if (!this._locales[locale]) {
            throw new Error('Locale "' + locale + '" is not found.');
        }
        return this._locales[locale];
    }

    /**
     * Returns a list of available locale codes.
     * @returns {string[]} Array of local codes.
     */
    get locales() {
        return this._localeList;
    }
}

const messages = [
    new MessageBundle('en-US', __WEBPACK_IMPORTED_MODULE_0__locale_en_us_js__["a" /* default */]),
    new MessageBundle('en-GB', __WEBPACK_IMPORTED_MODULE_1__locale_en_gb_js__["a" /* default */])
];

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let messages = {
    Number: 'Number',
    Case: 'Case',
    Declension: 'Declension',
    Gender: 'Gender',
    Type: 'Type',
    Voice: 'Voice',
    'Conjugation Stem': 'Conjugation Stem',
    Mood: 'Mood',
    Person: 'Person'
};

/* harmony default export */ __webpack_exports__["a"] = (messages);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let messages = {
    Number: 'Number (GB)',
    Case: 'Case (GB)',
    Declension: 'Declension (GB)',
    Gender: 'Gender (GB)',
    Type: 'Type (GB)',
    Voice: 'Voice (GB)',
    'Conjugation Stem': 'Conjugation Stem (GB)',
    Mood: 'Mood (GB)',
    Person: 'Person (GB)'
};

/* harmony default export */ __webpack_exports__["a"] = (messages);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */



var IntlMessageFormat = __webpack_require__(35)['default'];

// Add all locale data to `IntlMessageFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
__webpack_require__(42);

// Re-export `IntlMessageFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlMessageFormat;
exports['default'] = exports;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jslint esnext: true */


var src$core$$ = __webpack_require__(36), src$en$$ = __webpack_require__(41);

src$core$$["default"].__addLocaleData(src$en$$["default"]);
src$core$$["default"].defaultLocale = 'en';

exports["default"] = src$core$$["default"];

//# sourceMappingURL=main.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__(7), src$es5$$ = __webpack_require__(37), src$compiler$$ = __webpack_require__(38), intl$messageformat$parser$$ = __webpack_require__(39);
exports["default"] = MessageFormat;

// -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ?
            MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    src$es5$$.defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error(
            'The intl string context variable \'' + e.variableId + '\'' +
            ' was not provided to the string \'' + message + '\''
          );
        } else {
          throw e;
        }
      }
    };
}

// Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.
src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,

    value: {
        number: {
            'currency': {
                style: 'currency'
            },

            'percent': {
                style: 'percent'
            }
        },

        date: {
            'short': {
                month: 'numeric',
                day  : 'numeric',
                year : '2-digit'
            },

            'medium': {
                month: 'short',
                day  : 'numeric',
                year : 'numeric'
            },

            'long': {
                month: 'long',
                day  : 'numeric',
                year : 'numeric'
            },

            'full': {
                weekday: 'long',
                month  : 'long',
                day    : 'numeric',
                year   : 'numeric'
            }
        },

        time: {
            'short': {
                hour  : 'numeric',
                minute: 'numeric'
            },

            'medium':  {
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },

            'long': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            },

            'full': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            }
        }
    }
});

// Define internal private properties for dealing with locale data.
src$es5$$.defineProperty(MessageFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
src$es5$$.defineProperty(MessageFormat, '__parse', {value: intl$messageformat$parser$$["default"].parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
        locale: this._locale
    };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
        if (data.pluralRuleFunction) {
            return data.pluralRuleFunction;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlMessageFormat is missing a ' +
        '`pluralRuleFunction` for :' + locale
    );
};

MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i, len, part, id, value, err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
            result += part;
            continue;
        }

        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && src$utils$$.hop.call(values, id))) {
          err = new Error('A value must be provided for: ' + id);
          err.variableId = id;
          throw err;
        }

        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
            result += this._format(part.getOption(value), values);
        } else {
            result += part.format(value);
        }
    }

    return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type, mergedType;

    for (type in defaults) {
        if (!src$utils$$.hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

        if (formats && src$utils$$.hop.call(formats, type)) {
            src$utils$$.extend(mergedType, formats[type]);
        }
    }

    return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);

    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlMessageFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

//# sourceMappingURL=core.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__(7);

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (src$utils$$.hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

exports.defineProperty = defineProperty, exports.objCreate = objCreate;

//# sourceMappingURL=es5.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports["default"] = Compiler;

function Compiler(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern  = [];

    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];

        switch (element.type) {
            case 'messageTextElement':
                pattern.push(this.compileMessageText(element));
                break;

            case 'argumentElement':
                pattern.push(this.compileArgument(element));
                break;

            default:
                throw new Error('Message element does not have a valid type');
        }
    }

    return pattern;
};

Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }

        return new PluralOffsetString(
                this.currentPlural.id,
                this.currentPlural.format.offset,
                this.pluralNumberFormat,
                element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
};

Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
        return new StringFormat(element.id);
    }

    var formats  = this.formats,
        locales  = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
        case 'numberFormat':
            options = formats.number[format.style];
            return {
                id    : element.id,
                format: new Intl.NumberFormat(locales, options).format
            };

        case 'dateFormat':
            options = formats.date[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'timeFormat':
            options = formats.time[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'pluralFormat':
            options = this.compileOptions(element);
            return new PluralFormat(
                element.id, format.ordinal, format.offset, options, pluralFn
            );

        case 'selectFormat':
            options = this.compileOptions(element);
            return new SelectFormat(element.id, options);

        default:
            throw new Error('Message element does not have a valid format type');
    }
};

Compiler.prototype.compileOptions = function (element) {
    var format      = element.format,
        options     = format.options,
        optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;

    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
};

// -- Compiler Helper Classes --------------------------------------------------

function StringFormat(id) {
    this.id = id;
}

StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
        return '';
    }

    return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id         = id;
    this.useOrdinal = useOrdinal;
    this.offset     = offset;
    this.options    = options;
    this.pluralFn   = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
    var options = this.options;

    var option = options['=' + value] ||
            options[this.pluralFn(value - this.offset, this.useOrdinal)];

    return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
    this.id           = id;
    this.offset       = offset;
    this.numberFormat = numberFormat;
    this.string       = string;
}

PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);

    return this.string
            .replace(/(^|[^\\])#/g, '$1' + number)
            .replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
    this.id      = id;
    this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
};

//# sourceMappingURL=compiler.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__(40)['default'];
exports['default'] = exports;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = function(elements) {
                return {
                    type    : 'messageFormatPattern',
                    elements: elements
                };
            },
        peg$c2 = peg$FAILED,
        peg$c3 = function(text) {
                var string = '',
                    i, j, outerLen, inner, innerLen;

                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
                    inner = text[i];

                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                        string += inner[j];
                    }
                }

                return string;
            },
        peg$c4 = function(messageText) {
                return {
                    type : 'messageTextElement',
                    value: messageText
                };
            },
        peg$c5 = /^[^ \t\n\r,.+={}#]/,
        peg$c6 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
        peg$c7 = "{",
        peg$c8 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c9 = null,
        peg$c10 = ",",
        peg$c11 = { type: "literal", value: ",", description: "\",\"" },
        peg$c12 = "}",
        peg$c13 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c14 = function(id, format) {
                return {
                    type  : 'argumentElement',
                    id    : id,
                    format: format && format[2]
                };
            },
        peg$c15 = "number",
        peg$c16 = { type: "literal", value: "number", description: "\"number\"" },
        peg$c17 = "date",
        peg$c18 = { type: "literal", value: "date", description: "\"date\"" },
        peg$c19 = "time",
        peg$c20 = { type: "literal", value: "time", description: "\"time\"" },
        peg$c21 = function(type, style) {
                return {
                    type : type + 'Format',
                    style: style && style[2]
                };
            },
        peg$c22 = "plural",
        peg$c23 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c24 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: false,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                };
            },
        peg$c25 = "selectordinal",
        peg$c26 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c27 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: true,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                }
            },
        peg$c28 = "select",
        peg$c29 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c30 = function(options) {
                return {
                    type   : 'selectFormat',
                    options: options
                };
            },
        peg$c31 = "=",
        peg$c32 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c33 = function(selector, pattern) {
                return {
                    type    : 'optionalFormatPattern',
                    selector: selector,
                    value   : pattern
                };
            },
        peg$c34 = "offset:",
        peg$c35 = { type: "literal", value: "offset:", description: "\"offset:\"" },
        peg$c36 = function(number) {
                return number;
            },
        peg$c37 = function(offset, options) {
                return {
                    type   : 'pluralFormat',
                    offset : offset,
                    options: options
                };
            },
        peg$c38 = { type: "other", description: "whitespace" },
        peg$c39 = /^[ \t\n\r]/,
        peg$c40 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c41 = { type: "other", description: "optionalWhitespace" },
        peg$c42 = /^[0-9]/,
        peg$c43 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c44 = /^[0-9a-f]/i,
        peg$c45 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c46 = "0",
        peg$c47 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c48 = /^[1-9]/,
        peg$c49 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c50 = function(digits) {
            return parseInt(digits, 10);
        },
        peg$c51 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c52 = { type: "class", value: "[^{}\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F \\t\\n\\r]" },
        peg$c53 = "\\\\",
        peg$c54 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c55 = function() { return '\\'; },
        peg$c56 = "\\#",
        peg$c57 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c58 = function() { return '\\#'; },
        peg$c59 = "\\{",
        peg$c60 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c61 = function() { return '\u007B'; },
        peg$c62 = "\\}",
        peg$c63 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c64 = function() { return '\u007D'; },
        peg$c65 = "\\u",
        peg$c66 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c67 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
            },
        peg$c68 = function(chars) { return chars.join(''); },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;

      s0 = peg$parsemessageTextElement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c2;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c3(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsemessageText();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c4(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c5.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c5.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
          }
        } else {
          s1 = peg$c2;
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c7;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c10;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();
                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c2;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c2;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c2;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c9;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c12;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c13); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c14(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;

      s0 = peg$parsesimpleFormat();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c17) {
          s1 = peg$c17;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c20); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c10;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c9;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 13) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c28) {
        s1 = peg$c28;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$c2;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c30(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c31;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c12;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c13); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c33(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c34) {
        s1 = peg$c34;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c36(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseoffset();
      if (s1 === peg$FAILED) {
        s1 = peg$c9;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$c2;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c37(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c39.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c39.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c40); }
          }
        }
      } else {
        s0 = peg$c2;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c46;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c48.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c51.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c53) {
          s1 = peg$c53;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c56) {
            s1 = peg$c56;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c57); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c58();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c59) {
              s1 = peg$c59;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c60); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c61();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c62) {
                s1 = peg$c62;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c63); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c64();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c65) {
                  s1 = peg$c65;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c66); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$c2;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$c2;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$c2;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c2;
                  }
                  if (s3 !== peg$FAILED) {
                    s3 = input.substring(s2, peg$currPos);
                  }
                  s2 = s3;
                  if (s2 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c67(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c68(s1);
      }
      s0 = s1;

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();

//# sourceMappingURL=parser.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GENERATED FILE

exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

//# sourceMappingURL=en.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return classNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return wideView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return narrowView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return footnotes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return pageHeader; });


let classNames = {
    cell: 'infl-cell',
    widthPrefix: 'infl-cell--sp',
    fullWidth: 'infl-cell--fw',
    header: 'infl-cell--hdr',
    highlight: 'infl-cell--hl',
    hidden: 'hidden',
    suffix: 'infl-suff',
    suffixMatch: 'infl-suff--suffix-match',
    suffixFullFeatureMatch: 'infl-suff--full-feature-match',
    inflectionTable: 'infl-table',
    wideView: 'infl-table--wide',
    narrowViewsContainer: 'infl-table-narrow-views-cont',
    narrowView: 'infl-table--narrow',
    footnotesContainer: 'infl-footnotes'
};

let wideView = {
    column: {
        width: 1,
        unit: 'fr'
    }
};

let narrowView = {
    column: {
        width: 100,
        unit: 'px'
    }
};

let footnotes = {
    id: "inlection-table-footer"
};

let pageHeader = {
    html: `
        <button id="hide-empty-columns" class="switch-btn">Hide empty columns</button><button id="show-empty-columns" class="switch-btn hidden">Show empty columns</button>
        <button id="hide-no-suffix-groups" class="switch-btn">Hide top-level groups with no suffix matches</button><button id="show-no-suffix-groups" class="switch-btn hidden">Show top-level groups with no suffix matches</button><br>
        <p>Hover over the suffix to see its grammar features</p>
        `,
    hideEmptyColumnsBtnSel: '#hide-empty-columns',
    showEmptyColumnsBtnSel: '#show-empty-columns',
    hideNoSuffixGroupsBtnSel: '#hide-no-suffix-groups',
    showNoSuffixGroupsBtnSel: '#show-no-suffix-groups'
};

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_view__ = __webpack_require__(3);




class LatinView extends __WEBPACK_IMPORTED_MODULE_2__lib_view__["c" /* View */] {
    constructor() {
        super();
        this.language = __WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].latin;

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
        this.features = {
            numbers: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], 'Number'),
            cases: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["a" /* cases */], 'Case'),
            declensions: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["d" /* declensions */], 'Declension'),
            genders: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["e" /* genders */], 'Gender'),
            types: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["k" /* types */], 'Type')
        };
    }

    /**
     * Creates and initializes an inflection table. Redefine this method in child objects in order to create
     * an inflection table differently.
     */
    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.declensions, this.features.genders,
            this.features.types, this.features.numbers, this.features.cases]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["d" /* declensions */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["e" /* genders */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["k" /* types */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["a" /* cases */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["a" /* cases */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */]];
    }
}

class NounView extends LatinView {
    constructor() {
        super();
        this.id = 'nounDeclension';
        this.name = 'noun declension';
        this.title = 'Noun declension';
        this.partOfSpeech = __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["h" /* parts */].noun.value;

        // Features that are different from base class values
        this.features.genders = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["e" /* genders */], 'Gender',
            [[__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["e" /* genders */].masculine, __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["e" /* genders */].feminine], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["e" /* genders */].neuter]);

        this.createTable();
    }
}

class AdjectiveView extends LatinView {
    constructor() {
        super();
        this.id = 'adjectiveDeclension';
        this.name = 'adjective declension';
        this.title = 'Adjective declension';
        this.partOfSpeech = __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["h" /* parts */].adjective.value;

        // Features that are different from base class values
        this.features.declensions = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["d" /* declensions */], 'Declension',
            [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["d" /* declensions */].first, __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["d" /* declensions */].second, __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["d" /* declensions */].third]);

        this.createTable();
    }
}

class VerbView extends LatinView {
    constructor() {
        super();
        this.partOfSpeech = __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["h" /* parts */].verb.value;

        this.features = {
            tenses: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */], 'Tenses'),
            numbers: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], 'Number'),
            persons: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */], 'Person'),
            voices: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["l" /* voices */], 'Voice'),
            conjugations: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["b" /* conjugations */], 'Conjugation Stem'),
            moods: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["f" /* moods */], 'Mood')
        };
    }
}

class VoiceConjugationMoodView extends VerbView {
    constructor() {
        super();
        this.id = 'verbVoiceConjugationMood';
        this.name = 'verb voice-conjugation-mood';
        this.title = 'Voice-Conjugation-Mood';

        this.createTable();
    }

    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.voices, this.features.conjugations, this.features.moods,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["l" /* voices */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["b" /* conjugations */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["f" /* moods */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */]];
    }
}

class VoiceMoodConjugationView extends VerbView {
    constructor() {
        super();
        this.id = 'verbVoiceMoodConjugation';
        this.name = 'verb voice-mood-conjugation';
        this.title = 'Voice-Mood-Conjugation';

        this.createTable();
    }

    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.voices, this.features.moods, this.features.conjugations,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["l" /* voices */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["f" /* moods */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["b" /* conjugations */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */]];
    }
}

class ConjugationVoiceMoodView extends VerbView {
    constructor() {
        super();
        this.id = 'verbConjugationVoiceMood';
        this.name = 'verb conjugation-voice-mood';
        this.title = 'Conjugation-Voice-Mood';

        this.createTable();
    }

    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.conjugations, this.features.voices, this.features.moods,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["b" /* conjugations */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["l" /* voices */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["f" /* moods */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */]];
    }
}

class ConjugationMoodVoiceView extends VerbView {
    constructor() {
        super();
        this.id = 'verbConjugationMoodVoice';
        this.name = 'verb conjugation-mood-voice';
        this.title = 'Conjugation-Mood-Voice';

        this.createTable();
    }

    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.conjugations, this.features.moods, this.features.voices,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["b" /* conjugations */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["f" /* moods */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["l" /* voices */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */]];
    }
}

class MoodVoiceConjugationView extends VerbView {
    constructor() {
        super();
        this.id = 'verbMoodVoiceConjugation';
        this.name = 'verb mood-voice-conjugation';
        this.title = 'Mood-Voice-Conjugation';

        this.createTable();
    }

    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.moods, this.features.voices, this.features.conjugations,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["f" /* moods */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["l" /* voices */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["b" /* conjugations */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */]];
    }
}

class MoodConjugationVoiceView extends VerbView {
    constructor() {
        super();
        this.id = 'verbMoodConjugationVoice';
        this.name = 'verb mood-conjugation-voice';
        this.title = 'Mood-Conjugation-Voice';

        this.createTable();
    }

    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.moods, this.features.conjugations, this.features.voices,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["f" /* moods */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["b" /* conjugations */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["l" /* voices */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["g" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["i" /* persons */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_latin_latin__["j" /* tenses */]];
    }
}

/* harmony default export */ __webpack_exports__["a"] = ([new NounView(), new AdjectiveView(),
    // Verbs
    new VoiceConjugationMoodView(), new VoiceMoodConjugationView(), new ConjugationVoiceMoodView(),
    new ConjugationMoodVoiceView(), new MoodVoiceConjugationView(), new MoodConjugationVoiceView()]);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_view__ = __webpack_require__(3);




class GreekView extends __WEBPACK_IMPORTED_MODULE_2__lib_view__["c" /* View */] {
    constructor() {
        super();
        this.language = __WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].greek;

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
        this.features = {
            numbers: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["e" /* numbers */], 'Number'),
            cases: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["a" /* cases */], 'Case'),
            declensions: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["c" /* declensions */], 'Declension'),
            genders: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */], 'Gender'),
            types: new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* GroupFeatureType */](__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["g" /* types */], 'Type')
        };
    }

    /**
     * Creates and initializes an inflection table. Redefine this method in child objects in order to create
     * an inflection table differently.
     */
    createTable() {
        this.table = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["b" /* Table */]([this.features.declensions, this.features.genders,
            this.features.types, this.features.numbers, this.features.cases]);
        let features = this.table.features;
        features.columns = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["c" /* declensions */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["g" /* types */]];
        features.rows = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["e" /* numbers */], __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["a" /* cases */]];
        features.columnRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["a" /* cases */]];
        features.fullWidthRowTitles = [__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["e" /* numbers */]];
    }
}

class NounView extends GreekView {
    constructor() {
        super();
        this.id = 'nounDeclension';
        this.name = 'noun declension';
        this.title = 'Noun declension';
        this.partOfSpeech = __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["f" /* parts */].noun.value;

        this.features.genders.getOrderedValues = function getOrderedValues(ancestorFeatures) {
            if (ancestorFeatures) {
                if (ancestorFeatures[0].value === __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["c" /* declensions */].second.value ||
                    ancestorFeatures[0].value === __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["c" /* declensions */].third.value) {
                    return [[__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].masculine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].feminine.value], __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].neuter.value];
                }
            }
            return [__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].masculine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].feminine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].neuter.value];
        };

        this.createTable();
    }
}

class NounViewSimplified extends NounView {
    constructor() {
        super();
        this.id = 'nounDeclensionSimplified';
        this.name = 'noun declension simplified';
        this.title = 'Noun declension (simplified)';
        this.partOfSpeech = __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["f" /* parts */].noun.value;

        this.features.genders.getOrderedValues = function getOrderedValues(ancestorFeatures) {
            if (ancestorFeatures) {
                if (ancestorFeatures[0].value === __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["c" /* declensions */].second.value) {
                    return [[__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].masculine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].feminine.value], __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].neuter.value];
                }
                if (ancestorFeatures[0].value === __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["c" /* declensions */].third.value) {
                    return [[__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].masculine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].feminine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].neuter.value]];
                }
            }
            return [__WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].masculine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].feminine.value, __WEBPACK_IMPORTED_MODULE_1__lib_lang_greek_greek__["d" /* genders */].neuter.value];
        };

        this.createTable();

        this.table.suffixCellFilter = NounViewSimplified.suffixCellFilter;
    }

    static suffixCellFilter(suffix) {
        return suffix.extendedLangData[__WEBPACK_IMPORTED_MODULE_0__lib_lib__["p" /* languages */].greek].primary;
    }
}

/* harmony default export */ __webpack_exports__["a"] = ([new NounView(), new NounViewSimplified()]);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Panel {
    constructor(options) {
        this.options = options;

        this.pageBody = document.body;
        this.body = document.querySelector('#alpheios-panel');
        this.definitionContainer = document.querySelector('#alpheios-panel-content-definition');
        this.inflTableContainer = document.querySelector('#alpheios-panel-content-infl-table-body');
        this.viewSelectorContainer = document.querySelector('#alpheios-panel-content-infl-table-view-selector');
        this.localeSwitcherContainer = document.querySelector('#alpheios-panel-content-infl-table-locale-switcher');
        this.optionsContainer = document.querySelector('#alpheios-panel-content-options');

        this.showOpenBtn = document.querySelector('#alpheios-panel-show-open');
        this.showFWBtn = document.querySelector('#alpheios-panel-show-fw');
        this.hideBtn = document.querySelector('#alpheios-panel-hide');

        this.tabs = document.querySelectorAll("#alpheios-panel__nav .alpheios-panel__nav-btn");
        this.activeTab = document.querySelector("#alpheios-panel__nav .alpheios-panel__nav-btn");
        this.activeClassName = 'active';

        this.panelOpenClassName = 'open';
        this.hiddenClassName = 'hidden';
        this.panelOpenFWClassName = 'open-fw';
        this.bodyOpenClassName = 'alpheios-panel-open';

        this.isOpen = false;
        this.isOpenFW = false;

        this.showOpenBtn.addEventListener('click', this.open.bind(this));
        this.showFWBtn.addEventListener('click', this.openFullWidth.bind(this));
        this.hideBtn.addEventListener('click', this.close.bind(this));

        for (let tab of this.tabs) {
            let target = tab.dataset.target;
            document.getElementById(target).classList.add(this.hiddenClassName);
            tab.addEventListener('click', this.switchTab.bind(this));
        }
        this.changeActiveTabTo(this.tabs[0]);
    }

    open() {
        if (this.isOpenFW) {
            this.body.classList.remove(this.panelOpenFWClassName);
            this.isOpenFW = false;
        }
        if (!this.isOpen) {
            this.body.classList.add(this.panelOpenClassName);
            this.pageBody.classList.add(this.bodyOpenClassName);
            this.isOpen = true;
        }
        this.showOpenBtn.classList.add(this.hiddenClassName);
        return this;
    }

    openFullWidth() {
        if (this.isOpen) {
            this.body.classList.remove(this.panelOpenClassName);
            this.pageBody.classList.remove(this.bodyOpenClassName);
            this.isOpen = false;
        }
        if (!this.isOpenFW) {
            this.body.classList.add(this.panelOpenFWClassName);
            this.isOpenFW = true;
        }
        this.showOpenBtn.classList.remove(this.hiddenClassName);
        return this;
    }

    close() {
        if (this.isOpen) {
            this.body.classList.remove(this.panelOpenClassName);
            this.pageBody.classList.remove(this.bodyOpenClassName);
            this.isOpen = false;
        }
        if (this.isOpenFW) {
            this.body.classList.remove(this.panelOpenFWClassName);
            this.isOpenFW = false;
        }
        return this;
    }

    toggle() {
        if (this.isOpen || this.isOpenFW) {
            this.close();
        }
        else {
            this.open();
        }
        return this;
    }

    clear() {
        this.definitionContainer.innerHTML = '';
        this.inflTableContainer.innerHTML = '';
        this.viewSelectorContainer.innerHTML = '';
        this.localeSwitcherContainer.innerHTML = '';
        return this;
    }

    switchTab(event) {
        this.changeActiveTabTo(event.currentTarget);
        return this;
    }

    changeActiveTabTo(activeTab) {
        if (this.activeTab) {
            let target = this.activeTab.dataset.target;
            document.getElementById(target).classList.add(this.hiddenClassName);
            this.activeTab.classList.remove(this.activeClassName);
        }

        activeTab.classList.add(this.activeClassName);
        let target = activeTab.dataset.target;
        document.getElementById(target).classList.remove(this.hiddenClassName);
        this.activeTab = activeTab;
        return this;
    }

    get optionsPage() {
        return this.optionsContainer;
    }

    set optionsPage(htmlContent) {
        return this.optionsContainer.innerHTML = htmlContent;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Panel;


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Options {
    constructor() {
        this._values = Options.defaults;
        for (let key in this._values) {
            if (this._values.hasOwnProperty(key)) {
                /*
                Initialize current values with defaults. Actual values will be set after options are loaded from a
                local storage.
                 */
                if (!this._values[key].currentValue) {
                    this._values[key].currentValue = this._values[key].defaultValue;
                }
            }
        }
    }

    /**
     * Will always return a resolved promise.
     * @return {Promise.<void>}
     */
    async loadStoredData() {
        try {
            let values = await browser.storage.sync.get();
            for (let key in values) {
                if (this._values.hasOwnProperty(key)) {
                    this._values[key].currentValue = values[key];
                }
            }
        }
        catch (errorMessage) {
            console.error(`Cannot retrieve options for Alpheios extension from a local storage: ${errorMessage}`);
        }
    }

    static get defaults() {
        return {
            locale: {
                defaultValue: 'en-US',
                values: [
                    { value: 'en-US', text: 'English (US)' },
                    { value: 'en-GB', text: 'English (GB)' }
                ],
                inputSelector: '#alpheios-locale-selector-list'
            }
        }
    }

    get items() {
        return this._values;
    }

    update(option, value) {
        this._values[option].currentValue = value;

        // Update value in the local storage
        let optionObj = {};
        optionObj[option] = value;

        browser.storage.sync.set(optionObj).then(
            () => {
                // Options storage succeeded
                console.log('Option value was stored successfully.');
            },
            (errorMessage) => {
                console.err(`Storage of an option value failed: ${errorMessage}`);
            }
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Options;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"display: none;\">\r\n    <symbol id=\"alf-icon-chevron-left\" viewBox=\"0 0 1792 1792\">\r\n        <path d=\"M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z\"/>\r\n    </symbol>\r\n    <symbol id=\"alf-icon-chevron-right\" viewBox=\"0 0 1792 1792\">\r\n        <path d=\"M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z\"/>\r\n    </symbol>\r\n    <symbol id=\"alf-icon-arrow-left\" viewBox=\"0 0 1792 1792\">\r\n        <path d=\"M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z\"/>\r\n    </symbol>\r\n    <symbol id=\"alf-icon-circle-o-notch\" viewBox=\"0 0 1792 1792\">\r\n        <path d=\"M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z\"/>\r\n    </symbol>\r\n    <symbol id=\"alf-icon-commenting\" viewBox=\"0 0 1792 1792\">\r\n        <path d=\"M640 896q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm384 0q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm384 0q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm384 0q0 174-120 321.5t-326 233-450 85.5q-110 0-211-18-173 173-435 229-52 10-86 13-12 1-22-6t-13-18q-4-15 20-37 5-5 23.5-21.5t25.5-23.5 23.5-25.5 24-31.5 20.5-37 20-48 14.5-57.5 12.5-72.5q-146-90-229.5-216.5t-83.5-269.5q0-174 120-321.5t326-233 450-85.5 450 85.5 326 233 120 321.5z\"/>\r\n    </symbol>\r\n    <symbol id=\"alf-icon-table\" viewBox=\"0 0 1792 1792\">\r\n        <path d=\"M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z\"/>\r\n    </symbol>\r\n    <symbol id=\"alf-icon-wrench\" viewBox=\"0 0 1792 1792\">\r\n        <path d=\"M448 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm644-420l-682 682q-37 37-90 37-52 0-91-37l-106-108q-38-36-38-90 0-53 38-91l681-681q39 98 114.5 173.5t173.5 114.5zm634-435q0 39-23 106-47 134-164.5 217.5t-258.5 83.5q-185 0-316.5-131.5t-131.5-316.5 131.5-316.5 316.5-131.5q58 0 121.5 16.5t107.5 46.5q16 11 16 28t-16 28l-293 169v224l193 107q5-3 79-48.5t135.5-81 70.5-35.5q15 0 23.5 10t8.5 25z\"/>\r\n    </symbol>\r\n</svg>"

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "<svg id=\"alpheios-panel-toggle\" class=\"alpheios-panel-show-btn\">\r\n    <use xlink:href=\"#alf-icon-circle-o-notch\"/>\r\n</svg>"

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<div id=\"alpheios-panel\" class=\"alpheios-panel\">\r\n    <div class=\"alpheios-panel__header\">\r\n        <h3>Alpheios</h3>\r\n        <div class=\"alpheios-panel__header-button-cont\">\r\n            <svg id=\"alpheios-panel-hide\" class=\"alpheios-panel__header-action-btn\">\r\n                <use xlink:href=\"#alf-icon-chevron-left\"/>\r\n            </svg>\r\n            <svg id=\"alpheios-panel-show-open\" class=\"alpheios-panel__header-action-btn\">\r\n                <use xlink:href=\"#alf-icon-arrow-left\"/>\r\n            </svg>\r\n            <svg id=\"alpheios-panel-show-fw\" class=\"alpheios-panel__header-action-btn\">\r\n                <use xlink:href=\"#alf-icon-chevron-right\"/>\r\n            </svg>\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"alpheios-panel__body\">\r\n        <div id=\"alpheios-panel-content\" class=\"alpheios-panel__content\">\r\n            <div id=\"alpheios-panel-content-definition\"></div>\r\n            <div id=\"alpheios-panel-content-infl-table\">\r\n                <div id=\"alpheios-panel-content-infl-table-locale-switcher\" class=\"alpheios-ui-form-group\"></div>\r\n                <div id=\"alpheios-panel-content-infl-table-view-selector\" class=\"alpheios-ui-form-group\"></div>\r\n                <div id=\"alpheios-panel-content-infl-table-body\"></div>\r\n            </div>\r\n            <div id=\"alpheios-panel-content-options\"></div>\r\n        </div>\r\n        <div id=\"alpheios-panel__nav\" class=\"alpheios-panel__nav\">\r\n            <svg id=\"alpheios-panel-show-word-data\" class=\"alpheios-panel__nav-btn\"\r\n                 data-target=\"alpheios-panel-content-definition\">\r\n                <use xlink:href=\"#alf-icon-commenting\"/>\r\n            </svg>\r\n            <svg id=\"alpheios-panel-show-infl-table\" class=\"alpheios-panel__nav-btn\"\r\n                 data-target=\"alpheios-panel-content-infl-table\">\r\n                <use xlink:href=\"#alf-icon-table\"/>\r\n            </svg>\r\n            <svg id=\"alpheios-panel-show-options\" class=\"alpheios-panel__nav-btn\"\r\n                 data-target=\"alpheios-panel-content-options\">\r\n                <use xlink:href=\"#alf-icon-wrench\"/>\r\n            </svg>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = "<h4>Options</h4>\r\n<div id=\"alpheios-locale-switcher\" class=\"alpheios-ui-form-group\">\r\n    <label for=\"alpheios-locale-selector-list\">Locale:</label>\r\n    <select id=\"alpheios-locale-selector-list\" class=\"alpheios-ui-form-control\">\r\n    </select>\r\n</div>"

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(this, function (module) {
  /* webextension-polyfill - v0.2.1 - Thu Oct 12 2017 12:31:04 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined") {
    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = () => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "export": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "import": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            }
          }
        },
        "downloads": {
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getBrowserInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.rejection
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (chrome.runtime.lastError) {
            promise.reject(chrome.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length === 1) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            target[name](...args, makeCallback({ resolve, reject }, metadata));
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the orginal method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);

        let handlers = {
          has(target, prop) {
            return prop in target || prop in cache;
          },

          get(target, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });

              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(target, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },

          defineProperty(target, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(target, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        return new Proxy(target, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });

      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let result = listener(message, sender);

          if (isThenable(result)) {
            result.then(sendResponse, error => {
              console.error(error);
              sendResponse(error);
            });

            return true;
          } else if (result !== undefined) {
            sendResponse(result);
          }
        };
      });

      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers)
        }
      };

      // Create a new empty object and copy the properties of the original chrome object
      // to prevent a Proxy violation exception for the devtools API getter
      // (which is a read-only non-configurable property on the original target).
      const targetObject = Object.assign({}, chrome);

      return wrapObject(targetObject, staticWrappers, apiMetadata);
    };

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(); // eslint-disable-line no-undef
  } else {
    module.exports = browser; // eslint-disable-line no-undef
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map