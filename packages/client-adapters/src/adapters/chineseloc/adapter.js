/* eslint-disable no-unused-vars */
import BaseAdapter from '@/adapters/base-adapter'
import ChineseSource from '@/adapters/chineseloc/chinese-source/chinese-source.js'
import { ChineseLanguageModel, Lemma, Lexeme, Homonym, Feature, Definition } from 'alpheios-data-models'

class AlpheiosChineseLocAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = config
  }

  get languageID () { return ChineseLanguageModel.languageID }

  fetchChineseData (targetWord, checkContextForward) {
    ChineseSource.collectData()

    return ChineseSource.lookupChinese(targetWord, checkContextForward)
  }

  getHomonym (targetWord, checkContextForward) {
    try {
      const res = this.fetchChineseData(targetWord, checkContextForward)
      if (res) {
        let homonym = this.transformData(res, targetWord)

        if (!homonym) {
          this.addError(this.l10n.messages['MORPH_NO_HOMONYM'].get(targetWord, this.languageID.toString()))
          return
        }
        return homonym
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_UNKNOWN_ERROR'].get(error.mesage))
    }
  }

  transformData (rawLexemes, targetWord) {
    let lexemes = []
    rawLexemes.forEach(rawLexeme => {
      let lemma = new Lemma(rawLexeme.dictEntry, this.languageID, [])

      let features = this.extractFeatures(rawLexeme)
      lemma.addFeatures(features)

      let shortdefs = this.extractShortDefinitions(rawLexeme)

      let lexmodel = new Lexeme(lemma, [])
      lexmodel.meaning.appendShortDefs(shortdefs)

      lexemes.push(lexmodel)
    })

    let finalLexemes = []
    lexemes.forEach(lex => {
      let check = finalLexemes.filter(checkLex => {
        let check1 = checkLex.lemma.principalParts[0] === lex.lemma.principalParts[0]

        let check2 = checkLex.lemma.features[Feature.types.pronunciation].value === lex.lemma.features[Feature.types.pronunciation].value

        let check3 = checkLex.meaning.shortDefs[0].text === lex.meaning.shortDefs[0].text

        return check1 && check2 && check3
      })

      if (check.length === 0) {
        finalLexemes.push(lex)
      }
    })

    if (finalLexemes.length > 0) {
      return new Homonym(finalLexemes, targetWord)
    } else {
      return undefined
    }
  }

  extractFeatures (rawLexeme) {
    let featuresArr = [
      { checkAttribute: 'pinyin', method: this.defineMultipleFeature.bind(this), featureType: Feature.types.pronunciation, featOrder: 4 },
      { checkAttribute: 'format', method: this.defineSimpleFeature.bind(this), featureType: Feature.types.note },
      { checkAttribute: 'mandarin', method: this.defineMultipleFeature.bind(this), featureType: Feature.types.pronunciation, featOrder: 3 },
      { checkAttribute: 'cantonese', method: this.defineMultipleFeature.bind(this), featureType: Feature.types.pronunciation, featOrder: 2 },
      { checkAttribute: 'tang', method: this.defineMultipleFeature.bind(this), featureType: Feature.types.pronunciation, featOrder: 1 },
      { checkAttribute: 'frequency', method: this.defineSimpleFeature.bind(this), featureType: Feature.types.frequency },
      { checkAttribute: 'unicode', method: this.defineSimpleFeature.bind(this), featureType: Feature.types.radical }
    ]
    let features = []

    featuresArr.forEach(featureConfig => {
      let featureVal = featureConfig.method(featureConfig, rawLexeme, features)
      if (featureVal) {
        features.push(featureVal)
      }
    })
    return features
  }

  defineMultipleFeature (featureConfig, rawLexeme, features) {
    if (!rawLexeme[featureConfig.checkAttribute]) {
      return
    }

    let featType = featureConfig.featureType
    let featObj = features.filter(feat => feat.type === featType)

    if (featObj.length === 0) {
      return new Feature(featureConfig.featureType, [[rawLexeme[featureConfig.checkAttribute], featureConfig.featOrder]], this.languageID)
    } else {
      featObj[0].addValue(rawLexeme[featureConfig.checkAttribute], featureConfig.featOrder)
    }
  }

  defineSimpleFeature (featureConfig, rawLexeme) {
    if (rawLexeme[featureConfig.checkAttribute]) {
      return new Feature(featureConfig.featureType, rawLexeme[featureConfig.checkAttribute], this.languageID)
    }
  }

  extractShortDefinitions (rawLexeme) {
    let shortdefs = []
    if (rawLexeme.shortDef) {
      shortdefs.push(new Definition(rawLexeme.shortDef, 'eng', 'text/plain', rawLexeme.dictEntry))
    }
    return shortdefs
  }
}

export default AlpheiosChineseLocAdapter
