<template>
  <div :id="elementIDs.content">
    <div class="alpheios-inflections__placeholder" v-if="$store.state.app.inflectionsWaitState">
      <div class="alpheios-inflections__progress-wrapper">
        <div class="alpheios-inflections__progress-border">
          <div class="alpheios-inflections__progress-whitespace">
            <div class="alpheios-inflections__progress-line"></div>
            <div class="alpheios-inflections__progress-text">
              {{ l10n.getMsg('PLACEHOLDER_INFLECT_IN_PROGRESS') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alpheios-inflections__content" v-else-if="inflectionsEnabled && $store.state.app.hasInflData">
      <word-forms
          :lexemes="selectedView.homonym.lexemes"
          :partOfSpeech="selectedView.constructor.mainPartOfSpeech"
          :targetWord="selectedView.homonym.targetWord"
          v-if="selectedView && selectedView.homonym">
      </word-forms>

      <div v-show="partsOfSpeech.length > 1">
        <label>{{ l10n.getMsg('LABEL_INFLECT_SELECT_POFS') }}</label>
        <select class="alpheios-select alpheios-inflections__view-selector alpheios-text__smallest"
                v-model="partOfSpeechSelector">
          <option v-for="partOfSpeech in partsOfSpeech">{{partOfSpeech}}</option>
        </select>
      </div>
      <div class="alpheios-inflections__actions">
        <div v-show="views.length > 1">
          <select class="alpheios-select alpheios-inflections__view-selector alpheios-text__smallest" v-model="viewSelector">
            <option :value="view.id" v-for="view in views">{{view.name}}</option>
          </select>
        </div>
      </div>

      <div class="alpheios-inflections__paradigms-expl"
           v-html="l10n.getMsg('INFLECTIONS_PARADIGMS_EXPLANATORY_HINT', { word: this.$store.state.app.targetWord })"
           v-show="showExplanatoryHint">
      </div>

      <div v-if="!selectedView.hasPrerenderedTables">
        <main-table-wide-vue :collapsed="false" :view="selectedView" @widthchange="updateWidth">
        </main-table-wide-vue>

        <template v-for="linkedView in selectedView.linkedViews" v-if="selectedView.linkedViews">
          <main-table-wide-vue :collapsed="false" :view="linkedView" @widthchange="updateWidth">
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
        <prerendered-table-wide :collapsed="false" :view="selectedView"></prerendered-table-wide>
        <sub-tables-wide :collapsed="false" :view="selectedView" @navigate="navigate"></sub-tables-wide>

        <div class="alpheios-inflections__supp-tables" v-show="selectedView.hasSuppParadigms">
          <template v-for="paradigm of selectedView.suppParadigms">
            <supp-tables-wide
                :bg-color="selectedView.hlSuppParadigms ? selectedView.suppHlColors.get(paradigm.paradigmID) : 'transparent'"
                :data="paradigm" @navigate="navigate"></supp-tables-wide>
          </template>
        </div>
      </template>

      <div class="alpheios-inflections__credits-cont" v-show="selectedView.hasCredits">
        <h3 class="alpheios-inflections__credits-title">{{ l10n.getMsg('INFLECTIONS_CREDITS_TITLE') }}</h3>
        <div class="alpheios-inflections__credits-text" v-html="selectedView.creditsText"></div>
      </div>
    </div>
    <div class="alpheios-inflections__placeholder" v-else>
      {{ l10n.getMsg('PLACEHOLDER_INFLECT_UNAVAILABLE') }}
    </div>
  </div>
</template>
<script>
import { ViewSetFactory } from 'alpheios-inflection-tables'
// Subcomponents
import WidePrerenderedTable from './inflections-table-prerendered.vue'
import WideTableVue from './inflections-table-wide.vue'
import WideSubTables from './inflections-subtables-wide.vue'
import WideSuppTable from './inflections-supp-table-wide.vue'
import WordForms from './wordforms.vue'

import Vue from 'vue/dist/vue'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Inflections',
  inject: ['app', 'l10n'],
  storeModules: ['app', 'ui'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    prerenderedTableWide: WidePrerenderedTable,
    mainTableWideVue: WideTableVue,
    subTablesWide: WideSubTables,
    suppTablesWide: WideSuppTable,
    wordForms: WordForms
  },
  visibilityUnwatch: null, // Will hold a function for removal of visibility watcher
  hasInflDataUnwatch: null,

  data: function () {
    return {
      languageID: undefined,
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
      canCollapse: false // Whether a selected view can be expanded or collapsed (it can't if has no suffix matches)
    }
  },

  computed: {
    inflectionsEnabled: function () {
      // TODO: This is a temporary solution. This should be handled in accord with our overall state handling policy
      return this.$store.state.app.preferredLanguageID
        ? ViewSetFactory.hasInflectionsEnabled(this.$store.state.app.preferredLanguageID)
        : false
    },
    partOfSpeechSelector: {
      get: function () {
        return this.selectedPartOfSpeech
      },
      set: function (newValue) {
        this.selectedPartOfSpeech = newValue
        this.views = this.app.getInflectionViews(this.selectedPartOfSpeech)
        if (this.views.length > 0) {
          this.selectedView = this.views[0].render()
        }
      }
    },
    viewSelector: {
      get: function () {
        return this.selectedView ? this.selectedView.id : ''
      },
      set: function (newValue) {
        this.selectedView = this.views.find(view => view.id === newValue).render()
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

  methods: {
    initViewSet () {
      this.hasInflectionData = false
      if (this.$store.state.app.hasInflData) {
        const inflectionsViewSet = this.app.getInflectionsViewSet()
        this.languageID = inflectionsViewSet.languageID
        if (inflectionsViewSet.hasMatchingViews) {
          this.partsOfSpeech = inflectionsViewSet.partsOfSpeech
          if (this.partsOfSpeech.length > 0) {
            this.selectedPartOfSpeech = this.partsOfSpeech[0]
            this.views = inflectionsViewSet.getViews(this.selectedPartOfSpeech)
          } else {
            this.selectedPartOfSpeech = []
            this.views = []
          }

          if (this.views.length > 0) {
            this.hasInflectionData = true
            this.selectedView = this.views[0].render()
          } else {
            this.selectedView = ''
          }
        }
      }
    },

    updateWidth: function () {
      if (typeof this.$el.querySelector === 'function') {
        /*
        An inflection component needs to notify its parent of how wide an inflection table content is. Parent will
        use this information to adjust a width of a container that displays an inflection component.
       */
        Vue.nextTick(() => {
          this.$emit('contentwidth', { width: this.$el.offsetWidth + 1, component: 'inflections' })
        })
      }
    },

    navigate (reflink) {
      let panel = document.querySelector(`#${this.elementIDs.panelInner}`)
      if (!panel) {
        console.warn(`Cannot find panel's inner element #${this.elementIDs.panelInner}. Scroll is cancelled`)
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
          console.warn(`Cannot find #${reflink} element. Navigation is cancelled`)
        }
      }
    }
  },

  mounted: function () {
    this.initViewSet()

    this.$options.visibilityUnwatch = this.$store.watch((state) => state.ui.activeTab, (tabName) => {
      if (tabName === 'inflections') {
        this.updateWidth()
        // Scroll to top if panel is reopened
        this.navigate('top')
      }
    })

    this.$options.hasInflDataUnwatch = this.$store.watch((state) => state.app.hasInflData, (value) => {
      if (value) {
        // Inflections data has become available
        this.initViewSet()
      }
    })
  },

  beforeDestroy: function () {
    this.$options.visibilityUnwatch()
    this.$options.hasInflDataUnwatch()
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-inflections__placeholder {
    padding: 0 20px;
    margin-bottom: 1rem;
  }

  h4.alpheios-inflections__additional_title {
    line-height: 1.6;
    font-weight: bold;
    text-align: left;
    margin: 0 0 0.6rem 0;
  }

  .alpheios-select.alpheios-inflections__view-selector {
    height: auto !important;
    max-width: 220px;
    line-height: 1.6;
  }

  .alpheios-inflections__actions {
    display: flex;
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
