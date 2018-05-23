<template>
      <div :class="classes" v-if="Object.keys(data).length > 0">
        <label class="uk-form-label alpheios-setting__label" v-show="showTitle">{{data.labelText}}</label>
        <select v-model="selected" class="uk-select" multiple v-if="data.multiValue">
            <option v-for="item in data.textValues()">{{item}}</option>
        </select>
        <select v-model="selected" class="uk-select" v-if="! data.multiValue">
            <option v-for="item in data.textValues()">{{item}}</option>
        </select>
    </div>
</template>
<script>
  export default {
    name: 'Setting',
    props: {
      data: {
        type: Object,
        required: true
      },
      showTitle: {
        type: Boolean,
        required: false,
        default: true
      },
      classes: {
        type: Array,
        required: false,
        default: function () {
          return ['uk-margin']
        }
      }
    },
    computed: {
      selected: {
        get: function () {
          let rv
          if (typeof this.data.currentTextValue === 'function') {
              rv = this.data.currentTextValue()
          }
          return rv
        },
        set: function (newValue) {
          this.$emit('change', this.data.name, newValue)
        }
      }
    }
  }
</script>
<style lang="scss">
  .alpheios-setting__label {
    display: block;
  }
</style>
