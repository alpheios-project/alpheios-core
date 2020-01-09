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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἀγούσης
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ἄγοντος
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // ἄγοντος
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // μενοῦσᾰ
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // μενῶν
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // μενοῦν
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // μενοῦν
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ὁρῶντε
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // ὁρώσᾱ
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // λιποῦσᾰ
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // λιπών
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // λιπόν
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // λιπόν
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // λύσᾱσᾰν
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // λύσαντᾰ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // λύσαντᾰ
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // λύσαντᾰ
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // ἱστάσᾱ
    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // ἱστάντε
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeTruthy() // ἱστάντε
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // τιθέντος
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // λυθέντος
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeTruthy() // λυθέντος
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // διδούσαιν
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // διδόντοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // διδόντοιν
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // δεικνύντι
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // δεικνύντᾰ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // δεικνύντᾰ
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // δεικνύντᾰ
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // λελοιπυιῶν
    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // λελοιπότων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // λελοιπότων
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // ἑστῶτες
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // ἑστῶσαι
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // πεμπομένᾱς
    expect(renderedTable.rows[11].cells[2].fullMatch).toBeTruthy() // πεμπομένους
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // γεγραμμέναιν
    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // γεγραμμένοιν
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // γεγραμμένοιν
  })
})

