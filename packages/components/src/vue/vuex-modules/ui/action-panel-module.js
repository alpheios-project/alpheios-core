import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import ActionPanel from '@/vue/components/nav/action-panel.vue'
import HTMLPage from '@/lib/utility/html-page.js'

export default class ActionPanelModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)

    // Create the mount point as the last child of the page's body
    let el = document.createElement('div')
    let mountEl = document.querySelector(this.config.mountInto)
    if (!mountEl) {
      console.warn(`A ${this.config.mountInto} element for mounting ${this.constructor.moduleName} is not found. Will mount into the body instead`)
      mountEl = document.body
    }
    let viEl = mountEl.appendChild(el)

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))

    let VueComponentClass = Vue.extend(ActionPanel)
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
    // Open an action panel on activation
    this._vi.$store.commit(`actionPanel/open`)
  }

  deactivate () {
    super.deactivate()
    // Close an action panel on deactivation
    this._vi.$store.commit(`actionPanel/close`)
  }
}

ActionPanelModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether an action panel is shown or hidden
      visible: true,
      // Initial position of an action panel
      initialPos: moduleInstance.config.initialPos
    },
    mutations: {
      /**
       * Opens an action panel
       * @param state
       */
      open (state) {
        state.visible = true
      },

      /**
       * Closes a toolbar
       * @param state
       */
      close (state) {
        state.visible = false
      }
    }
  }
}

ActionPanelModule._configDefaults = {
  _moduleName: 'actionPanel',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [HTMLPage.deviceTypes.DESKTOP, HTMLPage.deviceTypes.MOBILE],
  // A selector that specifies to what DOM element a nav will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountInto: 'body',

  rootElementId: null,
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
  }
}
