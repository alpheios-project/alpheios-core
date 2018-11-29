class AdapterError extends Error {
  constructor (category, adapterName, methodName, messageError) {
    let message = `${messageError} for ${category}.${adapterName} - ${methodName}`
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    Error.captureStackTrace(this, AdapterError)
  }
}

export default AdapterError
