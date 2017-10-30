import * as Lib from '../../../lib/lib';
import uuidv1 from 'uuid/v1';

export {Message, WordDataRequest, WordDataResponse};

class Message {
    constructor(message) {
        this.type = Message.types.GENERIC_MESSAGE;
        this.status = undefined;
        this.ID = uuidv1();
        this.body = message;
    }

    static get types() {
        return {
            GENERIC_MESSAGE: 'GenericMessage',
            WORD_DATA_REQUEST: 'WordDataRequest',
            WORD_DATA_RESPONSE: 'WordDataResponse'
        };
    }

    static get statuses() {
        return {
            DATA_FOUND: 'DataFound', // Requested word's data has been found
            NO_DATA_FOUND: 'NoDataFound' // Requested word's data has not been found
        };
    }
 }

class WordDataRequest extends Message {
    constructor(language, word) {
        super();
        this.type = Message.types.WORD_DATA_REQUEST;
        this.body = new Lib.SelectedWord(language, word);
    }
}


class WordDataResponse extends Message {
    constructor(wordData, status, request) {
        super();
        this.type = Message.types.WORD_DATA_RESPONSE;
        this.status = status;
        this.ID = request.ID; // To match request and response
        this.body = wordData;
    }
}
