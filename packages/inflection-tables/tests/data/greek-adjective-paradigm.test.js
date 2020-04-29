/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

describe('greek-adjective-paradigm.test.js', () => {

  // console.error = function () {}
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

  it('1-1 - checked Adjective1 - ἀξίου', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    // console.info('renderedTable - ', renderedTable.rows[2].cells)
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // ἀξίου
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἀξίου

    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἀγαθοῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἀγαθῆς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // ἀγαθοῦ
  })

  it('1-2 - checked Adjective1 - ἀξίοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // ἀξίοιν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ἀξίαιν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // ἀξίοιν

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἀγαθοῖν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeFalsy() // ἀγαθαῖν
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeFalsy() // ἀγαθοῖν

  })

  it('1-3 - checked Adjective1 - ἀξίους', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίους', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[12].cells[2].fullMatch).toBeTruthy() // ἀξίους
    expect(renderedTable.rows[12].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[12].cells[4].fullMatch).toBeFalsy() // ἄξιᾰ

    expect(renderedTable.rows[12].cells[5].fullMatch).toBeFalsy() // ἀγαθούς
    expect(renderedTable.rows[12].cells[6].fullMatch).toBeFalsy() // ἀγαθούς
    expect(renderedTable.rows[12].cells[7].fullMatch).toBeFalsy() // ἀγαθά
  })

  it('1-4 - checked Adjective1 - ἀξίᾱν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίᾱν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(6)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[5],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[5].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ἄξιον
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // ἀξίᾱν
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // ἀγαθόν
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeFalsy() // ἀγαθήν
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeFalsy() // ἀγαθόν
  })

  it('1-5 - checked Adjective1 - ἀξίων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[5],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[5].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeTruthy() // ἄξιον
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // ἀξίᾱν
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // ἄξιον

    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // ἀγαθόν
    expect(renderedTable.rows[10].cells[6].fullMatch).toBeFalsy() // ἀγαθήν
    expect(renderedTable.rows[10].cells[7].fullMatch).toBeFalsy() // ἀγαθόν
  })

  it('1-6 - checked Adjective1 - ἀξίω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίω', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // ἀξίου
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἀξίου

    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἀγαθοῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἀγαθῆς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // ἀγαθοῦ

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ἀξίω
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // ἀξίᾱ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // ἀξίω

    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // ἀγαθώ
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeFalsy() // ἀγαθά
    expect(renderedTable.rows[7].cells[7].fullMatch).toBeFalsy() // ἀγαθώ
  })

  it('1-7 - checked Adjective1 - ἀξίοις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίοις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeTruthy() // ἀξίοις
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // ἀξίαις
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeTruthy() // ἀξίοις

    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // ἀγαθοῖς
    expect(renderedTable.rows[11].cells[6].fullMatch).toBeFalsy() // ἀγαθαῖς
    expect(renderedTable.rows[11].cells[7].fullMatch).toBeFalsy() // ἀγαθοῖς
  })

  it('1-8 - checked Adjective1 - ἀγαθοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἀξίου
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ἀξίου

    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // ἀγαθοῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἀγαθῆς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeTruthy() // ἀγαθοῦ
  })

  it('1-9 - checked Adjective1 - ἀγαθοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἀξίοιν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ἀξίαιν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // ἀξίοιν

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // ἀγαθοῖν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeFalsy() // ἀγαθαῖν
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeTruthy() // ἀγαθοῖν
  })

  it('1-10 - checked Adjective1 - ἀγαθήν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθήν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ἄξιον
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // ἀξίᾱν
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // ἀγαθόν
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeTruthy() // ἀγαθήν
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeFalsy() // ἀγαθόν
  })

  it('1-11 - checked Adjective1 - ἀγαθῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ἄξιον
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // ἀξίᾱν
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[10].cells[5].fullMatch).toBeTruthy() // ἀγαθόν
    expect(renderedTable.rows[10].cells[6].fullMatch).toBeTruthy() // ἀγαθήν
    expect(renderedTable.rows[10].cells[7].fullMatch).toBeTruthy() // ἀγαθόν
  })

  it('1-12 - checked Adjective1 - ἀγαθῷ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθῷ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ἀξίῳ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // ἀξίᾳ
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // ἀξίῳ

    expect(renderedTable.rows[4].cells[5].fullMatch).toBeTruthy() // ἀγαθῷ
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeFalsy() // ἀγαθῇ
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeTruthy() // ἀγαθῷ
  })

  it('1-13 - checked Adjective1 - ἀγαθά', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθά', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἄξιος
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἀξίᾱ
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // ἀγαθός
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeTruthy() // ἀγαθή
    expect(renderedTable.rows[2].cells[7].fullMatch).toBeFalsy() // ἀγαθόν

    expect(renderedTable.rows[6].cells[6].fullMatch).toBeTruthy() // ἀγαθή
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeTruthy() // ἀγαθά
    expect(renderedTable.rows[9].cells[7].fullMatch).toBeTruthy() // ἀγαθά
    expect(renderedTable.rows[12].cells[7].fullMatch).toBeTruthy() // ἀγαθά
  })

  it('2-1 - checked Adjective2 - ἀδίκου', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀδίκου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ἀδίκου
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // ἀδίκου

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἀδίκῳ
  })

  it('2-2 - checked Adjective2 - ἀδίκων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀδίκων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeTruthy() // ἀδίκων
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeTruthy() // ἀδίκων

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ἀδίκοις
  })

  it('2-3 - checked Adjective2 - ἀδίκοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀδίκοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ἀδίκοιν
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // ἀδίκοιν

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἄδικοι
  })

  it('2-4 - checked Adjective2 - ἄδικᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄδικᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἄδικοι
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // ἄδικᾰ

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // ἀδίκους
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeTruthy() // ἀδίκους
  })

  it('3-1 - checked Adjective3 - ἀληθοῦς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀληθοῦς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ἀληθοῦς
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // ἀδίκου
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // σώφρονος
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // σώφρονος
  })

  it('3-2 - checked Adjective3 - ἀληθεῖς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀληθεῖς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // ἀληθεῖς
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ἀληθῆ
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // σώφρονες
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // σώφρονᾰ

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeTruthy() // ἀληθεῖς
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // ἀληθῆ
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeFalsy() // σώφρονᾰς
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // σώφρονᾰ
  })

  it('3-3 - checked Adjective3 - ἀληθές', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀληθές', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // ἀληθής
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy() // ἀληθές
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ἀληθής
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // ἀληθές

    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // ἀληθές
    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // ἀληθές
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // ἀληθές
  })

  it('3-4 - checked Adjective3 - ἀληθοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀληθοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ἀληθοῖν
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // ἀληθοῖν
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // σωφρόνοιν
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // σωφρόνοιν
  })

  it('3-5 - checked Adjective3 - σώφρων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('σώφρων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // ἀληθής
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἀληθές
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // ἀληθής
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // ἀληθές
  })

  it('3-6 - checked Adjective3 - σώφρονᾰς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('σώφρονᾰς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // ἀληθεῖς
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // ἀληθῆ
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeTruthy() // σώφρονᾰς
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // σώφρονᾰ
  })

  it('3-7 - checked Adjective3 - σώφρονε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('σώφρονε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // ἀληθεῖ
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // ἀληθεῖ
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // σώφρονε
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeTruthy() // σώφρονε
  })

  it('3-8 - checked Adjective3 - σώφρονᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('σώφρονᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ἀληθῆ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // ἀληθές
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // σώφρονᾰ
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // σῶφρον

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // σώφρονᾰ
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeTruthy() // σώφρονᾰ
  })

  it('4-1 - checked Adjective4 - ἡδέος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡδέος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // ἡδέος
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἡδείᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἡδέος
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // μέλανος
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // μελαίνης
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // μέλανος

  })

  it('4-2 - checked Adjective4 - ἡδέοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡδέοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // ἡδέοιν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ἡδείαιν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // ἡδέοιν
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // μελάνοιν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeFalsy() // μελαίναιν
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeFalsy() // μελάνοιν

  })

  it('4-3 - checked Adjective4 - ἡδεῖᾰν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡδεῖᾰν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ἡδέοιν
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // ἡδείαιν
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // ἡδέοιν
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // μελάνοιν
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeFalsy() // μελαίναιν
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeFalsy() // μελάνοιν

  })

  it('4-4 - checked Adjective4 - ἡδείαις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡδείαις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // ἡδέσι(ν)
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeTruthy() // ἡδείαις
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeFalsy() // ἡδέσι(ν)
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // μέλασι(ν)
    expect(renderedTable.rows[11].cells[6].fullMatch).toBeFalsy() // μελαίναις
    expect(renderedTable.rows[11].cells[7].fullMatch).toBeFalsy() // μέλασι(ν)
  })

  it('4-5 - checked Adjective4 - ἡδύ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡδύ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἡδύς
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἡδεῖᾰ
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // ἡδύ
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // μέλας
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeFalsy() // μέλαινᾰ
    expect(renderedTable.rows[2].cells[7].fullMatch).toBeFalsy() // μέλαν

    expect(renderedTable.rows[5].cells[4].fullMatch).toBeTruthy() // ἡδύ
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // ἡδύ
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // ἡδύ
  })

  it('4-6 - checked Adjective4 - ἡδέᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡδέᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἡδύς
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // ἡδεῖᾰ
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἡδύ
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // μέλας
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeFalsy() // μέλαινᾰ
    expect(renderedTable.rows[2].cells[7].fullMatch).toBeFalsy() // μέλαν

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeTruthy() // ἡδεῖᾰ
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // ἡδεῖᾰ
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeTruthy() // ἡδεῖᾰ
    expect(renderedTable.rows[12].cells[4].fullMatch).toBeTruthy() // ἡδεῖᾰ
  })

  it('4-7 - checked Adjective4 - μέλανι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μέλανι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ἡδεῖ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // ἡδείᾳ
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // ἡδεῖ
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeTruthy() // μέλανι
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeFalsy() // μελαίνῃ
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeTruthy() // μέλανι
  })

  it('4-8 - checked Adjective4 - μελάνοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μελάνοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἡδέοιν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ἡδείαιν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // ἡδέοιν
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // μελάνοιν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeFalsy() // μελαίναιν
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeTruthy() // μελάνοιν
  })

  it('4-9 - checked Adjective4 - μελαίνης', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μελαίνης', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἡδέος
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἡδείᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ἡδέος
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // μέλανος
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeTruthy() // μελαίνης
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // μέλανος
  })

  it('4-10 - checked Adjective4 - μελαίναις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μελαίναις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // ἡδέσι(ν)
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // ἡδείαις
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeFalsy() // ἡδέσι(ν)
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // μέλασι(ν)
    expect(renderedTable.rows[11].cells[6].fullMatch).toBeTruthy() // μελαίναις
    expect(renderedTable.rows[11].cells[7].fullMatch).toBeFalsy() // μέλασι(ν)
  })

  it('4-11 - checked Adjective4 - μέλαν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μέλαν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // ἡδύ
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // ἡδεῖᾰ
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // ἡδύ
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeTruthy() // μέλαν
    expect(renderedTable.rows[6].cells[6].fullMatch).toBeFalsy() // μέλαινᾰ
    expect(renderedTable.rows[6].cells[7].fullMatch).toBeTruthy() // μέλαν

    expect(renderedTable.rows[5].cells[7].fullMatch).toBeTruthy() // μέλαν
    expect(renderedTable.rows[2].cells[7].fullMatch).toBeTruthy() // μέλαν
  })

  it('4-12 - checked Adjective4 - μέλανᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μέλανᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ἡδύν
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // ἡδεῖᾰν
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // ἡδύ
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeTruthy() // μέλανᾰ
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeFalsy() // μέλαινᾰν
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeFalsy() // μέλαν

    expect(renderedTable.rows[9].cells[7].fullMatch).toBeTruthy() // μέλανᾰ
    expect(renderedTable.rows[12].cells[7].fullMatch).toBeTruthy() // μέλανᾰ
  })

  it('5-1 - checked Adjective5 - χαρίεντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χαρίεντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // χαρίεντος
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // χαριέσσης
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // χαρίεντος
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // παντός
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // πάσης
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // παντός

  })

  it('5-2 - checked Adjective5 - χαρίεντε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χαρίεντε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // χαρίεντε
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // χαριέσσᾱ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // χαρίεντε
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() //
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeFalsy() // μέλαινᾰν
    expect(renderedTable.rows[7].cells[7].fullMatch).toBeFalsy() //

  })

  it('5-3 - checked Adjective5 - χαριέσσαιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χαριέσσαιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // χαριέντοιν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // χαριέσσαιν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // χαριέντοιν
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() //
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeFalsy() //
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeFalsy() //

  })

  it('5-4 - checked Adjective5 - χαριέσσαις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χαριέσσαις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // χαρίεσι(ν)
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeTruthy() // χαριέσσαις
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeFalsy() // χαρίεσι(ν)
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // πᾶσι(ν)
    expect(renderedTable.rows[11].cells[6].fullMatch).toBeFalsy() // πάσαις
    expect(renderedTable.rows[11].cells[7].fullMatch).toBeFalsy() // πᾶσι(ν)

  })

  it('5-5 - checked Adjective5 - χαρίεντι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χαρίεντι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // χαρίεντι
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // χαριέσσῃ
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // χαρίεντι
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // παντί
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeFalsy() // πάσῃ
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeFalsy() // παντί

  })

  it('5-6 - checked Adjective5 - χαρίεντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χαρίεντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[12].cells[2].fullMatch).toBeFalsy() // χαρίεντᾰς
    expect(renderedTable.rows[12].cells[3].fullMatch).toBeFalsy() // χαριέσσᾱς
    expect(renderedTable.rows[12].cells[4].fullMatch).toBeTruthy() // χαρίεντᾰ
    expect(renderedTable.rows[12].cells[5].fullMatch).toBeFalsy() // πάντᾰς
    expect(renderedTable.rows[12].cells[6].fullMatch).toBeFalsy() // πάσᾱς
    expect(renderedTable.rows[12].cells[7].fullMatch).toBeFalsy() // πάντᾰ

    expect(renderedTable.rows[9].cells[4].fullMatch).toBeTruthy() // χαρίεντᾰ
    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // χαρίεντᾰ
  })

  it('5-7 - checked Adjective5 - πᾶς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πᾶς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // χαρίεις
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // χαρίεσσᾰ
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // χαρίεν
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // πᾶς
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeFalsy() // πᾶσᾰ
    expect(renderedTable.rows[2].cells[7].fullMatch).toBeFalsy() // πᾶν

    expect(renderedTable.rows[6].cells[5].fullMatch).toBeTruthy() // πᾶς

  })

  it('5-8 - checked Adjective5 - πάντες', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πάντες', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeFalsy() // χαρίεντες
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeFalsy() // χαρίεσσαι
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeFalsy() // χαρίεντᾰ
    expect(renderedTable.rows[9].cells[5].fullMatch).toBeTruthy() // πάντες
    expect(renderedTable.rows[9].cells[6].fullMatch).toBeFalsy() // πᾶσαι
    expect(renderedTable.rows[9].cells[7].fullMatch).toBeFalsy() // πάντᾰ
  })

  it('5-9 - checked Adjective5 - πάσῃ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πάσῃ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThan(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[7],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[7].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // χαρίεντι
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // χαριέσσῃ
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // χαρίεντι
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // παντί
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // πάσῃ
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeFalsy() // παντί
  })

  it('5-10 - checked Adjective5 - πάσᾱς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πάσᾱς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // χαρίεντος
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // χαριέσσης
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // χαρίεντος
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // παντός
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeTruthy() // πάσης
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // παντός

    expect(renderedTable.rows[12].cells[6].fullMatch).toBeTruthy() // πάσᾱς
  })

  it('5-11 - checked Adjective5 - παντί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('παντί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // χαρίεντι
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // χαριέσσῃ
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // χαρίεντι
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeTruthy() // παντί
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeFalsy() // πάσῃ
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeTruthy() // παντί
  })

  it('5-12 - checked Adjective5 - πάντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πάντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Consonant-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable


    expect(renderedTable.rows[12].cells[2].fullMatch).toBeFalsy() // χαρίεντᾰς
    expect(renderedTable.rows[12].cells[3].fullMatch).toBeFalsy() // χαριέσσᾱς
    expect(renderedTable.rows[12].cells[4].fullMatch).toBeFalsy() // χαρίεντᾰ
    expect(renderedTable.rows[12].cells[5].fullMatch).toBeFalsy() // πάντᾰς
    expect(renderedTable.rows[12].cells[6].fullMatch).toBeFalsy() // πάσᾱς
    expect(renderedTable.rows[12].cells[7].fullMatch).toBeTruthy() // πάντᾰ

    expect(renderedTable.rows[9].cells[7].fullMatch).toBeTruthy() // πάντᾰ
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeTruthy() // πάντᾰ
  })

  it('6-1 - checked Adjective6 - χρυσοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρυσοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThan(3)

    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[5],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[5].render().wideTable

    //  console.info(renderedTable.rows[3])
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // χρυσοῦ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // χρυσῆς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // χρυσοῦ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἀργυροῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἀργυρᾶς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // ἀργυροῦ

  })

  it('6-2 - checked Adjective6 - χρυσοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρυσοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThan(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // χρυσοῖν
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // χρυσαῖν
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // χρυσοῖν
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // ἀργυροῖν
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeFalsy() // ἀργυραῖν
    expect(renderedTable.rows[7].cells[7].fullMatch).toBeFalsy() // ἀργυροῖν
  })

  it('6-3 - checked Adjective6 - χρυσῆν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρυσῆν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // χρυσοῦν
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // χρυσῆν
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // χρυσοῦν
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // ἀργυροῦν
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeFalsy() // ἀργυρᾷν
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeFalsy() // ἀργυροῦν
  })

  it('6-4 - checked Adjective6 - χρυσαῖς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρυσαῖς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // χρυσοῖς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // χρυσαῖς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // χρυσοῖς
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // ἀργυροῖς
    expect(renderedTable.rows[10].cells[6].fullMatch).toBeFalsy() // ἀργυραῖς
    expect(renderedTable.rows[10].cells[7].fullMatch).toBeFalsy() // ἀργυροῖς
  })

  it('6-5 - checked Adjective6 - χρυσῷ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρυσῷ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // χρυσῷ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // χρυσῇ
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // χρυσῷ
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // ἀργυρῷ
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeFalsy() // ἀργυρᾷ
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeFalsy() // ἀργυρῷ
  })

  it('6-6 - checked Adjective6 - χρυσᾶ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρυσᾶ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // χρυσοῦς
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // χρυσᾶς
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeTruthy() // χρυσᾶ
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // ἀργυροῦς
    expect(renderedTable.rows[11].cells[6].fullMatch).toBeFalsy() // ἀργυρᾶς
    expect(renderedTable.rows[11].cells[7].fullMatch).toBeFalsy() // ἀργυρᾶ

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeTruthy() // χρυσᾶ
  })

  it('6-7 - checked Adjective6 - ἀργυροῦς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀργυροῦς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // χρυσοῦς
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // χρυσᾶς
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeFalsy() // χρυσᾶ
    expect(renderedTable.rows[11].cells[5].fullMatch).toBeTruthy() // ἀργυροῦς
    expect(renderedTable.rows[11].cells[6].fullMatch).toBeFalsy() // ἀργυρᾶς
    expect(renderedTable.rows[11].cells[7].fullMatch).toBeFalsy() // ἀργυρᾶ

    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἀργυροῦς
  })

  it('6-8 - checked Adjective6 - ἀργυροῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀργυροῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // χρυσοῖν
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // χρυσαῖν
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // χρυσοῖν
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeTruthy() // ἀργυροῖν
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeFalsy() // ἀργυραῖν
    expect(renderedTable.rows[7].cells[7].fullMatch).toBeTruthy() // ἀργυροῖν
  })

  it('6-9 - checked Adjective6 - ἀργυρᾶς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀργυρᾶς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // χρυσοῦ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // χρυσῆς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // χρυσοῦ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἀργυροῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeTruthy() // ἀργυρᾶς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // ἀργυροῦ

    expect(renderedTable.rows[11].cells[6].fullMatch).toBeTruthy() // ἀργυρᾶς
  })

  it('6-10 - checked Adjective6 - ἀργυρῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀργυρῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThan(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-εος)',
      paradigmID: 'adjpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeFalsy() // χρυσῶν
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeFalsy() // χρυσῶν
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeFalsy() // χρυσῶν
    expect(renderedTable.rows[9].cells[5].fullMatch).toBeTruthy() // ἀργυρῶν
    expect(renderedTable.rows[9].cells[6].fullMatch).toBeTruthy() // ἀργυρῶν
    expect(renderedTable.rows[9].cells[7].fullMatch).toBeTruthy() // ἀργυρῶν
  })


  it('7-1 - checked Adjective7 - εὔνους', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('εὔνους', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // εὔνους
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // εὔνουν
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ἁπλοῦς
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // ἁπλῆ
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy() // ἁπλοῦν

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // εὔνοι
  })

  it('7-2 - checked Adjective7 - εὔνοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('εὔνοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // εὔνοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeTruthy() // εὔνοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // ἁπλοῖν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // ἁπλαῖν
    expect(renderedTable.rows[6].cells[6].fullMatch).toBeFalsy() // ἁπλοῖν
  })

  it('7-3 - checked Adjective7 - εὔνοις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('εὔνοις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeTruthy() // εὔνοις
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeTruthy() // εὔνοις
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeFalsy() // ἁπλοῖς
    expect(renderedTable.rows[9].cells[5].fullMatch).toBeFalsy() // ἁπλαῖς
    expect(renderedTable.rows[9].cells[6].fullMatch).toBeFalsy() // ἁπλοῖς
  })

  it('7-4 - checked Adjective7 - εὔνῳ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('εὔνῳ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // εὔνῳ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // εὔνῳ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ἁπλῷ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἁπλῇ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἁπλῷ
  })

  it('7-5 - checked Adjective7 - ἁπλοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁπλοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // εὔνους
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // εὔνουν
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // ἁπλοῦς
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // ἁπλῆ
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy() // ἁπλοῦν

    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // ἁπλοῦ
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // ἁπλῆς
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeTruthy() // ἁπλοῦ
  })

  it('7-6 - checked Adjective7 - ἁπλοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁπλοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // εὔνοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // εὔνοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // ἁπλοῖν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // ἁπλαῖν
    expect(renderedTable.rows[6].cells[6].fullMatch).toBeTruthy() // ἁπλοῖν
  })

  it('7-7 - checked Adjective7 - ἁπλῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁπλῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // εὔνων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // εὔνων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // ἁπλῶν
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // ἁπλῶν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeTruthy() // ἁπλῶν
  })

  it('7-8 - checked Adjective7 - ἁπλῆς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁπλῆς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // εὔνου
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // εὔνου
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἁπλοῦ
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἁπλῆς
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeFalsy() // ἁπλοῦ
  })

  it('7-9 - checked Adjective7 - ἁπλοῦν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁπλοῦν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // εὔνουν
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // εὔνουν
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // ἁπλοῦν
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // ἁπλῆν
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // ἁπλοῦν

    expect(renderedTable.rows[1].cells[6].fullMatch).toBeTruthy() // ἁπλοῦν
  })

  it('7-10 - checked Adjective7 - ἁπλόᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁπλόᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Contraction (-οος)',
      paradigmID: 'adjpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // εὔνους
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // εὔνουν
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ἁπλοῦς
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeTruthy() // ἁπλῆ
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy() // ἁπλοῦν

    expect(renderedTable.rows[5].cells[5].fullMatch).toBeTruthy() // ἁπλᾶ
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeTruthy() // ἁπλόᾰ
    expect(renderedTable.rows[10].cells[6].fullMatch).toBeTruthy() // ἁπλόᾰ
  })

  it('8-1 - checked Adjective8 - ἵλεως', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵλεως', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // ἵλεως
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἵλεων
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // πλέως
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // πλέᾱ
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy() // πλέων

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ἵλεῳ
  })

  it('8-2 - checked Adjective8 - ἵλεω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵλεω', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ἵλεω
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // ἵλεω
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // πλέω
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // πλέᾱς
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeFalsy() // πλέω

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // ἵλεω
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // ἵλεῳ
  })

  it('8-3 - checked Adjective8 - ἵλεων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵλεων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // ἵλεως
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy() // ἵλεων
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // πλέως
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // πλέᾱ
    expect(renderedTable.rows[1].cells[6].fullMatch).toBeFalsy() // πλέων

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // ἵλεων
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // ἵλεων

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // ἵλεων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // ἵλεων
  })

  it('8-4 - checked Adjective8 - ἵλεᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵλεᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ἵλεῳ
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // ἵλεᾰ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // πλέῳ
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // πλέαι
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeFalsy() // πλέᾰ

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeTruthy() // ἵλεως
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // ἵλεᾰ
  })

  it('8-5 - checked Adjective8 - πλέω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλέω', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἵλεω
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἵλεω
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // πλέω
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // πλέᾱς
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeTruthy() // πλέω

    expect(renderedTable.rows[5].cells[4].fullMatch).toBeTruthy() // πλέω
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeTruthy() // πλέᾱ
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeTruthy() // πλέω

  })

  it('8-6 - checked Adjective8 - πλέῳς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλέῳς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeFalsy() // ἵλεῳς
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeFalsy() // ἵλεῳς
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeTruthy() // πλέῳς
    expect(renderedTable.rows[9].cells[5].fullMatch).toBeFalsy() // πλέαις
    expect(renderedTable.rows[9].cells[6].fullMatch).toBeTruthy() // πλέῳς
  })

  it('8-7 - checked Adjective8 - πλέᾳ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλέᾳ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἵλεῳ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἵλεῳ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // πλέῳ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // πλέᾳ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // πλέῳ

    expect(renderedTable.rows[7].cells[5].fullMatch).toBeTruthy() // πλέᾳ
  })

  it('8-8 - checked Adjective8 - πλέαιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλέαιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // ἵλεῳν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // ἵλεῳν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // πλέῳν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeTruthy() // πλέαιν
    expect(renderedTable.rows[6].cells[6].fullMatch).toBeFalsy() // πλέῳν
  })

  it('8-9 - checked Adjective8 - πλέων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλέων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[1].cells[6].fullMatch).toBeTruthy() // πλέων

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ἵλεων
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // ἵλεων
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeTruthy() // πλέων
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeTruthy() // πλέᾱν
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeTruthy() // πλέων

    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // πλέων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // πλέων
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeTruthy() // πλέων
  })

  it('8-10 - checked Adjective8 - πλέᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλέᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThanOrEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Adjectives with Attic Declension',
      paradigmID: 'adjpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[5].fullMatch).toBeTruthy() // πλέᾱ

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ἵλεω
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // ἵλεω
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // πλέω
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeTruthy() // πλέᾱ
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeFalsy() // πλέω

    expect(renderedTable.rows[7].cells[6].fullMatch).toBeTruthy() // πλέᾰ
    expect(renderedTable.rows[10].cells[6].fullMatch).toBeTruthy() // πλέᾰ
  })
  
})
