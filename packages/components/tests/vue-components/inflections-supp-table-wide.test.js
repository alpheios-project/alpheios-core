/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { shallowMount, mount } from '@vue/test-utils'
import WideSupplementalInflectionsTable from '@/vue-components/inflections-supp-table-wide.vue'

import { ViewSetFactory, LanguageDatasetFactory } from 'alpheios-inflection-tables'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import { Constants, Feature } from 'alpheios-data-models'

import VerbTestInflectionTable from './inflectionsTables/verbTestInflectionTable.js'

describe('inflections-supp-table-wide.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testParadigm

  beforeAll(async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(Constants.LANG_GREEK, 'συνδέει')
    let testInflectionData = await LanguageDatasetFactory.getInflectionData(testHomonym)

    let inflectionViewSet = ViewSetFactory.create(testHomonym, 'en-US')
    let views = inflectionViewSet.getViews('verb')
    let testView = views[0]
    testParadigm = testView.suppParadigms[0]
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

  it('1 WideSupplementalInflectionsTable - renders a vue instance (min requirements)', () => {
    let cmp = mount(WideSupplementalInflectionsTable, {
      propsData: {
        data: testParadigm,
        bgColor: 'transparent',
        messages: []
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WideSupplementalInflectionsTable - cellClasses method  returns classes depending on cell features', () => {
    let cmp = mount(WideSupplementalInflectionsTable, {
      propsData: {
        data: testParadigm,
        bgColor: 'transparent',
        messages: []
      }
    })

    let cellLabel = { role: 'label' }
    expect(cmp.vm.cellClasses(cellLabel)).toEqual('infl-prdgm-tbl-cell--label')

    let cellData = { role: 'data' }
    expect(cmp.vm.cellClasses(cellData)).toEqual('infl-prdgm-tbl-cell--data')
  })

  it('3 WideSupplementalInflectionsTable - navigate method emits navigate event with reflink', () => {
    let cmp = mount(WideSupplementalInflectionsTable, {
      propsData: {
        data: testParadigm,
        bgColor: 'transparent',
        messages: []
      }
    })

    cmp.vm.navigate()
    expect(cmp.emitted()['navigate']).toBeTruthy()
    expect(cmp.emitted()['navigate'][0]).toEqual(['top'])
  })

  it('4 WideInflectionsSubTables - full compare for testHomonym (συνδέει) - first view (present system middle-passive of contract verbs in -έω)', () => {
    let cmp = mount(WideSupplementalInflectionsTable, {
      propsData: {
        data: testParadigm,
        bgColor: 'transparent',
        messages: []
      }
    })

    let correctHTMLTbl = VerbTestInflectionTable.wideSupplementalInflectionsTableResult
    expect(cmp.find('.infl-supp-tbl__cont').html()).toEqual(correctHTMLTbl)
  })
})
