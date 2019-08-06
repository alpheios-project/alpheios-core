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
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('WORDLIST_TOOLTIP_DOWNLOAD', { lang: languageCode })">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-download" @click="showDownloadList()">
                <download-icon></download-icon>
            </div>
            </alph-tooltip>
        </div>

        <!-- delete all confirmation -->
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
        <!-- end delete all confirmation -->

        <!-- download confirmation -->
        <div class="alpheios-wordlist-download-confirmation alpheios-notification-area__notification alpheios-notification-area__notification--important"
             v-show="showDownloadBox">
          <div class="alpheios-notification-area__msg">{{ l10n.getText('WORDLIST_DOWNLOAD_NOTICE') }}</div>

          <div class="alpheios-wordlist-download-confirmation__buttons alpheios-notification-area__control">
            <alph-tooltip :tooltipText="l10n.getText('WORDLIST_TOOLTIP_DOWNLOAD', { lang: languageCode })" tooltipDirection="bottom-wide">
              <button @click="downloadList()" class="alpheios-button-primary">
                {{ l10n.getText('WORDLIST_DOWNLOAD_BUTTON') }}
              </button>
            </alph-tooltip>
          </div>
          <div
              class="alpheios-notification-area__close-btn"
              @click="cancelDownloadList()"
          >
            <close-icon/>
          </div>
        </div>
        <!-- end download confirmation -->

        <div class="alpheios-wordlist-filter-panel">
          <word-filter-panel
            @changedFilterBy="changedFilterBy"
            @clearClickedLemma = "clearClickedLemma"
            :clickedLemma = "clickedLemma"
            :wordExactForms = "wordExactForms"
            :wordLemmaForms = "wordLemmaForms"
            :clearFilters = "clearFilters"
            v-show = "hasSeveralItems"
          />
        </div>
        <div class="alpheios-wordlist-sorting-panel">
          <word-sorting-panel
            v-show = "hasSeveralItems"
            @changeSorting = "changeSorting"
          />
        </div>
        <div
            v-for="wordItem in wordItems"
            v-bind:key="wordItem.targetWord"
            :class="{ 'alpheios-lemma-clickable': !clickedLemma }">
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
import Tooltip from '@/vue/components/tooltip.vue'
import CheckIcon from '@/images/inline-icons/check.svg'
import DeleteIcon from '@/images/inline-icons/delete.svg'
import CloseIcon from '@/images/inline-icons/x-close.svg'
import DownloadIcon from '@/images/inline-icons/download.svg'
import WordItemPanel from '@/vue/components/word-list/word-item-panel.vue'
import WordFilterPanel from '@/vue/components/word-list/word-filter-panel.vue'
import WordSortingPanel from '@/vue/components/word-list/word-sorting-panel.vue'

import Download from '@/lib/utility/download.js'

export default {
  name: 'WordLanguagePanel',
  components: {
    closeIcon: CloseIcon,
    checkIcon: CheckIcon,
    deleteIcon: DeleteIcon,
    downloadIcon: DownloadIcon,
    wordItem: WordItemPanel,
    wordFilterPanel: WordFilterPanel,
    wordSortingPanel: WordSortingPanel,
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
      showDownloadBox: false,
      selectedFilterBy: null,
      textInput: null,
      clickedLemma: null,
      filterMethods: {
        'byCurrentSession': (wordItem) => wordItem.currentSession,
        'byImportant': (wordItem) => wordItem.important,
        'byExactForm': (wordItem) => wordItem.targetWord.toLowerCase() === this.textInput.toLowerCase(),
        'byLemma': (wordItem) => wordItem.lemmasList.split(', ').some(lemmaItem => lemmaItem.toLowerCase() === this.textInput.toLowerCase())
      },
      clearFilters: 0,
      sortingState: {
        'targetWord': null
      }
    }
  },
  computed: {
    hasSeveralItems () {
      return this.wordlist && this.wordlist.values && this.wordlist.values.length > 1
    },
    wordlist () {
      this.clearFilters = this.clearFilters + 1
      this.changedFilterBy(null, null)
      return this.$store.state.app.wordListUpdateTime && this.reloadList ? this.app.getWordList(this.languageCode) : { items: {}, values: {} }
    },
    wordItems () {
      if (this.$store.state.app.wordListUpdateTime && this.reloadList) {
        if (!this.selectedFilterBy) {
          let result = this.wordlist.values
          this.applySorting(result)
          return result
        }
        if (this.filterMethods[this.selectedFilterBy]) {
          let result = this.wordlist.values.filter(this.filterMethods[this.selectedFilterBy])
          this.applySorting(result)
          return result

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
    showDownloadList () {
      this.showDownloadBox = true
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
    cancelDownloadList () {
      this.showDownloadBox = false
    },
    showContexts (targetWord) {
      this.$emit('showContexts', targetWord, this.languageCode)
    },
    changedFilterBy (selectedFilterBy, textInput) {
      this.selectedFilterBy = selectedFilterBy
      this.textInput = textInput
    },
    setLemmaFilterByClick (lemma) {
      if (!this.clickedLemma && lemma) {
        this.clickedLemma = lemma
      }
    },
    clearClickedLemma () {
      this.clickedLemma = null
    },
    changeSorting (part, type) {
      this.sortingState[part] = type
      this.reloadList = this.reloadList + 1
    },
    applySorting (items) {
      let part = 'targetWord'
      return items.sort( (item1, item2) => {
        let compared = item1[part].localeCompare(item2[part],this.languageCode,{sensitivity: 'accent'})
        if (this.sortingState[part] === 'asc') {
          return compared
        } else if (this.sortingState[part] === 'desc') {
          return -compared
        } else {
          return 0 // default state is unsorted
        }
      })
    },
    downloadList () {
      const exportFields = [ 'targetWord', 'languageCode', 'important', 'currentSession', 'lemmasList', 'context' ]
      const wordlistData = this.wordlist.values.map(wordItem => {
        return {
          targetWord: wordItem.targetWord,
          languageCode: wordItem.languageCode,
          important: wordItem.important,
          currentSession: wordItem.currentSession,
          lemmasList: wordItem.lemmasList,
          context: Object.keys(wordItem.formattedContext).join(' ')
        }
      })
      const result = Download.collectionToCSV(';', exportFields)(wordlistData)
      Download.downloadBlob(result, `wordlist-${this.languageCode}.csv`)
      this.showDownloadBox = false
    }
  }
}
</script>
<style lang="scss">
    @import "../../../styles/variables";

    .alpheios-wordlist-commands {
      border-bottom: 1px solid var(--alpheios-border-color);
    }

    $iconsize: 22px;

    .alpheios-wordlist-commands .alpheios-wordlist-commands__item {
      width: $iconsize;
      height: $iconsize;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      margin: 0 5px 10px;
      svg {
        width: $iconsize;
        height: $iconsize;
        display: inline-block;
        vertical-align: top;
        padding: 2px;
      }
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-no-important {
      fill: var(--alpheios-word-list-default-item-color);
      stroke: var(--alpheios-word-list-default-item-color);
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-all-important {
      fill: var(--alpheios-word-list-important-item-color);
      stroke: var(--alpheios-word-list-important-item-color);
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-remove-all,
    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-download {
      fill: var(--alpheios-word-list-delete-item-color);
      stroke: var(--alpheios-word-list-delete-item-color);
    }

    .alpheios-wordlist-delete-all-confirmation,
    .alpheios-wordlist-download-confirmation {
      margin-top: 10px;
    }
</style>
