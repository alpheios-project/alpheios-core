<template>
    <div class="alpheios-wordlist-download-confirmation alpheios-notification-area__notification alpheios-notification-area__notification--important">
        <div class="alpheios-notification-area__msg">{{ l10n.getText('WORDLIST_DOWNLOAD_NOTICE') }}</div>

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

            <div class="alpheios-wordlist-download-amount" data-alpheios-ignore="all" v-show="downloadForFlashcards">
              <setting
                  class="alpheios-feature-options__item"
                  :data="featureOptions.items.wordlistMaxFlashcardExport"
                  @change="featureOptionChanged"
              >
              </setting>
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
  import Download from '@/lib/utility/download.js'
  import CloseIcon from '@/images/inline-icons/x-close.svg'
  import Setting from '@/vue/components/setting.vue'
  import Options from '@/lib/options/options.js'

  export default {
    name: 'DownloadConfirmation',
    inject: ['l10n', 'app', 'settings'],
    components: {
      closeIcon: CloseIcon,
      setting: Setting
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
        downloadForFlashcards: false
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
        return this.settings.getFeatureOptions()
      },
      maxFlashCardItems () {
        return this.settings.getFeatureOptions().items.wordlistMaxFlashcardExport.currentValue
      }
    },
    methods: {
      prepareDownloadListFull () {
        const exportFields = [ 'targetWord', 'languageCode', 'important', 'currentSession', 'lemmasList', 'context' ]
        let source = this.downloadWithFilter ? this.filteredWordItems : this.allWordItems

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
            exportFields, wordlistData, delimiter: ';'
        }
      },

      prepareDownloadListFlashcards () {
        const exportFields = [ 'word', 'definition']
        let source = this.downloadWithFilter ? this.filteredWordItems : this.allWordItems
        
        console.info('this.maxFlashCardItems - before ', this.maxFlashCardItems, source.length)
        source = source.slice(0, this.maxFlashCardItems)
        console.info('this.maxFlashCardItems - after', this.maxFlashCardItems, source.length)

        let wordlistData = []
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
            exportFields, wordlistData, delimiter: '\t'
        }
      },

      downloadList () {
        let dataForDownload

        if (this.downloadForFlashcards) {
          dataForDownload = this.prepareDownloadListFlashcards()
        } else {
          dataForDownload = this.prepareDownloadListFull()
        }

        const result = Download.collectionToCSV(dataForDownload.delimiter, dataForDownload.exportFields)(dataForDownload.wordlistData)
        Download.downloadBlob(result, `wordlist-${this.languageCode}.csv`)
        this.$emit('changeShowDownloadBox', false)
      },
      cancelDownloadList () {
        this.$emit('changeShowDownloadBox', false)
      },
      featureOptionChanged: function (name, value) {
        let keyinfo = Options.parseKey(name)
        this.app.featureOptionChange(keyinfo.name, value)
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

    .alpheios-wordlist-download-confirmation__buttons {
        min-width: 115px;
    }

    .alpheios-wordlist-download-amount {
      .alpheios-feature-options__item {
        display: block;
        flex: none;
        padding-top: 10px;

        label, 
        input.alpheios-input.alpheios-setting__control {
          display: block;
          width: 100%;
        }

        label {
          font-size: 90%;
        }
      }
    }
</style>