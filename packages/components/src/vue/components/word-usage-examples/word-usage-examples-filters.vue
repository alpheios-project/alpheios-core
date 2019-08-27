<template>
    <div class="alpheios-word-usage-header-filters">
      <p class="alpheios-word-usage-get-data-progress" v-show="gettingResult">{{ l10n.getText('WORDUSAGE_GETTING_RESULT') }}</p>

      <div v-show="showHeader && !collapsedHeader">
        <div class="alpheios-word-usage-filters-select" v-if="authorsList">
          <p class="alpheios-word-usage-filter-title" v-html="calcFocusHint('author')"></p>
          <select class="alpheios-select alpheios-word-usage-header-filter-select"
                    v-model="selectedAuthor"
                    @change = "getResults('author')"
            >
                <option
                    v-for="(authorItem, authorIndex) in lastAuthorsList" v-bind:key="authorIndex"
                    v-bind:value="authorItem"
                    :class='{ "alpheios-select-disabled-option": !authorItem}'
                    >{{ calcTitle(authorItem, 'author') }}</option>
          </select>
        </div>
        <div class="alpheios-word-usage-filters-select" v-if="filteredWorkList">
          <p class="alpheios-word-usage-filter-title" v-html="calcFocusHint('work')"></p>
          <select class="alpheios-select alpheios-word-usage-header-filter-select"
                    v-model="selectedTextWork"
                    @change = "getResults('textWork')"
            >
                <option
                  v-for="(workItem, workIndex) in filteredWorkList" v-bind:key="workIndex"
                  :class='{ "alpheios-select-disabled-option": !workItem}'
                  v-bind:value="workItem"
                >{{ calcTitle(workItem, 'textwork') }}
                </option>
          </select>
        </div>
      </div>
    </div>
</template>
<script>
import Tooltip from '@/vue/components/tooltip.vue'
import { LanguageModelFactory } from 'alpheios-data-models'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'WordUsageExamplesFilters',
  inject: ['app', 'l10n', 'settings'],
  components: {
    alphTooltip: Tooltip
  },
  mixins: [DependencyCheck],
  props: {
    collapsedHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      selectedAuthor: null,
      selectedTextWork: null,
      lastTargetWord: null,
      lastAuthorsList: null,
      gettingResult: false
    }
  },
  watch: {
    '$store.state.ui.activeTab' (activeTab) {
      if (activeTab === 'wordUsage') {
        if (!this.$store.state.app.wordUsageExamplesReady && this.homonym) {
          this.selectedAuthor = null
          this.selectedTextWork = null
          this.getResults()
        }
      }
    }
  },
  computed: {
    homonym () {
      return this.$store.state.app.homonymDataReady ? this.app.homonym : null
    },
    languageCode () {
      return  this.homonym ? LanguageModelFactory.getLanguageCodeFromId(this.homonym.languageID) : null
    },
    authorsList () {
      if (!this.$store.state.app.homonymDataReady) {
        return false
      }
      if (this.$store.state.app.wordUsageExamplesReady && (!this.lastTargetWord || this.lastTargetWord !== this.homonym.targetWord)) {
        this.lastTargetWord = this.homonym.targetWord
        this.lastAuthorsList = this.app.wordUsageExamples.wordUsageExamples
          .filter(wordUsageExampleItem => wordUsageExampleItem.author)
          .map(wordUsageExampleItem => wordUsageExampleItem.author)
          .filter((item, pos, self) => self.indexOf(item) == pos)
          .slice()
        this.applySort('author', this.lastAuthorsList)
        this.lastAuthorsList.unshift(null)
      }
      if (!this.$store.state.app.wordUsageExamplesReady && !this.selectedAuthor) {
        return false
      }
      return true
    },
    filteredWorkList () {
      if (!this.$store.state.app.homonymDataReady) {
        return false
      }
      if (this.selectedAuthor) {
        this.selectedTextWork = null
        let resArray = this.selectedAuthor.works.slice()
        if (resArray.length > 1 && this.languageCode) {
          resArray = this.applySort('textwork', resArray)
          resArray.unshift(null)
        } else if (resArray.length === 1) {
          this.selectedTextWork = resArray[0]
        }
        return resArray
      }
      return null
    }
  },
  methods: {
    async getResults (type) {
      if (type === 'author') {
        this.selectedTextWork = null
      }
      this.gettingResult = true

      if (this.selectedAuthor) {
        await this.app.getWordUsageData(this.homonym, {
          author: this.selectedAuthor && this.selectedAuthor.ID !== 0 ? this.selectedAuthor : null,
          textWork: this.selectedTextWork && this.selectedTextWork.ID !== 0 ? this.selectedTextWork : null
        })
        this.$emit('getMoreResults', this.selectedAuthor, this.selectedTextWork)
      } else {
        await this.app.getWordUsageData(this.homonym)
        this.$emit('getAllResults', null, null)
      }
      this.gettingResult = false
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
          if (this.selectedAuthor) {
            return this.l10n.getText('WORDUSAGE_FILTERS_AUTHOR_CLEAR')
          } else {
            return this.l10n.getText('WORDUSAGE_FILTERS_AUTHOR_PLACEHOLDER')
          }
        }
        if (type === 'textwork') {
          if (this.selectedTextWork) {
            return this.l10n.getText('WORDUSAGE_FILTERS_TEXTWORK_CLEAR')
          } else {
            return this.l10n.getText('WORDUSAGE_FILTERS_TEXTWORK_PLACEHOLDER')
          }
        }
      }
      return ''
    },
    calcFocusHint (type) {
      // it would be better for this to be a computed property but settings.getFeatureOptions() is not reactive
      if (type === 'author') {
        return this.l10n.getText('WORDUSAGE_FOCUS_AUTHOR',{ maxResults:this.settings.getFeatureOptions().items.wordUsageExamplesMax.currentValue })
      } else {
        return this.l10n.getText('WORDUSAGE_FOCUS_WORK',{ maxResults:this.settings.getFeatureOptions().items.wordUsageExamplesMax.currentValue })
      }
    },
    applySort (typeSort, items) {
      return items.sort((a,b) => {
            let aT = this.calcTitle(a, typeSort)
            let bT = this.calcTitle(b, typeSort)
            return aT.localeCompare(bT, this.languageCode, {sensitivity: 'accent'})
          })
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

  .alpheios-word-usage-header-filters .alpheios-word-usage-get-data-progress {
    color: var(--alpheios-usage-progress-color);
    font-weight: bold;
  }

  p.alpheios-word-usage-filter-title {
    margin: 0 0 calc(var(--alpheios-base-text-size) * 0.5);
  }

  .alpheios-word-usage-filters-select {
    margin-bottom: 10px;
  }
</style>
