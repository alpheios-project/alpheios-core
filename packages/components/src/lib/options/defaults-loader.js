export default class DefaultsLoader {
  static fromJSON (jsonString) {
    try {
      return JSON.parse(jsonString)
    } catch (err) {
      console.error(`Unable to parse JSON options string:`, err)
      return {}
    }
  }
}
