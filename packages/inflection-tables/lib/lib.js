/**
 * Shared data structures and functions
 */
export {Feature, FeatureType, languages, types, inflections, InflectionsLanguageData, InflectionsEndings, InflectionsFootnotes, InflectionsFootnotesType, InflectionsResultSet}


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
            let item = this.footnotes.items[index];
            result.footnotes.push({index: index, text: this.footnotes.items[index]});
        }
        // Sort footnotes according to their index numbers
        result.footnotes.sort( (a, b) => parseInt(a.index) - parseInt(b.index) );

        return result;
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
        this.endings.push(endingItem)
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