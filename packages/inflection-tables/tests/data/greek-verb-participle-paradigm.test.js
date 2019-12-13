/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'
import BaseTestHelp from '@tests/data/base-test-help.js'
// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

describe('greek-verb-participle-paradigm.test.js', () => {
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


  it('54 - checked Verb Particile Paradigm54 - ἄγοντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄγοντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ων, -ουσα, -ον (present and future active, uncontracted)',
      paradigmID: 'verbpdgm54',
      hasSuppParadigms: false
    })
  })

  it('55 - checked Verb Particile Paradigm55 - μενοῦν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μενοῦν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ῶν, -οῦσα, -οῦν (present and future active, ε- and ο-contract)',
      paradigmID: 'verbpdgm55',
      hasSuppParadigms: false
    })
  })

  it('56 - checked Verb Particile Paradigm56 - ὁρώσᾱ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὁρώσᾱ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ῶν, -ῶσα, -ῶν (present and future active, α-contract)',
      paradigmID: 'verbpdgm56',
      hasSuppParadigms: false
    })
  })

  it('57 - checked Verb Particile Paradigm57 - λιπόν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λιπόν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0], 
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ών, -οῦσα, -όν (strong aorist active; present of εἰμί and εἶμι)',
      paradigmID: 'verbpdgm57',
      hasSuppParadigms: false
    })
  })

  it('58 - checked Verb Particile Paradigm58 - λύσαντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λύσαντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ᾱς, -ᾶσα, -αν (weak aorist active)',
      paradigmID: 'verbpdgm58',
      hasSuppParadigms: false
    })

  })

  it('59 - checked Verb Particile Paradigm59 - ἱστάντε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἱστάντε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -άς, -ᾶσα, -άν (μι-verb present and aorist active)',
      paradigmID: 'verbpdgm59',
      hasSuppParadigms: false
    })

  })

  it('60 - checked Verb Particile Paradigm60 - λυθέντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λυθέντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -είς, -εῖσα, -έν',
      paradigmID: 'verbpdgm60',
      hasSuppParadigms: false
    })

  })

  it('61 - checked Verb Particile Paradigm61 - διδόντοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('διδόντοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ούς, -οῦσᾰ, -όν (μι-verb active)',
      paradigmID: 'verbpdgm61',
      hasSuppParadigms: false
    })

  })

  it('62 - checked Verb Particile Paradigm62 - δεικνύντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεικνύντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ύς, -ῦσᾰ, -ύν (μι-verb active)',
      paradigmID: 'verbpdgm62',
      hasSuppParadigms: false
    })
  })

  it('63 - checked Verb Particile Paradigm63 - λελοιπότων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λελοιπότων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ώς, -υῖᾰ, -ός (perfect active)',
      paradigmID: 'verbpdgm63',
      hasSuppParadigms: false
    })

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
  })

  it('64 - checked Verb Particile Paradigm64 - ἑστῶσαι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἑστῶσαι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -ώς, -ῶσα, -ός (some athematic perfects)',
      paradigmID: 'verbpdgm64',
      hasSuppParadigms: false
    }) 
  })

  it('65 - checked Verb Particile Paradigm65 - πεμπομένους', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πεμπομένους', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -μενος, -μένη, -μενον (all middle-passive and middle except perfect)',
      paradigmID: 'verbpdgm65',
      hasSuppParadigms: false
    })
  })

  it('66 - checked Verb Particile Paradigm66 - γεγραμμένοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γεγραμμένοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParticipleParadigmView',
      viewTitle: 'Participles in -μένος, -μένη, -μένον (perfect middle-passive)',
      paradigmID: 'verbpdgm66',
      hasSuppParadigms: false
    })

  })
})

