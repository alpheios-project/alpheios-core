<template>
  <div class="alpheios-grammar">
    <div class="alpheios-grammar__frame-cont">
      <iframe class="alpheios-grammar__frame" :src="res.url" scrolling="yes"></iframe>
    </div>
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
      }
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

    .alpheios-grammar__frame-cont {
        flex: 1 1 100vh;
        position: relative;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
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
</style>
