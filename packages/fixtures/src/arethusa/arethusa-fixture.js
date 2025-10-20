import Aberis from '@/arethusa/data/1-1.json'
import Participle from '@/arethusa/data/1-2.json'
import Gerundive from '@/arethusa/data/1-3.json'

export default class ArethusaFixture {
  static get library () {
    return {
      'http://example.org': {
        '1' : {
          '1' : Aberis,
          '2' : Participle,
          '3' : Gerundive
        }
      }
    }
  }

  static async treebankServiceRequest(srcUrl,sentenceId,wordId) {
    let response
    try {
      const sourceFile = ArethusaFixture.library[srcUrl][sentenceId][wordId]
      return sourceFile
    } catch(error) {
      console.info(`There is no fixture for ${sentenceId}-${wordId}`, error)
      return {}
    }
  }
}

