/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'
import Vue from 'vue/dist/vue'
import { Feature, Constants } from 'alpheios-data-models'

describe('infl-attribute.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const mockMessages = {
    'foovalue': {
      get: () => { return 'foovalue'},
      abbr: () => {return 'fv'}
    },
    'INFL_ATTRIBUTE_LINK_TEXT_TYPE': {
      get: () => { return 'source' },
      abbr: () => {return 'src'}
    },
    'masculine': {
      get: () => { return 'masculine'},
      abbr: () => { return 'm.'}
    },
    'feminine': {
      get: () => { return 'feminine'},
      abbr: () => { return 'f.'}
    }
  }

  beforeEach(() => {
    jest.spyOn(console, 'error')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 InflectionAttribute - renders a vue instance (min requirements)', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: ''
      }
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
      }
    })
    expect(cmp.find('span').text()).toEqual('fooValue')
    expect(cmp.find('span').attributes()['data-feature']).toEqual('fooType')
    expect(cmp.find('span').attributes()['data-grouplevel']).toEqual('2')
  })

  it('3 InflectionAttribute - renders a vue instance (min requirements)', async () => {
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
        grouplevel: 2,
        linkedfeatures: ['fooType2']
      }
    })

    cmp.find('span').trigger('click')

    await Vue.nextTick()

    expect(cmp.emitted()['sendfeature']).toBeTruthy()
    expect(cmp.emitted()['sendfeature'][0]).toEqual([{ value: 'fooValue', values: ['fooValue'], type: 'fooType2' }])
  })

  it('3 InflectionAttribute - attributeClass method creates class list from featureType and extra classes', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: '',
        linkedfeatures: ['fooFeatureType']
      }
    })

    let classList1 = cmp.vm.attributeClass('fooFeatureType')
    expect(classList1).toEqual('alpheios-morph__linkedattr')

    let classList2 = cmp.vm.attributeClass('anotherFooFeatureType')
    expect(classList2).toEqual('alpheios-morph__attr')

    let classList3 = cmp.vm.attributeClass('anotherFooFeatureType', ['someOtherClass'])
    expect(classList3).toEqual('alpheios-morph__attr someOtherClass')
  })

  it('4 InflectionAttribute - decorate method formats data depending on the type and decorators', () => {
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
      }
    })

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('[verb]')

    cmp.vm.decorators = ['appendtype']

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('verb part of speech')

    cmp.vm.decorators = ['parenthesize']

    expect(cmp.vm.decorate(cmp.vm.data, 'footype')).toEqual('(foovalue)')

    cmp.vm.decorators = ['abbreviate']

    expect(cmp.vm.decorate(cmp.vm.data, 'footype')).toEqual('fv')

    expect(cmp.vm.decorate(cmp.vm.data, 'part of speech')).toEqual('verb')

    cmp.vm.decorators = ['link']
    expect(cmp.vm.decorate(cmp.vm.data, 'source')).toEqual('<a class="alpheios-morph__linkedattr" target="_blank" href="http://example.org">source</a>')
  })

  it('5 InflectionAttribute - sendFeature method check arguments and if passed an array - it takes only the first value', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: '',
        linkedfeatures: ['part of speech']
      }
    })

    let testFeature = new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK)

    cmp.vm.sendFeature([testFeature])
    expect(cmp.emitted()['sendfeature'][0]).toEqual([testFeature])
  })

  it('6 InflectionAttribute - sendFeature method check arguments and if the type of passed feature is not in linked features - event won\'t be emitted', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: '',
        linkedfeatures: ['part of speech']
      }
    })

    let testFeature = new Feature(Feature.types.gender, 'femine', Constants.LANG_GREEK)

    cmp.vm.sendFeature([testFeature])
    expect(cmp.emitted()['sendfeature']).toBeFalsy()
  })

  it('7 InflectionAttribute - decorate method handles multivalued features properly', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          'gender': new Feature(Feature.types.gender, ['feminine', 'masculine'], Constants.LANG_GREEK),
        },
        type: 'gender',
        decorators: ['abbreviate'],
        messages: mockMessages
      }
    })

    expect(cmp.vm.decorate(cmp.vm.data, 'gender')).toEqual('f. m.')
  })
})
