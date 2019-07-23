<template>
  <div class="alpheios-user-auth">
    <div class="alpheios-user-auth__user-container">
      <login/>
      <div class="alpheios-user-auth__user-info-box" v-show="this.$store.state.auth.isAuthenticated">
        <div class="alpheios-user-auth__user-info-item-box">
          <div class="alpheios-user-auth__user-info-item-name">
            {{ l10n.getMsg(`AUTH_PROFILE_NICKNAME_LABEL`) }}:
          </div>
          <div class="alpheios-user-auth__user-info-item-value">
            {{ this.$store.state.auth.userNickName ? this.$store.state.auth.userNickName: `&mdash;` }}
          </div>
        </div>
      </div>
    </div>
    <div class="alpheios-user-auth__credits">
      <a width="150" height="50" href="https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss"
        target="_blank" alt="Single Sign On & Token Based Authentication - Auth0">
        <img width="150" height="50" alt="JWT Auth for open source projects" src="//cdn.auth0.com/oss/badges/a0-badge-dark.png"/></a>
    </div>
  </div>
</template>
<script>
import Login from './login.vue'
import CloseIcon from '@/images/inline-icons/x-close.svg'

export default {
  name: 'UserAuth',
  inject: {
    l10n: 'l10n',
    auth: { from: 'auth', default: null } // This module is options
  },
  components: {
    login: Login,
    closeIcon: CloseIcon
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

   .alpheios-user-auth {
     display: flex;
     flex-direction: column;
     height: 100%;
     justify-content: space-between;
   }

  .alpheios-user-auth__user-info-box {
    margin-top: uisize(20px);
    display: flex;
    border-top: 1px solid var(--alpheios-border-color);
    flex-direction: column;
  }

  .alpheios-user-auth__user-info-item-box {
    display: flex;
    flex-direction: row;
    padding: uisize(5px) uisize(10px);
    border-bottom: 1px solid var(--alpheios-border-color);
  }

  .alpheios-user-auth__user-info-item-name {
    flex: 1 1;
  }

  .alpheios-user-auth__user-info-item-value {
    font-weight: 700;
    flex: 1 1;
    color: var(--alpheios-link-color-on-light) !important;
    text-align: right;
  }
</style>
