<template>
  <!-- TODO: use fragments in Vue 3 to avoid insertion of an empty <div> into the layout -->
  <div>
    <div class="alpheios-annotations-container" :data-annotation-mode="annotationMode"
         @click="clickHandler" v-if="annotationMode">
      <slot></slot>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>
<script>
import Vue from '@vue-runtime'
import AnnotationComment from '@annotations/ui-components/comment.vue'
import AnnotationDefinition from '@annotations/ui-components/definition.vue'
import AnnotationInflection from '@annotations/ui-components/inflection.vue'
import L10n from '@annotations/locales/l10n.js'

const COMPONENT_ID = 'annotationComponent'
const ANNOTATABLE_ATTR_NAME = 'data-annotation-type'
const SELECTED_ATTR_NAME = 'data-annotation-selected'
const CONTAINER_ATTR_NAME = 'data-annotation-container'
const AnnotationTypes = {
  COMMENT: 'comment',
  DEFINITION: 'definition',
  INFLECTION: 'inflection',
  LEMMA: 'lemma',
  WORDFORM: 'wordForm'
}
const EMPTY_SELECTION = {
  isSelected: false,
  target: null,
  mountContainer: null,
  vueInstance: null
}

export default {
  name: 'AnnotationArea',
  selection: Object.assign({}, EMPTY_SELECTION),
  l10n: null,
  props: {
    annotationMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  mounted () {
    // Create an instance of L10n and set the locale for other components to use
    L10n.getInstance().setLocale(L10n.locales.EN_US)
  },

  methods: {
    clickHandler (evt) {
      const target = evt.target.closest(`[${ANNOTATABLE_ATTR_NAME}]`)
      if (!target) { return } // Do nothing if an annotatable element cannot be found
      const containerTarget = evt.target.closest(`[${CONTAINER_ATTR_NAME}]`)
      if (containerTarget) {
        // Ignore all clicks that are originated within annotation containers
        return
      }
      const targetIsSelected = this.$options.selection.isSelected && this.$options.selection.target === target
      if (this.$options.selection.isSelected) {
        this.disable()
      }
      if (!targetIsSelected) {
        this.enable(target)
      }
    },

    getComponentByType (annotationType) {
      if (annotationType === AnnotationTypes.COMMENT) {
        return AnnotationComment
      } else if (annotationType === AnnotationTypes.DEFINITION) {
        return AnnotationDefinition
      } else if (annotationType === AnnotationTypes.INFLECTION) {
        return AnnotationInflection
      } else {
        throw new Error(`Unknown annotation type: ${annotationType}`)
      }
    },

    enable (target) {
      const annotationType = target.getAttribute(ANNOTATABLE_ATTR_NAME)
      this.$options.selection.isSelected = true
      this.$options.selection.target = target
      target.setAttribute(SELECTED_ATTR_NAME, true)
      target.insertAdjacentHTML('afterend', `<div id="${COMPONENT_ID}"><div></div></div>`)
      this.$options.selection.mountContainer = document.querySelector(`#${COMPONENT_ID}`)
      const mountTarget = document.querySelector(`#${COMPONENT_ID} > div`)
      const vueComponent = this.getComponentByType(annotationType)
      this.$options.selection.vueInstance = new Vue(vueComponent)
      this.$options.selection.vueInstance.$mount(mountTarget)
    },

    disable () {
      this.$options.selection.target.removeAttribute(SELECTED_ATTR_NAME)
      this.$options.selection.vueInstance.$destroy()
      this.$options.selection.mountContainer.remove()
      this.$options.selection = Object.assign({}, EMPTY_SELECTION)
    }
  }
}
</script>
<style lang="scss">
@use "../styles/annotations";

[data-annotation-mode="true"] {
  [data-annotation-type] {
    @include annotations.editable-element;
  }

  [data-annotation-type][data-annotation-selected="true"] {
    @include annotations.editable-element-selected
  }
}
</style>
