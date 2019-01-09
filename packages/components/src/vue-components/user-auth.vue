<template>
    <div>
        <p>Locale is: {{ getLocale }}</p>
        <button class="uk-button uk-button-primary" style="text-align: right;" @click="localeToggle">
            Toggle Locale
        </button>
        <button v-show="!isLoggedIn" class="uk-button uk-button-primary" @click="logIn">
            {{ msg(`AUTH_LOG_IN_BTN_LABEL`) }}
        </button>
        <button v-show="isLoggedIn" class="uk-button uk-button-primary" @click="logOut">
            {{ msg(`AUTH_LOG_OUT_BTN_LABEL`) }}
        </button>
        <div v-show="logInProgress" class="alpheios-user-auth__message-box">
            {{ msg(`AUTH_LOG_IN_PROGRESS_MSG`) }}
        </div>
        <div v-show="isLoggedIn" class="alpheios-user-auth__message-box">
            {{ msg(`AUTH_LOG_IN_SUCCESS_MSG`) }}
        </div>
        <div v-show="authenticationFailed" class="alpheios-user-auth__message-box">
            {{ msg(`AUTH_LOG_IN_AUTH_FAILURE_MSG`) }}
        </div>
        <div v-if="isLoggedIn && hasUserInfo" class="alpheios-user-auth__user-info-box">
            <div class="alpheios-user-auth__user-info-item-box">
                <div class="alpheios-user-auth__user-info-item-name">
                    {{ msg(`AUTH_PROFILE_NICKNAME_LABEL`) }}:
                </div>
                <div class="alpheios-user-auth__user-info-item-value">
                    {{ userInfo.nickname ? userInfo.nickname: `&mdash;` }}
                </div>
            </div>
            <div class="alpheios-user-auth__user-info-item-box">
                <div class="alpheios-user-auth__user-info-item-name">
                    {{ msg(`AUTH_PROFILE_NAME_LABEL`) }}:
                </div>
                <div class="alpheios-user-auth__user-info-item-value">
                    {{ userInfo.name ? userInfo.name: `&mdash;` }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import L10nAPI from '@/modules/data/l10n/l10n-api.js'

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

  computed: {
    getLocale: L10nAPI.getters.getLocale
  },

  methods: {
    logIn: function () {
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
            console.error(`Authenticated failed:`, error)
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
        // Retrieve user profile data
        this.auth.getProfileData()
          .then(profileData => {
            console.log(`User info retrieved:`, profileData)
            this.hasUserInfo = true
            this.userInfo = profileData
          })
          .catch(error => {
            console.error(`Unable to retrieve user information from Auth0: ${error.message}`)
          })

        // Retrieve user data from Alpheios servers
        this.auth.getUserData()
          .then(userData => {
            console.log(`User data retrieved:`, userData)
          })
          .catch(error => {
            console.error(`Unable to retrieve user information from Auth0: ${error.message}`)
          })
      }
    },

    setLocale: L10nAPI.mutations.setLocale,
    msg: L10nAPI.getterMethods.getMessage,

    /**
     * A method for demonstration of language switching.
     * TODO: Remove in production builds.
     */
    localeToggle: function () {
      const newLocale = (this.getLocale === 'en-GB') ? 'en-US' : 'en-GB'
      this.setLocale(newLocale)
    }
  },

  created: function () {
    // Check for dependencies
    // TODO: Provide a unified way to do such checks
    const dependencies = ['l10n']
    const missingDependencies = dependencies.filter(d => !this.$store.state.hasOwnProperty(d))
    if (missingDependencies.length > 0) {
      throw new Error(`Cannot create a ${this.$options.name} Vue component because the following dependencies are missing: ${missingDependencies}`)
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
