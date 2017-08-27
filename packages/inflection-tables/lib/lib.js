/**
 * Shared data structures and functions
 */
export {Feature, FeatureType, IndexFeatureType, languages, types, Homonym, Lexeme, Lemma, Inflection, LanguageDataset, Ending, ResultSet};


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
 * Definition class for a grammatical feature. Stores type information and all possible values of the feature.
 * It serves as a feature generator. It generates a Feature object each time a property that corresponds to
 * a feature value is called
 */
class FeatureType {
    // TODO: value checking
    constructor(type, values, language) {
        this.type = type;
        this.language = language;

        this._orderIndex = [];
        /*
         This is a sort order index for a grammatical feature values. It is determined by the order of values in
         a 'values' array.
         */
        this._orderLookup = {};

        for (const [index, value] of values.entries()) {
            this._orderIndex.push(value);
            this[value] = new Feature(value, this.type, this.language);
            this._orderLookup[value] = index;
        }
    };

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
 * Generates a Feature object that holds index as a value. indexMin and indexMax specifies possible index range.
 */
class IndexFeatureType {
    constructor (type, indexMin, indexMax, language) {
        this.type = type;
        this.language = language;
        for (let index = indexMin; index <= indexMax; index++) {
            this[index] = new Feature(index, this.type, this.language);
        }
    };
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

    defineIndexFeatureType(type, indexMin, indexMax) {
        "use strict";
        this.features[type] = new IndexFeatureType(types.footnote, indexMin, indexMax, this.language);
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
        for (var feature of featureTypes) {

            // If this is a footnote
            if (feature.type === types.footnote) {
                if (!Array.isArray(feature)) {
                    feature = [feature];
                }

                endingItem[types.footnote] = [];
                for (let value of feature) {
                    endingItem[types.footnote].push(value.value);
                }
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
                    console.warn('An empty array is provided as a feature argument to the "add" function, ignoring.')
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
            result = result && commonValues[feature].size === 2
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