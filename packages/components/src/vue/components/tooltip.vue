<template>
  <div class="alph_tooltip">
    <slot></slot>
    <span class="tooltiptext alpheios-text__smaller"
          v-bind:class="directionClass"
          v-bind:style="additionalStyles"
          v-if="tooltipText"
    >
      {{ tooltipText }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'tooltip',
  props: {
    tooltipDirection: {
      type: String,
      required: false,
      default: 'bottom'
    },
    tooltipText: {
      type: String,
      required: true
    },
    additionalStyles: {
      type: Object,
      required: false
    }
  },
  computed: {
    directionClass: function () {
      const tooltipDirection = this.tooltipDirection.toLowerCase()

      switch (tooltipDirection) {
        case 'top':
          return { 'alph_tooltip-top': true }
        case 'bottom':
          return { 'alph_tooltip-bottom': true }
        case 'bottom-wide':
          return { 'alph_tooltip-bottom-wide': true }
        case 'bottom-narrow':
          return { 'alph_tooltip-bottom-narrow': true }
        case 'bottom-narrow2':
          return { 'alph_tooltip-bottom-narrow2': true }
        case 'left':
          return { 'alph_tooltip-left': true }
        case 'right':
          return { 'alph_tooltip-right': true }
        case 'bottom-right':
          return { 'alph_tooltip-bottom-right': true }
        case 'top-right':
          return { 'alph_tooltip-top-right': true }
        case 'top-left':
          return { 'alph_tooltip-top-left': true }
        default:
          return { 'alph_tooltip-bottom': true }
      }
    }
  }
}
</script>
<style lang="scss">
</style>
