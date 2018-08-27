<template>
    <div v-if="view.wideTable">
        <h3 class="alpheios-inflections__title alpheios-table-sf__title">
            {{view.title}}
        </h3>

        <div class="infl-prdgm-tbl">
            <div class="infl-prdgm-tbl__row" v-for="row in view.wideTable.rows">
                <div class="infl-prdgm-tbl__cell" :class="cellClasses(cell)" v-for="cell in row.cells">
                    {{cell.value}}
                </div>
            </div>
        </div>
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
      }
    },

    data: function () {
      return {
        elementIDs: {
          wideView: 'alph-inflection-table-wide',
          footnotes: 'alph-inflection-footnotes'
        }
      }
    },

    computed: {
    },

    methods: {
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
          for (const lexeme of this.view.homonym.lexemes) {
            for (const inflection of lexeme.inflections) {
              let fullMatch = true
              for (const feature of comparativeFeatures) {
                fullMatch = fullMatch && inflection.hasOwnProperty(feature) && cell[feature].hasValues(inflection[feature].values)
                if (!fullMatch) { break } // If at least one feature does not match, there is no reason to check others
              }
              if (fullMatch) {
                // If full match is found, there is no need to check other inflections
                return `${cellClassName} ${fullMatchClassnName}`
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
    @import "../styles/alpheios";

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
        min-width: 20px;
    }

    .infl-prdgm-tbl-cell--label {
        font-weight: 700;
    }

    .infl-prdgm-tbl-cell--full-match {
        background-color: $alpheios-highlight-color;
        font-weight: 700;
    }
</style>
