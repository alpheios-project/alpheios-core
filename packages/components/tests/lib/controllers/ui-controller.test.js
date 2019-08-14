/* eslint-env jest */
/* eslint-disable no-unused-vars */
import UIController from '@/lib/controllers/ui-controller'
import State from '@/lib/state/tab-script.js'

import OptionItem from '@/lib/options/options-item'
import ResourceQuery from '@/lib/queries/resource-query'

import Options from '@/lib/options/options.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import LocalStorageArea from '@/lib/options/local-storage-area.js'
import HTMLPage from '@/lib/utility/html-page.js'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

import { LanguageModelFactory as LMF, Definition, Constants } from 'alpheios-data-models'

import Panel from '@/vue/components/panel-large.vue'
import Popup from '@/vue/components/popup.vue'

describe.skip('ui-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let uiC, featureOptions, resourceOptions, state

  beforeEach(async (done) => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
    jest.spyOn(Options, 'initItems')

    state = new State()
    let sa1 = new LocalStorageArea('alpheios-feature-settings')
    let sa2 = new LocalStorageArea('alpheios-resource-settings')
    let sa3 = new LocalStorageArea('alpheios-ui-settings')
    featureOptions = new Options(FeatureOptionDefaults, sa1)
    resourceOptions = new Options(LanguageOptionDefaults, sa2)
    let uiOptions = new Options(UIOptionDefaults, sa3)

    uiC = new UIController(state, LocalStorageArea, {})
    uiC.featureOptions = featureOptions
    uiC.resourceOptions = resourceOptions
    uiC.uiOptions = uiOptions

    await uiC.init()
    await uiC.activate()

    done()
  })
  afterEach(() => {
    jest.resetModules()
    uiC = undefined
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let latID = Constants.LANG_LATIN
  let araID = Constants.LANG_ARABIC

  it('1 UIController - create object with min arguments', async () => {
    expect(uiC.options).toHaveProperty('uiTypePanel')
    expect(uiC.options).toHaveProperty('uiTypePopup')

    expect(uiC.options.irregularBaseFontSizeClassName.length).toBeGreaterThan(0)
    expect(uiC.irregularBaseFontSize).toBeDefined()
    expect(uiC.options.app).toBeDefined()

    expect(uiC.options.template).toHaveProperty('html')
    expect(uiC.options.template).toHaveProperty('panelId')

    expect(uiC.options.template).toHaveProperty('defaultPanelComponent')
    expect(uiC.options.template).toHaveProperty('popupId')

    expect(uiC.options.template).toHaveProperty('defaultPopupComponent')
    expect(uiC.options.template).toHaveProperty('draggable')
    expect(uiC.options.template).toHaveProperty('resizable')

    expect(uiC.zIndex).toBeGreaterThan(0)

    expect(uiC.l10n).toBeInstanceOf(L10n)

    expect(document.body.classList.contains('alpheios')).toBeTruthy()
    expect(document.getElementById('alpheios-popup')).not.toBeNull()
    expect(document.getElementById('alpheios-panel')).not.toBeNull()
  })

  it('2 UIController - static methods', () => {
    expect(UIController.optionsDefaults).toHaveProperty('irregularBaseFontSizeClassName')

    document.querySelector('html').style['font-size'] = '16px'
    expect(UIController.hasRegularBaseFontSize()).toBeTruthy()

    document.querySelector('html').style['font-size'] = '14px'
    expect(UIController.hasRegularBaseFontSize()).toBeFalsy()

    expect(UIController.getLanguageName()).toEqual({name: '', code: undefined})
    expect(UIController.getLanguageName(latID)).toEqual({name: 'Latin', code: 'lat'})
    expect(UIController.getLanguageName('pppp')).toEqual({name: '', code: 'pppp'})
  })

  it('3 UIController - getZIndexMax method', () => {

    uiC.zIndex = HTMLPage.getZIndexMax(2000)
    expect(uiC.zIndex).toEqual(2001)

    uiC.zIndex = HTMLPage.getZIndexMax(2010)
    expect(uiC.zIndex).toEqual(2010)

    uiC.zIndex = HTMLPage.zIndexRecursion(document.querySelector('body'), Number.NEGATIVE_INFINITY)
    expect(uiC.zIndex).toEqual(2000)
  })

  it('4 UIController - formatFullDefinitions method', () => {
    let testLexeme = {
      lemma: {
        word: 'fooword'
      },
      meaning: {
        fullDefs: [
          { text: 'fooText1' },
          { text: 'fooText2' }
        ]
      }
    }
    let res = uiC.formatFullDefinitions(testLexeme)

    expect(res).toEqual('<h3>fooword</h3>\nfooText1<br>\nfooText2<br>\n')
  })

  it('5 UIController - messages methods', () => {
    uiC.message('foomessage1')

    expect(uiC.panel.panelData.messages).toEqual([ 'foomessage1' ])

    uiC.addMessage('foomessage2')
    expect(uiC.panel.panelData.messages).toEqual([ 'foomessage1', 'foomessage2' ])

    uiC.addImportantMessage('fooImportant1')
    expect(uiC.panel.panelData.messages).toEqual([ 'foomessage1', 'foomessage2', 'fooImportant1' ])

    expect(uiC.panel.panelData.notification.visible).toBeTruthy()
    expect(uiC.panel.panelData.notification.important).toBeTruthy()
    expect(uiC.panel.panelData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.panel.panelData.notification.text).toEqual('fooImportant1')

    expect(uiC.popup.vi.messages).toEqual([ 'fooImportant1' ])

    expect(uiC.popup.vi.popupData.notification.visible).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.important).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.popup.vi.popupData.notification.text).toEqual('fooImportant1')
  })

  it('6 UIController - showLanguageInfo methods', () => {
    uiC.showLanguageInfo()
    let languageName = UIController.getLanguageName(LMF.getLanguageIdFromCode(uiC.panel.options.items.preferredLanguage.currentValue)).name

    expect(uiC.panel.panelData.notification.visible).toBeTruthy()
    expect(uiC.panel.panelData.notification.important).toBeTruthy()
    expect(uiC.panel.panelData.notification.showLanguageSwitcher).toBeTruthy()
    expect(uiC.panel.panelData.notification.text).toEqual(l10n.messages.TEXT_NOTICE_CHANGE_LANGUAGE.get(languageName))

    expect(uiC.popup.vi.popupData.notification.visible).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.important).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.showLanguageSwitcher).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.text).toEqual(l10n.messages.TEXT_NOTICE_CHANGE_LANGUAGE.get(languageName))

    let testHomonym = {
      lexemes: [
        {
          isPopulated: function () { return true },
          languageID: LMF.getLanguageIdFromCode('lat')
        }
      ]
    }
    uiC.showLanguageInfo(testHomonym)
    expect(uiC.panel.panelData.notification.visible).toBeTruthy()
    expect(uiC.panel.panelData.notification.important).toBeFalsy()
    expect(uiC.panel.panelData.notification.showLanguageSwitcher).toBeFalsy()

    expect(uiC.popup.vi.popupData.notification.visible).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.important).toBeFalsy()
    expect(uiC.popup.vi.popupData.notification.showLanguageSwitcher).toBeFalsy()

    // in this case, the language shown in the language notification should be
    // the language actually tried, not the default from options
    let testHomonymNoLexemes = {
      languageID: LMF.getLanguageIdFromCode('grc')
    }
    uiC.showLanguageInfo(testHomonymNoLexemes)
    expect(uiC.panel.panelData.notification.visible).toBeTruthy()
    expect(uiC.panel.panelData.notification.important).toBeTruthy()
    expect(uiC.panel.panelData.notification.showLanguageSwitcher).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.text).toEqual(l10n.messages.TEXT_NOTICE_CHANGE_LANGUAGE.get(UIController.getLanguageName(testHomonymNoLexemes.languageID).name))
  })

  it('7 UIController - showStatusInfo methods', () => {
    uiC.showStatusInfo('fooSelectionText', latID)
    expect(uiC.panel.panelData.status.languageName).toEqual('Latin')
    expect(uiC.panel.panelData.status.selectedText).toEqual('fooSelectionText')

    expect(uiC.popup.vi.popupData.status.languageName).toEqual('Latin')
    expect(uiC.popup.vi.popupData.status.selectedText).toEqual('fooSelectionText')
  })

  it('8 UIController - showErrorInfo methods', () => {
    uiC.showErrorInfo('fooError')
    expect(uiC.panel.panelData.notification.visible).toBeTruthy()
    expect(uiC.panel.panelData.notification.important).toBeTruthy()
    expect(uiC.panel.panelData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.panel.panelData.notification.text).toEqual('fooError')
  })

  it('9 UIController - showImportantNotification methods', () => {
    uiC.showImportantNotification('fooImportant')
    expect(uiC.panel.panelData.notification.visible).toBeTruthy()
    expect(uiC.panel.panelData.notification.important).toBeTruthy()
    expect(uiC.panel.panelData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.panel.panelData.notification.text).toEqual('fooImportant')

    expect(uiC.popup.vi.popupData.notification.visible).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.important).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.popup.vi.popupData.notification.text).toEqual('fooImportant')
  })

  it('10 UIController - changeTab methods', () => {
    uiC.changeTab('options')

    for (let tab in uiC.panel.panelData.tabs) {
      if (tab === 'options') {
        expect(uiC.panel.panelData.tabs[tab]).toBeTruthy()
      } else {
        expect(uiC.panel.panelData.tabs[tab]).toBeFalsy()
      }
    }
  })

  it('11 UIController - setTargetRect methods', () => {
    expect(uiC.popup.vi.popupData.targetRect).toEqual({})

    let testRect = {
      left: 10,
      top: 10
    }
    uiC.setTargetRect(testRect)

    expect(uiC.popup.vi.popupData.targetRect).toEqual(testRect)
  })

  it('12 UIController - newLexicalRequest methods', () => {
    let oldRT = uiC.popup.vi.popupData.requestStartTime

    uiC.newLexicalRequest(latID)
    expect(uiC.popup.vi.popupData.requestStartTime).toBeGreaterThan(oldRT)

    expect(uiC.popup.vi.definitions).toEqual({})
    expect(uiC.popup.vi.translations).toEqual({})
    expect(uiC.popup.vi.lexemes).toEqual([])
    expect(uiC.popup.vi.popupData.providers).toEqual([])

    expect(uiC.popup.vi.popupData.defDataReady).toBeFalsy()
    expect(uiC.popup.vi.popupData.inflDataReady).toBeFalsy()
    expect(uiC.popup.vi.popupData.morphDataReady).toBeFalsy()
    expect(uiC.popup.vi.popupData.translationsDataReady).toBeFalsy()
    expect(uiC.popup.vi.popupData.showProviders).toBeFalsy()
    expect(uiC.popup.vi.popupData.hasTreebank).toBeFalsy()

    expect(uiC.popup.vi.popupData.notification.visible).toBeFalsy()
    expect(uiC.popup.vi.popupData.notification.important).toBeFalsy()
    expect(uiC.popup.vi.popupData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.popup.vi.popupData.notification.text).toEqual('')

    expect(uiC.popup.vi.popupData.status.languageName).toEqual('')
    expect(uiC.popup.vi.popupData.status.selectedText).toEqual('')

    expect(uiC.popup.vi.visible).toBeTruthy()

    expect(uiC.panel.panelData.shortDefinitions).toEqual([])
    expect(uiC.panel.panelData.fullDefinitions).toEqual('')
    expect(uiC.panel.panelData.messages).toEqual('')
    expect(uiC.panel.panelData.treebankComponentData.data.word).toEqual({})
    expect(uiC.panel.panelData.treebankComponentData.visible).toBeFalsy()

    expect(uiC.panel.panelData.notification.visible).toBeFalsy()
    expect(uiC.panel.panelData.notification.important).toBeFalsy()
    expect(uiC.panel.panelData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.panel.panelData.notification.text).toEqual('')

    expect(uiC.panel.panelData.status.languageName).toEqual('')
    expect(uiC.panel.panelData.status.selectedText).toEqual('')

    expect(uiC.panel.visible).toBeFalsy()
    expect(uiC.panel.panelData.tabs.definitions).toBeTruthy()
  })

  it('13 UIController - updateMorphology, updateProviders methods', () => {
    let testHomonymEmpty = {
      lexemes: []
    }

    let testHomonym = {
      lexemes: [
        {
          sort: function () { },
          lemma: {
            languageID: latID
          },
          meaning: {
            shortDefs: [
              {
                provider: 'fooProvider1'
              }
            ]
          },
          provider: 'fooProvider2'
        }
      ]
    }
    uiC.popup.vi.popupData.updates = 1

    uiC.updateMorphology(testHomonymEmpty)

    expect(uiC.popup.vi.linkedFeatures).toEqual([])
    expect(uiC.popup.vi.popupData.updates).toEqual(2)
    expect(uiC.popup.vi.popupData.providers).toEqual([])

    uiC.updateMorphology(testHomonym)

    expect(uiC.popup.vi.linkedFeatures).toEqual(LMF.getLanguageModel(latID).grammarFeatures())
    expect(uiC.popup.vi.lexemes).toEqual(testHomonym.lexemes)
    expect(uiC.popup.vi.popupData.morphDataReady).toBeTruthy()
    expect(uiC.panel.panelData.lexemes).toEqual(testHomonym.lexemes)
    expect(uiC.popup.vi.popupData.updates).toEqual(3)
    expect(uiC.popup.vi.popupData.providers).toEqual(['fooProvider2', 'fooProvider1'])
  })

  it('14 UIController - updateGrammar methods', () => {
    uiC.updateGrammar([])

    let message = l10n.messages.TEXT_NOTICE_GRAMMAR_NOTFOUND.get()

    expect(uiC.panel.panelData.grammarRes).toEqual({ provider: message })

    uiC.updateGrammar([ 'fooUrl1', 'fooUrl2' ])
    expect(uiC.panel.panelData.grammarRes).toEqual('fooUrl1')
  })

  it('15 UIController - updateDefinitions methods', () => {
    let testHomonym = {
      lexemes: [
        {
          lemma: {
            features: {}
          },
          meaning: {
            shortDefs: [],
            fullDefs: []
          }
        }
      ]
    }
    uiC.popup.vi.popupData.updates = 1
    uiC.updateDefinitions(testHomonym)

    expect(uiC.popup.vi.definitions).toEqual({})
    expect(uiC.popup.vi.popupData.defDataReady).toBeFalsy()
    expect(uiC.popup.vi.popupData.updates).toEqual(2)

    testHomonym.lexemes[0].lemma = {
      ID: 'f1',
      word: 'fooword',
      features: {
        fooFeature: {}
      }
    }

    uiC.updateDefinitions(testHomonym)
    expect(uiC.popup.vi.definitions.f1).toEqual([new Definition('No definition found.', 'en-US', 'text/plain', 'fooword')])

    testHomonym.lexemes[0].meaning.fullDefs = [
      { text: 'fooFullDefinition' }
    ]

    uiC.updateDefinitions(testHomonym)

    expect(uiC.panel.panelData.fullDefinitions).toContain('fooFullDefinition')
    expect(uiC.popup.vi.popupData.defDataReady).toBeTruthy()

    testHomonym.lexemes[0].meaning.shortDefs = [
      { text: 'fooShortDefinition' }
    ]

    uiC.updateDefinitions(testHomonym)
    expect(uiC.popup.vi.definitions).toEqual({ f1: [{ text: 'fooShortDefinition' }] })
    expect(uiC.panel.panelData.shortDefinitions).toEqual([{ text: 'fooShortDefinition' }])

    let testShortDef = {
      text: 'fooShortDefinition',
      language: 'en-US',
      format: 'text/plain',
      lemmaText: 'fooword',

      provider: { uri: 'fooprovideruri' }
    }
    testHomonym.lexemes[0].meaning.shortDefs = [ testShortDef ]
    testHomonym.lexemes[0].provider = { uri: 'fooprovideruri' }

    let testDefinition = new Definition('fooShortDefinition', 'en-US', 'text/plain', 'fooword')
    uiC.updateDefinitions(testHomonym)

    expect(uiC.popup.vi.definitions).toEqual({ f1: [ testDefinition ] })
    expect(uiC.panel.panelData.shortDefinitions).toEqual([ testShortDef ])

    testHomonym.lexemes[0].provider = { uri: 'fooprovideruri1' }
    uiC.updateDefinitions(testHomonym)

    expect(uiC.popup.vi.definitions).toEqual({ f1: [ testShortDef ] })
  })

  it('16 UIController - updateTranslations methods', () => {
    let testHomonym = {
      lexemes: [
        {
          lemma: {}
        }
      ]
    }
    uiC.popup.vi.popupData.updates = 1

    uiC.updateTranslations(testHomonym)

    expect(uiC.popup.vi.translations).toEqual({})
    expect(uiC.popup.vi.popupData.translationsDataReady).toBeTruthy()
    expect(uiC.popup.vi.popupData.updates).toEqual(2)

    testHomonym.lexemes[0].lemma = {
      ID: 'f1',
      translation: 'footranslation'
    }

    uiC.updateTranslations(testHomonym)

    expect(uiC.popup.vi.translations).toEqual({ f1: 'footranslation' })
  })

  it('17 UIController - updatePageAnnotationData, updateWordAnnotationData methods', () => {
    uiC.updatePageAnnotationData({ treebank: {} })
    expect(uiC.panel.panelData.treebankComponentData.data.page).toEqual({})

    uiC.updatePageAnnotationData({ treebank: { page: 'foopage' } })
    expect(uiC.panel.panelData.treebankComponentData.data.page).toEqual('foopage')

    uiC.updateWordAnnotationData()
    expect(uiC.panel.panelData.treebankComponentData.data.word).toEqual({})
    expect(uiC.popup.vi.popupData.hasTreebank).toBeFalsy()

    uiC.updateWordAnnotationData({})
    expect(uiC.panel.panelData.treebankComponentData.data.word).toEqual({})
    expect(uiC.popup.vi.popupData.hasTreebank).toBeFalsy()

    uiC.updateWordAnnotationData({ treebank: { word: 'fooword' } })
    expect(uiC.panel.panelData.treebankComponentData.data.word).toEqual('fooword')
    expect(uiC.popup.vi.popupData.hasTreebank).toBeTruthy()
  })

  it('18 UIController - updateLanguage', () => {
    uiC.panel.requestGrammar = jest.fn(function () { })
    uiC.updateLanguage(Constants.LANG_LATIN)

    expect(uiC.panel.requestGrammar).toHaveBeenCalled()
    expect(uiC.panel.panelData.infoComponentData.languageName).toEqual('Latin')
    expect(uiC.popup.vi.popupData.currentLanguageName).toEqual('Latin')

    uiC.updateLanguage(Constants.LANG_ARABIC)
    expect(uiC.panel.panelData.inflectionComponentData.enabled).toBeFalsy()
  })

  // TODO: Rewrite after updateInflection changes are finalized
  it.skip('19 UIController - updateInflections', () => {
    let testHomonym = {
      languageID: latID
    }
    let testInflectionData = {
      hasInflectionSets: true
    }

    uiC.updateInflections(testHomonym)

    expect(uiC.panel.panelData.inflectionComponentData.enabled).toBeTruthy()
    expect(uiC.panel.panelData.inflectionComponentData.inflectionData).toEqual(testInflectionData)
    expect(uiC.popup.vi.popupData.inflDataReady).toBeTruthy()

    testInflectionData.hasInflectionSets = false

    uiC.updateInflections(testInflectionData, testHomonym)
    expect(uiC.popup.vi.popupData.inflDataReady).toBeFalsy()

    testHomonym.languageID = araID
    testInflectionData.hasInflectionSets = true

    uiC.updateInflections(testInflectionData, testHomonym)
    expect(uiC.panel.panelData.inflectionComponentData.enabled).toBeFalsy()
    expect(uiC.popup.vi.popupData.inflDataReady).toBeFalsy()
  })

  it('20 UIController - clear, open', () => {
    uiC.panel.clearContent = jest.fn(() => { })
    uiC.popup.vi.clearContent = jest.fn(() => { })

    uiC.clear()
    expect(uiC.panel.clearContent).toHaveBeenCalled()
    expect(uiC.popup.vi.clearContent).toHaveBeenCalled()

    uiC.panel.panelData.isOpen = false
    uiC.panel.visible = false
    uiC.popup.vi.visible = false

    uiC.featureOptions.items.uiType.setValue('popup')
    uiC.featureOptions.uiTypePanel = 'panel'

    uiC.open()
    expect(uiC.panel.panelData.isOpen).toBeFalsy()
    expect(uiC.popup.vi.visible).toBeTruthy()

    //* **********************************************
    uiC.panel.isOpen = true

    uiC.open()
    expect(uiC.panel.panelData.isOpen).toBeFalsy()
    expect(uiC.popup.vi.visible).toBeTruthy()

    //* **********************************************
    uiC.featureOptions.items.uiType.setValue('panel')

    uiC.open()
    expect(uiC.panel.panelData.isOpen).toBeTruthy()
    expect(uiC.popup.vi.visible).toBeTruthy()
  })

  it.skip('21 UIController - setRootComponentClasses', () => {
    let emptyPromise = () => { return new Promise((resolve, reject) => {}) }
    let stAdapter = { domain: 'alpheios-feature-options', set: emptyPromise }

    document.querySelector('html').style['font-size'] = '16px'

    let uiOptions1 = new Options(UIOptionDefaults, LocalStorageArea)
    uiOptions1.items.skin = undefined
    uiOptions1.items.fontSize = undefined
    uiOptions1.items.colorSchema = undefined

    let uiC1 = new UIController(state, featureOptions, resourceOptions, uiOptions1)
    uiC1.setRootComponentClasses()
    let resClasses = ['alpheios-irregular-base-font-size', 'auk--default']
    expect(uiC1.popup.vi.popupData.classes).toEqual(resClasses)
    expect(uiC1.panel.panelData.classes).toEqual(resClasses)

    //* ****************************************************************
    uiOptions1.items.skin = new OptionItem({ defaultValue: 'fooskin' }, 'skin', stAdapter)

    let uiC2 = new UIController(state, featureOptions, resourceOptions, uiOptions1)
    uiC2.setRootComponentClasses()
    resClasses.push('auk--fooskin')

    expect(uiC2.popup.vi.popupData.classes).toEqual(resClasses)
    expect(uiC2.panel.panelData.classes).toEqual(resClasses)

    //* ****************************************************************
    uiC.uiOptions.items.fontSize = new OptionItem({ defaultValue: 'foofontsize' }, 'fontSize', stAdapter)

    uiC.setRootComponentClasses()

    resClasses.push(`alpheios-font_foofontsize_class`)

    expect(uiC.popup.vi.popupData.classes).toEqual(resClasses)
    expect(uiC.panel.panelData.classes).toEqual(resClasses)

    //* ****************************************************************
    uiC.uiOptions.items.colorSchema = new OptionItem({ defaultValue: 'foocolorSchema' }, 'colorSchema', stAdapter)

    uiC.setRootComponentClasses()
    resClasses.push(`alpheios-color_schema_foocolorSchema_class`)

    expect(uiC.popup.vi.popupData.classes).toEqual(resClasses)
    expect(uiC.panel.panelData.classes).toEqual(resClasses)
  })

  it('22 UIController - updateStyleClass', () => {
    uiC.popup.vi.popupData.classes = []
    uiC.panel.panelData.classes = []

    uiC.updateStyleClass('alpheios-font_', 'footype')

    expect(uiC.popup.vi.popupData.classes).toEqual([])
    expect(uiC.panel.panelData.classes).toEqual([])

    uiC.popup.vi.popupData.classes = [ 'alpheios-font_footype2_class' ]
    uiC.panel.panelData.classes = [ 'alpheios-font_footype2_class' ]

    uiC.updateStyleClass('alpheios-font_', 'footype2')
    expect(uiC.popup.vi.popupData.classes).toEqual([ 'alpheios-font_footype2_class' ])
    expect(uiC.panel.panelData.classes).toEqual([ 'alpheios-font_footype2_class' ])
  })

  it('23 UIController - updateFontSizeClass, updateColorSchemaClass, changeSkin', () => {
    uiC.updateStyleClass = jest.fn(function () { })
    uiC.setRootComponentClasses = jest.fn(function () { })

    uiC.updateFontSizeClass('footype')
    expect(uiC.updateStyleClass).toHaveBeenCalled()

    uiC.updateColorSchemaClass('footype')
    expect(uiC.updateStyleClass).toHaveBeenCalled()

    uiC.changeSkin()
    expect(uiC.setRootComponentClasses).toHaveBeenCalled()
  })

  it('24 UIController - panel methods - setPositionTo, attachToLeft, attachToRight', () => {
    uiC.panel.setPositionTo('right')

    expect(uiC.panel.options.items.panelPosition.currentValue).toEqual('right')

    uiC.panel.attachToLeft()
    expect(uiC.panel.options.items.panelPosition.currentValue).toEqual('left')

    uiC.panel.attachToRight()
    expect(uiC.panel.options.items.panelPosition.currentValue).toEqual('right')
  })

  it('25 UIController - panel methods - isOpen, toggle, requestGrammar, showMessage, appendMessage, clearMessages', () => {
    uiC.panel.open = jest.fn(() => { })
    uiC.panel.close = jest.fn(() => { })

    uiC.state.isPanelOpen = () => true

    expect(uiC.panel.isOpen()).toBeTruthy()

    uiC.panel.toggle()

    uiC.state.isPanelOpen = () => false

    expect(uiC.panel.isOpen()).toBeFalsy()

    uiC.panel.toggle()

    expect(uiC.panel.open).toHaveBeenCalledTimes(1)
    expect(uiC.panel.close).toHaveBeenCalledTimes(1)

    ResourceQuery.create = jest.fn(() => { return { getData: () => {} } })

    uiC.panel.requestGrammar()
    expect(ResourceQuery.create).toHaveBeenCalled()

    uiC.panel.panelData.messages = []
    uiC.panel.showMessage('fooMessage')
    expect(uiC.panel.panelData.messages).toEqual([ 'fooMessage' ])

    uiC.panel.appendMessage('fooMessage1')
    expect(uiC.panel.panelData.messages).toEqual([ 'fooMessage', 'fooMessage1' ])

    uiC.panel.clearMessages()
    expect(uiC.panel.panelData.messages).toEqual([])
  })

  it('26 UIController - panel methods - settingChange', () => {
    uiC.panel.settingChange('locale', 'French')
    expect(uiC.panel.options.items.locale.currentValue).toEqual('fr')

    let setLocaleFN = jest.fn(() => { })
    uiC.presenter = { setLocale: setLocaleFN }
    uiC.panel.settingChange('locale', 'English (US)')
    expect(uiC.presenter.setLocale).toHaveBeenCalled()

    uiC.updateLanguage = jest.fn(() => { })
    uiC.panel.settingChange('preferredLanguage', 'Greek')
    expect(uiC.panel.options.items.preferredLanguage.currentValue).toEqual('grc')
    expect(uiC.updateLanguage).toHaveBeenCalled()

    uiC.updateVerboseMode = jest.fn(() => { })
    uiC.panel.settingChange('verboseMode', 'Normal')
    expect(uiC.panel.options.items.verboseMode.currentValue).toEqual('normal')
    expect(uiC.updateVerboseMode).toHaveBeenCalled()
  })

  it('27 UIController - panel methods - resourceSettingChange', () => {
    let testName = 'lexicons-grc'
    let testValues = ['Liddell, Scott, Jones']

    let checkValues = uiC.resourceOptions.items.lexicons.filter((f) => f.name === testName)[0].values.filter(f => testValues.indexOf(f.text) > -1)
    uiC.panel.resourceSettingChange(testName, testValues)
    expect(uiC.panel.resourceOptions.items.lexicons.filter((f) => f.name === testName)[0].currentValue).toEqual(checkValues.map(f => f.value))
  })

  it('28 UIController - panel methods - uiOptionChange', () => {
    uiC.updateFontSizeClass = jest.fn(() => { })
    uiC.updateColorSchemaClass = jest.fn(() => { })
    uiC.changeSkin = jest.fn(() => { })
    uiC.popup.close = jest.fn(() => { })
    uiC.popup.open = jest.fn(() => { })

    uiC.panel.uiOptionChange('fontSize', 'medium')
    expect(uiC.uiOptions.items.fontSize.currentValue).toEqual('medium')
    expect(uiC.updateFontSizeClass).toHaveBeenCalled()

    uiC.panel.uiOptionChange('colorSchema', 'light')
    expect(uiC.uiOptions.items.colorSchema.currentValue).toEqual('light')
    expect(uiC.updateColorSchemaClass).toHaveBeenCalled()

    uiC.panel.uiOptionChange('skin', 'Alpheios Default Skin')
    expect(uiC.uiOptions.items.skin.currentValue).toEqual('default')
    expect(uiC.changeSkin).toHaveBeenCalled()

    uiC.panel.uiOptionChange('popup', 'Default Popup Layout')
    // expect(uiC.popup.close).toHaveBeenCalled()
    expect(uiC.popup.currentPopupComponent).toEqual('popup')
    // expect(uiC.popup.open).toHaveBeenCalled()
  })

  it('29 UIController - popup methods - showMessage, clearMessages', () => {
    uiC.popup.vi.showMessage('fooMessage')
    expect(uiC.popup.vi.messages).toEqual([ 'fooMessage' ])

    uiC.popup.vi.appendMessage('fooMessage1')
    expect(uiC.popup.vi.messages).toEqual([ 'fooMessage', 'fooMessage1' ])

    uiC.popup.vi.clearMessages()
    expect(uiC.popup.vi.messages).toEqual([])
  })

  it('30 UIController - popup methods - close', () => {
    uiC.popup.vi.visible = true
    uiC.popup.vi.close()
    expect(uiC.popup.vi.visible).toBeFalsy()
  })

  it('31 UIController - popup methods - showErrorInformation', () => {
    uiC.popup.vi.showErrorInformation('fooError')
    expect(uiC.popup.vi.popupData.notification.visible).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.important).toBeTruthy()
    expect(uiC.popup.vi.popupData.notification.showLanguageSwitcher).toBeFalsy()
    expect(uiC.popup.vi.popupData.notification.text).toEqual('fooError')
  })

  it('32 UIController - popup methods - sendFeature, showPanelTab', () => {
    uiC.panel.requestGrammar = jest.fn(() => { })
    uiC.panel.changeTab = jest.fn(() => { })
    uiC.panel.open = jest.fn(() => { })

    uiC.popup.vi.sendFeature()
    uiC.popup.vi.showPanelTab()
    expect(uiC.panel.requestGrammar).toHaveBeenCalledTimes(1)
    expect(uiC.panel.changeTab).toHaveBeenCalledTimes(2)
    expect(uiC.panel.open).toHaveBeenCalledTimes(2)
  })

  it('33 UIController - popup methods - settingChange', () => {
    uiC.popup.vi.settingChange('locale', 'French')
    expect(uiC.popup.vi.options.items.locale.currentValue).toEqual('fr')

    let setLocaleFN = jest.fn(() => { })
    uiC.presenter = { setLocale: setLocaleFN }
    uiC.popup.vi.settingChange('locale', 'English (US)')
    expect(uiC.presenter.setLocale).toHaveBeenCalled()

    uiC.updateLanguage = jest.fn(() => { })
    uiC.popup.vi.settingChange('preferredLanguage', 'Greek')
    expect(uiC.popup.vi.options.items.preferredLanguage.currentValue).toEqual('grc')
    expect(uiC.updateLanguage).toHaveBeenCalled()
  })

  it('34 UIController - popup methods - resourceSettingChange', () => {
    let testName = 'lexicons-grc'
    let testValues = ['Liddell, Scott, Jones']

    let checkValues = uiC.resourceOptions.items.lexicons.filter((f) => f.name === testName)[0].values.filter(f => testValues.indexOf(f.text) > -1)
    uiC.popup.vi.resourceSettingChange(testName, testValues)
    expect(uiC.popup.vi.resourceOptions.items.lexicons.filter((f) => f.name === testName)[0].currentValue).toEqual(checkValues.map(f => f.value))
  })

  it('35 UIController - popup methods - uiOptionChange', () => {
    uiC.updateFontSizeClass = jest.fn(() => { })
    uiC.updateColorSchemaClass = jest.fn(() => { })
    uiC.changeSkin = jest.fn(() => { })
    uiC.popup.vi.close = jest.fn(() => { })
    uiC.popup.vi.open = jest.fn(() => { })

    uiC.popup.vi.uiOptionChange('fontSize', 'medium')
    expect(uiC.uiOptions.items.fontSize.currentValue).toEqual('medium')
    expect(uiC.updateFontSizeClass).toHaveBeenCalled()

    uiC.popup.vi.uiOptionChange('colorSchema', 'light')
    expect(uiC.uiOptions.items.colorSchema.currentValue).toEqual('light')
    expect(uiC.updateColorSchemaClass).toHaveBeenCalled()

    uiC.popup.vi.uiOptionChange('skin', 'Alpheios Default Skin')
    expect(uiC.uiOptions.items.skin.currentValue).toEqual('default')
    expect(uiC.changeSkin).toHaveBeenCalled()

    uiC.popup.vi.uiOptionChange('popup', 'Default Popup Layout')
    expect(uiC.popup.vi.close).toHaveBeenCalled()
    expect(uiC.popup.vi.currentPopupComponent).toEqual('popup')
    expect(uiC.popup.vi.open).toHaveBeenCalled()
  })

  it('36 UIController -overrideHelp option affects default tab', () => {
    let uiC = UIController.create(state, { overrideHelp: true})
    expect(uiC.tabs.DEFAULT).toEqual('settings')
    let uiC2 = UIController.create(state, { overrideHelp: false})
    expect(uiC2.tabs.DEFAULT).toEqual('info')
  })

})
