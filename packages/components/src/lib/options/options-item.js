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

  currentTextValue () {
    let currentTextValue = []
    for (let value of this.values) {
      if (this.multiValue) {
        if (this.currentValue.includes(value.value)) { currentTextValue.push(value.text) }
      } else {
        if (value.value === this.currentValue) {
          currentTextValue = value.text
        }
      }
    }
    return currentTextValue
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
    for (let value of this.values) {
      if (this.multiValue) {
        for (let tv of textValue) {
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
        console.log(`Item "${this.name}" was removed from storage successfully`)
      },
      (errorMessage) => {
        console.error(`Removeing an option failed: ${errorMessage}`)
      }
    )
  }

  /**
   * Saves an option value to the local storage.
   */
  save () {
    let option = {}
    option[this.name] = JSON.stringify(this.currentValue)

    this.storageAdapter.set(option).then(
      () => {
        // Options storage succeeded
        console.log(`Value "${this.currentValue}" of "${this.name}" option value was stored successfully`)
      },
      (errorMessage) => {
        console.error(`Storage of an option value failed: ${errorMessage}`)
      }
    )
  }
}
