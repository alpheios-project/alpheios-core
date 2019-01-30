/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { mount } from '@vue/test-utils'

import { Constants, Author, TextWork, ResourceProvider } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'

import WordUsageExamplesBlock from '@/vue/components/word-usage-examples-block.vue'
import wordUsageExampleItem from '@/vue/components/word-usage-example-item.vue'

describe('word-usage-examples-block.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testWordUsageList, testWord1

  beforeAll(async () => {
    let testAuthor = new Author('urn:cts:latinLit:phi0690', { "eng": "Virgil" })
    testAuthor.ID = 690
    let testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { "eng": "Aeneid" })
    testTextWork.ID = 3
    testWord1 = 'submersasque'

    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: testWord1
      }
    })

    let filterOptions = {
      author: testAuthor,
      textWork: testTextWork
    }

    let paginationOptions =  {
      property: 'max',
      value: 5
    }

    let adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
      method: 'getWordUsageExamples',
      params: { homonym: adapterTuftsRes.result, filters: filterOptions, pagination: paginationOptions }
    })

    testWordUsageList = adapterConcordanceRes.result
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })
  
  it('1 WordUsageExamplesBlock - checks if component mounts properly', async () => {
    let cmp = mount(WordUsageExamplesBlock, {
      propsData: {
        wordUsageList: testWordUsageList.wordUsageExamples,
        targetWord: testWord1,
        language: 'lat',
        provider: 'fooProvider'
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordUsageExamplesBlock - doesn\'t render wordUsageExampleItem if wordUsageList is empty', async () => {
    let cmp = mount(WordUsageExamplesBlock, {
      propsData: {
        wordUsageList: [],
        targetWord: testWord1,
        language: 'lat',
        provider: 'fooProvider'
      }
    })
    expect(cmp.vm.showWordUsageExampleItems).toBeFalsy()
    expect(cmp.findAll(wordUsageExampleItem).length).toEqual(0)
  })

  it('3 WordUsageExamplesBlock - renders wordUsageExampleItem for each item in the list', async () => {
    let cmp = mount(WordUsageExamplesBlock, {
      propsData: {
        wordUsageList: testWordUsageList.wordUsageExamples,
        targetWord: testWord1,
        language: 'lat',
        provider: 'fooProvider'
      }
    })
    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()
    expect(cmp.findAll(wordUsageExampleItem).length).toEqual(testWordUsageList.wordUsageExamples.length)
  })

  it('4 WordUsageExamplesBlock - renders provider data if exists', async () => {
    const resourceProviderName = 'Resource Provider'
    let cmp = mount(WordUsageExamplesBlock, {
      propsData: {
        wordUsageList: testWordUsageList.wordUsageExamples,
        targetWord: testWord1,
        language: 'lat',
        provider: new ResourceProvider('https://test.com', resourceProviderName)
      }
    })
    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()
    expect(cmp.find('.alpheios-word_usage_list__provider')).toBeTruthy()
    expect(cmp.find('.alpheios-word_usage_list__provider').text()).toEqual(resourceProviderName)
  })
})
