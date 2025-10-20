/**
 * @module Message
 */
import { v4 as uuidv4 } from 'uuid'

/** A base class for all types of messages */
export default class Message {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor (body = {}) {
    /**
     * A message's role (@see {@link Message.roles}). Will be defined in descendants.
     *
     * @type {string | undefined}
     */
    this.role = undefined

    /**
     * A type of the message. Used to distinguish one kind of message from the other (@see {@link Message.types}).
     *
     * @type {string | undefined}
     */
    this.type = Message.types.GENERIC

    /**
     * A unique identifier of the message.
     *
     * @type {string}
     */
    this.ID = uuidv4()

    /**
     * An object with no methods representing a message body.
     *
     * @type {object}
     */
    this.body = body
  }

  static isKnownType (typeValue) {
    return Object.values(Message.types).includes(typeValue)
  }
}

/**
 * Specifies whether a message is request or response.
 */
Message.roles = {
  REQUEST: 'Request',
  RESPONSE: 'Response'
}

/**
 * Specifies a message type: what kind of message it is and what purpose it serves.
 * Message types are used to distinguish different types of messages from each other
 * and to distinguish Alpheios from non-Alpheios messages. All Alpheios messages
 * must start from an `ALPHEIOS_` prefix.
 */
Message.types = {
  GENERIC: 'ALPHEIOS_MESSAGE' // A generic message of general purpose
}
