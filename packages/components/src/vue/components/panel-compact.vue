<template>
  <div :class="divClasses" :data-notification-visible="data && data.notification && data.notification.important"
       :style="mainstyles" class="alpheios-panel auk"
       data-component="alpheios-panel"
       data-resizable="true" id="alpheios-panel-inner" v-on-clickaway="attachTrackingClick"
       v-show="this.$store.state.panel.visible">
    <!-- Show only important notifications for now -->

    <div class="alpheios-panel__header">
      <div class="alpheios-panel__header-logo">
        <img class="alpheios-panel__header-logo-img" src="../../images/icon.png">
      </div>
      <span class="alpheios-panel__header-btn-group--center" v-if="$store.state.app.tabState">

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_HELP')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('info')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.info }">
                  <info-icon class="alpheios-icon"></info-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_DEFINITIONS')" tooltipDirection="bottom-narrow">
                <span :class="{ active: $store.state.app.tabState.definitions }" @click="changeTab('definitions')"
                      class="alpheios-panel__header-nav-btn">
                  <definitions-icon class="alpheios-icon"></definitions-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters[`app/hasInflData`]">
                <span @click="changeTab('inflections')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.inflections }">
                  <inflections-icon class="alpheios-icon"></inflections-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT_BROWSER')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('inflectionsbrowser')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.inflectionsbrowser }">
                  <inflections-browser-icon class="alpheios-icon"></inflections-browser-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_GRAMMAR')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters[`app/hasGrammarRes`]">
                <span @click="changeTab('grammar')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.grammar }">
                  <grammar-icon class="alpheios-icon"></grammar-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters['app/hasTreebankData']">
                <span @click="changeTab('treebank')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.treebank }">
                  <treebank-icon class="alpheios-icon"></treebank-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_OPTIONS')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('options')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.options }">
                  <options-icon class="alpheios-icon"></options-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip v-if="Boolean(auth)" :tooltipText="l10n.getText('TOOLTIP_USER')"
                            tooltipDirection="bottom-narrow">
                <span @click="changeTab('user')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.user }">
                  <user-icon class="alpheios-icon"></user-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_WORD_USAGE')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters['app/hasWordUsageExamplesData']">
                <span @click="changeTab('wordUsage')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.wordUsage }">
                  <word-usage-icon class="alpheios-icon"></word-usage-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="l10n.getText('TOOLTIP_WORDLIST')">
                <span v-show="showWordList" v-bind:class="{ active: $store.state.app.tabState.wordlist }" @click="changeTab('wordlist')"
                  class="alpheios-panel__header-nav-btn">
                  <wordlist-icon class="alpheios-icon"></wordlist-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_STATUS')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('status')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.status }"
                      v-show="verboseMode">
                  <status-icon class="alpheios-icon"></status-icon>
                </span>
              </alph-tooltip>
            </span>
      <span class="alpheios-panel__header-btn-group--end">

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_LEFT')" tooltipDirection="bottom-narrow"
                            v-show="attachToLeftVisible">
                <span @click="setPosition('left')"
                      class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow alpheios_left"
                      v-show="attachToLeftVisible">
                    <attach-left-icon></attach-left-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_RIGHT')" tooltipDirection="bottom-narrow"
                            v-show="attachToRightVisible">
                <span @click="setPosition('right')"
                      class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow alpheios_right"
                      v-show="attachToRightVisible">
                    <attach-right-icon></attach-right-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip
                  :tooltipText="l10n.getText('TOOLTIP_CLOSE_PANEL')"
                  tooltipDirection="bottom-right">
                <span @click="ui.closePanel" class="alpheios-panel__header-action-btn alpheios_close">
                    <close-icon></close-icon>
                </span>
              </alph-tooltip>
            </span>
    </div>

    <div class="alpheios-panel__content" v-if="$store.state.app.tabState">

      <div
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab-panel--fw alpheios-panel__tab__definitions"
          v-show="$store.state.app.tabState.definitions">
        <div class="alpheios-lookup__panel">
          <lookup :clearLookupText="clearLookupText" :parentLanguage="lookupParentLanguage"></lookup>
        </div>
        <div
            v-if="showDefinitionsPlaceholder">
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
        <div class="alpheios-panel__contentitem" v-for="definition in data.shortDefinitions">
          <shortdef :definition="definition" :languageCode="data.status.languageCode"></shortdef>
        </div>
        <div class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
             v-html="data.fullDefinitions"></div>
      </div>
      <div :id="inflectionsPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
           v-if="$store.getters[`app/hasInflData`]" v-show="inflectionsTabVisible">
        <inflections @contentwidth="setContentWidth" class="alpheios-panel-inflections"></inflections>
      </div>
      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.state.app.tabState.inflectionsbrowser">
        <inflection-browser @contentwidth="setContentWidth">
        </inflection-browser>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
           v-show="$store.state.app.tabState.grammar">
        <grammar></grammar>
      </div>
      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.state.app.tabState.treebank">
        <!-- TODO: Instead of this we need to create a universal mechanism for handling panel resizing for every tab's content change -->
        <treebank @treebankcontentwidth="setTreebankContentWidth"></treebank>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status" v-show="$store.state.app.tabState.status">
        <!-- Messages to be displayed in a status panel -->
        <div v-for="message in data.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status" v-show="$store.state.app.tabState.user">
        <user-auth :auth="data.auth"></user-auth>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
           v-show="$store.state.app.tabState.wordUsage" v-if="$store.getters['app/hasWordUsageExamplesData']">
        <word-usage-examples-block
            :wordUsageList="$store.state.app.wordUsageExamplesData.wordUsageExamples"
            :targetWord="$store.state.app.wordUsageExamplesData.targetWord"
            :language="$store.state.app.wordUsageExamplesData.language"
            :provider="$store.state.app.wordUsageExamplesData.provider">
        </word-usage-examples-block>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__options" v-show="$store.state.app.tabState.options">
        <reskin-font-color></reskin-font-color>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.preferredLanguage"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.panelPosition"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.popupPosition"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.uiType"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.verboseMode"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.skin"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.popup"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.panelOnActivate"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="languageSetting"
                 :key="languageSetting.name"
                 @change="resourceSettingChanged"
                 v-for="languageSetting in resourceSettingsLexicons"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="languageSetting"
                 :key="languageSetting.name"
                 @change="resourceSettingChanged"
                 v-for="languageSetting in resourceSettingsLexiconsShort"></setting>

        <setting :classes="['alpheios-panel__options-item']"
                 :data="settings.contentOptions.items.enableWordUsageExamples" @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>

        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.wordUsageExamplesMax"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>

        <setting :classes="['alpheios-panel__options-item']"
                 :data="settings.contentOptions.items.enableLemmaTranslations" @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>

        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.locale"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab__info"
           v-show="$store.state.app.tabState.info">
        <div class="alpheios-lookup__panel">
          <lookup :clearLookupText="clearLookupText" :parentLanguage="lookupParentLanguage"></lookup>
        </div>
        Compact panel
        <info></info>
      </div>

      <div v-show="$store.state.app.tabState.wordlist" class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist">
        <word-list-panel :wordlistC="app.wordlistC" :updated="$store.state.app.wordListUpdated"></word-list-panel>
      </div>
    </div>
    <div :class="notificationClasses" class="alpheios-panel__notifications uk-text-small"
         v-if="data && data.notification" v-show="data.notification.important">
            <span @click="closeNotifications" class="alpheios-panel__notifications-close-btn">
                <close-icon></close-icon>
            </span>
      <span class="alpheios-panel__notifications-text" v-html="data.notification.text"></span>
      <setting :classes="['alpheios-panel__notifications--lang-switcher alpheios-text-smaller']"
               :data="settings.contentOptions.items.preferredLanguage"
               :show-title="false"
               @change="contentOptionChanged"
               v-show="data.notification.showLanguageSwitcher"></setting>
    </div>
  </div>
</template>
<script>
/*
This is a mobile version of a panel
 */

// Vue components
import Inflections from './inflections.vue'
import Setting from './setting.vue'
import ShortDef from './shortdef.vue'
import Grammar from './grammar.vue'
import Treebank from './treebank.vue'
import Info from './info.vue'
import InflectionBrowser from './inflections-browser.vue'
import Tooltip from './tooltip.vue'
import Lookup from './lookup.vue'
import ReskinFontColor from './reskin-font-color.vue'
import UserAuth from './user-auth.vue'
import WordUsageExamplesBlock from '@/vue/components/word-usage-examples-block.vue'
import { WordListPanel } from 'alpheios-wordlist'
// Embeddable SVG icons
import AttachLeftIcon from '../../images/inline-icons/attach-left.svg'
import AttachRightIcon from '../../images/inline-icons/attach-right.svg'
import CloseIcon from '../../images/inline-icons/close.svg'
import DefinitionsIcon from '../../images/inline-icons/definitions.svg'
import InflectionsIcon from '../../images/inline-icons/inflections.svg'
import InflectionsBrowserIcon from '../../images/inline-icons/inflections-browser.svg'
import StatusIcon from '../../images/inline-icons/status.svg'
import UserIcon from '../../images/inline-icons/user.svg'
import OptionsIcon from '../../images/inline-icons/options.svg'
import GrammarIcon from '../../images/inline-icons/resources.svg'
import TreebankIcon from '../../images/inline-icons/sitemap.svg'
import InfoIcon from '../../images/inline-icons/info.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import WordUsageIcon from '../../images/inline-icons/books-stack.svg'
// Vue directives
import { directive as onClickaway } from '../directives/clickaway.js'
// JS imports
import interact from 'interactjs'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'PanelCompact',
  // API modules that are required for this component
  inject: {
    app: 'app',
    ui: 'ui',
    language: 'language',
    l10n: 'l10n',
    settings: 'settings',
    auth: { from: 'auth', default: null } // This module is options
  },
  storeModules: ['app', 'panel'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    inflections: Inflections,
    inflectionBrowser: InflectionBrowser,
    setting: Setting,
    shortdef: ShortDef,
    info: Info,
    grammar: Grammar,
    treebank: Treebank,
    userAuth: UserAuth,
    attachLeftIcon: AttachLeftIcon,
    attachRightIcon: AttachRightIcon,
    closeIcon: CloseIcon,
    definitionsIcon: DefinitionsIcon,
    inflectionsIcon: InflectionsIcon,
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    statusIcon: StatusIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    infoIcon: InfoIcon,
    grammarIcon: GrammarIcon,
    treebankIcon: TreebankIcon,
    wordUsageIcon: WordUsageIcon,
    alphTooltip: Tooltip,
    lookup: Lookup,
    reskinFontColor: ReskinFontColor,
    wordlistIcon: WordlistIcon,
    wordListPanel: WordListPanel,
    wordUsageExamplesBlock: WordUsageExamplesBlock
  },
  directives: {
    onClickaway: onClickaway
  },

  minWidth: 400, // A minimal width of a panel, in pixels
  defaultScrollPadding: 20,
  data: function () {
    return {
      inflectionsPanelID: 'alpheios-panel__inflections-panel',
      inflectionsBrowserPanelID: 'alpheios-panel__inflections-browser-panel',
      panelPosition: 'left',
      panelLeftPadding: 0,
      panelRightPadding: 0,
      scrollPadding: 0,
      panelWidth: null
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    divClasses () {
      return this.data.classes
    },
    clearLookupText: function () {
      // always true to clear panels lookup
      return true
    },
    lookupParentLanguage: function () {
      if (this.$store.state.app.currentLanguageName) {
        return this.$store.state.app.currentLanguageName
      } else {
        return this.settings.contentOptions.items.preferredLanguage.currentTextValue()
      }
    },
    mainstyles: function () {
      this.panelWidth = this.panelWidth ? this.panelWidth : this.$options.minWidth
      return {
        zIndex: this.ui.zIndex,
        width: `${this.panelWidth}px`
      }
    },
    resourceSettingsLexicons: function () {
      return this.settings.resourceOptions.items && this.settings.resourceOptions.items.lexicons
        ? this.settings.resourceOptions.items.lexicons.filter(item => item.values.length > 0)
        : []
    },
    resourceSettingsLexiconsShort: function () {
      return this.settings.resourceOptions.items && this.settings.resourceOptions.items.lexiconsShort
        ? this.settings.resourceOptions.items.lexiconsShort.filter(item => item.values.length > 0)
        : []
    },

    showDefinitionsPlaceholder: function () {
      return (!this.data.shortDefinitions || this.data.shortDefinitions.length === 0) && (!this.data.fullDefinitions || this.data.fullDefinitions.length === 0)
    },

    notificationClasses: function () {
      return {
        'alpheios-panel__notifications--important': this.data.notification.important
      }
    },

    attachToLeftVisible: function () {
      return this.panelPosition === 'right'
    },

    attachToRightVisible: function () {
      return this.panelPosition === 'left'
    },

    // Need this to watch when inflections tab becomes active and adjust panel width to fully fit an inflection table in
    inflectionsTabVisible: function () {
      return Boolean(this.$store.state.app.tabState.inflections && this.$store.state.app.inflectionsViewSet)
    },

    additionalStylesTootipCloseIcon: function () {
      return {
        top: '2px',
        right: '50px'
      }
    },

    verboseMode () {
      return this.settings.contentOptions.items.verboseMode.currentValue === `verbose`
    },

    showWordList () {
      return this.data.wordListUpdated && this.data.wordlistC && Object.keys(this.data.wordlistC.wordLists) && Object.keys(this.data.wordlistC.wordLists).length > 0
    }
  },
  methods: {
    closeNotifications () {
      this.$emit('closenotifications')
    },

    setPosition (position) {
      this.settings.contentOptions.items.panelPosition.setValue(position)
      this.panelPosition = position
    },

    changeTab (name) {
      this.setContentWidth({ width: 'auto', component: null })
      this.app.changeTab(name)
    },

    clearContent: function () {
      for (let contentArea in this.contentAreas) {
        if (this.contentAreas.hasOwnProperty(contentArea)) {
          this.contentAreas[contentArea].clearContent()
        }
      }
      return this
    },

    showMessage: function (messageHTML) {
      this.contentAreas.messages.setContent(messageHTML)
      this.tabGroups.contentTabs.activate('statusTab')
    },

    appendMessage: function (messageHTML) {
      this.contentAreas.messages.appendContent(messageHTML)
    },

    clearMessages: function () {
      this.contentAreas.messages.setContent('')
    },

    contentOptionChanged: function (name, value) {
      this.app.contentOptionChange(name, value)
    },

    resourceSettingChanged: function (name, value) {
      this.language.resourceSettingChange(name, value)
    },

    uiOptionChanged: function (name, value) {
      this.ui.optionChange(name, value)
    },

    setContentWidth: function (dataObj) {
      if (this.data === undefined) {
        return
      }
      if (dataObj.width === 'auto') {
        this.panelWidth = null
        return
      }

      this.calcWidthPaddings(dataObj.component)
      this.calcScrollPadding()

      let widthDelta = this.navbarWidth +
          this.panelLeftPadding +
          this.panelRightPadding +
          this.scrollPadding

      if (dataObj.width > this.$options.minWidth - widthDelta) {
        let adjustedWidth = dataObj.width + widthDelta
        // Max viewport width less some space to display page content
        let maxWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 20

        if (adjustedWidth > maxWidth) { adjustedWidth = maxWidth }
        this.panelWidth = adjustedWidth
      }
    },

    setTreebankContentWidth: function (width) {
      this.panelWidth = width
    },

    attachTrackingClick: function () {
      this.ui.closePanel()
    },

    calcScrollPadding: function () {
      if (typeof this.$el.querySelector === 'function') {
        this.scrollPadding = this.$el.scrollHeight > this.$el.offsetHeight
          ? this.$options.defaultScrollPadding : 0
      }
    },

    calcWidthPaddings: function (component) {
      let panelTabId
      if (component === 'inflections') {
        panelTabId = this.inflectionsPanelID
      } else if (component === 'inflections-browser') {
        panelTabId = this.inflectionsBrowserPanelID
      }

      if (typeof this.$el.querySelector === 'function' && panelTabId && (this.panelLeftPadding === 0 || this.panelRightPadding === 0)) {
        let navbar = this.$el.querySelector(`#${this.navbarID}`)
        let panel = this.$el.querySelector(`#${panelTabId}`)
        this.navbarWidth = 0
        if (navbar) {
          let width = window.getComputedStyle(navbar).getPropertyValue('width').match(/\d+/)
          if (width && Array.isArray(width) && width.length > 0) { this.navbarWidth = width[0] }
        }

        if (panel) {
          let resPl1 = window.getComputedStyle(panel).getPropertyValue('padding-left').match(/\d+/)
          if (Array.isArray(resPl1)) {
            this.panelLeftPadding = parseInt(resPl1[0])
          } else {
            this.panelLeftPadding = 0
          }

          let resPl2 = window.getComputedStyle(panel).getPropertyValue('padding-right').match(/\d+/)
          if (Array.isArray(resPl2)) {
            this.panelRightPadding = parseInt(resPl2[0])
          } else {
            this.panelRightPadding = 0
          }
        }
      }
    }
  },

  mounted: function () {
    // Determine paddings and sidebar width for calculation of a panel width to fit content
    if (this.data === undefined) {
      return
    }
    if (typeof this.$el.querySelector === 'function') {
      this.calcWidthPaddings()

      // Initialize Interact.js: make panel resizable
      interact(this.$el)
        .resizable({
          // resize from all edges and corners
          edges: { left: true, right: true, bottom: false, top: false },

          // keep the edges inside the parent
          restrictEdges: {
            outer: document.body,
            endOnly: true
          },

          // minimum size
          restrictSize: {
            min: { width: this.$options.minWidth }
          },

          inertia: true
        })
        .on('resizemove', event => {
          let target = event.target
          // update the element's style
          target.style.width = `${event.rect.width}px`
        })
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  $alpheios-panel-header-height: 40px;
  $alpheios-panel-title-height: 20px;

  .alpheios-panel {
    // width: 400px; /* no !important */
    overflow: auto;
    height: 100vh;
    top: 0;
    z-index: 2000;
    position: fixed;
    background: #FFF;
    resize: both; /* no !important */
    opacity: 0.95;
    direction: ltr;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: #{$alpheios-panel-header-height} #{$alpheios-panel-title-height} auto 60px;
    grid-template-areas: "header" "title" "content" "content"

  }

  .alpheios-panel[data-notification-visible="true"] {
    grid-template-areas: "header" "title" "content" "notifications"
  }

  .alpheios-panel.alpheios-panel-left {
    left: 0;
    border-right: 1px solid $alpheios-link-color-dark-bg;
  }

  .alpheios-panel.alpheios-panel-right {
    right: 0;
    border-left: 1px solid $alpheios-link-color-dark-bg;
    grid-template-columns: auto;
    grid-template-areas: "header" "title" "content" "content"

  }

  .alpheios-panel.alpheios-panel-right[data-notification-visible="true"] {
    grid-template-areas: "header" "title" "content" "notifications"

  }

  .alpheios-panel__header {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    grid-area: header;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid $alpheios-link-color-dark-bg;
  }

  .alpheios-panel-left .alpheios-panel__header {
    direction: ltr;
    /*padding: 0 0 0 10px;*/
  }

  .alpheios-panel-right .alpheios-panel__header {
    direction: rtl;
    /*padding: 0 10px 0 0;*/
  }

  .alpheios-panel__header-logo {
    flex-grow: 0;
    justify-content: flex-start;
  }

  .alpheios-panel__header-selection {
    font-size: 16px;
    font-weight: 700;
    color: $alpheios-toolbar-color;
  }

  .alpheios-panel__header-word {
    font-size: 14px;
    position: relative;
    top: -1px;
  }

  .#{$alpheios-uikit-namespace} .alpheios-panel__header-logo-img {
    width: auto;
    height: 30px;
    padding-top: 5px;
  }

  .alpheios-panel__header-action-btn,
  .alpheios-panel__header-action-btn.active:hover,
  .alpheios-panel__header-action-btn.active:focus {
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    fill: $alpheios-link-color-dark-bg;
    stroke: $alpheios-link-color-dark-bg;
    margin: 10px 9px;

    svg {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: top;
    }
  }

  // Make close icons more noticeable
  .alpheios-panel__header-action-btn.alpheios_close {
    stroke-width: 2.5;
  }

  .alpheios-panel__header-action-btn.alpheios_left,
  .alpheios-panel__header-action-btn.alpheios_right {
    stroke-width: 2;
  }

  .alpheios-panel__header-action-btn:hover,
  .alpheios-panel__header-action-btn:focus,
  .alpheios-panel__header-action-btn.active {
    fill: $alpheios-link-hover-color;
    stroke: $alpheios-link-hover-color;
  }

  .alpheios-panel__content {
    overflow: visible;
    grid-area: content;
    direction: ltr;
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap;
    position: relative; // Need to set element as an offset parent for panel content items
  }

  .alpheios-lookup__panel {
    display: block;
    border-bottom: 1px solid;
    margin-bottom: 20px;
  }

  .alpheios-panel__notifications {
    display: none;
    position: relative;
    padding: 10px 20px;
    background: $alpheios-logo-color;
    grid-area: notifications;
    overflow: hidden;
  }

  .alpheios-panel__notifications-close-btn {
    position: absolute;
    right: 5px;
    top: 5px;
    display: block;
    width: 20px;
    height: 20px;
    margin: 0;
    cursor: pointer;
    fill: $alpheios-link-color-dark-bg;
    stroke: $alpheios-link-color-dark-bg;
  }

  .alpheios-panel__notifications-close-btn:hover,
  .alpheios-panel__notifications-close-btn:focus {
    fill: $alpheios-link-hover-color;
    stroke: $alpheios-link-hover-color;
  }

  .alpheios-panel__notifications--lang-switcher {
    font-size: 12px;
    float: right;
    margin: -20px 10px 0 0;
    display: inline-block;
  }

  .alpheios-panel__notifications--lang-switcher .uk-select {
    width: 120px;
    height: 25px;
  }

  .alpheios-panel__notifications--important {
    background: $alpheios-icon-color;
  }

  [data-notification-visible="true"] .alpheios-panel__notifications {
    display: block;
  }

  .alpheios-panel__tab-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
  }

  .alpheios-panel__tab-panel--fw {
    width: 100%;
  }

  .alpheios-panel__tab-panel--no-padding {
    padding: 0;
  }

  .alpheios-panel__content_no_top_padding {
    padding-top: 0;
  }

  .alpheios-panel__message {
    margin-bottom: 0.5rem;
  }

  .alpheios-panel__options-item {
    margin-bottom: 0.5rem;
    max-width: 300px;
  }

  .alpheios-panel__contentitem {
    margin-bottom: 1em;
  }

  .alpheios-panel__header-btn-group--center {
    direction: ltr;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
  }

  .alpheios-panel__header-btn-group--end {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    box-sizing: border-box;
  }

  .alpheios-panel__header-nav-btn {
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    background: transparent no-repeat center center;
    background-size: contain;
    margin: 10px 15px;

    svg {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: top;
    }
  }

  .alpheios-panel__header-nav-btn.alpheios-panel__header-nav-btn--short {
    margin: -10px 5px 20px;
  }

  .alpheios-panel__header-nav-btn,
  .alpheios-panel__header-nav-btn.active:hover,
  .alpheios-panel__header-nav-btn.active:focus {
    fill: $alpheios-link-color-dark-bg;
    stroke: $alpheios-link-color-dark-bg;
  }

  .alpheios-panel__header-nav-btn:hover,
  .alpheios-panel__header-nav-btn:focus,
  .alpheios-panel__header-nav-btn.active {
    fill: $alpheios-link-hover-color;
    stroke: $alpheios-link-hover-color;
  }

  .alpheios-panel__tab__options {
    width: 100%;
    max-width: 600px;
  }

  .alpheios-panel__options-item {
    max-width: none;
    width: 100%;
  }

  .alpheios-panel__options-item .uk-select:not([multiple]):not([size]) {
    max-width: 235px;
    display: inline-block;
    vertical-align: top;
  }

  .alpheios-panel__options-item .alpheios-setting__label {
    width: 100px;
    display: inline-block;
  }

  .alpheios-panel__options-item select {
    display: inline-block;
  }

  .alpheios-panel__tab__inflections {
    width: 100%;
  }

  .alpheios-panel__tab__inflectionsbrowser {
    width: 100%;
  }
</style>
