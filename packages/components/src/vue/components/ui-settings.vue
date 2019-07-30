<template>
  <div class="alpheios-ui-options__cont">
    <font-size></font-size>
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
    storeModules: ['app','ui'], // Store modules that are required by this component
    mixins: [DependencyCheck],
    components: {
      setting: Setting,
      fontSize: FontSize
    },
    computed: {
      uiOptions: function() {
        return this.settings.getUiOptions()
      }
    },
    methods: {
      uiOptionChanged: function (name, value) {
        let keyinfo = Options.parseKey(name)
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
</style>