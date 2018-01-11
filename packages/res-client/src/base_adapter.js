/**
 * Base Adapter Class for a Resource Service
 */
class BaseResourceAdapter {
  /**
   * get resources from the provider
   * @param {Object} keyObj the object containing the data for lookup
   * @return {Object[]} an array of results
   */
  async getResources (keyObj) {
    return []
  }

  static getProviders (lang) {
    return new Map()
  }
}

export default BaseResourceAdapter
