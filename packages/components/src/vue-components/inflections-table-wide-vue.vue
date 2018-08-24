<template>
    <div v-if="view.wideTable">
        <div class="alpheios-table-sf__title alpheios-clickable"
            @click="collapsed = !collapsed">
            {{view.title}}
            <span v-show="collapsed">[+]</span>
            <span v-show="!collapsed">[-]</span>
        </div>

        <div v-show="!collapsed" :style="tableStyle" class="infl-table infl-table--wide" id="alpheios-wide-vue-table">
            <template v-for="row in view.wideTable.rows">
                <div :class="cell.classes" v-for="cell in row.cells"
                     @mouseover.stop.prevent="cellMouseOver(cell)" @mouseleave.stop.prevent="cellMouseLeave(cell)">
                    <template v-if="cell.isDataCell">
                        <template v-for="(morpheme, index) in cell.morphemes">
                            <span :class="morphemeClasses(morpheme)">
                                <template v-if="morpheme.value">{{morpheme.value}}</template>
                                <template v-else>-</template>
                            </span>
                            <a v-if="morpheme.hasFootnotes" class="infl-suff-footnote-link"
                               @click.stop.prevent="morpheme.footnotesPopupVisible = true">
                                <sup v-for="(footnote, index) in morpheme.footnotes">
                                    {{footnote.index}}<template v-if="index < morpheme.footnotes.length-1">, </template>
                                </sup>
                                <div v-show="morpheme.footnotesPopupVisible" class="alpheios-inflections__footnote-popup">
                                    <div class="alpheios-inflections__footnote-popup-title">Footnotes:</div>
                                    <template v-for="footnote in morpheme.footnotes">
                                        <dt>{{footnote.index}}</dt>
                                        <dd>{{footnote.text}}</dd>
                                    </template>
                                    <div class="alpheios-inflections__footnote-popup-close-btn"
                                         @click.stop.prevent="morpheme.footnotesPopupVisible = false">
                                        <svg viewBox="0 0 20 20"><path d="M16 16L4 4M16 4L4 16"></path></svg>
                                    </div>
                                </div>
                            </a>
                            <template v-if="index < cell.morphemes.length-1">, </template>
                        </template>
                    </template>
                    <span v-else v-html="cell.value"></span>
                </div>
            </template>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'WideInflectionsTableStandardForm',
    props: {
      // An inflection table view
      view: {
        type: [Object, Boolean],
        required: true
      }
    },

    data: function () {
      return {
        table: this.view.wideTable, // This seems to be needed to
        collapsed: true
      }
    },

    computed: {
      tableStyle: function () {
        return this.view.wideTable.style
      }
    },

    methods: {
      morphemeClasses: function (morpheme) {
        return {
          ['infl-suff']: true,
          ['infl-suff--suffix-match']: morpheme.match.suffixMatch,
          ['infl-suff--full-feature-match']: morpheme.match.fullMatch,
        }
      },

      cellMouseOver: function (cell) {
        let wideTabe =  this.view.wideTable
        if (cell.isDataCell) {
          cell.highlightRowAndColumn()
          this.view.wideTable = wideTabe
        }
      },
      cellMouseLeave: function (cell) {
        let wideTabe =  this.view.wideTable
        if (cell.isDataCell) {
          cell.clearRowAndColumnHighlighting()
          this.view.wideTable = wideTabe
        }
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-table-sf__title {
        margin-bottom: 5px;
        padding-left: 30px;
    }

    .infl-suff-footnote-link {
        position: relative;
    }

    .alpheios-clickable {
        cursor: pointer;
    }
</style>
