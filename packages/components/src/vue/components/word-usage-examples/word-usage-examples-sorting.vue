<template>
    <div v-show="availableSortBy && !collapsedHeader" class="alpheios-word-usage-header-sorting">
      <p class="alpheios-word-usage-header-title">
        {{ l10n.getText('WORDUSAGE_SORT_BY') }}
      </p>
      <div class="alpheios-word-usage-sorting-select">
        <select class="alpheios-select alpheios-word-usage-header-select-sortBy"
                v-model="selectedSortBy" @change="changedSortBy">
          <option v-for="typeSorting in typeSortingList" v-bind:key="typeSorting.value"
                  v-bind:value="typeSorting.value" v-bind:disabled="typeSorting.disabled"
                  :class='{ "alpheios-select-disabled-option": typeSorting.disabled }'
                  >{{ typeSorting.title }}</option>
        </select>
        <alph-tooltip :tooltipText="l10n.getMsg('WORDUSAGE_SORTING_AUTHOR_CLEAR')" tooltipDirection="top-right">
          <span class="alpheios-word-usage-header-clear-icon"
                @click="clearSorting"
                :class = '{ "alpheios-word-usage-header-clear-disabled": selectedSortBy === null }'
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
  name: 'WordUsageExamplesSorting',
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
      selectedSortBy: null,
      typeSortingList: [
        { value: null, title: this.l10n.getText('WORDUSAGE_SORT_BY_PLACEHOLDER') },
        { value: 'byPrefix', title: this.l10n.getText('WORDUSAGE_SORT_BY_PREFIX') },
        { value: 'bySuffix', title: this.l10n.getText('WORDUSAGE_SORT_BY_SUFFIX') }
      ]
    }
  },
  computed: {
    availableSortBy () {
      return this.$store.state.app.wordUsageExamplesReady && this.app.wordUsageExamples.wordUsageExamples && this.app.wordUsageExamples.wordUsageExamples.length > 0
    }
  },
  methods: {
    changedSortBy () {
      this.$emit('changedSortBy', this.selectedSortBy)
    },
    clearSorting () {
      this.selectedSortBy = null
      this.changedSortBy()
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-word-usage-sorting-select .alpheios-select {
    option.alpheios-select-disabled-option {
      color: var(--alpheios-color-placehoder);
    }
  }

  .alpheios-word-usage-header-sorting {
    padding-bottom: 10px;
    margin-top: 10px;
    border-bottom: 1px solid var(--alpheios-border-color);
  }
</style>
