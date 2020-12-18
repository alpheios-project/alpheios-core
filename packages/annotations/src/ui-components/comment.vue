<template>
  <div class="alpheios-annotations-comment__container" data-annotation-container>
    <div class="alpheios-annotations__act-panel">
      <div class="alpheios-annotations__act-ctrls" :data-annotation-form-open="isFormOpen">
        <div class="alpheios-annotations__act-ctrls-edit" @click.stop="editComment"
             :data-annotation-selected="isEditing">[*{{ getMsg('COMMENT_ACTION') }}]</div>
        <div class="alpheios-annotations__act-ctrls-remove" @click.stop="removeComment"
             :data-annotation-selected="isRemoving">[-{{ getMsg('REMOVE_ACTION') }}]</div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isEditing">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">{{ getMsg('EDIT_COMMENT_HEADLINE') }}</div>
          <div class="alpheios-annotations__act-form-text-input-group">
            <textarea id="lemma-definition" cols="50"
                      name="lemma-definition" rows="4" v-html="getMsg('SAMPLE_COMMENT_TEXT')"></textarea>
          </div>
        </div>

        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-save" @click.stop="closeForm">{{ getMsg('SAVE_BTN') }}</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">{{ getMsg('CANCEL_BTN') }}</div>
        </div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isRemoving">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">{{ getMsg('REMOVE_COMMENT_HEADLINE') }}</div>
          <div class="alpheios-annotations__act-form-text">
            {{ getMsg('REMOVE_COMMENT_WARNING') }}
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
import L10n from '@annotations/locales/l10n.js'

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
    getMsg (messageID, formatOptions = undefined, options = {}) {
      return L10n.getInstance().getMsg(messageID, formatOptions, options)
    },

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
