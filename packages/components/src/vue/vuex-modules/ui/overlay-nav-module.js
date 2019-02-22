import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import OverlayNav from '@/vue/components/nav/overlay-nav.vue'

// TODO: Add a check for required modules
export default class OverlayNavModule {
  constructor (store, api, config = {}) {
    this.config = Object.assign(OverlayNavModule.configDefaults, config)
    store.registerModule(this.constructor.moduleName, this.constructor.store())

    this.vi = new Vue({
      el: this.config.mountPoint,
      store: store, // Install store into the panel
      provide: api, // Public API of the modules for child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: api,
      components: {
        overlayNav: OverlayNav
      },
      data: {
        componentName: 'overlayNav'
      }
    })
  }

  get moduleName () {
    return this.constructor.moduleName || `Module's name is not defined`
  }
}

OverlayNavModule.moduleName = 'overlayNav'

OverlayNavModule.store = () => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a panel is shown or hidden
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
      },

      setPanelLayout (state, layout) {
        state.layout = layout
      }
    }
  }
}

OverlayNavModule.configDefaults = {
  // A selector that specifies to what DOM element a nav will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-overlay-nav'
}
