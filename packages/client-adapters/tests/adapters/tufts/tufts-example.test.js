/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import AlpheiosTuftsAdapter from '@clAdapters/adapters/tufts/adapter'
import { Constants, Homonym, Feature } from 'alpheios-data-models'

import { Fixture } from 'alpheios-fixtures'

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
    let word = 'mare'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })
    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)
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
  })

  it('7 TuftsExample - check transform process for cupidinibus data', async () => {
    let word = 'cupidinibus'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)

    expect(homonym.lexemes.length).toEqual(2)
    let wordTest = homonym.lexemes.filter(l => l.lemma.word === 'cupido')
    expect(wordTest.length).toEqual(1)
    expect(wordTest[0].lemma.features.frequency.value).toEqual('frequent')
    expect(wordTest[0].lemma.features.frequency.items[0].sortOrder).toEqual(5)
  }, 20000)

  it('8 TuftsExample - parses dialect stemtype derivtype morph', async () => {
    let word = 'ἐλῴην'
    let res = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })


    let homonym = await adapter.getHomonym(Constants.LANG_GREEK,word)

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].inflections.length).toEqual(2)
    expect(homonym.lexemes[0].inflections[0].dialect.value).toEqual('Attic')
    expect(homonym.lexemes[0].inflections[0].stemtype.value).toEqual('aw_fut')
    expect(homonym.lexemes[0].inflections[0].derivtype.value).toEqual('a_stem')
    expect(homonym.lexemes[0].inflections[0].morph.value).toEqual('contr')
  }, 20000)

  it('9 TuftsExample - multiple dict and mean entries', async () => {
    let word = 'conditum'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)
    expect(homonym.lexemes.length).toEqual(6)
    expect(homonym.lexemes[2].meaning.shortDefs.length).toEqual(1)
    expect(homonym.lexemes[2].lemma.principalParts).toEqual(['conditus', 'condita', 'conditior', 'conditissimus'])
    expect(homonym.lexemes[2].meaning.shortDefs[0].text).toEqual('seasoned, spiced up, flavored, savory; polished, ornamented (discourse/style);')
    expect(homonym.lexemes[2].provider).toBeTruthy()
    expect(homonym.lexemes[2].inflections.length).toEqual(4)
    expect(homonym.lexemes[1].meaning.shortDefs.length).toEqual(1)
    expect(homonym.lexemes[1].lemma.principalParts).toEqual(['conditus', 'condita', 'conditum'])
    expect(homonym.lexemes[1].meaning.shortDefs[0].text).toEqual('preserved, kept in store; hidden, concealed, secret; sunken (eyes);')
    expect(homonym.lexemes[1].meaning.shortDefs[0].lemmaText).toEqual('conditus')
    expect(homonym.lexemes[1].inflections.length).toEqual(4)
    expect(homonym.lexemes[0].meaning.shortDefs.length).toEqual(3)
  })

  it('10 TuftsExample - lemma from infl', async () => {
    let word = 'sui'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })

    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)

    expect(homonym.lexemes.length).toEqual(6)
    expect(homonym.lexemes[0].lemma.word).toEqual('sui')
    expect(homonym.lexemes[0].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[0].lemma.features['declension'].value).toEqual('5th')
    expect(homonym.lexemes[0].lemma.features['frequency'].value).toEqual('very frequent')
  })

  it('11 TuftsExample - lemma filter latin', async () => {
    let word = 'mellitisque'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)
    expect(homonym.lexemes.length).toEqual(2)
    expect(homonym.lexemes[0].lemma.word).toEqual('mellitus')
    expect(homonym.lexemes[1].lemma.word).toEqual('que')
  })

  it('12 TuftsExample - lemma filter persian', async () => {
    let word = 'بگذرد'
    let res = Fixture.getFixtureRes({
      langCode: 'per', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_ARABIC,word)
    // TODO why is there no test here?
  })

  it('13 TuftsExample - multivalued features', async () => {
    let word = 'ترجمة'
    let res = Fixture.getFixtureRes({
      langCode: 'ara', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_ARABIC,word)
    expect(homonym.lexemes.length).toEqual(5)
    expect(homonym.lexemes[0].inflections[0].morph.values.length).toEqual(2)
  })

  it('14 TuftsExample - lemma declension feature not set if pofs differs', async () => {
    let word = 'οὐδεμία'
    let res = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_GREEK,word)
    expect(homonym.lexemes[0].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[0].lemma.features.declension).toBeFalsy()
  }, 20000)

  it('15 TuftsExample - inflection created if no stem', async () => {
    let word = 'est'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)
    expect(homonym.lexemes[0].inflections[0].stem).toBeNull()
    expect(homonym.lexemes[0].inflections[0].suffix).toEqual('est')
  })

  it('16 TuftsExample - can parse gez', async () => {
    let word = 'ሀገርየ'
    let res = Fixture.getFixtureRes({
      langCode: 'gez', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_GEEZ,word)
    expect(homonym.lexemes.length).toEqual(3)
  })

  it('17 TuftsExample - hdwd created if no hdwd suffix and no stem', async () => {
    let word = 'ego'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })


    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)
    expect(homonym.lexemes[0].lemma.word).toEqual('ego')
  })

  it('18 TuftsExample - parses irregular conjugations', async () => {
    let word = 'sum'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })

    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)

    expect(homonym.lexemes[1].lemma.features['conjugation'].value).toEqual('irregular')
    expect(homonym.lexemes[1].inflections[0]['conjugation'].value).toEqual('irregular')
  })

  it('19 TuftsExample - aggregatesLexemes', async () => {
    let word = 'aberis'
    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData:sourceJson
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].altLemmas.length).toEqual(1)
    expect(homonym.lexemes[0].altLemmas[0].principalParts).toEqual(['absum', 'abesse', 'abfui', 'abfuturus'])
    expect(homonym.lexemes[0].lemma.principalParts).toEqual(['absum', 'abesse', 'afui', 'afuturus'])
  })

  it('20 TuftsExample - adsum', async () => {
    let word = 'adsum'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)
    expect(homonym.lexemes.length).toEqual(2)
  })

  it('21 TuftsExample - overrides inflection with lemma for auditum', async () => {
    let word = 'auditum'
    let res = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })


    let homonym = await adapter.getHomonym(Constants.LANG_LATIN,word)
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
  })

  it('23 TuftsExample - escapes word in URL', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      clientId: 'fooClient'
    })
    expect(adapter.prepareRequestUrl(Constants.LANG_GREEK, 'ξυνέηκε')).toEqual('https://morph.alpheios.net/api/v1/analysis/word?word=%CE%BE%CF%85%CE%BD%CE%AD%CE%B7%CE%BA%CE%B5&engine=morpheusgrc&lang=grc&clientId=fooClient')
  })

  it('24 TuftsExample - lemma filtersyriac', async () => {
    let word = 'ܘܐܡܪܝܢ'
    let res = Fixture.getFixtureRes({
      langCode: 'syr', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_SYRIAC,word)
    expect(homonym.lexemes.length).toEqual(4)
    expect(homonym.lexemes[0].inflections[0].kaylo.value).toEqual("pʿal")
    expect(homonym.lexemes[0].lemma.features.source.value).not.toEqual(expect.stringMatching(/from sedra.bethmardutho.org/))
  })

  it('24 TuftsExample - correct results for greek τίς', async () => {
    let word = 'τίς'
    let res = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })
    let homonym = await adapter.getHomonym(Constants.LANG_GREEK,word)
    expect(homonym.lexemes.length).toEqual(2)
    expect(homonym.lexemes[0].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[1].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[0].inflections[0]['part of speech'].value).toEqual("pronoun")
    expect(homonym.lexemes[0].inflections[1]['part of speech'].value).toEqual("pronoun")
    expect(homonym.lexemes[1].inflections[0]['part of speech'].value).toEqual("pronoun")
    expect(homonym.lexemes[1].inflections[1]['part of speech'].value).toEqual("pronoun")
  })

  it('25 TuftsExample - correct results for greek τίνος', async () => {
    let word = 'τίνος'
    let res = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })
    let homonym = await adapter.getHomonym(Constants.LANG_GREEK,word)
    expect(homonym.lexemes.length).toEqual(2)
    expect(homonym.lexemes[0].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[1].lemma.features['part of speech'].value).toEqual('pronoun')
    expect(homonym.lexemes[0].inflections[0]['part of speech'].value).toEqual("pronoun")
    expect(homonym.lexemes[1].inflections[0]['part of speech'].value).toEqual("pronoun")
  })

  it('26 TuftsExample - syriac homonym with at least a meaning', async () => {
    let word = 'ܐܒܪܐ'
    let res = Fixture.getFixtureRes({
      langCode: 'syr', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_SYRIAC,word)
    expect(homonym.lexemes.length).toEqual(2)
    expect(homonym.lexemes[0].meaning).toBeTruthy()
    expect(homonym.lexemes[1].meaning).toBeTruthy()
  })

  it('27 TuftsExample - morpheusgrc overrides comparative for irregular adjective', async () => {
    let word = 'ἁπλούστερον'
    let res = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_GREEK,word)
    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].inflections.length).toEqual(4)
    expect(homonym.lexemes[0].inflections[0][Feature.types.comparison].values).toEqual([Constants.COMP_COMPARITIVE])
    expect(homonym.lexemes[0].inflections[1][Feature.types.comparison].values).toEqual([Constants.COMP_COMPARITIVE])
    expect(homonym.lexemes[0].inflections[2][Feature.types.comparison].values).toEqual([Constants.COMP_COMPARITIVE])
    expect(homonym.lexemes[0].inflections[3][Feature.types.comparison].values).toEqual([Constants.COMP_COMPARITIVE])
  })

  it('28 TuftsExample - morpheusgrc does not override comparative for irregular adverb', async () => {
    let word = 'ἐξωτέρω'
    let res = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: word
    })
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })

    let homonym = await adapter.getHomonym(Constants.LANG_GREEK,word)
    expect(homonym.lexemes.length).toEqual(2)
    let adverb = homonym.lexemes.filter(l => l.lemma.features['part of speech'].value === 'adverb')
    expect(adverb[0].inflections.length).toEqual(1)
    expect(adverb[0].inflections[0][Feature.types.morph].value.match(/irreg_comp/)).toBeTruthy()
    expect(adverb[0].inflections[0][Feature.types.comparison]).toBe(undefined)
  })

})
