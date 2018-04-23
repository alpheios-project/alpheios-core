/* eslint-env jest */
import { mount } from '@vue/test-utils'
import LemmaTranslation from '../../src/vue-components/lemma-translation.vue'

describe('lemma-translation.test.js', () => {
  let lemmaKey = 'capio-lat-verb-3rd-very frequent-Ox.Lat.Dict.-transitive'
  let translations = {}
  translations[lemmaKey] = {meanings: 'taking/seizing; [usus ~ => getting ownership by continued possession];'}

  let translationsNoValue = {}

  it('show hasValue for lemmakey with translations', () => {
    let cmpWithValue = mount(LemmaTranslation, {
      propsData: {
        lemmakey: lemmaKey,
        translations: translations
      }
    })

    expect(cmpWithValue.find('.alpheios-lemma__translations .hasValue').exists()).toBeTruthy()
  })

  it('hasValue div contains translation for lemmakey with translations', () => {
    let cmpWithValue = mount(LemmaTranslation, {
      propsData: {
        lemmakey: lemmaKey,
        translations: translations
      }
    })
    expect(cmpWithValue.find('.alpheios-lemma__translations .hasValue').text()).toEqual('taking/seizing; [usus ~ => getting ownership by continued possession];')
  })

  it('show noValue for lemmakey with empty translations', () => {
    let cmpNoValue = mount(LemmaTranslation, {
      propsData: {
        lemmakey: lemmaKey,
        translations: translationsNoValue
      }
    })

    expect(cmpNoValue.find('.alpheios-lemma__translations .noValue').exists()).toBeTruthy()
  })

  it('noValue div contains There is no translations for lemma', () => {
    let cmpNoValue = mount(LemmaTranslation, {
      propsData: {
        lemmakey: lemmaKey,
        translations: translationsNoValue
      }
    })
    expect(cmpNoValue.find('.alpheios-lemma__translations .noValue').text()).toEqual('There is no translations for lemma')
  })
}) // Create a copy of the original component with full values
