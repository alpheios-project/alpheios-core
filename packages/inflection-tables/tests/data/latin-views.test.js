/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants } from 'alpheios-data-models'

// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

import BaseTestHelp from '@tests/data/base-test-help.js'

describe('latin-views.test.js', () => {
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

  it('1 - checked Latin Views - curru - LatinNounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('curru', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinNounView',
      title: 'Noun declension',
      linkedViewsLength: 0
    })
  })

  it('2 - checked Latin Views - nitido - LatinAdjectiveView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('nitido', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinAdjectiveView',
      title: 'Adjective declension',
      linkedViewsLength: 0
    })
  })

  it('3 - checked Latin Views - iugandis - LatinVerbParticipleView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('iugandis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbParticipleView',
      title: 'Participle',
      linkedViewsLength: 0
    })
  })

  it('4 - checked Latin Views - servet - Latin Verb Conjugation', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('servet', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(6)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('5 - checked Latin Views - cecinisse - Latin Verb Conjugation Infinitive', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('cecinisse', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[0])

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinInfinitiveView',
      title: 'Infinitive',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('6 - checked Latin Views - marita - Latin Verb Conjugation Imperative', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('marita', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[0])

    expect(inflectionsViewSet.matchingViews.length).toEqual(9)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinNounView',
      title: 'Noun declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinAdjectiveView',
      title: 'Adjective declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinImperativeView',
      title: 'Imperative',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('7 - checked Latin Views - cursu - LatinSupineView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('cursu', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinNounView',
      title: 'Noun declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinSupineView',
      title: 'Supine',
      linkedViewsLength: 0
    })
  })

  it('8 - checked Latin Views - colendi - LatinVerbParticipleView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('colendi', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbParticipleView',
      title: 'Participle',
      linkedViewsLength: 0
    })
  })

  it('9 - checked Latin Views - iam - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('iam', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'eo, ire,ivi(ii),itus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('10 - checked Latin Views - sum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('sum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[1])

    expect(inflectionsViewSet.matchingViews.length).toEqual(8)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinImperativeView',
      title: 'Imperative',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'sum, esse,fui,futurus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('11 - checked Latin Views - possum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('possum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'possum, posse,potui,-',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('12 - checked Latin Views - volui - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('volui', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[1])

    expect(inflectionsViewSet.matchingViews.length).toEqual(8)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinInfinitiveView',
      title: 'Infinitive',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'volo, velle,volui,-',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

  })

  it('13 - checked Latin Views - nolo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('nolo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'nolo, nolle,nolui,-',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('14 - checked Latin Views - maluerimus - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('maluerimus', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'malo, malle,malui,-',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('15 - checked Latin Views - tuleritis - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('tuleritis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularVoiceView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'fero, ferre,tuli,latus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularVoiceView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularVoiceView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('16 - checked Latin Views - ferent - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ferent', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularVoiceView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'fero, ferre,tuli,latus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularVoiceView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularVoiceView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('17 - checked Latin Views - veneo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('veneo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'veneo, venire,venivi(ii),venitus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('18 - checked Latin Views - ineo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ineo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularVoiceView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'ineo, inire,inivi(ii),initus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularVoiceView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularVoiceView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('19 - checked Latin Views - adeo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('adeo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularVoiceView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'adeo, adire,adivi(ii),aditus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularVoiceView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularVoiceView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('20 - checked Latin Views - nequeo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('nequeo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'nequeo, nequire,nequivi(ii),nequitus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('21 - checked Latin Views - queo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('queo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularVoiceView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'queo, quire,quivi(ii),quitus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularVoiceView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularVoiceView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('22 - checked Latin Views - praefuistis - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('praefuistis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'praesum, praeesse,praefui,praefuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('23 - checked Latin Views - obsum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('obsum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'obsum, obesse,obfui,obfuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('24 - checked Latin Views - inerimus - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('inerimus', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'insum, inesse,infui,infuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('25 - checked Latin Views - supersum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('supersum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'supersum, superesse,superfui,superfuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('26 - checked Latin Views - subsum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('subsum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'subsum, subesse,subfui,subfuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('27 - checked Latin Views - adfuimus - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('adfuimus', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'adsum, adesse,adfui,adfuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('28 - checked Latin Views - afueras - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('afueras', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'absum, abesse,afui,afuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('29 - checked Latin Views - proderitis - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('proderitis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'prosum, prodesse,profui,profuturus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
  })

  it('30 - checked Latin Views - esse - Latin Verb Conjugation Irregular Infinitive', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('esse', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[1])

    expect(inflectionsViewSet.matchingViews.length).toEqual(10)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinInfinitiveView',
      title: 'Infinitive',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbInfinitiveIrregularView',
      title: 'Verb Infinitive Conjugation (Irregular)',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'sum, esse,fui,futurus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceConjugationMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVoiceMoodConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationVoiceMoodView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinConjugationMoodVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodVoiceConjugationView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinMoodConjugationVoiceView',
      title: 'Verb Conjugation',
      linkedViewsLength: 0
    })
    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbParticipleView',
      title: 'Participle',
      linkedViewsLength: 0
    })
  })

  it('31 - checked Latin Views - es - Latin Verb Conjugation Irregular Imperative', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('es', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[1])

    expect(inflectionsViewSet.matchingViews.length).toEqual(9)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinImperativeView',
      title: 'Imperative',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbImperativeIrregularView',
      title: 'Verb Imperative Conjugation (Irregular)',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'sum, esse,fui,futurus',
      linkedViewsLength: 3,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularView', title: 'Verb Imperative Conjugation (Irregular)'}
      ]
    })
  })

  it('32 - checked Latin Views - fer - Latin Verb Conjugation Irregular Imperative Voice', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('fer', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[1])

    expect(inflectionsViewSet.matchingViews.length).toEqual(9)


    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinImperativeView',
      title: 'Imperative',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbImperativeIrregularVoiceView',
      title: 'Verb Imperative Conjugation (Irregular)',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinVerbIrregularVoiceView',
      title: 'Verb Conjugation (Irregular)',
      additionalTitle: 'fero, ferre,tuli,latus',
      linkedViewsLength: 4,
      linkedViews: [
        { viewName: 'LatinVerbParticipleIrregularView', title: 'Verb Participle Conjugation (Irregular)' },
        { viewName: 'LatinVerbInfinitiveIrregularVoiceView', title: 'Verb Infinitive Conjugation (Irregular)'},
        { viewName: 'LatinVerbImperativeIrregularVoiceView', title: 'Verb Imperative Conjugation (Irregular)'},
        { viewName: 'LatinVerbSupineIrregularView', title: 'Verb Supine Conjugation (Irregular)' }
      ]
    })

    // test the order
    const allViews = inflectionsViewSet.getViews()
    expect(allViews[0].name === 'verb-imperative-irregular')
    expect(allViews[1].name === 'verb-irregular')
    expect(allViews[2].name === 'imperative')
  })

  it('33 - checked Latin Views - melior - LatinAdjectiveComparativeView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('melior', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinAdjectiveView',
      title: 'Adjective declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinAdjectiveComparativeView',
      title: 'Adjective Comparative Declension',
      linkedViewsLength: 0
    })
  })

  it('34 - checked Latin Views - levissimus - LatinAdjectiveSuperlativeView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('levissimus', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinAdjectiveView',
      title: 'Adjective declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'LatinAdjectiveSuperlativeView',
      title: 'Adjective Superlative Declension',
      linkedViewsLength: 0
    })
  })
})
