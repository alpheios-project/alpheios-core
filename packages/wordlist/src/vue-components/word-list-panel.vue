<template>
  <div class="alpheios-wordlist">
      <div class="alpheios-wordlist-language" v-for="language in languagesList">
          {{ language }}
      </div>
  </div>
</template>
<script>
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
        // console.info('*********************languagesList 1', this.updated, this.wordLists)
        // console.info('*********************languagesList 2', this.wordLists.keys())
        // console.info('*********************languagesList 3', Array.from(this.wordLists.keys()))
        return this.updated && this.wordLists.size > 0 ? Array.from(this.wordLists.keys()) : []
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";
</style>