import PointerEvt from './pointer-evt.js'
import HTMLConsole from '../log/html-console.js'

/**
 * This is a Generic Event Class that can be used to
 * to wrap events for which we haven't explicitly defined wrappers
 */
export default class GenericEvt extends PointerEvt {
  constructor (element, evtHandler, evtName) {
    super()
    this.element = element
    this.evtHandler = evtHandler
    this.evtName = evtName
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeDblClickCpe')
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    if (!(this.start.excluded || this.end.excluded)) {
      HTMLConsole.instance.log(`${this.evtName} (completed), [x,y]: [${this.end.client.x}, ${this.end.client.y}], movement: ${this.mvmntDist},` +
        `duration: ${this.duration}`)
    }
    return !(this.start.excluded || this.end.excluded)
  }

  static listen (selector, evtHandler, evtName) {
    let elements = document.querySelectorAll(selector)
    for (const element of elements) {
      this.addGenericListener(element, new this(element, evtHandler, evtName), evtName)
    }
  }
}
