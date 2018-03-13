<template>
  <div class="alpheios-grammar">
    <iframe class="alpheios-grammar__frame" :src="res.url"></iframe>
    <div class="alpheios-grammar__provider" v-if="res.provider">{{ res.provider.toString() }}</div>
  </div>
</template>
<script>
  export default {
    name: 'Grammar',
    props: {
      res: {
        type: Object,
        required: true
      },
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-grammar {
        display: flex;
        flex-direction: column;
    }

    .alpheios-grammar__provider {
        flex: 1 1 auto;
        font-size: 0.75*$alpheios-base-font-size;
        font-weight: normal;
        color: $alpheios-toolbar-color;
        font-style: italic;
        padding: 5px;
    }

    .alpheios-grammar__frame {
        flex: 1 1 100vh;
    }
</style>
