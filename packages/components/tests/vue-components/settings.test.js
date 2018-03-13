/* eslint-env jest */
import { shallow } from 'vue-test-utils'
import Setting from '../../src/vue-components/setting.vue'

describe('setting.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(Setting, {
      propsData: {
        data: {
          textValues: () => { return ['foo', 'bar'] },
          currentTextValue: () => { return 'foo' }
        }
      }
    }) // Create a copy of the original component
  })

  it('expects selected to be computed', () => {
    expect(cmp.vm.selected).toEqual('foo')
  })
})
