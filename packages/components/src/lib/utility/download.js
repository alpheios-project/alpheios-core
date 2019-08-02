export default class Download {
  static collectionToCSV (delimiter, keys = []) {
    return (collection = []) => {
      const headers = keys.map(key => `${key}`).join(delimiter)
      const extractKeyValues = record => keys.map(key => `${record[key]}`).join(delimiter)

      return collection.reduce((csv, record) => {
        return (`${csv}\n${extractKeyValues(record)}`).trim()
      }, headers)
    }
  }

  static downloadBlob (data, filename) {
    const blob = new Blob([data], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = filename || 'download'
    document.getElementById('alpheios-panel-inner').appendChild(a)
    a.click()
    a.remove()
    return true
  }
}
