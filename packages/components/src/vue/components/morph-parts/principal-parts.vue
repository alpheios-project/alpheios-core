<template>
    <div class="alpheios-principal-parts__item">
        <span class="alpheios-principal-parts__lemma_index" v-if="lemmaindex === 0 && printIndex">{{ lexemeindex + 1 }}</span>
        <span class="alpheios-principal-parts__lemma_index_spacer" v-else-if="lemmaindex > 0 && printIndex"> </span>

        <h4
            class="alpheios-principal-parts__groupitem"
            :lang="languageCode"
            v-if="! lemma.principalParts.includes(lemma.word)"
        >
            {{ lemma.word }}
        </h4>

        <h4 class="alpheios-principal-parts__groupitem">
            <span
                :lang="languageCode"
                class="alpheios-principal-parts__listitem"
                v-for="(part, partIndex) in lemma.principalParts" v-bind:key="partIndex"
            >
                {{ part }}
            </span>
        </h4>

        <disambiguated-icon v-show="disambiguated" class="alpheios-principal-parts__pointer-icn"></disambiguated-icon>
        <div v-show="disambiguated" class="alpheios-principal-parts__dsmbg-providers">
            <treebank-icon class="alpheios-principal-parts__dsmbg-providers-icn"></treebank-icon>
        </div>

        <inflectionattribute
            :data="lemma.features"
            :decorators="['brackets', 'appendspace', 'chinese']"
            :type="types.pronunciation"
        />

        <span class="feature_extras" v-if="hasExtras" >
            <inflectionattribute
                :data="featureList(['age','area','geo', 'frequency'],'extras')"
                :type="'extras'"
            />
        </span>

        <span class="feature_source" v-if="hasSource">
            <inflectionattribute
                :data="lemma.features"
                :decorators="['link','brackets']"
                :type="types.source"
            />
        </span>
    </div>
</template>
<script>
import TreebankIcon from '@/images/inline-icons/sitemap.svg'
import DisambiguatedIcon from '@/images/inline-icons/chevron-circle-left.svg'
import { Feature, LanguageModelFactory } from 'alpheios-data-models'

import InflectionAttribute from '@/vue/components/infl-attribute.vue'

export default {
  name: 'PrincipalParts',
  components: {
    inflectionattribute: InflectionAttribute,
    treebankIcon: TreebankIcon,
    disambiguatedIcon: DisambiguatedIcon
  },
  props: {
    lemma: {
      type: Object,
      required: true
    },
    lemmaindex: {
      type: Number,
      required: true
    },
    lexemeslength: {
      type: Number,
      required: true
    },
    lexemeindex: {
      type: Number,
      required: true
    },
    disambiguated: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      types: null // These are Feature.types
    }
  },
  computed: {
    printIndex () {
      return this.lexemeslength > 1
    },
    languageCode () {
      return LanguageModelFactory.getLanguageCodeFromId(this.lemma.languageID)
    },
    hasExtras () {
      return this.lemma.features && (this.getFeature('frequency') || this.getFeature('age') || this.getFeature('area') || this.getFeature('geo'))
    },
    hasSource () {
      return this.lemma.features && this.getFeature('source')
    }
  },
  methods: {
    featureList (features, name) {
      let list = features.map(i => this.lemma.features[i] ? this.lemma.features[i] : null).filter(i => i)
      list = list.length > 0 ? `(${list.map((f) => f).join(', ')})` : ''
      const returnObj = {}
      returnObj[name] = { value: list, values: [list] }
      return returnObj
    },
    getFeature (type) {
      if (this.lemma.features[type] !== undefined) {
        return this.lemma.features[type].value
      }
    }
  },
  created: function () {
    this.types = Feature.types
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-principal-parts__lemma_index,
  .alpheios-principal-parts__lemma_index_spacer {
    display: inline-block;
    text-align: center;
    font-weight: 700;
    margin-right: textsize(5px);
  }

  .alpheios-principal-parts__listitem:after {
    content: ", ";
  }

  .alpheios-principal-parts__listitem:last-child:after {
    content: "";
  }

  h4.alpheios-principal-parts__groupitem {
    display: inline;
    font-weight: 700;
  }

  .alpheios-principal-parts__groupitem:last-child:after {
    content: ':';
  }

  .alpheios-morph-data__chinese p {
    margin-bottom: 0;
  }

  .alpheios-morph__attr i {
    font-style: italic;
    font-family: sans-serif;
    font-size: 90%;
  }

  .alpheios-principal-parts__pointer-icn {
      // fill: var(--alpheios-color-neutral-dark);
      fill: var(--alpheios-color-neutral-dark);
      width: 13px;
      position: relative;
      top: 2px;
  }

  .alpheios-principal-parts__dsmbg-providers {
    float: right;
  }

  .alpheios-principal-parts__dsmbg-providers-icn {
      fill: var(--alpheios-color-neutral-dark);
      width: 16px;
      position: relative;
      top: 2px;
      left: 5px;
  }
</style>
