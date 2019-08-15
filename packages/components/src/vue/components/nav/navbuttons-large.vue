<template>
  <div class="alpheios-navbuttons alpheios-navbuttons--large">
    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_HELP')" tooltipDirection="bottom-narrow"
      v-show="! $store.state.ui.overrideHelp">
      <div @click="ui.changeTab('info')" class="alpheios-navbuttons__btn"
            :class="{ active: $store.getters['ui/isActiveTab']('info') }">
        <help-icon />
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_DEFINITIONS')" tooltipDirection="bottom-narrow" v-show="$store.getters['app/fullDefDataReady']">
      <div :class="{ active: $store.getters['ui/isActiveTab']('definitions') }" @click="ui.changeTab('definitions')"
            class="alpheios-navbuttons__btn">
        <definitions-icon></definitions-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_INFLECTIONS')" tooltipDirection="bottom-narrow"
                v-show="$store.state.app.hasInflData">
      <div @click="ui.changeTab('inflections')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflections') }">
        <inflections-icon></inflections-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="bottom-narrow"
                v-show="$store.getters['app/hasTreebankData']">
      <div @click="ui.changeTab('treebank')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('treebank') }">
        <treebank-icon></treebank-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_SHOW_USAGEEXAMPLES')" tooltipDirection="bottom-narrow"
                  v-show="$store.state.app.wordUsageExampleEnabled"
    >
      <div @click="ui.changeTab('wordUsage')" class="alpheios-navbuttons__btn"
           v-bind:class="{ active: $store.getters['ui/isActiveTab']('wordUsage') }">
        <word-usage-icon></word-usage-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT_BROWSER')" tooltipDirection="bottom-narrow">
      <div @click="ui.changeTab('inflectionsbrowser')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflectionsbrowser') }">
        <inflections-browser-icon></inflections-browser-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_GRAMMAR')" tooltipDirection="bottom-narrow"
                v-show="$store.getters[`app/hasGrammarRes`]">
      <div @click="ui.changeTab('grammar')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('grammar') }">
        <grammar-icon></grammar-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_WORDLIST')" tooltipDirection="bottom-narrow">
      <div @click="ui.changeTab('wordlist')" class="alpheios-navbuttons__btn"
           v-bind:class="{ active: $store.getters['ui/isActiveTab']('wordlist') }"
           v-show="this.$store.state.app.hasWordListsData">
        <wordlist-icon></wordlist-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_USER')" tooltipDirection="bottom-narrow"
                v-show="$store.state.auth.enableLogin">
      <div @click="ui.changeTab('user')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('user') }">
        <user-icon></user-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_OPTIONS')" tooltipDirection="bottom-narrow">
      <div @click="ui.changeTab('options')" class="alpheios-navbuttons__btn"
           v-bind:class="{ active: $store.getters['ui/isActiveTab']('options') }">
        <options-icon></options-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_STATUS')" tooltipDirection="bottom-narrow">
      <div @click="ui.changeTab('status')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('status') }"
            v-show="this.settings.verboseMode()">
        <status-icon></status-icon>
      </div>
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
import HelpIcon from '@/images/inline-icons/help-icon.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import WordUsageIcon from '@/images/inline-icons/usage-examples-icon1.svg'
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
    settings: 'settings'
  },
  storeModules: ['app', 'ui'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    statusIcon: StatusIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    helpIcon: HelpIcon,
    grammarIcon: GrammarIcon,
    treebankIcon: TreebankIcon,
    wordUsageIcon: WordUsageIcon,
    wordlistIcon: WordlistIcon
  }
}
</script>
<style lang="scss">
</style>
