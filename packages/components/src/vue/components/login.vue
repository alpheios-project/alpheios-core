<template>
  <div v-show="this.$store.state.auth.enableLogin">
    <button
        @click="logIn"
        :class="btnClass"
        v-show="! this.$store.state.auth.isAuthenticated && ! this.$store.state.auth.externalLoginUrl"
    >
      {{ l10n.getMsg(`AUTH_LOGIN_BTN_LABEL`) }}
    </button>
    <a :href="loginLink" v-show="! this.$store.state.auth.isAuthenticated && this.$store.state.auth.externalLoginUrl">
      <button :class="btnClass">
        {{ l10n.getMsg(`AUTH_LOGIN_BTN_LABEL`) }}
      </button>
    </a>
    <button
        @click="logOut"
        :class="btnClass"
        v-show="this.$store.state.auth.isAuthenticated && !this.$store.state.auth.externalLogoutUrl"
    >
      {{ l10n.getMsg(`AUTH_LOGOUT_BTN_LABEL`) }}
    </button>
    <a :href="logoutLink" v-show="this.$store.state.auth.isAuthenticated && this.$store.state.auth.externalLogoutUrl">
      <button :class="btnClass">
        {{ l10n.getMsg(`AUTH_LOGOUT_BTN_LABEL`) }}
      </button>
    </a>
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
  computed: {
    loginLink: function () {
      if (this.$store.state.auth.externalLoginUrl) {
        return this.$store.state.auth.externalLoginUrl.replace('{FROM_URL}',window.location.href)
      }
    },
    logoutLink: function () {
      if (this.$store.state.auth.externalLoginUrl) {
        return this.$store.state.auth.externalLogoutUrl.replace('{FROM_URL}',window.location.href)
      }
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
