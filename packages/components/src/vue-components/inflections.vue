<template>
    <div :id="elementIDs.content">
        <standard-forms v-if="languageID" :language-id="languageID" :messages="messages"></standard-forms>

        <div v-if="waitState" class="alpheios-inflections__placeholder">
            <div class="alpheios-inflections__progress-wrapper">
                <div class="alpheios-inflections__progress-border">
                    <div class="alpheios-inflections__progress-whitespace">
                        <div class="alpheios-inflections__progress-line"></div>
                        <div class="alpheios-inflections__progress-text">
                            {{messages.PLACEHOLDER_INFLECT_IN_PROGRESS}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="inflectionsEnabled && hasMatchingViews" class="alpheios-inflections__content">
            <div v-show="partsOfSpeech.length > 1">
                <label class="uk-form-label">{{messages.LABEL_INFLECT_SELECT_POFS}}</label>
                <select v-model="partOfSpeechSelector" class="uk-select alpheios-inflections__view-selector alpheios-text__smallest">
                    <option v-for="partOfSpeech in partsOfSpeech">{{partOfSpeech}}</option>
                </select>
            </div>
            <div class="alpheios-inflections__actions">
                <word-forms
                        :partOfSpeech = "selectedView.constructor.mainPartOfSpeech"
                        :targetWord = "selectedView.homonym.targetWord"
                        :lexemes = "selectedView.homonym.lexemes"
                        v-if="selectedView && selectedView.homonym">
                </word-forms>
                <div v-show="views.length > 1">
                    <select v-model="viewSelector" class="uk-select alpheios-inflections__view-selector alpheios-text__smallest">
                        <option v-for="view in views" :value="view.id">{{view.name}}</option>
                    </select>
                </div>
                <div v-show="selectedView.isImplemented && hasInflectionData && canCollapse" class="alpheios-inflections__control-btn-cont uk-button-group">
                    <alph-tooltip tooltipDirection="bottom-right" :tooltipText="buttons.hideNoSuffixGroups.tooltipText">
                        <button class="uk-button uk-button-primary uk-button-small alpheios-inflections__control-btn"
                                @click="hideNoSuffixGroupsClick">
                            {{buttons.hideNoSuffixGroups.text}}
                        </button>
                    </alph-tooltip>
                </div>
            </div>

            <h4 class="alpheios-inflections__additional_title" v-if="selectedView.additionalTitle">{{selectedView.additionalTitle}}</h4>

            <div v-if="data.inflectionData"
                 v-show="showExplanatoryHint"
                 class="alpheios-inflections__paradigms-expl"
                 v-html="messages.INFLECTIONS_PARADIGMS_EXPLANATORY_HINT.get(data.inflectionData.targetWord)">
            </div>

            <div v-if="!selectedView.hasPrerenderedTables">
                <main-table-wide-vue :view="selectedView" :messages="messages" v-bind:collapsed="false"
                                     :no-suffix-matches-hidden="buttons.hideNoSuffixGroups.noSuffixMatchesHidden">
                </main-table-wide-vue>

                <template v-if="selectedView.linkedViews" v-for="linkedView in selectedView.linkedViews">
                    <main-table-wide-vue :view="linkedView" :messages="messages"
                                         :no-suffix-matches-hidden="buttons.hideNoSuffixGroups.noSuffixMatchesHidden">
                    </main-table-wide-vue>
                </template>

                <div :id="elementIDs.footnotes" class="alpheios-inflections__footnotes">
                    <template v-for="footnote in footnotes">
                        <dt>{{footnote.index}}</dt>
                        <dd>{{footnote.text}}</dd>
                    </template>
                </div>
            </div>
            <template v-else>
                <prerendered-table-wide :view="selectedView"></prerendered-table-wide>
                <sub-tables-wide :view="selectedView" @navigate="navigate"></sub-tables-wide>

                <div v-show="selectedView.hasSuppParadigms" class="alpheios-inflections__supp-tables">
                    <h3 class="alpheios-inflections__title">{{messages.INFLECTIONS_SUPPLEMENTAL_SECTION_HEADER}}</h3>
                    <template v-for="paradigm of selectedView.suppParadigms">
                        <supp-tables-wide :data="paradigm"
                                          :bg-color="selectedView.hlSuppParadigms ? selectedView.suppHlColors.get(paradigm.paradigmID) : 'transparent'"
                                          :messages="messages" @navigate="navigate"></supp-tables-wide>
                    </template>
                </div>
            </template>

            <div v-show="selectedView.hasCredits" class="alpheios-inflections__credits-cont">
                <h3 class="alpheios-inflections__credits-title">{{messages.INFLECTIONS_CREDITS_TITLE}}</h3>
                <div v-html="selectedView.creditsText" class="alpheios-inflections__credits-text"></div>
            </div>
        </div>
        <div v-else class="alpheios-inflections__placeholder">
            {{messages.PLACEHOLDER_INFLECT_UNAVAILABLE}}
        </div>
    </div>
</template>
<script>
  // Subcomponents
  import WidePrerenderedTable from './inflections-table-prerendered.vue'
  import WideTableVue from './inflections-table-wide.vue'
  import WideSubTables from './inflections-subtables-wide.vue'
  import WideSuppTable from './inflections-supp-table-wide.vue'
  import StandardForms from './inflections-standard-forms.vue'
  import WordForms from './wordforms.vue'

  import Tooltip from './tooltip.vue'

  // Other dependencies
  import { Constants } from 'alpheios-data-models'
  import { ViewSetFactory, L10n} from 'alpheios-inflection-tables'

  import Vue from 'vue/dist/vue'

  export default {
    name: 'Inflections',
    components: {
      prerenderedTableWide: WidePrerenderedTable,
      mainTableWideVue: WideTableVue,
      subTablesWide: WideSubTables,
      suppTablesWide: WideSuppTable,
      standardForms: StandardForms,
      alphTooltip: Tooltip,
      wordForms: WordForms
    },

    props: {
      // Whether inflections component is enabled or not
      inflectionsEnabled: {
        type: Boolean,
        default: false,
        required: false
      },

      data: {
        type: Object,
        required: true
      },
      locale: {
        type: String,
        required: true
      },
      messages: {
        type: Object,
        required: true
      },
      /*
      Inflections component is in a wait state while homonym data is retrieved from a morph analyzer and
      inflections data is calculated
      */
      waitState: {
        type: Boolean,
        default: false,
        required: false
      }
    },

    data: function () {
      return {
        languageID: undefined,
        events: {
          EVENT: 'event',
          DATA_UPDATE: 'dataUpdate'
        },
        hasInflectionData: false,
        partsOfSpeech: [],
        selectedPartOfSpeech: [],
        views: [],
        selectedViewName: '',
        selectedView: {},
        renderedView: {},
        elementIDs: {
          panelInner: 'alpheios-panel-inner',
          footnotes: 'alph-inflection-footnotes'
        },
        htmlElements: {
          content: undefined,
        },
        buttons: {
          hideEmptyCols: {
            contentHidden: true,
            text: '',
            shownText: this.messages.LABEL_INFLECT_HIDEEMPTY,
            hiddenText: this.messages.LABEL_INFLECT_SHOWEMPTY,

            tooltipText: '',
            shownTooltip: this.messages.TOOLTIP_INFLECT_HIDEEMPTY,
            hiddenTooltip: this.messages.TOOLTIP_INFLECT_SHOWEMPTY
          },
          hideNoSuffixGroups: {
            noSuffixMatchesHidden: true,
            text: '',
            shownText: this.messages.LABEL_INFLECT_COLLAPSE,
            hiddenText: this.messages.LABEL_INFLECT_SHOWFULL,

            tooltipText: '',
            shownTooltip: this.messages.TOOLTIP_INFLECT_COLLAPSE,
            hiddenTooltip: this.messages.TOOLTIP_INFLECT_SHOWFULL
          }
        },
        suppColors: ['rgb(208,255,254)', 'rgb(255,253,219)', 'rgb(228,255,222)', 'rgb(255,211,253)', 'rgb(255,231,211)'],
        canCollapse: false // Whether a selected view can be expanded or collapsed (it can't if has no suffix matches)
      }
    },

    computed: {
      isEnabled: function () {
        return this.data.inflectionViewSet && this.data.inflectionViewSet.enabled
      },
      hasMatchingViews: function () {
        return this.data.inflectionViewSet && this.data.inflectionViewSet.enabled && this.data.inflectionViewSet.hasMatchingViews
      },
      inflectionViewSet: function () {
        return this.data.inflectionViewSet
      },
      // Need this for a watcher that will monitor a parent container visibility state
      isVisible: function () {
        return this.data.visible
      },
      partOfSpeechSelector: {
        get: function () {
          return this.selectedPartOfSpeech
        },
        set: function (newValue) {
          this.selectedPartOfSpeech = newValue
          this.views = this.data.inflectionViewSet.getViews(this.selectedPartOfSpeech)
          this.selectedView = this.views[0]
          if (this.selectedView.isRenderable) {
            // Rendering is not required for component-enabled views
            this.selectedView.render()
            this.canCollapse = this.selectedView.canCollapse

            this.updateWidth()
          }
        }
      },
      viewSelector: {
        get: function () {
          return this.selectedView ? this.selectedView.id : ''
        },
        set: function (newValue) {
          this.selectedView = this.views.find(view => view.id === newValue)
          if (this.selectedView.isRenderable) {
            this.selectedView.render()
            this.canCollapse = this.selectedView.canCollapse
            this.updateWidth()
          }
        }
      },
      inflectionTable: function () {
        return this.selectedView.id
      },
      footnotes: function () {
        let footnotes = []
        if (this.selectedView && this.selectedView.footnotes) {
          footnotes = Array.from(this.selectedView.footnotes.values())
        }
        return footnotes
      },
      forms: function () {
        let forms = []
        if (this.selectedView && this.selectedView.forms) {
          forms = Array.from(this.selectedView.forms.values())
        }
        return forms
      },
      showExplanatoryHint: function () {
        return this.selectedView && this.selectedView.constructor && this.selectedView.constructor.name === 'GreekParadigmView'
      }
    },

    watch: {
      inflectionViewSet: function () {
        this.hasInflectionData = false
        if (this.data.inflectionViewSet) {
          this.languageID = this.data.inflectionViewSet.languageID
        }
        if (this.data.inflectionViewSet && this.data.inflectionViewSet.hasMatchingViews) {
          // Set colors for supplemental paradigm tables
          for (let view of this.data.inflectionViewSet.getViews()) {
            view.hlSuppParadigms = false
            if (view.hasSuppParadigms) {
              if (view.suppParadigms.length > 1) {
                // Highlight tables and links only if more than one linked table present
                view.hlSuppParadigms = true
                view.suppHlColors = new Map()
                let currentColorIdx = 0
                for (let paradigm of view.suppParadigms) {
                  view.suppHlColors.set(paradigm.paradigmID, this.suppColors[currentColorIdx])
                  currentColorIdx = (currentColorIdx + 1 < this.suppColors.length ) ? currentColorIdx + 1 : 0
                }
              }
            }
          }

          this.partsOfSpeech = this.data.inflectionViewSet.partsOfSpeech
          if (this.partsOfSpeech.length > 0) {
            this.selectedPartOfSpeech = this.partsOfSpeech[0]
            this.views = this.data.inflectionViewSet.getViews(this.selectedPartOfSpeech)
          } else {
            this.selectedPartOfSpeech = []
            this.views = []
          }

          if (this.views.length > 0) {
            this.hasInflectionData = true
            this.selectedView = this.views[0]
            if (this.selectedView.isRenderable) {
              // Rendering is not required for component-enabled views
              this.setDefaults()
              this.selectedView.render()
              this.canCollapse = this.selectedView.canCollapse
            }
          } else {
            this.selectedView = ''
          }
        }
        // Notify parent of inflection data change
        this.$emit(this.events.EVENT, this.events.DATA_UPDATE, this.data.inflectionViewSet)
      },

      /*
      An inflection component needs to notify its parent of how wide an inflection table content is. Parent will
      use this information to adjust a width of a container that displays an inflection component. However, a width
      of an inflection table within an invisible parent container will always be zero. Because of that, we can determine
      an inflection table width and notify a parent component only when a parent container is visible.
      A parent component will notify us of that by setting a `visible` property. A change of that property state
      will be monitored here with the help of a `isVisible` computed property. Computed property alone will not work
      as it won't be used by anything and thus will not be calculated by Vue.
       */
      isVisible: function (visibility) {
        if (visibility && this.htmlElements.content) {
          // If container is become visible, update parent with its width
          this.updateWidth()
        }
      },
      locale: function () {
        if (this.data.inflectionData) {
          this.data.inflectionViewSet.setLocale(this.locale)
          if (this.selectedView.isRenderable) {
            // Rendering is not required for component-enabled views
            this.selectedView.render() // Re-render inflections for a different locale
          }
        }
      }
    },

    methods: {
      updateWidth: function () {
        Vue.nextTick(() => {
          this.$emit('contentwidth', this.htmlElements.content.offsetWidth + 1)
        })
      },

      clearInflections: function () {
        // for (let element of Object.values(this.htmlElements)) { element.innerHTML = '' }
        this.hasInflectionData = false
        return this
      },

      setDefaults () {
        this.buttons.hideEmptyCols.contentHidden = true
        this.buttons.hideEmptyCols.text = this.buttons.hideEmptyCols.hiddenText
        this.buttons.hideEmptyCols.tooltipText = this.buttons.hideEmptyCols.hiddenTooltip

        this.buttons.hideNoSuffixGroups.contentHidden = true
        this.buttons.hideNoSuffixGroups.text = this.buttons.hideNoSuffixGroups.hiddenText
        this.buttons.hideNoSuffixGroups.tooltipText = this.buttons.hideNoSuffixGroups.hiddenTooltip
        return this
      },

      hideEmptyColsClick () {
        this.buttons.hideEmptyCols.contentHidden = !this.buttons.hideEmptyCols.contentHidden
        this.selectedView.emptyColumnsHidden(this.buttons.hideEmptyCols.contentHidden)
        if (this.buttons.hideEmptyCols.contentHidden) {
          this.buttons.hideEmptyCols.text = this.buttons.hideEmptyCols.hiddenText
          this.buttons.hideEmptyCols.tooltipText = this.buttons.hideEmptyCols.hiddenTooltip
        } else {
          this.buttons.hideEmptyCols.text = this.buttons.hideEmptyCols.shownText
          this.buttons.hideEmptyCols.tooltipText = this.buttons.hideEmptyCols.shownTooltip
        }
        this.updateWidth()
      },

      hideNoSuffixGroupsClick () {
        this.buttons.hideNoSuffixGroups.noSuffixMatchesHidden = !this.buttons.hideNoSuffixGroups.noSuffixMatchesHidden
        this.selectedView.noSuffixMatchesGroupsHidden(this.buttons.hideNoSuffixGroups.noSuffixMatchesHidden)
        if (this.buttons.hideNoSuffixGroups.noSuffixMatchesHidden) {
          this.buttons.hideNoSuffixGroups.text = this.buttons.hideNoSuffixGroups.hiddenText
          this.buttons.hideNoSuffixGroups.tooltipText = this.buttons.hideNoSuffixGroups.hiddenTooltip
        } else {
          this.buttons.hideNoSuffixGroups.text = this.buttons.hideNoSuffixGroups.shownText
          this.buttons.hideNoSuffixGroups.tooltipText = this.buttons.hideNoSuffixGroups.shownTooltip
        }
        this.updateWidth()
      },

      navigate (reflink) {
        let panel = document.querySelector(`#${this.elementIDs.panelInner}`)
        if (!panel) {
          console.warn(`Cannot find panel's inner element #${this.elementIDs.panelInner}. Scroll cancelled`)
        }
        if (reflink === 'top') {
          // Navigate to the top of the page
          panel.scrollTop = 0
        } else {
          // Navigate to one of the supplemental tables
          const paddingTop = 20 // A margin between an element and a top of a visible area, in pixels
          let el = document.querySelector(`#${reflink}`)
          if (el) {
            const offset = Math.round(el.offsetTop)
            panel.scrollTop = offset - paddingTop
          } else {
            console.warn(`Cannot find #${reflink} element. Navigation cancelled`)
          }
        }
      }
    },

    mounted: function () {
      if (typeof this.$el.querySelector === 'function') {
        this.htmlElements.content = this.$el
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-panel__tab-panel.alpheios-panel__tab__inflections {
        padding: 0 0 20px;
    }

    .alpheios-inflections__placeholder {
        padding: 0 20px;
    }

    .alpheios-inflections__content {
        padding: 0 20px;
    }

    h3.alpheios-inflections__title {
        line-height: 1;
        margin: 0 0 0.6rem 0;
        font-weight: 700;
        text-align: center;
    }

    h4.alpheios-inflections__additional_title {
      line-height: 1.6;
      font-weight: bold;
      text-align: left;
      margin: 0 0 0.6rem 0;
    }
    .#{$alpheios-uikit-namespace} .uk-select.alpheios-inflections__view-selector {
        height: auto !important;
        max-width: 220px;
        font-size: .625rem;
        line-height: 1.6;
    }

    .auk .uk-button-small.alpheios-inflections__control-btn {
        line-height: 1.6;
        font-size: .625rem;
    }

    .alpheios-inflections__actions {
        display:flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 0.6rem;
        margin-top: 10px;
    }

    .alpheios-inflections__form {
        font-weight: bold;
        line-height: 1.2;
        justify-content: flex-start;
    }

    .alpheios-inflections__placeholder {
        text-align: center;
    }

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

    .infl-cell__conj-stem {
        text-transform: none;
    }

    .infl-suff {
        cursor: pointer;
    }

    .infl-suff.infl-suff--suffix-match {
        background-color: rgb(188, 230, 240);
    }

    .infl-suff--full-feature-match {
        background-color: lightgray;
    }

    .infl-suff.infl-suff--suffix-match.infl-suff--full-feature-match {
        background-color: $alpheios-highlight-color;
        font-weight: 700;
    }

    .row-title-cell {
        text-transform: capitalize;
    }

    // endregion Tables

    // region Footnotes
    .alpheios-inflections__footnotes {
        display: none;
        grid-template-columns: 1.6rem 1fr;
        font-size: 0.875rem;
        line-height: 1.2;
        margin-bottom: 2rem;

        dt {
            font-weight: 700;
        }
    }

    [data-footnote] {
        position: relative;
        padding-left: 2px;
        vertical-align: super;
    }

    .alpheios-inflections__footnote-popup {
        display: grid;
        grid-template-columns: 20px 1fr;
        grid-row-gap: 2px;
        background: #FFF;
        color: $alpheios-headers-color;
        position: absolute;
        padding: 30px 15px 15px;
        left: 0;
        bottom: 20px;
        transform: translateX(-50%);
        z-index: 10;
        min-width: 200px;
        border: 1px solid $alpheios-toolbar-color;
    }

    .alpheios-inflections__footnote-popup.hidden {
        display: none;
    }

    .alpheios-inflections__footnote-popup-title {
        font-weight: 700;
        position: absolute;
        text-transform: uppercase;
        left: 15px;
        top: 7px;
    }

    .alpheios-inflections__footnote-popup-close-btn {
        position: absolute;
        right: 5px;
        top: 5px;
        display: block;
        width: 20px;
        height: 20px;
        margin: 0;
        cursor: pointer;
        fill: $alpheios-toolbar-color;
        stroke: $alpheios-toolbar-color;
    }

    .alpheios-inflections__footnote-popup-close-btn:hover,
    .alpheios-inflections__footnote-popup-close-btn:active {
        fill: $alpheios-link-hover-color;
        stroke: $alpheios-link-hover-color;
    }

    .alpheios-inflections__credits-cont {
        margin-bottom: 10px;
    }

    h3.alpheios-inflections__credits-title {
        font-size: $alpheios-base-font-size;
        font-weight: 700;
        color: $alpheios-toolbar-color;
        margin-bottom: 0;
    }

    .alpheios-inflections__credits-text {
        font-size: 0.75*$alpheios-base-font-size;
        font-weight: normal;
        color: $alpheios-toolbar-active-color;
        font-style: italic;
        padding: 5px;
    }

    .alpheios-inflections__paradigms-expl {
        font-size: 0.75*$alpheios-base-font-size;
        font-weight: normal;
        color: $alpheios-toolbar-active-color;
        font-style: italic;
        margin: 20px 0 10px;
    }

    .alpheios-inflections__paradigms-expl span {
        color: $alpheios-toolbar-color;
        font-weight: 700;
    }

    .alpheios-inflections__supp-tables {
        margin-top: 4rem;
    }
    // endregion Footnotes

    // region Wait animation
    $inflections-anim-min-width: 300px;
    .alpheios-inflections__progress-wrapper {
        height: 1.2rem;
        margin: 0 1rem 2rem;
        font-size: 0.875rem;
    }

    .alpheios-inflections__progress-border {
        border: 2px solid $alpheios-icon-color;
        min-width: $inflections-anim-min-width;
        height: 100%;
        padding: 2px;
    }

    .alpheios-inflections__progress-whitespace {
        overflow: hidden;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }

    .alpheios-inflections__progress-line {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: $alpheios-icon-color;
        animation: cssload-slide 5.75s steps(40) infinite;
    }

    .alpheios-inflections__progress-whitespace div.alpheios-inflections__progress-text,
    .alpheios-inflections__progress-text {
        text-transform: uppercase;
        color: $alpheios-copy-color;
        position: absolute;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: $inflections-anim-min-width;
        font-size: 13px;
        top: 3px;
    }

    @keyframes cssload-slide {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }

    @-o-keyframes cssload-slide {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }

    @-ms-keyframes cssload-slide {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }

    @-webkit-keyframes cssload-slide {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }

    @-moz-keyframes cssload-slide {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
    // endregion Wait animation
</style>
