import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import Popup from '@/vue/components/popup.vue'
import HTMLPage from '@/lib/utility/html-page.js'

// TODO: Add a check for required modules
export default class PopupModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))

    this._vi = new Vue({
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
        // Reactive options of the Popup UI component, are passed to popup.vue as `data`
        moduleData: {
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

          initialShift: this.config.initialShift
        },
        uiComponentName: this.config.popupComponent
      }
    })
  }
}

PopupModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a popup is displayed
      visible: false,

      positioning: moduleInstance.config.positioning
    },

    getters: {
      isFlexPositioned: state => state.positioning === 'flexible',
      isFixedPositioned: state => state.positioning === 'fixed'
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
      },

      /**
       * Changes a positioning schema of a popup
       * @param state
       * @param {string} positioning - A positioning rule for a popup, see defaults for details.
       */
      setPositioning (state, positioning) {
        state.positioning = positioning
      }
    }
  }
}

PopupModule._configDefaults = {
  _moduleName: 'popup',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [HTMLPage.deviceTypes.DESKTOP],

  // A selector that specifies to what DOM element a popup will be mounted.
  // This element will be replaced with the root element of the popup component.
  mountPoint: '#alpheios-popup',

  // A name of the popup component defined in `components` section of a Vue instance.
  // This is a component that will be mounted.
  popupComponent: 'popup',

  // Whether a popup can be dragged and resized
  draggable: true,
  resizable: true,

  // How the popup is positioned:
  //     `fixed`: will remember its last position;
  //     `flexible`: will try to adapt its position to appear near the selected word (experimental)
  positioning: 'fixed',

  // How much a popup is shifted from its initial position.
  initialShift: {
    x: 0,
    y: 0
  }
}