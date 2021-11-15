/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import InflectionsBrowser from '@/vue/components/inflections/inflections-browser.vue'
import InflectionsTableWide from '@/vue/components/inflections/inflections-table-wide.vue'
import WidePrerenderedTable from '@/vue/components/inflections/inflections-table-prerendered.vue'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'
import { ViewSetFactory, GreekViewSet } from 'alpheios-inflection-tables'

describe('inflections.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  let store
  let api = {}
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  
    store = BaseTestHelp.baseVuexStore()
  
    api = {
      app: BaseTestHelp.appAPI()
    }
    BaseTestHelp.l10nModule(store, api)
  })
  
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  it('1 InflectionsBrowser - render a view', () => {
    const standardFormData = {
      form: 'ἀλλήλᾱ',
      langID: Constants.LANG_GREEK,
      title: 'Reciprocal Pronoun Declension',
      viewID: 'greek_gender_pronoun_view'
    }
    // const view = ViewSetFactory.getStandardForm(standardFormData)

    const options = standardFormData

    const view = GreekViewSet.getViewByID(options.viewID)
    console.info('view - ', view)
    const homonym = view.createStandardFormHomonym(options)

    console.info('homonym - ', homonym)
  })
})