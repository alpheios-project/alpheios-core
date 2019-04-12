<template>
  <div v-show="this.$store.state.auth.enableLogin">
    <button
        @click="logIn"
        :class="btnClass"
        v-show="! this.$store.state.auth.isAuthenticated"
    >
      {{ l10n.getMsg(`AUTH_LOGIN_BTN_LABEL`) }}
    </button>
    <button
        @click="logOut"
        :class="btnClass"
        v-show="this.$store.state.auth.isAuthenticated"
    >
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
  props: {
    btnClass: {
      type: String,
      default: 'alpheios-button-primary',
      required: false
    }
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
