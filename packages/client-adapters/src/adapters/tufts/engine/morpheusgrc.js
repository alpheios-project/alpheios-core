import ImportData from '@clAdapters/transformers/import-morph-data.js'
import * as Models from 'alpheios-data-models'

let data = new ImportData(Models.GreekLanguageModel, 'morpheusgrc') // eslint-disable-line prefer-const

data.inflectionOverrides = {
  // Morpheus uses 'irregular' as pofs for some pronouns, override with lemma
  // the dictionary entry's conjugation if it's available
  [Models.Feature.types.part]: (i, ls) => Boolean(i[Models.Feature.types.part].value === Models.Constants.TYPE_IRREGULAR && ls.filter(l => l.features[Models.Feature.types.part].value === Models.Constants.POFS_PRONOUN)),
  // for some irregular adjectives, the compartive is only specified in the morph flags
  [Models.Feature.types.comparison]: (i, ls) => {
      if (i[Models.Feature.types.morph].value === 'irreg_comp' &&
      ls.filter(l => l.features[Models.Feature.types.part].value === Models.Constants.POFS_ADJECTIVE)) {
        return new Models.Feature(Models.Feature.types.comparison,Models.Constants.COMP_COMPARITIVE, Models.GreekLanguageModel.languageID)
      } else {
        return false
      }
    }
}
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
    inputElem.hdwd && inputElem.hdwd.$ === 'τίς') {
    propertyValues = [Models.Constants.POFS_PRONOUN]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

export default data
