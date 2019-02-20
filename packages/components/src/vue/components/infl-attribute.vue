<template>
  <span>
    [Inflection attribute]
  <span :class="attributeClass(type)" :data-feature="type" :data-grouplevel="grouplevel"
        @click="sendFeature(data[type],['alpheios-text__medium'])" v-html="decorate(data,type)" v-if="data[type]"></span>
    [Inflection attribute end]
    </span>
</template>
<script>
export default {
  name: 'InflectionAttribute',
  inject: ['l10n'],
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
    linkedfeatures: {
      type: Array,
      required: false,
      default: () => []
    },
    decorators: {
      type: Array,
      required: false,
      default: () => ['']
    }
  },
  methods: {
    attributeClass (featureType, ...extras) {
      let classList = []
      if (this.linkedfeatures.includes(featureType)) {
        classList.push('alpheios-morph__linkedattr')
      } else {
        classList.push('alpheios-morph__attr')
      }
      classList.push(...extras)
      return classList.join(' ')
    },
    decorate (data, type) {
      let baseValues = []
      let decoratedValues = []
      if (typeof (data[type]) === 'string') {
        baseValues = [data[type]]
      } else {
        baseValues = data[type].values
      }
      for (let v of baseValues) {
        let decorated = v
        if (this.decorators.includes('abbreviate') && this.l10n.hasMsg(v)) {
          decorated = this.l10n.getAbbr(v)
        }
        if (this.decorators.includes('link') && decorated.match(/^http/)) {
          let linkText = this.l10n.hasMsg(`INFL_ATTRIBUTE_LINK_TEXT_TYPE`) ? this.l10n.getMsg(`INFL_ATTRIBUTE_LINK_TEXT_TYPE`) : type
          decorated = `<a class="alpheios-morph__linkedattr" target="_blank" href="${decorated}">${linkText}</a>`
        }
        decoratedValues.push(decorated)
      }
      let decorated = decoratedValues.join(' ')
      if (this.decorators.includes('appendtype')) {
        decorated = `${decorated} ${type}`
      }
      if (this.decorators.includes('parenthesize')) {
        decorated = `(${decorated})`
      }
      if (this.decorators.includes('brackets')) {
        decorated = `[${decorated}]`
      }
      return decorated
    },
    sendFeature (features) {
      console.log(`SendFeature called`)
      let tosend = features

      if (Array.isArray(features)) {
        // TODO eventually we should support multiple features but
        // for the moment just send the first
        tosend = features[0]
      }
      if (this.linkedfeatures.includes(tosend.type)) {
        this.$emit('sendfeature', tosend)
      } else return false
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

</style>
