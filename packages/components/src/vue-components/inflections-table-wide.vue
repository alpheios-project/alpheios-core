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

        <div v-show="!state.collapsed" :style="view.wideView.style" class="infl-table infl-table--wide" id="alpheios-wide-vue-table">
            <template v-for="row in view.wideView.rows">
                <div :class="cell.classes" v-for="cell in row.cells"
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
    </div>
</template>
<script>
  import InflFootnote from './infl-footnote.vue'

  export default {
    name: 'WideInflectionsTableStandardForm',
    components: {
      inflFootnote: InflFootnote
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
      noSuffixMatchesHidden: {
        type: [Boolean],
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
        }
      }
    },

    methods: {
      collapse: function () {
        this.state.collapsed = !this.state.collapsed
        this.view.wideView.collapsed = this.state.collapsed
      },

      morphemeClasses: function (morpheme) {
        return {
          ['infl-suff']: true,
          ['infl-suff--suffix-match']: morpheme.match.suffixMatch,
          ['infl-suff--full-feature-match']: morpheme.match.fullMatch,
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
      noSuffixMatchesHidden: function (value) {
        this.view.noSuffixMatchesGroupsHidden(value)
      }
    },

    mounted: function () {
      // Set a default value by the parent component
      this.state.collapsed = this.collapsed
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
</style>
