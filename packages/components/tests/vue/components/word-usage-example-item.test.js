/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { mount } from '@vue/test-utils'

import { Constants, Author, TextWork } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'

// import wordUsageExampleItem from '@/vue/components/word-usage-examples/word-usage-examples-item.vue'

describe.skip('word-usage-example-item.test.js', () => {
  console.error = function () {}
  //console.log = function () {}
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

  it('1 wordUsageExampleItem - checks if component mounts properly', () => {
    let testWordUsageItem = testWordUsageList.wordUsageExamples[0]
    let cmp = mount(wordUsageExampleItem, {
      propsData: {
        wordUsageItem: testWordUsageItem
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordUsageExamplesBlock - prints the following data from wordUsageExample', () => {
    let testWordUsageItem = testWordUsageList.wordUsageExamples[0]

    let cmp = mount(wordUsageExampleItem, {
      propsData: {
        wordUsageItem: testWordUsageItem
      }
    })

    let textContent = cmp.element.textContent
    
    expect(textContent.includes(testWordUsageItem.prefix)).toBeTruthy()
    expect(textContent.includes(testWordUsageItem.suffix)).toBeTruthy()
    expect(textContent.includes(testWord1)).toBeTruthy()

    expect(cmp.html().includes(testWordUsageItem.fullCit())).toBeTruthy()
  })

})
