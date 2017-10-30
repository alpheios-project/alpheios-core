import * as Lib from "../../../lib/lib";
import Presenter from "../../../presenter/presenter";
import * as ExtLib from '../lib/lib';
import * as UI from './ui';
import Symbols from './templates/symbols.htmlf';
import PageControls from './templates/page-controls.htmlf';
import Panel from './templates/panel.htmlf';

class ContentProcess {
    constructor() {
        // Inject HTML code of a plugin. Should go in reverse order.
        document.body.classList.add('alpheios');
        ContentProcess.loadPanel();
        ContentProcess.loadPageControls();
        ContentProcess.loadSymbols();

        this.panel = new UI.Panel();
        this.panelToggleBtn = document.querySelector('#alpheios-panel-toggle');

        // Add a message listener
        browser.runtime.onMessage.addListener(this.messageListener.bind(this));
        this.panelToggleBtn.addEventListener('click', this.togglePanel.bind(this));
        document.body.addEventListener('dblclick', ContentProcess.getSelectedText);
    }

    static loadSymbols() {
        ContentProcess.loadHTMLFragment(Symbols);
    }

    static loadPageControls() {
        ContentProcess.loadHTMLFragment(PageControls);
    }

    static loadPanel() {
        ContentProcess.loadHTMLFragment(Panel);
    }

    static loadHTMLFragment(html) {
        let container = document.createElement('div');
        container.innerHTML = html;
        document.body.insertBefore(container.firstChild, document.body.firstChild);
    }

    static requestWordData(language, word) {
        browser.runtime.sendMessage(new ExtLib.WordDataRequest(language, word));
    }

    messageListener(message, sender) {
        console.log('Message from the browser: ', message);
        console.log('Sender is:', sender);
        if (!message.type) {
            console.warn('Message type not provided. Discarding unknown message.');
        }
        else if(message.type === ExtLib.Message.types.WORD_DATA_RESPONSE) {
            console.log('Message body is:', message.body);

            if (message.status === ExtLib.Message.statuses.DATA_FOUND) {
                let wordData = Lib.WordData.readObject(message.body);
                console.log("Word data is: ", wordData);
                this.panel.clear();
                this.updateDefinition(wordData);
                this.updateInflectionTable(wordData);
                this.panel.open();
            }
            else if (message.status === ExtLib.Message.statuses.NO_DATA_FOUND) {
                this.panel.clear();
                this.panel.definitionContainer.innerHTML = '<p>Sorry, the word you requested was not found.</p>';
                this.panel.open().changeActiveTabTo(this.panel.tabs[0]);
            }
        }
        else {
            console.warn(`Unsupported message type "${message.type}". Discarding this message.`);
        }

        // Should not send any response as it is not supported by webextensions polyfill and will probably be deprecated
        return false;
    }

    togglePanel() {
        this.panel.toggle();
    }

    updateDefinition(wordData) {
        this.panel.definitionContainer.innerHTML = decodeURIComponent(wordData.definition);
    }

    updateInflectionTable(wordData) {
        let presenter = new Presenter(this.panel.inflTableContainer, this.panel.viewSelectorContainer,
            this.panel.localeSwitcherContainer, wordData).render();
    }

    static getSelectedText() {
        let selectedWord = document.getSelection().toString().trim();
        console.log(`Selected text is ${selectedWord}`);
        ContentProcess.requestWordData('unknown', selectedWord);
    }
}

let contentProcess = new ContentProcess();

