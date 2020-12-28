/* eslint-env jest */
import Language from '@dmodels/language.js'

describe('Language', () => {
  const langCodeEn = 'eng'
  const langCodeEnShort = 'en'
  const unrecognizedCode = 'zh-Hans'
  const languageList = [Language.LATIN, Language.GREEK, Language.ARABIC]

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('constructor: should create an instance with the language code that is recognized by the Language class', () => {
    const language = new Language(langCodeEn)
    expect(language).toBeInstanceOf(Language)
    expect(language.equals(Language.ENGLISH)).toBeTruthy()
  })

  it('constructor: should create an instance with any language code', () => {
    const language = new Language(langCodeEnShort)
    expect(language).toBeInstanceOf(Language)
    expect(language.toCode()).toEqual(langCodeEnShort)
    // This check verifies that the language code is not normalized to the one that is recognized by the Language class
    expect(language.equals(Language.ENGLISH)).toBeFalsy()
  })

  it('constructor: should normalize the language code when the corresponding option is on', () => {
    const language = new Language(langCodeEnShort, { normalize: true })
    expect(language).toBeInstanceOf(Language)
    expect(language.toCode()).not.toEqual(langCodeEnShort)
    expect(language.equals(Language.ENGLISH)).toBeTruthy()
  })

  it('constructor: should pass through the unrecognized language code', () => {
    const language = new Language(unrecognizedCode, { normalize: true })
    expect(language).toBeInstanceOf(Language)
    expect(language.toCode()).toEqual(unrecognizedCode)
  })

  it('constructor: should not allow to create an instance without the language code', () => {
    expect(() => new Language()).toThrowError(Language.errMsgs.NO_LANGUAGE_CODE)
  })

  it('normalizeCode: should normalize the known language code', () => {
    const normalizedCode = Language.normalizedCode(langCodeEnShort)
    expect(normalizedCode).toEqual(langCodeEn)
  })

  it('normalizeCode: should pass through the unrecognized language code', () => {
    const normalizedCode = Language.normalizedCode(unrecognizedCode)
    expect(normalizedCode).toEqual(unrecognizedCode)
  })

  it('equals: should establish equality of the same languages', () => {
    const lang = Language.ENGLISH
    expect(lang.equals(Language.ENGLISH)).toBeTruthy()
  })

  it('equals: should not recognize different languages as equal', () => {
    const lang = Language.ENGLISH
    expect(lang.equals(Language.LATIN)).toBeFalsy()
  })

  it('isOneOf: should recognize the language as the one from the list', () => {
    const lang = Language.GREEK
    expect(lang.isOneOf(languageList)).toBeTruthy()
  })

  it('isOneOf: should return false if the language is not from the list', () => {
    const lang = Language.PERSIAN
    expect(lang.isOneOf(languageList)).toBeFalsy()
  })

  it('toCode: should return the language code', () => {
    const lang = Language.GREEK
    expect(lang.toCode()).toEqual('grc')
  })

  it('toJsonObject: should create a JSON object representing the language', () => {
    const lang = Language.ENGLISH
    expect(lang.toJsonObject()).toEqual({
      code: langCodeEn
    })
  })

  it('fromJsonObject: should create an instance of a corresponding Language class', () => {
    const jsonObject = {
      code: 'ara'
    }
    const lang = Language.fromJsonObject(jsonObject)
    expect(lang).toBeInstanceOf(Language)
    expect(lang.equals(Language.ARABIC)).toBeTruthy()
  })
})
