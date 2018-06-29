/* eslint-env jest */
import StorageAdapter from '@/lib/options/storage-adapter'

describe('storage-adapter.test.js', () => {
  it('1 StorageAdapter constructor saves domain to params when created', () => {
    let stAdapter = new StorageAdapter('foo-domain-name')
    expect(stAdapter.domain).toEqual('foo-domain-name')
  })

  it('2 StorageAdapter constructor has default domain value - ', () => {
    let stAdapter = new StorageAdapter()
    expect(stAdapter.domain).toEqual('alpheios-storage-domain')
  })

  it('3 StorageAdapter get method will throw an error if will be invoked directly', () => {
    let stAdapter = new StorageAdapter()
    stAdapter.get().catch(function (error) {
      expect(error.message).toEqual(`Get method should be implemented in a subclass`)
    })
  })
  it('4 StorageAdapter set method will throw an error if will be invoked directly', () => {
    let stAdapter = new StorageAdapter()
    stAdapter.set().catch(function (error) {
      expect(error.message).toEqual(`Set method should be implemented in a subclass`)
    })
  })
  it('4 StorageAdapter remove method will throw an error if will be invoked directly', () => {
    let stAdapter = new StorageAdapter()
    stAdapter.remove().catch(function (error) {
      expect(error.message).toEqual(`Remove method should be implemented in a subclass`)
    })
  })
})
