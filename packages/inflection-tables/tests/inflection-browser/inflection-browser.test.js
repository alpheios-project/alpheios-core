/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'

import { Constants } from 'alpheios-data-models'

import ViewSetFactory from '@views/lib/view-set-factory.js'
import GreekViewSet from '@views/lang/greek/greek-view-set.js'

import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset'


describe('inflection-browser.test.js', () => {
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  it.skip('1 InflectionsBrowser - render a view', () => {
    /*
    const standardFormData = {
      form: 'ἀλλήλᾱ',
      langID: Constants.LANG_GREEK,
      title: 'Reciprocal Pronoun Declension',
      viewID: 'greek_gender_pronoun_view'
    }
    */

    const standardFormData = {
      form: 'τούτω',
      langID: Constants.LANG_GREEK,
      title: 'Demonstrative Pronoun Declension',
      viewID: 'greek_lemma_gender_pronoun_view'
    }

    // const view = ViewSetFactory.getStandardForm(standardFormData)

    const options = standardFormData

    // view.getStandardFormInstance

    const view = GreekViewSet.getViewByID(options.viewID)
    console.info('view - ', view)
    const homonym = view.createStandardFormHomonym(options)

    console.info('homonym - ', homonym.lexemes[0].inflections.map(infl => infl.constraints))

    const inflections = view.getRelatedInflections(homonym.inflections)

    console.info('inflections - ', inflections.map(infl => infl.constraints))

    const suffixBased = inflections.some(i => i.constraints.suffixBased)
    const formBased = inflections.some(i => i.constraints.fullFormBased)
    
    console.info('suffixBased - ', suffixBased)
    console.info('formBased - ', formBased)
    // const inflectionData = view.getInflectionsData(homonym, { findMatches: false })

    const inflSet = view.dataset.createInflectionSet(view.mainPartOfSpeech, inflections, options)

    console.info(inflSet.types)
    // GreekLanguageDataset.createInflectionSet
    // createInflectionSet (pofsValue, inflections, options) {

    // console.info(inflectionData)
  })

  it.skip('1 InflectionsBrowser - render a view', () => {
    const options1 = {
      form: 'ἀλλήλᾱ',
      langID: Constants.LANG_GREEK,
      title: 'Reciprocal Pronoun Declension',
      viewID: 'greek_gender_pronoun_view'
    }

    const options = {
      form: 'οὗτος',
      langID: Constants.LANG_GREEK,
      title: 'Demonstrative Pronoun Declension',
      viewID: 'greek_lemma_gender_pronoun_view'
    }

    const view = GreekViewSet.getViewByID(options.viewID)
    const homonym = view.createStandardFormHomonym(options)

    console.info('homonym - ', homonym.lexemes[0].inflections.map(infl => infl.constraints))

  })
})