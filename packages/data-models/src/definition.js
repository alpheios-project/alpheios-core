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
}
export default Definition
