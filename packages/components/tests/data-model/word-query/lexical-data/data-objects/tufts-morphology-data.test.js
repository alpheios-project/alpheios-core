/* eslint-env jest */
import { Language, LanguageModelFactory as LMF, HomonymGroup } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import TuftsMorphologyData from '@comp/lexical-data/word-query/lexical-data/data-objects/tufts-morphology-data.js'
import LexicalDataResult from '@comp/lexical-data/word-query/lexical-data/result/lexical-data-result.js'
import { Fixture } from 'alpheios-fixtures'

describe('TuftsMorphologyData', () => {
  const word = 'placito'
  const language = Language.LATIN
  const clientId = 'Client ID'
  const clearShortDefs = true

  const getHomonymMock = function () {
    const langAttrs = LMF.getLegacyLanguageCodeAndId(this._language)
    const sourceData = Fixture.getFixtureRes({
      langCode: langAttrs.languageCode,
      adapter: 'tufts',
      word: this._word
    })

    return ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      clientID: this._clientId,
      params: {
        languageID: langAttrs.languageID,
        word: this._word,
        sourceData: sourceData
      }
    })
  }

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', () => {
    const tuftsMorphologyData = new TuftsMorphologyData({
      word, language, clientId, clearShortDefs
    })
    expect(tuftsMorphologyData).toBeInstanceOf(TuftsMorphologyData)
  })

  it('Constructor: cannot be created without a word', () => {
    expect(() => new TuftsMorphologyData({ language, clientId, clearShortDefs }))
      .toThrowError(TuftsMorphologyData.errMsgs.NO_WORD_PROVIDED)
  })

  it('Constructor: cannot be created without a language', () => {
    expect(() => new TuftsMorphologyData({ word, clientId, clearShortDefs }))
      .toThrowError(TuftsMorphologyData.errMsgs.NO_LANGUAGE_PROVIDED)
  })

  it('Constructor: cannot be created without a client ID', () => {
    expect(() => new TuftsMorphologyData({ word, language, clearShortDefs }))
      .toThrowError(TuftsMorphologyData.errMsgs.NO_CLIENT_ID_PROVIDED)
  })

  it('Retrieve: should return a LexicalDataResult', async () => {
    const tuftsMorphologyData = new TuftsMorphologyData({ word, language, clientId })
    tuftsMorphologyData._getHomonym = getHomonymMock.bind(tuftsMorphologyData)
    const result = await tuftsMorphologyData.retrieve()
    expect(result).toBeInstanceOf(LexicalDataResult)
  })

  it('Retrieve: result should contain a correct datatype', async () => {
    const tuftsMorphologyData = new TuftsMorphologyData({ word, language, clientId })
    tuftsMorphologyData._getHomonym = getHomonymMock.bind(tuftsMorphologyData)
    const result = await tuftsMorphologyData.retrieve()
    expect(result.dataType).toBe(TuftsMorphologyData.dataType)
  })

  it('Retrieve: result data field should contain a homonym group with proper data', async () => {
    const tuftsMorphologyData = new TuftsMorphologyData({ word, language, clientId })
    tuftsMorphologyData._getHomonym = getHomonymMock.bind(tuftsMorphologyData)
    const result = await tuftsMorphologyData.retrieve()
    expect(result.data).toBeInstanceOf(HomonymGroup)
    expect(result.data.homonyms.length).toBe(1)
    const homonym = result.data.homonyms[0]
    expect(homonym.lexemes.length).toBe(5)
    expect(homonym.lexemes[0].lemma.word).toBe('placeo')
  })

  it('Retrieve: result should contain short defs if clear option is not set', async () => {
    const tuftsMorphologyData = new TuftsMorphologyData({ word, language, clientId })
    tuftsMorphologyData._getHomonym = getHomonymMock.bind(tuftsMorphologyData)
    const result = await tuftsMorphologyData.retrieve()
    const homonym = result.data.homonyms[0]
    // Should contain short definitions
    expect(homonym.lexemes[0].hasShortDefs).toBeTruthy()
  })

  it('Retrieve: short defs should be removed if clear option is true', async () => {
    const tuftsMorphologyData = new TuftsMorphologyData({
      word, language, clientId, clearShortDefs: true
    })
    tuftsMorphologyData._getHomonym = getHomonymMock.bind(tuftsMorphologyData)
    const result = await tuftsMorphologyData.retrieve()
    const homonym = result.data.homonyms[0]
    // There should be no short defs
    expect(homonym.lexemes[0].hasShortDefs).toBeFalsy()
  })

  it('Retrieve: result should contain a correct state', async () => {
    const tuftsMorphologyData = new TuftsMorphologyData({ word, language, clientId })
    tuftsMorphologyData._getHomonym = getHomonymMock.bind(tuftsMorphologyData)
    const result = await tuftsMorphologyData.retrieve()
    expect(result.state).toEqual({
      loading: false,
      available: true,
      failed: false
    })
  })

  it('Retrieve: result should return no errors', async () => {
    const tuftsMorphologyData = new TuftsMorphologyData({ word, language, clientId })
    tuftsMorphologyData._getHomonym = getHomonymMock.bind(tuftsMorphologyData)
    const result = await tuftsMorphologyData.retrieve()
    expect(result.errors.length).toBe(0)
  })
})
