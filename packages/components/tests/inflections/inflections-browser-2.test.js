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

  // has status not implemented yet
  it('53 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm3', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(51)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm3'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('54 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm4', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(52)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm4'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('55 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm5', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(53)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm5'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('56 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm6', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(54)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm6'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('57 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm7', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(55)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm7'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('58 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm8', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(56)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm8'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('59 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm9', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(57)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm9'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('60 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm10', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(58)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm10'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })


  it('61 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm11', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(59)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm11'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('62 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm12', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(60)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm12'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('63 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm13', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(61)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm13'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('64 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm14', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(62)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm14'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('65 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm15', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(63)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm15'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('66 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm16', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(64)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm16'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('67 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(65)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm17'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('68 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17b', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(66)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm17b'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('69 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17c', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(67)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm17c'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('70 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm18', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(68)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm18'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('71 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm19', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(69)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm19'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('72 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm20', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(70)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm20'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('73 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm21', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(71)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm21'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('74 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm22', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(72)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm22'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('75 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm23', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(73)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm23'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('76 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm24', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(74)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm24'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('77 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm25', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(75)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm25'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('78 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm26', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(76)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm26'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('79 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm27', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(77)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm27'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('80 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm28', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(78)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm28'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('81 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm29', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(79)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm29'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('82 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm30', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(80)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm30'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('83 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm31', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(81)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm31'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('84 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm32', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(82)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm32'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('85 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm33', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(83)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm33'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('86 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm34', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(84)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm34'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('87 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm35', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(85)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm35'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('88 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm36', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(86)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm36'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('89 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm37', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(87)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm37'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('90 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm38', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(88)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm38'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('91 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm39', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(89)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm39'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('92 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm40', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(90)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm40'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('93 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm41', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(91)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm41'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('94 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm42', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(92)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm42'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('95 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm43', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(93)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm43'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('96 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm43b', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(94)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm43b'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('97 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm44', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(95)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm44'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('98 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm45', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(96)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm45'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('99 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm46', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(97)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm46'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('100 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm47', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(98)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm47'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('101 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm48', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(99)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm48'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('102 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm49', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(100)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm49'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })
  
  it('103 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm50', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(101)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm50'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('104 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm51', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(102)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm51'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('105 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm52', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(103)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm52'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('106 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm53', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(104)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm53'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('107 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm54', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(105)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm54'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('108 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm55', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(106)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm55'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('109 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm56', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(107)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm56'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('109 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm57', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(108)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm57'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('110 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm58', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(109)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm58'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('111 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm59', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(110)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm59'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('112 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm60', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(111)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm60'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('113 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm61', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(112)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm61'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('114 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm62', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(113)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm62'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('115 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm63', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(114)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm63'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('116 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm64', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(115)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm64'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('117 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm65', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(116)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm65'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('118 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm66', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(117)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm66'
    }))

    wideTable.findAll('span').at(0).trigger('click')
    await Vue.nextTick()

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })


})

