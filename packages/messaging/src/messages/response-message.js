/**
 * @module ResponseMessage
 */
import Message from '@messServ/messages/message.js'
import RequestMessage from '@messServ/messages/request-message.js'

/** A response message that is sent as an answer to the request message. */
export default class ResponseMessage extends Message {
  /**
   * @param {RequestMessage} request - A request that initiated this response. Used to copy routing information mostly.
   * @param {object} [body={}] - A body of the response, a plain JS object with no methods.
   * @param {string} responseCode - A code to indicate results of the request handling: Success, Failure, etc.
   * @param {object} options - Additional non-obligatory parameters:
   * @param {number} options.errorCode - An error code indicating why request has failed.
   */
  constructor (request, body = {}, responseCode = ResponseMessage.responseCodes.UNDEFINED, { errorCode } = {}) {
    super(body)
    if (!request) throw new Error('Request is not provided')
    if (!request.ID) throw new Error('Request has no ID')
    this.role = Message.roles.RESPONSE
    this.requestHeader = request.header || {}
    this.requestID = request.ID // ID of the request to match request and response
    this.responseCode = responseCode

    /**
     * If request failed this prop will contain an error code indicating the reason of the failure.
     *
     * @type {number}
     */
    this.errorCode = 0

    if (responseCode === ResponseMessage.responseCodes.ERROR) {
      // Request has failed. An error code must be provided.
      if (!errorCode) {
        throw new Error('An error code must be provided for failed requests')
      }
      this.errorCode = errorCode
    }
  }

  /**
   * A builder for a response message with a SUCCESS response code.
   *
   * @param {RequestMessage} request - An original request.
   * @param {object} [body={}] - A body of response message.
   * @returns {ResponseMessage} - A newly created response message with the SUCCESS return code.
   * @class
   */
  static Success (request, body = {}) {
    return new this(request, body, ResponseMessage.responseCodes.SUCCESS)
  }

  /**
   * A builder for a message with an ERROR response code. Error information will be sent within the message body.
   *
   * @param {RequestMessage} request - An original request.
   * @param {Error} error - An error object containing error information.
   * @param {number} errorCode - An error code indicating why a request failed.
   * @returns {ResponseMessage} - A newly created response message with the SUCCESS return code.
   * @class
   */
  static Error (request, error, errorCode) {
    return new this(request, error, ResponseMessage.responseCodes.ERROR, { errorCode })
  }

  /**
   * Checks if this message is a response (i.e. if it follows a response message format and conventions).
   *
   * @param {RequestMessage | ResponseMessage} message - A request or response message to be tested.
   * @returns {boolean} - True if the message is a response, false otherwise.
   */
  static isResponse (message) {
    return message.role &&
      message.role === Message.roles.RESPONSE &&
      message.requestHeader &&
      message.requestID
  }
}

/**
 * Specifies whether a request was processed successfully or not.
 */
ResponseMessage.responseCodes = {
  // Request was processed successfully.
  // In this case a message body may contain a response data object or be empty.
  SUCCESS: 'Success',

  // There is no information about what was the outcome of a request.
  UNDEFINED: 'Undefined',

  // Request failed. A message will contain information about an error.
  ERROR: 'Error'
}

/**
 * If request failed, the error code will be used to indicate the reason of a failure.
 */
ResponseMessage.errorCodes = {
  // A remote service has not been initialized yet
  SERVICE_UNINITIALIZED: 1,
  // An error occurred during initialization of a remote service
  INITIALIZATION_ERROR: 2,
  // Request of unknown type is received by a remote service
  UNKNOWN_REQUEST: 3,
  // An unspecified error has occurred inside a remote service
  INTERNAL_ERROR: 4
}
