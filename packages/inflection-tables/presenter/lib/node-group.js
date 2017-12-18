/**
 * Stores group data during feature tree construction.
 */
export default class NodeGroup {
  /**
   * Creates feature group data structures.
   */
  constructor () {
    this.subgroups = [] // Each value of the feature
    this.cells = [] // All cells within this group and below
    this.parent = undefined
    this.header = undefined

    this.groupFeatureType = undefined // Defines a feature type that forms a tree level this node is in.
    this.ancestorFeatures = undefined // Defines feature values of this node's parents.
  }
}
