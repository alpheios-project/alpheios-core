import CedictData from '@/cedict/data/zho-cedict.json'

/**
 * This class provides stubs that can be used for testing CEDICT functionality of Lexis CS package.
 * Please see descriptions of each individual method to inspect how each one can be used during testing.
 */
export default class CedictFixture {
  /**
   * This stub is supposed to be used for testing a `Cedict` class fo Lexis CS.
   * Cedict has an internal _downloadData() method that loads CEDICT data from a remote service.
   * If to replace that method with this stub Cedict class will, instead of going to a remote
   * service, load a local test sample of CEDICT data bundled into the `fixtures` library.
   * This will allow to test CEDICT functionality of Lexis CS locally, without sending any network requests.
   * This stub can also be useful for other tests that involves creation of `Cedict` class instances.
   *
   * @returns {Promise<object>} Returns a promise that is resolved with
   *          an object containing dictionary data.. Please see Cedict._downloadData() for
   *          a more detailed information about the format of a return value.
   */
  static downloadData() {
    return Promise.resolve({ meta: CedictData.metadata, dictionary: CedictData.entries })
  }

  /**
   * A stub that imitates a CEDICT `getWords` request sent to a Lexis CS service. It can be used
   * as a replacement for `sendRequestTo()` method of a Lexis CS `MessagingService`. The stub
   * employs a test subset of CEDICT data and a body of its return value for the words from this subset
   * is exactly the same as of a production version of `getWords` CEDICT request.
   *
   *
   * @param {string} destName - A request's destination name. It is not used in a stub and can be of any value.
   * @param {object} request - A LeisCS request, please consult Lexis CS documentation for a more detailed
   *        description of its format.
   * @returns {Promise<{body: object}>} - A response that fully emulates a response of Lexis CS CEDICT service.
   */
  static async lexisCedictRequest(destName, request) {
    // This stub implements business logic of `getWords()` method from lexis-cs/src/cedict-service/cedict.js
    const preferredCharacterForm = 'traditional'
    const fallbackCharacterForm = 'simplified'

    let words = request.body.getWords.words
    // Create an object with props for the words
    let result = words.reduce((accumulator, key) => { accumulator[key] = []; return accumulator }, {}) // eslint-disable-line prefer-const
    // Try to get some results for the preferredCharacterForm
    words.forEach(word => {
      result[word] = CedictData.entries.filter(entry => entry[preferredCharacterForm].headword === word)
    })
    if (CedictFixture._getResultRecordsCount(result) > 0) {
      return {
        body: {
          [preferredCharacterForm]: result
        }
      }
    }

    // If no results for preferredCharacterForm are found, try fallbackCharacterForm instead
    words.forEach(word => {
      result[word] = CedictData.entries.filter(entry => entry[fallbackCharacterForm].headword === word)
    })
    if (CedictFixture._getResultRecordsCount(result) > 0) {
      return {
        body: {
          [fallbackCharacterForm]: result
        }
      }
    }

    // If no records are found for any of the words CEDICT service will return an empty object
    return { body: {} }
  }

  static _getResultRecordsCount (resultsObject) {
    return Object.values(resultsObject).flat().length
  }
}
