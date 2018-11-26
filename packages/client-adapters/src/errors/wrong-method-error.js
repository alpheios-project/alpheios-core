class WrongMethodError extends Error {
  constructor (message, adapter) {
    super(message)
    this.adapter = adapter
    Error.captureStackTrace(this, WrongMethodError)
  }
}

export default WrongMethodError
