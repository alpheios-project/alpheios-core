<template>
    <div class="alpheios-morph-data__principal_parts">
        <div class="alpheios-morph-data__principal_parts" v-for="(lemma, lemmaIndex) in allLemmas" v-bind:key="lemmaIndex">
            <principal-parts :lemma="lemma" :lemmaindex="lemmaIndex" :lexemeslength="lexemeslength"
                             :lexemeindex="lexemeindex" :disambiguated="lexeme.disambiguated" />
        </div>
        <div class="alpheios-morph-data__morphdata" v-if="hasMorphData">
            <span class="alpheios-morph-data__pofs">
                <inflectionattribute v-for="(feat, featIndex) in featuresList.pofs" v-bind:key="featIndex"
                    :data="lexeme.lemma.features" :type="types[feat]"
                />
            </span>
                <inflectionattribute v-for="(feat, featIndex) in featuresList.others" v-bind:key="featIndex"
                    :data="lexeme.lemma.features" :type="types[feat.name]" :decorators="[feat.decorator]"
                />
        </div>
    </div>
</template>
<script>
import { Feature } from 'alpheios-data-models'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'
import PrincipalParts from '@/vue/components/morph-parts/principal-parts.vue'

export default {
  name: 'MorphData',
  components: {
    inflectionattribute: InflectionAttribute,
    principalParts: PrincipalParts
  },
  props: {
    lexeme: {
      type: Object,
      required: true
    },
    lexemeindex: {
      type: Number,
      required: true
    },
    lexemeslength: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      types: null,
      featuresList: {
        pofs: ['grmCase', 'gender', 'part'],
        others: [
          { name: 'radical', decorator: 'brackets' },
          { name: 'kind', decorator: 'parenthesize' },
          { name: 'declension', decorator: 'appendtype' },
          { name: 'conjugation', decorator: 'appendtype' },
          { name: 'note', decorator: 'brackets' }
        ]
      }
    }
  },
  created: function () {
    this.types = Feature.types
  },
  computed: {
    hasMorphData () {
      if (!this.lexeme.lemma.features) {
        return false
      }

      let check = false
      this.featuresList.pofs.forEach(feature => {
        check = check || this.getFeature(this.types[feature])
      })

      this.featuresList.others.forEach(feature => {
        check = check || this.getFeature(feature.name)
      })

      return check
    },
    allLemmas () {
      if (this.lexeme.altLemmas && this.lexeme.altLemmas.length > 0) {
        return [this.lexeme.lemma, ...this.lexeme.altLemmas].sort((a, b) => {
          if (a.features[Feature.types.frequency]) {
            return a.features[Feature.types.frequency].compareTo(b.features[Feature.types.frequency])
          } else if (b.features[Feature.types.frequency]) {
            // frequency of a isn't defined so sort b first
            return 1
          } else {
            // equal
            return 0
          }
        })
      } else {
        return [this.lexeme.lemma]
      }
    }
  },
  methods: {
    getFeature (type) {
      if (this.lexeme.lemma.features[type] !== undefined) {
        return this.lexeme.lemma.features[type].value
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  #{$alpheios-namespace} {
      // We have to use namespace to override increased specificity of content styles, that, in turn, had
      // specificity increased to fight style leakage from some problematic websites.
      .alpheios-morph-data__morphdata {
          .alpheios-morph__linkedattr {
              @include alpheios-interactive;
              color: var(--alpheios-desktop-popup-link-color);
              font-weight: 700;

              &:hover {
                  color: var(--alpheios-desktop-popup-link-color-hover);
              }
          }
      }
  }

  .alpheios-morph-data__pofs span:last-child:after {
    content: ";";
  }
  .alpheios-morph-data__morphdata {
    display: inline;
  }

  .alpheios-morph-data__principal_parts {
    .feature_source {
      span {
        font-size: smaller;
      }
    }
  }

  .alpheios-morph-data__morphdata .alpheios-morph-data__pofs {
    span {
      padding-right: 5px;
    }
  }

</style>
