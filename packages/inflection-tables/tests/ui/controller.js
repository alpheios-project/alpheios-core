// Import shared language data
import * as Lib from "../../dist/inflection-tables.js";
// Browser cannot resolve node.js packages
import AlpheiosTuftsAdapter from '../../node_modules/alpheios-tufts-adapter/dist/alpheios-tufts-adapter.js';

// Load language data
//import * as LatinData from "../../lib/lang/latin/latin";
//import * as GreekData from "../../lib/lang/greek/greek";
let langData = new Lib.LanguageData([Lib.LatinDataSet, Lib.GreekDataSet]).loadData();

let testCases = [
    {word: "cupidinibus", value: "latin_noun_cupidinibus", type: "noun", language: 'latin'},
    {word: "mare", value: "latin_noun_adj_mare", type: "noun, adjective", language: 'latin'},
    {word: "cepit", value: "latin_verb_cepit", type: "regular verb", language: 'latin'}
    // Cannot test this until Greek language model is ready
    //{word: "φιλόσοφος", value: "greek_noun_pilsopo", type: "noun", language: 'greek'}
];
let selectList = document.querySelector("#test-selector");

for (const [index, testCase] of testCases.entries()) {
    let option = document.createElement("option");
    option.value = index;
    option.text = `${testCase.word} (${testCase.language} ${testCase.type})`;
    selectList.appendChild(option);
}

selectList.addEventListener('change', event => {
    if (event.target.value !== 'select') {
        let index = event.target.value;
        show(testCases[index].language, testCases[index].word);
    }
});


let show = function show(language, word) {
    let dir = 'tests/data/';
    let extension = '.json';
    let adapterArgs = { engine: { lat: "whitakerLat"},
        url: "http://morph.alpheios.net/api/v1/analysis/word?word=r_WORD&engine=r_ENGINE&lang=r_LANG"};
    let maAdapter = new AlpheiosTuftsAdapter(adapterArgs); // Morphological analyzer adapter
    maAdapter.fetch = maAdapter.fetchTestData; // Switch adapter to a test mode
    //let homonym = await this.maAdapter.getHomonym(selectedWord.language, selectedWord.word);
    // Transform Morphological Analyzer's response into a library standard Homonym object
    //let homonym = new TuftsAdapter({}).transform(json, word);
    maAdapter.getHomonym(language, word).then(
        (homonym) => {
            // Get matching suffixes from an inflection library
            let wordData = langData.getSuffixes(homonym);
            //wordData.homonym.targetWord = word;

            // Insert rendered view to a page
            let container = document.querySelector('#id-inflections-table');
            let viewSelectorContainer = document.querySelector('#view-switcher');
            let localeSwitcherContainer = document.querySelector('#locale-selector');
            new Lib.Presenter(container, viewSelectorContainer, localeSwitcherContainer, wordData).render();
        },
        (error) => {
            console.error(`Error is ${error}`);
        }
    )
};