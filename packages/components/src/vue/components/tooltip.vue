<template>
  <div class="alph_tooltip">
    <slot></slot>
    <span class = "tooltiptext alpheios-text__smaller"
          v-bind:class = "directionClass"
          v-bind:style = "additionalStyles"
          v-show = "tooltipText"
          v-if = "renderTooltip"
    >
      {{ tooltipText }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'tooltip',
  inject: ['app'],
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
    renderTooltip () {
      return !this.app || (this.app && this.app.platform && !this.app.platform.isMobile)
    },
    directionClass () {
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
        case 'bottom-left':
          return { 'alph_tooltip-bottom-left': true }
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
  @import "../../styles/variables";

  .alph_tooltip {
    position: relative;
    display: inline-block;

    .tooltiptext {
      visibility: hidden;
      position: absolute;
      width: uisize(120px);
      background-color: var(--alpheios-text-bg-color);
      color: var(--alpheios-text-color);
      text-align: center;
      padding: uisize(6px) 0;
      border: 1px solid var(--alpheios-border-color);
      border-radius: uisize(10px);
      z-index: 1;
      opacity: 0;
      transition: opacity .6s;

      font-size: textsize(12px);
      display: none;
    }
  }

  .alph_tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    display: inline;
  }

  .alph_tooltip-top {
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
  }

  .alph_tooltip-top::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--alpheios-border-color) transparent transparent transparent;
  }

  .alph_tooltip-top-right {
    bottom: 125%;
    right: 0;
    margin-left: -50%;
  }

  .alph_tooltip-top-right::after {
    content: "";
    position: absolute;
    top: 100%;
    right: 15%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--alpheios-border-color) transparent transparent transparent;
  }

  .alph_tooltip-top-left {
    bottom: 125%;
    left: 0;
  }

  .alph_tooltip-top-left::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    margin-left: 5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--alpheios-border-color) transparent transparent transparent;
  }

  .alph_tooltip-right {
    top: 50%;
    transform: translateY(-50%);
    left: 125%;
  }

  .alph_tooltip-right::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent var(--alpheios-border-color) transparent transparent;
  }

  .alph_tooltip-bottom {
    top: 135%;
    left: 50%;
    margin-left: -50%;
  }

  .alph_tooltip-bottom-wide {
    top: 135%;
    left: -30%;
  }

  .alph_tooltip-bottom-narrow {
    top: 135%;
    left: -75%;
  }

  .alph_tooltip-bottom-narrow2 {
    top: 135%;
    left: -165%;
  }

  .alph_tooltip-bottom::after,
  .alph_tooltip-bottom-wide::after,
  .alph_tooltip-bottom-narrow::after,
  .alph_tooltip-bottom-narrow2::after  {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent var(--alpheios-border-color) transparent;
  }

  .alph_tooltip-bottom-right {
    top: 135%;
    right: 0;
    margin-left: -50%;
  }

  .alph_tooltip-bottom-right::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 15%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent var(--alpheios-border-color) transparent;
  }

  .alph_tooltip-bottom-left {
    top: 135%;
    right: 0;
    left: auto;
  }

  .alph_tooltip-bottom-left::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 15%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent var(--alpheios-border-color) transparent;
  }

  .alpheios-panel--right {
    .alph_tooltip-bottom-right {
      top: 135%;
      right: auto;
      margin-left:0;
      left: 0
    }
    .alph_tooltip-bottom-right::after {
      margin-left:0;
      right: auto;
      left: 15%;
    }
  }

  .alph_tooltip-left {
    top: 50%;
    transform: translateY(-50%);
    bottom: auto;
    right: 128%;
  }

  .alph_tooltip-left::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent var(--alpheios-border-color);
  }
</style>
