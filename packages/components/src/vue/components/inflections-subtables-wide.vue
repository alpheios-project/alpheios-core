<template>
  <div>
    <div class="infl-prdgm-tbl" v-for="table in view.wideSubTables">
      <div class="infl-prdgm-tbl__row" v-for="row in table.rows">
        <div :class="cellClasses(cell)" class="infl-prdgm-tbl__cell" v-for="cell in row.cells">
          {{cell.value}}
          <a :style="{backgroundColor: refColor(cell.reflink.id)}" @click="navigate(cell.reflink.id)"
             class="infl-prdgm-tbl__cell-reflink"
             v-if="!!cell.reflink">{{cell.reflink.text}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WideInflectionsSubTables',
  props: {
    // View
    view: {
      type: [Object],
      required: true
    }
  },

  data: function () {
    return {
      currentRefColorIdx: 0
    }
  },

  methods: {
    cellClasses: function (cell) {
      if (cell.role === 'label') {
        return 'infl-prdgm-tbl__cell--label'
      }

      /*
          If it is a data cell, we need to figure out if this is a cell with a full match and
          highlight it accordingly. A full match is a cell which matches all features of the cell properties
          with the ones in the inflection.
          We do not check for suffix match because paradigm tables show example of a different word,
          not the one selected by the user.
           */
      if (cell.role === 'data') {
        let cellClassName = 'infl-prdgm-tbl__cell--data'
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
    },

    refColor: function (paradigmID) {
      return this.view.hlSuppParadigms ? this.view.suppHlColors.get(paradigmID) : 'transparent'
    },

    navigate: function (reflink) {
      this.$emit('navigate', reflink)
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .infl-prdgm-tbl {
    display: table;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    margin-bottom: 30px;
  }

  .infl-prdgm-tbl__row {
    display: table-row;
  }

  .infl-prdgm-tbl__cell {
    display: table-cell;
    padding: 2px 5px;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
  }

  .infl-prdgm-tbl__cell--label {
    font-weight: 700;
  }
</style>
