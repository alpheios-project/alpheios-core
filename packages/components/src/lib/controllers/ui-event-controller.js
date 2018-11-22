/**
 * This is an event controller that is used currently for user interaction event, but can be adapted
 * to handle events of any type.
 */
export default class UIEventController {
  constructor () {
    this.listeners = new Map()
  }

  /**
   * Registers a single event listener or a group of event listeners.
   * @param {string} name - A name of the listener or a group of listeners
   *        that can be used to operate it (register, unregister, set, or remove).
   * @param {string} nodeOrSelector - A CSS selector to define HTML elements that will listen to an events
   *        or an HTML Node element.
   * @param {Function} eventHandler - An event listener function to register.
   * @param {PointerEvt} EventType - A constructor function of on of a custom pointer events that will do an event handling.
   * @param {...*} eventExtraParams - Extra arguments that will be passed to the
   *        PointerEvt constructor function after two obligatory parameters of HTML element and handler function.
   * @return {UIEventController} An event controller instance for chaining.
   */
  registerListener (name, nodeOrSelector, eventHandler, EventType, ...eventExtraParams) {
    let events
    if (!nodeOrSelector || nodeOrSelector instanceof Node) {
      events = [new EventType(nodeOrSelector, eventHandler, ...eventExtraParams)]
    } else {
      events = Array.from(document.querySelectorAll(nodeOrSelector)).map((el) => new EventType(el, eventHandler, ...eventExtraParams))
    }

    if (this.listeners.has(name)) {
      // Unregister a previously registered event listener
      this.unregisterListener(name)
    }
    this.listeners.set(name, events)
    return this
  }

  /**
   * Unregisters a single listener or a group of listeners registered under a specific name.
   * @param {string} name - A name of the event listener or group of event listeners.
   * @return {UIEventController} An event controller instance for chaining.
   */
  unregisterListener (name) {
    if (this.listeners.has(name)) {
      this.deactivateListener(name)
      this.listeners.delete(name)
    }
    return this
  }

  /**
   * Activates a listener by name.
   * @param {string} name - A name of a listener to activate.
   * @return {UIEventController} An event controller instance for chaining.
   */
  activateListener (name) {
    if (this.listeners.has(name)) {
      this.listeners.get(name).forEach((l) => l.set())
    }
    return this
  }

  /**
   * Activates all event listeners that were registered previously.
   * @return {UIEventController} An event controller instance for chaining.
   */
  activateListeners () {
    Array.from(this.listeners.keys()).forEach((name) => this.activateListener(name))
    return this
  }

  /**
   * Deactivates a listener by name.
   * @param {string} name - A name of a listener to deactivate.
   * @return {UIEventController} An event controller instance for chaining.
   */
  deactivateListener (name) {
    if (this.listeners.has(name)) {
      this.listeners.get(name).forEach((l) => l.remove())
    }
    return this
  }

  /**
   * Deactivates all event listeners that were registered previously.
   * @return {UIEventController} An event controller instance for chaining.
   */
  deactivateListeners () {
    Array.from(this.listeners.keys()).forEach((name) => this.deactivateListener(name))
    return this
  }
}
