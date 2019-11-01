/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import AlpheiosTuftsAdapter from '@/adapters/tufts/adapter'
import TransformAdapter from '@/adapters/tufts/transform-adapter'
import { Constants, Homonym, Feature } from 'alpheios-data-models'

describe('tufts-example.test.js', () => {
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

  it('1 TuftsExample - returns correct engine for Latin, Greek, Arabic', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    expect(adapter.engineSet.getEngineByCode(Constants.LANG_LATIN).engine).toEqual('whitakerLat')
    expect(adapter.engineSet.getEngineByCode(Constants.LANG_GREEK).engine).toEqual('morpheusgrc')
    expect(adapter.engineSet.getEngineByCode(Constants.LANG_ARABIC).engine).toEqual('aramorph')
    expect(adapter.engineSet.getEngineByCode(Constants.LANG_PERSIAN).engine).toEqual('hazm')
    expect(adapter.engineSet.getEngineByCode(Constants.LANG_GEEZ).engine).toEqual('traces')
  }, 5000)

  it('2 TuftsExample - returns correct default value', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let engine = adapter.engineSet.getEngineByCode(Constants.LANG_GREEK)
    let retrievedData = engine[Feature.types.grmCase].get('nominative')
    let defaultData = new Feature(Feature.types.grmCase, 'nominative', Constants.LANG_GREEK)

    expect(retrievedData.value).toEqual(defaultData.value)
    expect(retrievedData.type).toEqual(defaultData.type)
  }, 10000)

  it('3 TuftsExample - returns correct mapped values', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let engine = adapter.engineSet.getEngineByCode(Constants.LANG_GREEK)
    let retrievedData = engine[Feature.types.gender].get('masculine feminine')
    let defaultData = new Feature(Feature.types.gender, [[Constants.GEND_MASCULINE, 1], [Constants.GEND_FEMININE, 2]], Constants.LANG_GREEK)

    expect(retrievedData.value).toEqual(defaultData.value)
    expect(retrievedData.type).toEqual(defaultData.type)
  }, 10000)

  it('4 TuftsExample - unmapped values with no defaults throws an error if unknown values not allowed', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      allowUnknownValues: false
    })

    expect(() => {
      let engine = adapter.engineSet.getEngineByCode(Constants.LANG_GREEK)
      engine[Feature.types.person].get('1') // eslint-disable-line no-unused-vars
    }).toThrowError(/unknown value/i)
  }, 10000)

  it('5 TuftsExample - unmapped values with no defaults still works if unknown values allowed', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let engine = adapter.engineSet.getEngineByCode(Constants.LANG_GREEK)
    let retrievedData = engine[Feature.types.person].get('1', 1, adapter.config.allowUnknownValues) // eslint-disable-line no-unused-vars
    let defaultData = new Feature(Feature.types.person, '1', Constants.LANG_GREEK)

    expect(retrievedData.value).toEqual(defaultData.value)
    expect(retrievedData.type).toEqual(defaultData.type)
  }, 10000)

  it('6 TuftsExample - check transform process for mare word', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'mare'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(4)
    let nounMare = homonym.lexemes.filter(l => l.lemma.features['part of speech'].value === 'noun')
    expect(nounMare.length).toEqual(2)
    expect(nounMare[0].meaning).toBeTruthy()
    expect(nounMare[0].lemma.features.declension.value).toEqual('3rd')
    expect(nounMare[0].provider.uri).toEqual('net.alpheios:tools:wordsxml.v1')
    expect(nounMare[0].provider.toString()).toMatch(/Whitaker/)
    let adjMas = homonym.lexemes.filter(l => l.lemma.word === 'mas' && l.lemma.features['part of speech'].value === 'adjective')
    expect(adjMas.length).toEqual(1)
    expect(nounMare[0].inflections.length).toEqual(5)
    let vocative = 0
    for (let c of nounMare[0].inflections.map(i => i[Feature.types.grmCase])) {
      if (c.values.includes('vocative')) { vocative++ }
    }
    expect(vocative).toEqual(1)
  }, 10000)

  it('7 TuftsExample - check transform process for cupidinibus data', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'cupidinibus'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(2)
    let wordTest = homonym.lexemes.filter(l => l.lemma.word === 'cupido')
    expect(wordTest.length).toEqual(1)
    expect(wordTest[0].lemma.features.frequency.value).toEqual('frequent')
    expect(wordTest[0].lemma.features.frequency.items[0].sortOrder).toEqual(5)
  }, 20000)

  it('8 TuftsExample - parses dialect stemtype derivtype morph', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'ἐλῴην'
    let url = adapter.prepareRequestUrl(Constants.LANG_GREEK, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].inflections.length).toEqual(2)
    expect(homonym.lexemes[0].inflections[0].dialect.value).toEqual('Attic')
    expect(homonym.lexemes[0].inflections[0].stemtype.value).toEqual('aw_fut')
    expect(homonym.lexemes[0].inflections[0].derivtype.value).toEqual('a_stem')
    expect(homonym.lexemes[0].inflections[0].morph.value).toEqual('contr')
  }, 20000)

  it('9 TuftsExample - multiple dict and mean entries', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'conditum'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(6)
    expect(homonym.lexemes[5].meaning.shortDefs.length).toEqual(1)
    expect(homonym.lexemes[5].lemma.principalParts).toEqual(['conditus', 'condita', 'conditior', 'conditissimus'])
    expect(homonym.lexemes[5].meaning.shortDefs[0].text).toEqual('seasoned, spiced up, flavored, savory; polished, ornamented (discourse/style);')
    expect(homonym.lexemes[5].provider).toBeTruthy()
    expect(homonym.lexemes[5].inflections.length).toEqual(4)
    expect(homonym.lexemes[4].meaning.shortDefs.length).toEqual(1)
    expect(homonym.lexemes[4].lemma.principalParts).toEqual(['conditus', 'condita', 'conditum'])
    expect(homonym.lexemes[4].meaning.shortDefs[0].text).toEqual('preserved, kept in store; hidden, concealed, secret; sunken (eyes);')
    expect(homonym.lexemes[4].meaning.shortDefs[0].lemmaText).toEqual('conditus')
    expect(homonym.lexemes[4].inflections.length).toEqual(4)
    expect(homonym.lexemes[0].meaning.shortDefs.length).toEqual(3)
  }, 20000)

  it('10 TuftsExample - lemma from infl', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'sui'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(6)
    expect(homonym.lexemes[5].lemma.word).toEqual('sui')
    expect(homonym.lexemes[5].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[5].lemma.features['declension'].value).toEqual('5th')
    expect(homonym.lexemes[5].lemma.features['frequency'].value).toEqual('very frequent')
  }, 20000)

  it('11 TuftsExample - lemma filter latin', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'mellitisque'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(2)
    expect(homonym.lexemes[0].lemma.word).toEqual('mellitus')
    expect(homonym.lexemes[1].lemma.word).toEqual('que')
  }, 20000)

  it('12 TuftsExample - lemma filter persian', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'مشکل‌ها'
    let url = adapter.prepareRequestUrl(Constants.LANG_PERSIAN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes.length).toEqual(1)
  }, 10000)

  it('13 TuftsExample - multivalued features', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'ترجمة'
    let url = adapter.prepareRequestUrl(Constants.LANG_ARABIC, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes.length).toEqual(5)
    expect(homonym.lexemes[3].inflections[0].morph.values.length).toEqual(2)
  }, 10000)

  it('14 TuftsExample - lemma declension feature not set if pofs differs', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'οὐδεμία'
    let url = adapter.prepareRequestUrl(Constants.LANG_GREEK, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes[0].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[0].lemma.features.declension).toBeFalsy()
  }, 20000)

  it('15 TuftsExample - inflection created if no stem', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'est'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes[1].inflections[0].stem).toBeNull()
    expect(homonym.lexemes[1].inflections[0].suffix).toEqual('est')
  }, 20000)

  it.skip('16 TuftsExample - can parse gez', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'ሀገርየ'
    let url = adapter.prepareRequestUrl(Constants.LANG_GEEZ, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes.length).toEqual(10)
  }, 20000)

  it('17 TuftsExample - hdwd created if no hdwd suffix and no stem', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'ego'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes[0].lemma.word).toEqual('ego')
  }, 10000)

  it('18 TuftsExample - parses irregular conjugations', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'sum'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes[2].lemma.features['conjugation'].value).toEqual('irregular')
    expect(homonym.lexemes[2].inflections[0]['conjugation'].value).toEqual('irregular')
  }, 20000)

  it('19 TuftsExample - aggregatesLexemes', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'aberis'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].altLemmas.length).toEqual(1)
    expect(homonym.lexemes[0].altLemmas[0].principalParts).toEqual(['absum', 'abesse', 'abfui', 'abfuturus'])
    expect(homonym.lexemes[0].lemma.principalParts).toEqual(['absum', 'abesse', 'afui', 'afuturus'])
  }, 10000)

  it('20 TuftsExample - adsum', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'adsum'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes.length).toEqual(2)
  }, 10000)

  it('21 TuftsExample - overrides inflection with lemma for auditum', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'auditum'
    let url = adapter.prepareRequestUrl(Constants.LANG_LATIN, word)
    let res = await adapter.fetch(url)

    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)
    expect(homonym.lexemes[0].inflections.length).toEqual(5)
    expect(homonym.lexemes[0].inflections.filter(i => i.conjugation.value === '4th').length).toEqual(5)
    expect(homonym.lexemes[0].inflections.filter(i => i.conjugation.value === '3rd').length).toEqual(0)
    expect(homonym.lexemes[0].lemma.features.conjugation.value).toEqual('4th')
  }, 20000)

  it('22 TuftsExample - adds clientId to URL', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      clientId: 'fooClient'
    })

    expect(adapter.prepareRequestUrl(Constants.LANG_LATIN, 'mare')).toEqual('https://morph.alpheios.net/api/v1/analysis/word?word=mare&engine=whitakerLat&lang=lat&clientId=fooClient')
  }, 10000)

  it('23 TuftsExample - escapes word in URL', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      clientId: 'fooClient'
    })
    expect(adapter.prepareRequestUrl(Constants.LANG_GREEK, 'ξυνέηκε')).toEqual('https://morph.alpheios.net/api/v1/analysis/word?word=%CE%BE%CF%85%CE%BD%CE%AD%CE%B7%CE%BA%CE%B5&engine=morpheusgrc&lang=grc&clientId=fooClient')
  })
})
