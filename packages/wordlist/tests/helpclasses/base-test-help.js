/* eslint-env jest */
import 'whatwg-fetch'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Fixture, LexiconsFixture } from 'alpheios-fixtures'
import { LanguageModelFactory as LMF } from 'alpheios-data-models'

export default class BaseTestHelp {
  static async getHomonym(targetWord, languageID) {
    const langCode = LMF.getLanguageCodeFromId(languageID)
    let sourceJson = Fixture.getFixtureRes({
      langCode: langCode, adapter: 'tufts', word: targetWord
    })

    const adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: languageID,
        word: targetWord
      },
      sourceData: sourceJson
    })
    
    if (adapterTuftsRes.errors.length > 0) {
      console.error(adapterTuftsRes.errors)
    }
    return adapterTuftsRes.result
  }

  static async  updateCacheWithFixtures () {  
    let urls = LexiconsFixture.libUrls
    let urlsFull = LexiconsFixture.fullUrls
    
    const config = await ClientAdapters.lexicon.alpheios({ method: 'getConfig' })

    for (let i = 0; i < urls.length; i++) {
      let urlKey = config[urls[i].url].urls[urls[i].type]
      await ClientAdapters.lexicon.alpheios({
        method: 'checkCachedData',
        params: {
          url: urlKey,
          externalData: LexiconsFixture.lexData[urlKey]
        }
      })
    }

    for (let j = 0; j < urlsFull.length; j++) {
      let urlF = urlsFull[j]
      await ClientAdapters.lexicon.alpheios({
        method: 'checkCachedData',
        params: {
          url: urlF,
          externalData: LexiconsFixture.lexFullData[urlF],
          skipFetch: true
        }
      })
    }
  }
}
