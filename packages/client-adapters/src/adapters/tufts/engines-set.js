import Whitakers from '@/adapters/tufts/engine/whitakers'
import Morpheusgrc from '@/adapters/tufts/engine/morpheusgrc'
import Aramorph from '@/adapters/tufts/engine/aramorph'
import Hazm from '@/adapters/tufts/engine/hazm'
import Traces from '@/adapters/tufts/engine/traces'

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
