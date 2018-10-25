import Whitakers from '@/tufts/engine/whitakers'
import Morpheusgrc from '@/tufts/engine/morpheusgrc'
import Aramorph from '@/tufts/engine/aramorph'
import Hazm from '@/tufts/engine/hazm'
import Traces from '@/tufts/engine/traces'

import { LanguageModelFactory as LMF } from 'alpheios-data-models'

class EnginesSet {
  constructor (adapterConfigEngines) {
    this.engine = adapterConfigEngines
  }

  getEngineByCode (languageID) {
    if (this.engine[languageID]) {
      let engineCode = this.engine[languageID][0]
      let allEngines = new Map(([ Whitakers, Morpheusgrc, Aramorph, Hazm, Traces ]).map((e) => { return [ e.engine, e ] }))
      return allEngines.get(engineCode)
    }
  }

  getEngineByCodeFromLangCode (languageCode) {
    let languageID = LMF.getLanguageIdFromCode(languageCode)
    return this.getEngineByCode(languageID)
  }
}

export default EnginesSet
