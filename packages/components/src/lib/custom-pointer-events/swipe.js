import PointerEvt from './pointer-evt.js'
import HTMLConsole from '../log/html-console.js'

export default class Swipe extends PointerEvt {
  constructor (element, evtHandler, mvmntThreshold = 100, durationThreshold = 600) {
    super()
    this.element = element
    this.evtHandler = evtHandler

    this.mvmntThreshold = mvmntThreshold
    this.durationThreshold = durationThreshold
    this.direction = Swipe.directions.NONE
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeSwipeCpe') // eslint-disable-line no-prototype-builtins
  }

  static get directions () {
    return {
      UP: 'up',
      RIGHT: 'right',
      DOWN: 'down',
      LEFT: 'left',
      NONE: 'none'
    }
  }

  isDirectedUp () {
    return this.direction === Swipe.directions.UP
  }

  isDirectedRight () {
    return this.direction === Swipe.directions.RIGHT
  }

  isDirectedDown () {
    return this.direction === Swipe.directions.DOWN
  }

  isDirectedLeft () {
    return this.direction === Swipe.directions.LEFT
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    let completed = false
    if (this.mvmntXAbs > this.mvmntThreshold || this.mvmntYAbs > this.mvmntThreshold) {
      // This is a swipe
      completed = true
      if (this.mvmntX > this.mvmntThreshold && this.mvmntYAbs < this.mvmntThreshold) {
        this.direction = Swipe.directions.RIGHT
      } else if (-this.mvmntX > this.mvmntThreshold && this.mvmntYAbs < this.mvmntThreshold) {
        this.direction = Swipe.directions.LEFT
      } else if (this.mvmntY > this.mvmntThreshold && this.mvmntXAbs < this.mvmntThreshold) {
        this.direction = Swipe.directions.DOWN
      } else if (-this.mvmntY > this.mvmntThreshold && this.mvmntXAbs < this.mvmntThreshold) {
        this.direction = Swipe.directions.UP
      }
    }

    if (!(this.start.excluded || this.end.excluded)) {
      HTMLConsole.instance.log(`Swipe (${completed ? 'completed' : 'not completed'}), [x,y]: [${this.end.client.x}, ${this.end.client.y}], movement: ${this.mvmntDist},` +
        `direction: ${this.direction}, duration: ${this.duration}`)
    }

    return completed && !this.start.excluded && !this.end.excluded
  }

  static listen (selector, evtHandler, mvmntThreshold, durationThreshold) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      this.addUpDownListeners(element, new this(element, evtHandler, mvmntThreshold, durationThreshold))
    }
  }
}
