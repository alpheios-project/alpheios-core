import uuidv4 from 'uuid/v4'

class Definition {
  constructor (text, language, format, lemmaText) {
    this.text = text
    this.language = language
    this.format = format
    this.lemmaText = lemmaText

    this.ID = uuidv4()
  }

  static readObject (jsonObject) {
    return new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText)
  }

  convertToJSONObject () {
    return {
      text: this.text,
      language: this.language,
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this.ID
    }
  }
}
export default Definition
