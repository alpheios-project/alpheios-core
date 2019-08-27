<template>
  <div
    class="alpheios-notification-area"
  >
  <div
        class="alpheios-notification-area__hint"
        v-show="showHint"
    >
      <div
          class="alpheios-notification-area__msg"
          v-html="$store.state.ui.hint.text"
      />
      <div
          class="alpheios-notification-area__close-btn"
          @click="$store.commit(`ui/resetHint`)"
      >
          <close-icon/>
      </div>
    </div>

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
          :data="settings.getFeatureOptions().items.preferredLanguage"
          :show-title="false" @change="featureOptionChanged"
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
        v-show="showLoginNotification"
    >
      <div
          class="alpheios-notification-area__msg"
          v-html="l10n.getMsg($store.state.auth.notification.text)"
      />
      <div class="alpheios-notification-area__controlbox">
        <login
          class="alpheios-notification-area__control"
          btn-class="alpheios-button-primary"
        />
        <button
          @click="hideLoginPrompt"
          class="alpheios-button-tertiary"
          v-show="!$store.state.auth.hideLoginPrompt && $store.state.auth.notification.count >= 2">
          {{ l10n.getMsg(`AUTH_HIDE_LOGIN_BTN_LABEL`) }}
        </button>
      </div>
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
import Options from '@/lib/options/options.js'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'NotificationArea',
  inject: ['app', 'l10n', 'settings','ui'],
  storeModules: ['ui', 'auth'],
  mixins: [DependencyCheck],
  components: {
    closeIcon: CloseIcon,
    setting: Setting,
    login: Login
  },
  data () {
    return {
      hintWasShownForTabs: []
    }
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

    showHint () {
      let showHintForTab = !this.hintWasShownForTabs.includes(this.$store.state.ui.activeTab)

      if (showHintForTab) {
        this.hintWasShownForTabs.push(this.$store.state.ui.activeTab)
      }
      return this.$store.state.ui.hint.visible && showHintForTab
    },

    showNotification () {
      return this.$store.state.ui.notification.visible && this.$store.state.ui.notification.important
    },

    showLoginNotification () {
      return Boolean(
        this.$store.state.auth.notification.visible
      )
    }
  },

  methods: {
    featureOptionChanged: function (name, value) {
      let keyinfo = Options.parseKey(name)
      this.app.featureOptionChange(keyinfo.name, value)
    },
    hideLoginPrompt: function () {
      this.ui.optionChange('hideLoginPrompt',true)
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

    &__notification,
    &__hint {
      display: flex;
      padding: uisize(16px) 0 uisize(16px) uisize(16px);
      flex: 0 0 auto;
      color: var(--alpheios-notification-color);
      background: var(--alpheios-notification-bg);
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
      fill: var(--alpheios-notification-close-btn-color);
      stroke: var(--alpheios-notification-close-btn-color);

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
      color: var(--alpheios-notification-important-color);
      background: var(--alpheios-notification-important-bg);
      border: 1px solid var(--alpheios-notification-important-border-color);

      .alpheios-notification-area__close-btn {
        fill: var(--alpheios-important-notification-color);
        stroke: var(--alpheios-important-notification-color);

        &:hover,
        &:focus {
          fill: var(--alpheios-important-notification-color-hover);
          stroke: var(--alpheios-important-notification-color-hover);
        }

        &:active {
          fill: var(--alpheios-important-notification-color);
          stroke: var(--alpheios-important-notification-color);
        }
      }
    }

    &__msg {
      padding-right: uisize(10px);
      flex: 1 1 auto;
    }

    &__control {
      display: inline;
      .alpheios-setting__control {
        width: 140px;
      }
    }
    &__controlbox {
      flex-flow: wrap;
    }
  }

  .alpheios-notification-area__hint {
    color: var(--alpheios-hint-color);
    background: var(--alpheios-hint-bg);
    border: 1px solid var(--alpheios-hint-border-color);
  }
</style>
