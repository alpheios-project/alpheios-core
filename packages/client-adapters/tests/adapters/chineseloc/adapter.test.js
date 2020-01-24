/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import AlpheiosChineseLocAdapter from '@/adapters/chineseloc/adapter'

import { Constants } from 'alpheios-data-models'

import { CedictFixture } from 'alpheios-fixtures'

describe('chineseloc.test.js', () => {
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 AlpheiosChineseLocAdapter - constructor uploads config and options', () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.config).toBeDefined()
    expect(adapter.languageID).toEqual(Constants.LANG_CHINESE)
  })

  it('2 AlpheiosChineseLocAdapter: getHomonym returns pronunciation values in a specific order', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest

    const homonym = await adapter.getHomonym('眠')
    expect(homonym.lexemes[0].lemma.features.pronunciation.values).toEqual(['mián', 'mandarin - mián', 'cantonese - min4', 'tang - *men'])
  })

  it('3 AlpheiosChineseLocAdapter: getHomonym returns a single-character traditional word', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest

    const homonym = await adapter.getHomonym('眠')

    expect(homonym).toBeDefined()

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.targetWord).toEqual('眠')

    expect(homonym.lexemes[0].lemma.languageID).toEqual(Constants.LANG_CHINESE)
    expect(homonym.lexemes[0].lemma.languageCode).toEqual(Constants.STR_LANG_CODE_ZHO)
    expect(homonym.lexemes[0].lemma.word).toEqual('眠')
    expect(homonym.lexemes[0].lemma.principalParts).toEqual([])
    expect(homonym.lexemes[0].lemma.features.pronunciation.values).toEqual(['mián', 'mandarin - mián', 'cantonese - min4', 'tang - *men'])
    expect(homonym.lexemes[0].lemma.features.note.value).toEqual('traditional')
    expect(homonym.lexemes[0].lemma.features.frequency.singleValue).toEqual(4)
    expect(homonym.lexemes[0].lemma.features.radical.value).toEqual('目')

    expect(homonym.lexemes[0].meaning.shortDefs.length).toEqual(2)
    expect(homonym.lexemes[0].meaning.shortDefs[0].text).toEqual('to sleep')
    expect(homonym.lexemes[0].meaning.shortDefs[1].text).toEqual('to hibernate')
    expect(homonym.isMultiHomonym).toBeFalsy()

    expect(adapter.errors.length).toEqual(0)
  })

  it('4 AlpheiosChineseLocAdapter: getHomonym returns a single-character simplified word', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest

    const homonym = await adapter.getHomonym('杠')

    expect(homonym).toBeDefined()

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.targetWord).toEqual('杠')

    expect(homonym.lexemes[0].lemma.languageID).toEqual(Constants.LANG_CHINESE)
    expect(homonym.lexemes[0].lemma.languageCode).toEqual(Constants.STR_LANG_CODE_ZHO)
    expect(homonym.lexemes[0].lemma.word).toEqual('杠')
    expect(homonym.lexemes[0].lemma.principalParts).toEqual([])
    expect(homonym.lexemes[0].lemma.features.pronunciation.values).toEqual(['gàng', 'mandarin - gāng', 'cantonese - gong1 gong3'])
    expect(homonym.lexemes[0].lemma.features.note.value).toEqual('simplified')
    expect(homonym.lexemes[0].lemma.features.frequency).toBeUndefined()
    expect(homonym.lexemes[0].lemma.features.radical.value).toBe('木')

    expect(homonym.lexemes[0].meaning.shortDefs.length).toEqual(7)
    expect(homonym.lexemes[0].meaning.shortDefs.map(shortDef => shortDef.text)).toEqual([
      'thick pole',
      'bar',
      'rod',
      'thick line',
      'to mark with a thick line',
      'to sharpen (knife)',
      '(old) coffin-bearing pole'
    ])
    expect(homonym.isMultiHomonym).toBeFalsy()

    expect(adapter.errors.length).toEqual(0)
  })

  it('5 AlpheiosChineseLocAdapter: getHomonym with context forward must create a correct word list', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    const sendRequestToMock = jest.fn((name, request) => ({ body: {} }))
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = sendRequestToMock
    const homonym = await adapter.getHomonym('眠', '21三體綜合症')
    expect(sendRequestToMock.mock.calls[0][1].body.getWords.words).toEqual([
      '眠',
      '眠2',
      '眠21',
      '眠21三',
      '眠21三體',
      '眠21三體綜',
      '眠21三體綜合',
      '眠21三體綜合症'
    ])
  })

  it('6 AlpheiosChineseLocAdapter: getHomonym with context forward must return a homonym with all words returned by CEDICT', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest
    const homonym = await adapter.getHomonym('日', '月盈昃')
    expect(homonym).toBeDefined()
    expect(homonym.lexemes.length).toEqual(3)
    expect(homonym.isMultiHomonym).toBeTruthy()
  })

  it('7 AlpheiosChineseLocAdapter: getHomonym must return a homonym with a multi-homonym prop set when multiple word matches are found in CEDICT', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest
    const homonym = await adapter.getHomonym('日', '月盈昃')
    expect(homonym).toBeDefined()
    expect(homonym.isMultiHomonym).toBeTruthy()
  })

  it('8 AlpheiosChineseLocAdapter: getHomonym with context forward must return value from context forward if value for selection is not found', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest

    const homonym = await adapter.getHomonym('眠', '21三體綜合症')

    expect(homonym).toBeDefined()

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.targetWord).toEqual('眠')

    expect(homonym.lexemes[0].lemma.languageID).toEqual(Constants.LANG_CHINESE)
    expect(homonym.lexemes[0].lemma.languageCode).toEqual(Constants.STR_LANG_CODE_ZHO)
    expect(homonym.lexemes[0].lemma.word).toEqual('眠')
    expect(homonym.lexemes[0].lemma.principalParts).toEqual([])
    expect(homonym.lexemes[0].lemma.features.pronunciation.values).toEqual(['mián', 'mandarin - mián', 'cantonese - min4', 'tang - *men'])
    expect(homonym.lexemes[0].lemma.features.note.value).toEqual('traditional')
    expect(homonym.lexemes[0].lemma.features.frequency.singleValue).toEqual(4)
    expect(homonym.lexemes[0].lemma.features.radical.value).toEqual('目')

    expect(homonym.lexemes[0].meaning.shortDefs.length).toEqual(2)
    expect(homonym.lexemes[0].meaning.shortDefs[0].text).toEqual('to sleep')
    expect(homonym.lexemes[0].meaning.shortDefs[1].text).toEqual('to hibernate')
    expect(homonym.isMultiHomonym).toBeFalsy()

    expect(adapter.errors.length).toEqual(0)
  })

  /*
  Multi-character words do not have tang, mandarin or cantonese pronunciations as well as frequency and radical values.
  Those values exist for single-character words only.
   */
  it('9 AlpheiosChineseLocAdapter - method getHomonym with a multi-character word returns homonym if fetch was successful', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest

    const homonym = await adapter.getHomonym('而今')

    expect(homonym).toBeDefined()

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.targetWord).toEqual('而今')

    expect(homonym.lexemes[0].lemma.languageID).toEqual(Constants.LANG_CHINESE)
    expect(homonym.lexemes[0].lemma.languageCode).toEqual(Constants.STR_LANG_CODE_ZHO)
    expect(homonym.lexemes[0].lemma.word).toEqual('而今')
    expect(homonym.lexemes[0].lemma.principalParts).toEqual([])
    expect(homonym.lexemes[0].lemma.features.pronunciation.values).toEqual(['ér jin'])
    expect(homonym.lexemes[0].lemma.features.note.value).toEqual('traditional')

    expect(homonym.lexemes[0].meaning.shortDefs.length).toEqual(2)
    expect(homonym.lexemes[0].meaning.shortDefs[0].text).toEqual('now')
    expect(homonym.lexemes[0].meaning.shortDefs[1].text).toEqual('at the present (time)')
    expect(homonym.isMultiHomonym).toBeFalsy()

    expect(adapter.errors.length).toEqual(0)
  })

  it('10 AlpheiosChineseLocAdapter: getHomonym returns a simplified multi-character word', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })
    // Stub the messaging service method
    adapter._messagingService.sendRequestTo = CedictFixture.lexisCedictRequest

    const homonym = await adapter.getHomonym('21三体综合症')

    expect(homonym).toBeDefined()

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.targetWord).toEqual('21三体综合症')

    expect(homonym.lexemes[0].lemma.languageID).toEqual(Constants.LANG_CHINESE)
    expect(homonym.lexemes[0].lemma.languageCode).toEqual(Constants.STR_LANG_CODE_ZHO)
    expect(homonym.lexemes[0].lemma.word).toEqual('21三体综合症')
    expect(homonym.lexemes[0].lemma.principalParts).toEqual([])
    expect(homonym.lexemes[0].lemma.features.pronunciation.values).toEqual(['èr shí yi san tǐ zong hé zhèng'])
    expect(homonym.lexemes[0].lemma.features.note.value).toEqual('simplified')
    expect(homonym.lexemes[0].lemma.features.frequency).toBeUndefined()

    expect(homonym.lexemes[0].meaning.shortDefs.length).toEqual(2)
    expect(homonym.lexemes[0].meaning.shortDefs[0].text).toEqual('trisomy')
    expect(homonym.lexemes[0].meaning.shortDefs[1].text).toEqual('Down\'s syndrome')
    expect(homonym.isMultiHomonym).toBeFalsy()

    expect(adapter.errors.length).toEqual(0)
  })

  it('11 AlpheiosChineseLocAdapter - method getHomonym  returns undefined if fetch was not successfull and adds an error to adapter', async () => {
    // eslint-disable-next-line prefer-const
    let adapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: 'getHomonym'
    })

    const homonym = await adapter.getHomonym('FF')

    expect(homonym).not.toBeDefined()
    expect(adapter.errors.length).toEqual(1)
  })
})
