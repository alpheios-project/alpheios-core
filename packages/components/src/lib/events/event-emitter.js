const domainPrefix = 'Alpheios'
let listeners = new Map()

export default class EventEmitter {
  /**
   * Registers an event with shortName name for a class.
   * @param {string} shortName - A name of an event.
   * @return {EventEmitter} - A self reference for chaining.
   */
  static registerEvent (shortName) {
    if (!listeners.has(this.name)) { listeners.set(this.name, new Map()) }
    let emListeners = listeners.get(this.name)
    if (!emListeners.has(shortName)) {
      emListeners.set(shortName, [])
    } else {
      console.warn(`Event ${shortName} is already registered for ${this.name}`)
    }
    return this
  }

  /**
   * Returns a full name that follows the `domain.class.shortName` pattern.
   * Domain name is `Alpheios`
   * @param {string} shortName - A short name of an event.
   * @return {string} A full event's name.
   */
  static getFullName (shortName) {
    return `${domainPrefix}.${this.name}.${shortName}`
  }

  /**
   * Return a list of listeners registered for an event.
   * @param {string} shortName - A short name of an event.
   * @return {Function[]} An array of listener functions.
   */
  static getListeners (shortName) {
    if (!listeners.has(this.name)) { throw new Error(`No events are registered by ${this.name}`) }

    let emListeners = listeners.get(this.name)
    if (emListeners.has(shortName)) {
      return emListeners.get(shortName)
    } else {
      throw new Error(`Event ${shortName} is not supported by ${this.name}`)
    }
  }

  /**
   * Registers a listener for an event.
   * @param {string} shortName - A short name of an event.
   * @param {Function} listener - A function that will be called when an event is emitted.
   * @return {EventEmitter} - A self reference for chaining.
   */
  static addListener (shortName, listener) {
    this.getListeners(shortName).push(listener)
    return this
  }

  /**
   * Emits a specified event by calling all registered callbacks by passing them data as an argument.
   * @param {string} shortName - A short name of an event.
   * @param {Object} data - A data object that will be passed to registered listeners.
   * @return {EventEmitter} A self reference for chaining.
   */
  static emit (shortName, data) {
    for (let listener of this.getListeners(shortName)) {
      listener(data)
    }
    return this
  }

  /**
   * Returns an array of short event names in order they were registered.
   * @return {string[]}
   */
  static get events () {
    return listeners.has(this.name) ? Array.from(listeners.get(this.name).keys()) : []
  }
}
