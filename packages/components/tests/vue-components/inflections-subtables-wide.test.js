/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { shallowMount, mount } from '@vue/test-utils'
import WideInflectionsSubTables from '@/vue-components/inflections-subtables-wide.vue'

import { ViewSetFactory, LanguageDatasetFactory } from 'alpheios-inflection-tables'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import { Constants, Feature } from 'alpheios-data-models'

import VerbTestInflectionTable from './inflectionsTables/verbTestInflectionTable.js'

describe('inflections-subtables-wide.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testView

  beforeAll(async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(Constants.LANG_GREEK, 'συνδέει')
    let testInflectionData = await LanguageDatasetFactory.getInflectionData(testHomonym)

    let inflectionViewSet = ViewSetFactory.create(testHomonym, 'en-US')
    let views = inflectionViewSet.getViews('verb')
    testView = views[0]
  })
  beforeEach(() => {
    jest.spyOn(console, 'error')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 WideInflectionsSubTables - renders a vue instance (min requirements)', () => {
    let cmp = mount(WideInflectionsSubTables, {
      propsData: {
        view: testView
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WideInflectionsSubTables - cellClasses method  returns classes depending on cell features', () => {
    let cmp = mount(WideInflectionsSubTables, {
      propsData: {
        view: testView
      }
    })

    let cellLabel = { role: 'label' }
    expect(cmp.vm.cellClasses(cellLabel)).toEqual('infl-prdgm-tbl__cell--label')

    let cellData = { role: 'data' }
    expect(cmp.vm.cellClasses(cellData)).toEqual('infl-prdgm-tbl__cell--data')
  })

  it('3 WideInflectionsSubTables - refColors method  returns color depending on paradigm and view properties', () => {
    let cmp = mount(WideInflectionsSubTables, {
      propsData: {
        view: testView
      }
    })

    expect(cmp.vm.refColor('verbpdgm65')).toEqual('transparent')
  })

  it('4 WideInflectionsSubTables - navigate method emits navigate event with reflink', () => {
    let cmp = mount(WideInflectionsSubTables, {
      propsData: {
        view: testView
      }
    })

    cmp.vm.navigate('foolink')
    expect(cmp.emitted()['navigate']).toBeTruthy()
    expect(cmp.emitted()['navigate'][0]).toEqual(['foolink'])
  })

  it.skip('5 WideInflectionsSubTables - full compare for testHomonym (συνδέει) - first view (present system middle-passive of contract verbs in -έω)', () => {
    let cmp = mount(WideInflectionsSubTables, {
      propsData: {
        view: testView
      }
    })

    let correctHTMLTbl = VerbTestInflectionTable.wideInflectionsSubTableResult
    expect(cmp.find('.infl-prdgm-tbl').html()).toEqual(correctHTMLTbl)
  })
})