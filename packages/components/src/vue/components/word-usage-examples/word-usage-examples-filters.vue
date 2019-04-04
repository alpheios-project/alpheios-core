<template>
    <div class="alpheios-word-usage-header-filters">
        <div class="alpheios-word-usage-header-select-type-filters-block" >
        <div class="alpheios-word-usage-header-select-type-filter"
            v-for="typeFilterItem of typeFiltersList" v-bind:key="typeFilterItem.value"
            :class="{ 'alpheios-word-usage-header-select-type-filter-disabled': typeFilterItem.disabled === true }"
        >
          <input type="radio" :id="typeFilterItem.value" :value="typeFilterItem.value" v-model="typeFilter" :disabled = "typeFilterItem.disabled === true">
          <label :for="typeFilterItem.value">{{ typeFilterItem.label }}</label>
        </div>
      </div>

      <div v-show="authorsList && typeFilter !== 'noFilters'">
        <select class="alpheios-select alpheios-word-usage-header-select-author" v-model="selectedAuthor">
            <option
                v-for="authorItem in lastAuthorsList" v-bind:key="authorItem.ID"
                v-bind:value="authorItem">{{ calcTitle(authorItem) }}</option>
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

      <div v-if="this.selectedAuthor && typeFilter !== 'noFilters'">
        <select class="alpheios-select alpheios-word-usage-header-select-textwork"
                v-model="selectedTextWork">
          <option
              v-for="workItem in filteredWorkList" v-bind:key="workItem.ID"
              v-bind:value="workItem">{{ calcTitle(workItem) }}</option>
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

      <div class="alpheios-word-usage-header-actions">
          <button @click="getResults" class="alpheios-button-primary" :disabled="disabledButton">
              {{ l10n.getText('WORDUSAGE_GET_RESULTS') }}
          </button>
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
        { value: 'noFilters', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_NO_FILTERS') },
        { value: 'moreResults', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_MORE_RESULTS'), disabled: true },
        { value: 'filterCurrentResults', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_FILTER_CURRENT_RESULTS'), disabled: true }
      ],
      disabledButton: false
    }
  },
  computed: {
    homonym () {
      return this.$store.state.app.homonymDataReady ? this.app.homonym : null
    },
    authorsList () {
      if (this.$store.state.app.wordUsageExamplesReady && (!this.lastTargetWord || this.lastTargetWord !== this.app.homonym.targetWord)) {
        this.lastTargetWord = this.app.homonym.targetWord
        this.lastAuthorsList = this.app.wordUsageExamples.wordUsageExamples
          .filter(wordUsageExampleItem => wordUsageExampleItem.author)
          .map(wordUsageExampleItem => wordUsageExampleItem.author)
          .filter((item, pos, self) => self.indexOf(item) == pos)
          .slice()

        this.lastTextWorksList = this.app.wordUsageExamples.wordUsageExamples
          .map(wordUsageExampleItem => wordUsageExampleItem.textWork)
          .filter((item, pos, self) => item && self.indexOf(item) == pos)
          .slice()

        this.removeDisabledFromTypeFilters()
        this.typeFilter = 'moreResults'
        this.setDisabledToType('noFilters')
      } else if (!this.$store.state.app.wordUsageExamplesReady && !this.app.homonym) {
        this.removeDisabledFromTypeFilters()
        this.typeFilter = 'noFilters'
        this.setDisabledToType('filterCurrentResults')
        this.selectedAuthor = null
        this.selectedTextWork = null
      }
      return true
    },
    filteredWorkList () {
      if (this.selectedAuthor) {
        this.selectedTextWork = null

        return this.lastTextWorksList.filter(textwork => textwork.author && (textwork.author.ID === this.selectedAuthor.ID))
      }
      return []
    }
  },
  methods: {
    removeDisabledFromTypeFilters () {
      this.typeFiltersList.forEach(item => {
        item.disabled = false
      })
    },
    setDisabledToType (typeValue) {
      this.removeDisabledFromTypeFilters()
      this.typeFiltersList.find(item => item.value === typeValue).disabled = true
    },
    async getResults () {
      if (this.typeFilter === 'noFilters') {
        this.disabledButton = true

        await this.getResultsNoFilters()

        this.removeDisabledFromTypeFilters()
        this.clearFilter('author')
        this.lastAuthorID = null
        this.typeFilter = 'moreResults'
        this.setDisabledToType('noFilters')

        this.disabledButton = false
      } else if (this.typeFilter === 'moreResults') {
        this.disabledButton = true

        await this.getResultsWithFilters()

        this.setDisabledToType('filterCurrentResults')
        this.lastAuthorID = this.selectedAuthor ? this.selectedAuthor.ID : null

        this.disabledButton = false
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
    calcTitle (item) {
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
        font-size: 80%;
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
  }

  .alpheios-word-usage-header
  .alpheios-word-usage-header-select-textwork {
    margin-top: 10px;
  }

  .alpheios-word-usage-header-actions {
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid var(--alpheios-border-color);
  }

</style>
