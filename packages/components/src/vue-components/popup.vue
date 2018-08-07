<template>
    <div ref="popup" id="alpheios-popup-inner" class="alpheios-popup auk" v-bind:class="divClasses" :style="mainstyles"
         v-show="visible" :data-notification-visible="data && data.notification && data.notification.visible" v-on-clickaway="attachTrackingClick">
         <alph-tooltip
          tooltipDirection = "left"
          :additionalStyles = "additionalStylesTootipCloseIcon"
          :tooltipText = "ln10Messages('TOOLTIP_POPUP_CLOSE')">
          <span class="alpheios-popup__close-btn" @click="closePopup">
              <close-icon></close-icon>
          </span>
         </alph-tooltip>
        <div class="alpheios-popup__header">
            <div class="alpheios-popup__header-text" v-if="data && data.status">
                <span v-show="data.status.selectedText" class="alpheios-popup__header-selection">{{data.status.selectedText}}</span>
                <span v-show="data.status.languageName && data.verboseMode" class="alpheios-popup__header-word">({{data.status.languageName}})</span>
            </div>

            <div class="alpheios-popup__button-area" v-if="data">
                <alph-tooltip v-show="data.defDataReady" tooltipDirection="bottom-wide" :tooltipText="ln10Messages('TOOLTIP_SHOW_DEFINITIONS')">
                  <button @click="showPanelTab('definitions')" v-show="data.defDataReady"
                          class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-definitions">{{ ln10Messages('LABEL_POPUP_DEFINE') }}
                  </button>
                </alph-tooltip>

                <alph-tooltip v-show="data.inflDataReady" tooltipDirection="bottom-wide" :tooltipText="ln10Messages('TOOLTIP_SHOW_INFLECTIONS')">
                  <button @click="showPanelTab('inflections')" v-show="data.inflDataReady"
                          class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-inflections">{{ ln10Messages('LABEL_POPUP_INFLECT') }}
                  </button>
                </alph-tooltip>

                <alph-tooltip v-show="data.hasTreebank" tooltipDirection="bottom-wide" :tooltipText="ln10Messages('TOOLTIP_TREEBANK')">
                    <button @click="showPanelTab('treebank')" v-show="data.hasTreebank"
                            class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-treebank">{{ ln10Messages('LABEL_POPUP_TREEBANK') }}
                    </button>

                </alph-tooltip>

                <alph-tooltip tooltipDirection="bottom-right" :tooltipText="ln10Messages('TOOLTIP_SHOW_OPTIONS')">
                  <button @click="showPanelTab('options')"
                          class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-options">{{ ln10Messages('LABEL_POPUP_OPTIONS') }}
                  </button>
                </alph-tooltip>
            </div>
        </div>
        <div v-show="!morphDataReady && !noLanguage"
             class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small">
            {{ ln10Messages('PLACEHOLDER_POPUP_DATA') }}
        </div>

        <div v-show="noLanguage && !morphDataReady"
             class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small">
            {{ ln10Messages('PLACEHOLDER_NO_LANGUAGE_POPUP_DATA') }}
        </div>
        <div v-show="!hasMorphData && morphDataReady && !noLanguage"
             class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small">
            {{ ln10Messages('PLACEHOLDER_NO_DATA_POPUP_DATA') }}
        </div>
        <div v-show="morphDataReady && hasMorphData" :id="lexicalDataContainerID" class="alpheios-popup__morph-cont uk-text-small alpheios-popup__morph-cont-ready">
            <morph :id="morphComponentID" :lexemes="lexemes" :definitions="definitions" :translations="translations"
                   :linkedfeatures="linkedfeatures" @sendfeature="sendFeature" :morphDataReady="morphDataReady && hasMorphData">
            </morph>

            <div class="alpheios-popup__morph-cont-providers" v-if="data && showProviders">
                <div class="alpheios-popup__morph-cont-providers-header">{{ ln10Messages('LABEL_POPUP_CREDITS') }}</div>
                <div class="alpheios-popup__morph-cont-providers-source" v-for="p in data.providers">
                    {{ p.toString() }}
                </div>
            </div>
        </div>
        <div class="alpheios-popup__providers">
          <img class="alpheios-popup__logo" src="../images/icon.png">
          <a class="alpheios-popup__providers-link uk-link" v-on:click="switchProviders">{{providersLinkText}}</a>
        </div>
        <div class="alpheios-popup__notifications uk-text-small" :class="notificationClasses"
             v-show="data.notification.important" v-if="data && data.notification">

              <span @click="closeNotifications" class="alpheios-popup__notifications-close-btn">
                  <close-icon></close-icon>
              </span>

            <span v-html="data.notification.text"></span>
            <setting :data="data.settings.preferredLanguage" :show-title="false"
                     :classes="['alpheios-popup__notifications--lang-switcher']" @change="settingChanged"
                     v-show="data.notification.showLanguageSwitcher"></setting>
        </div>
        <lookup :uiController="uiController" :parentLanguage="currentLanguageName" :clearLookupText="hasMorphData && morphDataReady"></lookup>
    </div>
</template>
<script>
  import Morph from './morph.vue'
  import Setting from './setting.vue'
  import interact from 'interactjs'
  import Logger from '../lib/log/logger'

  import Tooltip from './tooltip.vue'
  import Lookup from './lookup.vue'

  // Embeddable SVG icons
  import CloseIcon from '../images/inline-icons/close.svg'

  import { directive as onClickaway } from '../directives/clickaway.js';

  export default {
    name: 'Popup',
    components: {
      morph: Morph,
      setting: Setting,
      closeIcon: CloseIcon,
      alphTooltip: Tooltip,
      lookup: Lookup
    },
    directives: {
      onClickaway: onClickaway,
    },
    data: function () {
      return {
        resizable: true,
        draggable: true,
        // contentHeight: 0, // Morphological content height (updated with `heightchange` event emitted by a morph component)
        minResizableWidth: 0, // Resizable's min width (for Interact.js)
        minResizableHeight: 0, // Resizable's min height (for Interact.js)
        interactInstance: undefined,
        lexicalDataContainerID: 'alpheios-lexical-data-container',
        morphComponentID: 'alpheios-morph-component',

        // Current positions and sizes of a popup
        positionTopValue: 0,
        positionLeftValue: 0,
        widthValue: 0,
        heightValue: 0,
        exactWidth: 0,
        exactHeight: 0,
        resizeDelta: 20, // Changes in size below this value (in pixels) will be ignored to avoid minor dimension updates
        resizeCount: 0, // Should not exceed `resizeCountMax`
        resizeCountMax: 100, // Max number of resize iteration
        updateDimensionsTimeout: null
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      messages: {
        type: Array,
        required: true
      },
      lexemes: {
        type: Array,
        required: true
      },
      definitions: {
        type: Object,
        required: true
      },
      linkedfeatures: {
        type: Array,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      },
      translations: {
        type: Object,
        required: true
      },
      classesChanged: {
        type: Number,
        required: false,
        default: 0
      }
    },
    created () {
      let vm = this
      this.$on('updatePopupDimensions', function() {
        vm.updatePopupDimensions()
      })
      this.$on('changeStyleClass', function(name, type) {
        vm.uiOptionChanged(name, type)
      })
    },
    computed: {
      divClasses () {
        return this.data && this.data.classes ? this.data.classes.join(' ') : ''
      },
      uiController: function () {
        return (this.$parent && this.$parent.uiController) ? this.$parent.uiController : null
      },
      mainstyles: function () {
        return Object.assign({left: this.positionLeftDm, top: this.positionTopDm, width: this.widthDm, height: this.heightDm}, this.data ? this.data.styles : {})
      },
      logger: function() {
        let verbMode = false
        if (this.data) {
          console.log(`Verbose = ${this.data.verboseMode}`)
          verbMode = this.data.verboseMode
        }
        return Logger.getLogger(verbMode)
      },
      requestStartTime: function () {
        return (this.data) ? this.data.requestStartTime : null
      },

      inflDataReady: function () {
        return (this.data && this.data.inflDataReady) ? this.data.inflDataReady : false
      },
      defDataReady: function () {
        return (this.data && this.data.defDataReady) ? this.data.defDataReady : false
      },
      translationsDataReady: function () {
        return (this.data && this.data.translationsDataReady) ? this.data.translationsDataReady : false
      },
      hasMorphData: function () {
        if (Array.isArray(this.lexemes) && this.lexemes.length > 0 && 
             (this.lexemes[0].lemma.principalParts.length > 0 || this.lexemes[0].inflections.length > 0 || this.lexemes[0].inflections.length > 0 
              || this.lexemes[0].meaning.fullDefs.length > 0 || this.lexemes[0].meaning.shortDefs.length > 0) 
           ) 
        {
          return true
        }
        return false
      },
      morphDataReady: function () {
        return (this.data && this.data.morphDataReady) ? this.data.morphDataReady : false
      },
      noLanguage: function () {
        return (this.data) ? this.data.currentLanguageName === undefined : false
      },
      currentLanguageName: function() {
        return (this.data) ? this.data.currentLanguageName : null
      },
      notificationClasses: function () {
        return {
          'alpheios-popup__notifications--important': this.data.notification.important
        }
      },
      providersLinkText: function() {

        return (this.data) ? this.data.showProviders ? this.ln10Messages('LABEL_POPUP_HIDECREDITS') : this.ln10Messages('LABEL_POPUP_SHOWCREDITS') : ''
      },
      showProviders: function() {
        return (this.data) ? this.data.showProviders : null
      },
      updates: function() {
        return (this.data) ? this.data.updates : null
      },

      positionLeftDm: function () {
        if (!this.visible) {
          // Reset if popup is invisible
          return '0px'
        }

        if (this.data.settings && this.data.settings.popupPosition.currentValue === 'fixed') {
          return this.data.left
        }

        let left = this.positionLeftValue
        let placementTargetX = this.data.targetRect.left
        let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        let verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        let leftSide = placementTargetX - this.exactWidth / 2
        let rightSide = placementTargetX + this.exactWidth / 2
        if (this.widthDm !== 'auto') {
          // Popup is too wide and was restricted in height
          this.logger.log(`Setting position left for a set width`)
          left = this.data.viewportMargin
        } else if (rightSide < viewportWidth - verticalScrollbarWidth - this.data.viewportMargin
          && leftSide > this.data.viewportMargin) {
          // We can center it with the target
          left = placementTargetX - Math.floor(this.exactWidth / 2)
        } else if (leftSide > this.data.viewportMargin) {
          // There is space at the left, move it there
          left = viewportWidth - verticalScrollbarWidth - this.data.viewportMargin - this.exactWidth
        } else if (rightSide < viewportWidth - verticalScrollbarWidth - this.data.viewportMargin) {
          // There is space at the right, move it there
          left = this.data.viewportMargin
        }
        return `${left}px`
      },

      positionTopDm: function () {
        if (!this.visible) {
          // Reset if popup is invisible
          return '0px'
        }

        if (this.data.settings && this.data.settings.popupPosition.currentValue === 'fixed') {
          return this.data.top
        }

        let time = new Date().getTime()
        this.logger.log(`${time}: position top calculation, offsetHeight is ${this.exactHeight}`)
        let top = this.positionTopValue
        let placementTargetY = this.data.targetRect.top
        let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        let horizontalScrollbarWidth = window.innerHeight - document.documentElement.clientHeight
        if (this.heightDm !== 'auto') {
          // Popup is too wide and was restricted in height
          this.logger.log(`Setting position top for a set height`)
          top = this.data.viewportMargin
        } else if (placementTargetY + this.data.placementMargin + this.exactHeight < viewportHeight - this.data.viewportMargin - horizontalScrollbarWidth) {
          // Place it below a selection
          top = placementTargetY + this.data.placementMargin
        } else if (placementTargetY - this.data.placementMargin - this.exactHeight > this.data.viewportMargin) {
          // Place it above a selection
          top = placementTargetY - this.data.placementMargin - this.exactHeight
        } else if (placementTargetY < viewportHeight - horizontalScrollbarWidth - placementTargetY) {
          // There is no space neither above nor below. Word is shifted to the top. Place a popup at the bottom.
          top = viewportHeight - horizontalScrollbarWidth - this.data.viewportMargin - this.exactHeight
        } else if (placementTargetY > viewportHeight - horizontalScrollbarWidth - placementTargetY) {
          // There is no space neither above nor below. Word is shifted to the bottom. Place a popup at the top.
          top = this.data.viewportMargin
        } else {
          // There is no space neither above nor below. Center it vertically.
          top = Math.round((viewportHeight - horizontalScrollbarWidth - this.exactHeight) / 2)
        }
        time = new Date().getTime()
        this.logger.log(`${time}: position top getter, return value is ${top}, offsetHeight is ${this.exactHeight}`)
        return `${top}px`
      },

      widthDm: {
        get: function () {
          return this.widthValue === 'auto' ? 'auto' : `${this.widthValue}px`
        },
        set: function (newWidth) {
          let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
          let verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth
          let maxWidth = viewportWidth - 2*this.data.viewportMargin - verticalScrollbarWidth
          if (newWidth >= maxWidth) {
            this.logger.log(`Popup is too wide, limiting its width to ${maxWidth}px`)
            this.widthValue = maxWidth
            this.exactWidth = this.widthValue
          } else {
            this.widthValue = 'auto'
          }
        }
      },

      heightDm: {
        get: function () {
          let time = new Date().getTime()
          this.logger.log(`${time}: height getter, return value is ${this.heightValue}`)
          return this.heightValue === 'auto' ? 'auto' : `${this.heightValue}px`
        },
        set: function (newHeight) {
          let time = new Date().getTime()
          this.logger.log(`${time}: height setter, offsetHeight is ${newHeight}`)
          let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
          let horizontalScrollbarWidth = window.innerHeight - document.documentElement.clientHeight
          let maxHeight = viewportHeight - 2*this.data.viewportMargin - horizontalScrollbarWidth
          if (newHeight >= maxHeight) {
            this.logger.log(`Popup is too tall, limiting its height to ${maxHeight}px`)
            this.heightValue = maxHeight
            this.exactHeight = this.heightValue
          } else {
            this.heightValue = 'auto'
          }
        }
      },

      additionalStylesTootipCloseIcon: function () {
        return {
          top: '2px',
          right: '50px'
        }
      }
    },

    methods: {
      uiOptionChanged: function (name, value) {
        this.$emit('ui-option-change', name, value)
      },

      clearMessages() {
        while (this.messages.length >0) {
          this.messages.pop()
        }
      },

      closePopup () {
        this.logger.log(`Closing a popup and resetting its dimensions`)
        this.$emit('close')
      },

      closeNotifications () {
        this.$emit('closepopupnotifications')
      },

      showPanelTab (tabName) {
        this.$emit('showpaneltab', tabName)
      },

      settingChanged: function (name, value) {
        this.$emit('settingchange', name, value) // Re-emit for a Vue instance
      },

      switchProviders: function () {
        this.data.showProviders = ! this.data.showProviders
        if (this.data.showProviders) {
          // Show credits info
          this.$nextTick(() => {
            let container = this.$el.querySelector(`#${this.lexicalDataContainerID}`)
            if (container) {
              container.scrollTop = container.scrollHeight // Will make it scroll all the way to the bottom
            }
          })
        }
      },

      // Interact.js resizable settings
      resizableSettings: function () {
        return {
          preserveAspectRatio: false,
          edges: { left: true, right: true, bottom: true, top: true },
          restrictSize: {
            min: { width: this.minResizableWidth, height: this.minResizableHeight }
          },
          restrictEdges: {
            outer: document.body,
            endOnly: true,
          }
        }
      },

      // Interact.js draggable settings
      draggableSettings: function () {
        return {
          inertia: true,
          autoScroll: false,
          restrict: {
            restriction: document.body,
            elementRect: { top: 0.5, left: 0.5, bottom: 0.5, right: 0.5 }
          },
          ignoreFrom: 'input, textarea, a[href], select, option',
          onmove: this.dragMoveListener
        }
      },

      resizeListener (event) {
        if (this.resizable) {
          const target = event.target
          let x = (parseFloat(target.getAttribute('data-x')) || 0)
          let y = (parseFloat(target.getAttribute('data-y')) || 0)

          // update the element's style
          target.style.width  = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      },

      dragMoveListener (event) {
        if (this.draggable) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          target.style.webkitTransform = `translate(${x}px, ${y}px)`;
          target.style.transform = `translate(${x}px, ${y}px)`;

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        }
      },

      /**
       * This function is called from an `updated()` callback. Because of this, it should never use a `nextTick()`
       * as it might result in an infinite loop of updates: nextTick() causes a popup to be updated, updated()
       * callback is called, that, in turn, calls nextTick() and so on.
       * It seems that calling it even without `nextTick()` is enough for updating a popup dimensions.
       */
      updatePopupDimensions () {
        let time = new Date().getTime()

        if (this.resizeCount >= this.resizeCountMax) {
          // Skip resizing if maximum number reached to avoid infinite loops
          return
        }

        let innerDif = this.$el.querySelector("#alpheios-lexical-data-container").clientHeight - this.$el.querySelector("#alpheios-morph-component").clientHeight

        if (this.heightDm !== 'auto' && innerDif > this.resizeDelta) {
          this.heightDm ='auto'
          return
        }

        // Update dimensions only if there was any significant change in a popup size
        if (this.$el.offsetWidth >= this.exactWidth + this.resizeDelta
          || this.$el.offsetWidth <= this.exactWidth - this.resizeDelta) {
          this.logger.log(`${time}: dimensions update, offsetWidth is ${this.$el.offsetWidth}, previous exactWidth is ${this.exactWidth}`)
          this.exactWidth = this.$el.offsetWidth
          this.widthDm = this.$el.offsetWidth
          this.resizeCount++
          this.logger.log(`Resize counter value is ${this.resizeCount}`)
        }

        if (this.$el.offsetHeight >= this.exactHeight + this.resizeDelta
          || this.$el.offsetHeight <= this.exactHeight - this.resizeDelta) {
          this.logger.log(`${time}: dimensions update, offsetHeight is ${this.$el.offsetHeight}, previous exactHeight is ${this.exactHeight}`)
          this.exactHeight = this.$el.offsetHeight
          this.heightDm = this.$el.offsetHeight
          this.resizeCount++
          this.logger.log(`Resize counter value is ${this.resizeCount}`)
        }
      },

      resetPopupDimensions () {
        this.logger.log('Resetting popup dimensions')
        // this.contentHeight = 0
        this.resizeCount = 0
        this.widthValue = 0
        this.heightValue = 0
        this.exactWidth = 0
        this.exactHeight = 0
        if (this.$el) {
          this.$el.style.webkitTransform = `translate(0px, $0px)`
          this.$el.style.transform = `translate(0px, 0px)`
          this.$el.setAttribute('data-x', '0')
          this.$el.setAttribute('data-y', '0')
        }
      },

      sendFeature (data) {
        this.$emit('sendfeature',data)
      },

      ln10Messages: function (value, defaultValue = 'unknown') {
        if (this.data && this.data.l10n && this.data.l10n.messages && this.data.l10n.messages[value]) {
          return this.data.l10n.messages[value]
        }
        return defaultValue
      },

      attachTrackingClick: function () {
        this.closePopup()
      }

    },

    mounted () {
      if (this.data && this.data.draggable && this.data.resizable) {
        this.interactInstance = interact(this.$el)
          .resizable(this.resizableSettings())
          .draggable(this.draggableSettings())
          .on('resizemove', this.resizeListener)
      }
    },

    updated () {
      if (this.visible) {
        let time = new Date().getTime()
        this.logger.log(`${time}: component is updated`)

        let vm = this
        clearTimeout(this.updateDimensionsTimeout)
        let timeoutDuration = 0
        if (this.resizeCount > 1) {
          timeoutDuration = 1000
        }
        this.updateDimensionsTimeout = setTimeout(function () {
          vm.updatePopupDimensions()
        }, timeoutDuration)
      }
    },

    watch: {
      visible: function(value) {
        if (value) {
          // A popup became visible
          this.updatePopupDimensions()
        } else {
          // A popup became invisible
          this.resetPopupDimensions()
        }
      },

      requestStartTime () {
        this.logger.log(`Request start time has been updated`)
        this.logger.log(`Popup position is ${this.data.settings.popupPosition.currentValue}`)
        // There is a new request coming in, reset popup dimensions
        this.resetPopupDimensions()
      },

      translationsDataReady: function(value) {
        let time = new Date().getTime()
        this.logger.log(`${time}: translation data became available`, this.translations)
      }

    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-popup {
        display: flex;
        flex-direction: column;
        background: #FFF;
        border: 1px solid lightgray;
        min-width: 210px;
        min-height: 150px;
        z-index: 1000;
        position: fixed;
        left: 200px;
        top: 100px;
        box-sizing: border-box;  /* Required for Interact.js to take element size with paddings and work correctly */
        overflow: auto;
        font-family: $alpheios-font-family;
        font-size: $alpheios-base-font-size;
        color: $alpheios-copy-color;
    }

    .alpheios-popup__header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        flex: 0 0 45px;
        padding: 10px 10px 0;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .alpheios-popup__header-text {
        line-height: 1;
        align-items: flex-start;
        padding: 7px 20px 0 0;
    }

    .alpheios-popup__header-selection {
        font-size: $alpheios-base-font-size;
        font-weight: 700;
        color: $alpheios-toolbar-color;
    }

    .alpheios-popup__header-word {
        font-size: 0.75*$alpheios-base-font-size;
        position: relative;
        top: -1px;
    }

    .alpheios-popup__close-btn {
        display: block;
        position: absolute;
        width: 20px;
        right: 5px;
        top: 2px;
        cursor: pointer;
        fill: $alpheios-link-color-dark-bg;
        stroke: $alpheios-link-color-dark-bg;
        background: inherit;
    }

    .alpheios-popup__close-btn:hover,
    .alpheios-popup__close-btn:focus {
        fill: $alpheios-link-hover-color;
        stroke: $alpheios-link-hover-color;
    }

    .alpheios-popup__notifications {
        display: none;
        position: relative;
        padding: 10px 20px;
        background: $alpheios-logo-color;
        flex: 0 0 60px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .alpheios-popup__notifications-close-btn {
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

    .alpheios-popup__notifications-close-btn:hover,
    .alpheios-popup__notifications-close-btn:focus {
        fill: $alpheios-link-hover-color;
        stroke: $alpheios-link-hover-color;
    }

    [data-notification-visible="true"] .alpheios-popup__notifications {
        display: block;
    }

    .alpheios-popup__notifications--lang-switcher {
        font-size: 0.75*$alpheios-base-font-size;
        float: right;
        margin: -20px 10px 0 0;
        display: inline-block;
    }

    .alpheios-popup__notifications--lang-switcher .uk-select {
        width: 120px;
        height: 25px;
    }

    .alpheios-popup__notifications--important {
        background: $alpheios-icon-color;
    }

    .alpheios-popup__morph-cont {
        flex: 1 1;
        box-sizing: border-box;
        margin: 5px 10px 0;
        overflow: auto;
        padding: 10px;
        border: 1px solid $alpheios-sidebar-header-border-color;
    }

    .alpheios-popup__morph-cont-providers-header {
        display: inline-block;
        /* color: $alpheios-link-color;
        font-size: 0.75*$alpheios-base-font-size; */
        font-weight: 700;
        margin-top: 2px;
    }

    .alpheios-popup__definitions--placeholder {
        border: 0 none;
        padding: 10px 0 0;
    }

    img.alpheios-popup__logo {
        height: 16px;
        width: auto;
        vertical-align: middle;
    }

    .alpheios-popup__more-btn {
        float: right;
        margin-bottom: 10px;
        /* font-size: 0.675 * $alpheios-base-font-size; */
    }
    .alpheios-popup__morph-cont-providers-source {
      font-size: smaller;
      font-weight: normal;
      /* color: $alpheios-toolbar-color; */
      font-style: italic;
      margin-left: .5em;
      margin-top: .5em;
    }

    .alpheios-popup__providers {
      margin: 0 0 5px 10px;
    }
    /*
    .alpheios-popup__providers-link {
      font-size: 0.675*$alpheios-base-font-size;
    }*/
    .alpheios-popup__providers-link {
      display: inline-block;
      vertical-align: middle;
      padding: 5px 0 0;
    }
</style>