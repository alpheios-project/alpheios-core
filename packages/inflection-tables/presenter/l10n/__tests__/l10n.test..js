const t = require('../../../tests/test-bundle');

describe('MessageBundle', () => {
    "use strict";

    let localeEnUs = 'en-US';
    let messagesEnUs = {
        one: 'Message One (en_US)',
        two: 'Message Two (en_US)'
    };

    let messageBundleEnUs;

    beforeAll(() => {
        messageBundleEnUs = new t.L10n.MessageBundle(localeEnUs, messagesEnUs);
    });

    test('Should be initialized properly', () => {
        "use strict";

        expect(messagesEnUs).toEqual({
            one: 'Message One (en_US)',
            two: 'Message Two (en_US)'
        });
    });

    test('Constructor should throw an exception if no arguments are provided.', () => {
        "use strict";

        expect(() => {
            new t.L10n.MessageBundle();
        }).toThrowError();

    });

    test('Constructor should throw an exception if no locale and message data provided.', () => {
        "use strict";

        expect(() => {
            new t.L10n.MessageBundle(localeEnUs);
        }).toThrowError();

    });

    test('Should return a proper message by its ID.', () => {
        "use strict";

        let message = messageBundleEnUs.get('one');
        expect(message).toMatch('Message One (en_US)');

    });

    test('Should return a message with error for non-existent IDs.', () => {
        "use strict";

        let message = messageBundleEnUs.get('ten');
        expect(message).toMatch(/Not in translation data/);

    });

    afterAll(() => {
        // Clean a test environment up
        messageBundleEnUs = undefined;
    });
});

describe('L10n', () => {
    "use strict";

    let localeEnUs = 'en-US';
    let messagesEnUs = {
        one: 'Message One (en_US)',
        two: 'Message Two (en_US)'
    };

    let localeEnGb = 'en-GB';
    let messagesEnGb = {
        one: 'Message One (en_GB)',
        two: 'Message Two (en_GB)'
    };

    let l10n;

    beforeAll(() => {
        l10n = new t.L10n.L10n().add(localeEnUs, messagesEnUs).add(localeEnGb, messagesEnGb);
    });

    test('Constructor should create an empty object.', () => {
        "use strict";

        let l10n = new t.L10n.L10n();

        expect(l10n).toEqual({
            "_localeList": [],
            "_locales": {}
        });

    });

    test('Add method should be able to add message data properly.', () => {
        "use strict";

        expect(l10n._localeList).toEqual([localeEnUs, localeEnGb]);
        expect(l10n._locales[localeEnUs]._locale).toEqual(localeEnUs);
        expect(l10n._locales[localeEnGb]._locale).toEqual(localeEnGb);

    });

    test('Should not allow to add empty message data.', () => {
        "use strict";

        expect(() => { l10n.add(); }).toThrowError();

    });

    test('Should return a proper message bundle for a locale provided.', () => {
        "use strict";

        let bundle = l10n.messages(localeEnUs);
        expect(bundle._locale).toEqual(localeEnUs);

    });

    test('Request for a non-existing locale code should throw an error.', () => {
        "use strict";

        expect(() => { l10n.messages('en'); }).toThrowError(/Locale ".*" is not found/);

    });

    test('Should return a list of locales.', () => {
        "use strict";

        expect(l10n.locales).toEqual([localeEnUs, localeEnGb]);

    });

    afterAll(() => {
        // Clean a test environment up
        l10n = undefined;
    });
});