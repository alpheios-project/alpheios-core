const fs = require('fs')
const path = require('path')
const {DOMParser} = require('xmldom')
const xmlToJSON = require('xmltojson')
// A workaround for Node.js environment
xmlToJSON.stringToXML = (string) => new DOMParser().parseFromString(string, 'text/xml')
const csvParser = require('papaparse')

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
          let dataSetNum = 1
          for (const classGroup of json['infl-data'][0]['pronoun-data-set']) {
            let className = classGroup['_attr']['class']['_value']

            // If there are any headwords
            let headwords = ''
            if (classGroup['hdwd-set']) {
              for (const hdwd of classGroup['hdwd-set'][0]['hdwd']) {
                if (headwords) headwords += ';'
                headwords += hdwd['_text']
              }
            }
            for (const formGroup of classGroup['infl-form-set']) {
              let person = formGroup['_attr']['pers'] ? formGroup['_attr']['pers']['_value'] : ''
              let number = formGroup['_attr']['num'] ? formGroup['_attr']['num']['_value'] : ''
              let grmCase = formGroup['_attr']['case']['_value']

              // Iterate over individual items of a class group
              if (formGroup['infl-form']) {
                // There is an `infl-form` node
                for (const form of formGroup['infl-form']) {
                  let type = form['_attr']['type']['_value']
                  let footnote = form['_attr'].hasOwnProperty('footnote')
                    ? config.latin.pronoun.footnotes.normalizeIndex(form['_attr']['footnote']['_value'])
                    : ''
                  results.push({
                    'Form Set': dataSetNum,
                    'Headwords': headwords,
                    'Class': className,
                    'Person': person,
                    'Number': number,
                    'Case': grmCase,
                    'Type': type,
                    'Form': form['_text'],
                    'Footnote': footnote
                  })
                }
              } else {
                // There is no `infl-form` node
                results.push({
                  'Form Set': dataSetNum,
                  'Headwords': headwords,
                  'Class': className,
                  'Person': person,
                  'Number': number,
                  'Case': grmCase,
                  'Type': '',
                  'Form': '',
                  'Footnote': ''
                })
              }
            }
            dataSetNum++
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
      inputFN: ['alph-verb-conj.xml', 'alph-verb-conj-supp.xml'],
      outputSubDir: 'verb/',
      suffixes: {
        outputFN: 'suffixes.csv',
        get outputPath () {
          return path.join(__dirname, config.latin.outputBaseDir, config.latin.verb.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          for (let d of json['infl-data']) {
            data.push(...d['infl-endings'][0]['infl-ending-set'])
          }

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
                  'Tense': group['_attr']['tense'] ? group['_attr']['tense']['_value'] : '',
                  'Number': group['_attr']['num'] ? group['_attr']['num']['_value'] : '',
                  'Person': group['_attr']['pers'] ? group['_attr']['pers']['_value'] : '',
                  'Case': group['_attr']['case'] ? group['_attr']['case']['_value'] : '',
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
                'Tense': group['_attr']['tense'] ? group['_attr']['tense']['_value'] : '',
                'Number': group['_attr']['num'] ? group['_attr']['num']['_value'] : '',
                'Person': group['_attr']['pers'] ? group['_attr']['pers']['_value'] : '',
                'Case': group['_attr']['case'] ? group['_attr']['case']['_value'] : '',
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
    },

    adjective: {
      inputFN: 'alph-infl-adjective.xml',
      outputSubDir: 'adjective/',
      suffixes: {
        outputFN: 'suffixes.csv',
        get outputPath () {
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.adjective.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          let result = []

          for (const group of data) {
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
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.adjective.outputSubDir, this.outputFN)
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
    },

    article: {
      inputFN: 'alph-infl-article.xml',
      outputSubDir: 'article/',
      suffixes: {
        outputFN: 'forms.csv',
        get outputPath () {
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.article.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'

          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          let result = []

          for (const group of data) {
            for (const form of group['infl-ending']) {
              let type = form['_attr']['type']['_value']
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
              if (form['_attr'].hasOwnProperty('footnote')) {
                // There can be multiple footnotes separated by spaces
                footnote = config.greek.noun.footnotes.normalizeIndex(form['_attr']['footnote']['_value'])
              }

              result.push({
                'Form': form['_text'],
                'Number': group['_attr']['num']['_value'],
                'Case': group['_attr']['case']['_value'],
                'Gender': group['_attr']['gend']['_value'],
                'Type': type,
                'Primary': primary
              })
            }
          }
          return csvParser.unparse(result)
        }
      }
    },

    numeral: {
      inputFN: 'alph-infl-numeral.xml',
      outputSubDir: 'numeral/',
      forms: {
        outputFN: 'forms.csv',
        get outputPath () {
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.numeral.outputSubDir, this.outputFN)
        },
        get (json) {
          'use strict'
          let data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
          let result = []

          for (const group of data) {
            for (const form of group['infl-ending']) {
              let type = form['_attr']['type']['_value']
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
              if (form['_attr'].hasOwnProperty('footnote')) {
                // There can be multiple footnotes separated by spaces
                footnote = config.greek.numeral.footnotes.normalizeIndex(form['_attr']['footnote']['_value'])
              }

              result.push({
                'Form': form['_text'],
                'Headword': group['_attr']['hdwd']['_value'],
                'Number': group['_attr']['num']['_value'],
                'Case': group['_attr']['case']['_value'],
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
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.numeral.outputSubDir, this.outputFN)
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
    },

    pronoun: {
      inputFiles: [
        { name: 'alph-infl-pronoun-dem.xml', class: 'demonstrative' },
        { name: 'alph-infl-pronoun-genrel.xml', class: 'general relative' },
        { name: 'alph-infl-pronoun-indef.xml', class: 'indefinite' },
        { name: 'alph-infl-pronoun-inten.xml', class: 'intensive' },
        { name: 'alph-infl-pronoun-inter.xml', class: 'interrogative' },
        { name: 'alph-infl-pronoun-pers.xml', class: 'personal' },
        // Eliminate possessive pronouns for now because of complexities with person
        /* { name: 'alph-infl-pronoun-pos.xml', class: 'possessive' },
        { name: 'alph-infl-pronoun-pos1.xml', class: 'possessive' },
        { name: 'alph-infl-pronoun-pos2.xml', class: 'possessive' },
        { name: 'alph-infl-pronoun-pos3.xml', class: 'possessive' }, */
        { name: 'alph-infl-pronoun-recip.xml', class: 'reciprocal' },
        { name: 'alph-infl-pronoun-refl.xml', class: 'reflexive' },
        { name: 'alph-infl-pronoun-rel.xml', class: 'relative' }
      ],
      outputSubDir: 'pronoun/',
      forms: {
        outputFN: 'forms.csv',
        get outputPath () {
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.pronoun.outputSubDir, this.outputFN)
        },
        getFromFiles (files, inputBaseDir) {
          let forms = []
          let footnotes = []
          let footnoteBase = 0
          for (const file of files) {
            let data = readFile(path.join(__dirname, inputBaseDir, file.name))
            const json = xmlToJSON.parseString(data)
            data = json['infl-data'][0]['infl-endings'][0]['infl-ending-set']
            let grmClass = file.class

            for (const group of data) {
              let person = group['_attr'].hasOwnProperty('pers') ? group['_attr']['pers']['_value'].replace(' and ', ',').replace(', ', ',') : ''
              let headword = group['_attr'].hasOwnProperty('hdwd') ? group['_attr']['hdwd']['_value'] : ''
              // Probably don't need that
              // let objectNumber = group['_attr'].hasOwnProperty('objnum') ? group['_attr']['objnum']['_value'] : ''
              let number = group['_attr']['num']['_value']
              let grmCase = group['_attr']['case']['_value']
              let gender = group['_attr'].hasOwnProperty('gend') ? group['_attr']['gend']['_value'] : ''

              // Iterate over endings
              for (const formData of group['infl-ending']) {
                let type = formData['_attr']['type']['_value']
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

                let dialects = formData['_attr'].hasOwnProperty('dialects') ? formData['_attr']['dialects']['_value'] : ''

                let footnote = ''
                if (formData['_attr'].hasOwnProperty('footnote')) {
                  // There can be multiple footnotes separated by spaces
                  let footnotes = formData['_attr']['footnote']['_value'].match(/\d+/g)
                  if (footnotes) {
                    footnotes = footnotes.map(value => footnoteBase + parseInt(value, 10))
                    footnote = footnotes.join(',')
                  }
                }

                let form = {
                  'Form': formData['_text'],
                  'Headword': headword,
                  'Class': grmClass,
                  'Person': person,
                  'Number': number,
                  'Case': grmCase,
                  'Gender': gender,
                  'Type': type,
                  'Primary': primary,
                  'Dialects': dialects,
                  'Footnote': footnote
                }
                forms.push(form)
              }
            }

            // Footnotes
            if (json['infl-data'][0].hasOwnProperty('footnotes')) {
              const footnoteItems = json['infl-data'][0].footnotes[0].footnote

              for (const footnoteItem of footnoteItems) {
                let text = footnoteItem['_text'].replace(/\s+/g, ' ') // Replace multiple whitespace characters with a single space
                let index = this.normalizeIndex(footnoteItem['_attr'].id['_value'])
                footnotes.push({
                  'Index': footnoteBase + parseInt(index, 10),
                  'Text': text
                })
              }
            }
            footnoteBase = footnotes.length
          }
          return {
            forms: csvParser.unparse(forms),
            footnotes: csvParser.unparse(footnotes)
          }
        },
        normalizeIndex (index) {
          // There can be multiple footnotes separated by spaces
          return index.replace(/[^\d\s]/g, '')
        }
      },
      footnotes: {
        outputFN: 'footnotes.csv',
        get outputPath () {
          return path.join(__dirname, config.greek.outputBaseDir, config.greek.pronoun.outputSubDir, this.outputFN)
        }
      }
    },

    paradigm: {
      inputFileName: 'alph-infl-verb-paradigms.xml',
      outputVerbSubDir: 'verb/paradigm',
      outputVerbParticipleSubDir: 'verb-participle/paradigm',
      rulesFileName: 'rules.csv',
      footnotesFileName: 'footnotes.csv',
      createParadigmTables () {
        const creditsText = 'Verb paradigm tables derived from <a href="http://ucbclassics.dreamhosters.com/ancgreek/">Ancient Greek Tutorials</a>, by Donald J. Mastronarde, Berkeley Language Center of the University of California, Berkeley.<br>' +
          '©1999-2005 The Regents of the University of California.'
        let data = readFile(path.join(__dirname, config.greek.inputBaseDir, config.greek.paradigm.inputFileName))
        /*
           Replace all spans in titles so that they won't be parsed by xml2json because in that case it will be impossible to restore
           an order of fragments.
         */
        data = data.replace(/<span.*?>(.*?)<\/span>/g, '$1')
        const json = xmlToJSON.parseString(data)

        // Rules of matching
        data = json['infl-paradigms'][0]['morpheus-paradigm-match'][0]['match']
        let verbRules = []
        let verbRuleIDs = []
        let verbParticipleRules = []
        let verbParticipleRuleIDs = []
        for (const paradigm of data) {
          const id = paradigm['_attr']['paradigm_id_ref']['_value']
          const matchOrder = paradigm['_attr']['match_order']['_value']
          let partOfSpeech = ''
          let stemtype = ''
          let voice = ''
          let mood = ''
          let tense = ''
          let lemma = ''
          let morphFlags = ''
          let dialect = ''
          for (const constraint of paradigm['constraint']) {
            const name = constraint['_attr']['name']['_value']
            if (name === 'pofs') {
              partOfSpeech = constraint['_text']
            } else if (name === 'stemtype') {
              stemtype = constraint['_text']
            } else if (name === 'voice') {
              voice = constraint['_text']
            } else if (name === 'mood') {
              mood = constraint['_text']
            } else if (name === 'tense') {
              tense = constraint['_text']
            } else if (name === 'lemma') {
              lemma = constraint['_text']
            } else if (name === 'morphflags') {
              morphFlags = constraint['_text']
            } else if (name === 'dial') {
              dialect = constraint['_text']
            }
          }
          if (!partOfSpeech) {
            partOfSpeech = 'verb' // If not specified, set to verb by default
            verbRuleIDs.push(id)
          } else {
            // This is a verb participle
            verbParticipleRuleIDs.push(id)
          }
          let store = (partOfSpeech === 'verb_participle') ? verbParticipleRules : verbRules
          store.push({
            'ID ref': id,
            'Match order': matchOrder,
            'Part of speech': partOfSpeech,
            'Stem type': stemtype,
            'Voice': voice,
            'Mood': mood,
            'Tense': tense,
            'Lemma': lemma,
            'Morph flags': morphFlags,
            'Dialect': dialect
          })
        }
        writeData(csvParser.unparse(verbRules), path.join(__dirname, config.greek.outputBaseDir,
          config.greek.paradigm.outputVerbSubDir, config.greek.paradigm.rulesFileName))
        writeData(csvParser.unparse(verbParticipleRules), path.join(__dirname, config.greek.outputBaseDir,
          config.greek.paradigm.outputVerbParticipleSubDir, config.greek.paradigm.rulesFileName))

        // Tables
        data = json['infl-paradigms'][0]['infl-paradigm']
        for (const tableEntry of data) {
          let tableObject = {}
          tableObject.ID = tableEntry['_attr']['id']['_value']
          let index = tableObject.ID.replace('verbpdgm', '')
          if (index.length === 1) { index = '0' + index }
          tableObject.partOfSpeech = verbRuleIDs.includes(tableObject.ID) ? 'verb' : 'verb_participle'
          tableObject.title = tableEntry['title'][0]['_text']
          tableObject.credits = creditsText
          tableObject.table = undefined
          tableObject.subTables = []
          for (const tableData of tableEntry['table']) {
            let table = {
              rows: []
            }
            for (const rowData of tableData['row']) {
              let row = {
                cells: []
              }
              for (const cellData of rowData['cell']) {
                let cell = {}
                cell.role = cellData['_attr']['role']['_value']
                if (cellData['_attr'].hasOwnProperty('tense')) { cell.tense = cellData['_attr']['tense']['_value'] }
                if (cellData['_attr'].hasOwnProperty('voice')) { cell.voice = cellData['_attr']['voice']['_value'] }
                if (cellData['_attr'].hasOwnProperty('num')) { cell.number = cellData['_attr']['num']['_value'] }
                if (cellData['_attr'].hasOwnProperty('pers')) { cell.person = cellData['_attr']['pers']['_value'] }
                if (cellData['_attr'].hasOwnProperty('mood')) { cell.mood = cellData['_attr']['mood']['_value'] }
                if (cellData['_attr'].hasOwnProperty('num')) { cell.number = cellData['_attr']['num']['_value'] }
                if (cellData['_attr'].hasOwnProperty('case')) { cell['case'] = cellData['_attr']['case']['_value'] }
                if (cellData['_attr'].hasOwnProperty('gend')) { cell.gender = cellData['_attr']['gend']['_value'] }
                if (cell.role === 'data') {
                  cell.value = ''
                  if (cellData.hasOwnProperty('_text')) {
                    cell.value = cellData['_text']
                  }
                  if (cellData.hasOwnProperty('reflink')) {
                    cell.reflink = {}
                    if (cellData['reflink'][0].hasOwnProperty('_text')) {
                      cell.reflink.text = cellData['reflink'][0]['_text']
                    }
                    if (cellData['reflink'][0].hasOwnProperty('_attr') &&
                      cellData['reflink'][0]['_attr'].hasOwnProperty('href')) {
                      cell.reflink.id = cellData['reflink'][0]['_attr']['href']['_value'].replace(/.*paradigm_id:(.*)/, '$1')
                    }
                  }
                } else if (cell.role === 'label') {
                  cell.value = ''
                  if (cellData.hasOwnProperty('_text') && !Array.isArray(cellData['_text'])) {
                    cell.value = cellData['_text']
                  }
                }
                row.cells.push(cell)
              }
              table.rows.push(row)
            }
            if (tableData.hasOwnProperty('_attr') &&
              tableData['_attr'].hasOwnProperty('role') &&
              tableData['_attr']['role']['_value'] === 'sub') {
              // This is a sub table
              /*
              This is a sub table
              A first column of a sub table can be empty. It shall be removed then.
               */
              let firstColEmpty = true
              for (const row of table.rows) {
                firstColEmpty = firstColEmpty && !row.cells[0].value
              }
              if (firstColEmpty) {
                for (let row of table.rows) {
                  row.cells.shift()
                }
              }
              tableObject.subTables.push(table)
            } else {
              // This is a main table
              tableObject.table = table
            }
          }
          const outputSubDir = (tableObject.partOfSpeech === 'verb_participle')
            ? config.greek.paradigm.outputVerbParticipleSubDir
            : config.greek.paradigm.outputVerbSubDir
          writeData(JSON.stringify(tableObject), path.join(__dirname, config.greek.outputBaseDir,
            outputSubDir, `tables`, `paradigm-${index}.json`))
        }

        // Footnotes
        data = json['infl-paradigms'][0]['footnotes'][0]['footnote']
        let footnotes = []
        for (const footnote of data) {
          let index = footnote['_attr']['id']['_value'].replace(/\D+/g, '')
          let text = footnote['_text']
          footnotes.push({
            Index: index,
            Text: text
          })
        }

        writeData(csvParser.unparse(footnotes), path.join(__dirname, config.greek.outputBaseDir,
          config.greek.paradigm.outputVerbSubDir, config.greek.paradigm.footnotesFileName))
        // There are no footnotes for verb participles
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
const POS_ARTICLE = 'article'
const POS_NUMERAL = 'numeral'
const POS_VERB = 'verb'
const POS_LEMMA = 'lemma'
const POS_PARADIGM = 'paradigm'

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
      json = {'infl-data': []}
      for (let f of latin.verb.inputFN) {
        let d = readFile(path.join(__dirname, latin.inputBaseDir, f))
        let j = xmlToJSON.parseString(d)
        json['infl-data'] = json['infl-data'].concat(j['infl-data'])
      }
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

    // Nouns
    if (posName === POS_NOUN || posName === POS_ALL) {
      posCfg = lCfg[POS_NOUN]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }

    // Adjective
    if (posName === POS_ADJECTIVE || posName === POS_ALL) {
      posCfg = lCfg[POS_ADJECTIVE]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }

    // article
    if (posName === POS_ARTICLE || posName === POS_ALL) {
      posCfg = lCfg[POS_ARTICLE]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.suffixes.get(json), posCfg.suffixes.outputPath)
    }

    // Numeral
    if (posName === POS_NUMERAL || posName === POS_ALL) {
      posCfg = lCfg[POS_NUMERAL]
      data = readFile(path.join(__dirname, lCfg.inputBaseDir, posCfg.inputFN))
      json = xmlToJSON.parseString(data)
      writeData(posCfg.forms.get(json), posCfg.forms.outputPath)
      writeData(posCfg.footnotes.get(json), posCfg.footnotes.outputPath)
    }

    // Pronouns
    if (posName === POS_PRONOUN || posName === POS_ALL) {
      posCfg = lCfg[POS_PRONOUN]
      const {forms, footnotes} = posCfg.forms.getFromFiles(posCfg.inputFiles, lCfg.inputBaseDir)
      writeData(forms, posCfg.forms.outputPath)
      writeData(footnotes, posCfg.footnotes.outputPath)
    }

    // Paradigms
    if (posName === POS_PARADIGM || posName === POS_ALL) {
      posCfg = lCfg[POS_PARADIGM]
      posCfg.createParadigmTables()
    }
  }
  // endregion Greek
} catch (e) {
  console.log('Error:', e.stack)
}
