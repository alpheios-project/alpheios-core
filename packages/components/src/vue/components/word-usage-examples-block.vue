<template>
  <div class="alpheios-word-usage">
    <div class="alpheios_word_usage_list_title">{{ targetWord }} ({{ language }})</div>
    <div class="alpheios_word_usage_list_mainblock" v-if="showWordUsageExampleItems">
      <word-usage-example-item
          v-for="wordUsageItem in wordUsageListSorted"
          v-bind:key="wordUsageItem.ID"
          :wordUsageItem="wordUsageItem"
      ></word-usage-example-item>
    </div>
    <div class="alpheios-word_usage_list__provider" v-if="provider">
      {{provider.toString()}}
    </div>
  </div>
</template>
<script>
// TODO: Update to retrieve usage examples data directly from the Vue store, not from a parent component
import WordUsageExampleItem from '@/vue/components/word-usage-example-item.vue'
export default {
  name: 'WordUsageExamplesBlock',
  components: {
    wordUsageExampleItem: WordUsageExampleItem
  },
  props: {
    wordUsageList: {
      type: Array,
      required: true
    },
    targetWord: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    provider: {
      type: Object,
      required: false
    }
  },
  computed: {
    wordUsageListSorted() {
      // TODO support user-selected sort key and order
      // eventually sorting should also take language into account but
      // for now we will probably only show Latin author and work names anyway
      if (this.wordUsageList) {
        return this.wordUsageList.sort((a,b) => {
          let aU = a.fullCit().toUpperCase()
          let bU = b.fullCit().toUpperCase()
          if (aU < bU) {
            return -1
          }
          if (aU > bU) {
            return 1
          }
          return 0
        })
      }

    },

    showWordUsageExampleItems () {
      return this.wordUsageList && this.wordUsageList.length > 0
    },

    providerRights () {
      return (this.provider && this.provider.rights)
        ? Array.from(this.provider.rights.entries()).map(([key, value]) => { return { key, value } })
        : []
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-word-usage {
    display: flex;
    flex-direction: column;
    height: 100%;

    div.alpheios_word_usage_list_title {
      flex: none;
      font-weight: bold;
      padding-bottom: 5px;
      border-bottom: 1px solid $alpheios-toolbar-active-color;
      margin-bottom: 10px;
    }

    div.alpheios_word_usage_list_mainblock {
      flex: 1 1 auto;
      position: relative;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
    }
    div.alpheios-word_usage_list__provider {
      flex: none;
      font-weight: normal;

      padding: 10px 0;
      font-size: 80%;
    }
  }
</style>
