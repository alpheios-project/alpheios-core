<template>
  <div class="alpheios_word_usage_list_item">
    <div class="alpheios_word_usage_list_item__source-data-title">
      <a
          :href="wordUsageItem.source"
          target="_blank"
          class = "alpheios_word_usage_list_item__source_link"
          >{{ citFormatted }}</a>
    </div>
      <div class="alpheios_word_usage_list_item__text">
        <div class="alpheios_word_usage_list_item__source">
          <span class="alpheios_word_usage_list_item__source-link" @click="changeShowDataSource()">
            <source-icon class="alpheios_word_usage_list_item__source-link-svg"></source-icon>
          </span>
        </div>
        <div class="alpheios_word_usage_list_item__text_prefix">{{ prefix }}</div>
        <div class="alpheios_word_usage_list_item__text_targetword" v-html="wordUsageItem.normalizedText"></div>
        <div class="alpheios_word_usage_list_item__text_suffix">{{ suffix }}</div>
      </div>
      <div class="alpheios_word_usage_list_item__source-data" v-show="showDataSource">
        <a
            :href="wordUsageItem.source"
            target="_blank"
            class = "alpheios_word_usage_list_item__source_link"
            >{{ citFormatted }}</a>
      </div>
  </div>
</template>
<script>
import SourceIcon from '@/images/inline-icons/source.svg'

export default {
  name: 'WordUsageExamplesItem',
  components: {
    sourceIcon: SourceIcon
  },
  props: {
    wordUsageItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDataSource: false
    }
  },
  computed: {
    prefix () {
      return this.wordUsageItem.prefix
    },
    suffix () {
      return this.wordUsageItem.suffix
    },
    citFormatted () {
      return `${this.wordUsageItem.cit} ${this.wordUsageItem.fullCit()}`
    }
  },
  methods: {
    changeShowDataSource () {
      this.showDataSource = !this.showDataSource
    }
  }
}
</script>
<style lang="scss">
    @import "../../../styles/variables";
    .alpheios_word_usage_list_item {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        border-bottom: 1px solid var(--alpheios-border-color);
    }

    .alpheios_word_usage_list_item__text {
        display: flex;
        flex-direction: row;
        line-height: normal;
        justify-content: center;
        align-items: center;
    }

    .alpheios_word_usage_list_item
    .alpheios_word_usage_list_item__text
    .alpheios_word_usage_list_item__text_targetword {
        color: var(--alpheios-highlight-dark-color);
    }

    .alpheios_word_usage_list_item__text_targetword {
        padding: 0 10px;
        font-weight: 700;
        text-align: center;
    }

    .alpheios_word_usage_list_item__text_prefix {
        text-align: center;
        padding-left: 4px;
    }

    .alpheios_word_usage_list_item__text_suffix {
        text-align: center;
    }

    .alpheios_word_usage_list_item
    .alpheios_word_usage_list_item__text  {
      .alpheios_word_usage_list_item__text_prefix,
      .alpheios_word_usage_list_item__text_suffix {
        font-size: 85%;
        width: 40%;
      }
    }

    .alpheios_word_usage_list_item__source-data  {
      width: 100%;
      padding-top: 10px;
    }

    .alpheios_word_usage_list_item
    a.alpheios_word_usage_list_item__source_link {
      color: var(--alpheios-link-color-on-light);
      font-size: 95%;
      display: block;
    }

    .alpheios_word_usage_list_item__source-link {
      display: inline-block;
      cursor: pointer;
    }

    .alpheios_word_usage_list_item {
      .alpheios_word_usage_list_item__source-data-title {
        display: block;
        width: 100%;
        padding-bottom: 5px;
      }
      .alpheios_word_usage_list_item__text
      .alpheios_word_usage_list_item__source
      {
        display: none;
      }
    }

    .alpheios-panel--compact
    .alpheios_word_usage_list_item {
      .alpheios_word_usage_list_item__source-data-title {
        display: none;
      }
      .alpheios_word_usage_list_item__text
      .alpheios_word_usage_list_item__source
      {
        display: inline-block;
      }
    }
</style>
