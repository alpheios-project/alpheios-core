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
          <input
              autocapitalize="off"
              autocorrect="off"
              @keyup.enter="lookup"
              @keyup="updateBetaCodes"
              class="alpheios-input"
             :class="{ 'alpheios-rtl': directionRtl}"
              type="text"
              v-model="lookuptext"
              id="alpheios-lookup-form-input"
          >
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
      <p>{{ l10n.getMsg('LOOKUP_USE_BETA_CODES_INFO_FIRST') }}</p>
      <p><span>/a => ά</span><span>\a => ὰ</span><span>=a => ᾶ</span><span>)a => ἀ</span></p>
      <p><span>(a => ἁ</span><span>!a => ᾳ</span><span>+i => ϊ</span><span>h => η</span></p>
      <p><span>q => θ</span><span>x => χ</span><span>c => ξ</span><span>z = ζ</span></p>
      <p><span>j => ψ</span><span>w => ω</span><span>s => σ, ς</span></p>
      <p>{{ l10n.getMsg('LOOKUP_USE_BETA_CODES_INFO_LAST') }} )/a => ἄ</p>
    </div>
    <div v-show="! showLangSelector">
      <span class="alpheios-lookup__lang-hint" id="alpheios-lookup-form-lang-hint">{{l10n.getMsg('HINT_LOOKUP_LANGUAGE',{language:lookupLangName})}}</span>
      <span class="alpheios-lookup__lang-change" id="alpheios-lookup-form-lang-change" @click.stop="toggleLangSelector">{{l10n.getMsg('LABEL_LOOKUP_CHANGE_LANGUAGE')}}</span>
    </div>
    <alph-setting
        :classes="['alpheios-panel__options-item', 'alpheios-lookup__form-element', 'alpheios-lookup__lang-control']"
        :data="this.$options.lookupLanguage"
        @change="settingChange"
        v-show="showLangSelector"
    >
    </alph-setting>
  </div>
</template>
<script>
import TextSelector from '@/lib/selection/text-selector'
import GreekInput from '@/lib/utility/greek-input.js'
import HelpIcon from '@/images/inline-icons/help-icon.svg'

import { LanguageModelFactory, Constants } from 'alpheios-data-models'
import LookupIcon from '@/images/inline-icons/lookup.svg'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
import Logger from '@/lib/log/logger'

import Setting from './setting.vue'

export default {
  name: 'Lookup',
  inject: ['app', 'ui', 'l10n', 'settings', 'lexis'],
  mixins: [DependencyCheck],
  storeModules: ['app'],
  components: {
    alphSetting: Setting,
    lookupIcon: LookupIcon,
    helpIcon: HelpIcon
  },
  logger: Logger.getInstance(),
  data () {
    return {
      lookuptext: '',
      // A name of a language currently selected in the language drop-down
      // The following variable is used to signal that language options has been updated
      langUpdated: Date.now(),
      useBetaCodes: false,
      showBetaCodesInfo: false
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
  },

  computed: {
    lookupLangName () {
      return this.app.getLanguageName(this.getLookupLanguage()).name
    },
    directionRtl () {
      const model = LanguageModelFactory.getLanguageModelFromCode(this.getLookupLanguage())
      return model.direction === Constants.LANG_DIR_RTL
    },
    showUseBetaCodes () {
      return this.getLookupLanguage() === GreekInput.langCode
    }
  },
  watch: {
    '$store.state.app.selectedLookupLangCode' (langCode) {
      this.$options.lookupLanguage.setValue(langCode)
    },

    '$store.state.app.morphDataReady' (morphDataReady) {
      if (morphDataReady && this.app.hasMorphData()) {
        this.lookuptext = ''
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

      const resourceOptions = this.settings.getResourceOptions()
      const lemmaTranslationLang = this.app.state.lemmaTranslationLang
      const featureOptions = this.settings.getFeatureOptions()

      const wordUsageExamples = this.app.enableWordUsageExamples(textSelector, 'onLexicalQuery')
        ? {
          paginationMax: featureOptions.items.wordUsageExamplesMax.currentValue,
          paginationAuthMax: featureOptions.items.wordUsageExamplesAuthMax.currentValue
        }
        : null

      // A newLexicalRequest will call app.updateLanguage(languageID)
      this.app.newLexicalRequest(this.lookuptext, selectedLangID, null, 'lookup')
      this.lexis.lookupText(textSelector, resourceOptions, lemmaTranslationLang, wordUsageExamples, this.app.clientId,
        this.settings.verboseMode())
      // Notify parent that the lookup has been started so that the parent can close itself if necessary
      this.$emit('lookup-started')
      this.showLookupResult()
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

    settingChange (name, value) {
      this.$options.lookupLanguage.setTextValue(value)
      this.$store.commit('app/setSelectedLookupLang', this.$options.lookupLanguage.currentValue)
      this.langUpdated = Date.now()
    },

    updateBetaCodes (event) {
      if (event.keyCode !== 13 && this.getLookupLanguage() === GreekInput.langCode && this.useBetaCodes) {
        this.lookuptext = GreekInput.change(this.lookuptext)
      }
    },

    toggleBetaCodesInfo () {
      this.showBetaCodesInfo = !this.showBetaCodesInfo
      this.$emit('toggleBetaCodesInfo', this.showBetaCodesInfo)
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

    input.alpheios-input,
    input.alpheios-input:focus
    {
      width: 70%;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      height: $fieldsetHeight;
      min-width: 0;
      border-color: var(--alpheios-lookup-input-border-color);
      &.alpheios-rtl {
        direction: rtl;
        text-align: right;
      }
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
    padding-left: 20px;

    label {
      line-height: 1;
      padding-left: 5px;
    }
  }

  .alpheios-lookup__form-icon {
    width: calc(var(--alpheios-base-ui-size) * 2.15);
    height: calc(var(--alpheios-base-ui-size) * 2.15);
    box-sizing: border-box;
    position: relative;
    fill: var(--alpheios-desktop-toolbar-bg);
    stroke: var(--alpheios-desktop-toolbar-bg);
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;

    svg {
      width: 52%;
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

    p {
      font-size: 94%;
      margin: 0 0 calc(var(--alpheios-base-text-size) * 0.75);
    }
    span {
      display: inline-block;
      padding-right: 20px;
    }
  }
</style>

