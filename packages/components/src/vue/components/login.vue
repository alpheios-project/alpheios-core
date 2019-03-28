<template>
  <div>
    <button @click="logIn" class="alpheios-button-primary" v-show="! this.$store.state.auth.isAuthenticated">
      {{ l10n.getMsg(`AUTH_LOGIN_BTN_LABEL`) }}
    </button>
    <button @click="logOut" class="alpheios-button-primary" v-show="this.$store.state.auth.isAuthenticated">
      {{ l10n.getMsg(`AUTH_LOGOUT_BTN_LABEL`) }}
    </button>
  </div>
</template>
<script>

export default {
  name: 'UserAuth',
  inject: {
    l10n: 'l10n',
    auth: { from: 'auth', default: null } // This module is options
  },
  data: function () {
    return {
    }
  },

  methods: {
    logIn: function () {
      this.auth.authenticate()
    },

    logOut: function () {
      this.auth.logout()
    }
  }
}
</script>
<style lang="scss">
</style>
