<template>
  <div class="alpheios-lookup__form" id="alpheios-lookup-form" data-alpheios-ignore="all" >
    <div class="alpheios-lookup__form-row">
      <div class="alpheios-lookup__form-element">
        <label class="alpheios-setting__label">Word lookup</label>

        <div class="alpheios-lookup__search-control">
          <input-autocomplete
              :lang = "lookupLanguage"
              :clearValue = "clearLookupText"
              :id="lookupInputName"
              @keyPressEnter = "lookup"
              @updateLookupText = "updateLookupText"
          />
          <button
              @click.stop="lookup"
              class="alpheios-button-primary"
              id="alpheios-lookup-form-button"
              tabindex="-1"
              type="button"
          >
            <span class="alpheios-lookup__search-control-label">{{ l10n.getMsg('LABEL_LOOKUP_BUTTON') }}</span>
            <span class="alpheios-lookup__search-control-icon alpheios-navbuttons__btn"><lookup-icon/></span>
          </button>
        </div>
      </div>
    </div>

    <beta-codes-info :availableUseBetaCodes = "availableUseBetaCodes" />
    <div v-show="! showLangSelector">
      <span class="alpheios-lookup__lang-hint" id="alpheios-lookup-form-lang-hint">{{l10n.getMsg('HINT_LOOKUP_LANGUAGE',{language:lookupLangName})}}</span>
      <span class="alpheios-lookup__lang-change" id="alpheios-lookup-form-lang-change" @click.stop="toggleLangSelector">{{l10n.getMsg('LABEL_LOOKUP_CHANGE_LANGUAGE')}}</span>
    </div>
    <alph-setting
        :classes="['alpheios-panel__options-item', 'alpheios-lookup__form-element', 'alpheios-lookup__lang-control']"
        :data="this.$options.lookupLanguage"
        @change="settingChangeLL"
        v-show="showLangSelector"
    >
    </alph-setting>

  </div>
</template>
<script>
import TextSelector from '@/lib/selection/text-selector'

import { LanguageModelFactory, Logger } from 'alpheios-data-models'
import LookupIcon from '@/images/inline-icons/lookup.svg'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

import Setting from './setting.vue'
import InputAutocomplete from '@/vue/components/form-components/input-autocomplete.vue'
import BetaCodesInfo from '@/vue/components/beta-codes-info.vue'
import GreekInput from '@/lib/utility/greek-input.js'

export default {
  name: 'Lookup',
  inject: ['app', 'ui', 'l10n', 'settings', 'lexis'],
  mixins: [DependencyCheck],
  storeModules: ['app'],
  components: {
    alphSetting: Setting,
    lookupIcon: LookupIcon,
    inputAutocomplete: InputAutocomplete,
    betaCodesInfo: BetaCodesInfo
  },
  logger: Logger.getInstance(),
  data () {
    return {
      lookuptext: '',
      // A name of a language currently selected in the language drop-down
      // The following variable is used to signal that language options has been updated
      langUpdated: Date.now(),
      clearLookupText: 0
    }
  },
  props: {
    nameBase: {
      type: String,
      required: true
    },

    // Whether to show a language selector within this component.
    showLangSelector: {
      type: Boolean,
      required: false,
      default: false
    },

    /*
    In what UI components results of the word lookup must be displayed.
    Possible values are defined in @see {@link uiController:UIController.components}
     */
    showResultsIn: {
      type: String,
      required: false,
      default: 'popup'
    }
  },
  created: function () {
    this.$options.lookupLanguage = this.settings.getFeatureOptions().items.lookupLanguage
  },

  computed: {
    lookupInputName () {
      return `alpheios-lookup-form-input__${this.nameBase}`
    },
    lookupLanguage () {
      return this.showLangSelector
        ? this.$options.lookupLanguage.currentValue
        : this.$store.state.app.selectedLookupLangCode
    },
    lookupLangName () {
      return this.app.getLanguageName(this.lookupLanguage).name
    },
    showEnableAutocomplete () {
      const check = this.featureOptions.enableLogeionAutoComplete.limitByLangs.includes(this.lookupLanguage)
      this.$emit('toggleEnableAutocompleteCheck', check)
      return check
    },
    featureOptions () {
      return this.$store.state.settings.featureResetCounter + 1 ? this.settings.getFeatureOptions() : null
    },
    availableUseBetaCodes () {
      const value = this.lookupLanguage === GreekInput.langCode
      this.$emit('updateAvailableUseBetaCodes', value)
      return value
    }
  },
  watch: {
    '$store.state.app.selectedLookupLangCode' (langCode) {
      this.$options.lookupLanguage.setValue(langCode)
      this.app.notifyExperimental(langCode)
    },

    '$store.state.app.morphDataReady' (morphDataReady) {
      if (morphDataReady && this.app.hasMorphData()) {
        this.clearLookupText = this.clearLookupText + 1
      }
    }
  },
  methods: {
    toggleLangSelector () {
      this.$emit('toggleLangSelector', true)
    },

    lookup () {
      this.lookuptext = this.lookuptext.trim()
      if (this.lookuptext.length === 0) {
        return null
      }

      /*
      If we override the language with the value selected, then the lookup language must be a current value of our `lookupLanguage` prop,
      otherwise it must be a value of panel's options `preferredLanguage` options item
       */
      const selectedLangCode = this.lookupLanguage
      const selectedLangID = LanguageModelFactory.getLanguageIdFromCode(selectedLangCode)
      const textSelector = TextSelector.createObjectFromText(this.lookuptext, selectedLangID, selectedLangCode)

      try {
        this.lexis.lookupText(textSelector)
        // Notify parent  that the lookup has been started so that the parent can close itself if necessary
        this.$emit('lookup-started')
        this.ui.showLookupResultsUI(this.showResultsIn)
      } catch (err) {
        // Lookup request cannot be completed
        this.$options.logger.warn(`Lookup request cannot be completed: ${err.message}`)
      }
    },

    settingChangeLL (name, value) {
      this.$options.lookupLanguage.setTextValue(value)
      this.$store.commit('app/setSelectedLookupLang', this.$options.lookupLanguage.currentValue)
      this.langUpdated = Date.now()
    },

    toggleBetaCodesInfo () {
      this.showBetaCodesInfo = !this.showBetaCodesInfo
      this.$emit('toggleBetaCodesInfo', this.showBetaCodesInfo)
    },

    updateLookupText (lookupText) {
      this.lookuptext = lookupText
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
      vertical-align: middle;
    }
  }

  // Placed here to have a double selector to override .alpheios-content input margin
  .alpheios-lookup__form-element {
    margin-bottom: uisize(10px);
    padding-top: uisize(10px);

    &.alpheios-lookup__lang-control {
      flex-direction: column;
      margin-right: uisize(50px);

      .alpheios-setting__control {
        width: textsize(120px);
      }
    }
  }

  .alpheios-lookup__lang-hint {
    font-size: textsize(12px);
  }
  span.alpheios-lookup__lang-change {
    color: var(--alpheios-lookup-link-color);
    &:hover {
      color: var(--alpheios-lookup-link-color-hover);
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

  .alpheios-lookup__form-icon {
    width: uisize(15px);
    height: uisize(15px);
    box-sizing: border-box;
    position: relative;
    fill: var(--alpheios-desktop-toolbar-bg);
    stroke: var(--alpheios-desktop-toolbar-bg);
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;

    svg {
      width: 92%;
      height: auto;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

</style>

