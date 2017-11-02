import * as Lib from "../../../lib/lib";
import TuftsAdapter from "../../../analyzer/tufts/adapter";
import * as Message from '../lib/message';
import * as Content from '../content/content-process';
// Import language data
import * as LatinData from "../../../lib/lang/latin/latin";
import * as GreekData from "../../../lib/lang/greek/greek";

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

class ContentData {
    constructor(tabID, status) {
        this.tabID = tabID;
        this.status = status;
    }
}

class BackgroundProcess {
    constructor() {
        this.settings = BackgroundProcess.defaults;
        this.settings.browserSupport = !(typeof browser === "undefined");

        this.maAdapter = new TuftsAdapter(); // Morphological analyzer adapter
        this.maAdapter.fetch = this.maAdapter.fetchTestData; // Switch adapter to a test mode

        this.tabs = new Map(); // A list of tabs that have content script loaded

        this.messagingService = new Message.MessagingService();
    }

    static get defaults() {
        return {
            activateMenuItemId: 'activate-alpheios-content',
            activateMenuItemText: 'Activate',
            deactivateMenuItemId: 'deactivate-alpheios-content',
            deactivateMenuItemText: 'Deactivate',
            contentCSSFileName: 'styles/style.css',
            contentScriptFileName: 'content.js',
            browserPolyfillName: 'support/webextension-polyfill/browser-polyfill.js',
            contentScriptLoaded: false
        }
    }

    initialize() {
        console.log('initialize');

        this.langData = new Lib.LanguageData([LatinData.dataSet, GreekData.dataSet]).loadData();

        browser.runtime.onMessage.addListener(this.messageListener.bind(this));

        BackgroundProcess.createMenuItem();

        browser.contextMenus.onClicked.addListener(this.menuListener.bind(this));
        browser.browserAction.onClicked.addListener(this.browserActionListener.bind(this));
    }

    isContentLoaded(tabID) {
        return this.tabs.has(tabID);
    }

    isContentActive(tabID) {
        return this.isContentLoaded(tabID) && this.tabs.get(tabID).status === Content.Process.statuses.ACTIVE;
    }

    activateContent(tabID) {
        if (!this.isContentLoaded(tabID)) {
            // This tab has no content loaded
            this.loadContent(tabID);
        }
        else {
            if (!this.isContentActive(tabID)) {
                this.sendRequestToTab(tabID, new Message.ActivateRequest(), 1000);
            }
        }
    }

    deactivateContent(tabID) {
        if (this.isContentActive(tabID)) {
            this.sendRequestToTab(tabID, new Message.DeactivateRequest(), 1000);
        }
    }

    loadPolyfill(tabID) {
        if (!this.settings.browserSupport) {
            console.log('Loading WebExtension polyfill into a content tab');
            return browser.tabs.executeScript(
                tabID,
                {
                    file: this.settings.browserPolyfillName
                });
        }
        else {
            // `browser` object is supported natively, no need to load a polyfill.
            return Promise.resolve();
        }
    }

    loadContentScript(tabID) {
        console.log('Loading content script into a content tab');
        return browser.tabs.executeScript(tabID, {
            file: this.settings.contentScriptFileName
        });
    };

    loadContentCSS(tabID) {
        console.log('Loading CSS into a content tab');
        return browser.tabs.insertCSS(tabID, {
            file: this.settings.contentCSSFileName
        });
    };

    loadContent(tabID) {
        let polyfillScript = this.loadPolyfill(tabID);
        let contentScript = this.loadContentScript(tabID);
        let contentCSS = this.loadContentCSS(tabID);
        Promise.all([polyfillScript, contentScript, contentCSS]).then(() => {
            console.log('Content script(s) has been loaded successfully or already present');
            this.tabs.set(tabID, new ContentData(tabID, Content.Process.statuses.ACTIVE));
            BackgroundProcess.defaults.contentScriptLoaded = true;

        }, (error) => {
            throw new Error('Content script loading failed', error);
        });
    }

    sendRequestToTab(tabID, request, timeout) {
        this.messagingService.sendRequestToTab(tabID, request, timeout).then(
            (message) => {
                console.log(`"${request.type}" request to tab completed successfully`, message);
                this.tabs.get(tabID).status = message.status;
            },
            (error) => {
                console.log(`"${request.type}" request to tab failed, error: ${error}`);
            }
        );
    }

    static getActiveTab() {
        return browser.tabs.query({
            active: true
        });
        // return new Promise((resolve, reject) => reject('Rejected message'));
    }

    static async sendMessageToActiveTab(message) {
        const tabs = await BackgroundProcess.getActiveTab();
        BackgroundProcess.sendMessageToTab(tabs[0].id, message);
    };

    static async sendMessageToTab(tabID, message) {
        browser.tabs.sendMessage(tabID, message);
        console.log(`Sent a message to a tab with id "${tabID}"`);
    };

    async messageListener(message, sender) {
        console.log("Message from the content script: ", message);

        if (message.requestType === Message.Message.requestTypes.RESPONSE) {
            this.messagingService.handleResponse(message);
        }

        if (message.type === Message.Message.types.WORD_DATA_REQUEST) {
            let selectedWord = Lib.SelectedWord.readObjects(message.body);
            console.log(`Request for a "${selectedWord.word}" word`);

            try {
                let homonym = await this.maAdapter.getHomonym(selectedWord.language, selectedWord.word);
                let wordData = undefined;
                let status = Message.Message.statuses.NO_DATA_FOUND;
                if (homonym) {
                    // If word data is found, get matching suffixes from an inflection library
                    wordData = this.langData.getSuffixes(homonym);
                    wordData.definition = encodeURIComponent(alpheiosTestData.definition);
                    status = Message.Message.statuses.DATA_FOUND;
                    console.log(wordData);
                }
                await BackgroundProcess.sendMessageToActiveTab(
                    new Message.WordDataResponse(wordData, status, message)
                );
            }
            catch (error) {
                console.error(`An error occurred during a retrieval of word data: ${error.message}`);
            }
        }
        // Should not send any response as it is not supported by webextensions polyfill and will probably be deprecated
        return false;
    }

    async menuListener(info, tab) {
        if (info.menuItemId === this.settings.activateMenuItemId) {
            this.activateContent(tab.id);
        }
        else if (info.menuItemId === this.settings.deactivateMenuItemId) {
            this.deactivateContent(tab.id);
        }
    }

    async browserActionListener(tab) {
        this.activateContent(tab.id);
    }

    static createMenuItem() {
        browser.contextMenus.create({
            id: BackgroundProcess.defaults.activateMenuItemId,
            title: BackgroundProcess.defaults.activateMenuItemText
        });
        browser.contextMenus.create({
            id: BackgroundProcess.defaults.deactivateMenuItemId,
            title: BackgroundProcess.defaults.deactivateMenuItemText
        });
    }
}

let backgroundProcess = new BackgroundProcess();
/*
BackgroundProcess constructor performs a `browser` global object support detection. Because of that,
webextension-polyfill, that emulates a `browser` object, should be loaded after BackgroundProcess constructor.
 */
window.browser = require('../../dist/support/webextension-polyfill/browser-polyfill');
backgroundProcess.initialize();
console.log(`Support of global "browser" object: ${backgroundProcess.settings.browserSupport}`);
