<template>
    <div v-bind:class="itemClasses" >
        <div class="alpheios-worditem__data alpheios-worditem__important" 
                @click="changeImportant()">
                <check-icon></check-icon>
        </div>
        <div 
          class="alpheios-worditem__data alpheios-worditem__targetWord"
          @click="selectWordItem()"
        >{{ worditem.targetWord }}</div>
        <div class="alpheios-worditem__data alpheios-worditem__lemmasList">{{ worditem.lemmasList }}</div>
    </div>
</template>
<script>
  import CheckIcon from '@/icons/check.svg';

  export default {
    name: 'WordItemPanel',
    components: {
      checkIcon: CheckIcon
    },
    props: {
      worditem: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        important: false
      }
    },
    mounted () {
      this.important = this.worditem.important
      this.$parent.$on('eventChangeImportant', this.eventChangeImportant);
    },
    computed: {
      itemClasses () {
        return { active: this.important }
      }
    },
    methods: {
      changeImportant () {
        // this.worditem.important = !this.worditem.important
        this.$emit('changeImportant', this.worditem.ID, this.worditem.important)
        this.important = this.worditem.important
      },
      eventChangeImportant () {
        this.important = this.worditem.important
      },
      selectWordItem () {
        this.worditem.selectWordItem()
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/alpheios";
  .alpheios-wordlist-language__worditem {
      border-bottom: 1px solid #ddd;
      padding: 2px 0;
  }

  .alpheios-worditem__data {
      display: inline-block;
      vertical-align: middle;
  }

  .alpheios-wordlist-language__worditem {
    .alpheios-worditem__important {
        width: 15px;
        height: 15px;
        text-align: center;
        cursor: pointer;
        fill: $alpheios-link-color-dark-bg;
        stroke: $alpheios-link-color-dark-bg;
        margin: 5px;
        svg {
          width: 15px;
          height: 15px;
          display: inline-block;
          vertical-align: top;
        }
    }
  }

 .active .alpheios-worditem__data {
    fill: $alpheios-link-hover-color;
    stroke: $alpheios-link-hover-color;
    color: $alpheios-link-hover-color;
  }

  .alpheios-worditem__targetWord {
      font-weight: bold;
      width: 30%;
      cursor: pointer;
  }
  .alpheios-worditem__lemmasList {
      width: 58%;
  }
</style>