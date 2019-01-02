<template>
    <div>
        <div class="alpheios-wordlist-commands">
            <div class="alpheios-wordlist-language__title">{{ languageName }}</div>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_ALL_IMPORTANT">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-all-important" @click="makeAllImportant()">
                <check-icon></check-icon>
            </div>
            </alph-tooltip>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_NO_IMPORTANT">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-no-important" @click="removeAllImportant()">
                <check-icon></check-icon>
            </div>
            </alph-tooltip>
        </div>

        <div class="alpheios-wordlist-language__worditem"
                v-for="wordItem in wordItems" 
                v-bind:key="wordItem.ID">
            <word-item-panel 
              :worditem="wordItem" 
              @changeImportant = "changeImportant"
            ></word-item-panel>
        </div>
    </div>
</template>
<script>
import TooltipWrap from '@/vue-components/common-components/tooltip-wrap.vue'
import { Constants } from 'alpheios-data-models'
import CheckIcon from '@/icons/check.svg';
import WordItemPanel from '@/vue-components/word-item-panel.vue'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

export default {
  name: 'WordListPanel',
  components: {
    checkIcon: CheckIcon,
    wordItemPanel: WordItemPanel,
    alphTooltip: TooltipWrap
  },
  props: {
    wordlist: {
      type: Object,
      required: true
    },
    messages: {
      type: Object,
      required: true
    },
    updated: {
      type: Number,
      required: true
    }
  },
  computed: {
    wordItems () {
      return this.updated ? this.wordlist.values : []
    },
    languageName () {
      let languageNames = new Map([
        [Constants.LANG_LATIN, 'Latin'],
        [Constants.LANG_GREEK, 'Greek'],
        [Constants.LANG_ARABIC, 'Arabic'],
        [Constants.LANG_PERSIAN, 'Persian'],
        [Constants.LANG_GEEZ, 'Ancient Ethiopic (Ge\'ez)']
      ])
      
      let languageID = this.wordlist.languageID
      return languageNames.has(languageID) ? languageNames.get(languageID) : ''
    }
  },
  methods: {
    makeAllImportant () {
      this.wordlist.makeAllImportant()
      this.$emit('eventChangeImportant')
    },
    removeAllImportant () {
      this.wordlist.removeAllImportant()
      this.$emit('eventChangeImportant')
    },
    changeImportant (ID, important) {
      if (important) {
        this.wordlist.removeImportantByID(ID)
      } else {
        this.wordlist.makeImportantByID(ID)
      }
    }
  }
}
</script>