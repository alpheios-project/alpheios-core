<template>
  <div class="alpheios-feature-options__cont">
    <setting
        :classes="['alpheios-feature-options-item']"
        :data="settings.featureOptions.items.enableWordUsageExamples"
        @change="featureOptionChanged"
    >
    </setting>

    <setting
        :classes="['alpheios-feature-options-item']"
        :data="settings.featureOptions.items.wordUsageExamplesON"
        @change="featureOptionChanged"
    >
    </setting>

    <setting
        :classes="['alpheios-feature-options-item']"
        :data="settings.featureOptions.items.wordUsageExamplesAuthMax"
        @change="featureOptionChanged"
    >
    </setting>

    <setting
        :classes="['alpheios-feature-options-item']"
        :data="settings.featureOptions.items.wordUsageExamplesMax"
        @change="featureOptionChanged"
    >
    </setting>

    <setting
        :classes="['alpheios-feature-options-item']"
        :data="settings.featureOptions.items.enableLemmaTranslations"
        @change="featureOptionChanged"
    >
    </setting>

    <setting
        :classes="['alpheios-feature-options-item']"
        :data="settings.featureOptions.items.locale"
        @change="featureOptionChanged"
    >
    </setting>
  </div>
</template>
<script>
  import Setting from './setting.vue'
  import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
  export default {
    name: 'FeatureSettings',
    // API modules that are required for this component
    inject: {
      app: 'app',
      l10n: 'l10n',
      settings: 'settings'
    },
    storeModules: ['app'], // Store modules that are required by this component
    mixins: [DependencyCheck],
    components: {
      setting: Setting,
    },
    methods: {
      featureOptionChanged: function (name, value) {
        this.app.featureOptionChange(name, value)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../styles/variables";
  .alpheios-feature-options__cont {
    display: flex;
    flex-direction: column;
  }
  .alpheios-feature-options__item {
    margin-bottom: textsize(10px);
    display: flex;
    align-items: flex-start;
    flex: 1 1 auto;
  }
</style>