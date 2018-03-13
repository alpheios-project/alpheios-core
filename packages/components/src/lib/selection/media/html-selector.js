import 'element-closest' // To polyfill Element.closest() if required
import {Constants, LanguageModelFactory} from 'alpheios-data-models'
import TextSelector from '../text-selector'
import MediaSelector from './media-selector'

export default class HTMLSelector extends MediaSelector {
  constructor (event, defaultLanguageCode) {
    super(event)
    this.targetRect = {
      top: event.clientY,
      left: event.clientX
    }
    this.defaultLanguageCode = defaultLanguageCode

    this.wordSeparator = new Map()
    this.wordSeparator.set(Constants.LANG_UNIT_WORD, this.doSpaceSeparatedWordSelection.bind(this))
    this.wordSeparator.set(Constants.LANG_UNIT_CHAR, this.doCharacterBasedWordSelection.bind(this))
  }

  static getSelector (target, defaultLanguageCode) {
    return new HTMLSelector(target, defaultLanguageCode).createTextSelector()
  }

  createTextSelector () {
    let textSelector = new TextSelector()
    textSelector.languageCode = this.getLanguageCode(this.defaultLanguageCode)
    textSelector.languageID = LanguageModelFactory.getLanguageIdFromCode(textSelector.languageCode)
    textSelector.model = LanguageModelFactory.getLanguageModel(this.languageID)
    // textSelector.language = TextSelector.getLanguage(textSelector.languageCode)

    if (this.wordSeparator.has(textSelector.model.baseUnit)) {
      textSelector = this.wordSeparator.get(textSelector.model.baseUnit)(textSelector)
    } else {
      console.warn(`No word separator function found for a "${textSelector.model.baseUnit}" base unit`)
    }
    return textSelector
  }

  /**
   * Returns a language code of a text piece defined by target. Scans for a `lang` attribute of a selection target
   * or, if not found, all parents of a target.
   * @return {string | undefined} Language code of a text piece or undefined if language cannot be determined.
   */
  getLanguageCodeFromSource () {
    let languageCode = this.target.getAttribute('lang') || this.target.getAttribute('xml:lang')
    if (!languageCode) {
      // If no attribute of target element found, check its ancestors
      let closestLangElement = this.target.closest('[lang]') || this.target.closest('[xml\\:lang]')
      if (closestLangElement) {
        languageCode = closestLangElement.getAttribute('lang') || closestLangElement.getAttribute('xml:lang')
      }
    }
    return languageCode
  }

  static getSelection (target) {
    let selection = target.ownerDocument.getSelection()
    if (!selection) { console.warn(`Cannot get selection from a document`) }
    return selection
  }

  /**
   * Helper method for {@link #findSelection} which
   * identifies target word and surrounding
   * context for languages whose words are
   * space-separated
   * @see #findSelection
   * @private
   */
  doSpaceSeparatedWordSelection (textSelector) {
    let selection = HTMLSelector.getSelection(this.target)
    let anchor = selection.anchorNode
    let focus = selection.focusNode
    let anchorText = anchor.data
    let ro
    let invalidAnchor = false
    // firefox's implementation of getSelection is buggy and can result
    // in incomplete data - sometimes the anchor text doesn't contain the focus data
    // and sometimes the focus data and anchor text is just whitespaces
    // in these cases we just use the target textContent
    if ((focus.data && !anchorText.match(this._escapeRegExp(focus.data))) ||
      (focus.data && focus.data.match(/^\s*$/))) {
      anchorText = this.target.textContent
      ro = 0
      invalidAnchor = true
      anchor = this.target
      focus = this.target
    } else {
      ro = selection.anchorOffset
    }

    // clean string:
    //   convert punctuation to spaces
    anchorText = anchorText.replace(new RegExp('[' + textSelector.model.getPunctuation() + ']', 'g'), ' ')

    // find word
    let wordStart = anchorText.lastIndexOf(' ', ro)
    let wordEnd = anchorText.indexOf(' ', wordStart + 1)

    if (wordStart === -1) {
      // if we don't have any spaces in the text and the browser identified
      // an invalid anchor node (i.e. one which doesn't contain the focus node text)
      // then just assume the focusNode is a single word and the click was inside it, so
      // set the wordStart to the beginning
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
    let word = anchorText.substring(wordStart, wordEnd).trim()

    /* Identify the words preceeding and following the focus word
    * TODO - query the type of node in the selection to see if we are
    * dealing with something other than text nodes
    * We also need to be able to pull surrounding context for text
    * nodes that are broken up by formatting tags (<br/> etc))
    */

    let contextStr = null
    let contextPos = 0

    if (textSelector.model.contextForward || textSelector.model.contextBackward) {
      let startstr = anchorText.substring(0, wordEnd)
      let endstr = anchorText.substring(wordEnd + 1, anchorText.length)
      let preWordlist = startstr.split(/\s+/)
      let postWordlist = endstr.split(/\s+/)

      // limit to the requested # of context words
      // prior to the selected word
      // the selected word is the last item in the
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
      if (invalidAnchor) {
        selection.removeAllRanges()
        let range = document.createRange()
        range.selectNode(anchor)
        selection.addRange(range)
      } else if (focus.data) {
        selection.setBaseAndExtent(anchor, wordStart, focus, wordEnd)
      }
    }
    return textSelector
  }

  /**
   * Helper method for {@link #findSelection} which identifies
   * target word and surrounding context for languages
   * whose words are character based
   * @see #findSelection
   * @private
   */
  doCharacterBasedWordSelection (textSelection) {
    // TODO
  }

  _escapeRegExp (string) {
    // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }
}
