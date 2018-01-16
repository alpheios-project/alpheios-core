import InflectionData from './lib/inflection-data'
import LanguageDataList from './lib/language-data-list'
import { dataSet as LatinDataSet } from './lib/lang/latin/latin'
import { dataSet as GreekDataSet } from './lib/lang/greek/greek'
import { L10n, messages as L10nMessages } from './l10n/l10n.js'
import LatinViews from './presenter/views/latin'
import GreekViews from './presenter/views/greek'
import ViewSet from './presenter/view-set'

export { InflectionData, LanguageDataList, LatinDataSet, GreekDataSet, L10n, L10nMessages, LatinViews, GreekViews, ViewSet }
