/* eslint-env node, jasmine */
describe('Alpheios messaging service: ', () => {
  const URL = 'http://localhost:8100'

  it('http-server should be running and a test page should be loaded', () => {
    browser.url(URL)
    expect(browser).toHaveTitle('Alpheios Messaging Test Page')
  })

  it('should be able to send a standard message and receive a response', () => {
    const testId = 'standard-request'
    browser.url(URL)
    const button = $(`[data-test-id="${testId}"] .alpheios-action-btn`)
    button.click()
    const resultEl = $(`[data-test-id="${testId}"]`)
    expect(resultEl).toHaveAttrContaining('data-test-result', 'success')
  })

  it('should handle a timout properly', () => {
    const testId = 'timeout'
    browser.url(URL)
    const button = $(`[data-test-id="${testId}"] .alpheios-action-btn`)
    button.click()
    const resultEl = $(`[data-test-id="${testId}"]`)
    expect(resultEl).toHaveAttrContaining('data-test-result', 'success')
  })

  it('receiving side should handle unsupported messages correctly: {}', () => {
    const testId = 'non-alpheios-message-a'
    browser.url(URL)
    const button = $(`[data-test-id="${testId}"] .alpheios-action-btn`)
    button.click()
    const resultEl = $(`[data-test-id="${testId}"]`)
    expect(resultEl).toHaveAttrContaining('data-test-result', 'message')
  })

  it('receiving side should handle unsupported messages correctly: { type: "Unsupported" }', () => {
    const testId = 'non-alpheios-message-b'
    browser.url(URL)
    const button = $(`[data-test-id="${testId}"] .alpheios-action-btn`)
    button.click()
    const resultEl = $(`[data-test-id="${testId}"]`)
    expect(resultEl).toHaveAttrContaining('data-test-result', 'message')
  })

  it('sending side should handle unsupported messages correctly: {}', () => {
    const testId = 'non-alpheios-message-c'
    browser.url(URL)
    const button = $(`[data-test-id="${testId}"] .alpheios-action-btn`)
    button.click()
    const resultEl = $(`[data-test-id="${testId}"]`)
    expect(resultEl).toHaveAttrContaining('data-test-result', 'message')
  })

  it('sending side should handle unsupported messages correctly: { type: "Unsupported" }', () => {
    const testId = 'non-alpheios-message-d'
    browser.url(URL)
    const button = $(`[data-test-id="${testId}"] .alpheios-action-btn`)
    button.click()
    const resultEl = $(`[data-test-id="${testId}"]`)
    expect(resultEl).toHaveAttrContaining('data-test-result', 'message')
  })
})
