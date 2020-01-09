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
      return {
        'infl-prdgm-tbl-cell--label': (cell.role === 'label'),
        'infl-prdgm-tbl-cell--data': (cell.role === 'data'),
        'infl-prdgm-tbl-cell--full-match': (cell.role === 'data') && cell.fullMatch
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
