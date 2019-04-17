<template>
    <div class="alpheios-wordlist-filters">
        <p class="alpheios-wordlist-header-title">{{ l10n.getText('WORDLIST_FILTER_BY') }}</p>
        <div>
        <select class="alpheios-select alpheios-wordlist-header-select-filterBy"
                v-model="selectedFilterBy" @change="changedFilterBy">
          <option v-for="typeFiltering in typeFiltersList" v-bind:key="typeFiltering.value"
                  v-bind:value="typeFiltering.value">{{ typeFiltering.title }}</option>
        </select>
        <alph-tooltip :tooltipText="l10n.getMsg('WORDLIST_FILTER_CLEAR')" tooltipDirection="top-right">
          <span class="alpheios-wordlist-header-clear-icon"
                @click="clearFiltering"
                :class = '{ "alpheios-wordlist-header-clear-disabled": selectedFilterBy === null }'
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
    name: 'WordFilterPanel',
    inject: ['app', 'l10n'],
    components: {
      clearFiltersIcon: ClearFilters,
      alphTooltip: Tooltip
    },
    data () {
      return {
        selectedFilterBy: null,
        typeFiltersList: [
          { value: 'byCurrentSession', title: this.l10n.getText('WORDLIST_FILTER_BYCURRENTSESSION') }
        ]
      }
    },
    methods: {
      changedFilterBy () {
        this.$emit('changedFilterBy', this.selectedFilterBy)
      },
      clearFiltering () {
        this.selectedFilterBy = null
        this.changedFilterBy()
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-wordlist-filters {
      padding: 10px;
      .alpheios-wordlist-header-title {
          margin: 0;
          font-weight: bold;
          padding-bottom: 10px;
      }

      .alpheios-wordlist-header-select-filterBy {
          width: 50%;
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
  }
</style>
