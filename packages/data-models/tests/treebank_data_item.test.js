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
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 TreebankDataItem - constructor throws error on missing source Element', () => {
    expect(function () {
      let wdElem = document.createElement("span")
      wdElem.setAttribute("data-alpheios_tb_ref","treebank#1-1")
      document.body.appendChild(wdElem)
      let item = new TreebankDataItem(wdElem)
    }).toThrowError(/No treebank source url/)
  })

  it('2 TreebankDataItem - constructor throws error on missing reference', () => {
    expect(function () {
      let srcElem = document.createElement("div")
      srcElem.setAttribute("data-alpheios_tb_src","http://example.org/DOC/SENTENCE/WORD")
      document.body.appendChild(srcElem)
      let wdElem = document.createElement("span")
      document.body.appendChild(wdElem)
      let item = new TreebankDataItem(wdElem)
    }).toThrowError(/Missing treebank reference/)
  })

  it('3 TreebankDataItem - constructor throws error on invalid reference', () => {
    expect(function () {
      let srcElem = document.createElement("div")
      srcElem.setAttribute("data-alpheios_tb_src","http://example.org/DOC/SENTENCE/WORD")
      document.body.appendChild(srcElem)
      let wdElem = document.createElement("span")
      wdElem.setAttribute("data-alpheios_tb_ref","treebank")
      document.body.appendChild(wdElem)
      let item = new TreebankDataItem(wdElem)
    }).toThrowError(/Invalid treebank reference/)
  })

  it('4 TreebankDataItem - constructs full item', () => {
    let srcElem = document.createElement("div")
    srcElem.setAttribute("data-alpheios_tb_src","http://example.org/DOC/SENTENCE/WORD")
    document.body.appendChild(srcElem)
    let wdElem = document.createElement("span")
    wdElem.setAttribute("data-alpheios_tb_ref","treebank#1-1")
    document.body.appendChild(wdElem)
    let item = new TreebankDataItem(wdElem)
    expect(item.provider).toEqual("http://example.org")
    expect(item.fullUrl).toEqual("http://example.org/treebank/1/1")
    expect(item.doc).toEqual('treebank')
    expect(item.sentenceId).toEqual("1")
    expect(item.wordId).toEqual("1")
  })
})
