/* eslint-env jest */
/* eslint-disable no-unused-vars */
import IndexedDBAdapter from '@/storage/indexed-db-adapter'
import IndexedDB from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'

describe('indexed-db-adapter.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  // Create an IDBFactory at window.indexedDB so your code can use IndexedDB.
  window.indexedDB = IndexedDB;

  // Make IDBKeyRange global so your code can create key ranges.
  window.IDBKeyRange = IDBKeyRange;

  let mockDriver


  beforeAll( () => {
    mockDriver = {
      dbName: 'mockDatabase',
      dbVersion: 1,
      mockSegmentA: {
        keyPath: 'ID',
        indexes: [
          { indexName: 'ID', keyPath: 'ID', unique: true},
          { indexName: 'listID', keyPath: 'listID', unique: false},
          { indexName: 'userID', keyPath: 'userID', unique: false},
        ]
      },
      mockSegmentB: {
        keyPath: 'ID',
        indexes: [
          { indexName: 'ID', keyPath: 'ID', unique: true},
          { indexName: 'listID', keyPath: 'listID', unique: false},
          { indexName: 'userID', keyPath: 'userID', unique: false},
        ]
      },
      load: (d) => { return d },
      loadSegment: (s,o,d) => {
        if (d[0].segmenta) {o.segmenta = d[0].segmenta}
        if (d[0].segmentb) {o.segmentb = d[0].segmentb}
      },
      objectStores: ['mockSegmentA','mockSegmentB'],
      listQuery: (p) => {
        return {
          objectStoreName: 'mockSegmentA',
          condition: {indexName: 'listID', value: p.mockListParam, type: 'only' }
        }
      },
      segments: ['segmenta','segmentb'],
      segmentQuery: (s,w) => {
        let os
        if (s === 'segmenta') {
          os = 'mockSegmentA'
        } else {
          os = 'mockSegmentB'
        }
        return {
          objectStoreName: os,
          condition: {indexName: 'ID', value: w.ID, type: 'only' }
        }
      },
      updateSegmentQuery: (s,d) => {
        let os
        if (s === 'segmenta') {
          os = 'mockSegmentA'
        } else {
          os = 'mockSegmentB'
        }
        let dataItem = { ID: d.ID, listID: d.listID}
        dataItem[s] = d[s]
        return {
          objectStoreName: os,
          dataItems: [dataItem]
        }
      },
      segmentDeleteManyQuery: (s,p) => {
        let os
        if (s === 'segmenta') {
          os = 'mockSegmentA'
        } else {
          os = 'mockSegmentB'
        }
        return  {
          objectStoreName: os,
          condition: { indexName: 'listID', value: p.mockListParam, type: 'only' }
        }
      },
      segmentDeleteQuery: (s,w) => {
        let os
        if (s === 'segmenta') {
          os = 'mockSegmentA'
        } else {
          os = 'mockSegmentB'
        }
        return {
          objectStoreName: os,
          condition: { indexName: 'ID', value: w.ID, type: 'only' }
        }
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
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 IndexedDBAdapter - available after construction', () => {
    let ida = new IndexedDBAdapter(mockDriver)
    expect(ida.available).toBeTruthy()
    expect(ida.dbDriver).toEqual(mockDriver)
  })

  it('2 IndexedDBAdapter - update creates the database and item', async () => {
    let ida = new IndexedDBAdapter(mockDriver)
    let rv = await ida.update({ID:'mockItemId', listID: 'mockListId'},{segment:'segmenta'})
     expect(rv).toBeTruthy()
  })

  it('3 IndexedDBAdapter - query returns data, loading segments', async () => {
    let ida = new IndexedDBAdapter(mockDriver)
    let rv = await ida.update({ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment'},{segment:'segmenta'})
    let items = await ida.query({mockListParam:'mockListId'})
    expect(items).toEqual([{ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:undefined}])
    ida.clear()
  })

  it('4 IndexedDBAdapter - create creates the database and the fully segmented item', async () => {
    let ida = new IndexedDBAdapter(mockDriver)
    let rv = await ida.create({ID:'mockItemId', listID: 'mockListId', segmenta:'mockSegment', segmentb:'mockSegmentB'})
    expect(rv).toBeTruthy()

    let items = await ida.query({mockListParam:'mockListId'})

    expect(items).toEqual([{ID:'mockItemId', listID: 'mockListId', segmenta:'mockSegment', segmentb:'mockSegmentB'}])
    ida.clear()
  })

  it('4 IndexedDBAdapter - create creates fully segmented item', async () => {
    let ida = new IndexedDBAdapter(mockDriver)
    await ida.create({ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'})
    await ida.create({ID:'mockItemId2', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'})
    let items = await ida.query({mockListParam:'mockListId'})
    expect(items).toEqual([
      {ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'},
      {ID:'mockItemId2', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'}
    ])
    ida.clear()
  })

  it('5 IndexedDBAdapter - deleteAll deletes all the items', async () => {
    let ida = new IndexedDBAdapter(mockDriver)
    await ida.create({ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'})
    await ida.create({ID:'mockItemId2', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'})
    let items = await ida.query({mockListParam:'mockListId'})
    expect(items).toEqual([
      {ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'},
      {ID:'mockItemId2', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'}
    ])
    await ida.deleteMany({dataObj: {}, mockListParam:'mockListId'})
    items = await ida.query({mockListParam:'mockListId'})
    expect(items).toEqual([])
    ida.clear()
  })

  it('6 IndexedDBAdapter - deleteOne deletes one item', async () => {
    let ida = new IndexedDBAdapter(mockDriver)
    await ida.create({ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'})
    await ida.create({ID:'mockItemId2', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'})
    let items = await ida.query({mockListParam:'mockListId'})
    expect(items).toEqual([
      {ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'},
      {ID:'mockItemId2', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'}
    ])
    await ida.deleteOne({ID:'mockItemId', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'})
    items = await ida.query({mockListParam:'mockListId'})
    expect(items).toEqual([
      {ID:'mockItemId2', listID: 'mockListId',segmenta:'mockSegment',segmentb:'mockSegmentB'}
    ])
    ida.clear()
  })

  // TODO explicitly test all error conditions
})
