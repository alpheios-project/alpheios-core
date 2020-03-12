/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

import BaseTestHelp from '@tests/data/base-test-help.js'

describe('greek-views.test.js', () => {
  //console.error = function () {}
  //console.log = function () {}
  //console.warn = function () {}

  const locale = "en-US"
  beforeAll(async () => {
  })

  beforeEach(() => {
   // jest.spyOn(console, 'error')
    //jest.spyOn(console, 'log')
    //jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 - checked Greek Views - πᾶσι - GreekNounView, GreekNounSimplifiedView, GreekAdjectiveView, GreekAdjectiveSimplifiedView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πᾶσι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toBeGreaterThan(3)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekNounView',
      title: 'Noun declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekNounSimplifiedView',
      title: 'Noun declension (simplified)',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekAdjectiveParadigmView',
      title: 'Consonant-Declension Adjectives with Three Endings',
      linkedViewsLength: 0
    })
  })

  it('2 - checked Greek Views - οἱ - GreekArticleView, GreekGenderPronounView, GreekPersonPronounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἱ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekArticleView',
      title: 'Article Declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekPersonPronounView',
      title: 'Personal Pronoun Declension',
      linkedViewsLength: 0
    })
  })

  it('3 - checked Greek Views - αὐτὴν - GreekGenderPronounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('αὐτὴν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekGenderPronounView',
      title: 'Intensive Pronoun Declension',
      linkedViewsLength: 0
    })
  })

  it('4 - checked Greek Views - φυήν - GreekNounView, GreekNounSimplifiedView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('φυήν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekNounView',
      title: 'Noun declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekNounSimplifiedView',
      title: 'Noun declension (simplified)',
      linkedViewsLength: 0
    })
  })

  it('5 - checked Greek Views - τις - GreekGenderPronounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekGenderPronounView',
      title: 'Indefinite Pronoun Declension',
      linkedViewsLength: 0
    })
  })

  it('6 - checked Greek Views - ὅδε - GreekLemmaGenderPronounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὅδε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekLemmaGenderPronounView',
      title: 'Demonstrative Pronoun Declension',
      linkedViewsLength: 0
    })
  })

  it('7 - checked Greek Views - αὑτῶν - GreekPersonGenderPronounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('αὑτῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekPersonGenderPronounView',
      title: 'Reflexive Pronoun Declension',
      linkedViewsLength: 0
    })
  })

  it('8 - checked Greek Views - τοὺς - GreekArticleView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τοὺς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekArticleView',
      title: 'Article Declension',
      linkedViewsLength: 0
    })
  })

  it('9 - checked Greek Views - αὐτοῖς - GreekGenderPronounView, GreekPersonGenderPronounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('αὐτοῖς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekGenderPronounView',
      title: 'Intensive Pronoun Declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekPersonGenderPronounView',
      title: 'Reflexive Pronoun Declension',
      linkedViewsLength: 0
    })
  })

  it('10 - checked Greek Views - δύο - GreekNumeralView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δύο', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekNumeralView',
      title: 'Numeral declension',
      linkedViewsLength: 0
    })
  })

  it('11 - checked Greek Views - οἰστροδόνου - GreekAdjectiveView (with incorrect inflection without part of speech)', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἰστροδόνου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekAdjectiveView'
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekAdjectiveSimplifiedView'
    })
  })

  it('12 - checked Greek Views - τίς - GreekPronounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τίς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekGenderPronounInterrogativeView',
      title: 'Interrogative Pronoun Declension',
      linkedViewsLength: 0
    })

    BaseTestHelp.checkView({
      inflectionsViewSet,
      viewName: 'GreekGenderPronounView',
      title: 'Indefinite Pronoun Declension',
      linkedViewsLength: 0
    })
  })

})
