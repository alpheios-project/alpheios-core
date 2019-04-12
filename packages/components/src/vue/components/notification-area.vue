<template>
  <div
    class="alpheios-notification-area"
  >
    <div
        class="alpheios-notification-area__notification"
        :class="notificationClasses"
        v-show="$store.state.ui.notification.visible && $store.state.ui.notification.important"
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
        class="alpheios-notification-area__notification alpheios-notification-area__notification--important"
        :data-count="$store.state.auth.notification.count"
        v-show="showLoginNotification"
    >
      <div
          class="alpheios-notification-area__msg"
          v-html="l10n.getMsg($store.state.auth.notification.text)"
      />
      <login
          class="alpheios-notification-area__control"
          btn-class="alpheios-button-tertiary"
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
      return this.$store.state.ui.notification.important
        ? 'alpheios-notification-area__notification--important'
        : undefined
    },

    // TODO: right now this prop sets a condition for displaying both the notification message and the login button.
    //       However, sometimes we cannot obtain the login URL and thus cannot show the button.
    //       Need to think how to handle such situations gracefully.
    showLoginNotification () {
      return Boolean(
        this.$store.state.auth.notification.visible &&
        this.$store.state.auth.notification.showLogin &&
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

    &__notification {
      display: flex;
      padding: uisize(10px) 0 uisize(10px) uisize(20px);
      flex: 0 0 uisize(60px);
      color: var(--alpheios-color-neutral-lightest);
      background: var(--alpheios-color-muted);
    }

    &__notification--important {
      color: var(--alpheios-color-neutral-lightest);
      background: var(--alpheios-color-vivid);
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

    &__close-btn {
      width: uisize(20px);
      height: uisize(20px);
      padding: 0 uisize(10px) 0 uisize(20px);
      cursor: pointer;
      fill: var(--alpheios-color-neutral-lightest);
      stroke: var(--alpheios-color-neutral-lightest);

      &:hover,
      &:focus {
        fill: var(--alpheios-icon-color-hover);
        stroke: var(--alpheios-icon-color-hover);
      }

      &:active {
        fill: var(--alpheios-icon-color-active);
        stroke: var(--alpheios-icon-color-active);
      }
    }
  }
</style>
