// Import in a browser-friendly way
import * as Lib from '../../dist/inflection-tables.standalone.js'
import Presenter from './presenter.js'
import { Constants } from '../../node_modules/alpheios-data-models/dist/alpheios-data-models.js'
import AlpheiosTuftsAdapter from '../../node_modules/alpheios-tufts-adapter/dist/alpheios-tufts-adapter.standalone.js'

let langData = new Lib.LanguageData([Lib.LatinDataSet, Lib.GreekDataSet]).loadData()

let testCases = [
  {word: 'cupidinibus', value: 'latin_noun_cupidinibus', type: 'noun', language: 'Latin', languageCode: Constants.STR_LANG_CODE_LAT},
  {word: 'mare', value: 'latin_noun_adj_mare', type: 'noun, adjective', language: 'Latin', languageCode: Constants.STR_LANG_CODE_LAT},
  {word: 'cepit', value: 'latin_verb_cepit', type: 'regular verb', language: 'Latin', languageCode: Constants.STR_LANG_CODE_LAT},
  {word: 'φιλόσοφος', value: 'greek_noun_pilsopo', type: 'noun', language: 'Greek', languageCode: Constants.STR_LANG_CODE_GRC}
]
let selectList = document.querySelector('#test-selector')

for (const [index, testCase] of testCases.entries()) {
  let option = document.createElement('option')
  option.value = index
  option.text = `${testCase.word} (${testCase.language} ${testCase.type})`
  selectList.appendChild(option)
}

selectList.addEventListener('change', event => {
  if (event.target.value !== 'select') {
    let index = event.target.value
    show(testCases[index].languageCode, testCases[index].word)
  }
})

let show = function show (languageCode, word) {
  let maAdapter = new AlpheiosTuftsAdapter() // Morphological analyzer adapter
  maAdapter.getHomonym(languageCode, word).then(
    (homonym) => {
      // Get matching suffixes from an inflection library
      let wordData = langData.getSuffixes(homonym)
      // wordData.homonym.targetWord = word;

      // Insert rendered view to a page
      let wideView = document.querySelector('#infl-wide-view')
      let narrowView = document.querySelector('#infl-narrow-view')
      let footer = document.querySelector('#infl-footer')
      let viewSelectorContainer = document.querySelector('#view-switcher')
      let localeSwitcherContainer = document.querySelector('#locale-selector')
      new Presenter(wideView, narrowView, footer, viewSelectorContainer, localeSwitcherContainer, wordData).render()
    },
    (error) => {
      console.error(`Error is ${error}`)
    }
  )
}
