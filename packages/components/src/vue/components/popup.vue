<template>
  <div :data-notification-visible="$store.state.ui.notification.visible && $store.state.ui.notification.visible"
       :style="mainstyles" class="alpheios-popup auk" id="alpheios-popup-inner" ref="popup"
       :class="rootClasses" v-on-clickaway="attachTrackingClick"
       v-show="this.$store.state.popup.visible">
    <alph-tooltip
        :additionalStyles="additionalStylesTootipCloseIcon"
        :tooltipText="l10n.getText('TOOLTIP_POPUP_CLOSE')"
        tooltipDirection="left">
          <span @click="ui.closePopup" class="alpheios-popup__close-btn">
              <close-icon></close-icon>
          </span>
    </alph-tooltip>
    <div class="alpheios-popup__header">
      <div :lang="$store.state.app.status.languageCode" class="alpheios-popup__header-text" v-if="$store.state.app.status">
        <span :lang="$store.state.app.status.languageCode" class="alpheios-popup__header-selection"
              v-show="$store.state.app.status.selectedText">{{$store.state.app.status.selectedText}}</span>
        <span class="alpheios-popup__header-word" lang="en" v-show="$store.state.app.status.languageName && verboseMode">({{$store.state.app.status.languageName}})</span>
      </div>

      <div class="alpheios-popup__button-area" v-if="data">
        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_DEFINITIONS')" tooltipDirection="bottom-wide"
                      v-show="$store.state.app.defDataReady">
          <button @click="showPanelTab('definitions')" class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-definitions">
            {{ l10n.getText('LABEL_POPUP_DEFINE') }}
          </button>
        </alph-tooltip>

        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_INFLECTIONS')" tooltipDirection="bottom-wide"
                      v-show="$store.getters[`app/hasInflData`]">
          <button @click="showPanelTab('inflections')"
                  class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-inflections">
            {{ l10n.getText('LABEL_POPUP_INFLECT') }}
          </button>
        </alph-tooltip>

        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_USAGEEXAMPLES')" tooltipDirection="bottom-wide"
                      v-show="$store.getters['app/hasWordUsageExamplesData']">
          <button class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-inflections"
                  @click="showPanelTab('wordUsage')">
            {{ l10n.getText('LABEL_POPUP_USAGEEXAMPLES') }}
          </button>
        </alph-tooltip>

        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="bottom-wide"
                      v-show="$store.getters['app/hasTreebankData']">
          <button @click="showPanelTab('treebank')"
                  class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-treebank">
            {{ l10n.getText('LABEL_POPUP_TREEBANK') }}
          </button>

        </alph-tooltip>

        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_OPTIONS')" tooltipDirection="bottom-right">
          <button @click="showPanelTab('options')"
                  class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn alpheios-popup__more-btn-options">
            {{ l10n.getText('LABEL_POPUP_OPTIONS') }}
          </button>
        </alph-tooltip>
      </div>
    </div>

    <div class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small"
         v-show="!$store.state.app.morphDataReady && !noLanguage">
      <progress-bar :text="l10n.getText('PLACEHOLDER_POPUP_DATA')"></progress-bar>
    </div>

    <div class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small"
         v-show="noLanguage && !$store.state.app.morphDataReady">
      {{ l10n.getText('PLACEHOLDER_NO_LANGUAGE_POPUP_DATA') }}
    </div>
    <div class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small"
         v-show="!$store.getters['app/hasMorphData'] && $store.state.app.morphDataReady && !noLanguage">
      {{ l10n.getText('PLACEHOLDER_NO_DATA_POPUP_DATA') }}
    </div>
    <div :id="lexicalDataContainerID" class="alpheios-popup__morph-cont uk-text-small alpheios-popup__morph-cont-ready"
         v-show="$store.state.app.morphDataReady && $store.getters['app/hasMorphData']">
      <morph :id="morphComponentID" @sendfeature="sendFeature">
      </morph>

      <div class="alpheios-popup__morph-cont-providers" v-if="showProviders">
        <div class="alpheios-popup__morph-cont-providers-header">{{ l10n.getText('LABEL_POPUP_CREDITS') }}</div>
        <div class="alpheios-popup__morph-cont-providers-source" v-for="p in $store.state.app.providers">
          {{ p.toString() }}
        </div>
      </div>
    </div>
    <div class="alpheios-popup__providers">
      <img class="alpheios-popup__logo" src="../../images/icon.png">
      <a class="alpheios-popup__providers-link uk-link" v-on:click="switchProviders">{{providersLinkText}}</a>
    </div>
    <div class="alpheios-popup__notifications uk-text-small"
         :class="{ 'alpheios-popup__notifications--important': this.$store.state.ui.notification.important }"
         v-if="$store.state.ui.notification.text" v-show="$store.state.ui.notification.important">

              <span @click="$store.commit(`ui/resetNotification`)" class="alpheios-popup__notifications-close-btn">
                  <close-icon></close-icon>
              </span>

      <span v-html="$store.state.ui.notification.text"></span>
      <setting :classes="['alpheios-popup__notifications--lang-switcher']" :data="settings.contentOptions.items.preferredLanguage"
               :show-title="false" @change="contentOptionChanged"
               v-show="$store.state.ui.notification.showLanguageSwitcher"></setting>
    </div>
    <lookup :clearLookupText="$store.getters['app/hasMorphData'] && $store.state.app.morphDataReady" :parentLanguage="$store.state.app.currentLanguageName"></lookup>
  </div>
</template>
<script>
import Morph from './morph.vue'
import Setting from './setting.vue'
import interact from 'interactjs'
import Logger from '@/lib/log/logger'

import Tooltip from './tooltip.vue'
import Lookup from './lookup.vue'
import ProgressBar from './progress-bar.vue'
// Embeddable SVG icons
import CloseIcon from '../../images/inline-icons/close.svg'

import { directive as onClickaway } from '../directives/clickaway.js'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Popup',
  inject: ['app', 'ui', 'l10n', 'settings'],
  storeModules: ['app', 'ui', 'popup'],
  mixins: [DependencyCheck],
  components: {
    morph: Morph,
    setting: Setting,
    closeIcon: CloseIcon,
    alphTooltip: Tooltip,
    lookup: Lookup,
    progressBar: ProgressBar
  },
  directives: {
    onClickaway: onClickaway
  },
  // Custom props to store unwatch functions
  visibleUnwatch: null,
  lexrqStartedUnwatch: null,

  data: function () {
    return {
      resizable: true,
      draggable: true,
      // Whether there is an error with Interact.js drag coordinates in the corresponding direction
      dragErrorX: false,
      dragErrorY: false,
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
      updateDimensionsTimeout: null,

      showProviders: false
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
  created () {
    let vm = this
    this.$on('updatePopupDimensions', function () {
      vm.updatePopupDimensions()
    })
  },
  computed: {
    rootClasses () {
      return this.$store.state.ui.rootClasses
    },
    mainstyles: function () {
      return {
        left: this.positionLeftDm,
        top: this.positionTopDm,
        width: this.widthDm,
        height: this.heightDm,
        zIndex: this.ui.zIndex
      }
    },
    logger: function () {
      return Logger.getLogger(this.verboseMode)
    },
    noLanguage: function () {
      return Boolean(!this.$store.state.app.currentLanguageName)
    },
    providersLinkText: function () {
      return this.showProviders ? this.l10n.getText('LABEL_POPUP_HIDECREDITS') : this.l10n.getText('LABEL_POPUP_SHOWCREDITS')
    },

    positionLeftDm: function () {
      if (!this.$store.state.popup.visible) {
        // Reset if popup is invisible
        return '0px'
      }

      if (this.settings.contentOptions.items && this.settings.contentOptions.items.popupPosition.currentValue === 'fixed') {
        return this.data.left
      }

      let left = this.positionLeftValue
      let placementTargetX = this.$store.state.api.htmlSelector ? this.$store.state.api.htmlSelector.targetRect.left : 0
      let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      let verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      let leftSide = placementTargetX - this.exactWidth / 2
      let rightSide = placementTargetX + this.exactWidth / 2
      if (this.widthDm !== 'auto') {
        // Popup is too wide and was restricted in height
        this.logger.log(`Setting position left for a set width`)
        left = this.data.viewportMargin
      } else if (rightSide < viewportWidth - verticalScrollbarWidth - this.data.viewportMargin &&
          leftSide > this.data.viewportMargin) {
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
      if (!this.$store.state.popup.visible) {
        // Reset if popup is invisible
        return '0px'
      }

      if (this.settings.contentOptions.items && this.settings.contentOptions.items.popupPosition.currentValue === 'fixed') {
        return this.data.top
      }

      let time = Date.now()
      this.logger.log(`${time}: position top calculation, offsetHeight is ${this.exactHeight}`)
      let top = this.positionTopValue
      let placementTargetY = this.$store.state.api.htmlSelector ? this.$store.state.api.htmlSelector.targetRect.top : 0
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
      time = Date.now()
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
        let maxWidth = viewportWidth - 2 * this.data.viewportMargin - verticalScrollbarWidth
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
        let time = Date.now()
        this.logger.log(`${time}: height getter, return value is ${this.heightValue}`)
        return this.heightValue === 'auto' ? 'auto' : `${this.heightValue}px`
      },
      set: function (newHeight) {
        let time = Date.now()
        this.logger.log(`${time}: height setter, offsetHeight is ${newHeight}`)
        /*
            let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            let horizontalScrollbarWidth = window.innerHeight - document.documentElement.clientHeight
            let maxHeight = viewportHeight - 2*this.data.viewportMargin - horizontalScrollbarWidth
            */
        if (newHeight >= this.maxHeight) {
          this.logger.log(`Popup is too tall, limiting its height to ${this.maxHeight}px`)
          this.heightValue = this.maxHeight
          this.exactHeight = this.heightValue
        } else {
          this.heightValue = 'auto'
        }
      }
    },

    maxHeight () {
      let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      let horizontalScrollbarWidth = window.innerHeight - document.documentElement.clientHeight
      return viewportHeight - 2 * this.data.viewportMargin - horizontalScrollbarWidth
    },

    additionalStylesTootipCloseIcon: function () {
      return {
        top: '2px',
        right: '50px'
      }
    },

    verboseMode () {
      return this.settings.contentOptions.items.verboseMode.currentValue === `verbose`
    }
  },

  methods: {
    showPanelTab (tabName) {
      this.$emit('showpaneltab', tabName)
    },

    contentOptionChanged: function (name, value) {
      this.app.contentOptionChange(name, value)
    },

    switchProviders: function () {
      this.showProviders = !this.showProviders
      if (this.showProviders) {
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
          restriction: document.body,
          endOnly: true
        }
      }
    },

    // Interact.js draggable settings
    draggableSettings: function () {
      return {
        inertia: true,
        autoScroll: false,
        restrict: {
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
        target.style.width = event.rect.width + 'px'
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
        const target = event.target
        let dx = event.dx
        let dy = event.dy

        /*
            On some websites Interact.js is unable to determine correct clientX or clientY coordinates.
            This will result in a popup moving abruptly beyond screen limits.
            To fix this, we will filter out erroneous coordinates and chancel a move in the corresponding
            direction as incorrect. This will allow us to keep the popup on screen by sacrificing its movement
            in (usually) one direction. This is probably the best we can do with all the information we have.
             */
        const dragTreshold = 100 // Drag distance values above this will be considered abnormal
        if (Math.abs(dx) > dragTreshold) {
          if (!this.dragErrorX) {
            console.warn(`Calculated horizontal drag distance is out of bounds: ${dx}. This is probably an error. Dragging in horizontal direction will be disabled.`)
            this.dragErrorX = true
          }
          dx = 0
        }
        if (Math.abs(dy) > dragTreshold) {
          if (!this.dragErrorY) {
            console.warn(`Calculated vertical drag distance is out of bounds: ${dy}. This is probably an error. Dragging in vertical direction will be disabled.`)
            this.dragErrorY = true
          }
          dy = 0
        }
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy

        target.style.webkitTransform = `translate(${x}px, ${y}px)`
        target.style.transform = `translate(${x}px, ${y}px)`

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },

    /**
       * This function is called from an `updated()` callback. Because of this, it should never use a `nextTick()`
       * as it might result in an infinite loop of updates: nextTick() causes a popup to be updated, updated()
       * callback is called, that, in turn, calls nextTick() and so on.
       * It seems that calling it even without `nextTick()` is enough for updating a popup dimensions.
       */
    updatePopupDimensions () {
      let time = Date.now()

      if (this.resizeCount >= this.resizeCountMax) {
        // Skip resizing if maximum number reached to avoid infinite loops
        return
      }

      let innerDif = this.$el.querySelector('#alpheios-lexical-data-container').clientHeight - this.$el.querySelector('#alpheios-morph-component').clientHeight

      if (this.heightDm !== 'auto' && innerDif > this.resizeDelta && this.heightValue !== this.maxHeight) {
        this.heightDm = 'auto'
        return
      }

      // Update dimensions only if there was any significant change in a popup size
      if (this.$el.offsetWidth >= this.exactWidth + this.resizeDelta ||
          this.$el.offsetWidth <= this.exactWidth - this.resizeDelta) {
        this.logger.log(`${time}: dimensions update, offsetWidth is ${this.$el.offsetWidth}, previous exactWidth is ${this.exactWidth}`)
        this.exactWidth = this.$el.offsetWidth
        this.widthDm = this.$el.offsetWidth
        this.resizeCount++
        this.logger.log(`Resize counter value is ${this.resizeCount}`)
      }

      if (this.$el.offsetHeight >= this.exactHeight + this.resizeDelta ||
          this.$el.offsetHeight <= this.exactHeight - this.resizeDelta) {
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
      this.$emit('sendfeature', data)
    },

    attachTrackingClick: function () {
      this.ui.closePopup()
    }

  },

  mounted () {
    if (this.data && this.data.draggable && this.data.resizable) {
      this.interactInstance = interact(this.$el)
        .resizable(this.resizableSettings())
        .draggable(this.draggableSettings())
        .on('resizemove', this.resizeListener)
    }

    // Updated popup dimensions when its visibility is updated
    this.$options.visibleUnwatch = this.$store.watch((state) => state.popup.visible, (oldValue, newValue) => {
      if (newValue) {
        // A popup became visible
        this.updatePopupDimensions()
      } else {
        // A popup became invisible
        this.resetPopupDimensions()
      }
    })

    this.$options.lexrqStartedUnwatch = this.$store.watch((state, getters) => state.app.lexicalRequest.startTime, () => {
      // There is a new request coming in, reset popup dimensions
      this.resetPopupDimensions()
      this.showProviders = false
    })
  },

  beforeDestroy () {
    // Teardown the watch function
    this.$options.visibleUnwatch()
    this.$options.lexrqStartedUnwatch()
  },

  updated () {
    if (this.$store.state.popup.visible) {
      let time = Date.now()
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
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

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
    box-sizing: border-box; /* Required for Interact.js to take element size with paddings and work correctly */
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

  .alpheios-popup__header-text[lang='ara'] {
    padding: 0px 20px 0px 20px; /* the arabic amiri font does not like the top padding */
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
    stroke-width: 2.5;
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
    padding: 10px 0;
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
    max-width: 700px;
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
