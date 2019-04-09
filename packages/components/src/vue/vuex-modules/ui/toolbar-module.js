import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import Toolbar from '@/vue/components/nav/toolbar.vue'
import HTMLPage from '@/lib/utility/html-page.js'

// TODO: Add a check for required modules
export default class ToolbarModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)

    store.registerModule(this.constructor.moduleName, this.constructor.store())

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
        toolbar: Toolbar
      },
      data: {
        componentName: 'toolbar'
      }
    })
  }

  activate () {
    super.activate()
  }

  deactivate () {
    super.deactivate()
    console.info(`Toolbar deactivation`)
    this._vi.$store.commit(`toolbar/close`)
  }
}

ToolbarModule.store = () => {
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
  _supportedPlatforms: [HTMLPage.platforms.DESKTOP],
  // A selector that specifies to what DOM element a nav will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-toolbar'
}
