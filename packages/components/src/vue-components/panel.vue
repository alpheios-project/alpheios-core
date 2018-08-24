<template>
    <div class="alpheios-panel auk" id="alpheios-panel-inner" :class="divClasses" :style="mainstyles" v-on-clickaway="attachTrackingClick"
         data-component="alpheios-panel" data-resizable="true" v-show="data && data.isOpen"
        :data-notification-visible="data && data.notification && data.notification.important"> <!-- Show only important notifications for now -->

        <div class="alpheios-panel__header">
            <div class="alpheios-panel__header-logo">
                <img class="alpheios-panel__header-logo-img" src="../images/icon.png">
            </div>
            <span class="alpheios-panel__header-btn-group--center" v-if="data && data.tabs">

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_HELP')">
                <span v-bind:class="{ active: data.tabs.info }" @click="changeTab('info')"
                  class="alpheios-panel__header-nav-btn">
                  <info-icon class="icon"></info-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_DEFINITIONS')">
                <span :class="{ active: data.tabs.definitions }" @click="changeTab('definitions')"
                  class="alpheios-panel__header-nav-btn">
                  <definitions-icon class="icon"></definitions-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_INFLECT')">
                <span v-bind:class="{ active: data.tabs.inflections }" @click="changeTab('inflections')"
                  class="alpheios-panel__header-nav-btn">
                  <inflections-icon class="icon"></inflections-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_GRAMMAR')">
                <span v-bind:class="{ active: data.tabs.grammar }" @click="changeTab('grammar')"
                  class="alpheios-panel__header-nav-btn">
                  <grammar-icon class="icon"></grammar-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_TREEBANK')" v-show="treebankTabVisible">
                <span v-bind:class="{ active: data.tabs.treebank }" @click="changeTab('treebank')"
                      class="alpheios-panel__header-nav-btn">
                  <treebank-icon class="icon"></treebank-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_OPTIONS')">
                <span v-bind:class="{ active: data.tabs.options }" @click="changeTab('options')"
                  class="alpheios-panel__header-nav-btn">
                  <options-icon class="icon"></options-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_STATUS')">
                <span v-show="data.verboseMode" v-bind:class="{ active: data.tabs.status }" @click="changeTab('status')"
                  class="alpheios-panel__header-nav-btn">
                  <status-icon class="icon"></status-icon>
                </span>
              </alph-tooltip>
            </span>
            <span class="alpheios-panel__header-btn-group--end">

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_MOVE_PANEL_LEFT')" v-show="attachToLeftVisible">
                <span @click="setPosition('left')" v-show="attachToLeftVisible"
                      class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow alpheios_left">
                    <attach-left-icon></attach-left-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="ln10Messages('TOOLTIP_MOVE_PANEL_RIGHT')" v-show="attachToRightVisible">
                <span @click="setPosition('right')" v-show="attachToRightVisible"
                      class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow alpheios_right">
                    <attach-right-icon></attach-right-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip
                tooltipDirection = "bottom-right"
                :tooltipText = "ln10Messages('TOOLTIP_CLOSE_PANEL')">
                <span @click="close" class="alpheios-panel__header-action-btn alpheios_close" >
                    <close-icon></close-icon>
                </span>
              </alph-tooltip>
            </span>
        </div>

        <div class="alpheios-panel__content" v-if="data && data.tabs">

            <div v-show="data.tabs.definitions" class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab-panel--fw alpheios-panel__tab__definitions">
                <div class="alpheios-lookup__panel">
                  <lookup :uiController="uiController" :parentLanguage="lookupParentLanguage" :clearLookupText="clearLookupText"></lookup>
                </div>
                <div v-show="data.shortDefinitions.length < 1 && data.fullDefinitions.length < 1" v-if="data.shortDefinitions && data.fullDefinitions">
                  {{ ln10Messages('PLACEHOLDER_DEFINITIONS') }}</div>
                <div class="alpheios-panel__contentitem" v-for="definition in data.shortDefinitions">
                    <shortdef :definition="definition"></shortdef>
                </div>
                <div class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions" v-html="data.fullDefinitions"></div>
            </div>
            <div v-show="inflectionsTabVisible" :id="inflectionsPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflections" v-if="data.inflectionComponentData && data.settings && data.l10n">
                <inflections class="alpheios-panel-inflections"
                             :data="data.inflectionComponentData" :locale="data.settings.locale.currentValue"
                             :messages="data.l10n.messages" @contentwidth="setContentWidth">
                </inflections>
            </div>
            <div v-show="data.tabs.grammar" class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw">
                  <grammar :res="data.grammarRes"></grammar>
              </div>
            <div v-show="treebankTabVisible" class="alpheios-panel__tab-panel alpheios-panel__tab__treebank
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw" v-if="data.treebankComponentData && data.settings && data.l10n">
                  <treebank :res="data.treebankComponentData.data"
                    :locale="data.settings.locale.currentValue" :visible="data.treebankComponentData.visible"
                    :messages="data.l10n.messages" @treebankcontentwidth="setTreebankContentWidth">
                  </treebank>
              </div>
            <div v-show="data.tabs.status" class="alpheios-panel__tab-panel alpheios-panel__tab__status">
                <div v-for="message in data.messages">
                    <div class="alpheios-panel__message">{{message}}</div>
                </div>
            </div>
            <div v-show="data.tabs.options" class="alpheios-panel__tab-panel alpheios-panel__tab__options">
                <reskin-font-color :messages="data.l10n.messages" v-if="data.l10n"></reskin-font-color>
                <setting :data="data.settings.preferredLanguage" @change="settingChanged" v-if="data.settings"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.settings.panelPosition" @change="settingChanged" v-if="data.settings"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.settings.popupPosition" @change="settingChanged" v-if="data.settings"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.settings.uiType" @change="settingChanged" v-if="data.settings"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.settings.verboseMode" @change="settingChanged" v-if="data.settings"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.uiOptions.items.skin" @change="uiOptionChanged" v-if="data.uiOptions && data.uiOptions.items"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.uiOptions.items.popup" @change="uiOptionChanged" v-if="data.uiOptions && data.uiOptions.items"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.uiOptions.items.panelOnActivate" @change="uiOptionChanged" v-if="data.uiOptions && data.uiOptions.items"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="languageSetting" @change="resourceSettingChanged" :classes="['alpheios-panel__options-item']"
                    :key="languageSetting.name"
                    v-for="languageSetting in resourceSettingsLexicons"></setting>
                <setting :data="languageSetting" @change="resourceSettingChanged" :classes="['alpheios-panel__options-item']"
                    :key="languageSetting.name"
                    v-for="languageSetting in resourceSettingsLexiconsShort"></setting>
            </div>
            <div v-show="data.tabs.info" class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab__info">
                <div class="alpheios-lookup__panel" v-if="data.infoComponentData">
                  <lookup :uiController="uiController" :parentLanguage="lookupParentLanguage" :clearLookupText="clearLookupText"></lookup>
                </div>
                <info :data="data.infoComponentData" :messages="data.l10n.messages" v-if="data.infoComponentData && data.l10n"></info>
            </div>
        </div>
        <div class="alpheios-panel__notifications uk-text-small" :class="notificationClasses"
          v-show="data.notification.important" v-if="data && data.notification">
            <span @click="closeNotifications" class="alpheios-panel__notifications-close-btn">
                <close-icon></close-icon>
            </span>
            <span v-html="data.notification.text" class="alpheios-panel__notifications-text"></span>
            <setting :data="data.settings.preferredLanguage" :show-title="false"
                     :classes="['alpheios-panel__notifications--lang-switcher alpheios-text-smaller']" @change="settingChanged"
                     v-show="data.notification.showLanguageSwitcher"></setting>
        </div>
    </div>
</template>
<script>
  import Inflections from './inflections.vue'
  import Setting from './setting.vue'
  import ShortDef from './shortdef.vue'
  import Morph from './morph.vue'
  import Grammar from './grammar.vue'
  import Treebank from './treebank.vue'
  import Info from './info.vue'
  import interact from 'interactjs'
  import Locales from '../locales/locales'

  import Tooltip from './tooltip.vue'
  import Lookup from './lookup.vue'
  import ReskinFontColor from './reskin-font-color.vue'

  // Embeddable SVG icons
  import AttachLeftIcon from '../images/inline-icons/attach-left.svg';
  import AttachRightIcon from '../images/inline-icons/attach-right.svg';
  import CloseIcon from '../images/inline-icons/close.svg';
  import DefinitionsIcon from '../images/inline-icons/definitions.svg';
  import InflectionsIcon from '../images/inline-icons/inflections.svg';
  import StatusIcon from '../images/inline-icons/status.svg';
  import OptionsIcon from '../images/inline-icons/options.svg';
  import GrammarIcon from '../images/inline-icons/resources.svg';
  import TreebankIcon from '../images/inline-icons/sitemap.svg';
  import InfoIcon from '../images/inline-icons/info.svg';

  import { directive as onClickaway } from '../directives/clickaway.js';

  export default {
    name: 'Panel',
    components: {
      inflections: Inflections,
      setting: Setting,
      shortdef: ShortDef,
      morph: Morph,
      info: Info,
      grammar: Grammar,
      treebank: Treebank,
      attachLeftIcon: AttachLeftIcon,
      attachRightIcon: AttachRightIcon,
      closeIcon: CloseIcon,
      definitionsIcon: DefinitionsIcon,
      inflectionsIcon: InflectionsIcon,
      statusIcon: StatusIcon,
      optionsIcon: OptionsIcon,
      infoIcon: InfoIcon,
      grammarIcon: GrammarIcon,
      treebankIcon: TreebankIcon,
      alphTooltip: Tooltip,
      lookup: Lookup,
      reskinFontColor: ReskinFontColor
    },
    directives: {
      onClickaway: onClickaway,
    },
    data: function () {
      return {
        inflectionsPanelID: 'alpheios-panel__inflections-panel',

        positionClassVariants: {
          left: 'alpheios-panel-left',
          right: 'alpheios-panel-right'
        }
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      classesChanged: {
        type: Number,
        required: false,
        default: 0
      }
    },

    computed: {
      divClasses () {
        return (this.data && this.data.classes ? this.data.classes.join(' ') : '') + ' ' + this.positionClasses
      },
      clearLookupText: function () {
        // always true to clear panels lookup
        return true
      },
      lookupParentLanguage: function () {
        if (this.data.infoComponentData) {
          return this.data.infoComponentData.languageName
        } else {
          return this.options.items.preferredLanguage.currentTextValue()
        }
      },
      uiController: function () {
        return (this.$parent && this.$parent.uiController) ? this.$parent.uiController : null
      },
      mainstyles: function () {
        return (this.data) ? this.data.styles : ''
      },
      resourceSettingsLexicons: function () {
        return this.data.resourceSettings && this.data.resourceSettings.lexicons ? this.data.resourceSettings.lexicons.filter(item => item.values.length > 0) : []
      },
      resourceSettingsLexiconsShort: function () {
        return this.data.resourceSettings && this.data.resourceSettings.lexiconsShort ? this.data.resourceSettings.lexiconsShort.filter(item => item.values.length > 0) : []
      },
      classes: function () {
        // Find index of an existing position class and replace it with an updated value
        if (this.data) {
          const positionLeftIndex = this.data.classes.findIndex(v => v === this.positionLeftClassName)
          const positionRightIndex = this.data.classes.findIndex(v => v === this.positionRightClassName)

          if (this.data.settings.panelPosition.currentValue === 'left') {
            if (positionRightIndex >= 0) {
              // Replace an existing value
              this.data.classes[positionRightIndex] = this.positionLeftClassName
            } else {
              // Add an initial value
              this.data.classes.push(this.positionLeftClassName)
            }

          } else if (this.data.settings.panelPosition.currentValue === 'right') {
            if (positionLeftIndex >= 0) {
              // Replace an existing value
              this.data.classes[positionLeftIndex] = this.positionRightClassName
            } else {
              // Add an initial value
              this.data.classes.push(this.positionRightClassName)
            }
          }
          return this.data.classes
        }
        return null
      },

      notificationClasses: function () {
        return {
          'alpheios-panel__notifications--important': this.data.notification.important
        }
      },

      attachToLeftVisible: function () {
        return (this.data && this.data.settings) ? this.data.settings.panelPosition.currentValue === 'right' : false
      },

      attachToRightVisible: function () {
        return (this.data && this.data.settings) ? this.data.settings.panelPosition.currentValue === 'left' : true
      },

      // Need this to watch when inflections tab becomes active and adjust panel width to fully fit an inflection table in
      inflectionsTabVisible: function () {
        // Inform an inflection component about its visibility state change
        if (this.data && this.data.inflectionComponentData) {
          this.data.inflectionComponentData.visible = this.data.tabs.inflections
        }
        return this.data.tabs.inflections
      },

      treebankTabPossible: function() {
        // treebank data is possible if we have it for the word or the page
        return this.data && (this.data.treebankComponentData.data.page.src || this.data.treebankComponentData.data.word.src) ? true : false
      },

      treebankTabVisible: function() {
        // Inform treebank component about visibility state change
        if (this.data && this.data.treebankComponentData) {
          this.data.treebankComponentData.visible = this.data.tabs.treebank
        }
        return this.data.tabs.treebank
      },

      additionalStylesTootipCloseIcon: function () {
        return {
          top: '2px',
          right: '50px'
        }
      },

      positionClasses: function () {
        if (this.data) {
          return this.positionClassVariants[this.data.settings.panelPosition.currentValue]
        }
        return null
      }
    },
    methods: {
      updateZIndex: function (zIndexMax) {
        if (zIndexMax >= this.zIndex) {
          this.zIndex = zIndexMax
          if (this.zIndex < Number.POSITIVE_INFINITY) { this.zIndex++ } // To be one level higher that the highest element on a page
          this.self.element.style.zIndex = this.zIndex
        }
      },

      close () {
        this.$emit('close')
      },

      closeNotifications () {
        this.$emit('closenotifications')
      },

      setPosition (position) {
        this.$emit('setposition', position)
      },

      changeTab (name) {
        this.setContentWidth('auto')
        this.$emit('changetab', name)
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

      settingChanged: function (name, value) {
        this.$emit('settingchange', name, value) // Re-emit for a Vue instance to catch
      },

      resourceSettingChanged: function (name, value) {
        this.$emit('resourcesettingchange', name, value) // Re-emit for a Vue instance to catch
      },

      uiOptionChanged: function (name, value) {
        this.$emit('ui-option-change', name, value) // Re-emit for a Vue instance to catch
      },

      setContentWidth: function (width) {
        if (this.data === undefined) {
          return
        }
        if (width === 'auto') {
          this.$el.style.removeProperty('width')
          return
        }
        let widthDelta = parseInt(this.navbarWidth, 10)
          + parseInt(this.inflPanelLeftPadding, 10)
          + parseInt(this.inflPanelRightPadding, 10)
        if (width > this.data.minWidth + widthDelta) {
          let adjustedWidth = width + widthDelta
          // Max viewport width less some space to display page content
          let maxWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 20
          if (adjustedWidth > maxWidth) { adjustedWidth = maxWidth }
          this.$el.style.width = `${adjustedWidth}px`
        }
      },

      setTreebankContentWidth: function(width) {
          console.log(`Set width to ${width}`)
          this.$el.style.width = width
      },

      ln10Messages: function (value, defaultValue = 'unknown') {
        if (this.data && this.data.l10n && this.data.l10n.messages && this.data.l10n.messages[value]) {
          return this.data.l10n.messages[value]
        }
        return defaultValue
      },

      attachTrackingClick: function () {
        this.close()
      }
    },
    created: function () {
      let vm = this
      vm.$on('changeStyleClass', (name, type) => {
        vm.uiOptionChanged(name, type)
      })
    },
    mounted: function () {
      // Determine paddings and sidebar width for calculation of a panel width to fit content
      if (this.data === undefined) {
        return
      }
      if (typeof this.$el.querySelector === 'function') {
        let navbar = this.$el.querySelector(`#${this.navbarID}`)
        let inflectionsPanel = this.$el.querySelector(`#${this.inflectionsPanelID}`)
        this.navbarWidth = 0
        if (navbar) {
          let width = window.getComputedStyle(navbar).getPropertyValue('width').match(/\d+/)
          if (width && Array.isArray(width) && width.length > 0) { this.navbarWidth = width[0] }
        }

        if (inflectionsPanel) {
          let resPl1 = window.getComputedStyle(inflectionsPanel).getPropertyValue('padding-left').match(/\d+/)
          if (Array.isArray(resPl1)) {
            this.inflPanelLeftPadding = inflectionsPanel ? resPl1[0] : 0
          } else {
            this.inflPanelLeftPadding = 0
          }
          let resPl2 = window.getComputedStyle(inflectionsPanel).getPropertyValue('padding-right').match(/\d+/)
          if (Array.isArray(resPl2)) {
            this.inflPanelRightPadding = inflectionsPanel ? resPl2[0] : 0
          } else {
            this.inflPanelRightPadding = 0
          }
        }

        // Initialize Interact.js: make panel resizable
        interact(this.$el)
          .resizable({
            // resize from all edges and corners
            edges: {left: true, right: true, bottom: false, top: false},

            // keep the edges inside the parent
            restrictEdges: {
              outer: document.body,
              endOnly: true
            },

            // minimum size
            restrictSize: {
              min: {width: this.data.minWidth}
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
    @import "../styles/alpheios";
    $alpheios-panel-header-height: 40px;
    $alpheios-panel-title-height: 20px;

    .alpheios-panel {
        width: 400px; // Initial width
        height: 100vh;
        top: 0;
        z-index: 2000;
        position: fixed;
        background: #FFF;
        resize: both;
        opacity: 0.95;
        direction: ltr;
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: #{$alpheios-panel-header-height} #{$alpheios-panel-title-height} auto 60px;
        grid-template-areas:
            "header"
            "title"
            "content"
            "content"
    }

    .alpheios-panel[data-notification-visible="true"] {
        grid-template-areas:
                "header"
                "title"
                "content"
                "notifications"
    }

    .alpheios-panel.alpheios-panel-left {
        left: 0;
        border-right: 1px solid $alpheios-link-color-dark-bg;
    }

    .alpheios-panel.alpheios-panel-right {
        right: 0;
        border-left: 1px solid $alpheios-link-color-dark-bg;
        grid-template-columns: auto;
        grid-template-areas:
                "header"
                "title"
                "content"
                "content"

    }

    .alpheios-panel.alpheios-panel-right[data-notification-visible="true"] {
        grid-template-areas:
                "header"
                "title"
                "content"
                "notifications"

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
        margin: 10px 15px;
        svg {
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: top;
        }
    }

    .alpheios-panel__header-action-btn:hover,
    .alpheios-panel__header-action-btn:focus,
    .alpheios-panel__header-action-btn.active {
        fill: $alpheios-link-hover-color;
        stroke: $alpheios-link-hover-color;
    }

    .alpheios-panel__body {
        display: flex;
        height: calc(100vh - #{$alpheios-panel-header-height});
    }

    .alpheios-panel-left .alpheios-panel__body {
        flex-direction: row;
    }

    .alpheios-panel-right .alpheios-panel__body {
        flex-direction: row-reverse;
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
</style>
