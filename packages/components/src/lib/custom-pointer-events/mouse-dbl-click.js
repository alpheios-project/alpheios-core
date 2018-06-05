import PointerEvt from './pointer-evt.js'

export default class MouseDblClick extends PointerEvt {
  constructor (element, evtHandler) {
    super()
    this.element = element
    this.evtHandler = evtHandler
  }

  static get excludeCpeDataAttr () {
    return 'alphExcludeDblClickCpe'
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    this.done = true
    return this
  }

  static listen (selector, evtHandler) {
    let elements = document.querySelectorAll(selector)
    for (const element of elements) {
      this.addDblClickListener(element, new this(element, evtHandler))
    }
  }
}
