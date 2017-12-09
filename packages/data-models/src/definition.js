class Definition {
  constructor (text, language, format) {
    this.text = text
    this.language = language
    this.format = format
  }

  static readObject (jsonObject) {
    return new Definition(jsonObject.text, jsonObject.language, jsonObject.format)
  }
}
export default Definition
