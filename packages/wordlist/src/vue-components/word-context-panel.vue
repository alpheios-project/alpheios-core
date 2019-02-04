<template>
    <div>
      <div class="alpheios-wordlist-commands">
        
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_BACK">
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
          :messages = "messages"
        ></word-tq-source>
      </div>
    </div>
</template>
<script>
  import BackIcon from '@/icons/back.svg'
  import TooltipWrap from '@/vue-components/common-components/tooltip-wrap.vue'
  import WordTqSourceBlock from '@/vue-components/word-tq-source-block.vue'

  export default {
    name: 'WordContextBlock',
    components: {
      backIcon: BackIcon,
      alphTooltip: TooltipWrap,
      wordTqSource: WordTqSourceBlock
    },
    props: {
      worditem: {
        type: Object,
        required: true
      },
      messages: {
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
  @import "../styles/alpheios";

  .alpheios-wordlist-commands {
    border-bottom: 1px solid $alpheios-toolbar-color;
  }
  .alpheios-wordlist-commands .alpheios-wordlist-commands__item {
    width: 15px;
    height: 15px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    margin: 0 5px 10px;
    svg {
      width: 15px;
      height: 15px;
      display: inline-block;
      vertical-align: top;
    } 
  }
</style>