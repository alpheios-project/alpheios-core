<template>
  <div
      :class="rootClasses"
      class="alpheios-panel alpheios-panel--compact alpheios-content"
      :style="componentStyles"
      data-component="alpheios-panel"
      data-resizable="true"
      id="alpheios-panel-inner"
      v-show="$store.state.panel.visible"
  >

    <div class="alpheios-panel__header" >
      <div class="alpheios-panel__menu-btn" @click="menuItemSelected">
        <menu-icon
            class="alpheios-panel__menu-icon"
            :class="{'menu-open': menuVisible}"
        />
      </div>

      <div class="alpheios-panel__header-title">
        {{ panelTitle }}
      </div>

      <span class="alpheios-panel__header-btn-group--end">
        <alph-tooltip
            :tooltipText="l10n.getText('TOOLTIP_CLOSE_PANEL')"
            tooltipDirection="top">
          <div
              @click="closePanel"
              class="alpheios-panel__close-btn"
          >
              <close-icon/>
          </div>
        </alph-tooltip>
      </span>
    </div>

    <div class="alpheios-panel__content">
      <drop-down-menu
          v-show="menuVisible"
          @drop-down-menu-item-selected="menuItemSelected"
      />
      <div
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding"
          v-show="$store.getters['ui/isActiveTab']('morphology') && !menuVisible">

        <div :id="'alpheios-panel-lexical-data-container'"
             class="alpheios-popup__morph-cont alpheios-text-small alpheios-popup__morph-cont-ready"
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
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab__definitions"
          v-show="$store.getters['ui/isActiveTab']('definitions') && !menuVisible"
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
          v-show="$store.state.app.hasInflData && $store.getters['ui/isActiveTab']('inflections') && !menuVisible"
          data-alpheios-ignore="all"
      >
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_PANEL') }}
        </h1>
        <inflections class="alpheios-panel-inflections"></inflections>
      </div>

      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser') && !menuVisible"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_BROWSER_PANEL') }}
        </h1>
        <inflection-browser/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding"
           data-alpheios-ignore="all"
           v-show="$store.getters['ui/isActiveTab']('grammar') && !menuVisible">
        <grammar></grammar>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank alpheios-panel__tab-panel--no-padding"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.getters['ui/isActiveTab']('treebank') && !menuVisible"
          data-alpheios-ignore="all">
        <treebank/>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status"
           v-show="$store.getters['ui/isActiveTab']('status') && !menuVisible"
           data-alpheios-ignore="all">
        <!-- Messages to be displayed in a status panel -->
        <div v-for="message in $store.state.ui.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__user"
           v-if="$store.state.auth.enableLogin" v-show="$store.getters['ui/isActiveTab']('user') && !menuVisible"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>

      <div
          class="alpheios-panel__tab-panel"
          v-show="$store.getters['ui/isActiveTab']('wordUsage') && !menuVisible"
          data-alpheios-ignore="all"
      >
        <word-usage-examples/>
      </div>

      <div class="alpheios-panel__tab-panel"
           v-show="$store.getters['ui/isActiveTab']('options') && !menuVisible"
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
           v-show="$store.getters['ui/isActiveTab']('info') && !menuVisible"
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

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist"
           v-show="$store.getters['ui/isActiveTab']('wordlist') && !menuVisible"
           data-alpheios-ignore="all"
      >
        <word-list-panel/>
      </div>
    </div>

    <notification-area
      v-show="!menuVisible"
    />
  </div>
</template>
<script>
/*
  This is a mobile version of a panel
   */
// Support libraries
import HTMLPage from '@/lib/utility/html-page.js'
// Vue components
import DropDownMenu from '@/vue/components/nav/drop-down-menu.vue'
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
import MenuIcon from '@/images/inline-icons/book-open.svg'
import CloseIcon from '@/images/inline-icons/x-close.svg'
// Vue directives
import { directive as onClickaway } from '../directives/clickaway.js'

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
  data: function () {
    return {
      menuVisible: false,
      inflectionsPanelID: 'alpheios-panel__inflections-panel',
      inflectionsBrowserPanelID: 'alpheios-panel__inflections-browser-panel',
      panelLeftPadding: 0,
      panelRightPadding: 0,
      scrollPadding: 0,
      resized: false
    }
  },

  // `positionClassVariants` is a custom property. This is to prent Vue from attaching reactivity to it.
  positionClassVariants: {
    left: 'alpheios-panel--left',
    right: 'alpheios-panel--right'
  },

  computed: {
    rootClasses () {
      /*
      Position classes are needed for landscape orientations only as only those
      can have compact panel attached to either left or right.
      For portrait-oriented screens a compact panel will occupy full width.
       */
      return (this.$store.state.panel.orientation === HTMLPage.orientations.LANDSCAPE)
        ? this.$options.positionClassVariants[this.$store.state.panel.position]
        : ''
    },

    componentStyles: function () {
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
    },

    panelTitle () {
      let title = ''
      switch (this.$store.state.ui.activeTab) {
        case 'info':
          title = this.l10n.getText('TOOLTIP_HELP')
          break
        case 'morphology':
          title = this.l10n.getText('TOOLTIP_MORPHOLOGY')
          break
        case 'definitions':
          title = this.l10n.getText('TOOLTIP_DEFINITIONS')
          break
        case 'inflections':
          title = this.l10n.getText('TOOLTIP_INFLECT')
          break
        case 'inflectionsbrowser':
          title = this.l10n.getText('TOOLTIP_INFLECT_BROWSER')
          break
        case 'grammar':
          title = this.l10n.getText('TOOLTIP_GRAMMAR')
          break
        case 'treebank':
          title = this.l10n.getText('TOOLTIP_TREEBANK')
          break
        case 'options':
          title = this.l10n.getText('TOOLTIP_OPTIONS')
          break
        case 'user':
          title = this.l10n.getText('TOOLTIP_USER')
          break
        case 'wordUsage':
          title = this.l10n.getText('TOOLTIP_WORD_USAGE')
          break
        case 'wordlist':
          title = this.l10n.getText('TOOLTIP_WORDLIST')
          break
        case 'status':
          title = this.l10n.getText('TOOLTIP_STATUS')
          break
      }
      return title
    }
  },
  methods: {
    menuItemSelected () {
      this.menuVisible = !this.menuVisible
    },

    setPosition (position) {
      this.settings.contentOptions.items.panelPosition.setValue(position)
      this.$store.commit('panel/setPosition', position)
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

    closePanel () {
      this.ui.closePanel()
      // Close the menu if it was open during the panel closing
      this.menuVisible = false
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
    grid-template-columns: min-content;
    grid-template-rows: $alpheios-toolbar-height 1fr min-content;
    grid-template-areas: "header" "content" "notifications";

    &[data-resized="true"] {
      grid-template-columns: auto;
    }
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
    align-items: stretch;
    // Need to set element as an offset parent for panel content items
    position: relative;
    background: var(--alpheios-color-neutral-lightest);

    [data-resized="true"] & {
      max-width: none;
    }
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
    padding: 40px 20px 20px;
    flex: 1 1 auto;
    box-sizing: border-box;
  }

  .alpheios-panel__tab-panel--scroll {
    overflow: auto;
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

  .alpheios-panel__header-title {
    direction: ltr;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    align-items: stretch;
    color: var(--alpheios-color-light);
    font-family: var(--alpheios-serif-font-face);
    font-size: uisize(24px);
  }

  .alpheios-panel__header-btn-group--end {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    box-sizing: border-box;
    align-items: stretch;
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

    &:hover {
      fill: var(--alpheios-color-bright-hover);
    }

    &.menu-open {
      fill: var(--alpheios-color-bright);
    }
  }

  // Special styles for compact panel
  .alpheios-panel--compact {
    height: 50vh;
    width: 100vw;
    left: 0;
    bottom: 0;

    &.alpheios-panel {
      grid-template-columns: auto;
    }

    &.alpheios-panel--left {
      height: 100vh;
      width: 50vw;
      top: 0;
      bottom: auto;
    }

    &.alpheios-panel--right {
      height: 100vh;
      width: 50vw;
      right: 0;
      left: auto;
      top: 0;
      bottom: auto;
    }

    & .alpheios-panel__content {
      overflow: auto;
    }
  }
</style>
