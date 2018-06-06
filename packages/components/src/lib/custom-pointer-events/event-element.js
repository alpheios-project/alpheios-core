/**
 * Represents either a start or an end point within a pointer event
 */
export default class EventElement {
  constructor () {
    /**
     * Coordinates within a client area. Can be either integer or floating point number depending on the platform.
     * @type {{x: number, y: number}}
     */
    this.client = {
      x: null,
      y: null
    }

    /**
     * Event target. The same as path[0] but, because on iOS path[0] misses some properties
     * such as `ownerDocument`. In order to access those properties we have to store event target
     * in addition to `path`.
     * @type {HTMLElement}
     */
    this.target = null

    /**
     *  When event took place. An integer number of milliseconds since 1 January 1970 UTC.
     * @type {number}
     */
    this.time = 0

    /**
     * The first element in an array is the element where an event happened.
     * The second on is its parent and so on, up until the latest HTML element in hierarchy.
     * @type {HTMLElement[]}
     */
    this.path = []

    /**
     * Whether this element is excluded from processing an event with special data attribute of the current
     * element or the one of its parents.
     * @type {boolean}
     */
    this.excluded = false
  }
}
