/* eslint-env jest */
import { Language } from 'alpheios-data-models'
import TreebankData from '@comp/data-model/word-query/lexical-data/data-objects/treebank-data.js'

describe('TreebankData', () => {
  const word = 'testWord'
  const language = Language.SYRIAC
  const clientId = 'Client ID'
  const treebankProvider = 'https://some.url'
  const treebankSentenceId = 3
  const treebankWordIds = [2, 4]

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', () => {
    const tuftsMorphologyData = new TreebankData({
      word, language, clientId, treebankProvider, treebankSentenceId, treebankWordIds
    })
    expect(tuftsMorphologyData).toBeInstanceOf(TreebankData)
  })

  it('Constructor: cannot be created without a word data', () => {
    expect(() => new TreebankData({
      language, clientId, treebankProvider, treebankSentenceId, treebankWordIds
    }))
      .toThrowError(TreebankData.errMsgs.NO_WORD_PROVIDED)
  })

  it('Constructor: cannot be created without a language', () => {
    expect(() => new TreebankData({
      word, clientId, treebankProvider, treebankSentenceId, treebankWordIds
    }))
      .toThrowError(TreebankData.errMsgs.NO_LANGUAGE_PROVIDED)
  })

  it('Constructor: cannot be created without a client ID', () => {
    expect(() => new TreebankData({
      word, language, treebankProvider, treebankSentenceId, treebankWordIds
    }))
      .toThrowError(TreebankData.errMsgs.NO_CLIENT_ID_PROVIDED)
  })

  it('Constructor: cannot be created without a treebank provider', () => {
    expect(() => new TreebankData({
      word, language, clientId, treebankSentenceId, treebankWordIds
    }))
      .toThrowError(TreebankData.errMsgs.NO_TREEBANK_PROVIDER)
  })

  it('Constructor: cannot be created without a sentence ID', () => {
    expect(() => new TreebankData({
      word, language, clientId, treebankProvider, treebankWordIds
    }))
      .toThrowError(TreebankData.errMsgs.NO_TREEBANK_SENTENCE_ID)
  })

  it('Constructor: cannot be created without word IDs', () => {
    expect(() => new TreebankData({
      word, language, clientId, treebankProvider, treebankSentenceId
    }))
      .toThrowError(TreebankData.errMsgs.NO_TREEBANK_WORD_IDS)
  })

  it('Constructor: cannot be created with word IDs not in an array', () => {
    expect(() => new TreebankData({
      word, language, clientId, treebankProvider, treebankSentenceId, treebankWordIds: 1
    }))
      .toThrowError(TreebankData.errMsgs.NO_TREEBANK_WORD_IDS)
  })

  it('Constructor: cannot be created with an empty word IDs array', () => {
    expect(() => new TreebankData({
      word, language, clientId, treebankProvider, treebankSentenceId, treebankWordIds: 1
    }))
      .toThrowError(TreebankData.errMsgs.NO_TREEBANK_WORD_IDS)
  })

  // TODO: Need to decide on the best way to mock the treebank data retrieval
})
