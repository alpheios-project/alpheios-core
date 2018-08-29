/* eslint-env jest */
/* eslint-disable no-unused-vars */
import AlignmentSelector from '@/lib/selection/alignment/alignment-selector'

describe('alignment-selector.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
    document.body.innerHTML = `
      <div id="source">
        <span id="word1" data-alpheios_align_ref="#word2,#word3">vidi</span>
      </div>
      <div id="translation">
        <span id="word2" data-alpheios_align_ref="#word1">I</span>
        <span id="word3" data-alpheios_align_ref="#word1">saw</span>
      </div>
    `
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 AlignmentSelector - constructor applies settings, ', () => {
    let alignment = new AlignmentSelector(document, {highlightClass: 'mockClass2'})
    // uses override highlightClass
    expect(alignment.settings.highlightClass).toEqual('mockClass2')
    // uses defaults for focusEvent and blurEvent
    expect(alignment.settings.focusEvent).toEqual('mouseenter')
    expect(alignment.settings.blurEvent).toEqual('mouseleave')
  })

  it('2 AlignmentSelector - responds to focus event, ', () => {
    let mockEvent = document.createEvent('Event')
    mockEvent.initEvent('mouseenter', true, true)
    let alignment = new AlignmentSelector(document, {highlightClass: 'mockClass2'})
    alignment.activate()
    jest.spyOn(alignment, 'focus')
    document.querySelector('#word1').dispatchEvent(mockEvent)
    expect(alignment.focus).toHaveBeenCalled()
    expect(document.querySelector('#word1').classList.contains('mockClass2')).toBeTruthy()
  })

  it('3 AlignmentSelector - responds to blur event, ', () => {
    let mockFocusEvent = document.createEvent('Event')
    let mockBlurEvent = document.createEvent('Event')
    mockFocusEvent.initEvent('mouseenter', true, true)
    mockBlurEvent.initEvent('mouseleave', true, true)
    let alignment = new AlignmentSelector(document, {highlightClass: 'mockClass2'})
    alignment.activate()
    jest.spyOn(alignment, 'blur')
    document.querySelector('#word1').dispatchEvent(mockFocusEvent)
    expect(document.querySelector('#word1').classList.contains('mockClass2')).toBeTruthy()
    document.querySelector('#word1').dispatchEvent(mockBlurEvent)
    expect(alignment.blur).toHaveBeenCalled()
    expect(document.querySelector('#word1').classList.contains('mockClass2')).toBeFalsy()
  })
  it('3 AlignmentSelector - halts if disabled, ', () => {
    let mockEvent = document.createEvent('Event')
    mockEvent.initEvent('mouseenter', true, true)
    let alignment = new AlignmentSelector(document, {highlightClass: 'mockClass2'})
    alignment.activate()
    jest.spyOn(alignment, 'focus')
    document.querySelector('#translation').classList.add('alpheios-alignment__disabled')
    document.querySelector('#word1').dispatchEvent(mockEvent)
    expect(alignment.focus).toHaveBeenCalled()
    expect(document.querySelector('#word1').classList.contains('mockClass2')).toBeFalsy()
  })
})
