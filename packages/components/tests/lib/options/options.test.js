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
    }).toThrow(new Error(`Defaults have no obligatory "domain", "version" and "items" properties`))
  })

  it('2 Options - constructor defaults should contain property domain and will throw an error if undefined', () => {
    expect(function () {
      let l = new Options({ item: 'foo' })
      console.log(l)
    }).toThrow(new Error(`Defaults have no obligatory "domain", "version" and "items" properties`))
  })

  it('3 Options - constructor defaults should contain property items and will throw an error if undefined', () => {
    expect(function () {
      let l = new Options({ domain: 'bar' })
      console.log(l)
    }).toThrow(new Error(`Defaults have no obligatory "domain", "version" and "items" properties`))
  })

  it('4 Options - parse defaults to object\'s properties', () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-content-options',
      version: 2,
      items: { locale: testOption },
    }
    let opt = new Options(testDefaults, StorageAdapter)

    expect(opt.domain).toEqual(testDefaults.domain)
    expect(opt.version).toEqual(testDefaults.version)
    expect(Options.initItems).toHaveBeenCalled()
    expect(opt.items.locale.constructor.name).toEqual('OptionItem')
    expect(opt.items.locale.defaultValue).toEqual(testOption.defaultValue)
  })

  it('5 Options - names returns an array of items keys', () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-content-options',
      version: 2,
      items: { locale: testOption },
      fooProperty: 'bar'
    }
    let opt = new Options(testDefaults, StorageAdapter)

    expect(opt.names).toEqual(['locale'])
  })

  it('6 Options - load reload options from storageAdapter and returns an instance of Options object', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-test-options',
      version: 2,
      items: { locale6: testOption },
      fooProperty: 'bar'
    }
    let key =  Options.constructKey('alpheios-test-options',2,'locale6')
    window.localStorage.values['alpheios-test-options-keys'] = `["${key}"]`
    window.localStorage.values[key] = JSON.stringify('Foo')
    let storageArea = new LocalStorageArea('alpheios-test-options')
    let opt = new Options(testDefaults, storageArea)
    expect(opt.items.locale6.currentValue).toEqual('en-US')

    let callBackFn = jest.fn(() => { console.log('I am callBackFn') })
    let returnedOptions = await opt.load(callBackFn)

    expect(opt.items.locale6.currentValue).toEqual('Foo')
    expect(returnedOptions).toBeInstanceOf(Options)
  })

  it('7 Options - if there is a grouped property in storageAdapter it will be parsed and saved ', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', group: { foo: { defaultValue: 'en-US', text: 'English (US)', value: 'en-US' } } }
    let testDefaults = {
      domain: 'alpheios-test-options7',
      version: 2,
      items: { locale7: testOption },
      fooProperty: 'bar'
    }
    let key =  Options.constructKey('alpheios-test-options7',2,'locale7','foo')
    window.localStorage.values['alpheios-test-options7-keys'] = `["${key}"]`
    window.localStorage.values[key] = JSON.stringify('foo7')
    let storageArea = new LocalStorageArea('alpheios-test-options7')
    let opt = new Options(testDefaults, storageArea)

    let callBackFn = () => { console.log('I am callBackFn') }
    await opt.load(callBackFn)
    expect(opt.items.locale7[0].currentValue).toEqual('foo7')
  })

  it('8 Options - if there is a grouped property in storageAdapter it will be parsed. if there is no key as in option it would be ignored', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', group: { foo: { defaultValue: 'en-US', text: 'English (US)', value: 'en-US' } } }
    let testDefaults = {
      domain: 'alpheios-test-options7',
      version: 2,
      items: { locale9: testOption },
      fooProperty: 'bar'
    }
    window.localStorage.values['alpheios-test-options9-keys'] = '["localeN-foo"]'
    window.localStorage.values['localeN-foo'] = 'foo9'
    let storageArea = new LocalStorageArea('alpheios-test-options7')
    let opt = new Options(testDefaults, storageArea)

    let callBackFn = () => { console.log('I am callBackFn') }

    await opt.load(callBackFn)
    expect(opt.items.locale9[0].currentValue).toEqual('en-US')
    expect(opt.items.localeN).toBeUndefined()
  })

  it('9 Options - if in load method storageAdapter.get log error', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-test-options',
      version: 2,
      items: { locale6: testOption },
      fooProperty: 'bar'
    }

    window.localStorage.values['alpheios-test-options-keys'] = '["locale6"]'
    window.localStorage.values.locale6 = 'Foo'
    let storageArea = new LocalStorageArea('alpheios-test-options')
    let opt = new Options(testDefaults, storageArea)
    let testError = new Error('storageAdapter reject error')

    opt.storageAdapter.get = function () { return new Promise((resolve, reject) => { reject(testError) }) }

    await opt.load()
    expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/retrieving/))
  })

  it('10 Options - parseKey parses a string to object', () => {
    let domain='alpheios-content-options'
    let version = 2
    let name = 'foo'
    let group = 'bar'
    let key = Options.constructKey(domain, version, name, group)
    let res = Options.parseKey(key)
    expect(res).toEqual({ domain:domain, version: version, name: name, group: group })
  })

  it('13 Options - reset sets everything back to defaults',async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-test-options',
      version: 2,
      items: { locale6: testOption },
      fooProperty: 'bar'
    }
    let key =  Options.constructKey('alpheios-test-options',2,'locale6')
    window.localStorage.values['alpheios-test-options-keys'] = `["${key}"]`
    window.localStorage.values.locale6 = JSON.stringify('Foo')
    let storageArea = new LocalStorageArea('alpheios-test-options')
    let opt = new Options(testDefaults, storageArea)
    let callBackFn = jest.fn(() => { })
    let returnedOptions = await opt.load(callBackFn)
    expect(opt.items.locale6.currentValue).toEqual('Foo')
    await opt.reset()
    expect(opt.items.locale6.currentValue).toEqual('en-US')
  })

  it('14 Options - construct key without group', () => {
    let domain = "anydomain"
    let version = 2
    let name = "anykey"
    expect(Options.constructKey(domain,version,name)).toEqual('anydomain__2__anykey')
  })

  it('15 Options - construct key withgroup', () => {
    let domain = "anydomain"
    let version = 2
    let name = "anykey"
    let group ="anygroup"
    expect(Options.constructKey(domain,version,name,group)).toEqual('anydomain__2__anykey__anygroup')
  })

  it('16 Options - fails to parse non JSON value', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', values: [ { text: 'English (US)', value: 'en-US' } ] }
    let testDefaults = {
      domain: 'alpheios-test-options',
      version: 2,
      items: { locale6: testOption },
      fooProperty: 'bar'
    }
    let key =  Options.constructKey('alpheios-test-options',2,'locale6')
    window.localStorage.values['alpheios-test-options-keys'] = `["${key}"]`
    window.localStorage.values[key] = 'Foo'
    let storageArea = new LocalStorageArea('alpheios-test-options')
    let opt = new Options(testDefaults, storageArea)
    expect(opt.items.locale6.currentValue).toEqual('en-US')

    let callBackFn = jest.fn(() => { console.log('I am callBackFn') })
    let returnedOptions = await opt.load(callBackFn)
    expect(console['warn']).toHaveBeenCalled()
    expect(opt.items.locale6.currentValue).toEqual('en-US')

  })

  it('17 Options - fails to parse non JSON grouped value ', async () => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', group: { foo: { defaultValue: 'en-US', text: 'English (US)', value: 'en-US' } } }
    let testDefaults = {
      domain: 'alpheios-test-options7',
      version: 2,
      items: { locale7: testOption },
      fooProperty: 'bar'
    }
    let key =  Options.constructKey('alpheios-test-options7',2,'locale7','foo')
    let storageArea = new LocalStorageArea('alpheios-test-options7')
    let opt = new Options(testDefaults, storageArea)
    expect(opt.items.locale7[0].currentValue).toEqual('en-US')
    let callBackFn = () => { console.log('I am callBackFn') }
    window.localStorage.values['alpheios-test-options7-keys'] = `["${key}"]`
    window.localStorage.values[key] = 'foo7'
    await opt.load(callBackFn)

    expect(console['warn']).toHaveBeenCalled()
    expect(opt.items.locale7[0].currentValue).toEqual('en-US')
  })
  it('18 Options - constructor defaults should contain property version and will throw an error if undefined', () => {
    expect(function () {
      let l = new Options({ domain: 'bar', items: {} })
    }).toThrow(new Error(`Defaults have no obligatory "domain", "version" and "items" properties`))
  })
  it('19 Options - throws error on version mismatch', async() => {
    let testOption = { defaultValue: 'en-US', labelText: 'UI Locale:', group: { foo: { defaultValue: 'en-US', text: 'English (US)', value: 'en-US' } } }
    let testDefaults = {
      domain: 'alpheios-test-options7',
      version: 2,
      items: { locale7: testOption },
      fooProperty: 'bar'
    }
    let storageArea = new LocalStorageArea('alpheios-test-options7')
    let opt = new Options(testDefaults, storageArea)
    let callBackFn = () => { console.log('I am callBackFn') }
    let key =  Options.constructKey('alpheios-test-options7',3,'locale7','foo')
    window.localStorage.values['alpheios-test-options7-keys'] = `["${key}"]`
    window.localStorage.values[key] = JSON.stringify('foo7')
    await opt.load(callBackFn)

    expect(console['warn']).toHaveBeenCalled()
    expect(opt.items.locale7[0].currentValue).toEqual('en-US')

  })
})
