<template>
  <div class="alpheios-annotations-comment__container" data-annotation-container>
    <div class="alpheios-annotations__act-panel">
      <div class="alpheios-annotations__act-ctrls" :data-annotation-form-open="isFormOpen">
        <div :data-annotation-selected="isAdding" class="alpheios-annotations__act-ctrls-add"
             @click.stop="addDefinition">[+{{ getMsg('DEFINITION_ACTION') }}]</div>
        <div :data-annotation-selected="isRemoving" class="alpheios-annotations__act-ctrls-remove"
             @click.stop="removeDefinition">[-{{getMsg('REMOVE_ACTION')}}]</div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isAdding">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">{{ getMsg('DEFINITION_HEADLINE') }}</div>
          <div class="alpheios-annotations__act-form-text-input-group">
            <label for="lemma-definition">{{ getMsg('DEFINITION_LABEL') }}</label>
            <textarea id="lemma-definition" cols="50" name="lemma-definition" rows="4"></textarea>
          </div>
          <div class="alpheios-annotations__act-form-text-input-group">
            <label for="lemma-source">{{ getMsg('SOURCE_LABEL') }}</label>
            <input id="lemma-source" name="lemma-source">
          </div>
        </div>
        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-add" @click.stop="closeForm">{{ getMsg('ADD_BTN') }}</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">{{ getMsg('CANCEL_BTN') }}</div>
        </div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isRemoving">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">{{ getMsg('REMOVE_DEFINITION_HEADLINE') }}</div>
          <div class="alpheios-annotations__act-form-text">
            {{ getMsg('REMOVE_DEFINITION_WARNING') }}
          </div>
        </div>
        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-remove" @click.stop="closeForm">{{ getMsg('REMOVE_BTN') }}</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">{{ getMsg('CANCEL_BTN') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import L10n from '@annotations/locales/l10n.js'

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
    getMsg (messageID, formatOptions = undefined, options = {}) {
      return L10n.getInstance().getMsg(messageID, formatOptions, options)
    },

    addDefinition () {
      this.selectedAction = ActionTypes.ADD
    },

    removeDefinition () {
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
