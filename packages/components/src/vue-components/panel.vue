<template>
    <div class="alpheios-panel auk" :class="classes" :style="this.data.styles"
         data-component="alpheios-panel" data-resizable="true" v-show="data.isOpen"
        :data-notification-visible="data.notification.important"> <!-- Show only important notifications for now -->

        <div class="alpheios-panel__header">
            <div class="alpheios-panel__header-logo">
                <img class="alpheios-panel__header-logo-img" src="../images/icon.png">
            </div>
            <div class="alpheios-panel__header-title">
                <span class="alpheios-panel__header-selection"
                      v-show="data.status.selectedText">{{data.status.selectedText}}</span>
                <span class="alpheios-panel__header-text"
                      v-show="data.status.languageName && data.verboseMode">({{data.status.languageName}})</span>
            </div>
            <span @click="setPosition('left')" v-show="attachToLeftVisible" :title="data.l10n.messages.TOOLTIP_MOVE_PANEL_LEFT"
                  class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow">
                <attach-left-icon></attach-left-icon>
            </span>
            <span @click="setPosition('right')" v-show="attachToRightVisible" :title="data.l10n.messages.TOOLTIP_MOVE_PANEL_RIGHT"
                  class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow">
                <attach-right-icon></attach-right-icon>
            </span>
            <span @click="close" class="alpheios-panel__header-action-btn" :title="data.l10n.messages.TOOLTIP_CLOSE_PANEL">
                <close-icon></close-icon>
            </span>
        </div>

        <div :id="navbarID" class="alpheios-panel__nav">
            <div v-bind:class="{ active: data.tabs.info }" @click="changeTab('info')"
                 class="alpheios-panel__nav-btn" :title="data.l10n.messages.TOOLTIP_HELP">
                <info-icon class="icon"></info-icon>
            </div>

            <div :class="{ active: data.tabs.definitions }" @click="changeTab('definitions')"
                 class="alpheios-panel__nav-btn" :title="data.l10n.messages.TOOLTIP_DEFINITIONS">
                <definitions-icon class="icon"></definitions-icon>
            </div>

            <div v-bind:class="{ active: data.tabs.inflections }" @click="changeTab('inflections')"
                 class="alpheios-panel__nav-btn" :title="data.l10n.messages.TOOLTIP_INFLECT">
                <inflections-icon class="icon"></inflections-icon>
            </div>

            <div v-bind:class="{ active: data.tabs.grammar }" @click="changeTab('grammar')"
              class="alpheios-panel__nav-btn alpheios-panel__nav-btn--short" :title="data.l10n.messages.TOOLTIP_GRAMMAR">
                <grammar-icon class="icon"></grammar-icon>
            </div>

            <div v-bind:class="{ active: data.tabs.options }" @click="changeTab('options')"
                 class="alpheios-panel__nav-btn" :title="data.l10n.messages.TOOLTIP_OPTIONS">
                <options-icon class="icon"></options-icon>
            </div>

            <div v-show="data.verboseMode" v-bind:class="{ active: data.tabs.status }" @click="changeTab('status')"
                 class="alpheios-panel__nav-btn" :title="data.l10n.messages.TOOLTIP_STATUS">
                <status-icon class="icon"></status-icon>
            </div>
        </div>
        <div class="alpheios-panel__content">
            <div v-show="data.tabs.definitions" class="alpheios-panel__tab-panel">
                <div v-show="data.shortDefinitions.length < 1 && data.fullDefinitions.length < 1">
                  {{data.l10n.messages.PLACEHOLDER_DEFINITIONS}}</div>
                <div class="alpheios-panel__contentitem" v-for="definition in data.shortDefinitions">
                    <shortdef :definition="definition"></shortdef>
                </div>
                <div class="alpheios-panel__contentitem" v-html="data.fullDefinitions"></div>
            </div>
            <div v-show="inflectionsTabVisible" :id="inflectionsPanelID" class="alpheios-panel__tab-panel">
                <inflections class="alpheios-panel-inflections"
                             :data="data.inflectionComponentData" :locale="data.settings.locale.currentValue"
                             :messages="data.l10n.messages" @contentwidth="setContentWidth">
                </inflections>
            </div>
            <div v-show="data.tabs.grammar" class="alpheios-panel__tab-panel
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw">
                  <grammar :res="data.grammarRes"></grammar>
              </div>
            <div v-show="data.tabs.status" class="alpheios-panel__tab-panel">
                <div v-for="message in data.messages">
                    <div class="alpheios-panel__message">{{message}}</div>
                </div>
            </div>
            <div v-show="data.tabs.options" class="alpheios-panel__tab-panel">
                <setting :data="data.settings.preferredLanguage" @change="settingChanged"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.settings.panelPosition" @change="settingChanged"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.settings.popupPosition" @change="settingChanged"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="data.settings.uiType" @change="settingChanged"
                         :classes="['alpheios-panel__options-item']"></setting>
                <setting :data="languageSetting" @change="resourceSettingChanged" :classes="['alpheios-panel__options-item']"
                  :key="languageSetting.name"
                  v-if="languageSetting.values.length > 1"
                  v-for="languageSetting in data.resourceSettings.lexicons"></setting>
            </div>
            <div v-show="data.tabs.info" class="alpheios-panel__tab-panel">
                <info :data="data.infoComponentData" :messages="data.l10n.messages"></info>
            </div>
        </div>
        <div class="alpheios-panel__notifications uk-text-small" :class="notificationClasses"
          v-show="data.notification.important">
            <span @click="closeNotifications" class="alpheios-panel__notifications-close-btn">
                <close-icon></close-icon>
            </span>
            <span v-html="data.notification.text"></span>
            <setting :data="data.settings.preferredLanguage" :show-title="false"
                     :classes="['alpheios-panel__notifications--lang-switcher']" @change="settingChanged"
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
  import Info from './info.vue'
  import interact from 'interactjs'
  import Locales from '../locales/locales'

  // Embeddable SVG icons
  import AttachLeftIcon from '../images/inline-icons/attach-left.svg';
  import AttachRightIcon from '../images/inline-icons/attach-right.svg';
  import CloseIcon from '../images/inline-icons/close.svg';
  import DefinitionsIcon from '../images/inline-icons/definitions.svg';
  import InflectionsIcon from '../images/inline-icons/inflections.svg';
  import StatusIcon from '../images/inline-icons/status.svg';
  import OptionsIcon from '../images/inline-icons/options.svg';
  import GrammarIcon from '../images/inline-icons/resources.svg';
  import InfoIcon from '../images/inline-icons/info.svg';

  export default {
    name: 'Panel',
    components: {
      inflections: Inflections,
      setting: Setting,
      shortdef: ShortDef,
      morph: Morph,
      info: Info,
      grammar: Grammar,
      attachLeftIcon: AttachLeftIcon,
      attachRightIcon: AttachRightIcon,
      closeIcon: CloseIcon,
      definitionsIcon: DefinitionsIcon,
      inflectionsIcon: InflectionsIcon,
      statusIcon: StatusIcon,
      optionsIcon: OptionsIcon,
      infoIcon: InfoIcon,
      grammarIcon: GrammarIcon
    },
    data: function () {
      return {
        navbarID: 'alpheios-panel__nav',
        inflectionsPanelID: 'alpheios-panel__inflections-panel'
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },

    computed: {
      classes: function () {
        return Object.assign(this.data.classes, {
          'alpheios-panel-left': this.data.settings.panelPosition.currentValue === 'left',
          'alpheios-panel-right': this.data.settings.panelPosition.currentValue === 'right'
        })
      },

      notificationClasses: function () {
        return {
          'alpheios-panel__notifications--important': this.data.notification.important
        }
      },

      attachToLeftVisible: function () {
        return this.data.settings.panelPosition.currentValue === 'right'
      },

      attachToRightVisible: function () {
        return this.data.settings.panelPosition.currentValue === 'left'
      },

      // Need this to watch when inflections tab becomes active and adjust panel width to fully fit an inflection table in
      inflectionsTabVisible: function () {
        // Inform an inflection component about its visibility state change
        this.data.inflectionComponentData.visible = this.data.tabs.inflections
        return this.data.tabs.inflections
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
        this.$emit('settingchange', name, value) // Re-emit for a Vue instance
      },

      resourceSettingChanged: function (name, value) {
        this.$emit('resourcesettingchange', name, value) // Re-emit for a Vue instance
      },

      setContentWidth: function (width) {
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
      }
    },

    mounted: function () {
      // Determine paddings and sidebar width for calculation of a panel width to fit content
      let navbar = this.$el.querySelector(`#${this.navbarID}`)
      let inflectionsPanel = this.$el.querySelector(`#${this.inflectionsPanelID}`)
      this.navbarWidth = 0
      if (navbar) {
        let width = window.getComputedStyle(navbar).getPropertyValue('width').match(/\d+/)
        if (width && Array.isArray(width) && width.length > 0) { this.navbarWidth = width[0] }
      }
      this.inflPanelLeftPadding = inflectionsPanel ? window.getComputedStyle(inflectionsPanel).getPropertyValue('padding-left').match(/\d+/)[0] : 0
      this.inflPanelRightPadding = inflectionsPanel ? window.getComputedStyle(inflectionsPanel).getPropertyValue('padding-right').match(/\d+/)[0] : 0

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
            min: { width: this.data.minWidth }
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
</script>
<style lang="scss">
    @import "../styles/alpheios";
    $alpheios-panel-header-height: 40px;
    $alpheios-panel-sidebar-width: 50px;

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
        grid-template-columns: auto #{$alpheios-panel-sidebar-width};
        grid-template-rows: #{$alpheios-panel-header-height} auto 60px;
        grid-template-areas:
            "header header"
            "content sidebar"
            "content sidebar"
    }

    .alpheios-panel[data-notification-visible="true"] {
        grid-template-areas:
                "header header"
                "content sidebar"
                "notifications sidebar"
    }

    .alpheios-panel.alpheios-panel-left {
        left: 0;
        border-right: 1px solid $alpheios-link-color-dark-bg;
    }

    .alpheios-panel.alpheios-panel-right {
        right: 0;
        border-left: 1px solid $alpheios-link-color-dark-bg;
        grid-template-columns: #{$alpheios-panel-sidebar-width} auto;
        grid-template-areas:
                "header header"
                "sidebar content"
                "sidebar content"

    }

    .alpheios-panel.alpheios-panel-right[data-notification-visible="true"] {
        grid-template-areas:
                "header header"
                "sidebar content"
                "sidebar notifications"

    }

    .alpheios-panel__header {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        box-sizing: border-box;
        grid-area: header;
        border-bottom: 1px solid $alpheios-link-color-dark-bg;
    }

    .alpheios-panel-left .alpheios-panel__header {
        direction: ltr;
        padding: 0 0 0 10px;
    }

    .alpheios-panel-right .alpheios-panel__header {
        direction: rtl;
        padding: 0 10px 0 0;
    }

    .alpheios-panel__header-logo {
        flex-grow: 0;
    }

    .alpheios-panel__header-title {
        flex-grow: 1;
        padding: 10px 20px;
        direction: ltr;
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
        margin-top: 4px;
    }

    .alpheios-panel__header-action-btn,
    .alpheios-panel__header-action-btn.active:hover,
    .alpheios-panel__header-action-btn.active:focus {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 5px;
        padding-top: 5px;
        text-align: center;
        cursor: pointer;
        fill: $alpheios-link-color-dark-bg;
        stroke: $alpheios-link-color-dark-bg;
    }

    .alpheios-panel__header-action-btn:hover,
    .alpheios-panel__header-action-btn:focus,
    .alpheios-panel__header-action-btn.active {
        fill: $alpheios-link-hover-color;
        stroke: $alpheios-link-hover-color;
    }

    .alpheios-panel__header-action-btn.alpheios-panel__header-action-btn--narrow {
        margin: 0;
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
        overflow: auto;
        grid-area: content;
        direction: ltr;
        box-sizing: border-box;
        display: flex;
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

    .alpheios-panel__nav {
        width: #{$alpheios-panel-sidebar-width}; /* Required for calculation of required inflection table width*/
        grid-area: sidebar;
    }

    .alpheios-panel-left .alpheios-panel__nav {
        border-left: 1px solid $alpheios-link-color-dark-bg;
    }

    .alpheios-panel-right .alpheios-panel__nav {
        border-right: 1px solid $alpheios-link-color-dark-bg;
    }

    .alpheios-panel__nav-btn {
        cursor: pointer;
        margin: 20px 5px 20px;
        width: 40px;
        height: 40px;
        text-align: center;
        background: transparent no-repeat center center;
        background-size: contain;
    }

    .alpheios-panel__nav-btn.alpheios-panel__nav-btn--short {
        margin: -10px 5px 20px;
    }

    .alpheios-panel__nav-btn,
    .alpheios-panel__nav-btn.active:hover,
    .alpheios-panel__nav-btn.active:focus {
        fill: $alpheios-link-color-dark-bg;
        stroke: $alpheios-link-color-dark-bg;
    }

    .alpheios-panel__nav-btn:hover,
    .alpheios-panel__nav-btn:focus,
    .alpheios-panel__nav-btn.active {
        fill: $alpheios-link-hover-color;
        stroke: $alpheios-link-hover-color;
    }
</style>
