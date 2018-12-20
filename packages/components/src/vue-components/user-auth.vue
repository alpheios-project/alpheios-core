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
        <div v-if="isLoggedIn && hasUserInfo" class="alpheios-user-auth__user-info-box">
            <div class="alpheios-user-auth__user-info-item-box">
                <div class="alpheios-user-auth__user-info-item-name">
                    Nickname:
                </div>
                <div class="alpheios-user-auth__user-info-item-value">
                    {{ userInfo.nickname ? userInfo.nickname: `&mdash;` }}
                </div>
            </div>
            <div class="alpheios-user-auth__user-info-item-box">
                <div class="alpheios-user-auth__user-info-item-name">
                    Name:
                </div>
                <div class="alpheios-user-auth__user-info-item-value">
                    {{ userInfo.name ? userInfo.name: `&mdash;` }}
                </div>
            </div>
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
      logInProgress: false,
      hasUserInfo: false, // Whether user info data is available
      userInfo: null // Will hold a user info object when user data is retrieved
    }
  },
  methods: {
    logIn: function () {
      console.log('Login started')
      this.logInProgress = true
      if (this.auth) {
        this.auth.authenticate()
          .then(result => {
            console.log(`Authenticated successfully`)
            this.logInProgress = false
            this.isLoggedIn = true
            this.authenticationFailed = false

            this.getUserInfo()
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
    },

    getUserInfo: function () {
      if (this.auth) {
        this.auth.getUserInfo()
          .then(userInfo => {
            console.log(`User info retrieved:`, userInfo)
            this.hasUserInfo = true
            this.userInfo = userInfo
          })
          .catch(error => {
            console.log(`Unable to retrieve user information from Auth0: ${error.message}`)
          })
      }
    }
  }
}
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-user-auth__message-box {
        margin-top: 20px;
        padding: 10px;
        background: $alpheios-logo-color;
    }

    .alpheios-user-auth__user-info-box {
        margin-top: 20px;
        display: flex;
        border-top: 1px solid $alpheios-link-color-dark-bg;
        flex-direction: column;
    }

    .alpheios-user-auth__user-info-item-box {
        display: flex;
        flex-direction: row;
        padding: 5px 10px;
        border-bottom: 1px solid $alpheios-link-color-dark-bg;
    }

    .alpheios-user-auth__user-info-item-name {
        flex: 1 1;
    }

    .alpheios-user-auth__user-info-item-value {
        font-weight: 700;
        flex: 1 1;
        color: $alpheios-link-color !important;
        text-align: right;
    }
</style>
