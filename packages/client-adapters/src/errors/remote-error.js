export default class RemoteError extends Error {
  constructor (category, adapterName, methodName, errorCode, errorMessage) {
    super(errorMessage)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.errorCode = errorCode
  }
}
