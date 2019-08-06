<template>

  <div>
    <div @click="collapse"
        class="alpheios-inflections__title alpheios-clickable">
      {{title}}
      <span v-show="state.collapsed">[+]</span>
      <span v-show="!state.collapsed">[-]</span>
    </div>
    <div
            v-if="hasInflectionTables && state.view.canCollapse && state.noSuffixGroupsHidden"
            v-show="!state.collapsed"
            class="alpheios-inflections__table-ctrl-cell--btn"
        >
          <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_INFLECT_SHOWFULL')"
                        tooltipDirection="bottom-right" >
            <button
                @click="showNoSuffixGroups"
                class="alpheios-button-secondary alpheios-inflections__control-btn alpheios-inflections__control-btn--right">
              {{l10n.getMsg('LABEL_INFLECT_SHOWFULL')}}
            </button>
          </alph-tooltip>
      </div>

      <div class="alpheios-inflections__table-ctrl-cell--btn"
            v-if="hasInflectionTables && !state.standardFormTable"
            v-show="!state.collapsed && state.view.canCollapse && !state.noSuffixGroupsHidden">
        <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_INFLECT_COLLAPSE')"
                      tooltipDirection="bottom-right">
          <button
              @click="hideNoSuffixGroups"
              class="alpheios-button-secondary alpheios-inflections__control-btn alpheios-inflections__control-btn--right">
            {{l10n.getMsg('LABEL_INFLECT_COLLAPSE')}}
          </button>
        </alph-tooltip>
      </div>

    <h4
        v-show="!state.collapsed && additionalTitle"
        class="alpheios-inflections__additional_title"
    >
      {{ additionalTitle }}
    </h4>

    <div
        v-show="!state.collapsed"
        class="alpheios-inflections__wide-view"
    >
      <div
          :style="tableStyles"
          class="infl-table infl-table--wide"
          id="alpheios-wide-vue-table"
          v-if="hasInflectionTables">
        <template v-for="row in state.view.wideView.rows">
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

      <div class="infl-prdgm-tbl" v-if="hasPrerenderedTables">
        <div class="infl-prdgm-tbl__row" v-for="row in state.view.wideTable.rows">
          <div :class="prerenderedCellClasses(cell)" class="infl-prdgm-tbl__cell" v-for="cell in row.cells">
            {{cell.value}}
          </div>
        </div>
      </div>

    </div>

    <div
        class="alpheios-inflections__not-impl-msg"
        v-show="!state.collapsed && !isAvailable"
    >
      {{l10n.getMsg('INFLECT_MSG_TABLE_NOT_IMPLEMENTED')}}
    </div>
  </div>
</template>
<script>
import { ViewSetFactory } from 'alpheios-inflection-tables'

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
    /*
    This component shall receive either a fully initialized (but not necessarily rendered) view prop
    or a standard form data object, which will be used later to construct a standard form view.
    If none is provided, a component will fail to render an inflection table.
     */
    view: {
      type: [Object, Boolean],
      default: false,
      required: false
    },
    standardFormData: {
      type: [Object, Boolean],
      default: false,
      required: false
    },

    // Initial state of the component: collapsed or expanded.
    collapsed: {
      type: [Boolean],
      default: true,
      required: false
    }
  },

  data: function () {
    return {
      standardFormView: null,
      state: {
        view: null,
        standardFormTable: false,
        collapsed: true,
        noSuffixGroupsHidden: true
      },
      classes: {
        fullMorphologyMatch: 'infl-cell--morph-match'
      }
    }
  },

  computed: {
    title: function () {
      return this.view.title || this.standardFormData.title || ''
    },

    additionalTitle: function () {
      return this.view.additionalTitle || this.standardFormData.additionalTitle || ''
    },

    hasInflectionTables: function () {
      return this.isAvailable && !this.state.view.hasPrerenderedTables
    },

    hasPrerenderedTables: function () {
      return this.isAvailable && this.state.view.hasPrerenderedTables
    },

    tableStyles: function () {
      return {
        gridTemplateColumns: `repeat(${this.state.view.wideView.visibleColumnQty + this.state.view.wideView.titleColumnQty}, 1fr)`
      }
    },

    isAvailable: function () {
      return (
        this.state.view &&
        this.state.view.isImplemented &&
        this.state.view.wideView &&
        this.state.view.wideView.rows.length > 0
      )
    }
  },

  methods: {
    getRenderedView: function () {
      if (this.view) {
        // This component has an instance of an initialized view supplied
        return this.view.render()
      } else if (this.standardFormData) {
        // A standard form data is provided. It will be used to create, initialize, and render the corresponding view.
        this.state.standardFormTable = true
        return ViewSetFactory.getStandardForm(this.standardFormData).render()
      }
    },
    collapse: function () {
      this.state.collapsed = !this.state.collapsed
      if (!this.state.collapsed) {
        // A view has been expanded, we need to check if it needs to be rendered.
        if (!this.state.view || !this.state.view.isRendered) {
          this.state.view = this.getRenderedView()
        }
      }

      if (this.state.view.isImplemented) {
        this.state.view.wideView.collapsed = this.state.collapsed
      }
    },

    hideNoSuffixGroups: function () {
      this.state.view.noSuffixMatchesGroupsHidden(true)
      this.state.noSuffixGroupsHidden = true
    },

    showNoSuffixGroups: function () {
      this.state.view.noSuffixMatchesGroupsHidden(false)
      this.state.noSuffixGroupsHidden = false
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

      if (this.state.standardFormTable) {
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
      if (this.state.standardFormTable) {
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
    'view.uid': function () {
      this.state.view = this.view
      this.state.noSuffixGroupsHidden = this.state.view.isNoSuffixMatchesGroupsHidden
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
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-inflections__title {
    color: var(--alpheios-inflect-title-color);
    font-size: textsize(22px);
    font-family: var(--alpheios-serif-font-face);
    line-height: 1;
    margin-bottom: textsize(10px);
    font-weight: 700;
    position: relative;
    z-index: 1;
    display: inline-block;
  }

  .alpheios-inflections__not-impl-msg {
    padding: 20px;
    font-size: 0.875rem;
  }

  .alpheios-inflections__wide-view {
    position: relative;
  }

  .alpheios-inflections__table-ctrl-cont {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    position: absolute;
    top: textsize(-50px);
  }

  .alpheios-inflections__table-ctrl-cell--btn {
    display: inline-block;
    margin: 0 0 15px 20px;
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

  .infl-prdgm-tbl-cell--full-match {
    background-color: var(--alpheios-highlight-color);
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
    font-size: var(--alpheios-base-text-size);
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
    border: 3px solid var(--alpheios-inflect-morph-match-cell-border-color);
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
    background-color: var(--alpheios-inflect-match-suff-bg);
  }

  .infl-suff--full-match {
    background-color: var(--alpheios-inflect-match-suff-bg);
    color: var(--alpheios-inflect-match-suff-color);
  }

  .infl-suff.infl-suff--suffix-match.infl-suff--full-match {
    background-color: var(--alpheios-inflect-full-match-suff-bg);
    color: var(--alpheios-inflect-full-match-suff-color);
    font-weight: 700;
  }

  .alpheios-inflections__control-btn {
    color: var(--alpheios-inflect-button-control-color);
    background-color: var(--alpheios-inflect-button-control-bg);
    border-color: var(--alpheios-inflect-button-control-border-color);

    &:hover {
      color: var(--alpheios-inflect-button-control-color-hover);
      background-color: var(--alpheios-inflect-button-control-bg-hover);
      border-color: var(--alpheios-inflect-button-control-border-color-hover);

    }
  }
  // endregion Tables
</style>
