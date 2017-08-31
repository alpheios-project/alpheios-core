(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

    static decompose(dataType) {
        if (dataType) {
            let type;
            let value;
            if (Array.isArray(dataType)) {
                if (dataType.length > 1) {
                    type = dataType[0].type;
                    value = [];
                    for (let element of dataType) {
                        value.push(element.value);
                    }
                }
                else if (dataType.length = 1) {
                    type = dataType[0].type;
                    value = dataType[0].value;
                }
            }
            else {
                // dataType is a single Feature object
                type = dataType.type;
                value = dataType.value;
            }
            return {type, value};
        }
    }
}

/**
 * Definition class for a grammatical feature. Stores type information and (optionally) all possible values of the feature.
 * It serves as a feature generator. If list of possible values is provided, it can generate a Feature object
 * each time a property that corresponds to a feature value is accessed. If no list of possible values provided,
 * a Feature object can be generated with get(value) method.
 */
class FeatureType {
    // TODO: value checking
    /**
     *
     * @param type
     * @param {string[]} values - A list of allowed values for this feature type. If not provided, there will be no
     * allowed values as well as no ordering (can be used for items that do not need or have a simple order,
     * such as footnotes).
     * @param {string} language - A language of a feature
     */
    constructor(type, values, language) {
        this.type = type;
        this.language = language;

        this._orderIndex = [];
        /*
         This is a sort order index for a grammatical feature values. It is determined by the order of values in
         a 'values' array.
         */
        this._orderLookup = {};

        if (values && Array.isArray(values)) {
            for (const [index, value] of values.entries()) {
                this._orderIndex.push(value);
                this[value] = new Feature(value, this.type, this.language);
                this._orderLookup[value] = index;
            }
        }
    };

    /**
     * Return a Feature with an arbitrary value. This can be especially useful for features that do not set
     * a list of predefined values, such as footnotes.
     * @param value
     * @returns {Feature}
     */
    get(value) {
        return new Feature(value, this.type, this.language);
    }

    addImporter(name) {
        this.importer = this.importer || {};
        this.importer[name] = this.importer[name] || new Importer();
        return this.importer[name];
    }

    get orderIndex() {
        "use strict";
        return this._orderIndex;
    }

    get orderLookup() {
        "use strict";
        return this._orderLookup;
    }

    /**
     * Sets an order of grammatical feature values for a grammatical feature. Used mostly for sorting, filtering,
     * and displaying
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
        // Erase whatever sort order was set previously
        this._orderLookup = {};
        this._orderIndex = [];

        // Input data control
        if (!values) {
            console.error('Empty argument has been provided for FeatureType.order(values) of "' + this.type + '" of "' + this.language + '"."' +
                '" Must be a single value or an array of values. Sort order will not be set.');
            return;
        }

        // If a single value is provided, convert it into an array
        if (!Array.isArray(values)) {
            values = [values];
        }

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
 * This is a hash table that maps values imported from an external file or service into library standard values
 */
class Importer {
    constructor() {
        this.valueMap = {};

        return this;
    }

    /**
     * Sets mapping between external imported value and one or more library standard values
     * @param {string} importedValue - External value
     * @param {Feature | Feature[]} libraryValue - Library standard value
     */
    map(importedValue, libraryValue) {
        this.valueMap[importedValue] = libraryValue;
        return this;
    }

    /**
     * Returns one or more library standard values that match an external value
     * @param importedValue - External value
     * @returns {Feature | Feature[]} One or more of library standard values
     */
    get(importedValue) {
        if (this.valueMap.hasOwnProperty(importedValue)) {
            return this.valueMap[importedValue];
        }
        else {
            console.error('Cannot find a library value for "' + importedValue + '" unknown value.');
            // TODO: throw an error?

        }
    }
}

const languages = {
    type: 'language',
    latin: 'latin',
    greek: 'greek'
};

// Should have no spaces in values in order to be used in HTML templates
const types = {
    word: 'word',
    part: 'partOfSpeech', // Part of speech
    number: 'number',
    grmCase: 'case',
    declension: 'declension',
    gender: 'gender',
    type: 'type',
    frequency: 'frequency', // How frequent this word is
    meaning: 'meaning', // Meaning of a word
    source: 'source', // Source of word definition
    footnote: 'footnote' // A footnote for a word's ending (if ay)
};


/*
 Hierarchical structure:

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

class Inflection {
    constructor(stem, suffix, language) {
        "use strict";
        this.stem = stem;
        this.suffix = suffix;
        this.language = language;
    }

    /**
     * Data type can be an array or values
     * @param dataType Feature | Array of Features
     */
    set feature(dataType) {
        "use strict";
        // TODO: Check if dataType's language matches those of an inflection
        let feature = Feature.decompose(dataType);
        this[feature.type] = feature.value;
    }
}

class Lemma {
    constructor(word, language) {
        "use strict";
        this.word = word;
        this.language = language;
    }
}

class Lexeme {
    constructor(lemma, inflections) {
        "use strict";
        this.lemma = lemma;
        this.inflections = inflections;
    }
}

class Homonym {
    constructor (lexemes) {
        "use strict";
        this.lexemes = lexemes;
    }
}


class LanguageDataset {
    constructor(language) {
        "use strict";
        this.language = language;
        this.features = {}; // Grammatical feature types (definitions) that are supported by a specific language
        this.endings = [];
        this.footnotes = {};
    };

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
     * @param {string} ending
     * @param {Feature[]} featureTypes
     */
    addEnding(ending, ...featureTypes) {
        // TODO: implement run-time error checking
        let endingItem = new Ending(ending);

        // Build all possible combinations of features
        let multiValueFeatures = [];


        // Go through all features provided
        for (let feature of featureTypes) {

            // If this is a footnote. Footnotes should go in flat array, not in a list
            // because we don't need to split by them
            if (feature.type === types.footnote) {
                endingItem[types.footnote] = endingItem[types.footnote] || [];
                endingItem[types.footnote].push(feature.value);
                continue;
            }

            // If this ending has several grammatical feature values then they will be in an array
            if (Array.isArray(feature)) {

                if (feature.length > 0) {
                    // Store all multi-value features to create a separate copy of an ending for each of them
                    multiValueFeatures.push(feature);
                }
                else {
                    // Array is empty
                    console.warn('An empty array is provided as a feature argument to the "add" function, ignoring.');
                }
            }
            else {
                endingItem.features[feature.type] = feature.value;
            }
        }

        // Create a copy of an Ending object for each multi-value item
        if (multiValueFeatures.length > 0) {
            for (let featureValues of multiValueFeatures) {
                let endingItems = endingItem.split(featureValues);
                this.endings = this.endings.concat(endingItems);
            }
        }
        else {
            this.endings.push(endingItem);
        }
    };

    addFootnote(index, text) {
        this.footnotes[index] = text;
    };

    getSuffixes(homonym) {
        "use strict";
        let result = new ResultSet();
        let inflections = [];

        // Find partial matches first, and then full among them

        for (let lexema of homonym.lexemes) {
            for (let inflection of lexema.inflections) {
                inflections.push(inflection);
            }
        }
        result.endings = this.endings.filter(this['match'].bind(this, inflections));

        // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set();
        // Scan all selected endings to build a unique set of footnote indexes
        for (let ending of result.endings) {
            if (ending.hasOwnProperty(types.footnote)) {
                // Footnote indexes are stored in an array
                for (let index of ending[types.footnote]) {
                    footnotesIndex.add(index);
                }
            }
        }
        // Add footnote indexes and their texts to a result
        for (let index of footnotesIndex) {
            result.footnotes.push({index: index, text: this.footnotes[index]});
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

/**
 * Ending is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
class Ending {
    constructor(ending) {
        "use strict";
        this.ending = ending;
        this.features = {};
        this.featureGroups = {};
    }

    clone() {
        "use strict";
        let clone = new Ending(this.ending);
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
        return clone;
    };

    /**
     * Splits an ending that has multiple values of one or more grammatical features into an array of endings with
     * each ending having only a single value of those grammatical features.
     * @param {Feature[]} featureValues - Multiple grammatical feature values.
     * @returns {Ending[]} - An array of endings.
     */
    split(featureValues) {
        "use strict";
        let copy = this.clone();
        const type = featureValues[0].type;
        let values = [];
        featureValues.forEach(element => values.push(element.value));
        copy.features[type] = featureValues[0].value;
        copy.featureGroups[type] = values;
        let endingItems = [copy];
        for (let i = 1; i < featureValues.length; i++) {
            copy = this.clone();
            copy.features[type] = featureValues[i].value;
            copy.featureGroups[type] = values;
            endingItems.push(copy);
        }
        return endingItems;
    };

    /**
     * Checks if ending has a feature that is a match to the one provided.
     * @param featureType - A feature type we need to match with the ones stored inside the ending
     * @param featureValue - A feature value we need to match with the ones stored inside the ending
     * @returns {boolean} - If provided feature is a match or not
     */
    featureMatch(featureType, featureValue) {
        "use strict";
        if (this.features.hasOwnProperty(featureType)) {
            if (featureValue === this.features[featureType]) {
                return true;
            }
        }
        return false;
    }

    /**
     * Find feature groups in Ending.featureGroups that are the same between endings provided
     * @param endings
     */
    static getCommonGroups(endings) {
        "use strict";

        let features = Object.keys(endings[0].featureGroups);

        let commonGroups = features.filter( feature => {
            let result = true;
            for (let i=1; i<endings.length; i++) {
                result = result && endings[i].features.hasOwnProperty(feature);
            }
            return result;
        });
        return commonGroups;
    }

    /**
     * Finds out if an ending is in the same group with some other ending. The other ending is provided as a function argument.
     * Two endings are considered to be in the same group if they are:
     * a. Have at least one common group in featureGroups;
     * b. Have the same ending
     * c. Have values of all features the same except for those that belong to a common group(s)
     * d. Values of the common group features must be complementary. Here is an example:
     * Let's say a 'gender' group can have values such as 'masculine' and 'feminine'. Then endings will be combined
     * only if gender value of one ending is 'masculine' and the other value is 'feminine'. If both endings have the same
     * either 'masculine' or 'feminine' value, they sill not be combined as are not being complementary.
     * @param {Ending} ending - An other ending that we compare this ending with.
     * @returns {boolean} - True if both endings are in the same group, false otherwise.
     */
    isInSameGroupWith(ending) {
        "use strict";

        let commonGroups = Ending.getCommonGroups([this, ending]);
        if (commonGroups.length < 1) {
            // If elements do not have common groups in Ending.featureGroups then they are not in the same group
            return false;
        }

        let commonValues = {};
        commonGroups.forEach(feature => commonValues[feature] = new Set([this.features[feature]]));

        let result = true;
        result = result && this.ending === ending.ending;
        // If endings does not match don't check any further
        if (!result) {
            return false;
        }

        // Check all features to be a match, except those that are possible group values
        for (let feature of Object.keys(this.features)) {
            if (commonGroups.indexOf(feature)>=0) {
                commonValues[feature].add(ending.features[feature]);

                // Do not compare common groups
                continue;
            }
            result = result && this.features[feature] === ending.features[feature];
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
     * Combines endings that are in the same group together.
     * @param {Ending[]} endings - An array of endings to be combined.
     * @param {function} mergeFunction - A function that will merge two endings. It is presentation specific and is
     * define in a Presenter's View module. A function has two parameters each of Ending type. It returns a single
     * Ending object.
     * @returns {Ending[]} An array of endings with some items possibly combined together.
     */
    static combine(endings, mergeFunction) {
        "use strict";

        let matchFound = false;
        let matchIdx;

        do {
            matchFound = false;

            /*
            Go through an array of endings end compare each ending with each other (two-way compare) one time. \
            If items are in the same group, merge two endings, break out of a loop,
            and remove one matching ending (the second one) from an array.
            Then repeat on a modified array until no further matches found.
             */
            for (let i=0; i<endings.length; i++) {
                if (matchFound) {
                    continue;
                }
                for (let j=i+1; j < endings.length; j++) {
                    if (endings[i].isInSameGroupWith(endings[j])) {
                        matchIdx = j;
                        matchFound = true;
                        mergeFunction(endings[i], endings[j]);
                    }
                }
            }

            if (matchFound) {
                endings.splice(matchIdx, 1);
            }
        }
        while (matchFound);
        return endings;
    }
}

// Return value for inflection queries
class ResultSet {
    constructor() {
        "use strict";
        this.endings = [];
        this.footnotes = [];
    }
}

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

        this.languages = {
            add(providerValue, alpheiosValue) {
                "use strict";
                this[providerValue] = alpheiosValue;
            },

            getFrom(providerValue) {
                "use strict";
                return this[providerValue];
            }
        };
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
            if (!this[providerValue]) {
                console.warn("Skipping an unknown value '" + providerValue + "' of a grammatical feature '" + name + "' of " + language + " language of " +
                    serviceName + ' morphological service');
            }
            else {
                return this[providerValue];
            }

        };

        return this[name];
    }
}

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
const parts = dataSet.defineFeatureType(types.part, ['noun']);
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
const footnotes = dataSet.defineFeatureType(types.footnote);

// endregion Definition of grammatical features

dataSet.addSuffixes = function addSuffixes(data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        let features = [parts.noun, numbers.importer.csv.get(data[i][1]), cases.importer.csv.get(data[i][2]),
            declensions.importer.csv.get(data[i][3]), genders.importer.csv.get(data[i][4]), types$1.importer.csv.get(data[i][5])];
        if (data[i][6]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = data[i][6].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addEnding(data[i][0], ...features);
    }
};

dataSet.addFootnotes = function addFootnotes(data) {
    // Footnotes store not actual values, but their indexes
    //footnotes = this.defineIndexFeatureType(Lib.types.footnote, 1, data.length-1);

    // First row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(data[i][0], data[i][1]);
    }
};

dataSet.loadData = function loadData$$1() {
    return new Promise((resolve, reject) => {
        let suffixRequest = loadData("/lib/lang/latin/data/noun/suffixes.csv").catch( error => console.log(error));
        let footnoteRequest = loadData("/lib/lang/latin/data/noun/footnotes.csv").catch( error => console.log(error));

        let that = this;
        Promise.all([suffixRequest, footnoteRequest]).then(values => {
            let suffixes, footnotes;
            [suffixes, footnotes] = values;

            suffixes = Papa.parse(suffixes, {});
            that.addSuffixes(suffixes.data);

            footnotes = Papa.parse(footnotes, {});
            that.addFootnotes(footnotes.data);

            resolve();
        });
    });
};


// TODO: Implement match type. Add some real matching rules.
/**
 * Determines whether an ending will match inflections or not and what type of match that will be (exact, partial, etc.)
 * @param {Inflection[]} inflections - Inflections that are returned by a morphological service.
 * @param {Ending} ending - An ending we need to match inflections against.
 * @returns {boolean} Whether an ending is a match for inflections provided or not.
 */
dataSet.match = function match(inflections, ending) {
    "use strict";
    // All of those features must match between an inflection and an ending
    let obligatoryMatches = [types.part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [types.grmCase, types.declension, types.gender, types.number];

    let match = false;

    // TODO: filter out features of wrong type
    for (let inflection of inflections) {
        for (let feature of  obligatoryMatches) {
            if (!ending.featureMatch(feature, inflection[feature])) {
                return false;
            }
        }
        for (let feature of optionalMatches) {
            if (ending.featureMatch(feature, inflection[feature])) {
                match = true;
                return match;
            }
        }
    }
    return match;
};

let data = new LanguageData(languages.latin);

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, alpheiosValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(types.part)
    .add('noun', parts.noun);

data.addFeature(types.grmCase)
    .add('nominative', cases.nominative)
    .add('genetive', cases.genitive)
    .add('dative', cases.dative)
    .add('accusative', cases.accusative)
    .add('ablative', cases.ablative)
    .add('locative', cases.locative)
    .add('vocative', cases.vocative);

data.addFeature(types.declension)
    .add('1st', declensions.first)
    .add('2nd', declensions.second)
    .add('3rd', declensions.third)
    .add('4th', declensions.fourth)
    .add('5th', declensions.fifth);

data.addFeature(types.number)
    .add('singular', numbers.singular)
    .add('plural', numbers.plural);

data.addFeature(types.gender)
    .add('masculine', genders.masculine)
    .add('feminine', genders.feminine)
    .add('neuter', genders.neuter)
    .add('common', [genders.masculine, genders.feminine]);

let maService = new Service('Tufts');
// Set a language conversion map for this specific service
maService.languages.add('lat', languages.latin);
// Load Latin language data for this specific service
maService.setLanguageData(data);


/**
 * A function that maps a morphological service's specific data types and values into an inflection library standard.
 * @param {object} jsonObj - A JSON data from a Morphological Analyzer.
 * @returns {Homonym} A library standard Homonym object.
 */
let transform = function(jsonObj) {
    "use strict";
    let lexemes = [];
    for (let lexeme of jsonObj.RDF.Annotation.Body) {
        let lemma = new Lemma(lexeme.rest.entry.dict.hdwd.$, maService.languages.getFrom(lexeme.rest.entry.dict.hdwd.lang));
        let inflections = [];
        for (let data$$1 of lexeme.rest.entry.infl) {
            let inflection = new Inflection(data$$1.term.stem.$, data$$1.term.suff.$, maService.languages.getFrom(lexeme.rest.entry.dict.hdwd.lang));
            inflection.feature = maService.latin[types.part].get(data$$1.pofs.$);
            inflection.feature = maService.latin[types.grmCase].get(data$$1.case.$);
            inflection.feature = maService.latin[types.declension].get(data$$1.decl.$);
            inflection.feature = maService.latin[types.number].get(data$$1.num.$);
            inflection.feature = maService.latin[types.gender].get(data$$1.gend.$);
            inflections.push(inflection);
        }
        lexemes.push(new Lexeme(lemma, inflections));
    }
    return new Homonym(lexemes);
};

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['noun-declension/noun-declension'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <!-- Gender -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <tr class=\"inflection-table__row\">\r\n                    <td class=\"inflection-table__cell\">Declension Stem</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tr>\r\n                <tr class=\"inflection-table__row\">\r\n                    <td class=\"inflection-table__cell\">Gender</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tr>\r\n                <tr class=\"inflection-table__row\">\r\n                    <td class=\"inflection-table__cell\">Type</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tr>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <!-- Declension -->\r\n                        <td class=\"inflection-table__cell\"  colspan=\"4\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data}) : helper)))
    + "</td>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <!-- Declension -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <!-- Gender -->\r\n                            <td class=\"inflection-table__cell\" colspan=\"2\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data}) : helper)))
    + "</td>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <!-- Declension -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <!-- Gender -->\r\n                            <td class=\"inflection-table__cell\" colspan=\"2\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </td>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                                    <!-- Type -->\r\n                                    "
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "&nbsp;|&nbsp;";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <!-- Gender -->\r\n        <tr class=\"inflection-table__row\"><td class=\"inflection-table__cell\" colspan=\"31\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</td></tr>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <!-- Case -->\r\n            <tr class=\"inflection-table__row\">\r\n                <td class=\"inflection-table__cell inflection-table__cell--case-title\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </tr>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <!-- Declension -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <!-- Gender -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <!-- Type -->\r\n                            <td class=\"inflection-table__cell\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </td>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "                                    <!-- Endings -->\r\n                                    <a class=\"inflection-table__ending\" title=\""
    + alias4(((helper = (helper = helpers.ending || (depth0 != null ? depth0.ending : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ending","hash":{},"data":data}) : helper)))
    + ", pos: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.partOfSpeech : stack1), depth0))
    + ", num: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.number : stack1), depth0))
    + ", case: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1["case"] : stack1), depth0))
    + ", decl: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.declension : stack1), depth0))
    + ", gend: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.gender : stack1), depth0))
    + ", type: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.type : stack1), depth0))
    + "\">"
    + alias4(((helper = (helper = helpers.ending || (depth0 != null ? depth0.ending : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ending","hash":{},"data":data}) : helper)))
    + "&nbsp;"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.footnote : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</a>"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper;

  return "["
    + container.escapeExpression(((helper = (helper = helpers.footnote || (depth0 != null ? depth0.footnote : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"footnote","hash":{},"data":data}) : helper)))
    + "]";
},"23":function(container,depth0,helpers,partials,data) {
    return "&nbsp;,&nbsp;";
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <span><strong>"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + ":</strong> "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</span><br>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<table class=\"inflection-table\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.endings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.endings : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>\r\n\r\n<br>\r\n<br>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.footnotes : depth0),{"name":"each","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();

/**
 * A name of a template as auto generated by Handlebars compiler
 */
let templateName = 'noun-declension/noun-declension';

/**
 * These values are used to define sorting and grouping order. 'featureOrder' determine a sequence in which
 * feature will be used for sorting. The same sequence will be used to group items when building a view matrix.
 * All feature types has a default sort order. This order is defined by a sequence of feature values provided
 * as arguments to each feature type constructor. However, this can be overriden here, as shown by the 'gender'
 * example. If endings with several values must be combines, such values can be provided within an array,
 * as shown by 'masculine' and 'feminine' values.
 */
let genderFeature = genders;
genderFeature.order = [[genders.masculine, genders.feminine], genders.neuter];
let featureOrder = [numbers, cases, declensions, genderFeature, types$1];

/**
 * Returns true if an ending grammatical feature defined by featureType has value that is listed in featureValues array.
 * This function is for use with Array.prototype.filter().
 * @param {FeatureType} featureType - a grammatical feature type we need to filter on
 * @param {Feature[]} featureValues - a list of possible values of a type specified by featureType that
 * this ending should have
 * @param {Ending} ending - an ending we need to filter out
 * @returns {boolean}
 */
let filter = function filter(featureType, featureValues, ending) {
    "use strict";

    // If not an array, convert it to array for uniformity
    if (!Array.isArray(featureValues)) {
        featureValues = [featureValues];
    }
    for (const value of featureValues) {
        if (ending.features[featureType] === value) {
            return true;
        }
    }

    return false;
};

/**
 * This function provide a view-specific logic that is used to merge two endings together when they are combined.
 * @param {Ending} endingA - A first of two endings to merge (to be returned).
 * @param {Ending} endingB - A second ending to merge (to be discarded).
 * @returns {Ending} A modified value of ending A.
 */
let merge = function merge(endingA, endingB) {
    let commonGroups = Ending.getCommonGroups([endingA, endingB]);
    for (let type of commonGroups) {
        // Combine values using a comma separator. Can do anything else if we need to.
        endingA.features[type] = endingA.features[type] + ', ' + endingB.features[type];
    }
    return endingA;
};

/**
 * A recursive function that organizes endings by features from a groupFeatures list into a multi-dimensional
 * array. Each of levels of this array corresponds to a feature from a groupFeatures list.
 * @param {Ending[]} endings - A list of endings.
 * @param {FeatureType[]} groupFeatures - A list of feature types to be used for grouping.
 * @param {function} mergeFunction - A function that merges two endings together.
 * @param {number} currentLevel - A recursion level, used to stop recursion.
 * @returns {Ending[]} Endings grouped into a multi-dimensional array.
 */
let groupByFeature = function groupByFeature(endings, groupFeatures, mergeFunction, currentLevel = 0) {
    let feature = groupFeatures[currentLevel];
    let grouped = [];
    for (const featureValue of feature.orderIndex) {
        let result = {
            type: feature.type,
            value: featureValue
        };
        let selected = endings.filter(filter.bind(this, feature.type, featureValue));
        if (currentLevel < groupFeatures.length - 1) {
            // Split more
            selected = groupByFeature(selected, groupFeatures, mergeFunction, currentLevel + 1);
        }
        else {
            // This is the last level
            // Split result has a list of endings in a table cell. We can now combine duplicated items if we want
            if (selected.length >0) {
                selected = Ending.combine(selected, mergeFunction);
            }

        }
        result.data = selected;
        grouped.push(result);
    }
    return grouped;
};

/**
 * Converts a ResultSet, returned from inflection tables library, into an HTML representation of an inflection table.
 * @param {ResultSet} resultSet - A result set from inflection tables library.
 * @returns {string} HTML code representing an inflection table.
 */
let render$1 = function data(resultSet) {
    "use strict";

    // We can sort endings if we need to
    //let sorted = resultSet.endings.sort(compare.bind(this, featureOrder));

    // Create data structure for a template
    let displayData = {};

    displayData.endings = groupByFeature(resultSet.endings, featureOrder, merge);
    displayData.footnotes = resultSet.footnotes;

    return Handlebars.templates[templateName](displayData);
};

/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
let render = function render(resultSet) {
    "use strict";

    return render$1(resultSet);
};

// Import shared language data
// Export for testing
//export {langData};

let testJSON1 = {
    "RDF": {
        "Annotation": {
            "about": "urn:TuftsMorphologyService:cupidinibus:whitakerLat",
            "creator": {
                "Agent": {
                    "about": "net.alpheios:tools:wordsxml.v1"
                }
            },
            "created": {
                "$": "2017-08-10T23:15:29.185581"
            },
            "hasTarget": {
                "Description": {
                    "about": "urn:word:cupidinibus"
                }
            },
            "title": {},
            "hasBody": [
                {
                    "resource": "urn:uuid:idm140578094883136"
                },
                {
                    "resource": "urn:uuid:idm140578158026160"
                }
            ],
            "Body": [
                {
                    "about": "urn:uuid:idm140578094883136",
                    "type": {
                        "resource": "cnt:ContentAsXML"
                    },
                    "rest": {
                        "entry": {
                            "infl": [
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 2,
                                        "$": "locative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "masculine"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 5,
                                        "$": "dative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "masculine"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 3,
                                        "$": "ablative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "masculine"
                                    }
                                }
                            ],
                            "dict": {
                                "hdwd": {
                                    "lang": "lat",
                                    "$": "Cupido, Cupidinis"
                                },
                                "pofs": {
                                    "order": 5,
                                    "$": "noun"
                                },
                                "decl": {
                                    "$": "3rd"
                                },
                                "gend": {
                                    "$": "masculine"
                                },
                                "area": {
                                    "$": "religion"
                                },
                                "freq": {
                                    "order": 4,
                                    "$": "common"
                                },
                                "src": {
                                    "$": "Ox.Lat.Dict."
                                }
                            },
                            "mean": {
                                "$": "Cupid, son of Venus; personification of carnal desire;"
                            }
                        }
                    }
                },
                {
                    "about": "urn:uuid:idm140578158026160",
                    "type": {
                        "resource": "cnt:ContentAsXML"
                    },
                    "rest": {
                        "entry": {
                            "infl": [
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 2,
                                        "$": "locative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "common"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 5,
                                        "$": "dative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "common"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 3,
                                        "$": "ablative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "common"
                                    }
                                }
                            ],
                            "dict": {
                                "hdwd": {
                                    "lang": "lat",
                                    "$": "cupido, cupidinis"
                                },
                                "pofs": {
                                    "order": 5,
                                    "$": "noun"
                                },
                                "decl": {
                                    "$": "3rd"
                                },
                                "gend": {
                                    "$": "common"
                                },
                                "freq": {
                                    "order": 5,
                                    "$": "frequent"
                                },
                                "src": {
                                    "$": "Ox.Lat.Dict."
                                }
                            },
                            "mean": {
                                "$": "desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;"
                            }
                        }
                    }
                }
            ]
        }
    }
};

// Inserts rendered view to the specific element of the web page
let show = function show(html, whereSel) {
    "use strict";
    let selector = document.querySelector(whereSel);
    selector.innerHTML = html;
};


console.log('Sequence started');

//import * as PapaParse from './lib/support/papaparse-4.3.2/papaparse.js';
/*PapaParse.Papa.parse(fileInput.files[0], {
    complete: function(results) {
        console.log(results);
    }
});*/

// Transform Morphological Analyzer's response into a library standard Homonym object
let result = transform(testJSON1);

// Load Latin language data
let langData = dataSet;

dataSet.loadData().then(function() {
    // Get matching suffixes from an inflection library
    let suffixes = langData.getSuffixes(result);

// Make Presenter build a view's HTML
    let html = render(suffixes);

// Insert rendered view to a page
    show(html, '#id-inflections-table');

    console.log('Sequence finished');
});

})));
//# sourceMappingURL=inflection-tables.js.map
