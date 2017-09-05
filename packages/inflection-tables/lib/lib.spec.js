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

    test('has method should check if value is in a map properly', () => {
        "use strict";

        importer.map('value1', 'valueOne').map('value2', 'valueTwo');
        expect(importer.has('value2')).toBeTruthy();

    });

    test('map method should add proper mapping', () => {
        "use strict";

        expect(() => {
            new t.Importer('incorrect value');
        }).toThrow();

    });

    afterAll(() => {
        // Clean a test environment up
        importer = undefined;
    });
});
