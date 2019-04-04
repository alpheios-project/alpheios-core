<template>
  <div class="alpheios-lookup__form">
    <div class="alpheios-lookup__form-row">
      <alph-setting
          :classes="['alpheios-panel__options-item', 'alpheios-lookup__form-element', 'alpheios-lookup__lang-control']"
          :data="this.$options.lookupLanguage"
          @change="settingChange"
          v-if="showLanguageSettingsGroup"
      >
      </alph-setting>

      <div class="alpheios-lookup__form-element">
        <label class="alpheios-setting__label">Word lookup</label>
        <div class="alpheios-lookup__search-control">
          <input
              :placeholder="l10n.getMsg('LABEL_LOOKUP_BUTTON')"
              @keyup.enter="lookup"
              class="alpheios-input"
              type="text"
              v-model="lookuptext"
          >
          <button
              @click="lookup"
              class="alpheios-button-primary"
              tabindex="-1"
              type="button"
          >
            {{ l10n.getMsg('LABEL_LOOKUP_BUTTON') }}
          </button>
        </div>
      </div>
    </div>

    <template
        v-if="showLanguageSettingsGroup"
    >
      <div
          class="alpheios-lookup__settings"
      >
        <alph-setting
            :classes="['alpheios-panel__options-item', 'alpheios-lookup__resource-control']"
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

import Setting from './setting.vue'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Lookup',
  inject: ['app', 'ui', 'l10n', 'settings'],
  storeModules: ['app'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    alphSetting: Setting
  },
  data () {
    return {
      lookuptext: '',
      // The following variable is used to signal that language options has been updated
      langUpdated: Date.now()
    }
  },
  props: {
    nameBase: {
      type: String,
      required: true
    },
    showLanguageSettingsGroup: {
      type: Boolean,
      required: false,
      default: true
    },
    /*
    If the following prop is set to true, a lookup component will use preferredLanguage and resourceOptions
    as its data model. Otherwise, a lookup component will use lookupLanguage and lookupResourceOptions instead.
     */
    usePageLangPrefs: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created: function () {
    if (this.usePageLangPrefs) {
      // Use language settings of a page
      this.$options.lookupLanguage = this.settings.contentOptions.items.preferredLanguage
      this.$options.resourceOptions = this.settings.resourceOptions
    } else {
      // Use lookup language settings
      this.$options.lookupLanguage = this.settings.contentOptions.items.lookupLanguage
      this.$options.resourceOptions = this.settings.lookupResourceOptions
    }
  },

  computed: {
    currentLanguage: function () {
      const selectedValue = this.$options.lookupLanguage.currentTextValue()
      // langUpdated is included into the condition to force Vue to recalculate value
      // every time language settings are updated
      return (this.langUpdated && selectedValue === 'Default')
        ? this.settings.contentOptions.items.preferredLanguage.currentItem()
        : this.$options.lookupLanguage.currentItem()
    },

    lexiconsFiltered: function () {
      let lang = this.$options.lookupLanguage.values.filter(v => v.text === this.currentLanguage.text)
      let settingName
      if (lang.length > 0) {
        settingName = `lexiconsShort-${lang[0].value}`
      }

      return this.$options.resourceOptions.items.lexiconsShort.filter((item) => item.name === settingName)
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
      const languageID = LanguageModelFactory.getLanguageIdFromCode(this.currentLanguage.value)

      let textSelector = TextSelector.createObjectFromText(this.lookuptext, languageID)

      this.app.updateLanguage(this.$options.lookupLanguage.currentValue)

      const resourceOptions = this.$options.resourceOptions
      const lemmaTranslationLang = this.app.state.lemmaTranslationLang

      const wordUsageExamples = this.app.enableWordUsageExamples(textSelector, 'onLexicalQuery')
            ? { paginationMax: this.settings.contentOptions.items.wordUsageExamplesMax.currentValue,
              paginationAuthMax: this.settings.contentOptions.items.wordUsageExamplesAuthMax.currentValue }
            : null

      let lexQuery = LexicalQueryLookup
        .create(textSelector, resourceOptions, lemmaTranslationLang, wordUsageExamples)

      this.app.newLexicalRequest(this.lookuptext, languageID)

      lexQuery.getData()
      // A lookup, when started from a panel, should open a popup with lookup results
      this.ui.openPopup()
      this.ui.closePanel()

      // Clear the lookup text when the lookup started
      this.lookuptext = ''
    },

    settingChange: function (name, value) {
      this.$options.lookupLanguage.setTextValue(value)
      this.langUpdated = Date.now()
    },

    resourceSettingChange: function (name, value) {
      let keyinfo = this.settings.lookupResourceOptions.parseKey(name)
      this.settings.lookupResourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
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

    .alpheios-setting__label {
      display: inline-block;
      margin-bottom: uisize(6px);
      width: auto;
    }
  }

  // Placed here to have a double selector to override .alpheios-content input margin
  .alpheios-lookup__form-element {
    margin-bottom: uisize(10px);

    &.alpheios-lookup__lang-control {
      flex-direction: column;
      margin-right: uisize(50px);

      .alpheios-setting__control {
        width: textsize(120px);
      }
    }
  }

  .alpheios-lookup__settings {
    display: flex;
    flex-direction: column;
  }

  .alpheios-lookup__form-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .alpheios-lookup__search-control {
    display: flex;

    input {
      width: 70%;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .alpheios-lookup__resource-control {
    display: flex;
    flex-direction: column;

    .alpheios-setting__control {
      width: 100%;
    }
  }
</style>
