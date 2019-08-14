/**
 * A single option item with access methods.
 */
export default class OptionItem {
  constructor (item, key, storageAdapter) {
    if (!item) {
      throw new Error(`Item cannot be empty`)
    }
    if (!key) {
      throw new Error(`Key cannot be empty`)
    }
    if (!storageAdapter) {
      throw new Error(`Storage adapter object should be provided`)
    }
    for (const key of Object.keys(item)) {
      this[key] = item[key]
    }
    this.currentValue = this.defaultValue
    this.name = key
    this.storageAdapter = storageAdapter
  }

  textValues () {
    return this.values.map(value => value.text)
  }

  /**
   * If `prop` is not specified, returns a value object of a current item.
   * Otherwise, returns a value of a property specified by `prop`.
   * @param {string} prop - A name of a property of a current items that must be returned.
   *        Values currently supported are: `text`, `value`, undefined.
   * @return {* | Array<*>} - A single item or an array of items. Item type depends
   * on the value of the `prop` or the lack of it.
   */
  currentItem (prop = undefined) {
    let item = []
    for (const value of this.values) {
      if (this.multiValue) {
        if (this.currentValue.includes(value.value)) {
          const itemValue = prop ? value[prop] : value
          item.push(itemValue)
        }
      } else {
        if (value.value === this.currentValue) {
          item = prop ? value[prop] : value
        }
      }
    }
    return item
  }

  currentTextValue () {
    return this.currentItem('text')
  }

  addValue (value, text) {
    this.values.push({ value: value, text: text })
    return this
  }

  setValue (value) {
    this.currentValue = value
    this.save()
    return this
  }

  setTextValue (textValue) {
    this.currentValue = this.multiValue ? [] : ''
    for (const value of this.values) {
      if (this.multiValue) {
        for (const tv of textValue) {
          if (value.text === tv) { this.currentValue.push(value.value) }
        }
      } else {
        if (value.text === textValue) { this.currentValue = value.value }
      }
    }
    this.save()
    return this
  }

  removeItem () {
    this.currentValue = null
    this.storageAdapter.remove(this.name).then(
      () => {
        // Options storage succeeded
      },
      (errorMessage) => {
        console.error(`Unexpected error resetting Alpheios option ${this.name}: ${errorMessage}`)
      }
    )
  }

  /**
   * Saves an option value to the local storage.
   */
  save () {
    let option = {} // eslint-disable-line prefer-const
    option[this.name] = JSON.stringify(this.currentValue)

    this.storageAdapter.set(option).then(
      () => {
        // Options storage succeeded
      },
      (errorMessage) => {
        console.error(`Unexpected error storing Alpheios option ${this.name}: ${errorMessage}`)
      }
    )
  }
}
