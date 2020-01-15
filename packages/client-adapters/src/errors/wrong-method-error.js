class WrongMethodError extends Error {
  constructor (category, adapterName, methodName) {
    const message = `Wrong method for ${category}.${adapterName} - ${methodName}`
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.method = methodName
    Error.captureStackTrace(this, WrongMethodError)
  }
}

export default WrongMethodError
