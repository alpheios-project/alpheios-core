import TuftsDefault from '@/tufts/localJson/tufts-default.json'
import AraTuftsTrjmh from '@/tufts/localJson/ara/ara-tufts-trjmh.json'
import AraTuftsMshkelha from '@/tufts/localJson/ara/ara-tufts-mshkel‌.json'
import AraTuftsMkr from '@/tufts/localJson/ara/ara-tufts-mkr.json'
import AraTuftsSitan from '@/tufts/localJson/ara/ara-tufts-sitan.json'

export default class AraTuftsFixture {
  static get library () {
    return {
        default: TuftsDefault,
        'ترجمة': AraTuftsTrjmh,
        'مشکل‌ها': AraTuftsMshkelha,
        'مَقَرٍ': AraTuftsMkr,
        'سُلطَان': AraTuftsSitan
    }
  }
}