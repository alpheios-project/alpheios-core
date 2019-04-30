<template>
    <div v-bind:class="itemClasses" class="alpheios-wordlist-language__worditem">
        <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getMsg('WORDLIST_TOOLTIP_CHANGE_IMPORTANT')">
          <div class="alpheios-worditem__data alpheios-worditem__icon"
                  @click="changeImportant()">
                  <check-icon></check-icon>
          </div>
        </alph-tooltip>

        <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getMsg('WORDLIST_TOOLTIP_REMOVE')">
          <div class="alpheios-worditem__data alpheios-worditem__icon alpheios-worditem__delete_icon"
                  @click="deleteItem()">
                  <delete-icon></delete-icon>
          </div>
        </alph-tooltip>

        <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getMsg('WORDLIST_CURRENT_SESSION')" :class="{'alpheios-visibility__hidden ': !this.worditem.currentSession}">
          <div class="alpheios-worditem__data alpheios-worditem__icon alpheios-worditem__current_session_icon">
                  <current-session-icon></current-session-icon>
          </div>
        </alph-tooltip>

        <alph-tooltip tooltipDirection="top-left"
          :tooltipText="l10n.getMsg('WORDLIST_TOOLTIP_TEXT_CONTEXT')"
          v-bind:class="{ 'alpheios-visibility__hidden ': !worditem.hasTextQuoteSelectors }">
          <div class="alpheios-worditem__data alpheios-worditem__icon alpheios-worditem__delete_icon"
                  @click="showContexts()">
                  <text-quote-icon></text-quote-icon>
          </div>
        </alph-tooltip>
        <div
          class="alpheios-worditem__data alpheios-worditem__targetWord"
          @click="selectWordItem()"
        >{{ worditem.targetWord }}</div>
        <div class="alpheios-worditem__data alpheios-worditem__lemmasList">
          <span v-for="(lemma, lemmaIndex) in lemmasList" 
                @click="setLemmaFilterByClick(lemma)"
                class="alpheios-worditem__lemmasList-lemmaitem"
          >{{ lemma }}<span v-if="lemmaIndex < lemmasList.length-1">, </span></span>
        </div>
    </div>
</template>
<script>
import CheckIcon from '@/images/inline-icons/check.svg'
import DeleteIcon from '@/images/inline-icons/delete.svg'
import TextQuoteIcon from '@/images/inline-icons/text-quote.svg'
import CurrentSessionIcon from '@/images/inline-icons/current-session.svg'
import Tooltip from '@/vue/components/tooltip.vue'

export default {
  name: 'WordItemBlock',
  inject: ['l10n', 'app'],
  components: {
    checkIcon: CheckIcon,
    deleteIcon: DeleteIcon,
    textQuoteIcon: TextQuoteIcon,
    currentSessionIcon: CurrentSessionIcon,
    alphTooltip: Tooltip
  },
  props: {
    worditem: {
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
    this.$parent.$on('eventChangeImportant', this.eventChangeImportant)
  },
  computed: {
    itemClasses () {
      return {
        'alpheios-wordlist-language__worditem__active': this.important
      }
    },
    lemmasList () {
      return this.$store.state.app.wordListUpdateTime ? this.worditem.lemmasList.split(',') : []
    }
  },
  methods: {
    changeImportant () {
      this.$emit('changeImportant', this.worditem.targetWord, !this.worditem.important)
      this.important = this.worditem.important
    },
    eventChangeImportant () {
      this.important = this.worditem.important
    },
    selectWordItem () {
      this.app.selectWordItem(this.worditem.languageCode, this.worditem.targetWord)
    },
    deleteItem () {
      this.$emit('deleteItem', this.worditem.targetWord)
    },
    showContexts () {
      this.$emit('showContexts', this.worditem.targetWord)
    },
    setLemmaFilterByClick(lemma) {
      this.$emit('setLemmaFilterByClick', lemma)
    }
  }
}
</script>

<style lang="scss">
 @import "../../../styles/variables";

  .alpheios-wordlist-language__worditem {
      border-bottom: 1px solid var(--alpheios-border-color);
      padding: 2px 0;
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
        fill: var(--alpheios-link-color-on-dark);
        stroke: var(--alpheios-link-color-on-dark);
        margin: 5px;
        svg {
          width: 15px;
          height: 15px;
          display: inline-block;
          vertical-align: top;
        }

        &.alpheios-worditem__delete_icon {
          fill: var(--alpheios-color-dark);
          stroke: var(--alpheios-color-dark);
        }

        &.alpheios-worditem__current_session_icon {
          stroke: var(--alpheios-color-bright-hover);
          fill: var(--alpheios-color-bright-hover);
        }
    }
  }

 .alpheios-wordlist-language__worditem__active .alpheios-worditem__data {
    fill: var(--alpheios-color-light);
    stroke: var(--alpheios-color-light);
    color: var(--alpheios-color-light);

    &.alpheios-worditem__delete_icon {
      fill: var(--alpheios-color-dark);
      stroke: var(--alpheios-color-dark);
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

  .alpheios-visibility__hidden {
    visibility: hidden;
  }

  .alpheios-worditem__lemmasList-lemmaitem {
    cursor: pointer;
  }
</style>