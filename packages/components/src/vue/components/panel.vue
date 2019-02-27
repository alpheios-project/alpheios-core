<template>
  <div :class="rootClasses" :data-notification-visible="$store.state.ui.notification.visible && $store.state.ui.notification.important"
       :style="mainstyles" class="alpheios-panel alpheios-panel--large auk"
       data-component="alpheios-panel"
       data-resizable="true" id="alpheios-panel-inner" v-on-clickaway="attachTrackingClick"
       v-show="$store.state.panel.visible">

    <div class="alpheios-panel__header">
      <div class="alpheios-panel__header-logo">
        <img class="alpheios-panel__header-logo-img" src="../../images/icon.png">
      </div>
      <span class="alpheios-panel__header-btn-group--center">
        <navbuttons-large></navbuttons-large>
      </span>
      <span class="alpheios-panel__header-btn-group--end">

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_LEFT')" tooltipDirection="bottom-narrow"
                            v-show="attachToLeftVisible">
                <span @click="setPosition('left')"
                      class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow alpheios_left"
                      v-show="attachToLeftVisible">
                    <attach-left-icon></attach-left-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_RIGHT')" tooltipDirection="bottom-narrow"
                            v-show="attachToRightVisible">
                <span @click="setPosition('right')"
                      class="alpheios-panel__header-action-btn alpheios-panel__header-action-btn--narrow alpheios_right"
                      v-show="attachToRightVisible">
                    <attach-right-icon></attach-right-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip
                  :tooltipText="l10n.getText('TOOLTIP_CLOSE_PANEL')"
                  tooltipDirection="bottom-right">
                <span @click="ui.closePanel" class="alpheios-panel__header-action-btn alpheios_close">
                    <close-icon></close-icon>
                </span>
              </alph-tooltip>
            </span>
    </div>

    <div class="alpheios-panel__content">

      <div
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab-panel--fw alpheios-panel__tab__definitions"
          v-if="$store.getters['ui/isActiveTab']('definitions')">
        <div class="alpheios-lookup__panel">
          <lookup :clearLookupText="clearLookupText" :parentLanguage="lookupParentLanguage"></lookup>
        </div>
        <div v-if="$store.state.app.defDataReady">
          <div class="alpheios-panel__contentitem"
               v-for="definition in formattedShortDefinitions" :key="definition.ID">
            <shortdef :definition="definition" :languageCode="$store.state.app.status.languageCode"></shortdef>
          </div>
          <div class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
               v-html="formattedFullDefinitions"></div>
        </div>
        <div v-else>
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
      </div>
      <div :id="inflectionsPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
           v-if="$store.state.app.hasInflData" v-show="$store.getters['ui/isActiveTab']('inflections')">
        <inflections @contentwidth="setContentWidth" class="alpheios-panel-inflections"></inflections>
      </div>
      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser')">
        <inflection-browser @contentwidth="setContentWidth">
        </inflection-browser>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
           v-show="$store.getters['ui/isActiveTab']('grammar')">
        <grammar></grammar>
      </div>
      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.getters['ui/isActiveTab']('treebank')">
        <!-- TODO: Instead of this we need to create a universal mechanism for handling panel resizing for every tab's content change -->
        <treebank @treebankcontentwidth="setTreebankContentWidth"></treebank>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status" v-show="$store.getters['ui/isActiveTab']('status')">
        <!-- Messages to be displayed in a status panel -->
        <div v-for="message in $store.state.ui.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status" v-show="$store.getters['ui/isActiveTab']('user')">
        <user-auth></user-auth>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
           v-if="$store.getters['app/hasWordUsageExamplesData']" v-show="$store.getters['ui/isActiveTab']('wordUsage')">
        <word-usage-examples-block
            :wordUsageList="$store.state.app.wordUsageExamplesData.wordUsageExamples"
            :targetWord="$store.state.app.wordUsageExamplesData.targetWord"
            :language="$store.state.app.wordUsageExamplesData.language"
            :provider="$store.state.app.wordUsageExamplesData.provider">
        </word-usage-examples-block>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__options" v-show="$store.getters['ui/isActiveTab']('options')">
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
           v-show="$store.getters['ui/isActiveTab']('info')">
        <div class="alpheios-lookup__panel">
          <lookup :clearLookupText="clearLookupText" :parentLanguage="lookupParentLanguage"></lookup>
        </div>
        <info></info>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist" v-show="$store.getters['ui/isActiveTab']('wordlist')">
        <word-list-panel :updated="$store.state.app.wordListUpdated" :wordlistC="app.wordlistC"></word-list-panel>
      </div>
    </div>
    <div class="alpheios-panel__notifications uk-text-small"
         :class="{ 'alpheios-panel__notifications--important': $store.state.ui.notification.important }"
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
import AttachLeftIcon from '../../images/inline-icons/attach-left.svg'
import AttachRightIcon from '../../images/inline-icons/attach-right.svg'

// Vue components
import CompactPanel from '@/vue/components/panel-compact.vue'

export default {
  name: 'Panel',
  extends: CompactPanel,
  components: {
    navbuttonsLarge: NavbuttonsLarge,
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
  @import "../../styles/alpheios";

  .alpheios-panel--large {
    height: 100vh;
    top: 0;
    overflow: auto;
    grid-template-rows: 40px auto 60px;

    & .alpheios-panel__content {
      margin-top: 20px;
    }
  }
</style>
