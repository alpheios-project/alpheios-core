import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Popup from '@/vue/components/popup.vue'

// TODO: Add a check for required modules
export default class PopupModule {
  constructor (store, api, config) {
    // TODO: Direct links to a UI controller is a temporary solution for compatibility with older code
    this.config = Object.assign(PopupModule.configDefaults, config)
    store.registerModule(this.constructor.publicName, this.constructor.store())

    this.vi = new Vue({
      el: this.config.mountPoint,
      store: store,
      provide: api, // Expose APIs to child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: api,
      components: {
        popup: Popup
      },
      data: {
        lexemes: [],
        definitions: {},

        translations: {},

        linkedFeatures: [],
        popupData: {
          fixedPosition: true, // Whether to put popup into a fixed position or calculate that position dynamically
          // Default popup position, with units
          top: '10vh',
          left: '10vw',

          draggable: this.config.draggable,
          resizable: this.config.resizable,
          // Default popup dimensions, in pixels, without units. These values will override CSS rules.
          // Can be scaled down on small screens automatically.
          width: 210,
          /*
          `fixedElementsHeight` is a sum of heights of all elements of a popup, including a top bar, a button area,
          and a bottom bar. A height of all variable elements (i.e. morphological data container) will be
          a height of a popup less this value.
           */
          fixedElementsHeight: 120,
          heightMin: 150, // Initially, popup height will be set to this value
          heightMax: 400, // If a morphological content height is greater than `contentHeightLimit`, a popup height will be increased to this value
          // A margin between a popup and a selection
          placementMargin: 15,
          // A minimal margin between a popup and a viewport border, in pixels. In effect when popup is scaled down.
          viewportMargin: 5,

          // A position of a word selection
          targetRect: {},

          /*
          A date and time when a new request was started, in milliseconds since 1970-01-01. It is used within a
          component to identify a new request coming in and to distinguish it from data updates of the current request.
           */
          requestStartTime: 0,
          defDataReady: false,
          morphDataReady: false,

          translationsDataReady: false,

          showProviders: false,
          updates: 0,
          providers: []
        },
        currentPopupComponent: this.config.popupComponent,
        classesChanged: 0
      },
      methods: {
        setTargetRect: function (targetRect) {
          this.popupData.targetRect = targetRect
        },

        newLexicalRequest: function () {
          this.popupData.requestStartTime = Date.now()
          if (this.$options.api.ui.hasModule('panel')) {
            this.$options.api.ui.getModule('panel').vi.panelData.inflBrowserTablesCollapsed = true // Collapse all inflection tables in a browser
          }
        },

        clearContent: function () {
          this.definitions = {}
          this.translations = {}

          this.lexemes = []
          this.popupData.providers = []
          this.popupData.defDataReady = false
          this.popupData.morphDataReady = false

          this.popupData.translationsDataReady = false

          this.popupData.showProviders = false
          return this
        },

        showPanelTab: function (tabName) {
          this.$options.api.app.changeTab(tabName)
          this.$options.api.ui.openPanel()
          return this
        },
        sendFeature: function (feature) {
          if (this.$options.api.ui.hasModule('panel')) {
            const panel = this.$options.api.ui.getModule('panel')
            this.$options.api.app.startResourceQuery(feature)
            // panel.vi.requestGrammar(feature)
            panel.vi.changeTab('grammar')
            this.$options.api.ui.openPanel()
          }
          return this
        }
      }
    })
  }

  get publicName () {
    return this.constructor.publicName || `Module's name is not defined`
  }
}

PopupModule.publicName = 'popup'

PopupModule.store = () => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a popup is displayed
      visible: false
    },
    mutations: {
      /**
       * Opens a panel
       * @param state
       */
      open (state) {
        state.visible = true
      },

      /**
       * Closes a panel
       * @param state
       */
      close (state) {
        state.visible = false
      }
    }
  }
}

PopupModule.configDefaults = {
  // A selector that specifies to what DOM element a popup will be mounted.
  // This element will be replaced with the root element of the popup component.
  mountPoint: '#alpheios-popup',

  // A name of the popup component defined in `components` section of a Vue instance.
  // This is a component that will be mounted.
  popupComponent: 'popup',

  // Whether a popup can be dragged and resized
  draggable: true,
  resizable: true
}
