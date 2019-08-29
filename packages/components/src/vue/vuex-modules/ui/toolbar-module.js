import Vue from '@vue-runtime'
import Module from '@/vue/vuex-modules/module.js'
import ToolbarCompact from '@/vue/components/nav/toolbar-compact.vue'
import ToolbarLarge from '@/vue/components/nav/toolbar-large.vue'
import Platform from '@/lib/utility/platform.js'

export default class ToolbarModule extends Module {
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

    const component = this.config.platform.isDesktop ? ToolbarLarge : ToolbarCompact
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

  activate () {
    super.activate()
    // Open a toolbar on activation
    this._vi.$store.commit(`toolbar/open`)
  }

  deactivate () {
    super.deactivate()
    // Close a toolbar on deactivation
    this._vi.$store.commit(`toolbar/close`)
  }
}

ToolbarModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a toolbar is shown or hidden
      visible: false
    },
    mutations: {
      /**
       * Opens a toolbar
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

ToolbarModule._configDefaults = {
  _moduleName: 'toolbar',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [Platform.deviceTypes.DESKTOP, Platform.deviceTypes.MOBILE],
  // A module's element will be appended to the element specified by the selector here
  mountInto: 'body',

  // What should be the id of the root module's UI element (null if no root element must been set)
  rootElementId: null,
  // Initial position of a toolbar, in pixels. Any combination of positioning parameters (top, right, bottom, left)
  // in two different dimensions (X and Y) must be specified. Pixel units should NOT be added to the values.
  // Default values are the ones below.
  initialPos: {
    top: '10px',
    right: '15px'
  },
  // How much a toolbar is shifted from its initial position.
  initialShift: {
    x: 0,
    y: 0
  },
  // whether or not to include navigation options
  showNav: true
}
