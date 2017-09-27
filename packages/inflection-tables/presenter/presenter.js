/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
import * as Lib from '../lib/lib';
import nounDeclensionView from "./views/noun-declension/view.js";
import adjectiveDeclensionView from "./views/adj-declension/view.js";


class Presenter {
    constructor() {
        this.zeroWidthClass = 'hidden';
        this.emptyColumnClass = 'empty-row-column';
        this.noSuffixColumnClass ='no-suffix-column';
        this.showEmptyColumnSel = '#show-empty-columns';
        this.hideEmptyColumnSel = '#hide-empty-columns';
        this.showNoSuffixDeclensionsSel = '#show-no-suffix-declensions';
        this.hideNoSuffixDeclensionsSel = '#hide-no-suffix-declensions';
        this.highlightedClass = 'highlighted-cell';

        this.views = {
            nounDeclension: nounDeclensionView,
            adjectiveDeclension: adjectiveDeclensionView
        };

        this.activeView = undefined;
    }


    render(selector, resultSet) {
        "use strict";

        let views = this.getViews(resultSet[Lib.types.part]);
        // Show a default view
        views[0].render(document.querySelector(selector), resultSet);

        document.querySelector("#view-switcher").innerHTML = '';
        if (views.length > 1) {
            let selectList = document.createElement('select');
            for (const view of views) {
                let option = document.createElement("option");
                option.value = view.id;
                option.text = view.name;
                selectList.appendChild(option);
            }
            selectList.addEventListener('change', event => {
                let viewID = event.target.value;
                this.views[viewID].render(document.querySelector(selector), resultSet);
            });
            document.querySelector("#view-switcher").appendChild(selectList);
        }
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

let presenter = new Presenter();

export default presenter;