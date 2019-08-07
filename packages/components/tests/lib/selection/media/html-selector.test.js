/* eslint-env jest */
/* eslint-disable no-unused-vars */

import HTMLSelector from '@/lib/selection/media/html-selector'
import TextSelector from '@/lib/selection/text-selector'
import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'
import { Constants, TextQuoteSelector, LanguageModelFactory } from 'alpheios-data-models'

describe('html-selector.test.js', () => {
  // console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let eventEl, testElement, parentElement
  beforeAll(() => {
    testElement = document.createElement("p")
    let node = document.createTextNode("a bene placito")
    testElement.appendChild(node)

    parentElement = document.createElement("div")
    parentElement.appendChild(testElement)
    document.body.appendChild(parentElement)

    testElement.ownerDocument.getSelection = jest.fn(() => {
      return {
        anchorNode: {
          data: 'a bene placito'
        },
        anchorOffset: 7,
        focusNode: {
          data: 'a bene placito'
        },
        focusOffset: 14,
        baseNode: {
          data: 'a bene placito'
        },
        extentNode: {
          data: 'a bene placito'
        },
        baseOffset: 14,
        extentOffset: 14,
        setBaseAndExtent: () => {},
        removeAllRanges: () => {},
        addRange: () => {}
      }
    })

    document.caretRangeFromPoint = jest.fn(() => {
      return {
        commonAncestorContainer: testElement,
        startContainer: testElement,
        endContainer: testElement,
        startOffset: 10,
        endOffset: 10
      }
    })

    document.createRange = jest.fn(() => {
      return {
        commonAncestorContainer: testElement,
        startContainer: testElement,
        endContainer: testElement,
        startOffset: 13,
        endOffset: 13,
        setStart: () => {},
        setEnd: () => {}
      }
    })

    let evtHandler = jest.fn(() => {})
    eventEl = new MouseDblClick(testElement, evtHandler)
    eventEl.start.client = { x:72, y:480 }
    eventEl.end.client = { x:72, y:480 }
    eventEl.end.target = testElement
  }),
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  function createEventWithSelection (text, start) {
    let testElement2 = document.createElement("p")
    let node = document.createTextNode(text)
    testElement2.appendChild(node)
    document.body.appendChild(testElement2)

    let evtHandler = jest.fn(() => {})
    let eventEl2 = new MouseDblClick(testElement2, evtHandler)
    eventEl2.start = eventEl.start
    eventEl2.start = eventEl.end
    eventEl2.end.target = testElement2

    testElement2.ownerDocument.getSelection = jest.fn(() => {
      return {
        anchorNode: {
          data: text
        },
        anchorOffset: start,
        focusNode: {
          data: text
        },
        setBaseAndExtent: () => {},
        removeAllRanges: () => {},
        addRange: () => {}
      }
    })

    return eventEl2
  }

  it('1 HTMLSelector - constructor creates an object with event, target, targetRect, location, languageID, wordSeparator', () => {
    let htmlSel = new HTMLSelector(eventEl, 'lat')

    expect(htmlSel.event).toEqual(eventEl)
    expect(htmlSel.target).toEqual(eventEl.end.target)
    expect(htmlSel.targetRect).toEqual({
      top: eventEl.start.client.y,
      left: eventEl.start.client.x
    })
    expect(htmlSel.languageID).toEqual(Constants.LANG_LATIN)
    expect(htmlSel.wordSeparator).toBeInstanceOf(Map)
  })

  it('2 HTMLSelector - static getSelector creates HTMLSelector from given event and languageCode and returns textSelector', () => {
    let textSel = HTMLSelector.getSelector(eventEl, 'lat')
    expect(textSel.text).toEqual('placito')
    expect(textSel.languageID).toEqual(Constants.LANG_LATIN)
    expect(textSel.start).toEqual(7)
    expect(textSel.end).toEqual(14)
    expect(textSel.textQuoteSelector).toBeInstanceOf(TextQuoteSelector)
  })

  it('3 HTMLSelector - createTextSelector methods returns textSelector from HTMLSelector', () => {
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    let textSel = htmlSel.createTextSelector()

    expect(textSel.text).toEqual('placito')
    expect(textSel.languageID).toEqual(Constants.LANG_LATIN)
    expect(textSel.start).toEqual(7)
    expect(textSel.end).toEqual(14)
    expect(textSel.textQuoteSelector).toBeInstanceOf(TextQuoteSelector)
  })

  it('4 HTMLSelector - createSelectionFromPoint method returns range from the selection (used variant with document.caretRangeFromPoint)', () => {
    let range = HTMLSelector.createSelectionFromPoint(72, 480)
    expect(document.caretRangeFromPoint).toHaveBeenCalled()
    expect(document.createRange).toHaveBeenCalled()
    expect(document.getSelection).toHaveBeenCalled()

    expect(range).toBeDefined()
  })

  it('5 HTMLSelector - setDataAttributes method adds treebank properties to the selection if an element has data-alpheios_tb_src properties and data-alpheios_tb_ref', () => {
    let alpheios_tb_ref = 'phi0959.phi006.alpheios-text-lat1#1-2'
    let alpheios_tb_src = 'http://alpheios.net/alpheios-treebanks/DOC.html?chunk=SENTENCE&w=WORD'

    testElement.setAttribute('data-alpheios_tb_ref', alpheios_tb_ref)
    testElement.setAttribute('data-alpheios_tb_src', alpheios_tb_src)
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    htmlSel.setDataAttributes()

    expect(htmlSel.data.treebank).toBeDefined()
    expect(htmlSel.data.treebank.word.src).toEqual(alpheios_tb_src)
    expect(htmlSel.data.treebank.word.ref).toEqual(alpheios_tb_ref)

    testElement.removeAttribute('data-alpheios_tb_ref')
    testElement.removeAttribute('data-alpheios_tb_src')
  })

  it('6 HTMLSelector - setDataAttributes method doesn\'t add treebank properties to the selection if an element has not data-alpheios_tb_src properties or data-alpheios_tb_ref', () => {
    let alpheios_tb_ref = 'phi0959.phi006.alpheios-text-lat1#1-2'
    let alpheios_tb_src = 'http://alpheios.net/alpheios-treebanks/DOC.html?chunk=SENTENCE&w=WORD'

    testElement.setAttribute('data-alpheios_tb_ref', alpheios_tb_ref)

    let htmlSel1 = new HTMLSelector(eventEl, 'lat')
    htmlSel1.setDataAttributes()
    expect(htmlSel1.data.treebank).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_tb_ref')

    testElement.setAttribute('data-alpheios_tb_src', alpheios_tb_src)
    let htmlSel2 = new HTMLSelector(eventEl, 'lat')
    htmlSel2.setDataAttributes()
    expect(htmlSel2.data.treebank).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_tb_src')
  })

  it('7 HTMLSelector - setDataAttributes method adds alignment properties to the selection if an element has data-alpheios_align_src properties and data-alpheios_align_ref', () => {
    let alpheios_align_ref = '#aligned-eng span[data-alpheios_align_word=\'s7\']'
    let alpheios_align_src = 'fooSrc'

    testElement.setAttribute('data-alpheios_align_src', alpheios_align_src)
    testElement.setAttribute('data-alpheios_align_ref', alpheios_align_ref)
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    htmlSel.setDataAttributes()

    expect(htmlSel.data.translation).toBeDefined()
    expect(htmlSel.data.translation.src).toEqual(alpheios_align_src)
    expect(htmlSel.data.translation.ref).toEqual(alpheios_align_ref)

    testElement.removeAttribute('data-alpheios_align_src')
    testElement.removeAttribute('data-alpheios_align_ref')
  })

  it('8 HTMLSelector - setDataAttributes method doesn\'t add alignment properties to the selection if an element has not data-alpheios_align_src properties or data-alpheios_align_ref', () => {
    let alpheios_align_ref = '#aligned-eng span[data-alpheios_align_word=\'s7\']'
    let alpheios_align_src = 'fooSrc'

    testElement.setAttribute('data-alpheios_align_ref', alpheios_align_ref)

    let htmlSel1 = new HTMLSelector(eventEl, 'lat')
    htmlSel1.setDataAttributes()
    expect(htmlSel1.data.translation).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_align_ref')

    testElement.setAttribute('data-alpheios_align_src', alpheios_align_src)
    let htmlSel2 = new HTMLSelector(eventEl, 'lat')
    htmlSel2.setDataAttributes()
    expect(htmlSel2.data.translation).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_align_src')
  })

  it('9 HTMLSelector - getLanguageCodeFromSource method returns lang if element has lang property', () => {
    testElement.setAttribute('xml:lang', 'grc')
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    let langCode = htmlSel.getLanguageCodeFromSource()
    expect(langCode).toEqual('grc')
    testElement.removeAttribute('xml:lang')
  })

  it('10 HTMLSelector - getLanguageCodeFromSource method returns lang if element has no lang property, but parent has', () => {
    parentElement.setAttribute('xml:lang', 'gez')
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    let langCode = htmlSel.getLanguageCodeFromSource()
    expect(langCode).toEqual('gez')
  })

  it('11 HTMLSelector - static getSelection method executes getSelection of the ownerDocument ', () => {
    HTMLSelector.getSelection(testElement)
    expect(testElement.ownerDocument.getSelection).toHaveBeenCalled()
  })

  it('12 HTMLSelector - doSpaceSeparatedWordSelection method fills given textSelector with data from htmlSelector - text, start, end, context, position and executes createTextQuoteSelector ', () => {
    let eventEl2 = createEventWithSelection('mare cupidinibus cepit differ', 0)

    let htmlSel = new HTMLSelector(eventEl2, 'lat')
    let textSelector = new TextSelector(Constants.LANG_LATIN)
    textSelector.model = LanguageModelFactory.getLanguageModel(Constants.LANG_LATIN)
    textSelector.location = htmlSel.location
    textSelector.data = htmlSel.data

    jest.spyOn(textSelector, 'createTextQuoteSelector')

    expect(textSelector.text).toEqual('')
    expect(textSelector.start).toEqual(0)
    expect(textSelector.end).toEqual(0)
    expect(textSelector.context).toBeNull()
    expect(textSelector.position).toEqual(0)

    htmlSel.doSpaceSeparatedWordSelection(textSelector)

    expect(textSelector.text).toEqual('mare')
    expect(textSelector.start).toEqual(0)
    expect(textSelector.end).toEqual(4)
    expect(textSelector.context).toBeNull()
    expect(textSelector.position).toEqual(0)

    expect(textSelector.createTextQuoteSelector).toHaveBeenCalled()
    expect(textSelector.textQuoteSelector.prefix).toEqual('')
    expect(textSelector.textQuoteSelector.suffix).toEqual('cupidinibus cepit differ')
    expect(textSelector.textQuoteSelector.source).toEqual(htmlSel.location)
  })

  it('13 HTMLSelector - doSpaceSeparatedWordSelection method fills given textSelector with data from htmlSelector - text, start, end, escapes punctuation ', () => {
    let eventEl2 = createEventWithSelection('(mare[cupidinibus]cepit|differ)', 6)

    let htmlSel = new HTMLSelector(eventEl2, 'lat')
    let textSelector = new TextSelector(Constants.LANG_LATIN)
    textSelector.model = LanguageModelFactory.getLanguageModel(Constants.LANG_LATIN)
    textSelector.location = htmlSel.location
    textSelector.data = htmlSel.data

    expect(textSelector.text).toEqual('')
    expect(textSelector.start).toEqual(0)
    expect(textSelector.end).toEqual(0)
    expect(textSelector.context).toBeNull()
    expect(textSelector.position).toEqual(0)

    htmlSel.doSpaceSeparatedWordSelection(textSelector)

    expect(textSelector.text).toEqual('cupidinibus')
    expect(textSelector.start).toEqual(6)
    expect(textSelector.end).toEqual(17)
    expect(textSelector.context).toBeNull()
    expect(textSelector.position).toEqual(0)

  })

  it('14 HTMLSelector - doSpaceSeparatedWordSelection method fills given textSelector with data from htmlSelector - if selection is null, then textSelector is null too ', () => {
    let eventEl2 = createEventWithSelection('', 0)

    let htmlSel = new HTMLSelector(eventEl2, 'lat')
    let textSelector = new TextSelector(Constants.LANG_LATIN)
    textSelector.model = LanguageModelFactory.getLanguageModel(Constants.LANG_LATIN)
    textSelector.location = htmlSel.location
    textSelector.data = htmlSel.data

    expect(textSelector.text).toEqual('')
    expect(textSelector.start).toEqual(0)
    expect(textSelector.end).toEqual(0)
    expect(textSelector.context).toBeNull()
    expect(textSelector.position).toEqual(0)

    htmlSel.doSpaceSeparatedWordSelection(textSelector)

    expect(textSelector.text).toEqual('')
    expect(textSelector.start).toEqual(0)
    expect(textSelector.end).toEqual(0)
    expect(textSelector.context).toBeNull()
    expect(textSelector.position).toEqual(0)
  })

  it('15 HTMLSelector - _escapeRegExp method escapes punctuation from the string', () => {
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    let res = htmlSel._escapeRegExp('(mare[cupidinibus]cepit|differ)')
    expect(res).toEqual('\\(mare\\[cupidinibus\\]cepit\\|differ\\)')
  })

  it('16 HTMLSelector - static getDumpHTMLSelector method returns minimal object (for lookups)', () => {
    let res = HTMLSelector.getDumpHTMLSelector()
    expect(res.targetRect).toEqual({
      top: 0, left: 0
    })
  })

  it('17 HTMLSelector - uses alpheios-word-node as target', () => {
    let testEl = document.createElement("span")
    let testSub = document.createElement("b")
    testSub.appendChild(document.createTextNode('p'))
    testEl.setAttribute('data-alpheios-word-node','default')
    testEl.appendChild(testSub)
    testEl.appendChild(document.createTextNode('artial'))
    document.body.appendChild(testEl)
    let evtHandler = jest.fn(() => {})
    let eventEl = new MouseDblClick(testEl, evtHandler)
    eventEl.end.target = testEl
    let htmlSel = HTMLSelector.getSelector(eventEl, 'lat')
    expect(htmlSel.text).toEqual('partial')
    expect(htmlSel.textQuoteSelector.prefix).toEqual('')
    expect(htmlSel.textQuoteSelector.suffix).toEqual('')
  })

  it('18 HTMLSelector - alpheios-word-node=exact preserves puncutation in target', () => {
    let testEl = document.createElement("span")
    let testSub = document.createElement("b")
    testSub.appendChild(document.createTextNode('p'))
    testEl.setAttribute('data-alpheios-word-node','exact')
    testEl.appendChild(testSub)
    testEl.appendChild(document.createTextNode('[a]rtial'))
    document.body.appendChild(testEl)
    let evtHandler = jest.fn(() => {})
    let eventEl = new MouseDblClick(testEl, evtHandler)
    eventEl.end.target = testEl
    let htmlSel = HTMLSelector.getSelector(eventEl, 'lat')
    expect(htmlSel.text).toEqual('p[a]rtial')
    expect(htmlSel.textQuoteSelector.prefix).toEqual('')
    expect(htmlSel.textQuoteSelector.suffix).toEqual('')
  })
})