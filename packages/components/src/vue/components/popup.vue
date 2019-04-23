<template>
  <div
     :style="componentStyles"
     class="alpheios-popup alpheios-content"
     id="alpheios-popup-inner"
     ref="popup"
     v-on-clickaway="attachTrackingClick"
     v-show="this.$store.state.popup.visible"
  >
    <div class="alpheios-popup__header">
      <div class="alpheios-popup__logo">
        <logo-icon class="alpheios-logo-on-dark"/>
      </div>
      <alph-tooltip
          :tooltipText="l10n.getText('TOOLTIP_POPUP_CLOSE')"
          tooltipDirection="left"
      >
        <div @click="ui.closePopup" class="alpheios-popup__close-btn">
          <close-icon></close-icon>
        </div>
      </alph-tooltip>
    </div>

    <div class="alpheios-popup__body">
      <div class="alpheios-popup__toolbar">
        <div
            :lang="$store.state.app.languageCode"
            class="alpheios-popup__toolbar-text"
        >
          <h3
              :lang="$store.state.app.languageCode"
              class="alpheios-popup__toolbar-selection"
              v-show="$store.state.app.selectedText"
          >
            {{$store.state.app.selectedText}}
          </h3>
          <span
              class="alpheios-popup__toolbar-word"
              lang="en"
              v-show="$store.state.app.languageName && verboseMode"
          >
            ({{$store.state.app.languageName}})
          </span>
        </div>

        <div class="alpheios-popup__toolbar-buttons" v-show="moduleData">
          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_DEFINITIONS')" tooltipDirection="bottom-wide"
                        v-show="$store.getters['app/defDataReady']">
            <button @click="ui.showPanelTab('definitions')"
                    class="alpheios-button-primary alpheios-popup__toolbar-button">
              {{ l10n.getText('LABEL_POPUP_DEFINE') }}
            </button>
          </alph-tooltip>

          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_INFLECTIONS')" tooltipDirection="bottom-wide"
                        v-show="$store.state.app.hasInflData">
            <button @click="ui.showPanelTab('inflections')"
                    class="alpheios-button-primary alpheios-popup__toolbar-button">
              {{ l10n.getText('LABEL_POPUP_INFLECT') }}
            </button>
          </alph-tooltip>

          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_USAGEEXAMPLES')" tooltipDirection="bottom-wide"
                        v-show="$store.state.app.wordUsageExamplesReady">
            <button @click="ui.showPanelTab('wordUsage')"
                    class="alpheios-button-primary alpheios-popup__toolbar-button">
              {{ l10n.getText('LABEL_POPUP_USAGEEXAMPLES') }}
            </button>
          </alph-tooltip>

          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="bottom-wide"
                        v-show="$store.getters['app/hasTreebankData']">
            <button @click="ui.showPanelTab('treebank')"
                    class="alpheios-button-primary alpheios-popup__toolbar-button">
              {{ l10n.getText('LABEL_POPUP_TREEBANK') }}
            </button>

          </alph-tooltip>

          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_OPTIONS')" tooltipDirection="bottom-right">
            <button @click="ui.showPanelTab('options')"
                    class="alpheios-button-primary alpheios-popup__toolbar-button">
              {{ l10n.getText('LABEL_POPUP_OPTIONS') }}
            </button>
          </alph-tooltip>
        </div>
      </div>

      <div class="alpheios-popup__content">
        <div class="alpheios-popup__definitions--placeholder"
             v-if="!$store.state.app.morphDataReady && !noLanguage">
          <progress-bar :text="l10n.getText('PLACEHOLDER_POPUP_DATA')"></progress-bar>
        </div>

        <div class="alpheios-popup__definitions--placeholder"
             v-show="noLanguage && !$store.state.app.morphDataReady">
          {{ l10n.getText('PLACEHOLDER_NO_LANGUAGE_POPUP_DATA') }}
        </div>
        <div class="alpheios-popup__definitions--placeholder"
             v-show="$store.state.app.morphDataReady && !app.hasMorphData() && !noLanguage">
          {{ l10n.getText('PLACEHOLDER_NO_DATA_POPUP_DATA') }}
        </div>
        <div :id="lexicalDataContainerID"
             v-show="$store.state.app.morphDataReady && app.hasMorphData()"
        >
          <morph
              :id="morphComponentID"
          />
        </div>

        <div
            class="alpheios-popup__providers"
            v-show="$store.state.app.morphDataReady && app.hasMorphData()"
        >
          <div class="alpheios-popup__providers-title">{{ l10n.getText('LABEL_POPUP_CREDITS') }}</div>
          <a class="alpheios-popup__providers-link" v-on:click="switchProviders">{{ providersLinkText }}</a>
          <div v-if="showProviders">
            <div
                class="alpheios-popup__providers-item"
                v-for="p in $store.state.app.providers"
            >
              {{ p.toString() }}
            </div>
          </div>
        </div>

      </div>
    </div>
    <notification-area/>
  </div>
</template>
<script>
import Morph from './morph.vue'
import NotificationArea from './notification-area.vue'
import interact from 'interactjs'
import Logger from '@/lib/log/logger'

import Tooltip from './tooltip.vue'
import ProgressBar from './progress-bar.vue'
// Embeddable SVG icons
import LogoIcon from '@/images/alpheios/logo.svg'
import CloseIcon from '@/images/inline-icons/x-close.svg'

import { directive as onClickaway } from '../directives/clickaway.js'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Popup',
  inject: ['app', 'ui', 'l10n', 'settings', 'auth'],
  storeModules: ['app', 'ui', 'popup', 'auth'],
  mixins: [DependencyCheck],
  components: {
    morph: Morph,
    logoIcon: LogoIcon,
    closeIcon: CloseIcon,
    alphTooltip: Tooltip,
    progressBar: ProgressBar,
    notificationArea: NotificationArea
  },
  directives: {
    onClickaway: onClickaway
  },
  // Custom props to store unwatch functions
  visibleUnwatch: null,
  lexrqStartedUnwatch: null,
  positioningUnwatch: null,

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

      // How much a popup has been dragged from its initial position, in pixels
      shift: {
        x: this.moduleData.initialShift.x || 0,
        y: this.moduleData.initialShift.y || 0
      },

      updateDimensionsTimeout: null,

      showProviders: false
    }
  },
  props: {
    moduleData: {
      type: Object,
      required: true
    }
  },
  created () {
    let vm = this
    this.$on('updatePopupDimensions', function () {
      vm.updatePopupDimensions()
    })
  },
  computed: {
    componentStyles: function () {
      return {
        left: this.positionLeftDm,
        top: this.positionTopDm,
        width: this.widthDm,
        height: this.heightDm,
        zIndex: this.ui.zIndex,
        transform: `translate(${this.shift.x}px, ${this.shift.y}px)`
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

      if (this.$store.getters['popup/isFixedPositioned']) {
        return this.moduleData.left
      }

      let left = this.positionLeftValue
      let placementTargetX = this.$store.state.app.selectionTarget.x
      let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      let verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      let leftSide = placementTargetX - this.exactWidth / 2
      let rightSide = placementTargetX + this.exactWidth / 2
      if (this.widthDm !== 'auto') {
        // Popup is too wide and was restricted in height
        this.logger.log(`Setting position left for a set width`)
        left = this.moduleData.viewportMargin
      } else if (rightSide < viewportWidth - verticalScrollbarWidth - this.moduleData.viewportMargin &&
          leftSide > this.moduleData.viewportMargin) {
        // We can center it with the target
        left = placementTargetX - Math.floor(this.exactWidth / 2)
      } else if (leftSide > this.moduleData.viewportMargin) {
        // There is space at the left, move it there
        left = viewportWidth - verticalScrollbarWidth - this.moduleData.viewportMargin - this.exactWidth
      } else if (rightSide < viewportWidth - verticalScrollbarWidth - this.moduleData.viewportMargin) {
        // There is space at the right, move it there
        left = this.moduleData.viewportMargin
      }
      return `${left}px`
    },

    positionTopDm: function () {
      if (!this.$store.state.popup.visible) {
        // Reset if popup is invisible
        return '0px'
      }

      if (this.$store.getters['popup/isFixedPositioned']) {
        return this.moduleData.top
      }

      let time = Date.now()
      this.logger.log(`${time}: position top calculation, offsetHeight is ${this.exactHeight}`)
      let top = this.positionTopValue
      let placementTargetY = this.$store.state.app.selectionTarget.y
      let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      let horizontalScrollbarWidth = window.innerHeight - document.documentElement.clientHeight
      if (this.heightDm !== 'auto') {
        // Popup is too wide and was restricted in height
        this.logger.log(`Setting position top for a set height`)
        top = this.moduleData.viewportMargin
      } else if (placementTargetY + this.moduleData.placementMargin + this.exactHeight < viewportHeight - this.moduleData.viewportMargin - horizontalScrollbarWidth) {
        // Place it below a selection
        top = placementTargetY + this.moduleData.placementMargin
      } else if (placementTargetY - this.moduleData.placementMargin - this.exactHeight > this.moduleData.viewportMargin) {
        // Place it above a selection
        top = placementTargetY - this.moduleData.placementMargin - this.exactHeight
      } else if (placementTargetY < viewportHeight - horizontalScrollbarWidth - placementTargetY) {
        // There is no space neither above nor below. Word is shifted to the top. Place a popup at the bottom.
        top = viewportHeight - horizontalScrollbarWidth - this.moduleData.viewportMargin - this.exactHeight
      } else if (placementTargetY > viewportHeight - horizontalScrollbarWidth - placementTargetY) {
        // There is no space neither above nor below. Word is shifted to the bottom. Place a popup at the top.
        top = this.moduleData.viewportMargin
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
        let maxWidth = viewportWidth - 2 * this.moduleData.viewportMargin - verticalScrollbarWidth
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
              let maxHeight = viewportHeight - 2*this.moduleData.viewportMargin - horizontalScrollbarWidth
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
      return viewportHeight - 2 * this.moduleData.viewportMargin - horizontalScrollbarWidth
    },

    verboseMode () {
      return this.settings.contentOptions.items.verboseMode.currentValue === `verbose`
    }
  },

  methods: {
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
        ignoreFrom: 'input, textarea, a[href], select, option'
      }
    },

    resizeListener (event) {
      if (this.resizable) {
        const target = event.target
        let x = this.shift.x
        let y = this.shift.y

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        this.shift.x = x
        this.shift.y = y
      }
    },

    dragMoveListener (event) {
      if (this.draggable) {
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
        this.shift.x += dx
        this.shift.y += dy
      }
    },

    dragEndListener () {
      if (this.$store.getters['popup/isFixedPositioned']) {
        // Do not store shift values for flexible positioning as they will be erased after each lexical query
        this.settings.contentOptions.items.popupShiftX.setValue(this.shift.x)
        this.settings.contentOptions.items.popupShiftY.setValue(this.shift.y)
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
      if (this.$store.getters['popup/isFlexPositioned']) {
        // Reset positioning shift for a `flexible` position of popup only. For a `fixed` position we must retain it
        // so that the popup will open at its last position.
        this.shift = { x: 0, y: 0 }
      }
    },

    attachTrackingClick: function () {
      this.ui.closePopup()
    }
  },

  mounted () {
    if (this.moduleData && this.moduleData.draggable && this.moduleData.resizable) {
      this.interactInstance = interact(this.$el)
        .resizable(this.resizableSettings())
        .draggable(this.draggableSettings())
        .on('dragmove', this.dragMoveListener)
        .on('dragend', this.dragEndListener)
        .on('resizemove', this.resizeListener)
    }

    this.$options.lexrqStartedUnwatch = this.$store.watch((state, getters) => state.app.lexicalRequest.startTime, () => {
      // There is a new request coming in, reset popup dimensions
      this.resetPopupDimensions()
      this.showProviders = false
    })

    this.$options.positioningUnwatch = this.$store.watch((state) => state.popup.positioning, () => {
      if (this.$store.getters['popup/isFlexPositioned']) {
        this.shift = { x: 0, y: 0 }
      } else if (this.$store.getters['popup/isFixedPositioned']) {
        this.shift = {
          x: this.settings.contentOptions.items.popupShiftX.currentValue,
          y: this.settings.contentOptions.items.popupShiftY.currentValue
        }
      }
    })
  },

  beforeDestroy () {
    // Teardown the watch function
    // this.$options.visibleUnwatch()
    this.$options.lexrqStartedUnwatch()
    this.$options.positioningUnwatch()
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
  @import "../../styles/variables";

  .alpheios-popup {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    min-height: 150px;
    z-index: 1000;
    position: fixed;
    left: 200px;
    top: 100px;
    // Required for Interact.js to take element size with paddings and work correctly
    box-sizing: border-box;
    overflow: auto;
    @include alpheios-border;

    & .alpheios-notification-area {
      padding-top: 0;
    }
  }

  .alpheios-popup__header {
    display: flex;
    justify-content: space-between;
    height: uisize(44px);
    background: var(--alpheios-toolbar-bg-color);
  }

  .alpheios-popup__logo {
    position: relative;
    left: uisize(12px);
    top: uisize(12px);

    svg {
      width: uisize(28px);
      height: auto;
    }
  }

  .alpheios-popup__close-btn {
    width: uisize(56px);
    height: 100%;
    cursor: pointer;
    fill: var(--alpheios-icon-color);
    stroke: var(--alpheios-icon-color);
    stroke-width: 2.5;

    svg {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      left: uisize(16px);
      width: uisize(22px);
      height: auto;
    }

    &:hover,
    &:focus {
      fill: var(--alpheios-icon-color-hover);
      stroke: var(--alpheios-icon-color-hover);
      background: var(--alpheios-icon-bg-color-hover);
    }

    &:active {
      fill: var(--alpheios-icon-color-active);
      stroke: var(--alpheios-icon-color-active);
      background: var(--alpheios-icon-bg-color-active);
    }
  }

  .alpheios-popup__body {
    display: flex;
    flex-direction: column;
    padding: textsize(16px);
    background: var(--alpheios-text-bg-color);
    overflow: auto;
    flex: 1 0;
  }

  .alpheios-popup__toolbar {
    position: relative;
    display: flex;
    flex: 1 0;
    justify-content: space-between;
    align-items: center;
    margin-bottom: textsize(10px);
  }

  .alpheios-popup__toolbar-text {
    padding-right: textsize(20px);
  }

  .alpheios-popup__toolbar-text[lang='ara'] {
    padding: 0 uisize(20px) 0 uisize(20px); /* the arabic amiri font does not like the top padding */
  }

  h3.alpheios-popup__toolbar-selection {
    display: inline-block;
  }

  .alpheios-popup__toolbar-buttons {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .alpheios-popup__toolbar-button {
    margin: 0 0 uisize(10px) uisize(10px);
  }

  .alpheios-popup__content {
    flex: 1 0;
    padding: uisize(20px);
    // This is to solve a problem when part of content is transparent in Chrome.
    // However, this can be fixed with flex parameters
    background: var(--alpheios-text-bg-color);

    @include alpheios-border;
  }

  .alpheios-popup__providers {
    margin-left: textsize(40px);
  }

  .alpheios-popup__providers-title {
    font-weight: 700;
    color: var(--alpheios-color-neutral-dark);
  }

  a.alpheios-popup__providers-link {
    display: inline-block;
    margin-bottom: textsize(6px);
    font-weight: 700;
  }

  .alpheios-popup__definitions--placeholder {
    padding: textsize(10px) 0;
  }

  .alpheios-popup__providers-item {
    color: var(--alpheios-color-neutral-dark);
  }
</style>
