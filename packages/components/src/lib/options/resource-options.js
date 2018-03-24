import {LanguageModelFactory, Constants} from 'alpheios-data-models'

let codes = {
  greek: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_GREEK),
  latin: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_LATIN),
  persian: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_PERSIAN),
  arabic: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_ARABIC)
}

export default class ResourceOptions {
  /**
   * ResourceOptions is a class which encapsulates defaults and user preferences
   * for settings related to language specific resources such as Lexicons and Grammars
   */
  constructor (loader, saver) {
    this.items = ResourceOptions.initItems(this)
    this.loader = loader
    this.saver = saver
  }

  static get defaults () {
    return {
      // TODO we should actually pull the defaults from the LexiconClient itself
      // this is provisional for the alpha release
      lexicons: {
        labelText: 'Lexicons',
        languages: {
          [codes.greek]: {
            defaultValue: ['https://github.com/alpheios-project/lsj'],
            labelText: 'Greek Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/ml', text: 'Middle Liddell'},
              {value: 'https://github.com/alpheios-project/lsj', text: 'Liddell, Scott, Jones'},
              {value: 'https://github.com/alpheios-project/aut', text: 'Autenrieth Homeric Lexicon'},
              {value: 'https://github.com/alpheios-project/dod', text: 'Dodson'},
              {value: 'https://github.com/alpheios-project/as', text: 'Abbott-Smith'}
            ]
          },
          [codes.latin]: {
            defaultValue: ['https://github.com/alpheios-project/ls'],
            labelText: 'Latin Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/ls', text: 'Lewis & Short'}
            ]
          },
          [codes.arabic]: {
            defaultValue: ['https://github.com/alpheios-project/lan'],
            labelText: 'Arabic Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/lan', text: 'Lane'},
              {value: 'https://github.com/alpheios-project/sal', text: 'Salmone'}
            ]
          },
          [codes.persian]: {
            defaultValue: ['https://github.com/alpheios-project/stg'],
            labelText: 'Persian Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/stg', text: 'Steingass'}
            ]
          }
        }
      }
    }
  }

  static initItems (instance) {
    let items = {}
    for (let [option, langs] of Object.entries(ResourceOptions.defaults)) {
      items[option] = []
      for (let [key, item] of Object.entries(langs.languages)) {
        item.currentValue = item.defaultValue
        item.name = `${option}-${key}`
        item.textValues = function () {
          return this.values.map(value => value.text)
        }
        item.currentTextValue = function () {
          let currentTextValues = []
          for (let value of this.values) {
            if (this.currentValue.includes(value.value)) { currentTextValues.push(value.text) }
          }
          return currentTextValues
        }
        item.setValue = function (value) {
          item.currentValue = value
          instance.save(item.name, item.currentValue)
          return this
        }
        item.setTextValue = function (textValues) {
          item.currentValue = []
          for (let value of item.values) {
            for (let textValue of textValues) {
              if (value.text === textValue) { item.currentValue.push(value.value) }
            }
          }
          instance.save(item.name, item.currentValue)
          return this
        }
        items[option].push(item)
      }
    }
    return items
  }

  get names () {
    return Object.keys(this.items)
  }

  /**
   * Will always return a resolved promise.
   */
  load (callbackFunc) {
    this.loader().then(
      values => {
        for (let key in values) {
          let keyinfo = this.parseKey(key)
          if (this.items.hasOwnProperty(keyinfo.setting)) {
            this.items[keyinfo.setting].forEach((f) => { if (f.name === key) { f.currentValue = JSON.parse(values[key]) } })
          }
        }
        callbackFunc(this)
      },
      error => {
        console.error(`Cannot retrieve options for Alpheios extension from a local storage: ${error}. Default values
          will be used instead`)
        callbackFunc(this)
      }
    )
  }

  /**
  * Parse a stored setting name into its component parts
  * (for simplicity of the data structure, setting names are stored under
  * keys which combine the setting and the language)
  */
  parseKey (name) {
    let [setting, language] = name.split('-')
    return {
      setting: setting,
      language: language
    }
  }

  save (optionName, optionValue) {
    // Update value in the local storage
    let option = {}
    option[optionName] = JSON.stringify(optionValue)

    this.saver(option).then(
      () => {
        // Options storage succeeded
        console.log(`Value "${optionValue}" of "${optionName}" option value was stored successfully`)
      },
      (errorMessage) => {
        console.error(`Storage of an option value failed: ${errorMessage}`)
      }
    )
  }
}
