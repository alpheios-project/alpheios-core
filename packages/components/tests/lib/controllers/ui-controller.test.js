/* eslint-env jest */
/* eslint-disable no-unused-vars */
import UIController from '@comp/lib/controllers/ui-controller.js'
import State from '@comp/lib/state/tab-script.js'
import Options from '@comp/lib/options/options.js'
import LanguageOptionDefaults from '@comp/settings/language-options-defaults.json'
import FeatureOptionDefaults from '@comp/settings/feature-options-defaults.json'
import UIOptionDefaults from '@comp/settings/ui-options-defaults.json'
import LocalStorageArea from '@comp/lib/options/local-storage-area.js'
import Locales from '@comp/locales/locales'
import enUS from '@comp/locales/en-us/messages.json'
import enGB from '@comp/locales/en-gb/messages.json'
import Platform from '@comp/lib/utility/platform.js'
import { Constants } from 'alpheios-data-models'
import { L10n } from 'alpheios-l10n'
import BaseTestHelp from '@compTests/helpclasses/base-test-help.js'

describe('ui-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let uiC, featureOptions, resourceOptions, state, uiState, platform

  beforeAll(() => {
    uiState = BaseTestHelp.createUIState()
    platform = new Platform()
  })

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
    // const uiOptions = BaseTestHelp.defaultUIOptions()
/*
    uiC = new AppController(state, LocalStorageArea, {})
    uiC.featureOptions = featureOptions
    uiC.resourceOptions = resourceOptions
    uiC.uiOptions = uiOptions

    await uiC.init()
    await uiC.activate()
*/
    done()
  })

  afterEach(() => {
    jest.resetModules()
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

  it('UIController: create with default arguments', () => {
    uiC = new UIController({ uiState, platform })
    expect(uiC.TAB_NAMES_DEFAULT).toBe('info')
    expect(uiC.TAB_NAMES_DISABLED).toBe('disabled')
  })

  it('UIController: create with overrideHelp on', () => {
    uiC = new UIController({ uiState, platform, overrideHelp: true })
    expect(uiC.TAB_NAMES_DEFAULT).toBe('settings')
    expect(uiC.TAB_NAMES_DISABLED).toBe('disabled')
  })
})
