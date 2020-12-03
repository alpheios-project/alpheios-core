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

  /**
   * @deprecated
   * This method is obsolete. It will be removed in future versions.
   * No replacement for its functionality has been provided as it is not used anywhere.
   */
  update (config) {
    this.adapter = `${config.category}.${config.adapterName}`
    this.methodName = config.method

    this.message = `${this.message} (${this.adapter}.${this.methodName})`
    return this
  }
}

export default AdapterError
