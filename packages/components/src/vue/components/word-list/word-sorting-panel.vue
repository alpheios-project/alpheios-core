<template>
    <div class="alpheios-wordlist-sorting" >
        
        
          <div class="alpheios-worditem__data alpheios-worditem__icon">
          </div>

          <div class="alpheios-worditem__data alpheios-worditem__icon">
          </div>


          <div class="alpheios-worditem__data alpheios-worditem__icon">
                
          </div>

          <div class="alpheios-worditem__data alpheios-worditem__icon">
          </div>

        <div
          class="alpheios-worditem__data alpheios-worditem__targetWord"
        >
            <sort-asc-icon 
                :class = "{ 'alpheios-icon-active': sortingState['targetWord'] === 'asc' }"
                @click = "changeSort('targetWord', 'asc')"
            />
            <sort-desc-icon 
                :class = "{ 'alpheios-icon-active': sortingState['targetWord'] === 'desc' }"
                @click = "changeSort('targetWord', 'desc')"
            />
        </div>

    </div>
</template>

<script>
  import SortAscIcon from '@/images/inline-icons/sort-asc-icon.svg'
  import SortDescIcon from '@/images/inline-icons/sort-desc-icon.svg'

  export default {
    name: 'WordSortingPanel',
    components: {
      sortAscIcon: SortAscIcon,
      sortDescIcon: SortDescIcon
    },
    data () {
      return {
          sortingState: {
            'targetWord': null
          }
      }
    },
    computed: {
    },
    methods: {
      changeSort (part, type) {
        this.sortingState[part] = this.sortingState[part] !== type ? type : null
        this.$emit('changeSorting', part, this.sortingState[part])
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

      .alpheios-worditem__icon {
          width: $iconsize;
          margin: 5px;          
      }

      .alpheios-worditem__targetWord {
          width: 28%;
          
          svg {
            width: $iconsize;
            height: $iconsize;
            display: inline-block;
            vertical-align: top;

            cursor: pointer;
            padding: 7px;
            fill: var(--alpheios-word-list-sorting-link-color);
            
            box-sizing: content-box;

            &.alpheios-icon-active {
                fill: var(--alpheios-word-list-sorting-link-color-hover);
            }
          }
          
      }
  }

  .alpheios-layout-compact { 
    .alpheios-wordlist-sorting {
      .alpheios-worditem__targetWord {
        width: 25%;
      }
    }
  }

</style>