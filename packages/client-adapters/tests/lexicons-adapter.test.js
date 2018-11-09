/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import AlpheiosLexiconsAdapter from '@/lexicons/adapter'
import { Constants } from 'alpheios-data-models'
import AlpheiosTuftsAdapter from '@/tufts/adapter'

describe('LexiconsAdapter', () => {
  // console.error = function () {}
  // console.log = function () {}
  // console.warn = function () {}

  beforeEach(async () => {
    // jest.spyOn(console, 'error')
    // jest.spyOn(console, 'log')
    // jest.spyOn(console, 'warn')

  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 LexiconsAdapter', async () => {
    jest.setTimeout(3000000)

    let adapterMorh = new AlpheiosTuftsAdapter()
    let homonym = await adapterMorh.getHomonym(Constants.LANG_GREEK, 'μύες')
    console.info('*******************homonym', homonym)

    let adapterLex = new AlpheiosLexiconsAdapter()
    await adapterLex.fetchDefinitions(homonym.lexemes[0].lemma, { allow: ['https://github.com/alpheios-project/lsj'] }, 'short')
    // await adapterLex.fetchDefinitions(homonym, {}, 'short')
    console.info('final of the test')
  })
})
