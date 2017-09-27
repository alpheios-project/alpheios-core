import * as Lib from "../../../lib/lib.js";
import * as LibLatin from "../../../lib/lang/latin/latin.js";
import Handlebars from "../../support/handlebars-4.0.10/handlebars-v4.0.10";  // CommonJS module
import * as View from "../view.js";
import pageHeaderTemplate from '../shared/page-header.hbs';
import headerCellTemplate from '../shared/header-cell.hbs';
import suffixCellTemplate from '../shared/suffix-cell.hbs';
import footnotesTemplate from '../shared/footer.hbs';

let view = new View.View();
view.id = 'nounDeclension';
view.name = 'noun declension';
view.title = 'Noun declension';
view.partOfSpeech = LibLatin.parts.noun.value;
view.pageHeaderTemplate = Handlebars.compile(pageHeaderTemplate);
view.headerCellTemplate = Handlebars.compile(headerCellTemplate);
view.suffixCellTemplate = Handlebars.compile(suffixCellTemplate);
view.footnotesTemplate = Handlebars.compile(footnotesTemplate);

/**
 * These values are used to define sorting and grouping order. 'featureOrder' determine a sequence in which
 * feature will be used for sorting. The same sequence will be used to group items when building a view matrix.
 * All feature types has a default sort order. This order is defined by a sequence of feature values provided
 * as arguments to each feature type constructor. However, this can be overriden here, as shown by the 'gender'
 * example. If suffixes with several values must be combines, such values can be provided within an array,
 * as shown by 'masculine' and 'feminine' values.
 *
 */
let numbers = new View.GroupingFeature(Lib.types.number, ['singular', 'plural'], Lib.languages.latin);
numbers.setRowGroupType();
numbers.groupTitle = 'Number';
numbers.groupTitleStyles = ['infl-cell', 'infl-cell--fw'];

let cases = new View.GroupingFeature(Lib.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'], Lib.languages.latin);
cases.setRowGroupType();
cases.groupTitle = 'Case';
cases.groupTitleStyles = ['infl-cell'];

let declensions = new View.GroupingFeature(Lib.types.declension, ['first', 'second', 'third', 'fourth', 'fifth'], Lib.languages.latin);
declensions.setColumnGroupType();
declensions.groupTitle = 'Declension';
declensions.groupTitleStyles = ['infl-cell', 'infl-cell--hdr'];

let genders = new View.GroupingFeature(Lib.types.gender, [['masculine', 'feminine'], 'neuter'], Lib.languages.latin);
genders.setColumnGroupType();
genders.groupTitle = 'Gender';
genders.groupTitleStyles = ['infl-cell', 'infl-cell--hdr'];

let types = new View.GroupingFeature(Lib.types.type, ['regular', 'irregular'], Lib.languages.latin);
types.setColumnGroupType();
types.groupTitle = 'Type';
types.groupTitleStyles = ['infl-cell', 'infl-cell--hdr'];

view.groupingFeatures = [declensions, genders, types, numbers, cases];

export default view;