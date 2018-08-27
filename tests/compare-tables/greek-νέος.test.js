/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { shallowMount, mount } from '@vue/test-utils'
import Inflections from '@/vue-components/inflections.vue'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

import WideTableVue from '@/vue-components/inflections-table-prerendered.vue'

import { Constants } from 'alpheios-data-models'
import { ViewSetFactory } from 'alpheios-inflection-tables'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'

describe('greek-νέος.test.js', () => {
  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  const maAdapter = new AlpheiosTuftsAdapter()
  const testLocale = 'en-US'
  let testHomonym, VS, cmp
  let targetWord = 'νέος'

  beforeAll(async () => {
    testHomonym = await maAdapter.getHomonym(Constants.LANG_GREEK, targetWord)
    VS = ViewSetFactory.create(testHomonym, testLocale)
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    cmp = mount(Inflections, {
      propsData: {
        data: {
          visible: true,
          inflectionViewSet: VS
        },
        messages: l10n.messages,
        locale: testLocale
      },
      stubs: {
        wordForms: { template: '<div data="wordForms"></div>' },
        alphTooltip: { template: '<div data="alphTooltip"></div>' }
      }
    })
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  let checkParts = [
    { part: 'adjective', view: 'adjectiveDeclension' },
    { part: 'adjective', view: 'adjectiveDeclensionSimplified' }
  ]

  for (let i = 0; i < checkParts.length; i++) {
    let viewName = checkParts[i].view ? checkParts[i].view : 'no view defined'

    it(`${i} Greek ${targetWord} - ${checkParts[i].part}, ${viewName}`, async () => {
      cmp.vm.partOfSpeechSelector = checkParts[i].part
      if (checkParts[i].view) {
        cmp.vm.viewSelector = checkParts[i].view
      }

      expect(cmp.isVueInstance()).toBeTruthy()
      expect(cmp.findAll('#alpheios-wide-vue-table').length).toBeGreaterThan(0)
      expect(cmp.findAll('#alph-inflection-table-wide').length).toBeGreaterThan(0)

      let newT = cmp.find('#alpheios-wide-vue-table')
      let oldT = cmp.find('#alph-inflection-table-wide')

      // compare rowTitles
      const rowTitlesCells = newT.findAll('.row-title-cell')
      rowTitlesCells.filter((cellRowTitle, index) => {
        expect(cellRowTitle.find('span').text()).toEqual(oldT.findAll('.row-title-cell').at(index).text())
      })

      // compare cells
      const dataCells = newT.findAll('.infl-cell').filter(cell => !cell.classes().includes('row-title-cell'))

      dataCells
        .filter((cell, index) => {
          let compareOldT = oldT.findAll('.infl-cell').filter(cell => !cell.classes().includes('row-title-cell')).at(index)

          let newText = cell.text().replace(/ /g, '').replace(/(?:\r\n|\r|\n)/g, '')
          let oldText = cell.text().replace(/ /g, '').replace(/(?:\r\n|\r|\n)/g, '')

          // console.info('compare cell new', index, cell.html(), newText)
          // console.info('compare cell old', index, compareOldT.html(), oldText)

          expect(newText).toEqual(oldText)
        })

      // compare infl-suff--suffix-match
      const suffixMatchCells = newT.findAll('.infl-suff--suffix-match')

      suffixMatchCells.filter((cellSM, index) => {
        expect(cellSM.text()).toEqual(oldT.findAll('.infl-suff--suffix-match').at(index).text())
      })

      // compare infl-suff--full-feature-match
      const fullMatchCells = newT.findAll('.infl-suff--full-feature-match')
      fullMatchCells.filter((cellSFM, index) => {
        expect(cellSFM.text()).toEqual(oldT.findAll('.infl-suff--full-feature-match').at(index).text())
      })

      // console.info(`${i} Latin Fero - ${checkParts[i].part}, ${viewName} - compared row titles - ${rowTitlesCells.length}, data cells - ${dataCells.length}, suffix match - ${suffixMatchCells.length}, full match - ${fullMatchCells.length}`)
    })
  }
})
