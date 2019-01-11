<template>
  <div class="alpheios-lemma__translations">
    <div v-if="translations && translations[lemmakey] && translations[lemmakey].glosses && translations[lemmakey].glosses.length > 0" :data-lemmakey="lemmakey" class="hasValue">
      <p v-for="(gloss, gindex) in translations[lemmakey].glosses" class="alpheios-lemma__translations-value">
        <span v-if="translations[lemmakey].glosses.length > 1" class="translation_index">-</span>
        <span class="alpheios-lemma__translations-gloss">{{ gloss }}</span>
      </p>
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
    @import "../../styles/alpheios";
  .alpheios-lemma__translations {
    padding: 5px 0 0 22px;
    font-style: italic;
    color: #585858;
    font-weight: bold;
  }

  p.alpheios-lemma__translations-value {
    margin-bottom: 5px;
  }
</style>
