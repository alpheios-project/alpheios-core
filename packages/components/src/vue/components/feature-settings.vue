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

    <fieldset class="alpheios-ui-options__cont-wordselect">
      <legend>{{ l10n.getText("LABEL_FIELDSET_WORDSELECT") }}</legend>
      <setting
          class = "alpheios-feature-options__item"
          :data = "featureOptions.items.enableMouseMove"
          :selectedOverride = "mouseMoveChecked"
          @change = "featureOptionChanged"
          @clearSelectedOverride =  "clearMouseMoveOverride"
      >
      </setting>
    </fieldset>

    <setting
        class="alpheios-feature-options__item"
        :data="featureOptions.items.wordlistMaxFlashcardExport"
        @change="featureOptionChanged"
    >
    </setting>

    <fieldset class="alpheios-ui-options__cont-wordselect">
      <legend>{{ l10n.getText("LABEL_FIELDSET_BETACODES") }}</legend>
      <setting
        class="alpheios-feature-options__item"
        :data="featureOptions.items.useBetaCodes"
        @change="featureOptionChanged"
      >
      </setting>

      <setting
        class="alpheios-feature-options__item"
        :data="featureOptions.items.showBetaCodesInfo"
        @change="featureOptionChanged"
      >
      </setting>
    </fieldset>

    <setting
      class="alpheios-feature-options__item"
      :data="featureOptions.items.enableLogeionAutoComplete"
      @change="featureOptionChanged"
    >
    </setting>

  </div>
</template>
<script>
import { Options } from 'alpheios-data-models'

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
    setting: Setting
  },
  computed: {
    mouseMoveChecked: function () {
      return this.$store.state.app.mouseMoveOverrideUpdate && this.app.getMouseMoveOverride() ? 'true' : false
    },
    featureOptions () {
      return this.$store.state.settings.featureResetCounter + 1 ? this.settings.getFeatureOptions() : null
    }
  },
  methods: {
    featureOptionChanged: function (name, value) {
      const keyinfo = Options.parseKey(name)
      this.settings.featureOptionChange(keyinfo.name, value)
      this.app.applyFeatureOption(keyinfo.name)
    },
    clearMouseMoveOverride () {
      this.app.clearMouseMoveOverride()
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

  .alpheios-feature-options__cont-concord,
   .alpheios-feature-options__cont-wordselect {
    margin: textsize(15px) 0;
    padding: 10px;

    border: 2px groove var(--alpheios-color-placehoder);
  }

  .alpheios-ui-options__cont-wordselect {
    margin-bottom: textsize(10px);
  }
</style>
