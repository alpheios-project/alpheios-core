/* eslint-env jest */
/* eslint-disable no-unused-vars */
import WordItemIndexedDbDriver from '@/storage/worditem-indexeddb-driver'

describe('worditem-indexeddb-driver.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(() => {
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

  it('1 WordItemIndexedDbDriver - constructs the driver',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    expect(driver.userId).toEqual('mockUserId')
  })

  it('2 WordItemIndexedDbDriver - returns the dbname',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    expect(driver.dbName).toEqual('AlpheiosWordLists')
  })
  it('3 WordItemIndexedDbDriver - returns the dbVersion',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    expect(driver.dbVersion).toEqual(3)
  })
  it('4 WordItemIndexedDbDriver - returns the segments',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    expect(driver.segments.length).toEqual(4)
  })

  it('5 WordItemIndexedDbDriver - returns the objectstores',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    expect(driver.objectStores.length).toEqual(4)
  })

  it('6 WordItemIndexedDbDriver - returns the structure for each store',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let stores = driver.objectStores
    for (let store of stores) {
      expect(driver[store]).toBeTruthy()
      expect(driver[store].keyPath).toBeTruthy()
      expect(driver[store].indexes).toBeTruthy()
    }
  })

  it('7 WordItemIndexedDbDriver - loads a worditem',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let data = {ID: 'mockItemId', listID: 'mockListId', targetWord: 'mockWord', languageCode: 'mockLanguage', currentSession: true}
    let loaded = driver.load(data)
    expect(loaded.targetWord).toEqual('mockWord')
    expect(loaded.languageCode).toEqual('mockLanguage')
    // when loaded from the database, currentSession should be forced to false
    expect(loaded.currentSession).toBeFalsy()
    // these properties are storage only and should not appear in the loaded WordIitem
    expect(loaded.ID).not.toBeDefined()
    expect(loaded.listID).not.toBeDefined()
  })

  it('8 WordItemIndexedDbDriver - loads a segment of a worditem',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let data = {ID: 'mockItemId', listID: 'mockListId', targetWord: 'mockWord', languageCode: 'mockLanguage', currentSession: true}
    let worditem = driver.load(data)
    let serializedContext = {
      targetWord: 'mockWord',
      languageCode: 'mockLanguage',
      target: {
        source: 'http://example.org',
        selector: {
          exact: 'mockWord',
          prefix: 'mockPrefix',
          suffix: 'mockSuffix',

        }
      }
    }
    jest.spyOn(driver.storageMap.context,'load')
    driver.loadSegment('context',worditem,[serializedContext])
    expect(driver.storageMap.context.load).toHaveBeenCalled()
    expect(worditem.context.length).toEqual(1)
    expect(worditem.context[0].text).toEqual('mockWord')
    expect(worditem.context[0].prefix).toEqual('mockPrefix')
    expect(worditem.context[0].suffix).toEqual('mockSuffix')
    expect(worditem.context[0].source).toEqual('http://example.org')
  })

  it('9 WordItemIndexedDbDriver - returns a query to retrieve a segment of a data item',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let mockWordItem = {targetWord: 'mockWord',languageCode: 'mockLanguage'}
    let query = driver.segmentQuery('common',mockWordItem)
    expect(query.objectStoreName).toBeDefined()
    expect(query.condition).toBeDefined()
    expect(query.condition.indexName).toEqual('ID')
    expect(query.condition.value).toEqual('mockUserId-mockLanguage-mockWord')
  })

  it('10 WordItemIndexedDbDriver - returns a query to delete a segment of a data item',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let mockWordItem = {targetWord: 'mockWord',languageCode: 'mockLanguage'}
    let query = driver.segmentDeleteQuery('common',mockWordItem)
    expect(query.objectStoreName).toBeDefined()
    expect(query.condition).toBeDefined()
    expect(query.condition.indexName).toEqual('ID')
    expect(query.condition.value).toEqual('mockUserId-mockLanguage-mockWord')
  })

  it('11 WordItemIndexedDbDriver - returns a query to delete segment of many data items',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let query = driver.segmentDeleteManyQuery('common',{languageCode:'mockLanguage'})
    expect(query.objectStoreName).toBeDefined()
    expect(query.condition).toBeDefined()
    expect(query.condition.indexName).toEqual('listID')
    expect(query.condition.value).toEqual('mockUserId-mockLanguage')
  })

  it('12 WordItemIndexedDbDriver - returns a query to update a segment of a data item',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let mockSelectorA = {text: 'mockTextA', prefix:"mfa", suffix:"msa", source:"mockSourceA"}
    let mockSelectorB = {text: 'mockTextB', prefix:"mfb", suffix:"msb", source:"mockSourceB"}
    let mockWordItem = {targetWord: 'mockWord',languageCode: 'mockLanguage', context: [mockSelectorA,mockSelectorB]}
    jest.spyOn(driver.storageMap.context,'serialize')
    let query = driver.updateSegmentQuery('context',mockWordItem)
    expect(driver.storageMap.context.serialize).toHaveBeenCalled()
    expect(query.objectStoreName).toBeDefined()
    expect(query.dataItems).toBeDefined()
    expect(query.dataItems.length).toEqual(2)
    expect(query.dataItems[0].ID).toBeDefined()
    expect(query.dataItems[0].userID).toBeDefined()
    expect(query.dataItems[0].listID).toBeDefined()
    expect(query.dataItems[0].wordItemID).toBeDefined()
    expect(query.dataItems[0].target).toBeDefined()
  })

  it('13 WordItemIndexedDbDriver - returns a query to list data items',() => {
    let driver = new WordItemIndexedDbDriver('mockUserId')
    let query = driver.listQuery({languageCode:'mockLanguage'})
    expect(query.objectStoreName).toBeDefined()
    expect(query.condition.indexName).toEqual('listID')
    expect(query.condition.value).toEqual('mockUserId-mockLanguage')
  })

  // TODO explicity test serialization of all segments
  // TODO explicitly test all error conditions

})
