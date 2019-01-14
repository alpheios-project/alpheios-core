<template>
    <div>
        {{ worditem.targetWord }}
    </div>
</template>
<script>
  export default {
    name: 'WordItemPanel',
    props: {
      worditem: {
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
</style>
