<template>
    <div class="alpheios-wordlist-sorting" >
          <div class="alpheios-worditem__data alpheios-worditem__icon" 
               v-for="(field, index) in sortingFields" :key="index"
               :class="fieldClass(field.name)"
               @click = "changeSort(field.name)"
          >

          <sort-icon 
            v-if="field.sorting"
            :class = "{ 
              'alpheios-icon-asc': sortingState[field.name] === 'asc',
              'alpheios-icon-desc': sortingState[field.name] === 'desc'  
            }"
          />
          </div>
    </div>
</template>

<script>
  import SortIcon from '@/images/inline-icons/sort-arrow.svg'

  export default {
    name: 'WordSortingPanel',
    components: {
      sortIcon: SortIcon
    },
    data () {
      return {
        sortingFields: [
          { name: 'controlIcon', sorting: false },
          { name: 'controlIcon', sorting: false },
          { name: 'controlIcon', sorting: false },
          { name: 'controlIcon', sorting: false },
          { name: 'targetWord', sorting: true },
          { name: 'lemmasList', sorting: false },
          { name: 'frequency', sorting: true },
          { name: 'updatedDT', sorting: true }
        ],
        defaultSortingShownType: 'asc',
        sortingState: {
          'targetWord': null,
          'frequency': null,
          'updatedDT': null
        },
        sortingOrder: [ null, 'asc', 'desc' ]
      }
    },
    computed: {
    },
    methods: {
      changeSort (part, type) {
        const sortingData = this.sortingFields.find(field => field.name === part)

        if (!sortingData.sorting) {
          return
        }

        if (type) {
          this.sortingState[part] = this.sortingState[part] !== type ? type : null
        } else {
          this.sortingState[part] = this.defineNextSorting(part)
        }

        Object.keys(this.sortingState).forEach(sortPart => {
          if (sortPart !== part) {
            this.sortingState[sortPart] = null
            this.$emit('changeSorting', sortPart, null)
          }
        })
        this.$emit('changeSorting', part, this.sortingState[part])
      },
      defineNextSorting (part) {
        const currentSortingIndex = this.sortingOrder.indexOf(this.sortingState[part])
        const newSortingIndex = (currentSortingIndex + 1) < this.sortingOrder.length ? (currentSortingIndex + 1) : 0
        return this.sortingOrder[newSortingIndex]
      },
      showSort(part, type) {
        if (!this.sortingState[part]) {
          return type === this.defaultSortingShownType
        }
        return this.sortingState[part] === type
      },
      fieldClass(field) {
        return `alpheios-worditem__${field}`
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../styles/variables";
  
  $iconsize: 22px;

  .alpheios-wordlist-sorting {
      padding-bottom: 5px;
      border-bottom: 1px solid var(--alpheios-color-neutral-dark);

      .alpheios-worditem__controlIcon {
          width: $iconsize;
          margin: 0 5px;          
      }

      .alpheios-worditem__icon {      
          text-align: center;   
          box-sizing: border-box;
          svg {
            width: $iconsize;
            height: $iconsize;
            display: inline-block;
            vertical-align: top;

            cursor: pointer;
            padding: 7px;
            
            box-sizing: content-box;
          }
          
      }

      .alpheios-worditem__icon.alpheios-worditem__frequency,
      .alpheios-worditem__icon.alpheios-updatedDT {
        padding: 0 10px;
        svg {
          padding: 7px 0;
        }
      }

      .alpheios-icon-asc {
        .sort-arrow-down {
          fill: var(--alpheios-link-color-on-light);
        }
      }

      .alpheios-icon-desc {
        .sort-arrow-up {
          fill: var(--alpheios-link-color-on-light);
        }
      }

      .alpheios-worditem__icon.alpheios-worditem__frequency {
        width: 40px;
      }
  }


</style>