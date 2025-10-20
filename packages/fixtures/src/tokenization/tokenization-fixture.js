import TextExample1 from '@/tokenization/data/text-example1.json'
import TeiExample1 from '@/tokenization/data/tei-example1.json'

import ConfigData from '@/tokenization/data/config-data.json'

export default class TokenizationFixture {
  static get library () {
    return {
        'text-example-1': TextExample1,
        'tei-example-1': TeiExample1,
        'config-data': ConfigData
    }
  }

  
  static getFixtureRes(params) {
    const resFile = this.library[params.testName]

    if (!resFile) {
      console.info('There is no fixture for ', params.testName)
    }

    return resFile
  }
}
