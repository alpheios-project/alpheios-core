<template>
  <div class="alpheios-ui-options__cont">
    <font-size></font-size>
    <div class="alpheios-ui-options__popup-size-item">
      <label
          class="alpheios-ui-options__popup-size-item_top-label"
          for="alpheios-ui-options-popup-max-width"
      >{{uiOptions.items.maxPopupWidth.labelText}}</label>
      <input
          type="range"
          id="alpheios-ui-options-popup-max-width"
          v-model="maxPopupWidth"
          name="volume"
          :min="uiOptions.items.maxPopupWidth.values.min"
          :max="uiOptions.items.maxPopupWidth.values.max"
          :step="uiOptions.items.maxPopupWidth.values.step"
      >
      <label
          class="alpheios-ui-options__popup-size-item_bottom-label"
          for="alpheios-ui-options-popup-max-width"
      >
        <span class="alpheios-ui-options__popup-size-item_bottom-label-item">{{uiOptions.items.maxPopupWidth.labels.min}}</span>
        <span class="alpheios-ui-options__popup-size-item_bottom-label-item">{{uiOptions.items.maxPopupWidth.labels.mid}}</span>
        <span class="alpheios-ui-options__popup-size-item_bottom-label-item">{{uiOptions.items.maxPopupWidth.labels.max}}</span>
      </label>
    </div>

    <setting
        :classes="['alpheios-ui-options__item']"
        :data="uiOptions.items.panelPosition"
        @change="uiOptionChanged"
    >
    </setting>
    <setting
        :classes="['alpheios-ui-options__item']"
        :data="uiOptions.items.hideLoginPrompt"
        @change="uiOptionChanged"
    >
    </setting>
    <setting
        :classes="['alpheios-ui-options__item']"
        :data="uiOptions.items.verboseMode"
        @change="uiOptionChanged"
    >
    </setting>

    <fieldset class="alpheios-ui-options__cont-wordselect">
      <legend>{{ l10n.getText("LABEL_FIELDSET_MOUSEMOVE") }}</legend>
       <setting
          class="alpheios-feature-options__item"
          :data="uiOptions.items.mouseMoveDelay"
          @change="uiOptionChanged"
      >
      </setting>
       <setting
          class="alpheios-feature-options__item"
          :data="uiOptions.items.mouseMoveAccuracy"
          @change="uiOptionChanged"
      >
      </setting>
      <setting
          class="alpheios-feature-options__item"
          :data="uiOptions.items.enableMouseMoveLimitedByIdCheck"
          @change="uiOptionChanged"
      >
      </setting>
      <setting
          class="alpheios-feature-options__item"
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
  name: 'UISettings',
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
      maxPopupWidth: this.settings.getUiOptions().items.maxPopupWidth.currentValue
    }
  },
  computed: {
    uiOptions: function () {
      return this.settings.getUiOptions()
    }
  },
  watch: {
    maxPopupWidth: function (value) {
      // A value of maxPopupWidth has changed
      this.ui.optionChange('maxPopupWidth', value)
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
  .alpheios-ui-options__cont {
    display: flex;
    flex-direction: column;
  }

  .alpheios-ui-options__item {
    margin-bottom: textsize(15px);
    display: flex;
    align-items: flex-start;
    flex: 1 1 auto;
  }

  .alpheios-ui-options__popup-size-item {
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
