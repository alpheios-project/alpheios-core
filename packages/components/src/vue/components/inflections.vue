<template>
  <div :id="elementIDs.content">
    <div class="alpheios-inflections__content" v-if="$store.state.app.hasInflData">
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
        <main-table-wide-vue :collapsed="false" :view="selectedView">
        </main-table-wide-vue>

        <template v-if="selectedView.linkedViews">
          <main-table-wide-vue
              :collapsed="false"
              :view="linkedView"
              v-for="linkedView in selectedView.linkedViews"
              :key = "linkedView.id"
          />
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
  </div>
</template>
<script>
// Subcomponents
import WidePrerenderedTable from './inflections-table-prerendered.vue'
import WideTableVue from './inflections-table-wide.vue'
import WideSubTables from './inflections-subtables-wide.vue'
import WideSuppTable from './inflections-supp-table-wide.vue'
import WordForms from './wordforms.vue'
import Logger from '@/lib/log/logger'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Inflections',
  inject: ['app', 'l10n', 'settings'],
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
  logger: Logger.getInstance(),

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

    navigate (reflink) {
      let panel = document.querySelector(`#${this.elementIDs.panelInner}`)
      if (!panel) {
        this.$options.logger.warn(`Cannot find panel's inner element #${this.elementIDs.panelInner}. Scroll is cancelled`)
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
          this.$options.logger.warn(`Cannot find #${reflink} element. Navigation is cancelled`)
        }
      }
    }
  },

  mounted: function () {
    this.initViewSet()

    this.$options.visibilityUnwatch = this.$store.watch((state) => state.ui.activeTab, (tabName) => {
      if (tabName === 'inflections') {
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
    font-weight: 700;
    margin-bottom: 0;
  }

  .alpheios-inflections__credits-text {
    font-size: textsize(12px);
    font-weight: normal;
    font-style: italic;
    padding: 5px;
  }

  .alpheios-inflections__paradigms-expl {
    font-size: textsize(12px);
    font-weight: normal;
    font-style: italic;
    margin: 20px 0 10px;
  }

  .alpheios-inflections__paradigms-expl span {
    font-weight: 700;
  }

  .alpheios-inflections__supp-tables {
    margin-top: 4rem;
  }
  // endregion Footnotes
</style>
