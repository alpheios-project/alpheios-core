export default class LexicalDataResult {
  constructor (dataType) {
    if (!dataType) {
      throw new Error('LexicalDataResult cannot be created without a data type')
    }

    this.dataType = dataType
    this.state = {
      loading: false,
      available: false,
      failed: false
    }
    this.data = undefined
    this.errors = []
  }
}
