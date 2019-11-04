/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, WordItem, TextQuoteSelector, LanguageModelFactory as LMF } from 'alpheios-data-models'
import UserDataManager from '@/controllers/user-data-manager'

import WordItemIndexedDbDriver from '@/storage/worditem-indexeddb-driver.js'
import WordItemRemoteDbDriver from '@/storage/worditem-remotedb-driver.js'
import IndexedDBAdapter from '@/storage/indexed-db-adapter.js'
import RemoteDBAdapter from '@/storage/remote-db-adapter.js'
import WordlistController from '@/controllers/wordlist-controller'

import axios from 'axios'

import IndexedDB from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'

describe('user-data-manager.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let localAdapter, remoteAdapter, auth

  beforeAll( () => {
    window.indexedDB = IndexedDB
    window.IDBKeyRange = IDBKeyRange
    auth  = {
      accessToken: process.env.AUTH_TOKEN,
      userId: 'auth0|alpheiosMockUser',
      endpoints: {
        wordlist: process.env.ENDPOINT
      }
    }

    let dbDriverRemote = new WordItemRemoteDbDriver(auth)
    remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    let dbDriverLocal = new WordItemIndexedDbDriver(auth.userId)
    localAdapter = new IndexedDBAdapter(dbDriverLocal)
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

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function getWordItemStep1 (targetWord, languageCode, contextData = {}) {
    let wordItem = new WordItem({ targetWord, languageCode })

    let tqselector = TextQuoteSelector.readObject({
      languageCode: languageCode,
      targetWord: targetWord,
      target: {
        source: contextData.source || 'foosource',
        selector: {
        exact: targetWord,
        prefix: contextData.prefix || 'fooprefix',
        suffix: contextData.suffix || 'foosuffix'
        }
      }
    })
    wordItem.addContext([tqselector])
    return wordItem
  }

  async function getWordItemStep2 (wordItem) {
    let langId = LMF.getLanguageIdFromCode(wordItem.languageCode)
    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: langId,
        word: wordItem.targetWord
      }
    })
    let testHomonym = adapterTuftsRes.result
    wordItem.homonym = testHomonym
  }

  async function getWordItemStep3 (wordItem) {
    wordItem.gotLexemes = 0
    let adapterLexiconResFull = await ClientAdapters.lexicon.alpheios({
      method: 'fetchFullDefs',
      params: {
        opts: {
          allow: ['https://github.com/alpheios-project/ls']
        },
        homonym: wordItem.homonym,
        callBackEvtSuccess: { pub: () => { wordItem.gotLexemes = wordItem.gotLexemes + 1 } }
      }
    })
  }

  it('1 UserDataManager - update method adds item both to local and remote with only context', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('beautum', 'lat',{
      source: 'source1',
      prefix: 'prefix1',
      suffix: 'suffix1'
    })

    let res = await udm.update({ dataObj: testWordItem })
    expect(res).toBeTruthy()

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })

    // console.info('*****resultRemote[0].context', resultRemote[0].context)
    // resultRemote[0].context.forEach(contextItem => {
    //  console.info('*****resultRemote[0].context', contextItem)
    // })

    expect(resultRemote.length).toEqual(1)
    expect(resultRemote[0].targetWord).toEqual('beautum')
    expect(resultRemote[0].context.length).toEqual(1)

    expect(resultRemote[0].context[0].target.source).toEqual('source1')
    expect(resultRemote[0].context[0].target.selector.suffix).toEqual('suffix1')
    expect(resultRemote[0].context[0].target.selector.prefix).toEqual('prefix1')

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })

    expect(resultLocal.length).toEqual(1)
    expect(resultLocal[0].targetWord).toEqual('beautum')
    expect(resultLocal[0].context.length).toEqual(1)

    expect(resultLocal[0].context[0].source).toEqual('source1')
    expect(resultLocal[0].context[0].suffix).toEqual('suffix1')
    expect(resultLocal[0].context[0].prefix).toEqual('prefix1')

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('2 UserDataManager - update method adds item both to local and remote - to remote short data about homonym and to local with full homonym data', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await getWordItemStep2(testWordItem)

    let res = await udm.update({ dataObj: testWordItem })
    expect(res).toBeTruthy()

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })

    expect(resultRemote.length).toEqual(1)
    expect(resultRemote[0].targetWord).toEqual('cepit')
    expect(resultRemote[0].context.length).toEqual(1)
    expect(resultRemote[0].homonym.lemmasList).toEqual('capio')
    expect(resultRemote[0].homonym.targetWord).toEqual('cepit')
    expect(resultRemote[0].homonym.lexemes).not.toBeDefined()

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(1)
    expect(resultLocal[0].targetWord).toEqual('cepit')
    expect(resultLocal[0].context.length).toEqual(1)

    await timeout(5000)
    console.info('****resultLocal[0].homonym.lexemes', resultLocal[0].homonym.lexemes)
    expect(resultLocal[0].homonym.lexemes.length).toEqual(1)
    expect(resultLocal[0].homonym.lexemes[0].meaning.shortDefs.length).toEqual(1)
    expect(resultLocal[0].homonym.lexemes[0].meaning.fullDefs.length).toEqual(0)

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('3 UserDataManager - update method adds item both to local and remote, merge context items', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat',{
      source: 'source1',
      prefix: 'prefix1',
      suffix: 'suffix1'
    })

    let res = await udm.update({ dataObj: testWordItem })
    expect(res).toBeTruthy()

    let testWordItem2 = await getWordItemStep1('cepit', 'lat',{
      source: 'source2',
      prefix: 'prefix2',
      suffix: 'suffix2'
    })


    res = await udm.update({ dataObj: testWordItem2, params: {segment: 'context'} })
    expect(res).toBeTruthy()

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })

    expect(resultRemote.length).toEqual(1)
    expect(resultRemote[0].targetWord).toEqual('cepit')
    expect(resultRemote[0].context.length).toEqual(2)

    expect(resultRemote[0].context[0].target.source).toEqual('source1')
    expect(resultRemote[0].context[0].target.selector.suffix).toEqual('suffix1')
    expect(resultRemote[0].context[0].target.selector.prefix).toEqual('prefix1')

    expect(resultRemote[0].context[1].target.source).toEqual('source2')
    expect(resultRemote[0].context[1].target.selector.suffix).toEqual('suffix2')
    expect(resultRemote[0].context[1].target.selector.prefix).toEqual('prefix2')

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })

    expect(resultLocal.length).toEqual(1)
    expect(resultLocal[0].targetWord).toEqual('cepit')
    expect(resultLocal[0].context.length).toEqual(2)

    expect(resultLocal[0].context[0].source).toEqual('source1')
    expect(resultLocal[0].context[0].suffix).toEqual('suffix1')
    expect(resultLocal[0].context[0].prefix).toEqual('prefix1')

    expect(resultLocal[0].context[1].source).toEqual('source2')
    expect(resultLocal[0].context[1].suffix).toEqual('suffix2')
    expect(resultLocal[0].context[1].prefix).toEqual('prefix2')

    expect(console.error).not.toHaveBeenCalled()
    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('4 UserDataManager - update method adds item both to local and remote, save full definitions only to local', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await getWordItemStep2(testWordItem)
    await getWordItemStep3(testWordItem)

    await timeout(5000) // wait for definitions

    let res = await udm.update({ dataObj: testWordItem })
    expect(res).toBeTruthy()

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })
    // console.info('**resultRemote[0].homonym', resultRemote[0].homonym)

    expect(resultRemote.length).toEqual(1)
    expect(resultRemote[0].targetWord).toEqual('cepit')
    expect(resultRemote[0].homonym.lexemes).not.toBeDefined()

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(1)

    // console.info('****resultLocal[0].homonym.lexemes', resultLocal[0].homonym.lexemes)
    expect(resultLocal[0].homonym.lexemes.length).toEqual(1)
    expect(resultLocal[0].homonym.lexemes[0].meaning.shortDefs.length).toEqual(1)
    expect(resultLocal[0].homonym.lexemes[0].meaning.fullDefs.length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('5 UserDataManager - update method updates remote with all data, local - with only a given segment (if there is no common, it also updates common)', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await getWordItemStep2(testWordItem)

    let res = await udm.update({ dataObj: testWordItem, params: { segment: 'context' } })
    expect(res).toBeTruthy()

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })

    expect(resultRemote.length).toEqual(1)
    expect(resultRemote[0].targetWord).toEqual('cepit')
    expect(resultRemote[0].context.length).toEqual(1)
    expect(resultRemote[0].homonym).toBeDefined()

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(1)

    expect(resultLocal[0].homonym).toEqual({})
    expect(resultRemote[0].context.length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('6 UserDataManager - update method its update for remote if fullHomonym segment is given, but updates local for this segment', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem, params: { segment: 'common' } })

    await getWordItemStep2(testWordItem)
    await getWordItemStep3(testWordItem)

    await timeout(5000) // wait for definitions

    let res = await udm.update({ dataObj: testWordItem, params: { segment: 'fullHomonym' } })
    expect(res).toBeTruthy()

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultRemote.length).toEqual(1)
    expect(resultRemote[0].homonym).not.toBeDefined()

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(1)

    expect(resultLocal[0].homonym.lexemes.length).toEqual(1)
    expect(resultLocal[0].homonym.lexemes[0].meaning.shortDefs.length).toEqual(1)
    expect(resultLocal[0].homonym.lexemes[0].meaning.fullDefs.length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('7 UserDataManager - delete method deletes worditem both from local and remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem1 = await getWordItemStep1('male', 'lat')
    let testWordItem2 = await getWordItemStep1('mare', 'lat')

    let res = await udm.update({ dataObj: testWordItem1 })
    expect(res).toBeTruthy()

    res = await udm.update({ dataObj: testWordItem2 })
    expect(res).toBeTruthy()

    let resultRemote
    let resultLocal

    // before delete
    resultRemote = await remoteAdapter.query({ wordItem: testWordItem1 })
    expect(resultRemote.length).toEqual(1)

    resultRemote = await remoteAdapter.query({ wordItem: testWordItem2 })
    expect(resultRemote.length).toEqual(1)

    resultLocal = await localAdapter.query({ wordItem: testWordItem1 })
    expect(resultLocal.length).toEqual(1)

    resultLocal = await localAdapter.query({ wordItem: testWordItem2 })
    expect(resultLocal.length).toEqual(1)
    // before delete - end

    res = await udm.delete({ dataObj: testWordItem1 })
    expect(res).toBeTruthy()

    // after delete
    resultRemote = await remoteAdapter.query({ wordItem: testWordItem1 })
    expect(resultRemote.length).toEqual(0)

    resultRemote = await remoteAdapter.query({ wordItem: testWordItem2 })
    expect(resultRemote.length).toEqual(1)

    resultLocal = await localAdapter.query({ wordItem: testWordItem1 })
    expect(resultLocal.length).toEqual(0)

    resultLocal = await localAdapter.query({ wordItem: testWordItem2 })
    expect(resultLocal.length).toEqual(1)
    // after delete - end

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('8 UserDataManager - deleteMany method deletes all wordItems from the list both from local and remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem1 = await getWordItemStep1('male', 'lat')
    let testWordItem2 = await getWordItemStep1('mare', 'lat')

    let res = await udm.update({ dataObj: testWordItem1 })
    expect(res).toBeTruthy()

    res = await udm.update({ dataObj: testWordItem2 })
    expect(res).toBeTruthy()

    let resultRemote
    let resultLocal

    // before delete
    resultRemote = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultRemote.length).toEqual(2)

    resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(2)
    // before delete - end

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})

    // after delete
    resultRemote = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultRemote.length).toEqual(0)

    resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(0)
    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('9 UserDataManager - query gets data from remote with short data about homonym', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await getWordItemStep2(testWordItem)
    await getWordItemStep3(testWordItem)
    await timeout(5000) // wait for definitions

    let res = await udm.update({ dataObj: testWordItem })
    expect(res).toBeTruthy()

    let resultItems = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } })

    expect(resultItems.length).toEqual(1)
    expect(resultItems[0].homonym.lexemes).toBeDefined()
    expect(resultItems[0].homonym.lexemes[0].meaning.shortDefs.length).toEqual(0)
    expect(resultItems[0].homonym.lexemes[0].meaning.fullDefs.length).toEqual(0)
    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('10 UserDataManager - query gets data from remote with full data about homonym, if type = full', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await getWordItemStep2(testWordItem)
    await getWordItemStep3(testWordItem)
    await timeout(5000) // wait for definitions

    await udm.update({ dataObj: testWordItem })

    let resultItems = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { type: 'full' })
    expect(resultItems.length).toEqual(1)
    expect(resultItems[0].homonym.lemmasList).not.toBeDefined()
    expect(resultItems[0].homonym.lexemes.length).toEqual(1)
    expect(resultItems[0].homonym.lexemes[0].meaning.shortDefs.length).toEqual(1)
    expect(resultItems[0].homonym.lexemes[0].meaning.fullDefs.length).toEqual(1)
    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('11 UserDataManager - update method with params.source = local creates item only in local', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem }, { source: 'local' })

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultRemote.length).toEqual(0)

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()
    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('12 UserDataManager - update method with params.source = remote creates item only in remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem }, { source: 'remote' })

    let resultRemote = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultRemote.length).toEqual(1)

    let resultLocal = await localAdapter.query({ languageCode: 'lat' })
    expect(resultLocal.length).toEqual(0)

    expect(console.error).not.toHaveBeenCalled()
    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('13 UserDataManager - query method with params.source = local selects data only from local, remote - only from remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem }, { source: 'remote' })

    let resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'local' })
    expect(resultQuery.length).toEqual(0)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()
    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('14 UserDataManager - query method (source = both or no source, type = full) gets data from remote and merge it to local (if there is no local)', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem }, { source: 'remote' })

    let resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'local' })
    expect(resultQuery.length).toEqual(0)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { type: 'full' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'local' })
    expect(resultQuery.length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()
  }, 50000)

  it('15 UserDataManager - query method (source = both or no source, type != full) gets data only from remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem }, { source: 'remote' })

    let resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'local' })
    expect(resultQuery.length).toEqual(0)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { source: 'local' })
    expect(resultQuery.length).toEqual(0)

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('16 UserDataManager - delete many and update method, checking blocking', async () => {
    let udm = new UserDataManager(auth)

    // make sure that in remote there are no words
    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})

    let testWordItem1 = await getWordItemStep1('cepit', 'lat')
    let testWordItem2 = await getWordItemStep1('mare', 'lat')
    let testWordItem3 = await getWordItemStep1('bene', 'lat')

    let res1 = udm.update({ dataObj: testWordItem1, params: { segment: 'common' }})
    expect(udm.requestsQueue.length).toEqual(0)

    let res2 = udm.update({ dataObj: testWordItem2, params: { segment: 'common' }})
    expect(udm.requestsQueue.length).toBeGreaterThan(0)

    let res3 = udm.update({ dataObj: testWordItem3, params: { segment: 'common' }})
    expect(udm.requestsQueue.length).toBeGreaterThan(0)

    let res4 = udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
    expect(udm.requestsQueue.length).toBeGreaterThan(0)

    let res5 = udm.update({ dataObj: testWordItem3, params: { segment: 'common' }})
    expect(udm.requestsQueue.length).toBeGreaterThan(0)

    let final = [await res1, await res2, await res3, await res4, await res5]

    expect(udm.requestsQueue.length).toBeGreaterThan(0)

    for(let k=0; k<5; k++) {
      if (udm.requestsQueue.length > 0) {
        await timeout(5000)
      } else {
        break
      }
    }

    await timeout(5000)
    let items = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' }})

    expect(items.filter(item => item.targetWord === testWordItem1.targetWord).length).toEqual(0)
    expect(items.filter(item => item.targetWord === testWordItem2.targetWord).length).toEqual(0)
    expect(items.filter(item => item.targetWord === testWordItem3.targetWord).length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()
    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 550000)

  it('16 UserDataManager - delete method (source = local) removes data only from local', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem })

    let resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    await udm.delete({ dataObj: testWordItem }, { source: 'local' })

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(0)

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('17 UserDataManager - delete method (source = remote) removes data only from remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('cepit', 'lat')
    await udm.update({ dataObj: testWordItem })

    let resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    await udm.delete({ dataObj: testWordItem }, { source: 'remote' })

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(0)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(1)

    expect(console.error).not.toHaveBeenCalled()

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('18 UserDataManager - deleteMany method (source = local) deletes all wordItems only from local', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('male', 'lat')

    let res = await udm.update({ dataObj: testWordItem })
    expect(res).toBeTruthy()

    let resultRemote
    let resultLocal

    // before delete
    let resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)
    // before delete - end

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }}, { source: 'local' })

    // after delete
    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(0)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)

  it('19 UserDataManager - deleteMany method (source = remote) deletes all wordItems only from remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('male', 'lat')

    let res = await udm.update({ dataObj: testWordItem })
    expect(res).toBeTruthy()

    let resultRemote
    let resultLocal

    // before delete
    let resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)
    // before delete - end

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }}, { source: 'local' })

    // after delete
    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'local' })
    expect(resultQuery.length).toEqual(0)

    resultQuery = await udm.query({ dataType: 'WordItem', params: { wordItem: testWordItem } }, { source: 'remote' })
    expect(resultQuery.length).toEqual(1)

    await udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
  }, 50000)


  it('20 UserDataManager - query with syncDelete parameter will delete items from local that are absent in remote', async () => {
    let udm = new UserDataManager(auth)
    await remoteAdapter.deleteMany({ languageCode: 'lat' })
    await localAdapter.deleteMany({ languageCode: 'lat' })

    let testWordItem = await getWordItemStep1('male', 'lat')
    let testWordItem1 = await getWordItemStep1('cepit', 'lat')

    // create both items in local and remote
    await udm.update({ dataObj: testWordItem })
    await udm.update({ dataObj: testWordItem1 })

    let resultQuery

    // check that both items are present in local and remote
    resultQuery = await localAdapter.query({ languageCode: 'lat' })
    expect(resultQuery.length).toEqual(2)

    resultQuery = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultQuery.length).toEqual(2)

    // delete one wordItem only from remote
    await remoteAdapter.deleteOne(testWordItem)

    // check that only one item is present in remote and two are present in local
    resultQuery = await localAdapter.query({ languageCode: 'lat' })
    expect(resultQuery.length).toEqual(2)

    resultQuery = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultQuery.length).toEqual(1)

    // query with syncDelete parameter
    resultQuery = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' } }, { syncDelete: true })

    await timeout(5000)

    // check that only one item  is present in local and remote

    resultQuery = await remoteAdapter.query({ languageCode: 'lat' })
    expect(resultQuery.length).toEqual(1)

    resultQuery = await localAdapter.query({ languageCode: 'lat' })
    expect(resultQuery.length).toEqual(1)
  }, 50000)

  it('21 UserDataManager - clear unsubscribes events', async () => {
    let mockUnsub = jest.fn()
    let mockEvent = {
      sub: () => {
        return mockUnsub
      }
    }
    let udm = new UserDataManager(auth,{
      WORDITEM_UPDATED: mockEvent,
      WORDITEM_DELETED: mockEvent,
      WORDLIST_DELETED: mockEvent})
    expect(udm.subscriptions.length).toEqual(3)
    udm.clear()
    expect(udm.subscriptions.length).toEqual(0)
  })
})
