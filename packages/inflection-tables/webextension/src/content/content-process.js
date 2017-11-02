import * as Lib from "../../../lib/lib";
import Presenter from "../../../presenter/presenter";
import * as Message from '../lib/message';
import Panel from './panel';
import Options from '../lib/options';
import SymbolsTemplate from './templates/symbols.htmlf';
import PageControlsTemplate from './templates/page-controls.htmlf';
import PanelTemplate from './templates/panel.htmlf';
import OptionsTemplate from './templates/options.htmlf';
export {Process};

class Process {
    constructor() {
        this.status = Process.statuses.PENDING;
        this.settings = Process.settingValues;
        this.options = new Options();

        this.messagingService = new Message.MessagingService();
    }

    static get settingValues() {
        return {
            hiddenClassName: "hidden",
            pageControlSel: "#alpheios-panel-toggle"
        }
    }

    static get statuses() {
        return {
            PENDING: 'Pending', // Content script has not been fully initialized yet
            ACTIVE: 'Active', // Content script is loaded and active
            DEACTIVATED: 'Deactivated' // Content script has been loaded, but is deactivated
        };
    }

    /**
     * Loads any asynchronous data that there might be.
     * @return {Promise}
     */
    async loadData() {
        return this.options.loadStoredData();
    }

    get isActive() {
        return this.status === Process.statuses.ACTIVE;
    }

    deactivate() {
        console.log('Content has been deactivated.');
        this.panel.close();
        this.pageControl.classList.add(this.settings.hiddenClassName);
        this.status = Process.statuses.DEACTIVATED;
    }

    reactivate() {
        console.log('Content has been reactivated.');
        this.pageControl.classList.remove(this.settings.hiddenClassName);
        this.status = Process.statuses.ACTIVE;
    }

    render() {
        // Inject HTML code of a plugin. Should go in reverse order.
        document.body.classList.add('alpheios');
        Process.loadPanel();
        Process.loadPageControls();
        Process.loadSymbols();

        this.panel = new Panel(this.options);
        this.panelToggleBtn = document.querySelector('#alpheios-panel-toggle');
        this.renderOptions();

        this.pageControl = document.querySelector(this.settings.pageControlSel);

        // Add a message listener
        browser.runtime.onMessage.addListener(this.messageListener.bind(this));
        this.panelToggleBtn.addEventListener('click', this.togglePanel.bind(this));
        document.body.addEventListener('dblclick', Process.getSelectedText);
    }

    static loadSymbols() {
        Process.loadHTMLFragment(SymbolsTemplate);
    }

    static loadPageControls() {
        Process.loadHTMLFragment(PageControlsTemplate);
    }

    static loadPanel() {
        Process.loadHTMLFragment(PanelTemplate);
    }

    static loadHTMLFragment(html) {
        let container = document.createElement('div');
        container.innerHTML = html;
        document.body.insertBefore(container.firstChild, document.body.firstChild);
    }

    static requestWordData(language, word) {
        browser.runtime.sendMessage(new Message.WordDataRequest(language, word));
    }

    messageListener(message, sender) {
        console.log('Message from the browser: ', message);
        console.log('Sender is:', sender);
        if (!message.type) {
            console.warn('Message type not provided. Discarding unknown message.');
        }
        else if(message.type === Message.Message.types.ACTIVATE_REQUEST) {
            // Send a status response
            console.log(`Activate request received. Sending a response back.`);
            if (!this.isActive) {
                this.reactivate();
            }
            this.messagingService.sendResponseToBg(new Message.StatusResponse(this.status, message));
        }
        else if(message.type === Message.Message.types.DEACTIVATE_REQUEST) {
            // Send a status response
            console.log(`Deactivate request received. Sending a response back.`);
            if (this.isActive) {
                this.deactivate();
            }
            this.messagingService.sendResponseToBg(new Message.StatusResponse(this.status, message));
        }
        else if(message.type === Message.Message.types.STATUS_REQUEST) {
            // Send a status response
            console.log(`Status request received. Sending a response back.`);
            this.messagingService.sendResponseToBg(new Message.StatusResponse(this.status, message));
        }
        else if(message.type === Message.Message.types.WORD_DATA_RESPONSE) {
            console.log('Message body is:', message.body);

            if (message.status === Message.Message.statuses.DATA_FOUND) {
                let wordData = Lib.WordData.readObject(message.body);
                console.log("Word data is: ", wordData);
                this.panel.clear();
                this.updateDefinition(wordData);
                this.updateInflectionTable(wordData);
                this.panel.open();
            }
            else if (message.status === Message.Message.statuses.NO_DATA_FOUND) {
                this.panel.clear();
                this.panel.definitionContainer.innerHTML = '<p>Sorry, the word you requested was not found.</p>';
                this.panel.open().changeActiveTabTo(this.panel.tabs[0]);
            }
        }
        else if(message.type === Message.Message.types.STATUS_REQUEST) {
            browser.runtime.sendMessage(new Message.WordDataRequest(language, word));
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
        this.presenter = new Presenter(this.panel.inflTableContainer, this.panel.viewSelectorContainer,
            this.panel.localeSwitcherContainer, wordData, this.options.items.locale.currentValue).render();
    }

    renderOptions() {
        this.panel.optionsPage = OptionsTemplate;
        let localeSelector = this.panel.optionsPage.querySelector('#alpheios-locale-selector-list');
        for (let locale of this.options.items.locale.values) {
            let option = document.createElement("option");
            option.value = locale.value;
            option.text = locale.text;
            if (locale.value === this.options.items.locale.currentValue) {
                option.setAttribute('selected','selected');
            }
            localeSelector.appendChild(option);
        }
        localeSelector.addEventListener('change', this.optionChangeListener.bind(this, 'locale'));
    }

    optionChangeListener(option, event) {
        this.options.update(option, event.target.value);
        if (option === 'locale' && this.presenter) {
            this.presenter.setLocale(event.target.value);
        }
    }

    static getSelectedText() {
        let selectedWord = document.getSelection().toString().trim();
        Process.requestWordData('unknown', selectedWord);
    }
}