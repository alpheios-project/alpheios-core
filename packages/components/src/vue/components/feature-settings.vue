<template>
  <div class="alpheios-feature-options__cont">
    <setting
        class="alpheios-feature-options__item"
        :data="featureOptions.items.preferredLanguage"
        @change="featureOptionChanged"
    >
    </setting>
    <fieldset class="alpheios-feature-options__cont-concord">
      <legend>{{l10n.getText("LABEL_FIELDSET_USAGEEXAMPLES")}}</legend>
      <setting
          class="alpheios-feature-options__item"
          :data="featureOptions.items.enableWordUsageExamples"
          @change="featureOptionChanged"
      >
      </setting>

      <setting
          class="alpheios-feature-options__item"
          :data="featureOptions.items.wordUsageExamplesON"
          @change="featureOptionChanged"
      >
      </setting>

      <setting
          class="alpheios-feature-options__item"
          :data="featureOptions.items.wordUsageExamplesAuthMax"
          @change="featureOptionChanged"
      >
      </setting>

      <setting
          class="alpheios-feature-options__item"
          :data="featureOptions.items.wordUsageExamplesMax"
          @change="featureOptionChanged"
      >
      </setting>
    </fieldset>

    <setting
        class="alpheios-feature-options__item"
        :data="featureOptions.items.enableLemmaTranslations"
        @change="featureOptionChanged"
    >
    </setting>

    <setting
        class="alpheios-feature-options__item"
        :data="featureOptions.items.locale"
        @change="featureOptionChanged"
    >
    </setting>
  </div>
</template>
<script>
  import Setting from './setting.vue'
  import Options from '@/lib/options/options.js'
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
    computed: {
      featureOptions: function() {
        return this.settings.getFeatureOptions()
      }
    },
    methods: {
      featureOptionChanged: function (name, value) {
        let keyinfo = Options.parseKey(name)
        this.app.featureOptionChange(keyinfo.name, value)
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

  .alpheios-feature-options__cont-concord {
    margin: textsize(15px) 0;
    padding: 10px;

    border: 2px groove var(--alpheios-color-placehoder);
  }
</style>