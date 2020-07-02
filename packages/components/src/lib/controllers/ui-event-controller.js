/**
 * This is an event controller that is used currently for user interaction event, but can be adapted
 * to handle events of any type.
 */
export default class UIEventController {
  constructor () {
    this._listeners = new Map()
  }

  get listenerNames () {
    return Array.from(this._listeners.keys())
  }

  /**
   * Registers a single event listener or a group of event listeners.
   *
   * @param {string} name - A name of the listener or a group of listeners
   *        that can be used to operate it (register, unregister, set, or remove).
   * @param {string} nodeOrSelector - A CSS selector to define HTML elements that will listen to an events
   *        or an HTML Node element.
   * @param {Function} eventHandler - An event listener function to register.
   * @param {PointerEvt} EventType - A constructor function of on of a custom pointer events that will do an event handling.
   * @param {...*} eventExtraParams - Extra arguments that will be passed to the
   *        PointerEvt constructor function after two obligatory parameters of HTML element and handler function.
   * @returns {UIEventController} An event controller instance for chaining.
   */
  registerListener (name, nodeOrSelector, eventHandler, EventType, ...eventExtraParams) {
    let events
    if (!nodeOrSelector || nodeOrSelector instanceof Node) {
      events = [new EventType(nodeOrSelector, eventHandler, ...eventExtraParams)]
    } else {
      events = Array.from(document.querySelectorAll(nodeOrSelector)).map((el) => new EventType(el, eventHandler, ...eventExtraParams))
    }

    if (this._listeners.has(name)) {
      // Unregister a previously registered event listener
      this.unregisterListener(name)
    }
    this._listeners.set(name, { events, nodeOrSelector, eventHandler, activated: false })
    return this
  }

  /**
   * Unregisters a single listener or a group of listeners registered under a specific name.
   *
   * @param {string} name - A name of the event listener or group of event listeners.
   * @returns {UIEventController} An event controller instance for chaining.
   */
  unregisterListener (name) {
    if (this._listeners.has(name)) {
      this.deactivateListener(name)
      this._listeners.delete(name)
    }
    return this
  }

  /**
   * Updates EventType and parameters for an existing listener.
   *
   * @param {string} name - A name of the listener or a group of listeners for which an event shall be replaced.
   * @param {PointerEvt} EventType - A constructor function of on of a custom pointer events that will do an event handling.
   * @param {...*} eventExtraParams - Extra arguments that will be passed to the
   *        PointerEvt constructor function after two obligatory parameters of HTML element and handler function.
   * @returns {UIEventController} An event controller instance for chaining.
   */
  updateEvent (name, EventType, ...eventExtraParams) {
    if (this._listeners.has(name)) {
      const listener = this._listeners.get(name)
      const nodeOrSelector = listener.nodeOrSelector
      const eventHandler = listener.eventHandler
      const activated = listener.activated
      this.unregisterListener(name)
      this.registerListener(name, nodeOrSelector, eventHandler, EventType, ...eventExtraParams)
      // If listener was activated before, restore its previous state
      if (activated) { this.activateListener(name) }
    }
    return this
  }

  /**
   * Updates parameters of events for a listener.
   *
   * @param {string} name - A name of the listener or a group of listeners
   * @param {...*} eventExtraParams - Extra arguments that will be passed to the
   *        PointerEvt constructor function after two obligatory parameters of HTML element and handler function.
   * @returns {UIEventController} An event controller instance for chaining.
   */
  updateEventParams (name, ...eventExtraParams) {
    if (this._listeners.has(name)) {
      this._listeners.get(name).events.forEach((l) => l.updateParams(...eventExtraParams))
    }
    return this
  }

  /**
   * Activates a listener by name.
   *
   * @param {string} name - A name of a listener to activate.
   * @returns {UIEventController} An event controller instance for chaining.
   */
  activateListener (name) {
    if (this._listeners.has(name)) {
      let listener = this._listeners.get(name) // eslint-disable-line prefer-const
      // Do not activate listeners that are activated already
      if (!listener.activated) {
        listener.events.forEach((l) => l.set())
        listener.activated = true
      }
    }
    return this
  }

  /**
   * Activates all event listeners that were registered previously.
   *
   * @returns {UIEventController} An event controller instance for chaining.
   */
  activateListeners () {
    Array.from(this._listeners.keys()).forEach((name) => this.activateListener(name))
    return this
  }

  /**
   * Deactivates a listener by name.
   *
   * @param {string} name - A name of a listener to deactivate.
   * @returns {UIEventController} An event controller instance for chaining.
   */
  deactivateListener (name) {
    if (this._listeners.has(name)) {
      let listener = this._listeners.get(name) // eslint-disable-line prefer-const
      // Do not deactivate listeners that are already deactivated
      if (listener.activated) {
        listener.events.forEach((l) => l.remove())
        listener.activated = false
      }
    }
    return this
  }

  /**
   * Deactivates all event listeners that were registered previously.
   *
   * @returns {UIEventController} An event controller instance for chaining.
   */
  deactivateListeners () {
    Array.from(this._listeners.keys()).forEach((name) => this.deactivateListener(name))
    return this
  }
}
