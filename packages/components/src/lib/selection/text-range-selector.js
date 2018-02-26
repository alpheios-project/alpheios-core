// import TextSelector from './text-selector'

export default class TextRangeSelector {
  constructor () {
    this.ranges = []
  }

  get text () {

  }

  appendRange (textSelector) {
    this.ranges.push(textSelector)
  }

  isEmpty () {
    return this.ranges.length === 0
  }

  isMultiRange () {
    return this.ranges.length > 1
  }
}
