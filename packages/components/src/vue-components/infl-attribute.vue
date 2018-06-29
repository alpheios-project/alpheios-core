<template>
  <span @click="sendFeature(data[type],['alpheios-text__medium'])" :class="attributeClass(type)" :data-feature="type" :data-grouplevel="grouplevel" v-if="data[type]">{{ decorate(data,type) }}</span>
</template>
<script>
  export default {
    name: 'InflectionAttribute',
    props: {
      data: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true,
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
        default: () => [""]
      }
    },
    methods: {
      attributeClass(featureType,...extras) {
        let classList = []
        if (this.linkedfeatures.includes(featureType)) {
          classList.push('alpheios-morph__linkedattr')
        } else {
          classList.push('alpheios-morph__attr')
        }
        classList.push(...extras)
        return classList.join(' ')
      },
      decorate(data,type) {
        let decorated = typeof(data[type]) === 'string' ? data[type] : data[type].value
        if (this.decorators.includes('abbreviate') && data[type].value) {
          decorated = data[type].toLocaleStringAbbr()
        }
        if (this.decorators.includes('appendtype')) {
          decorated = `${decorated} ${type}`
        }
        if (this.decorators.includes("parenthesize")) {
          decorated = `(${decorated})`
        }
        if (this.decorators.includes("brackets")) {
          decorated = `[${decorated}]`
        }
        return decorated
      },
      sendFeature(features) {
        let tosend = features

        if (Array.isArray(features)) {
          // TODO eventually we should support multiple features but
          // for the moment just send the first
          tosend = features[0]
        }
        if (this.linkedfeatures.includes(tosend.type)) {
          this.$emit('sendfeature',tosend)
        }
        else return false
      },
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";

</style>
