export {Panel, Options};

class Panel {
    constructor(options) {
        this.options = options;

        this.pageBody = document.body;
        this.body = document.querySelector('#alpheios-panel');
        this.definitionContainer = document.querySelector('#alpheios-panel-content-definition');
        this.inflTableContainer = document.querySelector('#alpheios-panel-content-infl-table-body');
        this.viewSelectorContainer = document.querySelector('#alpheios-panel-content-infl-table-view-selector');
        this.localeSwitcherContainer = document.querySelector('#alpheios-panel-content-infl-table-locale-switcher');
        this.optionsContainer = document.querySelector('#alpheios-panel-content-options');

        this.showOpenBtn = document.querySelector('#alpheios-panel-show-open');
        this.showFWBtn = document.querySelector('#alpheios-panel-show-fw');
        this.hideBtn = document.querySelector('#alpheios-panel-hide');

        this.tabs = document.querySelectorAll("#alpheios-panel__nav .alpheios-panel__nav-btn");
        this.activeTab = document.querySelector("#alpheios-panel__nav .alpheios-panel__nav-btn");
        this.activeClassName = 'active';

        this.panelOpenClassName = 'open';
        this.hiddenClassName = 'hidden';
        this.panelOpenFWClassName = 'open-fw';
        this.bodyOpenClassName = 'alpheios-panel-open';

        this.isOpen = false;
        this.isOpenFW = false;

        this.showOpenBtn.addEventListener('click', this.open.bind(this));
        this.showFWBtn.addEventListener('click', this.openFullWidth.bind(this));
        this.hideBtn.addEventListener('click', this.close.bind(this));

        for (let tab of this.tabs) {
            let target = tab.dataset.target;
            document.getElementById(target).classList.add(this.hiddenClassName);
            tab.addEventListener('click', this.switchTab.bind(this));
        }
        this.changeActiveTabTo(this.tabs[0]);
    }

    open() {
        if (this.isOpenFW) {
            this.body.classList.remove(this.panelOpenFWClassName);
            this.isOpenFW = false;
        }
        if (!this.isOpen) {
            this.body.classList.add(this.panelOpenClassName);
            this.pageBody.classList.add(this.bodyOpenClassName);
            this.isOpen = true;
        }
        this.showOpenBtn.classList.add(this.hiddenClassName);
        return this;
    }

    openFullWidth() {
        if (this.isOpen) {
            this.body.classList.remove(this.panelOpenClassName);
            this.pageBody.classList.remove(this.bodyOpenClassName);
            this.isOpen = false;
        }
        if (!this.isOpenFW) {
            this.body.classList.add(this.panelOpenFWClassName);
            this.isOpenFW = true;
        }
        this.showOpenBtn.classList.remove(this.hiddenClassName);
        return this;
    }

    close() {
        if (this.isOpen) {
            this.body.classList.remove(this.panelOpenClassName);
            this.pageBody.classList.remove(this.bodyOpenClassName);
            this.isOpen = false;
        }
        if (this.isOpenFW) {
            this.body.classList.remove(this.panelOpenFWClassName);
            this.isOpenFW = false;
        }
        return this;
    }

    toggle() {
        if (this.isOpen || this.isOpenFW) {
            this.close();
        }
        else {
            this.open();
        }
        return this;
    }

    clear() {
        this.definitionContainer.innerHTML = '';
        this.inflTableContainer.innerHTML = '';
        this.viewSelectorContainer.innerHTML = '';
        this.localeSwitcherContainer.innerHTML = '';
        return this;
    }

    switchTab(event) {
        this.changeActiveTabTo(event.currentTarget);
        return this;
    }

    changeActiveTabTo(activeTab) {
        if (this.activeTab) {
            let target = this.activeTab.dataset.target;
            document.getElementById(target).classList.add(this.hiddenClassName);
            this.activeTab.classList.remove(this.activeClassName);
        }

        activeTab.classList.add(this.activeClassName);
        let target = activeTab.dataset.target;
        document.getElementById(target).classList.remove(this.hiddenClassName);
        this.activeTab = activeTab;
        return this;
    }

    get optionsPage() {
        return this.optionsContainer;
    }

    set optionsPage(htmlContent) {
        return this.optionsContainer.innerHTML = htmlContent;
    }
}

class Options {
    constructor() {
        this._values = Options.defaults;
        browser.storage.local.get().then(
            (values) => {
                for (let key in values) {
                    if (this._values.hasOwnProperty(key)) {
                        this._values[key].currentValue = values[key];
                    }
                }
            },
            (errorMessage) => {
                console.err(`Cannot retrieve options for Alpheios extension from a local storage: ${errorMessage}`);
            }
        );
        for (let key in this._values) {
            if (this._values.hasOwnProperty(key)) {
                // If current value is not present in the local storage, set it to default
                if (!this._values[key].currentValue) {
                    this._values[key].currentValue = this._values[key].defaultValue;
                }
            }
        }
    }

    static get defaults() {
        return {
            locale: {
                defaultValue: 'en-US',
                values: [
                    { value: 'en-US', text: 'English (US)' },
                    { value: 'en-GB', text: 'English (GB)' }
                ],
                inputSelector: '#alpheios-locale-selector-list'
            }
        }
    }

    get items() {
        return this._values;
    }

    update(option, value) {
        this._values[option].currentValue = value;

        // Update value in the local storage
        let optionObj = {};
        optionObj[option] = value;
        browser.storage.local.set(optionObj).then(
            () => {
                // Options storage succeeded
                console.log('Option value was stored successfully.');
            },
            (errorMessage) => {
                console.err(`Storage of option value failed: ${errorMessage}`);
            }
        );
    }
}