<template>
  <div :class="classes" v-if="data && Object.keys(data).length > 0">
    <label class="uk-form-label alpheios-setting__label" v-show="showTitle">{{data.labelText}}</label>

    <multiselect :clear-on-select="false" :close-on-select="true" :hide-selected="true" :multiple="true" :options="values"
                 :preserve-search="true" :searchable="false" placeholder="Pick some" v-if="data.multiValue"
                 v-model="selected">
    </multiselect>

    <input type="number" v-if="data.number" v-model="selected" min="0">

    <div class="alpheios-checkbox-block" v-if="data.boolean">
      <input id="alpheios-checkbox-input" type="checkbox" v-model="selected">
      <label @click="checkboxClick" for="checkbox">{{ checkboxLabel }}</label>
    </div>

    <select class="uk-select" v-if="!data.multiValue && !data.boolean && !data.number" v-model="selected">
      <option v-for="item in values">{{item}}</option>
    </select>

    
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'Setting',
  components: {
    Multiselect
  },
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
        if (typeof this.data.currentTextValue === 'function' && this.data.boolean !== true  && this.data.number !== true) {
          rv = this.data.currentTextValue()
        } else if (this.data.boolean === true) {
          rv = this.data.currentValue
        } else if (this.data.number === true) {
          rv = parseInt(this.data.currentValue)
        }
        return rv
      },
      set: function (newValue) {
        this.$emit('change', this.data.name, newValue)
      }
    },
    values: function () {
      return this.data && !this.data.number && this.data.textValues ? this.data.textValues() : []
    },
    checkboxLabel: function () {
      if (this.data && this.data.textValues) {
        return this.data.textValues()[0].text
      }
    }
  },
  methods: {
    checkboxClick: function () {
      if (this.data.boolean === true) {
        this.selected = !this.selected
      }
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-setting__label {
    display: block;
  }

  .alpheios-setting__label {
    vertical-align: middle;
  }

</style>
