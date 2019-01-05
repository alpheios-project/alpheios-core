import { LanguageModelFactory, Constants } from 'alpheios-data-models'

const languageNames = new Map([
  [Constants.LANG_LATIN, 'Latin'],
  [Constants.LANG_GREEK, 'Greek'],
  [Constants.LANG_ARABIC, 'Arabic'],
  [Constants.LANG_PERSIAN, 'Persian'],
  [Constants.LANG_GEEZ, 'Ancient Ethiopic (Ge\'ez)']
])

const getLanguageName = language => {
  let langID
  let langCode // eslint-disable-line
    // Compatibility code in case method be called with languageCode instead of ID. Remove when not needed
  ;({ languageID: langID, languageCode: langCode } = LanguageModelFactory.getLanguageAttrs(language))
  return { name: languageNames.has(langID) ? languageNames.get(langID) : '', code: langCode }
}

export { getLanguageName }
