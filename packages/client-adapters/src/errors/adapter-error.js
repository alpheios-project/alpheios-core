class AdapterError extends Error {
  constructor (category, adapterName, methodName, messageError) {
    super(messageError)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName

    if (this.adapter && this.methodName) {
      this.message = `${this.message} (${this.adapter}.${this.methodName})`
    }
    try {
      Error.captureStackTrace(this, AdapterError)
    } catch (e) {
      // Continue if environment does not support captureStackTrace.
    }
  }
}

export default AdapterError
