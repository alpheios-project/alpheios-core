<template>
  <div class="alpheios-annotations-comment__container" data-annotation-container>
    <div class="alpheios-annotations__act-panel">
      <div class="alpheios-annotations__act-ctrls" :data-annotation-form-open="isFormOpen">
        <div :data-annotation-selected="isAdding" class="alpheios-annotations__act-ctrls-add"
             @click.stop="addInflection">[+{{getMsg('INFLECTION_ACTION')}}]</div>
      </div>

      <div class="alpheios-annotations__act-form" v-show="isAdding">
        <div class="alpheios-annotations__act-form-content">
          <div class="alpheios-annotations__act-form-headline">{{getMsg('ADD_INFLECTION_HEADLINE')}}</div>
          <div class="alpheios-annotations__act-form-dropdown-group">
            <label for="latin-number">{{getMsg('NUMBER_LABEL')}}</label>
            <select name="latin-number" id="latin-number">
              <option value="not-selected">{{getMsg('SELECT_VALUE_LABEL')}}</option>
              <option value="Singular">Singular</option>
              <option value="Plural">Plural</option>
            </select>
          </div>
          <div class="alpheios-annotations__act-form-dropdown-group">
            <label for="latin-case">{{getMsg('CASE_LABEL')}}</label>
            <select name="latin-case" id="latin-case">
              <option value="not-selected">{{getMsg('SELECT_VALUE_LABEL')}}</option>
              <option value="Nominative">Nominative</option>
              <option value="Genitive">Genitive</option>
              <option value="Dative">Dative</option>
              <option value="Accusative">Accusative</option>
              <option value="Ablative">Ablative</option>
              <option value="Vocative">Vocative</option>
            </select>
          </div>
          <div class="alpheios-annotations__act-form-dropdown-group">
            <label for="latin-gender">{{getMsg('GENDER_LABEL')}}</label>
            <select name="latin-gender" id="latin-gender">
              <option value="Masculine" selected>Masculine</option>
              <option value="Feminine">Feminine</option>
            </select>
          </div>
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
    getMsg (messageID, formatOptions = undefined, options = {}) {
      return L10n.getInstance().getMsg(messageID, formatOptions, options)
    },

    addInflection () {
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
