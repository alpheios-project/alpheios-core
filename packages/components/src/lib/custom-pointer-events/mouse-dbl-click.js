import PointerEvt from './pointer-evt.js'
import HTMLConsole from '../log/html-console.js'

export default class MouseDblClick extends PointerEvt {
  constructor (element, evtHandler) {
    super()
    this.element = element
    this.evtHandler = evtHandler
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeDblClickCpe')
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    if (!(this.start.excluded || this.end.excluded)) {
      HTMLConsole.instance.log(`Mouse double click (completed), [x,y]: [${this.end.client.x}, ${this.end.client.y}], movement: ${this.mvmntDist},` +
        `duration: ${this.duration}`)
    }
    return !(this.start.excluded || this.end.excluded)
  }

  static listen (selector, evtHandler) {
    let elements = document.querySelectorAll(selector)
    for (const element of elements) {
      this.addDblClickListener(element, new this(element, evtHandler))
    }
  }
}
