<template>

  <div>
    <h3 @click="collapse"
        class="alpheios-inflections__title alpheios-table-sf__title alpheios-clickable">
      {{view.title}}
      <span v-show="state.collapsed">[+]</span>
      <span v-show="!state.collapsed">[-]</span>
    </h3>

    <template v-if="!state.collapsed">
      <h4 class="alpheios-inflections__additional_title" v-if="view.additionalTitle">{{view.additionalTitle}}</h4>
      <div class="alpheios-inflections__not-impl-msg"
           v-if="!view.isImplemented || (view.wideView && view.wideView.rows.length == 0)">
        {{l10n.getMsg('INFLECT_MSG_TABLE_NOT_IMPLEMENTED')}}
      </div>
      <div v-else-if="view.wideView">
        <div class="alpheios-inflections__table-ctrl-cont" v-if="!view.hasPrerenderedTables && !inflBrowserTable">
          <div class="alpheios-inflections__table-ctrl-cell--btn"
               v-show="view.canCollapse && state.noSuffixGroupsHidden">
            <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_INFLECT_SHOWFULL')"
                          tooltipDirection="bottom-right">
              <button
                  @click="showNoSuffixGroups"
                  class="alpheios-button alpheios-button--primary alpheios-button-small alpheios-inflections__control-btn alpheios-inflections__control-btn--right">
                {{l10n.getMsg('LABEL_INFLECT_SHOWFULL')}}
              </button>
            </alph-tooltip>
          </div>

          <div class="alpheios-inflections__table-ctrl-cell--btn"
               v-show="view.canCollapse && !state.noSuffixGroupsHidden">
            <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_INFLECT_COLLAPSE')"
                          tooltipDirection="bottom-right">
              <button
                  @click="hideNoSuffixGroups"
                  class="alpheios-button alpheios-button--primary alpheios-button-small alpheios-inflections__control-btn alpheios-inflections__control-btn--right">
                {{l10n.getMsg('LABEL_INFLECT_COLLAPSE')}}
              </button>
            </alph-tooltip>
          </div>
        </div>

        <template v-if="!view.hasPrerenderedTables">
          <div :style="tableStyles" class="infl-table infl-table--wide" id="alpheios-wide-vue-table">
            <template v-for="row in view.wideView.rows">
              <div :class="cellClasses(cell)" @mouseleave.stop.prevent="cellMouseLeave(cell)"
                   @mouseover.stop.prevent="cellMouseOver(cell)" v-for="cell in row.cells">
                <template v-if="cell.isDataCell">
                  <template v-for="(morpheme, index) in cell.morphemes">
                                    <span :class="morphemeClasses(morpheme)">
                                        <template v-if="morpheme.value">{{morpheme.value}}</template>
                                        <template v-else>-</template>
                                    </span>
                    <infl-footnote :footnotes="morpheme.footnotes" v-if="morpheme.hasFootnotes"></infl-footnote>
                    <template v-if="index < cell.morphemes.length-1">,</template>
                  </template>
                </template>
                <span v-else v-html="l10n.getText(cell.value)"></span>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="infl-prdgm-tbl">
            <div class="infl-prdgm-tbl__row" v-for="row in view.wideTable.rows">
              <div :class="prerenderedCellClasses(cell)" class="infl-prdgm-tbl__cell" v-for="cell in row.cells">
                {{cell.value}}
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import InflFootnote from './infl-footnote.vue'
import Tooltip from './tooltip.vue'

export default {
  name: 'WideInflectionsTableStandardForm',
  inject: ['l10n'],
  components: {
    inflFootnote: InflFootnote,
    alphTooltip: Tooltip
  },
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
      },
      options: {
        emptyColumnsHidden: true,
        noSuffixMatchesHidden: true
      }
    }
  },

  computed: {
    tableStyles: function () {
      return {
        gridTemplateColumns: `repeat(${this.view.wideView.visibleColumnQty + this.view.wideView.titleColumnQty}, 1fr)`
      }
    }
  },

  methods: {
    collapse: function () {
      if (!this.view.isRendered) {
        this.view.render(this.options)
      }
      this.state.collapsed = !this.state.collapsed
      if (this.view.isImplemented) {
        this.view.wideView.collapsed = this.state.collapsed
      }
      this.$emit('widthchange') // When view is open, we might need to adjust a panel width
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
      let classes = {
        'infl-cell': true,
        'infl-cell--morph-match': cell.morphologyMatch,
        'infl-cell--hl': cell.highlighted,
        'hidden': cell.hidden
      }

      if (cell.constructor.name === 'HeaderCell') {
        classes['infl-cell--hdr'] = true
        classes[`infl-cell--sp${cell.span}`] = true
      }

      if (cell.constructor.name === 'RowTitleCell') {
        classes['row-title-cell'] = true
        classes['infl-cell--hdr'] = cell.formsColumn
        if (cell.fullWidth) {
          classes['infl-cell--fw'] = true
        } else {
          classes[`infl-cell--sp${cell.span}`] = true
        }
      }

      if (this.inflBrowserTable) {
        // Do not show full morphology matches in an inflection browser
        classes['infl-cell--morph-match'] = false
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
          'infl-suff': true
        }
      } else {
        return {
          'infl-suff': true,
          'infl-suff--suffix-match': morpheme.match.suffixMatch,
          'infl-suff--full-match': morpheme.match.fullMatch
        }
      }
    },

    cellMouseOver: function (cell) {
      if (cell.isDataCell) {
        cell.highlightRowAndColumn()
      }
    },

    cellMouseLeave: function (cell) {
      if (cell.isDataCell) {
        cell.clearRowAndColumnHighlighting()
      }
    }
  },

  watch: {
    view: function () {
      this.$emit('widthchange')
      this.state.noSuffixGroupsHidden = this.view.isNoSuffixMatchesGroupsHidden
    },

    collapsed: function (state) {
      if (this.collapsed !== null) {
        this.state.collapsed = state
      }
    }
  },

  mounted: function () {
    if (this.inflBrowserTable) {
      this.options.noSuffixMatchesHidden = false
    }

    // Set a default value by the parent component
    if (this.collapsed !== null) {
      this.state.collapsed = this.collapsed
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-table-sf__title {
    margin-bottom: 5px;
    padding-left: 30px;
  }

  .alpheios-clickable {
    cursor: pointer;
  }

  .alpheios-inflections__not-impl-msg {
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
  div.alpheios-inflections__table-ctrl-cont div.alpheios-inflections__table-ctrl-cell {
    font-size: 0.875rem;
  }

  .alpheios-inflections__table-ctrl-btn-cont {
    margin-left: 0.2rem;
  }

  .auk .alpheios-button-small.alpheios-inflections__control-btn {
    line-height: 1.6;
    white-space: nowrap;
  }

  .auk .alpheios-button-small.alpheios-inflections__control-btn--right {
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
    //font-size: 12px;
    font-size: calc(var(--alpheios-base-text-size) * 0.75);
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
    line-height: 1.25;
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
