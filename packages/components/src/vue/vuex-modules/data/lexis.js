import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'
import {
  MessagingService, WindowIframeDestination as Destination, CedictDestinationConfig as CedictConfig
} from 'alpheios-lexis-cs'

const serviceName = 'ComponentsLexisService'

export default class Lexis extends Module {
  /**
   * @param {object} store - A Vuex store.
   * @param {object} api - A public API object.
   * @param {object} config - A module's configuration object:
   *        {Function} config.getSelectedText - A UI controller's function to start a lexical query.
   *        This is a temporary solution until wil fully integrate lexical query functionality into a
   *        UI controller.
   */
  constructor (store, api, config = {}) {
    super(store, api, config)
    // Add an iframe with CEDICT service
    this.createIframe()
    // Create a messaging service with CEDICT destination
    this._messagingService = new MessagingService(serviceName, new Destination(CedictConfig))

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)
  }

  createIframe () {
    const iframe = document.createElement('iframe')
    iframe.id = CedictConfig.targetIframeID
    iframe.style.display = 'none'
    iframe.src = CedictConfig.targetURL
    document.body.appendChild(iframe)
  }
}

Lexis.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
    },
    mutations: {
    }
  }
}

Lexis.api = (moduleInstance, store) => {
  return {
    getSelectedText: (event, domEvent) => {
      // TODO: Handle situations when CEDICT service is not loaded yet
      moduleInstance.config.getSelectedText(event, domEvent)
    }
  }
}

Lexis._configDefaults = {
  _moduleName: 'lexis',
  _moduleType: Module.types.DATA,
  _supportedDeviceTypes: [Platform.deviceTypes.ANY]
}
