<template>
  <div :class="morphClass" v-if="lex">
    <div class="alpheios-morph__features">

      <p class="principal_parts" v-for="(lemma,lemmaIndex) in allLemmas">
        <span class="lemma_index" v-if="lemmaIndex === 0 && count > 1">{{ index + 1 }}</span>
        <span class="lemma_index_spacer" v-else-if="lemmaIndex > 0 && count > 1"> </span>

        <span :lang="languageCode(lemma.languageID)"
              class="alpheios-morph__hdwd alpheios-morph__formtext alpheios-morph__groupitem"
              v-if="! lemma.principalParts.includes(lemma.word)">{{ lemma.word }}</span>

        <span class="alpheios-morph__hdwd alpheios-morph__formtext alpheios-morph__groupitem">
          <span :lang="languageCode(lemma.languageID)"
                class="alpheios-morph__listitem" v-for="part in lemma.principalParts">{{ part }}</span>
        </span>
        <inflectionattribute :data="lemma.features" :decorators="['brackets']" :linkedfeatures="linkedfeatures"
                             :messages="messages" :type="types.pronunciation"/>

        <span
            class="feature_extras"
            v-if="lemma.features && (getFeature(lemma,'frequency') || getFeature(lemma,'age') || getFeature(lemma,'area') || getFeature(lemma,'geo'))">
        <inflectionattribute :data="featureList(lemma,['age','area','geo','frequency'],'extras')" :messages="messages"
                             :type="'extras'" @sendfeature="sendFeature"/>
      </span>
        <span class="feature_source" v-if="lemma.features && getFeature(lemma,'source')">
        <inflectionattribute :data="lemma.features" :decorators="['link','brackets']" :linkedfeatures="linkedfeatures"
                             :messages="messages" :type="types.source" @sendfeature="sendFeature"/>
      </span>
      </p><!-- principal_parts -->

      <div class="alpheios-morph__morphdata" v-if="lex.lemma.features">
        <span class="alpheios-morph__pofs">
          <inflectionattribute :data="lex.lemma.features" :linkedfeatures="linkedfeatures" :messages="messages"
                               :type="types.grmCase" @sendfeature="sendFeature"/>
          <inflectionattribute :data="lex.lemma.features" :linkedfeatures="linkedfeatures" :messages="messages"
                               :type="types.gender" @sendfeature="sendFeature"/>
          <inflectionattribute :data="lex.lemma.features" :linkedfeatures="linkedfeatures" :messages="messages"
                               :type="types.part" @sendfeature="sendFeature"/>
        </span>
        <inflectionattribute :data="lex.lemma.features" :decorators="['parenthesize']" :linkedfeatures="linkedfeatures"
                             :messages="messages" :type="types.kind" @sendfeature="sendFeature"/>
        <inflectionattribute :data="lex.lemma.features" :decorators="['appendtype']" :linkedfeatures="linkedfeatures"
                             :messages="messages" :type="types.declension" @sendfeature="sendFeature"/>
        <inflectionattribute :data="lex.lemma.features" :decorators="['appendtype']" :linkedfeatures="linkedfeatures"
                             :messages="messages" :type="types.conjugation" @sendfeature="sendFeature"/>
        <inflectionattribute :data="lex.lemma.features" :decorators="['brackets']" :linkedfeatures="linkedfeatures"
                             :messages="messages" :type="types.note" @sendfeature="sendFeature"/>
      </div>
    </div><!--alpheios-morph__features-->

    <div class="alpheios-morph__definition_list" v-if="definitions.length > 0">
      <!-- <p class="block_title">definitions</p> -->
      <div :data-lemmakey="lex.lemma.ID" class="alpheios-morph__definition"
           v-for="(definition, dindex) in $store.getters['app/shortDefsByLemmaID'](lex.lemma.ID)" :key="definition.ID">
        <span class="definition_index" v-if="$store.getters['app/shortDefsByLemmaID'](lex.lemma.ID).length > 1">{{ definitionIndex(dindex) }}</span>
        <shortdef :definition="definition"></shortdef>
      </div>
    </div>

    <div
        class="alpheios-morph__translation_list"
        v-if="translations && translations[lex.lemma.ID] && translations[lex.lemma.ID].glosses && translations[lex.lemma.ID].glosses.length > 0">
      <!-- <p class="block_title">translations ({{ translations[lex.lemma.ID].languageCode}})</p> -->
      <lemmatranslation :lemmakey="lex.lemma.ID" :translations="translations"></lemmatranslation>
    </div>

    <div class="alpheios-morph__inflections" v-if="inflections.length > 0">
      <!-- <p class="block_title">inflections</p> -->
      <div class="alpheios-morph__inflset" v-for="(inflset, ifindex) in inflections">
        <span class="inflset_index" v-if="inflections.length > 1">{{ ifindex + 1 }}.</span>
        <div class="alpheios-morph__forms">
          <span :lang="languageCode(lex.lemma.languageID)" class="alpheios-morph__formtext" data-feature="prefix"
                data-grouplevel="1" v-if="inflset.groupingKey.prefix">{{inflset.groupingKey.prefix}} </span>
          <span :lang="languageCode(lex.lemma.languageID)" class="alpheios-morph__formtext" data-feature="stem"
                data-grouplevel="1">{{inflset.groupingKey.stem}}</span>
          <span :lang="languageCode(lex.lemma.languageID)" class="alpheios-morph__formtext" data-feature="suffix"
                data-grouplevel="1" v-if="inflset.groupingKey.suffix"> -{{inflset.groupingKey.suffix}}</span>
          <span class="alpheios-morph__inflfeatures">
            <inflectionattribute :data="inflset.groupingKey" :grouplevel="1" :linkedfeatures="linkedfeatures"
                                 :messages="messages" :type="types.part" @sendfeature="sendFeature"
                                 v-if="! featureMatch(lex.lemma.features[types.part],inflset.groupingKey[types.part])"/>
            <inflectionattribute :data="inflset.groupingKey" :decorators="['appendtype']" :grouplevel="1"
                                 :linkedfeatures="linkedfeatures" :messages="messages" :type="types.declension"
                                 @sendfeature="sendFeature"
                                 v-if="inflset.groupingKey.declension && ! featureMatch(inflset.groupingKey.declension,lex.lemma.features.declension)"/>
          </span>
          <div class="alpheios-morph__inflgroup" v-for="group in inflset.inflections">
            <span v-if="group.groupingKey.isCaseInflectionSet">
              <inflectionattribute :data="group.groupingKey" :decorators="['abbreviate']" :grouplevel="2"
                                   :linkedfeatures="linkedfeatures" :messages="messages" :type="types.number"
                                   @sendfeature="sendFeature"/>
              <inflectionattribute :data="group.groupingKey" :decorators="['abbreviate']" :grouplevel="2"
                                   :linkedfeatures="linkedfeatures" :messages="messages" :type="types.tense"
                                   @sendfeature="sendFeature"/>
            </span>
            <div :class="groupClass(group)"
                 v-for="nextGroup in group.inflections">
              <span v-if="group.groupingKey.isCaseInflectionSet">
                <inflectionattribute :data="nextGroup.groupingKey" :decorators="['abbreviate']" :grouplevel="3"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.tense"
                                     @sendfeature="sendFeature"/>
                <inflectionattribute :data="nextGroup.groupingKey" :decorators="['abbreviate']" :grouplevel="3"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.voice"
                                     @sendfeature="sendFeature"/>
              </span>
              <div :class="groupClass(group)"
                   v-for="infl in nextGroup.inflections">
                <inflectionattribute :data="infl.groupingKey" :decorators="['abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.grmCase"
                                     @sendfeature="sendFeature"/>
                <inflectionattribute :data="infl.groupingKey" :decorators="['parenthesize','abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages"
                                     :type="types.gender"
                                     @sendfeature="sendFeature"
                                     v-if="! featureMatch(infl.groupingKey[types.gender],lex.lemma.features[types.gender])"/>
                <inflectionattribute :data="infl.groupingKey" :decorators="['abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.comparison"
                                     @sendfeature="sendFeature"/>
                <inflectionattribute :data="infl.groupingKey" :decorators="['appendtype','abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages"
                                     :type="types.person" @sendfeature="sendFeature"/>
                <inflectionattribute :data="infl.groupingKey" :decorators="['abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.number"
                                     @sendfeature="sendFeature"
                                     v-if="! group.groupingKey.isCaseInflectionSet"/>
                <inflectionattribute :data="infl.groupingKey" :decorators="['abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.tense"
                                     @sendfeature="sendFeature"
                                     v-if="! group.groupingKey.isCaseInflectionSet"/>
                <inflectionattribute :data="infl.groupingKey" :decorators="['abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.mood"
                                     @sendfeature="sendFeature"
                                     v-if="! group.groupingKey.isCaseInflectionSet"/>
                <inflectionattribute :data="infl.groupingKey" :decorators="['abbreviate']" :grouplevel="4"
                                     :linkedfeatures="linkedfeatures" :messages="messages" :type="types.voice"
                                     @sendfeature="sendFeature"
                                     v-if="! group.groupingKey.isCaseInflectionSet"/>
                <span v-for="item in infl.inflections">
                    <inflectionattribute :data="item" :decorators="['parenthesize']" :linkedfeatures="linkedfeatures"
                                         :messages="messages" @sendfeature="sendFeature"
                                         type="dialect"/>
                    <inflectionattribute :data="item" :linkedfeatures="linkedfeatures" :messages="messages"
                                         @sendfeature="sendFeature" type="example"/>
                  </span>
              </div><!-- end infl -->
            </div><!-- end forms -->
          </div><!-- end groupinflections -->
        </div>
      </div>
    </div><!-- end alpheios-morph__inflections -->

  </div><!--alpheios-morph__dictentry-->
</template>
<script>
import { Feature, GrmFeature, LanguageModelFactory } from 'alpheios-data-models'
import ShortDef from './shortdef.vue'
import InflectionAttribute from './infl-attribute.vue'

import LemmaTranslation from './lemma-translation.vue'

export default {
  name: 'MorphInner',
  components: {
    shortdef: ShortDef,
    inflectionattribute: InflectionAttribute,
    lemmatranslation: LemmaTranslation
  },
  props: {
    lex: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    definitions: {
      type: Array,
      required: false,
      default: () => []
    },
    linkedfeatures: {
      type: Array,
      required: false,
      default: () => []
    },
    translations: {
      type: Object,
      required: false,
      default: () => {}
    },
    morphDataReady: {
      type: Boolean,
      required: true
    },
    messages: {
      type: Object,
      required: false
    }
  },
  data: function () {
    return {
      showSource: false
    }
  },
  created: function () {
    this.types = Feature.types
  },
  computed: {
    allLemmas () {
      if (this.lex.altLemmas && this.lex.altLemmas.length > 0) {
        return [this.lex.lemma, ...this.lex.altLemmas].sort((a, b) => {
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
        return [this.lex.lemma]
      }
    },
    morphClass () {
      let c = 'alpheios-morph__dictentry'
      if (this.lex.disambiguated) {
        c = `${c} alpheios-morph__dictentry-disambiguated`
      }
      return c
    },
    inflections: {
      get: function () {
        return (this.morphDataReady && this.lex.getGroupedInflections) ? this.lex.getGroupedInflections() : []
      }
    }
  },
  methods: {
    groupClass (group) {
      return group.groupingKey.isCaseInflectionSet ? 'alpheios-morph__inline' : 'alpheios-morph__block'
    },
    featureMatch (a, b) {
      if (a && b) {
        return a.isEqual(b)
      }
      return false
    },
    sendFeature (data) {
      this.$emit('sendfeature', data)
    },
    getFeature (lemma, type) {
      if (lemma.features[type] !== undefined) {
        return lemma.features[type].value
      }
      return undefined
    },
    definitionIndex (index) {
      let letters = 'abcdefghijklmnopqrstuvwxyz'
      return letters.substr(index, 1) + '.'
    },
    featureList (lemma, features, name) {
      let list = features.map(i => lemma.features[i] ? lemma.features[i] : null).filter(i => i)
      list = list.length > 0 ? `(${list.map((f) => f).join(', ')})` : ''
      let returnObj = {}
      returnObj[name] = { value: list, values: [list] }
      return returnObj
    },
    languageCode (languageID) {
      return LanguageModelFactory.getLanguageCodeFromId(languageID)
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-morph__lexemes {
    color: $alpheios-tools-color;
  }

  .alpheios-morph__dictentry {
    margin-bottom: .5em;
    padding-bottom: 5px;
    clear: both;
  }

  .alpheios-morph__formtext {
    font-weight: bold;
  }

  .alpheios-morph__dictentry .alpheios-morph__formtext {
    font-size: larger;
  }

  .alpheios-morph__dictentry .alpheios-morph__forms .alpheios-morph__formtext {
    font-size: inherit;
  }

  .alpheios-morph__source {
    font-size: smaller;
    color: $alpheios-toolbar-color;
    font-style: italic;
  }

  .alpheios-morph__dial {
    font-size: smaller;
  }

  .alpheios-morph__attr {
    font-weight: normal;
    padding-right: .25em;
  }

  .alpheios-morph__linkedattr {
    color: $alpheios-link-color;
    font-weight: bold;
    cursor: pointer;
    padding-right: .25em;
  }

  .alpheios-morph__linkedattr:hover {
    color: $alpheios-link-hover-color !important;
  }

  .alpheios-morph__pofs span:last-child:after {
    content: ";";
  }

  .alpheios-morph__inflset {
    margin-left: .5em;
    margin-top: .5em;
  }

  .alpheios-morph__inflset h5 {
    display: none;
    font-size: $alpheios-base-font-size;
    line-height: 1;
    margin-bottom: .5em;
  }

  .alpheios-morph__inflset:first-child h5 {
    color: $alpheios-toolbar-color;
    display: block;
  }

  .alpheios-morph__morphdata {
    display: inline;
  }

  .alpheios-morph__inflections, .alpheios-morph__definition, .alpheios-morph__forms {
    margin-left: .5em;
  }

  .alpheios-morph__listitem:after {
    content: ", ";
  }

  .alpheios-morph__listitem:last-child:after {
    content: "";
  }

  .alpheios-morph__list .alpheios-morph__infl:first-child .alpheios-morph__showiffirst {
    display: block;
  }

  .alpheios-morph__list .alpheios-morph__infl .alpheios-morph__showiffirst {
    display: none;
  }

  .alpheios-morph__lexemes .alpheios-definition__lemma {
    display: none;
  }

  div.alpheios-morph__inline {
    display: inline;
  }

  div.alpheios-morph__block {
    display: block;
  }

  .alpheios-panel__tab-panel .alpheios-morph__lexemes {
    font-size: .75rem;
  }

  .alpheios-morph__inflfeatures span:first-child:before {
    content: '(';
  }

  .alpheios-morph__inflfeatures span:last-child:after {
    content: ')';
  }

  .alpheios-morph__groupitem:last-child:after {
    content: ':';
  }

  $lemma_index_size: 20px;

  .alpheios-morph__dictentry {
    margin-bottom: 15px;

    .lemma_index, .lemma_index_spacer {
      display: inline-block;
      text-align: center;
      font-weight: bold;
      margin-right: 10px;
      vertical-align: top;
      margin-top: 3px;
    }

    .alpheios-morph__features {
      &:before,
      &:after {
        content: '';
        display: table;
        clear: both;
      }

      p {
        margin-bottom: 0;
        margin-top: 0;

        &.feature_extras {
          font-style: italic;
        }
      }

      span.feature_source {
        .alpheios-morph__attr {
          font-size: smaller;
        }
      }
    }

    .alpheios-morph__morphdata,
    p.feature_extras,
    .alpheios-morph__definition_list,
    .alpheios-morph__translation_list,
    .alpheios-morph__inflections {
      margin-left: $lemma_index_size + 14px;
    }

    .alpheios-morph__definition_list,
    .alpheios-morph__translation_list,
    .alpheios-morph__inflections {
      /* border-top: 1px solid $alpheios-toolbar-color; */
      margin-top: 5px;
      padding-left: 5px;

      .block_title {
        margin: 0;
        color: $alpheios-toolbar-color;
        font-size: 10px;
        text-align: right;
      }
    }

    .alpheios-morph__definition {
      margin-bottom: 5px;
    }

    .alpheios-definition__text {
      font-weight: normal;
    }

    .alpheios-morph__inflset {
      margin-top: 0;
      margin-left: 7px;

      .alpheios-morph__forms {
        margin-left: 0;
        display: inline-block;
        vertical-align: top;
      }

      .inflset_index {
        display: inline-block;
        font-weight: bold;
        vertical-align: top;
      }

    }

    .alpheios-morph__definition_list {
      .definition_index {
        display: inline-block;
        font-weight: bold;
      }

      .alpheios-definition__short {
        display: inline-block;
      }
    }
  }
</style>
