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
    wdElem.setAttribute('data-alpheios_tb_app', 'perseids-treebank-template')
    wdElem.setAttribute('data-alpheios_tb_app_version', '1')
    wdElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank#1-1')
    document.body.appendChild(wdElem)
    const item = new TreebankDataItem(wdElem)
    expect(item.hasTreebankData).toBeFalsy()
  })

  it('2 TreebankDataItem - fail on reference missing', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app', 'perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    srcElem.appendChild(wdElem)
    expect.assertions(1)
    try {
      const item = new TreebankDataItem(wdElem)
    } catch (error) {
      expect(error).toHaveProperty('message', 'An element does not have data-alpheios_tb_ref, data-alpheios_tb_word or data-alpheios_tb_sent attributes')
    }
  })

  it('3 TreebankDataItem - fail on invalid reference', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app', 'perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank')
    srcElem.appendChild(wdElem)
    expect.assertions(1)
    try {
      const item = new TreebankDataItem(wdElem)
    } catch (error) {
      expect(error.message).toEqual(expect.stringContaining('Invalid treebank reference'))
    }
  })

  it('4 TreebankDataItem - fail on invalid app', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app', 'myapp')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/WORD')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank#1-1')
    srcElem.appendChild(wdElem)
    expect.assertions(1)
    try {
      const item = new TreebankDataItem(wdElem)
    } catch (error) {
      expect(error.message).toEqual(expect.stringContaining('Unsupported treebank application.'))
    }
  })

  it('5 TreebankDataItem - constructs full item with data-alpheios_tb_ref and a single word', () => {
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app', 'perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', 'treebank#1-1')
    srcElem.appendChild(wdElem)
    const item = new TreebankDataItem(wdElem)
    expect(item.provider).toEqual('http://example.org')
    expect(item.fullUrl).toEqual('http://example.org/treebank/1/')
    expect(item.doc).toEqual('treebank')
    expect(item.sentenceId).toEqual('1')
    expect(item.wordIds).toMatchObject(['1'])
  })

  it('6 TreebankDataItem - constructs full item with data-alpheios_tb_ref and multiple words', () => {
    const docID = 'treebank'
    const sentID = '3'
    const wordID1 = '1'
    const wordID2 = '2'
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app', 'perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_ref', `${docID}#${sentID}-${wordID1} ${docID}#${sentID}-${wordID2}`)
    srcElem.appendChild(wdElem)
    const item = new TreebankDataItem(wdElem)
    expect(item.provider).toEqual('http://example.org')
    expect(item.fullUrl).toEqual(`http://example.org/${docID}/${sentID}/`)
    expect(item.doc).toEqual(docID)
    expect(item.sentenceId).toEqual(sentID)
    expect(item.wordIds).toMatchObject([wordID1, wordID2])
  })

  it('7 TreebankDataItem - constructs full item with single-valued data-alpheios_tb_word', () => {
    const docID = 'treebank'
    const sentID = '3'
    const wordID = '5'
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app', 'perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_doc', docID)
    wdElem.setAttribute('data-alpheios_tb_sent', sentID)
    wdElem.setAttribute('data-alpheios_tb_word', wordID)
    srcElem.appendChild(wdElem)
    const item = new TreebankDataItem(wdElem)
    expect(item.provider).toEqual('http://example.org')
    expect(item.fullUrl).toEqual(`http://example.org/${docID}/${sentID}/`)
    expect(item.doc).toEqual(docID)
    expect(item.sentenceId).toEqual(sentID)
    expect(item.wordIds).toMatchObject([wordID])
  })

  it('8 TreebankDataItem - constructs full item with multiple-valued data-alpheios_tb_word', () => {
    const docID = 'treebank'
    const sentID = '3'
    const wordID1 = '5'
    const wordID2 = '12'
    const srcElem = document.createElement('div')
    srcElem.setAttribute('data-alpheios_tb_app', 'perseids-treebank-template')
    srcElem.setAttribute('data-alpheios_tb_app_version', '1')
    srcElem.setAttribute('data-alpheios_tb_app_url', 'http://example.org/DOC/SENTENCE/')
    document.body.appendChild(srcElem)
    const wdElem = document.createElement('span')
    wdElem.setAttribute('data-alpheios_tb_doc', docID)
    wdElem.setAttribute('data-alpheios_tb_sent', sentID)
    wdElem.setAttribute('data-alpheios_tb_word', `${wordID1} ${wordID2}`)
    srcElem.appendChild(wdElem)
    const item = new TreebankDataItem(wdElem)
    expect(item.provider).toEqual('http://example.org')
    expect(item.fullUrl).toEqual(`http://example.org/${docID}/${sentID}/`)
    expect(item.doc).toEqual(docID)
    expect(item.sentenceId).toEqual(sentID)
    expect(item.wordIds).toMatchObject([wordID1, wordID2])
  })
})
