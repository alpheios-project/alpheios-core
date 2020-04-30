<template>
  <div class="alpheios-lookup__form" id="alpheios-lookup-form" data-alpheios-ignore="all" >
    <div class="alpheios-lookup__form-row">
      <div class="alpheios-lookup__form-element">
        <label class="alpheios-setting__label">Word lookup</label>

        <span class="alpheios-lookup__form-beta-codes-check" v-show="showUseBetaCodes">
          <input type="checkbox" id="greek-keyboard" v-model="useBetaCodes">
          <label for="greek-keyboard">{{ l10n.getMsg('LOOKUP_USE_BETA_CODES_CHECK') }}</label>
          <span
              @click="toggleBetaCodesInfo"
              class="alpheios-lookup__form-icon"
              v-show="app.platform.isDesktop"
          >
            <help-icon/>
          </span>
        </span>

        <div class="alpheios-lookup__search-control">
          <input-autocomplete
              :lang = "getLookupLanguage()"
              :clearValue = "clearLookupText"
              :useBetaCodes = "useBetaCodes"
              :enableLogeionAutoComplete = "$options.enableLogeionAutoComplete.currentValue"
              id="alpheios-lookup-input"
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

    <div v-show="showBetaCodesInfo" class="alpheios-lookup__form-beta-codes-info">
      <p v-html="l10n.getMsg('LOOKUP_USE_BETA_CODES_INFO_FIRST')"></p>
      <div><span>a => α</span><span>b => β</span><span>c => ξ</span><span>d => δ</span><span>e => ε</span>
      <span>f => φ</span><span>g => γ</span><span>h => η</span><span>i => ι</span><span>k => κ</span>
      <span>l => λ</span><span>m => μ</span><span>n => ν</span><span>o => ο</span><span>p => π</span>
      <span>q => θ</span><span>r => ρ</span><span>s => σ, ς</span><span>t => τ</span><span>u => υ</span>
      <span>v => ϝ</span><span>w => ω</span><span>x => χ</span><span>y => ψ</span><span>z => ζ</span>
      <span>/a => ά</span><span>\a => ὰ</span><span>=a => ᾶ</span><span>)a => ἀ</span><span>)a => ἁ</span>
      <span>|a => ᾳ</span><span>_a => ᾱ</span><span>^a => ᾰ</span><span>+i => ϊ</span><span>(/|a => ᾅ</span></div>
    </div>
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
    <alph-setting
        v-if="showEnableAutocomplete"
        class="alpheios-panel__options-item alpheios-lookup__form-element alpheios-lookup__autocomplete"
        :data="this.$options.enableLogeionAutoComplete"
        :show-label-text = "enableLogeionAutoCompleteProps.showLabelText"
        :show-checkbox-title = "enableLogeionAutoCompleteProps.showCheckboxTitle"
        @change="settingChangeELA"
    >
    </alph-setting>
  </div>
</template>
<script>
import TextSelector from '@/lib/selection/text-selector'
import HelpIcon from '@/images/inline-icons/help-icon.svg'
import GreekInput from '@/lib/utility/greek-input.js'
import Options from '@/lib/options/options.js'

import { LanguageModelFactory, Constants } from 'alpheios-data-models'
import LookupIcon from '@/images/inline-icons/lookup.svg'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
import Logger from '@/lib/log/logger'

import Setting from './setting.vue'
import InputAutocomplete from '@/vue/components/form-components/input-autocomplete.vue'

export default {
  name: 'Lookup',
  inject: ['app', 'ui', 'l10n', 'settings', 'lexis'],
  mixins: [DependencyCheck],
  storeModules: ['app'],
  components: {
    alphSetting: Setting,
    lookupIcon: LookupIcon,
    helpIcon: HelpIcon,
    inputAutocomplete: InputAutocomplete
  },
  logger: Logger.getInstance(),
  data () {
    return {
      lookuptext: '',
      // A name of a language currently selected in the language drop-down
      // The following variable is used to signal that language options has been updated
      langUpdated: Date.now(),
      useBetaCodes: false,
      showBetaCodesInfo: false,
      clearLookupText: 0,
      enableLogeionAutoCompleteProps: {
        showLabelText: false,
        showCheckboxTitle: true
      }
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

    showResultsIn: {
      type: String,
      required: false,
      default: 'popup'
    }
  },
  created: function () {
    this.$options.lookupLanguage = this.settings.getFeatureOptions().items.lookupLanguage
    this.$options.enableLogeionAutoComplete = this.settings.getFeatureOptions().items.enableLogeionAutoComplete
  },

  computed: {
    lookupLangName () {
      return this.app.getLanguageName(this.getLookupLanguage()).name
    },
    showUseBetaCodes () {
      return this.getLookupLanguage() === GreekInput.langCode
    },
    showEnableAutocomplete () {
      const check = this.$options.enableLogeionAutoComplete.limitByLangs.includes(this.getLookupLanguage())
      this.$emit('toggleEnableAutocompleteCheck', check)
      return check
    }
  },
  watch: {
    '$store.state.app.selectedLookupLangCode' (langCode) {
      this.$options.lookupLanguage.setValue(langCode)
    },

    '$store.state.app.morphDataReady' (morphDataReady) {
      if (morphDataReady && this.app.hasMorphData()) {
        this.clearLookupText = this.clearLookupText + 1
      }
    }
  },
  methods: {
    getLookupLanguage () {
      return this.showLangSelector
        ? this.$options.lookupLanguage.currentValue
        : this.$store.state.app.selectedLookupLangCode
    },

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
      const selectedLangCode = this.getLookupLanguage()
      const selectedLangID = LanguageModelFactory.getLanguageIdFromCode(selectedLangCode)
      const textSelector = TextSelector.createObjectFromText(this.lookuptext, selectedLangID)

      try {
        this.lexis.lookupText(textSelector)
        // Notify parent  that the lookup has been started so that the parent can close itself if necessary
        this.$emit('lookup-started')
        this.showLookupResult()
      } catch (err) {
        // Lookup request cannot be completed
        console.warn(`Lookup request cannot be completed: ${err.message}`)
      }
    },

    showLookupResult () {
      switch (this.showResultsIn) {
        case 'popup':
          this.ui.openPopup()
          this.ui.closePanel()
          break
        case 'panel':
          this.ui.showPanelTab('morphology')
          break
        default:
          this.$options.logger.warn(`Unknown afterLookupAction value: ${this.showResultsIn}`)
      }
    },

    settingChangeLL (name, value) {
      this.$options.lookupLanguage.setTextValue(value)
      this.$store.commit('app/setSelectedLookupLang', this.$options.lookupLanguage.currentValue)
      this.langUpdated = Date.now()
    },

    settingChangeELA (name, value) {
      let keyinfo = Options.parseKey(name)
      this.app.featureOptionChange(keyinfo.name, value)
      this.$options.enableLogeionAutoComplete.setValue(value)
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

  .alpheios-lookup__form span.alpheios-lookup__form-beta-codes-check {
    vertical-align: middle;
    padding-left: uisize(10px);
    margin-bottom: uisize(6px);
    display: inline-block;

    label {
      line-height: 1;
      font-size: 90%;
      display: inline-block;
    }
    input {
      display: inline-block;
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
  .alpheios-lookup__form .alpheios-lookup__form-beta-codes-info {
    border-bottom: 1px solid var(--alpheios-color-placehoder);
    margin-bottom: calc(var(--alpheios-base-text-size) * 1.5);
    font-size: 94%;

    div {
      display: grid;
      grid-template-columns: repeat(4,1fr);
    }
  }

  .alpheios-lookup__autocomplete {
    margin-top: 5px;
    div.alpheios-checkbox-block {
      max-width: none;
    }
  }
</style>

