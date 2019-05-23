/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import WordTqSourceBlock from '@/vue/components/word-list/word-tq-source-block.vue'

describe('word-tq-source-block.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 WordTqSourceBlock - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordTqSourceBlock, {
      propsData: {
        source: 'fooSource',
        tqSelectors: [{
          ID: 'fooID',
          contextHTML: 'fooContextHTML'
        },
        {
          ID: 'fooID2',
          contextHTML: 'fooContextHTML2'
        }]
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.find('.alpheios-wordlists-tq-title').text()).toEqual('fooSource')
    expect(cmp.find('.alpheios-wordlists-tq-title').element.getAttribute('href')).toEqual('fooSource')

    expect(cmp.findAll('.alpheios-wordlists-tq-contextHTML').length).toEqual(2)
    expect(cmp.findAll('.alpheios-wordlists-tq-contextHTML').at(0).text()).toEqual('fooContextHTML')
    expect(cmp.findAll('.alpheios-wordlists-tq-contextHTML').at(1).text()).toEqual('fooContextHTML2')
  })
})
