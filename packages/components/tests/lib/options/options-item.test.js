/* eslint-env jest */
import OptionItem from '@/lib/options/options-item'

describe('options-item.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  let values = [
    { text: 'Latin', value: 'lat' },
    { text: 'Greek', value: 'grc' },
    { text: 'Arabic', value: 'ara' },
    { text: 'Persian', value: 'per' }
  ]

  let item = {
    defaultValue: 'lat',
    values: values
  }

  let emptyPromise = () => { return new Promise((resolve, reject) => {}) }
  let stAdapter = { domain: 'alpheios-content-options', set: emptyPromise }

  it('1 OptionItem - constructor has a required item property and will throw error if undefined', () => {
    expect(function () {
      let l = new OptionItem()
      console.log(l)
    }).toThrow(new Error(`Item cannot be empty`))
  })

  it('2 OptionItem - constructor has a required key property and will throw error if undefined', () => {
    expect(function () {
      let l = new OptionItem(true)
      console.log(l)
    }).toThrow(new Error(`Key cannot be empty`))
  })

  it('3 OptionItem - constructor has a required storageAdapter property and will throw error if undefined', () => {
    expect(function () {
      let l = new OptionItem(true, true)
      console.log(l)
    }).toThrow(new Error(`Storage adapter object should be provided`))
  })

  it('4 OptionItem has a textValues method and return a modified array of values', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)

    let res = newOptionItem.textValues()

    expect(res.length).toEqual(4)
    expect(typeof res[0]).toEqual('string')
    expect(res[0]).toEqual('Latin')
  })

  it('5 OptionItem has a currentTextValue method and return value according to default text', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    newOptionItem.setValue('grc')
    expect(newOptionItem.currentTextValue()).toEqual('Greek')
  })

  it('6 OptionItem - if OptionItem is multiValue then a currentTextValue method will return an array', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    newOptionItem.multiValue = true

    newOptionItem.setValue(['lat', 'grc'])
    expect(newOptionItem.currentTextValue()).toEqual(['Latin', 'Greek'])
  })

  it('7 OptionItem has addValue method and it pushs element to value', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    expect(newOptionItem.values.length).toEqual(4)
    newOptionItem.addValue({ text: 'Foo', value: 'foo' })
    expect(newOptionItem.values.length).toEqual(5)
  })

  it('8 OptionItem has a setValue method and it changes currentValue and executes save method', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)

    jest.spyOn(newOptionItem, 'save')
    newOptionItem.setValue('ara')

    expect(newOptionItem.currentValue).toEqual('ara')
    expect(newOptionItem.save).toHaveBeenCalled()
  })

  it('9 OptionItem has a setTextValue method and it changes currentValue and executes save method', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)

    jest.spyOn(newOptionItem, 'save')
    newOptionItem.setTextValue('Persian')

    expect(newOptionItem.currentValue).toEqual('per')
    expect(newOptionItem.save).toHaveBeenCalled()
  })

  it('10 OptionItem - If OptionItem is multiValue then a setTextValue method saves an array', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    newOptionItem.multiValue = true

    newOptionItem.setTextValue(['Latin', 'Greek'])
    expect(newOptionItem.currentValue).toEqual(['lat', 'grc'])
  })

  it('11 OptionItem has a save method and it executes a set method of StorageAdapter, if set Promise is success it logs to console otherwise it prints an error to console', async () => {
    let curStAdapter = {
      domain: 'alpheios-content-options',
      set: () => { return new Promise((resolve, reject) => { resolve(true) }) }
    }
    let newOptionItem = new OptionItem(item, 'preferredLanguage', curStAdapter)
    jest.spyOn(curStAdapter, 'set')

    await newOptionItem.save()

    let testOption = { preferredLanguage: JSON.stringify('lat') }

    expect(curStAdapter.set).toHaveBeenCalledWith(testOption)
    // expect(console.log).toHaveBeenCalledWith('Value "lat" of "preferredLanguage" option value was stored successfully')
  })

  it('12 OptionItem has a save method and it executes a set method of StorageAdapter, if set Promise is rejected it prints an error to console', async () => {
    let testError = new Error('StorageAdapterSaveRejected error')
    let curStAdapter = {
      domain: 'alpheios-content-options',
      set: () => { return new Promise((resolve, reject) => { reject(testError) }) }
    }
    let newOptionItem = new OptionItem(item, 'preferredLanguage', curStAdapter)
    await newOptionItem.save()

    expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/storing/))
  })
})
