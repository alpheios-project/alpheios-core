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

  it('52 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm2', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(1)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm2')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('53 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm3', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(2)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm3')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('54 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm4', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(3)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm4')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('55 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm5', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(4)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm5')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('56 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm6', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(5)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm6')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('57 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm7', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(6)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm7')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('58 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm8', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(7)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm8')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('59 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm9', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(8)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm9')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('60 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm10', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(9)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm10')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })


  it('61 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm11', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(10)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm11')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('62 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm12', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(11)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm12')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('63 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm13', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(12)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm13')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('64 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm14', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(13)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm14')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('65 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm15', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(14)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm15')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('66 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm16', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(15)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm16')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('67 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(16)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm17')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('68 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17b', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(17)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm17b')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('69 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17c', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(18)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm17c')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('70 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm18', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(19)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm18')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('71 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm19', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(20)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm19')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('72 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm20', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(21)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm20')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('73 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm21', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(22)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm21')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('74 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm22', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(23)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm22')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)

    wideTable.findAll('span').at(0).trigger('click')
  })

  it('75 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm23', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(24)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm23')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('76 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm24', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(25)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm24')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('77 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm25', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(26)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm25')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('78 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm26', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(27)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm26')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('79 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm27', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(28)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm27')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('80 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm28', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(29)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm28')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('81 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm29', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(30)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm29')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('82 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm30', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(31)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm30')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('83 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm31', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(32)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm31')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('84 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm32', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(33)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm32')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('85 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm33', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(34)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm33')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('86 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm34', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(35)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm34')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('87 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm35', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(36)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm35')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('88 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm36', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(37)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm36')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('89 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm37', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(38)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm37')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('90 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm38', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(39)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm38')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('91 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm39', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(40)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm39')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('92 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm40', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(41)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm40')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('93 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm41', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(42)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm41')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('94 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm42', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(43)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm42')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('95 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm43', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(44)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm43')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('96 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm43b', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(45)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm43b')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('97 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm44', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(46)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm44')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('98 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm45', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(47)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm45')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('99 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm46', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(48)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm46')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('100 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm47', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(49)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm47')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('101 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm48', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(50)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm48')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('102 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm49', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(51)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm49')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })
  
  it('103 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm50', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(52)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm50')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('104 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm51', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(53)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm51')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('105 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm52', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(54)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm52')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('106 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm53', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(55)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm53')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('107 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm54', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(56)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm54')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('108 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm55', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(57)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm55')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('109 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm56', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(58)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm56')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('109 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm57', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(59)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm57')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('110 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm58', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(60)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm58')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('111 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm59', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(61)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm59')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('112 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm60', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(62)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm60')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('113 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm61', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(63)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm61')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('114 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm62', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(64)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm62')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('115 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm63', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(65)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm63')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('116 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm64', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(66)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm64')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('117 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm65', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(67)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm65')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })

  it('118 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm66', async () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(WidePrerenderedTable).at(68)
    expect(wideTable.props().view.constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(wideTable.props().view.paradigm.paradigmID).toEqual('verbpdgm66')
    
    expect(wideTable.props().view.wideTable.rows.length).toBeGreaterThan(0)
  })
})

