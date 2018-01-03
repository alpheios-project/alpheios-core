class InflectionGroup {
  /**
   * A group of inflections or groups of inflections
   *
   * @param {InflectionGroupingKey} groupingKey features of the inflections in the group
   * @param {Inflection[]|InflectionGroup[]} inflections array of Inflections or InflectionGroups in this group
   */
  constructor (groupingKey, inflections = [], sortKey = null) {
    this.groupingKey = groupingKey
    this.inflections = inflections
  }

  /**
   * Add an Inflection or InflectionGroup to the group
   * @param {Inflection|InflectionGroup} inflection
   */
  append (inflection) {
    this.inflections.push(inflection)
  }
}
export default InflectionGroup
