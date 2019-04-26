import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import ActionPanel from '@/vue/components/nav/action-panel.vue'
import HTMLPage from '@/lib/utility/html-page.js'

export default class ActionPanelModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)
    console.info(`Action panel module constructor`)

    // Create the mount point as the last child of the page's body
    let el = document.createElement('div')
    let mountEl = document.body.appendChild(el)
    //    let moduleInstance = this

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))

    let VueComponentClass = Vue.extend(ActionPanel)
    this._vi = new VueComponentClass({
      store: store, // Install store into the toolbar
      provide: api, // Public API of the modules for child components
      /*
        Since this is a root component and we cannot claim APIs with `inject`
        let's assign APIs to a custom prop to have access to it
      */
      // api: api,
      // API modules that are required for this component
      inject: ['l10n'],
      /* inject: {
        app: 'app',
        ui: 'ui',
        l10n: 'l10n',
        settings: 'settings'
      }, */
      data: () => {
        return {
          moduleData: {
            initialShift: this.config.initialShift
          }
        }
      }
    })
    this._vi.$mount(mountEl)

    /* this._vi = new Vue({
      el: mountEl,
      store: store, // Install store into the toolbar
      provide: api, // Public API of the modules for child components
      /!*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       *!/
      api: api,
      components: {
        actionPanel: ActionPanel
      },
      data: {
        moduleData: {
          initialShift: this.config.initialShift
        }
      }
    }) */
  }

  activate () {
    super.activate()
    // Open a toolbar on activation
    this._vi.$store.commit(`actionPanel/open`)
  }

  deactivate () {
    super.deactivate()
    // Close a toolbar on deactivation
    this._vi.$store.commit(`actionPanel/close`)
  }
}

ActionPanelModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a toolbar is shown or hidden
      visible: true,
      someProp: 77,
      // Choose compact or large layout from the value of the `platform` prop of a configuration object
      layout: moduleInstance.config.platform.isDesktop ? `toolbarLarge` : 'toolbarCompact',
      // Initial position of a toolbar
      initialPos: moduleInstance.config.initialPos
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

ActionPanelModule._configDefaults = {
  _moduleName: 'actionPanel',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [HTMLPage.deviceTypes.DESKTOP, HTMLPage.deviceTypes.MOBILE],
  // A selector that specifies to what DOM element a nav will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-toolbar',
  // Initial position of a toolbar, in pixels. Any combination of positioning parameters (top, right, bottom, left)
  // in two different dimensions (X and Y) must be specified. Pixel units should NOT be added to the values.
  // Default values are the ones below.
  initialPos: {
    top: 10,
    left: 10
  },
  // How much a toolbar is shifted from its initial position.
  initialShift: {
    x: 0,
    y: 33
  }
}
