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
        this.addSuffix(data[i][0], ...features);
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
    this.addSuffixes(suffixes.data);
    let footnotes = papaparse.parse(nounFootnotesCSV, {});
    this.addFootnotes(footnotes.data);
};


/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - A suffix to be matched with inflections.
 * @returns {Suffix | undefined} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns undefined.
 */
dataSet.matcher = function match(inflections, suffix) {
    "use strict";
    // All of those features must match between an inflection and an ending
    let obligatoryMatches = [Lib.types.part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [Lib.types.grmCase, Lib.types.declension, Lib.types.gender, Lib.types.number];


    let bestMatchData; // Information about the best match found

    /*
     There can be a one-to-one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
        let matchData = new Lib.MatchData(); // Create a match profile
        let matchedFeatures = new Set();

        if (inflection.suffix === suffix.suffix) {
           matchData.suffixMatch = true;
        }

        let matchFound = true; // Let's see if it will keep this way
        for (let feature of  obligatoryMatches) {
            let featureMatch = !!suffix.featureMatch(feature, inflection[feature]);
            matchFound = matchFound && featureMatch;

            if (featureMatch) {
                // Inflection's value of this feature is matching the on of the suffix
                matchedFeatures.add(feature);
            }
            else {
                // Obligatory match is not found, there is no reason to check other items
                break;
            }
        }

        if (matchFound) {
            // If obligatory match requirement is fulfilled we can check features with optional
            // match requirements to see if it's a full match
            matchData.fullFeatureMatch = true; // Will it keep this way?
            for (let feature of optionalMatches) {
                let matchedValue = suffix.featureMatch(feature, inflection[feature]);
                matchData.fullFeatureMatch = matchData.fullFeatureMatch && !!matchedValue;
                if (matchedValue) {
                    matchedFeatures.add(feature);
                }
            }
        }

        if (matchFound) {
            matchData.matchedFeatures = Array.from(matchedFeatures);
            if (!bestMatchData) {
                // If no match data is saved yet, store the current one as the best match
                bestMatchData = matchData;
                continue;
            }

            // Store match data only if a current one is better than the previous best match.
            if (bestMatchData.fullFeatureMatch === false) {

                if (matchData.fullFeatureMatch === true) {
                    // If a full match is found, it will always replace a partial match.
                    bestMatchData = matchData;
                }
                else if (matchData.matchedFeatures.length > bestMatchData.matchedFeatures.length) {
                    bestMatchData = matchData;
                }
            }
        }
    }
    if (bestMatchData) {
        // Some match is found
        suffix.match = bestMatchData;
        return suffix;
    }
    else {
        return undefined;
    }
};

