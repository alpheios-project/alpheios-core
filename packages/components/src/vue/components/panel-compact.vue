<template>
  <div
      :class="rootClasses"
      class="alpheios-panel alpheios-panel--compact alpheios-content"
      :style="componentStyles"
      data-component="alpheios-panel"
      data-resizable="true"
      :id="panelId"
      v-show="$store.state.panel.visible"
  >

    <div class="alpheios-panel__header" :data-tab="currentTab">
      <div class="alpheios-panel__header-btn-group--start" >
        <div class="alpheios-panel__header-btn" :class="{ 'alpheios-navbuttons__icon-active': currentTab === 'morphology' }">
          <span @click="changeTab('morphology')" class="alpheios-navbuttons__icon-span">
            <morphology-icon class="alpheios-navbuttons__icon"
              v-show="showMorphologyIcon"
            />
          </span>
        </div>
        <div class="alpheios-panel__header-btn"
          v-show="$store.getters['app/fullDefDataReady'] && showMainTabIcons"
          :class="{ 'alpheios-navbuttons__icon-active': currentTab === 'definitions' }"
        >
          <span @click="changeTab('definitions')" class="alpheios-navbuttons__icon-span">
            <definitions-icon class="alpheios-navbuttons__icon" />
          </span>
        </div>
        <div class="alpheios-panel__header-btn alpheios-panel__header-btn--infl-data"
           v-show="$store.state.app.hasInflData && showMainTabIcons"
           :class="{ 'alpheios-navbuttons__icon-active': currentTab === 'inflections' }"
        >
          <span @click="changeTab('inflections')" class="alpheios-navbuttons__icon-span">
            <inflections-icon class="alpheios-navbuttons__icon"/>
          </span>
        </div>
        <div class="alpheios-panel__header-btn"
           v-show="$store.state.app.wordUsageExampleEnabled && showMainTabIcons"
           :class="{ 'alpheios-navbuttons__icon-active': currentTab === 'wordUsage' }"
        >
          <span @click="changeTab('wordUsage')" class="alpheios-navbuttons__icon-span">
            <word-usage-icon class="alpheios-navbuttons__icon"/>
          </span>
        </div>
        <div class="alpheios-panel__header-btn alpheios-panel__header-btn--treebank-data"
           v-show="$store.getters['app/hasTreebankData'] && showMainTabIcons"
           :class="{ 'alpheios-navbuttons__icon-active': currentTab === 'treebank' }"
        >
          <span @click="changeTab('treebank')" class="alpheios-navbuttons__icon-span">
            <treebank-icon @click="changeTab('treebank')" class="alpheios-navbuttons__icon"/>
          </span>
        </div>
        <div class="alpheios-panel__header-btn alpheios-navbuttons__icon-active"
          v-show="currentTab === 'inflectionsbrowser'"
        >
          <span class="alpheios-navbuttons__icon-span">
            <inflections-browser-icon class="alpheios-navbuttons__icon"/>
          </span>
        </div>
        <div class="alpheios-panel__header-btn  alpheios-navbuttons__icon-active"
          v-show="currentTab === 'grammar'"
        >
          <span class="alpheios-navbuttons__icon-span">
            <grammar-icon class="alpheios-navbuttons__icon"/>
          </span>
        </div>
        <div class="alpheios-panel__header-btn  alpheios-navbuttons__icon-active"
          v-show="currentTab === 'wordlist'"
        >
          <span class="alpheios-navbuttons__icon-span">
            <wordlist-icon class="alpheios-navbuttons__icon"/>
          </span>
        </div>
        <div class="alpheios-panel__header-btn alpheios-navbuttons__icon-active"
          v-show="currentTab === 'user'"
        >
          <span class="alpheios-navbuttons__icon-span">
            <user-icon class="alpheios-navbuttons__icon"/>
          </span>
        </div>
        <div class="alpheios-panel__header-btn alpheios-navbuttons__icon-active"
          v-show="currentTab === 'options'"
        >
          <span class="alpheios-navbuttons__icon-span">
            <options-icon class="alpheios-navbuttons__icon"/>
          </span>
        </div>
      </div>
      <div class="alpheios-panel__header-btn-group--end">
        <div
            class="alpheios-panel__header-btn"
            @click="expand"
            v-show="!isLandscape && !expanded"
        >
          <up-icon/>
        </div>

        <div
            class="alpheios-panel__header-btn"
            @click="contract"
            v-show="!isLandscape && expanded"
        >
          <down-icon/>
        </div>

        <div
            class="alpheios-panel__header-btn"
            @click="expandOrContract"
            v-show="isLandscape && leftBtnVisible"
        >
          <left-icon/>
        </div>

        <div
            class="alpheios-panel__header-btn"
            @click="expandOrContract"
            v-show="isLandscape && rightBtnVisible"
        >
          <right-icon/>
        </div>

        <div
            @click="closePanel"
            class="alpheios-panel__close-btn"
        >
          <close-icon/>
        </div>
      </div>
    </div>

    <div class="alpheios-panel__content">
      <div
          class="alpheios-panel__tab-panel"
          v-show="$store.getters['ui/isActiveTab']('morphology')">

        <div class="alpheios-popup__definitions--placeholder"
             v-if="$store.getters['app/lexicalRequestInProgress'] && Boolean(this.$store.state.app.currentLanguageName)">
          <progress-bar :text="l10n.getText('PLACEHOLDER_LEX_DATA_LOADING')"></progress-bar>
        </div>

        <div class="alpheios-popup__definitions--placeholder"
             v-show="!this.$store.state.app.currentLanguageName && !$store.state.app.morphDataReady">
          {{ l10n.getText('PLACEHOLDER_NO_LANGUAGE_DATA') }}
        </div>
        <div class="alpheios-popup__definitions--placeholder"
             v-show="$store.state.app.morphDataReady && !app.hasMorphData() && Boolean(this.$store.state.app.currentLanguageName)">
          {{ l10n.getText('PLACEHOLDER_NO_MORPH_DATA') }}
        </div>
        <div :id="lexicalDataContainerID"
             v-show="$store.state.app.morphDataReady && app.hasMorphData()"
        >
          <morph/>
        </div>

        <div
            class="alpheios-popup__providers"
            v-show="$store.state.app.morphDataReady && app.hasMorphData() && $store.state.app.providers.length > 0"
        >
          <div class="alpheios-popup__providers-title">
            <a class="alpheios-popup__providers-link" v-on:click="switchProviders">{{ l10n.getText('LABEL_PROVIDERS_CREDITS') }}</a>
          </div>
          <div v-show="showProviders">
            <div
                class="alpheios-popup__providers-item"
                v-for="p in $store.state.app.providers"
            >
              {{ p.toString() }}
            </div>
          </div>
        </div>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__definitions"
          v-show="$store.getters['ui/isActiveTab']('definitions')"
          data-alpheios-ignore="all"
      >
        <div v-if="$store.getters['app/shortDefDataReady']">
          <div :key="definition.ID"
               class="alpheios-panel__contentitem"
               v-for="definition in formattedShortDefinitions"
          >
            <shortdef
                :definition="definition"
                :languageCode="$store.state.app.languageCode"
            />
          </div>
        </div>

        <div v-if="$store.getters['app/fullDefDataReady']">
          <div
              class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
              v-html="formattedFullDefinitions"/>
        </div>
        <div v-else>
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
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
        <inflections class="alpheios-panel-inflections"></inflections>
      </div>

      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser')"
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
           v-show="$store.getters['ui/isActiveTab']('grammar')">
        <grammar></grammar>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank alpheios-panel__tab-panel--no-padding"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.getters['ui/isActiveTab']('treebank')"
          data-alpheios-ignore="all">
        <treebank/>
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
           v-if="$store.state.auth.enableLogin" v-show="$store.getters['ui/isActiveTab']('user')"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
          v-show="$store.getters['ui/isActiveTab']('wordUsage')"
      >
        <word-usage-examples/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab-panel--options"
           v-show="$store.getters['ui/isActiveTab']('options')"
           data-alpheios-ignore="all"
      >
        <options-panel />
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist"
           v-show="$store.getters['ui/isActiveTab']('wordlist')"
           data-alpheios-ignore="all"
      >
        <word-list-panel/>
      </div>
    </div>

    <notification-area />
  </div>
</template>
<script>
/*
  This is a mobile version of a panel
   */
// JS imports
import interact from 'interactjs'
// Support libraries
import Platform from '@/lib/utility/platform.js'
// Vue components
import NotificationArea from '@/vue/components//notification-area.vue'
import Inflections from './inflections.vue'
import ShortDef from './shortdef.vue'
import Grammar from './grammar.vue'
import Morph from './morph.vue'
import Treebank from './treebank.vue'
import InflectionBrowser from './inflections-browser.vue'

import UserAuth from './user-auth.vue'
import WordUsageExamples from '@/vue/components/word-usage-examples/word-usage-examples.vue'
import { Definition } from 'alpheios-data-models'
import WordListPanel from '@/vue/components/word-list/word-list-panel.vue'
import ProgressBar from '@/vue/components/progress-bar.vue'
import OptionsPanel from '@/vue/components/options.vue'

// Embeddable SVG icons
import CloseIcon from '@/images/inline-icons/x-close.svg'
import UpIcon from '@/images/inline-icons/chevron-up.svg'
import DownIcon from '@/images/inline-icons/chevron-down.svg'
import LeftIcon from '@/images/inline-icons/chevron-left.svg'
import RightIcon from '@/images/inline-icons/chevron-right.svg'
import MorphologyIcon from '@/images/inline-icons/language.svg'
import DefinitionsIcon from '@/images/inline-icons/definitions.svg'
import InflectionsIcon from '@/images/inline-icons/inflections.svg'
import WordUsageIcon from '@/images/inline-icons/usage-examples-icon1.svg'
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import TreebankIcon from '@/images/inline-icons/sitemap.svg'

// Vue directives
import { directive as onClickaway } from '../directives/clickaway.js'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

const FONT_SIZE_PROP = '--alpheios-base-text-size'

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
    progressBar: ProgressBar,
    notificationArea: NotificationArea,
    inflections: Inflections,
    inflectionBrowser: InflectionBrowser,
    shortdef: ShortDef,
    grammar: Grammar,
    morph: Morph,
    treebank: Treebank,
    userAuth: UserAuth,
    closeIcon: CloseIcon,
    wordListPanel: WordListPanel,
    wordUsageExamples: WordUsageExamples,
    optionsPanel: OptionsPanel,
    upIcon: UpIcon,
    downIcon: DownIcon,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    morphologyIcon: MorphologyIcon,
    definitionsIcon: DefinitionsIcon,
    inflectionsIcon: InflectionsIcon,
    wordUsageIcon: WordUsageIcon,
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    grammarIcon: GrammarIcon,
    wordlistIcon: WordlistIcon,
    treebankIcon: TreebankIcon
  },
  directives: {
    onClickaway: onClickaway
  },
  // Custom props
  // An HTML element that contains alpheios CSS custom props
  customPropEl: undefined,
  customPropStyle: undefined,
  baseTextSize: undefined,
  scaledTextSize: undefined,
  textWasScaled: false,
  currentTextSize: undefined,
  panelVisibilityUnwatch: undefined,
  panelPositionUnwatch: undefined,
  panelOrientationUnwatch: undefined,

  data: function () {
    return {
      panelId: 'alpheios-panel-inner',
      menuVisible: false,
      inflectionsPanelID: 'alpheios-panel__inflections-panel',
      inflectionsBrowserPanelID: 'alpheios-panel__inflections-browser-panel',
      lexicalDataContainerID: 'alpheios-panel__lex-data-container',
      panelLeftPadding: 0,
      panelRightPadding: 0,
      scrollPadding: 0,
      // Whether the panel is expanded full width
      expanded: false,
      prevOrientation: null,
      prevExpanded: false,
      resized: false,
      showProviders: false
    }
  },

  // `positionClassVariants` is a custom property. This is to prent Vue from attaching reactivity to it.
  positionClassVariants: {
    left: 'alpheios-panel--left',
    right: 'alpheios-panel--right'
  },

  // custom property for use in constructing keys on subcomponents
  prefixName: 'panel-compact',

  computed: {
    currentTab () {
      return this.$store.state.ui.activeTab
    },
    showMainTabIcons () {
      let mainTabArray = ['morphology', 'definitions', 'inflections', 'wordUsage', 'treebank']
      return this.moduleConfig.showNav && mainTabArray.includes(this.currentTab)
    },
    showMorphologyIcon () {
      return this.$store.state.app.morphDataReady && this.app.hasMorphData() && (this.showMainTabIcons || this.currentTab === 'grammar')
    },
    rootClasses () {
      let classes = []

      /*
      Position classes are needed for landscape orientations only as only those
      can have compact panel attached to either left or right.
      For portrait-oriented screens a compact panel will occupy full width.
       */
      if (this.isLandscape) {
        classes.push(this.$options.positionClassVariants[this.$store.state.panel.position])
      }

      if (this.expanded) {
        classes.push('alpheios-panel--expanded')
      }
      return classes
    },



    componentStyles: function () {
      return {
        // It shall have a z-index higher than that of a popup
        zIndex: this.ui.zIndex + 10
      }
    },

    isLandscape: function () {
      // Have to use store prop to keep orientation reactive
      let isLandscapeCheck = (this.$store.state.panel.orientation === Platform.orientations.LANDSCAPE)

      if ((this.prevOrientation !== Platform.orientations.LANDSCAPE) && isLandscapeCheck) {
        this.expanded = true
      }

      if ((this.prevOrientation === Platform.orientations.LANDSCAPE) && !isLandscapeCheck) {
        this.expanded = this.prevExpanded
      }
      this.prevOrientation = this.$store.state.panel.orientation
      return isLandscapeCheck
    },

    isAttachedToLeft: function () {
      return this.$store.state.panel.position === 'left'
    },

    isAttachedToRight: function () {
      return this.$store.state.panel.position === 'right'
    },

    leftBtnVisible: function () {
      return (this.isAttachedToLeft && this.expanded) || (this.isAttachedToRight && !this.expanded)
    },

    rightBtnVisible: function () {
      return (this.isAttachedToRight && this.expanded) || (this.isAttachedToLeft && !this.expanded)
    },

    hasMorphologyData: function () {
      return this.$store.state.app.morphDataReady && this.app.hasMorphData()
    },

    additionalStylesTootipCloseIcon: function () {
      return {
        top: '2px',
        right: '50px'
      }
    },

    formattedShortDefinitions () {
      let definitions = [] // eslint-disable-line prefer-const
      if (this.$store.getters['app/shortDefDataReady'] && this.$store.state.app.homonymDataReady) {
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
      if (this.$store.getters['app/fullDefDataReady'] && this.$store.state.app.homonymDataReady) {
        for (const lexeme of this.app.getHomonymLexemes()) {
          content += `<h3>${lexeme.lemma.word}</h3>\n`
          for (const fullDef of lexeme.meaning.fullDefs) {
            content += `${fullDef.text}<br>\n`
          }
        }
      }
      return content
    },

    providersLinkText: function () {
      return this.showProviders ? this.l10n.getText('LABEL_POPUP_HIDECREDITS') : this.l10n.getText('LABEL_POPUP_SHOWCREDITS')
    }
  },
  methods: {
    swapPosition () {
      this.isAttachedToLeft ? this.setPosition('right') : this.setPosition('left')
    },

    setPosition (position) {
      this.settings.getUiOptions().items.panelPosition.setValue(position)
      this.$store.commit('panel/setPosition', position)
    },

    squeezePage () {
      let propName = this.isAttachedToRight ? 'padding-right' : 'padding-left'
      document.documentElement.style.setProperty(propName, '50%')
      document.body.classList.add('alpheios-layout-landscape-open-panel')
    },

    unsqueezePage () {
      document.documentElement.style.removeProperty('padding-left')
      document.documentElement.style.removeProperty('padding-right')
      document.body.classList.remove('alpheios-layout-landscape-open-panel')
    },

    contentOptionChanged: function (name, value) {
      this.app.contentOptionChange(name, value)
    },

    expand () {
      this.expanded = true
      this.prevExpanded = this.expanded
    },

    contract () {
      this.expanded = false
      this.prevExpanded = this.expanded
    },

    expandOrContract () {
      this.expanded = !this.expanded
      this.prevExpanded = this.expanded
    },

    closePanel () {
      this.ui.closePanel()
      // Reset a scaled font size
      if (this.$options.textWasScaled) {
        // Reset a custom font size scaling and set the font size to the value specified in options
        document.documentElement.style.setProperty(FONT_SIZE_PROP, `${this.settings.getUiOptions().items.fontSize.currentValue}px`)
        this.$options.textWasScaled = false
      }

      // Close the menu if it was open during the panel closing
      this.menuVisible = false
    },

    gestureMoveListener: function (event) {
      const computedFontSize = Math.round(this.$options.scaledTextSize * event.scale)
      if (Math.abs(computedFontSize - this.$options.currentTextSize) > 1) {
        // Update element's style only when size change is greater than 1px to avoid extra redraws
        this.$options.currentTextSize = computedFontSize
        document.documentElement.style.setProperty(FONT_SIZE_PROP, `${this.$options.currentTextSize}px`, 'important')
        this.$options.textWasScaled = true // This text was custom adjusted
      }
    },

    gestureEndListener: function () {
      this.$options.scaledTextSize = this.$options.currentTextSize
    },

    switchProviders: function () {
      this.showProviders = !this.showProviders
    },

    changeTab (tabName) {
      this.ui.changeTab(tabName)
    }
  },

  mounted: function () {
    this.$options.customPropEl = document.querySelector('html')
    this.$options.customPropStyle = window.getComputedStyle(this.$options.customPropEl, null)
    this.$options.baseTextSize = this.$options.customPropStyle.getPropertyValue('font-size')
    // Remove pixel units from the value string
    this.$options.baseTextSize = this.$options.baseTextSize.replace(/px/, '')
    this.$options.scaledTextSize = this.$options.baseTextSize
    this.$options.currentTextSize = this.$options.baseTextSize

    interact(`#${this.panelId}`).gesturable({})
      .on('gesturemove', this.gestureMoveListener.bind(this))
      .on('gestureend', this.gestureEndListener.bind(this))

    this.$options.panelVisibilityUnwatch = this.$store.watch((state) => state.panel.visible, (newValue) => {
      if (this.app.platform.isMobile) {
        if (newValue && this.isLandscape) {
          // Panel became visible
          this.squeezePage()
        } else {
          // Panel was hidden
          this.unsqueezePage()
        }
      }
    })

    this.$options.panelPositionUnwatch = this.$store.watch((state) => state.panel.position, () => {
      if (this.app.platform.isMobile && this.isLandscape && this.$store.state.panel.visible) {
        // Clear previous values first, then set new ones
        this.unsqueezePage()
        this.squeezePage()
      }
    })

    this.$options.panelOrientationUnwatch = this.$store.watch((state) => state.panel.orientation, () => {
      this.unsqueezePage()
      if (this.app.platform.isMobile && this.isLandscape && this.$store.state.panel.visible) {
        this.squeezePage()
      }
    })
  },

  beforeDestroy () {
    // Teardown the watcher
    this.$options.panelVisibilityUnwatch()
    this.$options.panelPositionUnwatch()
    this.$options.panelOrientationUnwatch()
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

    touch-action: pan-x pan-y;

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
    background: var(--alpheios-compact-panel-header-bg);
    // The rule below required to make sizes and positions of header element dependent on the UI base size
    font-size: var(--alpheios-base-ui-size);
  }

  .alpheios-panel__menu-icon {
    width: 32px;
    height: auto;
    fill: var(--alpheios-compact-panel-icon-color);

    &:hover {
      fill: var(--alpheios-compact-panel-icon-color-hover);
    }

    &.menu-open {
      fill: var(--alpheios-compact-panel-icon-color-hover);
    }
  }

  .alpheios-panel__header-btn-group--start {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
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

  .alpheios-panel__header-btn {
    padding: 0 0 0 10px;

    .alpheios-navbuttons__icon-span {
      display: inline-block;
      padding: uisize(8px);
      position: relative;
    }
    & svg {
      width: uisize(22px);
      height: uisize(22px);
      top: 50%;
      position: relative;
    }
    fill: var(--alpheios-compact-panel-icon-color);
    stroke: var(--alpheios-compact-panel-icon-color);

    &:hover {
      fill: var(--alpheios-compact-panel-icon-color-hover);
      stroke: var(--alpheios-compact-panel-icon-color-hover);
      background: var(--alpheios-compact-panel-icon-bg-hover);
    }

    &:active,
    &.alpheios-navbuttons__icon-active {
      fill: var(--alpheios-compact-panel-icon-color-pressed);
      stroke: var(--alpheios-compact-panel-icon-color-pressed);
      background: var(--alpheios-compact-panel-icon-bg-active);
    }
  }

  .alpheios-panel__header-btn-group--end
  .alpheios-panel__header-btn {
    & svg {
      transform: translateY(-50%);
    }
  }

  .alpheios-panel__close-btn {
    width: uisize(60px);
    height: $alpheios-toolbar-height;
    cursor: pointer;
    fill: var(--alpheios-compact-panel-icon-color);
    stroke: var(--alpheios-compact-panel-icon-color);
    stroke-width: 0;

    svg {
      position: relative;
      left: uisize(20px);
      width: uisize(22px);
      height: auto;
      top: 50%;
      transform: translateY(-50%);
    }

    &:hover,
    &:focus {
      fill: var(--alpheios-compact-panel-icon-color-hover);
      stroke: var(--alpheios-compact-panel-icon-color-hover);
      background: var(--alpheios-compact-panel-icon-bg-hover);
    }

    &:active {
      fill: var(--alpheios-compact-panel-icon-color-pressed);
      stroke: var(--alpheios-compact-panel-icon-color-pressed);
      background: var(--alpheios-compact-panel-icon-bg-active);
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
    background: var(--alpheios-compact-panel-content-bg);

    [data-resized="true"] & {
      max-width: none;
    }
  }

  .alpheios-panel__title {
    text-transform: capitalize;
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

  .alpheios-panel__tab__word-usage {
    width: 100%;
  }

  .alpheios-panel__tab-panel--options {
    display: block;
  }

  .alpheios-panel__tab__treebank {
    width: 100%;
    height: 100%;
  }

  .alpheios-panel__tab-panel-options-cont {
    display: flex;
    flex-direction: column;
  }

  .alpheios-panel__options-item {
    margin-bottom: textsize(15px);
    display: flex;
    align-items: flex-start;
    flex: 1 1 auto;
  }

  .alpheios-panel__menu-btn {
    width: 40px;
    height: 40px;
    margin: 16px 10px 10px 30px;
    cursor: pointer;
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
      height: 100%;
      width: 50vw;
      top: 0;
      bottom: auto;
    }

    &.alpheios-panel--right {
      height: 100%;
      width: 50vw;
      right: 0;
      left: auto;
    }

    & .alpheios-panel__content {
      overflow: auto;
    }
  }

  .alpheios-panel--left {
    &.alpheios-panel {
      left: 0;
    }

    .alpheios-panel__header {
      direction: ltr;
      border-top-right-radius: uisize(10px);
    }

    .alpheios-panel__content,
    .alpheios-notification-area {
      border-right: 1px solid var(--alpheios-border-color);
    }

    .alpheios-panel__close-btn {
      border-top-right-radius: uisize(10px);
    }
  }

  .alpheios-panel--right {
    &.alpheios-panel {
      right: 0;
    }

    .alpheios-panel__header {
      border-top-left-radius: uisize(10px);
    }

    .alpheios-panel__header-logo {
      margin-left: uisize(16px);
    }

    .alpheios-panel__content,
    .alpheios-notification-area {
      border-left: 1px solid var(--alpheios-border-color);
    }
  }

  .alpheios-panel.alpheios-panel--expanded {
    width: 100vw;
    // Do not use 100vh as it will go below the toolbar on Chrome and Safari
    height: 100%;

    .alpheios-panel__header {
      border-radius: 0;
    }
  }

  .alpheios-panel--compact {
    .alpheios-panel__tab__inflections {
      h1 {
        margin-bottom: 0!important;
      }
      .alpheios-inflections__forms-cont {
        margin-bottom: 0;
      }
    }
  }

  @media screen and (max-width: 359px) {
    .alpheios-panel__header-btn--infl-data,
    .alpheios-panel__header-btn--treebank-data {
      display: none;
    }
  }

  .alpheios-panel__tab-panel--options {
    padding-top:10px;
  }

</style>
