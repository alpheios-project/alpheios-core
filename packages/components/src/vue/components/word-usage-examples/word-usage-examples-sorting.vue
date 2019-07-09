<template>
    <div v-show="showHeader && availableSortBy && !collapsedHeader" class="alpheios-word-usage-header-sorting">
      <p class="alpheios-word-usage-header-title">
        {{ l10n.getText('WORDUSAGE_SORT_BY') }}
      </p>
      <div class="alpheios-word-usage-sorting-select">
        <select class="alpheios-select alpheios-word-usage-header-select-sortBy"
                v-model="selectedSortBy" @change="changedSortBy">
          <option v-for="typeSorting in finalTypeSortingList"
          v-bind:key="typeSorting.value"
                  v-bind:value="typeSorting.value"
                  >{{ typeSorting.title }}</option>
        </select>
      </div>
    </div>
</template>
<script>
import Tooltip from '@/vue/components/tooltip.vue'

export default {
  name: 'WordUsageExamplesSorting',
  inject: ['app', 'l10n'],
  components: {
    alphTooltip: Tooltip
  },
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
    },
    hasSelectedAuthor: {
      type: Boolean,
      required: false,
      default: false
    },
    hasSelectedTextWork: {
      type: Boolean,
      required: false,
      default: false
    },
    reloadSorting: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      selectedSortBy: null,
      typeSortingList: [
        { value: null, title: this.l10n.getText('WORDUSAGE_SORT_BY_PLACEHOLDER') },
        { value: 'byTextWork', title: this.l10n.getText('WORDUSAGE_SORT_BY_TEXTWORK') },
        { value: 'byPrefix', title: this.l10n.getText('WORDUSAGE_SORT_BY_PREFIX') },
        { value: 'bySuffix', title: this.l10n.getText('WORDUSAGE_SORT_BY_SUFFIX') }
      ],
      calctypeSortingList: null
    }
  },

  watch: {
    reloadSorting (value) {
      if (this.availableSortBy) {
        if (this.hasSelectedTextWork) {
          this.selectedSortBy = this.typeSortingList[2].value
          this.calctypeSortingList = this.typeSortingList.slice(2, 4)
        } else if (this.hasSelectedAuthor) {
          this.selectedSortBy = this.typeSortingList[1].value
          this.calctypeSortingList = this.typeSortingList.slice(1, 4)
        } else {
          let result = this.typeSortingList.slice(2, 4)
          result.unshift(this.typeSortingList[0])
          this.selectedSortBy = this.typeSortingList[0].value
          this.calctypeSortingList = result
        }
      } else {
        this.selectedSortBy = null
      }
      this.changedSortBy()
    }
  },
  computed: {
    availableSortBy () {
      return this.$store.state.app.wordUsageExamplesReady && this.app.wordUsageExamples.wordUsageExamples && this.app.wordUsageExamples.wordUsageExamples.length > 1
    },
    finalTypeSortingList () {
      return this.reloadSorting ? this.calctypeSortingList : null
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
