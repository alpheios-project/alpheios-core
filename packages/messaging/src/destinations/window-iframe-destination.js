/**
 * @module WindowIframeDestination
 */
import Message from '@messServ/messages/message.js'
import Destination from '@messServ/destinations/destination.js'

/** WindowIframeDestination represents a content window within an iframe */
export default class WindowIframeDestination extends Destination {
  /**
   * @param {object} [configuration={}] - An object containing configuration parameters.
   * @param {string} configuration.name - A name of a destination (for addressing a destination in a messaging service).
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   * @param {string} configuration.targetURL - A URL of a document within an iframe where messages will be sent.
   * @param {string} configuration.targetIframeID - An ID of an iframe element (without `#`).
   * @param {Function} configuration.receiverCB - A function that will be called when destination is in the
   *        RECEIVE mode and the incoming request has arrived. This function will receive two parameters:
   *        the message object and the function that will need to be called in order to send a response back.
   */
  constructor ({ name, commModes, targetURL, targetIframeID, receiverCB } = {}) {
    super({ name, commModes })
    /**
     * A URL of a document within an iframe where messages will be sent.
     *
     * @type {string | null}
     * @private
     */
    this._targetURL = null

    /**
     * An ID of an iframe element (without `#`).
     *
     * @type {string | null}
     * @private
     */
    this._targetIframeID = null

    // The following two props will keep track of request and response handlers registered for this destination.
    this._registeredRequestHandler = null
    this._registeredResponseHandler = null

    if (this.ableToSend) {
      if (!targetURL) {
        throw new Error(WindowIframeDestination.errMsgs.NO_TARGET_URL)
      }

      if (!targetIframeID) {
        throw new Error(WindowIframeDestination.errMsgs.NO_TARGET_IFRAME_ID)
      }

      this._targetURL = targetURL
      this._targetIframeID = targetIframeID
    }

    if (this.ableToReceive) {
      // Destination is initialized in the receive mode
      if (!receiverCB) {
        throw new Error(WindowIframeDestination.errMsgs.NO_RECEIVER_CB)
      }
      this._registeredRequestHandler = this._requestHandler.bind(this, receiverCB)
      window.addEventListener('message', this._registeredRequestHandler, false)
    }
  }

  /**
   * Registers a function to call when a response from destination is received.
   *
   * @param {Function} callbackFn - A function to be called when response is received.
   */
  registerResponseCallback (callbackFn) {
    this._registeredResponseHandler = this._responseHandler.bind(this)
    window.addEventListener('message', this._registeredResponseHandler, false)
    this._responseCallback = callbackFn
  }

  /**
   * A function that will be called to send a request from origin to destination.
   *
   * @param {RequestMessage} requestMessage - A request message object.
   */
  sendRequest (requestMessage) {
    const iframe = document.querySelector(`#${this._targetIframeID}`)
    if (!iframe) {
      throw new Error(`An #${this._targetIframeID} iframe does not exist in the document`)
    }
    const iframeWindow = iframe.contentWindow

    /*
    If we'll try to send a message to an iframe which content would not been loaded yet,
    `postMessage` will throw an error. It will be impossible, however, to catch this error here because `postMessage`
    executes asynchronously (please see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
    Once the cross-origin iframe content became available, it will throw a DOM security exception
    if we try to access its `location` prop. We can use that to check whether an iframe content is loaded
    before trying to send a message to it.
     */
    let contentNotLoaded = false
    try {
      contentNotLoaded = iframeWindow.location.href === 'about:blank'
    } catch (err) {
      if (err instanceof DOMException) {
        // Do nothing. This error usually means that a cross-origin iframe content has become available.
      } else {
        // Re-throw an error
        throw err
      }
    }

    if (contentNotLoaded) {
      // If we can access a target iframe location and its URL is blank it means an iframe content is not loaded yet.
      throw new Error(`Target document ${this._targetURL} is not loaded yet`)
    }
    try {
      iframeWindow.postMessage(requestMessage, this._targetURL)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'DataCloneError') {
        /*
        A message body does not confirm the structured clone algorithm and thus cannot be send via `postMessage`.
        See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        for more details.
        We'll try to convert it to a plain object.
         */
        console.warn('Request that does not confirm to the structured clone algorithm cannot be sent, ' +
          'will try to convert it to a plain object and send again')
        requestMessage.body = WindowIframeDestination._toPostable(requestMessage.body)
        // Try to resend a message
        iframeWindow.postMessage(requestMessage, this._targetURL)
      } else {
        // Some other error occurred, rethrow it
        throw err
      }
    }
  }

  /**
   * A function that is used to send a response from destination to origin.
   *
   * @param {ResponseMessage} responseMessage - A response message object.
   */
  sendResponse (responseMessage) {
    try {
      window.parent.postMessage(responseMessage, responseMessage.requestHeader.origin)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'DataCloneError') {
        /*
        A message body does not confirm the structured clone algorithm and thus cannot be send via `postMessage`.
        See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        for more details.
        We'll try to convert it to a plain object.
         */
        console.warn('Response that does not confirm to the structured clone algorithm cannot be sent, ' +
                     'will try to convert it to a plain object and send again')
        responseMessage.body = WindowIframeDestination._toPostable(responseMessage.body)
        // Try to resend a message
        window.parent.postMessage(responseMessage, responseMessage.requestHeader.origin)
      } else {
        // Some other error occurred, rethrow it
        throw err
      }
    }
  }

  /**
   * An internal handler that is called when request arrives to its destination.
   *
   * @param {Function} callbackFn - A client's callback function that will be called and
   *                                passed a request (a `RequestMessage` object).
   * @param {Event} event - A browser's event object.
   * @private
   */
  _requestHandler (callbackFn, event) {
    // Check if an event contains a valid Alpheios message object.
    if (!WindowIframeDestination._isSupportedEvent(event)) { return }

    // `data` prop of an event contains a request message object
    let request = event.data  
    request.header.origin = event.origin
    callbackFn(request, this.sendResponse.bind(this))
  }

  /**
   * An internal handler that is called when response arrives from destination to origin.
   *
   * @param {Event} event - A browser's event object.
   * @private
   */
  _responseHandler (event) {
    // Check if an event contains a valid Alpheios message object.
    if (!WindowIframeDestination._isSupportedEvent(event)) { return }

    // `data` prop of an event contains a response message object
    const responseMessage = event.data
    if (this._responseCallback) {
      this._responseCallback(responseMessage)
    }
  }

  /**
   * Checks whether an event contains a well-formed Alpheios message object.
   *
   * @param {Event} event - An event that may contain a message object in a `data` field.
   * @returns {boolean} - True if an event contains a well-formed Alpheios message object, false otherwise.
   * @private
   */
  static _isSupportedEvent (event) {
    return Boolean(event && event.data && event.data.type && Message.isKnownType(event.data.type))
  }

  /**
   * This function will be called by the messaging service when destination is deregistered or deleted.
   * It must do a cleanup for a destination object.
   */
  deregister () {
    // Remove event listeners for registered request and response handlers
    if (this._registeredResponseHandler) {
      window.removeEventListener('message', this._registeredResponseHandler, false)
      this._registeredResponseHandler = null
    }
    if (!this._registeredRequestHandler) {
      window.removeEventListener('message', this._registeredRequestHandler, false)
      this._registeredRequestHandler = null
    }
  }

  /**
   * Converts an object to the one that is conforms the structured clone algorithm.
   * See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
   * for more details.
   *
   * @param {object} message - An object to convert.
   * @returns {object} - An object that conforms to the structured clone algorithm.
   * @private
   */
  static _toPostable (message) {
    let postable
    if (message instanceof Error) {
      /*
      Due to the bug in FF, Errors cannot be sent via postMessage yet.
      Please see https://bugzilla.mozilla.org/show_bug.cgi?id=1556604 for more details.
      This code can be removed once the bug is fixed.
       */
      postable = {
        name: message.name,
        message: message.message
      }
    } else {
      postable = JSON.parse(JSON.stringify(message))
    }
    return postable
  }
}

WindowIframeDestination.errMsgs = {
  NO_TARGET_URL: 'Target URL is not provided',
  NO_TARGET_IFRAME_ID: 'Target iframe ID is not provided',
  NO_RECEIVER_CB: 'A receiver callback must be provided for a destination in the RECEIVE communication mode'
}
