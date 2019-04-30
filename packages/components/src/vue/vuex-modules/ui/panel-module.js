import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import Panel from '@/vue/components/panel.vue'
import CompactPanel from '@/vue/components/panel-compact.vue'
import HTMLPage from '@/lib/utility/html-page.js'

// TODO: Add a check for required modules
export default class PanelModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))

    this._vi = new Vue({
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
      }
    })
    console.info(`Panel module is created`)
  }
}

PanelModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a panel is shown or hidden
      visible: false,
      // Choose mobile or desktop layout from the value of the `platform` prop of a configuration object
      layout: moduleInstance.config.platform.isDesktop ? `panel` : 'compactPanel',
      // Where a panel is located. Possible values are `left` or `right`.
      position: 'left',
      // Device orientation
      orientation: moduleInstance.config.platform.orientation
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
        console.info(`Panel close is called`)
        state.visible = false
      },

      setPanelLayout (state, layout) {
        state.layout = layout
      },

      setPosition (state, position) {
        state.position = position
      }
    }
  }
}

PanelModule._configDefaults = {
  _moduleName: 'panel',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [HTMLPage.deviceTypes.DESKTOP, HTMLPage.deviceTypes.MOBILE],
  // A selector that specifies to what DOM element a panel will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-panel'
}