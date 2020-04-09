import PointerEvt from '@/lib/custom-pointer-events/pointer-evt.js'
import Platform from '@/lib/utility/platform.js'

let mouseMoveTimeout = null

export default class MouseMove extends PointerEvt {
  constructor (element, evtHandler, eventParams = {}) {
    super()
    this.evtType = 'mousemove'
    this.element = element
    this.evtHandler = evtHandler // A client's event handler
    this.boundListener = this.eventListener.bind(this) // A bound event listener of MouseDblClick
    this.mouseMoveDelay = parseInt(eventParams.mouseMoveDelay)
    this.mouseMoveAccuracy = parseInt(eventParams.mouseMoveAccuracy)

    this.limitedById = Platform.getIsGoogleDocs() && eventParams.enableMouseMoveLimitedByIdCheck ? eventParams.mouseMoveLimitedById : null
  }

  eventListener (domEvt) {
    domEvt.stopPropagation()
    if (mouseMoveTimeout) {
      clearTimeout(mouseMoveTimeout)
    }

    mouseMoveTimeout = setTimeout(() => {
      const valid = this
        .setStartPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
        .setEndPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
      if (valid) { this.evtHandler(this, domEvt) }
    }, this.mouseMoveDelay)
  }

  set () {
    this.element.addEventListener(this.evtType, this.boundListener, { passive: true })
  }

  remove () {
    this.element.removeEventListener(this.evtType, this.boundListener, { passive: true })
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    return !(this.start.excluded || this.end.excluded)
  }

  static listen (selector, evtHandler) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      let listener = new this(element, evtHandler) // eslint-disable-line prefer-const
      listener.set()
    }
  }
}
