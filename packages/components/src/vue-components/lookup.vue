<template>
  <div class="alpheios-lookup__form">
    <input class="uk-input alpheios-lookup__input" type="text" :placeholder="inputPlaceholder" v-model="lookuptext"
      @keyup.enter="lookup"
    >
    <alph-tooltip tooltipDirection="top-right" :tooltipText="tooltipLabel">
      <span class="alpheios-lookup__button_with_link">
      <button class="uk-button uk-button-primary uk-button-small alpheios-lookup__button" type="button" tabindex="-1"
        @click="lookup"
      >
        {{ buttonLabel }}
      </button>
      <a class="alpheios-lookup__settings-link" @click="switchLookupSettings">{{ labelSettings }}</a>
      </span>
    </alph-tooltip>
    <div class="alpheios-lookup__settings">
      <div class="alpheios-lookup__settings-items" v-show="showLanguageSettings">
        <alph-setting :data="preferredLanguage" @change="settingChange" :classes="['alpheios-panel__options-item']"></alph-setting>

        <alph-setting :data="lexicon" @change="resourceSettingChange" :classes="['alpheios-panel__options-item']"
         v-for="lexicon in lexiconsFiltered"/></alph-setting>
      </div>
    </div>
  </div>
</template>
<script>
  import TextSelector from '../lib/selection/text-selector'
  import LexicalQueryLookup from '../lib/queries/lexical-query-lookup'
  import { LanguageModelFactory } from 'alpheios-data-models'
  import TempStorageArea from '../lib/options/temp-storage-area'

  import Tooltip from './tooltip.vue'
  import Setting from './setting.vue'

  export default {
    name: 'Lookup',
    components: {
      alphTooltip: Tooltip,
      alphSetting: Setting
    },
    data () {
      return {
        lookuptext: '',
        defaultButtonLabel: 'Search',
        defaultInputPlaceholder: 'Type text',
        defaultLabelSettings: 'Settings',
        showLanguageSettings: false,
        initLanguage: null,
        currentLanguage: null,
        options: {},
        resourceOptions: {}
      }
    },
    props: {
      uiController: {
        type: Object,
        required: true
      },
      parentLanguage: {
        type: String,
        required: false
      }
    },
    created: function () {
      this.options = this.uiController.options.clone(TempStorageArea)
      this.resourceOptions = this.uiController.resourceOptions.clone(TempStorageArea)
      if (this.parentLanguage) {
        this.initLanguage = this.parentLanguage
        this.currentLanguage = this.parentLanguage
      } else {
        this.currentLanguage = this.options.items.preferredLanguage.currentTextValue()
      }
      console.log(`at creation current language is ${this.currentLanguage}`)
    },
    computed: {
      buttonLabel: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.LABEL_LOOKUP_BUTTON
        }
        return this.defaultButtonLabel
      },
      tooltipLabel: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.TOOLTIP_LOOKUP_BUTTON
        }
        return this.defaultButtonLabel
      },
      inputPlaceholder: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.PLACEHOLDER_LOOKUP_INPUT
        }
        return this.defaultInputPlaceholder
      },
      labelSettings: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.LABEL_LOOKUP_SETTINGS
        }
        return this.defaultLabelSettings
      },
      lexiconSettingName: function() {
        let lang = this.options.items.preferredLanguage.values.filter(v => v.text === this.currentLanguage)
        let settingName
        if (lang.length>0) {
          settingName = `lexiconsShort-${lang[0].value}`
        }
        return settingName
      },
      lexiconsFiltered: function () {
        return this.resourceOptions.items.lexiconsShort.filter((item) => item.name === this.lexiconSettingName)
      },
      preferredLanguage: function () {
        let currentLanguage
        if ((this.parentLanguage && this.parentLanguage !== null) && (this.parentLanguage !== this.initLanguage)) {
          this.initLanguage = this.parentLanguage
          this.currentLanguage = this.parentLanguage
          this.options.items.preferredLanguage.setTextValue(this.parentLanguage)
        }
        return this.options.items.preferredLanguage
      }

    },
    methods: {
      'lookup': function () {
        if (this.lookuptext.length === 0) {
          return null
        }

        let languageID = LanguageModelFactory.getLanguageIdFromCode(this.options.items.preferredLanguage.currentValue)
        let textSelector = TextSelector.createObjectFromText(this.lookuptext, languageID)

        LexicalQueryLookup
          .create(textSelector, this.uiController, this.resourceOptions)
          .getData()

        // this.lookuptext = ''
      },

      'switchLookupSettings': function () {
        this.showLanguageSettings = !this.showLanguageSettings
        if (this.$parent !== undefined) {
          this.$parent.$emit('updatePopupDimensions')
        }
      },

      settingChange: function (name, value) {
        this.options.items.preferredLanguage.setTextValue(value)
        this.currentLanguage = value
      },

      resourceSettingChange: function (name, value) {
        let keyinfo = this.resourceOptions.parseKey(name)
        this.resourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-lookup__form {
      margin: 15px 10px 5px;

      text-align: left;
    }

    .uk-input.alpheios-lookup__input {
      width: 70%;
      line-height: 28px;
      height: 30px;
      font-size: 14px;
      margin-bottom: 10px;
      vertical-align: top;

      &:focus {
        border-color: $alpheios-link-hover-color;
      }
    }

    .uk-button.alpheios-lookup__button {
      font-size: 12px;
      vertical-align: top;
      display: block;
    }

    .alpheios-lookup__settings {
      text-align: left;
    }

    a.alpheios-lookup__settings-link {
      font-size: 0.675 * $alpheios-base-font-size;
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

</style>
