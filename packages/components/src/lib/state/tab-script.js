import UIStateAPI from '@/lib/state/ui-state-api.js'
import Tab from '@/lib/state/tab.js'
/**
 * Contains a state of a tab (page) content script.
 * @property {Number} tabID - An ID of a tab where the content script is loaded
 * @property {Symbol} status - A status of a current script (Active, Deactivated, Pending)
 * @property {panelStatus} panelStatus
 */
export default class TabScript extends UIStateAPI {
  constructor (tabObj) {
    super()
    this.tabID = tabObj ? tabObj.uniqueId : undefined
    this.tabObj = tabObj
    this.status = undefined
    this.panelStatus = undefined
    this.tab = undefined
    this.embedLibStatus = undefined // Whether an Alpheios embedded lib is active within a tab
    this.uiActive = false

    this.watchers = new Map()
  }

  updateTabObject (tabId, windowId) {
    this.tabObj = new Tab(tabId, windowId)
    this.tabID = this.tabObj.uniqueId
    return this
  }

  deattach () {
    this.tabObj.deattach()
  }

  attach (newWinId) {
    this.tabObj.attach(newWinId)
  }

  get isDeattached () {
    return this.tabObj.isDeattached
  }

  static get propTypes () {
    return {
      NUMERIC: Symbol('Numeric'),
      STRING: Symbol('String'),
      SYMBOL: Symbol('Symbol')
    }
  }

  static get props () {
    return {
      status: {
        name: 'status',
        valueType: TabScript.propTypes.SYMBOL,
        values: {
          PENDING: Symbol.for('Alpheios_Status_Pending'), // Content script has not been fully initialized yet
          ACTIVE: Symbol.for('Alpheios_Status_Active'), // Content script is loaded and active
          DEACTIVATED: Symbol.for('Alpheios_Status_Deactivated'), // Content script has been loaded, but is deactivated
          DISABLED: Symbol.for('Alpheios_Status_Disabled') // Content script has been loaded, but it is disabled
        },
        defaultValueIndex: 0
      },
      embedLibStatus: {
        name: 'embedLibStatus',
        valueType: TabScript.propTypes.SYMBOL,
        values: this.statuses.embedLib,
        defaultValueIndex: 1
      },
      panelStatus: {
        name: 'panelStatus',
        valueType: TabScript.propTypes.SYMBOL,
        values: {
          OPEN: Symbol.for('Alpheios_Status_PanelOpen'), // Panel is open
          CLOSED: Symbol.for('Alpheios_Status_PanelClosed'), // Panel is closed
          DEFAULT: Symbol.for('Alpheios_Status_PanelDefault') // Panel should set its state according to default values
        },
        defaultValueIndex: 1
      },
      tab: {
        name: 'tab',
        valueType: TabScript.propTypes.STRING,
        values: {
          INFO: 'info',
          DEFAULT: 'default' // A tab should be set according to default values
        },
        defaultValueIndex: 0
      },
      uiActive: {
        name: 'uiActive',
        valueType: Boolean
      }
    }
  }

  static get symbolProps () {
    return [TabScript.props.status.name, TabScript.props.embedLibStatus.name, TabScript.props.panelStatus.name]
  }

  static get stringProps () {
    return [TabScript.props.tab.name]
  }

  static get booleanProps () {
    return []
  }

  /**
   * Only certain features will be stored within a serialized version of a TabScript. This is done
   * to prevent context-specific features (such as local event handlers) to be passed over the network
   * to a different context where they would make no sense. This getter returns a list of such fields.
   * @return {String[]}
   */
  static get dataProps () {
    return TabScript.symbolProps.concat(TabScript.stringProps).concat(TabScript.booleanProps)
  }

  /**
   * A copy constructor.
   * @param {TabScript} source - An instance of TabScript object we need to copy.
   * @return {TabScript} A copy of a source object.
   */
  static create (source) {
    let copy = new TabScript() // eslint-disable-line prefer-const
    for (const key of Object.keys(source)) {
      copy[key] = source[key]
    }
    return copy
  }

  static get defaults () {
    return {
      status: TabScript.statuses.script.ACTIVE,
      panelStatus: TabScript.statuses.panel.OPEN
    }
  }

  static get statuses () {
    return {
      script: {
        PENDING: Symbol.for('Alpheios_Status_Pending'), // Content script has not been fully initialized yet
        ACTIVE: Symbol.for('Alpheios_Status_Active'), // Content script is loaded and active
        DEACTIVATED: Symbol.for('Alpheios_Status_Deactivated'), // Content script has been loaded, but is deactivated
        DISABLED: Symbol.for('Alpheios_Status_Disabled') // Content script has been disabled on a page and cannot be activated (due to incompatibility with a page content)
      },
      embedLib: {
        ACTIVE: Symbol.for('Embedded_Lib_Status_Active'), // Embedded Lib is present on a page and is activated
        INACTIVE: Symbol.for('Embedded_Lib_Status_Inactive') // Embedded Lib not loaded or is inactive
      },
      panel: {
        OPEN: Symbol.for('Alpheios_Status_PanelOpen'), // Panel is open
        CLOSED: Symbol.for('Alpheios_Status_PanelClosed'), // Panel is closed
        DEFAULT: Symbol.for('Alpheios_Status_PanelDefault') // Panel should set its state according to default values
      }
    }
  }

  /**
   * Sets a watcher function that is called every time a property is changed using a setItem() method.
   * @param {String} property - A name of a property that should be monitored
   * @param {Function} watchFunc - A function that will be called every time a property changes
   * @return {TabScript} Reference to self for chaining
   */
  setWatcher (property, watchFunc) {
    this.watchers.set(property, watchFunc)
    return this
  }

  /**
   * SetItem provides a monitored way to change a TabScript state. If value is assigned to a data property directly
   * there is no way to know if a property was changed. However, if a property was changed using setItem() method,
   * and if there is a watcher function registered for a changed property name,
   * this function will be called on every property change, passing a changed property name as an argument.
   * @param key
   * @param value
   * @return {TabScript}
   */
  setItem (key, value) {
    this[key] = value
    if (this.watchers && this.watchers.has(key)) {
      this.watchers.get(key)(key, this)
    }
    return this
  }

  isEmbedLibActive () {
    return this.embedLibStatus === TabScript.statuses.embedLib.ACTIVE
  }

  setEmbedLibActiveStatus () {
    this.setItem('embedLibStatus', TabScript.statuses.embedLib.ACTIVE)
    return this
  }

  setEmbedLibInactiveStatus () {
    this.setItem('embedLibStatus', TabScript.statuses.embedLib.INACTIVE)
    return this
  }

  setEmbedLibStatus (isActive) {
    if (isActive) {
      this.setItem('embedLibStatus', TabScript.statuses.embedLib.ACTIVE)
    } else {
      this.setItem('embedLibStatus', TabScript.statuses.embedLib.INACTIVE)
    }
  }

  isPanelOpen () {
    return this.panelStatus === TabScript.statuses.panel.OPEN
  }

  isPanelClosed () {
    return this.panelStatus === TabScript.statuses.panel.CLOSED
  }

  setPanelOpen () {
    this.setItem('panelStatus', TabScript.statuses.panel.OPEN)
    return this
  }

  setPanelClosed () {
    this.setItem('panelStatus', TabScript.statuses.panel.CLOSED)
    return this
  }

  setPanelDefault () {
    this.setItem('panelStatus', TabScript.statuses.panel.DEFAULT)
    return this
  }

  isPanelStateDefault () {
    return this.panelStatus === TabScript.statuses.panel.DEFAULT
  }

  isPanelStateValid () {
    return (
      this.panelStatus === TabScript.statuses.panel.OPEN ||
      this.panelStatus === TabScript.statuses.panel.CLOSED
    )
  }

  setTabDefault () {
    this.setItem('tab', TabScript.props.tab.values.DEFAULT)
    return this
  }

  isTabStateDefault () {
    return this.tab === TabScript.props.tab.values.DEFAULT
  }

  hasSameID (tabID) {
    return Symbol.keyFor(this.tabID) === Symbol.keyFor(tabID)
  }

  isActive () {
    return this.status === TabScript.statuses.script.ACTIVE
  }

  isDeactivated () {
    return this.status === TabScript.statuses.script.DEACTIVATED
  }

  isDisabled () {
    return this.status === TabScript.statuses.script.DISABLED
  }

  isPending () {
    return this.status === TabScript.statuses.script.PENDING
  }

  uiIsActive () {
    return this[TabScript.props.uiActive.name]
  }

  activate () {
    this.status = TabScript.statuses.script.ACTIVE
    return this
  }

  deactivate () {
    this.status = TabScript.statuses.script.DEACTIVATED
    return this
  }

  disable () {
    this.status = TabScript.statuses.script.DISABLED
    return this
  }

  activateUI () {
    this.setItem(TabScript.props.uiActive.name, true)
    return this
  }

  changeTab (tabName) {
    this.setItem(TabScript.props.tab.name, tabName)
    return this
  }

  update (source) {
    for (const key of Object.keys(source)) {
      if (source[key]) {
        this[key] = source[key]
      }
    }
    return this
  }

  /**
   * Compares the current state with a targetState. A targetState is a state to where the current state should transform.
   * If any field value in the state is undefined, it means that there is no transformation goal for this field
   * (i.e we don't care about it value). Because of this, we will not include such fields into a diff result.
   * @param targetState
   * @return {{_changedKeys: Array, _changedEntries: Array}}
   */
  diff (targetState) {
    let diff = { // eslint-disable-line prefer-const
      _changedKeys: [],
      _changedEntries: []
    }

    // Check if there are any differences in tab IDs

    if (this.tabID !== targetState.tabID) {
      diff.tabID = targetState.tabID
      diff['_changedKeys'].push('tabID')
      diff['_changedEntries'].push(['tabID', targetState.tabID])
    }

    for (const key of Object.keys(targetState)) {
      // Build diffs only for data properties
      if (TabScript.dataProps.includes(key)) {
        if (this.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
          if (this[key] && targetState[key] && this[key] !== targetState[key]) {
            diff[key] = targetState[key]
            diff['_changedKeys'].push(key)
            diff['_changedEntries'].push([key, targetState[key]])
          }
        }
      }
    }

    diff.keys = function () {
      return diff['_changedKeys']
    }

    diff.entries = function () {
      return diff['_changedEntries']
    }

    diff.has = function (prop) {
      return diff._changedKeys.includes(prop)
    }

    diff.isEmpty = function () {
      return !diff._changedKeys.length
    }
    return diff
  }

  /**
   * Creates a serializable copy of a source object. Firefox uses the structured clone algorithm
   * (https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) to serialize objects.
   * Requirements of this algorithm are that a serializable object to have no Function or Error properties,
   * neither any DOM Nodes. That's why an empty serializable object is created and only
   * selected properties are copied into it.
   * @param {TabScript} source - An object to be serialized.
   * @return {Object} A serializable copy of a source.
   */
  static serializable (source) {
    let serializable = {} // eslint-disable-line prefer-const
    serializable.tabID = (typeof source.tabID === 'symbol') ? Symbol.keyFor(source.tabID) : source.tabID
    serializable.tabObj = source.tabObj ? source.tabObj.clone() : undefined

    for (const key of Object.keys(source)) {
      if (TabScript.dataProps.includes(key)) {
        /*
        Only certain features will be stored within a serialized version of a TabScript. This is done
        to prevent context-specific features (such as local event handlers) to be passed over the network
        to a different context where they would make no sense.
         */
        const value = source[key]
        serializable[key] = (typeof value === 'symbol') ? Symbol.keyFor(value) : value
      }
    }
    return serializable
  }

  static readObject (jsonObject) {
    const tabObj = (jsonObject.tabObj && jsonObject.tabObj.tabId && jsonObject.tabObj.windowId) ? new Tab(jsonObject.tabObj.tabId, jsonObject.tabObj.windowId, jsonObject.tabObj.status) : undefined
    let tabScript = new TabScript(tabObj) // eslint-disable-line prefer-const

    for (const prop of TabScript.symbolProps) {
      // Do not read empty or missing values
      if (jsonObject[prop]) {
        tabScript[prop] = Symbol.for(jsonObject[prop])
      }
    }

    for (const prop of TabScript.stringProps) {
      // Do not read empty or missing values
      if (jsonObject[prop]) {
        tabScript[prop] = jsonObject[prop]
      }
    }

    for (const prop of TabScript.booleanProps) {
      if (jsonObject.hasOwnProperty(prop)) { tabScript[prop] = jsonObject[prop] } // eslint-disable-line no-prototype-builtins
    }
    return tabScript
  }
}
