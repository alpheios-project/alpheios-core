/* eslint-env jest */
import Lemma from '../src/lemma.js'
import Translation from '../src/translation.js'
import Language from '../src/language.js'

describe('Translation object', () => {
  let lemma, word, translation

  beforeAll(() => {
    // Create a test environment

    word = 'cupido'
    lemma = new Lemma(word, Language.LATIN)
    translation = new Translation(lemma, 'lat', ['test meanings'])
  })

  test('Should not allow empty arguments', () => {
    expect(() => new Translation()).toThrowError(/empty/)
  })

  test('Should be initialized properly', () => {
    expect(translation).toEqual({
      lemmaWord: 'cupido',
      languageCode: 'lat',
      glosses: ['test meanings']
    })
  })

  test('readTranslationFromJSONList - if json is empty - throw error', () => {
    expect(() => Translation.readTranslationFromJSONList(lemma)).toThrowError(/not proper/)
  })

  test('readTranslationFromJSONList - if json is proper created new Translation object', () => {
    let testJSON = [
      {
        'in': 'cupido',
        'map': 'cupido',
        'translations': [
          'to desire/love/wish/longing (passionate); to lust; to greed, appetite; to desire for gain;'
        ]
      }
    ]
    let res = Translation.readTranslationFromJSONList(lemma, 'lat', testJSON)
    expect(res instanceof Translation).toBeTruthy()
  })

  test('loadTranslations - adds Translation object to lemma from JSON translations list', () => {
    let testJSON = [
      {
        'in': 'cupido',
        'map': 'cupido',
        'translations': [
          'to desire/love/wish/longing (passionate); to lust; to greed, appetite; to desire for gain;'
        ]
      }
    ]
    let expected = Translation.readTranslationFromJSONList(lemma, 'lat', testJSON)
    Translation.loadTranslations(lemma, 'lat', testJSON)

    expect(lemma.translation).not.toBe(undefined)
    expect(lemma.translation).toEqual(expected)
  })

  test('loadTranslations - adds Translation object with provider to lemma from JSON translations list', () => {
    let testJSON = [
      {
        'in': 'cupido',
        'map': 'cupido',
        'translations': [
          'to desire/love/wish/longing (passionate); to lust; to greed, appetite; to desire for gain;'
        ]
      }
    ]
    let mockProvider = { toString: () => 'dummy provider', provider: 'dummy' }
    Translation.loadTranslations(lemma, 'lat', testJSON, mockProvider)
    expect(lemma.translation).not.toBe(undefined)
    expect(lemma.translation.provider).toEqual(mockProvider)
    expect(lemma.translation.lemmaWord).toEqual('cupido')
  })

  afterAll(() => {
    // Clean a test environment up
    lemma = undefined
    translation = undefined
  })
})
