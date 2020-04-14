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
        >
        <div class="alpheios-input-autocomplete" v-show="words.length > 0">
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
  inject: ['settings'],
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
    useBetaCodes: {
      type: Boolean,
      default: false
    },
    enableLogeionAutoComplete: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      valueText: '',
      words: []
    }
  },
  watch: {
    'clearValue' () {
      this.valueText = ''  
      this.clearWords()
    },
    'enableLogeionAutoComplete' (value) {
      if (!value) { 
        this.clearWords()
      }
    }
  },
  computed: {
    directionRtl () {
      const model = LanguageModelFactory.getLanguageModelFromCode(this.lang)
      return model.direction === Constants.LANG_DIR_RTL
    }
  },
  methods: {
    clearWords () {
      this.words = this.words.splice(0, 0)
    },

    checkLookupKeyPress (event) {
      if (event.keyCode === 13) {
        this.$emit('keyPressEnter', this.valueText)
        return
      } 
      
      this.updateBetaCodes()
      this.getAutocompleteWords()
    },

    updateBetaCodes () {
      if (this.useBetaCodes && this.lang === GreekInput.langCode) {
        this.valueText = GreekInput.change(this.valueText)
        this.$emit('updateLookupText', this.valueText)
      }
    },

    async getAutocompleteWords () {
      if (this.enableLogeionAutoComplete) {
        this.valueText = this.valueText.trim()
        this.$emit('updateLookupText', this.valueText)
        this.clearWords()
        if (this.valueText.length > 2) {

          const res = await ClientAdapters.autocompleteWords.logeion({
            method: 'getWords',
            params: {
              text: this.valueText,
              lang: this.lang
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