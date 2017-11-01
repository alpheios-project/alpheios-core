"use strict";
import Feature from '../src/feature.js';
import LanguageModelFactory from '../src/language_model_factory.js';

describe('Feature object', () => {

    let featureGreek1, featureGreek2, featureGreek3, featureLatin1, featureValue1, featureValue2;
    let languageGreek, languageLatin;

    beforeAll(() => {
        // Create a test environment
        featureValue1 = 'featureValueOne';
        featureValue2 = 'featureValueTwo';
        languageGreek = LanguageModelFactory.getLanguageForCode('grc');
        languageLatin = LanguageModelFactory.getLanguageForCode('lat');
        featureGreek1 = new Feature(featureValue1, Feature.types.number, languageGreek);
        featureGreek2 = new Feature(featureValue2, Feature.types.number, languageGreek);
        featureGreek3 = new Feature(featureValue1, Feature.types.declension, languageGreek);
        featureLatin1 = new Feature(featureValue1, Feature.types.number, languageLatin);
    });

    test('Should be initialized properly', () => {

        expect(featureGreek1).toEqual({
            value: featureValue1,
            type: Feature.types.number,
            language: languageGreek
        });
    });

    test('Constructor should throw an exception if no arguments are provided', () => {

        expect(() => {
            new Feature();
        }).toThrow();

    });

    test('Constructor should throw an exception if less than 3 arguments are provided', () => {

        expect(() => {
            new Feature(featureValue1, Feature.types.number);
        }).toThrowError(/requires a language/);

    });

    test('Constructor should throw an exception if any incorrect values of arguments are provided', () => {

        expect(() => {
            new Feature(featureValue1, 'incorrect value', languageGreek);
        }).toThrowError(/not supported/);

    });

    test('Constructor should throw an exception if correct argument values are provided in incorrect order', () => {

        expect(() => {
            new Feature(featureValue1, languageGreek, Feature.types.number);
        }).toThrowError(/not supported/);

    });

    afterAll(() => {
        // Clean a test environment up
        featureGreek1 = undefined;
        featureGreek2 = undefined;
        featureGreek3 = undefined;
        featureLatin1 = undefined;
    });
});
