<template>

  <div class="alpheios-navmenu">
    <div
        class="alpheios-navmenu__item"
        :class="{ active: $store.getters['ui/isActiveTab']('morphology') }"
        @click="changeTab('morphology')"
        v-show="$store.state.app.morphDataReady && app.hasMorphData()"
    >
      <div class="alpheios-navbuttons__icon-cont">
        <morphology-icon class="alpheios-navbuttons__icon"></morphology-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_MORPHOLOGY') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('definitions') }"
         @click="changeTab('definitions')" v-show="$store.getters['app/fullDefDataReady']">
      <div class="alpheios-navbuttons__icon-cont">
        <definitions-icon class="alpheios-navbuttons__icon"></definitions-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_DEFINITIONS') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('inflections') }"
         v-show="$store.state.app.hasInflData" @click="changeTab('inflections')">
      <div class="alpheios-navbuttons__icon-cont">
        <inflections-icon class="alpheios-navbuttons__icon"></inflections-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_INFLECT') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('treebank') }"
         v-show="$store.getters['app/hasTreebankData']" @click="changeTab('treebank')">
      <div class="alpheios-navbuttons__icon-cont">
        <treebank-icon class="alpheios-navbuttons__icon"></treebank-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_TREEBANK') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('wordUsage') }"
         v-show="$store.state.app.wordUsageExampleEnabled"
         @click="changeTab('wordUsage')">
      <div class="alpheios-navbuttons__icon-cont">
        <word-usage-icon class="alpheios-navbuttons__icon"></word-usage-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_WORD_USAGE') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('inflectionsbrowser') }"
         @click="changeTab('inflectionsbrowser')">
      <div  class="alpheios-navbuttons__icon-cont">
        <inflections-browser-icon class="alpheios-navbuttons__icon"></inflections-browser-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_INFLECT_BROWSER') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('grammar') }"
         v-show="$store.getters[`app/hasGrammarRes`]" @click="changeTab('grammar')">
      <div  class="alpheios-navbuttons__icon-cont">
        <grammar-icon class="alpheios-navbuttons__icon"></grammar-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_GRAMMAR') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('wordlist') }"
         v-show="this.$store.state.app.hasWordListsData"
         @click="changeTab('wordlist')">
      <div  class="alpheios-navbuttons__icon-cont">
        <wordlist-icon class="alpheios-navbuttons__icon"></wordlist-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_WORDLIST') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('user') }"
         v-show="$store.state.auth.enableLogin" @click="changeTab('user')">
      <div class="alpheios-navbuttons__icon-cont">
        <user-icon class="alpheios-navbuttons__icon"></user-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_USER') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('options') }"
         @click="changeTab('options')">
      <div  class="alpheios-navbuttons__icon-cont">
        <options-icon class="alpheios-navbuttons__icon"></options-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_OPTIONS') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('status') }"
         v-show="this.settings.verboseMode()"
         @click="changeTab('status')">
      <div class="alpheios-navbuttons__icon-cont">
        <status-icon class="alpheios-navbuttons__icon"></status-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_STATUS') }}</div>
    </div>
  </div>
</template>
<script>
// Embeddable SVG icons
import MorphologyIcon from '@/images/inline-icons/language.svg'
import DefinitionsIcon from '@/images/inline-icons/definitions.svg'
import InflectionsIcon from '@/images/inline-icons/inflections.svg'
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import StatusIcon from '@/images/inline-icons/status.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
import TreebankIcon from '@/images/inline-icons/sitemap.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import WordUsageIcon from '@/images/inline-icons/usage-examples-icon1.svg'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'DropDownMenu',
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
    morphologyIcon: MorphologyIcon,
    definitionsIcon: DefinitionsIcon,
    inflectionsIcon: InflectionsIcon,
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    statusIcon: StatusIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    grammarIcon: GrammarIcon,
    treebankIcon: TreebankIcon,
    wordUsageIcon: WordUsageIcon,
    wordlistIcon: WordlistIcon
  },
  props: {
    visibility: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    changeTab: function (tabName) {
      this.ui.changeTab(tabName)
      this.$emit('drop-down-menu-item-selected')
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-navmenu {
    background: #FFF;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .alpheios-navmenu__item {
    display: flex;
    padding: 10px 20px 10px 30px;
    border-bottom: 1px solid var(--alpheios-color-neutral-light);
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--alpheios-color-vivid-hover);
    }

    &.active {
      color: var(--alpheios-color-vivid);
    }

    & .alpheios-navbuttons__icon,
    &:hover .alpheios-navbuttons__icon,
    &.active:focus .alpheios-navbuttons__icon {
      fill: var(--alpheios-color-vivid);
      stroke: var(--alpheios-color-vivid);
    }

    &:hover .alpheios-navbuttons__icon,
    &:focus .alpheios-navbuttons__icon,
    &.active .alpheios-navbuttons__icon {
      fill: var(--alpheios-color-vivid-hover);
      stroke: var(--alpheios-color-vivid-hover);
    }
  }

  .alpheios-navbuttons__icon-cont {
    flex-grow: 0;
    width: 40px;
    height: 40px;
    margin-right: 40px;
  }

  .alpheios-navbuttons__icon {
    width: 40px;
    height: 40px;
  }

  // Longer selector is to overcome font options' styles
  .alpheios-navmenu div.alpheios-navmenu__text {
    font-size: 20px;
    line-height: 1.2;
    top: 10px;
    position: relative;
  }
</style>
