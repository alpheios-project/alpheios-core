/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
import * as Lib from '../lib/lib';
import * as L10n from './l10n/l10n.js';
import nounDeclensionView from "./views/noun-declension/view.js";
import adjectiveDeclensionView from "./views/adj-declension/view.js";


class Presenter {
    constructor(selector, resultSet, locale) {
        this.targetSelector = selector;
        this.container = document.querySelector(this.targetSelector);
        this.resultSet = resultSet;
        this.zeroWidthClass = 'hidden';

        this.views = {
            nounDeclension: nounDeclensionView,
            adjectiveDeclension: adjectiveDeclensionView
        };

        this.defaultViewID = 'nounDeclension';
        this.activeViewID = undefined;

        this.locale = locale; // This is a default locale
        this.l10n = L10n.l10n;

        return this;
    }

    setLocale(locale) {
        this.locale = locale;
        this.views[this.activeViewID].render(this.container, this.resultSet, this.l10n.messages(this.locale));
    }


    render() {
        "use strict";

        // Show a default view
        this.views[this.defaultViewID].render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeViewID = this.defaultViewID;

        this.appendViewSelector("#view-switcher");
        this.appendLocaleSelector("#locale-selector");
    }

    appendViewSelector(targetSelector) {
        let views = this.getViews(this.resultSet[Lib.types.part]);
        if (views.length > 1) {
            let id = 'view-selector-list';
            let viewContainer = document.querySelector(targetSelector);
            viewContainer.innerHTML = '';
            let viewLabel = document.createElement('label');
            viewLabel.setAttribute('for', id);
            viewLabel.innerHTML = "View:&nbsp;";
            let viewList = document.createElement('select');
            for (const view of views) {
                let option = document.createElement("option");
                option.value = view.id;
                option.text = view.name;
                viewList.appendChild(option);
            }
            viewList.addEventListener('change', this.viewSelectorEventListener.bind(this));
            viewContainer.appendChild(viewLabel);
            viewContainer.appendChild(viewList);
        }
    }

    viewSelectorEventListener(event) {
        let viewID = event.target.value;
        this.views[viewID].render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeViewID = viewID;
    }

    appendLocaleSelector(targetSelector) {
        let id = 'locale-selector-list';
        let locale = document.querySelector(targetSelector);
        locale.innerHTML = ''; // Erase whatever was there
        let localeLabel = document.createElement('label');
        localeLabel.setAttribute('for', id);
        localeLabel.innerHTML = "Locale:&nbsp;";
        let localeList = document.createElement('select');
        localeList.id = id;
        for (let locale of this.l10n.locales) {
            let option = document.createElement("option");
            option.value = locale;
            option.text = locale;
            localeList.appendChild(option);
        }
        localeList.addEventListener('change', this.localeSelectorEventListener.bind(this));
        locale.appendChild(localeLabel);
        locale.appendChild(localeList);
    }

    localeSelectorEventListener() {
        let locale = event.target.value;
        this.setLocale(locale);
    }

    getViews(partsOfSpeech) {
        let views = [];
        if (partsOfSpeech.includes('noun')) {
            views.push(this.views.nounDeclension);
        }
        if (partsOfSpeech.includes('adjective')) {
            views.push(this.views.adjectiveDeclension);
        }
        return views;
    }
}

export default Presenter;