<template>
  <div class="alpheios-tab-options" data-alpheios-ignore="all">
    <div class="alpheios-tab-options__optionscont">
      <div class="alpheios-tab-options-switch">
          <alph-tooltip :tooltipText="l10n.getText('OPTIONS_TAB_UI')" tooltipDirection="bottom-left">
            <div class="alpheios-tab-options-switch--item" :class="{ 'alpheios-active': currentTab === 1 }" @click="currentTab = 1">UI</div>
          </alph-tooltip>
          <alph-tooltip :tooltipText="l10n.getText('OPTIONS_TAB_FEATURE')" tooltipDirection="bottom-left">
            <div class="alpheios-tab-options-switch--item" :class="{ 'alpheios-active': currentTab === 2 }" @click="currentTab = 2">F<span class="alpheios-tab-options-switch--item__smaller">eatures</span></div>
          </alph-tooltip>
          <alph-tooltip :tooltipText="l10n.getText('OPTIONS_TAB_RESOURCE')" tooltipDirection="bottom-left">
            <div class="alpheios-tab-options-switch--item" :class="{ 'alpheios-active': currentTab === 3 }" @click="currentTab = 3">R<span class="alpheios-tab-options-switch--item__smaller">esources</span></div>
          </alph-tooltip>
          <alph-tooltip :tooltipText="l10n.getText('OPTIONS_TAB_ADVANCED')" tooltipDirection="bottom-left">
            <div class="alpheios-tab-options-switch--item" :class="{ 'alpheios-active': currentTab === 4 }" @click="currentTab = 4">A<span class="alpheios-tab-options-switch--item__smaller">dvanced</span></div>
          </alph-tooltip>
      </div>

          <ui-settings :key="uiSettingsKey" v-show="currentTab === 1"></ui-settings>
          <feature-settings :key="featureSettingsKey" v-show="currentTab === 2"></feature-settings>
          <resource-settings :key="resourceSettingsKey" v-show="currentTab === 3"></resource-settings>
          <advanced-settings :key="advancedSettingsKey" v-show="currentTab === 4"></advanced-settings>
      <div class="alpheios-tab-options-reset-all-block">
          <button @click="resetAllOptions"
              class="alpheios-button-primary">{{l10n.getText('LABEL_RESET_OPTIONS')}}
          </button>
          <p class="alpheios-tab-options-reset-all-block--title">({{l10n.getText('OPTIONS_TAB_RESET_ALL_TITLE')}})</p>

      </div>
    </div>
    <div class="alpheios-tab-options__aboutcont">
      <h3>{{ l10n.getMsg('TEXT_INFO_ABOUT') }}</h3>
      <div class="alpheios-info__versiontext alpheios-text__smallest">
        {{ app.name }} {{ app.version }} {{ buildNameForDisplay }}
      </div>
      <div class="alpheios-info__versiontext alpheios-text__smallest">
        {{ app.libName }} {{ app.libVersion }} {{ libBuildNameForDisplay }}
      </div>
    </div>
  </div>
</template>
<script>
import ResourceSettings from '@/vue/components/resource-settings.vue'
import FeatureSettings from '@/vue/components/feature-settings.vue'
import UISettings from '@/vue/components/ui-settings.vue'
import AdvancedSettings from '@/vue/components/advanced-settings.vue'

import Tooltip from '@/vue/components/tooltip.vue'

export default {

  name: 'OptionsPanel',
  components: {
    uiSettings: UISettings,
    resourceSettings: ResourceSettings,
    featureSettings: FeatureSettings,
    advancedSettings: AdvancedSettings,
    alphTooltip: Tooltip
  },
  inject: ['l10n', 'app', 'settings'],
  data: function () {
    return {
      currentTab: 1
    }
  },
  computed: {
    uiSettingsKey () {
      return `${this.$options.prefixName}-settings-ui-${this.$store.state.settings.uiResetCounter}`
    },

    resourceSettingsKey () {
      return `${this.$options.prefixName}-settings-resource-${this.$store.state.settings.resourceResetCounter}`
    },

    featureSettingsKey () {
      return `${this.$options.prefixName}-settings-feature-${this.$store.state.settings.featureResetCounter}`
    },

    advancedSettingsKey () {
      return `${this.$options.prefixName}-settings-ui-${10 + this.$store.state.settings.uiResetCounter}`
    },

    buildNameForDisplay () {
      // if the build number is already included in the package version then
      // don't display it
      if (this.app.version.indexOf(this.app.buildName) === -1) {
        return `build ${this.app.buildName}`
      } else {
        return ''
      }
    },

    libBuildNameForDisplay () {
      // if the build number is already included in the package version then
      // don't display it
      if (this.app.libVersion.indexOf(this.app.libBuildName) === -1) {
        return `build ${this.app.libBuildName}`
      } else {
        return ''
      }
    }
  },
  methods: {
    resetAllOptions: function () {
      this.settings.resetAllOptions()
      this.app.applyOptions()
    }
  }
}
</script>
<style lang="scss">
    @import "../../styles/variables";

    .alpheios-tab-options {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    .alpheios-tab-options-switch {
        margin-bottom: textsize(15px);
        text-align: right;
    }

    $iconSize: 20px;

    .alpheios-tab-options-switch--item {
        display: inline-block;
        padding: $iconSize/3 $iconSize*0.65;
        margin-left: $iconSize / 4;
        border-radius: $iconSize;
        font-weight: bold;
        background: var(--alpheios-desktop-panel-icon-bg);
        color: var(--alpheios-desktop-panel-icon-color);
        cursor: pointer;
        font-size: $iconSize;

        &:hover {
            background: var(--alpheios-desktop-panel-icon-bg-hover);
            color: var(--alpheios-desktop-panel-icon-color-hover);
        }

        &.alpheios-active {
            background: var(--alpheios-desktop-panel-icon-bg-active);
            color: var(--alpheios-desktop-panel-icon-color-active);
        }

        span.alpheios-tab-options-switch--item__smaller {
          font-size: 65%;
          color: inherit;
        }
    }

    .alpheios-tab-options-reset-all-block {
      display: flex;
      align-items: baseline;
      flex: 1 1 auto;
      padding-top: 10px;

      .alpheios-tab-options-reset-all-block--title {
        font-weight: bold;
        margin-left: 15px;
      }
    }

    .alpheios-tab-options__aboutcont {
      border-top: 1px solid;
      padding-top: 10px;
      font-size: textsize(12px);
    }

  .alpheios-panel__tab-panel--options fieldset {
    padding: textsize(10px) textsize(20px) textsize(20px);
    border: 2px groove threedface;
  }
</style>
