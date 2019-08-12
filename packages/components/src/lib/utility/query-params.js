export default class QueryParams {
  /**
   * Parses a URL of the current window and return results as a key-value pair object.
   * The key is the name of the query parameter, and the value is the parsed value of the parameter.
   * @return {Object} An object containing parsed parameters.
   */
  static parse () {
    let params = {} // eslint-disable-line prefer-const
    const query = window.location.search.substring(1)
    if (query.length > 0) {
      const queryItems = query.split('&')
      queryItems.forEach((part) => {
        const item = part.split('=')
        params[item[0]] = decodeURIComponent(item[1])
      })
    }
    return params
  }
}
