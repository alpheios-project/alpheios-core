import * as Lib from "../../../lib/lib.js";
import * as LibLatin from "../../../lib/lang/latin/latin.js";
import View from "../view.js";
import template from './template.hbs';

let view = new View();
view.id = 'nounDeclension';
view.name = 'noun declension';
view.partOfSpeech = LibLatin.parts.noun.value;
view.template = template;

/**
 * These values are used to define sorting and grouping order. 'featureOrder' determine a sequence in which
 * feature will be used for sorting. The same sequence will be used to group items when building a view matrix.
 * All feature types has a default sort order. This order is defined by a sequence of feature values provided
 * as arguments to each feature type constructor. However, this can be overriden here, as shown by the 'gender'
 * example. If suffixes with several values must be combines, such values can be provided within an array,
 * as shown by 'masculine' and 'feminine' values.
 */
let numbers = new Lib.FeatureType(Lib.types.number, ['singular', 'plural'], Lib.languages.latin);
numbers.tableGroup = 'row';
numbers.tableGroupSel = "number";

let cases = new Lib.FeatureType(Lib.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'], Lib.languages.latin);
cases.tableGroup = 'row';
cases.tableGroupSel = "number-cases";

let declensions = new Lib.FeatureType(Lib.types.declension, ['first', 'second', 'third', 'fourth', 'fifth'], Lib.languages.latin);
declensions.tableGroup = 'column';
declensions.tableGroupSel = 'declension';

let genders = new Lib.FeatureType(Lib.types.gender, [['masculine', 'feminine'], 'neuter'], Lib.languages.latin);
genders.tableGroup = 'column';
genders.tableGroupSel = 'declension-gender';

let types = new Lib.FeatureType(Lib.types.type, ['regular', 'irregular'], Lib.languages.latin);
types.tableGroup = 'column';
types.tableGroupSel = 'declension-gender-type';

view.featureOrder = [numbers, cases, declensions, genders, types];

export default view;