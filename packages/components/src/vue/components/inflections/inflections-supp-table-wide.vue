<template>
  <div :id="`${data.paradigmID}`" v-if="data">
    <h3 class="alpheios-inflections__supp-table-title">{{data.title}}</h3>
    <div class="infl-supp-tbl__cont">
      <div :style="{ backgroundColor: bgColor }" class="infl-prdgm-tbl infl-prdgm-tbl--supp">
        <div class="infl-prdgm-tbl__row" v-for="row in data.table.rows">
          <div :class="cellClasses(cell)" class="infl-prdgm-tbl__cell" v-for="cell in row.cells">
            {{cell.value}}
          </div>
        </div>
      </div>
      <a @click="navigate" class="infl-supp-tbl__reflink">{{ l10n.getMsg('INFLECTIONS_MAIN_TABLE_LINK_TEXT') }}</a>
    </div>
  </div>
</template>
<script>

export default {
  name: 'WideSupplementalInflectionsTable',
  inject: ['l10n'],
  props: {
    /*
         An object that represents a wide version of a table, consists of array of rows.
         Each rows consists of an array of cells.
        */
    data: {
      type: [Object, Boolean],
      required: true
    },

    bgColor: {
      type: [String],
      required: true
    }
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
        return 'infl-prdgm-tbl-cell--data'
      }
    },

    navigate () {
      this.$emit('navigate', 'top')
    }
  }
}
</script>
<style lang="scss">
  h3.alpheios-inflections__supp-table-title {
    font-size: 1rem;
    line-height: 1;
    margin: 1.5rem 0 0.6rem 0;
    font-weight: 700;
  }

  .infl-supp-tbl__cont {
    margin-bottom: 20px;
    display: inline-block;
  }

  .infl-prdgm-tbl--supp {
    margin-bottom: 10px;
  }

  a.infl-supp-tbl__reflink {
    float: right;
  }
</style>
