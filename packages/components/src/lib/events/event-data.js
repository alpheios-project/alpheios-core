/**
 * A public information about published event that is returned to subscriber.
 * It can be used by subscribers that are listening for more than one event
 * to distinguish between different event types.
 * We could pass an Event object to subscribers instead of EventData
 * but it's better not to expose some details of Event implementation to the outside.
 * This will help to avoid creating dependencies on Event internals within subscribers functions.
 * Thus an EventData object can be considered as a publicly exposed part of Event data.
 * If needed, EventData can present Event data to subscriber differently,
 * not in the way Event stores it. This makes sense as subscriber might be interested in
 * a different angle of Event information. EventData may add properties or methods
 * that do not needed within an Event, but might be useful to subscribers.
 */
export default class EventData {
  /**
   * @param {Event} event - An event that is being published.
   */
  constructor (event) {
    this.name = event.name
    this.publisher = event.publisher
  }
}
