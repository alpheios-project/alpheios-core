/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Author from '@/texts/author'
import WordUsageExample from '@/texts/word-usage-example'
import TextWork from '../../src/texts/text-work'

describe('word-usage-example.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
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

  it('1 WordUsageExample - constructor creates languageCode and normalizedText', () => {
    let wordUsageExample = new WordUsageExample('lat', 'cepit', 'fooleft', 'fooright', 'foosource', 'foocit')

    expect(wordUsageExample.languageCode).toEqual('lat')
    expect(wordUsageExample.normalizedText).toEqual('cepit')
    expect(wordUsageExample.prefix).toEqual('fooleft')
    expect(wordUsageExample.suffix).toEqual('fooright')
    expect(wordUsageExample.source).toEqual('foosource')
    expect(wordUsageExample.cit).toEqual('foocit')
  })

  it('2 WordUsageExample - htmlExample is a get method that returns constructed HTML for wordUsageExample', () => {
    let testJsonObj = {
      cit: 'SenPhil.Med.484',
      left: 'felix uicem. ex opibus illis, quas procul raptas Scythae ',
      link: '/loc/1017/4/9/2890-2895',
      right: ' a perustis Indiae populis agunt, quas quia referta uix',
      target: 'usque'
    }

    let wordUsageExample = new WordUsageExample(testJsonObj.target, 'lat')
    wordUsageExample.prefix = testJsonObj.left
    wordUsageExample.suffix = testJsonObj.right

    expect(typeof wordUsageExample.htmlExample).toEqual('string')
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.left)).toBeTruthy()
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.right)).toBeTruthy()
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.target)).toBeTruthy()
  })

  it('3 WordUsageExample - fullCit constructs full description of author + textWork + citNumber', () => {
    let testAuthor = new Author('urn:cts:latinLit:phi0690', { eng: 'Virgil' }, { eng: 'Verg.' })
    let testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { lat: 'LatAeneid', eng: 'EngAeneid' }, { eng: 'A.' })

    let wordUsageExample = new WordUsageExample('usque', 'lat')
    wordUsageExample.author = testAuthor
    wordUsageExample.textWork = testTextWork
    wordUsageExample.cit = 'Virgil.Aeneid.484'

    expect(wordUsageExample.fullCit()).toEqual('Virgil EngAeneid 484')
    expect(wordUsageExample.fullCit('lat')).toEqual('Virgil LatAeneid 484')
    expect(wordUsageExample.fullCit('eng')).toEqual('Virgil EngAeneid 484')

    wordUsageExample.textWork = undefined
    expect(wordUsageExample.fullCit()).toEqual('Virgil Aeneid. 484') // gets from cit

    wordUsageExample.author = undefined
    expect(wordUsageExample.fullCit()).toEqual('Virgil.Aeneid.484')
  })

  it('4 WordUsageExample - authorForSort returns author title in upper case, and the first part of the cit otherwise', () => {
    let wordUsageExample = new WordUsageExample('usque', 'lat')
    wordUsageExample.cit = 'Virgil.Aeneid.484'

    expect(wordUsageExample.authorForSort()).toEqual('VIRGIL')

    wordUsageExample.author = new Author('urn:cts:latinLit:phi0690', { eng: 'Virgil' }, { eng: 'Verg.' })
    expect(wordUsageExample.authorForSort()).toEqual('VIRGIL')
  })

  it('5 WordUsageExample - textWorkForSort returns textWork in upper case, and the second part of the cit otherwise', () => {
    let testAuthor = new Author('urn:cts:latinLit:phi0690', { eng: 'Virgil' }, { eng: 'Verg.' })
    let testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { lat: 'LatAeneid', eng: 'EngAeneid' }, { eng: 'A.' })

    let wordUsageExample = new WordUsageExample('usque', 'lat')
    wordUsageExample.author = testAuthor

    wordUsageExample.cit = 'Virgil.Aeneid.484'

    expect(wordUsageExample.textWorkForSort()).toEqual('AENEID')

    wordUsageExample.textWork = testTextWork
    expect(wordUsageExample.textWorkForSort()).toEqual('ENGAENEID')
  })

  it('6 WordUsageExample - prefixForSort returns normalized prefix without punctuation', () => {
    let wordUsageExample = new WordUsageExample('usque', 'lat')
    wordUsageExample.prefix = '. fooprefix part2'

    expect(wordUsageExample.prefixForSort).toEqual('FOOPREFIXPART2')
  })

  it('7 WordUsageExample - suffixForSort returns normalized prefix without punctuation', () => {
    let wordUsageExample = new WordUsageExample('usque', 'lat')
    wordUsageExample.suffix = '. foosuffix part2'

    expect(wordUsageExample.suffixForSort).toEqual('FOOSUFFIXPART2')
  })
})
