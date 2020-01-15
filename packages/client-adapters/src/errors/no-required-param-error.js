class NoRequiredParamError extends Error {
  constructor (category, adapterName, methodName, paramName) {
    const message = `There is no required parameter - ${paramName} for ${category}.${adapterName} - ${methodName}`
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.paramName = paramName
    Error.captureStackTrace(this, NoRequiredParamError)
  }
}

export default NoRequiredParamError
