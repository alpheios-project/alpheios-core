/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import PanelCompact from '@/vue/components/panel-compact.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import Platform from '@/lib/utility/platform.js'
import { Constants } from 'alpheios-data-models'

describe('panel-compact.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let defaultData

  let homonym

  beforeAll(async () => {
    homonym = await BaseTestHelp.collectHomonym('mare', Constants.LANG_LATIN)
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    defaultData = { moduleConfig: {} }

    store = BaseTestHelp.baseVuexStore()

    api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)
  })

  /**
   * @param ms
   */
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 PanelCompact - renders a vue instance (min requirements)', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 PanelCompact - computed currentTab returns active tab from store.ui', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })
    expect(store.state.ui.activeTab).toEqual('info')
    expect(cmp.vm.currentTab).toEqual('info')
  })

  it('3 PanelCompact - computed showMainTabIcons checks if show main icons (for some tabs and showNav in moduleConfig is true)', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return {
          moduleConfig: {
            showNav: false
          }
        }
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showMainTabIcons).toBeFalsy()

    store.commit('ui/setTestCurrentTab', 'info')
    cmp.setData({ moduleConfig: { showNav: true } })

    expect(cmp.vm.showMainTabIcons).toBeFalsy()

    store.commit('ui/setTestCurrentTab', 'morphology')
    expect(cmp.vm.showMainTabIcons).toBeTruthy()
  })

  it('4 PanelCompact - computed showMorphologyIcon returns true if morph data is ready and current tab is grammar, also showNav is not disabled', () => {
    const api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        hasMorphData: () => false
      })
    }
    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)

    const cmp = shallowMount(PanelCompact, {
      data () {
        return {
          moduleConfig: {
            showNav: false
          }
        }
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('ui/setTestCurrentTab', 'info')
    store.commit('app/setTestMorphDataReady', false)

    expect(cmp.vm.showMorphologyIcon).toBeFalsy()

    // all obligatory properties -> true

    cmp.setData({ moduleConfig: { showNav: true } })
    store.commit('ui/setTestCurrentTab', 'grammar')
    store.commit('app/setTestMorphDataReady', true)
    api.app.hasMorphData = () => true

    expect(cmp.vm.showMorphologyIcon).toBeTruthy()

    // will fail one property by one - not correct tab

    cmp.setData({ moduleConfig: { showNav: false } })
    store.commit('ui/setTestCurrentTab', 'morphology')
    expect(cmp.vm.showMorphologyIcon).toBeFalsy()

    // will fail one property by one - morphData is not ready

    cmp.setData({ moduleConfig: { showNav: true } })
    store.commit('ui/setTestCurrentTab', 'grammar')
    store.commit('app/setTestMorphDataReady', false)
    expect(cmp.vm.showMorphologyIcon).toBeFalsy()

    // will fail one property by one - morphData is ready but there are no morphData

    store.commit('app/setTestMorphDataReady', true)
    api.app.hasMorphData = () => false
    expect(cmp.vm.showMorphologyIcon).toBeFalsy()
  })

  it('5 PanelCompact - computed rootClasses returns empty array if it is not expanded and not landscape', () => {
    Object.assign(defaultData, {
      expanded: false
    })

    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isLandscape: () => false
      }
    })

    expect(cmp.vm.rootClasses.length).toEqual(0)
  })

  it('6 PanelCompact - computed rootClasses has expanded if it is expanded and class for landscape', () => {
    Object.assign(defaultData, {
      expanded: true
    })

    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isLandscape: () => true
      }
    })

    expect(cmp.vm.rootClasses.includes('alpheios-panel--left')).toBeTruthy()
    expect(cmp.vm.rootClasses.includes('alpheios-panel--expanded')).toBeTruthy()
  })

  it('7 PanelCompact - computed componentStyles returns zIndex', () => {
    const api = {
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)

    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.componentStyles).toEqual({ zIndex: 60 })
  })

  it('8 PanelCompact - computed isLandscape checks oriention and expanded', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    // it is portrait and not expanded
    store.commit('panel/setTestOrientation', Platform.orientations.PORTRAIT)

    expect(cmp.vm.isLandscape).toBeFalsy()
    expect(cmp.vm.expanded).toBeFalsy()

    // it is landscape and expanded automaticaly
    store.commit('panel/setTestOrientation', Platform.orientations.LANDSCAPE)
    expect(cmp.vm.isLandscape).toBeTruthy()
    expect(cmp.vm.expanded).toBeTruthy()

    // it is portrait and not expanded automaticaly
    store.commit('panel/setTestOrientation', Platform.orientations.PORTRAIT)
    expect(cmp.vm.isLandscape).toBeFalsy()
    expect(cmp.vm.expanded).toBeFalsy()

    // let's expand nd rotate again and the r0otatit again - it should save that in portrait it was expanded
    cmp.vm.expand()
    store.commit('panel/setTestOrientation', Platform.orientations.LANDSCAPE)
    store.commit('panel/setTestOrientation', Platform.orientations.PORTRAIT)
    expect(cmp.vm.isLandscape).toBeFalsy()
    expect(cmp.vm.expanded).toBeTruthy()
  })

  it('9 PanelCompact - computed isAttachedToLeft checks if current value of panel position is left', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('panel/setTestPanelPosition', 'left')

    expect(cmp.vm.isAttachedToLeft).toBeTruthy()

    store.commit('panel/setTestPanelPosition', 'right')

    expect(cmp.vm.isAttachedToLeft).toBeFalsy()
  })

  it('10 PanelCompact - computed isAttachedToRight checks if current value of panel position is right', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('panel/setTestPanelPosition', 'right')

    expect(cmp.vm.isAttachedToRight).toBeTruthy()

    store.commit('panel/setTestPanelPosition', 'left')

    expect(cmp.vm.isAttachedToRight).toBeFalsy()
  })

  it('11 PanelCompact - computed leftBtnVisible returns true if we want to show left icon for attach (isAttachedToLeft + expanded)', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => true,
        isAttachedToRight: () => false
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.leftBtnVisible).toBeFalsy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.leftBtnVisible).toBeTruthy()
  })

  it('12 PanelCompact - computed leftBtnVisible returns true if we want to show left icon for attach (isAttachedToRight + !expanded)', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => false,
        isAttachedToRight: () => true
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.leftBtnVisible).toBeTruthy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.leftBtnVisible).toBeFalsy()
  })

  it('13 PanelCompact - computed rightBtnVisible returns true if we want to show right icon for attach (isAttachedToRight + expanded)', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => false,
        isAttachedToRight: () => true
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.rightBtnVisible).toBeFalsy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.rightBtnVisible).toBeTruthy()
  })

  it('14 PanelCompact - computed rightBtnVisible returns true if we want to show right icon for attach (isAttachedToRight + !expanded)', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => true,
        isAttachedToRight: () => false
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.rightBtnVisible).toBeTruthy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.rightBtnVisible).toBeFalsy()
  })

  it('15 PanelCompact - computed hasMorphologyData returns true if morph data is ready and it has morph data', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    // test1
    api.app.hasMorphData = () => false
    store.commit('app/setTestMorphDataReady', false)

    expect(cmp.vm.hasMorphologyData).toBeFalsy()

    // test2
    store.commit('app/setTestMorphDataReady', true)
    expect(cmp.vm.hasMorphologyData).toBeFalsy()

    // test3
    api.app.hasMorphData = () => true
    store.commit('app/setTestMorphDataReady', false)

    expect(cmp.vm.hasMorphologyData).toBeFalsy()

    // test4
    api.app.hasMorphData = () => true
    store.commit('app/setTestMorphDataReady', true)

    expect(cmp.vm.hasMorphologyData).toBeTruthy()
  })

  it('16 PanelCompact - computed additionalStylesTootipCloseIcon returns props for icon', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    const result = cmp.vm.additionalStylesTootipCloseIcon

    expect(result.top).toBeDefined()
    expect(result.right).toBeDefined()
  })

  it('17 PanelCompact - computed formattedShortDefinitions returns array with short defs, if they are ready, otherwise it returns an empty array', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    const definitions = cmp.vm.formattedShortDefinitions
    expect(definitions.length).toEqual(0)

    store.commit('app/setTestHomonymDataReady', true)
    store.commit('app/setTestShortDefUpdateTime', 10)
    api.app.getHomonymLexemes = () => {
      return homonym ? homonym.lexemes : []
    }

    const definitions2 = cmp.vm.formattedShortDefinitions

    expect(definitions2.length).toBeGreaterThan(0)
    definitions2.forEach(definition => {
      expect(definition.constructor.name).toEqual(expect.stringContaining('Definition'))
    })
  })

  it('18 PanelCompact - computed formattedFullDefinitions returns a string with content, if they are ready, otherwise it returns an empty string', async () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    const definitions = cmp.vm.formattedFullDefinitions
    expect(definitions.length).toEqual(0)

    store.commit('app/setTestHomonymDataReady', true)
    await timeout(2000)
    store.commit('app/setTestFullDefUpdateTime', 10)
    api.app.getHomonymLexemes = () => {
      return homonym ? homonym.lexemes : []
    }

    const definitions2 = cmp.vm.formattedFullDefinitions

    expect(definitions2.length).toBeGreaterThan(0)
  })

  it('19 PanelCompact - computed providersLinkText returns hide creadit label or show credit label', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    cmp.setData({ showProviders: false })
    expect(cmp.vm.providersLinkText).toEqual(expect.stringContaining('Show'))

    cmp.setData({ showProviders: true })
    expect(cmp.vm.providersLinkText).toEqual(expect.stringContaining('Hide'))
  })

  it('20 PanelCompact - method swapPosition executes setPosition with position', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    cmp.vm.setPosition = jest.fn()

    store.commit('panel/setTestPanelPosition', 'left')
    cmp.vm.swapPosition()
    expect(cmp.vm.setPosition).toHaveBeenLastCalledWith('right')

    store.commit('panel/setTestPanelPosition', 'right')
    cmp.vm.swapPosition()
    expect(cmp.vm.setPosition).toHaveBeenLastCalledWith('left')
  })

  it('21 PanelCompact - method squeezePage sets additional styles and adds a class', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    store.commit('panel/setTestPanelPosition', 'left')
    cmp.vm.squeezePage()

    expect(document.documentElement.style['padding-left']).toEqual('50%')
    expect(document.body.classList.contains('alpheios-layout-landscape-open-panel')).toBeTruthy()

    store.commit('panel/setTestPanelPosition', 'right')
    cmp.vm.squeezePage()

    expect(document.documentElement.style['padding-right']).toEqual('50%')
    expect(document.body.classList.contains('alpheios-layout-landscape-open-panel')).toBeTruthy()
    cmp.destroy()
  })

  it('22 PanelCompact - method unsqueezePage removes additional styles and a class added by squeeze', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    store.commit('panel/setTestPanelPosition', 'left')
    cmp.vm.squeezePage()

    cmp.vm.unsqueezePage()

    expect(document.documentElement.style['padding-left']).toEqual('')
    expect(document.body.classList.contains('alpheios-layout-landscape-open-panel')).toBeFalsy()

    store.commit('panel/setTestPanelPosition', 'right')
    cmp.vm.squeezePage()

    cmp.vm.unsqueezePage()
    expect(document.documentElement.style['padding-right']).toEqual('')
    expect(document.body.classList.contains('alpheios-layout-landscape-open-panel')).toBeFalsy()
    cmp.destroy()
  })

  it('22 PanelCompact - method contentOptionChanged executes app.contentOptionChange', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    api.app.contentOptionChange = jest.fn()

    cmp.vm.contentOptionChanged('fooName', 'fooValue')

    expect(api.app.contentOptionChange).toHaveBeenLastCalledWith('fooName', 'fooValue')
    cmp.destroy()
  })

  it('23 PanelCompact - method expand updates expanded and prevExpanded to truthy', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    cmp.setData({ expanded: false })
    cmp.setData({ prevExpanded: false })

    cmp.vm.expand()

    expect(cmp.vm.expanded).toBeTruthy()
    expect(cmp.vm.prevExpanded).toBeTruthy()
    cmp.destroy()
  })

  it('23 PanelCompact - method contract updates expanded and prevExpanded to falsy', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    cmp.setData({ expanded: true })
    cmp.setData({ prevExpanded: true })

    cmp.vm.contract()

    expect(cmp.vm.expanded).toBeFalsy()
    expect(cmp.vm.prevExpanded).toBeFalsy()
    cmp.destroy()
  })

  it('24 PanelCompact - method expandOrContract updates expanded and prevExpanded to oposite', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    cmp.setData({ expanded: true })
    cmp.setData({ prevExpanded: true })

    cmp.vm.expandOrContract()

    expect(cmp.vm.expanded).toBeFalsy()
    expect(cmp.vm.prevExpanded).toBeFalsy()

    cmp.vm.expandOrContract()

    expect(cmp.vm.expanded).toBeTruthy()
    expect(cmp.vm.prevExpanded).toBeTruthy()
    cmp.destroy()
  })

  it('25 PanelCompact - method closePanel executes ui.closePanel and sets menuVisible to falsy', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    api.ui.closePanel = jest.fn()
    cmp.setData({ menuVisible: true })

    cmp.vm.closePanel()

    expect(api.ui.closePanel).toHaveBeenCalled()
    expect(cmp.vm.menuVisible).toBeFalsy()
  })

  it('26 PanelCompact - method switchProviders changes showProviders to oposite', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    cmp.setData({ showProviders: false })

    cmp.vm.switchProviders()
    expect(cmp.vm.showProviders).toBeTruthy()

    cmp.vm.switchProviders()
    expect(cmp.vm.showProviders).toBeFalsy()
  })

  it('27 PanelCompact - method changeTab executes ui.changeTab', () => {
    const cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    api.ui.changeTab = jest.fn()

    cmp.vm.changeTab('fooTab')
    expect(api.ui.changeTab).toHaveBeenCalledWith('fooTab')
  })
})
