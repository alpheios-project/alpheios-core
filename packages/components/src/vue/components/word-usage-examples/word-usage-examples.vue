<template>
  <div class="alpheios-word-usage">
    <div class="alpheios_word_usage_list_title" data-alpheios-ignore="all">{{ targetWord }}
      <span class="alpheios-word-usage-header-show-link" v-if="showHeaderFilters" @click="collapsedHeader = !collapsedHeader"> ({{ collapsedHeaderTitle }})</span>
      <div v-if="hasSelectedAuthor" class="alpheios_word_usage_hint">
        {{ l10n.getText('WORDUSAGE_HINT_FOCUS_SEARCH',
            { maxResults:settings.getFeatureOptions().items.wordUsageExamplesMax.currentValue })
        }}
      </div>
      <div v-else="!hasSelectedAuthor && !hasSelectedTextWork" class="alpheios_word_usage_hint">
        {{ l10n.getText('WORDUSAGE_HINT_INITIAL_SEARCH',
            { maxResults:settings.getFeatureOptions().items.wordUsageExamplesAuthMax.currentValue })
        }}
      </div>
    </div>

    <div class="alpheios-word-usage-header" data-alpheios-ignore="all">

      <word-usage-examples-filters
        :collapsedHeader = "finalCollapsedHeader"
        :showHeader = "showHeader"
        @filterCurrentByAuthor = "filterCurrentByAuthor"
        @getMoreResults = "getMoreResults"
        @getAllResults = "getAllResults"
      ></word-usage-examples-filters>


      <word-usage-examples-sorting
        :showHeader = "showHeader"
        @changedSortBy = "changedSortBy"
        :collapsedHeader = "finalCollapsedHeader"
        :hasSelectedAuthor = "hasSelectedAuthor"
        :hasSelectedTextWork = "hasSelectedTextWork"
        :reloadSorting = "reloadSorting"
      ></word-usage-examples-sorting>

    </div>

    <div class="alpheios_word_usage_list_mainblock" v-if="showWordUsageExampleItems">
      <template v-if="wordUsageListSorted.length > 0">
        <div class="alpheios-word-usage__examples-show-sources-cbx" data-alpheios-ignore="all">
          <input id="alpheios-word-usage-examples-show-sources-cbx-input" type="checkbox" v-model="showDataSource">
          <label for="alpheios-word-usage-examples-show-sources-cbx-input">
            {{ l10n.getText('WORDUSAGE_SHOW_SOURCE_LINKS') }}
          </label>
        </div>
        <div
            class="alpheios-word-usage__examples"
            :class="{'alpheios-word-usage__examples--sources-visible': showDataSource}"
        >
          <template
              v-for="wordUsageItem in wordUsageListSorted"
              :wordUsageItem="wordUsageItem"
          >
            <div
                class="alpheios-word-usage__examples-source-link-large"
                v-html="formattedFullCit(wordUsageItem)"
                @click="gotToTheSource(wordUsageItem)"
            >
            </div>
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
        <div v-if="selectedTextWork">
          {{ l10n.getText('WORDUSAGE_HINT_AUTHOR_WORK_FOCUS_SEARCH_NONE',
              { maxResults: settings.getFeatureOptions().items.wordUsageExamplesMax,
                word: targetWord,
                author: selectedAuthor.title(),
                work: selectedTextWork.title()
              })
          }}
        </div>
        <div v-show="! selectedTextWork">
        {{ l10n.getText('WORDUSAGE_NO_RESULTS') }}
        </div>
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
  inject: ['ui', 'app', 'l10n','settings'],
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
      collapsedHeader: true,
      reloadSorting: 0,
      hasSelectedAuthor: false,
      hasSelectedTextWork: false
    }
  },
  computed: {
    finalCollapsedHeader () {
      return this.app.platform.isMobile && this.collapsedHeader
    },
    targetWord () {
      return this.$store.state.app.homonymDataReady && this.app.homonym ? this.app.homonym.targetWord : null
    },
    language () {
      return this.$store.state.app.homonymDataReady && this.app.homonym ? this.app.homonym.language : null
    },
    showHeaderFilters () {
      return this.$store.state.app.wordUsageExamplesReady && this.app.platform.isMobile
    },
    showHeader () {
      return Boolean(this.selectedAuthor) ||
             this.showWordUsageExampleItems
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

      this.hasSelectedAuthor = Boolean(selectedAuthor)
      this.hasSelectedTextWork = Boolean(selectedTextWork)
    },
    filterCurrentByAuthor (selectedAuthor, selectedTextWork) {
      this.setAuthorTextWork(selectedAuthor, selectedTextWork)
      this.needInnerFilter = true
      this.collapsedHeader = true
    },
    getMoreResults (selectedAuthor, selectedTextWork) {
      this.setAuthorTextWork(selectedAuthor, selectedTextWork)
      this.needInnerFilter = false
      this.reloadSorting = this.reloadSorting + 1
    },
    getAllResults () {
      this.setAuthorTextWork(null, null)
      this.needInnerFilter = false
      this.collapsedHeader = true
      this.reloadSorting = this.reloadSorting + 1
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
    formattedFullCit (wordUsageItem) {
      return wordUsageItem.formattedAuthor + ' <i>' + wordUsageItem.formattedTextWork + '</i> ' + wordUsageItem.formattedPassage
    },
    gotToTheSource (wordUsageItem) {
      var tab = window.open(wordUsageItem.source, '_blank')
      tab.focus()
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

    div.alpheios_word_usage_list_title div.alpheios_word_usage_hint {
      font-weight: normal;
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

    .alpheios-word-usage-header-filter-select,
    .alpheios-word-usage-header-select-sortBy {
      width: 88%;
      max-width: 400px;
    }

    & .alpheios-select:not([multiple]):not([size]) {
      background-size: calc(var(--alpheios-base-text-size) * 2);
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

    &__examples-show-sources-cbx {
      margin: 40px 0  20px;
    }


    &__examples-source-link-large {
      grid-column: 1/4;
      color: var(--alpheios-usage-link-color);
      padding-top: 10px;
      padding-bottom: 5px;

      cursor: pointer;

      &:hover {
        color: var(--alpheios-usage-link-color-hover);
      }
    }

    &__examples-source-link-compact-cont {
      grid-column: 1/4;
      padding-top: 5px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--alpheios-border-color);
    }

    a#{&}__examples-source-link-compact-text {
      color: var(--alpheios-usage-link-color);

      &:hover {
        color: var(--alpheios-usage-link-color-hover);
      }
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
      color: var(--alpheios-usage-target-color);
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
      color: var(--alpheios-usage-link-color);
      &:hover {
        text-decoration: underline;
        color: var(--alpheios-usage-link-color-hover);
      }
    }
  }

  .alpheios-word-usage__examples-show-sources-cbx {
    display: none;
  }

  .alpheios-word-usage__examples-show-sources-cbx label {
    color: var(--alpheios-usage-link-color)
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

    .alpheios-word-usage__examples-show-sources-cbx {
      margin: 0 0 0 10px;
    }


    .alpheios-word-usage__examples-source-link-large {
        display: none;
      }

    .alpheios-word-usage__examples-show-sources-cbx {
      display: inline-block;
    }

    .alpheios-word-usage__examples--sources-visible
      .alpheios-word-usage__examples-source-link-large{
      display: block;
    }
  }

  .alpheios_word_usage_list_mainblock i {
    font-style: italic;
  }

</style>
