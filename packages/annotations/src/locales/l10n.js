import MessagesEnUs from '@annotations/locales/en-us/messages.json'
import { L10n } from 'alpheios-l10n'

const l10n = {
  EN_US: 'en-US'
}
let l10nInstance = null

export default {
  locales: l10n,

  getInstance: () => {
    if (!l10nInstance) {
      l10nInstance = new L10n()
      l10nInstance.addMessages(MessagesEnUs, l10n.EN_US)
    }
    return l10nInstance
  }
}
