/* eslint-env jest */
import { shallow } from '@vue/test-utils'
import Treebank from '../../src/vue-components/treebank.vue'

describe('treebank.test.js', () => {
  let cmp, spy

  beforeEach(() => {
    spy = jest.spyOn(Treebank.methods, 'updateSrcUrl')
    cmp = shallow(Treebank, {
      propsData: {
        res: {
          word: {
            src: 'http://example.org/tb/SENTENCE/WORD',
            ref: '1-2'
          }
        },
        locale: 'en-US',
        messages: {},
        visible: false
      }
    })
  })

  it('expects srcUrl to not be defined if not visible', () => {
    expect(cmp.vm.srcUrl).toEqual('')
  })

  it('expects srcUrl to be defined if visible', () => {
    cmp.setProps({visible: true})
    expect(cmp.vm.srcUrl).toEqual('http://example.org/tb/1/2')
  })

  it('expects srcUrl to not be updated on visibility change', () => {
    cmp.setProps({visible: true})
    expect(cmp.vm.srcUrl).toEqual('http://example.org/tb/1/2')
    expect(spy).toHaveBeenCalled()
    cmp.setProps({visible: false})
    spy.mockReset()
    spy.mockRestore()
    cmp.setProps({visible: true})
    expect(spy).not.toHaveBeenCalled()
  })

  it('works with a page url', () => {
    cmp.setProps({ res: { page: { src: 'https://remoteurl.com/1/2' } }, visible: true })
    expect(cmp.vm.srcUrl).toEqual('https://remoteurl.com/1/2')
  })
})
