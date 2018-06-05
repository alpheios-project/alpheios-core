export default class EventElement {
  constructor () {
    // Coordinates within application's client area.
    this.client = {
      x: null,
      y: null
    }

    // Event target
    this.target = null // TODO: is it the same as `this.path[0]`? Probably not as `this.path[0]` does not have an `ownerDocument` prop on iOS

    // When event happened. Number of milliseconds since 1 January 1970 UTC.
    this.time = null
    // An array of HTMLElement objects. The first element in an array is the element where an event happened.
    // The second on is its parent and so on, up until the latest HTML element in hierarchy.
    this.path = []
    // Whether this element is excluded from processing an event with special data attribute of the current
    // element or the one of its parents.
    this.excluded = false
  }
}
