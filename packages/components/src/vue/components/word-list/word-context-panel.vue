<template>
    <div>
      <div class="alpheios-wordlist-commands">

        <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('WORDLIST_TOOLTIP_BACK')">
          <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-back" @click="backToWordList">
              <back-icon></back-icon>
          </div>
        </alph-tooltip>

        <div class="alpheios-wordlist-language__title">{{ worditem.targetWord }} ({{ worditem.languageCode}})</div>
      </div>

      <div class = "alpheios-wordlists-tqs" v-for="source in sourcesList">
        <word-tq-source
          :source = "source"
          :tqSelectors = "formattedContext[source]"
        ></word-tq-source>
      </div>
    </div>
</template>
<script>
import BackIcon from '@/images/inline-icons/back.svg'
import Tooltip from '@/vue/components/tooltip.vue'
import WordTqSourceBlock from '@/vue/components/word-list/word-tq-source-block.vue'

export default {
  name: 'WordContextBlock',
  components: {
    backIcon: BackIcon,
    alphTooltip: Tooltip,
    wordTqSource: WordTqSourceBlock
  },
  inject: ['l10n'],
  props: {
    worditem: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedContext () {
      return this.worditem.formattedContext
    },
    sourcesList () {
      return Object.keys(this.formattedContext)
    }
  },
  methods: {
    backToWordList () {
      this.$emit('backToWordList')
    }
  }
}
</script>
<style lang="scss">
  .alpheios-wordlist-commands__item-back {
    fill: var(--alpheios-word-list-context-back-link-color);
    stroke: var(--alpheios-word-list-context-back-link-color);
  }
</style>
