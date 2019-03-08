<template>
  <div class="alpheios-lookup__form">
    <input :placeholder="l10n.getMsg('LABEL_LOOKUP_BUTTON')" @keyup.enter="lookup" class="uk-input alpheios-lookup__input"
           type="text"
           v-model="lookuptext"
    >
    <alph-tooltip :tooltipText="l10n.getMsg('LABEL_LOOKUP_BUTTON')" tooltipDirection="top-right">
      <span class="alpheios-lookup__button_with_link">
      <button @click="lookup" class="uk-button uk-button-primary uk-button-small alpheios-lookup__button" tabindex="-1"
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
        <input id="alpheios-checkbox-input" type="checkbox" v-model="overrideLanguage">
        <label @click="checkboxClick" class="alpheios-override-lang__label" for="checkbox">{{ overrideLanguageLabel
          }}</label>
      </div>

      <div class="alpheios-lookup__settings">
        <div class="alpheios-lookup__settings-items" v-show="showLanguageSettings">
          <alph-setting :classes="['alpheios-panel__options-item']" :data="lookupLanguage"
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
      showLanguageSettings: false,
      initLanguage: null,
      currentLanguage: null,
      instanceContentOptions: {},
      istanceResourceOptions: {},

      overrideLanguage: false,
      overrideLanguageLabel: 'Change language'
    }
  },
  props: {
    // A name of the language. Used in setting initial and current lookup languages
    parentLanguage: {
      type: String,
      required: false
    },
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
    }
  },
  created: function () {
    this.instanceContentOptions = this.settings.contentOptions.clone(TempStorageArea)
    this.instanceResourceOptions = this.settings.resourceOptions.clone(TempStorageArea)
    if (this.parentLanguage) {
      this.initLanguage = this.parentLanguage
      this.currentLanguage = this.parentLanguage
    } else {
      this.currentLanguage = this.$store.state.app.preferredLanguageName || this.instanceContentOptions.items.preferredLanguage.currentTextValue()
    }
    this.instanceContentOptions.items.lookupLanguage.setTextValue(this.currentLanguage)
    console.log(`at creation current language is ${this.currentLanguage}`)
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
    },
    lookupLanguage: function () {
      // let currentLanguage
      if (this.overrideLanguage && !this.currentLanguage) {
        this.initLanguage = this.instanceContentOptions.items.preferredLanguage.currentTextValue()
        this.currentLanguage = this.initLanguage
        this.instanceContentOptions.items.lookupLanguage.setTextValue(this.initLanguage)
      } else if ((this.parentLanguage && this.parentLanguage !== null) && (this.parentLanguage !== this.initLanguage)) {
        this.initLanguage = this.parentLanguage
        this.currentLanguage = this.parentLanguage
        this.instanceContentOptions.items.lookupLanguage.setTextValue(this.parentLanguage)
      }
      return this.instanceContentOptions.items.lookupLanguage
    }
  },
  watch: {
    clearLookupText: function (value) {
      if (value) {
        this.lookuptext = ''
        this.showLanguageSettings = this.overrideLanguage
      }
    },

    overrideLanguage: function (value) {
      this.overrideLanguage = value
      this.updateUIbyOverrideLanguage()
    }
  },
  methods: {
    'lookup': function () {
      if (this.lookuptext.length === 0) {
        return null
      }

      const languageID = this.overrideLanguage
        ? LanguageModelFactory.getLanguageIdFromCode(this.lookupLanguage.currentValue)
        : LanguageModelFactory.getLanguageIdFromCode(this.instanceContentOptions.items.lookupLanguage.currentValue)

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

    'switchLookupSettings': function () {
      this.showLanguageSettings = !this.showLanguageSettings
      if (this.$parent !== undefined) {
        this.$parent.$emit('updatePopupDimensions')
      }
    },

    settingChange: function (name, value) {
      this.instanceContentOptions.items.lookupLanguage.setTextValue(value)
      this.currentLanguage = value
    },

    resourceSettingChange: function (name, value) {
      let keyinfo = this.instanceResourceOptions.parseKey(name)
      this.instanceResourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
    },

    updateUIbyOverrideLanguage: function () {
      if (this.overrideLanguage !== this.showLanguageSettings) {
        this.switchLookupSettings()
      }

      if (!this.overrideLanguage) {
        this.currentLanguage = this.instanceContentOptions.items.preferredLanguage.currentTextValue()
        this.instanceContentOptions.items.lookupLanguage.setTextValue(this.currentLanguage)
      }
    },

    checkboxClick: function () {
      this.overrideLanguage = !this.overrideLanguage
      this.settings.contentOptions.items.lookupLangOverride.setValue(this.overrideLanguage)

      this.updateUIbyOverrideLanguage()
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-lookup__form {
    margin: 15px 10px 5px;

    text-align: left;

  }

  .uk-input.alpheios-lookup__input {
    width: 70%;
    margin-bottom: 10px;
    vertical-align: top;

    &:focus {
      border-color: $alpheios-link-hover-color;
    }
  }

  .uk-button.alpheios-lookup__button {
    vertical-align: top;
    display: block;
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
    .uk-select:not([multiple]):not([size]),
    .uk-select[multiple],
    .uk-select[size],
    .uk-textarea {
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
