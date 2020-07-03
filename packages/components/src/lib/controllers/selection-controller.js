import UIEventController from '@comp/lib/controllers/ui-event-controller.js'
import HTMLSelector from '@comp/lib/selection/media/html-selector.js'
import { PsEvent } from 'alpheios-data-models'

/**
 * `SelectionController` manages all aspects of text selection.
 */
export default class SelectionController {
  /**
   * @param {Function} getDefaultLangCodeFn - A function that returns a default language code in ISO 639-3 format.
   *        This language code will be used to determine a language if language info is not provided by the page.
   */
  constructor (getDefaultLangCodeFn = () => 'lat') {
    this._evc = new UIEventController()
    /**
     * A function that returns a default language code in ISO 639-3 format.
     * This language code will be used to determine a language if language info is not provided by the page.
     *
     * @type {Function}
     * @private
     */
    this._getDefaultLangCode = getDefaultLangCodeFn
  }

  /**
   * Registers a single text selector.
   *
   * @param {string} selectorName - A name of a text selector. Can be used as a selector reference.
   * @param {string | Node} selector - A CSS selector or an HTML Node element
   *        that define HTML elements on which a selector will be enabled.
   * @param {PointerEvt} event - A constructor of a custom pointer event that will define a selection event.
   * @param {object} eventParams - An object with extra arguments that will be passed to the event constructor.
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  registerSelector (selectorName, selector, event, eventParams) {
    this._evc.registerListener(
      selectorName, selector, this.onTextSelected.bind(this), event, eventParams)
    return this
  }

  /**
   * Replaces an event that was already registered with a new one for a single selector specified by name.
   *
   * @param {string} selectorName - A name of a text selector to replace.
   * @param {PointerEvt} event - A constructor of a custom pointer event that will define a selection event.
   * @param {object} eventParams - An object with extra arguments that will be passed to the event constructor.
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  replaceEvent (selectorName, event, eventParams) {
    this._evc.updateEvent(selectorName, event, eventParams)
    return this
  }

  /**
   * Replaces an event that was already registered with a new one for all registered selectors.
   *
   * @param {PointerEvt} event - A constructor of a custom pointer event that will define a selection event.
   * @param {object} eventParams - An object with extra arguments that will be passed to the event constructor.
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  replaceEventForAll (event, eventParams) {
    this._evc.listenerNames.forEach(name => this.replaceEvent(name, event, eventParams))
  }

  /**
   * Updates event parameters of a single text selector.
   *
   * @param {string} selectorName - A name of a text selector to update.
   * @param {object} eventParams - An object with extra arguments that will be passed to the event constructor.
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  updateParams (selectorName, eventParams) {
    this._evc.updateEventParams(selectorName, eventParams)
    return this
  }

  /**
   * Updates event parameters of all registered text selectors.
   *
   * @param {object} eventParams - An object with extra arguments that will be passed to the event constructor.
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  updateParamsForAll (eventParams) {
    this._evc.listenerNames.forEach(name => this.updateParams(name, eventParams))
    return this
  }

  /**
   * Activates a single text selector.
   *
   * @param {string} selectorName - A name of a text selector to activate.
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  activateSelector (selectorName) {
    this._evc.activateListener(selectorName)
    return this
  }

  /**
   * Activates all registered text selectors.
   *
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  activate () {
    this._evc.activateListeners()
    return this
  }

  /**
   * Deactivates a single text selector.
   *
   * @param {string} selectorName - A name of a text selector to deactivate.
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  deactivateSelector (selectorName) {
    this._evc.deactivateListener(selectorName)
    return this
  }

  /**
   * Deactivates all registered text selectors.
   *
   * @returns {SelectionController} Returns an instance of a controller for chaining.
   */
  deactivate () {
    this._evc.deactivateListeners()
    return this
  }

  /**
   * A text selection event handler.
   *
   * @param {EventElement} event - An event containing information about a text selection.
   * @param {Event} domEvent - A corresponding DOM event.
   */
  onTextSelected (event, domEvent) {
    const defaultLangCode = this._getDefaultLangCode()
    const htmlSelector = new HTMLSelector(event, defaultLangCode)
    const textSelector = htmlSelector.createTextSelector()
    SelectionController.evt.TEXT_SELECTED.pub({ textSelector, domEvent })
  }
}

/**
 * This is a description of a SelectionController event interface.
 */
SelectionController.evt = {
  /**
   * Published when a text is selected.
   * Data: {
   *  {EventElement} event - An event containing information about a text selection.
   *  {Event} domEvent - A corresponding DOM event.
   * }
   */
  TEXT_SELECTED: new PsEvent('Text was selected', SelectionController)
}
