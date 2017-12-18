import languages from '../../lib/languages'
import * as Greek from '../../lib/lang/greek/greek'
import View from '../lib/view'
import GroupFeatureType from '../lib/group-feature-type'
import Table from '../lib/table'

class GreekView extends View {
  constructor () {
    super()
    this.language = languages.greek

    /*
    Default grammatical features of a View. It child views need to have different feature values, redefine
    those values in child objects.
     */
    this.features = {
      numbers: new GroupFeatureType(Greek.numbers, 'Number'),
      cases: new GroupFeatureType(Greek.cases, 'Case'),
      declensions: new GroupFeatureType(Greek.declensions, 'Declension'),
      genders: new GroupFeatureType(Greek.genders, 'Gender'),
      types: new GroupFeatureType(Greek.types, 'Type')
    }
  }

  /**
   * Creates and initializes an inflection table. Redefine this method in child objects in order to create
   * an inflection table differently.
   */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [Greek.declensions, Greek.genders, Greek.types]
    features.rows = [Greek.numbers, Greek.cases]
    features.columnRowTitles = [Greek.cases]
    features.fullWidthRowTitles = [Greek.numbers]
  }
}

class NounView extends GreekView {
  constructor () {
    super()
    this.id = 'nounDeclension'
    this.name = 'noun declension'
    this.title = 'Noun declension'
    this.partOfSpeech = Greek.parts.noun.value

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures[0].value === Greek.declensions.second.value ||
          ancestorFeatures[0].value === Greek.declensions.third.value) {
          return [[Greek.genders.masculine.value, Greek.genders.feminine.value], Greek.genders.neuter.value]
        }
      }
      return [Greek.genders.masculine.value, Greek.genders.feminine.value, Greek.genders.neuter.value]
    }

    this.createTable()
  }
}

class NounViewSimplified extends NounView {
  constructor () {
    super()
    this.id = 'nounDeclensionSimplified'
    this.name = 'noun declension simplified'
    this.title = 'Noun declension (simplified)'
    this.partOfSpeech = Greek.parts.noun.value

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures[0].value === Greek.declensions.second.value) {
          return [[Greek.genders.masculine.value, Greek.genders.feminine.value], Greek.genders.neuter.value]
        }
        if (ancestorFeatures[0].value === Greek.declensions.third.value) {
          return [[Greek.genders.masculine.value, Greek.genders.feminine.value, Greek.genders.neuter.value]]
        }
      }
      return [Greek.genders.masculine.value, Greek.genders.feminine.value, Greek.genders.neuter.value]
    }

    this.createTable()

    this.table.suffixCellFilter = NounViewSimplified.suffixCellFilter
  }

  static suffixCellFilter (suffix) {
    return suffix.extendedLangData[languages.greek].primary
  }
}

export default [new NounView(), new NounViewSimplified()]
