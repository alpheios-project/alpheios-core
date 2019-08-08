/* eslint-env jest */
import LocalStorageArea from '@/lib/options/local-storage-area'
// import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

describe('local-storage-area.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  it('1 LocalStorageArea has a get method that executes getItem of window.localStorage', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options')

    await stAdapter.get()

    expect(window.localStorage.getItem).toHaveBeenCalled()
  })

  it('2 LocalStorageArea - get method fails quietly if window.localStorage doesn\'t have keys', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options')
    await stAdapter.get()
    expect(console.log).not.toHaveBeenCalled()
  })

  it('3 LocalStorageArea - get method retrieves values for all keys from the window.localStorage if keys = undefined', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options3')
    window.localStorage.values['alpheios-content-options3-keys'] = '["panelPosition3","preferredLanguage3"]'
    window.localStorage.values.panelPosition3 = 'left'
    window.localStorage.values.preferredLanguage3 = 'lat'

    let res = await stAdapter.get()
    expect(res.panelPosition3).toEqual('left')
    expect(res.preferredLanguage3).toEqual('lat')
  })

  it('4 LocalStorageArea - get method retrieves a value by a given key from the window.localStorage if a key(string)', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options4')
    window.localStorage.values['alpheios-content-options4-keys'] = '["panelPosition4"]'
    window.localStorage.values.panelPosition4 = 'left'

    let res = await stAdapter.get('panelPosition4')
    expect(res).toEqual({ panelPosition4: 'left' })
  })

  it('5 LocalStorageArea - get method retrieves values by given keys from passed object from the window.localStorage if a key(object)', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options5')
    window.localStorage.values['alpheios-content-options5-keys'] = '["panelPosition5"]'
    window.localStorage.values.panelPosition5 = 'left'

    let res = await stAdapter.get({ panelPosition5: true })
    expect(res).toEqual({ panelPosition5: 'left' })
  })

  it('6 LocalStorageArea - get method retrieves values for all keys from the window.localStorage if keys = []', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options6')
    window.localStorage.values['alpheios-content-options6-keys'] = '["panelPosition6","preferredLanguage6"]'
    window.localStorage.values.panelPosition6 = 'left'
    window.localStorage.values.preferredLanguage6 = 'lat'

    let res = await stAdapter.get([])
    expect(res.panelPosition6).toEqual('left')
    expect(res.preferredLanguage6).toEqual('lat')
  })

  it('7 LocalStorageArea - get method retrieves values for all keys from the window.localStorage if keys is something unexpected (Number)', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options7')
    window.localStorage.values['alpheios-content-options7-keys'] = '["panelPosition7","preferredLanguage7"]'
    window.localStorage.values.panelPosition7 = 'left'
    window.localStorage.values.preferredLanguage7 = 'lat'

    let res = await stAdapter.get(5)
    expect(res.panelPosition7).toEqual('left')
    expect(res.preferredLanguage7).toEqual('lat')
  })

  it('8 LocalStorageArea has set method that executes setItem of window.localStorage', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options8')
    await stAdapter.set({ foo8: 'bar' })
    expect(window.localStorage.setItem).toHaveBeenCalledWith('foo8', 'bar')
  })

  it('9 LocalStorageArea - set method add a new value to the window.localStorage if there is no such key in it', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options9')
    window.localStorage.values['alpheios-content-options9-keys'] = '[]'

    await stAdapter.set({ foo9: 'bar' })
    expect(window.localStorage.values.foo9).toEqual('bar')
  })

  it('10 LocalStorageArea - set method update existed value at the window.localStorage if there is a such key in it', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options10')
    window.localStorage.values['alpheios-content-options10-keys'] = '["panelPosition10"]'
    window.localStorage.values.panelPosition10 = 'left'

    await stAdapter.set({ panelPosition10: 'top' })
    expect(window.localStorage.values.panelPosition10).toEqual('top')
  })

  it('11 LocalStorageArea - set method could save values from a given array', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options11')
    window.localStorage.values['alpheios-content-options11-keys'] = '["panelPosition11","preferredLanguage11"]'
    window.localStorage.values.panelPosition11 = 'left'
    window.localStorage.values.preferredLanguage11 = 'lat'

    await stAdapter.set({ panelPosition11: 'top', preferredLanguage11: 'grc', foo11: 'bar' })
    expect(window.localStorage.values.panelPosition11).toEqual('top')
    expect(window.localStorage.values.preferredLanguage11).toEqual('grc')
    expect(window.localStorage.values.foo11).toEqual('bar')
  })

  it('12 LocalStorageArea - remove method removes value from local storage (direct and from domain-keys)', async () => {
    let stAdapter = new LocalStorageArea('alpheios-content-options12')
    window.localStorage.values['alpheios-content-options12-keys'] = '["panelPosition12","preferredLanguage12"]'
    window.localStorage.values.panelPosition12 = 'left'
    window.localStorage.values.preferredLanguage12 = 'lat'

    await stAdapter.remove('preferredLanguage12')
    expect(window.localStorage.values['alpheios-content-options12-keys']).toEqual('["panelPosition12"]')
    expect(window.localStorage.preferredLanguage12).toBeUndefined()
  })

  it('13 LocalStorageArea - clearAll method removes all values from local storage', async() => {
    let stAdapter = new LocalStorageArea('alpheios-content-options13')
    await stAdapter.set({ foo1: 'bar' })
    await stAdapter.set({ foo2: 'bar2' })
    expect(window.localStorage.values.foo1).toEqual('bar')
    expect(window.localStorage.values.foo2).toEqual('bar2')
    await stAdapter.clearAll()
    expect(window.localStorage.values.foo1).toBeUndefined()
    expect(window.localStorage.values.foo2).toBeUndefined()
    expect(window.localStorage.values['alpheios-content-options13-keys']).toEqual('[]')
  })
})
