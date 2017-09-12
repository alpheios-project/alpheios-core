'use strict';
// Import shared language data
import * as Lib from "./lib/lib.js";
import * as Tufts from "./analyzer/tufts/adapter.js";
import presenter from "./presenter/presenter.js";

// Load Latin language data
import * as ModuleNS from './lib/lang/latin/latin.js';
import {dataSet} from "./lib/lang/latin/latin";
let langData = ModuleNS.dataSet;
// Prepare lang data for first use
dataSet.loadData();


// region Test selector
let testCases = [
    {word: "cupidinibus", value: "latin_noun_cupidinibus"},
    {word: "mare", value: "latin_noun_adj_mare"}
];
let selectList = document.querySelector("#test-selector");

for (const testCase of testCases) {
    let option = document.createElement("option");
    option.value = testCase.value;
    option.text = testCase.word;
    selectList.appendChild(option);
}

selectList.addEventListener('change', event => {
    if (event.target.value !== 'select') {
        show(event.target.selectedOptions[0].innerHTML, event.target.value);
    }
});


let show = function show(word, fileNameBase) {
    console.log('Show started');

    let dir = 'tests/data/';
    let extension = '.json';
    Lib.loadData(dir + fileNameBase + extension)
        .then(json => {
            json = JSON.parse(json);

            // Transform Morphological Analyzer's response into a library standard Homonym object
            let result = Tufts.adapter.transform(json);

            // Get matching suffixes from an inflection library
            let resultSet = langData.getSuffixes(result);
            resultSet.word = word;

            // Insert rendered view to a page
            presenter.render('#id-inflections-table', resultSet);

            console.log('Show finished');
        }).catch(error => {
        console.error(error);
    });
};

// endregion Test selector



