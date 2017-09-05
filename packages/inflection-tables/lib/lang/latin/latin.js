/*
 * Latin language data module
 */
export {language, parts, numbers, cases, declensions, genders, types, dataSet};
import * as Lib from "../../lib.js";
import nounSuffixesCSV from './data/noun/suffixes.csv';
import nounFootnotesCSV from './data/noun/footnotes.csv';

/*
CommonJS module below should be used exactly as specified, or it will result in incorrect import due to the bug in
rollup-plugin-commonjs, see https://github.com/rollup/rollup-plugin-commonjs/issues/200
*/
import papaparse from "../../support/papaparse-4.3.2/papaparse.js";

// A language of this module
const language = Lib.languages.latin;
// Create a language data set that will keep all language-related information
let dataSet = new Lib.LanguageDataset(language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
const parts = dataSet.defineFeatureType(Lib.types.part, ['noun']);
const numbers = dataSet.defineFeatureType(Lib.types.number, ['singular', 'plural']);
numbers.addImporter(importerName)
    .map('singular', numbers.singular)
    .map('plural', numbers.plural);
const cases = dataSet.defineFeatureType(Lib.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative']);
cases.addImporter(importerName)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('ablative', cases.ablative)
    .map('locative', cases.locative)
    .map('vocative', cases.vocative);
const declensions = dataSet.defineFeatureType(Lib.types.declension, ['first', 'second', 'third', 'fourth', 'fifth']);
declensions.addImporter(importerName)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('3rd', declensions.third)
    .map('4th', declensions.fourth)
    .map('5th', declensions.fifth);
const genders = dataSet.defineFeatureType(Lib.types.gender, ['masculine', 'feminine', 'neuter']);
genders.addImporter(importerName)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types = dataSet.defineFeatureType(Lib.types.type, ['regular', 'irregular']);
types.addImporter(importerName)
    .map('regular', types.regular)
    .map('irregular', types.irregular);
const footnotes = dataSet.defineFeatureType(Lib.types.footnote, []);

// endregion Definition of grammatical features

dataSet.addSuffixes = function addSuffixes(data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        let features = [parts.noun, numbers.importer.csv.get(data[i][1]), cases.importer.csv.get(data[i][2]),
            declensions.importer.csv.get(data[i][3]), genders.importer.csv.get(data[i][4]), types.importer.csv.get(data[i][5])];
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
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(data[i][0], data[i][1]);
    }
};

dataSet.loadData = function loadData() {
    let suffixes = papaparse.parse(nounSuffixesCSV, {});
    console.log('Suffixes ', suffixes);


    return new Promise((resolve, reject) => {
        let suffixRequest = Lib.loadData("/lib/lang/latin/data/noun/suffixes.csv");
        let footnoteRequest = Lib.loadData("/lib/lang/latin/data/noun/footnotes.csv");

        let that = this;
        Promise.all([suffixRequest, footnoteRequest]).then(values => {
            let suffixes, footnotes;
            [suffixes, footnotes] = values;

            suffixes = papaparse.parse(suffixes, {});
            that.addSuffixes(suffixes.data);

            footnotes = papaparse.parse(footnotes, {});
            that.addFootnotes(footnotes.data);

            resolve();
        }).catch(reason => {
            reject(reason);
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
    let obligatoryMatches = [Lib.types.part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [Lib.types.grmCase, Lib.types.declension, Lib.types.gender, Lib.types.number];

    let matchFound = false;

    // TODO: filter out features of wrong type
    for (let inflection of inflections) {
        for (let feature of  obligatoryMatches) {
            if (!ending.featureMatch(feature, inflection[feature])) {
                return false;
            }
        }
        for (let feature of optionalMatches) {
            if (ending.featureMatch(feature, inflection[feature])) {
                matchFound = true;
                return matchFound;
            }
        }
    }
    return matchFound;
};

