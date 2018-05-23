/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Lookup from '../../src/vue-components/lookup.vue'
import Setting from '../../src/vue-components/setting.vue'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

import L10n from '../../src/lib/l10n/l10n'
import Locales from '../../src/locales/locales'
import enUS from '../../src/locales/en-us/messages.json'
import enGB from '../../src/locales/en-gb/messages.json'

import Options from '../../src/lib/options/options.js'
import ContentOptionDefaults from '../../src/settings/content-options-defaults.json'
import TempStorageArea from '../../src/lib/options/temp-storage-area.js'
import LanguageOptionDefaults from '../../src/settings/language-options-defaults.json'

describe('lookup.test.js', () => {
  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let options = new Options(ContentOptionDefaults, TempStorageArea)
  let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

  let cmpL10n = mount(Lookup, {
    propsData: {
      uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
    }
  })

  let cmpGrc = mount(Lookup, {
    propsData: {
      uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions },
      parentLanguage: 'Greek'
    }
  })

  it('There are three items - input, button, settings', () => {
    let input = cmpL10n.find('.alpheios-lookup__form').find('.alpheios-lookup__input')
    expect(input.is('input')).toBeTruthy()

    let button = cmpL10n.find('.alpheios-lookup__form').find('.alpheios-lookup__button')
    expect(button.is('button')).toBeTruthy()

    let settings = cmpL10n.find('.alpheios-lookup__form').find('.alpheios-lookup__settings')
    expect(settings.is('div')).toBeTruthy()
  })

  it('There is a tooltip on the button with text', () => {
    let tooltiptext = cmpL10n.find('.alpheios-lookup__form').find('.tooltiptext')
    expect(tooltiptext.is('span')).toBeTruthy()
    expect(tooltiptext.text().length).not.toEqual(0)
  })

  it('If uiController has l10n property - than button label = LABEL_LOOKUP_BUTTON', () => {
    expect(cmpL10n.vm.buttonLabel).toEqual(l10n.messages.LABEL_LOOKUP_BUTTON)
  })

  it('If uiController has l10n property - than tooltip label = TOOLTIP_LOOKUP_BUTTON', () => {
    expect(cmpL10n.vm.tooltipLabel).toEqual(l10n.messages.TOOLTIP_LOOKUP_BUTTON)
  })

  it('If uiController has l10n property - than input placeholder = PLACEHOLDER_LOOKUP_INPUT', () => {
    expect(cmpL10n.vm.inputPlaceholder).toEqual(l10n.messages.PLACEHOLDER_LOOKUP_INPUT)
  })

  it('If uiController has l10n property - than input placeholder = PLACEHOLDER_LOOKUP_INPUT', () => {
    expect(cmpL10n.vm.labelSettings).toEqual(l10n.messages.LABEL_LOOKUP_SETTINGS)
  })

  it('Language settings are invisible on component load', () => {
    expect(cmpL10n.vm.showLanguageSettings).toBeFalsy()
  })

  it('Language settings becomes visible on settings link click', () => {
    cmpL10n.find('.alpheios-lookup__settings-link').trigger('click')

    expect(cmpL10n.vm.showLanguageSettings).toBeTruthy()
  })

  it('Language settings contains settings components', () => {
    cmpL10n.setData({ showLanguageSettings: true })
    expect(cmpL10n.find(Setting).exists()).toBeTruthy()
  })

  it('If language === lat then there is one setting component', () => {
    cmpL10n.setData({ showLanguageSettings: true })
    expect(cmpL10n.findAll(Setting).length).toBe(1)
  })
  it('If language === Greek then there are two settings component', (done) => {
    cmpL10n.setData({ showLanguageSettings: true })
    cmpL10n.vm.settingChange('preferredLanguage', 'Greek')

    Vue.nextTick(function () {
      expect(cmpL10n.findAll(Setting).length).toBe(2)
      done()
    })
  })
  it('If obeys currentLanguage on parent', () => {
    cmpGrc.setData({ showLanguageSettings: true })
    expect(cmpGrc.findAll(Setting).length).toBe(2)
  })
}) // Create a copy of the original component with full values
