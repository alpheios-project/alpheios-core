<template>
    <div v-if="data">
        <div class="infl-prdgm-tbl">
            <div class="infl-prdgm-tbl-row" v-for="row in data.rows">
                <div class="infl-prdgm-tbl-cell" :class="cellClasses(cell)" v-for="cell in row.cells">{{cell.value}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'WideInflectionsTable',
    props: {
      // This will be an InflectionData object
      data: {
        type: [Object, Boolean],
        required: true
      },
    },

    methods: {
      cellClasses: function (cell) {
        if (cell.role === 'label') { return 'infl-prdgm-tbl-cell--label' }
        if (cell.role === 'data') { return 'infl-prdgm-tbl-cell--data' }
      }
    }
  }
</script>
<style lang="scss">
    .infl-prdgm-tbl {
        display: table;
        border-top: 1px solid gray;
        border-left: 1px solid gray;
        margin-bottom: 30px;
    }

    .infl-prdgm-tbl-row {
        display: table-row;
    }

    .infl-prdgm-tbl-cell {
        display: table-cell;
        padding: 2px 5px;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        min-width: 20px;
    }

    .infl-prdgm-tbl-cell--label {
        font-weight: 700;
    }
</style>
