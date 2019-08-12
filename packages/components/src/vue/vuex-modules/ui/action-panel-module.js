import Vue from '@vue-runtime'
import Module from '@/vue/vuex-modules/module.js'
import ActionPanel from '@/vue/components/nav/action-panel.vue'
import Platform from '@/lib/utility/platform.js'

export default class ActionPanelModule extends Module {
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

    const VueComponentClass = Vue.extend(ActionPanel)
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

  activate () {
    super.activate()
  }

  deactivate () {
    super.deactivate()
    // Close an action panel on deactivation
    this._vi.$store.commit(`${this.constructor.moduleName}/close`)
  }
}

ActionPanelModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether an action panel is shown or hidden
      visible: false,
      // If a lookup input shall be shown when a panel is open
      showLookup: moduleInstance.config.showLookup,
      // If nav buttons shall be shown when a panel is open
      showNav: moduleInstance.config.showNav,
      // Initial position of an action panel
      initialPos: moduleInstance.config.initialPos
    },
    mutations: {
      /**
       * Opens an action panel
       * @param state
       * @param {boolean} showLookup - Whether to show the lookup input
       * @param {boolean} showNav - Whether to show navigational buttons
       */
      open (state, { showLookup, showNav }) {
        state.showLookup = typeof showLookup === 'undefined' ? moduleInstance.config.showLookup : showLookup
        state.showNav = typeof showNav === 'undefined' ? moduleInstance.config.showNav : showNav
        state.visible = true
      },

      /**
       * Closes an action panel
       * @param state
       */
      close (state) {
        state.visible = false
        // Set showLookup and showNav to their default values
        state.showLookup = moduleInstance.config.showLookup
        state.showNav = moduleInstance.config.showNav
      }
    }
  }
}

ActionPanelModule._configDefaults = {
  _moduleName: 'actionPanel',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [Platform.deviceTypes.DESKTOP, Platform.deviceTypes.MOBILE],
  // A module's element will be appended to the element specified by the selector here
  mountInto: 'body',

  // What should be the id of the root module's UI element (null if no root element must been set)
  rootElementId: null,
  // What module shall be used to display lookup results. Possible values: `panel`, `popup`.
  lookupResultsIn: 'panel',
  // Whether to close an action panel after a lookup is started.
  closeAfterLookup: false,
  // Whether to close an action panel after a navigational button is pressed.
  closeAfterNav: false,
  // Initial position of an action panel, in pixels. Any combination of positioning parameters (top, right, bottom, left)
  // in two different dimensions (X and Y) must be specified. Pixel units should NOT be added to the values.
  // Default values are the ones below.
  initialPos: {
    bottom: 120,
    right: 20
  },
  // How much an action panel is shifted from its initial position.
  initialShift: {
    x: 0,
    y: 0
  },
  // Whether a lookup input will be shown when the panel is opened
  showLookup: true,
  // Whether to show nave buttons when the panel is opened
  showNav: true
}
