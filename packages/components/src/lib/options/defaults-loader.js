import { Logger } from 'alpheios-data-models'

export default class DefaultsLoader {
  static fromJSON (jsonString) {
    try {
      return JSON.parse(jsonString)
    } catch (err) {
      Logger.getInstance().error('Unable to parse Alpheios JSON options string:', err)
      return {}
    }
  }
}
