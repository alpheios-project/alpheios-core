import { LanguageModelFactory as LMF, Constants } from 'alpheios-data-models'
import ConfigData from '@/config-data'

class TuftsConfigData extends ConfigData {
  uploadEngines (enginesConfig) {
    if (this.engine === undefined) {
      this.engine = {}
    }
    Object.keys(enginesConfig).forEach(langCode => {
      let langID = LMF.getLanguageIdFromCode(langCode)

      if (langID !== Constants.LANG_UNDEFINED && this.engine[langID] === undefined) {
        this.engine[langID] = enginesConfig[langCode]
      }
    })
  }

  get featuresArray () {
    return [
      ['pofs', 'part'],
      ['case', 'grmCase'],
      ['gend', 'gender'],
      ['decl', 'declension'],
      ['conj', 'conjugation'],
      ['area', 'area'],
      ['age', 'age'],
      ['geo', 'geo'],
      ['freq', 'frequency'],
      ['note', 'note'],
      ['pron', 'pronunciation'],
      ['kind', 'kind'],
      ['src', 'source']
    ]
  }

  get featuresArrayAll () {
    return [
      ['pofs', 'part'],
      ['case', 'grmCase'],
      ['decl', 'declension'],
      ['num', 'number'],
      ['gend', 'gender'],
      ['conj', 'conjugation'],
      ['tense', 'tense'],
      ['voice', 'voice'],
      ['mood', 'mood'],
      ['pers', 'person'],
      ['comp', 'comparison'],
      ['stemtype', 'stemtype'],
      ['derivtype', 'derivtype'],
      ['dial', 'dialect'],
      ['morph', 'morph']
    ]
  }
}

export default TuftsConfigData
