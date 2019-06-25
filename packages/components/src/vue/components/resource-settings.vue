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
        return this.settings.resourceOptions.items && this.settings.resourceOptions.items.lexicons
          ? this.settings.resourceOptions.items.lexicons.filter(item => item.values.length > 0)
          : []
      },
      resourceSettingsLexiconsShort: function () {
        return this.settings.resourceOptions.items && this.settings.resourceOptions.items.lexiconsShort
          ? this.settings.resourceOptions.items.lexiconsShort.filter(item => item.values.length > 0)
          : []
      }
    },
    methods: {
      resourceSettingChanged: function (name, value) {
        this.language.resourceSettingChange(name, value)
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
    margin-bottom: textsize(10px);
    display: flex;
    align-items: flex-start;
    flex: 1 1 auto;
  }
</style>