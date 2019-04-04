<template>
  <div class="alpheios-panel alpheios-panel--compact alpheios-content"
       :data-notification-visible="$store.state.ui.notification.visible && $store.state.ui.notification.important"
       :data-notification-auth-visible="$store.state.auth.notification.visible"
       :style="mainstyles"
       data-component="alpheios-panel"
       data-resizable="true"
       id="alpheios-panel-inner"
       v-show="$store.state.panel.visible"
  >

    <div class="alpheios-panel__header" >
      <div class="alpheios-panel__menu-btn" @click="menuItemClicked">
        <menu-icon class="alpheios-panel__menu-icon"></menu-icon>
      </div>
      <div class="alpheios-panel__header-btn-group--center">
        <navbuttons-compact></navbuttons-compact>
      </div>
      <span class="alpheios-panel__header-btn-group--end">
        <alph-tooltip
            :tooltipText="l10n.getText('TOOLTIP_CLOSE_PANEL')"
            tooltipDirection="top">
          <div @click="ui.closePanel" class="alpheios-panel__close-btn">
              <close-icon></close-icon>
          </div>
        </alph-tooltip>
      </span>
    </div>

    <div class="alpheios-panel__content">
      <drop-down-menu :visibility="menuVisible"/>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab-panel--fw"
          v-show="$store.getters['ui/isActiveTab']('morphology')">

        <div :id="'alpheios-panel-lexical-data-container'" class="alpheios-popup__morph-cont alpheios-text-small alpheios-popup__morph-cont-ready"
             v-show="$store.state.app.morphDataReady && app.hasMorphData()">
          <morph :id="'alpheios-panel-morph-component'"></morph>

          <!--<div class="alpheios-popup__morph-cont-providers" v-if="showProviders">
            <div class="alpheios-popup__morph-cont-providers-header">{{ l10n.getText('LABEL_POPUP_CREDITS') }}</div>
            <div class="alpheios-popup__morph-cont-providers-source" v-for="p in $store.state.app.providers">
              {{ p.toString() }}
            </div>
          </div>-->
        </div>
      </div>
      <div
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab-panel--fw alpheios-panel__tab__definitions"
          v-if="$store.getters['ui/isActiveTab']('definitions')"
          data-alpheios-ignore="all"
          >
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-defs`"
          />
        </div>
        <div v-if="$store.getters['app/defDataReady']">
          <div :key="definition.ID"
               class="alpheios-panel__contentitem" v-for="definition in formattedShortDefinitions">
            <shortdef :definition="definition" :languageCode="$store.state.app.languageCode"></shortdef>
          </div>
          <div class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
               v-html="formattedFullDefinitions"></div>
        </div>
        <div v-else>
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
      </div>
      <div :id="inflectionsPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
           v-if="$store.state.app.hasInflData" v-show="$store.getters['ui/isActiveTab']('inflections')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_PANEL') }}
        </h1>
        <inflections @contentwidth="setContentWidth" class="alpheios-panel-inflections"></inflections>
      </div>
      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_BROWSER_PANEL') }}
        </h1>
        <inflection-browser @contentwidth="setContentWidth">
        </inflection-browser>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
            data-alpheios-ignore="all"
           v-show="$store.getters['ui/isActiveTab']('grammar')">
        <grammar></grammar>
      </div>
      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.getters['ui/isActiveTab']('treebank')"
          data-alpheios-ignore="all">
        <!-- TODO: Instead of this we need to create a universal mechanism for handling panel resizing for every tab's content change -->
        <treebank @treebankcontentwidth="setTreebankContentWidth"></treebank>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status"
           v-show="$store.getters['ui/isActiveTab']('status')"
           data-alpheios-ignore="all">
        <!-- Messages to be displayed in a status panel -->
        <div v-for="message in $store.state.ui.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status"
          v-if="$store.state.auth.showUI" v-show="$store.getters['ui/isActiveTab']('user')"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
           v-if="$store.state.app.wordUsageExampleEnabled"
           v-show="$store.getters['ui/isActiveTab']('wordUsage')"
        >
        <word-usage-examples></word-usage-examples>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__options"
           v-show="$store.getters['ui/isActiveTab']('options')"
           data-alpheios-ignore="all"
      >
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
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.panel"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items && app.isDevMode()"></setting>
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

        <setting :classes="['alpheios-panel__options-item']"
                 :data="settings.contentOptions.items.wordUsageExamplesAuthMax"
                 @change="contentOptionChanged"
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
           v-show="$store.getters['ui/isActiveTab']('info')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_HELP_PANEL') }}
        </h1>
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-info`"
          />
        </div>
        <info></info>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist"
           v-show="$store.getters['ui/isActiveTab']('wordlist')"
      >
        <word-list-panel></word-list-panel>
      </div>
    </div>
    <div class="alpheios-panel__notifications alpheios-text-small"
         :class="{ 'alpheios-panel__notifications--important': $store.state.ui.notification.important }"
         v-if="$store.state.ui.notification.visible" v-show="$store.state.ui.notification.important">
            <span @click="$store.commit(`ui/resetNotification`)" class="alpheios-panel__notifications-close-btn">
                <close-icon></close-icon>
            </span>
      <span class="alpheios-panel__notifications-text" v-html="$store.state.ui.notification.text"></span>
      <setting :classes="['alpheios-panel__notifications--lang-switcher alpheios-text-smaller']"
               :data="settings.contentOptions.items.preferredLanguage"
               @change="contentOptionChanged"
               v-show="$store.state.ui.notification.showLanguageSwitcher"></setting>
    </div>
    <div class="alpheios-panel__notifications-auth alpheios-panel__notifications--important"
         :data-count="$store.state.auth.notification.count"
         v-if="$store.state.auth.notification.text" v-show="$store.state.auth.notification.count === 1 || $store.state.auth.notification.count % 10 == 0">
         <span @click="$store.commit(`auth/resetNotification`)" class="alpheios-panel__notifications-close-btn">
            <close-icon></close-icon>
         </span>
         <span v-html="l10n.getMsg($store.state.auth.notification.text)"></span>
         <login v-show="$store.state.auth.notification.showLogin"></login>
    </div>
  </div>
</template>
<script>
/*
  This is a mobile version of a panel
   */

// Vue components
import DropDownMenu from '@/vue/components/nav/drop-down-menu.vue'
import NavbuttonsCompact from '@/vue/components/nav/navbuttons-compact.vue'
import Inflections from './inflections.vue'
import Setting from './setting.vue'
import Login from './login.vue'
import ShortDef from './shortdef.vue'
import Grammar from './grammar.vue'
import Morph from './morph.vue'
import Treebank from './treebank.vue'
import Info from './info.vue'
import InflectionBrowser from './inflections-browser.vue'
import Tooltip from './tooltip.vue'
import Lookup from './lookup.vue'
import ReskinFontColor from './font-size.vue'
import UserAuth from './user-auth.vue'
import WordUsageExamples from '@/vue/components/word-usage-examples/word-usage-examples.vue'
import { Definition } from 'alpheios-data-models'
import WordListPanel from '@/vue/components/word-list/word-list-panel.vue'
// Embeddable SVG icons
import MenuIcon from '@/images/inline-icons/menu.svg'
import CloseIcon from '../../images/inline-icons/close.svg'
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
    auth: 'auth'
  },
  storeModules: ['app', 'ui', 'panel', 'auth'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    menuIcon: MenuIcon,
    dropDownMenu: DropDownMenu,
    navbuttonsCompact: NavbuttonsCompact,
    inflections: Inflections,
    inflectionBrowser: InflectionBrowser,
    setting: Setting,
    login: Login,
    shortdef: ShortDef,
    info: Info,
    grammar: Grammar,
    morph: Morph,
    treebank: Treebank,
    userAuth: UserAuth,
    closeIcon: CloseIcon,
    alphTooltip: Tooltip,
    lookup: Lookup,
    reskinFontColor: ReskinFontColor,
    wordListPanel: WordListPanel,
    wordUsageExamples: WordUsageExamples
  },
  directives: {
    onClickaway: onClickaway
  },
  minWidth: 400, // A minimal width of a panel, in pixels
  defaultScrollPadding: 20,
  data: function () {
    return {
      menuVisible: false,
      inflectionsPanelID: 'alpheios-panel__inflections-panel',
      inflectionsBrowserPanelID: 'alpheios-panel__inflections-browser-panel',
      panelPosition: 'left',
      panelLeftPadding: 0,
      panelRightPadding: 0,
      scrollPadding: 0,
      panelWidth: null
    }
  },

  computed: {
    mainstyles: function () {
      this.panelWidth = this.panelWidth ? this.panelWidth : this.$options.minWidth
      return {
        zIndex: this.ui.zIndex
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

    attachToLeftVisible: function () {
      return this.panelPosition === 'right'
    },

    attachToRightVisible: function () {
      return this.panelPosition === 'left'
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

    formattedShortDefinitions () {
      let definitions = []
      if (this.$store.getters['app/defDataReady'] && this.$store.state.app.homonymDataReady) {
        for (const lexeme of this.app.getHomonymLexemes()) {
          if (lexeme.meaning.shortDefs.length > 0) {
            definitions.push(...lexeme.meaning.shortDefs)
          } else if (Object.entries(lexeme.lemma.features).length > 0) {
            definitions.push(new Definition(this.l10n.getMsg('TEXT_NOTICE_NO_DEFS_FOUND'), 'en-US', 'text/plain', lexeme.lemma.word))
          }
        }
      }
      return definitions
    },

    formattedFullDefinitions () {
      let content = ''
      if (this.$store.getters['app/defDataReady'] && this.$store.state.app.homonymDataReady) {
        for (const lexeme of this.app.getHomonymLexemes()) {
          content += `<h3>${lexeme.lemma.word}</h3>\n`
          for (const fullDef of lexeme.meaning.fullDefs) {
            content += `${fullDef.text}<br>\n`
          }
        }
      }
      return content
    }
  },
  methods: {
    menuItemClicked () {
      this.menuVisible = !this.menuVisible
    },

    setPosition (position) {
      this.settings.contentOptions.items.panelPosition.setValue(position)
      this.panelPosition = position
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
  @import "../../styles/variables";

  .alpheios-panel {
    z-index: 2000;
    position: fixed;
    resize: both;
    opacity: 0.95;
    direction: ltr;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: uisize(56px) auto uisize(56px);
    grid-template-areas: "header" "content" "content";
  }

  .alpheios-panel[data-notification-visible="true"] {
    grid-template-areas: "header" "content" "notifications"
  }

  .alpheios-panel__header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    box-sizing: border-box;
    grid-area: header;
    background: var(--alpheios-toolbar-bg-color);
  }

  .alpheios-panel__header-selection {
    font-size: 16px;
    font-weight: 700;
    color: var(--alpheios-color-muted);
  }

  .alpheios-panel__header-word {
    font-size: 14px;
    position: relative;
    top: -1px;
  }

  .alpheios-panel__close-btn {
    width: uisize(60px);
    height: 100%;
    cursor: pointer;
    fill: var(--alpheios-icon-color);
    stroke: var(--alpheios-icon-color);
    stroke-width: 2.5;

    svg {
      position: relative;
      left: uisize(8px);
      width: uisize(44px);
      height: auto;
      top: 50%;
      transform: translateY(-50%);
    }

    &:hover,
    &:focus {
      fill: var(--alpheios-icon-color-hover);
      stroke: var(--alpheios-icon-color-hover);
      background: var(--alpheios-icon-bg-color-hover);
    }

    &:active {
      fill: var(--alpheios-icon-color-pressed);
      stroke: var(--alpheios-icon-color-pressed);
      background: var(--alpheios-icon-bg-color-pressed);
    }
  }

  .alpheios-panel__content {
    overflow: auto;
    grid-area: content;
    direction: ltr;
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap;
    align-items: flex-start;
    // Need to set element as an offset parent for panel content items
    position: relative;
    background: var(--alpheios-color-neutral-lightest);
    padding-top: uisize(20px);
  }

  .alpheios-panel__title {
    text-transform: capitalize;
  }

  .alpheios-lookup__panel {
    display: block;
    border-bottom: 1px solid;
    margin-bottom: 20px;
  }

  .alpheios-panel__notifications, .alpheios-panel_notifications-auth {
    display: none;
    position: relative;
    padding: 10px 20px;
    background: var(--alpheios-color-muted);
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
    fill: var(--alpheios-color-light);
    stroke: var(--alpheios-color-light);
  }

  .alpheios-panel__notifications-close-btn:hover,
  .alpheios-panel__notifications-close-btn:focus {
    fill: var(--alpheios-color-neutral-light);
    stroke: var(--alpheios-color-neutral-light);
  }

  .alpheios-panel__notifications--lang-switcher {
    font-size: 12px;
    float: right;
    margin: -20px 10px 0 0;
    display: inline-block;
  }

  .alpheios-panel__notifications--lang-switcher .alpheios-select {
    width: 120px;
    height: 25px;
  }

  .alpheios-panel__notifications--important {
    color: var(--alpheios-color-neutral-lightest);
    background: var(--alpheios-color-muted);
  }

  [data-notification-visible="true"] .alpheios-panel__notifications {
    display: block;
  }

  [data-notification-auth-visible="true"] .alpheios-panel__notifications-auth {
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

  .alpheios-panel__tab__inflections {
    h1 {
      margin-bottom: textsize(5px);
    }
  }

  .alpheios-panel__message {
    margin-bottom: 0.5rem;
  }

  .alpheios-panel__contentitem {
    margin-bottom: 1em;
  }

  .alpheios-panel__header-btn-group--center {
    direction: ltr;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    height: 100%;
  }

  .alpheios-panel__header-btn-group--end {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    box-sizing: border-box;
    height: 100%;
  }

  .alpheios-panel__tab__options {
    width: 100%;
    max-width: uisize(600px);
  }

  .alpheios-panel__options-item {
    margin-bottom: textsize(10px);
    display: flex;
    align-items: flex-start;
  }

  .alpheios-panel__menu-btn {
    width: 40px;
    height: 40px;
    margin: 10px 10px 10px 30px;
    cursor: pointer;
  }

  .alpheios-panel__menu-icon {
    width: 40px;
    height: 40px;
    fill: var(--alpheios-color-neutral-lightest);
  }

  .alpheios-panel__menu-icon:hover,
  .alpheios-panel__menu-icon:focus {
    fill: var(--alpheios-color-neutral-light);
  }

  // Special styles for compact panel
  .alpheios-panel--compact {
    height: 50vh;
    width: 100%;
    left: 0;
    bottom: 0;
    border-top: 1px solid var(--alpheios-border-color);

    & .alpheios-panel__content {
      overflow: auto;
    }
  }
</style>
