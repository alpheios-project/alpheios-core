/* eslint-env jest */
import { shallow } from 'vue-test-utils'
import ShortDef from '../../src/vue-components/shortdef.vue'

describe('shortdef.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(ShortDef, {
      propsData: {
        definition: {
          lemmaText: 'foo',
          text: 'foo definition'
        }
      }
    }) // Create a copy of the original component
  })

  it('expects definition to be defined', () => {
    expect(cmp.vm.definition.lemmaText).toEqual('foo')
    expect(cmp.vm.definition.text).toEqual('foo definition')
  })
})
