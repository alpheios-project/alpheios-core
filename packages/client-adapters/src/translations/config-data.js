import ConfigData from '@/config-data'

class TranslationsConfigData extends ConfigData {
  get defaultLang () {
    return 'eng'
  }

  defineOutLang (browserLang) {
    let langMap = {
      'en-US': 'eng',
      'it': 'ita',
      'pt': 'por',
      'ca': 'cat',
      'fr': 'fre',
      'de': 'ger',
      'es': 'spa'
    }
    return langMap[browserLang] || this.defaultLang
  }
}

export default TranslationsConfigData
