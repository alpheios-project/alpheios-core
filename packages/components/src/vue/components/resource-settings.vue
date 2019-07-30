<template>
  <div class="alpheios-resource-options__cont">
    <setting
        :classes="['alpheios-resource-options__item']"
        :data="languageSetting"
        :key="languageSetting.name"
        @change="resourceSettingChanged"
        v-for="languageSetting in resourceSettingsLexicons"
    >
    </setting>
    <setting
        :classes="['alpheios-resource-options__item']"
        :data="languageSetting"
        :key="languageSetting.name"
        @change="resourceSettingChanged"
        v-for="languageSetting in resourceSettingsLexiconsShort"
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
      language: 'language',
      l10n: 'l10n',
      settings: 'settings'
    },
    mixins: [DependencyCheck],
    components: {
      setting: Setting,
    },
    computed: {
      resourceSettingsLexicons: function () {
        let resourceOptions = this.settings.getResourceOptions()
        return resourceOptions.items && resourceOptions.items.lexicons
          ? resourceOptions.items.lexicons.filter(item => item.values.length > 0)
          : []
      },
      resourceSettingsLexiconsShort: function () {
        let resourceOptions = this.settings.getResourceOptions()
        return resourceOptions.items && resourceOptions.items.lexiconsShort
          ? resourceOptions.items.lexiconsShort.filter(item => item.values.length > 0)
          : []
      }
    },
    methods: {
      resourceSettingChanged: function (name, value) {
        let keyinfo = Options.parseKey(name)
        this.language.resourceSettingChange(keyinfo.name, value)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../styles/variables";
  .alpheios-resource-options__cont {
    display: flex;
    flex-direction: column;
  }
  .alpheios-resource-options__item {
    margin-bottom: textsize(15px);
    display: flex;
    align-items: flex-start;
    flex: 1 1 auto;
  }
</style>