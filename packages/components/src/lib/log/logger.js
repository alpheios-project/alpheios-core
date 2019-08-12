let singleInstance

// TODO: We should maybe try to capture the file name and the line number, if possible

/**
 * A simple proxy for the console log functionality
 */
export default class Logger {
  /**
   * Creates an instance of the Logger class with the parameters specified.
   *
   * @param {boolean} verbose - In verbose mode, messages will be printed on all levels (err, warn. log, info).
   *                            In non-verbose mode, only error messages will be displayed.
   * @param {boolean} prepend - Whether to prepend text messages with the alpheios message.
   * @param {boolean} trace - Whether to print a call stack.
   */
  constructor ({ verbose = false, prepend = true, trace = false } = {}) {
    this._verboseMode = verbose
    this._prependMode = prepend
    this._traceMode = trace
  }

  /**
   * Returns a single instance of the Logger object. If one does not exist, it will be created
   * with the options specified. If the Logger instance is already created, but there are some
   * options provided, options of the existing Logger object will be changed to match the ones supplied.
   *
   * @param {object} options - Options of the Logger constructor {@see Logger#constructor}.
   * @returns {Logger} - An instance of existing or newly created Logger object.
   */
  static getInstance (options = {}) {
    if (!singleInstance) {
      singleInstance = new Logger(options)
    } else {
      // There is an instance of the Logger already created, but we might need to change its parameters
      // It will be done only if the caller provided meaningful values to options' props
      if (typeof options.verbose !== 'undefined') {
        console.info(`Setting a verbose mode`)
        singleInstance.setVerboseMode(options.verbose)
      }
      if (typeof options.prepend !== 'undefined') {
        console.info(`Setting a prepend mode`)
        singleInstance.setVerboseMode(options.prepend)
      }
      if (typeof options.trace !== 'undefined') {
        console.info(`Setting a trace mode`)
        singleInstance.setTraceMode(options.trace)
      }
    }
    return singleInstance
  }

  setVerboseMode (mode) {
    this._verboseMode = mode
    return this
  }

  setPrependMode (mode) {
    this._prependMode = mode
    return this
  }

  setTraceMode (mode) {
    this._traceMode = mode
    return this
  }

  verboseModeOn () {
    this.setVerboseMode(true)
    return this
  }

  verboseModeOff () {
    this.setVerboseMode(false)
    return this
  }

  prependModeOn () {
    this.setPrependMode(true)
    return this
  }

  prependModeOff () {
    this.setPrependMode(false)
    return this
  }

  traceModeOn () {
    this.setTraceMode(true)
    return this
  }

  traceModeOff () {
    this.setTraceMode(false)
    return this
  }

  error (...data) {
    if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
      data[0] = `Alpheios error: ${data[0]}`
    }
    console.error(...data)
    if (this._traceMode) {
      console.trace()
    }
  }

  warn (...data) {
    if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
      data[0] = `Alpheios warn: ${data[0]}`
    }
    if (this._verboseMode) {
      console.warn(...data)
      if (this._traceMode) {
        console.trace()
      }
    }
  }

  log (...data) {
    if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
      data[0] = `Alpheios log: ${data[0]}`
    }
    if (this._verboseMode) {
      console.log(...data)
      if (this._traceMode) {
        console.trace()
      }
    }
  }

  info (...data) {
    if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
      data[0] = `Alpheios info: ${data[0]}`
    }
    if (this._verboseMode) {
      console.info(...data)
      if (this._traceMode) {
        console.trace()
      }
    }
  }
}
