import PointerEvt from '@/lib/custom-pointer-events/pointer-evt'
import jump from 'jump.js'

/**
 * This class can be used to add aligned translation functionality to a page
 * Example Usage:
 *    let alignment = new AlignmentSelector(window.document, options)
 *    alignment.activiate()
 *    options can contain the following settings
 *      highlightClass: css class to be applied to highlight the aligned elements upon focus (default is '.alpheios-alignment__highlight')
 *      disableClass: css class which is applied to a parent element of the aligned text to disable the trigger event (default is '.alpheios-alignment__disabled')
 *      focusEvent: Event which triggers focus on an aligned text (default is 'mouseenter')
 *      blurEvent: Event which triggers removal of focus on an aligned text  is 'mouseleave')
 *    Aligned text elements are required to have data-alpheios_align_ref attributes which contain the selector for the corresponding aligned text in the page
 */
export default class AlignmentSelector {
  /**
   * @constructor
   * @param {Document} doc the document containing a translation alignment
   * @param {Object} options initialization options
   */
  constructor (doc, options = {}, triggerCallback = () => { return true }) {
    this.doc = doc
    const DEFAULTS = {
      highlightClass: 'alpheios-alignment__highlight',
      disableClass: 'alpheios-alignment__disabled',
      fixHighlightClass: 'alpheios-alignment__highlight_fix',
      focusEvent: 'mouseenter',
      blurEvent: 'mouseleave',
      clickEventConstant: true,

      scrollDuration: 1500,
      scrollDelay: 1500

    }
    this.settings = Object.assign({}, DEFAULTS, options)
    this.jumpTimeout = null
  }

  /**
   * Activate the Alignment event handling
   */
  activate () {
    const alignments = this.doc.querySelectorAll('[data-alpheios_align_ref]')
    for (let a of alignments) { // eslint-disable-line prefer-const
      a.addEventListener(this.settings.focusEvent, event => { this.focus(event) })
      a.addEventListener(this.settings.blurEvent, event => { this.blur(event) })

      if (this.settings.clickEventConstant) {
        a.addEventListener('click', event => { this.click(event) })
      }
    }
  }

  focus (event) {
    const firstAligned = this.highlightWords(event.target, this.settings.highlightClass)

    if (firstAligned && !this.isElementInViewport(firstAligned)) {
      this.scrollToElement(firstAligned)
    }
  }

  blur (event) {
    this.removeHighlightWords(event.target, this.settings.highlightClass)
  }

  click (event) {
    if (this.isHighlightedFixed(event.target)) {
      clearTimeout(this.jumpTimeout)
      this.removeHighlightWords(event.target, this.settings.fixHighlightClass, false)
    } else {
      this.highlightWords(event.target, this.settings.fixHighlightClass, true)
    }
  }

  scrollToElement (elem) {
    clearTimeout(this.jumpTimeout)

    this.jumpTimeout = setTimeout(() => {
      clearTimeout(this.jumpTimeout)

      jump(elem, {
        duration: this.settings.scrollDuration
      })
    }, this.settings.scrollDelay)
  }

  isElementInViewport (elem) {
    const bounding = elem.getBoundingClientRect()
    return (
      bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || this.doc.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || this.doc.documentElement.clientWidth)
    )
  }

  isHighlightedFixed (elem) {
    return elem.dataset.highlight_fixed === 'true'
  }

  highlightWords (elem, highlightClass, setFixedValue = null) {
    const alignedWithElem = this.getAlignedListByRef(elem, true)

    if (alignedWithElem.length > 0) {
      this.addClass(elem, highlightClass)

      if (setFixedValue !== null) { this.setFixedAttribute(elem, true) }

      this.addClass(alignedWithElem, highlightClass)

      if (setFixedValue !== null) { this.setFixedAttribute(alignedWithElem, true) }

      const reversedAlignedObj = this.getAllAlignedObjects(alignedWithElem)
      this.addClass(reversedAlignedObj, highlightClass)

      if (setFixedValue !== null) { this.setFixedAttribute(reversedAlignedObj, true) }
    }

    return alignedWithElem.length > 0 ? alignedWithElem[0] : null
  }

  removeHighlightWords (elem, highlightClass, setFixedValue = null) {
    const alignedWithElem = this.getAlignedListByRef(elem, true)

    if (alignedWithElem.length > 0) {
      this.removeClass(elem, highlightClass)
      if (setFixedValue !== null) { this.setFixedAttribute(elem, false) }

      this.removeClass(alignedWithElem, highlightClass)
      if (setFixedValue !== null) { this.setFixedAttribute(alignedWithElem, false) }

      const reversedAlignedObj = this.getAllAlignedObjects(alignedWithElem)
      this.removeClass(reversedAlignedObj, highlightClass)
      if (setFixedValue !== null) { this.setFixedAttribute(reversedAlignedObj, false) }
    }

    return alignedWithElem.length > 0 ? alignedWithElem[0] : null
  }

  getAlignedListByRef (target, checkDisabled = false) {
    const ref = target.dataset.alpheios_align_ref
    let res = [] // eslint-disable-line prefer-const
    if (ref) {
      for (const r of ref.split(/,/)) {
        let aligned = this.doc.querySelectorAll(r)

        if (checkDisabled) {
          aligned = Array.from(aligned).filter(el => !this.isDisabled(el))
        }
        aligned.forEach(el => { res.push(el) })
      }
    }

    return res
  }

  getAllAlignedObjects (targetArr) {
    let res = [] // eslint-disable-line prefer-const
    for (const a of targetArr) {
      const aligned = this.getAlignedListByRef(a)
      aligned.forEach(el => { res.push(el) })
    }
    return res
  }

  isDisabled (elem) {
    const path = PointerEvt.buildPath(elem)
    for (const p of path) {
      if (p.classList.contains(this.settings.disableClass)) {
        return true
      }
    }
    return false
  }

  setFixedAttribute (elem, value) {
    if (elem.constructor.name === 'NodeList' || Array.isArray(elem)) {
      for (let el of Array.from(elem)) { // eslint-disable-line prefer-const
        el.dataset.highlight_fixed = value
      }
    } else {
      elem.dataset.highlight_fixed = value
    }
  }

  addClass (elem, className) {
    if (elem.constructor.name === 'NodeList' || Array.isArray(elem)) {
      for (let el of Array.from(elem)) { // eslint-disable-line prefer-const
        if (!el.classList.contains(className)) {
          el.classList.add(className)
        }
      }
    } else {
      if (!elem.classList.contains(className)) {
        elem.classList.add(className)
      }
    }
  }

  removeClass (elem, className) {
    if (elem.constructor.name === 'NodeList' || Array.isArray(elem)) {
      for (let el of Array.from(elem)) { // eslint-disable-line prefer-const
        if (el.classList.contains(className)) {
          el.classList.remove(className)
        }
      }
    } else {
      if (elem.classList.contains(className)) {
        elem.classList.remove(className)
      }
    }
  }
}
