import * as Lib from "../../../lib/lib";
import TuftsAdapter from "../../../analyzer/tufts/adapter";
import * as ExtLib from '../lib/lib';
// Import language data
import * as LatinData from "../../../lib/lang/latin/latin";
import * as GreekData from "../../../lib/lang/greek/greek";

let alpheiosExtSettings = {
    noBrowserEnv: typeof browser === "undefined",
    menuItemId: 'alpheios-load-content',
    menuItemText: 'Load Alpheios',
    contentCSSFileName: 'styles/style.css',
    contentScriptFileName: 'content.js',
    browserPolyfillName: 'support/webextension-polyfill/browser-polyfill.js',
    contentScriptLoaded: false
};
// This should be below browser support detection
window.browser = require('../../dist/support/webextension-polyfill/browser-polyfill');

let alpheiosTestData = {
    definition: `
                <h4>Some Dummy word data</h4>
                <p>
                    Nunc maximus ex id tincidunt pretium. Nunc vel dignissim magna, ut hendrerit lectus. Proin aliquet purus at
                    ullamcorper dignissim. Sed mollis maximus dui. Morbi viverra, metus in fermentum lobortis, arcu est vehicula nibh, a
                    efficitur orci libero eu eros. Nam vulputate risus sed odio fermentum, quis pharetra nibh tincidunt. Mauris eu
                    posuere nunc, tincidunt accumsan metus. Nullam quis enim laoreet, euismod lacus ut, maximus ipsum. Donec vitae
                    sapien non sem eleifend posuere sed vel mauris.
                </p>
                <p>
                    Sed non orci convallis, iaculis ipsum quis, luctus orci. In et auctor metus. Vestibulum venenatis turpis nibh, vitae
                    ornare urna fringilla eu. Nam efficitur blandit metus. Nullam in quam et sapien iaculis accumsan nec ut neque.
                    Aenean aliquam urna quis egestas tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
                    ac turpis egestas. Praesent sit amet tellus dignissim, tristique ante luctus, gravida lectus.
                </p>
            `
};

class BackgroundProcess {
    constructor(settings) {
        this.settings = settings;

        BackgroundProcess.reportBrowserSupport();

        this.langData = new Lib.LanguageData([LatinData.dataSet, GreekData.dataSet]).loadData();

        browser.runtime.onMessage.addListener(this.messageListener.bind(this));

        BackgroundProcess.createMenuItem();

        browser.contextMenus.onClicked.addListener(this.menuListener.bind(this));
        browser.browserAction.onClicked.addListener(this.browserActionListener.bind(this));
    }

    loadContent() {
        let polyfillScript = this.loadPolyfill();
        let contentScript = this.loadContentScript();
        //let contentCSS = this.loadContentCSS();
        Promise.all([polyfillScript, contentScript/*, contentCSS*/]).then((results) => {
            "use strict";
            console.log('Content script(s) has been loaded successfully or already present');
            alpheiosExtSettings.contentScriptLoaded = true;

        }, (error) => {
            "use strict";
            throw new Error('Content script loading failed', error);
        });
    }

    loadPolyfill() {
        if (!this.settings.contentScriptLoaded && this.settings.noBrowserEnv) {
            console.log('Loading webextension polyfill into a content tab');
            return browser.tabs.executeScript({
                file: this.settings.browserPolyfillName
            });
        }
        else {
            return Promise.resolve();
        }
    }

    loadContentScript(fileName) {
        "use strict";
        if (!this.settings.contentScriptLoaded) {
            console.log('Loading content script into a content tab');
            return browser.tabs.executeScript({
                file: this.settings.contentScriptFileName
            });
        }
        else {
            return Promise.resolve();
        }
    };

    loadContentCSS(fileName) {
        "use strict";
        if (!this.settings.contentScriptLoaded) {
            console.log('Loading CSS into a content tab');
            return browser.tabs.insertCSS({
                file: this.settings.contentCSSFileName
            });
        }
        else {
            return Promise.resolve();
        }
    };

    sendMessageToTab(message) {
        browser.tabs.query({
            active: true,
            currentWindow: true
        }).then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, message);
            console.log('Sending a message to the content page.');
        }, (error) => {
            "use strict";
            throw new Error('Unable to determine an active tab');
        });
    };

    messageListener(message, sender) {
        console.log("Message from the content script: ", message.body);
        if (message.type === ExtLib.Message.types.WORD_DATA_REQUEST) {
            let selectedWord = Lib.SelectedWord.readObjects(message.body);
            console.log(`Request for a "${selectedWord.word}" word`);

            let adapter = new TuftsAdapter();
            adapter.fetchTestData(selectedWord.language, selectedWord.word).then((json) => {
                    let homonym = adapter.transform(json);

                    // Get matching suffixes from an inflection library
                    let wordData = this.langData.getSuffixes(homonym);
                    wordData.word = selectedWord.word;
                    wordData.definition = encodeURIComponent(alpheiosTestData.definition);
                    console.log(wordData);

                    this.sendMessageToTab(new ExtLib.WordDataResponse(wordData, ExtLib.Message.statuses.DATA_FOUND, message));
                },
                (error) => {
                    // Word is not found in test data
                    this.sendMessageToTab(new ExtLib.WordDataResponse(undefined, ExtLib.Message.statuses.NO_DATA_FOUND, message));
                });
        }
        // Should not send any response as it is not supported by webextensions polyfill and will probably be deprecated
        return false;
    }

    menuListener(info, tab) {
        if (info.menuItemId === this.settings.menuItemId) {
            this.loadContent();
        }
    }

    browserActionListener(tab) {
        this.loadContent();
    }

    static reportBrowserSupport() {
        if (alpheiosExtSettings.noBrowserEnv) {
            console.log(`No support for "browser" detected`);
        }
        else {
            console.log(`"browser" support has been detected`);
        }
    }

    static createMenuItem() {
        browser.contextMenus.create({
            id: alpheiosExtSettings.menuItemId,
            title: alpheiosExtSettings.menuItemText
        });
    }
}

let backgroundProcess = new BackgroundProcess(alpheiosExtSettings);


/*
browser.browserAction.onClicked.addListener((tab) => {
    // disable the active tab
    //browser.browserAction.disable(tab.id);
    console.log('Clicked 2');
});*/
