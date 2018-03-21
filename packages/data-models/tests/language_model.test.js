/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LanguageModelFactory from '../src/language_model_factory.js'
import Inflection from '../src/inflection.js'
import Feature from '../src/feature.js'

describe('Language Model object', () => {
  test('groupForDisplay', () => {
    // A fake test to match a requirement of test suite containing only one test
    let something = true
    expect(something).toBeTruthy()
  })

  test('groupForDisplay', () => {
    let basemodel = LanguageModelFactory.getLanguageModel(Constants.LANG_LATIN)
    let one = new Inflection('nat', Constants.LANG_LATIN, 'urae', null, null)
    let two = new Inflection('nat', Constants.LANG_LATIN, 'urae', null, null)
    let three = new Inflection('nat', Constants.LANG_LATIN, 'urae', null, null)
    let four = new Inflection('natur', Constants.LANG_LATIN, 'ae', null, null)
    let five = new Inflection('natur', Constants.LANG_LATIN, 'ae', null, null)
    let six = new Inflection('natur', Constants.LANG_LATIN, 'ae', null, null)

    one.addFeature(new Feature(Feature.types.part, [['verb', 3]], Constants.LANG_LATIN))
    one.addFeature(new Feature(Feature.types.tense, 'present', Constants.LANG_LATIN))
    one.addFeature(new Feature(Feature.types.gender, 'feminine', Constants.LANG_LATIN))
    one.addFeature(new Feature(Feature.types.voice, 'active', Constants.LANG_LATIN))
    one.addFeature(new Feature(Feature.types.mood, 'indicative', Constants.LANG_LATIN))

    two.addFeature(new Feature(Feature.types.part, [['verb', 3]], Constants.LANG_LATIN))
    two.addFeature(new Feature(Feature.types.tense, 'present', Constants.LANG_LATIN))
    two.addFeature(new Feature(Feature.types.gender, 'feminine', Constants.LANG_LATIN))
    two.addFeature(new Feature(Feature.types.voice, 'passive', Constants.LANG_LATIN))
    two.addFeature(new Feature(Feature.types.mood, 'indicative', Constants.LANG_LATIN))

    three.addFeature(new Feature(Feature.types.part, [['verb', 3]], Constants.LANG_LATIN))
    three.addFeature(new Feature(Feature.types.tense, 'future', Constants.LANG_LATIN))
    three.addFeature(new Feature(Feature.types.gender, 'masculine', Constants.LANG_LATIN))
    three.addFeature(new Feature(Feature.types.mood, 'subjunctive', Constants.LANG_LATIN))

    four.addFeature(new Feature(Feature.types.part, [['noun', 5]], Constants.LANG_LATIN))
    four.addFeature(new Feature(Feature.types.grmCase, [['nominative', 5]], Constants.LANG_LATIN))
    four.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_LATIN))
    five.addFeature(new Feature(Feature.types.part, [['noun', 5]], Constants.LANG_LATIN))
    five.addFeature(new Feature(Feature.types.grmCase, [['accusative', 5]], Constants.LANG_LATIN))
    five.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_LATIN))
    six.addFeature(new Feature(Feature.types.part, [['noun', 5]], Constants.LANG_LATIN))
    six.addFeature(new Feature(Feature.types.grmCase, [['accusative', 5]], Constants.LANG_LATIN))
    six.addFeature(new Feature(Feature.types.number, 'plural', Constants.LANG_LATIN))
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
