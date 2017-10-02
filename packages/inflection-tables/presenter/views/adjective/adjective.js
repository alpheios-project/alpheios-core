import * as Lib from "../../../lib/lib.js";
import * as LibLatin from "../../../lib/lang/latin/latin.js";
import Handlebars from "../../support/handlebars-4.0.10/handlebars-v4.0.10";  // CommonJS module
import * as View from "../view.js";
import pageHeaderTemplate from '../../templates/page-header.hbs';
import headerCellTemplate from '../../templates/header-cell.hbs';
import suffixCellTemplate from '../../templates/suffix-cell.hbs';
import footnotesTemplate from '../../templates/footer.hbs';

let view = new View.View();
view.id = 'adjectiveDeclension';
view.name = 'adjective declension';
view.title = 'Adjective declension';
view.partOfSpeech = LibLatin.parts.adjective.value;
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
let numbers = new View.GroupingFeature(
    Lib.types.number,
    ['singular', 'plural'],
    Lib.languages.latin,
    View.groupType.row,
    'Number',
    View.groupTitleLocation.row);

let cases = new View.GroupingFeature(
    Lib.types.grmCase,
    ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'],
    Lib.languages.latin,
    View.groupType.row,
    'Case',
    View.groupTitleLocation.column);

let declensions = new View.GroupingFeature(
    Lib.types.declension,
    ['first', 'second', 'third'],
    Lib.languages.latin,
    View.groupType.column,
    'Declension',
    View.groupTitleLocation.row);

let genders = new View.GroupingFeature(
    Lib.types.gender,
    ['masculine', 'feminine', 'neuter'],
    Lib.languages.latin,
    View.groupType.column,
    'Gender',
    View.groupTitleLocation.row);

let types = new View.GroupingFeature(
    Lib.types.type,
    ['regular', 'irregular'],
    Lib.languages.latin,
    View.groupType.column,
    'Type',
    View.groupTitleLocation.row);

view.groupingFeatures = [declensions, genders, types, numbers, cases];

export default view;