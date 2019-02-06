export default {
  /**
   * Verify Vuex store module dependencies of UI components.
   * The Vuex store modules that the UI component is dependent upon must be listed
   * as a `storeModules` custom property array:
   *     storeModules: ['moduleOne', 'moduleTwo']
   */
  beforeCreate: function () {
    if (this.$options.storeModules) {
      const missingDependencies = this.$options.storeModules.filter(d => !this.$store.state.hasOwnProperty(d))
      if (missingDependencies.length > 0) {
        throw new Error(`Cannot create a ${this.$options.name} Vue component because the following dependencies are missing: ${missingDependencies}`)
      }
    }
  }
}
