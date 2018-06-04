import PointerEvt from './pointer-evt.js'

export default class LongTap extends PointerEvt {
  constructor (element, evtHandler, mvmntThreshold = 5, durationThreshold = 125) {
    super()
    this.element = element
    this.evtHandler = evtHandler

    this.mvmntThreshold = mvmntThreshold
    this.durationThreshold = durationThreshold
  }

  static get excludeCpeDataAttr () {
    return 'alphExcludeLongTapCpe'
  }

  setEndPoint (clientX, clientY, path) {
    super.setEndPoint(clientX, clientY, path)
    this.done = this.mvmntDist <= this.mvmntThreshold && this.duration >= this.durationThreshold
  }

  static listen (selector, evtHandler, mvmntThreshold, durationThreshold) {
    let elements = document.querySelectorAll(selector)
    for (const element of elements) {
      this.addUpDownListeners(element, new this(element, evtHandler, mvmntThreshold, durationThreshold))
    }
  }
}
