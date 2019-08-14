<template>
  <div class="alpheios-info">
    <div class="alpheios-info__faq">
      <a :href="faqLink" target="_blank">
        <button class="alpheios-button-tertiary">
          {{ l10n.getMsg(`LABEL_INFO_FAQ`) }}
        </button>
      </a>
    </div>
    <div class="alpheios-info__helptext">
      <div
          class="alpheios-notification-area__close-btn"
      <h3>{{ l10n.getMsg('TEXT_INFO_GETTINGSTARTED') }}</h3>
      <div class="alpheios-info__helpitem alpheios-info__helpitem__logo" v-show="! $store.state.app.embedLibActive">
        <span class="alpheios-info__helpicon"><logo-icon></logo-icon></span>
        <span class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_ACTIVATE') }}</span>
      </div>
      <div class="alpheios-info__helpitem">
        <span class="alpheios-info__helpicon"><tap-gesture-icon></tap-gesture-icon></span>
        <span class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_CLICK') }}</span>
      </div>
      <div class="alpheios-info__helpitem">
        <span class="alpheios-info__helpicon"><lookup-icon></lookup-icon></span>
        <span class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_LOOKUP') }}</span>
      </div>
      <div class="alpheios-info__helpitem">
        <span class="alpheios-info__helpicon"><reading-tools-icon></reading-tools-icon></span>
        <span class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_TOOLBAR') }}</span>
      </div>
      <div class="alpheios-info__helpitem">
        <span class="alpheios-info__helpicon"><swap-position></swap-position></span>
        <span class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_ARROW') }}</span>
      </div>
    </div>
    <h3>{{ l10n.getMsg('TEXT_INFO_TIPS') }}</h3>
    <p class="alpheios-text-small" v-html="l10n.getMsg('TEXT_INFO_LANGDETECT', {languageName: defaultLanguage})"></p>
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
import ReadingToolsIcon from '@/images/inline-icons/reading-tools.svg'
import LookupIcon from '@/images/inline-icons/lookup.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import LogoIcon from '@/images/alpheios/logo.svg'
import SwapPosition from '@/images/inline-icons/swap-horizontally.svg'
import TapGestureIcon from '@/images/inline-icons/tap-gesture-icon.svg'

export default {
  name: 'Info',
  inject: ['app', 'l10n'],
  storeModules: ['app'],
  components: {
    optionsIcon: OptionsIcon,
    readingToolsIcon: ReadingToolsIcon,
    lookupIcon: LookupIcon,
    logoIcon: LogoIcon,
    swapPosition: SwapPosition,
    tapGestureIcon: TapGestureIcon
  },
  mixins: [DependencyCheck],
  computed: {
    defaultLanguage () {
      return this.app.getLanguageName(this.app.getDefaultLangCode()).name
    },
    faqLink() {
      if (this.$store.state.app.embedLibActive) {
        return "https://alpheios.net/pages/v3/faq-embedded"
      } else {
        return "https://alpheios.net/pages/v3/faq-extension"
      }
    }

  }

}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-info {
    color: var(--alpheios-text-color);
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .alpheios-info__currentlanguage {
    font-size: textsize(12px);
    font-weight: bold;
  }

  .alpheios-info__helptext {
    margin-top: 1em;
  }
  .alpheios-info__helpitem {
    display: flex;
    column-count: 2;
    align-items: center;
    margin-bottom: 1em;


    & .alpheios-info__helpicon {
      padding-right: 15px;
      height: 44px;

      svg {
        width: uisize(20px);
        height: uisize(20px);
        position: relative;
        fill: var(--alpheios-compact-toolbar-bg);
        stroke: var(--alpheios-compact-toolbar-bg);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        .svg-logo-bg {
          fill: var(--alpheios-color-light);
        }
        .svg-logo-lines {
          fill: var(--alpheios-compact-toolbar-bg);
        }
      }
    }
  }
  .alpheios-info__languagenotification {
    color: var(--alpheios-notification-important-color);
  }

  .alpheios-info__faq {
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
  }

</style>
