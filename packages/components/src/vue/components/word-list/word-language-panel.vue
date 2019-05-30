<template>
    <div>
        <div class="alpheios-wordlist-commands">

            <div class="alpheios-wordlist-language__title">{{ languageName }}</div>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('WORDLIST_TOOLTIP_ALL_IMPORTANT')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-all-important" @click="makeAllImportant()">
                <check-icon></check-icon>
            </div>

            </alph-tooltip>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('WORDLIST_TOOLTIP_NO_IMPORTANT')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-no-important" @click="removeAllImportant()">
                <check-icon></check-icon>
            </div>
            </alph-tooltip>

            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('WORDLIST_TOOLTIP_REMOVE_ALL')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-remove-all" @click="showDeleteAll()">
                <delete-icon></delete-icon>
            </div>
            </alph-tooltip>
        </div>

        <div class="alpheios-wordlist-delete-all-confirmation alpheios-notification-area__notification alpheios-notification-area__notification--important" v-show="showDeleteAllBox">
          <div class="alpheios-notification-area__msg">{{l10n.getText('WORDLIST_DELETE_CONFIRM_MESSAGE')}}</div>

          <div class="alpheios-wordlist-delete-all-confirmation__buttons alpheios-notification-area__control">
            <alph-tooltip :tooltipText="l10n.getText('WORDLIST_TOOLTIP_REMOVE_ALL')" tooltipDirection="bottom-wide">
              <button @click="deleteAll()" class="alpheios-button-primary">
                {{ l10n.getText('WORDLIST_BUTTON_DELETE') }}
              </button>
            </alph-tooltip>
          </div>
          <div
              class="alpheios-notification-area__close-btn"
              @click="cancelDeleteAll()"
          >
            <close-icon/>
          </div>
        </div>

        <div class="alpheios-wordlist-filter-panel">
          <word-filter-panel 
            @changedFilterBy="changedFilterBy"
            @clearClickedLemma = "clearClickedLemma"
            :clickedLemma = "clickedLemma"
            :wordExactForms = "wordExactForms"
            :wordLemmaForms = "wordLemmaForms"
            :clearFilters = "clearFilters"
            v-show = "hasFilterPanel"
          ></word-filter-panel>
        </div>
        <div
                v-for="wordItem in wordItems"
                v-bind:key="wordItem.targetWord">
            <word-item
              :worditem="wordItem"
              @changeImportant = "changeImportant"
              @deleteItem = "deleteItem"
              @showContexts = "showContexts"
              @setLemmaFilterByClick = "setLemmaFilterByClick"
            ></word-item>
        </div>
    </div>
</template>
<script>
import Tooltip from '@comp-src/vue/components/tooltip.vue'
import CheckIcon from '@comp-src/images/inline-icons/check.svg'
import DeleteIcon from '@comp-src/images/inline-icons/delete.svg'
import CloseIcon from '@comp-src/images/inline-icons/x-close.svg'
import WordItemPanel from '@comp-src/vue/components/word-list/word-item-panel.vue'
import WordFilterPanel from '@comp-src/vue/components/word-list/word-filter-panel.vue'

export default {
  name: 'WordLanguagePanel',
  components: {
    closeIcon: CloseIcon,
    checkIcon: CheckIcon,
    deleteIcon: DeleteIcon,
    wordItem: WordItemPanel,
    wordFilterPanel: WordFilterPanel,
    alphTooltip: Tooltip
  },
  inject: ['l10n', 'app'],
  props: {
    languageCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      reloadList: 1,
      showDeleteAllBox: false,
      selectedFilterBy: null,
      textInput: null,
      clickedLemma: null,
      filterMethods: {
        'byCurrentSession': (wordItem) => wordItem.currentSession,
        'byImportant': (wordItem) => wordItem.important,
        'byExactForm': (wordItem) => wordItem.targetWord.toLowerCase() === this.textInput.toLowerCase(),
        'byLemma': (wordItem) => wordItem.lemmasList.split(', ').some(lemmaItem => lemmaItem.toLowerCase() === this.textInput.toLowerCase())
      }, 
      clearFilters: 0
    }
  },
  computed: {
    hasFilterPanel () {
      return this.wordlist && this.wordlist.values && this.wordlist.values.length > 1
    },
    wordlist () {
      this.clearFilters = this.clearFilters + 1
      this.changedFilterBy(null, null)
      return this.$store.state.app.wordListUpdateTime && this.reloadList ? this.app.getWordList(this.languageCode) : { items: {} }
    },
    wordItems () {
      if (this.$store.state.app.wordListUpdateTime && this.reloadList) {        
        if (!this.selectedFilterBy) {
          return this.wordlist.values
        }
        if (this.filterMethods[this.selectedFilterBy]) {
          return this.wordlist.values.filter(this.filterMethods[this.selectedFilterBy])
        } else {
          console.warn(`The current filter method - ${this.selectedFilterBy} - is not defined, that's why empty result is returned!`)
        }
      }      
      return []
    },
    wordExactForms () {
      let exactForms = this.wordlist.values.reduce((acc, wordItem) => {
          let exactForm = wordItem.targetWord.toLowerCase()
          if (!acc.includes(exactForm)) {
            acc.push(exactForm)
        }
        return acc
      }, [])
      return exactForms.sort()
    },
    wordLemmaForms () {
      let lemmaForms = this.wordlist.values.reduce((acc, wordItem) => {
        let currentLemmaForms = wordItem.lemmasList.split(', ')
        currentLemmaForms.forEach(lemmaForm => {
          if (!acc.includes(lemmaForm)) {
            acc.push(lemmaForm)
          }
        })
        return acc
      }, [])
      return lemmaForms.sort()
    },
    languageName () {
      // TODO with upcoming merge, this can be retrived from utility library
      // so just return the code for now
      return this.languageCode
    }
  },
  methods: {
    showDeleteAll () {
      this.showDeleteAllBox = true
    },
    async makeAllImportant () {
      await this.app.updateAllImportant(this.languageCode, true)
      this.$emit('eventChangeImportant')
    },
    async removeAllImportant () {
      await this.app.updateAllImportant(this.languageCode, false)
      this.$emit('eventChangeImportant')
    },
    async changeImportant (targetWord, important) {
      await this.app.updateWordItemImportant(this.languageCode, targetWord, important)
    },
    async deleteItem (targetWord) {
      await this.app.removeWordListItem(this.languageCode, targetWord)
      this.reloadList = this.reloadList + 1
    },
    async deleteAll () {
      await this.app.removeWordList(this.languageCode)
      this.reloadList = this.reloadList + 1
      this.showDeleteAllBox = false
    },
    cancelDeleteAll () {
      this.showDeleteAllBox = false
    },
    showContexts (targetWord) {
      this.$emit('showContexts', targetWord, this.languageCode)
    },
    changedFilterBy (selectedFilterBy, textInput) {
      this.selectedFilterBy = selectedFilterBy
      this.textInput = textInput
    },
    setLemmaFilterByClick (lemma) {
      this.clickedLemma = lemma
    },
    clearClickedLemma () {
      this.clickedLemma = null
    }
  }
}
</script>
<style lang="scss">
    @import "../../../styles/variables";

    .alpheios-wordlist-commands {
      border-bottom: 1px solid var(--alpheios-border-color);
    }
    .alpheios-wordlist-commands .alpheios-wordlist-commands__item {
      width: 15px;
      height: 15px;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      margin: 0 5px 10px;
      svg {
        width: 15px;
        height: 15px;
        display: inline-block;
        vertical-align: top;
      }
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-no-important {
      fill: var(--alpheios-link-color-on-dark);
      stroke: var(--alpheios-link-color-on-dark);
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-all-important {
      fill: var(--alpheios-color-light);
      stroke: var(--alpheios-color-light);
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-remove-all {
      fill: var(--alpheios-color-dark);
      stroke: var(--alpheios-color-dark);
    }

    .alpheios-wordlist-delete-all-confirmation {
      margin-top: 10px;
    }
</style>
