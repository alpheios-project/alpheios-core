<template>
    <div class="inflection-browser-table">
        <div v-if="!view.hasPrerenderedTables" class="inflection-browser-table-view">
            <wide-table :collapsed="collapsed" :view="view" />

            <template v-if="view.linkedViews">
            <wide-table
                :collapsed="collapsed"
                :view="linkedView"
                v-for="linkedView in view.linkedViews"
                :key = "linkedView.id"
            />
            </template>
        </div>
        <div v-else class="inflection-browser-table-paradigm">
            <prerendered-table-wide :collapsed="collapsed" :view="view"></prerendered-table-wide>
        </div>
    </div>
</template>>
<script>
  import { ViewSetFactory } from 'alpheios-inflection-tables'
  import WideTable from '@/vue/components/inflections/inflections-table-wide.vue'
  import WidePrerenderedTable from '@/vue/components/inflections/inflections-table-prerendered.vue'

  export default {
    name: 'InflectionStandardForms',
    components: {
      wideTable: WideTable,
      prerenderedTableWide: WidePrerenderedTable
    },
    props: {   
      standardFormData: {
        type: [Object, Boolean],
        default: false,
        required: false
      },

    // Initial state of the component: collapsed or expanded.
      collapsed: {
        type: [Boolean],
        default: true,
        required: false
      }
    },
    computed: {
      view () {
        return ViewSetFactory.getStandardForm(this.standardFormData)
      }
    }
  }
</script>