/* eslint-env jest */
/* eslint-disable no-unused-vars */
import * as Constants from '@/constants.js'
import LMF from '@/language_model_factory.js'
import Feature from '@/feature.js'
import Inflection from '@/inflection.js'
import Logger from '@/logging/logger.js'

describe('greek_language_model.j', () => {
  const logger = Logger.getInstance({ verbose: true })
  logger.warn = jest.fn(() => {})

  let greekModel

  beforeEach(() => {
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
    let alt = greekModel.alternateWordEncodings({word:word})
    expect(alt[0]).toEqual('\u03B1\u03B2\u03B1\u03B1')
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
    expect(logger.warn).toHaveBeenCalledWith('Unable to set grammar: part of speech data is missing or is incorrect', undefined)
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
    expect(greekModel.alternateWordEncodings({word: word, encoding:'strippedDiacritics'})).toEqual(['συνεχης'])
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
    expect(greekModel.alternateWordEncodings({word: "ῥωγάς", encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρωγας")
    expect(greekModel.alternateWordEncodings({word: "ῥᾳθυμέω",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ραθυμεω")
    expect(greekModel.alternateWordEncodings({word: "ῥωπήιον",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρωπηιον")
    expect(greekModel.alternateWordEncodings({word: "ῥυτίς",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρυτις")
    expect(greekModel.alternateWordEncodings({word: "ῥῶπος",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρωπος")
    expect(greekModel.alternateWordEncodings({word: "ῥῆσις",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρησις")
    expect(greekModel.alternateWordEncodings({word: "ῥᾳδιουργός",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ραδιουργος")
    expect(greekModel.alternateWordEncodings({word: "ῥᾳδιούργημα",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ραδιουργημα")
    expect(greekModel.alternateWordEncodings({word: "ὁμογνώμων",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ομογνωμων")
    expect(greekModel.alternateWordEncodings({word: "ἀωρία",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("αωρια")
    expect(greekModel.alternateWordEncodings({word: "ἁψιμαχία",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("αψιμαχια")
    expect(greekModel.alternateWordEncodings({word: "ἄωτον",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("αωτον")
    expect(greekModel.alternateWordEncodings({word: "ἅτε",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ατε")
    expect(greekModel.alternateWordEncodings({word: "ἆρα",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("αρα")
    expect(greekModel.alternateWordEncodings({word: "ἇς",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ας")
    expect(greekModel.alternateWordEncodings({word: "Ἀλέξανδρος",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("Αλεξανδρος")
    expect(greekModel.alternateWordEncodings({word: "ἐκπίτνω",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("εκπιτνω")
    expect(greekModel.alternateWordEncodings({word: "ἑῶμεν",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("εωμεν")
    expect(greekModel.alternateWordEncodings({word: "ἒ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ε")
    expect(greekModel.alternateWordEncodings({word: "ἔωμεν",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("εωμεν")
    expect(greekModel.alternateWordEncodings({word: "ἕωθεν",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("εωθεν")
    expect(greekModel.alternateWordEncodings({word: "ἠῶθεν",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ηωθεν")
    expect(greekModel.alternateWordEncodings({word: "ἡμι",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ημι")
    expect(greekModel.alternateWordEncodings({word: "ἤχημα",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ηχημα")
    expect(greekModel.alternateWordEncodings({word: "ἥττημα",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ηττημα")
    expect(greekModel.alternateWordEncodings({word: "ἦχος",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ηχος")
    expect(greekModel.alternateWordEncodings({word: "ἧχι",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ηχι")
    expect(greekModel.alternateWordEncodings({word: "ἰῶτα2",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ιωτα2")
    expect(greekModel.alternateWordEncodings({word: "ἱππών",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ιππων")
    expect(greekModel.alternateWordEncodings({word: "ἴων",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ιων")
    expect(greekModel.alternateWordEncodings({word: "ἵππουρις",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ιππουρις")
    expect(greekModel.alternateWordEncodings({word: "ἶψ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ιψ")
    expect(greekModel.alternateWordEncodings({word: "οἷπερ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("οιπερ")
    expect(greekModel.alternateWordEncodings({word: "@Ἰώ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("@Ιω")
    expect(greekModel.alternateWordEncodings({word: "@Ἴλιος2",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("@Ιλιος2")
    expect(greekModel.alternateWordEncodings({word: "ὁ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ο")
    expect(greekModel.alternateWordEncodings({word: "ὄψον",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("οψον")
    expect(greekModel.alternateWordEncodings({word: "ὅτι",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("οτι")
    expect(greekModel.alternateWordEncodings({word: "@Ὅμηρος",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("@Ομηρος")
    expect(greekModel.alternateWordEncodings({word: "οὐχ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ουχ")
    expect(greekModel.alternateWordEncodings({word: "ὑψοῦ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("υψου")
    expect(greekModel.alternateWordEncodings({word: "ὒ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("υ")
    expect(greekModel.alternateWordEncodings({word: "ὔρχα",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("υρχα")
    expect(greekModel.alternateWordEncodings({word: "ὕω",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("υω")
    expect(greekModel.alternateWordEncodings({word: "οὖρον2",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ουρον2")
    expect(greekModel.alternateWordEncodings({word: "ὗς1",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("υς1")
    expect(greekModel.alternateWordEncodings({word: "ὠτώεις",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ωτωεις")
    expect(greekModel.alternateWordEncodings({word: "ὡς",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ως")
    expect(greekModel.alternateWordEncodings({word: "ὤψ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ωψ")
    expect(greekModel.alternateWordEncodings({word: "ὥρα",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ωρα")
    expect(greekModel.alternateWordEncodings({word: "ὦχρος",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ωχρος")
    expect(greekModel.alternateWordEncodings({word: "ὧρος1",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ωρος1")
    expect(greekModel.alternateWordEncodings({word: "μὴπώποτε",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("μηπωποτε")
    expect(greekModel.alternateWordEncodings({word: "καὶ5",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("και5")
    expect(greekModel.alternateWordEncodings({word: "ᾄδω",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("αδω")
    expect(greekModel.alternateWordEncodings({word: "ᾅδης",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("αδης")
    expect(greekModel.alternateWordEncodings({word: "ᾖ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("η")
    expect(greekModel.alternateWordEncodings({word: "ᾗπερ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ηπερ")
    expect(greekModel.alternateWordEncodings({word: "ᾠδεῖον",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ωδειον")
    expect(greekModel.alternateWordEncodings({word: "ἐγᾦμαι",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("εγωμαι")
    expect(greekModel.alternateWordEncodings({word: "ῥᾳθυμία",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ραθυμια")
    expect(greekModel.alternateWordEncodings({word: "ῥᾴθυμος",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ραθυμος")
    expect(greekModel.alternateWordEncodings({word: "ἐλεᾶς",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ελεας")
    expect(greekModel.alternateWordEncodings({word: "θρᾷξ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("θραξ")
    expect(greekModel.alternateWordEncodings({word: "ἀμφοτέρῃ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("αμφοτερη")
    expect(greekModel.alternateWordEncodings({word: "ἐγχρῄζω",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("εγχρηζω")
    expect(greekModel.alternateWordEncodings({word: "ῥῆξις",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρηξις")
    expect(greekModel.alternateWordEncodings({word: "ὁμαρτῇ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ομαρτη")
    expect(greekModel.alternateWordEncodings({word: "ῥῖψις",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ριψις")
    expect(greekModel.alternateWordEncodings({word: "ῥῶ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρω")
    expect(greekModel.alternateWordEncodings({word: "ῥῦμα2",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ρυμα2")
    expect(greekModel.alternateWordEncodings({word: "κωμῳδοποιητής",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("κωμωδοποιητης")
    expect(greekModel.alternateWordEncodings({word: "πρῴραθεν",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("πρωραθεν")
    expect(greekModel.alternateWordEncodings({word: "ὁμῶλαξ",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ομωλαξ")
    expect(greekModel.alternateWordEncodings({word: "ἡρῷος",encoding: 'strippedAll', preserveCase: true})[0]).toEqual("ηρωος")
  })

  it('17 GreekLanguageModel - alternateWordEncodings tonosToOxia', () => {
    let word = 'ἐκπ\u03AFπτω'
    expect(greekModel._tonosToOxia(word)).toEqual('ἐκπ\u1F77πτω')
    let alt = greekModel.alternateWordEncodings({word:word})
    expect(alt.length).toEqual(1)
    expect(alt[0]).toEqual('ἐκπ\u1F77πτω')
  })

})
