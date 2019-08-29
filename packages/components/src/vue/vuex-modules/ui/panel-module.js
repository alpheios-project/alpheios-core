import Vue from '@vue-runtime'
import Module from '@/vue/vuex-modules/module.js'
import LargePanel from '@/vue/components/panel-large.vue'
import CompactPanel from '@/vue/components/panel-compact.vue'
import Platform from '@/lib/utility/platform.js'

// TODO: Add a check for required modules
export default class PanelModule extends Module {
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

    const component = this.config.platform.isDesktop ? LargePanel : CompactPanel
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

    Platform.evt.ORIENTATION_CHANGE.sub(() => {
      this._vi.$store.commit('panel/setOrientation', this.config.platform.simpleOrientation)
    })
  }
}

PanelModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a panel is shown or hidden
      visible: false,
      // Where a panel is located. Possible values are `left` or `right`.
      position: 'left',
      // Device orientation
      orientation: moduleInstance.config.platform.simpleOrientation,
      // An ID of the last opened footnote. Required for the modal footnote popup mode on mobile
      visibleFootnoteId: false
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
      },

      setPosition (state, position) {
        state.position = position
      },

      setOrientation (state, orientation) {
        state.orientation = orientation
      },

      setVisibleFootnote (state, id) {
        state.visibleFootnoteId = id
      }
    }
  }
}

PanelModule._configDefaults = {
  _moduleName: 'panel',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [Platform.deviceTypes.DESKTOP, Platform.deviceTypes.MOBILE],
  // A module's element will be appended to the element specified by the selector here
  mountInto: 'body',

  // What should be the id of the root module's UI element (null if no root element must been set)
  rootElementId: null,

  // whether or not to show navigation buttons
  showNav: true
}
