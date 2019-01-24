/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Author from '@/texts/author'

describe('author.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
  })

  let testURN = 'urn:cts:latinLit:phi0690'

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

  it('1 Author - constructor creates urn, titles, ID', () => {
    let author = new Author(testURN, 'fooTitles', 'fooAbbreviations')

    expect(author.urn).toEqual(testURN)
    expect(author.titles).toEqual('fooTitles')
    expect(author.abbreviations).toEqual('fooAbbreviations')
  })

  it('2 Author - static methods defaultLang and defaultIDPrefix are defined', () => {
    expect(Author.defaultLang).toBeDefined()
  })

  it('3 Author - title method returns title for the language from arguments, otherwise in the defaultLang or if not exists it returns the first title from the list', () => {
    let testTitlesWithDefaultLang = { lat: 'FooLatName', eng: 'Ovid' }

    let testTitlesWithoutDefaultLang = { lat: 'FooLatName' }

    let author1 = new Author(testURN, testTitlesWithDefaultLang)
    expect(author1.title()).toEqual('Ovid')
    expect(author1.title('eng')).toEqual('Ovid')
    expect(author1.title('lat')).toEqual('FooLatName')

    let author2 = new Author(testURN, testTitlesWithoutDefaultLang)
    expect(author2.title()).toEqual('FooLatName')
  })

  it('4 Author - abbreviation method returns abbreviation for the language from arguments, otherwise in the defaultLang or if not exists it returns the first abbreviation from the list', () => {
    let testAbbreviationsWithDefaultLang = { lat: 'FooLatAbbr', eng: 'FooEngAbbr' }

    let testAbbreviationsWithoutDefaultLang = { lat: 'FooLatAbbr' }

    let author1 = new Author(testURN, 'fooTitles', testAbbreviationsWithDefaultLang)
    expect(author1.abbreviation('eng')).toEqual('FooEngAbbr')
    expect(author1.abbreviation('lat')).toEqual('FooLatAbbr')

    let author2 = new Author(testURN, 'fooTitles', testAbbreviationsWithoutDefaultLang)
    expect(author2.abbreviation()).toEqual('FooLatAbbr')
  })
})
