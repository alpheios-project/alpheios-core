/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Options from '@/lib/options/options'
// import OptionItem from '@/lib/options/options-item'
import StorageAdapter from '@/lib/options/storage-adapter'
import LocalStorageArea from '@/lib/options/local-storage-area'

describe('options.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
    jest.spyOn(Options, 'initItems')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  let localStorageMock = {
    values: {},
    getItem: jest.fn(key => localStorageMock.values[key]),
    setItem: jest.fn((key, value) => {
      localStorageMock.values[key] = value
    }),
    removeItem: jest.fn((key, value) => {
      delete localStorageMock.values[key]
    })
  }
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  })

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  })

  it('1 Options - constructor could create object without any arguments', () => {
    expect(function () {
      let l = new Options()
      console.log(l)
    }).not.toThrow(new Error(`Defaults have no obligatory "domain" and "items" properties`))
  })

  it('2 Options - constructor defaults should contain property domain and will throw an error if undefined', () => {
    expect(function () {
      let l = new Options({ item: 'foo' })
      console.log(l)
    }).toThrow(new Error(`Defaults have no obligatory "domain" and "items" properties`))
  })

  it('3 Options - constructor defaults should contain property items and will throw an error if undefined', () => {
    expect(function () {
      let l = new Options({ domain: 'bar' })
      console.log(l)
    }).toThrow(new Error(`Defaults have no obligatory "domain" and "items" properties`))
  })

  it('4 Options - parse defaults to object\'s properties', () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-content-options',
      items: { locale: testOption },
      fooProperty: 'bar'
    }
    let opt = new Options(testDefaults, StorageAdapter)

    expect(opt.domain).toEqual(testDefaults.domain)
    expect(opt.fooProperty).toEqual(testDefaults.fooProperty)
    expect(Options.initItems).toHaveBeenCalled()
    expect(opt.items.locale.constructor.name).toEqual('OptionItem')
    expect(opt.items.locale.defaultValue).toEqual(testOption.defaultValue)
  })

  it('5 Options - names returns an array of items keys', () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-content-options',
      items: { locale: testOption },
      fooProperty: 'bar'
    }
    let opt = new Options(testDefaults, StorageAdapter)

    expect(opt.names).toEqual(['locale'])
  })

  it('6 Options - load reload options from storageAdapter and executes callBackFn ', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-test-options',
      items: { locale6: testOption },
      fooProperty: 'bar'
    }
    window.localStorage.values['alpheios-test-options-keys'] = '["locale6"]'
    window.localStorage.values.locale6 = 'Foo'
    let opt = new Options(testDefaults, LocalStorageArea)

    let callBackFn = jest.fn(() => { console.log('I am callBackFn') })
    await opt.load(callBackFn)

    expect(opt.items.locale6.currentValue).toEqual('Foo')
    expect(callBackFn).toHaveBeenCalled()
  })

  it('7 Options - if there is a grouped property in storageAdapter it will be parsed and saved ', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', group: { foo: { text: 'English (US)', value: 'en-US' } } }
    let testDefaults = {
      domain: 'alpheios-test-options7',
      items: { locale7: testOption },
      fooProperty: 'bar'
    }
    window.localStorage.values['alpheios-test-options7-keys'] = '["locale7-foo"]'
    window.localStorage.values['locale7-foo'] = 'foo7'
    let opt = new Options(testDefaults, LocalStorageArea)

    let callBackFn = () => { console.log('I am callBackFn') }
    await opt.load(callBackFn)

    expect(opt.items.locale7[0].currentValue).toEqual('foo7')
  })

  it('8 Options - if there is a grouped property in storageAdapter it will be parsed. if there is no key as in option it would be ignored', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', group: { foo: { defaultValue: 'en-US', text: 'English (US)', value: 'en-US' } } }
    let testDefaults = {
      domain: 'alpheios-test-options7',
      items: { locale9: testOption },
      fooProperty: 'bar'
    }
    window.localStorage.values['alpheios-test-options9-keys'] = '["localeN-foo"]'
    window.localStorage.values['localeN-foo'] = 'foo9'
    let opt = new Options(testDefaults, LocalStorageArea)

    let callBackFn = () => { console.log('I am callBackFn') }

    await opt.load(callBackFn)
    expect(opt.items.locale9[0].currentValue).toEqual('en-US')
    expect(opt.items.localeN).toBeUndefined()
  })

  it('9 Options - if in load method storageAdapter.get throw a error then console.error will be executed and callBackFn will be executed', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-test-options',
      items: { locale6: testOption },
      fooProperty: 'bar'
    }

    window.localStorage.values['alpheios-test-options-keys'] = '["locale6"]'
    window.localStorage.values.locale6 = 'Foo'
    let opt = new Options(testDefaults, LocalStorageArea)

    let callBackFn = jest.fn(() => { console.log('I am callBackFn') })

    let testError = new Error('storageAdapter reject error')

    opt.storageAdapter.get = function () { return new Promise((resolve, reject) => { reject(testError) }) }

    await opt.load(callBackFn)

    expect(console.error).toHaveBeenCalledWith(`Cannot retrieve options for Alpheios extension from a local storage: ${testError}. Default values
          will be used instead`, testError)
    expect(callBackFn).toHaveBeenCalled()
  })

  it('10 Options - parseKey parses a string to object', () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-content-options',
      items: { locale: testOption },
      fooProperty: 'bar'
    }
    let opt = new Options(testDefaults, StorageAdapter)

    let res = opt.parseKey('foo-bar')
    expect(res).toEqual({ setting: 'foo', group: 'bar' })
  })

  it('11 Options - clone method returns cloned object (single items)', () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-content-options',
      items: { locale: testOption },
      fooProperty: 'bar'
    }
    let opt = new Options(testDefaults, StorageAdapter)

    let res = opt.clone(StorageAdapter)

    expect(res.domain).toEqual(opt.domain)
    expect(res.storageAdapter.constructor.name).toEqual('StorageAdapter')
    expect(res.storageAdapter.domain).toEqual(opt.domain)
    expect(res.items.locale.defaultValue).toEqual('en-US')
    expect(res.items.locale.labelText).toEqual('UI Locale:')
    expect(res.items.locale.values).toEqual([ { text: 'English (US)', value: 'en-US' } ])
    expect(res.items.locale.currentValue).toEqual(opt.items.locale.currentValue)
  })

  it('12 Options - clone method returns cloned object (single items)', () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', group: { foo: { defaultValue: 'en-US', text: 'English (US)', value: 'en-US' } } }
    let testDefaults = {
      domain: 'alpheios-content-options',
      items: { locale: testOption },
      fooProperty: 'bar'
    }
    let opt = new Options(testDefaults, StorageAdapter)

    let res = opt.clone(StorageAdapter)

    expect(Array.isArray(res.items.locale)).toBeTruthy()
    expect(res.items.locale[0].name).toEqual('locale-foo')
  })
})
