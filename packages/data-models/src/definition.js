class Definition {
  constructor (text, language, format, lemmaText) {
    this.text = text
    this.language = language
    this.format = format
    this.lemmaText = lemmaText
  }

  static readObject (jsonObject) {
    return new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText)
  }

  convertToJSONObject () {
    return {
      text: this.text,
      language: this.language,
      format: this.format,
      lemmaText: this.lemmaText
    }
  }
}
export default Definition
