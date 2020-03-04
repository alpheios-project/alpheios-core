import ImportData from '../lib'
import * as Models from 'alpheios-data-models'

const data = new ImportData(Models.SyriacLanguageModel, 'sedra')

// the sedra api has some html in the glosses that we want to strip out
data.setMeaningParser(function(meaning,targetWord) {
  const lang = meaning.lang ? meaning.lang : Models.Constants.STR_LANG_CODE_ENG
  let meaning_text = meaning.$ || ""
  return new Models.Definition(meaning_text, lang, 'text/html', targetWord)
})

data.setPropertyParser(function (propertyName, propertyValue) {
  let propertyValues = []
  if (propertyName === 'paradigm') {
     // state has some extra "" around values
     propertyValues = [ propertyValue.replace(/"/g,'') ]
  } else if (propertyName === 'src') {
    // replace the '[from sedra.bethmardutho.org, accessed on XXXXX]' as duplicative
    // with rights
    propertyValues = [ propertyValue.replace(/\[from sedra.bethmardutho.org, .*?\]/g,'') ]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

export default data
