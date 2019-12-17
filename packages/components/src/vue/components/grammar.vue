<template>
  <div class="alpheios-grammar">
    <div class="alpheios-grammar__titles" v-show="showTitles">
        <h1 class="alpheios-panel__title">{{ l10n.getText('LABEL_BROWSE_GRAMMAR') }}</h1>
      <div class="alpheios-grammar__block alpheios-clickable" 
          :class="{open: !languageItem.collapsed}"
           v-for="(languageItem, langIndex) in languageList" :key="langIndex">

           <p class="alpheios-grammar__block__title"
              @click="collapseLanguage(languageItem.languageCode)"
           >{{ languageItem.title }}
            <span v-show="languageItem.collapsed">[+]</span>
            <span v-show="!languageItem.collapsed">[-]</span>
           </p>
      </div>
    </div>
      <div class="alpheios-grammar__frame-progress" v-show="waitingForGrammar">
        <progress-bar :text="l10n.getText('PLACEHOLDER_GRAMMAR_DATA_LOADING')"></progress-bar>
      </div>
      <div class="alpheios-grammar__frame-cont" v-show="!languageList[currentLanguageCode].collapsed" v-if="currentUrl">
        <div class="alpheios-grammar__button--show-titles-block">
          <alph-tooltip :tooltipText="showHideTooltipValue" tooltipDirection="bottom-left">
            <button @click="showHideTitles"
              class="alpheios-button-primary alpheios-svg-index"><definitions-icon /></button>
          </alph-tooltip>
        </div>
        <div class="alpheios-grammar__button--back-block">
          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_BACK_TO_INDEX')" tooltipDirection="bottom-left">
            <button @click="returnToIndex"
              class="alpheios-button-primary alpheios-svg-index"><back-icon /></button>
          </alph-tooltip>
        </div>
        <iframe :src="currentUrl" class="alpheios-grammar__frame" scrolling="yes"></iframe>
      </div>
      <div class="alpheios-grammar__provider" v-show="!languageList[currentLanguageCode].collapsed"
           v-if="updatedGrammarData && currentLanguageCode && languageList[currentLanguageCode].provider">{{ languageList[currentLanguageCode].provider }}
      </div>
  </div>
</template>
<script>
/*
  There are the following Vuex Store properties that influence on the grammar tab:
    - $store.state.app.lexicalRequest.startTime
      each time lexical query is started, the all languages collapsed

    - $store.state.app.updatedGrammar
      each time we recieve new results from ResourceQUery we update languageList url and provider

    - $store.state.app.currentLanguageCode
      each time when the main currentLanguageCode is changed then we store it to local property and open this language 
      if no language is opened or if tab is not visible
*/
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'
import { Grammars } from 'alpheios-res-client'

import Vue from '@vue-runtime'

import BackIcon from '@/images/inline-icons/back.svg'
import DefinitionsIcon from '@/images/inline-icons/definitions.svg'
import Tooltip from './tooltip.vue'
import ProgressBar from './progress-bar.vue'

export default {
  name: 'Grammar',
  inject: ['l10n', 'app'],
  storeModules: ['app'],
  mixins: [DependencyCheck],
  components: {
    backIcon: BackIcon,
    definitionsIcon: DefinitionsIcon,
    alphTooltip: Tooltip,
    progressBar: ProgressBar
  },
  data () {
    return {
      centralLanguageCode: null,
      currentLanguageCode: null,
      currentUrl: null,
      waitingForGrammar: false,
      languageList: {
        lat: {
          languageID: Constants.LANG_LATIN,
          languageCode: 'lat',
          title: 'New Latin Grammar (Bennett)',
          url: null,
          provider: null,
          collapsed: true
        },
        grc: {
          languageID: Constants.LANG_GREEK,
          languageCode: 'grc',
          title: 'A Greek Grammar for Colleges (Smyth)',
          url: null,
          provider: null,
          collapsed: true
        }
      },
      showTitles: false
    }
  },
  mounted () {
    this.$options.lexrqStartedUnwatch = this.$store.watch((state) => state.app.lexicalRequest.startTime, () => {
      this.clearCurrentData()
      Object.values(this.languageList).forEach(langData => langData.collapsed = true)
    })
  },
  beforeDestroy () {
    // Teardown the watch function
    this.$options.lexrqStartedUnwatch()
  },
  computed: {
    currentLanguageID () {
      return this.languageList[this.currentLanguageCode].languageID
    },
    showHideTooltipValue () {
      if (this.showTitles) {
        return this.l10n.getText('TOOLTIP_HIDE_GRAMMAR_TITLES')
      }
      return this.l10n.getText('TOOLTIP_SHOW_GRAMMAR_TITLES')
    },
    // used for updating currentURL, languageList and collapse state based on store Vuex properties mutations
    updatedGrammarData () {
      if (this.$store.state.app.updatedGrammar) {
        this.waitingForGrammar = false
        this.updateLanguageList()
        if (this.currentLanguageCode && (!this.currentUrl || this.currentUrl !== this.languageList[this.currentLanguageCode].url) ) {
          this.currentUrl = this.languageList[this.currentLanguageCode].url
        }
      }
      
      if (this.checkIfUpdatedCentralLangCode()) {
        this.centralLanguageCode = this.$store.state.app.currentLanguageCode
        if (!this.currentLanguageCode || !this.$store.getters['ui/isActiveTab']('grammar')) {
          this.collapseLanguage(this.centralLanguageCode, false)
        }
      }
      return true
    }
  },
  methods: {
    // checks if centralLanguageCode should be updated with store.state.app.currentLanguageCode
    checkIfUpdatedCentralLangCode () {
      return this.$store.state.app.currentLanguageCode && (
        !this.centralLanguageCode || this.centralLanguageCode !== this.$store.state.app.currentLanguageCode || !this.$store.getters['ui/isActiveTab']('grammar')
      )
    },

    // updates languageList from app.grammarData'
    updateLanguageList () {
      Object.keys(this.languageList).forEach(langCode => {
        this.languageList[langCode].url = this.app.grammarData[langCode] ? this.app.grammarData[langCode].url : null
        this.languageList[langCode].provider = this.app.grammarData[langCode] ? this.app.grammarData[langCode].provider : null
      })
    },

    //collapse language by languageCode, if collapseValue is defined - then it sets as collpased value, otherwise it is toggled
    collapseLanguage (languageCode, collapseValue) {
      if (!this.languageList[languageCode]) {
        this.collapseOthers()
        return
      }
      this.languageList[languageCode].collapsed = typeof collapseValue !== 'undefined' ? collapseValue : !this.languageList[languageCode].collapsed

      if (!this.languageList[languageCode].collapsed) {
        this.updateCurrentData(languageCode)
        this.collapseOthers(languageCode)
        this.checkUrl()
      } else {
        this.clearCurrentData()
      }
    },

    //collapse all languages besides given languageCode
    collapseOthers (languageCode) {
      Object.keys(this.languageList).forEach(langCode => {
        if (langCode !== languageCode) {
          this.languageList[langCode].collapsed = true
        }
      })
    },

    //updates currentLanguageCode and currentUrl with given languageCode
    updateCurrentData (languageCode) {
      if (languageCode) {
        this.currentLanguageCode = languageCode
        this.currentUrl = this.languageList[languageCode].url
      }
    },

    //updates currentLanguageCode and currentUrl with null
    clearCurrentData () {
      this.currentLanguageCode = null
      this.currentUrl = null
    },

    //if url for currentLanguageCode is not defined then app.startResourceQuery would be executed and waitingForGrammar becomes true
    checkUrl () {
      if (!this.languageList[this.currentLanguageCode].url) {
        this.waitingForGrammar = true

        this.app.startResourceQuery({ type: 'table-of-contents', value: '', languageID: this.languageList[this.currentLanguageCode].languageID })
      }
    },
    returnToIndex () {
      this.app.restoreGrammarIndex(this.currentLanguageID)
    },
    showHideTitles () {
      this.showTitles = !this.showTitles
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";

  .alpheios-grammar__titles {
    padding: 40px 20px 20px;
  }
  p.alpheios-grammar__block__title {
    color: var(--alpheios-inflect-title-color);
    font-size: textsize(22px);
    font-family: var(--alpheios-serif-font-face);
    font-weight: 700;
    margin-bottom: textsize(20px);
    // To have the border under the text only
    display: inline-block;

    &.open {
      border-bottom: textsize(2px) solid var(--alpheios-inflect-title-color);
    }
  }

  .alpheios-grammar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .alpheios-grammar__frame-cont {
    flex: 1 1 auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    flex-direction: column;
  }

  .alpheios-grammar__frame {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
  }

  .alpheios-grammar__provider {
    flex: none;
    font-weight: normal;
    padding: 20px 25px 20px;
    font-size: 80%;
  }

  .alpheios-grammar__button--back-block,
  .alpheios-grammar__button--show-titles-block {
    position: absolute;
    top: 5px;
    right: 20px;
    z-index: 1000;
  }

  .alpheios-grammar__button--show-titles-block {
    right: 60px;
  }

  .alpheios-svg-index {
    display: block;
    padding: 4px;
    border-radius: 15px;
    opacity: 0.5;
    svg {
      width: 22px;
      height: auto;
      fill: var(--alpheios-btn-primary-font-color);
    }
  }

  .alpheios-grammar__button--back-block,
  .alpheios-grammar__button--show-titles-block {
    
    button {
      color: var(--alpheios-grammar-back-button-color);
      background-color: var(--alpheios-grammar-back-button-bg);
      border-color: var(--alpheios-grammar-back-button-border-color);
      
      &:hover {
        color: var(--alpheios-grammar-back-button-color-hover);
        background-color: var(--alpheios-grammar-back-button-bg-hover);
        border-color: var(--alpheios-grammar-back-button-border-color-hover);
      }
    }
  }
  .alpheios-grammar__frame-progress {
    padding: 20px;
  }
</style>
