/**
 * A public information about published event that is returned to subscriber.
 * It can be used by subscribers that are listening for more than one event
 * to distinguish between different event types.
 * We could pass an PsEvent object to subscribers instead of PsEventData
 * but it's better not to expose some details of PsEvent implementation to the outside.
 * This will help to avoid creating dependencies on PsEvent internals within subscribers functions.
 * Thus an PsEventData object can be considered as a publicly exposed part of PsEvent data.
 * If needed, PsEventData can present PsEvent data to subscriber differently,
 * not in the way PsEvent stores it. This makes sense as subscriber might be interested in
 * a different angle of PsEvent information. PsEventData may add properties or methods
 * that do not needed within an PsEvent, but might be useful to subscribers.
 */
export default class PsEventData {
  /**
   * @param {PsEvent} event - An event that is being published.
   * @param {string} [caller=''] - The name of the function from where an event was published.
   */
  constructor (event, caller = '') {
    this.name = event.name
    this.publisher = event.publisher
    this.caller = caller
  }

  /**
   * Returns a description of an event data in a printable form. Example:
   *     LexicalQuery.finalize -> [Lexical Query Complete]
   * If caller function is not specified during a `pub()` call, description will be:
   *     LexicalQuery -> [Lexical Query Complete]
   *
   * @returns {string} - An event data description.
   */
  get description () {
    return this.caller ? `${this.publisher}.${this.caller} -> [${this.name}]` : `${this.publisher} -> [${this.name}]`
  }
}
