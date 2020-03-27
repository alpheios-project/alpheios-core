<template>
  <div class="alpheios-ib">

    <div class="alpheios-ib__lang-cont">
      <div
          :class="{open: !collapsed[constants.LANG_LATIN.toString()]}"
          @click="collapseLanguage(constants.LANG_LATIN)"
          class="alpheios-ib__title alpheios-clickable"
      >
        Latin Inflection Browser
        <span v-show="collapsed[constants.LANG_LATIN.toString()]">[+]</span>
        <span v-show="!collapsed[constants.LANG_LATIN.toString()]">[-]</span>
      </div>
      <div v-show="!collapsed[constants.LANG_LATIN.toString()]">
        <div class="alpheios-ib__pofs-title">Nouns</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('lat', 'noun')" 
        />
        <div class="alpheios-ib__pofs-title">Adjectives</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('lat', 'adjective')" 
        />

        <div class="alpheios-ib__pofs-title">Verbs</div>
        <div class="alpheios-ib__pofs-title-l2">Regular verbs</div>
        <div class="alpheios-ib__pofs-title-l3">Sorted by...</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('lat', 'verb')" 
        />

        <div class="alpheios-ib__pofs-title-l3">Other Forms</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('lat', 'other verb forms')" 
        />

        <div class="alpheios-ib__pofs-title-l2">Irregular verbs</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('lat', 'irregular verbs')" 
        />
      </div>
    </div>

    <div class="alpheios-ib__lang-cont">
      <div
          :class="{open: !collapsed[constants.LANG_GREEK.toString()]}"
          @click="collapseLanguage(constants.LANG_GREEK)"
          class="alpheios-ib__title alpheios-clickable"
      >
        Greek Inflection Browser
        <span v-show="collapsed[constants.LANG_GREEK.toString()]">[+]</span>
        <span v-show="!collapsed[constants.LANG_GREEK.toString()]">[-]</span>
      </div>
      <div v-show="!collapsed[constants.LANG_GREEK.toString()]">
        <div class="alpheios-ib__pofs-title">Nouns</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'noun')" 
        />

        <div class="alpheios-ib__pofs-title">Adjectives</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'adjective')" 
        />

        <div class="alpheios-ib__pofs-title">Pronouns</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'pronoun')" 
        />

        <div class="alpheios-ib__pofs-title">Articles</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'article')" 
        />

        <div class="alpheios-ib__pofs-title">Numerals</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'numeral')" 
        />

        <div class="alpheios-ib__pofs-title">Verb Paradigms</div>
        <div class="alpheios-ib__pofs-title-l2">ω Verbs</div>
        <div class="alpheios-ib__pofs-title-l3">Regular ω Verbs</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'regular verbs')" 
        />

        <div class="alpheios-ib__pofs-title-l3">Athematic Perfects</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'athematic perfects')" 
        />

        <div class="alpheios-ib__pofs-title-l3">Present System of Contract Verbs (-εω, -αω, -οω)</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'contract verbs')" 
        />

        <div class="alpheios-ib__pofs-title-l2">μι Verbs</div>
        <div class="alpheios-ib__pofs-title-l3">τίθημι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'mi verbs - tithimi')" 
        />

        <div class="alpheios-ib__pofs-title-l3">ἵημι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'mi verbs - iimi')" 
        />

        <div class="alpheios-ib__pofs-title-l3">δίδωμι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'mi verbs - didomi')" 
        />

        <div class="alpheios-ib__pofs-title-l3">ἵστημι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'mi verbs - istimi')" 
        />

        <div class="alpheios-ib__pofs-title-l3">Other</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'mi verbs - other')" 
        />

        <div class="alpheios-ib__pofs-title-l2">Participles</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="table"
            v-for = "(table, index) in getTables('grc', 'participle')" 
        />
      </div>
    </div>

  </div>

</template>
<script>
import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'

import WideTable from '@/vue/components/inflections/inflection-browser-table.vue'
import InflTablesList from '@/vue/components/inflections/inflections-browser-tables.json'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'InflectionStandardForms',
  components: {
    wideTable: WideTable
  },
  storeModules: ['app'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  lexrqStartedUnwatch: null,

  data: function () {
    return {
      // As we cannot reference `Constants` in template during rendering we have to reassign them this way
      constants: {
        LANG_LATIN: Constants.LANG_LATIN,
        LANG_GREEK: Constants.LANG_GREEK
      },
      views: new Map(),
      collapsed: {
        // Vue.js currently cannot track Maps or Symbol props so we have to do it this way:
        [Constants.LANG_LATIN.toString()]: true,
        [Constants.LANG_GREEK.toString()]: true
      },
      htmlElements: {
        content: undefined
      },
      languageId: this.$store.state.app.currentLanguageID,
      inflBrowserTablesCollapsed: true
    }
  },
  watch: {
    languageId: function (newValue, oldValue) {
      if (oldValue) {
        this.collapsed[oldValue.toString()] = true
      }
      if (newValue) {
        this.languageId = newValue
        this.collapsed[newValue.toString()] = false
      }
    }
  },

  methods: {
    collapseLanguage: function (languageID) {
      const language = languageID.toString()
      for (const lang of Object.keys(this.collapsed)) {
        this.collapsed[lang] = (lang === language) ? !this.collapsed[language] : true
      }
    },
    getTables (langCode, partOfSpeech) {
      const langID = LMF.getLanguageIdFromCode(langCode)
      const inflTablesData = InflTablesList[langCode][partOfSpeech]

      return inflTablesData.map(inflD => Object.assign(inflD, { langID }))
    }
  },

  mounted: function () {
    if (this.languageId) {
      // Set a group that will be opened initially
      this.collapsed[this.languageId.toString()] = false
    }
    if (typeof this.$el.querySelector === 'function') {
      this.htmlElements.content = this.$el
    }

    this.$options.lexrqStartedUnwatch = this.$store.watch((state) => state.app.lexicalRequest.startTime, () => {
      this.inflBrowserTablesCollapsed = true
    })
  },

  beforeDestroy () {
    // Teardown the watch function
    this.$options.lexrqStartedUnwatch()
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-ib {
    margin-bottom: textsize(20px);

    .alpheios-inflections__title {
      font-family: var(--alpheios-sans-font-face);
      font-size: var(--alpheios-base-text-size);
      margin: 0 0 textsize(20px) textsize(48px);
    }
  }

  .alpheios-ib__title {
    color: var(--alpheios-inflect-title-color);
    font-size: textsize(24px);
    font-family: var(--alpheios-serif-font-face);
    font-weight: 700;
    margin-bottom: textsize(20px);
    // To have the border under the text only
    display: inline-block;

    &.open {
      border-bottom: textsize(2px) solid var(--alpheios-inflect-title-color);
    }
  }

  .alpheios-ib__pofs-title {
    font-weight: 700;
    font-size: textsize(22px);
    margin-bottom: textsize(10px);
  }

  .alpheios-ib__pofs-title-l2 {
    font-weight: 700;
    margin-left: textsize(16px);
    margin-bottom: textsize(20px);
  }

  .alpheios-ib__pofs-title-l3 {
    font-weight: 700;
    margin-left: textsize(32px);
    margin-bottom: textsize(20px);
  }

</style>
