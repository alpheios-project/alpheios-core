/**
 * An auxiliary utility class to provide HTML page, window, and document related functionality.
 */
export default class HTMLPage {
  /**
   * Checks whether the current window has an frames in it.
   * @returns {boolean}
   */
  static get hasFrames () {
    return (window.frames.length > 0)
  }

  /**
   * Checks whether the current window is a frame itself.
   * @returns {boolean}
   */
  static get isFrame () {
    return (window.self !== window.top)
  }

  /**
   * Checks whether the current window is at the top level of window hierarchy.
   * @returns {boolean}
   */
  static get isAtTop () {
    return (window.self === window.top)
  }
}
