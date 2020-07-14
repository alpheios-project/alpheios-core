import Vuex from 'vuex'
import 'whatwg-fetch'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import LexisModule from '@/vue/vuex-modules/data/lexis.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import TempStorageArea from '@/lib/options/temp-storage-area.js'

import AuthModule from '@/vue/vuex-modules/data/auth-module.js'

import Platform from '@/lib/utility/platform.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Lexeme, Lemma, Homonym, LanguageModelFactory as LMF } from 'alpheios-data-models'
import LexicalQuery from '@/lib/queries/lexical-query.js'
import UIController from '@/lib/controllers/app-controller.js'

import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'
import { Fixture } from 'alpheios-fixtures'

export default class BaseTestHelp {
  static get defaultFeatureOptions () {
    const ta = new TempStorageArea('alpheios-feature-settings')
    return new Options(FeatureOptionDefaults, ta)
  }

  static get defaultResourceOptions () {
    const ta = new TempStorageArea('alpheios-resource-settings')
    return new Options(LanguageOptionDefaults, ta)
  }

  static get defaultUIOptions () {
    const ta = new TempStorageArea('alpheios-ui-settings')
    return new Options(UIOptionDefaults, ta)
  }

  static baseVuexStore () {
    return new Vuex.Store({
      modules: {
        popup: {
          namespaced: true,
          state: {
            visible: false
          },
          actions: {},
          getters: {},
          mutations: {
            setPopupVisible (state, value) {
              state.visible = value
            }
          }
        },
        panel: {
          namespaced: true,
          state: {
            visible: false,
            position: 'left',
            orientation: Platform.orientations.PORTRAIT,
            visibleFootnoteId: null
          },
          mutations: {
            setTestOrientation (state, value) {
              state.orientation = value
            },
            setTestPanelPosition (state, value) {
              state.position = value
            },
            setVisibleFootnote (state, value) {
              state.visibleFootnoteId = value
            },
            setVisible (state, value) {
              state.visible = value
            }
          },
          actions: {},
          getters: {}
        },
        actionPanel: {
          namespaced: true,
          state: {
            moduleConfig: {
              initialShift: {
                x: 0, y: 0
              }
            },
            initialPos: {},
            visible: false
          },
          mutations: {
            setInitialPos (state, value) {
              state.initialPos = value
            },
            setVisible (state, value) {
              state.visible = value
            }
          }
        },
        app: {
          namespaced: true,
          state: {
            selectedText: '',
            languageName: '',
            languageCode: '',
            currentLanguageName: '',
            morphDataReady: false,
            homonymDataReady: false,
            shortDefUpdateTime: 0,
            fullDefUpdateTime: 0,
            hasInflData: false,
            embedLibActive: false,
            currentLanguageID: null,
            wordUsageExamplesReady: false,
            wordListUpdateTime: 0,
            grammarRes: {},
            updatedGrammar: 0,
            linkedFeatures: [],
            selectedLookupLangCode: 'lat',
            translationsDataReady: false,
            lexicalRequest: {
              startTime: 0
            },
            currentLanguageCode: null
          },
          mutations: {
            setTestCurrentLanguageName (state, value) {
              state.currentLanguageName = value
            },
            setTestCurrentLanguageID (state, value) {
              state.currentLanguageID = value
            },
            setCurrentLanguage (state, data) {
              state.currentLanguageID = data.languageID
              state.currentLanguageCode = data.languageCode
            },
            setTestMorphDataReady (state, value) {
              state.morphDataReady = value
            },
            setTestShortDefUpdateTime (state, value) {
              state.shortDefUpdateTime = value
            },
            setTestFullDefUpdateTime (state, value) {
              state.fullDefUpdateTime = value
            },
            setTestHomonymDataReady (state, value) {
              state.homonymDataReady = value
            },
            setTestHasInflData (state, value) {
              state.hasInflData = value
            },
            setTestEmbedLibActive (state, value) {
              state.embedLibActive = value
            },
            setTestWordUsageExamplesReady (state, value) {
              state.wordUsageExamplesReady = value
            },
            setTestWordListUpdateTime (state, value) {
              state.wordListUpdateTime = value
            },
            setGrammarProvider (state, value) {
              state.grammarRes = value
            },
            setLinkedFeatures (state, value) {
              state.linkedFeatures = value
            },
            setSelectedLookupLang (state, value) {
              state.selectedLookupLangCode = value
            },
            setTranslationsDataReady (state, value) {
              state.translationsDataReady = value
            },
            lexicalRequestStarted (state, data) {
              state.lexicalRequest.startTime = Date.now()
            },
            setUpdatedGrammar (state) {
              state.updatedGrammar = state.updatedGrammar + 1
            }
          },
          getters: {
            shortDefDataReady: (state) => {
              return state.shortDefUpdateTime > 0
            },
            fullDefDataReady: (state) => {
              return state.fullDefUpdateTime > 0
            }
          }
        },
        ui: {
          namespaced: true,
          state: {
            activeTab: 'info',
            rootClasses: [],
            messages: [],
            notification: {
              visible: false,
              important: false,
              showLanguageSwitcher: false,
              text: null
            },
            hint: {
              visible: false,
              text: null
            }
          },
          mutations: {
            setTestCurrentTab (state, name) {
              state.activeTab = name
            },
            setTestNotification (state, value) {
              const currentData = state.notification
              state.notification = Object.assign(currentData, value)
            },
            setTestHint (state, value) {
              const currentData = state.hint
              state.hint = Object.assign(currentData, value)
            }
          },
          getters: {
            isActiveTab: (state) => (tabName) => {
              return state.activeTab === tabName
            }
          }
        },
        auth: {
          namespaced: true,
          state: {
            notification: {
              visible: false,
              important: false,
              showLanguageSwitcher: false,
              text: null
            }
          },
          mutations: {
            setTestNotification (state, value) {
              const currentData = state.notification
              state.notification = Object.assign(currentData, value)
            }
          }
        },
        lexis: {
          namespaced: true,
          state: {
            hasTreebankData: false
          }
        },
        settings: {
          namespaced: true,
          state: {
            featureResetCounter: 1
          }
        }
      }
    })
  }

  static uiAPI (props) {
    const defaultProps = {
      closePopup: () => {},
      openPopup: () => {},
      closePanel: () => {},
      showPanelTab: () => {},
      zIndex: 0
    }
    return Object.assign(defaultProps, props)
  }

  static settingsAPI (props) {
    const defaultProps = {
      lookupResourceOptions: BaseTestHelp.defaultResourceOptions,
      getLexisOptions: () => { return { cedict: { target_url: 'http://target.url' } } },
      getFeatureOptions: () => { return BaseTestHelp.defaultFeatureOptions },
      getResourceOptions: () => { return BaseTestHelp.defaultResourceOptions },
      getUiOptions: () => { return BaseTestHelp.defaultUIOptions },
      verboseMode: () => { return false },
      uiOptionChange: () => {}
    }
    return Object.assign(defaultProps, props)
  }

  static appAPI (props) {
    const defaultProps = {
      platform: {
        viewport: {
          width: 0,
          height: 0
        }
      },
      state: {
        lemmaTranslationLang: 'lat',
        selectedLookupLangCode: 'lat'
      },
      wordUsageExamples: null,

      hasMorphData: () => false,
      getHomonymLexemes: () => null,
      getDefaultLangCode: () => 'lat',
      getLanguageName: UIController.getLanguageName,

      updateLanguage: () => true,
      enableWordUsageExamples: () => true,
      setSelectedLookupLang: () => true,

      newLexicalRequest: () => true
    }
    return Object.assign(defaultProps, props)
  }

  static authModule (store, api) {
    return new AuthModule(store, api, { auth: null })
  }

  static l10nModule (store, api) {
    return new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr([
        [enUS, Locales.en_US],
        [enUSData, Locales.en_US],
        [enUSInfl, Locales.en_US],
        [enGB, Locales.en_GB]
      ])
    })
  }

  static lexisModule (store, api) {
    return new LexisModule(store, api, {
      name: 'cedict'
    })
  }

  static getLexiconOptions (lexiconKey, languageID) {
    return { allow: ['https://github.com/alpheios-project/lsj'] }
  }

  static async collectHomonym (targetWord, languageID, getLexicons = true, noFixture = false) {
    const params = {
      method: 'getHomonym',
      clientId: 'alpheios-dev',
      params: {
        languageID: languageID,
        word: targetWord
      }
    }

    if (!noFixture) {
      const langCode = LMF.getLanguageCodeFromId(languageID)
      const sourceJson = Fixture.getFixtureRes({
        langCode: langCode, adapter: 'tufts', word: targetWord
      })
      params.sourceData = sourceJson
    }

    const adapterTuftsRes = await ClientAdapters.morphology.tufts(params)
    let homonym = adapterTuftsRes.result

    if (!homonym) {
      const formLexeme = new Lexeme(new Lemma(targetWord, languageID), [])
      homonym = this.homonym = new Homonym([formLexeme], targetWord)
    }

    if (getLexicons) {
      const lexiconFullOpts = BaseTestHelp.getLexiconOptions('lexicons', languageID)

      await ClientAdapters.lexicon.alpheios({
        method: 'fetchFullDefs',
        clientId: 'alpheios-dev',
        params: {
          opts: lexiconFullOpts,
          homonym: homonym,
          callBackEvtSuccess: LexicalQuery.evt.FULL_DEFS_READY,
          callBackEvtFailed: LexicalQuery.evt.FULL_DEFS_NOT_FOUND
        }
      })
    }
    return homonym
  }

  static async collectConcordance (homonym, filters = {}, paginationOptions = {}) {
    const filtersFinal = Object.assign({}, paginationOptions)

    const paginationOptionsFinal = Object.assign({
      property: 'max',
      value: 5
    }, paginationOptions)

    const adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
      method: 'getWordUsageExamples',
      params: { homonym: homonym, filters: filtersFinal, pagination: paginationOptionsFinal }
    })

    return adapterConcordanceRes.result
  }

  static async collectTranslations (homonym, locale = 'it') {
    let adapterTranslationRes
    try {
      adapterTranslationRes = await ClientAdapters.lemmatranslation.alpheios({
        method: 'fetchTranslations',
        clientId: 'alpheios-dev',
        params: {
          homonym: homonym,
          browserLang: locale
        }
      })
    } catch (e) {
      console.info(e)
    }
  }

  static createEventWithSelection (text, start, eventEl) {
    const testElement2 = document.createElement('p')
    const node = document.createTextNode(text)
    testElement2.appendChild(node)
    document.body.appendChild(testElement2)

    const evtHandler = jest.fn(() => {})
    const eventEl2 = new MouseDblClick(testElement2, evtHandler)
    eventEl2.start = eventEl.start
    eventEl2.start = eventEl.end
    eventEl2.end.target = testElement2

    testElement2.ownerDocument.getSelection = jest.fn(() => {
      return {
        anchorNode: {
          data: text,
          isEqualNode: (node) => node.data === text
        },
        anchorOffset: start,
        focusNode: {
          data: text
        },
        setBaseAndExtent: () => {},
        removeAllRanges: () => {},
        addRange: () => {}
      }
    })

    return eventEl2
  }

  static createUIState () {

  }
}
