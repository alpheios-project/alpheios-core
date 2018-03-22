/* eslint-env jest */
import { shallow } from '@vue/test-utils'
import Morph from '../../src/vue-components/morph.vue'

describe('morph.test.js', () => {
  let cmp, mockLexemeNoun

  beforeEach(() => {
    mockLexemeNoun = {
      isPopulated: () => { return true },
      lemma: {
        principalParts: ['foo', 'bar'],
        features: {
          'pronunciation': { value: 'foopron' },
          'case': { value: 'accusative' },
          'gender': { value: 'feminine' },
          'part of speech': { value: 'noun' },
          'declension': {value: '1st'},
          'frequency': {type: 'frequency', value: 'frequent', languageID: Symbol('lat')},
          'age': {type: 'age', value: 'ancient', languageID: Symbol('lat')}
        },
        word: 'foo',
        languageID: Symbol('lat') },
      getGroupedInflections: () => { return [] }
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
                'conjugation': {value: '1st'},
                'part of speech': { value: 'verb' },
                'kind': { value: 'taking xyz' }
              },
              word: 'foo',
              languageID: Symbol('lat')
            },
            getGroupedInflections: () => { return [] }
          }
        ],
        definitions: {},
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
    let firstLexemeWord = entries.at(0).findAll('span.alpheios-morph__formtext')
    let thirdLexemeWord = entries.at(2).findAll('span.alpheios-morph__formtext')
    expect(firstLexemeWord.length).toEqual(1)
    expect(firstLexemeWord.at(0).findAll('span.alpheios-morph__listitem').length).toEqual(2)
    expect(firstLexemeWord.at(0).findAll('span.alpheios-morph__listitem').at(0).text()).toEqual('foo')
    expect(firstLexemeWord.at(0).findAll('span.alpheios-morph__listitem').at(1).text()).toEqual('bar')
    expect(thirdLexemeWord.length).toEqual(2)
    expect(thirdLexemeWord.at(0).text()).toEqual('foo')
    expect(thirdLexemeWord.at(1).findAll('span.alpheios-morph__listitem').length).toEqual(1)
    expect(thirdLexemeWord.at(1).findAll('span.alpheios-morph__listitem').at(0).text()).toEqual('bar')
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

  // test that inflection group with same part of speech as lemma doesn't show part of speech
  // test that inflection group with different part of speech as lemma does show part of speech
})
