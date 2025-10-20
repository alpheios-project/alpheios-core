import LatFreMale from '@/translations/data/lat-fre-male.json'
import LatSpaMare from '@/translations/data/lat-spa-mare.json'
import LatSpaCepit from '@/translations/data/lat-spa-cepit.json'


import LatAllLangs from '@/translations/data/lat-all-langs.json'

export default class TranslationsFixture {
  static get allLangs () {
    return LatAllLangs
  }

  static get library () {
    return {
        'lat-fre-male': LatFreMale,
        'lat-spa-mare': LatSpaMare,
        'lat-spa-cepit': LatSpaCepit
    }
  }
}
