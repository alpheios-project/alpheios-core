<template>
  <div class="alpheios-embed-lib-warning" v-show="visible">
    {{text}}
    <span @click="close" class="alpheios-embed-lib-warning__close">
            <close-icon></close-icon>
        </span>
  </div>
</template>
<script>
import CloseIcon from '../../images/inline-icons/close.svg'

export default {
  name: 'EmbedLibWarning',
  components: {
    closeIcon: CloseIcon
  },
  props: ['text'],
  data: function () {
    return {
      visible: true
    }
  },
  methods: {
    close: function () {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-embed-lib-warning {
    background: $alpheios-icon-color;
    color: $alpheios-headers-color;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 16px;
    position: fixed;
    top: 0;
    left: 0;
    padding: 5px 30px 5px 20px;
    z-index: 1000000
  }

  .alpheios-embed-lib-warning__close {
    cursor: pointer;
    height: 20px;
    width: 20px;
    font-size: 16px;
    line-height: normal;
    stroke-width: 2;
    stroke: $alpheios-copy-color;
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
