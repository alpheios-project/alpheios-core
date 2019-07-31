<template>
    <div class="alpheios-wordlist-filters" >
        <p class="alpheios-wordlist-header-title">{{ l10n.getText('WORDLIST_FILTER_BY') }}</p>
        <div>
        <div class="alpheios-wordlist-header-select-filterBy-block">
          <select class="alpheios-select alpheios-wordlist-header-select-filterBy"
                  v-model="selectedFilterBy" @change="changedFilterBy">
            <option v-for="typeFiltering in typeFiltersList" v-bind:key="typeFiltering.value"
                    v-bind:value="typeFiltering.value"
                    :class="{ 'alpheios-select-disabled-option': !typeFiltering.value }"
            >{{ calcTitle(typeFiltering) }}</option>
          </select>
        </div>
        <div class="alpheios-wordlist-header-input-filterBy-block"
          v-if="currentClickedLemma && currentTypeFilter && currentTypeFilter.showTextInput"
        >
          <div class="alpheios-select-input-group"
               :class = '{ "alpheios-select-input-group-show-select": shownVariantsSelect }'
          >
            <input v-model="textInput"  class="alpheios-input alpheios-wordlist-header-input-filterBy"
                  :placeholder="currentTypeFilter.textInputPlaceholder"
                  v-on:keyup.enter = "clickFilterBy"
                  v-on:input = "filterVariants"
                  v-on:focus = "filterVariants"
                  v-on:blur = "hideAutocomplete"
                  autocapitalize = "off"
                  autocorrect = "off"
                  >

            <ul class="alpheios-select-list"
                    v-model="selectedExactForm"
                    v-if = "selectedFilterBy === 'byExactForm'"
                    >
              <li v-for="(exactForm, exactFormIndex) in wordExactFormsFiltered" v-bind:key="exactFormIndex"
                  @click="selectExactForm(exactForm)" v-html="exactForm"
              ></li>
            </ul>

            <ul class="alpheios-select-list"
                    v-model="selectedLemma"
                    v-if = "selectedFilterBy === 'byLemma'"
                    >
              <li v-for="(lemmaForm, lemmaFormIndex) in wordLemmaFormsFiltered" v-bind:key="lemmaFormIndex"
                  @click="selectLemmaForm(lemmaForm)" v-html="lemmaForm"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import Tooltip from '@/vue/components/tooltip.vue'

  export default {
    name: 'WordFilterPanel',
    inject: ['app', 'l10n'],
    components: {
      alphTooltip: Tooltip
    },
    props: {
      clickedLemma: {
        type: String,
        required: false
      },
      wordExactForms: {
        type: Array,
        required: false,
        default: []
      },
      wordLemmaForms: {
        type: Array,
        required: false,
        default: []
      },
      clearFilters: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        selectedFilterBy: null,
        selectedExactForm: null,
        selectedLemma: null,
        typeFiltersList: [
          { value: null },
          { value: 'byCurrentSession', title: this.l10n.getText('WORDLIST_FILTER_BYCURRENTSESSION'), onChange: true },
          { value: 'byImportant', title: this.l10n.getText('WORDLIST_FILTER_BYIMPORTANT'), onChange: true },
          { value: 'byExactForm',
            title: this.l10n.getText('WORDLIST_FILTER_BYWORDFORM_FULL'),
            onClick: true, showTextInput: true,
            textInputPlaceholder: this.l10n.getText('WORDLIST_FILTER_BYWORDFORM_FULL_PLACEHOLDER')
          },
          { value: 'byLemma',
            title: this.l10n.getText('WORDLIST_FILTER_BYLEMMA_FULL'),
            onClick: true, showTextInput: true,
            textInputPlaceholder: this.l10n.getText('WORDLIST_FILTER_BYLEMMA_FULL_PLACEHOLDER')
          }
        ],
        textInput: null,
        shownVariantsSelect: false,
        markLayout: {
          start: '<span class="alpheios-select-input-filter-part">',
          end: '</span>'
        }
      }
    },
    computed: {
      currentTypeFilter () {
        let curFilter = this.selectedFilterBy ? this.typeFiltersList.find(typeFilter => typeFilter.value === this.selectedFilterBy) : null
        return curFilter
      },
      currentClickedLemma () {
        if (this.clickedLemma) {
          this.setClickedLemmaFilter()
        }
        return true
      },
      wordExactFormsFiltered () {
        if (this.selectedFilterBy === 'byExactForm') {
          if (this.textInput && this.textInput.length > 0) {
            return this.wordExactForms.filter(exactForm => exactForm.indexOf(this.textInput) > -1).map(exactForm => {
              let startIndex = exactForm.indexOf(this.textInput)
              return exactForm.substr(0, startIndex) + this.markLayout.start + this.textInput + this.markLayout.end + exactForm.substr(startIndex + this.textInput.length)
            })
          } else {
            return this.wordExactForms
          }
        }
        return []
      },
      wordLemmaFormsFiltered () {
        if (this.selectedFilterBy === 'byLemma') {
          if (this.textInput && this.textInput.length > 0) {
            return this.wordLemmaForms.filter(lemmaForm => lemmaForm.indexOf(this.textInput) > -1).map(lemmaForm => {
              let startIndex = lemmaForm.indexOf(this.textInput)
              return lemmaForm.substr(0, startIndex) + this.markLayout.start + this.textInput + this.markLayout.end + lemmaForm.substr(startIndex + this.textInput.length)
            })
          } else {
            return this.wordLemmaForms
          }
        }
        return []
      }
    },
    watch: {
      clearFilters (value) {
        this.selectedFilterBy = null
        this.textInput = null
      }
    },
    methods: {
      changedFilterBy () {
        if (this.currentTypeFilter && this.currentTypeFilter.onChange) {
          this.$emit('changedFilterBy', this.selectedFilterBy)
        } else {
          this.clearFilteringText()
        }
      },
      selectExactForm (selectedExactForm) {
        let formattedExactForm = selectedExactForm
        this.textInput = formattedExactForm.replace(this.markLayout.start,'').replace(this.markLayout.end,'')

        this.clickFilterBy()
      },
      selectLemmaForm (selectedLemmaForm) {
        let formattedLemmaForm = selectedLemmaForm
        this.textInput = formattedLemmaForm.replace(this.markLayout.start,'').replace(this.markLayout.end,'')

        this.clickFilterBy()
      },
      clickFilterBy () {
        if (this.currentTypeFilter && this.currentTypeFilter.onClick && this.textInput) {
          if (this.selectedFilterBy === 'byExactForm' && !this.wordExactForms.includes(this.textInput)) {
            return
          }
          if (this.selectedFilterBy === 'byLemma' && !this.wordLemmaForms.includes(this.textInput)) {
            return
          }
          this.$emit('changedFilterBy', this.selectedFilterBy, this.textInput)
          this.shownVariantsSelect = false
        }
      },
      clearFiltering () {
        this.selectedFilterBy = null
        this.textInput = null
        this.clearFilterEvent()
      },
      clearFilteringText () {
        this.textInput = null
        this.clearFilterEvent()
        this.$emit('clearClickedLemma')
      },
      clearFilterEvent () {
        this.$emit('changedFilterBy', null)
      },
      setClickedLemmaFilter () {
        this.selectedFilterBy = 'byLemma'
        this.textInput = this.clickedLemma.trim()
        this.clickFilterBy()
        
      },
      filterVariants () {
        if (this.textInput && this.textInput.length > 0) {
          this.shownVariantsSelect = true
        } else {
          this.shownVariantsSelect = false
        }
      },
      hideAutocomplete () {
        setTimeout(() => {
          this.shownVariantsSelect = false
        }, 300)
      },
      calcTitle (typeFiltering) {
        if (typeFiltering.value) {
          return typeFiltering.title
        } else {
          if (this.selectedFilterBy) {
            return this.l10n.getText('WORDLIST_FILTER_CLEAR')
          } else {
            return this.l10n.getText('WORDLIST_FILTER_PLACEHOLDER')
          }
        }        
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-wordlist-filters {
      padding: 10px;

      .alpheios-select.alpheios-wordlist-header-select-filterBy {
        option.alpheios-select-disabled-option {
          color: var(--alpheios-color-placehoder);
        }
      }

      .alpheios-wordlist-header-title {
          margin: 0;
          font-weight: bold;
          padding-bottom: 10px;
      }

      .alpheios-wordlist-header-select-filterBy-block,
      .alpheios-wordlist-header-input-filterBy-block {
          width: 48%;
          display: inline-block;
          vertical-align: middle;
      }

      .alpheios-wordlist-header-input-filterBy-block {
        margin-left: 1%;
      }

      .alpheios-wordlist-header-select-filterBy{
        width: 80%;
      }

      .alpheios-wordlist-header-input-filterBy {
        width: 100%;
      }

      .alpheios-wordlist-header-clear-icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;

        svg {
          width: 100%;
          height: 100%;
          display: inline-block;
          vertical-align: top;
        }
      }

    .alpheios-select-input-group {
      position: relative;
      width: 80%;
      display: inline-block;

      &.alpheios-select-input-group-show-select {
        .alpheios-wordlist-header-input-filterBy {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        .alpheios-select-list {
          display: block;
          border-bottom-right-radius: calc(var(--alpheios-base-text-size) * 0.625);
          border-bottom-left-radius: calc(var(--alpheios-base-text-size) * 0.625);
        }
      }
    }
    .alpheios-select-list {
      position:absolute;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      background: var(--alpheios-word-list-select-item-bg);

      padding: 5px 0;
      border: 1px solid var(--alpheios-border-color);
      border-top: 0;

      max-height: 110px;
      overflow-y: auto;

      list-style: none;
      display: none;

      li {
        cursor: pointer;
        padding: 0 5px;
        &:hover {
          background-color: var(--alpheios-word-list-select-item-bg-hover);
        }

        .alpheios-select-input-filter-part {
          font-weight: bold;
          color: var(--alpheios-color-vivid);
        }
      }
    }
  }
  .alpheios-layout-compact {
    .alpheios-wordlist-filters {
      padding: 10px 2px;
    }
    .alpheios-wordlist-header-select-filterBy-block {
      width: 42%;
    }
    .alpheios-wordlist-header-select-filterBy,
    .alpheios-wordlist-header-input-filterBy {
      font-size: 85%;
    }
    .alpheios-wordlist-header-input-filterBy-block {
      width: 52%;
    }
    .alpheios-select-input-group {
      width: 68%;
    }
  }

  .alpheios-rtl {
    .alpheios-wordlist-header-input-filterBy-block,
    .alpheios-select-list {
      direction: rtl;   
      text-align: right;
    }
  }

</style>
