<template>
  <a @click.stop.prevent="showPopup"
     class="infl-suff-footnote-link">
    <sup v-for="(footnote, index) in footnotes">
      {{footnote.index}}
      <template v-if="index < footnotes.length-1">,</template>
    </sup>
    <div :style="[popupAlignmentStyles]" class="alpheios-inflections__footnote-popup" v-show="footnotesPopupVisible">
      <div class="alpheios-inflections__footnote-popup-title">Footnotes:</div>
      <template
          v-for="footnote in footnotes"
      >
        <dt>
          {{footnote.index}}
        </dt>
        <dd>
          {{footnote.text}}
        </dd>
      </template>
      <div @click.stop.prevent="hidePopup"
           class="alpheios-inflections__footnote-popup-close-btn">
        <svg viewBox="0 0 20 20">
          <path d="M16 16L4 4M16 4L4 16"></path>
        </svg>
      </div>
    </div>
  </a>
</template>
<script>
import uuidv4 from 'uuid/v4'
import interact from 'interactjs'
import Vue from '@vue-runtime'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'InflFootnote',
  // API modules that are required for this component
  inject: {
    app: 'app'
  },
  storeModules: ['panel'], // Store modules that are required by this component
  mixins: [DependencyCheck],

  visibleUnwatch: null,

  props: {
    footnotes: {
      type: Array,
      required: true
    }
  },
  // An instance of interact.js
  interactInstance: undefined,

  data () {
    return {
      id: uuidv4(),
      target: null,
      footnotesPopupVisible: false,
      draggable: false,
      popupAlignmentStyles: { transform: undefined },
      inflpopup: null,
      inflpanel: null,
      defaultRightPadding: 10,
      defaultLeftPadding: 20
    }
  },
  mounted () {
    this.inflpopup = this.$el.querySelector('.alpheios-inflections__footnote-popup')
    this.inflpanel = this.$el.closest('#alpheios-panel__inflections-panel')

    if (this.app.platform.isMobile) {
      this.$options.visibleUnwatch = this.$store.watch((state) => state.panel.visibleFootnoteId, (id) => {
        if (this.footnotesPopupVisible && id !== this.id) {
          this.hidePopup()
        }
      })
    }
  },
  beforeDestroy () {
    this.$_alpheios_cleanup()
    if (this.$options.visibleUnwatch) {
      this.$options.visibleUnwatch()
    }
  },
  methods: {
    // Named according to Vue style guide: https://vuejs.org/v2/style-guide/#Private-property-names-essential
    $_alpheios_init () {
      if (this.draggable && !this.$options.interactInstance) {
        this.$options.interactInstance = interact(this.inflpopup)
          .draggable(this.draggableSettings())

        this.setTransformPopup('translate(-50%)')
      }
    },

    $_alpheios_cleanup () {
      if (this.$options.interactInstance) {
        this.$options.interactInstance.unset()
        this.$options.interactInstance = null
      }
    },

    setTransformPopup (transformValue) {
      this.popupAlignmentStyles.webkitTransform = transformValue
      this.popupAlignmentStyles.transform = transformValue
    },

    draggableSettings: function () {
      return {
        inertia: true,
        autoScroll: false,
        restrict: {
          restriction: '#alpheios-panel-inner',
          elementRect: { top: 0.5, left: 0.5, bottom: 0.5, right: 0.5 }
        },
        ignoreFrom: 'input, textarea, a[href], select, option',
        onmove: this.dragMoveListener
      }
    },

    dragMoveListener (event) {
      const target = event.target
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      this.setTransformPopup(`translate(${x}px, ${y}px)`)

      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    },

    isOutOfRightXBound (childBR, parentBR) {
      return (childBR.x + childBR.width) > (parentBR.x + parentBR.width)
    },

    isOutOfLeftXBound (childBR, parentBR) {
      return childBR.x < 0
    },

    deltaRightXBound (childBR, parentBR) {
      return this.isOutOfRightXBound(childBR, parentBR)
        ? Math.round((childBR.x + childBR.width) - (parentBR.x + parentBR.width)) + this.defaultRightPadding : 0
    },

    deltaLeftXBound (childBR, parentBR) {
      return this.isOutOfLeftXBound(childBR, parentBR)
        ? Math.round(Math.abs(childBR.x)) - this.defaultLeftPadding : 0
    },

    checkBounds () {
      let popupBR = this.inflpopup.getBoundingClientRect()
      let panelBR = this.inflpanel.getBoundingClientRect()

      if (this.isOutOfRightXBound(popupBR, panelBR)) {
        this.setTransformPopup(`translateX(calc(-50% - ${this.deltaRightXBound(popupBR, panelBR)}px))`)
      } else if (this.isOutOfLeftXBound(popupBR, panelBR)) {
        this.setTransformPopup(`translateX(-${this.deltaLeftXBound(popupBR, panelBR)}px)`)
      }
    },

    showPopup () {
      if (this.app.platform.isDesktop) {
        this.draggable = true
        this.$_alpheios_init()
        Vue.nextTick().then(() => this.checkBounds())
      }
      this.footnotesPopupVisible = true
      this.$store.commit('panel/setVisibleFootnote', this.id)
    },

    hidePopup () {
      this.footnotesPopupVisible = false
      this.$_alpheios_cleanup()
      this.popupAlignmentStyles.transform = undefined
    }
  }
}

</script>

<style lang="scss">
  @import "../../styles/variables";

  .infl-suff-footnote-link {
    position: relative;
  }

  .alpheios-inflections__footnote-popup {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-row-gap: 2px;
    background: #FFF;
    color: var(--alpheios-text-color);
    z-index: 10;
    box-sizing: border-box;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    & dd {
      // Reset browser's default styling
      margin-inline-start: 0;
      padding-left: textsize(10px);
    }

    [data-ap-layout-type="compact"] & {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 50vw;
      border-top: 1px solid var(--alpheios-border-color);
      padding: textsize(30px) 15px 15px uisize(50px);
    }

    [data-ap-layout-type="compact"] .alpheios-panel--left & {
      border-right: 1px solid var(--alpheios-border-color);
    }

    [data-ap-layout-type="compact"] .alpheios-panel--right & {
      left: auto;
      right: 0;
      border-left: 1px solid var(--alpheios-border-color);
    }

    [data-ap-screen-orientation="portrait"][data-ap-layout-type="compact"] &,
    [data-ap-layout-type="compact"] .alpheios-panel--expanded & {
      width: 100vw;
    }

    [data-ap-layout-type="large"] & {
      position: absolute;
      left: 0;
      bottom: 20px;
      min-width: 200px;
      border: 1px solid var(--alpheios-border-color);
      cursor: move;
      padding: 30px 15px 15px;
    }
  }

  .alpheios-inflections__footnote-popup.hidden {
    display: none;
  }

  .alpheios-inflections__footnote-popup-title {
    font-weight: 700;
    position: absolute;
    text-transform: uppercase;
    left: 15px;
    top: uisize(7px);

    [data-ap-layout-type="large"] & {
      left: 15px;
      top: 7px;
    }
  }

  .alpheios-inflections__footnote-popup-close-btn {
    position: absolute;
    right: uisize(5px);
    top: uisize(5px);
    display: block;
    width: uisize(44px);
    height: uisize(44px);
    margin: 0;
    cursor: pointer;
    fill: var(--alpheios-color-neutral-dark);
    stroke: var(--alpheios-color-neutral-dark);

    [data-ap-layout-type="large"] & {
      width: 20px;
      height: 20px;
    }
  }

  .alpheios-inflections__footnote-popup-close-btn:hover,
  .alpheios-inflections__footnote-popup-close-btn:active {
    fill: var(--alpheios-color-neutral-light);
    stroke: var(--alpheios-color-neutral-light);
  }
</style>
