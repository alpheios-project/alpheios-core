<template>
  <div class="alpheios-wordlist">
      <div class="alpheios-wordlist-language" v-for="(languageID, langIndex) in languagesList" v-bind:key="langIndex">
        <div class="alpheios-wordlist-language__title">{{ getLanguageName(languageID) }}</div>
        <div class="alpheios-wordlist-language__worditem" v-for="wordItem in getWordItemsByLanguage(languageID)" v-bind:key="wordItem.ID">
            <div class="alpheios-wordlist-language__worditem__data alpheios-wordlist-language__worditem__targetWord">{{ wordItem.targetWord }}</div>
            <div class="alpheios-wordlist-language__worditem__data alpheios-wordlist-language__worditem__lemmasList">{{ wordItem.lemmasList }}</div>
        </div>
      </div>
  </div>
</template>
<script>
  import { Constants } from 'alpheios-data-models'

  export default {
    name: 'WordListPanel',
    props: {
      wordLists: {
        type: Map,
        required: true
      },
      updated: {
        type: Number,
        required: true
      }
    },
    computed: {
      languagesList () {
        return this.updated && this.wordLists.size > 0 ? Array.from(this.wordLists.keys()) : []
      }
    },
    methods: {
      getLanguageName(languageID) {
        let languageNames = new Map([
          [Constants.LANG_LATIN, 'Latin'],
          [Constants.LANG_GREEK, 'Greek'],
          [Constants.LANG_ARABIC, 'Arabic'],
          [Constants.LANG_PERSIAN, 'Persian'],
          [Constants.LANG_GEEZ, 'Ancient Ethiopic (Ge\'ez)']
        ])

        return languageNames.has(languageID) ? languageNames.get(languageID) : ''
      },

      getWordItemsByLanguage(languageID) {
        console.info('***************getWordItemsByLanguage1', languageID)
        console.info('***************getWordItemsByLanguage2', this.wordLists.get(languageID).items)
        console.info('***************getWordItemsByLanguage3', Object.values(this.wordLists.get(languageID).items))
        return Object.values(this.wordLists.get(languageID).items)
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
        border-bottom: 1px solid $alpheios-toolbar-color;
    }

    .alpheios-wordlist-language__worditem {
        border-bottom: 1px solid #ddd;
        padding: 2px 0;
    }

    .alpheios-wordlist-language__worditem__data {
        display: inline-block;
        vertical-align: middle;
    }

    .alpheios-wordlist-language__worditem__targetWord {
        font-weight: bold;
        width: 30%;
    }
    .alpheios-wordlist-language__worditem__lemmasList {
        width: 68%;
    }
</style>