<template>
  <div :class="rootClasses" :data-notification-visible="data && data.notification && data.notification.important"
       :style="mainstyles" class="alpheios-panel auk"
       data-component="alpheios-panel"
       data-resizable="true" id="alpheios-panel-inner" v-on-clickaway="attachTrackingClick"
       v-show="this.$store.state.panel.visible">
    <!-- Show only important notifications for now -->

    <div class="alpheios-panel__header">
      <div class="alpheios-panel__header-logo">
        <img class="alpheios-panel__header-logo-img" src="../../images/icon.png">
      </div>
      <span class="alpheios-panel__header-btn-group--center" v-if="$store.state.app.tabState">

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_HELP')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('info')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.info }">
                  <info-icon class="alpheios-icon"></info-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_DEFINITIONS')" tooltipDirection="bottom-narrow">
                <span :class="{ active: $store.state.app.tabState.definitions }" @click="changeTab('definitions')"
                      class="alpheios-panel__header-nav-btn">
                  <definitions-icon class="alpheios-icon"></definitions-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters[`app/hasInflData`]">
                <span @click="changeTab('inflections')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.inflections }">
                  <inflections-icon class="alpheios-icon"></inflections-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT_BROWSER')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('inflectionsbrowser')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.inflectionsbrowser }">
                  <inflections-browser-icon class="alpheios-icon"></inflections-browser-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_GRAMMAR')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters[`app/hasGrammarRes`]">
                <span @click="changeTab('grammar')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.grammar }">
                  <grammar-icon class="alpheios-icon"></grammar-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters['app/hasTreebankData']">
                <span @click="changeTab('treebank')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.treebank }">
                  <treebank-icon class="alpheios-icon"></treebank-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_OPTIONS')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('options')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.options }">
                  <options-icon class="alpheios-icon"></options-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip v-if="Boolean(auth)" :tooltipText="l10n.getText('TOOLTIP_USER')"
                            tooltipDirection="bottom-narrow">
                <span @click="changeTab('user')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.user }">
                  <user-icon class="alpheios-icon"></user-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_WORD_USAGE')" tooltipDirection="bottom-narrow"
                            v-show="$store.getters['app/hasWordUsageExamplesData']">
                <span @click="changeTab('wordUsage')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.wordUsage }">
                  <word-usage-icon class="alpheios-icon"></word-usage-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip tooltipDirection="bottom-narrow" :tooltipText="l10n.getText('TOOLTIP_WORDLIST')">
                <span v-show="showWordList" v-bind:class="{ active: $store.state.app.tabState.wordlist }" @click="changeTab('wordlist')"
                  class="alpheios-panel__header-nav-btn">
                  <wordlist-icon class="alpheios-icon"></wordlist-icon>
                </span>
              </alph-tooltip>

              <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_STATUS')" tooltipDirection="bottom-narrow">
                <span @click="changeTab('status')" class="alpheios-panel__header-nav-btn"
                      v-bind:class="{ active: $store.state.app.tabState.status }"
                      v-show="verboseMode">
                  <status-icon class="alpheios-icon"></status-icon>
                </span>
              </alph-tooltip>
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

    <div class="alpheios-panel__content" v-if="$store.state.app.tabState">

      <div
          class="alpheios-panel__tab-panel alpheios-panel__content_no_top_padding alpheios-panel__tab-panel--fw alpheios-panel__tab__definitions"
          v-show="$store.state.app.tabState.definitions">
        <div class="alpheios-lookup__panel">
          <lookup :clearLookupText="clearLookupText" :parentLanguage="lookupParentLanguage"></lookup>
        </div>
        <div
            v-if="showDefinitionsPlaceholder">
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
        <div class="alpheios-panel__contentitem" v-for="definition in data.shortDefinitions">
          <shortdef :definition="definition" :languageCode="data.status.languageCode"></shortdef>
        </div>
        <div class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
             v-html="data.fullDefinitions"></div>
      </div>
      <div :id="inflectionsPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
           v-if="$store.getters[`app/hasInflData`]" v-show="inflectionsTabVisible">
        <inflections @contentwidth="setContentWidth" class="alpheios-panel-inflections"></inflections>
      </div>
      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.state.app.tabState.inflectionsbrowser">
        <inflection-browser @contentwidth="setContentWidth">
        </inflection-browser>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
           v-show="$store.state.app.tabState.grammar">
        <grammar></grammar>
      </div>
      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank alpheios-panel__tab-panel--no-padding alpheios-panel__tab-panel--fw"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.state.app.tabState.treebank">
        <treebank @treebankcontentwidth="setTreebankContentWidth"></treebank>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status" v-show="$store.state.app.tabState.status">
        <!-- Messages to be displayed in a status panel -->
        <div v-for="message in data.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status" v-show="$store.state.app.tabState.user">
        <user-auth :auth="data.auth"></user-auth>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__word-usage"
           v-show="$store.state.app.tabState.wordUsage" v-if="$store.getters['app/hasWordUsageExamplesData']">
        <word-usage-examples-block
            :wordUsageList="$store.state.app.wordUsageExamplesData.wordUsageExamples"
            :targetWord="$store.state.app.wordUsageExamplesData.targetWord"
            :language="$store.state.app.wordUsageExamplesData.language"
            :provider="$store.state.app.wordUsageExamplesData.provider">
        </word-usage-examples-block>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__options" v-show="$store.state.app.tabState.options">
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
           v-show="$store.state.app.tabState.info">
        <div class="alpheios-lookup__panel">
          <lookup :clearLookupText="clearLookupText" :parentLanguage="lookupParentLanguage"></lookup>
        </div>
        <info></info>
      </div>

      <div v-show="$store.state.app.tabState.wordlist" class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist">
        <word-list-panel :wordlistC="app.wordlistC" :updated="$store.state.app.wordListUpdated"></word-list-panel>
      </div>
    </div>
    <div :class="notificationClasses" class="alpheios-panel__notifications uk-text-small"
         v-if="data && data.notification" v-show="data.notification.important">
            <span @click="closeNotifications" class="alpheios-panel__notifications-close-btn">
                <close-icon></close-icon>
            </span>
      <span class="alpheios-panel__notifications-text" v-html="data.notification.text"></span>
      <setting :classes="['alpheios-panel__notifications--lang-switcher alpheios-text-smaller']"
               :data="settings.contentOptions.items.preferredLanguage"
               :show-title="false"
               @change="contentOptionChanged"
               v-show="data.notification.showLanguageSwitcher"></setting>
    </div>
  </div>
</template>
<script>
/*
  This is a desktop version of a panel
   */
// Vue components
import CompactPanel from '@/vue/components/panel-compact.vue'

export default {
  name: 'Panel',
  extends: CompactPanel,
  // `positionClassVariants` is a custom property. This is to prent Vue from attaching reactivity to it.
  positionClassVariants: {
    left: 'alpheios-panel-left',
    right: 'alpheios-panel-right'
  },
  computed: {
    rootClasses () {
      return this.$store.state.ui.rootClasses.concat([this.$options.positionClassVariants[this.panelPosition]])
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";
</style>
