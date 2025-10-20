import TuftsDefault from '@/tufts/localJson/tufts-default.json'
import GezTuftsHageriye from '@/tufts/localJson/gez/gez-tufts-hageriye.json'

export default class GezTuftsFixture {
  static get library () {
    return {
      default: TuftsDefault,
      'ሀገርየ': GezTuftsHageriye
    }
  }
}