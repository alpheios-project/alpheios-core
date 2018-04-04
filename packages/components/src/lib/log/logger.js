/**
 * A simple proxy for the console log functionality
 */
export default class Logger {
  /**
   * get a proxied logger object
   * (if not in verbose mode, only errors will be allowed through)
   * @param {boolean} verbose - set to true for verbose logging
   */
  static getLogger (verbose = false) {
    return {
      log: (...data) => {
        if (verbose) {
          console.log(...data)
        }
      },
      warn: (...data) => {
        if (verbose) {
          console.warn(...data)
        }
      },
      error: (...data) => {
        console.error(...data)
      },
      info: (...data) => {
        if (verbose) {
          console.info(...data)
        }
      }
    }
  }
}
