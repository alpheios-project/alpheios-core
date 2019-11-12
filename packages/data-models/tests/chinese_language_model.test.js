/* eslint-env jest */
/* eslint-disable no-unused-vars */
import * as Constants from '@/constants.js'
import LMF from '@/language_model_factory.js'
import Feature from '@/feature.js'
import Inflection from '@/inflection.js'

describe('chinese_language_model.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let chineseModel

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    chineseModel = LMF.getLanguageModel(Constants.LANG_CHINESE)
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 ChineseLanguageModel - check static get methods', () => {
    expect(chineseModel.languageID).toEqual(Constants.LANG_CHINESE)
    expect(chineseModel.contextForward).toEqual(5)
    expect(chineseModel.contextBackward).toEqual(0)
    expect(chineseModel.direction).toEqual(Constants.LANG_DIR_LTR)
    expect(chineseModel.baseUnit).toEqual(Constants.LANG_UNIT_CHAR)

    expect(chineseModel.featureValues.size).toBeGreaterThan(0)

    expect(chineseModel.canInflect()).toBeFalsy()
    expect(chineseModel.getPunctuation().length).toBeGreaterThan(0)
    expect(chineseModel.alternateWordEncodings().length).toEqual(0)
  })
})
