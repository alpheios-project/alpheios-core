export default class RemoteError extends Error {
  constructor (category, adapterName, methodName, errorCode, errorMessage) {
    super(errorMessage)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.errorCode = errorCode
  }

  update (config) {
    this.adapter = `${config.category}.${config.adapterName}`
    this.methodName = config.method

    this.message = `${this.errorCode}: ${this.message} (${this.adapter}.${this.methodName})`
    return this
  }
}
