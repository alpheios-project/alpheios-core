'use strict';
// Import shared language data
import * as Lib from "./lib/lib.js";
import * as Tufts from "./analyzer/tufts/adapter.js";
import * as Presenter from "./presenter/presenter.js";

// Load Latin language data
import * as ModuleNS from './lib/lang/latin/latin.js';
import {dataSet} from "./lib/lang/latin/latin";
let langData = ModuleNS.dataSet;


// Inserts rendered view to the specific element of the web page
let show = function show(html, whereSel) {
    "use strict";
    let selector = document.querySelector(whereSel);
    selector.innerHTML = html;
};


console.log('Sequence started');

let result;
Lib.loadData("tests/data/latin_noun_cupidinibus.json")
    .then(json => {
        json = JSON.parse(json);

        // Transform Morphological Analyzer's response into a library standard Homonym object
        result = Tufts.adapter.transform(json);

       dataSet.loadData();

        // Get matching suffixes from an inflection library
        let suffixes = langData.getSuffixes(result);

        // Make Presenter build a view's HTML
        let html = Presenter.render(suffixes);

        // Insert rendered view to a page
        show(html, '#id-inflections-table');

        console.log('Sequence finished');
    }).catch(error => {
        console.error(error);
    });

