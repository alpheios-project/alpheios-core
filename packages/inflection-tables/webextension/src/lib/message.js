import * as Lib from '../../../lib/lib';
import uuidv1 from 'uuid/v1';

export {Message, MessagingService, WordDataRequest, WordDataResponse,
    StatusRequest, StatusResponse, ActivateRequest, DeactivateRequest};

class Message {
    constructor(message) {
        this.requestType = undefined;
        this.type = Message.types.GENERIC_MESSAGE;
        this.status = undefined;
        this.ID = uuidv1();
        this.body = message;
    }

    static get types() {
        return {
            GENERIC_MESSAGE: 'GenericMessage',
            WORD_DATA_REQUEST: 'WordDataRequest',
            WORD_DATA_RESPONSE: 'WordDataResponse',
            STATUS_REQUEST: 'StatusRequest',
            STATUS_RESPONSE: 'StatusResponse',
            ACTIVATE_REQUEST: 'ActivateRequest',
            DEACTIVATE_REQUEST: 'DeactivateRequest',
        };
    }

    static get requestTypes() {
        return {
            REQUEST: 'Request',
            RESPONSE: 'Response'
        }
    }

    static get statuses() {
        return {
            DATA_FOUND: 'DataFound', // Requested word's data has been found
            NO_DATA_FOUND: 'NoDataFound', // Requested word's data has not been found,
            ACTIVE: 'Active', // Content script is loaded and active
            DEACTIVATED: 'Deactivated' // Content script has been loaded, but is deactivated
        };
    }
 }

 class RequestMessage extends Message {
    constructor() {
        super();
        this.requestType = Message.requestTypes.REQUEST;
    }
 }

class ResponseMessage extends Message {
    constructor(request) {
        super();
        this.requestType = Message.requestTypes.RESPONSE;
        this.requestID = request.ID; // ID of the request to match request and response
    }
}

 class RequestInfo {
    constructor() {
        this.resolve = undefined;
        this.reject = undefined;
        // Promise sets reject and resolve
        this.promise = new Promise(this.executor.bind(this));
    }

    executor(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
 }

 class MessagingService {
    constructor() {
        this.map = new Map();
    }

    registerRequest(message, timeout = undefined) {
        let requestInfo = new RequestInfo(message);
        this.map.set(message.ID, requestInfo);
        if (timeout) {
            requestInfo.timeoutID = window.setTimeout((messageID) => {
                let requestInfo = this.map.get(messageID);
                requestInfo.reject('Timeout expired'); // Reject a promise
                this.map.delete(messageID); // Remove from map
                console.log(`Map length is ${this.map.size}`);
            }, timeout, message.ID);
        }
        console.log(`Map length is ${this.map.size}`);
        return requestInfo.promise;
    }

    sendRequestToTab(tabID, message, timeout) {
        browser.tabs.sendMessage(tabID, message);
        return this.registerRequest(message, timeout);
    }

     sendRequestToBg(message) {
         browser.runtime.sendMessage(message);
         return this.registerRequest(message);
     }

     sendResponseToTab(tabID, message) {
         browser.tabs.sendMessage(tabID, message);
     }

     sendResponseToBg(message) {
         browser.runtime.sendMessage(message);
     }

     handleResponse(responseMessage) {
        if (responseMessage.requestType && responseMessage.requestType === Message.requestTypes.RESPONSE) {
            if (responseMessage.requestID && this.map.has(responseMessage.requestID)) {
                let requestInfo = this.map.get(responseMessage.requestID);
                window.clearTimeout(requestInfo.timeoutID); // Clear a timeout
                requestInfo.resolve(responseMessage); // Resolve with a response message
                this.map.delete(responseMessage.requestID); // Remove request from a map
                console.log(`Map length is ${this.map.size}`);
            }
        }
     }
 }


class WordDataRequest extends RequestMessage {
    constructor(language, word) {
        super();
        this.type = Message.types.WORD_DATA_REQUEST;
        this.body = new Lib.SelectedWord(language, word);
    }
}


class WordDataResponse extends ResponseMessage {
    constructor(wordData, status, request) {
        super(request);
        this.type = Message.types.WORD_DATA_RESPONSE;
        this.status = status;
        this.body = wordData;
    }
}

class StatusRequest extends RequestMessage {
    constructor() {
        super();
        this.requestType = Message.requestTypes.REQUEST;
        this.type = Message.types.STATUS_REQUEST;
    }
}

class StatusResponse extends ResponseMessage {
    constructor(status, request) {
        super(request);
        this.status = status;
        this.type = Message.types.STATUS_RESPONSE;
    }
}

class ActivateRequest extends RequestMessage {
    constructor() {
        super();
        this.type = Message.types.ACTIVATE_REQUEST;
    }
}

class DeactivateRequest extends RequestMessage {
    constructor() {
        super();
        this.type = Message.types.DEACTIVATE_REQUEST;
    }
}
