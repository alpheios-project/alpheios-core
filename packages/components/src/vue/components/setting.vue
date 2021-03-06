<template>
  <div :class="classes" v-if="dataModel && Object.keys(dataModel).length > 0  && !dataModel.hidden">
    <label class="alpheios-setting__label" v-show="showLabelText" v-html="labelText"></label>

    <multiselect
        class="alpheios-setting__control"
        :clear-on-select="false"
        :close-on-select="true"
        :hide-selected="true"
        :multiple="true"
        :options="values"
        :preserve-search="true"
        :searchable="false"
        placeholder="Pick some"
        v-if="dataModel.multiValue"
        v-model="selected"
    >
    </multiselect>

    <input
        class="alpheios-input alpheios-setting__control"
        type="number"
        v-if="dataModel.number"
        v-model="selected"
        :min="dataModel.minValue"
        :max="dataModel.maxValue"
        @change="checkNumberField"
        :id="inputId"
    >

    <input
        class="alpheios-input alpheios-setting__control"
        type="text"
        v-if="dataModel.text"
        v-model="selected"
        :id="inputId"
    >

    <div class="alpheios-checkbox-block alpheios-setting__control" v-if="dataModel.boolean">
      <input type="checkbox" v-model="selected" :id="inputId">
      <label :for="inputId">{{ checkboxLabel }}
        <span v-html="labelText" v-if="showCheckboxTitle"></span>
      </label>
    </div>

    <select
        class="alpheios-select alpheios-setting__control"
        v-if="!dataModel.multiValue && !dataModel.boolean && !dataModel.number && !dataModel.text"
        v-model="selected" :id="inputId">
      <option v-for="item in values" :key="item">{{item}}</option>
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
  inject: {
    l10n: 'l10n'
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    selectedOverride: {
      type: [String, Boolean],
      required: false
    },
    showLabelText: {
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
    },
    showCheckboxTitle: {
      type: Boolean,
      required: false,
      default: false
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
    inputId () {
      return `${this.data.name}-id`
    },
    selected: {
      get: function () {
        let rv
        if (typeof this.selectedOverride === 'string') {
          if (this.dataModel.boolean == true) {
            rv = this.selectedOverride === 'true'
          } else {
            rv = this.selectedOverride
          }
        } else if (typeof this.dataModel.currentTextValue === 'function' && this.dataModel.boolean !== true && this.dataModel.number !== true && this.dataModel.text !== true) {
          rv = this.dataModel.currentTextValue()
        } else if (this.dataModel.boolean === true || this.dataModel.text) {
          rv = this.dataModel.currentValue
        } else if (this.dataModel.number === true) {
          rv = parseInt(this.dataModel.currentValue)
        }
        return rv
      },
      set: function (newValue) {
        this.$emit('change', this.data.name, newValue)
        this.$emit('clearSelectedOverride')
        this.dataModel = this.data // To force Vue.js to redraw
      }
    },
    values: function () {
      return this.data && !this.data.number && this.data.textValues ? this.data.textValues() : []
    },
    checkboxLabel: function () {
      return (this.data && this.data.textValues) ? this.data.textValues()[0].text : ''
    },
    labelText () {
      if (this.dataModel.labelL10n) {
        return this.l10n.getText(this.dataModel.labelL10n)
      }
      return this.dataModel.labelText
    }
  },
  methods: {
    checkNumberField () {
      if (this.dataModel.number && this.dataModel.minValue) {
        if (this.selected < this.dataModel.minValue) {
          this.selected = this.dataModel.minValue
        }
      }
      if (this.dataModel.number && this.dataModel.maxValue) {
        if (this.selected > this.dataModel.maxValue) {
          this.selected = this.dataModel.maxValue
        }
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
    width: 50%;
  }

  // The multiple selector is required to override styles from the page
  input.alpheios-input.alpheios-setting__control,
  select.alpheios-setting__control,
  .multiselect.alpheios-setting__control {
    width: 50%;
  }

</style>
