/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import WordlistController from '@/controllers/wordlist-controller.js'
import { WordList, WordItem, TextQuoteSelector } from 'alpheios-data-models'


describe('wordlist-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let mockLClat
  let mockLCgrc
  let mockWILatin
  let mockWILatin2
  let mockWIGreek
  let mockListLatin
  let mockListGreek
  let mockEvents
  let mockDataManager

  beforeAll(async () => {
    mockLClat = 'lat'
    mockLCgrc = 'grc'
    mockWILatin = new WordItem({languageCode: mockLClat,targetWord:'mare'})
    mockWILatin2 = new WordItem({languageCode: mockLClat,targetWord:'veni'})
    mockWIGreek = new WordItem({languageCode: mockLCgrc,targetWord:'mou=sa'})
    //mockListLatin = new WordList(mockLClat,[mockWILatin])
    //mockListGreek = new WordList(mockLCgrc,[mockWIGreek])
    mockEvents = {
      TEXT_QUOTE_SELECTOR_RECEIVED: {sub: jest.fn()},
      HOMONYM_READY: {sub: jest.fn()},
      DEFS_READY: {sub: jest.fn()},
      LEMMA_TRANSL_READY: { sub: jest.fn()}
    }

    mockDataManager = {
      query: async (data) => {
        return new Promise((resolve,reject) => {
          if (data.params.languageCode === mockLClat) {
            resolve([mockWILatin])
          } else {
            resolve([mockWIGreek])
          }
        })
      }
    }
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 WordlistController - constructor subscribes to events',() => {
    jest.spyOn(mockEvents.TEXT_QUOTE_SELECTOR_RECEIVED,'sub')
    jest.spyOn(mockEvents.HOMONYM_READY,'sub')
    jest.spyOn(mockEvents.DEFS_READY,'sub')
    jest.spyOn(mockEvents.LEMMA_TRANSL_READY,'sub')
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    expect(wc.availableLangs).toEqual([mockLClat,mockLCgrc])
    expect(mockEvents.TEXT_QUOTE_SELECTOR_RECEIVED.sub).toHaveBeenCalled()
    expect(mockEvents.HOMONYM_READY.sub).toHaveBeenCalled()
    expect(mockEvents.DEFS_READY.sub).toHaveBeenCalled()
    expect(mockEvents.LEMMA_TRANSL_READY.sub).toHaveBeenCalled()
  })

  it('2 WordlistController - initLists initializes lists and emits event',async () => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,false)
    let grcList = wc.getWordList(mockLCgrc,false)
    expect(latList).not.toBeDefined()
    expect(grcList).not.toBeDefined()
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    await wc.initLists(mockDataManager)
    latList = wc.getWordList(mockLClat,false)
    expect(latList).toBeDefined()
    grcList = wc.getWordList(mockLCgrc,false)
    expect(grcList).toBeDefined()
    expect(WordlistController.evt.WORDLIST_UPDATED.pub).toHaveBeenCalledWith({'grc':grcList, 'lat':latList})
  })

  it('3 WordlistController - getWordList creates list if it does not exist and emits event',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    jest.spyOn(WordlistController.evt.WORDLIST_CREATED,'pub')
    let latList = wc.getWordList(mockLClat,true)
    expect(latList).toBeDefined()
    expect(WordlistController.evt.WORDLIST_CREATED.pub).toHaveBeenCalled()
  })

  it('4 WordlistController - getWordList retrieves existing list',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    jest.spyOn(WordlistController.evt.WORDLIST_CREATED,'pub')
    let latList = wc.getWordList(mockLClat,true)
    expect(latList).toBeDefined()
    latList.addWordItem(mockWILatin)
    let latList2 = wc.getWordList(mockLClat,false)
    expect(WordlistController.evt.WORDLIST_CREATED.pub).toHaveBeenCalledTimes(1)
    expect(latList2).toEqual(latList)
  })

  it('5 WordlistController - getWordList does not create list if it does not exist',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    jest.spyOn(WordlistController.evt.WORDLIST_CREATED,'pub')
    let latList = wc.getWordList(mockLClat,false)
    expect(latList).not.toBeDefined()
    expect(WordlistController.evt.WORDLIST_CREATED.pub).not.toHaveBeenCalled()
  })

  it('6 WordlistController - removeWordList remove list and emits event',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    jest.spyOn(WordlistController.evt.WORDLIST_DELETED,'pub')
    let latList = wc.getWordList(mockLClat,true)
    expect(latList).toBeDefined()
    wc.removeWordList(mockLClat)
    expect(WordlistController.evt.WORDLIST_DELETED.pub).toHaveBeenCalledWith({dataType:'WordItem', params:{languageCode:mockLClat}})
  })

  it('7 WordlistController - removeWordListItem remove a single item from list and emits event',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    jest.spyOn(WordlistController.evt.WORDITEM_DELETED,'pub')
    let latList = wc.getWordList(mockLClat,true)
    latList.addWordItem(mockWILatin)
    wc.removeWordListItem(mockLClat,'mare')
    expect(WordlistController.evt.WORDITEM_DELETED.pub).toHaveBeenCalledWith({dataObj:mockWILatin})
  })

  it.skip('8 WordlistController - removeWordListItem remove last item from list, removes list and emits events',() => {})

  it('9 WordlistController - getWordListItem retrieves the item',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    latList.addWordItem(mockWILatin)
    let item = wc.getWordListItem(mockLClat,'mare')
    expect(item).toEqual(mockWILatin)
  })

  it('10 WordlistController - getWordListItem retrieves the item creating it',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let item = wc.getWordListItem(mockLClat,'foo',false)
    expect(item).not.toBeDefined()
  })

  it('11 WordlistController - onHomonymReady updates list and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    latList.addWordItem(mockWILatin)
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    wc.onHomonymReady({language: mockLClat, targetWord: testTarget})
    let item = wc.getWordListItem(mockLClat,testTarget)
    expect(item.homonym).toBeDefined()
    expect(item.homonym.targetWord).toEqual(testTarget)
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'shortHomonym'}})
    expect(WordlistController.evt.WORDLIST_UPDATED.pub).toHaveBeenCalledWith({ lat: latList })
  })

  it('12 WordlistController - onHomonymReady adds new item to list and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    wc.onHomonymReady({language: mockLClat, targetWord: testTarget})
    let item = wc.getWordListItem(mockLClat,testTarget)
    expect(item.homonym).toBeDefined()
    expect(item.homonym.targetWord).toEqual(testTarget)
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'shortHomonym'}})
    expect(WordlistController.evt.WORDLIST_UPDATED.pub).toHaveBeenCalledWith({ lat: latList })
  })
  it('13 WordlistController - onDefinitionsReady updates list and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    latList.addWordItem(mockWILatin)
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    wc.onDefinitionsReady({homonym:{language: mockLClat, targetWord: testTarget}})
    let item = wc.getWordListItem(mockLClat,testTarget)
    expect(item.homonym).toBeDefined()
    expect(item.homonym.targetWord).toEqual(testTarget)
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'fullHomonym'}})
  })
  it.skip('14 WordlistController - onDefinitionsReady fails if item does not exist',() => {})
  it('15 WordlistController - onLemmaTranslationsReady updates list and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    latList.addWordItem(mockWILatin)
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    wc.onLemmaTranslationsReady({language: mockLClat, targetWord: testTarget})
    let item = wc.getWordListItem(mockLClat,testTarget)
    expect(item.homonym).toBeDefined()
    expect(item.homonym.targetWord).toEqual(testTarget)
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'fullHomonym'}})
  })
  it.skip('16 WordlistController - onLemmaTranslationsReady fails if item does not exist',() => {})
  it('17 WordlistController - onTextQuoteSelectorReceived updates list and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    latList.addWordItem(mockWILatin)
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    wc.onTextQuoteSelectorReceived(new TextQuoteSelector( mockLClat, testTarget) )
    let item = wc.getWordListItem(mockLClat,testTarget)
    expect(item.context).toBeDefined()
    expect(item.context.length).toEqual(1)
    expect(item.context[0].normalizedText).toEqual(testTarget)
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'context'}})
    expect(WordlistController.evt.WORDLIST_UPDATED.pub).toHaveBeenCalledWith(latList)
  })
  it('18 WordlistController - onTextQuoteSelectorReceived adds new item to list and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    wc.onTextQuoteSelectorReceived(new TextQuoteSelector( mockLClat, testTarget) )
    let item = wc.getWordListItem(mockLClat,testTarget)
    expect(item.context).toBeDefined()
    expect(item.context.length).toEqual(1)
    expect(item.context[0].normalizedText).toEqual(testTarget)
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'context'}})
  })
  it('19 WordlistController - updateWordItemImportant updates word item important and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    latList.addWordItem(mockWILatin)
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    wc.updateWordItemImportant(mockLClat,testTarget,true)
    let item = wc.getWordListItem(mockLClat,testTarget)
    expect(item.important).toBeTruthy()
    wc.updateWordItemImportant(mockLClat,testTarget,false)
    expect(item.important).toBeFalsy()
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'common'}})
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledTimes(2)
  })
  it('20 WordlistController - updateAllImportant updates word item important and emits events',() => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let latList = wc.getWordList(mockLClat,true)
    let testTarget = 'mare'
    let testTarget2 = 'veni'
    latList.addWordItem(mockWILatin)
    latList.addWordItem(mockWILatin2)
    expect(mockWILatin.important).toBeFalsy()
    expect(mockWILatin2.important).toBeFalsy()
    jest.spyOn(WordlistController.evt.WORDITEM_UPDATED,'pub')
    wc.updateAllImportant(mockLClat,true)
    let item = wc.getWordListItem(mockLClat,testTarget)
    let item2 = wc.getWordListItem(mockLClat,testTarget2)
    expect(item.important).toBeTruthy()
    expect(item2.important).toBeTruthy()
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item,params:{segment:'common'}})
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledWith({dataObj:item2,params:{segment:'common'}})
    expect(WordlistController.evt.WORDITEM_UPDATED.pub).toHaveBeenCalledTimes(2)
  })
  it('21 WordlistController - getWordListItemCount returns number of items in all lists', async () => {
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    await wc.initLists(mockDataManager)
    expect(wc.getWordListItemCount()).toEqual(2)
    expect(WordlistController.evt.WORDLIST_UPDATED.pub).toHaveBeenCalledTimes(2)
  })
  it('22 WordlistController - merges existing items when init list with data manager', async () => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let selector1 =  new TextQuoteSelector(mockLClat,'mare')
    let selector2 =  new TextQuoteSelector(mockLClat,'mare','fooPrefix')
    let selector3 =  new TextQuoteSelector(mockLClat,'veni','fooPrefix')
    jest.spyOn(WordlistController.evt.WORDLIST_UPDATED,'pub')
    wc.onTextQuoteSelectorReceived(selector1)
    wc.onDefinitionsReady({homonym:{language: mockLClat, targetWord: 'mare'}})
    wc.onDefinitionsReady({homonym:{language: mockLClat, targetWord: 'veni'}})
    wc.onTextQuoteSelectorReceived(selector2)
    wc.onTextQuoteSelectorReceived(selector3)
    expect(wc.getWordListItemCount()).toEqual(2)
    // we have a word list with two items in it
    // now init the list with the DataManager
    let result = await wc.initLists(mockDataManager)
    // should have 2 latin and 1 greek
    expect(wc.getWordList(mockLClat).size).toEqual(2)
    expect(wc.getWordList(mockLCgrc).size).toEqual(1)
    // latin mare should have 2 contexts
    expect(wc.getWordListItem(mockLClat,'mare').context.length).toEqual(2)
    // wordlists were updated a total of 6 times: 3 to the cached latin list,
    // 2 to init the remote latin and greek lists, and 3 to replay the cached list
    expect(WordlistController.evt.WORDLIST_UPDATED.pub).toHaveBeenCalledTimes(9)
    expect(result[mockLClat]).toEqual(wc.getWordList(mockLClat))
    expect(result[mockLCgrc]).toEqual(wc.getWordList(mockLCgrc))

  })
  it('23 WordlistController - init list clears existing when no data manager', async () => {
    let wc = new WordlistController([mockLClat,mockLCgrc],mockEvents)
    let selector1 =  new TextQuoteSelector(mockLClat,'mare','fooPrefix')
    wc.onTextQuoteSelectorReceived(selector1)
    expect(wc.getWordListItemCount()).toEqual(1)
    let result = await wc.initLists()
    expect(wc.getWordListItemCount()).toEqual(0)
  })
  it.skip('21 WordlistController - selectWordItem emits event',() => {})

})
