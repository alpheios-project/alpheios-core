import ImportData from '@clAdapters/transformers/import-morph-data.js'
import * as Models from 'alpheios-data-models'

const data = new ImportData(Models.ArabicLanguageModel, 'aramorph')

export default data
