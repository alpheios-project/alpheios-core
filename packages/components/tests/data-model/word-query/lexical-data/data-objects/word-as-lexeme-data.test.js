/* eslint-env jest */
import { Language, HomonymGroup } from 'alpheios-data-models'
import WordAsLexemeData from '@comp/data-model/word-query/lexical-data/data-objects/word-as-lexeme-data.js'
import LexicalDataResult from '@comp/data-model/word-query/lexical-data/result/lexical-data-result.js'

describe('WordAsLexemeData', () => {
  const word = 'testWord'
  const language = Language.SYRIAC
  const languageCode = 'syr'
  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', () => {
    const lexicalDataResult = new WordAsLexemeData({ word, language })
    expect(lexicalDataResult).toBeInstanceOf(WordAsLexemeData)
  })

  it('Constructor: cannot be created without a word', () => {
    expect(() => new WordAsLexemeData({ language })).toThrowError(WordAsLexemeData.errMsgs.NO_WORD_PROVIDED)
  })

  it('Constructor: cannot be created without a language', () => {
    expect(() => new WordAsLexemeData({ word })).toThrowError(WordAsLexemeData.errMsgs.NO_LANGUAGE_PROVIDED)
  })

  it('Retrieve: should return a LexicalDataResult', async () => {
    const lexicalDataResult = new WordAsLexemeData({ word, language })
    const result = await lexicalDataResult.retrieve()
    expect(result).toBeInstanceOf(LexicalDataResult)
  })

  it('Retrieve: result should contain a correct datatype', async () => {
    const lexicalDataResult = new WordAsLexemeData({ word, language })
    const result = await lexicalDataResult.retrieve()
    expect(result.dataType).toBe(WordAsLexemeData.dataType)
  })

  it('Retrieve: result data field should contain a homonym group with one homonym', async () => {
    const lexicalDataResult = new WordAsLexemeData({ word, language })
    const result = await lexicalDataResult.retrieve()
    expect(result.data).toBeInstanceOf(HomonymGroup)
    expect(result.data.homonyms.length).toBe(1)
    expect(result.data.homonyms[0]).toEqual({
      lexemes: [
        {
          altLemmas: [],
          disambiguated: false,
          inflections: [],
          lemma: expect.objectContaining({
            features: {},
            languageCode,
            principalParts: [],
            word
          }),
          meaning: expect.objectContaining({
            fullDefs: [],
            lemmaWord: word,
            shortDefs: []
          })
        }
      ],
      targetWord: word
    })
  })

  it('Retrieve: result should contain a correct state', async () => {
    const lexicalDataResult = new WordAsLexemeData({ word, language })
    const result = await lexicalDataResult.retrieve()
    expect(result.state).toEqual({
      loading: false,
      available: true,
      failed: false
    })
  })

  it('Retrieve: result should return no errors', async () => {
    const lexicalDataResult = new WordAsLexemeData({word, language})
    const result = await lexicalDataResult.retrieve()
    expect(result.errors.length).toBe(0)
  })
})
