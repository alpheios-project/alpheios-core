import PointerEvt from './pointer-evt.js'
import HTMLConsole from '../log/html-console.js'

export default class MouseDblClick extends PointerEvt {
  /**
   * Creates an instance of a class.
   * @param {Node} element - An HTML Node element
   * @param {Function} evtHandler - A client's event handler
   */
  constructor (element, evtHandler) {
    super()
    this.evtType = 'dblclick'
    this.element = element
    this.evtHandler = evtHandler // A client's event handler
    this.boundListener = this.eventListener.bind(this) // A bound event listener of MouseDblClick
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeDblClickCpe') // eslint-disable-line no-prototype-builtins
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    if (!(this.start.excluded || this.end.excluded)) {
      HTMLConsole.instance.log(`Mouse double click (completed), [x,y]: [${this.end.client.x}, ${this.end.client.y}], movement: ${this.mvmntDist},` +
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
    if (valid) { this.evtHandler(this, domEvt) } // Call a client's event handler
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
   */
  static listen (selector, evtHandler) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      let listener = new this(element, evtHandler) // eslint-disable-line prefer-const
      listener.set()
    }
  }
}
