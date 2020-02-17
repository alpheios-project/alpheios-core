import ImportData from '../lib'
import * as Models from 'alpheios-data-models'

const data = new ImportData(Models.SyriacLanguageModel, 'sedra')

// the sedra api has some html in the glosses that we want to strip out
data.setMeaningParser(function(meaning,targetWord) {
  const lang = meaning.lang ? meaning.lang : 'eng'
  let meaning_text = meaning.$ || ""
  meaning_text = meaning_text.replace(/<span .*?>(.*?)<\/span>/g,"$1")
  return new Models.Definition(meaning_text, lang, 'text/plain', targetWord)
})

data.setPropertyParser(function (propertyName, propertyValue) {
  let propertyValues = []
  if (propertyName !== 'src') {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

export default data
