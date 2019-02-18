import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Panel from '@/vue/components/panel.vue'
import CompactPanel from '@/vue/components/panel-compact.vue'

// TODO: Add a check for required modules
export default class PanelModule {
  constructor (store, api, config = {}) {
    this.config = Object.assign(PanelModule.configDefaults, config)
    store.registerModule(this.constructor.publicName, this.constructor.store(config.panelComponent))

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
        panel: Panel, // A desktop version of a panel
        compactPanel: CompactPanel // A mobile version of a panel
      },
      methods: {
        toggle: function () {
          if (this.$options.api.app.state.isPanelOpen()) {
            this.close()
          } else {
            this.open()
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

PanelModule.publicName = 'panel'

PanelModule.store = (panelLayout) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a panel is shown or hidden
      visible: false,
      layout: panelLayout
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

PanelModule.configDefaults = {
  // A selector that specifies to what DOM element a panel will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-panel',

  // A name of the panel component defined in `components` section of a Vue instance.
  // This is a component that will be mounted.
  panelComponent: 'panel'
}
