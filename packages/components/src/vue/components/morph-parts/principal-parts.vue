<template>
    <div class="alpheios-principal-parts__item">
        <span class="alpheios-principal-parts__lemma_index" v-if="lemmaindex === 0 && printIndex">{{ lexemeindex + 1 }}</span>
        <span class="alpheios-principal-parts__lemma_index_spacer" v-else-if="lemmaindex > 0 && printIndex"> </span>

        <h4
            class="alpheios-principal-parts__groupitem alpheios-principal-parts__groupitem--lemma-word"
            :lang="languageCode"
            data-alpheios-enable="all"
            v-if="! lemma.principalParts.includes(lemma.displayWord)"
        ><span
          class="alpheios-principal-parts__groupitem--lemma-word__listitem"
          v-for="word in wordParts(lemma.displayWord)">{{word}}</span></h4>

        <h4 class="alpheios-principal-parts__groupitem" v-if="lemma.principalParts && lemma.principalParts.length > 0">
            <span
                :lang="languageCode"
                class="alpheios-principal-parts__listitem"
                data-alpheios-enable="all"
                v-for="(part, partIndex) in lemma.principalParts" v-bind:key="partIndex"
            >{{part}}</span>
        </h4>

        <tooltip
            :tooltip-text="l10n.getText('TOOLTIP_DISAMBIGUATED')"
            tooltip-direction="top"
            class="alpheios-principal-parts__pointer-tooltip"
            v-show="disambiguated"
        >
            <disambiguated-icon class="alpheios-principal-parts__pointer-icn alpheios-disambiguated-icon"></disambiguated-icon>
        </tooltip>
        <div v-show="disambiguated" class="alpheios-principal-parts__dsmbg-providers">
            <tooltip
                :tooltip-text="l10n.getText('TOOLTIP_TREEBANK_SOURCE')"
                tooltip-direction="top"
                class="alpheios-principal-parts__dsmbg-providers-tooltip"
            >
                <treebank-icon class="alpheios-principal-parts__dsmbg-providers-icn alpheios-treebank-icon"></treebank-icon>
            </tooltip>
        </div>

        <inflectionattribute
            :data="lemma.features"
            :decorators="['brackets', 'appendspace', 'chinese']"
            :type="types.pronunciation"
        />

        <div class="feature_extras" v-if="hasExtras" >
            <inflectionattribute
                :data="featureList(['age','area','geo', 'frequency'],'extras')"
                :type="'extras'"
            />
        </div>

        <div class="feature_source" v-if="hasSource">
            <inflectionattribute
                :data="lemma.features"
                :decorators="['link','brackets']"
                :type="types.source"
                :lang="languageCode"
            />
        </div>
    </div>
</template>
<script>
import TreebankIcon from '@/images/inline-icons/sitemap.svg'
import DisambiguatedIcon from '@/images/inline-icons/caret-left.svg'
import Tooltip from '@/vue/components/tooltip.vue'
import { Feature, LanguageModelFactory, Logger } from 'alpheios-data-models'

import InflectionAttribute from '@/vue/components/infl-attribute.vue'

export default {
  name: 'PrincipalParts',
  inject: ['app','l10n'], // API modules
  components: {
    inflectionattribute: InflectionAttribute,
    treebankIcon: TreebankIcon,
    disambiguatedIcon: DisambiguatedIcon,
    tooltip: Tooltip
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
    // this is needed because sometimes a compound word is lemmatized
    // into its component parts, separated by a ',' or '-'
    // ideally this would be represented explicitly in the data model and
    // query so that the definitions for the parts can be displayed together
    // so this solution is temporary until we can do that
    wordParts (word) {
      return word.split(/[,-]/)
    },
    featureList (features, name) {
      let list = features.map(i => this.lemma.features[i] ? this.lemma.features[i] : null).filter(i => i)
      list = list.length > 0 ? `(${list.map((f) => f).join(', ')})` : ''
      let returnObj = {} // eslint-disable-line prefer-const
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
  },
  mounted () {
    this.$nextTick(() => {
      const selectorName = 'getSelectedText-lemma'
      try {
        this.app.registerTextSelector(selectorName, '.alpheios-principal-parts__groupitem')
        this.app.activateTextSelector(selectorName)
      } catch (err) {
        Logger.getInstance().error(err)
      }
    })
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

  .alpheios-principal-parts__groupitem--lemma-word__listitem:after {
    content: " - ";
  }
  .alpheios-principal-parts__groupitem--lemma-word__listitem:last-child:after {
    content: "";
  }

  .alpheios-principal-parts__listitem:after {
    content: ", ";
  }

  .alpheios-principal-parts__listitem:last-child:after {
    content: "";
  }

  .alpheios-principal-parts__item h4.alpheios-principal-parts__groupitem {
    display: inline;
    font-weight: 700;
    margin-right: 5px;
    margin-bottom: 0;
  }

  h4.alpheios-principal-parts__groupitem:last-of-type {
      margin-right: 0;

      // Comment the following rule out if colons are not required after headword(s)
      &:after {
          content: ':';
          margin-left: 3px;
      }
  }

  .alpheios-principal-parts__item {
      display: flex;

      .feature_extras {
          margin-left: 5px;
      }

      .feature_source {
          margin-left: 5px;
      }
  }

  .alpheios-morph-data__chinese p {
    margin-bottom: 0;
  }

  .alpheios-morph__attr i {
    font-style: italic;
    font-family: sans-serif;
    font-size: 90%;
  }

  .alpheios-principal-parts__pointer {
      &-tooltip {
          display: block;
          height: 22px;
          margin-left: -5px;
      }

      &-icn {
          display: block;
          fill: var(--alpheios-color-vivid);
          height: 22px;
      }
  }

  .alpheios-principal-parts__dsmbg-providers {
      display: block;
      height: 22px;

      &-tooltip {
        margin-left: 5px;
      }

      &-icn {
          fill: var(--alpheios-color-neutral-dark);
          display: block;
          height: 22px;
      }
  }
</style>
