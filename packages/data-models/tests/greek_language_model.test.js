/* eslint-env jest */
/* eslint-disable no-unused-vars */
import * as Constants from '@/constants.js'
import LMF from '@/language_model_factory.js'
import Feature from '@/feature.js'
import Inflection from '@/inflection.js'

describe('greek_language_model.j', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let greekModel

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    greekModel = LMF.getLanguageModel(Constants.LANG_GREEK)
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 GreekLanguageModel - check static get methods', () => {
    expect(greekModel.languageID).toEqual(Constants.LANG_GREEK)
    expect(greekModel.contextForward).toEqual(0)
    expect(greekModel.contextBackward).toEqual(0)
    expect(greekModel.direction).toEqual(Constants.LANG_DIR_LTR)
    expect(greekModel.baseUnit).toEqual(Constants.LANG_UNIT_WORD)

    expect(greekModel.featureValues.size).toBeGreaterThan(0)

    expect(greekModel.canInflect()).toBeTruthy()
    expect(greekModel.getPunctuation().length).toBeGreaterThan(0)
  })

  it('2 GreekLanguageModel - grammar features', () => {
    expect(greekModel.grammarFeatures().length).toBeGreaterThan(0)
    expect(greekModel.grammarFeatures()).toEqual(['part of speech', 'case', 'mood', 'declension', 'tense', 'voice'])
  })

  it('3 GreekLanguageModel - alternateWordEncodings - additional encodings strip vowel length', () => {
    let word = '\u1FB0\u03B2\u1FB0\u1FB1'
    let alt = greekModel.alternateWordEncodings(word)
    expect(alt[0]).toEqual('\u03B1\u03B2\u03B1\u03B1')

    let alt2 = greekModel.alternateWordEncodings(word, null, null, 'strippedDiaeresis')
    expect(alt2[0]).toEqual('\u1FB0\u03B2\u1FB0\u1FB1')
  })

  it('4 GreekLanguageModel - Uses default features with correct language', () => {
    expect(greekModel.typeFeatures.size).toBeGreaterThan(0)

    let noun = greekModel.typeFeature(Feature.types.part).createFeature(Constants.POFS_NOUN)
    expect(noun).toBeDefined()
    expect(noun.languageID).toEqual(Constants.LANG_GREEK)
  })

  it('5 GreekLanguageModel - normalizes accents', () => {
    expect(greekModel.normalizeText('ferāmus')).toEqual('ferāmus')
    expect(greekModel.normalizeText(null)).toBeNull()
  })

  it('6 GreekLanguageModel - getInflectionConstraints - no part of speach', () => {
    let inflection = new Inflection('foo', 'grc')

    greekModel.getInflectionConstraints(inflection)
    expect(console.warn).toHaveBeenCalledWith('Unable to set grammar: part of speech data is missing or is incorrect', undefined)
  })

  it('7 GreekLanguageModel - getInflectionConstraints - suffixBased part of speach', () => {
    let inflection = new Inflection('foo', 'grc')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_GREEK))

    expect(greekModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: false,
      suffixBased: true,
      pronounClassRequired: false
    }))
  })

  it('8 GreekLanguageModel - getInflectionConstraints - fullFormBased part of speach', () => {
    let inflection = new Inflection('foo', 'grc')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NUMERAL, Constants.LANG_GREEK))

    expect(greekModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: true,
      suffixBased: false,
      pronounClassRequired: false
    }))
  })

  it('9 GreekLanguageModel - getInflectionConstraints - POFS_PRONOUN part of speach', () => {
    let inflection = new Inflection('foo', 'grc')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_PRONOUN, Constants.LANG_GREEK))

    expect(greekModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: true,
      suffixBased: false,
      pronounClassRequired: true
    }))
  })

  it('10 GreekLanguageModel - getPronounClasses', () => {
    let featureDative = new Feature(Feature.types.grmClass, Constants.CASE_DATIVE, Constants.LANG_GREEK)
    let featureHdwd = new Feature(Feature.types.hdwd,'foo', Constants.LANG_GREEK)

    let form1 = { value: 'foo1', features: { 'class': featureDative } }
    let form2 = { value: 'foo2', features: {} }
    let form3 = { features: {} }
    let form_with_hdwd = { value: 'foo1', features: { 'class': featureDative, [Feature.types.hdwd]: featureHdwd } }

    expect(greekModel.getPronounClasses([form1, form2], 'foo1', 'foo')).toEqual(featureDative)
    expect(greekModel.getPronounClasses([form1, form2], 'foo3', 'foo')).toBeUndefined()
    expect(greekModel.getPronounClasses([form2], 'foo2', 'foo')).toBeUndefined()
    expect(greekModel.getPronounClasses([form3], '', '')).toBeUndefined()
    expect(greekModel.getPronounClasses([form_with_hdwd], 'foo1', 'foo')).toEqual(featureDative)
    expect(greekModel.getPronounClasses([form_with_hdwd], 'foo1', 'bar')).toBeUndefined()
  })

  it('11 GreekLanguageModel - alternateWordEncodings - additional encodings strip diacritics for inflections', () => {
    let word = 'συνεχής'.normalize('NFD')
    expect(greekModel.alternateWordEncodings(word, null, null, 'strippedDiacritics')).toEqual(['συνεχης'])
  })

  it('12 compareWords respects normalization', () => {
    expect(greekModel.compareWords('συνεχής', 'συνεχης', true)).toBeTruthy()
    // and are not equal if we don't normalize
    expect(greekModel.compareWords('συνεχής', 'συνεχης', false)).toBeFalsy()
  })

  it('13 GreekLanguageModel - normalizes right quotation to koronis', () => {
    expect(greekModel.normalizeText('ἀλλ’')).toEqual('ἀλλ\u1fbd')
  })

  it('14 GreekLanguageModel - isValidUnicode defines βουλά in unicode as greek', () => {
    expect(greekModel.isValidUnicode('βουλά')).toBeTruthy()
  })

  it('15 GreekLanguageModel - isValidUnicode defines mare as not greek', () => {
    expect(greekModel.isValidUnicode('beatum')).toBeFalsy()
  })

  it('16 GreekLanguageModel - alternateWordEncodings supports strippedAll diacritics', () => {
    // these test cases were taking from the mjm defs file at
    // https://github.com/alpheios-project/mjm/blob/master/dat/grc-mjm-defs.dat
    // by searching for each of the chars with diacritics per our uni-beta-transform mapping
    // in https://github.com/alpheios-project/xml_ctl_files/blob/master/xslt/trunk/beta2unicode.xsl
    expect(greekModel.alternateWordEncodings("ῥωγάς",null,null,'strippedAll',true)[0]).toEqual("ρωγας")
    expect(greekModel.alternateWordEncodings("ῥᾳθυμέω",null,null,'strippedAll',true)[0]).toEqual("ραθυμεω")
    expect(greekModel.alternateWordEncodings("ῥωπήιον",null,null,'strippedAll',true)[0]).toEqual("ρωπηιον")
    expect(greekModel.alternateWordEncodings("ῥυτίς",null,null,'strippedAll',true)[0]).toEqual("ρυτις")
    expect(greekModel.alternateWordEncodings("ῥῶπος",null,null,'strippedAll',true)[0]).toEqual("ρωπος")
    expect(greekModel.alternateWordEncodings("ῥῆσις",null,null,'strippedAll',true)[0]).toEqual("ρησις")
    expect(greekModel.alternateWordEncodings("ῥᾳδιουργός",null,null,'strippedAll',true)[0]).toEqual("ραδιουργος")
    expect(greekModel.alternateWordEncodings("ῥᾳδιούργημα",null,null,'strippedAll',true)[0]).toEqual("ραδιουργημα")
    expect(greekModel.alternateWordEncodings("ὁμογνώμων",null,null,'strippedAll',true)[0]).toEqual("ομογνωμων")
    expect(greekModel.alternateWordEncodings("ἀωρία",null,null,'strippedAll',true)[0]).toEqual("αωρια")
    expect(greekModel.alternateWordEncodings("ἁψιμαχία",null,null,'strippedAll',true)[0]).toEqual("αψιμαχια")
    expect(greekModel.alternateWordEncodings("ἄωτον",null,null,'strippedAll',true)[0]).toEqual("αωτον")
    expect(greekModel.alternateWordEncodings("ἅτε",null,null,'strippedAll',true)[0]).toEqual("ατε")
    expect(greekModel.alternateWordEncodings("ἆρα",null,null,'strippedAll',true)[0]).toEqual("αρα")
    expect(greekModel.alternateWordEncodings("ἇς",null,null,'strippedAll',true)[0]).toEqual("ας")
    expect(greekModel.alternateWordEncodings("Ἀλέξανδρος",null,null,'strippedAll',true)[0]).toEqual("Αλεξανδρος")
    expect(greekModel.alternateWordEncodings("ἐκπίτνω",null,null,'strippedAll',true)[0]).toEqual("εκπιτνω")
    expect(greekModel.alternateWordEncodings("ἑῶμεν",null,null,'strippedAll',true)[0]).toEqual("εωμεν")
    expect(greekModel.alternateWordEncodings("ἒ",null,null,'strippedAll',true)[0]).toEqual("ε")
    expect(greekModel.alternateWordEncodings("ἔωμεν",null,null,'strippedAll',true)[0]).toEqual("εωμεν")
    expect(greekModel.alternateWordEncodings("ἕωθεν",null,null,'strippedAll',true)[0]).toEqual("εωθεν")
    expect(greekModel.alternateWordEncodings("ἠῶθεν",null,null,'strippedAll',true)[0]).toEqual("ηωθεν")
    expect(greekModel.alternateWordEncodings("ἡμι",null,null,'strippedAll',true)[0]).toEqual("ημι")
    expect(greekModel.alternateWordEncodings("ἤχημα",null,null,'strippedAll',true)[0]).toEqual("ηχημα")
    expect(greekModel.alternateWordEncodings("ἥττημα",null,null,'strippedAll',true)[0]).toEqual("ηττημα")
    expect(greekModel.alternateWordEncodings("ἦχος",null,null,'strippedAll',true)[0]).toEqual("ηχος")
    expect(greekModel.alternateWordEncodings("ἧχι",null,null,'strippedAll',true)[0]).toEqual("ηχι")
    expect(greekModel.alternateWordEncodings("ἰῶτα2",null,null,'strippedAll',true)[0]).toEqual("ιωτα2")
    expect(greekModel.alternateWordEncodings("ἱππών",null,null,'strippedAll',true)[0]).toEqual("ιππων")
    expect(greekModel.alternateWordEncodings("ἴων",null,null,'strippedAll',true)[0]).toEqual("ιων")
    expect(greekModel.alternateWordEncodings("ἵππουρις",null,null,'strippedAll',true)[0]).toEqual("ιππουρις")
    expect(greekModel.alternateWordEncodings("ἶψ",null,null,'strippedAll',true)[0]).toEqual("ιψ")
    expect(greekModel.alternateWordEncodings("οἷπερ",null,null,'strippedAll',true)[0]).toEqual("οιπερ")
    expect(greekModel.alternateWordEncodings("@Ἰώ",null,null,'strippedAll',true)[0]).toEqual("@Ιω")
    expect(greekModel.alternateWordEncodings("@Ἴλιος2",null,null,'strippedAll',true)[0]).toEqual("@Ιλιος2")
    expect(greekModel.alternateWordEncodings("ὁ",null,null,'strippedAll',true)[0]).toEqual("ο")
    expect(greekModel.alternateWordEncodings("ὄψον",null,null,'strippedAll',true)[0]).toEqual("οψον")
    expect(greekModel.alternateWordEncodings("ὅτι",null,null,'strippedAll',true)[0]).toEqual("οτι")
    expect(greekModel.alternateWordEncodings("@Ὅμηρος",null,null,'strippedAll',true)[0]).toEqual("@Ομηρος")
    expect(greekModel.alternateWordEncodings("οὐχ",null,null,'strippedAll',true)[0]).toEqual("ουχ")
    expect(greekModel.alternateWordEncodings("ὑψοῦ",null,null,'strippedAll',true)[0]).toEqual("υψου")
    expect(greekModel.alternateWordEncodings("ὒ",null,null,'strippedAll',true)[0]).toEqual("υ")
    expect(greekModel.alternateWordEncodings("ὔρχα",null,null,'strippedAll',true)[0]).toEqual("υρχα")
    expect(greekModel.alternateWordEncodings("ὕω",null,null,'strippedAll',true)[0]).toEqual("υω")
    expect(greekModel.alternateWordEncodings("οὖρον2",null,null,'strippedAll',true)[0]).toEqual("ουρον2")
    expect(greekModel.alternateWordEncodings("ὗς1",null,null,'strippedAll',true)[0]).toEqual("υς1")
    expect(greekModel.alternateWordEncodings("ὠτώεις",null,null,'strippedAll',true)[0]).toEqual("ωτωεις")
    expect(greekModel.alternateWordEncodings("ὡς",null,null,'strippedAll',true)[0]).toEqual("ως")
    expect(greekModel.alternateWordEncodings("ὤψ",null,null,'strippedAll',true)[0]).toEqual("ωψ")
    expect(greekModel.alternateWordEncodings("ὥρα",null,null,'strippedAll',true)[0]).toEqual("ωρα")
    expect(greekModel.alternateWordEncodings("ὦχρος",null,null,'strippedAll',true)[0]).toEqual("ωχρος")
    expect(greekModel.alternateWordEncodings("ὧρος1",null,null,'strippedAll',true)[0]).toEqual("ωρος1")
    expect(greekModel.alternateWordEncodings("μὴπώποτε",null,null,'strippedAll',true)[0]).toEqual("μηπωποτε")
    expect(greekModel.alternateWordEncodings("καὶ5",null,null,'strippedAll',true)[0]).toEqual("και5")
    expect(greekModel.alternateWordEncodings("ᾄδω",null,null,'strippedAll',true)[0]).toEqual("αδω")
    expect(greekModel.alternateWordEncodings("ᾅδης",null,null,'strippedAll',true)[0]).toEqual("αδης")
    expect(greekModel.alternateWordEncodings("ᾖ",null,null,'strippedAll',true)[0]).toEqual("η")
    expect(greekModel.alternateWordEncodings("ᾗπερ",null,null,'strippedAll',true)[0]).toEqual("ηπερ")
    expect(greekModel.alternateWordEncodings("ᾠδεῖον",null,null,'strippedAll',true)[0]).toEqual("ωδειον")
    expect(greekModel.alternateWordEncodings("ἐγᾦμαι",null,null,'strippedAll',true)[0]).toEqual("εγωμαι")
    expect(greekModel.alternateWordEncodings("ῥᾳθυμία",null,null,'strippedAll',true)[0]).toEqual("ραθυμια")
    expect(greekModel.alternateWordEncodings("ῥᾴθυμος",null,null,'strippedAll',true)[0]).toEqual("ραθυμος")
    expect(greekModel.alternateWordEncodings("ἐλεᾶς",null,null,'strippedAll',true)[0]).toEqual("ελεας")
    expect(greekModel.alternateWordEncodings("θρᾷξ",null,null,'strippedAll',true)[0]).toEqual("θραξ")
    expect(greekModel.alternateWordEncodings("ἀμφοτέρῃ",null,null,'strippedAll',true)[0]).toEqual("αμφοτερη")
    expect(greekModel.alternateWordEncodings("ἐγχρῄζω",null,null,'strippedAll',true)[0]).toEqual("εγχρηζω")
    expect(greekModel.alternateWordEncodings("ῥῆξις",null,null,'strippedAll',true)[0]).toEqual("ρηξις")
    expect(greekModel.alternateWordEncodings("ὁμαρτῇ",null,null,'strippedAll',true)[0]).toEqual("ομαρτη")
    expect(greekModel.alternateWordEncodings("ῥῖψις",null,null,'strippedAll',true)[0]).toEqual("ριψις")
    expect(greekModel.alternateWordEncodings("ῥῶ",null,null,'strippedAll',true)[0]).toEqual("ρω")
    expect(greekModel.alternateWordEncodings("ῥῦμα2",null,null,'strippedAll',true)[0]).toEqual("ρυμα2")
    expect(greekModel.alternateWordEncodings("κωμῳδοποιητής",null,null,'strippedAll',true)[0]).toEqual("κωμωδοποιητης")
    expect(greekModel.alternateWordEncodings("πρῴραθεν",null,null,'strippedAll',true)[0]).toEqual("πρωραθεν")
    expect(greekModel.alternateWordEncodings("ὁμῶλαξ",null,null,'strippedAll',true)[0]).toEqual("ομωλαξ")
    expect(greekModel.alternateWordEncodings("ἡρῷος",null,null,'strippedAll',true)[0]).toEqual("ηρωος")
  })

  it('17 GreekLanguageModel - alternateWordEncodings tonosToOxia', () => {
    let word = 'ἐκπ\u03AFπτω'
    let alt = greekModel.alternateWordEncodings(word)
    expect(alt.length).toEqual(2)
    expect(alt[1]).toEqual('ἐκπ\u1F77πτω')
  })

})
