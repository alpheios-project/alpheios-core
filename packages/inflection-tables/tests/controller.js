'use strict';
// Import shared language data
import * as Lib from "../lib/lib";
import * as L10n from "../presenter/l10n/l10n";
import * as Styles from "../presenter/styles/styles";
import * as View from "../presenter/lib/view";

// Reexport items for Jest
// Library
exports.languages = Lib.languages;
exports.types = Lib.types;
exports.Feature = Lib.Feature;
exports.FeatureType = Lib.FeatureType;
exports.Importer = Lib.Importer;
exports.Inflection = Lib.Inflection;
exports.Lemma = Lib.Lemma;
exports.Lexeme = Lib.Lexeme;
exports.Homonym = Lib.Homonym;
exports.Suffix = Lib.Suffix;
exports.LanguageDataset = Lib.LanguageDataset;
exports.MatchData = Lib.MatchData;

// L10n
exports.L10n = {
    MessageBundle: L10n.MessageBundle,
    L10n: L10n.L10n
};

// Styles
exports.Styles = {
    classNames: Styles.classNames
};

// View
exports.View = {
    Cell: View.Cell,
    RowTitleCell: View.RowTitleCell,
    HeaderCell: View.HeaderCell,

    Column: View.Column,
    GroupingFeature: View.GroupingFeature
};