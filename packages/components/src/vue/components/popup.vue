<template>
  <div
     :style="componentStyles"
     class="alpheios-popup alpheios-content"
     id="alpheios-popup-inner"
     ref="popup"
     v-on-clickaway="attachTrackingClick"
     v-show="this.$store.state.popup.visible"
     data-alpheios-ignore="all"
  >
    <div class="alpheios-popup__header">
      <div class="alpheios-popup__logo">
        <logo-icon class="alpheios-logo-on-dark"/>
      </div>

      <div class="alpheios-popup__toolbar-buttons">
          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_DEFINITIONS')" tooltipDirection="bottom-wide"
                        v-show="showToolbar && $store.getters['app/fullDefDataReady']">
              <div class="alpheios-popup__toolbar-top__btn" @click="ui.showPanelTab('definitions')">
                <definitions-icon  class="alpheios-navbuttons__icon" />
              </div>
          </alph-tooltip>

          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_INFLECTIONS')" tooltipDirection="bottom-wide"
                        v-show="showToolbar && $store.state.app.hasInflData">
            <div class="alpheios-popup__toolbar-top__btn" @click="ui.showPanelTab('inflections')">
               <inflections-icon class="alpheios-navbuttons__icon" />
            </div>
          </alph-tooltip>

          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_USAGEEXAMPLES')" tooltipDirection="bottom-wide"
                        v-show="showToolbar && $store.state.app.wordUsageExampleEnabled">
                <div class="alpheios-popup__toolbar-top__btn" @click="ui.showPanelTab('wordUsage')">
                  <word-usage-icon class="alpheios-navbuttons__icon" />
                </div>
          </alph-tooltip>

          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="bottom-wide"
                        v-show="showToolbar && $store.getters['app/hasTreebankData']">
                <div class="alpheios-popup__toolbar-top__btn" @click="ui.showPanelTab('treebank')">
                  <treebank-icon class="alpheios-navbuttons__icon" />
                </div>
          </alph-tooltip>

          <div @click="ui.closePopup" class="alpheios-popup__close-btn">
            <close-icon></close-icon>
          </div>
      </div>
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
      </div>

      <div class="alpheios-popup__content">
        <div class="alpheios-popup__definitions--placeholder"
             v-show="$store.getters['app/lexicalRequestInProgress'] && !noLanguage"
             >
          <progress-bar :text="l10n.getText('PLACEHOLDER_LEX_DATA_LOADING')"></progress-bar>
        </div>

        <div class="alpheios-popup__definitions--placeholder"
             v-show="noLanguage && !$store.state.app.morphDataReady">
          {{ l10n.getText('PLACEHOLDER_NO_LANGUAGE_DATA') }}
        </div>
        <div class="alpheios-popup__definitions--placeholder"
             v-show="$store.state.app.morphDataReady && !app.hasMorphData() && !noLanguage">
          {{ l10n.getText('PLACEHOLDER_NO_MORPH_DATA') }}
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
            v-show="$store.state.app.morphDataReady && app.hasMorphData() && $store.state.app.providers.length > 0"
        >
          <div class="alpheios-popup__providers-title">
            <a class="alpheios-popup__providers-link" v-on:click="switchProviders">{{ l10n.getText('LABEL_PROVIDERS_CREDITS') }}</a>
          </div>
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
import DefinitionsIcon from '@/images/inline-icons/definitions.svg'
import WordUsageIcon from '@/images/inline-icons/usage-examples-icon1.svg'
import InflectionsIcon from '@/images/inline-icons/inflections.svg'
import TreebankIcon from '@/images/inline-icons/sitemap.svg'

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
    notificationArea: NotificationArea,
    definitionsIcon: DefinitionsIcon,
    wordUsageIcon: WordUsageIcon,
    inflectionsIcon: InflectionsIcon,
    treebankIcon: TreebankIcon
  },
  directives: {
    onClickaway: onClickaway
  },
  // Custom props to store unwatch functions
  lexrqStartedUnwatch: null,
  logger: Logger.getInstance(),

  data: function () {
    return {
      resizable: true,
      draggable: true,
      // Whether there is an error with Interact.js drag coordinates in the corresponding direction
      dragErrorX: false,
      dragErrorY: false,
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
      // If resized manually, the following two props will contain adjusted with and height
      resizedWidth: null,
      resizedHeight: null,

      // How much a popup has been dragged from its initial position, in pixels
      shift: {
        x: 0,
        y: 0
      },

      updateDimensionsTimeout: null,

      showProviders: false
    }
  },

  created () {
    // This is the earliest moment when data props are available
    this.shift.x = this.moduleConfig.initialShift.x
    this.shift.y = this.moduleConfig.initialShift.y

    let vm = this // eslint-disable-line prefer-const
    this.$on('updatePopupDimensions', function () {
      vm.updatePopupDimensions()
    })
  },
  computed: {
    showToolbar: function () {
      return this.moduleConfig.showNav
    },

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

    noLanguage: function () {
      return Boolean(!this.$store.state.app.currentLanguageName)
    },

    positionLeftDm: function () {
      if (!this.$store.state.popup.visible) {
        // Reset if popup is invisible
        return '0px'
      }

      return this.moduleConfig.initialPos.left
    },

    positionTopDm: function () {
      if (!this.$store.state.popup.visible) {
        // Reset if popup is invisible
        return '0px'
      }

      return this.moduleConfig.initialPos.top
    },

    widthDm: {
      get: function () {
        if (this.resizedWidth !== null) {
          // Popup has been resized manually
          return `${this.resizedWidth}px`
        }
        return this.widthValue === 'auto' ? 'auto' : `${this.widthValue}px`
      },
      set: function (newWidth) {
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        const maxWidth = viewportWidth - 2 * this.moduleConfig.viewportMargin - verticalScrollbarWidth
        if (newWidth >= maxWidth) {
          this.$options.logger.log(`Popup is too wide, limiting its width to ${maxWidth}px`)
          this.widthValue = maxWidth
          this.exactWidth = this.widthValue
        } else {
          this.widthValue = 'auto'
        }
      }
    },

    heightDm: {
      get: function () {
        const time = Date.now()
        if (this.resizedHeight !== null) {
          // Popup has been resized manually
          return `${this.resizedHeight}px`
        }
        this.$options.logger.log(`${time}: height getter, return value is ${this.heightValue}`)
        return this.heightValue === 'auto' ? 'auto' : `${this.heightValue}px`
      },
      set: function (newHeight) {
        const time = Date.now()
        this.$options.logger.log(`${time}: height setter, offsetHeight is ${newHeight}`)
        /*
              let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
              let horizontalScrollbarWidth = window.innerHeight - document.documentElement.clientHeight
              let maxHeight = viewportHeight - 2*this.moduleConfig.viewportMargin - horizontalScrollbarWidth
              */
        if (newHeight >= this.maxHeight) {
          this.$options.logger.log(`Popup is too tall, limiting its height to ${this.maxHeight}px`)
          this.heightValue = this.maxHeight
          this.exactHeight = this.heightValue
        } else {
          this.heightValue = 'auto'
        }
      }
    },

    maxHeight () {
      const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      const horizontalScrollbarWidth = window.innerHeight - document.documentElement.clientHeight
      return viewportHeight - 2 * this.moduleConfig.viewportMargin - horizontalScrollbarWidth
    },

    verboseMode () {
      return this.settings.getUiOptions().items.verboseMode.currentValue === `verbose`
    }
  },

  methods: {
    switchProviders: function () {
      this.showProviders = !this.showProviders
      if (this.showProviders) {
        // Show credits info
        this.$nextTick(() => {
          let container = this.$el.querySelector(`#${this.lexicalDataContainerID}`) // eslint-disable-line prefer-const
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
        ignoreFrom: 'input, textarea, a[href], select, option'
      }
    },

    /**
     * @typedef {Object} BoundsCheckResult
     * @property {boolean} withinBounds - If the toolbar is within the viewport bounds.
     * @property {number} adjX - How much an X coordinate must be adjusted for the toolbar to fit into the viewport.
     * @property {number} adjY - How much an Y coordinate must be adjusted for the toolbar to fit into the viewport.
     */
    /**
     * Checks if the object is within the viewport bounds and if it is not,
     * calculates how much a toolbar position must be adjusted so that it will fit into the viewport.
     *
     * @returns {BoundsCheckResult} - A result of the bounds check
     */
    isWithinBounds () {
      const rect = this.$el.getBoundingClientRect()
      let xAdjustment = 0
      let yAdjustment = 0
      if (rect.x < 0) {
        xAdjustment = -rect.x
      }
      if ((rect.x + rect.width) > this.app.platform.viewport.width) {
        xAdjustment = -(rect.x + rect.width - this.app.platform.viewport.width)
      }
      if (rect.y < 0) {
        yAdjustment = -rect.y
      }
      if ((rect.y + rect.height) > this.app.platform.viewport.height) {
        yAdjustment = -(rect.y + rect.height - this.app.platform.viewport.height)
      }
      return {
        withinBounds: xAdjustment === 0 && yAdjustment === 0,
        adjX: xAdjustment,
        adjY: yAdjustment
      }
    },

    resizeListener (event) {
      if (this.resizable) {
        // update dimensions of the element
        this.resizedWidth = event.rect.width
        this.resizedHeight = event.rect.height

        // Update popup position when resizing from top or left edges
        this.shift.x += (event.deltaRect.left || 0)
        this.shift.y += (event.deltaRect.top || 0)
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
            this.$options.logger.warn(`Calculated horizontal drag distance is out of bounds: ${dx}. This is probably an error. Dragging in horizontal direction will be disabled.`)
            this.dragErrorX = true
          }
          dx = 0
        }
        if (Math.abs(dy) > dragTreshold) {
          if (!this.dragErrorY) {
            this.$options.logger.warn(`Calculated vertical drag distance is out of bounds: ${dy}. This is probably an error. Dragging in vertical direction will be disabled.`)
            this.dragErrorY = true
          }
          dy = 0
        }
        this.shift.x += dx
        this.shift.y += dy
      }
    },

    dragEndListener () {
      const boundsCheck = this.isWithinBounds()
      if (!boundsCheck.withinBounds) {
        // Adjust the popup to stay within bounds
        this.shift.x += boundsCheck.adjX
        this.shift.y += boundsCheck.adjY
      }

      const uiOptions = this.settings.getUiOptions()
      uiOptions.items.popupShiftX.setValue(this.shift.x)
      uiOptions.items.popupShiftY.setValue(this.shift.y)
    },

    /**
     * This function is called from an `updated()` callback. Because of this, it should never use a `nextTick()`
     * as it might result in an infinite loop of updates: nextTick() causes a popup to be updated, updated()
     * callback is called, that, in turn, calls nextTick() and so on.
     * It seems that calling it even without `nextTick()` is enough for updating a popup dimensions.
     */
    updatePopupDimensions () {
      const time = Date.now()

      if (this.resizeCount >= this.resizeCountMax) {
        // Skip resizing if maximum number reached to avoid infinite loops
        return
      }

      const innerDif = this.$el.querySelector('#alpheios-lexical-data-container').clientHeight - this.$el.querySelector('#alpheios-morph-component').clientHeight

      if (this.heightDm !== 'auto' && innerDif > this.resizeDelta && this.heightValue !== this.maxHeight) {
        this.heightDm = 'auto'
        return
      }

      // Update dimensions only if there was any significant change in a popup size
      if (this.$el.offsetWidth >= this.exactWidth + this.resizeDelta ||
          this.$el.offsetWidth <= this.exactWidth - this.resizeDelta) {
        this.$options.logger.log(`${time}: dimensions update, offsetWidth is ${this.$el.offsetWidth}, previous exactWidth is ${this.exactWidth}`)
        this.exactWidth = this.$el.offsetWidth
        this.widthDm = this.$el.offsetWidth
        this.resizeCount++
        this.$options.logger.log(`Resize counter value is ${this.resizeCount}`)
      }

      if (this.$el.offsetHeight >= this.exactHeight + this.resizeDelta ||
          this.$el.offsetHeight <= this.exactHeight - this.resizeDelta) {
        this.$options.logger.log(`${time}: dimensions update, offsetHeight is ${this.$el.offsetHeight}, previous exactHeight is ${this.exactHeight}`)
        this.exactHeight = this.$el.offsetHeight
        this.heightDm = this.$el.offsetHeight
        this.resizeCount++
        this.$options.logger.log(`Resize counter value is ${this.resizeCount}`)
      }
    },

    resetPopupDimensions () {
      this.$options.logger.log('Resetting popup dimensions')
      // this.contentHeight = 0
      this.resizeCount = 0
      this.widthValue = 0
      this.heightValue = 0
      this.exactWidth = 0
      this.exactHeight = 0
      this.resizedWidth = null
      this.resizedHeight = null
    },

    attachTrackingClick: function (event) {
      /*
      When a popup is dragged outside of the viewport and then moved back
      by an adjustment procedure in dragEndListener(), a drag end mouse release event
      is generated outside of a popup's rect (and outside of the viewport) by some browsers
      (Chrome and possibly Safari). With a clickaway directive in place this results in the popup being closed.
      To prevent this we need to check event coordinates
      and close the popup only if those coordinates are within the viewport.
       */
      if (
        event.clientX >= 0 &&
        event.clientX <= this.app.platform.viewport.width &&
        event.clientY >= 0 &&
        event.clientY <= this.app.platform.viewport.height
      ) {
        this.ui.closePopup()
      }
    }
  },

  mounted () {
    if (this.moduleConfig.draggable && this.moduleConfig.resizable) {
      this.interactInstance = interact(this.$el)
        .resizable(this.resizableSettings())
        .draggable(this.draggableSettings())
        .on('dragmove', this.dragMoveListener)
        .on('dragend', this.dragEndListener)
        .on('resizemove', this.resizeListener)
    }

    const boundsCheck = this.isWithinBounds()
    if (!boundsCheck.withinBounds) {
      this.shift.x += boundsCheck.adjX
      this.shift.y += boundsCheck.adjY
      this.$options.logger.log(`Popup position has been adjusted to stay within the viewport`)
    }

    this.$options.lexrqStartedUnwatch = this.$store.watch((state, getters) => state.app.lexicalRequest.startTime, () => {
      // There is a new request coming in, reset popup dimensions
      this.resetPopupDimensions()
      this.showProviders = false
    })
  },

  beforeDestroy () {
    // Teardown the watch function
    this.$options.lexrqStartedUnwatch()
  },

  updated () {
    if (this.$store.state.popup.visible) {
      const time = Date.now()
      this.$options.logger.log(`${time}: component is updated`)

      const vm = this
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
    @include alpheios-ui-border;

    & .alpheios-notification-area {
      padding-top: 0;
    }
  }

  .alpheios-popup__header {
    display: flex;
    justify-content: space-between;
    height: uisize(44px);
    background: var(--alpheios-desktop-popup-header-bg);
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

  .alpheios-popup__toolbar-top__btn {
    width: uisize(56px);
    height: 100%;
    cursor: pointer;
    fill: var(--alpheios-desktop-popup-icon-color);
    stroke: var(--alpheios-desktop-popup-icon-color);
    stroke-width: 0;

    svg {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      left: uisize(16px);
      width: uisize(22px);
      height: auto;
      stroke-width: 1;
    }

    &:hover,
    &:focus {
      fill: var(--alpheios-desktop-popup-icon-color-hover);
      stroke: var(--alpheios-desktop-popup-icon-color-hover);
      background: var(--alpheios-desktop-popup-icon-bg-hover);
    }

    &:active {
      fill: var(--alpheios-desktop-popup-icon-color-active);
      stroke: var(--alpheios-desktop-popup-icon-color-active);
      background: var(--alpheios-desktop-popup-icon-bg-hover);
    }

    &.disabled {
      fill: var(--alpheios-desktop-popup-icon-color-disabled);
      stroke: var(--alpheios-desktop-popup-icon-color-disabled);
      background: var(--alpheios-desktop-popup-icon-bg-disabled);
    }
  }

  .alpheios-popup__close-btn {
    width: uisize(56px);
    height: 100%;
    cursor: pointer;
    fill: var(--alpheios-desktop-popup-icon-color);
    stroke: var(--alpheios-desktop-popup-icon-color);

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
      fill: var(--alpheios-desktop-popup-icon-color-hover);
      stroke: var(--alpheios-desktop-popup-icon-color-hover);
      background: var(--alpheios-desktop-popup-header-icon-active-bg);
    }

    &:active {
      fill: var(--alpheios-desktop-popup-icon-color-active);
      stroke: var(--alpheios-desktop-popup-icon-color-active);
      background: var(--alpheios-desktop-popup-header-icon-active-bg);
    }

    &.disabled {
      fill: var(--alpheios-desktop-popup-icon-color-disabled);
      stroke: var(--alpheios-desktop-popup-icon-color-disabled);
      background: var(--alpheios-desktop-popup-header-icon-bg-disabled);
    }
  }

  .alpheios-popup__body {
    display: flex;
    flex-direction: column;
    padding: textsize(16px);
    background: var(--alpheios-desktop-popup-body-bg);
    overflow: auto;
    flex: 1 0;
  }

  .alpheios-popup__toolbar {
    position: relative;
    display: flex;
    flex: 0 0;
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
    background: var(--alpheios-desktop-popup-content-bg);

    @include alpheios-ui-border;
  }

  .alpheios-popup__providers {
    margin-left: textsize(40px);
  }

  a.alpheios-popup__providers-link,
  // This is required to override Bootstrap styles
  a:not([href]):not([tabindex]).alpheios-popup__providers-link {
    display: inline-block;
    margin-bottom: textsize(6px);
    font-weight: 700;
    color: var(--alpheios-desktop-popup-credit-link-color);
    &:hover {
      color: var(--alpheios-desktop-popup-credit-link-color-hover);
    }
  }

  .alpheios-popup__definitions--placeholder {
    padding: textsize(10px) 0;
  }

  .alpheios-popup__providers-item {
    color: var(--alpheios-desktop-popup-credit-providers-color);
  }
</style>
