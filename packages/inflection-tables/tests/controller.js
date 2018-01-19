'use strict'
// Import shared language data
import languages from '../lib/languages'
import * as Models from 'alpheios-data-models'
import * as L10n from '../l10n/l10n'
import * as Styles from '../views/styles/styles'
import Suffix from '../lib/suffix'
import LanguageDataset from '../lib/language-dataset'
import LanguageDataList from '../lib/language-data-list'
import MatchData from '../lib/match-data'
import Footnote from '../lib/footnote'
import InflectionData from '../lib/inflection-data'
import Cell from '../views/lib/cell'
import RowTitleCell from '../views/lib/row-title-cell'
import HeaderCell from '../views/lib/header-cell'
import Column from '../views/lib/column'
import Row from '../views/lib/row'
import GroupFeatureType from '../views/lib/group-feature-type'
import GroupFeatureList from '../views/lib/group-feature-list'
import WideView from '../views/lib/wide-view'
import NarrowView from '../views/lib/narrow-view'
import NarrowViewGroup from '../views/lib/narrow-view-group'
import Table from '../views/lib/table'
import View from '../views/lib/view'

// Reexport items for Jest
// Library
exports.Models = {
  Constants: Models.Constants
}

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
exports.LanguageDataList = LanguageDataList
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
  View: View
}
