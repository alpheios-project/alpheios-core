/*
 * Latin language data module
 */
export {language, parts, numbers, cases, declensions, genders, types, footnotes, dataSet};
import * as Alpheios from "../lib.js"

// A language of this module
const language = Alpheios.languages.latin;
// Create a language data set that will keep all language-related information
let dataSet = new Alpheios.LanguageDataset(language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const parts = dataSet.defineFeatureType(Alpheios.types.part, ['noun']);
const numbers = dataSet.defineFeatureType(Alpheios.types.number, ['singular', 'plural']);
const cases = dataSet.defineFeatureType(Alpheios.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative']);
const declensions = dataSet.defineFeatureType(Alpheios.types.declension, ['first', 'second', 'third', 'fourth', 'fifth']);
const genders = dataSet.defineFeatureType(Alpheios.types.gender, ['masculine', 'feminine', 'neuter']);
const types = dataSet.defineFeatureType(Alpheios.types.type, ['regular', 'irregular']);
// Footnotes store not actual values, but their indexes
const footnotes = dataSet.defineIndexFeatureType(Alpheios.types.footnote, 1, 18);
// endregion Definition of grammatical features

// Define footnotes
dataSet.addFootnote(1, 'archaic (final s and m of os and om may be omitted in inscriptions)');
dataSet.addFootnote(2, 'only in familiās');
dataSet.addFootnote(3, 'especially in Greek patronymics and compounds in -gena and -cola.');
dataSet.addFootnote(4, 'always in deābus and filiābus; rarely with other words to distinguish the female');
dataSet.addFootnote(5, 'archaic');
dataSet.addFootnote(6, 'rare');
dataSet.addFootnote(7, 'may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.');
dataSet.addFootnote(8, 'proper names in ius and filius and genius');
dataSet.addFootnote(9, 'poetic');
dataSet.addFootnote(10, 'only pelagus, vīrus, and sometimes vulgus');
dataSet.addFootnote(11, 'may occur with i-stems');
dataSet.addFootnote(12, 'several nouns (most commonly domus) show forms of both second and fourth declensions');
dataSet.addFootnote(13, 'some nouns also have forms from the first declension (eg materia, saevitia) or the third declension (eg requiēs, satiēs, plēbēs, famēs)');
dataSet.addFootnote(14, 'Always in partus and tribus, usually in artus and lacus, sometimes in other words, eg portus and specus');
dataSet.addFootnote(15, 'Often in names of plants and trees and in nouns ending in -tus');
dataSet.addFootnote(16, 'When pronounced as one syllable');
dataSet.addFootnote(17, 'early');
dataSet.addFootnote(18, 'dies and meridies are masculine');


// region Nouns
// genders[masculine, feminine]
dataSet.addEnding('a', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('ē', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.irregular);
dataSet.addEnding('ēs', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.irregular);
dataSet.addEnding('ā', parts.noun, numbers.singular, cases.nominative, declensions.first, genders.feminine, types.irregular, footnotes[7]);

dataSet.addEnding('us', parts.noun, numbers.singular, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('er', parts.noun, numbers.singular, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ir', parts.noun, numbers.singular, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('-', parts.noun, numbers.singular, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.irregular);
dataSet.addEnding('os', parts.noun, numbers.singular, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[1]);
dataSet.addEnding('ōs', parts.noun, numbers.singular, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.irregular);
dataSet.addEnding('ō', parts.noun, numbers.singular, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('um', parts.noun, numbers.singular, cases.nominative, declensions.second, genders.neuter, types.regular);
dataSet.addEnding('us', parts.noun, numbers.singular, cases.nominative, declensions.second, genders.neuter, types.irregular, footnotes[10]);
dataSet.addEnding('on', parts.noun, numbers.singular, cases.nominative, declensions.second, genders.neuter, types.irregular, footnotes[7]);

dataSet.addEnding('-', parts.noun, numbers.singular, cases.nominative, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('os', parts.noun, numbers.singular, cases.nominative, declensions.third, [genders.masculine, genders.feminine], types.irregular);
dataSet.addEnding('ōn', parts.noun, numbers.singular, cases.nominative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);


dataSet.addEnding('-', parts.noun, numbers.singular, cases.nominative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('us', parts.noun, numbers.singular, cases.nominative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.nominative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.singular, cases.nominative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('ae', parts.noun, numbers.singular, cases.genitive, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('āī', parts.noun, numbers.singular, cases.genitive, declensions.first, genders.feminine, types.irregular, footnotes[1]);
dataSet.addEnding('ās', parts.noun, numbers.singular, cases.genitive, declensions.first, genders.feminine, types.irregular, footnotes[2]);
dataSet.addEnding('ēs', parts.noun, numbers.singular, cases.genitive, declensions.first, genders.feminine, types.irregular, footnotes[7]);

dataSet.addEnding('ī', parts.noun, numbers.singular, cases.genitive, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ō', parts.noun, numbers.singular, cases.genitive, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('ī', parts.noun, numbers.singular, cases.genitive, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('is', parts.noun, numbers.singular, cases.genitive, declensions.third, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('is', parts.noun, numbers.singular, cases.genitive, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('ūs', parts.noun, numbers.singular, cases.genitive, declensions.fourth, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('uis', parts.noun, numbers.singular, cases.genitive, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[1]);
dataSet.addEnding('uos', parts.noun, numbers.singular, cases.genitive, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[1]);
dataSet.addEnding('ī', parts.noun, numbers.singular, cases.genitive, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[15]);

dataSet.addEnding('ūs', parts.noun, numbers.singular, cases.genitive, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēī', parts.noun, numbers.singular, cases.genitive, declensions.fifth, genders.feminine, types.regular);
dataSet.addEnding('eī', parts.noun, numbers.singular, cases.genitive, declensions.fifth, genders.feminine, types.regular);
dataSet.addEnding('ī', parts.noun, numbers.singular, cases.genitive, declensions.fifth, genders.feminine, types.irregular);
dataSet.addEnding('ē', parts.noun, numbers.singular, cases.genitive, declensions.fifth, genders.feminine, types.irregular);
dataSet.addEnding('ēs', parts.noun, numbers.singular, cases.genitive, declensions.fifth, genders.feminine, types.irregular, footnotes[6]);

dataSet.addEnding('ae', parts.noun, numbers.singular, cases.dative, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('āī', parts.noun, numbers.singular, cases.dative, declensions.first, genders.feminine, types.irregular, footnotes[1]);

dataSet.addEnding('ō', parts.noun, numbers.singular, cases.dative, declensions.second, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ō', parts.noun, numbers.singular, cases.dative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('ī', parts.noun, numbers.singular, cases.dative, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('e', parts.noun, numbers.singular, cases.dative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[17]);

dataSet.addEnding('ī', parts.noun, numbers.singular, cases.dative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('ūī', parts.noun, numbers.singular, cases.dative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ū', parts.noun, numbers.singular, cases.dative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.dative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēī', parts.noun, numbers.singular, cases.dative, declensions.fifth, genders.feminine, types.regular);
dataSet.addEnding('eī', parts.noun, numbers.singular, cases.dative, declensions.fifth, genders.feminine, types.regular);
dataSet.addEnding('ī', parts.noun, numbers.singular, cases.dative, declensions.fifth, genders.feminine, types.irregular);
dataSet.addEnding('ē', parts.noun, numbers.singular, cases.dative, declensions.fifth, genders.feminine, types.irregular, footnotes[6]);

dataSet.addEnding('am', parts.noun, numbers.singular, cases.accusative, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('ēn', parts.noun, numbers.singular, cases.accusative, declensions.first, genders.feminine, types.irregular);
dataSet.addEnding('ān', parts.noun, numbers.singular, cases.accusative, declensions.first, genders.feminine, types.irregular, footnotes[7]);

dataSet.addEnding('um', parts.noun, numbers.singular, cases.accusative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('om', parts.noun, numbers.singular, cases.accusative, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[1]);
dataSet.addEnding('ōn', parts.noun, numbers.singular, cases.accusative, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('um', parts.noun, numbers.singular, cases.accusative, declensions.second, genders.neuter, types.regular);
dataSet.addEnding('us', parts.noun, numbers.singular, cases.accusative, declensions.second, genders.neuter, types.irregular, footnotes[10]);
dataSet.addEnding('on', parts.noun, numbers.singular, cases.accusative, declensions.second, genders.neuter, types.irregular, footnotes[7]);

dataSet.addEnding('em', parts.noun, numbers.singular, cases.accusative, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('im', parts.noun, numbers.singular, cases.accusative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[11]);
dataSet.addEnding('a', parts.noun, numbers.singular, cases.accusative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('-', parts.noun, numbers.singular, cases.accusative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('um', parts.noun, numbers.singular, cases.accusative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.accusative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('em', parts.noun, numbers.singular, cases.accusative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('ā', parts.noun, numbers.singular, cases.ablative, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('ād', parts.noun, numbers.singular, cases.ablative, declensions.first, genders.feminine, types.irregular, footnotes[5]);
dataSet.addEnding('ē', parts.noun, numbers.singular, cases.ablative, declensions.first, genders.feminine, types.irregular, footnotes[7]);

dataSet.addEnding('ō', parts.noun, numbers.singular, cases.ablative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ōd', parts.noun, numbers.singular, cases.ablative, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[1]);

dataSet.addEnding('ō', parts.noun, numbers.singular, cases.ablative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('e', parts.noun, numbers.singular, cases.ablative, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ī', parts.noun, numbers.singular, cases.ablative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[11]);

dataSet.addEnding('e', parts.noun, numbers.singular, cases.ablative, declensions.third, genders.neuter, types.regular);
dataSet.addEnding('ī', parts.noun, numbers.singular, cases.ablative, declensions.third, genders.neuter, types.irregular, footnotes[11]);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.ablative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ūd', parts.noun, numbers.singular, cases.ablative, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[1]);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.ablative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ē', parts.noun, numbers.singular, cases.ablative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('ae', parts.noun, numbers.singular, cases.locative, declensions.first, genders.feminine, types.regular);

dataSet.addEnding('ō', parts.noun, numbers.singular, cases.locative, declensions.second, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ō', parts.noun, numbers.singular, cases.locative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('e', parts.noun, numbers.singular, cases.locative, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ī', parts.noun, numbers.singular, cases.locative, declensions.third, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ī', parts.noun, numbers.singular, cases.locative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.locative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.locative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ē', parts.noun, numbers.singular, cases.locative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('a', parts.noun, numbers.singular, cases.vocative, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('ē', parts.noun, numbers.singular, cases.vocative, declensions.first, genders.feminine, types.irregular);
dataSet.addEnding('ā', parts.noun, numbers.singular, cases.vocative, declensions.first, genders.feminine, types.irregular, footnotes[7]);

dataSet.addEnding('e', parts.noun, numbers.singular, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('er', parts.noun, numbers.singular, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ir', parts.noun, numbers.singular, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('-', parts.noun, numbers.singular, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.irregular);
dataSet.addEnding('ī', parts.noun, numbers.singular, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[8]);
dataSet.addEnding('ōs', parts.noun, numbers.singular, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.irregular);
dataSet.addEnding('e', parts.noun, numbers.singular, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('um', parts.noun, numbers.singular, cases.vocative, declensions.second, genders.neuter, types.regular);
dataSet.addEnding('on', parts.noun, numbers.singular, cases.vocative, declensions.second, genders.neuter, types.irregular, footnotes[7]);

dataSet.addEnding('-', parts.noun, numbers.singular, cases.vocative, declensions.third, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('-', parts.noun, numbers.singular, cases.vocative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('us', parts.noun, numbers.singular, cases.vocative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ū', parts.noun, numbers.singular, cases.vocative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.singular, cases.vocative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('ae', parts.noun, numbers.plural, cases.nominative, declensions.first, genders.feminine, types.regular);

dataSet.addEnding('ī', parts.noun, numbers.plural, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('oe', parts.noun, numbers.plural, cases.nominative, declensions.second, [genders.masculine, genders.feminine], types.irregular, [footnotes[7], footnotes[9]]);

dataSet.addEnding('a', parts.noun, numbers.plural, cases.nominative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.plural, cases.nominative, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('es', parts.noun, numbers.plural, cases.nominative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('a', parts.noun, numbers.plural, cases.nominative, declensions.third, genders.neuter, types.regular);
dataSet.addEnding('ia', parts.noun, numbers.plural, cases.nominative, declensions.third, genders.neuter, types.irregular, footnotes[11]);

dataSet.addEnding('ūs', parts.noun, numbers.plural, cases.nominative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ua', parts.noun, numbers.plural, cases.nominative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.plural, cases.nominative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('ārum', parts.noun, numbers.plural, cases.genitive, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('um', parts.noun, numbers.plural, cases.genitive, declensions.first, genders.feminine, types.irregular, footnotes[3]);

dataSet.addEnding('ōrum', parts.noun, numbers.plural, cases.genitive, declensions.second, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('um', parts.noun, numbers.plural, cases.genitive, declensions.second, [genders.masculine, genders.feminine], types.irregular);
dataSet.addEnding('om', parts.noun, numbers.plural, cases.genitive, declensions.second, [genders.masculine, genders.feminine], types.irregular, footnotes[8]);

dataSet.addEnding('ōrum', parts.noun, numbers.plural, cases.genitive, declensions.second, genders.neuter, types.regular);
dataSet.addEnding('um', parts.noun, numbers.plural, cases.genitive, declensions.second, genders.neuter, types.irregular);

dataSet.addEnding('um', parts.noun, numbers.plural, cases.genitive, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ium', parts.noun, numbers.plural, cases.genitive, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[11]);
dataSet.addEnding('ōn', parts.noun, numbers.plural, cases.genitive, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('um', parts.noun, numbers.plural, cases.genitive, declensions.third, genders.neuter, types.regular);
dataSet.addEnding('ium', parts.noun, numbers.plural, cases.genitive, declensions.third, genders.neuter, types.irregular, footnotes[11]);

dataSet.addEnding('uum', parts.noun, numbers.plural, cases.genitive, declensions.fourth, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('um', parts.noun, numbers.plural, cases.genitive, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[16]);
dataSet.addEnding('uom', parts.noun, numbers.plural, cases.genitive, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[1]);

dataSet.addEnding('uum', parts.noun, numbers.plural, cases.genitive, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ērum', parts.noun, numbers.plural, cases.genitive, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.dative, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('ābus', parts.noun, numbers.plural, cases.dative, declensions.first, genders.feminine, types.irregular, footnotes[4]);
dataSet.addEnding('eis', parts.noun, numbers.plural, cases.dative, declensions.first, genders.feminine, types.irregular, footnotes[6]);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.dative, declensions.second, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.dative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.dative, declensions.third, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.dative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.dative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ubus', parts.noun, numbers.plural, cases.dative, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[14]);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.dative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēbus', parts.noun, numbers.plural, cases.dative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('ās', parts.noun, numbers.plural, cases.accusative, declensions.first, genders.feminine, types.regular);

dataSet.addEnding('ōs', parts.noun, numbers.plural, cases.accusative, declensions.second, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('a', parts.noun, numbers.plural, cases.accusative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.plural, cases.accusative, declensions.third, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('īs', parts.noun, numbers.plural, cases.accusative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[11]);
dataSet.addEnding('as', parts.noun, numbers.plural, cases.accusative, declensions.third, [genders.masculine, genders.feminine], types.irregular, footnotes[7]);

dataSet.addEnding('a', parts.noun, numbers.plural, cases.accusative, declensions.third, genders.neuter, types.regular);
dataSet.addEnding('ia', parts.noun, numbers.plural, cases.accusative, declensions.third, genders.neuter, types.irregular, footnotes[11]);

dataSet.addEnding('ūs', parts.noun, numbers.plural, cases.accusative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ua', parts.noun, numbers.plural, cases.accusative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.plural, cases.accusative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.ablative, declensions.first, genders.feminine, types.regular);
dataSet.addEnding('ābus', parts.noun, numbers.plural, cases.ablative, declensions.first, genders.feminine, types.irregular, footnotes[4]);
dataSet.addEnding('eis', parts.noun, numbers.plural, cases.ablative, declensions.first, genders.feminine, types.irregular, footnotes[6]);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.ablative, declensions.second, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.ablative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.ablative, declensions.third, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.ablative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.ablative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);
dataSet.addEnding('ubus', parts.noun, numbers.plural, cases.ablative, declensions.fourth, [genders.masculine, genders.feminine], types.irregular, footnotes[14]);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.ablative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēbus', parts.noun, numbers.plural, cases.ablative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.locative, declensions.first, genders.feminine, types.regular);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.locative, declensions.second, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('īs', parts.noun, numbers.plural, cases.locative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.locative, declensions.third, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.locative, declensions.third, genders.neuter, types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.locative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ibus', parts.noun, numbers.plural, cases.locative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēbus', parts.noun, numbers.plural, cases.locative, declensions.fifth, genders.feminine, types.regular);

dataSet.addEnding('ae', parts.noun, numbers.plural, cases.vocative, declensions.first, genders.feminine, types.regular);

dataSet.addEnding('ī', parts.noun, numbers.plural, cases.vocative, declensions.second, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('a', parts.noun, numbers.plural, cases.vocative, declensions.second, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.plural, cases.vocative, declensions.third, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('a', parts.noun, numbers.plural, cases.vocative, declensions.third, genders.neuter, types.regular);
dataSet.addEnding('ia', parts.noun, numbers.plural, cases.vocative, declensions.third, genders.neuter, types.irregular, footnotes[11]);

dataSet.addEnding('ūs', parts.noun, numbers.plural, cases.vocative, declensions.fourth, [genders.masculine, genders.feminine], types.regular);

dataSet.addEnding('ua', parts.noun, numbers.plural, cases.vocative, declensions.fourth, genders.neuter, types.regular);

dataSet.addEnding('ēs', parts.noun, numbers.plural, cases.vocative, declensions.fifth, genders.feminine, types.regular);
    
// endregion Nouns

// region Test values only
//dataSet.addEnding('dative', parts.noun, numbers.singular, [cases.dative, cases.accusative], declensions.first, [genders.neuter], types.irregular, footnotes[7]);
// endregion Test values only


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
    let obligatoryMatches = [Alpheios.types.part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [Alpheios.types.grmCase, Alpheios.types.declension, Alpheios.types.gender, Alpheios.types.number];

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

