/* eslint-disable no-unused-vars */
import SIMPIDX from './json/simp-idx.json'
import TRADIDX from './json/trad-idx.json'
import ADSODAT from './json/adsolines.json'
import HANZIDAT from './json/hanzi-dat.json'

let dWordIndexSimp, dWordIndexTrad, dWordDict, dHanziDict // , dRadicals

export default class ChineseSource {
  static collectData () {
    if (!dWordIndexSimp) {
      dWordIndexSimp = ChineseSource.convertIDX(SIMPIDX)
    }
    if (!dWordIndexTrad) {
      dWordIndexTrad = ChineseSource.convertIDX(TRADIDX)
    }
    if (!dWordDict) {
      dWordDict = ChineseSource.convertAdso2(ADSODAT)
    }
    if (!dHanziDict) {
      dHanziDict = ChineseSource.convertHanzi(HANZIDAT)
    }
  }

  static convertAdso2 (rawData) {
    let formattedData = new Map()
    let parsedLength = 0
    let currentIndex = 0

    rawData.forEach(rawElement => {
      currentIndex = parsedLength
      parsedLength = parsedLength + rawElement.length + 2

      let parsedElement = rawElement
      let word = parsedElement.substr(0, parsedElement.indexOf('[')).trim()
      parsedElement = parsedElement.substr(parsedElement.indexOf('[') + 1)

      let pinyin = parsedElement.substr(0, parsedElement.indexOf(']'))
      parsedElement = parsedElement.substr(parsedElement.indexOf(']') + 1)

      let shortDef = parsedElement.trim().substr(1)
      shortDef = shortDef.substr(0, shortDef.length - 1).replace(/\//g, '; ')

      formattedData.set(currentIndex, {
        word, pinyin, shortDef
      })
    })

    return formattedData
  }

  static convertIDX (rawData) {
    let formattedData = new Map()

    rawData.forEach(rawElement => {
      let codes = []
      let checkEl = formattedData.get(rawElement[0])

      if (checkEl) {
        codes.push(checkEl.codes[0])
      }

      codes.push(rawElement[1])
      formattedData.set(rawElement[0], {
        word: rawElement[0],
        codes: codes
      })
    })

    return formattedData
  }

  static convertHanzi (rawData) {
    let formattedData = new Map()

    rawData.forEach(rawElement => {
      let character = rawElement[0]
      let typeCh = rawElement[1]
      let typeText = rawElement[2]

      let element = {
        character
      }
      element[typeCh] = typeText

      let prevElement = formattedData.get(rawElement[0])

      if (prevElement) {
        Object.keys(prevElement).filter(key => key !== 'character').forEach(key => {
          element[key] = prevElement[key]
        })
      }
      formattedData.set(character, element)
    })
    return formattedData
  }

  static convertRadicals (rawData) {

  }

  static findWord (targetWord, wordIDX, wordDict) {
    let searchedIdxElement = wordIDX.get(targetWord)

    if (searchedIdxElement) {
      if (searchedIdxElement.codes && searchedIdxElement.codes.length > 0) {
        return searchedIdxElement.codes.map(code => {
          return wordDict.get(code)
        })
      }
    }

    return null
  }

  static lookupChinese (targetWord, checkContextForward = '') {
    let checkWords = [ targetWord ]

    for (let i = 1; i <= checkContextForward.length; i++) {
      let cpWord = targetWord + checkContextForward.substr(0, i)
      checkWords.push(cpWord)
    }

    let count = 0
    let format = 'simp'

    let rs = []

    let result
    let checkedWords = 0
    while (checkedWords < checkWords.length) {
      const checkWord = checkWords[checkedWords]
      if (format === 'simp') {
        result = ChineseSource.findWord(checkWord, dWordIndexSimp, dWordDict)
        if (!result) {
          format = 'trad'
          result = ChineseSource.findWord(checkWord, dWordIndexTrad, dWordDict)
        }
      } else {
        result = ChineseSource.findWord(checkWord, dWordIndexTrad, dWordDict)
        if (!result) {
          format = 'simp'
          result = ChineseSource.findWord(checkWord, dWordIndexSimp, dWordDict)
        }
      }

      if (result) {
        result.forEach(resItem => {
          let finalResItem = resItem
          ChineseSource.updateFormat(format, finalResItem)
          ChineseSource.formatDictionaryEntry(finalResItem)
          ChineseSource.formatCharacterInfo(finalResItem, dHanziDict)
          finalResItem.pinyin = ChineseSource.formatPinyin(finalResItem.pinyin)

          rs[count++] = finalResItem
        })
      }
      checkedWords = checkedWords + 1
    }

    return rs
  }

  static updateFormat (format, resItem) {
    if (format === 'trad') {
      resItem.format = 'traditional'
    } else if (format === 'simp') {
      resItem.format = 'simplified'
    }
  }

  static formatDictionaryEntry (resItem) {
    if (resItem.format === 'traditional') {
      resItem.dictEntry = resItem.word.split(' ')[0]
    } else if (resItem.format === 'simplified') {
      resItem.dictEntry = resItem.word.split(' ')[1]
    }
  }

  static formatCharacterInfo (resItem) {
    const freqName =
      [
        'least frequent',
        'less frequent',
        'moderately frequent',
        'more frequent',
        'most frequent'
      ]

    let unicode = ChineseSource.unicodeInfo(resItem.dictEntry)
    let hanziDatElement = dHanziDict.get(unicode)

    if (hanziDatElement) {
      if (hanziDatElement.kMandarin) {
        resItem.mandarin = 'mandarin - ' + ChineseSource.formatPinyin(hanziDatElement.kMandarin.toLowerCase())
      }
      if (hanziDatElement.kDefinition) {
        resItem.definition = hanziDatElement.kDefinition
      }
      if (hanziDatElement.kCantonese) {
        resItem.cantonese = 'cantonese - ' + hanziDatElement.kCantonese
      }
      if (hanziDatElement.kTang) {
        resItem.tang = 'tang - ' + hanziDatElement.kTang
      }
      if (hanziDatElement.kFrequency) {
        resItem.frequency = freqName[hanziDatElement.kFrequency - 1]
      }
      if (hanziDatElement.kRSUnicode) {
        resItem.unicode = ChineseSource.radicalIndexToChar(hanziDatElement.kRSUnicode.split('.')[0])
      }
    }
  }

  // TODO (from review) Are we dealing with surrogate pairs here? If so, can we benefit from using a newer codePointAt()
  static unicodeInfo (word) {
    const hex = '0123456789ABCDEF'
    const u = word.charCodeAt(0)
    return 'U+' +
        hex[(u >>> 12) & 15] +
        hex[(u >>> 8) & 15] +
        hex[(u >>> 4) & 15] +
        hex[u & 15]
  }

  static formatPinyin (aPinyin) {
    const _a = ['\u0101', '\u00E1', '\u01CE', '\u00E0', 'a']
    const _e = ['\u0113', '\u00E9', '\u011B', '\u00E8', 'e']
    const _i = ['\u012B', '\u00ED', '\u01D0', '\u00EC', 'i']
    const _o = ['\u014D', '\u00F3', '\u01D2', '\u00F2', 'o']
    const _u = ['\u016B', '\u00FA', '\u01D4', '\u00F9', 'u']
    const _v = ['\u01D6', '\u01D8', '\u01DA', '\u01DC', '\u00FC']

    aPinyin = aPinyin.split(/(\d)/)

    let formatedPinyin = []

    let toneFormat = {
      1: 0, 2: 1, 3: 2, 4: 3
    }

    for (var j = 0; j < aPinyin.length; j++) {
      if (j % 2 === 0) {
        let pin = aPinyin[j]
        let tone = toneFormat[aPinyin[j + 1]] ? toneFormat[aPinyin[j + 1]] : 4

        if (pin.indexOf('a') !== -1) {
          pin = pin.replace('a', _a[tone])
        } else if (pin.indexOf('e') !== -1) {
          pin = pin.replace('e', _e[tone])
        } else if (pin.indexOf('ou') !== -1) {
          pin = pin.replace('o', _o[tone])
        } else {
          for (var k = pin.length - 1; k >= 0; k--) {
            if (ChineseSource.isVowel(pin[k])) {
              switch (pin[k]) {
                case 'i':
                  pin = pin.replace('i', _i[tone])
                  break
                case 'o':
                  pin = pin.replace('o', _o[tone])
                  break
                case 'u':
                  if (k + 1 < pin.length - 1 && pin[k + 1] === ':') { pin = pin.replace('u:', _v[tone]) } else { pin = pin.replace('u', _u[tone]) }
                  break
                default:
                  console.warn('some kind of weird vowel', pin[k])
              }
              break
            }
          }
        }

        formatedPinyin.push(pin)
      }
    }

    return formatedPinyin.join(' ').trim()
  }

  static isVowel (aLetter) {
    return ['a', 'e', 'i', 'o', 'u'].includes(aLetter)
  }

  static radicalIndexToChar (aRadical) {
    const traditionalCodes =
    [
      0x0000, // dummy for index 0
      0x4E00, 0x4E28, 0x4E36, 0x4E3F, 0x4E59, 0x4E85, 0x4E8C, 0x4EA0,
      0x4EBA, 0x513F, 0x5165, 0x516B, 0x5182, 0x5196, 0x51AB, 0x51E0,
      0x51F5, 0x5200, 0x529B, 0x52F9, 0x5315, 0x531A, 0x5338, 0x5341,
      0x535C, 0x5369, 0x5382, 0x53B6, 0x53C8, 0x53E3, 0x56D7, 0x571F,
      0x58EB, 0x5902, 0x590A, 0x5915, 0x5927, 0x5973, 0x5B50, 0x5B80,
      0x5BF8, 0x5C0F, 0x5C22, 0x5C38, 0x5C6E, 0x5C71, 0x5DDB, 0x5DE5,
      0x5DF1, 0x5DFE, 0x5E72, 0x5E7A, 0x5E7F, 0x5EF4, 0x5EFE, 0x5F0B,
      0x5F13, 0x5F50, 0x5F61, 0x5F73, 0x5FC3, 0x6208, 0x6236, 0x624B,
      0x652F, 0x6534, 0x6587, 0x6597, 0x65A4, 0x65B9, 0x65E0, 0x65E5,
      0x66F0, 0x6708, 0x6728, 0x6B20, 0x6B62, 0x6B79, 0x6BB3, 0x6BCB,
      0x6BD4, 0x6BDB, 0x6C0F, 0x6C14, 0x6C34, 0x706B, 0x722A, 0x7236,
      0x723B, 0x723F, 0x7247, 0x7259, 0x725B, 0x72AC, 0x7384, 0x7389,
      0x74DC, 0x74E6, 0x7518, 0x751F, 0x7528, 0x7530, 0x758B, 0x7592,
      0x7676, 0x767D, 0x76AE, 0x76BF, 0x76EE, 0x77DB, 0x77E2, 0x77F3,
      0x793A, 0x79B8, 0x79BE, 0x7A74, 0x7ACB, 0x7AF9, 0x7C73, 0x7CF8,
      0x7F36, 0x7F51, 0x7F8A, 0x7FBD, 0x8001, 0x800C, 0x8012, 0x8033,
      0x807F, 0x8089, 0x81E3, 0x81EA, 0x81F3, 0x81FC, 0x820C, 0x821B,
      0x821F, 0x826E, 0x8272, 0x8278, 0x864D, 0x866B, 0x8840, 0x884C,
      0x8863, 0x897E, 0x898B, 0x89D2, 0x8A00, 0x8C37, 0x8C46, 0x8C55,
      0x8C78, 0x8C9D, 0x8D64, 0x8D70, 0x8DB3, 0x8EAB, 0x8ECA, 0x8F9B,
      0x8FB0, 0x8FB5, 0x9091, 0x9149, 0x91C6, 0x91CC, 0x91D1, 0x9577,
      0x9580, 0x961C, 0x96B6, 0x96B9, 0x96E8, 0x9751, 0x975E, 0x9762,
      0x9769, 0x97CB, 0x97ED, 0x97F3, 0x9801, 0x98A8, 0x98DB, 0x98DF,
      0x9996, 0x9999, 0x99AC, 0x9AA8, 0x9AD8, 0x9ADF, 0x9B25, 0x9B2F,
      0x9B32, 0x9B3C, 0x9B5A, 0x9CE5, 0x9E75, 0x9E7F, 0x9EA5, 0x9EBB,
      0x9EC3, 0x9ECD, 0x9ED1, 0x9EF9, 0x9EFD, 0x9F0E, 0x9F13, 0x9F20,
      0x9F3B, 0x9F4A, 0x9F52, 0x9F8D, 0x9F9C, 0x9FA0
    ]

    const simplifiedCodes =
    [
      0x0000, // dummy for index 0
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x4E2C, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x7E9F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x89C1, 0x89D2, 0x8BA0, 0x003F, 0x003F, 0x003F,
      0x003F, 0x8D1D, 0x003F, 0x003F, 0x003F, 0x003F, 0x8F66, 0x003F,
      0x003F, 0x8FB6, 0x003F, 0x003F, 0x003F, 0x003F, 0x9485, 0x957F,
      0x95E8, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x97E6, 0x003F, 0x003F, 0x9875, 0x98CE, 0x98DE, 0x9963,
      0x003F, 0x003F, 0x9A6C, 0x003F, 0x003F, 0x003F, 0x003F, 0x003F,
      0x003F, 0x003F, 0x9C7C, 0x9E1F, 0x9E75, 0x003F, 0x9EA6, 0x003F,
      0x9EC4, 0x003F, 0x003F, 0x003F, 0x9EFE, 0x003F, 0x003F, 0x003F,
      0x003F, 0x9F50, 0x9F7F, 0x9F99, 0x9F9F, 0x003F
    ]

    // if last char is quote, this is simplified radical
    var traditional = true
    if (aRadical[aRadical.length - 1] === "'") {
      aRadical = aRadical.substr(0, aRadical.length - 1)
      traditional = false
    }

    if ((aRadical > 0) && (aRadical <= 214)) {
      if (traditional) {
        return String.fromCharCode(traditionalCodes[aRadical])
      } else {
        return String.fromCharCode(simplifiedCodes[aRadical])
      }
    }

    return '?'
  }
}
