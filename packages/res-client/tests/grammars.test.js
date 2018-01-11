/* eslint-env jest */
'use strict'

import Grammars from '../src/grammars.js'
import { Constants } from 'alpheios-data-models'

describe('BaseAdapter object', () => {
  beforeAll(() => {
    jest.resetModules()
    window.fetch = require('jest-fetch-mock')
  })

  test('getGrammarAdapters', () => {
    let langId = Constants.LANG_LATIN
    let adapters = Grammars.getGrammarAdapters(langId)
    expect(adapters.length).toEqual(1)
    expect(adapters[0].resid).toEqual('https://github.com/alpheios-project/grammar-bennett')
  })
})
