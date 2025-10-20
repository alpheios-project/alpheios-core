/**
 * @module RequestMessage
 */
import Message from '@messServ/messages/message.js'

/** A request message */
export default class RequestMessage extends Message {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor (body = {}) {
    super(body)
    this.role = Message.roles.REQUEST

    /**
     * A message header. Will contain routing information usually.
     *
     * @type {object}
     */
    this.header = {}
  }
}
