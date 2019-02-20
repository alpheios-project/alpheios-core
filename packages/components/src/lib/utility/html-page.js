/* global Node */
/**
 * An auxiliary utility class to provide HTML page, window, and document related functionality.
 */
export default class HTMLPage {
  /**
   * Checks whether the current window has an frames in it.
   * @returns {boolean}
   */
  static get hasFrames () {
    return (window.frames.length > 0)
  }

  /**
   * Checks whether the current window is a frame itself.
   * @returns {boolean}
   */
  static get isFrame () {
    return (window.self !== window.top)
  }

  /**
   * Checks whether the current window is at the top level of window hierarchy.
   * @returns {boolean}
   */
  static get isAtTop () {
    return (window.self === window.top)
  }

  /**
   * Checks wither the current browsing content (represented by window object)
   * is a valid target for a UI controller activation.
   * The browsing context could be either the topmost window within a browser tab
   * or a window within a frame that is part of the topmost or any other window.
   * @returns {boolean} - True if the browsing content is valid, false otherwise.
   */
  static get isValidTarget () {
    // Check if page URL is not excluded
    for (const url of HTMLPage.targetRequirements.excludedURLs) {
      if (window.document.URL.search(url) !== -1) {
        console.warn(`Not valid, URL is in the excluded list (${window.document.URL})`)
        return false
      }
    }

    if (!window.document.body) {
      console.warn(`Not valid, has no body (${window.document.URL})`)
      return false
    }

    // TODO: This will need to be changed when a mobile support be added
    if (window.document.body.clientWidth < HTMLPage.targetRequirements.minWidth) {
      console.warn(`Not valid, min width is too small (${window.document.URL})`)
      return false
    }

    if (window.document.body.clientHeight < HTMLPage.targetRequirements.minHeight) {
      if (this.isAtTop && !this.hasFrames) {
        // We could still allow no height for top level documents that have no frames
        return true
      }
      console.warn(`Not valid, min height is too small (${window.document.URL})`)
      return false
    }

    if (window.document.body.innerText.length < HTMLPage.targetRequirements.minCharCount) {
      console.warn(`Not valid, has too little characters (${window.document.URL})`)
      return false
    }

    return true
  }

  /**
   * Finds a maximal z-index value of elements on a page.
   * @return {Number}
   */
  static getZIndexMax (zIndexDefualt = 2000) {
    let zIndex = this.zIndexRecursion(document.querySelector('body'), Number.NEGATIVE_INFINITY)

    if (zIndex >= zIndexDefualt) {
      if (zIndex < Number.POSITIVE_INFINITY) { zIndex++ } // To be one level higher that the highest element on a page
    } else {
      zIndex = zIndexDefualt
    }

    return zIndex
  }

  /**
   * A recursive function that iterates over all elements on a page searching for a highest z-index.
   * @param {Node} element - A root page element to start scan with (usually `body`).
   * @param {Number} zIndexMax - A current highest z-index value found.
   * @return {Number} - A current highest z-index value.
   */
  static zIndexRecursion (element, zIndexMax) {
    if (element) {
      let zIndexValues = [
        window.getComputedStyle(element).getPropertyValue('z-index'), // If z-index defined in CSS rules
        element.style.getPropertyValue('z-index') // If z-index is defined in an inline style
      ]
      for (const zIndex of zIndexValues) {
        if (zIndex && zIndex !== 'auto') {
          // Value has some numerical z-index value
          zIndexMax = Math.max(zIndexMax, zIndex)
        }
      }
      for (let node of element.childNodes) {
        let nodeType = node.nodeType
        if (nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE || nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          zIndexMax = this.zIndexRecursion(node, zIndexMax)
        }
      }
    }
    return zIndexMax
  }

  /**
   * Detects an Alpheios embedded library by the presence of its tag.
   * @returns {boolean} True if the library is present, false otherwise.
   */
  static get isEmbedLibActive () {
    const attrValue = window.document.body.getAttribute('alpheios-embed-lib-status')
    return attrValue === 'active'
  }

  /**
   * Determines wither a compact version of the UI shall be enabled.
   * @return {boolean} - True if compact version shall be enabled, false otherwise.
   */
  static get enableCompactUI () {
    return window.matchMedia('(max-width: 720px)').matches
  }
}

HTMLPage.targetRequirements = {
  minWidth: 500, // A minimal width for a browsing context to qualify for showing a desktop UI
  minHeight: 400, // A minimal height for a browsing context to qualify for showing a desktop UI
  minCharCount: 1, // A minimal number of characters in a browsing context
  excludedURLs: [
    'about:blank',
    'grammars.alpheios.net',
    'alpheios.net/alpheios-treebanks'
  ]
}
