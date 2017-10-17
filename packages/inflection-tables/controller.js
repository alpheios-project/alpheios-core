'use strict';
// Import shared language data
import * as Lib from "./lib/lib";
import TuftsAdapter from "./analyzer/tufts/adapter";
import Presenter from "./presenter/presenter";

// Load language data
import * as LatinData from "./lib/lang/latin/latin";
import * as GreekData from "./lib/lang/greek/greek";
let langData = new Lib.LanguageData([LatinData.dataSet, GreekData.dataSet]).loadData();

let testCases = [
    {word: "cupidinibus (latin)", value: "latin_noun_cupidinibus", type: "noun"},
    {word: "mare (lating)", value: "latin_noun_adj_mare", type: "noun, adjective"},
    {word: "cepit (latin)", value: "latin_verb_cepit", type: "regular verb"},
    {word: "φιλόσοφος (greek)", value: "greek_noun_pilsopo", type: "noun"},
];
let selectList = document.querySelector("#test-selector");

for (const testCase of testCases) {
    let option = document.createElement("option");
    option.value = testCase.value;
    option.text = testCase.word + ' (' + testCase.type + ')';
    selectList.appendChild(option);
}

selectList.addEventListener('change', event => {
    if (event.target.value !== 'select') {
        show(event.target.selectedOptions[0].innerHTML, event.target.value);
    }
});


let show = function show(word, fileNameBase) {
    let dir = 'tests/data/';
    let extension = '.json';
    Lib.loadData(dir + fileNameBase + extension)
        .then(json => {
            json = JSON.parse(json);

            // Transform Morphological Analyzer's response into a library standard Homonym object
            let homonym = new TuftsAdapter().transform(json);

            // Get matching suffixes from an inflection library
            let resultSet = langData.getSuffixes(homonym);
            resultSet.word = word;

            // Insert rendered view to a page
            let presenter = new Presenter('#id-inflections-table', resultSet).render();

        }).catch(error => {
        console.error(error);
    });
};