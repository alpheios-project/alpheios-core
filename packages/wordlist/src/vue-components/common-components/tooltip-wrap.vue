<template>
  <div class="alpheios-tooltip" :style="additionalStyles">
    <slot></slot>
    <span 
      class = "alpheios-tooltip__text"
      :class="finalTooltipDirection"
      v-if="tooltipText"
    >
      {{ tooltipText }}
    </span>
  </div>
</template>
<script>
  export default {
    name: 'TooltipWrap',
    data () {
      return {
        allowedTooltipClasses: [
          'alpheios-tooltip__top', 'alpheios-tooltip__top-right', 'alpheios-tooltip__top-left', 
          'alpheios-tooltip__bottom', 'alpheios-tooltip__bottom-right', 'alpheios-tooltip__bottom-wide', 
          'alpheios-tooltip__bottom-narrow', 'alpheios-tooltip__bottom-narrow2',
          'alpheios-tooltip__left', 'alpheios-tooltip__right'
        ],
        defaultTooltipClass: 'alpheios-tooltip__bottom'
      }
    },
    props: {
      tooltipText: {
        type: String,
        required: true
      },
      tooltipDirection: {
        type: String,
        required: false
      },
      additionalStyles: {
        type: Object,
        required: false
      }
    },
    computed: {
      tooltipDirectionLC: function () {
        return this.tooltipDirection ? this.tooltipDirection.toLowerCase() : ''
      },
      tooltipDirectionClass: function () {
        return 'alpheios-tooltip__' + this.tooltipDirectionLC
      },
      finalTooltipDirection: function() {
        return (this.allowedTooltipClasses.indexOf(this.tooltipDirectionClass) > -1) ? this.tooltipDirectionClass : this.defaultTooltipClass
      }
    }
  }
</script>
<style lang="scss">

</style>
