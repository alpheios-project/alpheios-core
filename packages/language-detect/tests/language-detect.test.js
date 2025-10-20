/* eslint-env jest */
/* eslint-disable no-unused-vars */
import LanguageDetect from '@/language-detect.js'

describe('language-detect.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })


  it('1 LanguageDetect - check greek', () => {
    const testStr = 'τά ταῖν ταῖν τοῦ εγώ εμένα ἐμαυτοῦ ταύταις ένα δύο τρία όμορφος νέος γλυκός συνεχής πλατύς οξύς ἄνδρα μοι ἔννεπε, μοῦσα, πολύτροπον πρόσφυμα ξηρή σκληρή ζώνη ινώδους συνδετικού ιστού που συνδέει συνήθως μύες με οστά ἥρωϊ Δαναὸς ἀφίκτωρ λεπτοψαμάθων'
    expect(LanguageDetect.detect(testStr)).toEqual('grc')
  })

  it('2 LanguageDetect - check Persian', () => {
    const testStr = 'بادائیدنبه نام خداوند جان و خرد کزین برتر اندیشه برنگذر'
    expect(LanguageDetect.detect(testStr)).toEqual('per')
  })

  it.skip('3 LanguageDetect - check arabic', () => {
    const testStr = 'اَلدٌّنيَا دَارُ مَمَرٍ لاَ دَارُ مَقَرٍ * سُلطَان بِلاَ عَدلٍ كَنَهرٍ'
    expect(LanguageDetect.detect(testStr)).toEqual('ara')
  })

  it('4 LanguageDetect - check latin', () => {
    const testStr = 'fero ferre tuli latus ferant'
    expect(LanguageDetect.detect(testStr)).toEqual('lat')
  })

  it('5 LanguageDetect - check geez', () => {
    const testStr = 'ይትባረክ፡ እግዚአብሔር፡ አምላከ፡ እስራኤል፡ አምላክ፡ ለኵሉ፡ መንፈስ፡ ወለኵሉ፡ ዘሥጋ፡ ወይቤሎ፡ እግዚአብሔር፡ ለእዝራ፡ አእምር፡ ወጠይቅ፡'
    expect(LanguageDetect.detect(testStr)).toEqual('gez')
  })

  it('6 LanguageDetect - check chinese', () => {
    const testStr = '天地玄黃，宇宙洪荒。日月盈昃，辰宿列張。寒來暑往，秋收冬藏。閏余成歲，律呂調陽。子曰學'    
    expect(LanguageDetect.detect(testStr)).toEqual('zho')
  })

  it('7 LanguageDetect - check syriac', () => {
    const testStr = 'ܥܲܠ ܟܵܘܟ݁ܒ̣ܵܐ ܗܵܘ̇ ܕܐܸܬܼܚܙܝܼ ܠܲܡܓ̣ܘܼ̈ܫܹܐ'
    expect(LanguageDetect.detect(testStr)).toEqual('syr')
  })

  it('8 LanguageDetect - check out of list', () => {
    const testStr ='Тестовый текст'
    expect(LanguageDetect.detect(testStr)).not.toBeDefined()
  })

  it('9 LanguageDetect - check greek mixed latin', () => {
    const testStr = 'τά ταῖν [εμένα] ἐμαυτοῦ mare ταύταις'
    expect(LanguageDetect.detect(testStr)).not.toBeDefined()
  })

})
