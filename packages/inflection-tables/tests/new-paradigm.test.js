/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

import ViewSetFactory from '@views/lib/view-set-factory.js'

import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import GreekViewSet from '@views/lang/greek/greek-view-set.js'
import LatinViewSet from '@views/lang/latin/latin-view-set.js'

import GreekNounView from '@views/lang/greek/noun/greek-noun-view.js'
import GreekVerbParadigmView from '@/paradigm/views/greek/verb/greek-verb-paradigm-view.js'

import GreekParadigmDataset from '@/paradigm/data/greek/greek-paradigm-dataset.js'

describe('greek-verb-paradigm.test.js', () => {
  // console.error = function () {}
  // console.log = function () {}
  // console.warn = function () {}

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

  it('1 - check paradigm (paradigm1) - βουλεύῃς', async () => {
    const locale = "en-US"
    let homonym = await BaseTestHelp.getHomonym('βουλεύῃς', Constants.LANG_GREEK)
    const inflectionsViewSet = ViewSetFactory.create(homonym, locale)
    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK)

    let matchingViews = inflectionsViewSet.getViews(partOfSpeech.value)
    expect(matchingViews.length).toEqual(1)

    expect(matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm1')
  })

  it('2 - check paradigm (paradigm1) - βουλεύῃς', async () => {
    let homonym = await BaseTestHelp.getHomonym('βουλεύῃς', Constants.LANG_GREEK)
    
    let dataset = new GreekParadigmDataset()
    dataset.loadData()

    for (const lexeme of homonym.lexemes) {
      for (const inflection of lexeme.inflections) {
        dataset.setInflectionData(inflection, lexeme.lemma)
      }
    }

    const views = GreekViewSet.views
    let matchingViews = []
    matchingViews.push(...views.reduce(
      (acc, view) => acc.concat(...view.getMatchingInstances(homonym)), []))

    expect(matchingViews.length).toEqual(1)

    expect(matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm1')
    
    const view = matchingViews[0].render()
    expect(view.wideTable.rows[2].cells[3].fullMatch).toBeTruthy()
    expect(view.wideTable.rows[2].cells[2].fullMatch).toBeFalsy()
    // GreekVerbParadigmView.getStandardFormInstance({ paradigmID: matchingViews[0].paradigm.paradigmID })
  })
})