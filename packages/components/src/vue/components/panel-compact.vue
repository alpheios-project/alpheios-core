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

    <div class="alpheios-panel__header" >
      <div class="alpheios-panel__menu-btn" @click="menuItemSelected">
        <menu-icon
            class="alpheios-panel__menu-icon"
            :class="{'menu-open': menuVisible}"
        />
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
      <drop-down-menu
          v-show="menuVisible"
          @drop-down-menu-item-selected="menuItemSelected"
      />
      <div
          class="alpheios-panel__tab-panel"
          v-show="$store.getters['ui/isActiveTab']('morphology') && !menuVisible">

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
            v-show="$store.state.app.morphDataReady && app.hasMorphData()"
        >
          <div class="alpheios-popup__providers-title">{{ l10n.getText('LABEL_PROVIDERS_CREDITS') }}</div>
          <a
              class="alpheios-popup__providers-link"
              v-on:click="switchProviders"
          >
            {{ providersLinkText }}
          </a>
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
          v-show="$store.getters['ui/isActiveTab']('definitions') && !menuVisible"
          data-alpheios-ignore="all"
      >
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-defs`"
              :show-results-in="`panel`"
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
      >
        <word-usage-examples/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab-panel--options"
           v-show="$store.getters['ui/isActiveTab']('options') && !menuVisible"
           data-alpheios-ignore="all"
      >
        <!-- This extra container element is required for iOS browsers so that the flex option items will have height to match their content -->
        <div class="alpheios-panel__tab-panel-options-cont">
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
        <div>
          <button @click="resetAllOptions"
              class="alpheios-button-primary">{{l10n.getText('LABEL_RESET_OPTIONS')}}
          </button>
        </div>
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
// JS imports
import interact from 'interactjs'
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
import InflectionBrowser from './inflections-browser.vue'
import Lookup from './lookup.vue'
import ReskinFontColor from './font-size.vue'
import UserAuth from './user-auth.vue'
import WordUsageExamples from '@/vue/components/word-usage-examples/word-usage-examples.vue'
import { Definition } from 'alpheios-data-models'
import WordListPanel from '@/vue/components/word-list/word-list-panel.vue'
import ProgressBar from '@/vue/components/progress-bar.vue'
// Embeddable SVG icons
import MenuIcon from '@/images/inline-icons/reading-tools.svg'
import CloseIcon from '@/images/inline-icons/x-close.svg'
import UpIcon from '@/images/inline-icons/chevron-up.svg'
import DownIcon from '@/images/inline-icons/chevron-down.svg'
import LeftIcon from '@/images/inline-icons/chevron-left.svg'
import RightIcon from '@/images/inline-icons/chevron-right.svg'
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
    progressBar: ProgressBar,
    notificationArea: NotificationArea,
    inflections: Inflections,
    inflectionBrowser: InflectionBrowser,
    setting: Setting,
    shortdef: ShortDef,
    grammar: Grammar,
    morph: Morph,
    treebank: Treebank,
    userAuth: UserAuth,
    closeIcon: CloseIcon,
    lookup: Lookup,
    reskinFontColor: ReskinFontColor,
    wordListPanel: WordListPanel,
    wordUsageExamples: WordUsageExamples,
    upIcon: UpIcon,
    downIcon: DownIcon,
    leftIcon: LeftIcon,
    rightIcon: RightIcon
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
      resized: false,
      showProviders: false
    }
  },

  // `positionClassVariants` is a custom property. This is to prent Vue from attaching reactivity to it.
  positionClassVariants: {
    left: 'alpheios-panel--left',
    right: 'alpheios-panel--right'
  },

  computed: {
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
        zIndex: this.ui.zIndex
      }
    },

    isLandscape: function () {
      return this.$store.state.panel.orientation === HTMLPage.orientations.LANDSCAPE
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

    providersLinkText: function () {
      return this.showProviders ? this.l10n.getText('LABEL_POPUP_HIDECREDITS') : this.l10n.getText('LABEL_POPUP_SHOWCREDITS')
    }
  },
  methods: {
    menuItemSelected () {
      this.menuVisible = !this.menuVisible
    },

    swapPosition () {
      this.isAttachedToLeft ? this.setPosition('right') : this.setPosition('left')
    },

    setPosition (position) {
      this.settings.contentOptions.items.panelPosition.setValue(position)
      this.$store.commit('panel/setPosition', position)
    },

    squeezePage () {
      let propName = this.isAttachedToRight ? 'padding-right' : 'padding-left'
      document.documentElement.style.setProperty(propName, '50%')
    },

    unsqueezePage () {
      document.documentElement.style.removeProperty('padding-left')
      document.documentElement.style.removeProperty('padding-right')
    },

    contentOptionChanged: function (name, value) {
      this.app.contentOptionChange(name, value)
    },

    resetAllOptions: function () {
      this.app.resetAllOptions()
    },

    resourceSettingChanged: function (name, value) {
      this.language.resourceSettingChange(name, value)
    },

    uiOptionChanged: function (name, value) {
      this.ui.optionChange(name, value)
    },

    expand () {
      this.expanded = true
    },

    contract () {
      this.expanded = false
    },

    expandOrContract () {
      this.expanded = !this.expanded
    },

    closePanel () {
      this.ui.closePanel()
      // Reset a scaled font size
      document.documentElement.style.removeProperty('--alpheios-base-text-size')

      // Close the menu if it was open during the panel closing
      this.menuVisible = false
    },

    gestureMoveListener: function (event) {
      const computedFontSize = Math.round(this.$options.scaledTextSize * event.scale)
      if (Math.abs(computedFontSize - this.$options.currentTextSize) > 1) {
        // Update element's style only when size change is greater than 1px to avoid extra redraws
        this.$options.currentTextSize = computedFontSize
        document.documentElement.style.setProperty('--alpheios-base-text-size', `${this.$options.currentTextSize}px`, 'important')
      }
    },

    gestureEndListener: function () {
      this.$options.scaledTextSize = this.$options.currentTextSize
    },

    switchProviders: function () {
      this.showProviders = !this.showProviders
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
    background: var(--alpheios-toolbar-bg-color);
    // The rule below required to make sizes and positions of header element dependent on the UI base size
    font-size: var(--alpheios-base-ui-size);
  }

  .alpheios-panel__menu-icon {
    width: 32px;
    height: auto;
    fill: var(--alpheios-color-neutral-lightest);

    &:hover {
      fill: var(--alpheios-color-bright-hover);
    }

    &.menu-open {
      fill: var(--alpheios-color-bright);
    }
  }

  .alpheios-panel__header-btn-group--end {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    box-sizing: border-box;
    align-items: stretch;
  }

  .alpheios-panel__header-btn {
    & svg {
      width: 40px;
      height: 40px;
      top: 50%;
      position: relative;
      transform: translateY(-50%);
    }
    fill: var(--alpheios-color-neutral-lightest);

    &:hover {
      fill: var(--alpheios-color-bright-hover);
    }

    &:active {
      fill: var(--alpheios-color-bright-pressed);
    }
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
      left: uisize(20px);
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

  .alpheios-panel__tab-panel--options {
    display: block;
  }

  .alpheios-panel__tab-panel-options-cont {
    display: flex;
    flex-direction: column;
  }

  .alpheios-panel__options-item {
    margin-bottom: textsize(10px);
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

    & .alpheios-panel__close-btn {
      margin-left: uisize(20px);
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
</style>
