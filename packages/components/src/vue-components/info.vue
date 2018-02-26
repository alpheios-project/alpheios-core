<template>
  <div class="alpheios-info uk-margin">
    <div class="alpheios-info__versiontext">{{ data.manifest.name }} {{ data.manifest.version }}</div>
    <div class="alpheios-info__currentlanguage">{{ messages.LABEL_INFO_CURRENTLANGUAGE }} {{ data.languageName }}</div>
    <div class="alpheios-info__helptext">
      <h3>{{ messages.TEXT_INFO_GETTINGSTARTED }}</h3>
      <p>{{ messages.TEXT_INFO_ACTIVATE }}</p>
      <p>{{ messages.TEXT_INFO_CLICK }}</p>
      <p>{{ messages.TEXT_INFO_LANGDETECT }}</p>
      <p>{{ messages.TEXT_INFO_SETTINGS }}</p>
      <p>{{ messages.TEXT_INFO_ARROW }}</p>
      <p>{{ messages.TEXT_INFO_REOPEN }}</p>
      <p>{{ messages.TEXT_INFO_DEACTIVATE }}</p>
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
  @import "../styles/alpheios";

  .alpheios-info {
    font-family: $alpheios-font-family !important;
    font-size: $alpheios-base-font-size !important;
    color: $alpheios-copy-color !important;
  }

  .alpheios-info .alpheios-info__helptext p {
    font-size: 0.875*$alpheios-base-font-size;
    font-family: $alpheios-font-family !important;
    font-size: $alpheios-base-font-size !important;
    color: $alpheios-copy-color !important;
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
