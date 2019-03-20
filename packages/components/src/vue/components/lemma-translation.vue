<template>
  <div class="alpheios-lemma__translations">
    <div
        :data-lemmakey="lemmakey"
        class="hasValue" v-if="translations && translations[lemmakey] && translations[lemmakey].glosses && translations[lemmakey].glosses.length > 0">
      <p class="alpheios-lemma__translations-value" v-for="(gloss, gindex) in translations[lemmakey].glosses">
        <span class="translation_index" v-if="translations[lemmakey].glosses.length > 1">-</span>
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
  @import "../../styles/variables";

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
