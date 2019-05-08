<template>
  <div v-show="view.wideTable">
    <div @click="collapse" class="alpheios-inflections__title">
      {{view.title}}
      <span v-show="state.collapsed">[+]</span>
      <span v-show="!state.collapsed">[-]</span>
    </div>

    <template v-if="!state.collapsed">
      <div class="infl-prdgm-tbl">
        <div class="infl-prdgm-tbl__row" v-for="row in view.wideTable.rows">
          <div :class="cellClasses(cell)" class="infl-prdgm-tbl__cell" v-for="cell in row.cells">
            {{cell.value}}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>

export default {
  name: 'InflectionsTablePrerendered',
  props: {
    // An inflection table view
    view: {
      type: [Object, Boolean],
      required: true
    },
    collapsed: {
      type: [Boolean],
      default: true,
      required: false
    }
  },

  data: function () {
    return {
      state: {
        collapsed: true
      },
      elementIDs: {
        wideView: 'alph-inflection-table-wide',
        footnotes: 'alph-inflection-footnotes'
      }
    }
  },

  computed: {},
  watch: {
    collapsed: function (state) {
      if (this.collapsed !== null) {
        this.state.collapsed = state
      }
    }
  },
  mounted: function () {
    // Set a default value by the parent component
    if (this.collapsed !== null) {
      this.state.collapsed = this.collapsed
    }
  },
  methods: {
    collapse: function () {
      this.state.collapsed = !this.state.collapsed
    },

    cellClasses: function (cell) {
      if (cell.role === 'label') {
        return 'infl-prdgm-tbl-cell--label'
      }

      /*
          If it is a data cell, we need to figure out if this is a cell with a full match and
          highlight it accordingly. A full match is a cell which matches all features of the cell properties
          with the ones in the inflection.
          We do not check for suffix match because paradigm tables show example of a different word,
          not the one selected by the user.
           */
      if (cell.role === 'data') {
        let cellClassName = 'infl-prdgm-tbl-cell--data'
        const fullMatchClassnName = 'infl-prdgm-tbl-cell--full-match'
        // Get a list of cell feature properties
        let comparativeFeatures = []
        for (const prop of Object.keys(cell)) {
          // Eliminate "non-feature" keys
          if (prop !== 'role' && prop !== 'value') {
            comparativeFeatures.push(prop)
          }
        }
        if (this.view.homonym && this.view.homonym.lexemes) {
          for (const lexeme of this.view.homonym.lexemes) {
            for (const inflection of lexeme.inflections) {
              let fullMatch = true
              for (const feature of comparativeFeatures) {
                // if the inflection is missing a feature from the table it is assumed to match
                if (inflection.hasOwnProperty(feature)) {
                  fullMatch = fullMatch && cell[feature].hasValues(inflection[feature].values)
                  if (!fullMatch) {
                    break
                  } // If at least one feature does not match, there is no reason to check others
                }
              }
              if (fullMatch) {
                // If full match is found, there is no need to check other inflections
                return `${cellClassName} ${fullMatchClassnName}`
              }
            }
          }
        }

        return cellClassName
      }
    }
  }
}
</script>
<style lang="scss">
</style>
