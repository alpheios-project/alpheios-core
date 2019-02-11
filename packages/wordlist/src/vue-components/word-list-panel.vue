<template>
  <div>
    <div class="alpheios-wordlist" v-if="!showContext">
        <div class="alpheios-wordlist-language" v-for="(languageCode, langIndex) in languagesList" v-bind:key="langIndex">
          <word-language
            :controller = "wordlistC"
            :languageCode = "languageCode"
            :updated = "updated"
            @showContexts = "showContexts"
            ></word-language>
        </div>
    </div>
    <div class="alpheios-wordlist-contexts" v-if="showContext">
      <word-context 
        :worditem = "showContextWordItem"
        @backToWordList = "backToWordList"
      ></word-context>     
    </div>
  </div>
</template>
<script>
  import WordLanguagePanel from '@/vue-components/word-language-panel.vue'
  import WordContextPanel from '@/vue-components/word-context-panel.vue'

  export default {
    name: 'WordListPanel',
    components: {
      wordLanguage: WordLanguagePanel,
      wordContext: WordContextPanel
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
      wordLists () {
        return this.updated ? this.wordlistC.wordLists : []
      },
      showContext () {
        return Boolean(this.showContextWordItem)
      }
    },
    methods: {
      showContexts (targetWord, wordListLanguageCode) {
        this.showContextWordItem = this.wordLists[wordListLanguageCode].getWordItem(targetWord)
      },
      backToWordList () {
        this.showContextWordItem = null
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