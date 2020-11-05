// The following import will not probably used by any client directly,
// but is required to include Scss file specified in there to a MiniCssExtractPlugin bundle
import Style from './styles/style.scss'

import Popup from './vue/components/popup.vue'
import Panel from './vue/components/panel-large.vue'
import Locales from './locales/locales'
import enUS from './locales/en-us/messages.json'
import enGB from './locales/en-gb/messages.json'
import AppController from './lib/controllers/app-controller.js'
import UIEventController from '@/lib/controllers/ui-event-controller.js'
import UIStateAPI from '@/lib/state/ui-state-api.js'
import Language from './lib/controllers/language.js'
import HTMLSelector from './lib/selection/media/html-selector.js'
import LexicalQuery from './lib/queries/lexical-query.js'
import ResourceQuery from './lib/queries/resource-query.js'
import FeatureOptionDefaults from './settings/feature-options-defaults.json'
import LanguageOptionDefaults from './settings/language-options-defaults.json'
import UIOptionDefaults from './settings/ui-options-defaults.json'

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
import Platform from '@/lib/utility/platform.js'
import AuthData from '@/lib/auth/auth-data.js'
import SessionAuthenticator from '@/lib/auth/session-authenticator.js'
import AppAuthenticator from '@/lib/auth/app-authenticator.js'
// Logger needs to be re-exported because clients of the components are using it
import { Logger } from 'alpheios-data-models'
import { L10n } from 'alpheios-l10n'

export {
  Popup, Panel, L10n, Locales, enUS, enGB, AppController, UIEventController,
  Language, HTMLSelector, LexicalQuery, ResourceQuery,
  FeatureOptionDefaults, LanguageOptionDefaults, UIOptionDefaults,
  UIStateAPI, Style, HTMLConsole, MouseDblClick, LongTap, Swipe, GenericEvt, AlignmentSelector,
  HTMLPage, Tab, TabScript, L10nModule, AuthModule, PanelModule, PopupModule, ToolbarModule,
  ActionPanelModule, Platform, AuthData, SessionAuthenticator, AppAuthenticator, Logger
}
