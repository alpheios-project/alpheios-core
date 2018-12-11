/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ClientAdapters from '@/client-adapters.js'

import { Constants, Homonym } from 'alpheios-data-models'

// For the time now

describe('sync-async.test.js', () => {
  // console.error = function () {}
  // console.log = function () {}
  // console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function timeNow () {
    return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds()
  }

  it.skip('1 ClientAdapters - maAdapter sync getting data', async () => {
    ClientAdapters.init()
    let newDate = new Date()
    console.info('*******************************SYNC maAdapter*******************', timeNow.bind(newDate)())

    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'placito'
      }
    })
    let newDate1 = new Date()
    console.info('**************************res1', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes.length)

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })
    let newDate2 = new Date()
    console.info('**************************res2', timeNow.bind(newDate2)(), res2.result.targetWord, res2.result.lexemes.length)

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'συνήθως'
      }
    })
    let newDate3 = new Date()
    console.info('**************************res3', timeNow.bind(newDate3)(), res3.result.targetWord, res3.result.lexemes.length)

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'male'
      }
    })
    let newDate4 = new Date()
    console.info('**************************res4', timeNow.bind(newDate4)(), res4.result.targetWord, res4.result.lexemes.length)
  })

  it.skip('2 ClientAdapters - maAdapter async getting data', async () => {
    ClientAdapters.init()
    let newDate = new Date()
    console.info('*******************************ASYNC maAdapter*******************', timeNow.bind(newDate)())
    let res1 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'placito'
      }
    })

    res1.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value1', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res2 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    res2.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value2', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res3 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'συνήθως'
      }
    })

    res3.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value3', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res4 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'male'
      }
    })

    res4.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value4', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res = await timeout(3000)
    return res
  }, 50000)

  it.skip('3 ClientAdapters - tbAdapter sync getting data', async () => {
    ClientAdapters.init()
    let newDate = new Date()
    console.info('*******************************SYNC tbAdapter*******************', timeNow.bind(newDate)())

    let res1 = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'phi0959.phi006.alpheios-text-lat1#1-2'
      }
    })
    let newDate1 = new Date()
    console.info('**************************res1', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes.length)

    let res2 = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'phi0959.phi006.alpheios-text-lat1#1-4'
      }
    })
    let newDate2 = new Date()
    console.info('**************************res2', timeNow.bind(newDate2)(), res2.result.targetWord, res2.result.lexemes.length)

    let res3 = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: '1999.02.0066#1-9'
      }
    })
    let newDate3 = new Date()
    console.info('**************************res3', timeNow.bind(newDate3)(), res3.result.targetWord, res3.result.lexemes.length)

    let res4 = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: '1999.02.0066#1-10'
      }
    })
    let newDate4 = new Date()
    console.info('**************************res4', timeNow.bind(newDate4)(), res4.result.targetWord, res4.result.lexemes.length)
  })

  it.skip('4 ClientAdapters - tbAdapter async getting data', async () => {
    ClientAdapters.init()
    let newDate = new Date()
    console.info('*******************************ASYNC tbAdapter*******************', timeNow.bind(newDate)())
    let res1 = ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'phi0959.phi006.alpheios-text-lat1#1-2'
      }
    })

    res1.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value1', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res2 = ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'phi0959.phi006.alpheios-text-lat1#1-4'
      }
    })

    res2.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value2', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res3 = ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        wordref: '1999.02.0066#1-9'
      }
    })

    res3.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value3', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res4 = ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: '1999.02.0066#1-10'
      }
    })

    res4.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value4', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res = await timeout(3000)
    return res
  }, 50000)

  it.skip('5 ClientAdapters - lemmaTranslations sync getting data', async () => {
    ClientAdapters.init()
    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'animus'
      }
    })

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'nova'
      }
    })

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'male'
      }
    })

    let newDate = new Date()
    console.info('*******************************SYNC lemmaTranslation*******************', timeNow.bind(newDate)())

    await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res1.result,
        browserLang: 'es'
      }
    })

    let newDate1 = new Date()
    console.info('**************************resT1 result', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes[0].lemma.translation)

    await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res2.result,
        browserLang: 'es'
      }
    })

    let newDate2 = new Date()
    console.info('**************************resT2 result', timeNow.bind(newDate2)(), res2.result.targetWord, res2.result.lexemes[0].lemma.translation)

    await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res3.result,
        browserLang: 'es'
      }
    })

    let newDate3 = new Date()
    console.info('**************************resT3 result', timeNow.bind(newDate3)(), res3.result.targetWord, res3.result.lexemes[0].lemma.translation)

    await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res4.result,
        browserLang: 'es'
      }
    })

    let newDate4 = new Date()
    console.info('**************************resT4 result', timeNow.bind(newDate4)(), res4.result.targetWord, res4.result.lexemes[0].lemma.translation)

    let res = await timeout(3000)
    return res
  }, 50000)

  it.skip('6 ClientAdapters - lemmaTranslations async getting data', async () => {
    ClientAdapters.init()
    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'animus'
      }
    })

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'nova'
      }
    })

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'male'
      }
    })

    let newDate = new Date()
    console.info('*******************************ASYNC lemmaTranslation*******************', timeNow.bind(newDate)())

    let resT1 = ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res1.result,
        browserLang: 'es'
      }
    })

    resT1.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value1', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes[0].lemma.translation)
    })

    let resT2 = ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res2.result,
        browserLang: 'es'
      }
    })

    resT2.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value2', timeNow.bind(newDate1)(), res2.result.targetWord, res2.result.lexemes[0].lemma.translation)
    })

    let resT3 = ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res3.result,
        browserLang: 'es'
      }
    })

    resT3.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value3', timeNow.bind(newDate1)(), res3.result.targetWord, res3.result.lexemes[0].lemma.translation)
    })

    let resT4 = ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: res4.result,
        browserLang: 'es'
      }
    })

    resT4.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value4', timeNow.bind(newDate1)(), res4.result.targetWord, res4.result.lexemes[0].lemma.translation)
    })

    let res = await timeout(3000)
    return res
  }, 50000)

  it.skip('6 ClientAdapters - lexicons sync getting data fetchShortDefs', async () => {
    ClientAdapters.init()
    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ἐμαυτοῦ'
      }
    })

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ταύταις'
      }
    })

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'πλατύς'
      }
    })

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μύες'
      }
    })

    let newDate = new Date()
    console.info('*******************************SYNC fetchShortDefs*******************', timeNow.bind(newDate)())

    await ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res1.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate1 = new Date()
    console.info('**************************resT1 result', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes[0].meaning.shortDefs)

    await ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res2.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate2 = new Date()
    console.info('**************************resT2 result', timeNow.bind(newDate2)(), res2.result.targetWord, res2.result.lexemes[0].meaning.shortDefs)

    await ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res3.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate3 = new Date()
    console.info('**************************resT3 result', timeNow.bind(newDate3)(), res3.result.targetWord, res3.result.lexemes[0].meaning.shortDefs)

    await ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res4.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate4 = new Date()
    console.info('**************************resT4 result', timeNow.bind(newDate4)(), res4.result.targetWord, res4.result.lexemes[0].meaning.shortDefs)

    let res = await timeout(3000)
    return res
  }, 50000)

  it.skip('7 ClientAdapters - lexicons async getting data fetchShortDefs', async () => {
    ClientAdapters.init()
    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ἐμαυτοῦ'
      }
    })

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ταύταις'
      }
    })

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'πλατύς'
      }
    })

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μύες'
      }
    })

    let newDate = new Date()
    console.info('*******************************ASYNC fetchShortDefs*******************', timeNow.bind(newDate)())

    let resT1 = ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res1.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj', 'https://github.com/alpheios-project/aut']
        }
      }
    })

    resT1.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value1', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes[0].meaning.shortDefs)
    })

    let resT2 = ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res2.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj', 'https://github.com/alpheios-project/aut']
        }
      }
    })

    resT2.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value2', timeNow.bind(newDate1)(), res2.result.targetWord, res2.result.lexemes[0].meaning.shortDefs)
    })

    let resT3 = ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res3.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj', 'https://github.com/alpheios-project/aut']
        }
      }
    })

    resT3.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value3', timeNow.bind(newDate1)(), res3.result.targetWord, res3.result.lexemes[0].meaning.shortDefs)
    })

    let resT4 = ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: res4.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj', 'https://github.com/alpheios-project/aut']
        }
      }
    })

    resT4.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value4', timeNow.bind(newDate1)(), res4.result.targetWord, res4.result.lexemes[0].meaning.shortDefs)
    })

    let res = await timeout(50000)
    return res
  }, 60000)

  it.skip('8 ClientAdapters - lexicons sync getting data - fetchFullDefs', async () => {
    ClientAdapters.init()
    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ἐμαυτοῦ'
      }
    })

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ταύταις'
      }
    })

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'πλατύς'
      }
    })

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μύες'
      }
    })

    let newDate = new Date()
    console.info('*******************************SYNC fetchFullDefs*******************', timeNow.bind(newDate)())

    await ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res1.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate1 = new Date()
    console.info('**************************resT1 result', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes[0].meaning.fullDefs[0].text.length)

    await ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res2.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate2 = new Date()
    console.info('**************************resT2 result', timeNow.bind(newDate2)(), res2.result.targetWord, res2.result.lexemes[0].meaning.fullDefs[0].text.length)

    await ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res3.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate3 = new Date()
    console.info('**************************resT3 result', timeNow.bind(newDate3)(), res3.result.targetWord, res3.result.lexemes[0].meaning.fullDefs[0].text.length)

    await ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res4.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    let newDate4 = new Date()
    console.info('**************************resT4 result', timeNow.bind(newDate4)(), res4.result.targetWord, res4.result.lexemes[0].meaning.fullDefs[0].text.length)

    let res = await timeout(3000)
    return res
  }, 50000)

  it.skip('9 ClientAdapters - lexicons sync getting data - fetchFullDefs', async () => {
    ClientAdapters.init()
    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ἐμαυτοῦ'
      }
    })

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ταύταις'
      }
    })

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'πλατύς'
      }
    })

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μύες'
      }
    })

    let newDate = new Date()
    console.info('*******************************ASYNC fetchFullDefs*******************', timeNow.bind(newDate)())

    let resT1 = ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res1.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    resT1.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value1', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes[0].meaning.fullDefs[0].text.length)
    })

    let resT2 = ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res2.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    resT2.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value2', timeNow.bind(newDate1)(), res2.result.targetWord, res2.result.lexemes[0].meaning.fullDefs[0].text.length)
    })

    let resT3 = ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res3.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    resT3.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value3', timeNow.bind(newDate1)(), res3.result.targetWord, res3.result.lexemes[0].meaning.fullDefs[0].text.length)
    })

    let resT4 = ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: res4.result,
        opts: {
          allow: ['https://github.com/alpheios-project/lsj']
        }
      }
    })

    resT4.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value4', timeNow.bind(newDate1)(), res4.result.targetWord, res4.result.lexemes[0].meaning.fullDefs[0].text.length)
    })

    let res = await timeout(50000)
    return res
  }, 60000)
})
