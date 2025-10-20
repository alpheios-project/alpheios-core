/**
 * @module Destination
 */

/** Destination represents a place where messages are sent to and are received from (e.g. a windows) */
export default class Destination {
  /**
   * Creates an instance of a Destination object. Descendants may take configuration parameters through
   * a second argument that they can define.
   *
   * @param {object} [configuration={}] - A configuration object for a destination.
   * @param {string} configuration.name - A name of a particular destination.
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   *        Defaults to a SEND mode.
   */
  constructor ({ name, commModes = [Destination.commModes.SEND] } = {}) {
    if (!name) {
      throw new Error(Destination.errMsgs.NO_DESTINATION)
    }

    /**
     * A name of a destination. Used to refer to it within a messaging service.
     *
     * @type {string}
     * @public
     */
    this.name = name

    /**
     * An array of communication modes that are enabled for a destination.
     *
     * @type {string[]}
     * @public
     */
    this.commModes = commModes

    /**
     * A function that will be called when a response from destination is received.
     *
     * @type {Function}
     * @private
     */
    this._responseCallback = null
  }

  /**
   * Checks if a SEND communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the SEND mode.
   */
  get ableToSend () {
    return this.commModes.includes(Destination.commModes.SEND)
  }

  /**
   * Checks if a RECEIVE communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the RECEIVE mode.
   */
  get ableToReceive () {
    return this.commModes.includes(Destination.commModes.RECEIVE)
  }

  /**
   * This function will be called by the messaging service when a destination is deregistered or deleted.
   * It must do a cleanup necessary for a destination object. Its functionality should be defined within a subclass.
   */
  deregister () {
    throw new Error(Destination.errMsgs.DEREGISTER_NOT_DEFINED)
  }
}

/*
A list of communication modes that a destination can support.
 */
Destination.commModes = {
  /*
  If a SEND mode is enabled, this destination can send messages to other destinations of the same type.
   */
  SEND: 'Send',

  /*
  A RECEIVE mode enables destination to receive messages from other destinations of the same type.
   */
  RECEIVE: 'Receive'
}

Destination.errMsgs = {
  NO_DESTINATION: 'Destination name is missing',
  DEREGISTER_NOT_DEFINED: 'Deregister method must be defined in a subclass'
}
