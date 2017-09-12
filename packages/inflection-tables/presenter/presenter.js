/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
import * as Lib from '../lib/lib';
import nounDeclensionView from "./views/noun-declension/view.js";
import adjectiveDeclensionView from "./views/adj-declension/view.js";


class Presenter {
    constructor() {
        this.hiddenClass = 'hidden';
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
        }
    }


    render(selector, resultSet) {
        "use strict";

        let views = this.getViews(resultSet[Lib.types.part]);
        // Show a default view
        this.showView(views[0], selector, resultSet);

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
                console.log(viewID);
                this.showView(this.views[viewID], selector, resultSet);
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

    showView(view, selector, resultSet) {
        document.querySelector(selector).innerHTML = view.render(resultSet);

        this.hideEmptyColumns();
        this.hideNoSuffixDeclensions();

        document.querySelector(this.hideEmptyColumnSel).addEventListener('click', this.hideEmptyColumns.bind(this));
        document.querySelector(this.showEmptyColumnSel).addEventListener('click', this.showEmptyColumns.bind(this));

        document.querySelector(this.hideNoSuffixDeclensionsSel).addEventListener('click', this.hideNoSuffixDeclensions.bind(this));
        document.querySelector(this.showNoSuffixDeclensionsSel).addEventListener('click', this.showNoSuffixDeclensions.bind(this));

        document.querySelectorAll('td[data-feature-values]').forEach(element => {
            element.addEventListener('mouseenter', this.cellMouseOver.bind(this));
            element.addEventListener('mouseleave', this.cellMouseOut.bind(this));
        });
    }

    hideEmptyColumns() {
        let emptyRows = document.querySelectorAll('th[data-header-level="3"][data-empty="true"]');
        for (let row of emptyRows) {
            let columnSel = row.dataset.columnValues;
            let rowCells = document.querySelectorAll('td[data-column-values="' + columnSel + '"]');
            for (let cell of rowCells) {
                cell.classList.add(this.emptyColumnClass);
            }
        }

        let headers = document.querySelectorAll('th');
        for (let header of headers) {
            if (header.dataset.empty === 'true') {
                header.classList.add(this.emptyColumnClass);
            }
            else if (header.dataset.columnsEmpty > 0) {
                header.setAttribute('colspan', header.dataset.columnsTotal - header.dataset.columnsEmpty);
            }
        }

        document.querySelector(this.showEmptyColumnSel).classList.remove(this.hiddenClass);
        document.querySelector(this.hideEmptyColumnSel).classList.add(this.hiddenClass);
    }

    showEmptyColumns() {
        document.querySelectorAll('.' + this.emptyColumnClass)
            .forEach(element => { element.classList.remove(this.emptyColumnClass) });

        let headers = document.querySelectorAll('th');
        for (let header of headers) {
            if (header.dataset.columnsEmpty > 0) {
                header.setAttribute('colspan', header.dataset.columnsTotal);
            }
        }

        document.querySelector(this.showEmptyColumnSel).classList.add(this.hiddenClass);
        document.querySelector(this.hideEmptyColumnSel).classList.remove(this.hiddenClass);
    }

    hideNoSuffixDeclensions() {
        let noSuffixRows = document.querySelectorAll('th[data-header-level="1"][data-suffix-match="false"]');
        for (let row of noSuffixRows) {
            let headerSel = row.dataset.columnValues;
            let cells = document.querySelectorAll('td[data-suffix-match="false"]');
            for (let cell of cells) {
                let cellValue = cell.dataset.featureValues;
                if (cellValue.includes(headerSel)) {
                    cell.classList.add(this.noSuffixColumnClass);
                }
            }

            cells = document.querySelectorAll('th[data-suffix-match="false"]');
            for (let cell of cells) {
                let cellValue = cell.dataset.columnValues;
                if (cellValue.includes(headerSel)) {
                    cell.classList.add(this.noSuffixColumnClass);
                }
            }
        }

        document.querySelector(this.showNoSuffixDeclensionsSel).classList.remove(this.hiddenClass);
        document.querySelector(this.hideNoSuffixDeclensionsSel).classList.add(this.hiddenClass);
    }

    showNoSuffixDeclensions() {
        document.querySelectorAll('.' + this.noSuffixColumnClass)
            .forEach(element => { element.classList.remove(this.noSuffixColumnClass) });

        document.querySelector(this.showNoSuffixDeclensionsSel).classList.add(this.hiddenClass);
        document.querySelector(this.hideNoSuffixDeclensionsSel).classList.remove(this.hiddenClass);
    }

    cellMouseOver(event) {
        let rowValues = event.target.dataset.rowValues;
        let columnValues = event.target.dataset.columnValues;
        let cells = document.querySelectorAll('td[data-row-values][data-column-values]');
        for (let cell of cells) {
            let cellRowValues = cell.dataset.rowValues;
            let cellColumnValues = cell.dataset.columnValues;
            if (cellRowValues.includes(rowValues) || cellColumnValues.includes(columnValues)) {
                cell.classList.add(this.highlightedClass);
            }
        }
    }

    cellMouseOut(event) {
        let highlightedClass = this.highlightedClass;
        document.querySelectorAll('.' + highlightedClass).forEach(element => {element.classList.remove(highlightedClass)});
    }
}

let presenter = new Presenter();

export default presenter;