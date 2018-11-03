import ConfigData from '@/config-data'

class LexiconsConfigData extends ConfigData {
  getLexiconsByLangCode (langCode) {
    let lexicons = new Map()
    // lexicons.set(languageID, Array.from(lexiconsList.keys()).map(id => new AlpheiosLexAdapter(id)))
    return lexicons
  }
}

export default LexiconsConfigData
