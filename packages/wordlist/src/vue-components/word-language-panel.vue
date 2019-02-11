<template>
    <div>
        <div class="alpheios-wordlist-commands">
            <div class="alpheios-wordlist-language__title">{{ languageName }}</div>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getMsg('TOOLTIP_ALL_IMPORTANT')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-all-important" @click="makeAllImportant()">
                <check-icon></check-icon>
            </div>
            </alph-tooltip>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getMsg('TOOLTIP_NO_IMPORTANT')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-no-important" @click="removeAllImportant()">
                <check-icon></check-icon>
            </div>
            </alph-tooltip>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getMsg('TOOLTIP_REMOVE_ALL')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-remove-all" @click="deleteAll()">
                <delete-icon></delete-icon>
            </div>
            </alph-tooltip>
        </div>

        <div
                v-for="wordItem in wordItems"
                v-bind:key="wordItem.targetWord">
            <word-item
              :controller="controller"
              :worditem="wordItem"
              :updated="updated"
              @changeImportant = "changeImportant"
              @deleteItem = "deleteItem"
              @showContexts = "showContexts"
            ></word-item>
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
  name: 'WordLanguagePanel',
  components: {
    checkIcon: CheckIcon,
    deleteIcon: DeleteIcon,
    wordItem: WordItemPanel,
    alphTooltip: TooltipWrap
  },
  inject: ['l10n'],
  props: {
    controller: {
      type: Object,
      required: true
    },
    languageCode: {
      type: String,
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
    wordlist () {
      return this.controller.getWordList(this.languageCode)
    },
    wordItems () {
      return this.updated && this.reloadList ? this.wordlist.values : []
    },
    languageName () {
      // TODO with upcoming merge, this can be retrived from utility library
      // so just return the code for now
      return this.languageCode
    }
  },
  methods: {
    async makeAllImportant () {
      await this.controller.updateAllImportant(this.languageCode,true)
      this.$emit('eventChangeImportant')
    },
    async removeAllImportant () {
      await this.controller.updateAllImportant(this.languageCode,false)
      this.$emit('eventChangeImportant')
    },
    async changeImportant (targetWord, important) {
      await this.controller.updateWordItemImportant(this.languageCode,targetWord,important)
    },
    async deleteItem (targetWord) {
      await this.controller.removeWordListItem(this.languageCode,targetWord)
      this.reloadList = this.reloadList + 1
    },
    async deleteAll () {
      await this.controller.removeWordList(this.languageCode)
      this.reloadList = this.reloadList + 1
    },
    showContexts (targetWord) {
      this.$emit('showContexts', targetWord, this.languageCode)
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