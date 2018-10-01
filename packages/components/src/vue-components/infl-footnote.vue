<template>
    <a class="infl-suff-footnote-link"
       @click.stop.prevent="showPopup">
        <sup v-for="(footnote, index) in footnotes">
            {{footnote.index}}<template v-if="index < footnotes.length-1">, </template>
        </sup>
        <div v-show="footnotesPopupVisible" class="alpheios-inflections__footnote-popup" :style="[popupAlignmentStyles]">
            <div class="alpheios-inflections__footnote-popup-title">Footnotes:</div>
            <template v-for="footnote in footnotes">
                <dt>{{footnote.index}}</dt>
                <dd>{{footnote.text}}</dd>
            </template>
            <div class="alpheios-inflections__footnote-popup-close-btn"
                 @click.stop.prevent="hidePopup">
                <svg viewBox="0 0 20 20"><path d="M16 16L4 4M16 4L4 16"></path></svg>
            </div>
        </div>
    </a>
</template>
<script>
  import interact from 'interactjs'
  import Vue from 'vue/dist/vue'

  export default {
    name: 'InflFootnote',
    props: {
      footnotes: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        target: null,
        footnotesPopupVisible: false,
        draggable: true,
        interactInstance: null,
        popupAlignmentStyles: {transform: undefined},
        inflpopup: null,
        inflpanel: null,
        defaultRightPadding: 10,
        defaultLeftPadding: 20
      }
    },
    mounted () {
      this.target = this.$el.querySelector('.alpheios-inflections__footnote-popup')
    },
    beforeDestroy () {
      this.$_alpheios_cleanup()
    },
    methods: {
      // Named according to Vue style guide: https://vuejs.org/v2/style-guide/#Private-property-names-essential
      $_alpheios_init () {
        if (this.draggable && !this.interactInstance) {
          this.interactInstance = interact(this.target)
            .draggable(this.draggableSettings())
        }
      },

      $_alpheios_cleanup () {
        if (this.interactInstance) {
          this.interactInstance.unset()
        }
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

        target.style.webkitTransform = `translate(${x}px, ${y}px)`
        target.style.transform = `translate(${x}px, ${y}px)`

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      },

      isOutOfRightXBound(childBR, parentBR) {
        return (childBR.x + childBR.width) > (parentBR.x + parentBR.width)
      },

      isOutOfLeftXBound(childBR, parentBR) {
        return childBR.x < 0
      },

      deltaRightXBound(childBR, parentBR) {
        return this.isOutOfRightXBound(childBR, parentBR) ?
               Math.round((childBR.x + childBR.width) - (parentBR.x + parentBR.width)) + this.defaultRightPadding: 0
      },

      deltaLeftXBound(childBR, parentBR) {
        return this.isOutOfLeftXBound(childBR, parentBR) ?
               Math.round(Math.abs(childBR.x)) - this.defaultLeftPadding : 0
      },

      checkBounds () {
        if (!this.inflpopup) {
          this.inflpopup = this.$el.querySelector('.alpheios-inflections__footnote-popup')
        }
        if (!this.inflpanel) {
          this.inflpanel = this.$el.closest('#alpheios-panel__inflections-panel')
        }

        let popupBR = this.inflpopup.getBoundingClientRect()
        let panelBR = this.inflpanel.getBoundingClientRect()

        if (this.isOutOfRightXBound(popupBR, panelBR)) {
          this.popupAlignmentStyles.transform = 'translateX(calc(-50% - ' + this.deltaRightXBound(popupBR, panelBR) + 'px))'
        } else if (this.isOutOfLeftXBound(popupBR, panelBR)) {
          this.popupAlignmentStyles.transform = 'translateX(-' + this.deltaLeftXBound(popupBR, panelBR) + 'px)'
        }
      },

      showPopup () {
        this.$_alpheios_init()
        this.footnotesPopupVisible = true
        Vue.nextTick().then(() => this.checkBounds())
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
    .infl-suff-footnote-link {
        position: relative;
    }
    .alpheios-inflections__footnote-popup {
    	cursor: move;
    }
</style>
