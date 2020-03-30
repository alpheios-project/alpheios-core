/* eslint-env jest */
/* eslint-disable no-unused-vars */
import TreebankDataItem from '../src/treebank_data_item'

describe('treebank_data_item.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
    document.body.innerHTML = ''
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 TreebankDataItem - hasTreebankData is falsy if some data is missing', () => {
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank#1-1')
    document.body.appendChild(wdElem)
    const item = new TreebankDataItem(wdElem)
    expect(item.hasTreebankData).toBeFalsy()
  })

  it('2 TreebankDataItem - fail on reference missing', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app','perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    document.body.appendChild(wdElem)
    expect.assertions(1)
    try {
      const item = new TreebankDataItem(wdElem)
    } catch(error) {
      expect(error).toHaveProperty('message','Cannot find an element with the data-alpheios_tb_ref data attribute among the ancestors')
    }
  })

  it('3 TreebankDataItem - fail on invalid reference', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app','perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank')
    document.body.appendChild(wdElem)
    expect.assertions(1)
    try {
      const item = new TreebankDataItem(wdElem)
    } catch(error) {
      expect(error.message).toEqual(expect.stringContaining("Invalid treebank reference"))
    }
  })

  it('4 TreebankDataItem - fail on invalid app', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app','myapp')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank#1-1')
    document.body.appendChild(wdElem)
    expect.assertions(1)
    try {
      const item = new TreebankDataItem(wdElem)
    } catch(error) {
      expect(error.message).toEqual(expect.stringContaining("Unsupported treebank application."))
    }
  })

  it('4 TreebankDataItem - constructs full item', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app','perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank#1-1')
    document.body.appendChild(wdElem)
    const item = new TreebankDataItem(wdElem)
    console.info("TB ITEM",item)
    expect(item.provider).toEqual('http://example.org')
    expect(item.fullUrl).toEqual('http://example.org/treebank/1/1')
    expect(item.doc).toEqual('treebank')
    expect(item.sentenceId).toEqual('1')
    expect(item.wordId).toEqual('1')
  })
})
