<template>
  <div class="alpheios-annotations-comment__container" data-annotation-container>
    <div class="alpheios-annotations__act-panel">
      <div class="alpheios-annotations__act-ctrls" :data-annotation-form-open="isFormOpen">
        <div :data-annotation-selected="isAdding" class="alpheios-annotations__act-ctrls-add"
             @click.stop="addInflection">[+inflection]</div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isAdding">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">Add an inflection:</div>
          <div class="alpheios-annotations__act-form-dropdown-group">
            <label for="latin-number">Number:</label>
            <select name="latin-number" id="latin-number">
              <option value="not-selected">Select a value</option>
              <option value="Singular">Singular</option>
              <option value="Plural">Plural</option>
            </select>
          </div>
          <div class="alpheios-annotations__act-form-dropdown-group">
            <label for="latin-case">Case:</label>
            <select name="latin-case" id="latin-case">
              <option value="not-selected">Select a value</option>
              <option value="Nominative">Nominative</option>
              <option value="Genitive">Genitive</option>
              <option value="Dative">Dative</option>
              <option value="Accusative">Accusative</option>
              <option value="Ablative">Ablative</option>
              <option value="Vocative">Vocative</option>
            </select>
          </div>
          <div class="alpheios-annotations__act-form-dropdown-group">
            <label for="latin-gender">Gender:</label>
            <select name="latin-gender" id="latin-gender">
              <option value="Masculine" selected>Masculine</option>
              <option value="Feminine">Feminine</option>
            </select>
          </div>
        </div>
        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-add" @click.stop="closeForm">Add</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const ActionTypes = {
  NONE: 'none',
  ADD: 'add'
}

export default {
  name: 'AnnotationInflection',
  data () {
    return {
      selectedAction: ActionTypes.NONE
    }
  },
  computed: {
    isAdding () {
      return this.selectedAction === ActionTypes.ADD
    },

    isFormOpen () {
      return this.selectedAction !== ActionTypes.NONE
    }
  },
  methods: {
    addInflection: function () {
      this.selectedAction = ActionTypes.ADD
    },

    closeForm: function () {
      this.selectedAction = ActionTypes.NONE
    }
  }
}
</script>
<style lang="scss">
@use "../styles/annotations";
@include annotations.annotations-component
</style>
