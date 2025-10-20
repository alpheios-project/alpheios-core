import TuftsDefault from '@/tufts/localJson/tufts-default.json'
import SyrTuftsSpeak from '@/tufts/localJson/syr/syr-tufts-speak.json'
import SyrTuftsFeather from '@/tufts/localJson/syr/syr-tufts-feather.json'
import SyrTuftsLift from '@/tufts/localJson/syr/syr-tufts-lift.json'

export default class SyrTuftsFixture {
  static get library () {
    return {
      default: TuftsDefault,
      'ܘܐܡܪܝܢ': SyrTuftsSpeak,
      'ܐܒܪܐ': SyrTuftsFeather,
      'ܫܩܠ': SyrTuftsLift
    }
  }
}
