import * as Lib from "../../../lib/lib.js";
import * as LibLatin from "../../../lib/lang/latin/latin.js";
import * as View from "../../lib/view.js";

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let numbers = new View.GroupingFeature(
    Lib.types.number,
    ['singular', 'plural'],
    Lib.languages.latin,
    'Number')
    .setRowGroupType()
    .setRowGroupTitleLocation();

let cases = new View.GroupingFeature(
    Lib.types.grmCase,
    ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'],
    Lib.languages.latin,
    'Case')
    .setRowGroupType()
    .setColumnGroupTitleLocation();

let declensions = new View.GroupingFeature(
    Lib.types.declension,
    ['first', 'second', 'third', 'fourth', 'fifth'],
    Lib.languages.latin,
    'Declension')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let genders = new View.GroupingFeature(
    Lib.types.gender,
    [['masculine', 'feminine'], 'neuter'],
    Lib.languages.latin,
    'Gender')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let types = new View.GroupingFeature(
    Lib.types.type,
    ['regular', 'irregular'],
    Lib.languages.latin,
    'Type')
    .setColumnGroupType()
    .setRowGroupTitleLocation();

let viewOptions = {
    id: 'nounDeclension',
    name: 'noun declension',
    title: 'Noun declension',
    partOfSpeech: LibLatin.parts.noun.value,
    groupingFeatures: [declensions, genders, types, numbers, cases]
};
export default viewOptions;