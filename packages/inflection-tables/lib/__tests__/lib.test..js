const t = require('../../tests/test-bundle');

describe('Feature object', () => {

    let featureGreek1, featureGreek2, featureGreek3, featureLatin1, featureValue1, featureValue2;

    beforeAll(() => {
        // Create a test environment
        featureValue1 = 'featureValueOne';
        featureValue2 = 'featureValueTwo';
        featureGreek1 = new t.Feature(featureValue1, t.types.number, t.languages.greek);
        featureGreek2 = new t.Feature(featureValue2, t.types.number, t.languages.greek);
        featureGreek3 = new t.Feature(featureValue1, t.types.declension, t.languages.greek);
        featureLatin1 = new t.Feature(featureValue1, t.types.number, t.languages.latin);
    });

    test('Should be initialized properly', () => {

        expect(featureGreek1).toEqual({
            value: featureValue1,
            type: t.types.number,
            language: t.languages.greek
        });
    });

    test('Constructor should throw an exception if no arguments are provided', () => {

        expect(() => {
            new t.Feature();
        }).toThrow();

    });

    test('Constructor should throw an exception if less than 3 arguments are provided', () => {

        expect(() => {
            new t.Feature(featureValue1, t.types.number);
        }).toThrowError(/not supported/);

    });

    test('Constructor should throw an exception if any incorrect values of arguments are provided', () => {

        expect(() => {
            new t.Feature(featureValue1, 'incorrect value', t.languages.greek);
        }).toThrowError(/not supported/);

    });

    test('Constructor should throw an exception if correct argument values are provided in incorrect order', () => {

        expect(() => {
            new t.Feature(featureValue1, t.languages.greek, t.types.number);
        }).toThrowError(/not supported/);

    });

    afterAll(() => {
        // Clean a test environment up
        featureGreek1 = undefined;
    });
});

describe('FeatureType', () => {

    let featureType;

    beforeAll(() => {
        // Create a test environment
        featureType = new t.FeatureType(t.types.declension, ['first', ['second', 'third'], 'fourth'], t.languages.latin);
    });

    test('Should be initialized properly', () => {

        expect(featureType).toEqual({
            "_orderIndex": ["first", ["second", "third"], "fourth"],
            "_orderLookup": {"first": 0, "second": 1, "third": 1, "fourth": 2},
            "first": {"language": "latin", "type": "declension", "value": "first"},
            "second": {"language": "latin", "type": "declension", "value": "second"},
            "third": {"language": "latin", "type": "declension", "value": "third"},
            "fourth": {"language": "latin", "type": "declension", "value": "fourth"},
            "language": t.languages.latin,
            "type": t.types.declension
        });
    });

    test('Constructor should throw an exception if no arguments are provided', () => {

        expect(() => {
            new new t.FeatureType();
        }).toThrow();

    });

    test('Constructor should throw an exception if arguments are provided in wrong order', () => {

        expect(() => {
            new new t.FeatureType(t.types.declension, t.languages.latin, ['first', 'second', 'third']);
        }).toThrowError(/not supported/);

    });

    test('Get method should return a new Feature object that is initialized properly', () => {

        let value = 'some value';
        expect(featureType.get(value)).toEqual({
            "language": t.languages.latin,
            "type": t.types.declension,
            "value": value
        });

    });

    test('Get method with no value should throw an exception', () => {

        expect(() => featureType.get()).toThrowError(/non-empty/);

    });

    test('addImporter method should return a new Importer object', () => {

        expect(featureType.addImporter('some value')).toBeInstanceOf(t.Importer);

    });

    test('addImporter method should return a new properly initialized Importer object', () => {

        let importerName = 'some value';
        expect(featureType.addImporter(importerName)).toEqual({
            "hash": {}
        });

    });

    test('addImporter method should create an Importer object inside a FeatureType object', () => {

        featureType.addImporter('some value');
        expect(featureType).toEqual(expect.objectContaining({
            "importer": {
                'some value': { hash: {} }
            }
        }));

    });

    test('addImporter method with no value should throw an exception', () => {

        expect(() => featureType.addImporter()).toThrowError(/non-empty/);

    });

    test('orderedValues() method should return a new properly initialized Importer object', () => {

        expect(featureType.orderedValues).toEqual(["first", ["second", "third"], "fourth"]);

    });

    test('orderedFeatures() should return type features in an indexed order.', () => {

        expect(featureType.orderedFeatures).toEqual([
            {"language": "latin", "type": "declension", "value": "first"},
            {"language": "latin", "type": "declension", "value": ["second", "third"]},
            {"language": "latin", "type": "declension", "value": "fourth"}
        ]);

    });

    test('orderedValues() should return type features in an indexed order.', () => {

        expect(featureType.orderedValues).toEqual(["first", ["second", "third"], "fourth"]);

    });

    test('orderLookup method should return a new properly initialized Importer object', () => {

        expect(featureType.orderLookup).toEqual({"first": 0, "second": 1, "third": 1, "fourth": 2});

    });

    test('order setter should change an order of items properly', () => {

        let f1 = new t.Feature("first", t.types.declension, t.languages.latin);
        let f2 = new t.Feature("second", t.types.declension, t.languages.latin);
        let f3 = new t.Feature("third", t.types.declension, t.languages.latin);
        let f4 = new t.Feature("fourth", t.types.declension, t.languages.latin);
        featureType.order = [[f4, f2], f3, f1];
        expect(featureType).toEqual(expect.objectContaining({
            "_orderIndex": [["fourth", "second"], "third", "first"],
            "_orderLookup": {"first": 2, "fourth": 0, "second": 0, "third": 1}
        }));

    });

    test('order setter with no argument should throw an exception', () => {

        expect(() => featureType.order = undefined).toThrowError(/non-empty/);

    });

    test('order setter with an empty array argument should throw an exception', () => {

        expect(() => featureType.order = []).toThrowError(/non-empty/);

    });

    test('order setter with an argument(s) of mismatching type should throw an exception', () => {

        let f1 = new t.Feature("first", t.types.gender, t.languages.latin);
        expect(() => featureType.order = [f1]).toThrowError(/is different/);

    });

    test('order setter with an argument(s) of mismatching language should throw an exception', () => {

        let f1 = new t.Feature("first", t.types.declension, t.languages.greek);
        expect(() => featureType.order = [f1]).toThrowError(/is different/);

    });

    test('order setter with an argument(s) of values that are not stored should throw an exception', () => {

        let f1 = new t.Feature("fifth", t.types.declension, t.languages.latin);
        expect(() => featureType.order = [f1]).toThrowError(/not stored/);

    });

    afterAll(() => {
        // Clean a test environment up
        featureType = undefined;
    });
});

describe('Importer object', () => {

    let importer;

    beforeAll(() => {
        // Create a test environment
        importer = new t.Importer();
    });

    test('Should be initialized properly', () => {

        expect(importer).toEqual({
            hash: {}
        });

    });

    test('map method should create proper mapping', () => {

        importer.map('value1', 'valueOne').map('value2', 'valueTwo');
        expect(importer).toEqual({"hash": {"value1": "valueOne", "value2": "valueTwo"}});

    });

    test('map method should overwrite old values', () => {

        importer.map('value1', 'valueOne').map('value2', 'valueTwo');
        importer.map('value1', 'newValueOne');
        expect(importer).toEqual({"hash": {"value1": "newValueOne", "value2": "valueTwo"}});

    });

    test('map method should not allow empty arguments', () => {

        expect(() => importer.map('value')).toThrowError(/empty/);

    });

    test('has method should check if value is in a map properly', () => {

        importer.map('value1', 'valueOne').map('value2', 'valueTwo');
        expect(importer.has('value2')).toBeTruthy();

    });

    test('get method should return a proper library object', () => {

        let key = 'value2', value = 'valueTwo';
        importer.map('value1', 'valueOne').map(key, value);
        expect(importer.get(key)).toEqual(value);

    });

    test('get method should throw an error if mapping is not found', () => {

        expect(() => importer.get('incorrect value')).toThrowError(/not found/);

    });

    afterAll(() => {
        // Clean a test environment up
        importer = undefined;
    });
});

describe('Inflection object', () => {

    let inflection;

    beforeAll(() => {
        // Create a test environment
        inflection = new t.Inflection('stem', t.languages.greek);
    });

    test('Should be initialized properly', () => {

        expect(inflection).toEqual({
            stem: 'stem',
            suffix: null,
            language: t.languages.greek
        });

    });

    test('Should not allow empty arguments', () => {

        expect(() => new t.Inflection('stem', '')).toThrowError(/empty/);

    });

    test('Should not allow unsupported languages', () => {

        expect(() => new t.Inflection('stem', 'egyptian')).toThrowError(/not supported/);

    });

    test('feature method should add a single feature to the inflection', () => {

        inflection.feature = new t.Feature('masculine', t.types.gender, t.languages.greek);
        expect(inflection).toEqual(expect.objectContaining({
            gender: ["masculine"]
        }));

    });

    test('feature method should add multiple feature values to the inflection', () => {

        inflection.feature = [
            new t.Feature('masculine', t.types.gender, t.languages.greek),
            new t.Feature('feminine', t.types.gender, t.languages.greek)
        ];
        expect(inflection).toEqual(expect.objectContaining({
            gender: ["masculine", "feminine"]
        }));

    });

    test('feature method should throw an error if no arguments are provided', () => {

        expect(() => inflection.feature = '').toThrowError(/empty/);

    });

    test('feature method should throw an error if argument(s) are of the wrong type', () => {

        expect(() => inflection.feature = 'some value').toThrowError(/Feature/);

    });

    test('feature method should not allow a feature language to be different from a language of an inflection', () => {

        expect(() => inflection.feature = new t.Feature('masculine', t.types.gender, t.languages.latin))
            .toThrowError(/not match/);

    });


    afterAll(() => {
        // Clean a test environment up
        inflection = undefined;
    });
});

describe('Lemma object', () => {

    let lemma, word;

    beforeAll(() => {
        // Create a test environment

        word = 'someword';
        lemma = new t.Lemma(word, t.languages.latin);
    });

    test('Should be initialized properly', () => {

        expect(lemma).toEqual({
            word: word,
            language: t.languages.latin
        });

    });

    test('Should not allow empty arguments', () => {

        expect(() => new t.Lemma()).toThrowError(/empty/);

    });

    test('Should not allow unsupported languages', () => {

        expect(() => new t.Lemma('someword', 'egyptian')).toThrowError(/not supported/);

    });

    afterAll(() => {
        // Clean a test environment up
        lemma = undefined;
    });
});

describe('Lemma object', () => {

    let lemma, word;

    beforeAll(() => {
        // Create a test environment

        word = 'someword';
        lemma = new t.Lemma(word, t.languages.latin);
    });

    test('Should be initialized properly', () => {

        expect(lemma).toEqual({
            word: word,
            language: t.languages.latin
        });

    });

    test('Should not allow empty arguments', () => {

        expect(() => new t.Lemma()).toThrowError(/empty/);

    });

    test('Should not allow unsupported languages', () => {

        expect(() => new t.Lemma('someword', 'egyptian')).toThrowError(/not supported/);

    });

    afterAll(() => {
        // Clean a test environment up
        lemma = undefined;
    });
});

describe('Lexeme object', () => {

    let lexeme;

    beforeAll(() => {
        // Create a test environment

        lexeme = new t.Lexeme(
            new t.Lemma('word', t.languages.greek),
            [
                new t.Inflection('stem1', t.languages.greek),
                new t.Inflection('stem2', t.languages.greek),
            ]
        );
    });

    test('Should be initialized properly', () => {

        expect(lexeme).toEqual({
            lemma: {
                word: 'word',
                language: t.languages.greek
            },
            inflections: [
                {stem: 'stem1', suffix: null, language: t.languages.greek},
                {stem: 'stem2', suffix: null, language: t.languages.greek}
            ]

        });

    });

    test('Should not allow empty arguments', () => {

        expect(() => new t.Lexeme()).toThrowError(/empty/);

    });

    test('Should not allow arguments of incorrect type', () => {

        expect(() => new t.Lexeme(new t.Lemma('someword', t.languages.greek), 'some value')).toThrowError(/array/);

    });

    test('Should not allow arguments of incorrect type even within an array', () => {

        expect(() => new t.Lexeme(new t.Lemma('someword', t.languages.greek), ['some value'])).toThrowError(/Inflection/);

    });

    afterAll(() => {
        // Clean a test environment up
        lexeme = undefined;
    });
});

describe('Homonym', () => {

    let homonym;

    beforeAll(() => {
        // Create a test environment

        homonym = new t.Homonym([
            new t.Lexeme(
                new t.Lemma('word1', t.languages.greek),
                [
                    new t.Inflection('stem1', t.languages.greek),
                    new t.Inflection('stem2', t.languages.greek),
                ]
            ),
            new t.Lexeme(
                new t.Lemma('word2', t.languages.greek),
                [
                    new t.Inflection('stem3', t.languages.greek),
                    new t.Inflection('stem4', t.languages.greek),
                ]
            )
        ]);
    });

    test('Constructor should initialize an properly.', () => {

        expect(homonym).toEqual({
            lexemes:
            [
                {
                    lemma: {
                        word: 'word1',
                        language: t.languages.greek
                    },
                    inflections: [
                        {stem: 'stem1', suffix: null, language: t.languages.greek},
                        {stem: 'stem2', suffix: null, language: t.languages.greek}
                    ]
                },
                {
                    lemma: {
                        word: 'word2',
                        language: t.languages.greek
                    },
                    inflections: [
                        {stem: 'stem3', suffix: null, language: t.languages.greek},
                        {stem: 'stem4', suffix: null, language: t.languages.greek}
                    ]
                }
            ]
        });

    });

    test('Constructor should not allow empty arguments.', () => {

        expect(() => new t.Homonym()).toThrowError(/empty/);

    });

    test('Constructor should not allow an argument this is not an array.', () => {

        expect(() => new t.Homonym('some value')).toThrowError(/array/);

    });

    test('Cosntructor should not allow arguments of incorrect type.', () => {

        expect(() => new t.Homonym(['some value'])).toThrowError(/Lexeme/);

    });

    test('language() should return a language of a homonym.', () => {

        expect(homonym.language).toBe(t.languages.greek);

    });

    afterAll(() => {
        // Clean a test environment up
        homonym = undefined;
    });
});

describe('LanguageDataset object', () => {

    let languageDataset;

    beforeAll(() => {
        // Create a test environment

        languageDataset = new t.LanguageDataset(t.languages.latin);
    });

    test('Should be initialized properly', () => {

        expect(languageDataset).toEqual({
            language: t.languages.latin,
            suffixes: [],
            features: {},
            footnotes: []
        });

    });

    test('Should require language to be provided', () => {

        expect(() => new t.LanguageDataset()).toThrowError(/empty/);

    });

    test('Should not allow initialization with unsupported languages', () => {

        expect(() => new t.LanguageDataset('egyptian')).toThrowError(/not supported/);

    });

    test('defineFeatureType method should add feature type data properly', () => {

        languageDataset.defineFeatureType(t.types.declension, ['first', ['second', 'third'], 'fourth']);
        expect(languageDataset.features.declension).toEqual(expect.objectContaining({
            _orderIndex: ["first", ["second", "third"], "fourth"],
            _orderLookup: {first: 0, second: 1, third: 1, fourth: 2},
            first: {language: t.languages.latin, type: "declension", value: "first"},
            second: {language: t.languages.latin, type: "declension", value: "second"},
            third: {language: t.languages.latin, type: "declension", value: "third"},
            fourth: {language: t.languages.latin, type: "declension", value: "fourth"}
        }));

    });

    // TODO: Add tests for addSuffix for later as the logic might change

    test('addFootnote should add proper data into a footnotes object', () => {

        let partOfSpeech = new t.Feature('noun', t.types.part, t.languages.latin);
        languageDataset.addFootnote(partOfSpeech, 5, 'Footnote text');
        expect(languageDataset.footnotes).toEqual(
            expect.arrayContaining([{index: 5, text: 'Footnote text', "part of speech": "noun"}]));

    });

    test('addFootnote should not allow empty values', () => {

        expect(() => languageDataset.addFootnote(5)).toThrowError(/empty/);

    });

    // TODO: Add tests for getSuffixes later as the logic might change

    afterAll(() => {
        // Clean a test environment up
        languageDataset = undefined;
    });
});


describe('LanguageData', () => {

    let languageData, latinDataset, greekDataset;

    beforeAll(() => {
        latinDataset = new t.LanguageDataset(t.languages.latin);
        greekDataset = new t.LanguageDataset(t.languages.greek);

        languageData = new t.LanguageData([latinDataset, greekDataset]);
    });

    test('constructor should initialize object properly.', () => {

        expect(languageData).toEqual(expect.objectContaining({
            greek: greekDataset,
            latin: latinDataset,
            supportedLanguages: [t.languages.latin, t.languages.greek]
        }));

    });

    test('loadData() should call a matching method of all language data sets.', () => {

        const loadData = jest.fn();
        latinDataset.loadData = loadData;
        greekDataset.loadData = loadData;
        languageData.loadData();

        expect(loadData.mock.calls.length).toBe(2);

    });

    test('getSuffixes() should call a getSuffixes() method of a proper language dataset with correct argument(s).', () => {
        let homonym = new t.Homonym([
            new t.Lexeme(
                new t.Lemma('word1', t.languages.greek),
                [
                    new t.Inflection('stem1', t.languages.greek),
                    new t.Inflection('stem2', t.languages.greek),
                ]
            )
        ]);
        const getSuffixes = jest.fn();
        greekDataset.getSuffixes = getSuffixes;
        languageData.getSuffixes(homonym);

        expect(getSuffixes.mock.calls.length).toBe(1);
        expect(getSuffixes.mock.calls[0][0]).toBe(homonym);

    });
});


describe('Suffix object', () => {
    "use strict";

    let suffix;

    beforeAll(() => {
        // Create a test environment

        suffix = new t.Suffix('suffixtext');
    });

    test('Should be initialized properly', () => {

        expect(suffix).toEqual({
            value: 'suffixtext',
            features: {},
            featureGroups: {},
            extendedLangData: {},
            match: undefined
        });

    });

    test('Should not allow an empty argument', () => {

        expect(() => new t.Suffix()).toThrowError(/empty/);

    });

    test('clone method should return a copy of a Suffix object', () => {

        let clone = suffix.clone();
        expect(clone).toEqual(suffix);

    });

    // TODO: implement tests for featureMatch as functionality may change
    // TODO: implement tests for getCommonGroups as functionality may change
    // TODO: implement tests for isInSameGroupWith as functionality may change
    // TODO: implement tests for split as functionality may change
    // TODO: implement tests for combine as functionality may change

    test('merge() should join two previously split object (objects that are in the same group) together.', () => {

        let values = ['masculine', 'feminine'];
        let suffixes = [new t.Suffix('endingOne', undefined), new t.Suffix('endingOne', undefined)];
        suffixes[0].features[t.types.gender] = values[0];
        suffixes[1].features[t.types.gender] = values[1];
        suffixes[0].featureGroups[t.types.gender] = values;
        suffixes[1].featureGroups[t.types.gender] = values;
        let merged = t.Suffix.merge(suffixes[0], suffixes[1]);
        expect(merged.features[t.types.gender]).toBe(values[0] + ', ' + values[1]);

    });

    afterAll(() => {
        // Clean a test environment up
        suffix = undefined;
    });
});

// TODO: implement tests for a WordData later as it will evolve