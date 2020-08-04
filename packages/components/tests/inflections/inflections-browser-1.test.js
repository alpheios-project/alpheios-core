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
    expect(wideTables.length).toEqual(53)

    let prerenderedTables = cmp.findAll(WidePrerenderedTable)
    expect(prerenderedTables.length).toEqual(95)
  })

  it('3 InflectionsBrowser - renders Latin and Greek wide-tables - latin_noun_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(0)
    expect(wideTable.props().view.constructor.name).toEqual('LatinNounView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
   })

  it('4 InflectionsBrowser - renders Latin and Greek wide-tables - latin_adjective_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })


    let wideTable = cmp.findAll(InflectionsTableWide).at(1)
    expect(wideTable.props().view.constructor.name).toEqual('LatinAdjectiveView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()

  })

  it('4a InflectionsBrowser - renders Latin and Greek wide-tables - latin_adjective_comparative_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })


    let wideTable = cmp.findAll(InflectionsTableWide).at(2)
    expect(wideTable.props().view.constructor.name).toEqual('LatinAdjectiveComparativeView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()

  })

  it('4b InflectionsBrowser - renders Latin and Greek wide-tables - latin_adjective_superlative_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })


    let wideTable = cmp.findAll(InflectionsTableWide).at(3)
    expect(wideTable.props().view.constructor.name).toEqual('LatinAdjectiveSuperlativeView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()

  })

  it('5 InflectionsBrowser - renders Latin and Greek wide-tables - latin_conjugation_mood_voice_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(4)
    expect(wideTable.props().view.constructor.name).toEqual('LatinConjugationMoodVoiceView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()

  })

  it('6 InflectionsBrowser - renders Latin and Greek wide-tables - latin_conjugation_voice_mood_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(5)
    expect(wideTable.props().view.constructor.name).toEqual('LatinConjugationVoiceMoodView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()


  })

  it('7 InflectionsBrowser - renders Latin and Greek wide-tables - latin_mood_conjugation_voice_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(6)
    expect(wideTable.props().view.constructor.name).toEqual('LatinMoodConjugationVoiceView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('8 InflectionsBrowser - renders Latin and Greek wide-tables - latin_mood_voice_conjugation_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(7)
    expect(wideTable.props().view.constructor.name).toEqual('LatinMoodVoiceConjugationView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('9 InflectionsBrowser - renders Latin and Greek wide-tables - latin_voice_conjugation_mood_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(8)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVoiceConjugationMoodView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('10 InflectionsBrowser - renders Latin and Greek wide-tables - latin_voice_mood_conjugation_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(9)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVoiceMoodConjugationView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('11 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_participle_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(10)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbParticipleView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('12 InflectionsBrowser - renders Latin and Greek wide-tables - latin_infinitive_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(11)
    expect(wideTable.props().view.constructor.name).toEqual('LatinInfinitiveView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('13 InflectionsBrowser - renders Latin and Greek wide-tables - latin_imperative_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(12)
    expect(wideTable.props().view.constructor.name).toEqual('LatinImperativeView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('14 InflectionsBrowser - renders Latin and Greek wide-tables - latin_supine_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(13)
    expect(wideTable.props().view.constructor.name).toEqual('LatinSupineView')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('15 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - sum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(14)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Sum (esse,fui,futurus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('16 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - fero', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(15)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Fero (ferre, tuli, latus)')

    wideTable.vm.getRenderedView = jest.fn()

    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('17 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(16)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Malo (malle, malui)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('18 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(17)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Nolo (nolle, nolui)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('19 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - volo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(18)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Volo (velle, volui)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('20 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - eo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(19)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Eo (ire, ivi(ii), itus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('21 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - absum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(20)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Absum (abesse, afui, afuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('22 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - adsum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(21)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Adsum (adesse, adfui, adfuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('23 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - dēsum', async () => {
    // This table has not been implemented yet - it is appeared from some change - need to be checked later
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(22)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Desum (deesse, defui, defuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('24 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - insum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(23)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Insum (inesse, infui, infuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('25 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - intersum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(24)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Intersum (interesse, interfui, interfuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('26 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - obsum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(25)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Obsum (obesse, obfui, obfuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('27 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - possum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(26)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Possum (posse, potui)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('28 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - prosum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(27)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Prosum (prodesse, profui, profuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('29 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - praesum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(28)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Praesum (praeesse, praefui, praefuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('30 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - subsum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(29)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Subsum (subesse, subfui, subfuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('31 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - supersum', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(30)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Supersum (superesse, superfui, superfuturus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('32 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - queo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(31)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Queo (quire, quivi(ii), quitus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('33 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - nequeo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(32)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Nequeo (nequire, nequivi(ii), nequitus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('34 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - adeo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(33)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Adeo (adire, adivi(ii), aditus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('35 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - ineo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(34)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Ineo (inire, inivi(ii), initus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('36 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - veneo', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(35)
    expect(wideTable.props().view.constructor.name).toEqual('LatinVerbIrregularView')
    expect(wideTable.props().view.title).toEqual('Veneo (venire, venivi(ii), venitus)')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('37 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(38)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('38 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_simplified_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(39)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounSimplifiedView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('39 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm1', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(0)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm1')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('40 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm2', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(1)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm2')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('41 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm3', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(2)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm3')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('42 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm4', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(3)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm4')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('43 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm5', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(4)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm5')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('44 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm6', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(5)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm6')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('45 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm7', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(6)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm7')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('46 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm8', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(7)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm8')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('47 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm9', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(8)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm9')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('48 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm10', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(9)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm10')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('49 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm11', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(10)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm11')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('50 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm12', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(11)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm12')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('51 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm13', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(12)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm13')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('52 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm14', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(13)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm14')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('53 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm15', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(14)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm15')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('54 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm16', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(15)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm16')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('55 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm17', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(16)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm17')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('56 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_paradigm_view, paradigmID - nounpdgm18', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(17)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNounParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('nounpdgm18')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('57 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(40)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('58 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_simplified_view', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(41)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveSimplifiedView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('59 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm1', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(18)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm1')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('60 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm2', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(19)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm2')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('61 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm3', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(20)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm3')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('62 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm4', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(21)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm4')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('63 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm5', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(22)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm5')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('64 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm6', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(23)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm6')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('65 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm7', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(24)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm7')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('65 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_paradigm_view, paradigmID - adjpdgm8', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(25)
    expect(wideTable.props().view.constructor.name).toEqual('GreekAdjectiveParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('adjpdgm8')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('41 InflectionsBrowser - renders Latin and Greek wide-tables - greek_person_pronoun_view, form - νώ', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(42)
    expect(wideTable.props().view.constructor.name).toEqual('GreekPersonPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('42 InflectionsBrowser - renders Latin and Greek wide-tables - greek_person_gender_pronoun_view, form - ἡμᾶς', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(43)
    expect(wideTable.props().view.constructor.name).toEqual('GreekPersonGenderPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })


  it('43 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - ἀλλήλᾱ', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(44)
    expect(wideTable.props().view.constructor.name).toEqual('GreekGenderPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('44 InflectionsBrowser - renders Latin and Greek wide-tables - greek_lemma_gender_pronoun_view, form - τούτω', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(45)
    expect(wideTable.props().view.constructor.name).toEqual('GreekLemmaGenderPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('45 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - οἷς', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(46)
    expect(wideTable.props().view.constructor.name).toEqual('GreekGenderPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('46 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - ὥτινε', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(47)
    expect(wideTable.props().view.constructor.name).toEqual('GreekGenderPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('47 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - τίνε', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(48)
    expect(wideTable.props().view.constructor.name).toEqual('GreekGenderPronounInterrogativeView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('48 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - τινοῖν', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(49)
    expect(wideTable.props().view.constructor.name).toEqual('GreekGenderPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('49 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - αὐτά', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(50)
    expect(wideTable.props().view.constructor.name).toEqual('GreekGenderPronounView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })


  it('50 InflectionsBrowser - renders Latin and Greek wide-tables - greek_article_view, form - τοῦ', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(51)
    expect(wideTable.props().view.constructor.name).toEqual('GreekArticleView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('51 InflectionsBrowser - renders Latin and Greek wide-tables - greek_numeral_view, form - δύο', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(52)
    expect(wideTable.props().view.constructor.name).toEqual('GreekNumeralView')

    wideTable.vm.getRenderedView = jest.fn()
    wideTable.findAll('span').at(0).trigger('click')
    expect(wideTable.vm.getRenderedView).toHaveBeenCalled()
  })

  it('52 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm1', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(26)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm1')

    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })


  it('119 InflectionsBrowser - method collapseLanguage changes language state for the given languageID', async () => {
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

  it('120 InflectionsBrowser - method expands language block on mount if it is given', async () => {
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

