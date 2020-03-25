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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // βουλεύεις
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // βουλεύῃς
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // βουλευοίσθην
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeTruthy() // βουλευέσθων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // βουλευέσθων
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // ἐβούλευσα
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy() // βουλεύσω

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Future System (Active and Middle) with contraction in -έω',
      paradigmID: 'verbpdgm4',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm55', 'verbpdgm65' ]
    })

    renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // βαλοίην (βαλοῖμι)
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // βαλῶ

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Weak (1st) Aorist System Middle',
      paradigmID: 'verbpdgm9',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // βουλεύσῃ
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ἐβουλεύσω
  })

  it('5 - no matchesx - checked Verb Paradigm5', async () => {
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἀγάγῃς
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // ἀγάγοις

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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἀγάγοιο
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἀγαγοῦ
  })

  it('7-1 - checked Verb Paradigm7 - ἀγαγοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγάγηται', Constants.LANG_GREEK)

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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἠγάγετο
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // ἀγάγηται
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἐβουλεύθης
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // βουλευθῇς
  })

  it('10-1 - checked Verb Paradigm10 - ἐβουλεύθην, βουλευθῶ, βουλευθείην, ἐγράφην', async () => {

    // ἐβουλεύθην βουλευθῶ  βουλευθείην - ἐγράφην
    let inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐβουλεύθην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Aorist Passive System',
      paradigmID: 'verbpdgm10'
    })

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // ἐβουλεύθην
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy()

    /// βουλευθῶ
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλευθῶ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Aorist Passive System',
      paradigmID: 'verbpdgm10'
    })

    renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy() // βουλευθῶ
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy()

    /// βουλευθείην
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλευθείην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Aorist Passive System',
      paradigmID: 'verbpdgm10'
    })

    renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // βουλευθείην
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy()

    /// ἐγράφην
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐγράφην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Aorist Passive System',
      paradigmID: 'verbpdgm10'
    })

    renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy()
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeTruthy() //ἐγράφην
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // λέλοιπε(ν)
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // λελοίπῃ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // λελοιπὼς (-υῖα, -ὸς) ᾖ
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // λέλυμαι
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // λέλυσαι
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // πέπεισαι
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // γέγραψαι

    expect(inflectionsViewSet.matchingViews[0].wideSubTables.length).toEqual(1)

    renderedTable = inflectionsViewSet.matchingViews[0].render().wideSubTables[0]

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // πέπραγμαι
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // πέπραξαι
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἤγγελσαι
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ———

  })


it('12-1 - checked Verb Paradigm12 - λελύσθαι', async () => {
  const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λελύσθαι', Constants.LANG_GREEK)

  expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
  expect(inflectionsViewSet.matchingViews.length).toEqual(1)

  BaseTestHelp.checkParadigm({
    view: inflectionsViewSet.matchingViews[0],
    viewName: 'GreekVerbParadigmView',
    viewTitle: 'Perfect System Middle-Passive: indicative, infinitive, participle',
    paradigmID: 'verbpdgm12',
    hasSuppParadigms: false
  })

  let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

  expect(renderedTable.rows[10].cells[2].fullMatch).toBeTruthy() // λελύσθαι
  expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // πεπεῖσθαι
  expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // γεγράφθαι

  expect(inflectionsViewSet.matchingViews[0].wideSubTables.length).toEqual(1)

  renderedTable = inflectionsViewSet.matchingViews[0].render().wideSubTables[0]

  expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // πεπρᾶχθαι
  expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // ἠγγέλθαι
  expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // πεφάνθαι

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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // λελυμένος (-η) εἴην
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // λελυμένος (-η) ὦ

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Perfect System Middle-Passive: simple subjunctive, optative, imperative',
      paradigmID: 'verbpdgm14',
      hasSuppParadigms: false
    })

    renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // μεμνῄμην
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // μεμνῶμαι
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἐλελύκης
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἐλέλυσο
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἐπέπεισο
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἐγέγραψο

    expect(renderedTable.rows[12].cells[2].fullMatch).toBeFalsy() // ἐπέπραξο
    expect(renderedTable.rows[12].cells[3].fullMatch).toBeFalsy() // ἤγγελσο
    expect(renderedTable.rows[12].cells[4].fullMatch).toBeFalsy() // ———
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // λελύσῃ
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // λελυκὼς (-υῖα) ἔσῃ
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // τεθνήξεις
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἕσταίης
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἕσταθι
  })

  it('17-1 - checked Verb Paradigm17 - ἑστάτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἑστάτην', Constants.LANG_GREEK)
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // ἑστάτην
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // ἑστῆτον
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeTruthy() // ἑστάτην
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // τεθναίης
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // τέθνατον
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // δέδια
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // δεδίω

    expect(inflectionsViewSet.matchingViews[0].wideSubTables.length).toEqual(1)

    renderedTable = inflectionsViewSet.matchingViews[0].render().wideSubTables[0]

    expect(renderedTable.rows[1].cells[1].fullMatch).toBeFalsy() // δεδιώς, δεδιυῖᾰ, δεδιός (see declension)
    expect(renderedTable.rows[0].cells[1].fullMatch).toBeTruthy() // δεδιέναι
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // ποιῆτον
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // ποιῆτον

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // ποιεῖτον
    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // ποιεῖτον
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // ποιοῖτον
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeTruthy() // (ποιοίητον)
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // ποιεῖτον
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeTruthy() // ἐποιεῖτον
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // πλέοι
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // πλείτω

    expect(renderedTable.rows[3].cells[6].fullMatch).toBeTruthy() // ἔπλει
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // ποιοῦ
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeTruthy() // ἐποιοῦ

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -όω',
      paradigmID: 'verbpdgm27',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // δηλοῦ
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeTruthy() // ἐδηλοῦ
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ποιείσθων
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeTruthy() // ἐποιοῦντο

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)',
      paradigmID: 'verbpdgm21',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // δείσθων
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeTruthy() // ἐδέοντο
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // (ὁρῷς)
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ὁρᾷς
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // ὁρᾷς
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // ὁρῶμεν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // ὁρῷμεν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeTruthy() // (ὁρῴημεν)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -άω (with η contraction)',
      paradigmID: 'verbpdgm23',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm56' ]
    })

    renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // χρῶμεν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // χρῷμεν
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // ὁρᾶσθον
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // ἑωρᾶσθον
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // χρῶνται
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // χρῷντο

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Middle-Passive of Contract Verbs in -άω',
      paradigmID: 'verbpdgm24',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ὁρῶνται
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // ὁρῷντο
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[6].fullMatch).toBeFalsy() // δήλου
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // δηλοῖς
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // δηλοῖς
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // (δηλοῖς)
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // δηλοίης
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // δηλοῦμαι
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // δηλοῦσθον
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeTruthy() // δηλοῦσθον
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // ἐδηλοῦσθον
    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // δηλοῦσθον
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // τίθημι
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeTruthy() // ἐτιθέτην
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // τίθενται
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // τιθέσθων
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // θῶσῐ(ν)
    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // ἔθεσαν
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // θώμεθα
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // ἐθέμεθα
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἱῶ
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeTruthy() // ἵην
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // ἱῆσθον
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // ἵεσθον
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // ἵεσθον
    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // ἵεσθον
  })

  it('34 - no matches - checked Verb Paradigm 34', async () => {
  })

  it('35 - no matches - checked Verb Paradigm 35', async () => {
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // 	δίδωσι(ν)
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // διδῷ
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // διδῷ
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // διδοῖο
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // δῶτον
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // ἔδοτον
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

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἔδοτο
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // δῶται
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

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // ἱστάτων
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeTruthy() // ἱστάτην

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'Present System Active of Contract Verbs in -άω',
      paradigmID: 'verbpdgm22',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm56' ]
    })

    renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[5].cells[6].fullMatch).toBeFalsy() // ὁράτων
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeTruthy() // ἑωράτην
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἱστῆται
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // ἵσταται
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // στῆτον
    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // ἐστήτην
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // δυνάσθω
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeTruthy() // ἐδύνατο
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // ἐπίστασθε
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // ἐπίστησθε
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // δείκνῠτε
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeTruthy() // ἐδείκνῠτε
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // δεικνύηται
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // δείκνῠται
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // εἴησαν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeTruthy() // ἔστων
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

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // ἰοίτην
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeTruthy() // ἴτων
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // φῇς
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // φαίης
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // βαίη
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeTruthy() // βήτω
  })

  it('50 - checked Verb Paradigm 50 - γνῶτον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γνῶτον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'γιγνώσκω: Aorist System Active',
      paradigmID: 'verbpdgm50',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm61' ]
    })

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // γνοίητον
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // ἔγνωτον
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // γνῶτον
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // γνῶτον
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // γνῶτον

  })

  it('51 - checked Verb Paradigm 50 - ἑά̄λων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἑά̄λων', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ἁλίσκομαι: Aorist System',
      paradigmID: 'verbpdgm51',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm61' ]
    })

    let renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy()
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // δύοις
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // δῦθι
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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[6].fullMatch).toBeFalsy() // ἴσθι
    expect(renderedTable.rows[2].cells[7].fullMatch).toBeTruthy() // ᾔδησθα
    expect(renderedTable.rows[2].cells[8].fullMatch).toBeTruthy() // ᾔδεις
  })


  it('54 - checked Verb Paradigm 11 - εἷκα', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('εἷκα', Constants.LANG_GREEK)

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

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy()
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy()

  })

  it('55 - checked Verb Paradigm 12 - εἷμαι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('εἷμαι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: "Perfect System Middle-Passive: indicative, infinitive, participle",
      paradigmID: 'verbpdgm12',
      hasSuppParadigms: false
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy()
  })

  it('56 - checked Verb Paradigm 39 - ἐπτάμην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐπτάμην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'δίδωμι: Aorist System Middle',
      paradigmID: 'verbpdgm39',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm65' ]
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable
    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // no match, b/c of tense

  })

})
