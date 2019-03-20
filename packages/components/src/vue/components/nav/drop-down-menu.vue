<template>
  <div class="alpheios-navmenu" v-show="visible">
    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('info') }"
         @click="changeTab('info')">
      <div class="alpheios-navbuttons__icon-cont">
        <info-icon class="alpheios-navbuttons__icon"></info-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_HELP') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('morphology') }"
         @click="changeTab('morphology')">
      <div class="alpheios-navbuttons__icon-cont">
        <morphology-icon class="alpheios-navbuttons__icon"></morphology-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_MORPHOLOGY') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('definitions') }"
         @click="changeTab('definitions')" v-show="$store.getters['app/defDataReady']">
      <div class="alpheios-navbuttons__icon-cont">
        <definitions-icon class="alpheios-navbuttons__icon"></definitions-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_DEFINITIONS') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('inflections') }"
         v-show="$store.getters[`app/hasInflData`]" @click="changeTab('inflections')">
      <div class="alpheios-navbuttons__icon-cont">
        <inflections-icon class="alpheios-navbuttons__icon"></inflections-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_INFLECT') }}</div>
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

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('treebank') }"
         v-show="$store.getters['app/hasTreebankData']" @click="changeTab('treebank')">
      <div class="alpheios-navbuttons__icon-cont">
        <treebank-icon class="alpheios-navbuttons__icon"></treebank-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_TREEBANK') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('options') }"
         @click="changeTab('options')">
      <div  class="alpheios-navbuttons__icon-cont">
        <options-icon class="alpheios-navbuttons__icon"></options-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_OPTIONS') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('user') }"
         v-if="Boolean(auth)" @click="changeTab('user')">
      <div class="alpheios-navbuttons__icon-cont">
        <user-icon class="alpheios-navbuttons__icon"></user-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_USER') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('wordUsage') }"
         v-show="$store.state.app.wordUsageExamplesReady" @click="changeTab('wordUsage')">
      <div class="alpheios-navbuttons__icon-cont">
        <word-usage-icon class="alpheios-navbuttons__icon"></word-usage-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_WORD_USAGE') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('wordlist') }"
         v-show="this.$store.state.app.wordListUpdateTime && this.app.wordlistC && Object.keys(this.app.wordlistC.wordLists).length > 0"
         @click="changeTab('wordlist')">
      <div  class="alpheios-navbuttons__icon-cont">
        <wordlist-icon class="alpheios-navbuttons__icon"></wordlist-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_WORDLIST') }}</div>
    </div>

    <div class="alpheios-navmenu__item" :class="{ active: $store.getters['ui/isActiveTab']('status') }"
         v-show="this.settings.contentOptions.items.verboseMode.currentValue === `verbose`"
         @click="changeTab('status')">
      <div class="alpheios-navbuttons__icon-cont">
        <status-icon class="alpheios-navbuttons__icon"></status-icon>
      </div>
      <div class="alpheios-navmenu__text">{{ l10n.getText('TOOLTIP_HELP') }}</div>
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
import InfoIcon from '@/images/inline-icons/info.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import WordUsageIcon from '@/images/inline-icons/books-stack.svg'

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
    infoIcon: InfoIcon,
    grammarIcon: GrammarIcon,
    treebankIcon: TreebankIcon,
    wordUsageIcon: WordUsageIcon,
    wordlistIcon: WordlistIcon
  },
  tabChangeUnwatch: null, // Will hold a function for removal of a tab change watcher

  props: {
    visibility: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: function () {
    return {
      visible: false
    }
  },

  watch: {
    visibility: function () {
      // If visibility is changed it means a menu button is clicked.
      // We'll toggle visibility in a response to that.
      this.visible = !this.visible
    }
  },

  methods: {
    changeTab: function (tabName) {
      this.ui.changeTab(tabName)
      this.visible = false // Close the menu panel
    }
  },

  mounted: function () {
    this.$options.tabChangeUnwatch = this.$store.watch((state, getters) => state.ui.activeTab, (tabName) => {
      this.visible = false // Close the menu panel
    })
  },

  beforeDestroy: function () {
    this.$options.tabChangeUnwatch()
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-navmenu {
    position: absolute;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFF;
    display: flex;
    flex-direction: column;
  }

  .alpheios-navmenu__item {
    display: flex;
    padding: 10px 20px 10px 30px;
    border-bottom: 1px solid $alpheios-link-color-dark-bg;
    cursor: pointer;
  }

  .alpheios-navmenu__item:hover,
  .alpheios-navmenu__item:focus {
    color: $alpheios-link-hover-color;
  }

  .alpheios-navmenu__item .alpheios-navbuttons__icon,
  .alpheios-navmenu__item.active:hover .alpheios-navbuttons__icon,
  .alpheios-navmenu__item.active:focus .alpheios-navbuttons__icon {
    fill: $alpheios-link-color-dark-bg;
    stroke: $alpheios-link-color-dark-bg;
  }

  .alpheios-navmenu__item:hover .alpheios-navbuttons__icon,
  .alpheios-navmenu__item:focus .alpheios-navbuttons__icon,
  .alpheios-navmenu__item.active .alpheios-navbuttons__icon {
    fill: $alpheios-link-hover-color;
    stroke: $alpheios-link-hover-color;
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
