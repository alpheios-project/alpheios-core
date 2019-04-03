<template>
  <div :data-notification-visible="$store.state.auth.notification.visible">
    <login/>
    <div class="alpheios-user-auth__notifications uk-text-small"
      v-if="$store.state.auth.notification.text">
      <span @click="$store.commit(`auth/resetNotification`)" class="alpheios-popup__notifications-close-btn">
        <close-icon></close-icon>
      </span>
      <span v-html="l10n.getMsg($store.state.auth.notification.text)"></span>
    </div>
    <div class="alpheios-user-auth__user-info-box" v-if="this.$store.state.auth.isAuthenticated">
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
</template>
<script>
import Login from './login.vue'
import CloseIcon from '../../images/inline-icons/close.svg'
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

  .alpheios-user-auth__user-info-box {
    margin-top: 20px;
    display: flex;
    border-top: 1px solid var(--alpheios-border-color);
    flex-direction: column;
  }

  .alpheios-user-auth__user-info-item-box {
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
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

  .alpheios-user-auth__notifications {
    display: none;
    position: relative;
    padding: 10px 20px;
    background: var(--alpheios-color-muted);
    flex: 0 0 60px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .alpheios-user-auth__notifications-close-btn {
    position: absolute;
    right: 5px;
    top: 5px;
    display: block;
    width: 20px;
    height: 20px;
    margin: 0;
    cursor: pointer;
    fill: var(--alpheios-color-neutral-lightest);
    stroke: var(--alpheios-color-neutral-lightest);
  }

  .alpheios-user-auth__notifications-close-btn:hover,
  .alpheios-user-auth__notifications-close-btn:focus {
    fill: var(--alpheios-color-neutral-light);
    stroke: var(--alpheios-color-neutral-light);
  }

  [data-notification-visible="true"] .alpheios-user-auth__notifications {
    display: block;
  }

</style>
