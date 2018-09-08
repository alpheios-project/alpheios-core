<template>
    <a class="infl-suff-footnote-link"
       @click.stop.prevent="footnotesPopupVisible = true">
        <sup v-for="(footnote, index) in footnotes">
            {{footnote.index}}<template v-if="index < footnotes.length-1">, </template>
        </sup>
        <div v-show="footnotesPopupVisible" class="alpheios-inflections__footnote-popup">
            <div class="alpheios-inflections__footnote-popup-title">Footnotes:</div>
            <template v-for="footnote in footnotes">
                <dt>{{footnote.index}}</dt>
                <dd>{{footnote.text}}</dd>
            </template>
            <div class="alpheios-inflections__footnote-popup-close-btn"
                 @click.stop.prevent="footnotesPopupVisible = false">
                <svg viewBox="0 0 20 20"><path d="M16 16L4 4M16 4L4 16"></path></svg>
            </div>
        </div>
    </a>
</template>
<script>
  import interact from 'interactjs'
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
        footnotesPopupVisible: false,
        draggable: true,
        interactInstance: undefined
      }
    },
    mounted () {
      if (this.draggable) {
        this.interactInstance = interact(this.$el.querySelector('.alpheios-inflections__footnote-popup'))
          .draggable(this.draggableSettings())
      }
    },
    methods: {
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
