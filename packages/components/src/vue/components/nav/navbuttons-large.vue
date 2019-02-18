<template>
  <div class="alpheios-navbuttons alpheios-navbuttons--large">
    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_HELP')" tooltipDirection="bottom-narrow">
      <span @click="app.changeTab('info')" class="alpheios-navbuttons__btn"
            :class="{ active: $store.getters['ui/isActiveTab']('info') }">
        <info-icon></info-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_DEFINITIONS')" tooltipDirection="bottom-narrow" v-show="$store.state.app.defDataReady">
      <span :class="{ active: $store.getters['ui/isActiveTab']('definitions') }" @click="app.changeTab('definitions')"
            class="alpheios-navbuttons__btn">
        <definitions-icon></definitions-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT')" tooltipDirection="bottom-narrow"
                v-show="$store.getters[`app/hasInflData`]">
      <span @click="app.changeTab('inflections')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflections') }">
        <inflections-icon></inflections-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT_BROWSER')" tooltipDirection="bottom-narrow">
      <span @click="app.changeTab('inflectionsbrowser')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflectionsbrowser') }">
        <inflections-browser-icon></inflections-browser-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_GRAMMAR')" tooltipDirection="bottom-narrow"
                v-show="$store.getters[`app/hasGrammarRes`]">
      <span @click="app.changeTab('grammar')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('grammar') }">
        <grammar-icon></grammar-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="bottom-narrow"
                v-show="$store.getters['app/hasTreebankData']">
      <span @click="app.changeTab('treebank')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('treebank') }">
        <treebank-icon></treebank-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_OPTIONS')" tooltipDirection="bottom-narrow">
      <span @click="app.changeTab('options')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('options') }">
        <options-icon></options-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_USER')" tooltipDirection="bottom-narrow"
                v-if="Boolean(auth)">
      <span @click="app.changeTab('user')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('user') }">
        <user-icon></user-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_WORD_USAGE')" tooltipDirection="bottom-narrow"
                v-show="$store.getters['app/hasWordUsageExamplesData']">
      <span @click="app.changeTab('wordUsage')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('wordUsage') }">
        <word-usage-icon></word-usage-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_WORDLIST')" tooltipDirection="bottom-narrow">
      <span @click="app.changeTab('wordlist')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('wordlist') }"
            v-show="this.$store.state.app.wordListUpdated && this.app.wordlistC && Object.keys(this.app.wordlistC.wordLists).length > 0">
        <wordlist-icon></wordlist-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_STATUS')" tooltipDirection="bottom-narrow">
      <span @click="app.changeTab('status')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('status') }"
            v-show="this.settings.contentOptions.items.verboseMode.currentValue === `verbose`">
        <status-icon></status-icon>
      </span>
    </alph-tooltip>
  </div>
</template>
<script>
// Vue components
import NavbuttonsCompact from '@/vue/components/nav/navbuttons-compact.vue'
// Embeddable SVG icons
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import StatusIcon from '@/images/inline-icons/status.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
import TreebankIcon from '@/images/inline-icons/sitemap.svg'
import InfoIcon from '@/images/inline-icons/info.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import WordUsageIcon from '@/images/inline-icons/books-stack.svg'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'NavbuttonsLarge',
  extends: NavbuttonsCompact,
  // API modules that are required for this component
  inject: {
    app: 'app',
    ui: 'ui',
    l10n: 'l10n',
    settings: 'settings',
    auth: { from: 'auth', default: null } // This module is options
  },
  storeModules: ['app', 'ui'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    statusIcon: StatusIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    infoIcon: InfoIcon,
    grammarIcon: GrammarIcon,
    treebankIcon: TreebankIcon,
    wordUsageIcon: WordUsageIcon,
    wordlistIcon: WordlistIcon
  }
}
</script>
<style lang="scss">

  .alpheios-navbuttons--large {
    & .alpheios-navbuttons__btn {
      width: 20px;
      height: 20px;
      margin: 10px 5px;
    }

    & .alpheios-navbuttons__btn svg {
      width: 20px;
      height: 20px;
    }
  }
</style>
