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
            <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_REMOVE_ALL">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-remove-all" @click="deleteAll()">
                <delete-icon></delete-icon>
            </div>
            </alph-tooltip>
        </div>

        <div 
                v-for="wordItem in wordItems" 
                v-bind:key="wordItem.storageID">
            <word-item-panel 
              :worditem="wordItem" 
              @changeImportant = "changeImportant"
              @deleteItem = "deleteItem"
            ></word-item-panel>
        </div>
    </div>
</template>
<script>
import TooltipWrap from '@/vue-components/common-components/tooltip-wrap.vue'
import { Constants } from 'alpheios-data-models'
import CheckIcon from '@/icons/check.svg'
import DeleteIcon from '@/icons/delete.svg'
import WordItemPanel from '@/vue-components/word-item-panel.vue'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

export default {
  name: 'WordListPanel',
  components: {
    checkIcon: CheckIcon,
    deleteIcon: DeleteIcon,
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
  data () {
    return {
      reloadList: 1
    }
  },
  computed: {
    wordItems () {
      return this.updated && this.reloadList ? this.wordlist.values : []
    },
    languageName () {
      return this.wordlist.languageName
    }
  },
  methods: {
    async makeAllImportant () {
      await this.wordlist.makeAllImportant()
      this.$emit('eventChangeImportant')
    },
    async removeAllImportant () {
      await this.wordlist.removeAllImportant()
      this.$emit('eventChangeImportant')
    },
    async changeImportant (storageID, important) {
      if (important) {
        await this.wordlist.removeImportantByID(storageID)
      } else {
        await this.wordlist.makeImportantByID(storageID)
      }
    },
    async deleteItem (storageID) {
      await this.wordlist.removeWordItemByID(storageID)
      this.reloadList = this.reloadList + 1
    },
    async deleteAll () {
      await this.wordlist.removeAllWordItems()
      this.reloadList = this.reloadList + 1
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

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-no-important {
      fill: $alpheios-link-color-dark-bg;
      stroke: $alpheios-link-color-dark-bg;
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-all-important {
      fill: $alpheios-link-hover-color;
      stroke: $alpheios-link-hover-color;
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-remove-all {
      fill: $alpheios-headers-color;
      stroke: $alpheios-headers-color;
    }

</style>