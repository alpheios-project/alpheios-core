(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

    /**
     * Converts one or more Feature objects into a single Feature item. If resulting Feature object is created from
     * multiple features of the same type, a value field of that object will be an array of values
     * of all Feature items that were provided as arguments.
     * @param {Feature | Feature[]} features
     * @returns {Feature}
     */
    static create(features) {
        if (!features) {
            throw new Error('At least one Feature object should be provided.');
        }
        let type = undefined;
        let language = undefined;
        let value = undefined;
        if (Array.isArray(features)) {
            value = [];
            for (let feature of features) {
                // All features should have the same type
                if (type === undefined || type === feature.type) {
                    type = feature.type;
                }
                else {
                    throw new Error('Type mismatch: "' + type + '", "' + feature.type + '". All features must be of the same type.');
                }

                // All features should have the same language
                if (language === undefined || language === feature.language) {
                    language = feature.language;
                }
                else {
                    throw new Error('Language mismatch: "' + language + '", "' + feature.language + '". All features must be of the same language.');
                }

                value.push(feature.value);
            }

            // If array has a single value only
            if (value.length === 1) {
                value = value[0];
            }
        }
        else {
            type = features.type;
            language = features.language;
            value = features.value;
        }

        return new Feature(value, type, language);
    }

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
     * Returns an ordered array of type values. If some values have the same order, they will be returned as an
     * array within an array: [value1, [value2, value3], value4]
     * @returns {string[] | string[][]}
     */
    get orderIndex() {
        "use strict";
        return this._orderIndex;
    }

    /**
     * Return copies of all feature values in a sorted array
     */
    get orderValues() {
        "use strict";
        let values = [];
        for (let value of this._orderIndex) {
            if (Array.isArray(value)) {
                let features = [];
                for (let feature of value) {
                    features.push(this[feature]);
                }
                values.push(Feature.create(features));
            }
            else {
                values.push(Feature.create(this[value]));
            }

        }
        return values;
    }

    /**
     * Returns a lookup table for type values as:
     *  {value1: order1, value2: order2}, where order is a sort order of an item. If two items have the same sort order,
     *  their order value will be the same.
     * @returns {object}
     */
    get orderLookup() {
        "use strict";
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
        "use strict";
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
        "use strict";

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

    /**
     * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
     * an array of Feature objects will be provided.
     * Values are taken from features and stored in a 'feature.type' property as an array of values.
     * @param {Feature | Feature[]} data
     */
    set feature(data) {
        "use strict";
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
        "use strict";

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
        "use strict";
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
        "use strict";
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
        "use strict";
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
        "use strict";
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
     */
    addSuffix(suffixValue, ...featureValue) {
        // TODO: implement run-time error checking
        let suffixItem = new Suffix(suffixValue);

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
                    console.warn('An empty array is provided as a feature argument to the "add" function, ignoring.');
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
        "use strict";

        if (!index) {
            throw new Error('Footnote index data should not be empty.');
        }

        if (!text) {
            throw new Error('Footnote text data should not be empty.');
        }

        let footnote = new Footnonte(index, text, partOfSpeech.value);
        footnote.index = index;

        this.footnotes.push(footnote);
    };

    getSuffixes(homonym) {
        "use strict";
        let result = new ResultSet();
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
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
class Suffix {
    /**
     * Initializes a Suffix object.
     * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
     * @param {MatchData} match - An information about what matches were found for this suffix (optional).
     */
    constructor(suffixValue, match) {
        "use strict";

        if (suffixValue === undefined) {
            throw new Error('Suffix should not be empty.')
        }
        this.value = suffixValue;
        this.features = {};
        this.featureGroups = {};
        this.match = match;
    }

    /**
     * Returns a copy of itself. Used in splitting suffixes with multi-value features.
     * @returns {Suffix}
     */
    clone() {
        "use strict";

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
        "use strict";
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
        "use strict";

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
        "use strict";

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
            result = result && commonValues[feature].size === 2;
        });

        return result;
    }

    /**
     * Splits an suffix that has multiple values of one or more grammatical features into an array of Suffix objects
     * with each Suffix object having only a single value of those grammatical features.
     * @param {string} featureType - A type of a feature
     * @param {Feature[]} featureValues - Multiple grammatical feature values.
     * @returns {Suffix[]} - An array of suffixes.
     */
    split(featureType, featureValues) {
        "use strict";

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
     * Combines suffixes that are in the same group together.
     * @param {Suffix[]} suffixes - An array of suffixes to be combined.
     * @param {function} mergeFunction - A function that will merge two suffixes. It is presentation specific and is
     * define in a Presenter's View module. A function has two parameters each of Suffix type. It returns a single
     * Suffix object.
     * @returns {Suffix[]} An array of suffixes with some items possibly combined together.
     */
    static combine(suffixes, mergeFunction) {
        "use strict";

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
}


class Footnonte {
    constructor(index, text, partOfSpeech) {
        this.index = index;
        this.text = text;
        this[types.part] = partOfSpeech;
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
}

/**
 * A return value for inflection queries
 */
class ResultSet {
    constructor() {
        "use strict";
        this.word = undefined;
        this[types.part] = [];
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

/*
 Definition of objects that are passed between morphology analysis adapters and inflection tables library
 */
class Service {
    constructor(name) {
        "use strict";

        this.name = name;

        this.languages = {};
        this.languages.importer = new Importer();
    }

    setLanguageData(data) {
        "use strict";

        data.serviceName = this.name;

        data.getFeatureFrom = function (providerType, providerValue) {
            "use strict";
            if (!this[providerType]) {
                console.warn("Skipping an unknown grammatical feature '" + providerType + "' for " + this.language + " language of " +
                    data.serviceName + ' morphological service');
            }
            else if (!this[providerType][providerValue]) {
                console.warn("Skipping an unknown value '" + providerValue + "' of a grammatical feature '" + providerType + "' for " + this.language + " language of " +
                    data.serviceName + ' morphological service');
            }
            else {
                return this[providerType][providerValue];
            }
        };

        this[data.language] = data;
    }
}

class LanguageData {
    constructor(language) {
        "use strict";
        this.language = language;
    }

    addFeature(name) {
        this[name] = {};
        let language = this.language;
        let serviceName = this.serviceName; // TODO: not defined when object is created

        this[name].add = function add(providerValue, alpheiosValue) {
            "use strict";
            this[providerValue] = alpheiosValue;
            return this;
        };

        this[name].get = function get(providerValue) {
            "use strict";
            if (!this.importer.has(providerValue)) {
                console.warn("Skipping an unknown value '" + providerValue + "' of a grammatical feature '" + name + "' of " + language + " language of " +
                    serviceName + ' morphological service');
            }
            else {
                return this.importer.get(providerValue);
            }

        };

        this[name].importer = new Importer();

        return this[name];
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
const parts = dataSet.defineFeatureType(types.part, ['noun', 'adjective', 'verb']);
const numbers = dataSet.defineFeatureType(types.number, ['singular', 'plural']);
numbers.addImporter(importerName)
    .map('singular', numbers.singular)
    .map('plural', numbers.plural);
const cases = dataSet.defineFeatureType(types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative']);
cases.addImporter(importerName)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('ablative', cases.ablative)
    .map('locative', cases.locative)
    .map('vocative', cases.vocative);
const declensions = dataSet.defineFeatureType(types.declension, ['first', 'second', 'third', 'fourth', 'fifth']);
declensions.addImporter(importerName)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('1st 2nd', [declensions.first, declensions.second])
    .map('3rd', declensions.third)
    .map('4th', declensions.fourth)
    .map('5th', declensions.fifth);
const genders = dataSet.defineFeatureType(types.gender, ['masculine', 'feminine', 'neuter']);
genders.addImporter(importerName)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types$1 = dataSet.defineFeatureType(types.type, ['regular', 'irregular']);
types$1.addImporter(importerName)
    .map('regular', types$1.regular)
    .map('irregular', types$1.irregular);
const conjugations = dataSet.defineFeatureType(types.conjugation, ['first', 'second', 'third', 'fourth']);
conjugations.addImporter(importerName)
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);
const tenses = dataSet.defineFeatureType(types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect']);
tenses.addImporter(importerName)
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);
const voices = dataSet.defineFeatureType(types.voice, ['passive', 'active']);
voices.addImporter(importerName)
    .map('passive', voices.passive)
    .map('active', voices.active);
const moods = dataSet.defineFeatureType(types.mood, ['indicative', 'subjunctive']);
moods.addImporter(importerName)
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);
const persons = dataSet.defineFeatureType(types.person, ['first', 'second', 'third']);
persons.addImporter(importerName)
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third);
const footnotes = dataSet.defineFeatureType(types.footnote, []);

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
            types$1.importer.csv.get(data[i][5])];
        if (data[i][6]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = data[i][6].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, ...features);
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
            features.push(types$1.importer.csv.get(grammarType));
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
        this.addSuffix(suffix, ...features);
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
    let suffixes = papaparse.parse(nounSuffixesCSV, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    let footnotes = papaparse.parse(nounFootnotesCSV, {});
    this.addFootnotes(partOfSpeech, footnotes.data);

    // Adjectives
    partOfSpeech = parts.adjective;
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
    this.addFootnotes(partOfSpeech, footnotes.data);

    // Verbs
    partOfSpeech = parts.verb;
    suffixes = papaparse.parse(verbSuffixesCSV, {});
    this.addVerbSuffixes(partOfSpeech, suffixes.data);
    footnotes = papaparse.parse(verbFootnotesCSV, {});
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
    let obligatoryMatches = [types.part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [types.grmCase, types.declension, types.gender, types.number];
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

let data = new LanguageData(languages.latin);

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(types.part).importer
    .map('noun', parts.noun)
    .map('adjective', parts.adjective)
    .map('verb', parts.verb);

data.addFeature(types.grmCase).importer
    .map('nominative', cases.nominative)
    .map('genetive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('ablative', cases.ablative)
    .map('locative', cases.locative)
    .map('vocative', cases.vocative);

data.addFeature(types.declension).importer
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('3rd', declensions.third)
    .map('4th', declensions.fourth)
    .map('5th', declensions.fifth);

data.addFeature(types.number).importer
    .map('singular', numbers.singular)
    .map('plural', numbers.plural);

data.addFeature(types.gender).importer
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('common', [genders.masculine, genders.feminine]);

data.addFeature(types.conjugation).importer
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);

data.addFeature(types.tense).importer
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);

data.addFeature(types.voice).importer
    .map('active', voices.active)
    .map('passive', voices.passive);

data.addFeature(types.mood).importer
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);

data.addFeature(types.person).importer
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third);

let maService = new Service('Tufts');
// Set a language conversion map for this specific service
maService.languages.importer.map('lat', languages.latin);
// Load Latin language data for this specific service
maService.setLanguageData(data);

let adapter = {};

/**
 * A function that maps a morphological service's specific data types and values into an inflection library standard.
 * @param {object} jsonObj - A JSON data from a Morphological Analyzer.
 * @returns {Homonym} A library standard Homonym object.
 */
adapter.transform = function(jsonObj) {
    "use strict";
    let lexemes = [];
    let annotationBody = jsonObj.RDF.Annotation.Body;
    if (!Array.isArray(annotationBody)) {
        /*
        If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
        Let's convert it to an array so we can work with it in a uniformal way.
         */
        annotationBody = [annotationBody];
    }
    for (let lexeme of annotationBody) {
        let lemma = new Lemma(lexeme.rest.entry.dict.hdwd.$, maService.languages.importer.get(lexeme.rest.entry.dict.hdwd.lang));

        let inflections = [];
        let inflectionsJSON = lexeme.rest.entry.infl;
        if (!Array.isArray(inflectionsJSON)) {
            // If only one inflection returned, it is a single object, not an array of objects. Convert it to an array for uniformity.
            inflectionsJSON = [inflectionsJSON];
        }
        for (let inflectionJSON of inflectionsJSON) {
            let inflection = new Inflection(inflectionJSON.term.stem.$, maService.languages.importer.get(lexeme.rest.entry.dict.hdwd.lang));
            if (inflectionJSON.term.suff) {
                // Set suffix if provided by a morphological analyzer
                inflection.suffix = inflectionJSON.term.suff.$;
            }

            // Parse whatever grammatical features we're interested in
            if (inflectionJSON.pofs) {
                inflection.feature = maService.latin[types.part].get(inflectionJSON.pofs.$);
            }

            if (inflectionJSON.case) {
                inflection.feature = maService.latin[types.grmCase].get(inflectionJSON.case.$);
            }

            if (inflectionJSON.decl) {
                inflection.feature = maService.latin[types.declension].get(inflectionJSON.decl.$);
            }

            if (inflectionJSON.num) {
                inflection.feature = maService.latin[types.number].get(inflectionJSON.num.$);
            }

            if (inflectionJSON.gend) {
                inflection.feature = maService.latin[types.gender].get(inflectionJSON.gend.$);
            }

            if (inflectionJSON.conj) {
                inflection.feature = maService.latin[types.conjugation].get(inflectionJSON.conj.$);
            }

            if (inflectionJSON.tense) {
                inflection.feature = maService.latin[types.tense].get(inflectionJSON.tense.$);
            }

            if (inflectionJSON.voice) {
                inflection.feature = maService.latin[types.voice].get(inflectionJSON.voice.$);
            }

            if (inflectionJSON.mood) {
                inflection.feature = maService.latin[types.mood].get(inflectionJSON.mood.$);
            }

            if (inflectionJSON.pers) {
                inflection.feature = maService.latin[types.person].get(inflectionJSON.pers.$);
            }

            inflections.push(inflection);
        }
        lexemes.push(new Lexeme(lemma, inflections));
    }
    return new Homonym(lexemes);
};

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

let messages$1 = {
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

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

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

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

function Compiler$1(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler$1.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler$1.prototype.compileMessage = function (ast) {
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

Compiler$1.prototype.compileMessageText = function (element) {
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

Compiler$1.prototype.compileArgument = function (element) {
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

Compiler$1.prototype.compileOptions = function (element) {
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

var parser = (function() {
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

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

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
    defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

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
defineProperty(MessageFormat, 'formats', {
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
defineProperty(MessageFormat, '__localeData__', {value: objCreate(null)});
defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
defineProperty(MessageFormat, '__parse', {value: parser.parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
defineProperty(MessageFormat, 'defaultLocale', {
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
    var compiler = new Compiler$1(locales, formats, pluralFn);
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
        if (!(values && hop.call(values, id))) {
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
        if (!hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = objCreate(defaults[type]);

        if (formats && hop.call(formats, type)) {
            extend(mergedType, formats[type]);
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

// GENERATED FILE
var defaultLocale = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

/* jslint esnext: true */

MessageFormat.__addLocaleData(defaultLocale);
MessageFormat.defaultLocale = 'en';

/**
 * Combines messages with the same locale code.
 */
class MessageBundle {

    /**
     * Creates a message bundle (a list of messages) for a locale.
     * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
     * @param {Object[]} messages - Messages for a locale.
     * @param {string} messages[].id - Message ID, used for message reference.
     * @param {string} messages[].text - Message text.
     */
    constructor(locale, messages$$1) {
        if (!locale) {
            throw new Error('Locale data is missing');
        }
        if (!messages$$1) {
            throw new Error('Messages data is missing');
        }

        this._locale = locale;

        for (let messageID in messages$$1) {
            if (messages$$1.hasOwnProperty(messageID)) {
                this[messageID] = new MessageFormat(messages$$1[messageID], this._locale);
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
}

/**
 * Combines several message bundle for different locales.
 */
class L10n {

    /**
     * Creates an empty object.
     * @returns {L10n} Returns a reference to self for chaining.
     */
    constructor() {
        this._locales = {};
        this._localeList = [];
        return this;
    }

    /**
     * Adds a message bundle to the storage.
     * @param {string} locale - A locale code for a message bundle. IETF language tag format is recommended.
     * @param {Object[]} messages - Messages for a locale.
     * @param {string} messages[].id - Message ID, used for message reference.
     * @param {string} messages[].text - Message text.
     * @returns {L10n} Returns a reference to self for chaining.
     */
    add(locale, messages$$1) {
        let bundle = new MessageBundle(locale, messages$$1); // Will throw an error if arguments are incorrect

        this._localeList.push(locale);
        this._locales[locale] = bundle;
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

// Initialize a global L10n object.
let l10n = new L10n().add('en-US', messages).add('en-GB', messages$1);

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
    footnotesContainer: 'infl-footnotes'
};

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
        element.classList.add(classNames.cell);
        for (let [index, suffix] of this.suffixes.entries()) {
            // Render each suffix
            let suffixElement = document.createElement('a');
            suffixElement.classList.add(classNames.suffix);
            if (suffix.match && suffix.match.suffixMatch) {
                suffixElement.classList.add(classNames.suffixMatch);
            }
            if (suffix.match && suffix.match.fullMatch) {
                suffixElement.classList.add(classNames.suffixFullFeatureMatch);
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
        if (!this.wNode.classList.contains(classNames.hidden)) {
            this.wNode.classList.add(classNames.hidden);
            this.nNode.classList.add(classNames.hidden);
        }
    }

    /**
     * Shows a previously hidden element.
     */
    show() {
        if (this.wNode.classList.contains(classNames.hidden)) {
            this.wNode.classList.remove(classNames.hidden);
            this.nNode.classList.remove(classNames.hidden);
        }
    }

    /**
     * Highlights a cell with color.
     */
    highlight() {
        if (!this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.add(classNames.highlight);
            this.nNode.classList.add(classNames.highlight);
        }
    }

    /**
     * Removes highlighting from a previously highlighted cell.
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.remove(classNames.highlight);
            this.nNode.classList.remove(classNames.highlight);
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
     * @param {GroupingFeature} groupingFeature - A grouping feature that specifies a row for which a title cell
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
        this.wNode.classList.add(classNames.cell);
        if (this.feature.isColumnGroup) {
            this.wNode.classList.add(classNames.header);
        }
        if (this.feature.isRowGroup && this.feature.isGroupTitleInRow) {
            // This cell is taking entire row
            this.wNode.classList.add(classNames.fullWidth);
        }
        if (this.feature.isColumnGroup && this.feature.groupingFeatureList.titleColumnsQuantity > 1) {
            this.wNode.classList.add(classNames.widthPrefix + this.feature.groupingFeatureList.titleColumnsQuantity);
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
        placeholder.classList.add(classNames.cell, classNames.widthPrefix + width);
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
        this.wNode.classList.add(classNames.highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.add(classNames.highlight);
        }
    }

    /**
     * Removes highlighting from this row title cell
     */
    clearHighlighting() {
        this.wNode.classList.remove(classNames.highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.remove(classNames.highlight);
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
     * @param {GroupingFeature} groupingFeature - A feature that defines one or several columns this header forms.
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
        element.classList.add(classNames.cell, classNames.header, classNames.widthPrefix + this.span);
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
        let currentWidthClass = classNames.widthPrefix + this.span;
        this.span += value;
        let newWidthClass = classNames.widthPrefix + this.span;
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
        if (!this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.add(classNames.highlight);
            this.nNode.classList.add(classNames.highlight);

            if (this.parent) {
                this.parent.highlight();
            }
        }
    }

    /**
     * Removes highlighting from a header cell, its parent and children
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.remove(classNames.highlight);
            this.nNode.classList.remove(classNames.highlight);

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
            this._headerCell.columnStateChange();
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
            this._headerCell.columnStateChange();
        }
    }

    /**
     * Highlights a column and its header.
     */
    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        this._headerCell.highlight();
    }

    /**
     * Removes highlighting from a column and its header.
     */
    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        this._headerCell.clearHighlighting();
    }
}

class Row {
    constructor(cells) {
        if (!cells) {
            cells = [];
        }
        this.cells = cells;
        this.titleCell = undefined;

        for (let cell of this.cells) {
            cell.row = this;
        }
    }

    add(cell) {
        cell.row = this;
        this.cells.push(cell);
    }

    get length() {
        return this.cells.length;
    }

    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        if (this.titleCell) {
            this.titleCell.highlight();
        }
    }

    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        if (this.titleCell) {
            this.titleCell.clearHighlighting();
        }
    }
}

class GroupingFeature {
    constructor(type, values, language, titleMessageID) {
        this._feature = new FeatureType(type, values, language);

        this.groupTitle = titleMessageID;
        this._groupType = undefined;
        this._titleLocation = undefined;

        this.groupingFeatureList = undefined;
        return this;
    }

    clone() {
        let clone = new GroupingFeature(this._feature.type, this._feature.orderIndex, this._feature.language);
        clone._groupType = this._groupType;
        clone.groupTitle = this.groupTitle;
        clone._titleLocation = this._titleLocation;
        return clone;
    }

    get feature() {
        return this._feature;
    }

    get type() {
        return this._feature.type;
    }

    get isColumnGroup() {
        return this._groupType === 'column';
    }

    get isRowGroup() {
        return this._groupType === 'row';
    }

    setColumnGroupType() {
        this._groupType = 'column';
        return this;
    }

    setRowGroupType() {
        this._groupType = 'row';
        return this;
    }

    get isTitleInColumn() {
        return this._titleLocation === 'column';
    }

    setColumnGroupTitleLocation() {
        this._titleLocation = 'column';
        return this;
    }

    setRowGroupTitleLocation() {
        this._titleLocation = 'row';
        return this;
    }

    get isGroupTitleInRow() {
        return this._titleLocation === 'row';
    }

    get size() {
        return this._feature.orderIndex.length;
    }

    get orderIndex() {
        return this._feature.orderIndex;
    }

    get orderValues() {
        let values = [];
        for (let value of this._feature.orderValues) {
            // Modify some properties here
            values.push(value);
        }
        return values;
    }

    isSameType(groupingFeature) {
        return this._feature.type === groupingFeature.feature.type;
    }

    createTitleCell(text, nvGroupSize) {
        return new RowTitleCell(text, this, nvGroupSize);
    }
}

class GroupingFeatureList {
    constructor(features) {
        this._features = features;
        this._columnFeatures = [];
        this._rowFeatures = [];

        for (let feature of features) {
            feature.groupingFeatureList = this;
        }

        for (let feature of features) {
            if (feature.isColumnGroup) {
                this._columnFeatures.push(feature);
            }
            if (feature.isRowGroup) {
                this._rowFeatures.push(feature);
            }
        }

        for (let feature of features) {
            if (feature.isColumnGroup) {
                this.firstColumnFeature = feature;
                break;
            }
        }

        for (let feature of features) {
            if (feature.isColumnGroup) {
                this.lastColumnFeature = feature;
            }
        }

        for (let feature of features) {
            if (feature.isRowGroup) {
                this.firstRowFeature = feature;
                break;
            }
        }
        for (let feature of features) {
            if (feature.isRowGroup) {
                this.lastRowFeature = feature;
            }
        }

        this.titleColumnsQuantity = 0;
        for (let feature of features) {
            if (feature.isTitleInColumn) {
                this.titleColumnsQuantity++;
            }
        }
    }

    get items() {
        return this._features;
    }

    get columnFeatures() {
        return this._columnFeatures;
    }

    get rowFeatures() {
        return this._rowFeatures;
    }

    get length() {
        return this._features.length;
    }
}

class FeatureGroup {
    constructor() {
        this.subgroups = []; // Each value of the feature
        this.cells = []; // All cells within this group and below
        this.parent = undefined;
        this.header = undefined;
    }

    /*hide() {
        for (let element of this.elements) {
            element.node.style.background = 'red';
        }
    }*/
}

class Table {
    constructor(suffixes, rowTitleColumnsQty, groupingFeatures, messages) {
        this.suffixes = suffixes;
        this.features = new GroupingFeatureList(groupingFeatures);

        this.cells = [];
        this.columns = [];
        this.rows = [];

        this.headers = [];

        this.rowTitleColumnsQty = rowTitleColumnsQty;
        this.messages = messages;

        this.emptyColumnsHidden = false;
        this.suffixMatchesHidden = false;

        // Tree contains elements grouped by features according to groupingFeatures order
        //this.tree = new Tree();

        // Holds all cell node HTML children
        this.docFragment = document.createDocumentFragment();



        this.titleCells = {};

        // Temporary wrapper to hold cell's generated HTML
        this.cellWrapper = document.createElement('div');

        this.tree = this.groupByFeature(this.suffixes);

        // Additional cell initialization
        for (let [index, cell] of this.cells.entries()) {
            // Store index value to reference back to the cell
            cell.index = index;
        }

        this.headers = this.constructHeaders();

        // Construct columns
        this.columns = this.constructColumns();
        for (let [index, column] of this.columns.entries()) {
            column.headerCell = this.headers[this.headers.length-1].cells[index];
        }

        // Construct rows
        this.columnNum = this.columns.length;
        this.rowNum = this.columns[0].length;
        for (let rowIndex = 0; rowIndex < this.rowNum; rowIndex++) {
            this.rows[rowIndex] = new Row();
            this.rows[rowIndex].titleCell = this.columns[0].cells[rowIndex].titleCell;
            for (let columnIndex = 0; columnIndex < this.columnNum; columnIndex++) {
                this.rows[rowIndex].add(this.columns[columnIndex].cells[rowIndex]);
            }
        }

        this.wideView = {
            nodes: document.createElement('div')
        };
        this.wideView.nodes.classList.add('infl-table', 'wide');

        this.narrowView = {
            groups: [],
            groupNum: this.features.firstColumnFeature.size,
            groupSize: this.columns.length / this.features.firstColumnFeature.size, // Default group size
            nodes: document.createElement('div')
        };
        this.narrowView.nodes.classList.add('narrow-view-container');
        for (let i = 0; i < this.narrowView.groupNum; i++) {
            this.narrowView.groups.push({
                groupSize: this.narrowView.groupSize, // Default group size
                nodes: document.createElement('div')
            });
            this.narrowView.groups[i].nodes.classList.add('infl-table', 'narrow');
            this.narrowView.nodes.appendChild(this.narrowView.groups[i].nodes);
        }
    }

    select(features) {
        let group = new FeatureGroup();
        group.elements = this.tree.elements.filter(element => {
            for (let feature of features) {
                let found = false;
                for (let elementFeature of element.features) {
                    if (elementFeature.isEqual(feature)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return false;
                }
            }
            return true;
        });
        return group;
    }

    /**
     * Returns true if an ending grammatical feature defined by featureType has value that is listed in featureValues array.
     * This function is for use with Array.prototype.filter().
     * @param {FeatureType} featureType - a grammatical feature type we need to filter on
     * @param {Feature[]} featureValues - a list of possible values of a type specified by featureType that
     * this ending should have
     * @param {Suffix} suffix - an ending we need to filter out
     * @returns {boolean}
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
     * This function provide a view-specific logic that is used to merge two suffixes together when they are combined.
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

    groupByFeature(suffixes, featureTrail = [], currentLevel = 0) {
        let group = new FeatureGroup();
        group.feature = this.features.items[currentLevel];

        // Iterate over each value of the feature
        for (const featureValue of group.feature.orderValues) {
            if (featureTrail.length>0 && featureTrail[featureTrail.length-1].type === group.feature.type) {
                // Remove previously inserted feature of the same type
                featureTrail.pop();
            }
            featureTrail.push(featureValue);

            // Suffixes that are selected for current combination of feature values
            let selectedSuffixes = suffixes.filter(Table.filter.bind(this, group.feature.type, featureValue.value));

            if (currentLevel < this.features.length - 1) {
                // Divide to further groups
                let subGroup = this.groupByFeature(selectedSuffixes, featureTrail, currentLevel + 1);
                group.subgroups.push(subGroup);
                group.cells = group.cells.concat(subGroup.cells);
            }
            else {
                // This is the last level. This represent a cell with suffixes
                // Split result has a list of suffixes in a table cell. We can now combine duplicated items if we want
                if (selectedSuffixes.length > 0) {
                    selectedSuffixes = Suffix.combine(selectedSuffixes, Table.merge);
                }

                let cell = new Cell(selectedSuffixes, featureTrail.slice());
                group.subgroups.push(cell);
                group.cells.push(cell);
                this.cells.push(cell);
            }
        }
        featureTrail.pop();
        return group;
    }

    constructColumns(tree = this.tree, columns = [], currentLevel = 0) {
        let currentFeature = this.features.items[currentLevel];

        let groups = [];
        for (let [index, featureValue] of currentFeature.orderIndex.entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate until it is the last row feature
            if (!currentFeature.isSameType(this.features.lastRowFeature)) {
                let currentResult = this.constructColumns(cellGroup, columns, currentLevel + 1);
                if (currentFeature.isRowGroup) {
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
                    columns.push(column);
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
        if (currentFeature.isRowGroup) {
            return groups;
        }
        return columns;
    }

    constructHeaders(tree = this.tree, tableHeaders = [], currentLevel = 0) {
        let currentFeature = this.features.columnFeatures[currentLevel];

        let cells = [];
        for (let [index, featureValue] of currentFeature.orderIndex.entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate over all column features (features that form columns)
            if (currentLevel < this.features.columnFeatures.length - 1) {
                let subCells = this.constructHeaders(cellGroup, tableHeaders, currentLevel + 1);


                let columnSpan = 0;
                for (let cell of subCells) {
                    columnSpan += cell.span;
                }


                let headerCell = new HeaderCell(featureValue, currentFeature, columnSpan);
                headerCell.children = subCells;
                for (let cell of subCells) {
                    cell.parent = headerCell;
                }

                if (!tableHeaders[currentLevel]) {
                    tableHeaders[currentLevel] = new Row();
                }
                tableHeaders[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);

                tableHeaders[currentLevel].add(headerCell);
                cells.push(headerCell);
            }
            else {
                // Last level
                let headerCell = new HeaderCell(featureValue, currentFeature);

                if (!tableHeaders[currentLevel]) {
                    tableHeaders[currentLevel] = new Row();
                }

                tableHeaders[currentLevel].add(headerCell);
                tableHeaders[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);
                cells.push(headerCell);
            }
        }
        if (currentLevel === 0) {
            return tableHeaders;
        }
        else {
            return cells;
        }
    }

    renderViews() {

        // Regular (wide) view
        // Clean any previously inserted nodes
        this.wideView.nodes.innerHTML = '';

        // Calculate a number of visible columns
        let colNum = 0;
        let firstRow = this.rows[0];
        for (let cell of firstRow.cells) {
            if (!cell.column.hidden) {
                colNum++;
            }
        }


        for (let row of this.headers) {
            this.wideView.nodes.appendChild(row.titleCell.wvNode);
            for (let cell of row.cells) {
                this.wideView.nodes.appendChild(cell.wvNode);
            }
        }

        for (let row of this.rows) {
            let titleCells = row.titleCell.hierarchyList;
            if (titleCells.length < this.features.titleColumnsQuantity) {
                this.wideView.nodes.appendChild(RowTitleCell.placeholder(this.features.titleColumnsQuantity - titleCells.length));
            }
            for (let titleCell of titleCells) {
                this.wideView.nodes.appendChild(titleCell.wvNode);
            }

            for (let cell of row.cells) {
                this.wideView.nodes.appendChild(cell.wvNode);
            }
        }
        this.wideView.nodes.style.gridTemplateColumns = 'repeat(' + (colNum + this.features.titleColumnsQuantity) + ', 1fr)';


        // Narrow view
        for (let [groupIndex, group] of this.narrowView.groups.entries()) {
            // Clean any previously inserted nodes
            group.nodes.innerHTML = '';

            // Calculate a number of visible columns
            let colNum = 0;
            let firstRow = this.rows[0];
            for (let i = groupIndex * this.narrowView.groupSize; i < ((groupIndex + 1) * this.narrowView.groupSize); i++) {
                if (!firstRow.cells[i].column.hidden) {
                    colNum++;
                }
            }

            if (colNum) {
                // This group is visible
                for (let row of this.headers) {
                    group.nodes.appendChild(row.titleCell.getNvNode(groupIndex));
                    let headerCellNum = row.cells.length / this.narrowView.groupNum;
                    for (let i = groupIndex * headerCellNum; i < (groupIndex + 1) * headerCellNum; i++) {
                        group.nodes.appendChild(row.cells[i].nvNode);
                    }
                }

                for (let row of this.rows) {
                    let titleCells = row.titleCell.hierarchyList;
                    if (titleCells.length < this.features.titleColumnsQuantity) {
                        group.nodes.appendChild(RowTitleCell.placeholder(this.features.titleColumnsQuantity - titleCells.length));
                    }
                    for (let titleCell of titleCells) {
                        group.nodes.appendChild(titleCell.getNvNode(groupIndex));
                    }

                    for (let i = groupIndex * this.narrowView.groupSize; i < (groupIndex + 1) * this.narrowView.groupSize; i++) {
                        group.nodes.appendChild(row.cells[i].nvNode);
                    }
                }
                group.nodes.classList.remove(classNames.hidden);
                group.nodes.style.gridTemplateColumns = 'repeat(' + (colNum + this.features.titleColumnsQuantity) + ', 100px)';
                group.nodes.style.width = (colNum + this.features.titleColumnsQuantity) * 100 + 'px';
            }
            else {
                // This group is hidden
                group.nodes.classList.add(classNames.hidden);
            }


        }

        for (let cell of this.cells) {
            cell.addEventListener('mouseenter', this.highlightRowAndColumn.bind(this));
            cell.addEventListener('mouseleave', this.removeRowAndColumnHighlighting.bind(this));
        }
    }

    highlightRowAndColumn(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].highlightRowAndColumn();
    }

    removeRowAndColumnHighlighting(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].clearRowAndColumnHighlighting();
    }

    hideEmptyColumns() {
        for (let column of this.columns) {
            if (column.empty) {
                column.hide();
            }
        }
        this.emptyColumnsHidden = true;
    }

    showEmptyColumns() {
        for (let column of this.columns) {
            if (column.hidden) {
                column.show();
            }
        }
        this.emptyColumnsHidden = false;
    }

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

class Footnotes {
    constructor(footnotes) {
        this.footnotes = footnotes;

        this.nodes = document.createElement('dl');
        this.nodes.id = "inlection-table-footer";
        this.nodes.classList.add(classNames.footnotesContainer);
        for (let footnote of footnotes) {
            let index = document.createElement('dt');
            index.innerHTML = footnote.index;
            this.nodes.appendChild(index);
            let text = document.createElement('dd');
            text.innerHTML = footnote.text;
            this.nodes.appendChild(text);
        }
    }

    get html() {
        return this.nodes;
    }
}

class View {

    constructor(viewOptions) {

        this.options = viewOptions;
        this.pageHeader = {};
        this.table = {};

        // An HTML element where this view is rendered
        this.container = undefined;
    }

    get partOfSpeech() {
        return this.options.partOfSpeech;
    }

    get id() {
        return this.options.id;
    }

    /**
     * Converts a ResultSet, returned from inflection tables library, into an HTML representation of an inflection table.
     * @param {ResultSet} resultSet - A result set from inflection tables library.
     * @returns {string} HTML code representing an inflection table.
     */
    render(container, resultSet, messages) {
        "use strict";

        this.messages = messages;
        this.container = container;
        this.resultSet = resultSet;
        let selection = resultSet[this.options.partOfSpeech];

        this.footnotes = new Footnotes(selection.footnotes);

        this.table = new Table(selection.suffixes, this.rowTitleColumnsQty, this.options.groupingFeatures, messages);
        this.display();
    }

    display() {

        this.table.renderViews();
        // Clear the container
        this.container.innerHTML = '';

        let word = document.createElement('h2');
        word.innerHTML = this.resultSet.word;
        this.container.appendChild(word);

        let title = document.createElement('h3');
        title.innerHTML = this.options.title;
        this.container.appendChild(title);

        this.pageHeader = document.createElement('div');
        this.pageHeader.innerHTML = `
        <button id="hide-empty-columns" class="switch-btn">Hide empty columns</button><button id="show-empty-columns" class="switch-btn hidden">Show empty columns</button>
        <button id="hide-no-suffix-groups" class="switch-btn">Hide top-level groups with no suffix matches</button><button id="show-no-suffix-groups" class="switch-btn hidden">Show top-level groups with no suffix matches</button><br>
        <p>Hover over the suffix to see its grammar features</p>
        `;
        this.container.appendChild(this.pageHeader);


        // Insert a wide view
        this.container.appendChild(this.table.wideView.nodes);
        // Insert narrow views
        this.container.appendChild(this.table.narrowView.nodes);

        this.container.appendChild(this.footnotes.html);

        this.pageHeader.querySelector('#hide-empty-columns').addEventListener('click', this.hideEmptyColumns.bind(this));
        this.pageHeader.querySelector('#show-empty-columns').addEventListener('click', this.showEmptyColumns.bind(this));

        this.pageHeader.querySelector('#hide-no-suffix-groups').addEventListener('click', this.hideNoSuffixGroups.bind(this));
        this.pageHeader.querySelector('#show-no-suffix-groups').addEventListener('click', this.showNoSuffixGroups.bind(this));
    }


    hideEmptyColumns() {
        this.table.hideEmptyColumns();
        this.display();
        this.pageHeader.querySelector('#hide-empty-columns').classList.add(classNames.hidden);
        this.pageHeader.querySelector('#show-empty-columns').classList.remove(classNames.hidden);
    }

    showEmptyColumns() {
        this.table.showEmptyColumns();
        this.display();
        this.pageHeader.querySelector('#show-empty-columns').classList.add(classNames.hidden);
        this.pageHeader.querySelector('#hide-empty-columns').classList.remove(classNames.hidden);
    }

    hideNoSuffixGroups() {
        this.table.hideNoSuffixGroups();
        this.display();
        this.pageHeader.querySelector('#hide-no-suffix-groups').classList.add(classNames.hidden);
        this.pageHeader.querySelector('#show-no-suffix-groups').classList.remove(classNames.hidden);
    }

    showNoSuffixGroups() {
        this.table.showNoSuffixGroups();
        this.display();
        this.pageHeader.querySelector('#show-no-suffix-groups').classList.add(classNames.hidden);
        this.pageHeader.querySelector('#hide-no-suffix-groups').classList.remove(classNames.hidden);
    }
}

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let numbers$1 = new GroupingFeature(
    types.number,
    ['singular', 'plural'],
    languages.latin,
    'Number')
    .setRowGroupType()
    .setRowGroupTitleLocation();

let cases$1 = new GroupingFeature(
    types.grmCase,
    ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'],
    languages.latin,
    'Case')
    .setRowGroupType()
    .setColumnGroupTitleLocation();

let declensions$1 = new GroupingFeature(
    types.declension,
    ['first', 'second', 'third', 'fourth', 'fifth'],
    languages.latin,
    'Declension')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let genders$1 = new GroupingFeature(
    types.gender,
    [['masculine', 'feminine'], 'neuter'],
    languages.latin,
    'Gender')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let types$2 = new GroupingFeature(
    types.type,
    ['regular', 'irregular'],
    languages.latin,
    'Type')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let viewOptions = {
    id: 'nounDeclension',
    name: 'noun declension',
    title: 'Noun declension',
    partOfSpeech: parts.noun.value,
    groupingFeatures: [declensions$1, genders$1, types$2, numbers$1, cases$1]
};

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let numbers$2 = new GroupingFeature(
    types.number,
    ['singular', 'plural'],
    languages.latin,
    'Number')
    .setRowGroupType()
    .setRowGroupTitleLocation();

let cases$2 = new GroupingFeature(
    types.grmCase,
    ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'],
    languages.latin,
    'Case')
    .setRowGroupType()
    .setColumnGroupTitleLocation();

let declensions$2 = new GroupingFeature(
    types.declension,
    ['first', 'second', 'third'],
    languages.latin,
    'Declension')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let genders$2 = new GroupingFeature(
    types.gender,
    ['masculine', 'feminine', 'neuter'],
    languages.latin,
    'Gender')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let types$3 = new GroupingFeature(
    types.type,
    ['regular', 'irregular'],
    languages.latin,
    'Type')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let viewOptions$1 = {
    id: 'adjectiveDeclension',
    name: 'adjective declension',
    title: 'Adjective declension',
    partOfSpeech: parts.adjective.value,
    groupingFeatures: [declensions$2, genders$2, types$3, numbers$2, cases$2]
};

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses$2 = new GroupingFeature(
    types.tense,
    ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'],
    languages.latin,
    'Tense');

let numbers$4 = new GroupingFeature(
    types.number,
    ['singular', 'plural'],
    languages.latin,
    'Number');

let persons$2 = new GroupingFeature(
    types.person,
    ['first', 'second', 'third'],
    languages.latin,
    'Person');

let voices$2 = new GroupingFeature(
    types.voice,
    ['active', 'passive'],
    languages.latin,
    'Voice');

let conjugations$2 = new GroupingFeature(
    types.conjugation,
    ['first', 'second', 'third', 'fourth'],
    languages.latin,
    'Conjugation Stem');

let moods$2 = new GroupingFeature(
    types.mood,
    ['indicative', 'subjunctive'],
    languages.latin,
    'Mood');

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses$1 = tenses$2.clone().setRowGroupType().setRowGroupTitleLocation();
let numbers$3 = numbers$4.clone().setRowGroupType().setColumnGroupTitleLocation();
let persons$1 = persons$2.clone().setRowGroupType().setColumnGroupTitleLocation();
let voices$1 = voices$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let conjugations$1 = conjugations$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let moods$1 = moods$2.clone().setColumnGroupType().setRowGroupTitleLocation();

let viewOptions$2 = {
    id: 'verbVoiceConjugationMood',
    name: 'verb voice-conjugation-mood',
    title: 'Voice-Conjugation-Mood',
    partOfSpeech: parts.verb.value,
    groupingFeatures: [voices$1, conjugations$1, moods$1, tenses$1, numbers$3, persons$1]
};

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses$3 = tenses$2.clone().setRowGroupType().setRowGroupTitleLocation();
let numbers$5 = numbers$4.clone().setRowGroupType().setColumnGroupTitleLocation();
let persons$3 = persons$2.clone().setRowGroupType().setColumnGroupTitleLocation();
let voices$3 = voices$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let conjugations$3 = conjugations$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let moods$3 = moods$2.clone().setColumnGroupType().setRowGroupTitleLocation();

let viewOptions$3 = {
    id: 'verbVoiceMoodConjugation',
    name: 'verb voice-mood-conjugation',
    title: 'Voice-Mood-Conjugation',
    partOfSpeech: parts.verb.value,
    groupingFeatures: [voices$3, moods$3, conjugations$3, tenses$3, numbers$5, persons$3]
};

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses$4 = tenses$2.clone().setRowGroupType().setRowGroupTitleLocation();
let numbers$6 = numbers$4.clone().setRowGroupType().setColumnGroupTitleLocation();
let persons$4 = persons$2.clone().setRowGroupType().setColumnGroupTitleLocation();
let voices$4 = voices$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let conjugations$4 = conjugations$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let moods$4 = moods$2.clone().setColumnGroupType().setRowGroupTitleLocation();

let viewOptions$4 = {
    id: 'verbConjugationVoiceMood',
    name: 'verb conjugation-voice-mood',
    title: 'Conjugation-Voice-Mood',
    partOfSpeech: parts.verb.value,
    groupingFeatures: [conjugations$4, voices$4, moods$4, tenses$4, numbers$6, persons$4]
};

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses$5 = tenses$2.clone().setRowGroupType().setRowGroupTitleLocation();
let numbers$7 = numbers$4.clone().setRowGroupType().setColumnGroupTitleLocation();
let persons$5 = persons$2.clone().setRowGroupType().setColumnGroupTitleLocation();
let voices$5 = voices$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let conjugations$5 = conjugations$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let moods$5 = moods$2.clone().setColumnGroupType().setRowGroupTitleLocation();

let viewOptions$5 = {
    id: 'verbConjugationMoodVoice',
    name: 'verb conjugation-mood-voice',
    title: 'Conjugation-Mood-Voice',
    partOfSpeech: parts.verb.value,
    groupingFeatures: [conjugations$5, moods$5, voices$5, tenses$5, numbers$7, persons$5]
};

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses$6 = tenses$2.clone().setRowGroupType().setRowGroupTitleLocation();
let numbers$8 = numbers$4.clone().setRowGroupType().setColumnGroupTitleLocation();
let persons$6 = persons$2.clone().setRowGroupType().setColumnGroupTitleLocation();
let voices$6 = voices$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let conjugations$6 = conjugations$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let moods$6 = moods$2.clone().setColumnGroupType().setRowGroupTitleLocation();

let viewOptions$6 = {
    id: 'verbMoodVoiceConjugation',
    name: 'verb mood-voice-conjugation',
    title: 'Mood-Voice-Conjugation',
    partOfSpeech: parts.verb.value,
    groupingFeatures: [moods$6, voices$6, conjugations$6, tenses$6, numbers$8, persons$6]
};

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses$7 = tenses$2.clone().setRowGroupType().setRowGroupTitleLocation();
let numbers$9 = numbers$4.clone().setRowGroupType().setColumnGroupTitleLocation();
let persons$7 = persons$2.clone().setRowGroupType().setColumnGroupTitleLocation();
let voices$7 = voices$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let conjugations$7 = conjugations$2.clone().setColumnGroupType().setRowGroupTitleLocation();
let moods$7 = moods$2.clone().setColumnGroupType().setRowGroupTitleLocation();

let viewOptions$7 = {
    id: 'verbMoodConjugationVoice',
    name: 'verb mood-conjugation-voice',
    title: 'Mood-Conjugation-Voice',
    partOfSpeech: parts.verb.value,
    groupingFeatures: [moods$7, conjugations$7, voices$7, tenses$7, numbers$9, persons$7]
};

/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
class Presenter {
    constructor(selector, resultSet, locale) {
        "use strict";

        this.targetSelector = selector;
        this.container = document.querySelector(this.targetSelector);
        this.resultSet = resultSet;
        this.zeroWidthClass = 'hidden';

        // All views registered by the Presenter
        this.views = [];
        this.viewIndex = {};

        this.addView(viewOptions);
        this.addView(viewOptions$1);
        this.addView(viewOptions$2);
        this.addView(viewOptions$3);
        this.addView(viewOptions$4);
        this.addView(viewOptions$5);
        this.addView(viewOptions$6);
        this.addView(viewOptions$7);

        // Views available for parts of speech that are present in a Result Set
        this.availableViews = this.getViews(this.resultSet[types.part]);

        this.defaultView = this.availableViews[0];
        this.activeView = undefined;

        this.locale = locale; // This is a default locale
        this.l10n = l10n;

        return this;
    }

    addView(viewOptions$$1) {
       let view =  new View(viewOptions$$1);
       this.views.push(view);
       this.viewIndex[view.id] = view;
    }

    setLocale(locale) {
        this.locale = locale;
        this.activeView.render(this.container, this.resultSet, this.l10n.messages(this.locale));
    }

    render() {
        "use strict";

        // Show a default view
        this.defaultView.render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeView = this.defaultView;

        this.appendViewSelector("#view-switcher");
        this.appendLocaleSelector("#locale-selector");
    }

    appendViewSelector(targetSelector) {
        if (this.availableViews.length > 1) {
            let id = 'view-selector-list';
            let viewContainer = document.querySelector(targetSelector);
            viewContainer.innerHTML = '';
            let viewLabel = document.createElement('label');
            viewLabel.setAttribute('for', id);
            viewLabel.innerHTML = "View:&nbsp;";
            let viewList = document.createElement('select');
            for (const view of this.availableViews) {
                let option = document.createElement("option");
                option.value = view.options.id;
                option.text = view.options.name;
                viewList.appendChild(option);
            }
            viewList.addEventListener('change', this.viewSelectorEventListener.bind(this));
            viewContainer.appendChild(viewLabel);
            viewContainer.appendChild(viewList);
        }
    }

    viewSelectorEventListener(event) {
        let viewID = event.target.value;
        let view = this.viewIndex[viewID];
        view.render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeView = view;
    }

    appendLocaleSelector(targetSelector) {
        let id = 'locale-selector-list';
        let locale = document.querySelector(targetSelector);
        locale.innerHTML = ''; // Erase whatever was there
        let localeLabel = document.createElement('label');
        localeLabel.setAttribute('for', id);
        localeLabel.innerHTML = "Locale:&nbsp;";
        let localeList = document.createElement('select');
        localeList.id = id;
        for (let locale of this.l10n.locales) {
            let option = document.createElement("option");
            option.value = locale;
            option.text = locale;
            localeList.appendChild(option);
        }
        localeList.addEventListener('change', this.localeSelectorEventListener.bind(this));
        locale.appendChild(localeLabel);
        locale.appendChild(localeList);
    }

    localeSelectorEventListener() {
        let locale = event.target.value;
        this.setLocale(locale);
    }

    getViews(partsOfSpeech) {
        // First view in a returned array will be a default one
        let views = [];
        for (let view of this.views) {
            if (partsOfSpeech.includes(view.partOfSpeech)) {
                views.push(view);
            }
        }
        return views;
    }
}

// Import shared language data
// Load Latin language data
let langData = dataSet;
// Prepare lang data for the first use
dataSet.loadData();


let testCases = [
    {word: "cupidinibus", value: "latin_noun_cupidinibus", type: "noun"},
    {word: "mare", value: "latin_noun_adj_mare", type: "noun, adjective"},
    {word: "cepit", value: "latin_verb_cepit", type: "regular verb"}
];
let selectList = document.querySelector("#test-selector");

for (const testCase of testCases) {
    let option = document.createElement("option");
    option.value = testCase.value;
    option.text = testCase.word + ' (' + testCase.type + ')';
    selectList.appendChild(option);
}

selectList.addEventListener('change', event => {
    if (event.target.value !== 'select') {
        show(event.target.selectedOptions[0].innerHTML, event.target.value);
    }
});


let show = function show(word, fileNameBase) {
    console.log('Show started');

    let dir = 'tests/data/';
    let extension = '.json';
    loadData(dir + fileNameBase + extension)
        .then(json => {
            json = JSON.parse(json);

            // Transform Morphological Analyzer's response into a library standard Homonym object
            let result = adapter.transform(json);

            // Get matching suffixes from an inflection library
            let resultSet = langData.getSuffixes(result);
            resultSet.word = word;

            // Insert rendered view to a page
            let presenter = new Presenter('#id-inflections-table', resultSet, 'en-US').render();

            console.log('Show finished');
        }).catch(error => {
        console.error(error);
    });
};

})));
//# sourceMappingURL=inflection-tables.js.map
