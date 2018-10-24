import { LanguageModelFactory as LMF, Constants } from 'alpheios-data-models'

class ConfigData {
  constructor (config, defaultConfig) {
    Object.keys(config).forEach(configKey => {
      this[configKey] = config[configKey]
    })

    Object.keys(defaultConfig).forEach(configKey => {
      if (configKey === 'engine') {
        this.uploadEngines(defaultConfig[configKey])
      } else {
        if (this[configKey] === undefined) {
          this[configKey] = defaultConfig[configKey]
        }
      }
    })
  }

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

export default ConfigData
