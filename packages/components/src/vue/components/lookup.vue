<template>
  <div class="alpheios-lookup__form">
    <input :placeholder="l10n.getMsg('LABEL_LOOKUP_BUTTON')" @keyup.enter="lookup" class="alpheios-input alpheios-lookup__input"
           type="text"
           v-model="lookuptext"
    >
    <alph-tooltip :tooltipText="l10n.getMsg('LABEL_LOOKUP_BUTTON')" tooltipDirection="top-right">
      <span class="alpheios-lookup__button_with_link">
      <button @click="lookup" class="alpheios-button alpheios-button--primary" tabindex="-1"
              type="button"
      >
        {{ l10n.getMsg('LABEL_LOOKUP_BUTTON') }}
      </button>
      </span>
    </alph-tooltip>

    <template
        v-if="showLanguageSettingsGroup"
    >
      <div class="alpheios-override-lang alpheios-checkbox-block alpheios-checkbox-small">
        <input :id="`alpheios-${nameBase}-checkbox-input`" type="checkbox" v-model="overrideLanguage">
        <label
            class="alpheios-override-lang__label"
            :for="`alpheios-${nameBase}-checkbox-input`"
        >
          {{ overrideLanguageLabel }}
        </label>
      </div>

      <div class="alpheios-lookup__settings">
        <div class="alpheios-lookup__settings-items" v-show="overrideLanguage">
          <alph-setting :classes="['alpheios-panel__options-item']" :data="instanceContentOptions.items.lookupLanguage"
                        @change="settingChange"></alph-setting>
          <alph-setting :classes="['alpheios-panel__options-item']" :data="lexicon" :key="lexicon.name"
                        @change="resourceSettingChange" v-for="lexicon in lexiconsFiltered"></alph-setting>
        </div>
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
  @import "../../styles/alpheios";

  .alpheios-lookup__form {
    margin: 30px 5px 5px;
    text-align: left;
  }

  .alpheios-input.alpheios-lookup__input {
    width: 70%;
    margin-bottom: 10px;
    vertical-align: top;

    &:focus {
      border-color: $alpheios-link-hover-color;
    }
  }

  .alpheios-lookup__settings {
    text-align: left;
  }

  a.alpheios-lookup__settings-link {
    display: block;
    padding-top: 5px;
  }

  .alpheios-lookup__button_with_link {
    width: 29%;
  }

  .alpheios-panel {
    .alpheios-lookup__form {
      width: 100%;
      margin: 5px 0;
    }
  }

  .alpheios-panel__options-item {
    max-width: none;
  }

  .alpheios-panel__options-item {
    .alpheios-select:not([multiple]):not([size]),
    .alpheios-select[multiple],
    .alpheios-select[size] {
      max-width: 250px;
    }
  }

  .alpheios-override-lang {
    margin-bottom: 10px;
  }

  .alpheios-override-lang__label {
    padding-bottom: 10px;
  }

</style>
