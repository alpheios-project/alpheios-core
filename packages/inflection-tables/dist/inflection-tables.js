(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.InflectionTables = {})));
}(this, (function (exports) { 'use strict';

/**
 * Shared data structures and functions
 */
/**
 * Wrapper class for a grammatical feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature {
    constructor (value, type, language) {
        this.value = value;
        this.type = type;
        this.language = language;
    };
}

/**
 * Definition class for a grammatical feature. Stores type information and all possible values of the feature.
 */
class FeatureType {
    constructor (type, values, language) {
        this.type = type;
        this.language = language;
        for (let value of values) {
            this[value] = new Feature(value, this.type, this.language);
        }
    };
}

const languages = {
    type: 'language',
    latin: 'latin',
    greek: 'greek'
};

const types = {
    part: 'part of speech',
    number: 'number',
    grmCase: 'case',
    declension: 'declension',
    gender: 'gender',
    type: 'type',
    footnote: 'footnote'
};


let inflections = {};

class InflectionsLanguageData {
    constructor(language) {
        "use strict";
        this.language = language;
        this.endings = new InflectionsEndings();
        this.footnotes = new InflectionsFootnotes();
    };

    /**
     * Filters out elements with features not matching the one specified
     * @param feature
     * @param element
     * @returns {boolean}
     */
    static filterElementsByFeature(feature, element) {
        "use strict";
        // TODO: filter out features of wrong type
        return (element[feature.type] === feature.value);
    }

    getEndings(feature) {
        "use strict";
        let result = new InflectionsResultSet();
        result.endings = this.endings.items.filter(InflectionsLanguageData.filterElementsByFeature.bind(this, feature));

        // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set();
        // Build a unique set of footnote indexes
        for (let element of result.endings) {
            if (element.hasOwnProperty(types.footnote)) {
                footnotesIndex.add(element[types.footnote]);
            }
        }
        // Add footnote indexes and their texts to a result
        for (let index of footnotesIndex) {
            result.footnotes.push({index: index, text: this.footnotes.items[index]});
        }
        // Sort footnotes according to their index numbers
        result.footnotes.sort( (a, b) => parseInt(a.index) - parseInt(b.index) );

        return result;
    }

    /**
     * This is a simple test function for testing tools verification
     * @returns {boolean}
     */
    test() {
        "use strict";
        return true;
    }
}

class InflectionsEndings {
    constructor() {
        "use strict";
        this.endings = []; // Word endings in an array
    };

    get items() { return this.endings; }

    add(ending, ...features) {
        let endingItem = {
            ending: ending
        };
        for (var feature of features) {
            endingItem[feature.type] = feature.value;
        }
        this.endings.push(endingItem);
    };
}

class InflectionsFootnotes {
    constructor() {
        "use strict";
        this.footnotes = {};
    };

    get items() { return this.footnotes; }

    add(index, text) {
        this.items[index] = text;
    };
}

class InflectionsFootnotesType {
    constructor (type, items, language) {
        this.type = type;
        this.language = language;
        for (let index in items) {
            if (items.hasOwnProperty(index)) {
                this[index] = new Feature(index, this.type, this.language);
            }
        }
    };
}

// A return value for inflection queries
class InflectionsResultSet {
    constructor() {
        "use strict";
        this.endings = [];
        this.footnotes = [];
    }
}

/*
 * Latin language data module
 */
// A language of this module
const language = languages.latin;
// Create a language data set that will keep all language-related information
let dataSet = new InflectionsLanguageData(language);

// Define grammatical features of a language
const parts = new FeatureType(types.part, ['noun'], language);
const numbers = new FeatureType(types.number, ['singular', 'plural'], language);
const cases = new FeatureType(types.grmCase, ['nominative', 'genetive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'], language);
const declensions = new FeatureType(types.declension, ['first', 'second', 'third', 'fourth', 'fifth'], language);
const genders = new FeatureType(types.gender, ['masculine', 'feminine', 'neuter'], language);
const types$1 = new FeatureType(types.type, ['regular', 'irregular'], language);

// Define footnotes
dataSet.footnotes.add(7, 'may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.');
dataSet.footnotes.add(13, 'may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.');
dataSet.footnotes.add(101, 'may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.');

// Create a convenience wrapper for passing footnote index to an endings object
const footnotes = new InflectionsFootnotesType(types.part.footnote, dataSet.footnotes.items, language);

// Nouns
dataSet.endings.add('a', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types$1.regular);
dataSet.endings.add('ē', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types$1.irregular);
dataSet.endings.add('ēs', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types$1.irregular);
dataSet.endings.add('ā', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types$1.irregular, footnotes[7]);

// region Test values only
// endregion Test values only

// Import shared language data
console.log('Inflections start');

// Load Latin language data
inflections[language] = dataSet;
let langData = inflections[language];
console.log("Latin data are ", langData);
let results = langData.getEndings(types$1.irregular);
console.log('Results are ', results);

console.log('Inflections finish');

exports.langData = langData;

Object.defineProperty(exports, '__esModule', { value: true });

})));
