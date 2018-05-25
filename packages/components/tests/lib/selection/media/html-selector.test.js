/* eslint-env jest */
/* global MouseEvent */
import HTMLSelector from '../../../../src/lib/selection/media/html-selector'

describe('html-selector.test.js', () => {
  beforeEach(() => {
  })

  it('gathers data attributes', () => {
    document.body.innerHTML =
      `<div data-alpheios_tb_src="http://example.org/tb/mock"/>
       <div data-alpheios_align_src="http://example.org/align/mock"/>
       <span id="mocktarget" data-alpheios_tb_ref="1-1" data-alpheios_align_ref="1-1" lang="lat">foo</span>`

    let mockEvent = new MouseEvent('testEvent')
    let target = document.getElementById('mocktarget')
    target.dispatchEvent(mockEvent)
    target.addEventListener('testEvent', evt => {
      let selector = new HTMLSelector(evt, 'lat')
      expect(selector.data.treebank.word.src).toEqual('http://example.org/tb/mock')
      expect(selector.data.treebank.word.ref).toEqual('1-1')
      expect(selector.data.translation.src).toEqual('http://example.org/align/mock')
      expect(selector.data.translation.ref).toEqual('1-1')
    })
  })
})
