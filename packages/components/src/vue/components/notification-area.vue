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
      <div class="alpheios-notification-area__control-cont">
        <setting
                :classes="['alpheios-notification-area__control']"
                :data="settings.getFeatureOptions().items.preferredLanguage"
                :selected-override="$store.state.app.currentLanguageName"
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
    </div>
    <div
        class="alpheios-notification-area__hint"
        v-show="$store.state.lexis.treebankRefreshFailed"
    >
      <div
          class="alpheios-notification-area__msg"
      >
        {{ l10n.getMsg('TEXT_TREEBANK_NOT_AVAILABLE') }}
      </div>
      <div
          class="alpheios-notification-area__close-btn"
          @click="hideTreebankNotification"
      >
        <close-icon/>
      </div>
    </div>
    <div
        class="alpheios-notification-area__hint"
        :class="cedictNotificationClasses"
        v-show="cedictNotificationIsVisible"
    >
      <div
          class="alpheios-notification-area__msg"
      >
        {{ cedictNotificationMessage }}
      </div>
      <div class="alpheios-notification-area__controlbox ">
        <button
            @click="loadCedictData"
            class="alpheios-button alpheios-notification-area__hint-btn"
            v-show="showCedictLoadDataBtn"
        >
          {{ l10n.getMsg('LABEL_CEDICT_LOAD_DATA_BTN') }}
        </button>
      </div>
      <div
          class="alpheios-notification-area__close-btn"
          @click="hideCedictNotification"
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
      <div class="alpheios-notification-area__controlbox ">
        <login
          class="alpheios-notification-area__control"
          btn-class="alpheios-button-primary"
          v-show="!app.platform.isSafariAppExtension"
        />
        <button
          @click="showUserAccount"
          class="alpheios-button-primary"
          v-show="app.platform.isSafariAppExtension && this.$store.state.ui.activeTab!=='user'"
        >
          {{ l10n.getMsg(`AUTH_USER_ACCOUNT_BTN_LABEL`) }}
        </button>
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
  inject: ['app', 'l10n', 'settings', 'ui', 'lexis'],
  storeModules: ['ui', 'auth', 'lexis'],
  mixins: [DependencyCheck],
  components: {
    closeIcon: CloseIcon,
    setting: Setting,
    login: Login
  },
  data () {
    return {
      hintWasShownForTabs: [],
      showCedictLoadDataBtn: true
    }
  },

  computed: {
    notificationClasses: function () {
      let classes = [] // eslint-disable-line prefer-const
      if (this.$store.state.ui.notification.important) {
        classes.push('alpheios-notification-area__notification--important')
      }
      if (!this.showNotification) {
        // The presence of this class will let the login notification set the top margin
        classes.push('alpheios-notification-area__notification--hidden')
      }
      return classes
    },

    showHint () {
      const showHintForTab = !this.hintWasShownForTabs.includes(this.$store.state.ui.activeTab)
      const willBeShown = this.$store.state.ui.hint.visible && showHintForTab

      if (willBeShown) {
        this.hintWasShownForTabs.push(this.$store.state.ui.activeTab)
      }
      return willBeShown
    },

    showNotification () {
      return this.$store.state.ui.notification.visible && this.$store.state.ui.notification.important
    },

    showLoginNotification () {
      return Boolean(
        this.$store.state.auth.notification.visible
      )
    },

    cedictNotificationIsVisible () {
      return this.$store.state.lexis.cedictDisplayNotification
    },

    cedictNotificationMessage () {
      if (!this.$store.state.lexis.cedictDataLoaded && !this.$store.state.lexis.cedictLoadingInProgress) {
        return this.l10n.getMsg('TEXT_CEDICT_LOAD_DATA_NOTICE')
      } else if (!this.$store.state.lexis.cedictDataLoaded && this.$store.state.lexis.cedictLoadingInProgress) {
        return this.l10n.getMsg('TEXT_CEDICT_LOADING_IN_PROGRESS')
      } else if (this.$store.state.lexis.cedictDataLoaded) {
        return this.l10n.getMsg('TEXT_CEDICT_HAS_BEEN_LOADED')
      }
      return ''
    },

    cedictNotificationClasses: function () {
      let classes = [] // eslint-disable-line prefer-const
      if (this.$store.state.lexis.cedictDataLoaded) {
        classes.push('alpheios-notification-area__notification--cedict-loaded')
      }
      return classes
    }
  },

  methods: {
    featureOptionChanged: function (name, value) {
      const keyinfo = Options.parseKey(name)
      this.app.featureOptionChange(keyinfo.name, value)
    },

    hideLoginPrompt: function () {
      this.ui.optionChange('hideLoginPrompt', true)
    },

    showUserAccount: function () {
      this.ui.showPanelTab('user')
    },

    loadCedictData: function () {
      this.showCedictLoadDataBtn = false
      this.lexis.loadCedictData()
    },

    hideCedictNotification: function () {
      this.lexis.hideCedictNotification()
    },

    hideTreebankNotification: function () {
      this.$store.commit('lexis/hideTreebankFailedNotification')
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

      &.alpheios-notification-area__notification--cedict-loaded {
        color: var(--alpheios-notification-important-alt-color);
        background: var(--alpheios-notification-important-alt-bg);
        border: 1px solid var(--alpheios-notification-important-alt-border-color);
      }

      &.alpheios-notification-area__notification--cedict-loaded .alpheios-notification-area__close-btn {
        fill: var(--alpheios-notification-important-alt-color);
        stroke: var(--alpheios-notification-important-alt-color);
      }
    }

    &__msg {
      padding-right: uisize(10px);
      flex: 1 1 auto;
    }

    &__control-cont {
      display: flex;
      flex: 0;
    }

    &__control {
      display: inline;
      .alpheios-setting__control {
        width: 140px;
      }

      button {
        margin-bottom: 5px;
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

  .alpheios-notification-area__hint-btn, button.alpheios-notification-area__hint-btn {
    color: var(--alpheios-color-neutral-lightest);
    background: var(--alpheios-color-muted);
    border-color: var(--alpheios-color-muted);

    &:hover,
    &:focus {
      box-shadow: 0 0.25em 0.25em rgba(0, 0, 0, 0.25);
    }

    &:active {
      box-shadow: inset 0 0.25em 0.25em rgba(0, 0, 0, 0.1);
    }
  }
</style>
