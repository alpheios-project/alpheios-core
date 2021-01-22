/**
 A warning represents a problem that is less severe than an error.
 In case of an error the problem that caused it cannot be ignored and,
 because of that, the normal execution of the workflow is impossible.
 The warning, in contrast, represents a issue that is important enough to be noticed,
 but that does not, on itself, prevent the code from being executed normally.
 */
export default class AdapterWarning extends Error {
  /**
   * @param {string} category
   * @param {string} adapterName - The name of the client adapter where the warning was originated.
   * @param {string} methodName - The name of the method from where the warning came from.
   * @param {string} errorCode - A short string representing the alphanumeric error code, such as `SOME_DATA_MISSING`
   * @param errorMessage
   */
  constructor (category, adapterName, methodName, errorCode, errorMessage) {
    super(errorMessage)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.errorCode = errorCode
  }
}
