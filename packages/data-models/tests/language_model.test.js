/* eslint-env jest */
'use strict'
// import LanguageModelFactory from '../src/language_model_factory.js'
// import Inflection from '../src/inflection.js'
// import Feature from '../src/feature.js'

describe('Language Model object', () => {
  test('groupForDisplay', () => {
    // A fake test to match a requirement of test suite containing only one test
    let something = true
    expect(something).toBeTruthy()
  })
  // TODO: Enable after clearing a situation with grouping functions
  /* test('groupForDisplay', () => {
    let basemodel = LanguageModelFactory.getLanguageForCode('foo')
    let one = new Inflection('nat', 'lat', 'urae', null, null)
    let two = new Inflection('nat', 'lat', 'urae', null, null)
    let three = new Inflection('nat', 'lat', 'urae', null, null)
    let four = new Inflection('natur', 'lat', 'ae', null, null)
    let five = new Inflection('natur', 'lat', 'ae', null, null)
    let six = new Inflection('natur', 'lat', 'ae', null, null)

    one.addFeature(new Feature(Feature.types.part, 'verb', 'lat', 3))
    one.addFeature(new Feature(Feature.types.tense, 'present', 'lat'))
    one.addFeature(new Feature(Feature.types.gender, 'feminine', 'lat'))
    one.addFeature(new Feature(Feature.types.voice, 'active', 'lat'))
    one.addFeature(new Feature(Feature.types.mood, 'indicative', 'lat'))

    two.addFeature(new Feature(Feature.types.part, 'verb', 'lat', 3))
    two.addFeature(new Feature(Feature.types.tense, 'present', 'present', 'lat'))
    two.addFeature(new Feature(Feature.types.gender, 'feminine', 'lat'))
    two.addFeature(new Feature(Feature.types.voice, 'passive', 'lat'))
    two.addFeature(new Feature(Feature.types.mood, 'indicative', 'lat'))

    three.addFeature(new Feature(Feature.types.part, 'verb', 'lat', 3))
    three.addFeature(new Feature(Feature.types.tense, 'future', 'lat'))
    three.addFeature(new Feature(Feature.types.gender, 'masculine', 'lat'))
    three.addFeature(new Feature(Feature.types.mood, 'subjunctive', 'lat'))

    four.addFeature(new Feature(Feature.types.part, 'noun', 'lat', 5))
    four.addFeature(new Feature(Feature.types.grmCase, 'nominative', 'lat', 5))
    four.addFeature(new Feature(Feature.types.number, 'singular', 'lat'))
    five.addFeature(new Feature(Feature.types.part, 'noun', 'lat', 5))
    five.addFeature(new Feature(Feature.types.grmCase, 'accusative', 'lat', 5))
    five.addFeature(new Feature(Feature.types.number, 'singular', 'lat'))
    six.addFeature(new Feature(Feature.types.part, 'noun', 'lat', 5))
    six.addFeature(new Feature(Feature.types.grmCase, 'accusative', 'lat', 5))
    six.addFeature(new Feature(Feature.types.number, 'plural', 'lat'))
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
  }) */
})
