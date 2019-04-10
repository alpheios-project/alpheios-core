<template>
  <div :class="rootClasses"
       :data-notification-visible="$store.state.ui.notification.visible && $store.state.ui.notification.important"
       :style="mainstyles"
       class="alpheios-panel alpheios-panel--large alpheios-content"
       data-component="alpheios-panel"
       data-resizable="true"
       id="alpheios-panel-inner"
       v-on-clickaway="attachTrackingClick"
       v-show="$store.state.panel.visible">

    <div class="alpheios-panel__header">
      <div class="alpheios-panel__header-logo">
        <logo-icon class="alpheios-logo-on-dark"/>
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
          v-show="$store.getters['ui/isActiveTab']('definitions')"
          data-alpheios-ignore="all"
          >
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-defs`"
          />
        </div>
        <div v-if="$store.getters['app/defDataReady']">
          <div :key="definition.ID"
               class="alpheios-panel__contentitem"
               v-for="definition in formattedShortDefinitions"
          >
            <shortdef
                :definition="definition"
                :languageCode="$store.state.app.languageCode"
            />
          </div>
          <div
              class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
              v-html="formattedFullDefinitions"/>
        </div>
        <div v-else>
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
        <div
            class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
             v-html="formattedFullDefinitions"
        />
      </div>

      <div
          :id="inflectionsPanelID"
          class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
          v-show="$store.state.app.hasInflData && $store.getters['ui/isActiveTab']('inflections')"
          data-alpheios-ignore="all"
      >
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_PANEL') }}
        </h1>
        <inflections @contentwidth="setContentWidth" class="alpheios-panel-inflections"></inflections>
      </div>

      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_BROWSER_PANEL') }}
        </h1>
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

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__user alpheios-panel__tab-panel--fw"
          v-if="$store.state.auth.showUI" v-show="$store.getters['ui/isActiveTab']('user')"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
          v-show="$store.getters['ui/isActiveTab']('wordUsage')"
        >
        <word-usage-examples/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__options"
           v-show="$store.getters['ui/isActiveTab']('options')"
           data-alpheios-ignore="all"
      >
        <reskin-font-color></reskin-font-color>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.preferredLanguage"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.panelPosition"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.popupPosition"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.uiType"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.verboseMode"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.skin"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.panel"
            @change="uiOptionChanged"
            v-show="app.isDevMode()"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.popup"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.panelOnActivate"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="languageSetting"
            :key="languageSetting.name"
            @change="resourceSettingChanged"
            v-for="languageSetting in resourceSettingsLexicons"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="languageSetting"
            :key="languageSetting.name"
            @change="resourceSettingChanged"
            v-for="languageSetting in resourceSettingsLexiconsShort"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.enableWordUsageExamples"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesON"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesAuthMax"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesMax"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.enableLemmaTranslations"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.locale"
            @change="contentOptionChanged"
        >
        </setting>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab__info"
           v-show="$store.getters['ui/isActiveTab']('info')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_HELP_PANEL') }}
        </h1>
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-info`"
          />
        </div>
        <info></info>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist alpheios-panel__tab-panel--fw"
           v-show="$store.getters['ui/isActiveTab']('wordlist')"
           data-alpheios-ignore="all"
      >
        <word-list-panel :updated="$store.state.app.wordListUpdateTime" :wordlistC="app.wordlistC"></word-list-panel>
      </div>

    </div>
    <div
        :class="{ 'alpheios-panel__notifications--important': $store.state.ui.notification.important }"
        class="alpheios-panel__notifications alpheios-text-small"
        v-show="$store.state.ui.notification.visible && $store.state.ui.notification.important"
    >
            <span
                class="alpheios-panel__notifications-close-btn"
                @click="$store.commit(`ui/resetNotification`)"
            >
                <close-icon/>
            </span>
      <span class="alpheios-panel__notifications-text" v-html="$store.state.ui.notification.text"></span>
      <setting
          :classes="['alpheios-panel__notifications--lang-switcher alpheios-text-smaller']"
          :data="settings.contentOptions.items.preferredLanguage"
          @change="contentOptionChanged"
          v-show="$store.state.ui.notification.showLanguageSwitcher"
      />
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
      return [this.$options.positionClassVariants[this.panelPosition]]
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
      border-top-right-radius: textsize(10px);
      padding-left: textsize(14px);
    }

    .alpheios-panel__content {
      border-right: 1px solid var(--alpheios-border-color);
    }

    .alpheios-panel__close-btn {
      width: textsize(80px);
      border-top-right-radius: textsize(10px);

      svg {
        left: textsize(16px);
      }
    }
  }

  .alpheios-panel-right {
    &.alpheios-panel {
      right: 0;
    }

    .alpheios-panel__header {
      direction: rtl;
      border-top-left-radius: textsize(10px);
      padding-right: textsize(14px);
    }

    .alpheios-panel__content {
      border-left: 1px solid var(--alpheios-border-color);
    }

    .alpheios-panel__close-btn {
      width: textsize(80px);
      border-top-left-radius: textsize(10px);

      svg {
        right: textsize(16px);
        left: auto;
      }
    }
  }
</style>
