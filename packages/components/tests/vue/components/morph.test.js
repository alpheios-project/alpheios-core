/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { LanguageModelFactory as LMF } from 'alpheios-data-models'
import Vuex from 'vuex'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Morph from '@/vue/components/morph.vue'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'
import ShortDef from '@/vue/components/shortdef.vue'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

describe('morph.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    modules: {
      app: {
        namespaced: true,
        state: {
          linkedFeatures: [],
          morphDataReady: true,
          translationsDataReady: false
        },
        getters: {
          hasMorphData () {
            return true
          },
          shortDefDataReady () {
            return true
          }
        }
      }
    }
  })
  let api = {
    app: {
      getHomonymLexemes: () => homonym ? homonym.lexemes : [],
      hasMorphData: () => true
    }
  }
  const l10nModule = new L10nModule(store, api, {
    defaultLocale: Locales.en_US,
    messageBundles: Locales.bundleArr([
      [enUS, Locales.en_US],
      [enUSData, Locales.en_US],
      [enUSInfl, Locales.en_US],
      [enGB, Locales.en_GB]
    ])
  })

  let homonym
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const mockFeature = function (value, type, languageCode) {
    return {
      value: value,
      values: [value],
      type: type,
      languageID: LMF.getLanguageIdFromCode(languageCode),
      toLocaleStringAbbr: () => { return `${value}-mockabbrev` },
      toString: () => { return value }
    }
  }

  const mockMessages = {
    '3rd': {
      get: () => { return '3rd' },
      abbr: () => { return '3rd-mockabbrev' }
    },
    'singular': {
      get: () => { return 'singular' },
      abbr: () => { return 'singular-mockabbrev' }
    },
    'perfect': {
      get: () => { return 'perfect' },
      abbr: () => { return 'perfect-mockabbrev' }
    },
    'indicative': {
      get: () => { return 'indicative' },
      abbr: () => { return 'indicative-mockabbrev' }
    },
    'active': {
      get: () => { return 'active' },
      abbr: () => { return 'active-mockabbrev' }
    }
  }

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    homonym = null
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Morph - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Morph, {
      propsData: {
        lexemes: []
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Morph - showLexeme', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: [],
        morphDataReady: false
      },
      store,
      localVue,
      mocks: api
    })

    let testLexeme = {}

    let res = cmp.vm.showLexeme(testLexeme)
    expect(res).toBeFalsy()

    testLexeme = { isPopulated: jest.fn(() => 'test') }
    res = cmp.vm.showLexeme(testLexeme)

    expect(testLexeme.isPopulated).toBeCalled()
    expect(res).toEqual('test')
  })

  it('3 Morph - render with children components (min requirements without InflectionAttribute)', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: '1',
            features: {},
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      stubs: [ 'inflectionattribute' ],
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.find('.principal_parts').exists()).toBeTruthy()

    expect(cmp.findAll('.principal_parts').length).toEqual(1)
    expect(cmp.findAll('.principal_parts .lemma_index').exists()).toBeFalsy()
  })

  it('4 Morph - render principal parts (min requirements without InflectionAttribute)', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: '1',
            features: {},
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      stubs: { 'inflectionattribute': '<div class="inflectionattribute"></div>' },
      store,
      localVue,
      mocks: api
    })

    let hasLemmaWordInPrincipalParts = false
    let cntPParts = 0

    let spansPP = cmp.findAll('.principal_parts span')

    for (let i = 0; i < spansPP.length; i++) {
      if (spansPP.at(i).text() === 'foo-word') {
        hasLemmaWordInPrincipalParts = true
      }
      if (spansPP.at(i).text() === 'part1' || spansPP.at(i).text() === 'part2') {
        cntPParts++
      }
    }
    // expect(hasLemmaWordInPrincipalParts).toBeTruthy()
    expect(cntPParts).toEqual(2)

    expect(cmp.findAll('.principal_parts .inflectionattribute').length).toEqual(1)
  })

  it('5 Morph - render principal parts (min requirements with InflectionAttribute)', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: '1',
            features: {
              frequency: mockFeature('fooFrequency', 'frequency', 'lat'),
              age: mockFeature('fooAge', 'age', 'lat'),
              pronunciation: mockFeature('fooPronunciation', 'pronunciation', 'lat')
            },
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      store,
      localVue,
      mocks: api
    })

    let allInflectionAttributesPP = cmp.find('.principal_parts').findAll(InflectionAttribute)
    let checksPassed = 0
    expect(allInflectionAttributesPP.length).toEqual(2)

    for (let i = 0; i < allInflectionAttributesPP.length; i++) {
      if (allInflectionAttributesPP.at(i).vm.type === 'pronunciation') {
        checksPassed++
        expect(allInflectionAttributesPP.at(i).find('span').exists()).toBeTruthy()
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('fooPronunciation')).toBeGreaterThan(-1)
      }

      if (allInflectionAttributesPP.at(i).vm.type === 'extras') {
        checksPassed++
        expect(allInflectionAttributesPP.at(i).find('span').exists()).toBeTruthy()
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('fooFrequency')).toBeGreaterThan(-1)
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('fooAge')).toBeGreaterThan(-1)
      }

      if (allInflectionAttributesPP.at(i).vm.decorators.length > 0 && allInflectionAttributesPP.at(i).vm.decorators.indexOf('brackets') > -1 && allInflectionAttributesPP.at(i).find('span').exists()) {
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf('[')).toBeGreaterThan(-1)
        expect(allInflectionAttributesPP.at(i).find('span').text().indexOf(']')).toBeGreaterThan(-1)
      }
    }
    expect(checksPassed).toEqual(2)
  })

  it('6 Morph - render alpheios-morph__morphdata and feature_source (min requirements with InflectionAttribute)', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: '1',
            features: {
              case: mockFeature('fooGrmCase', 'case', 'lat'),
              gender: mockFeature('fooGender', 'gender', 'lat'),
              'part of speach': mockFeature('fooPart', 'part of speech', 'lat'),
              kind: mockFeature('fooKind', 'kind', 'lat'),
              declension: mockFeature('fooDeclension', 'declension', 'lat'),
              conjugation: mockFeature('fooConjugation', 'conjugation', 'lat'),
              note: mockFeature('fooNote', 'note', 'lat'),
              source: mockFeature('fooSource', 'source', 'lat')
            },
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-morph__morphdata').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-morph__morphdata').element.style.display).not.toEqual('none')

    let allInflectionAttributesMD = cmp.find('.alpheios-morph__morphdata').findAll(InflectionAttribute)
    let checksPassed = 0

    expect(allInflectionAttributesMD.length).toEqual(7)

    let keysFeatures = Object.keys(api.app.homonym.lexemes[0].lemma.features)

    for (let i = 0; i < allInflectionAttributesMD.length; i++) {
      let checkKey = keysFeatures.indexOf(allInflectionAttributesMD.at(i).vm.type)
      let key = allInflectionAttributesMD.at(i).vm.type

      if (checkKey > -1) {
        checksPassed++
        expect(allInflectionAttributesMD.at(i).find('span').exists()).toBeTruthy()
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(api.app.homonym.lexemes[0].lemma.features[key].value)).toBeGreaterThan(-1)
      }
      if (allInflectionAttributesMD.at(i).vm.decorators.length > 0 && allInflectionAttributesMD.at(i).vm.decorators.indexOf('brackets') > -1 && allInflectionAttributesMD.at(i).find('span').exists()) {
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf('[')).toBeGreaterThan(-1)
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(']')).toBeGreaterThan(-1)
      }
      if (allInflectionAttributesMD.at(i).vm.decorators.length > 0 && allInflectionAttributesMD.at(i).vm.decorators.indexOf('parenthesize') > -1 && allInflectionAttributesMD.at(i).find('span').exists()) {
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf('(')).toBeGreaterThan(-1)
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(')')).toBeGreaterThan(-1)
      }
      if (allInflectionAttributesMD.at(i).vm.decorators.length > 0 && allInflectionAttributesMD.at(i).vm.decorators.indexOf('appendtype') > -1 && allInflectionAttributesMD.at(i).find('span').exists()) {
        expect(allInflectionAttributesMD.at(i).find('span').text().indexOf(` ${key}`)).toBeGreaterThan(-1)
      }
    }

    expect(checksPassed).toEqual(6) // the problem with part and grmCase

    expect(cmp.find('.feature_source').exists()).toBeTruthy()
    expect(cmp.find('.feature_source').element.style.display).not.toEqual('none')

    expect(cmp.find('.feature_source').find(InflectionAttribute).exists()).toBeTruthy()
    expect(cmp.find('.feature_source').find(InflectionAttribute).vm.type).toEqual('source')
    expect(cmp.find('.feature_source').find(InflectionAttribute).find('span').text().indexOf('fooSource')).toBeGreaterThan(-1)
  })

  it('7 Morph - render definitions', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: 'l1',
            features: {},
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      methods: {
        definitions () {
          return [
            {
              lemmaText: 'foo-word1',
              text: 'foo word definition 1'
            },
            {
              lemmaText: 'foo-word2',
              text: 'foo word definition 2'
            }
          ]
        }
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-morph__definition_list').exists()).toBeTruthy()
    expect(cmp.findAll('.alpheios-morph__definition').length).toEqual(2)

    expect(cmp.findAll('.alpheios-morph__definition .definition_index').length).toEqual(2)

    let shortDefs = cmp.find('.alpheios-morph__definition_list').findAll(ShortDef)
    let checks = 0

    for (let i = 0; i < shortDefs.length; i++) {
      if (shortDefs.at(i).vm.definition === cmp.vm.definitions[0]) {
        expect(shortDefs.at(i).find('.alpheios-definition__lemma').text()).toEqual('foo-word1:')
        expect(shortDefs.at(i).find('.alpheios-definition__text').text()).toEqual('foo word definition 1')
      } else if (shortDefs.at(i).vm.definition === cmp.vm.definitions[1]) {
        expect(shortDefs.at(i).find('.alpheios-definition__lemma').text()).toEqual('foo-word2:')
        expect(shortDefs.at(i).find('.alpheios-definition__text').text()).toEqual('foo word definition 2')
      }
    }
  })

  it('8 Morph - render translations', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: 'l1',
            features: {},
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      computed: {
        translations () {
          return {
            l1: {
              glosses: ['some foo translation'],
              lemmaWord: 'foo-word',
              languageCode: 'eng'
            }
          }
        }
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-morph__translation_list').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-morph__translation_list').find('.alpheios-lemma__translations-gloss').text()).toEqual('some foo translation')
  })

  it('9 Morph - render inflection group', () => {
    let tense = mockFeature('perfect', 'tense', 'lat')
    let partOfSpeach = mockFeature('verb', 'part of speech', 'lat')
    let voice = mockFeature('active', 'voice', 'lat')
    let mood = mockFeature('indicative', 'mood', 'lat')
    let number = mockFeature('singular', 'number', 'lat')
    let person = mockFeature('3rd', 'person', 'lat')
    let conjugation = mockFeature('3rd', 'conjugation', 'lat')
    let fullform = mockFeature('foo-word', 'full form', 'lat')
    let word = mockFeature('capio', 'word', 'lat')

    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: 'l1',
            features: {},
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => {
            return [
              {
                groupingKey: {
                  stem: 'foostem',
                  suffix: 'foosuffix',
                  'part of speach': partOfSpeach
                },
                inflections: [
                  {
                    groupingKey: {
                      isCaseInflectionSet: false,
                      tense: tense
                    },

                    inflections: [
                      {
                        groupingKey: {
                          tense: tense,
                          voice: voice
                        },

                        inflections: [
                          {
                            groupingKey: {
                              mood: mood,
                              number: number,
                              person: person,
                              tense: tense,
                              voice: voice
                            },
                            inflections: [
                              {
                                conjugation: conjugation,
                                constraints: {},
                                'full form': fullform,
                                mood: mood,
                                number: number,
                                'part of speach': partOfSpeach,
                                person: person,
                                stem: 'foostem',
                                suffix: 'foosuffix',
                                tense: tense,
                                voice: voice,
                                word: word
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-morph__inflections').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-morph__inflections').findAll('.alpheios-morph__inflset').length).toEqual(1)

    expect(cmp.find('.alpheios-morph__inflections').findAll('.inflset_index').exists()).toBeFalsy()

    let morphForms = cmp.find('.alpheios-morph__inflections .alpheios-morph__forms')

    expect(morphForms.find('[data-feature="stem"]').text()).toEqual('foostem')
    expect(morphForms.find('[data-feature="stem"]').attributes()['lang']).toEqual('lat')
    expect(morphForms.find('[data-feature="stem"]').element.getAttribute('data-grouplevel')).toEqual('1')
    expect(morphForms.find('[data-feature="suffix"]').text()).toEqual('-foosuffix')
    expect(morphForms.find('[data-feature="suffix"]').attributes()['lang']).toEqual('lat')
    expect(morphForms.find('[data-feature="suffix"]').element.getAttribute('data-grouplevel')).toEqual('1')

    expect(morphForms.findAll(InflectionAttribute).length).not.toBeLessThan(5)

    expect(morphForms.find('[data-feature="person"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="person"]').text()).toEqual('3rd person')

    expect(morphForms.find('[data-feature="number"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="number"]').text()).toEqual('sing.')

    expect(morphForms.find('[data-feature="tense"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="tense"]').text()).toEqual('perf.')

    expect(morphForms.find('[data-feature="mood"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="mood"]').text()).toEqual('ind.')

    expect(morphForms.find('[data-feature="voice"]').element.getAttribute('data-grouplevel')).toEqual('4')
    expect(morphForms.find('[data-feature="voice"]').text()).toEqual('act.')
  })

  it('10 Morph - renders with disambiguated class', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: '1',
            features: {},
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] },
          disambiguated: true
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      stubs: [ 'inflectionattribute' ],
      store,
      localVue,
      mocks: api
    })
    expect(cmp.find('.alpheios-morph__dictentry-disambiguated').exists()).toBeTruthy()
  })

  it('11 Morph - renders multiple lemmas per lexeme', () => {
    homonym = {
      lexemes: [
        {
          inflections: [],
          lemma: {
            ID: '1',
            features: { 'frequency': { compareTo: () => { return 1 } } },
            languageCode: 'lat',
            languageID: LMF.getLanguageIdFromCode('lat'),
            word: 'foo-word',
            principalParts: [ 'part1', 'part2' ]
          },
          altLemmas: [
            {
              ID: '2',
              features: { 'frequency': { compareTo: () => { return -1 } } },
              languageCode: 'lat',
              languageID: LMF.getLanguageIdFromCode('lat'),
              word: 'foo-word',
              principalParts: [ 'part1a', 'part2a' ]
            }
          ],
          meaning: {},
          isPopulated: () => { return true },
          getGroupedInflections: () => { return [] }
        }
      ]
    }
    api.app.homonym = homonym

    let cmp = mount(Morph, {
      stubs: { 'inflectionattribute': '<div class="inflectionattribute"></div>' },
      store,
      localVue,
      mocks: api
    })

    let PP = cmp.findAll('.principal_parts')
    expect(PP.length).toEqual(2)
    let firstPP = PP.at(0).findAll('span.alpheios-morph__listitem')
    let secondPP = PP.at(1).findAll('span.alpheios-morph__listitem')
    // first Lemma of altLemmas sorts highest so it comes first
    expect(firstPP.at(0).text()).toEqual('part1a')
    expect(secondPP.at(0).text()).toEqual('part1')
  })
})
