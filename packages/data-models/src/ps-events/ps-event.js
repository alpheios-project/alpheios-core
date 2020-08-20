import { v4 as uuidv4 } from 'uuid'
import PsEventData from '../../src/ps-events/ps-event-data.js'

/**
 * An event in pub/sub (publish–subscribe) design pattern
 */
export default class PsEvent {
  /**
   * @param {string} name - A name of the event.
   * @param {Function} publisher - A constructor function of a publisher.
   *        PsEvent uses its `name` property to set its publisher name field.
   */
  constructor (name, publisher) {
    /**
     * A name of the event.
     *
     * @type {string}
     */
    this.name = name

    /**
     * A name of the publisher.
     *
     * @type {string}
     */
    this.publisher = publisher.name

    /**
     * A subscribers that listens to the published event.
     *
     * @type {Map<int, EventSubscriber>} - A map of subscriber's functions
     */
    this._subscribers = new Map()
  }

  /**
   * This function is called when an event is published.
   *
   * @callback EventSubscriber
   * @param {object} data - An event-specific data associated with the event.
   * @param {PsEventData} eventData - A data about the event being published.
   *        PsEvent data allows generic subscribers (i.e. functions that are subscribed to
   *        more than one event) to distinguish between an event being published.
   */

  /**
   * Return a list of subscribers for the current event.
   *
   * @returns {EventSubscriber[]} An array of event subscriber functions.
   */
  get subscribers () {
    return Array.from(this._subscribers.values())
  }

  /**
   * Subscribes a function to the published event.
   * When event is published, a @type {Event~subscriber} function is called.
   *
   * @param {EventSubscriber} subscriber - A subscriber function.
   * @returns {Function} - An function that, when called, will unsubscribe the current subscriber from an event.
   */
  sub (subscriber) {
    const subId = uuidv4()
    this._subscribers.set(subId, subscriber)
    return () => {
      this._subscribers.delete(subId)
    }
  }

  /**
   * Publishes an event with data related to it. All subscribers will receive an
   * event notification along with event data.
   *
   * @param {object} [data={}] - An event-specific data associated with the event.
   * @param {string} [caller=''] - The name of the function that called `pub`.
   */
  pub (data = {}, caller = '') {
    this._subscribers.forEach(l => l(data, new PsEventData(this, caller)))
  }

  /**
   * Unsubscribes all subscribers from an event.
   */
  unsubAll () {
    this._subscribers.clear()
  }
}
