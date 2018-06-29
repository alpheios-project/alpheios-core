/* eslint-env jest */
import ResourceQuery from '@/lib/queries/resource-query'
import Query from '@/lib/queries/query'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

describe('resource-query.test.js', () => {
  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let testUi = {
    message: function () { },
    updateGrammar: function () { },
    addMessage: function () { },
    l10n: l10n
  }

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  it('1 ResourceQuery - create method returns a new ResourceQuery with params', () => {
    let query = ResourceQuery.create('foo feature', { uiController: 'foo uiController', grammars: 'foo grammars' })

    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('ResourceQuery')
    expect(typeof query.ID).toEqual('string')

    expect(query.feature).toEqual('foo feature')
    expect(query.ui).toEqual('foo uiController')
    expect(query.grammars).toEqual('foo grammars')
  })

  it('2 ResourceQuery - getData method executes steps: message, updateGrammar, addMessage, finalize (when fetchResources returns [])', async () => {
    let testGrammars = {
      fetchResources: function () {
        return []
      }
    }

    jest.spyOn(testUi, 'message')
    jest.spyOn(testUi, 'updateGrammar')
    jest.spyOn(testUi, 'addMessage')

    let query = ResourceQuery.create('foo feature', { uiController: testUi, grammars: testGrammars })
    jest.spyOn(query, 'finalize')

    await query.getData()

    expect(testUi.message).toHaveBeenCalledWith(`Retrieving requested resource ...`)
    expect(testUi.updateGrammar).toHaveBeenCalledWith([])

    expect(testUi.addMessage).toHaveBeenCalledWith(l10n.messages.TEXT_NOTICE_GRAMMAR_NOTFOUND)
    expect(query.finalize).toHaveBeenCalled()
  })

  it('3 ResourceQuery - getData method executes updateGrammar with url as an argument (when fetchResources returns request url)', async () => {
    let testGrammars = {
      fetchResources: function () {
        return [
          new Promise((resolve, reject) => { resolve('http:/testurl.com') })
        ]
      }
    }

    let query = ResourceQuery.create('foo feature', { uiController: testUi, grammars: testGrammars })
    jest.spyOn(testUi, 'updateGrammar')
    jest.spyOn(testUi, 'addMessage')

    await query.getData()
    expect(testUi.updateGrammar).toHaveBeenCalledWith('http:/testurl.com')
    expect(testUi.addMessage).toHaveBeenCalledWith(l10n.messages.TEXT_NOTICE_GRAMMAR_READY)
    expect(testUi.addMessage).toHaveBeenCalledWith(l10n.messages.TEXT_NOTICE_GRAMMAR_COMPLETE)
  })

  it('4 ResourceQuery - getData method throws error to console when fetchResources returns error', async () => {
    let testError = new Error('test error')
    let testGrammars = {
      fetchResources: function () {
        return [
          new Promise((resolve, reject) => { reject(testError) })
        ]
      }
    }

    let query = ResourceQuery.create('foo feature', { uiController: testUi, grammars: testGrammars })

    await query.getData()

    expect(console.log).toHaveBeenCalledWith('Error retrieving Grammar resource', testError)
  })

  it('5 ResourceQuery - On finalize Query.destroy executes', async () => {
    let testGrammars = {
      fetchResources: function () {
        return []
      }
    }

    jest.spyOn(Query, 'destroy')
    let query = ResourceQuery.create('foo feature', { uiController: testUi, grammars: testGrammars })
    query.finalize()
    expect(Query.destroy).toHaveBeenCalled()
  })
})
