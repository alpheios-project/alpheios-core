class AdapterError extends Error {
  constructor (category, adapterName, methodName, messageError) {
    let message = messageError
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName

    if (this.adapter && this.methodName) {
      this.message = `${this.message} (${this.adapter}.${this.methodName})`
    }
    Error.captureStackTrace(this, AdapterError)
  }

  update (config) {
    this.adapter = `${config.category}.${config.adapterName}`
    this.methodName = config.method

    this.message = `${this.message} (${this.adapter}.${this.methodName})`
    return this
  }
}

export default AdapterError