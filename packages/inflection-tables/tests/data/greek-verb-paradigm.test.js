/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'
describe('greek-verb-paradigm.test.js', () => {
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  const locale = "en-US"
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

  it('1 - checked Verb Paradigm1 - βουλεύῃς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλεύῃς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[0])
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ω-Verbs: Present System Active',
      paradigmID: 'verbpdgm1',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm54' ]
    })
  })

  it('2 - checked Verb Paradigm2 - βουλευέσθων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλευέσθων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ω-Verbs: Present System Middle-Passive',
      paradigmID: 'verbpdgm2',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('3 - no matches - checked Verb Paradigm3', async () => {
   
  })

  it('4, 8, 9 - checked Verb Paradigm4, 8, 9 - βουλεύσω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλεύσω', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(3)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Weak (1st) Aorist System Active',
      paradigmID: 'verbpdgm8',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm58' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Future System (Active and Middle) with contraction in -έω',
      paradigmID: 'verbpdgm4',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55', 'verbpdgm65' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Weak (1st) Aorist System Middle',
      paradigmID: 'verbpdgm9',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it.skip('5 - no matchesx - checked Verb Paradigm5', async () => {
  })

  it('6 - checked Verb Paradigm6 - ἀγάγοις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγάγοις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Strong (2nd) Aorist System Active',
      paradigmID: 'verbpdgm6',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm57' ]
    })
  })

  it('7 - checked Verb Paradigm7 - ἀγαγοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαγοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Strong (2nd) Aorist System Middle',
      paradigmID: 'verbpdgm7',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('10 - checked Verb Paradigm10 - βουλευθῇς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλευθῇς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Aorist Passive System',
      paradigmID: 'verbpdgm10',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm60' ]
    })
  })

  it('11 - checked Verb Paradigm11 - λελοίπῃ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λελοίπῃ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Perfect Active System',
      paradigmID: 'verbpdgm11',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm63' ]
    })
  })

  it('12 - checked Verb Paradigm12 - γέγραψαι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γέγραψαι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Perfect System Middle-Passive: indicative, infinitive, participle',
      paradigmID: 'verbpdgm12',
      hasSuppParadigms: false
    })
  })

  it('13, 14 - checked Verb Paradigm13, 14 - μεμνῶμαι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μεμνῶμαι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Perfect System Middle-Passive: periphrastic subjunctive, optative, imperative',
      paradigmID: 'verbpdgm13',
      hasSuppParadigms: false
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Perfect System Middle-Passive: simple subjunctive, optative, imperative',
      paradigmID: 'verbpdgm14',
      hasSuppParadigms: false
    })
  })

  it('15 - checked Verb Paradigm15 - ἐγέγραψο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐγέγραψο', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Pluperfect Middle-Passive Indicative',
      paradigmID: 'verbpdgm15',
      hasSuppParadigms: false
    })
  })

  it('16 - checked Verb Paradigm16 - τεθνήξεις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τεθνήξεις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Future Perfect Indicative, Infinitive, Participle',
      paradigmID: 'verbpdgm16',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('17 - checked Verb Paradigm17 - ἕσταθι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἕσταθι', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - ἵστημι (in addition to forms from ἕστηκα)',
      paradigmID: 'verbpdgm17',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })
  })

  it('17b - checked Verb Paradigm17b - τέθνατον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τέθνατον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - θνῄσκω (in addition to forms from τέθνηκα)',
      paradigmID: 'verbpdgm17b',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })
  })

  it('17c - checked Verb Paradigm17c - δέδιμεν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδιμεν', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)',
      paradigmID: 'verbpdgm17c',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm64' ]
    })
  })

  it('18 - checked Verb Paradigm18 - ποιεῖτον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ποιεῖτον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -έω',
      paradigmID: 'verbpdgm18',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55' ]
    })
  })

  it('19 - checked Verb Paradigm19 - ἔπλει', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔπλει', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -έω (monosyllabic stems)',
      paradigmID: 'verbpdgm19',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm54' ]
    })
  })

  it('20, 27 - checked Verb Paradigm20, 27 - ἐποιοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐποιοῦ', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -έω',
      paradigmID: 'verbpdgm20',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -όω',
      paradigmID: 'verbpdgm27',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('20, 21 - checked Verb Paradigm 20, 21 - ἐδέοντο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδέοντο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -έω',
      paradigmID: 'verbpdgm20',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)',
      paradigmID: 'verbpdgm21',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('22 - checked Verb Paradigm 22 - ὁρᾷς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὁρᾷς', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -άω',
      paradigmID: 'verbpdgm22',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm56' ]
    })
  })

  it('22, 23 - checked Verb Paradigm 22, 23 - χρῷμεν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρῷμεν', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -άω',
      paradigmID: 'verbpdgm22',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm56' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -άω (with η contraction)',
      paradigmID: 'verbpdgm23',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm56' ]
    })
  })

  it('24 - checked Verb Paradigm 24 - ἑωρᾶσθον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἑωρᾶσθον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -άω',
      paradigmID: 'verbpdgm24',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('24, 25 - checked Verb Paradigm 24, 25 - χρῷντο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρῷντο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -άω  (with η contraction)',
      paradigmID: 'verbpdgm25',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -άω',
      paradigmID: 'verbpdgm24',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('26 - checked Verb Paradigm 26 - δηλοῖς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δηλοῖς', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -όω',
      paradigmID: 'verbpdgm26',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55' ]
    })
  })

  it('27 - checked Verb Paradigm 27 - δηλοῦσθον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δηλοῦσθον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -όω',
      paradigmID: 'verbpdgm27',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('28 - checked Verb Paradigm 28 - ἐτιθέτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐτιθέτην', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'τίθημι: Present System Active',
      paradigmID: 'verbpdgm28',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm60' ]
    })
  })

  it('29 - checked Verb Paradigm 29 - τιθέσθων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τιθέσθων', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'τίθημι: Present System Middle-Passive',
      paradigmID: 'verbpdgm29',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('30 - checked Verb Paradigm 30 - ἔθεσαν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔθεσαν', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'τίθημι: Aorist System Active',
      paradigmID: 'verbpdgm30',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm60' ]
    })
  })

  it('31 - checked Verb Paradigm 31 - ἐθέμεθα', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐθέμεθα', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'τίθημι: Aorist System Middle',
      paradigmID: 'verbpdgm31',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('32 - checked Verb Paradigm 32 - ἵην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵην', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἵημι: Present System Active',
      paradigmID: 'verbpdgm32',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm60' ]
    })
  })

  it('33 - checked Verb Paradigm 33 - ἵεσθον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵεσθον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἵημι: Present System Middle-Passive',
      paradigmID: 'verbpdgm33',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it.skip('34 - no matches - checked Verb Paradigm 34', async () => {
  })

  it.skip('35 - no matches - checked Verb Paradigm 35', async () => {
  })

  it('36 - checked Verb Paradigm 36 - διδῷ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('διδῷ', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δίδωμι: Present System Active',
      paradigmID: 'verbpdgm36',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm61' ]
    })
  })

  it('37 - checked Verb Paradigm 37 - διδοῖο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('διδοῖο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δίδωμι: Present System Middle-Passive',
      paradigmID: 'verbpdgm37',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('38 - checked Verb Paradigm 38 - ἔδοτον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔδοτον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δίδωμι: Aorist System Active',
      paradigmID: 'verbpdgm38',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm61' ]
    })
  })

  it('39 - checked Verb Paradigm 39 - δῶται', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δῶται', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(3)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δίδωμι: Aorist System Middle',
      paradigmID: 'verbpdgm39',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('40, 22 - checked Verb Paradigm 40, 22 - ἱστάτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἱστάτην', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἵστημι: Present System Active',
      paradigmID: 'verbpdgm40',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -άω',
      paradigmID: 'verbpdgm22',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm56' ]
    })
  })

  it('41 - checked Verb Paradigm 41 - ἵσταται', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵσταται', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἵστημι: Present System Middle-Passive',
      paradigmID: 'verbpdgm41',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('42 - checked Verb Paradigm 42 - ἐστήτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐστήτην', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἵστημι: (Athematic/Intransitive) Aorist System Active',
      paradigmID: 'verbpdgm42',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })
  })

  it('43 - checked Verb Paradigm 43 - ἐδύνατο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδύνατο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δύναμαι: Present System Middle-Passive',
      paradigmID: 'verbpdgm43',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('43b - checked Verb Paradigm 43b - ἐπίστησθε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐπίστησθε', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἐπίσταμαι: Present System Middle-Passive',
      paradigmID: 'verbpdgm43b',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('44 - checked Verb Paradigm 44 - ἐδείκνῠτε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδείκνῠτε', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δείκνυμι: Present System Active',
      paradigmID: 'verbpdgm44',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm62' ]
    })
  })

  it('45 - checked Verb Paradigm 45 - δείκνῠται', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δείκνῠται', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δείκνυμι: Present System Middle-Passive',
      paradigmID: 'verbpdgm45',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })
  })

  it('46 - checked Verb Paradigm 46 - ἔστων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔστων', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'εἰμί (be): Present System and Future',
      paradigmID: 'verbpdgm46',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm57', 'verbpdgm65' ]
    })
  })

  it('47 - checked Verb Paradigm 47 - ἴτων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἴτων', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(3)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'εἶμι (go): Present System',
      paradigmID: 'verbpdgm47',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm57' ]
    })
  })

  it('48 - checked Verb Paradigm 48 - φαίης', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαίης', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'φημί: Present System',
      paradigmID: 'verbpdgm48',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })
  })

  it('49 - checked Verb Paradigm 49 - βήτω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βήτω', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'βαίνω: Aorist System Active',
      paradigmID: 'verbpdgm49',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm59' ]
    })
  })

  it('50, 51 - checked Verb Paradigm 50, 51 - γνῶτον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γνῶτον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'γιγνώσκω: Aorist System Active',
      paradigmID: 'verbpdgm50',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm61' ]
    })

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἁλίσκομαι: Aorist System',
      paradigmID: 'verbpdgm51',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm61' ]
    })
  })

  it('52 - checked Verb Paradigm 52 - δῦθι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δῦθι', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δύω: Aorist System Active',
      paradigmID: 'verbpdgm52',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm62' ]
    })
  })

  it('53 - checked Verb Paradigm 53 - ᾔδεις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ᾔδεις', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'οἶδα: Perfect System',
      paradigmID: 'verbpdgm53',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm63' ]
    })
  })

})

