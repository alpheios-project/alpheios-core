import PointerEvt from './pointer-evt.js'
import HTMLConsole from '../log/html-console.js'

/**
 * This is a Generic Event Class that can be used to
 * to wrap events for which we haven't explicitly defined wrappers.
 * @param {Node} element - An HTML Node element
 * @param {Function} evtHandler - A client's event handler
 * @param {string} evtType - A type of an event, such as 'click', 'dblclick', etc.
 */
export default class GenericEvt extends PointerEvt {
  constructor (element, evtHandler, evtType) {
    super()
    this.element = element
    this.evtType = evtType
    this.evtHandler = evtHandler
    this.boundListener = this.eventListener.bind(this) // A bound event listener of GenericEvt
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeGenericEvtCpe') // eslint-disable-line no-prototype-builtins
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    if (!(this.start.excluded || this.end.excluded)) {
      HTMLConsole.instance.log(`${this.evtType} (completed), [x,y]: [${this.end.client.x}, ${this.end.client.y}], movement: ${this.mvmntDist},` +
        `duration: ${this.duration}`)
    }
    return !(this.start.excluded || this.end.excluded)
  }

  /**
   * A callback that is attached to a native HTML event listener.
   * It calls a client's event handler if an event is valid.
   * @param domEvt
   */
  eventListener (domEvt) {
    domEvt.stopPropagation()
    const valid = this
      .setStartPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
      .setEndPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
    if (valid) { this.evtHandler(this, domEvt) }
  }

  /**
   * Activates a listener
   */
  set () {
    this.element.addEventListener(this.evtType, this.boundListener, { passive: true })
  }

  /**
   * Deactivates a listener
   */
  remove () {
    this.element.removeEventListener(this.evtType, this.boundListener, { passive: true })
  }

  /**
   * This static method that allows to set a listener in one function call
   * TODO: It is here for compatibility with older code. Remove if not used anywhere anymore.
   * @param {string} selector
   * @param {Function} evtHandler
   * @param {string} evtType - A type of an event, such as 'click', 'dblclick', etc.
   */
  static listen (selector, evtHandler, evtType) {
    const elements = document.querySelectorAll(selector)

    for (const element of elements) {
      let listener = new this(element, evtHandler, evtType) // eslint-disable-line prefer-const
      listener.set()
    }
  }
}
