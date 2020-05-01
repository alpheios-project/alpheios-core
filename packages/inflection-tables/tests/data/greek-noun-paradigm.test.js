/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'
describe('greek-noun-paradigm.test.js', () => {
  
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


  it('1-1 - checked Noun1 - ἄνθρωπος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄνθρωπος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Omicron-Declension Nouns',
      paradigmID: 'nounpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // βουλεύεις
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // βουλεύῃς

  })

  it('1-2 - checked Noun1 - ἔργον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔργον', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Omicron-Declension Nouns',
      paradigmID: 'nounpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    // console.info('renderedTable.rows[1].cells - ', renderedTable.rows[0])

    expect(renderedTable.rows[0].cells[3].fullMatch).toBeTruthy() // ἔργον
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἔργον
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἔργῳ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // ἔργον
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // ἔργον
  })

  it('2-1 - checked Noun2 - χώρᾱς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χώρᾱς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // χώρᾱς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γνώμης

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeTruthy() // χώρᾱς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // γνώμᾱς
  })

  it('2-2 - checked Noun2 - χώραιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χώραιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // χώραιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // γνώμαιν
  })

  it('2-3 - checked Noun2 - γνωμῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γνωμῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // χωρῶν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // γνωμῶν
  })

  it('2-4 - checked Noun2 - γνώμην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γνώμην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // χώρᾱν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // γνώμην
  })

  it('3-1 - checked Noun3 - ὑγιείᾳ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὑγιείᾳ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // θαλάττῃ
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ὑγιείᾳ
    
  })

  it('3-2 - checked Noun3 - ὑγιείαιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὑγιείαιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // θαλάτταιν
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // ὑγιείαιν
    
  })

  it('3-3 - checked Noun3 - θάλαττᾰν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θάλαττᾰν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ὑγίειᾰν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // θάλαττᾰν
    
  })

  it('3-4 - checked Noun3 - θαλάττᾱς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θαλάττᾱς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // ὑγιείᾱς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy() // θαλάττης
    
    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ὑγιείᾱς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // θαλάττᾱς
  })

  it('4-1 - checked Noun4 - νεανίου', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νεανίου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // νεανίου
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // στρατιώτου
  })

  it('4-2 - checked Noun4 - νεανίαιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νεανίαιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // νεανίαιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // στρατιώταιν
  })

  it('4-3 - checked Noun4 - στρατιώτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('στρατιώτην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // στρατιώτην
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // νεανίᾱν
  })

  it('4-4 - checked Noun4 - στρατιώταις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('στρατιώταις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[9].cells[3].fullMatch).toBeTruthy() // στρατιώταις
    expect(renderedTable.rows[9].cells[2].fullMatch).toBeFalsy() // νεανίαις
  })

  it('5-1 - checked Noun5 - κλώψ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('κλώψ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // κλώψ
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // φύλαξ
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // κλώψ
  })

  it('5-2 - checked Noun5 - κλῶπε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('κλῶπε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // κλῶπε
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // φύλακε
  })

  it('5-3 - checked Noun5 - φυλάκων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('φυλάκων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // φυλάκων
    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // κλωπῶν
  })

  it('5-4 - checked Noun5 - φύλαξ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('φύλαξ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[3].fullMatch).toBeTruthy() // φύλαξ
    expect(renderedTable.rows[0].cells[2].fullMatch).toBeFalsy() // κλώψ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // φύλαξ
  })


  it('6-1 - checked Noun6 - χάρις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χάρις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // χάρις
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // ἀσπίς
    expect(renderedTable.rows[0].cells[4].fullMatch).toBeFalsy() // Ἑλλάς
  })

  it('6-2 - checked Noun6 - χάριτες', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χάριτες', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // χάριτες
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // ἀσπίδες
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // Ἑλλάδες
  })

  it('6-3 - checked Noun6 - ἀσπίδοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀσπίδοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // χαρίτοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeTruthy() // ἀσπίδοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // Ἑλλάδοιν
  })

  it('6-4 - checked Noun6 - ἀσπίδᾰς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀσπίδᾰς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // χάριτᾰς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // ἀσπίδᾰς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // Ἑλλάδᾰς
  })

  it('6-5 - checked Noun6 - Ἑλλάδᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('Ἑλλάδᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // χάριν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀσπίδᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // Ἑλλάδᾰ
  })

  it('6-6 - checked Noun6 - Ἑλλάδοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('Ἑλλάδοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // χαρίτοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // ἀσπίδοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // Ἑλλάδοιν
  })

  
  it('7-1 - checked Noun7 - γέροντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γέροντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // γέροντος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γίγαντος
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ὀδόντος
  })

  it('7-2 - checked Noun7 - γερόντων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γερόντων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // γερόντων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // γιγάντων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // ὀδόντων
  })

  it('7-3 - checked Noun7 - γίγαντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γίγαντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // γέροντᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // γίγαντᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ὀδόντᾰ
  })

  it('7-4 - checked Noun7 - γιγάντων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γιγάντων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // γερόντων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // γιγάντων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // ὀδόντων
  })

  it('7-5 - checked Noun7 - ὀδόντοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὀδόντοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // γερόντοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // γιγάντοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // ὀδόντοιν
  })

  it('7-6 - checked Noun7 - ὀδόντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὀδόντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // γέροντος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γίγαντος
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // ὀδόντος
  }) 


  it('8-1 - checked Noun8 - πράγματος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πράγματος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // πράγματος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // τέρατος
  })

  it('8-2 - checked Noun8 - πραγμάτοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πραγμάτοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // πραγμάτοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // τεράτοιν
  })

  it('8-3 - checked Noun8 - τέρατι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τέρατι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // πράγματι
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // τέρατι
  })

  it('8-4 - checked Noun8 - τεράτων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τεράτων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πραγμάτων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // τεράτων
  })

  it('9-1 - checked Noun9 - ῥήτορος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ῥήτορος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // ῥήτορος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // δαίμονος
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ἀγῶνος
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // ἁλός
  })

  it('9-2 - checked Noun9 - ῥήτορες', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ῥήτορες', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ῥήτορες
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // δαίμονες
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // ἀγῶνες
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // ἅλες
  })

  it('9-3 - checked Noun9 - δαῖμον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δαῖμον', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ῥῆτορ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // δαῖμον
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // ἀγών
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // ---
  })

  it('9-4 - checked Noun9 - δαίμονᾰς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δαίμονᾰς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ῥήτορᾰς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // δαίμονᾰς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // ἀγῶνᾰς
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // ἅλᾰς
  })

  it('9-5 - checked Noun9 - ἀγῶνᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγῶνᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ῥήτορᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // δαίμονᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἀγῶνᾰ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἅλᾰ
  })

  it('9-6 - checked Noun9 - ἀγώνων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγώνων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(6)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ῥητόρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // δαιμόνων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // ἀγώνων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἁλῶν
  })

  it('9-7 - checked Noun9 - ἁλί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁλί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ῥήτορι
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // δαίμονι
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἀγῶνι
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἁλί
  })

  it('9-8 - checked Noun9 - ἁλοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁλοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(6)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // ῥητόροιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // δαιμόνοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // ἀγώνοιν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeTruthy() // ἁλοῖν
  })


  it('10-1 - checked Noun10 - πατρί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πατρί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // πατρί
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // μητρί
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // θυγατρί
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // ἀνδρί
  })

  it('10-2 - checked Noun10 - πατέροιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πατέροιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // πατέροιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // μητέροιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // θυγατέροιν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // ἀνδροῖν
  })

  it('10-3 - checked Noun10 - μητέρᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μητέρᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // πατέρᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // μητέρᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // θυγατέρᾰ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἄνδρᾰ
  })

  it('10-4 - checked Noun10 - μητέρων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μητέρων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πατέρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // μητέρων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // θυγατέρων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἀνδρῶν
  })

  it('10-5 - checked Noun10 - θυγατέρᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θυγατέρᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // πατέρᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // μητέρᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // θυγατέρᾰ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἄνδρᾰ
  })

  it('10-6 - checked Noun10 - θυγατέροιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θυγατέροιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // πατέροιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // μητέροιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // θυγατέροιν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // ἀνδροῖν
  })

  it('10-7 - checked Noun10 - ἀνδρί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀνδρί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // πατρί
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // μητρί
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // θυγατρί
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἀνδρί
  })

  it('10-8 - checked Noun10 - ἀνδρῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀνδρῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(6)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[4],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[4].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πατέρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // μητέρων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // θυγατέρων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // ἀνδρῶν
  })

  it('11-1 - checked Noun11 - τριήρους', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τριήρους', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // τριήρους
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γένους
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // γέρως
  })

  it('11-2 - checked Noun11 - τριήρεις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τριήρεις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // τριήρεις
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // γένη
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // γέρᾱ
  })

  it('11-3 - checked Noun11 - γένει', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γένει', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // γένει
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // γέρᾳ

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // γένει
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // γέρᾳ
  })

  it('11-4 - checked Noun11 - γένη', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γένη', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // γένει
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // γέρᾳ

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // γένη
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // γέρᾱ

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // γένη
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // γέρᾱ
  })

  it('11-5 - checked Noun11 - γέρᾱ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γέρᾱ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // γένει
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeTruthy() // γέρᾳ

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // γένη
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // γέρᾱ

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // γένη
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // γέρᾱ
  })

  it('11-6 - checked Noun11 - γερῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γερῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // τριήρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // γενῶν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // γερῶν
  })

  it('12-1 - checked Noun12 - γυναικί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γυναικί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular nouns',
      paradigmID: 'nounpdgm12'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // γυναικί
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // χειρί
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // υἱεῖ or ὑεῖ
  })

  it('12-2 - checked Noun12 - γυναῖκας', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γυναῖκας', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular nouns',
      paradigmID: 'nounpdgm12'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeTruthy() // γυναῖκᾰς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // χεῖρᾰς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // υἱεῖς or ὑεῖς
  })

  it('12-3 - checked Noun12 - χεῖρε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χεῖρε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular nouns',
      paradigmID: 'nounpdgm12'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // γυναῖκε
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // χεῖρε
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // υἱεῖ or ὑεῖ
  })

  it('12-4 - checked Noun12 - χεῖρᾰς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χεῖρᾰς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular nouns',
      paradigmID: 'nounpdgm12'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // γυναῖκᾰς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // χεῖρᾰς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // υἱεῖς or ὑεῖς
  })

  it('12-5 - checked Noun12 - ὑέος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὑέος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular nouns',
      paradigmID: 'nounpdgm12'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // γυναικός
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // χειρός
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // υἱέος or ὑέος
  })

  it('12-6 - checked Noun12 - υἱέος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('υἱέος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular nouns',
      paradigmID: 'nounpdgm12'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // γυναικός
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // χειρός
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // υἱέος or ὑέος
  })

  it('12-7 - checked Noun12 - υἱοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('υἱοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular nouns',
      paradigmID: 'nounpdgm12'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // γυναικοῖν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // χεροῖν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // 	υἱοῖν or ὑοῖν
  })

  it('13-1 - checked Noun13 - πόλεως', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πόλεως', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // πατρός
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // μητρός
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // θυγατρός
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // ἀνδρός
  })

  it('13-2 - checked Noun13 - πολέοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πολέοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // πατέροιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // μητέροιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // θυγατέροιν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // ἀνδροῖν
  })

  it('13-3 - checked Noun13 - πῆχυν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πῆχυν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // πατέρᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // μητέρᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // θυγατέρᾰ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἄνδρᾰ
  })

  it('13-4 - checked Noun13 - πήχεων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πήχεων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πατέρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // μητέρων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // θυγατέρων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἀνδρῶν
  })

  it('13-5 - checked Noun13 - ἄστει', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄστει', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // πατρί
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // μητρί
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // θυγατρί
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // ἀνδρί

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // πατέρε
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // μητέρε
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeTruthy() // θυγατέρε
    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // ἄνδρε
  })

  it('13-6 - checked Noun13 - ἄστεων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄστεων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πατέρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // μητέρων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // θυγατέρων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἀνδρῶν
  })

  it('13-7 - checked Noun13 - ἰχθύος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἰχθύος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // πατρός
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // μητρός
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // θυγατρός
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeTruthy() // ἀνδρός
  })

  it('13-8 - checked Noun13 - ἰχθύες', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἰχθύες', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ι or υ',
      paradigmID: 'nounpdgm13'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // πατέρες
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // μητέρες
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // θυγατέρες
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeTruthy() // ἄνδρες
  })

  it('14-1 - checked Noun14 - ἱππέως', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἱππέως', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // ἱππεύς
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // γραῦς
    expect(renderedTable.rows[0].cells[4].fullMatch).toBeFalsy() // ναῦς
    expect(renderedTable.rows[0].cells[5].fullMatch).toBeFalsy() // βοῦς

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // ἱππέως
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γρᾱός
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // νεώς
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // βοός
  })

  it('14-2 - checked Noun14 - ἱππέοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἱππέοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // ἱππέοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // γρᾱοῖν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // νεοῖν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // βοοῖν
  })

  it('14-3 - checked Noun14 - γραῦν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γραῦν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἱππέᾱ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // γραῦν
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ναῦν
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // βοῦν
  })

  it('14-4 - checked Noun14 - γρᾱοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γρᾱοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // ἱππέοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeTruthy() // γρᾱοῖν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // νεοῖν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // βοοῖν
  })

  it('14-5 - checked Noun14 - ναῦν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ναῦν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἱππέᾱ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // γραῦν
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ναῦν
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // βοῦν
  })

  it('14-6 - checked Noun14 - νεῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νεῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(9)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[6],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[6].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἱππέων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // γρᾱῶν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // νεῶν
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // βοῶν
  })

  it('14-7 - checked Noun14 - βοῦν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βοῦν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἱππέᾱ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // γραῦν
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ναῦν
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // βοῦν
  })

  it('14-8 - checked Noun14 - βοῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βοῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(9)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[7],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: stems in ευ, αυ, or ου',
      paradigmID: 'nounpdgm14'
    })

    const renderedTable = inflectionsViewSet.matchingViews[7].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἱππέων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // γρᾱῶν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // νεῶν
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // βοῶν
  })

  it('15-1 - checked Noun15 - νοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: O-Declension',
      paradigmID: 'nounpdgm15'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // νοῦ
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // περίπλου
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // κανοῦ

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // νοῦ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // περίπλου
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // κανοῦν
  })

  it('15-2 - checked Noun15 - νοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: O-Declension',
      paradigmID: 'nounpdgm15'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // νοῖν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // περίπλοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // κανοῖν
  })

  it('15-5 - checked Noun15 - κανοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('κανοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: O-Declension',
      paradigmID: 'nounpdgm15'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // νοῦ
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // περίπλου
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // κανοῦ
  })

  it('15-6 - checked Noun15 - κανοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('κανοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: O-Declension',
      paradigmID: 'nounpdgm15'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // νοῖν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // περίπλου
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // κανοῖν
  })

  it('16-1 - checked Noun16 - γῆς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γῆς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // γῆς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // συκῆς
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // μνᾶς
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // Ἑρμοῦ
  })

  it('16-2 - checked Noun16 - γῆν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γῆν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // γῆν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // συκῆν
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // μνᾶν
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // Ἑρμῆν
  })

  it('16-3 - checked Noun16 - συκῆς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('συκῆς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // γῆς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy() // συκῆς
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // μνᾶς
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // Ἑρμοῦ
  })

  it('16-4 - checked Noun16 - συκαῖ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('συκαῖ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // νοῖν
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // περίπλου
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // κανοῖν
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // κανοῖν
  })

  it('16-5 - checked Noun16 - μνᾶς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μνᾶς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // γῆς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // συκῆς
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // μνᾶς
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // Ἑρμοῦ

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // συκᾶς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // μνᾶς
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // Ἑρμοῦ
  })

  it('16-6 - checked Noun16 - μναῖς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μναῖς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeFalsy() // συκαῖς
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeTruthy() // μναῖς
    expect(renderedTable.rows[9].cells[5].fullMatch).toBeFalsy() // Ἑρμαῖς
  })

  it('16-7 - checked Noun16 - Ἑρμῆν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('Ἑρμῆν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // γῆν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // συκῆν
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // μνᾶν
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // Ἑρμῆν

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // συκῶν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // μνῶν
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // Ἑρμῶν
  })

  it('16-8 - checked Noun16 - Ἑρμᾶς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('Ἑρμᾶς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(5)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns with Contraction: A-Declension',
      paradigmID: 'nounpdgm16'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // συκᾶς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // μνᾶς
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeTruthy() // Ἑρμᾶς
  })

  it('17-1 - checked Noun17 - νεώ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νεώ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // νεώ
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // λεώ
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ἕω
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // λαγώ
  })

  it('17-2 - checked Noun17 - νεῴς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νεῴς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeTruthy() // νεῴς
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeFalsy() // λεῴς
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[9].cells[5].fullMatch).toBeFalsy() // λαγῴς
  })

  it('17-3 - checked Noun17 - λεών', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λεών', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // νεών
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // λεών
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ἕω
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // λαγών, λαγώ
  })

  it('17-4 - checked Noun17 - λεώς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λεώς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeFalsy() // νεώς
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeTruthy() // λεώς
    expect(renderedTable.rows[0].cells[4].fullMatch).toBeFalsy() // ἕως
    expect(renderedTable.rows[0].cells[5].fullMatch).toBeFalsy() // λαγώς

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // νεῴ
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // λεῴ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // λαγῴ

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // νεώς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // λεώς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // λαγώς
  })

  it('17-5 - checked Noun17 - ἕως', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἕως', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeFalsy() // νεώς
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // λεώς
    expect(renderedTable.rows[0].cells[4].fullMatch).toBeTruthy() // ἕως
    expect(renderedTable.rows[0].cells[5].fullMatch).toBeFalsy() // λαγώς
  })

  it('17-6 - checked Noun17 - ἕω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἕω', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // νεών
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // λεών
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἕω
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // λαγών, λαγώ
  })

  it('17-7 - checked Noun17 - λαγώ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λαγώ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // νεώ
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // λεώ
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ἕω
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeTruthy() // λαγώ
  })

  it('17-8 - checked Noun17 - λαγώς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λαγώς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns: Attic Declension',
      paradigmID: 'nounpdgm17'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeFalsy() // νεώς
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // λεώς
    expect(renderedTable.rows[0].cells[4].fullMatch).toBeFalsy() // ἕως
    expect(renderedTable.rows[0].cells[5].fullMatch).toBeTruthy() // λαγώς

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // νεώς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // λεώς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeTruthy() // λαγώς
  })

  it('18-1 - checked Noun18 - αἰδοῦς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('αἰδοῦς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns in -ως',
      paradigmID: 'nounpdgm18'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // αἰδοῦς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἥρωος, ἥρω
  })

  it('18-2 - checked Noun18 - αἰδώς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('αἰδώς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns in -ως',
      paradigmID: 'nounpdgm18'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // αἰδώς
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // ἥρως
  })

  it('18-3 - checked Noun18 - ἥρωᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἥρωᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns in -ως',
      paradigmID: 'nounpdgm18'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // αἰδώς
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // ἥρως
  })

  it('18-4 - checked Noun18 - ἡρώων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡρώων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Nouns in -ως',
      paradigmID: 'nounpdgm18'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // ἡρώων
  })

})
