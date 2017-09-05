const t = require('../dist/inflection-tables-test');

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

    test('addImporter method method with no value should throw an exception', () => {
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

    afterAll(() => {
        // Clean a test environment up
        featureType = undefined;
    });
});

/*describe('LanguageDataset object', () => {
    "use strict";

    let languageDataset;

    beforeAll(() => {
        // Create a test environment
        languageDataset = new t.LanguageDataset(t.languages.latin);
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(languageDataset).toEqual({
            "endings": [],
            "features": {},
            "footnotes": {},
            "language": t.languages.latin
        });

    });

    test('Should throw an exception if initialized incorrectly', () => {
        "use strict";

        expect(() => {
            new t.LanguageDataset('incorrect value');
        }).toThrow();

    });

    afterAll(() => {
        // Clean a test environment up
        languageDataset = undefined;
    });
});*/
