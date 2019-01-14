<template>
  <div>
    <div class="alpheios-wordlist" v-if="!showContext">
        <div class="alpheios-wordlist-language" v-for="(languageCode, langIndex) in languagesList" v-bind:key="langIndex">
          <word-language-panel 
            :wordlist = "wordLists[languageCode]" 
            :messages = "l10n.messages" 
            :updated = "updated"
            @showContexts = "showContexts"
            ></word-language-panel>
        </div>
    </div>
    <div class="alpheios-wordlist-contexts" v-if="showContext">
      <word-context-panel 
        :worditem = "showContextWordItem"
        :messages = "l10n.messages"
      ></word-context-panel>       
    </div>
  </div>
</template>
<script>
  import L10n from '@/lib/l10n/l10n.js'
  import Locales from '@/locales/locales.js'
  import enUS from '@/locales/en-us/messages.json'
  import enGB from '@/locales/en-gb/messages.json'

  import WordLanguagePanel from '@/vue-components/word-language-panel.vue'
  import WordContextPanel from '@/vue-components/word-context-panel.vue'

  export default {
    name: 'WordListPanel',
    components: {
      wordLanguagePanel: WordLanguagePanel,
      wordContextPanel: WordContextPanel
    },
    props: {
      wordlistC: {
        type: Object,
        required: true
      },
      updated: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        showContextWordItem: null
      }
    },
    computed: {
      languagesList () {
        this.showContextWordItem = null
        return this.updated && Object.keys(this.wordLists).length > 0 ? Object.keys(this.wordLists) : []
      },
      l10n () {
        return new L10n()
          .addMessages(enUS, Locales.en_US)
          .addMessages(enGB, Locales.en_GB)
          .setLocale(Locales.en_US)
      },
      wordLists () {
        return this.updated ? this.wordlistC.wordLists : []
      },
      showContext () {
        return Boolean(this.showContextWordItem)
      }
    },
    methods: {
      showContexts (wordItemStorageID, wordListLanguageCode) {
        console.info('******************showContext word-list-panel1', wordItemStorageID, wordListLanguageCode)
        console.info('******************showContext word-list-panel2', this.wordLists[wordListLanguageCode], this.wordLists[wordListLanguageCode][wordItemStorageID])
        this.showContextWordItem = this.wordLists[wordListLanguageCode].items[wordItemStorageID]
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-wordlist-language {
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    .alpheios-wordlist-language__title {
        font-weight: bold;
        font-size: 110%;
        display: inline-block;
    }

    .alpheios-wordlist-language__worditem.active {
      color: $alpheios-link-hover-color;
    }
</style>