import '../messaging-service/bundle/alpheios-messaging-test.js'
const AMS = window.AlpheiosMessagingService

window.AlpheiosMessagingConfig = {
  name: 'iframeService',
  targetURL: 'http://localhost:8100/iframe.html',
  targetIframeID: 'alpheios-iframe-test'
}
const config = window.AlpheiosMessagingConfig

const msgServ = AMS.MessagingService.createService(config.name, new AMS.WindowIframeDestination({
  name: config.name,
  targetURL: config.targetURL,
  targetIframeID: config.targetIframeID,
  commModes: [AMS.WindowIframeDestination.commModes.SEND]
}))

const runTest = async (testId) => {
  const message = new AMS.RequestMessage({
    testId
  })
  if ([
    'standard-request',
    'timeout',
    'non-alpheios-message-c',
    'non-alpheios-message-d'
  ].includes(testId)) {
    try {
      const response = await msgServ.sendRequestTo(config.name, message, 1000)
      return {
        outcome: 'success',
        message: ''
      }
    } catch (error) {
      if (testId === 'timeout' && /^Timeout has been expired for a message with request ID/.test(error.message)) {
        return {
          outcome: 'success',
          message: error.message
        }
      } else if (['non-alpheios-message-c', 'non-alpheios-message-d'].includes(testId) && /^Timeout has been expired for a message with request ID/.test(error.message)) {
        return {
          outcome: 'message',
          message: 'No errors shall be printed in the console'
        }
      }
      console.error(error)
      return {
        outcome: 'failure',
        message: error.message
      }
    }
  } else if (testId === 'non-alpheios-message-a') {
    document.querySelector(`#${config.targetIframeID}`).contentWindow.postMessage({}, config.targetURL)
    return {
      outcome: 'message',
      message: 'No errors shall be printed in the console'
    }
  } else if (testId === 'non-alpheios-message-b') {
    document.querySelector(`#${config.targetIframeID}`).contentWindow.postMessage({ type: 'Unsupported' }, config.targetURL)
    return {
      outcome: 'message',
      message: 'No errors shall be printed in the console'
    }
  }
}

// Reset all test results
document.querySelector('.alpheios-reset-all-btn').addEventListener('click', async () => {
  document.querySelectorAll('[data-test-id]').forEach(
    element => {
      element.dataset.testResult = ''
      element.dataset.testMessage = ''
      element.querySelector('.alpheios-results-text').textContent = ''
    }
  )
})

document.querySelectorAll('[data-test-id]').forEach(
  element => element.querySelector('.alpheios-action-btn').addEventListener(
    'click',
    async (event) => {
      const testId = event.target.closest('.alpheios-test-cont').dataset.testId
      const result = await runTest(testId)
      if (result) {
        document.querySelector(`[data-test-id="${testId}"]`).dataset.testResult = result.outcome
        document.querySelector(`[data-test-id="${testId}"]`).dataset.testMessage = result.message
        if (result.outcome === 'success') {
          document.querySelector(`[data-test-id="${testId}"]`).querySelector('.alpheios-results-text').textContent = '\uD83D\uDC4D Succeeded'
        } else if (result.outcome === 'failure') {
          document.querySelector(`[data-test-id="${testId}"]`).querySelector('.alpheios-results-text').textContent = '\u270B Failed'
        } else if (result.outcome === 'message') {
          document.querySelector(`[data-test-id="${testId}"]`).querySelector('.alpheios-results-text').textContent = result.message
        } else {
          document.querySelector(`[data-test-id="${testId}"]`).querySelector('.alpheios-results-text').textContent = `Unknown outcome: ${result.outcome}`
        }
      }
    })
)
