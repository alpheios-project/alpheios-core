import BaseAdapter from '@clAdapters/adapters/base-adapter'
import DefaultConfig from '@clAdapters/adapters/detectlang/config.json'
import LangsList from '@clAdapters/adapters/detectlang/langs-list.json'

export default class DetectLangAdapter extends BaseAdapter {
  /**
   *
   * @param {Object} config - properties for the adapter
   */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.sourceData = config.sourceData
  }

  /**
   *
   * @param {String} text - text for analysis
   * @returns {String} - langCode ISO-3 - a detected language
   */
  async getDetectedLangsList (text) {
    try {
      const requestParams = {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.config.api}` }
      }

      const url = this.getUrl(text)
      if (!url) {
        this.addError(this.l10n.getMsg('DETECT_LANG_URL_ERROR'))
        return
      }

      let langsData
      if (this.sourceData) {
        langsData = this.sourceData
      } else {
        langsData = await this.fetch(url, { requestParams })
      }
      return this.chooseOneLanguage(langsData)
    } catch (error) {
      this.addError(this.l10n.getMsg('DETECT_LANG_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   *
   * @param {String} text - text for analysis
   * @returns {String} - constructed URL
   */
  getUrl (text) {
    if (text) {
      return `${this.config.baseurl}?q=${encodeURIComponent(text)}`
    }
    return null
  }

  /**
   * The remote service returns the following format
   * { data: {
        detections: [
          { language: 'en', isReliable: true, confidence: 3.36 },
          { language: 'pt', isReliable: false, confidence: 3.36 },
          { language: 'eu', isReliable: false, confidence: 3.36 }
        ]
      }}
   * We need return only one the most reliable languageCode in ISO-3 format
   * @param {Object} langsData
   * @returns {String|null} lang code in ISO-3
   */
  chooseOneLanguage (langsData) {
    if (langsData && langsData.data && langsData.data.detections && langsData.data.detections.length > 0) {
      const reliableLangs = langsData.data.detections
        .filter(langItem => langItem.isReliable)
      if (reliableLangs) {
        const lang = reliableLangs.sort((a, b) => a.confidence.localeCompare(b.confidence, undefined, { numeric: true }))
          .reverse()[0].language

        return LangsList[lang] ? LangsList[lang].langCode : lang
      }
    }
    return null
  }
}
