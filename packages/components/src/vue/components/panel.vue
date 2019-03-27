<template>
  <div :class="rootClasses"
       :data-notification-visible="$store.state.ui.notification.visible && $store.state.ui.notification.important"
       :style="mainstyles"
       class="alpheios-panel alpheios-panel--large auk alpheios-content"
       data-component="alpheios-panel"
       data-resizable="true"
       id="alpheios-panel-inner"
       v-on-clickaway="attachTrackingClick"
       v-show="$store.state.panel.visible">

    <div class="alpheios-panel__header">
      <div class="alpheios-panel__header-logo">
        <logo-icon></logo-icon>
      </div>

      <div class="alpheios-panel__header-btn-group--center">
        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_LEFT')" tooltipDirection="bottom-narrow"
                      v-show="attachToLeftVisible">
          <span @click="setPosition('left')"
                class="alpheios-navbuttons__btn alpheios-navbuttons__btn--attach"
                v-show="attachToLeftVisible">
              <attach-left-icon></attach-left-icon>
          </span>
        </alph-tooltip>

        <navbuttons-large></navbuttons-large>

        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_RIGHT')" tooltipDirection="bottom-narrow"
                      v-show="attachToRightVisible">
          <span @click="setPosition('right')"
                class="alpheios-navbuttons__btn alpheios-navbuttons__btn--attach"
                v-show="attachToRightVisible">
              <attach-right-icon></attach-right-icon>
          </span>
        </alph-tooltip>
      </div>

      <span class="alpheios-panel__header-btn-group--end">
        <alph-tooltip
            :tooltipText="l10n.getText('TOOLTIP_CLOSE_PANEL')"
            tooltipDirection="bottom-right">
          <div @click="ui.closePanel" class="alpheios-panel__close-btn">
              <close-icon></close-icon>
          </div>
        </alph-tooltip>
      </span>
    </div>

    <div class="alpheios-panel__content">
      <div
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab-panel--fw alpheios-panel__tab__definitions"
          v-if="$store.getters['ui/isActiveTab']('definitions')"
          data-alpheios-ignore="all"
          >
        <div class="alpheios-lookup__panel">
          <lookup
              :clear-lookup-text="true"
              :name-base="`panel-defs`"
          />
        </div>
        <div v-if="$store.getters['app/defDataReady']">
          <div :key="definition.ID"
               class="alpheios-panel__contentitem" v-for="definition in formattedShortDefinitions">
            <shortdef :definition="definition" :languageCode="$store.state.app.languageCode"></shortdef>
          </div>
          <div class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
               v-html="formattedFullDefinitions"></div>
        </div>
        <div v-else>
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
      </div>
      <div :id="inflectionsPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
           v-if="$store.state.app.hasInflData" v-show="$store.getters['ui/isActiveTab']('inflections')"
           data-alpheios-ignore="all">
        <inflections @contentwidth="setContentWidth" class="alpheios-panel-inflections"></inflections>
      </div>
      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser')"
           data-alpheios-ignore="all">
        <inflection-browser @contentwidth="setContentWidth">
        </inflection-browser>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
            data-alpheios-ignore="all"
           v-show="$store.getters['ui/isActiveTab']('grammar')">
        <grammar></grammar>
      </div>
      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.getters['ui/isActiveTab']('treebank')"
          data-alpheios-ignore="all">
        <!-- TODO: Instead of this we need to create a universal mechanism for handling panel resizing for every tab's content change -->
        <treebank @treebankcontentwidth="setTreebankContentWidth"></treebank>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status"
           v-show="$store.getters['ui/isActiveTab']('status')"
           data-alpheios-ignore="all">
        <!-- Messages to be displayed in a status panel -->
        <div v-for="message in $store.state.ui.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status"
          v-if="auth.isEnabled()" v-show="$store.getters['ui/isActiveTab']('user')"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
           v-if="$store.state.app.wordUsageExamplesReady"
           v-show="$store.getters['ui/isActiveTab']('wordUsage')"
        >
        <word-usage-examples-block
            :language="app.wordUsageExamples.language"
            :provider="app.wordUsageExamples.provider"
            :targetWord="app.wordUsageExamples.targetWord"
            :wordUsageList="app.wordUsageExamples.wordUsageExamples">
        </word-usage-examples-block>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__options"
           v-show="$store.getters['ui/isActiveTab']('options')"
           data-alpheios-ignore="all"
      >
        <reskin-font-color></reskin-font-color>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.preferredLanguage"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.panelPosition"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.popupPosition"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.uiType"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.verboseMode"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.skin"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.panel"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items && app.isDevMode()"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.popup"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="settings.uiOptions.items.panelOnActivate"
                 @change="uiOptionChanged"
                 v-if="settings.uiOptions && settings.uiOptions.items"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="languageSetting"
                 :key="languageSetting.name"
                 @change="resourceSettingChanged"
                 v-for="languageSetting in resourceSettingsLexicons"></setting>
        <setting :classes="['alpheios-panel__options-item']" :data="languageSetting"
                 :key="languageSetting.name"
                 @change="resourceSettingChanged"
                 v-for="languageSetting in resourceSettingsLexiconsShort"></setting>

        <setting :classes="['alpheios-panel__options-item']"
                 :data="settings.contentOptions.items.enableWordUsageExamples" @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>

        <setting :classes="['alpheios-panel__options-item']"
                 :data="settings.contentOptions.items.wordUsageExamplesAuthMax"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>

        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.wordUsageExamplesMax"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>

        <setting :classes="['alpheios-panel__options-item']"
                 :data="settings.contentOptions.items.enableLemmaTranslations" @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>

        <setting :classes="['alpheios-panel__options-item']" :data="settings.contentOptions.items.locale"
                 @change="contentOptionChanged"
                 v-if="settings.contentOptions.items"></setting>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab__info"
           v-show="$store.getters['ui/isActiveTab']('info')"
           data-alpheios-ignore="all">
        <div class="alpheios-lookup__panel">
          <lookup
              :clear-lookup-text="true"
              :name-base="`panel-info`"
          />
        </div>
        <info></info>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist"
           v-show="$store.getters['ui/isActiveTab']('wordlist')"
           data-alpheios-ignore="all"
      >
        <word-list-panel :updated="$store.state.app.wordListUpdateTime" :wordlistC="app.wordlistC"></word-list-panel>
      </div>
    </div>
    <div :class="{ 'alpheios-panel__notifications--important': $store.state.ui.notification.important }"
         class="alpheios-panel__notifications alpheios-text-small"
         v-if="$store.state.ui.notification.visible" v-show="$store.state.ui.notification.important">
            <span @click="$store.commit(`ui/resetNotification`)" class="alpheios-panel__notifications-close-btn">
                <close-icon></close-icon>
            </span>
      <span class="alpheios-panel__notifications-text" v-html="$store.state.ui.notification.text"></span>
      <setting :classes="['alpheios-panel__notifications--lang-switcher alpheios-text-smaller']"
               :data="settings.contentOptions.items.preferredLanguage"
               :show-title="false"
               @change="contentOptionChanged"
               v-show="$store.state.ui.notification.showLanguageSwitcher"></setting>
    </div>
  </div>
</template>
<script>
/*
    This is a desktop version of a panel
     */
// UI components
import NavbuttonsLarge from '@/vue/components/nav/navbuttons-large.vue'
// SVG icons
import LogoIcon from '@/images/alpheios/logo.svg'
import AttachLeftIcon from '@/images/inline-icons/attach-left.svg'
import AttachRightIcon from '@/images/inline-icons/attach-right.svg'
// Vue components
import CompactPanel from '@/vue/components/panel-compact.vue'

export default {
  name: 'Panel',
  extends: CompactPanel,
  components: {
    navbuttonsLarge: NavbuttonsLarge,
    logoIcon: LogoIcon,
    attachLeftIcon: AttachLeftIcon,
    attachRightIcon: AttachRightIcon
  },
  tabChangeUnwatch: null, // Will hold a function for removal of a tab change watcher
  // `positionClassVariants` is a custom property. This is to prent Vue from attaching reactivity to it.
  positionClassVariants: {
    left: 'alpheios-panel-left',
    right: 'alpheios-panel-right'
  },

  computed: {
    rootClasses () {
      return this.$store.state.ui.rootClasses.concat([this.$options.positionClassVariants[this.panelPosition]])
    },
    mainstyles: function () {
      this.panelWidth = this.panelWidth ? this.panelWidth : this.$options.minWidth
      return {
        zIndex: this.ui.zIndex,
        width: `${this.panelWidth}px`
      }
    }
  },

  mounted: function () {
    this.$options.tabChangeUnwatch = this.$store.watch((state, getters) => state.ui.activeTab, (tabName) => {
      this.setContentWidth({ width: 'auto', component: null })
    })
  },

  beforeDestroy: function () {
    this.$options.tabChangeUnwatch()
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-panel--large {
    height: 100vh;
    top: 0;
  }

  .alpheios-panel__header-logo {
    width: 44px;
    height: auto;
    // To compensate for an extra white space at the top of the logo image
    top: -1px;
  }

  .alpheios-panel--large {
    .alpheios-navbuttons__btn {
      svg {
        width: 28px;
      }
    }
  }

  .alpheios-navbuttons__btn--attach {
    stroke-width: 2.5;
  }

  .alpheios-panel-left {
    &.alpheios-panel {
      left: 0;
    }

    .alpheios-panel__header {
      direction: ltr;
      border-top-right-radius: px2rem(10px);
      padding-left: px2rem(14px);
    }

    .alpheios-panel__content {
      border-right: 1px solid var(--alpheios-border-color);
    }

    .alpheios-panel__close-btn {
      width: px2rem(80px);
      border-top-right-radius: px2rem(10px);

      svg {
        left: px2rem(16px);
      }
    }
  }

  .alpheios-panel-right {
    &.alpheios-panel {
      right: 0;
    }

    .alpheios-panel__header {
      direction: rtl;
      border-top-left-radius: px2rem(10px);
      padding-right: px2rem(14px);
    }

    .alpheios-panel__content {
      border-left: 1px solid var(--alpheios-border-color);
    }

    .alpheios-panel__close-btn {
      width: px2rem(80px);
      border-top-left-radius: px2rem(10px);

      svg {
        right: px2rem(16px);
        left: auto;
      }
    }
  }
</style>
