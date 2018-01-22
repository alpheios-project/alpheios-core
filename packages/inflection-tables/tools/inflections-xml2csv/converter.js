const fs = require('fs')
const path = require('path')
const {DOMParser} = require('xmldom')
const xmlToJSON = require('xmltojson')
// A workaround for Node.js environment
xmlToJSON.stringToXML = (string) => new DOMParser().parseFromString(string, 'text/xml')
const csvParser = require('babyparse')

const config = {
  latin: {
    inputBaseDir: 'data/latin/',
    outputBaseDir: '../../lib/lang/latin/data/',

    noun: {
      inputFN: 'alph-infl-noun.xml',
      outputSubDir: 'noun/',
      suffixes: {
        outputFN: 'suffixes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.noun.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          let result = []

          for (const group of data) {
            // Iterate over group's individual items
            for (const suffix of group['infl-ending']) {
              let footnote = ''
              if (suffix['_attr'].hasOwnProperty('footnote')) {
                // There can be multiple footnotes separated by spaces
                footnote = config.latin.noun.footnotes.normalizeIndex(suffix['_attr']['footnote']['_value'])
              }
              result.push({
                'Ending': suffix['_text'],
                'Number': group['_attr']['num']['_value'],
                'Case': group['_attr']['case']['_value'],
                'Declension': group['_attr']['decl']['_value'],
                'Gender': group['_attr']['gend']['_value'],
                'Type': suffix['_attr']['type']['_value'],
                'Footnote': footnote
              })
            }
          }
          return csvParser.unparse(result)
        }

      },
      footnotes: {
        outputFN: 'footnotes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.noun.outputSubDir, this.outputFN)
        },
        normalizeIndex (index) {
          // There can be multiple footnotes separated by spaces
          let t = index.replace(/[^\d\s]/g, '')
          return t
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0].footnotes[0].footnote
          let result = []

          // Skip the first item
          for (let i = 1; i < data.length; i++) {
            result.push({
              'Index': this.normalizeIndex(data[i]['_attr'].id['_value']),
              'Text': data[i]['_text']
            })
          }
          return csvParser.unparse(result)
        }
      }
    },

    pronoun: {
      inputFN: 'alph-pronoun.xml',
      outputSubDir: 'pronoun',
      suffixes: {
        outputFN: 'forms.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.pronoun.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let results = []
          for (const classGroup of json['infl-data'][0]['pronoun-data-set']) {
            let className = classGroup['_attr']['class']['_value']
            for (const formGroup of classGroup['infl-form-set']) {
              let person = formGroup['_attr']['pers'] ? formGroup['_attr']['pers']['_value'] : ''
              let number = formGroup['_attr']['num'] ? formGroup['_attr']['num']['_value'] : ''
              let grmCase = formGroup['_attr']['case']['_value']

              // Iterate over individual items of a class group
              if (formGroup['infl-form']) {
                // There is an `infl-form` node
                for (const form of formGroup['infl-form']) {
                  let type = form['_attr']['type']['_value']
                  let alt = form['_attr'].hasOwnProperty('alt')
                    ? config.latin.pronoun.footnotes.normalizeIndex(form['_attr']['alt']['_value'])
                    : ''
                  let footnote = form['_attr'].hasOwnProperty('footnote')
                    ? config.latin.pronoun.footnotes.normalizeIndex(form['_attr']['footnote']['_value'])
                    : ''
                  results.push({
                    'Class': className,
                    'Person': person,
                    'Number': number,
                    'Case': grmCase,
                    'Type': type,
                    'Form': form['_text'],
                    'Alt': alt,
                    'Footnote': footnote
                  })
                }
              } else {
                // There is no `infl-form` node
                results.push({
                  'Class': className,
                  'Person': person,
                  'Number': number,
                  'Case': grmCase,
                  'Type': '',
                  'Form': '',
                  'Alt': '',
                  'Footnote': ''
                })
              }
            }
          }
          return csvParser.unparse(results)
        }

      },
      footnotes: {
        outputFN: 'footnotes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.pronoun.outputSubDir, this.outputFN)
        },
        normalizeIndex (index) {
          // There can be multiple footnotes separated by spaces
          let t = index.replace(/[^\d\s]/g, '')
          return t
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0].footnotes[0].footnote
          let result = []

          // Skip the first item
          for (let footnote of data) {
            result.push({
              'Index': this.normalizeIndex(footnote['_attr'].id['_value']),
              'Text': footnote['_text']
            })
          }
          return csvParser.unparse(result)
        }
      }
    },

    adjective: {
      inputFN: 'alph-infl-adjective.xml',
      outputSubDir: 'adjective/',
      suffixes: {
        outputFN: 'suffixes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.adjective.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          let result = []

          for (const group of data) {
            // Iterate over group's individual items
            for (const suffix of group['infl-ending']) {
              let footnote = ''
              if (suffix['_attr'].hasOwnProperty('footnote')) {
                // There can be multiple footnotes separated by spaces
                footnote = config.latin.noun.footnotes.normalizeIndex(suffix['_attr']['footnote']['_value'])
              }
              result.push({
                'Ending': suffix['_text'],
                'Number': group['_attr']['num']['_value'],
                'Case': group['_attr']['case']['_value'],
                'Declension': group['_attr']['decl']['_value'],
                'Gender': group['_attr']['gend']['_value'],
                'Type': suffix['_attr']['type']['_value'],
                'Footnote': footnote
              })
            }
          }
          return csvParser.unparse(result)
        }

      },
      footnotes: {
        outputFN: 'footnotes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.adjective.outputSubDir, this.outputFN)
        },
        normalizeIndex (index) {
          // There can be multiple footnotes separated by spaces
          let t = index.replace(/[^\d\s]/g, '')
          return t
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0].footnotes[0].footnote
          let result = []

          // Skip the first item
          for (let i = 1; i < data.length; i++) {
            result.push({
              'Index': this.normalizeIndex(data[i]['_attr'].id['_value']),
              'Text': data[i]['_text']
            })
          }
          return csvParser.unparse(result)
        }
      }
    },

    verb: {
      inputFN: 'alph-verb-conj.xml',
      outputSubDir: 'verb/',
      suffixes: {
        outputFN: 'suffixes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.verb.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          let result = []

          for (const group of data) {
            // Iterate over group's individual items
            if (group['infl-ending']) {
              for (const suffix of group['infl-ending']) {
                let footnote = ''
                if (suffix['_attr'].hasOwnProperty('footnote')) {
                  // There can be multiple footnotes separated by spaces
                  footnote = config.latin.noun.footnotes.normalizeIndex(suffix['_attr']['footnote']['_value'])
                }
                result.push({
                  'Ending': suffix['_text'],
                  'Conjugation': group['_attr']['conj']['_value'],
                  'Voice': group['_attr']['voice']['_value'],
                  'Mood': group['_attr']['mood']['_value'],
                  'Tense': group['_attr']['tense']['_value'],
                  'Number': group['_attr']['num']['_value'],
                  'Person': group['_attr']['pers']['_value'],
                  'Type': suffix['_attr']['type']['_value'],
                  'Footnote': footnote
                })
              }
            } else {
              // There is no ending defined for this group.
              result.push({
                'Ending': '',
                'Conjugation': group['_attr']['conj']['_value'],
                'Voice': group['_attr']['voice']['_value'],
                'Mood': group['_attr']['mood']['_value'],
                'Tense': group['_attr']['tense']['_value'],
                'Number': group['_attr']['num']['_value'],
                'Person': group['_attr']['pers']['_value'],
                'Footnote': ''
              })
            }
          }
          return csvParser.unparse(result)
        }

      },
      footnotes: {
        outputFN: 'footnotes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.verb.outputSubDir, this.outputFN)
        },
        normalizeIndex (index) {
          // There can be multiple footnotes separated by spaces
          return index.replace(/[^\d\s]/g, '')
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0].footnotes[0].footnote
          let result = []

          // Skip the first item
          for (let i = 1; i < data.length; i++) {
            let text = data[i]['_text']
            text = text.replace(/\s+/g, ' ') // Replace multiple whitespace characters with a single space
            result.push({
              'Index': this.normalizeIndex(data[i]['_attr'].id['_value']),
              'Text': text
            })
          }
          return csvParser.unparse(result)
        }
      }
    },

    lemma: {
      inputFN: 'alph-verb-conj-irreg.xml',
      outputSubDir: 'verb/',
      forms: {
        outputFN: 'forms.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.lemma.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['conjugation']
          let result = []
          for (const conj of data) {
            let [lemma, ...principalParts] = conj['hdwd-set'][0]['hdwd'][0]['_text'].split(/,/).map((h) => h.trim())
            for (const group of conj['infl-form-set']) {
              // Iterate over group's individual items
              if (group['infl-form']) {
                for (const form of group['infl-form']) {
                  let footnote = ''
                  if (form['_attr'].hasOwnProperty('footnote')) {
                    // There can be multiple footnotes separated by spaces
                    footnote = config.latin.lemma.footnotes.normalizeIndex(form['_attr']['footnote']['_value'])
                  }
                  result.push({
                    'Lemma': lemma,
                    'PrincipalParts': principalParts.join('_'),
                    'Form': form['_text'],
                    'Voice': group['_attr']['voice'] ? group['_attr']['voice']['_value'] : '',
                    'Mood': group['_attr']['mood'] ? group['_attr']['mood']['_value'] : '',
                    'Tense': group['_attr']['tense'] ? group['_attr']['tense']['_value'] : '',
                    'Number': group['_attr']['num'] ? group['_attr']['num']['_value'] : '',
                    'Person': group['_attr']['pers'] ? group['_attr']['pers']['_value'] : '',
                    'Footnote': footnote
                  })
                }
              }
            }
          }
          return csvParser.unparse(result)
        }

      },
      footnotes: {
        outputFN: 'form_footnotes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.lemma.outputSubDir, this.outputFN)
        },
        normalizeIndex (index) {
          // There can be multiple footnotes separated by spaces
          return index.replace(/[^\d\s]/g, '')
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0].footnotes[0].footnote
          let result = []

          for (let i = 0; i < data.length; i++) {
            let text = data[i]['_text']
            text = text.replace(/\s+/g, ' ') // Replace multiple whitespace characters with a single space
            result.push({
              'Index': this.normalizeIndex(data[i]['_attr'].id['_value']),
              'Text': text
            })
          }
          return csvParser.unparse(result)
        }
      }
    }
  },

  greek: {
    inputBaseDir: 'data/greek/',
    outputBaseDir: '../../lib/lang/greek/data/',

    noun: {
      inputFN: 'alph-infl-noun.xml',
      outputSubDir: 'noun/',
      suffixes: {
        outputFN: 'suffixes.csv',
        get outputPath () {
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.noun.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          let result = []

          for (const group of data) {
            // Iterate over group's individual items
            for (const suffix of group['infl-ending']) {
              let type = suffix['_attr']['type']['_value']
              let primary = ''
              let typeArray = type.split(' ')
              if (typeArray.length > 2) {
                throw new Error('Type value is expected to contain up to two word.')
              } else if (typeArray.length > 1) {
                // Array probably contain two values, one of which is 'primary'
                let primaryIndex = typeArray.indexOf('primary')
                if (primaryIndex > -1) {
                  primary = 'primary'
                  typeArray.splice(primaryIndex, 1)
                  type = typeArray[0]
                } else {
                  throw new Error('Type value is expected to contain up to two words, ' +
                    'one of them should be "primary".')
                }
              }

              let footnote = ''
              if (suffix['_attr'].hasOwnProperty('footnote')) {
                // There can be multiple footnotes separated by spaces
                footnote = config.greek.noun.footnotes.normalizeIndex(suffix['_attr']['footnote']['_value'])
              }
              result.push({
                'Ending': suffix['_text'],
                'Number': group['_attr']['num']['_value'],
                'Case': group['_attr']['case']['_value'],
                'Declension': group['_attr']['decl']['_value'],
                'Gender': group['_attr']['gend']['_value'],
                'Type': type,
                'Primary': primary,
                'Footnote': footnote
              })
            }
          }
          return csvParser.unparse(result)
        }

      },
      footnotes: {
        outputFN: 'footnotes.csv',
        get outputPath () {
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.noun.outputSubDir, this.outputFN)
        },
        normalizeIndex (index) {
          // There can be multiple footnotes separated by spaces
          return index.replace(/[^\d\s]/g, '')
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0].footnotes[0].footnote
          let result = []

          for (let i = 0; i < data.length; i++) {
            result.push({
              'Index': this.normalizeIndex(data[i]['_attr'].id['_value']),
              'Text': data[i]['_text']
            })
          }
          // Sort result according to index number.
          result = result.sort((a, b) => parseInt(a.Index, 10) - parseInt(b.Index, 10))
          return csvParser.unparse(result)
        }
      }
    }
  }
}

let readFile = function readFile (filePath) {
  'use strict'
  return fs.readFileSync(filePath, 'utf8')
}

let writeData = function writeData (data, filePath) {
  'use strict'
  fs.writeFileSync(filePath, data, {encoding: 'utf8'})
}

const LANG_ALL = 'all'
const LANG_LATIN = 'latin'
const LANG_GREEK = 'greek'
const POS_ALL = 'all'
const POS_NOUN = 'noun'
const POS_PRONOUN = 'pronoun'
const POS_ADJECTIVE = 'adjective'
const POS_VERB = 'verb'
const POS_LEMMA = 'lemma'

/*
 To convert flies selectively a script can take the following parameters: <language> <part of speech>, where
  Language is either 'latin', 'greek', or 'all' (to process all languages)
  Part of speech is either 'noun', 'pronoun', 'adjective', 'verb' (for regular verbs), 'lemma' (for irregular verbs),
  or 'all' (to process all parts of speech)
 */
if (process.argv.length < 4) {
  console.log(`Please run the script with the following parameters: <language> (latin/greek/all) <part of speech> (noun/pronoun/adjective/verb/lemma/all)`)
  process.exit(1)
}
let langName = process.argv[2]
let posName = process.argv[3]

try {
  let data
  let json

  // region Latin
  if (langName === LANG_LATIN || langName === LANG_ALL) {
    let lCfg = config[LANG_LATIN]
    let posCfg
     // Nouns
    if (posName === POS_NOUN || posName === POS_ALL) {
      posCfg = lCfg[POS_NOUN]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }

    if (posName === POS_PRONOUN || posName === POS_ALL) {
      posCfg = lCfg[POS_PRONOUN]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }

    // Adjectives
    if (posName === POS_ADJECTIVE || posName === POS_ALL) {
      posCfg = lCfg[POS_ADJECTIVE]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
      // Skip converting adjective footnotes. It has to be done manually because of HTML tags within footnote texts
      // writeData(latin.adjective.footnotes.get(json), latin.adjective.footnotes.outputPath);
    }

    // Verbs
    if (posName === POS_VERB || posName === POS_ALL) {
      posCfg = lCfg[POS_VERB]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
      // Skip converting adjective footnotes. It has to be done manually because of HTML tags within footnote texts
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }

    // Lemmas
    if (posName === POS_LEMMA || posName === POS_ALL) {
      posCfg = lCfg[POS_LEMMA]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.forms.get(json), posCfg.forms.outputPath)
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }
  }
  // endregion Latin

  // region Greek
  if (langName === LANG_GREEK || langName === LANG_ALL) {
    let lCfg = config[LANG_GREEK]
    let posCfg
    if (posName === POS_NOUN || posName === POS_ALL) {
      posCfg = lCfg[POS_NOUN]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }
  }
  // endregion Greek
} catch (e) {
  console.log('Error:', e.stack)
}
