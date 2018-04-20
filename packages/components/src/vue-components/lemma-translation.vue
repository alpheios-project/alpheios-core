<template>
  <div class="alpheios-lemma__translations">
    <div v-if="translations && translations[lemmakey]" :data-lemmakey="lemmakey">
      {{ translations[lemmakey].meanings }}
    </div>
    <div v-if="!translations || !translations[lemmakey]">
      There is no translations for lemma
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LemmaTranslation',
    props: {
      translations: {
        type: Object,
        required: false
      },
      lemmakey: {
        type: String,
        required: false
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

  .alpheios-lemma__translations {
    padding: 5px 0 0 22px;
    font-style: italic;
    color: #585858;
    font-weight: bold;
  }
</style>
