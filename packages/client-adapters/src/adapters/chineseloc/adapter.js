/* eslint-disable no-unused-vars */
import BaseAdapter from '@/adapters/base-adapter'
import { ChineseLanguageModel, Lemma, Lexeme, Homonym, Feature, Definition } from 'alpheios-data-models'
import {
  MessagingService, WindowIframeDestination as Destination, CedictDestinationConfig as CedictConfig,
  CedictCharacterForms, RequestMessage
} from 'alpheios-lexis-cs'

const msgServiceName = 'AdaptersLexisService'

class AlpheiosChineseLocAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = config

    /*
    AlpheiosChineseLocAdapter is created every time when a new lexical request for Chinese data comes in.
    We do not want to create a new instance of a messaging service with that. Thus, we'll use a single
    instance of the service that will be created once and reused across consecutive constructor invocations.
     */
    if (!MessagingService.hasService(msgServiceName)) {
      MessagingService.createService(msgServiceName, new Destination(CedictConfig))
    }
    this._messagingService = MessagingService.getService(msgServiceName)
  }

  get languageID () { return ChineseLanguageModel.languageID }

  async _fetchCedictData (targetWord, contextForward) {
    const requestBody = {
      getWords: {
        words: this.constructor._buildWordList(targetWord, contextForward)
      }
    }
    const responseMessage = await this._messagingService.sendRequestTo(CedictConfig.name, new RequestMessage(requestBody))
    return responseMessage.body
  }

  /**
   * Creates a list of words that will be requested from a CEDICT service.
   * This method builds a list of words that would make sense in a context of a Chinese language
   * out of the word selected by user and its surrounding texts (context forward represents
   * the text that is located at the right of the selected word.
   *
   * @param {string} targetWord - A word that was selected by the user.
   * @param {string} contextForward - A piece of text that follows the selected word in a text.
   * @returns {[string]} An array of words that will be requested from a CEDICT service.
   * @private
   */
  static _buildWordList (targetWord, contextForward) {
    const wordList = [targetWord]
    if (contextForward) {
      for (let i = 0; i < contextForward.length; i++) {
        wordList.push(`${targetWord}${contextForward.slice(0, i + 1)}`)
      }
    }
    return wordList
  }

  async getHomonym (targetWord, contextForward) {
    try {
      const cedictRes = await this._fetchCedictData(targetWord, contextForward)
      if (Object.keys(cedictRes).length === 0) {
        this.addError(this.l10n.messages.MORPH_NO_HOMONYM.get(targetWord, this.languageID.toString()))
        return
      }
      // const homonym = this._transformData(res, targetWord)
      const cedictHomonym = this._transformData(cedictRes, targetWord)

      if (!cedictHomonym) {
        this.addError(this.l10n.messages.MORPH_NO_HOMONYM.get(targetWord, this.languageID.toString()))
        return
      }
      return cedictHomonym
    } catch (error) {
      this.addError(this.l10n.messages.MORPH_UNKNOWN_ERROR.get(error.mesage))
    }
  }

  _transformData (cedictEntries, targetWord) {
    // eslint-disable-next-line no-prototype-builtins
    const characterForm = cedictEntries.hasOwnProperty(CedictCharacterForms.SIMPLIFIED)
      ? CedictCharacterForms.SIMPLIFIED
      : CedictCharacterForms.TRADITIONAL
    let lexemes = [] // eslint-disable-line prefer-const
    cedictEntries[characterForm][targetWord].forEach(entry => {
      const cfData = entry[characterForm]
      const headword = cfData.headword
      let lemma = new Lemma(headword, this.languageID, []) // eslint-disable-line prefer-const

      // eslint-disable-next-line prefer-const
      let pronunciationValues = ['tang', 'mandarin', 'cantonese'].reduce((arr, i) => {
        // Add all of the values listed above to an array or pronunciation feature. Each feature value will be preceded with its name.
        // TODO: Update once we decide on a better format of storing pronunciation in a Feature object.
        if (cfData[i]) arr.push(`${i} - ${cfData[i]}`); return arr
      }, [])
      if (entry.pinyin) pronunciationValues.push(ChineseLanguageModel.formatPinyin(entry.pinyin))
      lemma.addFeature(this._createFeature(Feature.types.pronunciation, pronunciationValues))
      lemma.addFeature(this._createFeature(Feature.types.note, characterForm))
      if (cfData.radical && cfData.radical.character) lemma.addFeature(this._createFeature(Feature.types.radical, cfData.radical.character))
      if (cfData.frequency) lemma.addFeature(this._createFeature(Feature.types.frequency, cfData.frequency, 10))

      let lexModel = new Lexeme(lemma, []) // eslint-disable-line prefer-const
      const shortDefs = entry.definitions.map(entry => new Definition(entry, 'eng', 'text/plain', headword))
      lexModel.meaning.appendShortDefs(shortDefs)
      lexemes.push(lexModel)
    })
    return new Homonym(lexemes, targetWord)
  }

  _createFeature (featureType, values) {
    return new Feature(featureType, values, this.languageID)
  }
}

export default AlpheiosChineseLocAdapter
