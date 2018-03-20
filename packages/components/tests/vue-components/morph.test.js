/* eslint-env jest */
import { shallow } from '@vue/test-utils'
import Morph from '../../src/vue-components/morph.vue'

describe('morph.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(Morph, {
      propsData: {
        lexemes: [
          {
            isPopulated: () => { return true },
            lemma: {
              principalParts: ['foo', 'bar'],
              features: {'pronunciation': ['foopron']},
              word: 'foo',
              languageID: Symbol('lat') },
            getGroupedInflections: () => { return [] }
          },
          {
            isPopulated: () => { return false },
            lemma: { principalParts: [], features: {}, word: null, languageID: null },
            getGroupedInflections: () => { return [] }
          },
          {
            isPopulated: () => { return true },
            lemma: { principalParts: ['bar'], features: {}, word: 'foo', languageID: Symbol('lat') },
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
})
