import ImportData from '@clAdapters/transformers/import-morph-data.js'
import * as Models from 'alpheios-data-models'

const data = new ImportData(Models.SyriacLanguageModel, 'sedra')

// allow lexemes  if they have at least a meaning or a part of speech
data.setLexemeFilter(function (lexeme) {
  return Boolean(lexeme.meaning.shortDefs.length > 0 ||
    lexeme.lemma.features[Models.Feature.types.part])
})

//
data.setMeaningParser(function (meaning, targetWord) {
  const lang = meaning.lang ? meaning.lang : Models.Constants.STR_LANG_CODE_ENG
  let meaningText = meaning.$ || ''
  return new Models.Definition(meaningText, lang, 'text/html', targetWord)
})

data.setPropertyParser(function (propertyName, propertyValue, inputElem) {
  let propertyValues = []
  if (propertyName === 'paradigm') {
    // state has some extra "" around values
    propertyValues = [propertyValue.replace(/"/g, '')]
  } else if (propertyName === 'src') {
    // replace the '[from sedra.bethmardutho.org, accessed on XXXXX]' as duplicative
    // with rights
    propertyValues = [propertyValue.replace(/\[from sedra.bethmardutho.org, .*?\]/g, '')]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

export default data
