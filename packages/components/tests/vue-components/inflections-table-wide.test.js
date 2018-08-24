/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { shallowMount, mount } from '@vue/test-utils'
import WideInflectionsTable from '@/vue-components/inflections-table-wide.vue'
import { ViewSetFactory, LanguageDatasetFactory } from 'alpheios-inflection-tables'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import { Constants, Feature } from 'alpheios-data-models'

import VerbTestInflectionTable from './inflectionsTables/verbTestInflectionTable.js'

describe('inflections-table-wide.test.js', () => {
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

  it('1 WideInflectionsTable - renders a vue instance (min requirements)', () => {
    let cmp = mount(WideInflectionsTable)
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WideInflectionsTable - renders a vue instance with a view', () => {
    let cmp = mount(WideInflectionsTable, {
      propsData: {
        view: testView
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('3 WideInflectionsTable - cellClasses method  returns classes depending on cell features', () => {
    let cmp = mount(WideInflectionsTable, {
      propsData: {
        view: testView
      }
    })

    let cellLabel = { role: 'label' }
    expect(cmp.vm.cellClasses(cellLabel)).toEqual('infl-prdgm-tbl-cell--label')

    let cellData = { role: 'data', tense: new Feature(Feature.types.tense, 'indicative', Constants.LANG_GREEK) }
    expect(cmp.vm.cellClasses(cellData)).toEqual('infl-prdgm-tbl-cell--data')

    let cellFullMatchData = {
      role: 'data',
      value: 'ποιῇ',
      mood: new Feature(Feature.types.mood, 'indicative', Constants.LANG_GREEK),
      'part of speech': new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK),
      number: new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK),
      person: new Feature(Feature.types.person, '2nd', Constants.LANG_GREEK),
      tense: new Feature(Feature.types.tense, 'present', Constants.LANG_GREEK)
    }

    expect(cmp.vm.cellClasses(cellFullMatchData)).toEqual('infl-prdgm-tbl-cell--data infl-prdgm-tbl-cell--full-match')
  })

  it.skip('4 WideInflectionsTable - full compare for testHomonym (συνδέει) - first view (present system middle-passive of contract verbs in -έω)', () => {
    let cmp = mount(WideInflectionsTable, {
      propsData: {
        view: testView
      }
    })

    let correctHTMLTbl = VerbTestInflectionTable.wideInflectionsTableResult
    expect(cmp.find('.infl-prdgm-tbl').html()).toEqual(correctHTMLTbl)
  })
})
