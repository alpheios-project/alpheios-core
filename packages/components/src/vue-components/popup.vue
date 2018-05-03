<template>
    <div ref="popup" class="alpheios-popup auk" v-bind:class="data.classes" :style="{left: positionLeftDm, top: positionTopDm, width: widthDm, height: heightDm}"
         v-show="visible" :data-notification-visible="data.notification.visible">
        <span class="alpheios-popup__close-btn" @click="closePopup" :title="data.l10n.messages.TOOLTIP_POPUP_CLOSE">
            <close-icon></close-icon>
        </span>
        <div class="alpheios-popup__header">
            <div class="alpheios-popup__header-text">
                <span v-show="data.status.selectedText" class="alpheios-popup__header-selection">{{data.status.selectedText}}</span>
                <span v-show="data.status.languageName && data.verboseMode" class="alpheios-popup__header-word">({{data.status.languageName}})</span>
            </div>
            <div class="uk-button-group alpheios-popup__button-area">
                <button @click="showPanelTab('inflections')" v-show="data.inflDataReady"
                        class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn">{{data.l10n.messages.LABEL_POPUP_INFLECT}}
                </button>
                <button @click="showPanelTab('definitions')" v-show="data.defDataReady"
                        class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn">{{data.l10n.messages.LABEL_POPUP_DEFINE}}
                </button>
                <button @click="showPanelTab('options')"
                        class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn">{{data.l10n.messages.LABEL_POPUP_OPTIONS}}
                </button>
            </div>
        </div>
        <div v-show="!morphDataReady"
             class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small">
            {{data.l10n.messages.PLACEHOLDER_POPUP_DATA}}
        </div>
        <div v-show="morphDataReady" :id="lexicalDataContainerID" class="alpheios-popup__morph-cont uk-text-small">
            <morph :id="morphComponentID" :lexemes="lexemes" :definitions="definitions" :translations="translations"
                   :linkedfeatures="linkedfeatures" @sendfeature="sendFeature">
            </morph>

            <div class="alpheios-popup__morph-cont-providers" v-if="showProviders">
                <div class="alpheios-popup__morph-cont-providers-header">{{data.l10n.messages.LABEL_POPUP_CREDITS}}</div>
                <div class="alpheios-popup__morph-cont-providers-source" v-for="p in data.providers">
                    {{ p.toString() }}
                </div>
            </div>
        </div>
        <div class="alpheios-popup__providers">
          <img class="alpheios-popup__logo" src="../images/icon.png">
          <a class="alpheios-popup__providers-link" v-on:click="switchProviders">{{providersLinkText}}</a>
        </div>
        <div class="alpheios-popup__notifications uk-text-small" :class="notificationClasses"
             v-show="data.notification.important">
            <span @click="closeNotifications" class="alpheios-popup__notifications-close-btn">
                <close-icon></close-icon>
            </span>
            <span v-html="data.notification.text"></span>
            <setting :data="data.settings.preferredLanguage" :show-title="false"
                     :classes="['alpheios-popup__notifications--lang-switcher']" @change="settingChanged"
                     v-show="data.notification.showLanguageSwitcher"></setting>
        </div>

        <lookup-component :uiController="uiController"></lookup-component>
    </div>
</template>
<script>
  import Morph from './morph.vue'
  import Setting from './setting.vue'
  import interact from 'interactjs'
  import Logger from '../lib/log/logger'

  import LookupComponent from './lookup-component.vue'

  // Embeddable SVG icons
  import CloseIcon from '../images/inline-icons/close.svg'

  export default {
    name: 'Popup',
    components: {
      morph: Morph,
      setting: Setting,
      closeIcon: CloseIcon,
      lookupComponent: LookupComponent
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
        resizeDelta: 10, // Changes in size below this value (in pixels) will be ignored to avoid minor dimension updates
        resizeCount: 0, // Should not exceed `resizeCountMax`
        resizeCountMax: 100, // Max number of resize iteration
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
      }
    },

    computed: {
      uiController: function () {
        return this.$parent.uiController
      },
      logger: function() {
        console.log(`Verbose = ${this.data.verboseMode}`)
        return Logger.getLogger(this.data.verboseMode)
      },
      requestStartTime: function () {
        return this.data.requestStartTime
      },

      inflDataReady: function () {
        return this.data.inflDataReady
      },
      defDataReady: function () {
        return this.data.defDataReady
      },
      translationsDataReady: function () {
        return this.data.translationsDataReady
      },
      morphDataReady: function () {
        return this.data.morphDataReady
      },
      notificationClasses: function () {
        return {
          'alpheios-popup__notifications--important': this.data.notification.important
        }
      },
      providersLinkText: function() {
        return this.data.showProviders ? this.data.l10n.messages.LABEL_POPUP_HIDECREDITS : this.data.l10n.messages.LABEL_POPUP_SHOWCREDITS
      },
      showProviders: function() {
        return this.data.showProviders
      },
      updates: function() {
        return this.data.updates
      },

      positionLeftDm: function () {
        if (!this.visible) {
          // Reset if popup is invisible
          return '0px'
        }

        if (this.data.settings.popupPosition.currentValue === 'fixed') {
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

        if (this.data.settings.popupPosition.currentValue === 'fixed') {
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
      }
    },

    methods: {
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
      }

    },

    mounted () {
      this.logger.log('mounted')
      this.interactInstance = interact(this.$el)
        .resizable(this.resizableSettings())
        .draggable(this.draggableSettings())
        .on('resizemove', this.resizeListener)

      console.log('******************************IS POPUP mounted ', this)
    },

    /**
     *
     */
    updated () {
      if (this.visible) {
        let time = new Date().getTime()
        this.logger.log(`${time}: component is updated`)
        this.updatePopupDimensions()
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
      /*inflDataReady: function() {
        let time = new Date().getTime()
        this.logger.log(`${time}: inflection data became available`)
      },

      defDataReady: function() {
        let time = new Date().getTime()
        this.logger.log(`${time}: definition data became available`)
      },*/

      // It still does not catch all popup data changes. That makes a popup resizing jerky.
      // Its safer to use an `updated()` callback instead.
      /*updates: function() {
        this.logger.log(`Content height updated, visibility is ${this.visible}`)
        if (this.visible) {
          let time = new Date().getTime()
          this.logger.log(`${time}: content height updated, offsetHeight is ${this.$el.offsetHeight}`)
          this.updatePopupDimensions()
        }
      },*/
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
        color: $alpheios-link-color;
        font-size: 0.75*$alpheios-base-font-size;
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
    }

    .alpheios-popup__more-btn {
        float: right;
        margin-bottom: 10px;
        font-size: 0.675 * $alpheios-base-font-size !important;
    }
    .alpheios-popup__morph-cont-providers-source {
      font-size: smaller;
      font-weight: normal;
      color: $alpheios-toolbar-color;
      font-style: italic;
      margin-left: .5em;
      margin-top: .5em;
    }

    .alpheios-popup__providers {
      margin: 0 0 5px 10px;
    }
    .alpheios-popup__providers-link {
      font-size: 0.675*$alpheios-base-font-size;
    }
</style>
