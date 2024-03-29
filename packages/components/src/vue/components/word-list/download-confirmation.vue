<template>
    <div class="alpheios-wordlist-download-confirmation alpheios-notification-area__notification alpheios-notification-area__notification--important">
        <div class="alpheios-notification-area__msg">
          {{ l10n.getText('WORDLIST_DOWNLOAD_NOTICE') }}

          <div class="alpheios-wordlist-download-confirmation-loading" v-show="showProgress">
            <progress-bar :text="l10n.getText('PROGRESS_BAR_LEX_DATA_LOADING')"></progress-bar>
          </div>
        </div>

        <div class="alpheios-wordlist-download-confirmation__buttons alpheios-notification-area__control">
            <alph-tooltip :tooltipText="l10n.getText('WORDLIST_TOOLTIP_DOWNLOAD', { lang: languageCode })" tooltipDirection="bottom-wide">
                <button @click="downloadList()" class="alpheios-button-primary">
                {{ l10n.getText('WORDLIST_DOWNLOAD_BUTTON') }}
                </button>
            </alph-tooltip>
            <div class="alpheios-wordlist-download-with-filters alpheios-checkbox-block" data-alpheios-ignore="all">
                <input :id="downloadFilterId" type="checkbox" v-model="downloadWithFilter">
                <label :for="downloadFilterId">
                {{ l10n.getText('WORDLIST_DOWNLOAD_FILTERING_CHECK') }}
                </label>
            </div>
            <div class="alpheios-wordlist-download-for-flashcards alpheios-checkbox-block" data-alpheios-ignore="all">
                <input :id="downloadFlashcardsId" type="checkbox" v-model="downloadForFlashcards">
                <label :for="downloadFlashcardsId">
                {{ l10n.getText('WORDLIST_DOWNLOAD_FLASHCARDS_CHECK') }}
                </label>
            </div>

            <div class="alpheios-wordlist-download-amount" data-alpheios-ignore="all" v-show="downloadForFlashcards" v-if="featureOptions">
              <p>{{ this.maxFlashCardItemsNote }}</p>
            </div>
        </div>
        <div
            class="alpheios-notification-area__close-btn"
            @click="cancelDownloadList()"
        >
        <close-icon/>
        </div>
    </div>
</template>
<script>
import Download from '@comp/lib/utility/download.js'
import CloseIcon from '@comp/images/inline-icons/x-close.svg'
import Tooltip from '@comp/vue/components/tooltip.vue'
import TextSelector from '@comp/lib/selection/text-selector'
import ProgressBar from '@comp/vue/components/progress-bar.vue'
import { LanguageModelFactory } from 'alpheios-data-models'

export default {
  name: 'DownloadConfirmation',
  inject: ['l10n', 'app', 'settings', 'lexis'],
  storeModules: ['settings'],
  components: {
    closeIcon: CloseIcon,
    progressBar: ProgressBar,
    alphTooltip: Tooltip
  },
  props: {
    languageCode: {
      type: String,
      required: true
    },
    filteredWordItems: {
      type: Array,
      required: true
    },
    allWordItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      downloadWithFilter: false,
      downloadForFlashcards: false,
      showProgress: false,
      defaultWordlistMaxFlashcardExport: 25
    }
  },
  computed: {
    downloadFilterId () {
      return `alpheios-wordlist-download-with-filters-input-${this.languageCode}`
    },
    downloadFlashcardsId () {
      return `alpheios-wordlist-download-for-flashcards-input-${this.languageCode}`
    },
    featureOptions () {
      return this.$store.state.settings.featureResetCounter ? this.settings.getFeatureOptions() : null
    },
    maxFlashCardItems () {
      return this.$store.state.settings.featureResetCounter ? this.featureOptions.items.wordlistMaxFlashcardExport.currentValue : this.defaultWordlistMaxFlashcardExport
    },
    maxFlashCardItemsNote () {
      return this.maxFlashCardItems ? this.l10n.getText('WORDLIST_FLASHCARD_MAXDOWNLOAD_AMOUNT', { maxFlashCardItems: this.maxFlashCardItems }) : ''
    },
    languageID () {
      return LanguageModelFactory.getLanguageIdFromCode(this.languageCode)
    }
  },
  methods: {
    prepareDownloadListFull () {
      const exportFields = ['targetWord', 'languageCode', 'important', 'currentSession', 'lemmasList', 'context']
      const source = this.downloadWithFilter ? this.filteredWordItems : this.allWordItems

      const wordlistData = source.map(wordItem => {
        return {
          targetWord: wordItem.targetWord,
          languageCode: wordItem.languageCode,
          important: wordItem.important,
          currentSession: wordItem.currentSession,
          lemmasList: wordItem.lemmasList,
          context: Object.keys(wordItem.formattedContext).join(' ')
        }
      })

      return {
        exportFields,
        wordlistData,
        delimiter: ';',
        fileExtension: 'csv',
        withHeaders: true
      }
    },

    async prepareDownloadListFlashcards () {
      const exportFields = ['word', 'definition']
      let source = this.downloadWithFilter ? this.filteredWordItems : this.allWordItems

      source = source.slice(0, this.maxFlashCardItems)

      for (let i = 0; i < source.length; i++) {
        const wordItem = source[i]
        if (!wordItem.homonym || !wordItem.homonym.lexemes || !wordItem.homonym.hasShortDefs) {
          this.showProgress = true
          const textSelector = TextSelector.createObjectFromText(wordItem.targetWord, this.languageID)
          await this.lexis.lookupForWordlist(textSelector)
        }
      }

      this.showProgress = false
      const wordlistData = []
      source.forEach(wordItem => {
        if (wordItem.homonym && wordItem.homonym.lexemes) {
          wordItem.homonym.lexemes.forEach(lexeme => {
            if (lexeme.hasShortDefs) {
              lexeme.meaning.shortDefs.forEach(shortDef => {
                wordlistData.push({
                  word: `${wordItem.homonym.targetWord} (${lexeme.lemma.wordPrincipalParts})`,
                  definition: shortDef.text
                })
              })
            }
          })
        }
      })

      return {
        exportFields,
        wordlistData,
        delimiter: '\t',
        fileExtension: 'tsv',
        withHeaders: false
      }
    },

    async downloadList () {
      let dataForDownload

      if (this.downloadForFlashcards) {
        dataForDownload = await this.prepareDownloadListFlashcards()
      } else {
        dataForDownload = this.prepareDownloadListFull()
      }

      const result = Download.collectionToCSV(dataForDownload.delimiter, dataForDownload.exportFields, dataForDownload.withHeaders)(dataForDownload.wordlistData)
      Download.downloadBlob(result, `wordlist-${this.languageCode}.${dataForDownload.fileExtension}`)
      this.$emit('changeShowDownloadBox', false)
    },
    cancelDownloadList () {
      this.$emit('changeShowDownloadBox', false)
    }
  }
}
</script>
<style lang="scss">
    @import "../../../styles/variables";

    .alpheios-wordlist-download-confirmation {
      margin-top: 10px;
    }

    .alpheios-wordlist-download-with-filters {
        margin-top: 5px;
    }

    .alpheios-wordlist-download-with-filters label {
        color: var(--alpheios-usage-link-color)
    }

    .alpheios-wordlist-download-confirmation__buttons.alpheios-notification-area__control {
        min-width: 120px;
        display: inline-block;
    }

    .alpheios-wordlist-download-confirmation .alpheios-wordlist-download-amount p {
      font-size: 90%;
      margin: 10px 0 0;
    }

    .alpheios-wordlist-download-confirmation-loading {
      padding: 10px 20px 0 0;
      color: var(--alpheios-color-bright);

      .alpheios-popup-lexdataloading__progress-inner {
        border-color: var(--alpheios-color-vivid);
      }

      .alpheios-popup-lexdataloading__progress-line {
        background: var(--alpheios-color-vivid-hover);
      }

    }
</style>
