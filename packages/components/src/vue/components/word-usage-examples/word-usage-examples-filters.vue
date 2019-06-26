<template>
    <div class="alpheios-word-usage-header-filters" v-show="!collapsedHeader">
        <div class="alpheios-word-usage-header-select-type-filters-block" >
        <div class="alpheios-word-usage-header-select-type-filter"
            v-for="typeFilterItem of typeFiltersList" 
            v-bind:key="typeFilterItem.value"
            :class="{ 'alpheios-word-usage-header-select-type-filter-disabled': typeFilterItem.disabled === true }"
            v-if="checkVisibilityFilterOption(typeFilterItem)"
        >
          <input type="radio" :id="typeFilterItem.value" :value="typeFilterItem.value" v-model="typeFilter" :disabled = "typeFilterItem.disabled === true">
          <label :for="typeFilterItem.value">{{ typeFilterItem.label }}</label>
        </div>
      </div>

      <div v-show="authorsList && typeFilter !== 'noFilters'" class="alpheios-word-usage-filters-select">
        <select class="alpheios-select alpheios-word-usage-header-select-author" 
                v-model="selectedAuthor"
                @change = "getResults"
        >
            <option
                v-for="(authorItem, authorIndex) in lastAuthorsList" v-bind:key="authorIndex"
                v-bind:value="authorItem"
                :class='{ "alpheios-select-disabled-option": !authorItem}'
                v-bind:disabled="!authorItem"
                >{{ calcTitle(authorItem, 'author') }}</option>
        </select>
        <alph-tooltip :tooltipText="l10n.getMsg('WORDUSAGE_FILTERS_AUTHOR_CLEAR')" tooltipDirection="top-right">
          <span class="alpheios-word-usage-header-clear-icon"
                @click="clearFilter('author')"
                :class = '{ "alpheios-word-usage-header-clear-disabled": selectedAuthor === null }'
                >
            <clear-filters-icon></clear-filters-icon>
          </span>
        </alph-tooltip>
      </div>

      <div v-if="this.selectedAuthor && typeFilter !== 'noFilters'" class="alpheios-word-usage-filters-select">
        <select class="alpheios-select alpheios-word-usage-header-select-textwork"
                v-model="selectedTextWork"
                @change = "getResults"
        >
          <option
              v-for="(workItem, workIndex) in filteredWorkList" v-bind:key="workIndex"
              v-bind:value="workItem"
              :class='{ "alpheios-select-disabled-option": !workItem}'
              v-bind:disabled="!workItem"
              >{{ calcTitle(workItem, 'textwork') }}</option>
        </select>
        <alph-tooltip :tooltipText="l10n.getMsg('WORDUSAGE_FILTERS_TEXTWORK_CLEAR')" tooltipDirection="top-right">
          <span class="alpheios-word-usage-header-clear-icon"
                @click="clearFilter('textwork')"
                :class = '{ "alpheios-word-usage-header-clear-disabled": selectedTextWork === null }'
          >
            <clear-filters-icon></clear-filters-icon>
          </span>
        </alph-tooltip>
      </div>

    </div>
</template>
<script>
import ClearFilters from '@/images/inline-icons/clear-filters.svg'
import Tooltip from '@/vue/components/tooltip.vue'

export default {
  name: 'WordUsageExamplesFilters',
  inject: ['app', 'l10n'],
  components: {
    clearFiltersIcon: ClearFilters,
    alphTooltip: Tooltip
  },
  props: {
    collapsedHeader: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      typeFilter: 'noFilters',
      selectedAuthor: null,
      selectedTextWork: null,
      lastTargetWord: null,
      lastAuthorID: null,
      lastAuthorsList: [],
      lastTextWorksList: [],
      typeFiltersList: [
        { value: 'noFilters', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_NO_FILTERS'), skip: true },
        { value: 'moreResults', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_MORE_RESULTS'), disabled: true, skip: true },
        { value: 'filterCurrentResults', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_FILTER_CURRENT_RESULTS'), disabled: true }
      ]
    }
  },
  watch: {
    '$store.state.ui.activeTab' (activeTab) {
      if (activeTab === 'wordUsage') {
        if (!this.$store.state.app.wordUsageExamplesReady && this.homonym) {
          this.getResults()
        }
      }
    }
  },
  computed: {
    homonym () {
      return this.$store.state.app.homonymDataReady ? this.app.homonym : null
    },
    authorsList () {
      if (this.$store.state.app.wordUsageExamplesReady && (!this.lastTargetWord || this.lastTargetWord !== this.homonym.targetWord)) {
        this.lastTargetWord = this.homonym.targetWord

        if (!this.app.wordUsageExamples.wordUsageExamples) {
          this.lastAuthorsList = []
          this.lastTextWorksList = []
          this.typeFilter = 'noFilters'
          this.setDisabledToType(['moreResults', 'filterCurrentResults'])
        } else {
          this.lastAuthorsList = this.app.wordUsageExamples.wordUsageExamples
            .filter(wordUsageExampleItem => wordUsageExampleItem.author)
            .map(wordUsageExampleItem => wordUsageExampleItem.author)
            .filter((item, pos, self) => self.indexOf(item) == pos)
            .slice()

          this.lastAuthorsList.unshift(null)

          this.lastTextWorksList = this.app.wordUsageExamples.wordUsageExamples
            .map(wordUsageExampleItem => wordUsageExampleItem.textWork)
            .filter((item, pos, self) => item && self.indexOf(item) == pos)
            .slice()

          this.lastTextWorksList.unshift(null)

          this.typeFilter = 'filterCurrentResults'
        }
      } else if (!this.$store.state.app.wordUsageExamplesReady || !this.homonym) {
        this.typeFilter = 'noFilters'
        this.setDisabledToType(['moreResults', 'filterCurrentResults'])
        this.selectedAuthor = null
        this.selectedTextWork = null
        this.lastAuthorsList = []
        this.lastTextWorksList = []
        this.lastTargetWord = null
        this.lastAuthorID = null
      }
      return true
    },
    filteredWorkList () {
      if (this.selectedAuthor) {        
        this.selectedTextWork = null
        let resArray = this.lastTextWorksList.filter(textwork => textwork && textwork.author && (textwork.author.ID === this.selectedAuthor.ID))
        if (resArray.length > 0) {
          resArray.unshift(null)
        }
        return resArray
      }
      return []
    }
  },
  methods: {
    checkVisibilityFilterOption(typeFilterItem) {
      if (typeFilterItem.skip) {
        return false
      }
      return true
    },
    setDisabledToType (typeValues) {
      this.typeFiltersList.forEach(item => {
        if (typeValues.indexOf(item.value) > -1) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
    },
    async getResults () {
      if (this.typeFilter === 'noFilters') {
        await this.getResultsNoFilters()
        
        this.$emit('getAllResults')
        this.clearFilter('author')
        this.lastAuthorID = null
        this.typeFilter = 'filterCurrentResults'
        this.setDisabledToType([])
        
      } else if (this.typeFilter === 'moreResults') {
        this.$emit('getMoreResults', this.selectedAuthor, this.selectedTextWork)
        await this.getResultsWithFilters()

        this.setDisabledToType(['filterCurrentResults'])

        this.lastAuthorID = this.selectedAuthor ? this.selectedAuthor.ID : null        
      } else if (this.typeFilter === 'filterCurrentResults') {
        this.$emit('filterCurrentByAuthor', this.selectedAuthor, this.selectedTextWork)
        this.lastAuthorID = this.selectedAuthor ? this.selectedAuthor.ID : null
      }
    },
    async getResultsNoFilters () {
      await this.app.getWordUsageData(this.homonym)
    },
    async getResultsWithFilters () {
      await this.app.getWordUsageData(this.homonym, {
        author: this.selectedAuthor && this.selectedAuthor.ID !== 0 ? this.selectedAuthor : null,
        textWork: this.selectedTextWork && this.selectedTextWork.ID !== 0 ? this.selectedTextWork : null
      })
    },
    removeFiltersFromResults () {
      this.$emit('filterCurrentByAuthor', null, null)
      this.lastAuthorID = this.selectedAuthor ? this.selectedAuthor.ID : null
    },
    calcTitle (item, type) {
      if (item) {
        if (item.title() && item.abbreviation()) {
          return `${item.title()} (${item.abbreviation()})`
        }
        if (item.title()) {
          return item.title()
        }
        if (item.abbreviation()) {
          return item.abbreviation()
        }
      } else {
        if (type === 'author') {
          return this.l10n.getText('WORDUSAGE_FILTERS_AUTHOR_PLACEHOLDER')
        }
        if (type === 'textwork') {
          return this.l10n.getText('WORDUSAGE_FILTERS_TEXTWORK_PLACEHOLDER')
        }
      }
      return ''
    },
    clearFilter (type) {
      if (type === 'author') {
        this.selectedAuthor = null
        this.selectedTextWork = null
      }
      if (type === 'textwork') {
        this.selectedTextWork = null
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-word-usage-filters-select .alpheios-select {
    option.alpheios-select-disabled-option {
      color: var(--alpheios-color-placehoder);
    }
  }

  .alpheios-word-usage-header-select-type-filters-block {
    margin-bottom: 10px;

    .alpheios-word-usage-header-select-type-filter {
      cursor: pointer;

      input[type="radio"] {
        display: inline-block;
        vertical-align: middle;
      }
      label {
        padding-left: 5px;
        font-size: var(--alpheios-base-text-size);
        line-height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      &.alpheios-word-usage-header-select-type-filter-disabled {
        color: var(--alpheios-color-neutral-dark);
        cursor: inherit;
      }
    }
  }

  .alpheios-word-usage-header-filters
  .alpheios-word-usage-header-actions button:disabled {
    background-color: var(--alpheios-color-neutral-dark);
    border-color: transparent;
  }

  .alpheios-word-usage-header
  .alpheios-word-usage-header-select-textwork {
    margin-top: 10px;
  }


</style>
