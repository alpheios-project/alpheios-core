import ImportData from '../lib'
import * as Models from 'alpheios-data-models'

let data = new ImportData(Models.GreekLanguageModel, 'morpheusgrc') // eslint-disable-line prefer-const

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */

data.addFeature(Models.Feature.types.gender).importer
  .map('masculine feminine', [[Models.Constants.GEND_MASCULINE, 1], [Models.Constants.GEND_FEMININE, 2]])

data.addFeature(Models.Feature.types.declension).importer
  .map('1st & 2nd', [[Models.Constants.ORD_1ST, 1], [Models.Constants.ORD_2ND, 2]])

data.setPropertyParser(function (propertyName, propertyValue, inputElem) {
  let propertyValues = []
  if (propertyName === 'decl') {
    propertyValues = propertyValue.split('&').map((p) => p.trim())
  } else if (propertyName === 'comp' && propertyValue === 'positive') {
    propertyValues = []
  } else if (propertyName === 'pofs' && propertyValue === 'irregular' &&
    ( inputElem.hdwd && inputElem.hdwd.$ === 'τίς' ) ||
    ( inputElem.term && inputElem.term.stem && inputElem.term.stem.$ === 'τίς' )) {
    propertyValues = [ Models.Constants.POFS_PRONOUN ]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

export default data
