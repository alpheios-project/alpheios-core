<template>
  <div class="alpheios-grammar" v-if="res">
    <div class="alpheios-grammar__frame-cont" v-show="res.url">
      <iframe :src="res.url" class="alpheios-grammar__frame" scrolling="yes" v-if="res.url"></iframe>
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
  @import "../../styles/alpheios";

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
