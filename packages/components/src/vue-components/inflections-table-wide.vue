<template>
    <div v-if="!view.isImplemented" class="alpheios-inflections__not-impl-msg">
        {{messages.INFLECT_MSG_TABLE_NOT_IMPLEMENTED}}
    </div>
    <div v-else-if="view.wideView && !view.isEmpty">
        <h3 class="alpheios-inflections__title alpheios-table-sf__title alpheios-clickable"
            @click="collapse">
            {{view.title}}
            <span v-show="state.collapsed">[+]</span>
            <span v-show="!state.collapsed">[-]</span>
        </h3>

        <template v-if="!state.collapsed">
            <div v-if="view.isImplemented && !view.hasPrerenderedTables" class="alpheios-inflections__table-ctrl-cont">
                <div v-show="view.canCollapse && state.noSuffixGroupsHidden" class="alpheios-inflections__table-ctrl-cell--btn">
                    <alph-tooltip tooltipDirection="bottom-right"
                                  :tooltipText="messages.TOOLTIP_INFLECT_SHOWFULL">
                        <button class="uk-button uk-button-primary uk-button-small alpheios-inflections__control-btn alpheios-inflections__control-btn--right"
                                @click="showNoSuffixGroups">
                            {{messages.LABEL_INFLECT_SHOWFULL}}
                        </button>
                    </alph-tooltip>
                </div>

                <div v-show="view.canCollapse && !state.noSuffixGroupsHidden" class="alpheios-inflections__table-ctrl-cell--btn">
                    <alph-tooltip tooltipDirection="bottom-right"
                                  :tooltipText="messages.TOOLTIP_INFLECT_COLLAPSE">
                        <button class="uk-button uk-button-primary uk-button-small alpheios-inflections__control-btn alpheios-inflections__control-btn--right"
                                @click="hideNoSuffixGroups">
                            {{messages.LABEL_INFLECT_COLLAPSE}}
                        </button>
                    </alph-tooltip>
                </div>
            </div>

            <div v-if="!view.hasPrerenderedTables" :style="view.wideView.style"
                 class="infl-table infl-table--wide" id="alpheios-wide-vue-table">
                <template v-for="row in view.wideView.rows">
                    <div :class="cellClasses(cell)" v-for="cell in row.cells"
                         @mouseover.stop.prevent="cellMouseOver(cell)" @mouseleave.stop.prevent="cellMouseLeave(cell)">
                        <template v-if="cell.isDataCell">
                            <template v-for="(morpheme, index) in cell.morphemes">
                            <span :class="morphemeClasses(morpheme)">
                                <template v-if="morpheme.value">{{morpheme.value}}</template>
                                <template v-else>-</template>
                            </span>
                                <infl-footnote v-if="morpheme.hasFootnotes" :footnotes="morpheme.footnotes"></infl-footnote>
                                <template v-if="index < cell.morphemes.length-1">, </template>
                            </template>
                        </template>
                        <span v-else v-html="cell.value"></span>
                    </div>
                </template>
            </div>
            <div v-else-if="!state.collapsed" class="infl-prdgm-tbl">
                <div class="infl-prdgm-tbl__row" v-for="row in view.wideTable.rows">
                    <div class="infl-prdgm-tbl__cell" :class="prerenderedCellClasses(cell)" v-for="cell in row.cells">
                        {{cell.value}}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
  import InflFootnote from './infl-footnote.vue'
  import Tooltip from './tooltip.vue'

  export default {
    name: 'WideInflectionsTableStandardForm',
    components: {
      inflFootnote: InflFootnote,
      alphTooltip: Tooltip,
    },
    props: {
      // An inflection table view
      view: {
        type: [Object, Boolean],
        required: true
      },
      messages: {
        type: Object,
        required: true
      },
      collapsed: {
        type: [Boolean],
        default: true,
        required: false
      },
      // Indicate if this is a table for the inflection browser
      inflBrowserTable: {
        type: [Boolean],
        default: false,
        required: false
      }
    },

    data: function () {
      return {
        state: {
          collapsed: true,
          noSuffixGroupsHidden: true
        },
        classes: {
          fullMorphologyMatch: 'infl-cell--morph-match'
        }
      }
    },

    methods: {
      initView: function () {
        if (this.view.isRenderable) {
          // Rendering is not required for component-enabled views
          this.view.render()
        }
        this.state.noSuffixGroupsHidden = this.view.isNoSuffixMatchesGroupsHidden
        this.$emit('widthchange')
      },

      collapse: function () {
        this.state.collapsed = !this.state.collapsed
        this.view.wideView.collapsed = this.state.collapsed
        this.$emit('interaction')
      },

      hideNoSuffixGroups: function () {
        this.view.noSuffixMatchesGroupsHidden(true)
        this.state.noSuffixGroupsHidden = true
        this.$emit('widthchange')
      },

      showNoSuffixGroups: function () {
        this.view.noSuffixMatchesGroupsHidden(false)
        this.state.noSuffixGroupsHidden = false
        this.$emit('widthchange')
      },

      // Cell classes for regular tables
      cellClasses: function (cell) {
        let classes = cell.classes
        if (this.inflBrowserTable) {
          // Do not show full morphology matches in an inflection browser
          classes[this.classes.fullMorphologyMatch] = false
        }
        return classes
      },

      // Cell classes for pre-rendered tables
      // TODO: merge with `cellClasses()`
      prerenderedCellClasses: function (cell) {
        switch (cell.role) {
          case 'label':
            return 'infl-prdgm-tbl-cell--label'
          case 'data':
            return 'infl-prdgm-tbl-cell--data'
        }
      },

      morphemeClasses: function (morpheme) {
        if (this.inflBrowserTable) {
          return {
            ['infl-suff']: true
          }
        } else {
          return {
            ['infl-suff']: true,
            ['infl-suff--suffix-match']: morpheme.match.suffixMatch,
            ['infl-suff--full-match']: morpheme.match.fullMatch
          }
        }
      },

      cellMouseOver: function (cell) {
        let wideView =  this.view.wideView
        if (cell.isDataCell) {
          cell.highlightRowAndColumn()
          this.view.wideView = wideView
        }
      },

      cellMouseLeave: function (cell) {
        let wideView =  this.view.wideView
        if (cell.isDataCell) {
          cell.clearRowAndColumnHighlighting()
          this.view.wideView = wideView
        }
      }
    },

    watch: {
      view: function () {
        this.initView()
      },

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

      this.initView()
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-table-sf__title {
        margin-bottom: 5px;
        padding-left: 30px;
    }

    .alpheios-clickable {
        cursor: pointer;
    }

    .alpheios-inflections__not-impl-msg {
        margin-top: 30px;
        padding: 20px;
        font-size: 0.875rem;
    }

    .alpheios-inflections__table-ctrl-cont {
        display: flex;
        width: 100%;
        margin-bottom: 0.2rem;
        justify-content: flex-end;
    }

    .alpheios-inflections__table-ctrl-cell {
        flex-grow: 1;
    }

    // To override skin styles
    div.alpheios-inflections__table-ctrl-cont div.alpheios-inflections__table-ctrl-cell
    {
        font-size: 0.875rem;
    }

    .alpheios-inflections__table-ctrl-btn-cont {
        margin-left: 0.2rem;
    }

    .auk .uk-button-small.alpheios-inflections__control-btn {
        line-height: 1.6;
        white-space: nowrap;
    }

    .auk .uk-button-small.alpheios-inflections__control-btn--right {
        margin-left: .5rem;
    }

    // region Paradigm table styles
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
    // endregion Paradigm table styles

    // region Tables
    .infl-table {
        display: grid;
        border-left: 1px solid #111;
        border-bottom: 1px solid #111;
        margin-bottom: 1rem;
    }

    .infl-table--wide {
        /* Data flow order: number- case - declension - gender - type*/
        grid-auto-flow: row;
        grid-template-columns: repeat(21, 1fr); /* Default value, will be redefined in JS if necessary */
    }

    .infl-table--narrow {
        /* Data flow order: declension - number- case - gender - type*/
        grid-auto-flow: row;
        grid-template-columns: repeat(6, 1fr); /* Default value, will be redefined in JS if necessary */
    }

    .infl-table.hidden {
        display: none;
    }

    .infl-table-narrow-views-cont {
        display: flex;
        flex-wrap: wrap;
    }

    .infl-cell {
        font-size: 12px;
        padding: 0 2px 0 5px;
        border-right: 1px solid #111;
        border-top: 1px solid #111;
        position: relative;
    }

    .infl-cell.hidden {
        display: none;
    }

    .infl-cell--hdr {
        font-weight: 700;
        text-align: center;
    }

    .infl-cell--hdr .infl-cell__conj-stem {
        text-transform: none;
    }

    .infl-cell--fw {
        grid-column: 1 / -1;
        font-style: italic;
        text-transform: capitalize;
    }

    .infl-cell.infl-cell--sep {
        height: 50px;
    }

    .infl-cell--sp0 {
        display: none;
    }

    @for $i from 1 through 24 {
        .infl-cell--sp#{$i} {
            grid-column-end: span #{$i};
        }
    }

    .infl-cell--hl {
        background: lightgray;
    }

    .infl-cell--morph-match,
    .infl-table .infl-cell.infl-cell--morph-match // To override a color schema
    {
        border: 3px solid rgb(188, 230, 240);
    }

    .infl-cell__conj-stem {
        text-transform: none;
    }

    .infl-suff {
        cursor: pointer;
    }

    .row-title-cell {
        text-transform: capitalize;
    }

    .infl-suff.infl-suff--suffix-match {
        background-color: rgb(188, 230, 240);
    }

    .infl-suff--full-match {
        background-color: lightgray;
    }

    .infl-suff.infl-suff--suffix-match.infl-suff--full-match {
        background-color: $alpheios-highlight-color;
        font-weight: 700;
    }
    // endregion Tables
</style>
