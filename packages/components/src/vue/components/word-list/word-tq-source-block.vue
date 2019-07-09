<template>
    <div class = "alpheios-wordlists-tq">
      <a class = "alpheios-wordlists-tq-title" :href="source" target="_blank">{{ source }}</a>
      <div class = "alpheios-wordlists-tq-contextHTML-block"
        v-for = "tq in tqSelectors" :key = "tq.ID"
      >
        <p class = "alpheios-wordlists-tq-contextHTML" v-html="tq.contextHTML"></p>
      </div>
    </div>
</template>
<script>
export default {
  name: 'WordTQSourceBlock',
  props: {
    source: {
      type: String,
      required: true
    },
    tqSelectors: {
      type: Array,
      required: true
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";
  .alpheios-wordlists-tq {

    a.alpheios-wordlists-tq-title {
      font-weight: bold;
      padding: 5px 0;
      color: var(--alpheios-word-list-context-source-link-color);

      &:hover,
      &:focus {
        color: var(--alpheios-word-list-context-source-link-color-hover);
      }
    }

    .alpheios-wordlists-tq-contextHTML-block {
      padding: 5px 0 5px 10px;
    }

    .alpheios-wordlists-tq-contextHTML {
      font-style: italic;
    }

    .alpheios_worditem_incontext,
    .alpheios_worditem_incontext_add {
      font-weight: bold;
      background: var(--alpheios-word-list-context-incontext-bg);
      display: inline-block;
      padding: 0 5px;
    }
  }
</style>
