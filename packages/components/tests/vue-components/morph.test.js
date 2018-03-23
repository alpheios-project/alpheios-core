/* eslint-env jest */
import { shallow } from '@vue/test-utils'
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
      }
    }
  }

  beforeEach(() => {
    let mockNounInflectionGroup = [
      {
        groupingKey: {
          prefix: '',
          stem: 'f',
          suffix: 'oo',
          'part of speech': mockFeature('part of speech', 'pronoun', latin),
          declension: mockFeature('declension', '2nd', latin)
        },
        inflections: [
          {
            groupingKey: {
              number: mockFeature('number', 'singular', latin)
            },
            isCaseInflectionSet: true

          },
          {
            groupingKey: {
              number: mockFeature('number', 'plural', latin)
            },
            isCaseInflectionSet: true
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
        key: 'foo-noun-lat-key',
        languageID: latin
      },
      getGroupedInflections: () => { return mockNounInflectionGroup }
    }
    cmp = shallow(Morph, {
      propsData: {
        lexemes: [
          mockLexemeNoun,
          {
            isPopulated: () => { return false },
            lemma: { principalParts: [], features: {}, word: null, languageID: null },
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
              key: 'foo-verb-lat-key',
              languageID: latin
            },
            getGroupedInflections: () => { return [] }
          }
        ],
        definitions: {
          'foo-noun-lat-key': [{text: 'foo noun def 1'}, {text: 'foo noun def 2'}],
          'foo-verb-lat-key': [{text: 'foo verb def 1'}]
        },
        linkedfeatures: ['declension']
      },
      data: {
        showSource: false
      }
    }) // Create a copy of the original component
  })

  it('expects types to be defined upon creation', () => {
    expect(cmp.vm.types).toBeTruthy()
    expect(cmp.vm.types.grmCase).toBeTruthy()
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

  it('expects attributeClass method to obey linkedfeatures', () => {
    expect(cmp.vm.attributeClass('declension')).toEqual('alpheios-morph__linkedattr')
    expect(cmp.vm.attributeClass('gender')).toEqual('alpheios-morph__attr')
  })

  it('expects attributeClass method to append extra classes', () => {
    expect(cmp.vm.attributeClass('declension', ['mockclass'])).toEqual('alpheios-morph__linkedattr mockclass')
  })

  it('expects pronunciation to be rendered in brackets', () => {
    let entries = cmp.find('div').findAll('div.alpheios-morph__dictentry')
    expect(entries.at(0).find('span.alpheios-morph__attr').text()).toEqual('[foopron]')
  })
  it('expects sendFeature to emit sendfeature', () => {
    let mockFeature = { type: 'declension', value: '1st' }
    cmp.vm.sendFeature([mockFeature])
    expect(cmp.emitted('sendfeature')).toBeTruthy()
    expect(cmp.emitted('sendfeature')[0]).toEqual([mockFeature])
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
    expect(elem.text()).toEqual('taking xyz')
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

  it('expected featureList to return a list of features for rendering', () => {
    expect(cmp.vm.featureList(mockLexemeNoun.lemma, ['age', 'frequency'])).toEqual('(ancient, frequent)')
  })

  it('expects extra lemma features to be rendered', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="extras"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('(ancient, frequent)')
  })

  it('expects extra lemma features to be empty', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(2).find('div.alpheios-morph__morphdata').find('[data-feature="extras"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('')
  })

  it('expects lemma feature note to be rendered in brackets', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="note"]')
    expect(elem.exists()).toBeTruthy()
    expect(elem.text()).toEqual('[foo note]')
  })

  it('expects lemma feature source to be rendered in brackets', () => {
    let elem = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__morphdata').find('[data-feature="source"]')
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

  it('expects inflection group with different part of speech and declension than lemma to render that', () => {
    let inflset = cmp.find('div').findAll('div.alpheios-morph__dictentry').at(0).find('div.alpheios-morph__inflections div.alpheios-morph__inflset')
    expect(inflset.find('.alpheios-morph__inflfeatures').exists()).toBeTruthy()
    expect(inflset.find('.alpheios-morph__inflfeatures').text()).toEqual(expect.stringMatching(/pronoun/))
    expect(inflset.find('.alpheios-morph__inflfeatures').text()).toEqual(expect.stringMatching(/2nd declension/))
  })
  // test that inflection group with same part of speech as lemma doesn't show part of speech
  // test that inflection group with different part of speech as lemma does show part of speech
})
