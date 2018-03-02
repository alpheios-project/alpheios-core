/**
 * Interface for a State Object to manage Alpheios UI State
 */
export default class UIStateAPI {
  /**
   * Method to use to set a general property on the state
   * @param key
   * @param value
   * @return {UIStateAPI}
   */
  setItem (key, value) {
    throw new Error('Unimplemented')
  }

  /**
   * Sets a watcher function that is called every time a property is changed using a setItem() method.
   * @param {String} property - A name of a property that should be monitored
   * @param {Function} watchFunc - A function that will be called every time a property changes
   * @return {State} Reference to self for chaining
   */
  setWatcher (property, watchFunc) {
    throw new Error('Unimplemented')
  }

  /**
   * Check if the state of the panel is open
   * @return {boolean} true if open false if closed
   */
  isPanelOpen () {
    return false
  }

  /**
   * Check if the state of the panel is closed
   * @return {boolean} true if closed false if open
   */
  isPanelClosed () {
    return false
  }

  /**
   * Set the state of the panel to open
   * @return {UIStateAPI} the updated state object
   */
  setPanelOpen () {
    console.log('setPanelOpen is not implemented')
    return this
  }

  /**
   * Set the state of the panel to closed
   * @return {UIStateAPI} the updated state object
   */
  setPanelClosed () {
    console.log('setPanelClosed is not implemented')
    return this
  }

  /**
   * Check if the state of the UI is active (i.e. fully loaded and ready to use)
   * @return {boolean} true if active false if not
   */
  uiIsActive () {
    return false
  }

  /**
   * Set the state of the UI to active (i.e. fully loaded and ready to use)
   * @return {IState} the updated state object
   */
  activateUI () {
    console.log('activateUI is not implemented')
    return this
  }

  /**
   * Set the currently active panel tab
   * @param {String} tabName name of the tab
   * @return {UIStateAPI} the updated state object
   */
  changeTab (tabName) {
    console.log('changeTab is not implemented')
    return this
  }
}
