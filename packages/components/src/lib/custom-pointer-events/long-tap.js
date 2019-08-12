import PointerEvt from './pointer-evt.js'
import HTMLConsole from '../log/html-console.js'

export default class LongTap extends PointerEvt {
  constructor (element, evtHandler, mvmntThreshold = 5, durationThreshold = 125) {
    super()
    this.element = element
    this.evtStartType = this.constructor.pointerEventSupported ? 'pointerdown' : 'touchstart'
    this.evtEndType = this.constructor.pointerEventSupported ? 'pointerup' : 'touchend'
    this.evtHandler = evtHandler
    this.boundStartListener = this.constructor.pointerEventSupported
      ? this.constructor.pointerDownListener.bind(this, this)
      : this.constructor.touchStartListener.bind(this, this)
    this.boundEndListener = this.constructor.pointerEventSupported
      ? this.constructor.pointerUpListener.bind(this, this)
      : this.constructor.touchEndListener.bind(this, this)

    this.mvmntThreshold = mvmntThreshold
    this.durationThreshold = durationThreshold
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeLongTapCpe') // eslint-disable-line no-prototype-builtins
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    const completed = this.mvmntDist <= this.mvmntThreshold && this.duration >= this.durationThreshold

    if (!(this.start.excluded || this.end.excluded)) {
      HTMLConsole.instance.log(`Long tap (${completed ? 'completed' : 'not completed'}), [x,y]: [${this.end.client.x}, ${this.end.client.y}], movement: ${this.mvmntDist},` +
        `duration: ${this.duration}`)
    }
    return completed && !this.start.excluded && !this.end.excluded
  }

  /**
   * Activates a listener
   */
  set () {
    this.element.addEventListener(this.evtStartType, this.boundStartListener, { passive: true })
    this.element.addEventListener(this.evtEndType, this.boundEndListener, { passive: true })
  }

  /**
   * Deactivates a listener
   */
  remove () {
    this.element.removeEventListener(this.evtStartType, this.boundStartListener, { passive: true })
    this.element.removeEventListener(this.evtEndType, this.boundEndListener, { passive: true })
  }

  /**
   * This static method that allows to set a listener in one function call
   * TODO: It is here for compatibility with older code. Remove if not used anywhere anymore.
   */
  static listen (selector, evtHandler, mvmntThreshold, durationThreshold) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      let listener = new this(element, mvmntThreshold, durationThreshold) // eslint-disable-line prefer-const
      listener.set()
    }
  }
}
