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
              autocapitalize="off"
              autocorrect="off"
              @keyup.enter="lookup"
              class="alpheios-input"
              type="text"
              v-model="lookuptext"
          >
          <button
              @click.stop="lookup"
              class="alpheios-button-primary"
              tabindex="-1"
              type="button"
          >
            <span class="alpheios-lookup__search-control-label">{{ l10n.getMsg('LABEL_LOOKUP_BUTTON') }}</span>
            <span class="alpheios-lookup__search-control-icon alpheios-navbuttons__btn"><lookup-icon/></span>
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
import TextSelector from '@comp-src/lib/selection/text-selector'
import LexicalQueryLookup from '@comp-src/lib/queries/lexical-query-lookup'
import { LanguageModelFactory } from 'alpheios-data-models'
import LookupIcon from '@comp-src/images/inline-icons/lookup.svg'

import Setting from './setting.vue'

export default {
  name: 'Lookup',
  inject: ['app', 'ui', 'l10n', 'settings'],
  storeModules: ['app'],
  components: {
    alphSetting: Setting,
    lookupIcon: LookupIcon
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
    },

    showResultsIn: {
      type: String,
      required: false,
      default: 'popup'
    }
  },
  created: function () {
    if (this.usePageLangPrefs) {
      // Use language settings of a page
      this.$options.lookupLanguage = this.settings.featureOptions.items.preferredLanguage
      this.$options.resourceOptions = this.settings.resourceOptions
    } else {
      // Use lookup language settings
      this.$options.lookupLanguage = this.settings.featureOptions.items.lookupLanguage
      this.$options.resourceOptions = this.settings.lookupResourceOptions
    }
  },

  computed: {
    currentLanguage () {
      const selectedValue = this.$options.lookupLanguage.currentTextValue()
      // langUpdated is included into the condition to force Vue to recalculate value
      // every time language settings are updated
      return (this.langUpdated && selectedValue === 'Default')
        ? this.settings.featureOptions.items.preferredLanguage.currentItem()
        : this.$options.lookupLanguage.currentItem()
    },

    lexiconsFiltered () {
      let lang = this.$options.lookupLanguage.values.filter(v => v.text === this.currentLanguage.text)
      let settingName
      if (lang.length > 0) {
        settingName = `lexiconsShort-${lang[0].value}`
      }

      return this.$options.resourceOptions.items.lexiconsShort.filter((item) => item.name === settingName)
    }
  },
  watch: {
    '$store.state.app.morphDataReady' (morphDataReady) {
      if (morphDataReady && this.app.hasMorphData()) {
        this.lookuptext = ''
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
      const languageID = LanguageModelFactory.getLanguageIdFromCode(this.currentLanguage.value)

      let textSelector = TextSelector.createObjectFromText(this.lookuptext, languageID)

      this.app.updateLanguage(this.$options.lookupLanguage.currentValue)

      const resourceOptions = this.$options.resourceOptions
      const lemmaTranslationLang = this.app.state.lemmaTranslationLang

      const wordUsageExamples = this.app.enableWordUsageExamples(textSelector, 'onLexicalQuery')
        ? { paginationMax: this.settings.featureOptions.items.wordUsageExamplesMax.currentValue,
          paginationAuthMax: this.settings.featureOptions.items.wordUsageExamplesAuthMax.currentValue }
        : null

      let lexQuery = LexicalQueryLookup
        .create(textSelector, resourceOptions, lemmaTranslationLang, wordUsageExamples)

      this.app.newLexicalRequest(this.lookuptext, languageID)
      lexQuery.getData()
      // Notify parent that the lookup has been started so that the parent can close itself if necessary
      this.$emit('lookup-started')

      switch (this.showResultsIn) {
        case 'popup':
          this.ui.openPopup()
          this.ui.closePanel()
          break
        case 'panel':
          this.ui.showPanelTab('morphology')
          break
        default:
          console.warn(`Unknown afterLookupAction value: ${this.showResultsIn}`)
      }
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

    // Double selector is used to prevent style leaks from host pages
    input.alpheios-input,
    input.alpheios-input:focus
    {
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

  .alpheios-lookup__search-control-icon {
    display: none;
  }
  .alpheios-button-primary span.alpheios-lookup__search-control-label {
    color: var(--alpheios-btn-primary-font-color);
  }

  .alpheios-lookup__panel.alpheios-landscape {
    .alpheios-lookup__search-control-label {
      display: none;
    }
    .alpheios-button-primary {
      padding: 0;
    }
    .alpheios-lookup__search-control-icon {
      display: inline-block;
      width: 35px;
      height: 25px;
    }
  }
</style>
