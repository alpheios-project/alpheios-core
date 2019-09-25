/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import InflectionsBrowser from '@/vue/components/inflections-browser.vue'
import InflectionsTableWide from '@/vue/components/inflections-table-wide.vue'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

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

  it('1 InflectionsBrowser - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 InflectionsBrowser - renders Latin and Greek wide-tables - checks title', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let titles = cmp.findAll('.alpheios-ib__title')
    expect(titles.length).toEqual(2)

    expect(titles.at(0).text()).toEqual(expect.stringContaining('Latin Inflection Browser'))
    expect(titles.at(1).text()).toEqual(expect.stringContaining('Greek Inflection Browser'))

    titles = cmp.findAll('.alpheios-ib__pofs-title')
    expect(titles.length).toEqual(9)

    expect(titles.at(0).text()).toEqual(expect.stringContaining('Nouns'))
    expect(titles.at(1).text()).toEqual(expect.stringContaining('Adjectives'))
    expect(titles.at(2).text()).toEqual(expect.stringContaining('Verbs'))
    expect(titles.at(3).text()).toEqual(expect.stringContaining('Nouns'))
    expect(titles.at(4).text()).toEqual(expect.stringContaining('Adjectives'))
    expect(titles.at(5).text()).toEqual(expect.stringContaining('Pronouns'))
    expect(titles.at(6).text()).toEqual(expect.stringContaining('Articles'))
    expect(titles.at(7).text()).toEqual(expect.stringContaining('Numerals'))
    expect(titles.at(8).text()).toEqual(expect.stringContaining('Verb Paradigms'))

    let wideTables = cmp.findAll(InflectionsTableWide)
    expect(wideTables.length).toEqual(118)
  })

  it('3 InflectionsBrowser - renders Latin and Greek wide-tables - latin_noun_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(0)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_noun_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
   })

  it('4 InflectionsBrowser - renders Latin and Greek wide-tables - latin_adjective_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(1)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_adjective_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })  

  it('5 InflectionsBrowser - renders Latin and Greek wide-tables - latin_conjugation_mood_voice_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(2)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_conjugation_mood_voice_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)

  })

  it('6 InflectionsBrowser - renders Latin and Greek wide-tables - latin_conjugation_voice_mood_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(3)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_conjugation_voice_mood_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
 
  })

  it('7 InflectionsBrowser - renders Latin and Greek wide-tables - latin_mood_conjugation_voice_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(4)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_mood_conjugation_voice_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('8 InflectionsBrowser - renders Latin and Greek wide-tables - latin_mood_voice_conjugation_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(5)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_mood_voice_conjugation_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('9 InflectionsBrowser - renders Latin and Greek wide-tables - latin_voice_conjugation_mood_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(6)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_voice_conjugation_mood_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('10 InflectionsBrowser - renders Latin and Greek wide-tables - latin_voice_mood_conjugation_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(7)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_voice_mood_conjugation_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('11 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_participle_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(8)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_verb_participle_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('12 InflectionsBrowser - renders Latin and Greek wide-tables - latin_infinitive_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(9)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_infinitive_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('13 InflectionsBrowser - renders Latin and Greek wide-tables - latin_imperative_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(10)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_imperative_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('14 InflectionsBrowser - renders Latin and Greek wide-tables - latin_supine_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(11)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_supine_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(3)


  })

  it('15 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - sum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(12)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'sum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('16 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - fero', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(13)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'fero'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('17 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(14)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'malo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('18 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(15)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'nolo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('19 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(16)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'volo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('20 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - eo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(17)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'eo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('21 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - absum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(18)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'absum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('22 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - adsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(19)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'adsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('23 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - dēsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(20)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'dēsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('24 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - insum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(21)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'insum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('25 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - intersum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(22)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'intersum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('26 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - obsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(23)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'obsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('27 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - possum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(24)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'possum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('28 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - prosum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(25)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'prosum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('29 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - praesum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(26)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'praesum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('30 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - subsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(27)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'subsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('31 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - supersum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(28)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'supersum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('32 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - queo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(29)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'queo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('33 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - nequeo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(30)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'nequeo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('34 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - adeo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(31)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'adeo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('35 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - ineo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(32)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'ineo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('36 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - veneo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(33)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'veneo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })


  it('37 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(34)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_noun_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('38 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_simplified_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(35)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_noun_simplified_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('39 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(36)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_adjective_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('40 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_simplified_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(37)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_adjective_simplified_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('41 InflectionsBrowser - renders Latin and Greek wide-tables - greek_person_pronoun_view, form - νώ', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(38)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_person_pronoun_view',
      form: 'νώ'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('42 InflectionsBrowser - renders Latin and Greek wide-tables - greek_person_gender_pronoun_view, form - ἡμᾶς', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(39)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_person_gender_pronoun_view',
      form: 'ἡμᾶς'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })


  it('43 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - ἀλλήλᾱ', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(40)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'ἀλλήλᾱ'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('44 InflectionsBrowser - renders Latin and Greek wide-tables - greek_lemma_gender_pronoun_view, form - τούτω', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(41)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_lemma_gender_pronoun_view',
      form: 'τούτω'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('45 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - οἷς', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(42)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'οἷς'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('46 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - ὥτινε', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(43)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'ὥτινε'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('47 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - τίνε', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(44)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'τίνε'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('48 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - τινοῖν', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(45)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'τινοῖν'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('49 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - αὐτά', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(46)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'αὐτά'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })


  it('50 InflectionsBrowser - renders Latin and Greek wide-tables - greek_article_view, form - τοῦ', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(47)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_article_view',
      form: 'τοῦ'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('51 InflectionsBrowser - renders Latin and Greek wide-tables - greek_numeral_view, form - δύο', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(48)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_numeral_view',
      form: 'δύο'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('52 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm1', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(49)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm1'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  
  it('119 InflectionsBrowser - method collapseLanguage changes language state for the given languageID', () => {
    let cmp = shallowMount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })
    
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeTruthy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()

    cmp.vm.collapseLanguage(Constants.LANG_LATIN)

    expect(cmp.vm.collapsed['Symbol(latin)']).toBeFalsy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()

    cmp.vm.collapseLanguage(Constants.LANG_GREEK)

    expect(cmp.vm.collapsed['Symbol(latin)']).toBeTruthy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeFalsy()

    cmp.vm.collapseLanguage(Constants.LANG_LATIN)
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeFalsy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()

    cmp.vm.collapseLanguage(Constants.LANG_GREEK)
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeTruthy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeFalsy()
  })

  it('120 InflectionsBrowser - method expands language block on mount if it is given', () => {
    store.commit('app/setTestCurrentLanguageID', Constants.LANG_LATIN)

    let cmp = shallowMount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })
    
    
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeFalsy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()
  })

})

