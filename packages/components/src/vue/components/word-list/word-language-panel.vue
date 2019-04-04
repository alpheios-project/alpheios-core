<template>
    <div>
        <div class="alpheios-wordlist-commands">
            <div class="alpheios-wordlist-language__title">{{ languageName }}</div>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('TOOLTIP_ALL_IMPORTANT')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-all-important" @click="makeAllImportant()">
                <check-icon></check-icon>
            </div>
            </alph-tooltip>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('TOOLTIP_NO_IMPORTANT')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-no-important" @click="removeAllImportant()">
                <check-icon></check-icon>
            </div>
            </alph-tooltip>
            <alph-tooltip tooltipDirection="top-left" :tooltipText="l10n.getText('TOOLTIP_REMOVE_ALL')">
            <div class="alpheios-wordlist-commands__item alpheios-wordlist-commands__item-remove-all" @click="deleteAll()">
                <delete-icon></delete-icon>
            </div>
            </alph-tooltip>
        </div>

        <div
                v-for="wordItem in wordItems"
                v-bind:key="wordItem.targetWord">
            <word-item
              :worditem="wordItem"
              @changeImportant = "changeImportant"
              @deleteItem = "deleteItem"
              @showContexts = "showContexts"
            ></word-item>
        </div>
    </div>
</template>
<script>
import Tooltip from '@/vue/components/tooltip.vue'
import { Constants } from 'alpheios-data-models'
import CheckIcon from '@/images/inline-icons/check.svg'
import DeleteIcon from '@/images/inline-icons/delete.svg'
import WordItemPanel from '@/vue/components/word-list/word-item-panel.vue'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

export default {
  name: 'WordLanguagePanel',
  components: {
    checkIcon: CheckIcon,
    deleteIcon: DeleteIcon,
    wordItem: WordItemPanel,
    alphTooltip: Tooltip
  },
  inject: ['l10n', 'app'],
  props: {
    languageCode: {
      type: String,
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
      return this.app.getWordList(this.languageCode)
    },
    wordItems () {
      return this.$store.state.app.wordListUpdateTime && this.reloadList ? this.wordlist.values : []
    },
    languageName () {
      // TODO with upcoming merge, this can be retrived from utility library
      // so just return the code for now
      return this.languageCode
    }
  },
  methods: {
    async makeAllImportant () {
      await this.app.updateAllImportant(this.languageCode, true)
      this.$emit('eventChangeImportant')
    },
    async removeAllImportant () {
      await this.app.updateAllImportant(this.languageCode, false)
      this.$emit('eventChangeImportant')
    },
    async changeImportant (targetWord, important) {
      await this.app.updateWordItemImportant(this.languageCode, targetWord, important)
    },
    async deleteItem (targetWord) {
      await this.app.removeWordListItem(this.languageCode, targetWord)
      this.reloadList = this.reloadList + 1
    },
    async deleteAll () {
      await this.app.removeWordList(this.languageCode)
      this.reloadList = this.reloadList + 1
    },
    showContexts (targetWord) {
      this.$emit('showContexts', targetWord, this.languageCode)
    }
  }
}
</script>
<style lang="scss">
    @import "../../../styles/variables";

    .alpheios-wordlist-commands {
      border-bottom: 1px solid var(--alpheios-border-color);
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
      fill: var(--alpheios-link-color-on-dark);
      stroke: var(--alpheios-link-color-on-dark);
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-all-important {
      fill: var(--alpheios-color-light);
      stroke: var(--alpheios-color-light);
    }

    .alpheios-wordlist-commands__item.alpheios-wordlist-commands__item-remove-all {
      fill: var(--alpheios-color-dark);
      stroke: var(--alpheios-color-dark);
    }
</style>
