/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Lookup from '../../src/vue-components/lookup.vue'
import L10n from '../../src/lib/l10n/l10n'
import Locales from '../../src/locales/locales'
import enUS from '../../src/locales/en-us/messages.json'
import enGB from '../../src/locales/en-gb/messages.json'

describe('lookup.test.js', () => {
  let spy
  let l10 = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  it('If there is an empty uiController and l10nmessages - error is thrown', () => {
    spy = jest.spyOn(console, 'error')

    mount(Lookup, {})
    expect(spy).toHaveBeenCalled()
  })

  it('If there is am empty l10nmessages - the button is rendered with default label', () => {
    let cmp = mount(Lookup, {})
    expect(cmp.find('.uk-button').text()).toEqual(cmp.defaultButtonLabel)
  })

  it('If there is not empty l10nmessages - the button with message LABEL_LOOKUP_BUTTON is rendered', () => {
    let cmp = mount(Lookup, {
      propsData: {
        l10nmessages: l10.messages
      }
    })
    expect(cmp.find('.uk-button').text()).toEqual(l10.messages.LABEL_LOOKUP_BUTTON)
  })
}) // Create a copy of the original component with full values
