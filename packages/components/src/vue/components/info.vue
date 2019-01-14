<template>
  <div class="alpheios-info uk-margin">
    <div class="alpheios-info__versiontext alpheios-text__smallest" v-if="data.appInfo">{{ data.appInfo.name }} {{
      data.appInfo.version }}
    </div>
    <div class="alpheios-info__currentlanguage alpheios-text__smallest">{{ l10n.getMsg('LABEL_INFO_CURRENTLANGUAGE') }}
      {{ data.languageName }}
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
export default {
  name: 'Info',
  inject: ['l10n'],
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-info {
    font-family: $alpheios-font-family;
    font-size: $alpheios-base-font-size;
    color: $alpheios-copy-color;
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
