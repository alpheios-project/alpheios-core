<template>
  <div class="alpheios-info uk-margin">
    <div class="alpheios-info__versiontext alpheios-text__smallest" v-if="data.appInfo">{{ data.appInfo.name }} {{
      data.appInfo.version }}
    </div>
    <div class="alpheios-info__currentlanguage alpheios-text__smallest">{{ messages.LABEL_INFO_CURRENTLANGUAGE.get() }}
      {{ data.languageName }}
    </div>
    <div class="alpheios-info__helptext">
      <h3>{{ messages.TEXT_INFO_GETTINGSTARTED.get() }}</h3>
      <p class="alpheios-text__small">{{ messages.TEXT_INFO_ACTIVATE.get() }}</p>
      <p class="alpheios-text__small">{{ messages.TEXT_INFO_CLICK.get() }}</p>
      <p class="alpheios-text__small">{{ messages.TEXT_INFO_LANGDETECT.get() }}</p>
      <p class="alpheios-text__small">{{ messages.TEXT_INFO_SETTINGS.get() }}</p>
      <p class="alpheios-text__small">{{ messages.TEXT_INFO_ARROW.get() }}</p>
      <p class="alpheios-text__small">{{ messages.TEXT_INFO_REOPEN.get() }}</p>
      <p class="alpheios-text__small">{{ messages.TEXT_INFO_DEACTIVATE.get() }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Info',
  props: {
    data: {
      type: Object,
      required: true
    },
    messages: {
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
