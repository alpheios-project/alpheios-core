import PointerEvt from './pointer-evt.js'
import HTMLConsole from '../log/html-console.js'

export default class LongTap extends PointerEvt {
  constructor (element, evtHandler, mvmntThreshold = 5, durationThreshold = 125) {
    super()
    this.element = element
    this.evtHandler = evtHandler

    this.mvmntThreshold = mvmntThreshold
    this.durationThreshold = durationThreshold
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeLongTapCpe')
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

  static listen (selector, evtHandler, mvmntThreshold, durationThreshold) {
    let elements = document.querySelectorAll(selector)
    for (const element of elements) {
      this.addUpDownListeners(element, new this(element, evtHandler, mvmntThreshold, durationThreshold))
    }
  }
}
