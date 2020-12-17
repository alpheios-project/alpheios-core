<template>
  <div class="alpheios-annotations-comment__container" data-annotation-container>
    <div class="alpheios-annotations__act-panel">
      <div class="alpheios-annotations__act-ctrls" :data-annotation-form-open="isFormOpen">
        <div class="alpheios-annotations__act-ctrls-edit" @click.stop="editComment"
             :data-annotation-selected="isEditing">[*comment]</div>
        <div class="alpheios-annotations__act-ctrls-remove" @click.stop="removeComment"
             :data-annotation-selected="isRemoving">[-remove]</div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isEditing">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">Edit the comment:</div>
          <div class="alpheios-annotations__act-form-text-input-group">
            <textarea id="lemma-definition" cols="50"
                      name="lemma-definition" rows="4">A comment about the part of speech of the lexeme</textarea>
          </div>
        </div>

        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-save" @click.stop="closeForm">Save</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">Cancel</div>
        </div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isRemoving">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">Remove the comment:</div>
          <div class="alpheios-annotations__act-form-text">
            Are you sure that you want to remove this comment?
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
  EDIT: 'edit',
  REMOVE: 'remove'
}

export default {
  name: 'AnnotationComment',
  data () {
    return {
      selectedAction: ActionTypes.NONE
    }
  },
  computed: {
    isEditing () {
      return this.selectedAction === ActionTypes.EDIT
    },

    isRemoving () {
      return this.selectedAction === ActionTypes.REMOVE
    },

    isFormOpen () {
      return this.selectedAction !== ActionTypes.NONE
    }
  },
  methods: {
    editComment () {
      this.selectedAction = ActionTypes.EDIT
    },

    removeComment () {
      this.selectedAction = ActionTypes.REMOVE
    },

    closeForm () {
      this.selectedAction = ActionTypes.NONE
    }
  }
}
</script>
<style lang="scss">
@use "../styles/annotations";
@include annotations.annotations-component
</style>
