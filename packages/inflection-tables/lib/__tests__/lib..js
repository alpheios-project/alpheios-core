const t = require('../../dist/inflection-tables-test');

describe('Feature object', () => {
    "use strict";

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
        "use strict";

        expect(featureGreek1).toEqual({
            value: featureValue1,
            type: t.types.number,
            language: t.languages.greek
        });
    });

    test('Constructor should throw an exception if no arguments are provided', () => {
        "use strict";

        expect(() => {
            new t.Feature();
        }).toThrow();

    });

    test('Constructor should throw an exception if less than 3 arguments are provided', () => {
        "use strict";

        expect(() => {
            new t.Feature(featureValue1, t.types.number);
        }).toThrowError(/not supported/);

    });

    test('Constructor should throw an exception if any incorrect values of arguments are provided', () => {
        "use strict";

        expect(() => {
            new t.Feature(featureValue1, 'incorrect value', t.languages.greek);
        }).toThrowError(/not supported/);

    });

    test('Constructor should throw an exception if correct argument values are provided in incorrect order', () => {
        "use strict";

        expect(() => {
            new t.Feature(featureValue1, t.languages.greek, t.types.number);
        }).toThrowError(/not supported/);

    });

    test('Create method should return a correct Feature object created from a single value', () => {
        "use strict";

        let feature = t.Feature.create(featureGreek1);
        expect(feature).toEqual({
            value: featureValue1,
            type: t.types.number,
            language: t.languages.greek
        });

    });

    test('Create method should return a correct Feature object created from an array of values', () => {
        "use strict";

        let feature = t.Feature.create([featureGreek1, featureGreek2]);
        expect(feature).toEqual({
            value: [featureValue1, featureValue2],
            type: t.types.number,
            language: t.languages.greek
        });

    });

    test('Create method should not allow values of different types', () => {
        "use strict";

        expect(() => {
            t.Feature.create([featureGreek1, featureGreek3]);
        }).toThrowError(/mismatch/);

    });

    test('Create method should not allow values of different languages', () => {
        "use strict";

        expect(() => {
            t.Feature.create([featureGreek1, featureLatin1]);
        }).toThrowError(/mismatch/);

    });

    afterAll(() => {
        // Clean a test environment up
        featureGreek1 = undefined;
    });
});

describe('FeatureType object', () => {
    "use strict";

    let featureType;

    beforeAll(() => {
        // Create a test environment
        featureType = new t.FeatureType(t.types.declension, ['first', ['second', 'third'], 'fourth'], t.languages.latin);
    });

    test('Should be initialized properly', () => {
        "use strict";

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
        "use strict";

        expect(() => {
            new new t.FeatureType();
        }).toThrow();

    });

    test('Constructor should throw an exception if arguments are provided in wrong order', () => {
        "use strict";

        expect(() => {
            new new t.FeatureType(t.types.declension, t.languages.latin, ['first', 'second', 'third']);
        }).toThrowError(/not supported/);

    });

    test('Get method should return a new Feature object that is initialized properly', () => {
        "use strict";

        let value = 'some value';
        expect(featureType.get(value)).toEqual({
            "language": t.languages.latin,
            "type": t.types.declension,
            "value": value
        });

    });

    test('Get method with no value should throw an exception', () => {
        "use strict";

        expect(() => featureType.get()).toThrowError(/non-empty/);

    });

    test('addImporter method should return a new Importer object', () => {
        "use strict";

        expect(featureType.addImporter('some value')).toBeInstanceOf(t.Importer);

    });

    test('addImporter method should return a new properly initialized Importer object', () => {
        "use strict";

        let importerName = 'some value';
        expect(featureType.addImporter(importerName)).toEqual({
            "hash": {}
        });

    });

    test('addImporter method should create an Importer object inside a FeatureType object', () => {
        "use strict";

        featureType.addImporter('some value');
        expect(featureType).toEqual(expect.objectContaining({
            "importer": {
                'some value': { hash: {} }
            }
        }));

    });

    test('addImporter method with no value should throw an exception', () => {
        "use strict";

        expect(() => featureType.addImporter()).toThrowError(/non-empty/);

    });

    test('orderIndex method should return a new properly initialized Importer object', () => {
        "use strict";

        expect(featureType.orderIndex).toEqual(["first", ["second", "third"], "fourth"]);

    });

    test('orderLookup method should return a new properly initialized Importer object', () => {
        "use strict";

        expect(featureType.orderLookup).toEqual({"first": 0, "second": 1, "third": 1, "fourth": 2});

    });

    test('order setter should change an order of items properly', () => {
        "use strict";

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
        "use strict";

        expect(() => featureType.order = undefined).toThrowError(/non-empty/);

    });

    test('order setter with an empty array argument should throw an exception', () => {
        "use strict";

        expect(() => featureType.order = []).toThrowError(/non-empty/);

    });

    test('order setter with an argument(s) of mismatching type should throw an exception', () => {
        "use strict";

        let f1 = new t.Feature("first", t.types.gender, t.languages.latin);
        expect(() => featureType.order = [f1]).toThrowError(/is different/);

    });

    test('order setter with an argument(s) of mismatching language should throw an exception', () => {
        "use strict";

        let f1 = new t.Feature("first", t.types.declension, t.languages.greek);
        expect(() => featureType.order = [f1]).toThrowError(/is different/);

    });

    test('order setter with an argument(s) of values that are not stored should throw an exception', () => {
        "use strict";

        let f1 = new t.Feature("fifth", t.types.declension, t.languages.latin);
        expect(() => featureType.order = [f1]).toThrowError(/not stored/);

    });

    afterAll(() => {
        // Clean a test environment up
        featureType = undefined;
    });
});

describe('Importer object', () => {
    "use strict";

    let importer;

    beforeAll(() => {
        // Create a test environment
        importer = new t.Importer();
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(importer).toEqual({
            hash: {}
        });

    });

    test('map method should create proper mapping', () => {
        "use strict";

        importer.map('value1', 'valueOne').map('value2', 'valueTwo');
        expect(importer).toEqual({"hash": {"value1": "valueOne", "value2": "valueTwo"}});

    });

    test('map method should overwrite old values', () => {
        "use strict";

        importer.map('value1', 'valueOne').map('value2', 'valueTwo');
        importer.map('value1', 'newValueOne');
        expect(importer).toEqual({"hash": {"value1": "newValueOne", "value2": "valueTwo"}});

    });

    test('map method should not allow empty arguments', () => {
        "use strict";

        expect(() => importer.map('value')).toThrowError(/empty/);

    });

    test('has method should check if value is in a map properly', () => {
        "use strict";

        importer.map('value1', 'valueOne').map('value2', 'valueTwo');
        expect(importer.has('value2')).toBeTruthy();

    });

    test('get method should return a proper library object', () => {
        "use strict";

        let key = 'value2', value = 'valueTwo';
        importer.map('value1', 'valueOne').map(key, value);
        expect(importer.get(key)).toEqual(value);

    });

    test('get method should throw an error if mapping is not found', () => {
        "use strict";

        expect(() => importer.get('incorrect value')).toThrowError(/not found/);

    });

    afterAll(() => {
        // Clean a test environment up
        importer = undefined;
    });
});

describe('Inflection object', () => {
    "use strict";

    let inflection;

    beforeAll(() => {
        // Create a test environment
        inflection = new t.Inflection('stem', 'suffix', t.languages.greek);
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(inflection).toEqual({
            stem: 'stem',
            suffix: 'suffix',
            language: t.languages.greek
        });

    });

    test('Should not allow empty arguments', () => {
        "use strict";

        expect(() => new t.Inflection('stem', 'suffix', '')).toThrowError(/empty/);

    });

    test('Should not allow unsupported languages', () => {
        "use strict";

        expect(() => new t.Inflection('stem', 'suffix', 'egyptian')).toThrowError(/not supported/);

    });

    test('feature method should add a single feature to the inflection', () => {
        "use strict";

        inflection.feature = new t.Feature('masculine', t.types.gender, t.languages.greek);
        expect(inflection).toEqual(expect.objectContaining({
            gender: ["masculine"]
        }));

    });

    test('feature method should add multiple feature values to the inflection', () => {
        "use strict";

        inflection.feature = [
            new t.Feature('masculine', t.types.gender, t.languages.greek),
            new t.Feature('feminine', t.types.gender, t.languages.greek)
        ];
        expect(inflection).toEqual(expect.objectContaining({
            gender: ["masculine", "feminine"]
        }));

    });

    test('feature method should throw an error if no arguments are provided', () => {
        "use strict";

        expect(() => inflection.feature = '').toThrowError(/empty/);

    });

    test('feature method should throw an error if argument(s) are of the wrong type', () => {
        "use strict";

        expect(() => inflection.feature = 'some value').toThrowError(/Feature/);

    });

    test('feature method should not allow a feature language to be different from a language of an inflection', () => {
        "use strict";

        expect(() => inflection.feature = new t.Feature('masculine', t.types.gender, t.languages.latin))
            .toThrowError(/not match/);

    });


    afterAll(() => {
        // Clean a test environment up
        inflection = undefined;
    });
});

describe('Lemma object', () => {
    "use strict";

    let lemma, word;

    beforeAll(() => {
        // Create a test environment

        word = 'someword';
        lemma = new t.Lemma(word, t.languages.latin);
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(lemma).toEqual({
            word: word,
            language: t.languages.latin
        });

    });

    test('Should not allow empty arguments', () => {
        "use strict";

        expect(() => new t.Lemma()).toThrowError(/empty/);

    });

    test('Should not allow unsupported languages', () => {
        "use strict";

        expect(() => new t.Lemma('someword', 'egyptian')).toThrowError(/not supported/);

    });

    afterAll(() => {
        // Clean a test environment up
        lemma = undefined;
    });
});

describe('Lemma object', () => {
    "use strict";

    let lemma, word;

    beforeAll(() => {
        // Create a test environment

        word = 'someword';
        lemma = new t.Lemma(word, t.languages.latin);
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(lemma).toEqual({
            word: word,
            language: t.languages.latin
        });

    });

    test('Should not allow empty arguments', () => {
        "use strict";

        expect(() => new t.Lemma()).toThrowError(/empty/);

    });

    test('Should not allow unsupported languages', () => {
        "use strict";

        expect(() => new t.Lemma('someword', 'egyptian')).toThrowError(/not supported/);

    });

    afterAll(() => {
        // Clean a test environment up
        lemma = undefined;
    });
});

describe('Lexeme object', () => {
    "use strict";

    let lexeme;

    beforeAll(() => {
        // Create a test environment

        lexeme = new t.Lexeme(
            new t.Lemma('word', t.languages.greek),
            [
                new t.Inflection('stem1', 'suffix1', t.languages.greek),
                new t.Inflection('stem2', 'suffix2', t.languages.greek),
            ]
        );
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(lexeme).toEqual({
            lemma: {
                word: 'word',
                language: t.languages.greek
            },
            inflections: [
                {stem: 'stem1', suffix: 'suffix1', language: t.languages.greek},
                {stem: 'stem2', suffix: 'suffix2', language: t.languages.greek}
            ]

        });

    });

    test('Should not allow empty arguments', () => {
        "use strict";

        expect(() => new t.Lexeme()).toThrowError(/empty/);

    });

    test('Should not allow arguments of incorrect type', () => {
        "use strict";

        expect(() => new t.Lexeme(new t.Lemma('someword', t.languages.greek), 'some value')).toThrowError(/array/);

    });

    test('Should not allow arguments of incorrect type even within an array', () => {
        "use strict";

        expect(() => new t.Lexeme(new t.Lemma('someword', t.languages.greek), ['some value'])).toThrowError(/Inflection/);

    });

    afterAll(() => {
        // Clean a test environment up
        lexeme = undefined;
    });
});

describe('Homonym object', () => {
    "use strict";

    let homonym;

    beforeAll(() => {
        // Create a test environment

        homonym = new t.Homonym([
            new t.Lexeme(
                new t.Lemma('word1', t.languages.greek),
                [
                    new t.Inflection('stem1', 'suffix1', t.languages.greek),
                    new t.Inflection('stem2', 'suffix2', t.languages.greek),
                ]
            ),
            new t.Lexeme(
                new t.Lemma('word2', t.languages.greek),
                [
                    new t.Inflection('stem3', 'suffix3', t.languages.greek),
                    new t.Inflection('stem4', 'suffix4', t.languages.greek),
                ]
            )
        ]);
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(homonym).toEqual({
            lexemes:
            [
                {
                    lemma: {
                        word: 'word1',
                        language: t.languages.greek
                    },
                    inflections: [
                        {stem: 'stem1', suffix: 'suffix1', language: t.languages.greek},
                        {stem: 'stem2', suffix: 'suffix2', language: t.languages.greek}
                    ]
                },
                {
                    lemma: {
                        word: 'word2',
                        language: t.languages.greek
                    },
                    inflections: [
                        {stem: 'stem3', suffix: 'suffix3', language: t.languages.greek},
                        {stem: 'stem4', suffix: 'suffix4', language: t.languages.greek}
                    ]
                }
            ]
        });

    });

    test('Should not allow empty arguments', () => {
        "use strict";

        expect(() => new t.Homonym()).toThrowError(/empty/);

    });

    test('Should not allow an argument this is not an array', () => {
        "use strict";

        expect(() => new t.Homonym('some value')).toThrowError(/array/);

    });

    test('Should not allow arguments of incorrect type', () => {
        "use strict";

        expect(() => new t.Homonym(['some value'])).toThrowError(/Lexeme/);

    });

    afterAll(() => {
        // Clean a test environment up
        homonym = undefined;
    });
});

describe('LanguageDataset object', () => {
    "use strict";

    let languageDataset;

    beforeAll(() => {
        // Create a test environment

        languageDataset = new t.LanguageDataset(t.languages.latin);
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(languageDataset).toEqual({
            language: t.languages.latin,
            suffixes: [],
            features: {},
            footnotes: {}
        });

    });

    test('Should require language to be provided', () => {
        "use strict";

        expect(() => new t.LanguageDataset()).toThrowError(/empty/);

    });

    test('Should not allow initialization with unsupported languages', () => {
        "use strict";

        expect(() => new t.LanguageDataset('egyptian')).toThrowError(/not supported/);

    });

    test('defineFeatureType method should add feature type data properly', () => {
        "use strict";

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
        "use strict";

        languageDataset.addFootnote(5, 'Footnote text');
        expect(languageDataset.footnotes).toEqual(expect.objectContaining({5: 'Footnote text'}));

    });

    test('addFootnote should not allow empty values', () => {
        "use strict";

        expect(() => languageDataset.addFootnote(5)).toThrowError(/empty/);

    });

    // TODO: Add tests for getSuffixes later as the logic might change

    afterAll(() => {
        // Clean a test environment up
        languageDataset = undefined;
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
        "use strict";

        expect(suffix).toEqual({
            suffix: 'suffixtext',
            features: {},
            featureGroups: {}
        });

    });

    test('Should not allow an empty argument', () => {
        "use strict";

        expect(() => new t.Suffix()).toThrowError(/empty/);

    });

    test('clone method should return a copy of a Suffix object', () => {
        "use strict";

        let clone = suffix.clone();
        expect(clone).toEqual(suffix);

    });

    // TODO: implement tests for featureMatch as functionality may change
    // TODO: implement tests for getCommonGroups as functionality may change
    // TODO: implement tests for isInSameGroupWith as functionality may change
    // TODO: implement tests for split as functionality may change
    // TODO: implement tests for combine as functionality may change

    afterAll(() => {
        // Clean a test environment up
        suffix = undefined;
    });
});

// TODO: implement tests for a ResultSet later as it will evolve