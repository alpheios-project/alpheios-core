<template>
  <div :class="classes" v-if="dataModel && Object.keys(dataModel).length > 0">
    <label class="alpheios-form-label alpheios-setting__label" v-show="showTitle">{{dataModel.labelText}}</label>

    <multiselect :clear-on-select="false" :close-on-select="true" :hide-selected="true" :multiple="true" :options="values"
                 :preserve-search="true" :searchable="false" placeholder="Pick some" v-if="dataModel.multiValue"
                 v-model="selected">
    </multiselect>

    <input type="number" v-if="dataModel.number" v-model="selected" min="0">

    <div class="alpheios-checkbox-block" v-if="dataModel.boolean">
      <input id="alpheios-checkbox-input" type="checkbox" v-model="selected">
      <label @click="checkboxClick" for="checkbox">{{ checkboxLabel }}</label>
    </div>

    <select class="alpheios-select" v-if="!dataModel.multiValue && !dataModel.boolean && !dataModel.number" v-model="selected">
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
        return []
      }
    }
  },
  /*
  TODO: A temporary solution to force Vue.js to redraw when settings are changed
       (as settings objects of `app` are not reactive).
       This better be handled by refactoring settings objects and integrating them into a Vuex store.
   */
  data: function () {
    return {
      dataModel: undefined
    }
  },
  computed: {
    selected: {
      get: function () {
        let rv
        if (typeof this.dataModel.currentTextValue === 'function' && this.dataModel.boolean !== true && this.dataModel.number !== true) {
          rv = this.dataModel.currentTextValue()
        } else if (this.dataModel.boolean === true) {
          rv = this.dataModel.currentValue
        } else if (this.dataModel.number === true) {
          rv = parseInt(this.dataModel.currentValue)
        }
        return rv
      },
      set: function (newValue) {
        this.$emit('change', this.data.name, newValue)
        this.dataModel = this.data // To force Vue.js to redraw
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
  },
  created: function () {
    this.dataModel = this.data
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-setting__label {
    display: block;
    vertical-align: middle;
  }

</style>
