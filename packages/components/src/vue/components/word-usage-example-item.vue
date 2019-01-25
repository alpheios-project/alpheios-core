<template>
  <div class="alpheios_word_usage_list_item">
      <div class="alpheios_word_usage_list_item__source">
          <a 
            :href="wordUsageItem.source" 
            target="_blank"
            class = "alpheios_word_usage_list_item__source_link"
            >{{ wordUsageItem.source }}</a> 
          <p class="alpheios_word_usage_list_item__source_cit">{{ wordUsageItem.fullCit() }}</p>
        </div>
      <div class="alpheios_word_usage_list_item__text" v-html="wordUsageItem.htmlExample"></div>
  </div>
</template>
<script>
  export default {
    name: 'WordUsageExampleItem',
    props: {
      wordUsageItem: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style lang="scss">
    @import "../../styles/alpheios";

    .alpheios_word_usage_list_item {
      margin-bottom: 15px;
    }

    .alpheios_word_usage_list_item__source {
      font-weight: bold;
    }
    .alpheios_word_usage_list_item__source a.alpheios_word_usage_list_item__source_link {
      color: #3E8D9C;
      font-size: 90%;
      display: block;
    }

    .alpheios_word_usage_list_item__source p.alpheios_word_usage_list_item__source_cit {
      margin: 0;
    }

    .alpheios_word_usage_list_item__text {
      margin-top: 3px;

      span.alpheios_word_usage_list_item__text_targetword {
        color: $alpheios-highlight-dark-color;
        font-weight:bold;
      }
    }
</style>
