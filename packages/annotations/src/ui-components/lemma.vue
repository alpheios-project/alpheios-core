<template>
  <div class="alpheios-annotations-comment__container" data-annotation-container>
    <div class="alpheios-annotations__act-panel">
      <div class="alpheios-annotations__act-ctrls" :data-annotation-form-open="isFormOpen">
        <div :data-annotation-selected="isAdding" class="alpheios-annotations__act-ctrls-add"
             @click.stop="add">[+{{getMsg('LEMMA_ACTION')}}]</div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isAdding">
        <div class="alpheios-annotations__act-form-content">
          Content TBD
        </div>
        <div class="alpheios-annotations__act-form-ctrls">
          <div class="alpheios-annotations__act-form-ctrls-add" @click.stop="closeForm">{{getMsg('ADD_BTN')}}</div>
          <div class="alpheios-annotations__act-form-ctrls-cancel" @click.stop="closeForm">{{getMsg('CANCEL_BTN')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import L10n from '@annotations/locales/l10n.js'

const ActionTypes = {
  NONE: 'none',
  ADD: 'add'
}

export default {
  name: 'AnnotationLemma',
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
    getMsg (messageID, formatOptions = undefined, options = {}) {
      return L10n.getInstance().getMsg(messageID, formatOptions, options)
    },

    add () {
      this.selectedAction = ActionTypes.ADD
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
