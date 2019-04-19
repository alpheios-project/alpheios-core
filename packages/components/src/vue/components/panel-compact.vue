<template>
  <div class="alpheios-panel alpheios-panel--compact alpheios-content"
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
             v-show="hasMorphologyData">
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
          v-show="$store.getters['ui/isActiveTab']('definitions')"
          data-alpheios-ignore="all"
      >
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-defs`"
          />
        </div>
        <div v-if="$store.getters['app/defDataReady']">
          <div :key="definition.ID"
               class="alpheios-panel__contentitem"
               v-for="definition in formattedShortDefinitions"
          >
            <shortdef
                :definition="definition"
                :languageCode="$store.state.app.languageCode"
            />
          </div>
          <div
              class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
              v-html="formattedFullDefinitions"/>
        </div>
        <div v-else>
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
        <div
            class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
            v-html="formattedFullDefinitions"
        />
      </div>

      <div
          :id="inflectionsPanelID"
          class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
           v-show="$store.state.app.hasInflData && $store.getters['ui/isActiveTab']('inflections')"
          data-alpheios-ignore="all"
      >
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

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__user"
          v-if="$store.state.auth.showUI" v-show="$store.getters['ui/isActiveTab']('user')"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
          v-show="$store.getters['ui/isActiveTab']('wordUsage')"
        >
        <word-usage-examples/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__options"
           v-show="$store.getters['ui/isActiveTab']('options')"
           data-alpheios-ignore="all"
      >
        <reskin-font-color></reskin-font-color>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.preferredLanguage"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.panelPosition"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.popupPosition"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.uiType"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.verboseMode"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.skin"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.panel"
            @change="uiOptionChanged"
            v-show="app.isDevMode()"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.popup"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.panelOnActivate"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="languageSetting"
            :key="languageSetting.name"
            @change="resourceSettingChanged"
            v-for="languageSetting in resourceSettingsLexicons"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="languageSetting"
            :key="languageSetting.name"
            @change="resourceSettingChanged"
            v-for="languageSetting in resourceSettingsLexiconsShort"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.enableWordUsageExamples"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesON"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesAuthMax"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesMax"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.enableLemmaTranslations"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.locale"
            @change="contentOptionChanged"
        >
        </setting>
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
              :show-results-in="`panel`"
          />
        </div>
        <info></info>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist alpheios-panel__tab-panel--fw"
           v-show="$store.getters['ui/isActiveTab']('wordlist')"
           data-alpheios-ignore="all"
      >
        <word-list-panel :updated="$store.state.app.wordListUpdateTime" :wordlistC="app.wordlistC"></word-list-panel>
      </div>
    </div>

    <notification-area/>
  </div>
</template>
<script>
/*
  This is a mobile version of a panel
   */

// Vue components
import DropDownMenu from '@/vue/components/nav/drop-down-menu.vue'
import NavbuttonsCompact from '@/vue/components/nav/navbuttons-compact.vue'
import NotificationArea from '@/vue/components//notification-area.vue'
import Inflections from './inflections.vue'
import Setting from './setting.vue'
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
import CloseIcon from '@/images/inline-icons/x-close.svg'
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
    notificationArea: NotificationArea,
    inflections: Inflections,
    inflectionBrowser: InflectionBrowser,
    setting: Setting,
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
  // A minimal width of a panel, in pixels. This is high to fit all te buttons of a large size into the panel
  minWidth: 650,
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

    hasMorphologyData: function () {
      return this.$store.state.app.morphDataReady && this.app.hasMorphData()
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
  $alpheios-toolbar-height: uisize(56px);

  .alpheios-panel {
    z-index: 2000;
    position: fixed;
    resize: both;
    opacity: 0.95;
    direction: ltr;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: $alpheios-toolbar-height 1fr min-content;
    grid-template-areas: "header" "content" "notifications";
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
    height: $alpheios-toolbar-height;
    cursor: pointer;
    fill: var(--alpheios-icon-color);
    stroke: var(--alpheios-icon-color);
    stroke-width: 2.5;

    svg {
      position: relative;
      left: uisize(8px);
      width: uisize(28px);
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

  .alpheios-panel__tab-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
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
    align-items: stretch;
  }

  .alpheios-panel__header-btn-group--end {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    box-sizing: border-box;
    align-items: stretch;
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
