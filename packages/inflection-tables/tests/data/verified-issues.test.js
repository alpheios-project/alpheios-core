/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'
// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'
import BaseTestHelp from '@tests/data/base-test-help.js'

describe('verified-issues.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
  })

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

  it('1 - issue 262 - ierint, ierunt, iverim, ivissem - Verb Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // ierint

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ierint', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'eo, ire,ivi(ii),itus'
    })
    // ierunt

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ierunt', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'eo, ire,ivi(ii),itus'
    })

    // iverim

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('iverim', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'eo, ire,ivi(ii),itus'
    })

    // ivissem

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ivissem', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'eo, ire,ivi(ii),itus'
    })
  })

  it('2 - issue 227 - δέδια, δεδίῃ, δεδίητον, δεδίητε, δέδιμεν, δέδιτε, ἐδεδίειν - Athematic Perfects - δέδια', async () => {
    let inflectionsViewSet, result

    // δέδια

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδια', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })

    // δεδίῃ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεδίῃ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })

    // δεδίητον

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεδίητον', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })

    // δεδίητε

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεδίητε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })
    // δέδιμεν

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδιμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })

    // δέδιτε

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδιτε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })

    // ἐδεδίειν

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδεδίειν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })
  })

  it('3 - issue 223 - οἶδα - οἶδα: Perfect System', async () => {
    let inflectionsViewSet, result

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἶδα', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'οἶδα: Perfect System',
      paradigmID: 'verbpdgm53',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm63' ]
    })
  })

  it('4 - issue 220 - φῶ, φῇς, φῆτε, φαίη, φαῖμεν, φαῖεν - φημί: Present System', async () => {
    let inflectionsViewSet, result

    // φῶ
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φῶ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'φημί: Present System',
      paradigmID: 'verbpdgm48',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })

    // φῇς
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φῇς', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'φημί: Present System',
      paradigmID: 'verbpdgm48',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })

    // φῆτε
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φῆτε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'φημί: Present System',
      paradigmID: 'verbpdgm48',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })

    // φαίη
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαίη', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'φημί: Present System',
      paradigmID: 'verbpdgm48',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })

    // φαῖμεν
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαῖμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'φημί: Present System',
      paradigmID: 'verbpdgm48',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })

    // φαῖεν
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαῖεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'φημί: Present System',
      paradigmID: 'verbpdgm48',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })
  }, 50000)

  it('5 - issue 219 - ἔθετο - τίθημι: Aorist System Middle', async () => {
    let inflectionsViewSet, result

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔθετο', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: result[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'τίθημι: Aorist System Middle',
      paradigmID: 'verbpdgm31',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('6 - issue 218 - δύναμαι, ἐπίσταμαι - Present System Middle-Passive', async () => {
    let inflectionsViewSet, result

    // δύναμαι
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δύναμαι', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δύναμαι: Present System Middle-Passive',
      paradigmID: 'verbpdgm43',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    // ἐπίσταμαι
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐπίσταμαι', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἵστημι: Present System Middle-Passive',
      paradigmID: 'verbpdgm41',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('7 - issue 210 - ποιῶ, ποιοῦμεν, πλεῖ - Present System Active of Contract Verbs', async () => {
    let inflectionsViewSet, result

    // ποιῶ
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ποιῶ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -έω',
      paradigmID: 'verbpdgm18',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55' ]
    })

    BaseTestHelp.checkParadigm({
      view: result[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -όω',
      paradigmID: 'verbpdgm26',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55' ]
    })

    // ποιοῦμεν
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ποιοῦμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -έω',
      paradigmID: 'verbpdgm18',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55' ]
    })

    BaseTestHelp.checkParadigm({
      view: result[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -όω',
      paradigmID: 'verbpdgm26',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55' ]
    })


    // πλεῖ
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλεῖ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(3)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)',
      paradigmID: 'verbpdgm21',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    BaseTestHelp.checkParadigm({
      view: result[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -έω (monosyllabic stems)',
      paradigmID: 'verbpdgm19',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm54' ]
    })

    BaseTestHelp.checkParadigm({
      view: result[2],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -έω',
      paradigmID: 'verbpdgm18',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55' ]
    })
  })

  it('8 - issue 210 - ἔθετο - ω-Verbs: Present System Middle-Passive table but it\'s also aorist ind. mid.', async () => {
    let inflectionsViewSet, result

    // ἔθετο
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔθετο', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: result[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ω-Verbs: Present System Middle-Passive',
      paradigmID: 'verbpdgm2',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    BaseTestHelp.checkParadigm({
      view: result[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'τίθημι: Aorist System Middle',
      paradigmID: 'verbpdgm31',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

  })

  it('9 - issue 168 - venit - Verb Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // ierint

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('venit', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'veneo, venire,venivi(ii),venitus'
    })
  })

  it('10 - issue 149 - οἷ, οἵ - Greek Pronouns', async () => {
    let inflectionsViewSet, result

    // οἷ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἷ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekArticleView',
      title: 'Article Declension'
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekPersonPronounView',
      title: 'Personal Pronoun Declension'
    })

    // οἵ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἵ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(3)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekArticleView',
      title: 'Article Declension'
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekGenderPronounView',
      title: 'Relative Pronoun Declension'
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekPersonPronounView',
      title: 'Personal Pronoun Declension'
    })
  })

  it('11 - issue 133 - itum, itu - Verb Supine Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // itum

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('itum', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbSupineIrregularView',
      title: 'Verb Supine Conjugation (Irregular)'
    })

    // itu

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('itu', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbSupineIrregularView',
      title: 'Verb Supine Conjugation (Irregular)'
    })
  })

  it('12 - issue 131 - πρόσφυμα, Καλυψώ  - Greek Noun', async () => {
    let inflectionsViewSet, result

    // πρόσφυμα

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('πρόσφυμα', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekNounView'
    })

    // Καλυψώ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('Καλυψώ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekNounView'
    })
  })

  it('13 - issue 122 - nevolo - Latin Verb Conjugation Irregular', async () => {
    let inflectionsViewSet, result

    // πρόσφυμα

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('nevolo', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'volo, velle,volui,-'
    })
  })

  it('14 - issue 846 - ἄγων - Correct full match for paradigm', async () => {
    let inflectionsViewSet, result

    // πρόσφυμα

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄγων', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -άω',
      paradigmID: 'verbpdgm22'
    })

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // ὁρῶ
    expect(renderedTable.rows[1].cells[7].fullMatch).toBeTruthy() // ἑώρων
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeTruthy() // ἑώρων

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ων, -ουσα, -ον (present and future active, uncontracted)',
      paradigmID: 'verbpdgm54'
    })

    renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἄγουσᾰ
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // ἄγων
  })

  it('15 - issue core 195 irregular verbs are constrained by full form', async() => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('sum', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(8)
    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'sum, esse,fui,futurus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)' },
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)' }
      ]
    })
    const irregularViews = inflectionsViewSet.matchingViews.filter(v => v.constructor.name === 'LatinVerbIrregularView')
    irregularViews[0].render()
    expect(irregularViews[0].table.rows[0].cells[0].morphemes.length).toEqual(1)
    expect(irregularViews[0].table.rows[0].cells[0].morphemes[0].value).toEqual('sum')
  })
})