/* eslint-env jest */
/* eslint-disable no-unused-vars */
import TextWork from '@/texts/text-work'

describe('text-work.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
  })

  let testURN = 'urn:cts:latinLit:phi0690.phi003'

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

  it('1 TextWork - constructor creates author, urn, titles, ID', () => {
    let textWork = new TextWork('fooAuthor', testURN, 'fooTitles')

    expect(textWork.urn).toEqual(testURN)
    expect(textWork.titles).toEqual('fooTitles')
    expect(textWork.author).toEqual('fooAuthor')
  })

  it('2 TextWork - static methods defaultLang and defaultIDPrefix are defined', () => {
    expect(TextWork.defaultLang).toBeDefined()
  })

  it('3 TextWork - title method returns title for the language from arguments, otherwise in the defaultLang or if not exists it returns the first title from the list', () => {
    let testTitlesWithDefaultLang = { lat: 'Amores', eng: 'The Art of Love' }

    let testTitlesWithoutDefaultLang = { lat: 'Amores' }

    let textWork1 = new TextWork('fooAuthor', testURN, testTitlesWithDefaultLang)
    expect(textWork1.title()).toEqual('The Art of Love')
    expect(textWork1.title('eng')).toEqual('The Art of Love')
    expect(textWork1.title('lat')).toEqual('Amores')

    let textWork2 = new TextWork('fooAuthor', testURN, testTitlesWithoutDefaultLang)
    expect(textWork2.title()).toEqual('Amores')
  })

  it('4 TextWork - abbreviation method returns abbreviation for the language from arguments, otherwise in the defaultLang or if not exists it returns the first abbreviation from the list', () => {
    let testAbbreviationsWithDefaultLang = { lat: 'FooLatAbbr', eng: 'FooEngAbbr' }

    let testAbbreviationsWithoutDefaultLang = { lat: 'FooLatAbbr' }

    let textWork1 = new TextWork('fooAuthor', testURN, 'fooTitles', testAbbreviationsWithDefaultLang)
    expect(textWork1.abbreviation('eng')).toEqual('FooEngAbbr')
    expect(textWork1.abbreviation('lat')).toEqual('FooLatAbbr')

    let textWork2 = new TextWork('fooAuthor', testURN, 'fooTitles', testAbbreviationsWithoutDefaultLang)
    expect(textWork2.abbreviation()).toEqual('FooLatAbbr')
  })
})
