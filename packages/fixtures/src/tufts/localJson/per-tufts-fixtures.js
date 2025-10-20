import TuftsDefault from '@/tufts/localJson/tufts-default.json'
import PerTuftsPass from '@/tufts/localJson/per/per-tufts-pass.json'

export default class PerTuftsFixture {
  static get library () {
    return {
      default: TuftsDefault,
      'بگذرد': PerTuftsPass
    }
  }
}