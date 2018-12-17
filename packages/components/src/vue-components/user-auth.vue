<template>
    <div>
        <button v-show="!isLoggedIn" class="uk-button uk-button-primary" @click="logIn">
            Log in
        </button>
        <button v-show="isLoggedIn" class="uk-button uk-button-primary" @click="logOut">
            Log out
        </button>
        <div v-show="logInProgress" class="alpheios-user-auth__message-box">
            Please be patient while we are logging you in ...
        </div>
        <div v-show="isLoggedIn" class="alpheios-user-auth__message-box">
            Congratulations! Your logged in successfully
        </div>
        <div v-show="authenticationFailed" class="alpheios-user-auth__message-box">
            Authentication failed
        </div>
    </div>
</template>
<script>

export default {
  name: 'UserAuth',
  props: {
    auth: [Object, Function]
  },
  data: function () {
    return {
      isLoggedIn: false,
      authenticationFailed: false,
      logInProgress: false
    }
  },
  methods: {
    logIn: function () {
      console.log('Login started')
      this.logInProgress = true
      if (this.auth && this.auth.authenticate) {
        this.auth.authenticate()
          .then(result => {
            console.log(`Authenticated successfully`)
            this.logInProgress = false
            this.isLoggedIn = true
            this.authenticationFailed = false
          })
          .catch(error => {
            console.log(`Authenticated failed`, error)
            this.logInProgress = false
            this.isLoggedIn = false
            this.authenticationFailed = true
          })
      }
    },

    logOut: function () {
      console.log('Logging out')
      this.isLoggedIn = false
      this.authenticationFailed = false
    }
  }
}
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-user-auth__message-box {
        margin-top: 20px;
    }
</style>
