/*
 * Latin language data module
 */
export {language, parts, numbers, cases, declensions, genders, types, footnotes, dataSet};
import * as Alpheios from "../lib.js"

// A language of this module
const language = Alpheios.languages.latin;
// Create a language data set that will keep all language-related information
let dataSet = new Alpheios.InflectionsLanguageData(language);

// Define grammatical features of a language
const parts = new Alpheios.FeatureType(Alpheios.types.part, ['noun'], language);
const numbers = new Alpheios.FeatureType(Alpheios.types.number, ['singular', 'plural'], language);
const cases = new Alpheios.FeatureType(Alpheios.types.grmCase, ['nominative', 'genetive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'], language);
const declensions = new Alpheios.FeatureType(Alpheios.types.declension, ['first', 'second', 'third', 'fourth', 'fifth'], language);
const genders = new Alpheios.FeatureType(Alpheios.types.gender, ['masculine', 'feminine', 'neuter'], language);
const types = new Alpheios.FeatureType(Alpheios.types.type, ['regular', 'irregular'], language);

// Define footnotes
dataSet.footnotes.add(7, 'may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.');
dataSet.footnotes.add(13, 'may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.');
dataSet.footnotes.add(101, 'may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.');

// Create a convenience wrapper for passing footnote index to an endings object
const footnotes = new Alpheios.InflectionsFootnotesType(Alpheios.types.part.footnote, dataSet.footnotes.items, language);

// Nouns
dataSet.endings.add('a', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.regular);
dataSet.endings.add('ē', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.irregular);
dataSet.endings.add('ēs', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.irregular);
dataSet.endings.add('ā', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.irregular, footnotes[7]);

// region Test values only
// endregion Test values only



