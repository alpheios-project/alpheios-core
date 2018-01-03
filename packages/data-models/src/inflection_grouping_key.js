class InflectionGroupingKey {
  /**
   * @constructor
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {Map} extras extra property name and value pairs used in the key
   */
  constructor (infl, features, extras = {}) {
    for (let feature of features) {
      this[feature] = infl[feature]
    }
    Object.assign(this, extras)
  }

  /**
   * checks if a feature with a specific value
   * is included in the grouping key
   * @returns {boolean} true if found, false if not
   */
  hasFeatureValue (feature, value) {
    for (let f of this[feature]) {
      if (f.hasValue(value)) {
        return true
      }
    }
    return false
  }

  /**
   * Return this key as a string
   * @returns {string} string representation of the key
   */
  toString () {
    let values = []
    for (let prop of Object.getOwnPropertyNames(this).sort()) {
      if (Array.isArray(this[prop])) {
        values.push(this[prop].map((x) => x.toString()).sort().join(','))
      } else {
        values.push(this[prop])
      }
    }
    return values.join(' ')
  }
}

export default InflectionGroupingKey
