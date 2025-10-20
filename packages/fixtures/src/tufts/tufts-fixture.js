import AraTuftsFixture from '@/tufts/localJson/ara-tufts-fixtures.js'
import PerTuftsFixture from '@/tufts/localJson/per-tufts-fixtures.js'
import GezTuftsFixture from '@/tufts/localJson/gez-tufts-fixtures.js'
import GrcTuftsFixture from '@/tufts/localJson/grc-tufts-fixtures.js'
import LatTuftsFixture from '@/tufts/localJson/lat-tufts-fixtures.js'
import SyrTuftsFixture from '@/tufts/localJson/syr-tufts-fixtures.js'

const library = {
  syr: {
    tufts: SyrTuftsFixture.library
  },
  gez: {
    tufts: GezTuftsFixture.library
  },
  grc: {
    tufts: GrcTuftsFixture.library
  },
  lat: {
    tufts: LatTuftsFixture.library
  },
  ara: {
    tufts: AraTuftsFixture.library
  },
  per: {
    tufts: PerTuftsFixture.library
  }
}

export default class Fixture {
  static defineFileByParameters (params) {
    if (!library[params.langCode]) { return }
    if (!library[params.langCode][params.adapter]) { return }

    return library[params.langCode][params.adapter][params.word] ? library[params.langCode][params.adapter][params.word] : library[params.langCode][params.adapter].default
  }

  static getFixtureRes(params) {
    const sourceFile = Fixture.defineFileByParameters(params)

    if (!sourceFile) {
      console.info('There is no fixture for ', params.langCode + '-' + params.adapter + '-' + params.word)
    }

    return sourceFile
  }
}

