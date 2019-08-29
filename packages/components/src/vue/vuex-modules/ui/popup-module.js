import Vue from '@vue-runtime'
import Module from '@/vue/vuex-modules/module.js'
import Popup from '@/vue/components/popup.vue'
import Platform from '@/lib/utility/platform.js'

// TODO: Add a check for required modules
export default class PopupModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)

    // Create the mount point as the last child of the page's body
    const el = document.createElement('div')
    let mountEl = document.querySelector(this.config.mountInto)
    if (!mountEl) {
      mountEl = document.body
    }
    const viEl = mountEl.appendChild(el)

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))

    const component = Popup
    const VueComponentClass = Vue.extend(component)
    this._vi = new VueComponentClass({
      parent: this.constructor.rootVi,
      data: () => {
        return {
          // Make module configuration directly accessible by the module's Vue instance as a data prop
          moduleConfig: this.config
        }
      }
    })
    this._vi.$mount(viEl)
  }
}

PopupModule.store = (moduleInstance) => {
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

PopupModule._configDefaults = {
  _moduleName: 'popup',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [Platform.deviceTypes.DESKTOP],

  // A module's element will be appended to the element specified by the selector here
  mountInto: 'body',

  // What should be the id of the root module's UI element (null if no root element must been set)
  rootElementId: null,

  // A name of the popup component defined in `components` section of a Vue instance.
  // This is a component that will be mounted.
  popupComponent: 'popup',

  // Whether a popup can be dragged and resized
  draggable: true,
  resizable: true,

  // How much a popup is shifted from its initial position.
  initialShift: {
    x: 0,
    y: 0
  },

  initialPos: {
    top: '10vh',
    left: '10vw'
  },

  // A margin between a popup and a selection
  placementMargin: 15,
  // A minimal margin between a popup and a viewport border, in pixels. In effect when popup is scaled down.
  viewportMargin: 5,

  //whether or not to show tool icons
  showNav: true
}
