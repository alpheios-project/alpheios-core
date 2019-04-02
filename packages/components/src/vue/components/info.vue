<template>
  <div class="alpheios-info">
    <div class="alpheios-info__versiontext alpheios-text__smallest">{{ app.name }} {{ app.version }}
    </div>
    <div class="alpheios-info__currentlanguage alpheios-text__smallest">{{ l10n.getMsg('LABEL_INFO_CURRENTLANGUAGE') }}
      {{ $store.state.app.currentLanguageName }}
    </div>
    <div class="alpheios-info__helptext">
      <h3>{{ l10n.getMsg('TEXT_INFO_GETTINGSTARTED') }}</h3>
      <p class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_ACTIVATE') }}</p>
      <p class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_CLICK') }}</p>
      <p class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_LANGDETECT') }}</p>
      <p class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_SETTINGS') }}</p>
      <p class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_ARROW') }}</p>
      <p class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_REOPEN') }}</p>
      <p class="alpheios-text__small">{{ l10n.getMsg('TEXT_INFO_DEACTIVATE') }}</p>
    </div>
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Info',
  inject: ['app', 'l10n'],
  storeModules: ['app'],
  mixins: [DependencyCheck]
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-info {
    font-family: $alpheios-font-family;
    font-size: $alpheios-base-font-size;
    color: $alpheios-copy-color;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .alpheios-info .alpheios-info__helptext p {
    font-size: 0.875*$alpheios-base-font-size;
    font-family: $alpheios-font-family;
    font-size: $alpheios-base-font-size;
    color: $alpheios-copy-color;
  }

  .alpheios-info .alpheios-info__versiontext {
    font-size: 0.675*$alpheios-base-font-size;
  }

  .alpheios-info__currentlanguage {
    font-size: 0.675*$alpheios-base-font-size;
    font-weight: bold;
  }

  .alpheios-info__helptext {
    margin-top: 1em;
  }

</style>
