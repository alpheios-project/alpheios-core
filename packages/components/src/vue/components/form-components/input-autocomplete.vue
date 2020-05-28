<template>
    <div class="alpheios-input-group" v-on-clickaway="closeAutocompleteList">
        <input
            autocapitalize="off"
            autocorrect="off"
            autocomplete="off"
            @keyup="checkLookupKeyPress"
            class="alpheios-input"
            :class="{ 'alpheios-rtl': directionRtl}"
            type="text"
            v-model="valueText"
            :ref="id"
            @click="closeAutocompleteList"
            :id="id"
            :lang="lang"
        >
        <div class="alpheios-input-autocomplete" v-show="currentEnableLogeionAutoComplete && words.length > 0">
            <span class="alpheios-input-autocomplete-item" v-for="(word, index) in words" v-bind:key="index" @click="selectWordFromAutoComplete(word)">{{ word }}</span>
        </div>
    </div>
</template>
<script>
import { ClientAdapters } from 'alpheios-client-adapters'
import { LanguageModelFactory, Constants } from 'alpheios-data-models'
import GreekInput from '@/lib/utility/greek-input.js'
import { directive as onClickaway } from '@/vue/directives/clickaway.js'

export default {
  name: 'InputAutocomplete',
  inject: ['app', 'settings'],
  directives: {
    onClickaway: onClickaway
  },
  props: {
    lang: {
      type: String,
      required: true
    },
    clearValue: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      valueText: '',
      origText: '',
      words: []
    }
  },
  watch: {
    'clearValue' () {
      this.valueText = ''
      this.clearWords()
    }
  },
  computed: {
    directionRtl () {
      const model = LanguageModelFactory.getLanguageModelFromCode(this.lang)
      return model.direction === Constants.LANG_DIR_RTL
    },
    featureOptions () {
      return this.$store.state.settings.featureResetCounter + 1 ? this.settings.getFeatureOptions() : null
    },
    currentEnableLogeionAutoComplete () {
      return this.featureOptions ? this.featureOptions.items.enableLogeionAutoComplete.currentValue : null
    },
    currentUseBetaCodes () {
      return this.featureOptions ? this.availableUseBetaCodes && this.featureOptions.items.useBetaCodes.currentValue : null
    },
    availableUseBetaCodes () {
      return this.lang === GreekInput.langCode
    }
  },
  methods: {
    clearWords () {
      this.words = this.words.splice(0, 0)
    },

    checkLookupKeyPress (event) {
      this.$emit('updateLookupText', this.valueText)
      if (event.keyCode === 13) {
        this.$emit('keyPressEnter', this.valueText)
        return
      }

      this.updateBetaCodes()
      this.getAutocompleteWords()
    },

    updateBetaCodes () {
      if (this.currentUseBetaCodes && this.availableUseBetaCodes) {
        this.valueText = GreekInput.change(this.valueText)
        this.$emit('updateLookupText', this.valueText)
      }
    },

    async getAutocompleteWords () {
      if (this.currentEnableLogeionAutoComplete) {
        this.valueText = this.valueText.trim()
        this.$emit('updateLookupText', this.valueText)
        this.clearWords()
        if (this.valueText.length > 2) {

          const res = await ClientAdapters.autocompleteWords.logeion({
            method: 'getWords',
            params: {
              text: this.valueText,
              lang: this.lang,
              fetchOptions: this.app.config.logeion
            }
          })

          if (res.result && res.result.length > 0) {
            this.words = res.result
          }
        }
      }
    },

    selectWordFromAutoComplete (word) {
      this.valueText = word
      this.$emit('updateLookupText', this.valueText)
      this.clearWords()
      this.$refs[this.id].focus()
    },

    closeAutocompleteList () {
      this.clearWords()
    }
  }
}

</script>
<style lang="scss">
  @import "../../../styles/variables";

  $fieldsetHeight: 40px;

  .alpheios-content .alpheios-input-group {

    input.alpheios-input,
    input.alpheios-input:focus
    {
      width: 100%;
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
  }


  .alpheios-input-group {
    position: relative;

    input.alpheios-input {
        position: relative;
        z-index: 10;
    }

    .alpheios-input-autocomplete {
        position: absolute;
        width: 100%;
        border: 1px solid var(--alpheios-lookup-input-border-color);
        background: #fff;
        /* border-top: 0; */
        top: $fieldsetHeight - 8px;
        z-index: 15;
        box-sizing: border-box;
        padding: 0 0 10px;

        .alpheios-input-autocomplete-item {
            padding: 5px 10px;
        }
    }
  }

  .alpheios-input-autocomplete-item {
      display: block;
      cursor: pointer;

      &:hover {
          background: var(--alpheios-color-bright-hover);
      }
  }
</style>