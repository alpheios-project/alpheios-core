export default {
  getters: {
    /**
     * Returns a current locale of L10n.
     * @return {string} - A current locale
     */
    isInProgress: function () {
      return this.$store.state.lexQuery.inProgress
    }
  },

  getterMethods: {

  },

  mutations: {
    /**
     * Sets locale of L10n to a new value.
     */
    startQuery: function () {
      return this.$store.commit('l10n/startQuery')
    }
  },

  actions: {}
}
