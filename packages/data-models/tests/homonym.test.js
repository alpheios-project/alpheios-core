/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Homonym from '@/homonym.js'

import * as Constants from '@/constants.js'
import LMF from '@/language_model_factory.js'
import Lexeme from '@/lexeme.js'
import Lemma from '@/lemma.js'
import Inflection from '@/inflection.js'
import Feature from '@/feature.js'

describe('homonym.test.js', () => {
  let lexeme1, lexeme2

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    lexeme1 = new Lexeme(
      new Lemma('word1', 'grc'),
      [
        new Inflection('stem1', 'grc'),
        new Inflection('stem2', 'grc')
      ]
    )
    lexeme2 = new Lexeme(
      new Lemma('word2', 'grc'),
      [
        new Inflection('stem3', 'grc'),
        new Inflection('stem4', 'grc')
      ]
    )
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Homonym - check required arguments for Homonym constructor', () => {
    expect(function () {
      const l = new Homonym()
      console.log(l)
    }).toThrowError(/empty/)

    expect(function () {
      const l = new Homonym('foodata')
      console.log(l)
    }).toThrowError(/array/)

    expect(function () {
      const l = new Homonym(['foodata'])
      console.log(l)
    }).toThrowError(/Lexeme object type/)
  })

  it('2 Homonym - create with min arguments', () => {
    const homonym = new Homonym([lexeme1], 'fooform')
    expect(homonym.lexemes).toEqual([lexeme1])
    expect(homonym.targetWord).toEqual('fooform')
  })

  it('3 Homonym - create homonym from json using readObject', () => {
    const testJson = {
      lexemes: [lexeme1, lexeme2],
      form: 'fooTargetWord'
    }

    Lexeme.readObject = jest.fn((l) => l)

    const hRes1 = Homonym.readObject(testJson)
    expect(Lexeme.readObject).toHaveBeenCalledTimes(2)

    expect(hRes1.targetWord).toEqual('fooTargetWord')
    expect(hRes1.lexemes).toEqual([lexeme1, lexeme2])

    delete testJson.targetWord
    const hRes2 = Homonym.readObject(testJson)
    expect(hRes2.form).toBeUndefined()

    delete testJson.lexemes

    expect(function () {
      const l = Homonym.readObject(testJson)
      console.log(l)
    }).toThrowError(/empty/)
  })

  it('4 Homonym - language method', () => {
    const homonym = new Homonym([lexeme1], 'fooform')
    const res = homonym.language

    expect(res).toEqual('grc')
  })

  it('5 Homonym - languageID method', () => {
    let homonym = new Homonym([lexeme1])
    const res = homonym.languageID

    expect(res).toEqual(Constants.LANG_GREEK)

    delete lexeme2.lemma.languageID

    homonym = new Homonym([lexeme2])
    expect(function () {
      const l = homonym.languageID
      console.log(l)
    }).toThrowError(/language ID/)
  })

  it('6 Homonym - inflections method', () => {
    const infl1 = new Inflection('stem1', 'grc')
    const infl2 = new Inflection('stem2', 'grc')

    const lexeme = new Lexeme(
      new Lemma('word1', 'grc'),
      [
        infl1, infl2
      ]
    )

    const homonym = new Homonym([lexeme])
    expect(homonym.inflections).toEqual([infl1, infl2])
  })

  it('7A Homonym disambiguation: case A', () => {
    /*
    A homonym with a single lexeme that has two possible inflections in active and passive voices.
    Disambiguator has a single inflection in an active voice.
    As a result of a disambiguation, active voice inflection is the selected inflection
     */
    let infl1 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let lem = new Lemma('word1', 'grc') // eslint-disable-line prefer-const
    lem.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexeme = new Lexeme(
      lem,
      [
        infl1, infl2
      ]
    )
    const homonym = new Homonym([lexeme])

    const disambiguatorLexeme = new Lexeme(
      lem,
      [
        infl1
      ]
    )
    const disambiguator = new Homonym([disambiguatorLexeme])

    const disambiguated = Homonym.disambiguate(homonym, [disambiguator])
    expect(disambiguated.isDisambiguated()).toBeTruthy()
    expect(disambiguated.inflections).toEqual([infl1,infl2])
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl1)
  })

  it('7B Homonym disambiguation: case B', () => {
    /*
    A homonym with a single lexeme that has two possible inflections in active and passive voices.
    Disambiguator homonym has a lexeme with a different lemma.
    A disambiguated homonym must include both lexemes: one from the original homonym and one
    from a disambiguator.
     */
    let infl1 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let lem = new Lemma('word1', 'grc') // eslint-disable-line prefer-const
    lem.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexeme = new Lexeme(
      lem,
      [
        infl1, infl2
      ]
    )
    const homonym = new Homonym([lexeme])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl3 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    const disambiguatorLexeme = new Lexeme(
      new Lemma('word2', 'grc'),
      [
        infl3
      ]
    )
    const disambiguator = new Homonym([disambiguatorLexeme])
    const disambiguated = Homonym.disambiguate(homonym, [disambiguator])

    expect(disambiguated.isDisambiguated()).toBeTruthy()
    expect(disambiguated.lexemes.length).toEqual(2)
    expect(disambiguated.lexemes[0].inflections).toEqual([infl3])
    expect(disambiguated.lexemes[0].disambiguated).toBeTruthy()
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl3)
    expect(disambiguated.lexemes[1].inflections).toEqual([infl1, infl2])
    expect(disambiguated.lexemes[1].disambiguated).toBeFalsy()
  })

  it('7C Homonym disambiguation: case C', () => {
    /*
    HomonymA contains 1 Lexeme with 3 inflections.
    HomonymB contains 1 Lexeme with 1 inflection.
    HomonymA.Lexeme1 matches HomonymBLexeme1 on lemma.word and lemma.part of speech.
    HomonymB.Lexeme1.Inflection1 cannot be found in HomonymA.Lexeme1.
    The resulting Homonym should contain 1 Lexeme with the superset of all attributes
    from HomonymA.Lexeme1 and HomonymB.Lexeme1 with the inflection from HomonymB selected.
    Lexeme1 should also be flagged as disambiguated.
     */
    let infl1 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let infl3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    let lemmaA = new Lemma('word1', 'grc') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexeme = new Lexeme(
      lemmaA,
      [
        infl1, infl2, infl3
      ]
    )
    const homonymA = new Homonym([lexeme])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl4 = new Inflection('stem4', 'grc') // eslint-disable-line prefer-const
    infl4.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MIDDLE, Constants.LANG_GREEK))
    let lemmaB = new Lemma('word1', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(
      lemmaB,
      [
        infl4
      ]
    )
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.isDisambiguated()).toBeTruthy()
    expect(disambiguated.lexemes.length).toEqual(1)
    expect(disambiguated.lexemes[0].inflections).toEqual([infl1,infl2,infl3,infl4])
    expect(disambiguated.lexemes[0].disambiguated).toBeTruthy()
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl4)
  })

  it('7D Homonym disambiguation: case D', () => {
    /*
    HomonymA contains 1 Lexeme with 3 inflections.
    HomonymB contains 1 Lexeme with 1 inflection.
    HomonymA.Lexeme1 matches HomonymBLexeme1 on lemma.word and lemma.part of speech.
    HomonymB.Lexeme1.Inflection1 matches HomonymA.Lexeme1.Inflection1.
    HomonymA.Lexeme1.Inflection1 has a stem and suffix whereas HomonymB.Lexeme1.Inflection1 has a stem but no suffix.
    The resulting Homonym should contain 1 Lexeme with the superset of all attributes
    from HomonymA.Lexeme1 and HomonymB.Lexeme1 with the inflection from HomonymA.Lexeme1.Inflection1 selected
    (i.e. the inflection that includes stem+suffix).
    Lexeme1 should be flagged as disambiguated
     */
    let infl1 = new Inflection('stem1', 'grc', 'suffix1') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let infl3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    let lemmaA = new Lemma('word1', 'grc') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexeme = new Lexeme(
      lemmaA,
      [
        infl1, infl2, infl3
      ]
    )
    const homonymA = new Homonym([lexeme])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl4 = new Inflection('stem4', 'grc') // eslint-disable-line prefer-const
    infl4.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let lemmaB = new Lemma('word1', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(
      lemmaB,
      [
        infl4
      ]
    )
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(1)
    expect(disambiguated.lexemes[0].inflections).toEqual([infl1,infl2,infl3])
    expect(disambiguated.lexemes[0].disambiguated).toBeTruthy()
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl1)
    expect(disambiguated.isDisambiguated()).toBeTruthy()
  })

  it('7E Homonym disambiguation: case E', () => {
    /*
    HomonymA contains 2 Lexemes.
    HomonymA.Lexeme1 has 3 inflections.
    HomonymA.Lexeme2 has 2 inflections.
    HomonymB contains 1 Lexeme with 1 inflection.
    HomonymA.Lexeme1 matches HomonymBLexeme1 on lemma.word and lemma.part of speech.
    HomonymB.Lexeme1.Inflection1 matches HomonymA.Lexeme1.Inflection1.
    HomonymA.Lexeme1.Inflection1 has a stem and suffix whereas HomonymB.Lexeme1.Inflection1 has a stem but no suffix.
    The resulting Homonym should contain 2 Lexemes. Lexeme1 has the superset of all attributes from
    HomonymA.Lexeme1 and HomonymB.Lexeme1 with the inflection from HomonymA.Lexeme1.Inflection1 selected
    (i.e. the inflection that includes stem+suffix). Lexeme2 is the exactly the same as
    HomonymA.Lexeme2. Lexeme1 should be flagged as disambiguated
     */
    let infl1 = new Inflection('stem1', 'grc', 'suffix1') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let infl3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    let lemmaA1 = new Lemma('word', 'grc') // eslint-disable-line prefer-const
    lemmaA1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let infl4 = new Inflection('stem4', 'grc') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl5 = new Inflection('stem5', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let lemmaA2 = new Lemma('wordA2', 'grc') // eslint-disable-line prefer-const
    lemmaA2.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_GREEK))
    const lexemeA1 = new Lexeme(
      lemmaA1,
      [
        infl1, infl2, infl3
      ]
    )
    const lexemeA2 = new Lexeme(
      lemmaA2,
      [
        infl4, infl5
      ]
    )
    const homonymA = new Homonym([lexemeA1, lexemeA2])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl6 = new Inflection('stem6', 'grc') // eslint-disable-line prefer-const
    infl6.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let lemmaB = new Lemma('word', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(
      lemmaB,
      [
        infl6
      ]
    )
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(2)
    expect(disambiguated.lexemes[0].inflections).toEqual([infl1,infl2,infl3])
    expect(disambiguated.lexemes[0].disambiguated).toBeTruthy()
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl1)
    expect(disambiguated.isDisambiguated()).toBeTruthy()
    expect(disambiguated.lexemes[1]).toEqual(lexemeA2)
  })

  it('7F Homonym disambiguation: case F', () => {
    /*
    HomonymA contains 2 Lexemes. Homonym B contains 1 Lexeme.
    HomonymB.Lexeme1 does not match either of the HomonymA Lexemes on lemma.word and lemma.part of speech.
    The resulting Homonym should contain 3 Lexemes. Lexeme1 should be identical to HomonymB.Lexeme1
    except that it is disambiguated and its inflection should be selected. Lexemes 2 and 3 should be identical to
    HomonymA.Lexeme1 and HomonymA.Lexeme2.
     */
    let infl1 = new Inflection('stem1', 'grc', 'suffix1') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let infl3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    let lemmaA1 = new Lemma('wordA1', 'grc') // eslint-disable-line prefer-const
    lemmaA1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let infl4 = new Inflection('stem4', 'grc') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl5 = new Inflection('stem5', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let lemmaA2 = new Lemma('wordA2', 'grc') // eslint-disable-line prefer-const
    lemmaA2.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_GREEK))
    const lexemeA1 = new Lexeme(
      lemmaA1,
      [
        infl1, infl2, infl3
      ]
    )
    const lexemeA2 = new Lexeme(
      lemmaA2,
      [
        infl4, infl5
      ]
    )
    const homonymA = new Homonym([lexemeA1, lexemeA2])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl6 = new Inflection('stem6', 'grc') // eslint-disable-line prefer-const
    infl6.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let lemmaB = new Lemma('wordB', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(
      lemmaB,
      [
        infl6
      ]
    )
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(3)
    expect(disambiguated.lexemes).toEqual(expect.arrayContaining([
      lexemeA1,
      lexemeA2,
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaB.word }),
        inflections: [infl6],
        disambiguated: true
      })])
    )
    expect(disambiguated.isDisambiguated()).toBeTruthy()
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl6)
  })

  it('7G Homonym disambiguation: case G', () => {
    /*
    HomonymA contains 1 Lexeme with 3 inflections. HomonymB contains 1 Lexeme with 1 inflection.
    The only difference between HomonymA.Lexeme1.lemma and HomonymB.Lexeme1.lemma is that
    HomonymB.Lexeme1.lemma.word has an initial capital letter. HomonymB.Lexeme1.Inflection1
    matches HomonymA.Lexeme1.Inflection1.
    HomonymA.Lexeme1.Inflection1 has a stem and suffix whereas HomonymB.Lexeme1.Inflection1 has a stem but no suffix.
    The resulting Homonym should contain 1 Lexeme. The lemma.word should be the same as HomonymB.lemma
    (i.e. with initial upper case) and with the superset of all attributes from
    HomonymA.Lexeme1 and HomonymB.Lexeme1 and the inflection from HomonymA.Lexeme1.Inflection1 selected
    (i.e. the inflection that includes stem+suffix). Lexeme1 should be flagged as disambiguated.
     */
    let infl1 = new Inflection('stem', 'grc', 'suffix') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let infl3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    let lemmaA = new Lemma('χράομαι', 'grc') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeA = new Lexeme(
      lemmaA,
      [
        infl1, infl2, infl3
      ]
    )
    const homonymA = new Homonym([lexemeA])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl6 = new Inflection('stem', 'grc') // eslint-disable-line prefer-const
    infl6.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let lemmaB = new Lemma('Χράομαι', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(
      lemmaB,
      [
        infl6
      ]
    )
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(1)
    expect(disambiguated.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaB.word }),
        inflections: [infl1,infl2,infl3],
        disambiguated: true
      })
    )
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl1)
    expect(disambiguated.isDisambiguated()).toBeTruthy()
  })

  it('7H Homonym disambiguation: case H', () => {
    /*
    HomonymA contains 1 Lexeme with 3 inflections. HomonymB contains 1 Lexeme with 1 inflection.
    The only difference between HomonymA.Lexeme1.lemma and HomonymB.Lexeme1.lemma is that
    HomonymB.Lexeme1.lemma.word uses an alternate encoding for one of its characters
    (see the language model normalization method for supported alternate encodings).
    HomonymB.Lexeme1.Inflection1 matches HomonymA.Lexeme1.Inflection1.
    HomonymA.Lexeme1.Inflection1 has a stem and suffix whereas HomonymB.Lexeme1.Inflection1 does not.
    The resulting Homonym should contain 1 Lexeme. The lemma.word should be
    the NORMALIZED form of HomonymB.lemma and with the superset of all attributes from HomonymA.Lexeme1
    and HomonymB.Lexeme1 except the inflection from HomonymA.Lexeme1.Inflection1 is selected
    (i.e. the inflection that includes stem+suffix). Lexeme1 should be flagged as disambiguated.
     */
    let infl1 = new Inflection('stem', 'grc', 'suffix') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let infl3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    let lemmaA = new Lemma('δ\u1fbd', 'grc') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeA = new Lexeme(
      lemmaA,
      [
        infl1, infl2, infl3
      ]
    )
    const homonymA = new Homonym([lexemeA])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl6 = new Inflection('stem', 'grc') // eslint-disable-line prefer-const
    infl6.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let lemmaB = new Lemma('δ\u2019', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(
      lemmaB,
      [
        infl6
      ]
    )
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    const langModel = LMF.getLanguageModel(Constants.LANG_GREEK)
    expect(disambiguated.lexemes.length).toEqual(1)
    expect(disambiguated.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: langModel.normalizeText(lemmaB.word) }),
        inflections: [infl1, infl2, infl3],
        disambiguated: true
      })
    )
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl1)
    expect(disambiguated.isDisambiguated()).toBeTruthy()
  })

  it('7I Homonym disambiguation: case I', () => {
    /*
    HomonymA contains 1 Lexeme with 3 inflections. HomonymB contains 1 Lexeme with 1 inflection.
    The only difference between HomonymA.Lexeme1.lemma and HomonymB.Lexeme1.lemma is that
    HomonymA.Lexeme1.lemma.word has a trailing digit. HomonymB.Lexeme1.Inflection1 matches
    HomonymA.Lexeme1.Inflection1. HomonymA.Lexeme1.Inflection1 has a stem and suffix whereas
    HomonymB.Lexeme1.Inflection1 does not. The resulting Homonym should contain 1 Lexeme.
    The lemma.word should be the form of HomonymA.lemma (the one with the trailing digit)
    and with the superset of all attributes from HomonymA.Lexeme1 and HomonymB.Lexeme1
    except only inflection from HomonymA.Lexeme1.Inflection1 selected (i.e. the inflection
    that includes stem+suffix). Lexeme1 should be flagged as disambiguated.
     */
    let infl1 = new Inflection('stem', 'grc', 'suffix') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let infl3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    let lemmaA = new Lemma('αἴγυπτος1', 'grc') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeA = new Lexeme(
      lemmaA,
      [
        infl1, infl2, infl3
      ]
    )
    const homonymA = new Homonym([lexemeA])

    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl6 = new Inflection('stem', 'grc') // eslint-disable-line prefer-const
    infl6.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let lemmaB = new Lemma('αἴγυπτος', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(
      lemmaB,
      [
        infl6
      ]
    )
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(1)
    expect(disambiguated.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaA.word }),
        inflections: [infl1,infl2,infl3],
        disambiguated: true
      })
    )
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl1)
    expect(disambiguated.isDisambiguated()).toBeTruthy()
  })

  it('7J Homonym disambiguation: case J', () => {
    /*
    HomonymA contains 2 Lexemes. HomonymB contains 1 Lexeme.
    HomonymB.Lexeme1 matches either of the HomonymA Lexeme1 on lemma.word and lemma.part of speech.
    Neither HomonymA.Lexeme1 nor HomonymB.Lexeme1 contain any inflection data.
    Resulting homonym should contain 2 Lexemes: Lexeme1 should be identical to HomonymA.Lexeme1
    except that it should be flagged as disambiguated.
    Lexeme2 should be identical to HomonymA.Lexeme2.
     */
    let lemmaA = new Lemma('παρ᾽', 'grc') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_PREPOSITION, Constants.LANG_GREEK))
    const lexemeA = new Lexeme(lemmaA, [])
    let lemmaB = new Lemma('παρ᾽', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(lemmaB, [])
    const homonymA = new Homonym([lexemeA, lexemeB])

    let lemmaC = new Lemma('παρ᾽', 'grc') // eslint-disable-line prefer-const
    lemmaC.addFeature(new Feature(Feature.types.part, Constants.POFS_PREPOSITION, Constants.LANG_GREEK))
    const lexemeC = new Lexeme(lemmaC, [])
    const homonymB = new Homonym([lexemeC])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(2)
    expect(disambiguated.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaA.word }),
        inflections: [],
        disambiguated: true
      })
    )
    expect(disambiguated.lexemes[0].getSelectedInflection()).toBeNull()
    expect(disambiguated.lexemes[1]).toEqual(lexemeB)
    expect(disambiguated.isDisambiguated()).toBeTruthy()
  })

  it('7K Homonym disambiguation: case K', () => {
    /*
    Homonym A contains 2 Lexemes. HomonymB contains 1 Lexeme.
    HomonymB.Lexeme1 matches HomonymA Lexeme1 on lemma.word and lemma.part of speech.
    HomonymA.Lexeme1 has some inflections data. HomonymB.Lexeme1 contains no inflection data.
    Resulting homonym should contain 2 Lexemes: Lexeme1 should be identical to HomonymA.Lexeme1
    except that it should be flagged as disambiguated. (No selected inflection)
    Lexeme2 should be identical to HomonymA.Lexeme2.
     */
    let lemmaA = new Lemma('παρ᾽', 'grc') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_PREPOSITION, Constants.LANG_GREEK))
    let infl1 = new Inflection('stem', 'grc') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    const lexemeA = new Lexeme(lemmaA, [infl1])
    let lemmaB = new Lemma('παρ᾽', 'grc') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(lemmaB, [])
    const homonymA = new Homonym([lexemeA, lexemeB])

    let lemmaC = new Lemma('παρ᾽', 'grc') // eslint-disable-line prefer-const
    lemmaC.addFeature(new Feature(Feature.types.part, Constants.POFS_PREPOSITION, Constants.LANG_GREEK))
    const lexemeC = new Lexeme(lemmaC, [])
    const homonymB = new Homonym([lexemeC])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(2)
    expect(disambiguated.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaA.word }),
        inflections: [infl1],
        disambiguated: true
      })
    )
    expect(disambiguated.lexemes[0].getSelectedInflection()).toBeNull()
    expect(disambiguated.lexemes[1]).toEqual(lexemeB)
    expect(disambiguated.isDisambiguated()).toBeTruthy()
  })
  it('7L Homonym disambiguation: case L', () => {
    /*
    Homonym A contains 2 Lexemes. HomonymB contains 1 Lexeme.
    HomonymB.Lexeme1 matches both HomonymA Lexemes on lemma.word and lemma.part of speech.
    HomonymB Lexeme1 contains an inflection match on HomonymA Lexeme2 only.
    Resulting homonym should contain 2 Lexemes: Lexeme1 should HomonymA Lexeme2 disambiguated
    with HomonymB Lexeme1 and Lexeme2 should be disambiguated identical to HomonymA.Lexeme1.
     */
    let lemmaA = new Lemma('dico', 'lat') // eslint-disable-line prefer-const
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    let infl1 = new Inflection('dic','lat','as') // eslint-disable-line prefer-const
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    infl1.addFeature(new Feature(Feature.types.mood, Constants.MOOD_SUBJUNCTIVE, Constants.LANG_LATIN))
    const lexemeA = new Lexeme(lemmaA, [infl1])
    let lemmaB = new Lemma('dico', 'lat') // eslint-disable-line prefer-const
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    let infl2 = new Inflection('dic','lat','as') // eslint-disable-line prefer-const
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    infl2.addFeature(new Feature(Feature.types.mood, Constants.MOOD_INDICATIVE, Constants.LANG_LATIN))
    const lexemeB = new Lexeme(lemmaB, [infl2])
    const homonymA = new Homonym([lexemeA, lexemeB])

    let lemmaC = new Lemma('dico', 'lat') // eslint-disable-line prefer-const
    lemmaC.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    let infl3 = new Inflection('dic','lat','as') // eslint-disable-line prefer-const
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    infl3.addFeature(new Feature(Feature.types.mood, Constants.MOOD_INDICATIVE, Constants.LANG_LATIN))
    const lexemeC = new Lexeme(lemmaC, [infl3])
    const homonymB = new Homonym([lexemeC])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])

    expect(disambiguated.lexemes.length).toEqual(2)
    expect(disambiguated.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaA.word }),
        inflections: [infl2],
        disambiguated: true
      })
    )
    expect(disambiguated.lexemes[0].getSelectedInflection()).toEqual(infl2)
    expect(disambiguated.lexemes[1]).toEqual(lexemeA)
    expect(disambiguated.lexemes[1].disambiguated).toBeFalsy()
    expect(disambiguated.isDisambiguated()).toBeTruthy()
  })
  it('7M - Homonym Disambiguation: case M', () => {
    /*
    Homonym A contains 1 Lexeme. Homonym B contains 1 Lexeme.
    Homonym B.Lexeme1 has an equivalent but not identical POFS as Homonym A.Lexeme1
    Resulting homonym should contain 1 Lexeme: Homonym A Lexeme1
     */
    const lemmaA = new Lemma('ἄρ', 'grc')
    lemmaA.addFeature(new Feature(Feature.types.part, Constants.POFS_PARTICLE, Constants.LANG_GREEK))
    const lexemeA = new Lexeme(lemmaA, [])
    const homonymA = new Homonym([lexemeA])
    const lemmaB = new Lemma('ἄρ', 'grc')
    lemmaB.addFeature(new Feature(Feature.types.part, Constants.POFS_ADVERB, Constants.LANG_GREEK))
    const lexemeB = new Lexeme(lemmaB, [])
    const homonymB = new Homonym([lexemeB])
    const disambiguated = Homonym.disambiguate(homonymA, [homonymB])
    expect(lexemeA.isFullHomonym(lexemeB)).toBeTruthy()
    expect(disambiguated.lexemes.length).toEqual(1)
    expect(disambiguated.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaA.word }),
        disambiguated: true
      })
    )
    expect(disambiguated.lexemes[0].lemma.features[Feature.types.part]).toEqual(lexemeA.lemma.features[Feature.types.part])

    const lemmaC = new Lemma('fugiendo', 'lat')
    lemmaC.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    const inflC = new Inflection('fugiendo','lat')
    inflC.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB_PARTICIPLE, Constants.LANG_LATIN))
    inflC.addFeature(new Feature(Feature.types.case, Constants.CASE_ABLATIVE, Constants.LANG_LATIN))
    const lexemeC = new Lexeme(lemmaC, [inflC])
    const homonymC = new Homonym([lexemeC])
    const lemmaD = new Lemma('fugiendo', 'lat')
    lemmaD.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    const inflD = new Inflection('fugiendo','lat')
    inflD.addFeature(new Feature(Feature.types.case, Constants.CASE_ABLATIVE, Constants.LANG_LATIN))
    inflD.addFeature(new Feature(Feature.types.mood, Constants.MOOD_GERUNDIVE, Constants.LANG_LATIN))
    const lexemeD = new Lexeme(lemmaD, [inflD])
    const homonymD = new Homonym([lexemeD])
    const disambiguated2 = Homonym.disambiguate(homonymC, [homonymD])
    expect(disambiguated2.lexemes[0]).toEqual(
      expect.objectContaining({
        lemma: expect.objectContaining({ word: lemmaC.word }),
        disambiguated: true
      })
    )
    expect(disambiguated2.lexemes[0].lemma.features[Feature.types.part]).toEqual(lexemeC.lemma.features[Feature.types.part])
    expect(disambiguated2.lexemes[0].inflections.length).toEqual(2)
    expect(disambiguated2.lexemes[0].getSelectedInflection()).toEqual(inflD)
  })
})
