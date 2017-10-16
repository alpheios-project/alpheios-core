/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
import * as Lib from '../lib/lib';
import * as L10n from '../l10n/l10n.js';
import * as View from './lib/view';
import nounDeclensionOptions from "./views/noun/noun";
import adjectiveDeclensionOptions from "./views/adjective/adjective";
import verbVoiceConjugationMoodOptions from "./views/verb/voice-conjugation-mood";
import verbVoiceMoodConjugationOptions from "./views/verb/voice-mood-conjugation";
import verbConjugationVoiceMoodOptions from "./views/verb/conjugation-voice-mood";
import verbConjugationMoodVoiceOptions from "./views/verb/conjugation-mood-voice";
import verbMoodVoiceConjugationOptions from "./views/verb/mood-voice-conjugation";
import verbMoodConjugationVoiceOptions from "./views/verb/mood-conjugation-voice";


class Presenter {
    constructor(selector, resultSet, locale = 'en-US') {

        this.targetSelector = selector;
        this.container = document.querySelector(this.targetSelector);
        this.resultSet = resultSet;

        // All views registered by the Presenter
        this.views = [];
        this.viewIndex = {};

        this.addView(nounDeclensionOptions);
        this.addView(adjectiveDeclensionOptions);
        this.addView(verbVoiceConjugationMoodOptions);
        this.addView(verbVoiceMoodConjugationOptions);
        this.addView(verbConjugationVoiceMoodOptions);
        this.addView(verbConjugationMoodVoiceOptions);
        this.addView(verbMoodVoiceConjugationOptions);
        this.addView(verbMoodConjugationVoiceOptions);

        // Views available for parts of speech that are present in a Result Set
        this.availableViews = this.getViews(this.resultSet[Lib.types.part]);

        this.defaultView = this.availableViews[0];
        this.activeView = undefined;

        this.locale = locale; // This is a default locale
        this.l10n = new L10n.L10n(L10n.messages);

        return this;
    }

    addView(viewOptions) {
       let view =  new View.View(viewOptions);
       this.views.push(view);
       this.viewIndex[view.id] = view;
    }

    setLocale(locale) {
        this.locale = locale;
        this.activeView.render(this.container, this.resultSet, this.l10n.messages(this.locale));
    }

    render() {
        // Show a default view
        this.defaultView.render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeView = this.defaultView;

        this.appendViewSelector("#view-switcher");
        this.appendLocaleSelector("#locale-selector");
    }

    appendViewSelector(targetSelector) {
        let viewContainer = document.querySelector(targetSelector);
        viewContainer.innerHTML = '';
        if (this.availableViews.length > 1) {
            let id = 'view-selector-list';
            let viewLabel = document.createElement('label');
            viewLabel.setAttribute('for', id);
            viewLabel.innerHTML = "View:&nbsp;";
            let viewList = document.createElement('select');
            for (const view of this.availableViews) {
                let option = document.createElement("option");
                option.value = view.options.id;
                option.text = view.options.name;
                viewList.appendChild(option);
            }
            viewList.addEventListener('change', this.viewSelectorEventListener.bind(this));
            viewContainer.appendChild(viewLabel);
            viewContainer.appendChild(viewList);
        }
    }

    viewSelectorEventListener(event) {
        let viewID = event.target.value;
        let view = this.viewIndex[viewID];
        view.render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeView = view;
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
        // First view in a returned array will be a default one
        let views = [];
        for (let view of this.views) {
            if (partsOfSpeech.includes(view.partOfSpeech)) {
                views.push(view);
            }
        }
        return views;
    }
}

export default Presenter;