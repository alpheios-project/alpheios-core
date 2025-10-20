import '../messaging-service/bundle/alpheios-messaging-test.js'
const AMS = window.AlpheiosMessagingService
const config = window.parent.AlpheiosMessagingConfig

const receiverCB = (request, responseFn) => {
  const testId = request.body.testId
  switch (testId) {
    case 'standard-request':
      responseFn(AMS.ResponseMessage.Success(request))
      break
    case 'timeout':
      // Do nothing
      break
    case 'non-alpheios-message-c':
      window.parent.postMessage({}, config.targetURL)
      break
    case 'non-alpheios-message-d':
      window.parent.postMessage({ type: 'Unsupported' }, config.targetURL)
      break
  }
}

AMS.MessagingService.createService(config.name, new AMS.WindowIframeDestination({
  name: config.name,
  targetURL: config.targetURL,
  targetIframeID: config.targetIframeID,
  commModes: [AMS.WindowIframeDestination.commModes.RECEIVE],
  receiverCB: receiverCB
}))
