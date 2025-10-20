# Alpheios Messaging
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/alpheios-project/alpheios-core.svg?branch=master)](https://travis-ci.org/alpheios-project/alpheios-messaging)
[![Coverage Status](https://coveralls.io/repos/github/alpheios-project/alpheios-core/badge.svg?branch=master)](https://coveralls.io/github/alpheios-project/alpheios-messaging?branch=master)

Alpheios messaging is a messaging service component for Alpheios Tools.

## Service Overview

A `MessagingService` was created to send messages between different parties in a simple and unobtrusive way, no matter where the party is located and what is the messaging protocol. It is a higher level abstraction made to hide a complexity of lower level implementation details.

Details such as party location and messaging protocol are encapsulated within a `Destination` object. Each `Destination` instance represents a combination of a protocol and a destination name. Two different destinations that use the same protocol would be represented by two different `Destination` objects.

Once a `Destination` object is registered with a `MessagingService` it is enough to know just a name of it in order to send a message.

Here is a high-level diagram of a `MessagingService`:
![Architecture of a messaging service](https://raw.githubusercontent.com/alpheios-project/alpheios-messaging/i7-documentation/docs/messaging-service-architecture.svg?sanitize=true)

## Messaging Service Singleton

A `MessagingService` should normally be a Singleton (only single instance of a messaging service with a unique name must exist). The `MessagingService.createService` helper method is provided to facilitate this pattern:

`const msgService = MessagingService.createService('serviceName', [destination])`.

We can check if a service with a given name exists:

`const exists = MessagingSercie.hasService('serviceName')`,

and we can retrieve an instance of a service with a given name:

`const msgService = MessagingSercie.getService('serviceName')`

## Destinations

The `MessagingService` uses `Destination` objects to encapsulate knowledge about where and how messages are sent and received. `Destinations` can have `SEND` and `RECEIVE` modes. A mode must be specified upon a creation of a `Destination` object. A `Destination` can be registered with both `SEND` and `RECEIVE` modes, but usually there is no need for that. In most cases, a `Destination` is in either `SEND` or `RECEIVE` mode.


`Destination` is an abstract base class for all destinations. Because of this, `Destination` objects should never be instantiated directly; child classes must be used to create specific destination object instances instead.

The required parameters of a `Destination`'s constructor may depend upon its mode and type (i.e. subclass). Each instance of a `Destination` object must have a unique name by which it will be addressed within the `MessagingService`.

Once created, a `Destination` needs to be registered with a Messaging Service. This can be done via constructor parameters when a `MessagingService` is created:
```
// Initialize WindowIframeDestionation in a SEND mode
const destination = new WindowIframeDestionation({ 
    name: 'destName', // The name of the destination
    commModes: [Destination.commModes.SEND], // The communication mode
    targetURL: 'https://target.com', The URL of a document within an iframe
    targetIframeID: '#iframe-id' // The ID of an iframe where a target document is loaded
})

// Create an instance of a messaging service and register a destination
const msgService = new MessagingService('serviceName', [destination])
```
A `Destination` can also be registered with an existing Messaging Service:
```
// Create an instance of a messaging service with no destinations registered
const msgService = new MessagingService('serviceName')
// Initialize WindowIframeDestionation in a RECIEVE mode, it has a different set of parameters from a SEND mode
const destination = new WindowIframeDestionation({ 
    name: 'destName', // The name of the destination
    commModes: [Destination.commModes.RECEIVE], // The communication mode
    receiverCB: (request, respCB) => {}  The function to be called when a request is received
})
msgService.registerDestination(destination)
```

Once a `Destination` that is in a `SEND` mode is registered with a `MessagingService`, it can be used to send messages:
```
msgService.sendRequestTo('destName', new RequestMessage({}))
``` 

A `Destination` in a `RECEIVE` mode registers a callback that will have two data pieces passed into it: a request object and a function for sending a response. This callback will be executed every time a new request comes in:
```
// Define a receiver callback function
const receiverCB = (request, responseFn) => {
  // Handle a request
  const data = request.body
  // Send a response back using a function provided by the messaging service
  responseFn(new ResponseMessage({ responseData })
}

// Initialize WindowIframeDestionation in a RECEIVE mode
const destination = new WindowIframeDestionation({ 
    name: 'destName',
    commModes: [Destination.commModes.RECEIVE],
    receiverCB: receiverCB
})

// Create an instance of a messaging service and register a destination
const msgService = new MessagingService('serviceName', [destination])

// Now, once a request comes in, a receiverCB() function will be called
```

### WindowIframeDestination

`WindowsIframeDestination` is a destination class to send messages between a webpage and its iframe(s) using a [`postMessage()` method](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) of a `widnow` object. Content of an `iframe` can be loaded from a different website; it allows to group business logic and data from different locations together and `WindowsIframeDestination` creates an effective communication channel between them.

### Other Destinations

Potentially, a `Destination` object can represent any location that could be communicated using any protocol. In addition to inter-iframe communication, a destination could be used represent a remote server. Data from this serer can be obtained using GraphQL, or Rest, or any other remote API over HTTP/S. Messages to a remote server can be used not only to obtain data, but also to trigger actions on that server.

There could be other types of `Destination` objects. Almost anything that require communication could be represented by it.

### Request and Response Messages

There are two type of messages: `RequestMessage` and `ResponsMessage`. They are for sending requests and responses.
Their base class, `Message`, should not be instantiated directly.

Each message consists of a header and a body. The header carries service information and helps to match request and response. The message body contains that payload that should be passed to the `Destination`. The header's properties are normally set it its constructor and not manipulated directly.

Example creation of a `RequestMessage`:
```
const payload = {
    fieldOne: 'fieldOneValue',
    fieldTwo: 'fieldTwoValue'
}

const requestMsg = new RequestMessage(payload) // payload object will be used as a message body

// The receiving side can access payload values as requestMsg.body.fieldOne, requestMsg.body.fieldTwo
```
You must have a `RequestMessage` in order to create a `ResponseMessage`. The `MessagingService` uses message IDs to match request and response. These message IDs are stored in the request data that is stored in the header of a `ResponseMessage` upon message construction:
```
const responseData = {
    responseData: '...'
}

const responseMsg = new ResponseMessage(requestMsg, responseData, ResponseMessage.responseCodes.UNDEFINED) 
```
`ResponseMessage`s also contain a response code (`SUCCESS`, `ERROR`, `UNDEFINED`) that indicate the outcome of the `RequestMessage`. If request resulted in an error, a `ResponseMessage` may also include an error code and an error object:
```
const responseMsg = new ResponseMessage(
    requestMsg, 
    new Error('Service has not been initialized yet'), 
    ResponseMessage.responseCodes.ERROR, 
    { errorCode: ResponseMessage.errorCodes.SERVICE_UNAVAILABLE }
) 
```
It can be convenient to use builder functions to create response messages:
```
// A builder of an error response
const errResonse = ResponseMessage.Error(
    requestMsg, 
    new Error('Service has not been initialized yet'), 
    ResponseMessage.errorCodes.SERVICE_UNAVAILABLE
)

// A builder of a response to a successful request
const okResponse = ResponseMessage.Success(requestMsg, { responseData })
```

