/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import InflectionsTableWide from '@/vue/components/inflections/inflections-table-wide.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'
import { ViewSetFactory } from 'alpheios-inflection-tables'

class HeaderCell {
  constructor(value) {
    this.value = value
  }
}

class RowTitleCell {
    
  constructor(value) {
    this.value = value
  }
}

describe('inflections-table-wide.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()

    api = {
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


  it('1 InflectionsTableWide - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 InflectionsTableWide - computed title returns view.title or standardFormData.title or an empty string', async () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api,
      propsData: {
        view: {
          title: 'fooViewTitle'
        },
        standardFormData: {
          title: 'fooStFormTitle'
        }
      }
    })
    expect(cmp.vm.title).toEqual('fooViewTitle')

    cmp.setProps({ view: {} })

    await Vue.nextTick()

    expect(cmp.vm.title).toEqual('fooStFormTitle')

    cmp.setProps({ standardFormData: {} })

    await Vue.nextTick()

    expect(cmp.vm.title).toEqual('')
  })

  it('3 InflectionsTableWide - computed additionalTitle returns view.titadditionalTitlele or standardFormData.additionalTitle or an empty string', async () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api,
      propsData: {
        view: {
          additionalTitle: 'fooViewTitle'
        },
        standardFormData: {
          additionalTitle: 'fooStFormTitle'
        }
      }
    })
    expect(cmp.vm.additionalTitle).toEqual('fooViewTitle')

    cmp.setProps({ view: {} })

    await Vue.nextTick()

    expect(cmp.vm.additionalTitle).toEqual('fooStFormTitle')

    cmp.setProps({ standardFormData: {} })

    await Vue.nextTick()

    expect(cmp.vm.additionalTitle).toEqual('')
  })

  it('4 InflectionsTableWide - computed hasInflectionTables checks isAvailable and state.view.hasPrerenderedTables', () => {
    let cmp = mount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({ 
      state: {
        view: {
          hasPrerenderedTables: false,
          
          isImplemented: true,
          wideView: {
            rows: [ 'fooRow' ]
          }

        }
      },
    })

    expect(cmp.vm.hasInflectionTables).toBeTruthy()

    cmp.setData({ 
      state: {
        view: {
          hasPrerenderedTables: false,
            
          isImplemented: false,
          wideView: {
            rows: [ 'fooRow' ]
          }
  
        }
      },
    })

    expect(cmp.vm.hasInflectionTables).toBeFalsy()

    cmp.setData({ 
      state: {
        view: {
          hasPrerenderedTables: true,
              
          isImplemented: true,
          wideView: {
            rows: [ 'fooRow' ]
          }
    
        }
      },
    })
  
      expect(cmp.vm.hasInflectionTables).toBeFalsy()

  })

  it('5 InflectionsTableWide - computed hasPrerenderedTables checks isAvailable and state.view.hasPrerenderedTables', () => {
    let cmp = mount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({ 
      state: {
        view: {
          hasPrerenderedTables: false,
          
          isImplemented: true,
          wideView: {
            rows: [ 'fooRow' ]
          }

        }
      },
    })

    expect(cmp.vm.hasPrerenderedTables).toBeFalsy()

    cmp.setData({ 
      state: {
        view: {
          hasPrerenderedTables: false,
            
          isImplemented: false,
          wideView: {
            rows: [ 'fooRow' ]
          }
  
        }
      },
    })

    expect(cmp.vm.hasPrerenderedTables).toBeFalsy()

    cmp.setData({ 
      state: {
        view: {
          hasPrerenderedTables: true,
              
          isImplemented: true,
          wideView: {
            rows: [ 'fooRow' ]
          }
    
        }
      },
    })
  
      expect(cmp.vm.hasPrerenderedTables).toBeTruthy()

  })


  it('6 InflectionsTableWide - computed tableStyles calcs gridTemplateColumns for css styles', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({ 
      state: {
        view: {
          wideView: {
            visibleColumnQty: 10,
            titleColumnQty: 5
          }
      
        }
      },
    })

    let result = cmp.vm.tableStyles
    expect(result).toEqual({
      gridTemplateColumns: 'repeat(15, 1fr)'
    })
  })
  
  it('7 InflectionsTableWide - computed isAvailable checks table is ready and has rows', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({ 
      state: {
        view: {
          isImplemented: true,
          wideView: {
            rows: [ 'fooRow' ]
          }
      
        }
      },
    })

    expect(cmp.vm.isAvailable).toBeTruthy()

    cmp.setData({ 
      state: {
        view: {
          isImplemented: false,
          wideView: {
            rows: [ 'fooRow' ]
          }
        
        }
      },
    })

    expect(cmp.vm.isAvailable).toBeFalsy()

    cmp.setData({ 
        state: {
          view: {
            isImplemented: false,
            wideView: {
              rows: []
            }
          
          }
        },
      })
  
      expect(cmp.vm.isAvailable).toBeFalsy()
  })

  it('8 InflectionsTableWide - method getRenderedView returns rendered view if it is defined', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api,
      propsData: {
        view : {
          isRenderable: true,
          render: () => 'fooRenderedView'
        }
        
      }
    })

    let result = cmp.vm.getRenderedView()
    expect(result).toEqual('fooRenderedView')
    expect(cmp.vm.state.standardFormTable).toBeFalsy()
  })

  it('9 InflectionsTableWide - method getRenderedView returns rendered standardFormData if view is not defined and standardFormData is defined', () => {
    let backupFn = ViewSetFactory.getStandardForm

    ViewSetFactory.getStandardForm = () => {
      return {
        render: () => 'fooStandardForm'
      }
    }

    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api,
      propsData: {
        standardFormData : {  }
        
      }
    })

    let result = cmp.vm.getRenderedView()
    expect(cmp.vm.state.standardFormTable).toBeTruthy()
    expect(result).toEqual('fooStandardForm')
    

    ViewSetFactory.getStandardForm = backupFn
  })


  it('10 InflectionsTableWide - method collapse handles collapse props', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api,
    })

    cmp.setData({ 
      state: {
        collapsed: false,
        view: {
          isImplemented: true,
          wideView: {
            collapsed: false
          }
        }
      },
    })

    cmp.vm.getRenderedView = jest.fn(() => {
      return {
        result: 'fooRenderedView',
        isImplemented: true,
        wideView: {
          collapsed: true
        }
      }
    })

    cmp.vm.collapse() // becomes collapsed

    expect(cmp.vm.getRenderedView).not.toHaveBeenCalled()

    expect(cmp.vm.state.collapsed).toBeTruthy()
    expect(cmp.vm.state.view.wideView.collapsed).toBeTruthy()

    cmp.vm.collapse() // becomes not-collapsed

    expect(cmp.vm.getRenderedView).toHaveBeenCalled()
    expect(cmp.vm.state.view.result).toEqual('fooRenderedView')
    expect(cmp.vm.state.collapsed).toBeFalsy()

    expect(cmp.vm.state.view.wideView.collapsed).toBeFalsy()
  })

  it('11 InflectionsTableWide - method hideNoSuffixGroups executes noSuffixMatchesGroupsHidden with true', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    let noSuffixMatchesGroupsHiddenFunc = jest.fn()

    cmp.setData({ 
      state: {
        noSuffixGroupsHidden: false,
        view: {
          noSuffixMatchesGroupsHidden: noSuffixMatchesGroupsHiddenFunc
        }
      },
    })

    cmp.vm.hideNoSuffixGroups()

    expect(noSuffixMatchesGroupsHiddenFunc).toHaveBeenLastCalledWith(true)
    expect(cmp.vm.state.noSuffixGroupsHidden).toBeTruthy()
  })

  it('12 InflectionsTableWide - method showNoSuffixGroups executes noSuffixMatchesGroupsHidden with false', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    let noSuffixMatchesGroupsHiddenFunc = jest.fn()

    cmp.setData({ 
      state: {
        noSuffixGroupsHidden: false,
        view: {
          noSuffixMatchesGroupsHidden: noSuffixMatchesGroupsHiddenFunc
        }
      },
    })

    cmp.vm.showNoSuffixGroups()

    expect(noSuffixMatchesGroupsHiddenFunc).toHaveBeenLastCalledWith(false)
    expect(cmp.vm.state.noSuffixGroupsHidden).toBeFalsy()
  })


  it('13 InflectionsTableWide - method cellClasses returns classes for the cell by type', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })
    let cell
    let classes = []

    cell = new HeaderCell('fooValue')
    cell.morphologyMatch = true
    cell.highlighted = true
    cell.hidden = true
    cell.span = 'foospan'

    classes = cmp.vm.cellClasses(cell)
    
    expect(classes['infl-cell']).toBeTruthy()
    expect(classes['infl-cell--morph-match']).toBeTruthy()
    expect(classes['infl-cell--hl']).toBeTruthy()
    expect(classes['hidden']).toBeTruthy()

    expect(classes['infl-cell--hdr']).toBeTruthy()

    expect(classes['infl-cell--spfoospan']).toBeTruthy()

    expect(classes['row-title-cell']).toBeUndefined()

    cell = new RowTitleCell('fooValue')
    cell.morphologyMatch = false
    cell.highlighted = false
    cell.hidden = false
    cell.span = 'foospan2'
    cell.formsColumn = true

    classes = cmp.vm.cellClasses(cell)
    
    expect(classes['infl-cell']).toBeTruthy()
    expect(classes['infl-cell--morph-match']).toBeFalsy()
    expect(classes['infl-cell--hl']).toBeFalsy()
    expect(classes['hidden']).toBeFalsy()

    expect(classes['row-title-cell']).toBeTruthy()

    expect(classes['infl-cell--hdr']).toBeTruthy()
    expect(classes['infl-cell--spfoospan2']).toBeTruthy()
    
    cmp.setData({ 
      state: {
        standardFormTable: true
      },
    })

    classes = cmp.vm.cellClasses(cell)

    expect(classes['infl-cell--morph-match']).toBeFalsy()
  })

  it('14 InflectionsTableWide - method prerenderedCellClasses returns classes by role', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })
    let cell = {
      role: 'label'
    }

    let classIn = cmp.vm.prerenderedCellClasses(cell)
    expect(classIn).toEqual('infl-prdgm-tbl-cell--label')

    cell = {
      role: 'data'
    }
  
    classIn = cmp.vm.prerenderedCellClasses(cell)
    expect(classIn).toEqual('infl-prdgm-tbl-cell--data')
  })

  it('15 InflectionsTableWide - method morphemeClasses returns classes by morpheme matches', async () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })
    let morpheme = {
      match: {
        suffixMatch: true,
        fullMatch: true
      }
    }

    let classes = cmp.vm.morphemeClasses(morpheme)
    expect(classes['infl-suff']).toBeTruthy()
    expect(classes['infl-suff--suffix-match']).toBeTruthy()
    expect(classes['infl-suff--full-match']).toBeTruthy()

    cmp.setProps({ 
      standardFormData: true
    })

    await Vue.nextTick()
    
    classes = cmp.vm.morphemeClasses(morpheme)
    expect(classes['infl-suff']).toBeTruthy()
    expect(classes['infl-suff--suffix-match']).toBeUndefined()
    expect(classes['infl-suff--full-match']).toBeUndefined()
  })


  it('16 InflectionsTableWide - method cellMouseOver executes highlightRowAndColumn for dataCells', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    let cell = {
      isDataCell: false,
      highlightRowAndColumn: jest.fn()
    }

    cmp.vm.cellMouseOver(cell)
    expect(cell.highlightRowAndColumn).not.toHaveBeenCalled()

    cell.isDataCell = true
    cmp.vm.cellMouseOver(cell)
    expect(cell.highlightRowAndColumn).toHaveBeenCalled()
  })

  it('17 InflectionsTableWide - method cellMouseLeave executes clearRowAndColumnHighlighting for dataCells', () => {
    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    let cell = {
      isDataCell: false,
      clearRowAndColumnHighlighting: jest.fn()
    }

    cmp.vm.cellMouseLeave(cell)
    expect(cell.clearRowAndColumnHighlighting).not.toHaveBeenCalled()

    cell.isDataCell = true
    cmp.vm.cellMouseLeave(cell)
    expect(cell.clearRowAndColumnHighlighting).toHaveBeenCalled()
  })


  it('18 InflectionsTableWide - method collapse executes findCurrentScrollPos and checkAndFixScroll only for Mobile', () => {
    let api = {
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(InflectionsTableWide, {
      store,
      localVue,
      mocks: api
    })

    api.app.platform.isMobile = false

    cmp.vm.findCurrentScrollPos = jest.fn(() => { return {} })
    cmp.vm.checkAndFixScroll = jest.fn()

    cmp.vm.collapse()

    expect(cmp.vm.findCurrentScrollPos).not.toHaveBeenCalled()
    expect(cmp.vm.checkAndFixScroll).not.toHaveBeenCalled()

    api.app.platform.isMobile = true

    cmp.vm.collapse()

    expect(cmp.vm.findCurrentScrollPos).toHaveBeenCalled()
    expect(cmp.vm.checkAndFixScroll).toHaveBeenCalled()
  })
})
