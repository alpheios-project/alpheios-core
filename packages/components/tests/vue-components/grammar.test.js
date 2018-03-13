/* eslint-env jest */
import { shallow } from 'vue-test-utils'
import Grammar from '../../src/vue-components/grammar.vue'

describe('grammar.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(Grammar, {
      propsData: {
        res: {
          url: 'foo',
          provider: 'foo description'
        }
      }
    }) // Create a copy of the original component
  })

  it('expects resource to be defined', () => {
    expect(cmp.vm.res.url).toEqual('foo')
    expect(cmp.vm.res.provider).toEqual('foo description')
  })
})
