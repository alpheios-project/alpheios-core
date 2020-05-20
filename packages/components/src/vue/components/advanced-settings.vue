<template>
  <div class="alpheios-adv-options__cont">
    <setting
        :classes="['alpheios-adv-options__item']"
        :data="uiOptions.items.verboseMode"
        @change="uiOptionChanged"
    >
    </setting>

    <fieldset class="alpheios-adv-options__cont-wordselect">
      <legend>{{ l10n.getText("LABEL_FIELDSET_MOUSEMOVE") }}</legend>
       <setting
          class="alpheios-adv-options__item"
          :data="uiOptions.items.mouseMoveDelay"
          @change="uiOptionChanged"
      >
      </setting>
       <setting
          class="alpheios-adv-options__item"
          :data="uiOptions.items.mouseMoveAccuracy"
          @change="uiOptionChanged"
      >
      </setting>
      <setting
          class="alpheios-adv-options__item"
          :data="uiOptions.items.forceMouseMoveGoogleDocs"
          @change="uiOptionChanged"
      >
      </setting>
      <setting
          class="alpheios-adv-options__item"
          :data="uiOptions.items.enableMouseMoveLimitedByIdCheck"
          @change="uiOptionChanged"
      >
      </setting>
      <setting
          class="alpheios-adv-options__item"
          :data="uiOptions.items.mouseMoveLimitedById"
          @change="uiOptionChanged"
      >
      </setting>
    </fieldset>
  </div>
</template>
<script>
import FontSize from './font-size.vue'
import Setting from './setting.vue'
import Options from '@/lib/options/options.js'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
export default {
  name: 'AdvancedSettings',
  // API modules that are required for this component
  inject: {
    app: 'app',
    ui: 'ui',
    l10n: 'l10n',
    settings: 'settings'
  },
  storeModules: ['app', 'ui'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    setting: Setting,
    fontSize: FontSize
  },
  data: function () {
    return {
    }
  },
  computed: {
    uiOptions: function () {
      return this.settings.getUiOptions()
    }
  },
  methods: {
    uiOptionChanged: function (name, value) {
      const keyinfo = Options.parseKey(name)
      this.ui.optionChange(keyinfo.name, value)
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";
  .alpheios-adv-options__cont {
    display: flex;
    flex-direction: column;
  }

  .alpheios-adv-options__item {
    margin-bottom: textsize(15px);
    display: flex;
    align-items: flex-start;
    flex: 1 1 auto;
  }

  .alpheios-adv-options__popup-size-item {
    display: flex;
    flex-direction: column;
    margin-bottom: textsize(20px);

    &_top-label {
      margin-bottom: textsize(5px);
    }

    &_bottom-label {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
