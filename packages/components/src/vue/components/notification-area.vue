<template>
  <div
    class="alpheios-notification-area"
  >
    <div
        class="alpheios-notification-area__notification"
        :class="notificationClasses"
        v-show="showNotification"
    >
      <div
          class="alpheios-notification-area__msg"
          v-html="$store.state.ui.notification.text"
      />
      <setting
          :classes="['alpheios-notification-area__control']"
          :data="settings.contentOptions.items.preferredLanguage"
          :show-title="false" @change="contentOptionChanged"
          v-show="$store.state.ui.notification.showLanguageSwitcher"
      />
      <div
          class="alpheios-notification-area__close-btn"
          @click="$store.commit(`ui/resetNotification`)"
      >
          <close-icon/>
      </div>
    </div>
    <div
        class="alpheios-notification-area__notification alpheios-notification-area__notification--important alpheios-notification-area__login-notification"
        :data-count="$store.state.auth.notification.count"
        v-show="showLoginNotification"
    >
      <div
          class="alpheios-notification-area__msg"
          v-html="l10n.getMsg($store.state.auth.notification.text)"
      />
      <login
          class="alpheios-notification-area__control"
          btn-class="alpheios-button-primary"
      />
      <div
          class="alpheios-notification-area__close-btn"
          @click="$store.commit(`auth/resetNotification`)"
      >
        <close-icon/>
      </div>
    </div>
  </div>
</template>
<script>
// Embeddable SVG icons
import CloseIcon from '@/images/inline-icons/x-close.svg'
// UI modules
import Setting from '@/vue/components/setting.vue'
import Login from '@/vue/components/login.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'NotificationArea',
  inject: ['app', 'l10n', 'settings'],
  storeModules: ['ui', 'auth'],
  mixins: [DependencyCheck],
  components: {
    closeIcon: CloseIcon,
    setting: Setting,
    login: Login
  },

  computed: {
    notificationClasses: function () {
      let classes = []
      if (this.$store.state.ui.notification.important) {
        classes.push('alpheios-notification-area__notification--important')
      }
      if (!this.showNotification) {
        // The presence of this class will let the login notification set the top margin
        classes.push(`alpheios-notification-area__notification--hidden`)
      }
      return classes
    },

    showNotification () {
      return this.$store.state.ui.notification.visible && this.$store.state.ui.notification.important
    },

    showLoginNotification () {
      return Boolean(
        this.$store.state.auth.notification.visible &&
        (this.$store.state.auth.notification.count === 1 || this.$store.state.auth.notification.count % 10 === 0)
      )
    }
  },

  methods: {
    contentOptionChanged: function (name, value) {
      this.app.contentOptionChange(name, value)
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-notification-area {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 0 0 auto;
    background: var(--alpheios-color-neutral-lightest);

    &__notification {
      display: flex;
      padding: uisize(16px) 0 uisize(16px) uisize(16px);
      flex: 0 0 auto;
      color: var(--alpheios-color-dark);
      background: var(--alpheios-notification-bg-color);
      border: 1px solid var(--alpheios-notification-border-color);
      border-radius: uisize(10px);
      margin: 0 uisize(16px) uisize(16px);
    }

    &__notification:first-child {
      margin-top: uisize(16px);
    }

    &__notification--hidden + &__login-notification {
      // If notification is hidden, set top margin of the login notification
      margin-top: uisize(16px);
    }

    &__close-btn {
      padding: 0 uisize(10px) 0 uisize(20px);
      cursor: pointer;
      fill: var(--alpheios-color-dark);
      stroke: var(--alpheios-color-dark);

      & svg {
        width: uisize(20px);
        height: uisize(20px);
      }

      &:hover,
      &:focus {
        fill: var(--alpheios-color-dark-hover);
        stroke: var(--alpheios-color-dark-hover);
      }

      &:active {
        fill: var(--alpheios-color-dark-pressed);
        stroke: var(--alpheios-color-dark-pressed);
      }
    }

    &__notification--important {
      color: var(--alpheios-color-vivid);
      background: var(--alpheios-notification-important-bg-color);
      border: 1px solid var(--alpheios-notification-important-border-color);

      .alpheios-notification-area__close-btn {
        fill: var(--alpheios-color-vivid);
        stroke: var(--alpheios-color-vivid);

        &:hover,
        &:focus {
          fill: var(--alpheios-color-vivid-hover);
          stroke: var(--alpheios-color-vivid-hover);
        }

        &:active {
          fill: var(--alpheios-color-vivid-pressed);
          stroke: var(--alpheios-color-vivid-pressed);
        }
      }
    }

    &__msg {
      padding-right: uisize(10px);
      flex: 1 1 auto;
    }

    &__control {
      .alpheios-setting__control {
        width: 140px;
      }
    }
  }
</style>
