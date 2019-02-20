/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount, createLocalVue } from '@vue/test-utils'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'
import Vuex from 'vuex'
import { Feature, Constants } from 'alpheios-data-models'

describe('infl-attribute.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api = {}
  let mockSendFeature
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const mockMessages = {
    'foovalue': {
      get: () => { return 'foovalue' },
      abbr: () => { return 'fv' }
    },
    'INFL_ATTRIBUTE_LINK_TEXT_TYPE': {
      get: () => { return 'source' },
      abbr: () => { return 'src' }
    },
    'masculine': {
      get: () => { return 'masculine' },
      abbr: () => { return 'm.' }
    },
    'feminine': {
      get: () => { return 'feminine' },
      abbr: () => { return 'f.' }
    }
  }

  beforeEach(() => {
    jest.spyOn(console, 'error')

    mockSendFeature = jest.fn(() => {})
    api = {
      app: {
        sendFeature: mockSendFeature
      },
      l10n: {
        hasMsg: (value) => mockMessages.hasOwnProperty(value),
        getMsg: (value) => mockMessages[value].get(),
        getAbbr: (value) => mockMessages[value].abbr()
      }
    }
  })
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  afterAll(() => {
  })

  it('1 InflectionAttribute - renders a vue instance (min requirements)', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: []
          }
        }
      }
    })

    let cmp = mount(InflectionAttribute, {
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
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: []
          }
        }
      }
    })

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
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: ['fooType2']
          }
        }
      }
    })

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

    cmp.find('span').trigger('click')

    expect(mockSendFeature.mock.calls.length).toBe(1)
    expect(mockSendFeature).toBeCalledWith({ value: 'fooValue', values: ['fooValue'], type: 'fooType2' })
  })

  it('3 InflectionAttribute - attributeClass method creates class list from featureType and extra classes', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: ['fooFeatureType']
          }
        }
      }
    })

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

  it('4 InflectionAttribute - decorate method formats data depending on the type and decorators', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: ['fooType2']
          }
        }
      }
    })

    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          'part of speech': new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK),
          'footype': 'foovalue',
          'source': new Feature(Feature.types.source, 'http://example.org', Constants.LANG_GREEK)
        },
        type: 'part of speech',
        decorators: ['brackets'],
        messages: mockMessages
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('[verb]')

    cmp.vm.decorators = ['appendtype']

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('verb part of speech')

    cmp.vm.decorators = ['parenthesize']

    expect(cmp.vm.decorate(cmp.vm.data, 'footype')).toEqual('(foovalue)')

    cmp.vm.decorators = ['abbreviate']

    // TODO: fix this test
    // expect(cmp.vm.decorate(cmp.vm.data, 'footype')).toEqual('fv')

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('verb')

    cmp.vm.decorators = ['link']
    expect(cmp.vm.decorate(cmp.vm.data, 'source')).toEqual('<a class="alpheios-morph__linkedattr" target="_blank" href="http://example.org">source</a>')
  })

  it('5 InflectionAttribute - sendFeature method check arguments and if passed an array - it takes only the first value', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: ['part of speech']
          }
        }
      }
    })

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
    expect(mockSendFeature.mock.calls.length).toBe(1)
    expect(mockSendFeature).toBeCalledWith(testFeature)
  })

  it('6 InflectionAttribute - sendFeature method check arguments and if the type of passed feature is not in linked features - event won\'t be emitted', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: ['part of speech']
          }
        }
      }
    })

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
    expect(mockSendFeature.mock.calls.length).toBe(0)
  })

  it('7 InflectionAttribute - decorate method handles multivalued features properly', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            linkedFeatures: []
          }
        }
      }
    })

    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          'gender': new Feature(Feature.types.gender, ['feminine', 'masculine'], Constants.LANG_GREEK)
        },
        type: 'gender',
        decorators: ['abbreviate'],
        messages: mockMessages
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.decorate(cmp.vm.data, 'gender')).toEqual('f. m.')
  })
})
