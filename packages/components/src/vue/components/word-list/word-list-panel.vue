<template>
  <div data-alpheios-ignore="all">
    <div class="alpheios-wordlist" v-if="!showContext" >
        <div class="alpheios-wordlist-language" v-for="(languageCode, langIndex) in languagesList" v-bind:key="langIndex">
          <word-language
            :languageCode = "languageCode"
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
import WordLanguagePanel from '@/vue/components/word-list/word-language-panel.vue'
import WordContextPanel from '@/vue/components/word-list/word-context-panel.vue'

export default {
  name: 'WordListPanel',
  inject: ['app'],
  components: {
    wordLanguage: WordLanguagePanel,
    wordContext: WordContextPanel
  },
  data () {
    return {
      showContextWordItem: null
    }
  },
  computed: {
    languagesList () {
      this.showContextWordItem = null
      return this.$store.state.app.wordListUpdateTime && Object.keys(this.wordLists).length > 0 ? Object.keys(this.wordLists) : []
    },
    wordLists () {
      return this.$store.state.app.wordListUpdateTime ? this.app.getAllWordLists() : []
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
    @import "../../../styles/variables";

    .alpheios-wordlist-language {
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    .alpheios-wordlist-language__title {
        font-weight: bold;
        font-size: 120%;
        display: inline-block;
        vertical-align: middle;
    }


</style>
