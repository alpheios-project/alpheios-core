import Feature from './feature.js'

class InflectionGroupingKey {
  /**
   * @class
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {object} extras extra property name and value pairs used in the key
   */
  constructor (infl, features, extras = {}) {
    for (const feature of features) {
      this[feature] = infl[feature]
    }
    Object.assign(this, extras)
  }

  /**
   * checks if a feature with a specific value
is included in the grouping key
   *
   * @returns {boolean} true if found, false if not
   * @param feature
   * @param value
   */
  hasFeatureValue (feature, value) {
    if (this.hasOwnProperty(feature)) { // eslint-disable-line no-prototype-builtins
      return this[feature].values.includes(value)
    }
    return false
  }

  /**
   * Return this key as a string
   *
   * @returns {string} string representation of the key
   */
  toString () {
    let values = [] // eslint-disable-line prefer-const
    for (const prop of Object.getOwnPropertyNames(this).sort()) {
      // A prop can be either a Feature object, or a one of the extras of a string type
      const value = (this[prop] instanceof Feature) ? this[prop].values.sort().join(',') : this[prop]
      values.push(value)
    }
    return values.join(' ')
  }
}

export default InflectionGroupingKey
