/* eslint-env jest */
'use strict'
import LanguageModelFactory from '../src/language_model_factory.js'
import Inflection from '../src/inflection.js'
import Feature from '../src/grm-feature.js'

describe('Language Model object', () => {
  test('groupForDisplay', () => {
    let basemodel = LanguageModelFactory.getLanguageForCode('foo')
    let one = new Inflection('nat', 'lat', 'urae', null, null)
    let two = new Inflection('nat', 'lat', 'urae', null, null)
    let three = new Inflection('nat', 'lat', 'urae', null, null)
    let four = new Inflection('natur', 'lat', 'ae', null, null)
    let five = new Inflection('natur', 'lat', 'ae', null, null)
    let six = new Inflection('natur', 'lat', 'ae', null, null)

    one.feature = new Feature('verb', Feature.types.part, 'lat', 3)
    one.feature = new Feature('present', Feature.types.tense, 'lat')
    one.feature = new Feature('feminine', Feature.types.gender, 'lat')
    one.feature = new Feature('active', Feature.types.voice, 'lat')
    one.feature = new Feature('indicative', Feature.types.mood, 'lat')

    two.feature = new Feature('verb', Feature.types.part, 'lat', 3)
    two.feature = new Feature('present', Feature.types.tense, 'lat')
    two.feature = new Feature('feminine', Feature.types.gender, 'lat')
    two.feature = new Feature('passive', Feature.types.voice, 'lat')
    two.feature = new Feature('indicative', Feature.types.mood, 'lat')

    three.feature = new Feature('verb', Feature.types.part, 'lat', 3)
    three.feature = new Feature('future', Feature.types.tense, 'lat')
    three.feature = new Feature('masculine', Feature.types.gender, 'lat')
    three.feature = new Feature('subjunctive', Feature.types.mood, 'lat')

    four.feature = new Feature('noun', Feature.types.part, 'lat', 5)
    four.feature = new Feature('nominative', Feature.types.grmCase, 'lat', 5)
    four.feature = new Feature('singular', Feature.types.number, 'lat')
    five.feature = new Feature('noun', Feature.types.part, 'lat', 5)
    five.feature = new Feature('accusative', Feature.types.grmCase, 'lat', 5)
    five.feature = new Feature('singular', Feature.types.number, 'lat')
    six.feature = new Feature('noun', Feature.types.part, 'lat', 5)
    six.feature = new Feature('accusative', Feature.types.grmCase, 'lat', 5)
    six.feature = new Feature('plural', Feature.types.number, 'lat')
    let inflections = [one, two, three, four, five, six]
    let grouped = basemodel.groupInflectionsForDisplay(inflections)
    expect(grouped.length).toEqual(2)
    let verbs = grouped.filter((x) => x.groupingKey.hasFeatureValue(Feature.types.part, 'verb'))
    let nouns = grouped.filter((x) => x.groupingKey.hasFeatureValue(Feature.types.part, 'noun'))
    expect(verbs.length).toEqual(1)
    expect(nouns.length).toEqual(1)
    expect(verbs[0].inflections.length).toEqual(2) // present and future groups
    expect(nouns[0].inflections.length).toEqual(2) // singular and plural groups
    let future = verbs[0].inflections.filter((x) => x.groupingKey.hasFeatureValue(Feature.types.tense, 'future'))
    let present = verbs[0].inflections.filter((x) => x.groupingKey.hasFeatureValue(Feature.types.tense, 'present'))
    expect(future[0].inflections.length).toEqual(1)
    expect(present[0].inflections.length).toEqual(2)
    let active = present[0].inflections.filter((x) => x.groupingKey.hasFeatureValue(Feature.types.voice, 'active'))
    let passive = present[0].inflections.filter((x) => x.groupingKey.hasFeatureValue(Feature.types.voice, 'passive'))
    expect(passive.length).toEqual(1)
    expect(active.length).toEqual(1)
    expect(active[0].groupingKey).toBeTruthy()
    expect(active[0].inflections.length).toEqual(1)
    expect(active[0].inflections[0].groupingKey.hasFeatureValue(Feature.types.gender, 'feminine')).toBeTruthy()
    expect(active[0].inflections[0].inflections.length).toEqual(1)
    expect(active[0].inflections[0].inflections[0]).toEqual(one)
  })
})
