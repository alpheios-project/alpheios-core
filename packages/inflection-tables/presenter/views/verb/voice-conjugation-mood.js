import * as Lib from "../../../lib/lib.js";
import * as LibLatin from "../../../lib/lang/latin/latin.js";
import Handlebars from "../../support/handlebars-4.0.10/handlebars-v4.0.10";  // CommonJS module
import * as View from "../view.js";
import pageHeaderTemplate from '../../templates/page-header.hbs';
import headerCellTemplate from '../../templates/header-cell.hbs';
import suffixCellTemplate from '../../templates/suffix-cell.hbs';
import footnotesTemplate from '../../templates/footer.hbs';

let view = new View.View();
view.id = 'verbVoiceConjugationMood';
view.name = 'verb voice-conjugation-mood';
view.title = 'Voice-Conjugation-Mood';
view.partOfSpeech = LibLatin.parts.verb.value;
view.pageHeaderTemplate = Handlebars.compile(pageHeaderTemplate);
view.headerCellTemplate = Handlebars.compile(headerCellTemplate);
view.suffixCellTemplate = Handlebars.compile(suffixCellTemplate);
view.footnotesTemplate = Handlebars.compile(footnotesTemplate);

/**
 * These values are used to define sorting and grouping order. 'featureOrder' determine a sequence in which
 * feature will be used for sorting. The same sequence will be used to group items when building a view matrix.
 * All feature types has a default sort order. This order is defined by a sequence of feature values provided
 * as arguments to each feature type constructor. However, this can be overridden here, as shown by the 'gender'
 * example. If suffixes with several values must be combines, such values can be provided within an array,
 * as shown by 'masculine' and 'feminine' values.
 *
 */
let tenses = new View.GroupingFeature(
    Lib.types.tense,
    ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'],
    Lib.languages.latin,
    View.groupType.row,
    'Tense',
    View.groupTitleLocation.row);

let numbers = new View.GroupingFeature(
    Lib.types.number,
    ['singular', 'plural'],
    Lib.languages.latin,
    View.groupType.row,
    'Number',
    View.groupTitleLocation.column);

let persons = new View.GroupingFeature(
    Lib.types.person,
    ['first', 'second', 'third'],
    Lib.languages.latin,
    View.groupType.row,
    'Person',
    View.groupTitleLocation.column);

let voices = new View.GroupingFeature(
    Lib.types.voice,
    ['active', 'passive'],
    Lib.languages.latin,
    View.groupType.column,
    'Voice',
    View.groupTitleLocation.row);
voices.groupTitleStyles = ['infl-cell--sp2'];

let conjugations = new View.GroupingFeature(
    Lib.types.conjugation,
    ['first', 'second', 'third', 'fourth'],
    Lib.languages.latin,
    View.groupType.column,
    'Conjugation Stem',
    View.groupTitleLocation.row);
conjugations.groupTitleStyles = ['infl-cell--sp2'];

let moods = new View.GroupingFeature(
    Lib.types.mood,
    ['indicative', 'subjunctive'],
    Lib.languages.latin,
    View.groupType.column,
    'Mood',
    View.groupTitleLocation.row);
moods.groupTitleStyles = ['infl-cell--sp2'];

view.groupingFeatures = [voices, conjugations, moods, tenses, numbers, persons];

export default view;