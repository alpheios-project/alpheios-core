<template>
  <div class="alpheios-lookup__form">
    <div class="alpheios-lookup__form-row">
      <input
          :placeholder="l10n.getMsg('LABEL_LOOKUP_BUTTON')"
          @keyup.enter="lookup"
          class="alpheios-input alpheios-lookup__form-element"
          type="text"
          v-model="lookuptext"
      >
      <alph-tooltip
          :tooltipText="l10n.getMsg('LABEL_LOOKUP_BUTTON')"
          tooltipDirection="top-right"
          class="alpheios-lookup__form-element"
      >
        <button
            @click="lookup"
            class="alpheios-button alpheios-button--primary"
            tabindex="-1"
            type="button"
        >
          {{ l10n.getMsg('LABEL_LOOKUP_BUTTON') }}
        </button>
      </alph-tooltip>
    </div>

    <template
        v-if="showLanguageSettingsGroup"
    >
      <div class="alpheios-lookup__form-row alpheios-checkbox-block">
        <input :id="`alpheios-${nameBase}-checkbox-input`" type="checkbox" v-model="overrideLanguage">
        <label
            class="alpheios-lookup__form-element"
            :for="`alpheios-${nameBase}-checkbox-input`"
        >
          {{ overrideLanguageLabel }}
        </label>
      </div>

      <div
          class="alpheios-lookup__settings"
          v-show="overrideLanguage"
      >
        <alph-setting
            :classes="['alpheios-panel__options-item', 'alpheios-lookup__form-row']"
            :data="instanceContentOptions.items.lookupLanguage"
            @change="settingChange"
        >
        </alph-setting>
        <alph-setting
            :classes="['alpheios-panel__options-item', 'alpheios-lookup__form-row']"
            :data="lexicon"
            :key="lexicon.name"
            @change="resourceSettingChange"
            v-for="lexicon in lexiconsFiltered"
        >
        </alph-setting>
      </div>
    </template>
  </div>
</template>
<script>
import TextSelector from '@/lib/selection/text-selector'
import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup'
import { LanguageModelFactory } from 'alpheios-data-models'
import TempStorageArea from '@/lib/options/temp-storage-area'

import Tooltip from './tooltip.vue'
import Setting from './setting.vue'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Lookup',
  inject: ['app', 'ui', 'l10n', 'settings'],
  storeModules: ['app'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    alphTooltip: Tooltip,
    alphSetting: Setting
  },
  data () {
    return {
      lookuptext: '',
      currentLanguage: null,
      instanceContentOptions: {},
      istanceResourceOptions: {},

      overrideLanguage: false,
      overrideLanguageLabel: 'Change language'
    }
  },
  props: {
    // When becomes `true`, forces a lookup text to be cleared
    clearLookupText: {
      type: Boolean,
      required: false,
      default: false
    },
    showLanguageSettingsGroup: {
      type: Boolean,
      required: false,
      default: true
    },
    nameBase: {
      type: String,
      required: true
    }
  },
  created: function () {
    this.instanceContentOptions = this.settings.contentOptions.clone(TempStorageArea)
    this.instanceResourceOptions = this.settings.resourceOptions.clone(TempStorageArea)
    this.currentLanguage = this.$store.state.app.preferredLanguageName || this.instanceContentOptions.items.preferredLanguage.currentTextValue()
    this.instanceContentOptions.items.lookupLanguage.setTextValue(this.currentLanguage)
  },

  computed: {
    lexiconSettingName: function () {
      let lang = this.instanceContentOptions.items.preferredLanguage.values.filter(v => v.text === this.currentLanguage)
      let settingName
      if (lang.length > 0) {
        settingName = `lexiconsShort-${lang[0].value}`
      }
      return settingName
    },
    lexiconsFiltered: function () {
      return this.instanceResourceOptions.items.lexiconsShort.filter((item) => item.name === this.lexiconSettingName)
    }
  },

  watch: {
    clearLookupText: function (value) {
      if (value) {
        this.lookuptext = ''
      }
    },

    overrideLanguage: function (value) {
      this.overrideLanguage = value

      if (value) {
        // If we start to override language, set an initial lookup language value
        // to the one selected in the panel options
        this.instanceContentOptions.items.lookupLanguage.setValue(
          this.settings.contentOptions.items.preferredLanguage.currentValue
        )
      }
    }
  },

  methods: {
    lookup: function () {
      if (this.lookuptext.length === 0) {
        return null
      }

      /*
      If we override the language, then the lookup language must be a current value of our `lookupLanguage` prop,
      otherwise it must be a value of panel's options `preferredLanguage` options item
       */
      const languageID = this.overrideLanguage
        ? LanguageModelFactory.getLanguageIdFromCode(this.instanceContentOptions.items.lookupLanguage.currentValue)
        : LanguageModelFactory.getLanguageIdFromCode(this.settings.contentOptions.items.preferredLanguage.currentValue)

      let textSelector = TextSelector.createObjectFromText(this.lookuptext, languageID)

      this.app.updateLanguage(this.instanceContentOptions.items.lookupLanguage.currentValue)
      this.instanceResourceOptions.items.lexicons = this.settings.resourceOptions.items.lexicons

      const resourceOptions = this.instanceResourceOptions || this.settings.resourceOptions
      const lemmaTranslationLang = this.app.state.lemmaTranslationLang
      LexicalQueryLookup
        .create(textSelector, resourceOptions, lemmaTranslationLang)
        .getData()
      // A lookup, when started from a panel, should open a popup with lookup results
      this.ui.openPopup()
      this.ui.closePanel()
    },

    settingChange: function (name, value) {
      this.instanceContentOptions.items.lookupLanguage.setTextValue(value)
      this.currentLanguage = value
    },

    resourceSettingChange: function (name, value) {
      let keyinfo = this.instanceResourceOptions.parseKey(name)
      this.instanceResourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-lookup__form {
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 100%;

    // Placed here to have a double selector to override .alpheios-content input margin
    .alpheios-lookup__form-element {
      margin-bottom: uisize(10px);
    }

    .alpheios-lookup__form-element:not(:last-child) {
      margin-right: uisize(10px);
    }
  }

  .alpheios-lookup__settings {
    display: flex;
    flex-direction: column;
  }

  .alpheios-lookup__form-row {
    display: flex;
  }
</style>
