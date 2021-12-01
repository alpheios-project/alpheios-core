import 'element-closest' // To polyfill Element.closest() if required
import { Constants, LanguageModelFactory, Logger } from 'alpheios-data-models'
import { LanguageDetect } from 'alpheios-language-detect'
import TextSelector from '../text-selector'
import MediaSelector from './media-selector'

export default class HTMLSelector extends MediaSelector {
  /**
   * @param {PointerEvt} event - Event object with information about text selection.
   *                             A custom pointer event or its children.
   * @param {string} defaultLanguageCode - A language code in ISO 639-3 format. It takes a language code
   *        instead of a standard language ID because HTMLSelector operates with HTML sources, and those
   *        have language codes as means of language identification.
   */
  constructor (event, defaultLanguageCode) {
    super()
    this.event = event
    this.target = event.end.target
    // Determine a language ID based on an environment of a target
    const { languageFromSource, languageID } = this.getLanguageID(defaultLanguageCode)
    this.languageID = languageID
    this.defaultLanguageCode = defaultLanguageCode
    this.languageFromSource = languageFromSource
    this.defineInitialData()
  }

  defineInitialData () {
    /**
     * Pointer event has two elements: `start` (where a pointer was down) and
     * `end` (where a pointer was up). If pointer was moved, they will be different.
     * It makes more sense to use `end` for our purposes.
     *
     * @type {HTMLElement}
     */

    this.targetRect = {
      top: this.event.end.client.y,
      left: this.event.end.client.x
    }
    this.location = this.target.ownerDocument.location.href
    this.browserSelector = false

    /**
     * We need to create a selection for a click or touch position
     * doSpaceSeparatedWordSelection() uses just a start point of a selection as a base to find word boundaries.
     * So we don't care where an end selector positions would be and set it just to the same position as a start.
     * Selection methods (do...WordSelection) will determine exact word boundaries and will adjust the selection.
     */
    if (this.target.dataset.alpheiosWordNode) {
      //  let the browser select this word
      this.browserSelector = true
    } else {
      HTMLSelector.createSelectionFromPoint(this.event, this.languageID, this.targetRect.left, this.targetRect.top)
    }
    this.setDataAttributes()
    this.wordSeparator = new Map()
    // A word separator function, when called, will adjust a selection so it will match exact word boundaries
    // TODO: Word separator functions are called in `createTextSelector`. Thus, selection will not be
    // adjusted before `createTextSelector` is called. Should we do it earlier, in a constructor?

    this.wordSeparator.set(Constants.LANG_UNIT_WORD, this.doSpaceSeparatedWordSelection.bind(this))
    this.wordSeparator.set(Constants.LANG_UNIT_CHAR, this.doCharacterBasedWordSelection.bind(this))
  }

  static getSelector (event, defaultLanguageCode) {
    return new HTMLSelector(event, defaultLanguageCode).createTextSelector()
  }

  createTextSelector () {
    const langCode = this.languageFromSource || this.defaultLanguageCode
    let textSelector = new TextSelector(this.languageID, langCode)
    textSelector.model = LanguageModelFactory.getLanguageModel(this.languageID)
    textSelector.location = this.location
    textSelector.data = this.data
    // TODO We will want the data-alpheios-word-node functionality to work eventually with chinese
    if (this.browserSelector && this.languageID !== Constants.LANG_CHINESE) {
      textSelector = this.doFromTargetWordSelection(textSelector)
    }
    if (textSelector.isEmpty()) {
      if (this.wordSeparator.has(textSelector.model.baseUnit)) {
        textSelector = this.wordSeparator.get(textSelector.model.baseUnit)(textSelector)
      } else {
        Logger.getInstance().warn(`Alpheios word selection error - no word separator function found for "${textSelector.model.baseUnit.toString()}" base unit`)
      }
    }
    return textSelector
  }

  /**
   * Creates a selection from start and end coordinates. If no end coordinates given,
   * they will be set to the same position as start point and an empty selection will be created.
   *
   * @param {Event} event - An event object.
   * @param {symbol} languageID - An assumed language ID of a selection.
   * @param {number} startX - Start position of a selection on an x-axis.
   * @param {number} startY - Start position of a selection on an y-axis.
   * @param {number} endX - End position of a selection on an x-axis.
   * @param {number} endY - End position of a selection on an y-axis.
   * @returns {Range | null} A range if one is successfully created or null in case of failure.
   */
  static createSelectionFromPoint (event, languageID, startX, startY, endX = startX, endY = startY) {
    const doc = window.document
    let start
    let end
    let range = null
    /*
      We should use `caretPositionFromPoint` as an ongoing standard but it is not supported in all browsers.
      As a fallback, we'll use `caretRangeFromPoint`.
    */
    if (typeof doc.caretPositionFromPoint === 'function') {
      if (event.evtType === 'mousemove') {
        // We need to imititate a small selection for this event type - 10px left and 10px right from the MouseMove registered point
        start = doc.caretPositionFromPoint(startX - event.mouseMoveAccuracy, startY)
        end = doc.caretPositionFromPoint(endX + event.mouseMoveAccuracy, endY)
      } else {
        start = doc.caretPositionFromPoint(startX, startY)
        end = doc.caretPositionFromPoint(endX, endY)
      }

      range = doc.createRange()
      range.setStart(start.offsetNode, start.offset)
      range.setEnd(end.offsetNode, end.offset)
    } else if (typeof doc.caretRangeFromPoint === 'function') {
      if (event.evtType === 'mousemove') {
        // We need to imititate a small selection for this event type - 10px left and 10px right from the MouseMove registered point
        start = doc.caretRangeFromPoint(startX - event.mouseMoveAccuracy, startY)
        end = doc.caretRangeFromPoint(endX + event.mouseMoveAccuracy, endY)
      } else {
        start = doc.caretRangeFromPoint(startX, startY)
        end = doc.caretRangeFromPoint(endX, endY)
      }

      range = doc.createRange()

      if (start && end) {
        range.setStart(start.startContainer, start.startOffset)
        range.setEnd(end.startContainer, end.startOffset)
      } else {
        return null
      }
    }

    if (range && typeof window.getSelection === 'function') {
      let sel = window.getSelection() // eslint-disable-line prefer-const
      if (!(languageID === Constants.LANG_CHINESE && range.startOffset === range.endOffset)) {
        /*
        If startOffset is the same as endOffset it usually means that nothing is selected.
        However, there might be a few special cases.

        For Chinese, it is often typical that a startOffset is the same as an endOffset. In such cases a selection
        made by the browser is more precise that what we can achieve. So we will not force
        our selection upon the browser's.

        On Google Docs, startOffset and endOffset are the same too. In that case we, however,
        would want to use our selection: the one made by Google docs will in most cases be incorrect.

        So, in the current implementation, we will not use our selection if language is Chinese. This will
        lead to selection with double click not working for Chinese texts on Google Docs, but we would
        prefer to use mouse move selection for cases like that anyway.
        */
        sel.removeAllRanges()
        sel.addRange(range)
      }
    } else if (typeof doc.body.createTextRange === 'function') {
      range = doc.body.createTextRange()
      range.moveToPoint(startX, startY)
      let endRange = range.duplicate() // eslint-disable-line prefer-const
      endRange.moveToPoint(endX, endY)
      range.setEndPoint('EndToEnd', endRange)
      range.select()
    } else {
      Logger.getInstance().warn('Browser does not support the Alpheios word selection code. Support for getSelection() or createTextRange() is required.')
    }
    return range
  }

  /**
   * Gather any alpheios specific data attributes from the target element
   */
  setDataAttributes () {
    const alignSrcElem = this.target.ownerDocument.querySelector('[data-alpheios_align_src]')
    const alignRef = this.target.dataset.alpheios_align_ref
    this.data = {}
    if (alignSrcElem && alignRef) {
      this.data.translation = {
        src: alignSrcElem.dataset.alpheios_align_src,
        ref: alignRef
      }
    }
  }

  /**
   * Returns a language code of a text piece defined by target. Scans for a `lang` attribute of a selection target
   * or, if not found, all parents of a target.
   *
   * @returns {string | undefined} Language code of a text piece or undefined if language cannot be determined.
   */
  getLanguageCodeFromSource () {
    let languageCode = typeof this.target.getAttribute === 'function' ? this.target.getAttribute('lang') || this.target.getAttribute('xml:lang') : null
    if (!languageCode && (typeof this.target.getAttribute === 'function')) {
      // If no attribute of target element found, check its ancestors
      const closestLangElement = this.target.closest('[lang]') || this.target.closest('[xml\\:lang]')
      if (closestLangElement) {
        languageCode = closestLangElement.getAttribute('lang') || closestLangElement.getAttribute('xml:lang')
      }
    }

    return languageCode
  }

  static getSelection (target) {
    return target.ownerDocument.getSelection()
  }

  /**
   * Helper method for {@link #findSelection} which identifies the selected target
   * word as being the contents of the actual browser selection target
   * Used to allow a content provider to specify a node with child elements
   * used to apply emphasis to specific characters as a complete word. Unless
   * 'exact' is specified, punctuation will be removed from the text.
   * e.g.<span alpheios-word-node="default"><b>f</b>ero</span> (word is evaluated as fero)
   * e.g.<span alpheios-word-node="default">f{ero}</span> (word is evaluated as fero)
   * e.g.<span alpheios-word-node="exact">f{ero}</span> (word is evaluated as f{ero})
   *
   * @see #findSelection
   * @param textSelector
   */
  doFromTargetWordSelection (textSelector) {
    textSelector.text = this.target.textContent
    if (!this.target.dataset.alpheiosWordNode === 'exact') {
      textSelector.text = textSelector.text.replace(new RegExp('[' + textSelector.model.getPunctuation() + ']', 'g'), '')
    }
    // for now, let's just create an empty context in this scenario
    // until we fully support w3c annotation selectors
    textSelector.createTextQuoteSelector('', '')
    return textSelector
  }

  /**
   * Helper method for {@link #findSelection} which identifies target word and
   * surrounding context for languages whose words are space-separated.
   * It does not use an end point of a selection. It takes a beginning of a selection
   * and obtains a word where a start selection position is.
   *
   * @see #findSelection
   * @private
   * @param {TextSelector} textSelector - An original text selector object.
   */
  doSpaceSeparatedWordSelection (textSelector) {
    const selection = HTMLSelector.getSelection(this.target)

    let anchor = selection.anchorNode // A node where is a beginning of a selection
    if (!anchor) {
      return
    }
    let focus = selection.focusNode // A node where the end of a selection
    let anchorText = anchor.data // A text of an anchor node?
    /*
    We'll store `selection.anchorNode.data` for later use because if selection will be recreated
    in case of an invalid anchor a data property of the anchorNode in a selection will be undefined.
    We will use this stored value instead of it.
     */
    const anchorNodeData = selection.anchorNode.data
    let ro // An offset from the beginning of a selection
    let focusEmpty = false // True if selection spans over two nodes and a focus node is empty
    let invalidAnchor = false

    if (!anchor.isEqualNode(focus) && focus.data && focus.data.match(/^\s*$/)) {
      focusEmpty = true
      ro = selection.anchorOffset
    } else if (focus.data && focus.data.length < 1 &&
      (!anchorText.match(this._escapeRegExp(focus.data)) || focus.data.match(/^\s*$/))) {
      /*
      The purpose of this conditional branch is:
      firefox's implementation of getSelection is buggy and can result
      in incomplete data - sometimes the anchor text doesn't contain the focus data
      and sometimes the focus data and anchor text is just whitespaces
      in these cases we just use the target textContent

      The afterthought:
      Sometimes an empty selection can be a valid case. For example, if user selected
      an element that contain space only, such as a gap between words. In that case
      we probably should not "correct" the selection but leave it as is.
      That's what the `focus.data.length < 1` check does.
      Considering the length check,
      `!anchorText.match(this._escapeRegExp(focus.data)) || focus.data.match(/^\s*$/))` condition
      would probably never be triggered. It is left there for future reference mostly.

      TODO: A better way to handle selection would definitely benefit the code quality, but it can be tricky,
            considering the multitude of platforms, browsers, and their versions that we support.
       */
      anchorText = this.target.textContent
      ro = 0
      invalidAnchor = true
      anchor = this.target
      focus = this.target
    } else {
      ro = selection.anchorOffset
    }

    if (!anchorText) {
      return
    }
    // clean string:
    //   convert punctuation to spaces
    anchorText = anchorText.replace(new RegExp('[' + textSelector.model.getPunctuation() + ']', 'g'), ' ')
    // Determine word boundaries
    let wordStart = anchorText.lastIndexOf(' ', ro) + 1 // Try to find a space char before a beginning of a selection
    let wordEnd = anchorText.indexOf(' ', wordStart + 1) // Try to find a space char after a beginning of a selection

    if (wordStart === -1) {
      // if we don't have any spaces in the text and the browser identified
      // an invalid anchor node (i.e. one which doesn't contain the focus node text)
      // then just assume the focusNode is a single word and the click was inside it, so
      // set the wordStart to the beginning
      // TODO: Should we set it to the beginning at the node even if `ro` is not zero?
      wordStart = invalidAnchor ? 0 : ro
    }

    if (wordEnd === -1) {
      wordEnd = anchorText.length
    }

    // if empty, nothing to do
    if (wordStart === wordEnd) {
      return textSelector
    }

    // extract word
    const word = anchorText.substring(wordStart, wordEnd).trim()
    /* Identify the words preceeding and following the focus word
    * TODO - query the type of node in the selection to see if we are
    * dealing with something other than text nodes
    * We also need to be able to pull surrounding context for text
    * nodes that are broken up by formatting tags (<br/> etc))
    */

    let contextStr = null
    let contextPos = 0

    const contextForward = textSelector.model.contextForward
    const contextBackward = textSelector.model.contextBackward

    if (contextForward || contextBackward) {
      const startstr = anchorText.substring(0, wordEnd)
      const endstr = anchorText.substring(wordEnd + 1, anchorText.length)
      let preWordlist = startstr.split(/\s+/)
      let postWordlist = endstr.split(/\s+/)

      // limit to the requested # of context words
      // prior to the selected word
      // the select/ded word is the last item in the
      // preWordlist array
      if (preWordlist.length > textSelector.model.contextBackward + 1) {
        preWordlist = preWordlist.slice(preWordlist.length - (textSelector.model.contextBackward + 1))
      }
      // limit to the requested # of context words
      // following to the selected word
      if (postWordlist.length > textSelector.model.contextForward) {
        postWordlist = postWordlist.slice(0, textSelector.model.contextForward)
      }

      /* TODO: should we put the punctuation back in to the
      * surrounding context? Might be necessary for syntax parsing.
      */
      contextStr =
        preWordlist.join(' ') + ' ' + postWordlist.join(' ')
      contextPos = preWordlist.length - 1
    }

    textSelector.text = word
    textSelector.start = wordStart
    textSelector.end = wordEnd
    textSelector.context = contextStr
    textSelector.position = contextPos

    if (!textSelector.isEmpty()) {
      // Reset a selection
      if (focusEmpty) {
        /*
        If focus node is empty we can exclude it from a selection.
        As a result, selection will span over an anchor node only.
         */
        selection.setBaseAndExtent(anchor, wordStart, anchor, wordEnd)
      } else if (invalidAnchor) {
        selection.removeAllRanges()
        let range = document.createRange() // eslint-disable-line prefer-const
        range.selectNode(anchor)
        selection.addRange(range)
      } else if (focus.data) {
        selection.setBaseAndExtent(anchor, wordStart, focus, wordEnd)
      }
    }

    const prefix = anchorNodeData.substr(0, textSelector.start).trim().replace(/\n/g, '')
    const suffix = anchorNodeData.substr(textSelector.end).trim().replace(/\n/g, '')
    textSelector.createTextQuoteSelector(prefix, suffix)
    return textSelector
  }

  /**
   * Helper method for {@link #findSelection} which identifies
   * target word and surrounding context for languages
   * whose words are character based
   *
   * @see #findSelection
   * @private
   * @param {TextSelector} textSelector - An original text selector object.
   */
  doCharacterBasedWordSelection (textSelector) {
    const selection = HTMLSelector.getSelection(this.target)
    const rStart = selection.anchorOffset
    let rEnd = selection.focusOffset

    if (rStart === rEnd || rEnd === 0) {
      return textSelector
    }

    const anchor = selection.anchorNode
    const anchorText = anchor.data

    let word = anchorText.substring(rStart, rEnd).trim()
    word = word.replace(new RegExp('[' + textSelector.model.getPunctuation() + ']', 'g'), ' ')

    if (word.length > 2) {
      rEnd = rEnd - (word.length - 2)
      word = word.substr(0, 2)
    }
    let contextStr = null
    let contextPos = 0
    let checkContext

    const contextForward = textSelector.model.contextForward
    const contextBackward = textSelector.model.contextBackward

    if (contextForward || contextBackward) {
      let prevWord = anchorText.substr(0, rStart - 1)
      prevWord = prevWord.replace(new RegExp('[' + textSelector.model.getPunctuation() + ']', 'g'), ' ')
      prevWord = prevWord.substr(prevWord.length - contextBackward, contextBackward)

      let postWord = anchorText.substr(rEnd)
      postWord = postWord.replace(new RegExp('[' + textSelector.model.getPunctuation() + ']', 'g'), ' ')
      postWord = postWord.substr(0, contextForward)

      contextStr = prevWord + ' ' + postWord
      contextPos = prevWord.length - 1

      checkContext = this.defineCheckContextFromContext(postWord)
    }

    textSelector.text = word.trim()
    textSelector.start = rStart
    textSelector.end = rEnd
    textSelector.context = contextStr
    textSelector.position = contextPos

    textSelector.checkContextForward = checkContext

    const prefix = selection.anchorNode.data.substr(0, textSelector.start).trim().replace(/\n/g, '')
    const suffix = selection.anchorNode.data.substr(textSelector.end).trim().replace(/\n/g, '')

    textSelector.createTextQuoteSelector(prefix, suffix)
    return textSelector
  }

  defineCheckContextFromContext (contextStr) {
    return contextStr.indexOf(' ') === -1 ? contextStr : contextStr.substr(0, contextStr.indexOf(' '))
  }

  _escapeRegExp (string) {
    // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }

  /**
   * @getDumpHTMLSelector - it creates an object with the minimum data for imitating HTMLSelector
   */

  static getDumpHTMLSelector () {
    return {
      targetRect: {
        top: 0,
        left: 0
      }
    }
  }

  selectTextRange (obj, start, stop) {
    let startNode = obj.firstChild // eslint-disable-line prefer-const
    const endNode = obj.firstChild

    startNode.nodeValue = startNode.nodeValue.trim()

    const range = document.createRange()
    range.setStart(startNode, start)
    range.setEnd(endNode, stop + 1)

    let sel = window.getSelection() // eslint-disable-line prefer-const
    sel.removeAllRanges()
    sel.addRange(range)
  }

  defineLanguage (textSelector, prioritizeDefaultLanguage = false) {
    const text = textSelector.text
    let languages

    if (prioritizeDefaultLanguage) {
      languages = [this.defaultLanguageCode, this.languageFromSource, LanguageDetect.detect(text)]
    } else {
      languages = [this.languageFromSource, LanguageDetect.detect(text), this.defaultLanguageCode]
    }

    let finalLangCode = languages.find(lang => lang)

    let langId = LanguageModelFactory.getLanguageIdFromCode(finalLangCode)

    if (langId === Constants.LANG_UNDEFINED) {
      langId = LanguageModelFactory.getLanguageIdFromCode(this.defaultLanguageCode)
      finalLangCode = this.defaultLanguageCode
    } else {
      const langModel = LanguageModelFactory.getLanguageModel(langId)
      finalLangCode = langModel.languageCode
    }

    this.languageID = langId
    textSelector.updateLanguage(this.languageID, finalLangCode)
  }
}
