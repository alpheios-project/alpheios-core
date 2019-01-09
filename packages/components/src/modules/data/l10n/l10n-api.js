/**
 * This is a public API of a L10n data module.
 * It lists all public methods that can be used to access module's data
 * or to perform any actions that are available on a module.
 * A data consumer (usually a UI component) should import a modules API
 * before using it and map it to its computed properties or methods objects.
 *
 * Example:
 *    `import L10nAPI from 'l10n-api.js'`
 *
 * ```
 * methods: {
 *    ...
 *    message: L10nAPI.getterMethods.getMessage
 *    ...
 * }
 * ```
 * This maps `getMessage` method from a `getterMethods` API group
 * to a `message` method of a component.
 *
 * Gathering all public API of a module in one file provides a clear picture of what
 * methods are exposed by a module.
 * It also allows to analyze what data consumers are using this API by tracking
 * API import statements within the code.
 */

export default {
  /**
   * Getters section groups methods for module data access.
   * All these methods has no parameters.
   * They should be mounted to the `computed` object of the UI component.
   *
   * Example:
   * ```
   * computed: {
   *    ...
   *    internalMethodName: L10nAPI.getters.apiMethod
   *    ...
   * }
   * ```
   *
   * Getters with parameters can also be listed here. In that case they should be defined as:
   * `getMessage: function () { return this.$store.getters['l10n/getMessage'] }`
   * However, a requirement that hey need to have no parameters forces them to return a function that will
   * take some parameters instead (@see {@link https://vuex.vuejs.org/guide/getters.html#method-style-access}).
   * This prevents from describing their "real" parameters here as those are hidden.
   * Functions with parameters are function-like, but, if defined like above,
   * should be mounted as computed props. This is confusing.
   * That's why getters with parameters are separated into a `GetterMethods` group,
   * where they are defined as more "normal" functions.
   */
  getters: {
    /**
     * Returns a current locale of L10n.
     * @return {string} - A current locale
     */
    getLocale: function () {
      return this.$store.state.l10n.selectedLocale
    }
  },

  /**
   * Getters with parameters behave like methods.
   * They should be mounted to the `mounted` object of the UI component.
   * Example:
   * ```
   * methods: {
   *    ...
   *    internalMethodName: L10nAPI.getterMethods.apiMethod
   *    ...
   * }
   * ```
   */
  getterMethods: {
    /**
     * Returns a translated string for its message ID given.
     * @param {string} messageID - A message ID of a string to retrieve.
     * @return {string} - A formatted translated text of a string.
     */
    getMessage: function (messageID) {
      return this.$store.getters['l10n/getMessage'](messageID)
    }
  },

  /**
   * Mutations are synchronous methods that save data to the store.
   * They should be mounted to the `mounted` object of the UI component.
   * Example:
   * ```
   * methods: {
   *    ...
   *    internalMethodName: L10nAPI.mutations.apiMethod
   *    ...
   * }
   * ```
   */
  mutations: {
    /**
     * Sets locale of L10n to a new value.
     * @param newLocale
     */
    setLocale: function (newLocale) {
      if (this.$store.state.selectedLocale !== newLocale) {
        return this.$store.commit('l10n/setLocale', newLocale)
      }
    }
  },

  /**
   * Actions are asynchronous methods that save data to the store.
   * They should be mounted to the `mounted` object of the UI component.
   * Example:
   * ```
   * methods: {
   *    ...
   *    internalMethodName: L10nAPI.actions.apiMethod
   *    ...
   * }
   * ```
   */
  actions: {}
}
