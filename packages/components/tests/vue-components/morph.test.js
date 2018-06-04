/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Morph from '../../src/vue-components/morph.vue'

describe('morph.test.js', () => {
  let cmp, mockLexemeNoun
  let latin = Symbol('latin')
  let mockFeature = (type, value, languageID) => {
    return {
      type: type,
      value: value,
      languageID: languageID,
      isEqual: (b) => {
        return type === b.type && value === b.value && languageID === b.languageID
      },
      toLocaleStringAbbr: () => {
        return 'f'
      }
    }
  }

  beforeEach(() => {
    let mockNounInflectionGroup = [
      {
        groupingKey: {
          prefix: 'f',
          stem: 'o',
          suffix: 'o',
          'part of speech': mockFeature('part of speech', 'pronoun', latin),
          declension: mockFeature('declension', '2nd', latin)
        },
        inflections: [
          {
            groupingKey: {
              number: mockFeature('number', 'singular', latin),
              isCaseInflectionSet: true
            }
          },
          {
            groupingKey: {
              number: mockFeature('number', 'plural', latin),
              isCaseInflectionSet: true
            }
          }
        ]

      },
      {
        groupingKey: {
          prefix: '',
          stem: 'f',
          suffix: 'oo',
          'part of speech': mockFeature('part of speech', 'noun', latin),
          declension: mockFeature('declension', '1st', latin)
        },
        inflections: [
          {
            groupingKey: {
              number: mockFeature('number', 'singular', latin),
              isCaseInflectionSet: true
            },
            inflections: [
              {
                groupingKey: {
                  tense: mockFeature('tense', undefined, latin),
                  voice: mockFeature('voice', undefined, latin)
                },
                inflections: [
                  {
                    groupingKey: {
                      case: mockFeature('case', 'accusative', latin),
                      gender: mockFeature('gender', 'feminine', latin),
                      number: mockFeature('tense', 'singular', latin)
                    },
                    inflections: [
                      {
                        example: mockFeature('example', 'foo example', latin)
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            groupingKey: {
              number: mockFeature('number', 'plural', latin),
              isCaseInflectionSet: true
            }
          }
        ]

      }
    ]

    let mockVerbInflectionGroup = [
      {
        groupingKey: {
          prefix: '',
          stem: 'fo',
          suffix: 'o',
          'part of speech': mockFeature('part of speech', 'verb', latin)
        },
        inflections: [
          {
            groupingKey: {
              tense: mockFeature('tense', 'present', latin),
              isCaseInflectionSet: false
            },
            inflections: [
              {
                groupingKey: {
                  tense: mockFeature('tense', 'present', latin),
                  voice: mockFeature('voice', 'active', latin)
                },
                inflections: [
                  {
                    groupingKey: {
                      number: mockFeature('number', 'singular', latin),
                      person: mockFeature('person', '1st', latin),
                      voice: mockFeature('voice', 'active', latin)
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        groupingKey: {
          prefix: '',
          stem: 'fo',
          suffix: 'o',
          'part of speech': mockFeature('part of speech', 'verb participle', latin)
        },
        inflections: [
          {
            groupingKey: {
              number: mockFeature('number', 'singular', latin),
              isCaseInflectionSet: true
            },
            inflections: [
              {
                groupingKey: {
                  tense: mockFeature('tense', 'present', latin),
                  voice: mockFeature('voice', 'active', latin),
                  isCaseInflectionSet: true
                },
                inflections: [
                  {
                    groupingKey: {
                      case: mockFeature('case', 'accusative', latin),
                      gender: mockFeature('gender', 'feminine', latin)
                    },
                    inflections: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    mockLexemeNoun = {
      isPopulated: () => { return true },
      lemma: {
        principalParts: ['foo', 'bar'],
        features: {
          'pronunciation': mockFeature('pronunciation', 'foopron', latin),
          'case': mockFeature('case', 'accusative', latin),
          'gender': mockFeature('gender', 'feminine', latin),
          'part of speech': mockFeature('part of speech', 'noun', latin),
          'declension': mockFeature('declension', '1st', latin),
          'frequency': mockFeature('frequency', 'frequent', latin),
          'age': mockFeature('age', 'ancient', latin),
          'source': mockFeature('source', 'foo source', latin),
          'note': mockFeature('note', 'foo note', latin)
        },
        word: 'foo',
        ID: 'foo-noun-lat-key',
        languageID: latin
      },
      getGroupedInflections: () => { return mockNounInflectionGroup }
    }
    cmp = mount(Morph, {
      propsData: {
        lexemes: [
          mockLexemeNoun,
          {
            isPopulated: () => { return false },
            lemma: { principalParts: [], features: {}, word: null, languageID: null, key: null },
            getGroupedInflections: () => { return [] }
          },
          {
            isPopulated: () => { return true },
            lemma: {
              principalParts: ['bar'],
              features: {
                'conjugation': mockFeature('conjugation', '1st', latin),
                'part of speech': mockFeature('part of speech', 'verb', latin),
                'kind': mockFeature('kind', 'taking xyz', latin)
              },
              word: 'foo',
              ID: 'foo-verb-lat-key',
              languageID: latin
            },
            getGroupedInflections: () => { return mockVerbInflectionGroup }
          }
        ],
        definitions: {
          'foo-noun-lat-key': [{text: 'foo noun def 1'}, {text: 'foo noun def 2'}],
          'foo-verb-lat-key': [{text: 'foo verb def 1'}]
        },
        linkedfeatures: ['declension'],
        morphDataReady: true
      },
      data: {
        showSource: false
      }
    }) // Create a copy of the original component
  })

  it('expects types to be defined upon creation', () => {
    let morphInner = cmp.vm.$children[0]
    expect(morphInner.types).toBeTruthy()
    expect(morphInner.types.grmCase).toBeTruthy()
  })

  it('expects to showLexeme only if a lexeme is populated', () => {
    expect(cmp.vm.showLexeme(cmp.vm.lexemes[0])).toBeTruthy()
    expect(cmp.vm.showLexeme(cmp.vm.lexemes[1])).toBeFalsy()
    let entries = cmp.find('div').findAll('div.alpheios-morph__dictentry')
    expect(entries.length).toEqual(3)
    expect(entries.at(0).isVisible()).toBeTruthy()
    expect(entries.at(1).isVisible()).toBeFalsy()
  })

  it('expects the lemma word to be deduped from principalParts', () => {
    let entries = cmp.find('div').findAll('div.alpheios-morph__dictentry')
    let firstLexemeWord = entries.at(0).findAll('span.alpheios-morph__hdwd')
    let thirdLexemeWord = entries.at(2).findAll('span.alpheios-morph__hdwd')
    expect(firstLexemeWord.length).toEqual(1)
    expect(firstLexemeWord.at(0).findAll('span.alpheios-morph__hdwd span.alpheios-morph__listitem').length).toEqual(2)
    expect(firstLexemeWord.at(0).findAll('span.alpheios-morph__hdwd span.alpheios-morph__listitem').at(0).text()).toEqual('foo')
    expect(firstLexemeWord.at(0).findAll('span.alpheios-morph__hdwd span.alpheios-morph__listitem').at(1).text()).toEqual('bar')
    expect(thirdLexemeWord.length).toEqual(2)
    expect(thirdLexemeWord.at(0).text()).toEqual('foo')
    expect(thirdLexemeWord.at(1).findAll('span.alpheios-morph__hdwd span.alpheios-morph__listitem').length).toEqual(1)
    expect(thirdLexemeWord.at(1).findAll('span.alpheios-morph__hdwd span.alpheios-morph__listitem').at(0).text()).toEqual('bar')
  })

  it('expects pronunciation to be rendered in brackets', () => {
    let entries = cmp.find('div').findAll('div.alpheios-morph__dictentry')
    expect(entries.at(0).find('[data-feature="pronunciation"]').text()).toEqual('[foopron]')
  })

  it('expects case and gender to be rendered with pofs for noun', () => {
    let pofsElem = cmp.find('div').find('div.alpheios-morph__dictentry').find('div.alpheios-morph__morphdata').find('span.alpheios-morph__pofs')
    expect(pofsElem).toBeTruthy()
    expect(pofsElem.find('[data-feature="case"]').is('span')).toBeTruthy()
    expect(pofsElem.find('[data-feature="gender"]').is('span')).toBeTruthy()
    expect(pofsElem.find('[data-feature="part of speech"]').is('span')).toBeTruthy()
  })

  it('expects case and gender not to be rendered with pofs for verb', () => {
    let pofsElem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).find('div.alpheios-morph__morphdata').find('span.alpheios-morph__pofs')
    expect(pofsElem).toBeTruthy()
    expect(pofsElem.find('[data-feature="case"]').exists()).toBeFalsy()
    expect(pofsElem.find('[data-feature="gender"]').exists()).toBeFalsy()
    expect(pofsElem.find('[data-feature="part of speech"]').is('span')).toBeTruthy()
  })

  it('expects lemma feature kind to be rendered', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).find('div.alpheios-morph__morphdata').find('[data-feature="kind"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('(taking xyz)')
  })

  it('expects lemma feature conjugation to be rendered', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).find('div.alpheios-morph__morphdata').find('[data-feature="conjugation"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('1st conjugation')
  })

  it('expects lemma feature declension to be rendered', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="declension"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('1st declension')
  })

  it('expected featureList to return a object with  a list of features for rendering', () => {
    let morphInner = cmp.vm.$children[0]
    expect(morphInner.featureList(mockLexemeNoun.lemma, ['age', 'frequency'], 'extras')).toEqual({ extras: { value: '(ancient, frequent)' } })
  })

  it('expects extra lemma features to be rendered', () => {
    let elem
    if (cmp.find('.morph-inner-v1').exists() === false) {
      elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="extras"]')
    } else {
      elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__features').find('[data-feature="extras"]')
    }

    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('(ancient, frequent)')
  })

  it('expects extra lemma features to be empty', () => {
    let elem
    if (cmp.find('.morph-inner-v1').exists() === false) {
      elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).find('div.alpheios-morph__morphdata').find('[data-feature="extras"]')
      expect(elem.exists()).toBeTruthy()
      expect(elem.text()).toEqual('')
    } else {
      elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).find('div.alpheios-morph__features').find('[data-feature="extras"]')
      expect(elem.exists()).toBeFalsy()
    }
  })

  it('expects lemma feature note to be rendered in brackets', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="note"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('[foo note]')
  })

  it('expects lemma feature source to be rendered in brackets', () => {
    let elem
    if (cmp.find('.morph-inner-v1').exists() === false) {
      elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="source"]')
    } else {
      elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__features').find('[data-feature="source"]')
    }

    // let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="source"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('[foo source]')
  })

  it('expects correct definitions to be rendered', () => {
    let elems = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div').findAll('div.alpheios-morph__definition')
    expect(elems.length).toEqual(2)
    expect(elems.at(0).attributes()['data-lemmakey']).toEqual('foo-noun-lat-key')
    expect(elems.at(1).attributes()['data-lemmakey']).toEqual('foo-noun-lat-key')
    elems = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).find('div').findAll('div.alpheios-morph__definition')
    expect(elems.length).toEqual(1)
    expect(elems.at(0).attributes()['data-lemmakey']).toEqual('foo-verb-lat-key')
  })

  it('expects inflection group with different part of speech and declension than lemma to render them', () => {
    let inflset = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__inflections div.alpheios-morph__inflset')
    expect(inflset.find('.alpheios-morph__inflfeatures').exists()).toBeTruthy()
    expect(inflset.find('.alpheios-morph__inflfeatures').text()).toEqual(expect.stringMatching(/pronoun/))
    expect(inflset.find('.alpheios-morph__inflfeatures').text()).toEqual(expect.stringMatching(/2nd declension/))
  })

  it('expects inflection group with same part of speech and declension as lemma to not render them', () => {
    let inflset = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset')
    expect(inflset.at(1).find('.alpheios-morph__inflfeatures').exists()).toBeTruthy()
    expect(inflset.at(1).find('.alpheios-morph__inflfeatures').text()).toEqual('')
  })

  it('expects inflection group to render form prefix stem suffix', () => {
    let inflset = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset')
    expect(inflset.at(0).find('.alpheios-morph__formtext[data-feature="prefix"]').text()).toEqual('f')
    expect(inflset.at(0).find('.alpheios-morph__formtext[data-feature="stem"]').text()).toEqual('o')
    expect(inflset.at(0).find('.alpheios-morph__formtext[data-feature="suffix"]').text()).toEqual('-o')
  })

  it('expects inflection group to render number for second group only if caseInflection', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset')
    expect(elem.at(0).find('span[data-grouplevel="2"][data-feature="number"]').exists()).toBeFalsy()
    expect(elem.at(1).find('span[data-grouplevel="2"][data-feature="number"]').exists()).toBeTruthy()
  })

  it('expects inflection group to render voice and tense for third group only if caseInflection', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    // console.log(cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).html())
    expect(elem.at(0).find('span[data-grouplevel="3"][data-feature="tense"]').exists()).toBeFalsy()
    expect(elem.at(1).find('span[data-grouplevel="3"][data-feature="tense"]').exists()).toBeTruthy()
    expect(elem.at(0).find('span[data-grouplevel="3"][data-feature="voice"]').exists()).toBeFalsy()
    expect(elem.at(1).find('span[data-grouplevel="3"][data-feature="voice"]').exists()).toBeTruthy()
  })

  it('expects a group separator to be present for case inflections with number, tense, or voice features', () => {
    let elem
    if (cmp.find('.morph-inner-v1').exists() === false) {
      elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
      expect(elem.at(0).find('.alpheios-morph__inline .alpheios-morph__groupseparator').exists()).toBeFalsy()
      expect(elem.at(1).find('.alpheios-morph__inline .alpheios-morph__groupseparator').text()).toEqual(':')
    }
  })

  it('expects gender not to be shown for inflection group only if it is different than the lemma gender', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    expect(elem.at(1).find('.alpheios-morph__inline [data-feature="gender"]').exists()).toBeFalsy()
    elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    expect(elem.at(1).find('.alpheios-morph__inline [data-feature="gender"]').text()).toEqual('(f)')
  })

  it('expects case to be shown for noun inflection group', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    expect(elem.at(2).find('[data-grouplevel="4"][data-feature="case"]').text()).toEqual('accusative')
  })

  it('expects person to be shown for verb inflection group', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    expect(elem.at(0).find('[data-grouplevel="4"][data-feature="person"]').text()).toEqual('1st person')
  })

  it('expects number to be shown for verb inflection group', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    expect(elem.at(0).find('[data-grouplevel="4"][data-feature="number"]').text()).toEqual('singular')
  })

  it('expects voice to be shown for verb inflection group', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    expect(elem.at(0).find('[data-grouplevel="4"][data-feature="voice"]').text()).toEqual('active')
  })

  it('expects example to be shown', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).findAll('div.alpheios-morph__inflections div.alpheios-morph__inflset div.alpheios-morph__inflgroup')
    expect(elem.at(2).find('[data-feature="example"]').text()).toEqual('foo example')
  })
})
