<template>
  <div class="alpheios-grammar">
    <div class="alpheios-grammar__button--back-block">
      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_BACK_TO_INDEX')" tooltipDirection="bottom-left">
        <button @click="returnToIndex" class="alpheios-button-primary alpheios-svg-index"><back-icon /></button>
      </alph-tooltip>
    </div>
    <div class="alpheios-grammar__frame-cont" v-if="this.hasGrammarResUrl">
      <iframe :src="$store.state.app.grammarRes.url" class="alpheios-grammar__frame" scrolling="yes"></iframe>
    </div>
    <div class="alpheios-grammar__provider" v-show="this.hasGrammarProvider">{{ grammarProvider }}</div>
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
import BackIcon from '@/images/inline-icons/back.svg'
import Tooltip from './tooltip.vue'

export default {
  name: 'Grammar',
  inject: ['l10n', 'app'],
  storeModules: ['app'],
  mixins: [DependencyCheck],
  components: {
    backIcon: BackIcon,
    alphTooltip: Tooltip
  },
  computed: {
    hasGrammarResUrl: function () {
      return Boolean(this.$store.state.app.grammarRes && this.$store.state.app.grammarRes.url)
    },

    hasGrammarProvider: function () {
      return Boolean(this.$store.state.app.grammarRes && this.$store.state.app.grammarRes.provider)
    },

    grammarProvider: function () {
      return this.hasGrammarProvider ? this.$store.state.app.grammarRes.provider.toString() : ''
    }
  },
  methods: {
    returnToIndex () {
      this.app.restoreGrammarIndex()
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-grammar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .alpheios-grammar__provider {
    flex: none;
    font-weight: normal;
    padding: 20px 25px 20px;
    font-size: 80%;
  }

  .alpheios-grammar__frame-cont {
    flex: 1 1 auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    flex-direction: column;
  }

  .alpheios-grammar__frame {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
  }

  .alpheios-grammar__button--back-block {
    position: absolute;
    top: 5px;
    right: 20px;
    z-index: 1000;
  }
  .alpheios-svg-index {
    display: block;
    padding: 4px;
    border-radius: 15px;
    opacity: 0.5;
    svg {
      width: 22px;
      height: auto;
      fill: var(--alpheios-btn-primary-font-color);
    }
  }

  .alpheios-grammar__button--back-block button {
    color: var(--alpheios-grammar-back-button-color);
    background-color: var(--alpheios-grammar-back-button-bg);
    border-color: var(--alpheios-grammar-back-button-border-color);
    
    &:hover {
      color: var(--alpheios-grammar-back-button-color-hover);
      background-color: var(--alpheios-grammar-back-button-bg-hover);
      border-color: var(--alpheios-grammar-back-button-border-color-hover);
    }
  }

</style>
