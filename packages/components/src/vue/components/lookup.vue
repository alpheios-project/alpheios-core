<template>
  <div class="alpheios-lookup__form">
    <div class="alpheios-lookup__form-row">
      <alph-setting
          :classes="['alpheios-panel__options-item', 'alpheios-lookup__form-element', 'alpheios-lookup__lang-control']"
          :data="this.$options.lookupLanguage"
          @change="settingChange"
          v-if="showLangSelector"
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
        v-if="showLangSelector"
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
import Options from '@/lib/options/options'
import { LanguageModelFactory } from 'alpheios-data-models'
import LookupIcon from '@/images/inline-icons/lookup.svg'

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
      // A name of a language currently selected in the language drop-down
      selectedLangName: '',
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

    /*
    Whether to show a language selector within this component.
    */
    showLangSelector: {
      type: Boolean,
      required: false,
      default: true
    },

    showResultsIn: {
      type: String,
      required: false,
      default: 'popup'
    }
  },
  created: function () {
    console.info(`Controller's resource options are`, this.$options.resourceOptions)
    console.info(`Lookup resource options are`, this.settings.lookupResourceOptions)
    /*
    Lookup component uses its own version of resource options. This is because lookup component's resource
    options might not necessarily be the same as the ones used within a UI controller.
    */
    if (this.showLangSelector) {
      this.$options.lookupLanguage = this.settings.getFeatureOptions().items.lookupLanguage
      this.selectedLangName = this.$options.lookupLanguage.currentTextValue()
      this.$options.resourceOptions = this.settings.lookupResourceOptions
    } else {
      this.$options.resourceOptions = this.settings.getResourceOptions()
    }
  },

  computed: {
    /*useCurrentLanguage () {
      console.info(`useCurrentLanguage: ${!this.showLanguageSettingsGroup || (this.langUpdated && this.$options.lookupLanguage.currentTextValue() === 'Default')}`)
      return !this.showLanguageSettingsGroup || (this.langUpdated && this.$options.lookupLanguage.currentTextValue() === 'Default')
    },*/

    /*currentLanguageID () {
      console.info(`currentLanguageID, ${this.nameBase}`)
      console.info('Store:', this.$store.state.app.currentLanguageID)
      console.info('Selected:', LanguageModelFactory.getLanguageIdFromCode(this.$options.lookupLanguage.currentValue))
      return this.useCurrentLanguage
        ? this.$store.state.app.currentLanguageID
        : LanguageModelFactory.getLanguageIdFromCode(this.$options.lookupLanguage.currentValue)
    },*/

    lexiconsFiltered () {
      console.info(`Lexicon filtered are called for ${this.selectedLangName} in ${this.nameBase}`)
      let lang = this.$options.lookupLanguage.values.filter(v => v.text === this.selectedLangName)
      let settingGroup
      if (lang.length > 0) {
        settingGroup = lang[0].value
      }

      return this.$options.resourceOptions.items.lexiconsShort.filter((item) => Options.parseKey(item.name).group === settingGroup)
    }
  },
  watch: {
    '$store.state.app.selectedLookupLangCode' (langCode) {
      console.info(`Selected lookup lang code in the store has been changed to ${langCode}, in ${this.nameBase}`)
      if (this.showLangSelector) {
        console.info(`Changing lookup language to ${langCode} in ${this.nameBase}`)
        this.$options.lookupLanguage.setValue(langCode)
        this.selectedLangName = this.$options.lookupLanguage.currentTextValue()
      }
    },

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
      If we override the language with the value selected, then the lookup language must be a current value of our `lookupLanguage` prop,
      otherwise it must be a value of panel's options `preferredLanguage` options item
       */

      const selectedLangCode = this.showLangSelector
        ? this.$options.lookupLanguage.currentValue
        : this.app.getDefaultLangCode()
      const selectedLangID = LanguageModelFactory.getLanguageIdFromCode(selectedLangCode)
      console.info(`Lookup in ${this.nameBase}, selected lang code is ${selectedLangCode}`)

      let textSelector = TextSelector.createObjectFromText(this.lookuptext, selectedLangID)

      const resourceOptions = this.$options.resourceOptions
      const lemmaTranslationLang = this.app.state.lemmaTranslationLang
      let featureOptions = this.settings.getFeatureOptions()

      const wordUsageExamples = this.app.enableWordUsageExamples(textSelector, 'onLexicalQuery')
        ? { paginationMax: featureOptions.items.wordUsageExamplesMax.currentValue,
          paginationAuthMax: featureOptions.items.wordUsageExamplesAuthMax.currentValue }
        : null

      let lexQuery = LexicalQueryLookup
        .create(textSelector, resourceOptions, lemmaTranslationLang, wordUsageExamples)

      // A newLexicalRequest will call app.updateLanguage(languageID)
      this.app.newLexicalRequest(this.lookuptext, selectedLangID)
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
      console.info(`Settings in ${this.nameBase} have been changed to`, value)
      this.$options.lookupLanguage.setTextValue(value)
      this.$store.commit('app/setSelectedLookupLang', this.$options.lookupLanguage.currentValue)
      this.langUpdated = Date.now()
    },

    resourceSettingChange: function (name, value) {
      let keyinfo = Options.parseKey(name)
      this.settings.lookupResourceOptions.items[keyinfo.name].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
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

  $fieldsetHeight: 40px;

  .alpheios-lookup__search-control {
    display: flex;

    // Double selector is used to prevent style leaks from host pages

    input.alpheios-input,
    input.alpheios-input:focus
    {
      width: 70%;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      height: $fieldsetHeight;
      min-width: 0;
      border-color: var(--alpheios-lookup-input-border-color);
    }

    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: $fieldsetHeight;

      background-color: var(--alpheios-lookup-button-bg);
      color: var(--alpheios-lookup-button-color);
      border-color: var(--alpheios-lookup-button-border-color);

      &:hover,
      &:active,
      &:focus {
        background-color: var(--alpheios-lookup-button-bg-hover);
        color: var(--alpheios-lookup-button-color-hover);
        border-color: var(--alpheios-lookup-button-border-color-hover);
      }
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
