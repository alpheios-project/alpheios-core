/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LanguageModelFactory from '../src/language_model_factory.js'
import LatinLanguageModel from '../src/latin_language_model.js'
import GreekLanguageModel from '../src/greek_language_model.js'
import ArabicLanguageModel from '../src/arabic_language_model.js'
import PersianLanguageModel from '../src/persian_language_model.js'
import LanguageModel from '../src/language_model.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  beforeAll(() => {
  })

  test('Should return a Latin model', () => {
    let model = LanguageModelFactory.getLanguageForCode('lat')
    expect(model instanceof LatinLanguageModel).toBeTruthy()
  })

  test('Should return a Greek model', () => {
    let model = LanguageModelFactory.getLanguageForCode('grc')
    expect(model instanceof GreekLanguageModel).toBeTruthy()
  })

  test('Should return an Arabic model', () => {
    let model = LanguageModelFactory.getLanguageForCode('ara')
    expect(model instanceof ArabicLanguageModel).toBeTruthy()
  })

  test('Should return a Persian model', () => {
    let model = LanguageModelFactory.getLanguageForCode('per')
    expect(model instanceof PersianLanguageModel).toBeTruthy()
  })

  test('Should return a Persian code id for alternate code', () => {
    let id = LanguageModelFactory.getLanguageIdFromCode('fa-IR')
    expect(id).toBeTruthy()
  })

  test('Should return a Base model', () => {
    let model = LanguageModelFactory.getLanguageForCode('foo')
    expect(model instanceof LanguageModel).toBeTruthy()
    expect(model.constructor.languageID).toBe(Constants.LANG_UNDEFINED)
  })

  test('Should return false for an unsupported language', () => {
    expect(LanguageModelFactory.supportsLanguage('foo')).toBeFalsy()
  })

  test('Should return available languages', () => {
    expect(LanguageModelFactory.availableLanguages()).toEqual([
      Constants.STR_LANG_CODE_LAT,
      Constants.STR_LANG_CODE_GRC,
      Constants.STR_LANG_CODE_ARA,
      Constants.STR_LANG_CODE_PER,
      Constants.STR_LANG_CODE_GEZ,
      Constants.STR_LANG_CODE_ZHO
    ])
  })
})
