<template>
  <div class="alpheios-word-usage">
    <div class="alpheios_word_usage_list_title" data-alpheios-ignore="all">{{ targetWord }} ({{ language }})
      <span class="alpheios-word-usage-header-show-link" v-if="showHeaderFilters" @click="collapsedHeader = !collapsedHeader"> ({{ collapsedHeaderTitle }})</span>
    </div>

    <div class="alpheios-word-usage-header" data-alpheios-ignore="all" v-show="showHeader">
      
      <word-usage-examples-filters
        :collapsedHeader = "collapsedHeader"
        @filterCurrentByAuthor = "filterCurrentByAuthor"
        @getMoreResults = "getMoreResults"
        @getAllResults = "getAllResults"
      ></word-usage-examples-filters>

      <word-usage-examples-sorting
        @changedSortBy = "changedSortBy"
        :collapsedHeader = "collapsedHeader"
      ></word-usage-examples-sorting>

    </div>

    <div class="alpheios_word_usage_list_mainblock" v-if="showWordUsageExampleItems">
      <template v-if="wordUsageListSorted.length > 0">
        <div
            class="alpheios-word-usage__examples-show-sources-btn alpheios-button-primary"
            @click="changeShowDataSource"
            data-alpheios-ignore="all"
        >
          {{ l10n.getText('WORDUSAGE_SHOW_SOURCE_LINKS') }}
        </div>
        <div
            class="alpheios-word-usage__examples"
            :class="{'alpheios-word-usage__examples--sources-visible': showDataSource}"
        >
          <template
              v-for="wordUsageItem in wordUsageListSorted"
              :wordUsageItem="wordUsageItem"
          >
            <a
                class="alpheios-word-usage__examples-source-link-large"
                :href="wordUsageItem.source"
                target="_blank"
            >
              {{ `${wordUsageItem.fullCit()}` }}
            </a>
            <div
                class="alpheios-word-usage__examples-pre"
            >
              {{ wordUsageItem.prefix }}
            </div>
            <div
                class="alpheios-word-usage__examples-target-word"
                v-html="wordUsageItem.normalizedText"
            />
            <div
                class="alpheios-word-usage__examples-post"
            >
              {{ wordUsageItem.suffix }}
            </div>

          </template>
        </div>
      </template>
      <template v-else>
        {{ l10n.getText('WORDUSAGE_NO_RESULTS') }}
      </template>
    </div>

    <div class="alpheios-word_usage_list__provider" v-show="provider">
      {{provider}}
    </div>
  </div>
</template>
<script>
import WordUsageExamplesFilters from '@/vue/components/word-usage-examples/word-usage-examples-filters.vue'
import WordUsageExamplesSorting from '@/vue/components/word-usage-examples/word-usage-examples-sorting.vue'

import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'WordUsageExamples',
  inject: ['ui', 'app', 'l10n'],
  storeModules: ['ui'],
  mixins: [DependencyCheck],
  components: {
    wordUsageExamplesFilters: WordUsageExamplesFilters,
    wordUsageExamplesSorting: WordUsageExamplesSorting
  },
  data () {
    return {
      sortBy: null,
      selectedAuthor: null,
      selectedTextWork: null,
      needInnerFilter: false,
      // Whether to show reference links on mobile layout or not
      showDataSource: false,
      collapsedHeader: true
    }
  },
  computed: {
    targetWord () {
      return this.$store.state.app.homonymDataReady && this.app.homonym ? this.app.homonym.targetWord : null
    },
    language () {
      return this.$store.state.app.homonymDataReady && this.app.homonym ? this.app.homonym.language : null
    },
    showHeaderFilters () {
      return this.$store.state.app.wordUsageExamplesReady
    },
    showHeader () {
      return Boolean(this.selectedAuthor) ||
             this.showWordUsageExampleItems && this.wordUsageListSorted.length > 0 
    },
    showWordUsageExampleItems () {
      if (!this.$store.state.app.wordUsageExamplesReady) {
        this.collapsedHeader = true
      }
      return this.$store.state.app.wordUsageExamplesReady
    },
    wordUsageExamples () {
      if (!this.$store.state.app.wordUsageExamplesReady) {
        return []
      }
      if (this.selectedAuthor && this.needInnerFilter) {
        return this.app.wordUsageExamples.wordUsageExamples
          .filter(wordUsageExample => {
            return wordUsageExample.author && (wordUsageExample.author.ID === this.selectedAuthor.ID) && (this.selectedTextWork ? wordUsageExample.textWork.ID === this.selectedTextWork.ID : true)
          })
      }
      return this.app.wordUsageExamples.wordUsageExamples
    },
    provider () {
      return this.$store.state.app.wordUsageExamplesReady && this.app.wordUsageExamples.provider ? this.app.wordUsageExamples.provider.toString() : null
    },
    providerRights () {
      return (this.app.wordUsageExamples && this.app.wordUsageExamples.provider && this.app.wordUsageExamples.provider.rights)
        ? Array.from(this.app.wordUsageExamples.provider.rights.entries()).map(([key, value]) => { return { key, value } })
        : []
    },
    wordUsageListSorted () {
      // TODO support user-selected sort key and order
      // eventually sorting should also take language into account but
      // for now we will probably only show Latin author and work names anyway
      if (this.showWordUsageExampleItems && this.wordUsageExamples) {
        return this.sortWordUsageExamplesBy()
      }
      return []
    },
    collapsedHeaderTitle () {
      return this.collapsedHeader ? this.l10n.getText('WORDUSAGE_SHOW_FILTERS_TEXT') : this.l10n.getText('WORDUSAGE_HIDE_FILTERS_TEXT')
    }
  },
  methods: {
    changedSortBy (sortByFromHeader) {
      this.sortBy = sortByFromHeader
    },
    setAuthorTextWork (selectedAuthor, selectedTextWork) {
      this.selectedAuthor = selectedAuthor
      this.selectedTextWork = selectedTextWork
    },
    filterCurrentByAuthor (selectedAuthor, selectedTextWork) {
      this.setAuthorTextWork(selectedAuthor, selectedTextWork)
      this.needInnerFilter = true
      this.collapsedHeader = true
    },
    getMoreResults (selectedAuthor, selectedTextWork) {
      this.setAuthorTextWork(selectedAuthor, selectedTextWork)
      this.needInnerFilter = false
    },
    getAllResults () {
      this.setAuthorTextWork(null, null)
      this.needInnerFilter = false
      this.collapsedHeader = true
    },
    getPropertyBySortBy (a, type) {
      switch (type) {
        case 'byAuthor':
          return a.authorForSort()
        case 'byTextWork':
          return a.textWorkForSort()
        case 'byPrefix':
          return a.prefixForSort
        case 'bySuffix':
          return a.suffixForSort
        default:
          return a.fullCit().toUpperCase()
      }
    },
    sortWordUsageExamplesBy () {
      return this.wordUsageExamples.sort((a, b) => {
        let aU = this.getPropertyBySortBy(a, this.sortBy)
        let bU = this.getPropertyBySortBy(b, this.sortBy)
        if (aU < bU) {
          return -1
        }
        if (aU > bU) {
          return 1
        }
        return 0
      })
    },
    changeShowDataSource () {
      this.showDataSource = !this.showDataSource
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.ui.registerAndActivateGetSelectedText('getSelectedText-usageExamples', '.alpheios-word-usage')
    })
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-word-usage {
    display: flex;
    flex-direction: column;
    height: 100%;

    div.alpheios_word_usage_list_title {
      flex: none;
      font-weight: bold;
      padding-bottom: 5px;
      border-bottom: 1px solid var(--alpheios-border-color);
      margin-bottom: 10px;
    }

    div.alpheios_word_usage_list_mainblock {
      flex: 1 1 auto;
      position: relative;
      -webkit-overflow-scrolling: touch;
    }
    div.alpheios-word_usage_list__provider {
      flex: none;
      font-weight: normal;

      padding: 10px 0;
      font-size: 80%;
    }

    .alpheios-word-usage-header-select-author,
    .alpheios-word-usage-header-select-textwork,
    .alpheios-word-usage-header-select-sortBy {
      width: 88%;
      max-width: 400px;
    }

    & .alpheios-select:not([multiple]):not([size]) {
      background-size: 10%;
    }

    .alpheios-word-usage-header-clear-icon {
      width: 20px;
      height: 20px;
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    .alpheios-word-usage-header-clear-disabled.alpheios-word-usage-header-clear-icon {
      cursor: inherit;
      fill: var(--alpheios-text-color);
    }

    &__examples {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      grid-auto-rows: auto;
    }

    &__examples-show-sources-btn {
      margin: 40px 0  20px;
    }


    a#{&}__examples-source-link-large {
      grid-column: 1/4;
      color: var(--alpheios-link-color-on-light);
      padding-top: 10px;
      padding-bottom: 5px;
    }

    &__examples-source-link-compact-cont {
      grid-column: 1/4;
      padding-top: 5px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--alpheios-border-color);
    }

    a#{&}__examples-source-link-compact-text {
      color: var(--alpheios-link-color-on-light);
    }

    &__examples-pre,	
    &__examples-target-word,	
    &__examples-post {	
      padding-bottom: 10px;	
      border-bottom: 1px solid var(--alpheios-border-color);	
      white-space: nowrap;	
    }

    &__examples-pre {
      grid-column: 1;
      text-align: right;
      border-bottom: 1px solid var(--alpheios-border-color);
    }

    &__examples-target-word {
      grid-column: 2;
      text-align: center;
      padding: 0 3px;
      color: var(--alpheios-highlight-dark-color);
      font-weight: 700;
      border-bottom: 1px solid var(--alpheios-border-color);
    }

    &__examples-post {
      grid-column: 3;
      text-align: left;
      border-bottom: 1px solid var(--alpheios-border-color);
    }



    .alpheios-word-usage-header-show-link {
      cursor: pointer;
      color: var(--alpheios-color-vivid);
      &:hover {
        text-decoration: underline;
        color: var(--alpheios-color-vivid-hover);
      }
    }
  }

  .alpheios-word-usage__examples-show-sources-btn {
    display: none;
  }



  .alpheios-layout-compact {
    .alpheios-word-usage-header-select-type-filters-block
    .alpheios-word-usage-header-select-type-filter {
      display: inline-block;
      vertical-align: middle;
      margin-right: 20px;
    }

    .alpheios-word-usage-filters-select,
    .alpheios-word-usage-header-actions {
      display: inline-block;
      vertical-align: middle;
    }

    .alpheios-word-usage-filters-select {
      width: 100%;
      max-width: 450px;
    }

    .alpheios-word-usage-header-actions {
      border-top: 0;
      margin-top: 0;
      padding-top: 10px;
    }

    .alpheios-word-usage__examples-show-sources-btn {
      margin: 20px 0;
    }

    
    .alpheios-word-usage__examples-source-link-large {
        display: none;
      }
    
    .alpheios-word-usage__examples-show-sources-btn {
      display: inline-block;
    }

    .alpheios-word-usage__examples--sources-visible 
      .alpheios-word-usage__examples-source-link-large{
      display: block;
    }
  }

</style>
