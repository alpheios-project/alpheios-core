'use strict'
// Import shared language data
import languages from '../lib/languages'
import * as Models from 'alpheios-data-models'
import * as L10n from '../l10n/l10n'
import * as Styles from '../presenter/styles/styles'
import Suffix from '../lib/suffix'
import LanguageDataset from '../lib/language-dataset'
import LanguageData from '../lib/language-data'
import MatchData from '../lib/match-data'
import Footnote from '../lib/footnote'
import InflectionData from '../lib/inflection-data'
import Cell from '../presenter/lib/cell'
import RowTitleCell from '../presenter/lib/row-title-cell'
import HeaderCell from '../presenter/lib/header-cell'
import Column from '../presenter/lib/column'
import Row from '../presenter/lib/row'
import GroupFeatureType from '../presenter/lib/group-feature-type'
import GroupFeatureList from '../presenter/lib/group-feature-list'
import WideView from '../presenter/lib/wide-view'
import NarrowView from '../presenter/lib/narrow-view'
import NarrowViewGroup from '../presenter/lib/narrow-view-group'
import Table from '../presenter/lib/table'
import Footnotes from '../presenter/lib/footnotes'
import View from '../presenter/lib/view'

// Reexport items for Jest
// Library
exports.languages = languages
exports.Feature = Models.Feature
exports.FeatureType = Models.FeatureType
exports.FeatureImporter = Models.FeatureImporter
exports.Inflection = Models.Inflection
exports.Lemma = Models.Lemma
exports.Lexeme = Models.Lexeme
exports.Homonym = Models.Homonym
exports.Suffix = Suffix
exports.LanguageDataset = LanguageDataset
exports.LanguageData = LanguageData
exports.MatchData = MatchData
exports.Footnote = Footnote
exports.ResultSet = InflectionData

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
  Cell: Cell,
  RowTitleCell: RowTitleCell,
  HeaderCell: HeaderCell,
  Column: Column,
  Row: Row,
  GroupingFeature: GroupFeatureType,
  GroupingFeatureList: GroupFeatureList,
  WideView: WideView,
  NarrowView: NarrowView,
  NarrowViewGroup: NarrowViewGroup,
  Table: Table,
  Footnotes: Footnotes,
  View: View
}
