<template>
  <span :class="attributeClass(type)" :data-feature="type" :data-grouplevel="grouplevel"
        @click="sendFeature(data[type])" v-html="decorate(data,type)" v-if="data[type]"
        :lang="lang"
        ></span>
</template>
<script>
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'InflectionAttribute',
  inject: ['app', 'l10n'],
  storeModules: ['app'],
  mixins: [DependencyCheck],
  props: {
    data: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    grouplevel: {
      type: Number,
      required: false,
      default: () => 0
    },
    decorators: {
      type: Array,
      required: false,
      default: () => ['']
    },
    lang: {
      type: String,
      required: false
    }
  },
  methods: {
    attributeClass (featureType, ...extras) {
      let classList = [] // eslint-disable-line prefer-const
      if (this.$store.state.app.linkedFeatures.includes(featureType)) {
        classList.push('alpheios-morph__linkedattr')
      } else {
        classList.push('alpheios-morph__attr')
      }
      classList.push(...extras)
      return classList.join(' ')
    },
    decorate (data, type) {
      // Values that contain no information should not be shown in the UI
      const valuesToSkip = ['(null)']

      let baseValues = []
      let decoratedValues = [] // eslint-disable-line prefer-const
      if (typeof (data[type]) === 'string') {
        baseValues = [data[type]]
      } else {
        baseValues = data[type].values
      }
      // Skip empty values
      baseValues = baseValues.filter(value => !valuesToSkip.includes(value))
      for (const v of baseValues) {
        let decorated = v
        if (this.decorators.includes('abbreviate') && this.l10n.hasMsg(v)) {
          decorated = this.l10n.getAbbr(v)
        }
        else if (this.decorators.includes('link') && decorated.match(/^http/)) {
          const linkText = this.l10n.hasMsg('INFL_ATTRIBUTE_LINK_TEXT_TYPE') ? this.l10n.getMsg('INFL_ATTRIBUTE_LINK_TEXT_TYPE') : type
          decorated = `<a class="alpheios-morph__linkedattr" target="_blank" href="${decorated}">${linkText}</a>`
        } else if (this.l10n.hasMsg(v)) {
          decorated = this.l10n.getMsg(v)
        }
        decoratedValues.push(decorated)
      }
      let decorated = decoratedValues.join(' ')
      if (this.decorators.includes('appendtype')) {
        decorated = this.l10n.hasMsg(`append_${type}`) ?
          this.l10n.getMsg(`append_${type}`,{ data: decorated }) : `${decorated} ${type}`
      }
      if (this.decorators.includes('prefixtype')) {
        decorated = this.l10n.hasMsg(`prefix_${type}`) ?
          this.l10n.getMsg(`prefix_${type}`,{ data: decorated }) : `${type} ${decorated}`
      }
      if (this.decorators.includes('parenthesize')) {
        decorated = `(${decorated})`
      }
      if (this.decorators.includes('brackets')) {
        if (!this.decorators.includes('appendspace')) {
          decorated = `[${decorated}]`
        } else {
          const formattedDecoratedArr = decoratedValues.map(val => `[${val}]`)
          decorated = formattedDecoratedArr.join(' ')
        }
      }

      if (this.decorators.includes('chinese')) {
        decorated = decorated.replace('mandarin', '<i>mandarin</i>')
        decorated = decorated.replace('cantonese', '<i>cantonese</i>')
        decorated = decorated.replace('tang', '<i>tang</i>')
      }
      return decorated
    },
    sendFeature (features) {
      let tosend = features

      if (Array.isArray(features)) {
        // TODO eventually we should support multiple features but
        // for the moment just send the first
        tosend = features[0]
      }
      if (this.$store.state.app.linkedFeatures.includes(tosend.type)) {
        this.app.sendFeature(tosend)
      } else return false
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";
  #{$alpheios-namespace} {
    // These rules intentionally use an increased specificity to fight the style leakage
    .alpheios-inflections-list__inflgroup,
    .alpheios-inflections-list__inflections {
      span.alpheios-morph__attr {
        font-weight: 400;
        padding-right: .25em;
      }

      span.alpheios-morph__linkedattr {
        @include alpheios-interactive;
        font-weight: 700;
        color: var(--alpheios-desktop-popup-link-color);
        padding-right: .25em;

        &:hover {
          color: var(--alpheios-desktop-popup-link-color-hover);
        }
      }
    }
  }
</style>
