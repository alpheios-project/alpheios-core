'use strict'
// Import shared language data
import * as Lib from '../lib/lib'
import * as Models from 'alpheios-data-models'
import * as L10n from '../l10n/l10n'
import * as Styles from '../presenter/styles/styles'
import * as View from '../presenter/lib/view'

// Reexport items for Jest
// Library
exports.languages = Lib.languages
exports.Feature = Models.Feature
exports.FeatureType = Models.FeatureType
exports.FeatureImporter = Models.FeatureImporter
exports.Inflection = Models.Inflection
exports.Lemma = Models.Lemma
exports.Lexeme = Models.Lexeme
exports.Homonym = Models.Homonym
exports.Suffix = Lib.Suffix
exports.LanguageDataset = Lib.LanguageDataset
exports.LanguageData = Lib.LanguageData
exports.MatchData = Lib.MatchData
exports.Footnote = Lib.Footnote
exports.ResultSet = Lib.LexicalData

// L10n
exports.LatinLanguageModel = Models.LatinLanguageModel

// L10n
exports.L10n = {
  MessageBundle: L10n.MessageBundle,
  L10n: L10n.L10n
}

// Styles
exports.Styles = {
  classNames: Styles.classNames,
  wideView: Styles.wideView,
  narrowView: Styles.narrowView,
  footnotes: Styles.footnotes,
  pageHeader: Styles.pageHeader
}

// View
exports.View = {
  Cell: View.Cell,
  RowTitleCell: View.RowTitleCell,
  HeaderCell: View.HeaderCell,
  Column: View.Column,
  Row: View.Row,
  GroupingFeature: View.GroupFeatureType,
  GroupingFeatureList: View.GroupFeatureList,
  WideView: View.WideView,
  NarrowView: View.NarrowView,
  NarrowViewGroup: View.NarrowViewGroup,
  Table: View.Table,
  Footnotes: View.Footnotes,
  View: View.View
}
