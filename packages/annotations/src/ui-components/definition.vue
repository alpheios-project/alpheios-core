<template>
  <div class="alpheios-annotations-comment__container" data-annotation-container>
    <div class="alpheios-annotations__act-panel">
      <div class="alpheios-annotations__act-ctrls" :data-annotation-form-open="isFormOpen">
        <div :data-annotation-selected="isAdding" class="alpheios-annotations__act-ctrls-add"
             @click.stop="addDefinition">[+definition]</div>
        <div :data-annotation-selected="isRemoving" class="alpheios-annotations__act-ctrls-remove"
             @click.stop="removeDefinition">[-remove]</div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isAdding">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">Add a definition:</div>
          <div class="alpheios-annotations__act-form-text-input-group">
            <label for="lemma-definition">Definition:</label>
            <textarea id="lemma-definition" cols="50" name="lemma-definition" rows="4"></textarea>
          </div>
          <div class="alpheios-annotations__act-form-text-input-group">
            <label for="lemma-source">Source:</label>
            <input id="lemma-source" name="lemma-source">
          </div>
        </div>
        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-add" @click.stop="closeForm">Add</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">Cancel</div>
        </div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isRemoving">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">Remove the definition:</div>
          <div class="alpheios-annotations__act-form-text">
            Are you sure that you want to remove this definition?
          </div>
        </div>
        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-remove" @click.stop="closeForm">Remove</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const ActionTypes = {
  NONE: 'none',
  ADD: 'add',
  REMOVE: 'remove'
}

export default {
  name: 'AnnotationDefinition',
  data () {
    return {
      selectedAction: ActionTypes.NONE
    }
  },
  computed: {
    isAdding () {
      return this.selectedAction === ActionTypes.ADD
    },

    isRemoving () {
      return this.selectedAction === ActionTypes.REMOVE
    },

    isFormOpen () {
      return this.selectedAction !== ActionTypes.NONE
    }
  },
  methods: {
    addDefinition: function () {
      this.selectedAction = ActionTypes.ADD
    },

    removeDefinition: function () {
      this.selectedAction = ActionTypes.REMOVE
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
