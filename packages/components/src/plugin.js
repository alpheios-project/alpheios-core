// The following import will not probably used by any client directly,
// but is required to include Scss file specified in there to a MiniCssExtractPlugin bundle
import Style from './styles/style.scss'

import Popup from './vue/components/popup.vue'
import Panel from './vue/components/panel-large.vue'
import L10n from './lib/l10n/l10n'
import Locales from './locales/locales'
import enUS from './locales/en-us/messages.json'
import enGB from './locales/en-gb/messages.json'
import UIController from './lib/controllers/ui-controller.js'
import UIEventController from '@/lib/controllers/ui-event-controller.js'
import UIStateAPI from '@/lib/state/ui-state-api.js'
import Language from './lib/controllers/language.js'
import HTMLSelector from './lib/selection/media/html-selector.js'
import AnnotationQuery from './lib/queries/annotation-query.js'
import LexicalQuery from './lib/queries/lexical-query.js'
import ResourceQuery from './lib/queries/resource-query.js'
import LocalStorageArea from './lib/options/local-storage-area.js'
import ExtensionSyncStorage from './lib/options/extension-sync-storage.js'
import FeatureOptionDefaults from './settings/feature-options-defaults.json'
import LanguageOptionDefaults from './settings/language-options-defaults.json'
import UIOptionDefaults from './settings/ui-options-defaults.json'
import DefaultsLoader from './lib/options/defaults-loader.js'
import Options from './lib/options/options.js'
import Logger from './lib/log/logger.js'
import HTMLConsole from './lib/log/html-console.js'
import MouseDblClick from './lib/custom-pointer-events/mouse-dbl-click.js'
import GenericEvt from './lib/custom-pointer-events/generic-evt.js'
import LongTap from './lib/custom-pointer-events/long-tap.js'
import Swipe from './lib/custom-pointer-events/swipe.js'
import AlignmentSelector from './lib/selection/alignment/alignment-selector.js'
import HTMLPage from './lib/utility/html-page.js'
import Tab from '@/lib/state/tab.js'
import TabScript from '@/lib/state/tab-script.js'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import AuthModule from '@/vue/vuex-modules/data/auth-module.js'
import PanelModule from '@/vue/vuex-modules/ui/panel-module.js'
import PopupModule from '@/vue/vuex-modules/ui/popup-module.js'
import ToolbarModule from '@/vue/vuex-modules/ui/toolbar-module.js'
import ActionPanelModule from '@/vue/vuex-modules/ui/action-panel-module.js'

export { Popup, Panel, L10n, Locales, enUS, enGB, UIController, UIEventController,
  Language, HTMLSelector, AnnotationQuery, LexicalQuery, ResourceQuery,
  LocalStorageArea, ExtensionSyncStorage, FeatureOptionDefaults, LanguageOptionDefaults, UIOptionDefaults,
  DefaultsLoader, Options, UIStateAPI, Style, Logger, HTMLConsole, MouseDblClick, LongTap, Swipe, GenericEvt, AlignmentSelector,
  HTMLPage, Tab, TabScript, L10nModule, AuthModule, PanelModule, PopupModule, ToolbarModule, ActionPanelModule }
