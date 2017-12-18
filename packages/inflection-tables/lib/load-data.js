/**
 * Load text data form an external fil with an asynchronous XHR request.
 * @param {string} filePath - A path to a file we need to load.
 * @returns {Promise} - A promise that will be resolved with either
 * file content (a string) in case of success of with a status message
 * in case of failure.
 */
let loadData = function loadData (filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new window.XMLHttpRequest()
    xhr.open('GET', filePath)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}
export default loadData
