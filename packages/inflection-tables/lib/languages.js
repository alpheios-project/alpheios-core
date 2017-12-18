const languages = {
  type: 'language',
  latin: 'lat',
  greek: 'grc',
  isAllowed (language) {
    if (language === this.type) {
      return false
    } else {
      return Object.values(this).includes(language)
    }
  }
}
export default languages
