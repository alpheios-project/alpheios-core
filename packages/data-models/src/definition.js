import uuidv4 from 'uuid/v4'
import ResourceProvider from './resource_provider.js'

class Definition {
  constructor (text, language, format, lemmaText) {
    this.text = text
    this.language = language
    this.format = format
    this.lemmaText = lemmaText

    this.ID = uuidv4()
  }

  static readObject (jsonObject) {
    // eslint-disable-next-line prefer-const
    let definition = new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText)

    if (jsonObject.ID) {
      definition.ID = jsonObject.ID
    }

    if (jsonObject.provider) {
      const provider = ResourceProvider.readObject(jsonObject.provider)
      return ResourceProvider.getProxy(provider, definition)
    } else {
      return definition
    }
  }

  convertToJSONObject () {
    // eslint-disable-next-line prefer-const
    let result = {
      text: this.text,
      language: this.language,
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this.ID
    }

    if (this.provider) {
      result.provider = this.provider.convertToJSONObject()
    }
    return result
  }
}
export default Definition
