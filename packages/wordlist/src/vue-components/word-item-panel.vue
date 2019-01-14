<template>
    <div v-bind:class="itemClasses" class="alpheios-wordlist-language__worditem">
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_CHANGE_IMPORTANT">
          <div class="alpheios-worditem__data alpheios-worditem__icon" 
                  @click="changeImportant()">
                  <check-icon></check-icon>
          </div>
        </alph-tooltip>

        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_REMOVE">
          <div class="alpheios-worditem__data alpheios-worditem__icon alpheios-worditem__delete_icon" 
                  @click="deleteItem()">
                  <delete-icon></delete-icon>
          </div>
        </alph-tooltip>

        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_TEXT_CONTEXT">
          <div class="alpheios-worditem__data alpheios-worditem__icon alpheios-worditem__delete_icon" 
                  @click="showContexts()">
                  <text-quote-icon></text-quote-icon>
          </div>
        </alph-tooltip>
        <div 
          class="alpheios-worditem__data alpheios-worditem__targetWord"
          @click="selectWordItem()"
        >{{ worditem.targetWord }}</div>
        <div class="alpheios-worditem__data alpheios-worditem__lemmasList">{{ worditem.lemmasList }}</div>
    </div>
</template>
<script>
  import CheckIcon from '@/icons/check.svg'
  import DeleteIcon from '@/icons/delete.svg'
  import TextQuoteIcon from '@/icons/text-quote.svg'
  import TooltipWrap from '@/vue-components/common-components/tooltip-wrap.vue'

  export default {
    name: 'WordItemPanel',
    components: {
      checkIcon: CheckIcon,
      deleteIcon: DeleteIcon,
      textQuoteIcon: TextQuoteIcon,
      alphTooltip: TooltipWrap
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
    data () {
      return {
        important: false
      }
    },
    mounted () {
      this.important = this.worditem.important
      this.$parent.$on('eventChangeImportant', this.eventChangeImportant);
    },
    computed: {
      itemClasses () {
        // console.info('********************itemClasses', this.worditem.currentSession, this.worditem)
        return { 
          'alpheios-wordlist-language__worditem__active': this.important,
          'alpheios-wordlist-language__worditem__current_session': this.worditem.currentSession
        }
      }
    },
    methods: {
      changeImportant () {
        this.$emit('changeImportant', this.worditem.storageID, this.worditem.important)
        this.important = this.worditem.important
      },
      eventChangeImportant () {
        this.important = this.worditem.important
      },
      selectWordItem () {
        this.worditem.selectWordItem()
      },
      deleteItem () {
        this.$emit('deleteItem', this.worditem.storageID)
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/alpheios";
  .alpheios-wordlist-language__worditem {
      border-bottom: 1px solid #ddd;
      padding: 2px 0;
  }

  .alpheios-wordlist-language__worditem__current_session {
    background: $alpheios-highlight-light-color;
  }

  .alpheios-worditem__data {
      display: inline-block;
      vertical-align: middle;
  }

  .alpheios-wordlist-language__worditem {
    .alpheios-worditem__icon {
        width: 15px;
        height: 15px;
        text-align: center;
        cursor: pointer;
        fill: $alpheios-link-color-dark-bg;
        stroke: $alpheios-link-color-dark-bg;
        margin: 5px;
        svg {
          width: 15px;
          height: 15px;
          display: inline-block;
          vertical-align: top;
        }

        &.alpheios-worditem__delete_icon {
          fill: $alpheios-headers-color;
          stroke: $alpheios-headers-color;
        }
    }
  }

 .alpheios-wordlist-language__worditem__active .alpheios-worditem__data {
    fill: $alpheios-link-hover-color;
    stroke: $alpheios-link-hover-color;
    color: $alpheios-link-hover-color;

    &.alpheios-worditem__delete_icon {
      fill: $alpheios-headers-color;
      stroke: $alpheios-headers-color;
    }
  }

  .alpheios-worditem__targetWord {
      font-weight: bold;
      width: 30%;
      cursor: pointer;
  }
  .alpheios-worditem__lemmasList {
      width: 38%;
  }
</style>