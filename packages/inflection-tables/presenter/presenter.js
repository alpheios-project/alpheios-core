/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
import * as Lib from '../lib/lib';
import * as L10n from './l10n/l10n.js';
import nounDeclensionView from "./views/noun/noun";
import adjectiveDeclensionView from "./views/adjective/adjective";
import verbVoiceConjugationMoodView from "./views/verb/voice-conjugation-mood";
import verbVoiceMoodConjugationView from "./views/verb/voice-mood-conjugation";
import verbConjugationVoiceMoodView from "./views/verb/conjugation-voice-mood";
import verbConjugationMoodVoiceView from "./views/verb/conjugation-mood-voice";
import verbMoodVoiceConjugationView from "./views/verb/mood-voice-conjugation";
import verbMoodConjugationVoiceView from "./views/verb/mood-conjugation-voice";


class Presenter {
    constructor(selector, resultSet, locale) {
        "use strict";

        this.targetSelector = selector;
        this.container = document.querySelector(this.targetSelector);
        this.resultSet = resultSet;
        this.zeroWidthClass = 'hidden';

        // All views registered by the Presenter
        this.registeredViews = {
            nounDeclension: nounDeclensionView,
            adjectiveDeclension: adjectiveDeclensionView,
            verbVoiceConjugationMood: verbVoiceConjugationMoodView,
            verbVoiceMoodConjugation: verbVoiceMoodConjugationView,
            verbConjugationVoiceMood: verbConjugationVoiceMoodView,
            verbConjugationMoodVoice: verbConjugationMoodVoiceView,
            verbMoodVoiceConjugation: verbMoodVoiceConjugationView,
            verbMoodConjugationVoice: verbMoodConjugationVoiceView
        };

        // Views available for parts of speech that are present in a Result Set
        this.availableViews = this.getViews(this.resultSet[Lib.types.part]);

        this.defaultView = this.availableViews[0];
        this.activeView = undefined;

        this.locale = locale; // This is a default locale
        this.l10n = L10n.l10n;

        return this;
    }

    setLocale(locale) {
        this.locale = locale;
        this.activeView.render(this.container, this.resultSet, this.l10n.messages(this.locale));
    }


    render() {
        "use strict";

        // Show a default view
        this.defaultView.render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeView = this.defaultView;

        this.appendViewSelector("#view-switcher");
        this.appendLocaleSelector("#locale-selector");
    }

    appendViewSelector(targetSelector) {
        if (this.availableViews.length > 1) {
            let id = 'view-selector-list';
            let viewContainer = document.querySelector(targetSelector);
            viewContainer.innerHTML = '';
            let viewLabel = document.createElement('label');
            viewLabel.setAttribute('for', id);
            viewLabel.innerHTML = "View:&nbsp;";
            let viewList = document.createElement('select');
            for (const view of this.availableViews) {
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
        let view = this.registeredViews[viewID];
        this.registeredViews[viewID].render(this.container, this.resultSet, this.l10n.messages(this.locale));
        this.activeView = this.registeredViews[viewID];
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
        if (partsOfSpeech.includes('noun')) {
            views.push(this.registeredViews.nounDeclension);
        }
        if (partsOfSpeech.includes('adjective')) {
            views.push(this.registeredViews.adjectiveDeclension);
        }
        if (partsOfSpeech.includes('verb')) {
            views.push(this.registeredViews.verbVoiceConjugationMood);
            views.push(this.registeredViews.verbVoiceMoodConjugation);
            views.push(this.registeredViews.verbConjugationVoiceMood);
            views.push(this.registeredViews.verbConjugationMoodVoice);
            views.push(this.registeredViews.verbMoodVoiceConjugation);
            views.push(this.registeredViews.verbMoodConjugationVoice);
        }
        return views;
    }
}

export default Presenter;