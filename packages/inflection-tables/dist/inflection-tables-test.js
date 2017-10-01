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
     * @param {types} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {languages} language - A language of a feature, allowed values are specified in 'languages' object.
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
     */
    constructor(suffixValue) {
        "use strict";

        if (suffixValue === undefined) {
            throw new Error('Suffix should not be empty.')
        }
        this.value = suffixValue;
        this.features = {};
        this.featureGroups = {};
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
 * Detailed information about a match type
 */
class MatchData {
    constructor() {
        this.suffixMatch = false; // When two suffixes are the same
        this.fullMatch = false; // When two suffixes and all grammatical features, including part of speech, are the same
        this.matchedFeatures = []; // How many features matches
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
const parts = dataSet.defineFeatureType(types.part, ['noun', 'adjective']);
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
const footnotes = dataSet.defineFeatureType(types.footnote, []);

// endregion Definition of grammatical features

dataSet.addSuffixes = function addSuffixes(partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-';

    // First row are headers
    for (let i = 1; i < data.length; i++) {
        let suffix = data[i][0];
        // Handle special suffix values
        if (suffix === noSuffixValue) {
            suffix = null;
        }

        let features = [partOfSpeech, numbers.importer.csv.get(data[i][1]), cases.importer.csv.get(data[i][2]),
            declensions.importer.csv.get(data[i][3]), genders.importer.csv.get(data[i][4]), types$1.importer.csv.get(data[i][5])];
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

dataSet.addFootnotes = function addFootnotes(partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
    }
};

dataSet.loadData = function loadData$$1() {
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
};


/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - A suffix to be matched with inflections.
 * @returns {Suffix | null} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns null.
 */
dataSet.matcher = function match(inflections, suffix) {
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
dataSet.bestMatch = function bestMatch(matchA, matchB) {
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
    .map('adjective', parts.adjective);

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

let maService = new Service('Tufts');
// Set a language conversion map for this specific service
maService.languages.importer.map('lat', languages.latin);
// Load Latin language data for this specific service
maService.setLanguageData(data);

// Import shared language data
// Reexport items for Jest
exports.languages = languages;
exports.types = types;
exports.Feature = Feature;
exports.FeatureType = FeatureType;
exports.Importer = Importer;
exports.Inflection = Inflection;
exports.Lemma = Lemma;
exports.Lexeme = Lexeme;
exports.Homonym = Homonym;
exports.Suffix = Suffix;
exports.LanguageDataset = LanguageDataset;

})));
