/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import InflectionAttribute from '@/vue/components/infl-attribute.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants, Feature } from 'alpheios-data-models'

describe('popup.test.js', () => {
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

  it('1 InflectionAttribute - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(InflectionAttribute, {
      propsData: {
        data: {},
        type: ''
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 InflectionAttribute - renders a vue instance (min requirements)', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          fooType: 'fooValue'
        },
        type: 'fooType',
        grouplevel: 2
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.find('span').text()).toEqual('fooValue')
    expect(cmp.find('span').attributes()['data-feature']).toEqual('fooType')
    expect(cmp.find('span').attributes()['data-grouplevel']).toEqual('2')
  })

  it('3 InflectionAttribute - renders a vue instance (min requirements)', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        sendFeature: jest.fn()
      })
    }
    
    BaseTestHelp.l10nModule(store, api)

    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          fooType: {
            value: 'fooValue',
            values: ['fooValue'],
            type: 'fooType2'
          },
          features: {
            fooType2: {
            type: 'fooType2'
          }
        }
      },
      type: 'fooType',
      grouplevel: 2
    },
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setLinkedFeatures', ['fooType2'])
    cmp.find('span').trigger('click')
    
    expect(cmp.vm.app.sendFeature).toHaveBeenCalledTimes(1)
    expect(cmp.vm.app.sendFeature).toHaveBeenCalledWith({ value: 'fooValue', values: ['fooValue'], type: 'fooType2' })
  })

  it('4 InflectionAttribute - attributeClass method creates class list from featureType and extra classes', () => {
    store.commit('app/setLinkedFeatures', ['fooFeatureType'])

    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: '',
        decorators: ['']
      },
      store,
      localVue,
      mocks: api
    })

    let classList1 = cmp.vm.attributeClass('fooFeatureType')
    expect(classList1).toEqual('alpheios-morph__linkedattr')

    let classList2 = cmp.vm.attributeClass('anotherFooFeatureType')
    expect(classList2).toEqual('alpheios-morph__attr')

    let classList3 = cmp.vm.attributeClass('anotherFooFeatureType', ['someOtherClass'])
    expect(classList3).toEqual('alpheios-morph__attr someOtherClass')
  })

  it('5 InflectionAttribute - decorate method formats data depending on the type and decorators', () => {

    let api = {
      app: BaseTestHelp.appAPI()
    }
    
    let l10n = BaseTestHelp.l10nModule(store, api)

    store.commit('app/setLinkedFeatures', ['fooType2'])

    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          'part of speech': new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK),
          'footype': 'masculine',
          'source': new Feature(Feature.types.source, 'http://example.org', Constants.LANG_GREEK)
        },
        type: 'part of speech',
        decorators: ['brackets']
      },
      store,
      localVue,
      mocks: api
    })


    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('[verb]')

    cmp.vm.decorators = ['appendtype']

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('verb part of speech')

    cmp.vm.decorators = ['parenthesize']

    expect(cmp.vm.decorate(cmp.vm.data, 'footype')).toEqual('(masculine)')

    cmp.vm.decorators = ['abbreviate']
    expect(cmp.vm.decorate(cmp.vm.data, 'footype')).toEqual('m.')

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('verb')

    cmp.vm.decorators = ['link']
    expect(cmp.vm.decorate(cmp.vm.data, 'source')).toEqual('<a class="alpheios-morph__linkedattr" target="_blank" href="http://example.org">source</a>')
  })

  it('6 InflectionAttribute - sendFeature method check arguments and if passed an array - it takes only the first value', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        sendFeature: jest.fn()
      })
    }
      
    BaseTestHelp.l10nModule(store, api)
    store.commit('app/setLinkedFeatures', ['part of speech'])

    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: ''
      },
      store,
      localVue,
      mocks: api
    })

    let testFeature = new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK)

    cmp.vm.sendFeature([testFeature])

    expect(cmp.vm.app.sendFeature).toHaveBeenCalledTimes(1)
    expect(cmp.vm.app.sendFeature).toHaveBeenCalledWith(testFeature)
  })

  it('7 InflectionAttribute - sendFeature method check arguments and if the type of passed feature is not in linked features - event won\'t be emitted', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        sendFeature: jest.fn()
      })
    }
        
    BaseTestHelp.l10nModule(store, api)
    store.commit('app/setLinkedFeatures', ['part of speech'])

    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: ''
      },
      store,
      localVue,
      mocks: api
    })

    let testFeature = new Feature(Feature.types.gender, 'femine', Constants.LANG_GREEK)

    cmp.vm.sendFeature([testFeature])
    expect(cmp.vm.app.sendFeature).not.toHaveBeenCalled()
  })

  it('8 InflectionAttribute - decorate method handles multivalued features properly', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          'gender': new Feature(Feature.types.gender, ['feminine', 'masculine'], Constants.LANG_GREEK)
        },
        type: 'gender',
        decorators: ['abbreviate']
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.decorate(cmp.vm.data, 'gender')).toEqual('f. m.')
  })
})
  